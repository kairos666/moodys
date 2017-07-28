import Vuex from 'vuex';
import Vue from 'vue';
import router from './router/index';
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
        moods: {},
        asyncTransactions: {
            signup: undefined,
            signin: undefined,
            reset: undefined,
            profile: undefined
        }
    },
    getters: {
        isAuthenticated(state) {
            return (state.currentFirebaseUser !== null);
        },
        isAsyncSignUp(state) {
            return state.asyncTransactions.signup;
        },
        isAsyncSignIn(state) {
            return state.asyncTransactions.signin;
        },
        isAsyncResetPassword(state) {
            return state.asyncTransactions.reset;
        },
        isAsyncProfileUpdate(state) {
            return state.asyncTransactions.profile;
        },
        usersArray(state) {
            return firebaseHelpers.formatUsersToArray(state.users, state.currentFirebaseUser.uid);
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
        },
        updateAsyncTransaction(state, payload) {
            state.asyncTransactions[payload.transaction] = payload;
        }
    },
    actions: {
        login(context, payload) {
            // log in users with credentials
            context.commit('updateAsyncTransaction', { transaction: 'signin', state: 'await - user sign in', isEnded: false, isSuccess: false });
            auth.signInWithEmailAndPassword(payload.email, payload.password).then(function(user) {
                context.commit('updateAsyncTransaction', { transaction: 'signin', state: 'user signed in', isEnded: true, isSuccess: true });

                return user;
            }).catch(function(err) {
                console.warn(err.message);
                context.commit('updateAsyncTransaction', { transaction: 'signin', state: 'user sign in failure - ' + err.message, isEnded: true, isSuccess: false });
            });
        },
        logout(context) {
            auth.signOut();
        },
        resetPassword(context, payload) {
            // launch reset process (email with activation code)
            context.commit('updateAsyncTransaction', { transaction: 'reset', state: 'await - reset password action result', isEnded: false, isSuccess: false });
            auth.sendPasswordResetEmail(payload.email).then(function(resp) {
                context.commit('updateAsyncTransaction', { transaction: 'reset', state: `reset password email sent in your inbox: ${payload.email}`, isEnded: true, isSuccess: true });

                return resp;
            }).catch(function(err) {
                console.warn(err.message);
                context.commit('updateAsyncTransaction', { transaction: 'reset', state: 'reset password reset failure - ' + err.message, isEnded: true, isSuccess: false });
            });
        },
        signup(context, payload) {
            // create user & follow with user entry
            context.commit('updateAsyncTransaction', { transaction: 'signup', state: 'await - user creation', isEnded: false, isSuccess: false });
            auth.createUserWithEmailAndPassword(payload.email, payload.password).then(function(user) {
                context.commit('updateAsyncTransaction', { transaction: 'signup', state: 'await - user profile creation' });

                let userMetaData = {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    motto: payload['famous-quote']
                };
                return firebaseHelpers.addUserEntry(user.uid, userMetaData);
            }).then(function(resp) {
                context.commit('updateAsyncTransaction', { transaction: 'signup', state: 'user account created', isEnded: true, isSuccess: true });

                return resp;
            }).catch(function(err) {
                console.warn(err.message);
                context.commit('updateAsyncTransaction', { transaction: 'signup', state: 'user account creation failure - ' + err.message, isEnded: true, isSuccess: false });
            });
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

                // navigate back to home
                router.push('/');
            }
            context.commit('updateAuthUser', payload);
        },
        updateCurrentUserMood({ state }, payload) {
            // action with no commit --> firebase update
            firebaseHelpers.addMoodEntry(payload, state.currentFirebaseUser.uid);
        }
    }
});

// set auth status change handler
auth.onAuthStateChanged(resp => {
    store.dispatch('updateAuthUser', resp);
});

export default store;
