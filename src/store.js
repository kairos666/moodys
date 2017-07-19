import Vuex from 'vuex';
import Vue from 'vue';
import firebaseConfig from '@/config/firebase';
import firebase from 'firebase';

Vue.use(Vuex);

// firebase setup
let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.database();
console.log(db);
let auth = firebase.auth(firebaseApp);

const store = new Vuex.Store({
    state: {
        currentFirebaseUser: null
    },
    getters: {
        isAuthenticated(state) {
            return (state.currentFirebaseUser !== null);
        }
    },
    mutations: {
        updateUser(state, payload) {
            state.currentFirebaseUser = payload;
        }
    },
    actions: {
        login(context, payload) {
            if (payload.email && payload.password) auth.signInWithEmailAndPassword(payload.email, payload.password);
        },
        logout(context) {
            auth.signOut();
        },
        updateUser(context, payload) {
            if (payload !== null) {
                console.info('user connected: ', payload);
            } else {
                console.info('user disconnected');
            }
            context.commit('updateUser', payload);
        },
        signup(context, payload) {
            console.info('action signup');
            if (payload.email && payload.password) auth.signUp(payload.email, payload.password);
        }
    }
});

// set auth status change handler
auth.onAuthStateChanged(resp => {
    store.dispatch('updateUser', resp);
});

export default store;
