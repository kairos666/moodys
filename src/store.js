import Vuex from 'vuex';
import Vue from 'vue';
import firebaseConfig from '@/config/firebase';
import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import NotifHelpers from '@/utils/notification-helpers';
import asyncFeedback from '@/store-modules/async-state-module';
import authModule from '@/store-modules/authentication-state-module';
import statsModule from '@/store-modules/statistics-module';
import offlineModule from '@/store-modules/offline-module';
import notificationModule from '@/store-modules/notification-module';
import AchievementsModule from '@/store-modules/achievements-module';
import firebase from 'firebase';
import BadgesConfig, { MoodRegisteredEvt } from '@/config/badges';
import { EventBus, NotificationEvt } from '@/utils/events-bus';
import Fingerprint2 from 'fingerprintjs2';

Vue.use(Vuex);

// local storage retrieval
let localyStored = LSHelpers.getAll();

// firebase setup
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.database();
firebaseHelpers.initialize(db);
let auth = firebase.auth(firebaseApp);

const store = new Vuex.Store({
    modules: {
        asyncTransactions: asyncFeedback.asyncStateModule,
        auth: authModule.authStore(auth),
        stats: statsModule,
        offline: offlineModule.offlineStore(db),
        notifications: notificationModule.notificationStore(db),
        achievementsUtils: AchievementsModule.achievementsStore(db)
    },
    state: {
        users: (localyStored.users) ? localyStored.users : {},
        moods: (localyStored.moods) ? localyStored.moods : {},
        daysmoods: (localyStored.dayMoods) ? localyStored.dayMoods : {},
        weekmoods: (localyStored.weekMoods) ? localyStored.weekMoods : {},
        achievementsStatus: (localyStored.achievements) ? localyStored.achievements : {},
        browserFingerPrint: null
    },
    getters: {
        currentUserMood(state) {
            // no authenticated user case (no data mood case)
            if (!state.auth.currentFirebaseUser) return null;
            // authenticated case
            return firebaseHelpers.getCurrentMood(state.daysmoods, state.auth.currentFirebaseUser.uid);
        },
        usersArray(state) {
            // no authenticated user case
            if (!state.auth.currentFirebaseUser) return [];
            // authenticated case
            return firebaseHelpers.formatUsersToArray(state.users, state.auth.currentFirebaseUser.uid, state.daysmoods);
        },
        userBadges(state) {
            // no authenticated user case (no data mood case)
            if (!state.auth.currentFirebaseUser) return [];
            // authenticated case
            let badgesArray = BadgesConfig.badgesArray.map(badgeData => {
                if (!state.achievementsStatus || !state.achievementsStatus[badgeData.title]) {
                    // no achievements data = false
                    badgeData.achieved = false;
                } else {
                    // achieved status elicited (undefined achievements are set to false)
                    badgeData.achieved = state.achievementsStatus[badgeData.title];
                }

                return badgeData;
            });

            return badgesArray;
        }
    },
    mutations: {
        updateUsers(state, payload) {
            state.users = payload;
            LSHelpers.setAllUsers(payload);
        },
        updateMoods(state, payload) {
            state.moods = payload;
            LSHelpers.setAllMoods(payload);
        },
        updateDaysMoods(state, payload) {
            state.daysmoods = payload;
            LSHelpers.setDayMoods(payload);
        },
        updateWeekMoods(state, payload) {
            state.weekmoods = payload;
            LSHelpers.setWeekMoods(payload);
        },
        updateAchievements(state, payload) {
            state.achievementsStatus = payload;
            LSHelpers.setAchievements(payload);
        },
        fingerprint(state, payload) {
            state.browserFingerPrint = payload;
        }
    },
    actions: {
        updateCurrentUserMood({ state }, payload) {
            // action with no commit --> firebase update
            firebaseHelpers.addMoodEntry(payload, state.auth.currentFirebaseUser.uid);
        },
        notify(context, payload) {
            // generate notification (snack bar notification)
            let evt = new NotificationEvt(payload.subType, payload.options);
            EventBus.$emit(evt.type, evt);
        },
        fingerprint(context) {
            let options = {
                excludeCanvas: true,
                excludeWebGL: true,
                excludeAdBlock: true,
                excludeJsFonts: true,
                excludeFlashFonts: true
            };
            new Fingerprint2(options).get(function(result) {
                context.commit('fingerprint', result);
            });
        }
    }
});

// set auth status change handler
auth.onAuthStateChanged(resp => {
    store.dispatch('updateAuthUser', resp);
});

// set db connection change handler
db.ref('.info/connected').on('value', snap => {
    store.dispatch('offline/updateDBConnectionStatus', (snap.val() === true));
});

// evaluate browser fingerprint
store.dispatch('fingerprint');

// listen to achievements events and react accordingly
EventBus.$on('achievements', (evt) => {
    console.log('captured achievement event', evt.subType, evt.payload);
    switch (evt.subType) {
    case 'page-visited':
        store.dispatch('achievementsUtils/updatePageVisit', evt.payload);
        break;
    case 'time-travel':
        store.dispatch('achievementsUtils/updateTimeTravel', evt.payload);
        break;
    case 'forgot-password':
        store.dispatch('achievementsUtils/updateForgotPassword', evt.payload);
        break;
    case 'mood-registered':
        store.dispatch('achievementsUtils/updatedMood');
    }
});

/**
 * generate notifications (in-app) each mood input
 *
 * only DB registered mood updates are triggering notifs that way it is more reliable and network is online
 **/
firebaseHelpers.onDayMoodsChange(update => {
    // select only one eligible notif (or none if all are older than 1 minute)
    let moodToNotif = NotifHelpers.filterEligibleDyaMoodsChangesForNotification(update.val());

    // trigger in-app notif if valid update (DB registered any user)
    if (moodToNotif) {
        let userData = store.getters.usersArray.find(item => (item.id === moodToNotif.uid));
        if (userData) {
            // extend options with user data
            let notifData = Object.assign(moodToNotif, userData);
            delete notifData.currentMood;
            delete notifData.id;

            // generate notification
            store.dispatch('notify', { subType: 'moodUpdate', options: notifData });
        } else {
            console.warn('Couldn\'t generate notification due to unknown UID:' + moodToNotif.uid);
        }
    }

    // trigger push notif if valid update (DB registered and update from currently connected user)
    if (moodToNotif && moodToNotif.uid === store.state.auth.currentFirebaseUser.uid) {
        // send data to web push store module for processing
        store.dispatch('notifications/notificationFiring', moodToNotif);

        // update achievements for newly registered mood
        let achievementEvt = new MoodRegisteredEvt();
        EventBus.$emit(achievementEvt.type, achievementEvt);
    }
});

export default store;
