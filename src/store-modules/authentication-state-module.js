import router from '@/router/index';
import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import asyncFeedback from '@/store-modules/async-state-module';

let authStore = auth => {
    // return store module
    return {
        state: {
            isInitalAuthDone: false,
            currentFirebaseUser: null
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
            initialAuthDone(state) {
                state.isInitalAuthDone = true;
            }
        },
        actions: {
            login(context, payload) {
                // log in users with credentials
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signin', 'await - user signing in'));
                auth.signInWithEmailAndPassword(payload.email, payload.password).then(function(user) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signin', 'user signed in', true, true));

                    return user;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signin', 'user sign in failure - ' + err.message, true));
                });
            },
            logout(context) {
                auth.signOut();
            },
            resetPassword(context, payload) {
                // launch reset process (email with activation code)
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('reset', 'await - reset password action result'));
                auth.sendPasswordResetEmail(payload.email).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('reset', `reset password email sent in your inbox: ${payload.email}`, true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('reset', 'reset password reset failure - ' + err.message, true, false));
                });
            },
            signup(context, payload) {
                // create user & follow with user entry
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'await - user creation'));
                auth.createUserWithEmailAndPassword(payload.email, payload.password).then(function(user) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'await - user profile creation'));

                    let userMetaData = new UserProfile(payload.firstname, payload.lastname, payload['famous-quote']);
                    return firebaseHelpers.setUserEntry(user.uid, userMetaData);
                }).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'user account created', true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'user account creation failure - ' + err.message, true, false));
                });
            },
            accountProfileUpdate(context, payload) {
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountprofile', 'await - user profile update'));
                firebaseHelpers.setUserEntry(context.state.currentFirebaseUser.uid, payload).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountprofile', 'user profile updated', true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountprofile', 'user profile update failure - ' + err.message, true, false));
                });
            },
            accountEmailUpdate(context, payload) {
                let formerInbox = context.state.currentFirebaseUser.email;
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountemail', 'await - user account email update'));
                context.state.currentFirebaseUser.updateEmail(payload.email).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountemail', `confirmation email sent in your former inbox: ${formerInbox}`, true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountemail', 'account email change failure - ' + err.message, true, false));
                });
            },
            accountPasswordUpdate(context, payload) {
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountpassowrd', 'await - user account password update'));
                context.state.currentFirebaseUser.updatePassword(payload.password).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountpassowrd', `confirmation email sent in your inbox: ${context.state.currentFirebaseUser.email}`, true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountpassowrd', 'account password change failure - ' + err.message, true, false));
                });
            },
            updateAuthUser(context, payload) {
                // first time = initial auto login resolution is a success
                if (!context.isInitalAuthDone) context.dispatch('initialAuthDone');

                // prepare callbacks
                let usersUpdateCallback = function(snapshot) {
                    let usersUpdate = snapshot.val();
                    if (usersUpdate !== null) {
                        context.commit('updateUsers', usersUpdate);
                        context.dispatch('initialAuthDone');
                    }
                };
                let moodsUpdateCallback = function(snapshot) {
                    let moodsUpdate = snapshot.val();
                    if (moodsUpdate !== null) context.commit('updateMoods', moodsUpdate);
                };
                let daysMoodsUpdateCallback = function(snapshot) {
                    let daysMoodsUpdate = snapshot.val();
                    if (daysMoodsUpdate !== null) context.commit('updateDaysMoods', daysMoodsUpdate);
                };
                let weekMoodsUpdateCallback = function(snapshot) {
                    let weekMoodsUpdate = snapshot.val();
                    if (weekMoodsUpdate !== null) context.commit('updateWeekMoods', weekMoodsUpdate);
                };

                if (payload !== null) {
                    // console.info('user connected: ', payload);

                    // setup updates listeners
                    firebaseHelpers.onAllUsersChange(usersUpdateCallback);
                    firebaseHelpers.onAllMoodsChange(moodsUpdateCallback);
                    firebaseHelpers.onDayMoodsChange(daysMoodsUpdateCallback);
                    firebaseHelpers.onWeekMoodsChange(weekMoodsUpdateCallback);
                } else {
                    // console.info('user disconnected');

                    // close updates listeners
                    firebaseHelpers.onAllUsersChange(usersUpdateCallback, true);
                    firebaseHelpers.onAllMoodsChange(moodsUpdateCallback, true);
                    firebaseHelpers.onDayMoodsChange(daysMoodsUpdateCallback, true);
                    firebaseHelpers.onWeekMoodsChange(weekMoodsUpdateCallback, true);

                    // clean local storage
                    LSHelpers.removeLocalyStoredData();

                    // navigate back to home
                    router.push('/');
                }
                context.commit('updateAuthUser', payload);
            },
            initialAuthDone(context) {
                context.commit('initialAuthDone');
            }
        }
    };
};

class UserProfile {
    constructor(firstname, lastname, motto) {
        if (firstname && lastname && motto) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.motto = motto;
        } else {
            // throw if invalid transaction
            throw new Error('user profile object is invalid');
        }
    }
};

export default {
    authStore: authStore,
    UserProfile: UserProfile
};
