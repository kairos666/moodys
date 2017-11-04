import Vuex from 'vuex';
import Vue from 'vue';
import moment from 'moment';
import firebaseConfig from '@/config/firebase';
import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import asyncFeedback from '@/store-modules/async-state-module';
import authModule from '@/store-modules/authentication-state-module';
import statsModule from '@/store-modules/statistics-module';
import offlineModule from '@/store-modules/offline-module';
import notificationModule from '@/store-modules/notification-module';
import firebase from 'firebase';
import { EventBus, NotificationEvt } from '@/utils/events-bus';

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
        notifications: notificationModule.notificationStore(db)
    },
    state: {
        users: (localyStored.users) ? localyStored.users : {},
        moods: (localyStored.moods) ? localyStored.moods : {},
        daysmoods: (localyStored.dayMoods) ? localyStored.dayMoods : {},
        weekmoods: (localyStored.weekMoods) ? localyStored.weekMoods : {}
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
        }
    },
    actions: {
        updateCurrentUserMood({ state }, payload) {
            // action with no commit --> firebase update
            firebaseHelpers.addMoodEntry(payload, state.auth.currentFirebaseUser.uid);
        },
        notify(state, payload) {
            // generate notification
            let evt = new NotificationEvt(payload.subType, payload.options);
            EventBus.$emit(evt.type, evt);
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

// generate notifications each mood input
firebaseHelpers.onDayMoodsChange(update => {
    /**
     * heuristic 1 - consider only values that are less than 1 minute old
     * heuristic 2 - consider only newest value
     */
    // convert to array and apply heuristics 1
    let thresholdTimestamp = moment().subtract(1, 'minutes').unix() * 1000;
    let newDayMoods = update.val();
    let moodToNotif = Object.keys(newDayMoods).map(uid => newDayMoods[uid])
        .filter(dayMoods => (dayMoods.timestamp > thresholdTimestamp));

    // apply heuristic 2
    if (moodToNotif.length >= 2) {
        console.log(moodToNotif);
        // reduce if 2 entries or more
        moodToNotif = moodToNotif.reduce((a, b) => {
            return (a.timestamp > b.timestamp) ? a : b;
        });
    } else if (moodToNotif.length === 1) { moodToNotif = moodToNotif[0] } else { moodToNotif = null }

    // trigger notif if valid update
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
});

export default store;
