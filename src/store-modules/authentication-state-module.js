import router from '@/router/index';
import firebaseHelpers from '@/utils/firebase-helpers';
import asyncFeedback from '@/store-modules/async-state-module';

let authStore = auth => {
    // return store module
    return {
        state: {
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

                    let userMetaData = {
                        firstname: payload.firstname,
                        lastname: payload.lastname,
                        motto: payload['famous-quote']
                    };
                    return firebaseHelpers.addUserEntry(user.uid, userMetaData);
                }).then(function(resp) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'user account created', true, true));

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'user account creation failure - ' + err.message, true, false));
                });
            },
            accountEmailUpdate(context) {
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountemail', 'await - user account email update'));
                console.log('updateEmail func', context.state.currentFirebaseUser.updateEmail);
                console.log('current logged in user email', context.state.currentFirebaseUser.email);
                // https://firebase.google.com/docs/reference/js/firebase.User#updateEmail
            },
            accountPasswordUpdate(context, payload) {
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('accountpassowrd', 'await - user account password update'));
                console.log('password update', payload);
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
            }
        }
    };
};

export default authStore;
