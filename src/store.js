import Vuex from 'vuex';
import Vue from 'vue';
import firebaseService from './services/firebase-service';
const firebaseActions = firebaseService.firebaseActions;

Vue.use(Vuex);

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
            console.info('action login');
            if (payload.email && payload.password) firebaseActions.authenticate(payload.email, payload.password);
        },
        logout(context) {
            console.info('action logout');
            firebaseActions.signOut();
        },
        updateUser(context, payload) {
            if (payload !== null) {
                console.log('user connected: ', payload);
            } else {
                console.log('user disconnected');
            }
            context.commit('updateUser', payload);
        },
        signup(context, payload) {
            console.info('action signup');
            if (payload.email && payload.password) firebaseActions.signUp(payload.email, payload.password);
        }
    }
});

// set auth status change handler
firebaseActions.onAuthStateChange(resp => {
    store.dispatch('updateUser', resp);
});

export default store;
