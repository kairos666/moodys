import Vuex from 'vuex';
import Vue from 'vue';
import firebaseConfig from '@/config/firebase';
import firebaseHelpers from '@/utils/firebase-helpers';
import firebase from 'firebase';

Vue.use(Vuex);

// firebase setup
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.database();
firebaseHelpers.initialize(db);
let auth = firebase.auth(firebaseApp);

const store = new Vuex.Store({
    state: {
        currentFirebaseUser: null,
        users: {},
        moods: {}
    },
    getters: {
        isAuthenticated(state) {
            return (state.currentFirebaseUser !== null);
        }
    },
    mutations: {
        updateAuthUser(state, payload) {
            state.currentFirebaseUser = payload;
        },
        updateUsers(state, payload) {
            state.users = payload;
        },
        updateMoods(state, payload) {
            state.moods = payload;
        }
    },
    actions: {
        login(context, payload) {
            if (payload.email && payload.password) auth.signInWithEmailAndPassword(payload.email, payload.password);
        },
        logout(context) {
            auth.signOut();
        },
        updateAuthUser(context, payload) {
            // prepare callbacks
            let usersUpdateCallback = function(snapshot) {
                let usersUpdate = snapshot.val();
                if (usersUpdate !== null) context.commit('updateUsers', usersUpdate);
            };
            let moodsUpdateCallback = function(snapshot) {
                let moodsUpdate = snapshot.val();
                if (moodsUpdate !== null) context.commit('updateMoods', moodsUpdate);
            };

            if (payload !== null) {
                console.info('user connected: ', payload);

                // setup updates listeners
                firebaseHelpers.onAllUsersChange(usersUpdateCallback);
                firebaseHelpers.onAllMoodsChange(moodsUpdateCallback);
            } else {
                console.info('user disconnected');

                // close updates listeners
                firebaseHelpers.onAllUsersChange(usersUpdateCallback, true);
                firebaseHelpers.onAllMoodsChange(moodsUpdateCallback, true);
            }
            context.commit('updateAuthUser', payload);
        },
        signup(context, payload) {
            console.info('action signup');
            if (payload.email && payload.password) auth.signUp(payload.email, payload.password);
        }
    }
});

// set auth status change handler
auth.onAuthStateChanged(resp => {
    store.dispatch('updateAuthUser', resp);
});

export default store;
