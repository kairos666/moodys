import router from '@/router/index';
import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import asyncFeedback from '@/store-modules/async-state-module';
import { ForgotPasswordEvt } from '@/config/badges';
import { EventBus } from '@/utils/events-bus';

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

                    // achievement - forgot password
                    let achievementEvt = new ForgotPasswordEvt(payload.email);
                    EventBus.$emit(achievementEvt.type, achievementEvt);

                    return resp;
                }).catch(function(err) {
                    console.warn(err.message);
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('reset', 'reset password reset failure - ' + err.message, true, false));
                });
            },
            updateUserEmail(context, payload) {
                // check if auth email and user entry email in DB are synchronized, if not update email in DB to match auth info
                let currentUserDBEntry = context.rootState.users[payload.uid];
                if (currentUserDBEntry) {
                    if (payload.email !== currentUserDBEntry.email) firebaseHelpers.updateUserEmailDBEntry(payload.uid, payload.email);
                }
            },
            signup(context, payload) {
                // create user & follow with user entry
                context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'await - user creation'));
                auth.createUserWithEmailAndPassword(payload.email, payload.password).then(function(user) {
                    context.commit('updateAsyncTransaction', new asyncFeedback.AsyncState('signup', 'await - user profile creation'));

                    let userMetaData = new UserProfile(payload.firstname, payload.lastname, payload['famous-quote'], payload.email);
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
                let dbSnapshotUpdateCallbackBuilder = mutationName => {
                    return function(snapshot) {
                        let dbUpdate = snapshot.val();
                        if (dbUpdate !== null) context.commit(mutationName, dbUpdate);
                    };
                };

                let tempUID = (payload && payload.uid)
                    ? payload.uid
                    : (context.state.currentFirebaseUser && context.state.currentFirebaseUser.uid)
                    ? context.state.currentFirebaseUser.uid
                    : null;

                if (payload !== null) {
                    // console.info('user connected: ', payload);

                    // email synchronization checkup
                    context.dispatch('updateUserEmail', payload);

                    // setup updates listeners
                    firebaseHelpers.onAllUsersChange(usersUpdateCallback);
                    firebaseHelpers.onAllMoodsChange(dbSnapshotUpdateCallbackBuilder('updateMoods'));
                    firebaseHelpers.onDayMoodsChange(dbSnapshotUpdateCallbackBuilder('updateDaysMoods'));
                    firebaseHelpers.onWeekMoodsChange(dbSnapshotUpdateCallbackBuilder('updateWeekMoods'));
                    // use new uid from payload or old from model, if not present skip this listener --> temp uid
                    if (tempUID) firebaseHelpers.onAchievementsChange(dbSnapshotUpdateCallbackBuilder('updateAchievements'), tempUID);
                } else {
                    // console.info('user disconnected: ', payload);

                    // close updates listeners
                    firebaseHelpers.onAllUsersChange(usersUpdateCallback, true);
                    firebaseHelpers.onAllMoodsChange(dbSnapshotUpdateCallbackBuilder('updateMoods'), true);
                    firebaseHelpers.onDayMoodsChange(dbSnapshotUpdateCallbackBuilder('updateDaysMoods'), true);
                    firebaseHelpers.onWeekMoodsChange(dbSnapshotUpdateCallbackBuilder('updateWeekMoods'), true);
                    // use new uid from payload or old from model, if not present skip this listener --> temp uid
                    if (tempUID) firebaseHelpers.onAchievementsChange(dbSnapshotUpdateCallbackBuilder('updateAchievements'), tempUID, true);

                    // clean local storage
                    LSHelpers.removeLocalyStoredData();

                    // navigate back to home
                    router.push('/');
                }
                context.commit('updateAuthUser', payload);

                // trigger cutom avatar achievement check
                context.dispatch('achievementsUtils/updateCustomAvatarAchievement');
            },
            initialAuthDone(context) {
                context.commit('initialAuthDone');

                // at first authentication initialize notification check for subscription
                context.dispatch('notifications/initialSubscriptionCheck');
            }
        }
    };
};

class UserProfile {
    constructor(firstname, lastname, motto, email) {
        if (firstname && lastname && motto && email) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.motto = motto;
            this.email = email;
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
