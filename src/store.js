import Vuex from 'vuex';
import Vue from 'vue';
import firebaseConfig from '@/config/firebase';
import firebaseHelpers from '@/utils/firebase-helpers';
import asyncFeedback from '@/store-modules/async-state-module';
import authModule from '@/store-modules/authentication-state-module';
import statsModule from '@/store-modules/statistics-module';
import firebase from 'firebase';

Vue.use(Vuex);

// firebase setup
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.database();
firebaseHelpers.initialize(db);
let auth = firebase.auth(firebaseApp);

const store = new Vuex.Store({
    modules: {
        asyncTransactions: asyncFeedback.asyncStateModule,
        auth: authModule.authStore(auth),
        stats: statsModule
    },
    state: {
        users: {},
        moods: {},
        daysmoods: {}
    },
    getters: {
        currentUserMood(state) {
            // no authenticated user case (no data mood case)
            if (!state.auth.currentFirebaseUser) return null;
            // authenticated case
            return firebaseHelpers.getCurrentMood(state.moods, state.auth.currentFirebaseUser.uid);
        },
        usersArray(state) {
            // no authenticated user case
            if (!state.auth.currentFirebaseUser) return [];
            // authenticated case
            return firebaseHelpers.formatUsersToArray(state.users, state.auth.currentFirebaseUser.uid, state.moods);
        }
    },
    mutations: {
        updateUsers(state, payload) {
            state.users = payload;
        },
        updateMoods(state, payload) {
            state.moods = payload;
        },
        updateDaysMoods(state, payload) {
            state.daysmoods = payload;
        }
    },
    actions: {
        updateCurrentUserMood({ state }, payload) {
            // action with no commit --> firebase update
            firebaseHelpers.addMoodEntry(payload, state.auth.currentFirebaseUser.uid);
        }
    }
});

// set auth status change handler
auth.onAuthStateChanged(resp => {
    store.dispatch('updateAuthUser', resp);
});

export default store;
