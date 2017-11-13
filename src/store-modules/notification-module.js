import FirebaseHelpers from '@/utils/firebase-helpers';
/**
 * get SW registration
 * @returns {Promise}
 */
let pRegistration = async function() {
    // for older browsers
    if (!('navigator' in window) || !('serviceWorker' in window.navigator)) return Promise.reject('Service Workers aren\'t supported in this browser');

    // resolve: permission granted = true, permission denied or dismissed = false
    const registration = await window.navigator.serviceWorker.getRegistration();

    return (registration !== undefined) ? registration : Promise.reject('No Service Worker was registered');
};

/**
 * get push manager subscription status
 * @returns {Promise}
 */
let pSubscriptionStatus = async function() {
    const registration = await pRegistration();
    const subscriptionStatus = await registration.pushManager.permissionState({ userVisibleOnly: true, applicationServerKey: 'TODO' });
    // possible values "granted", "prompt", "denied"
    return subscriptionStatus;
};

/**
 * get push manager subscription
 * @returns {Promise}
 */
// let pSubscription = async function() {
//     const registration = await pRegistration();
//     const subscription = await registration.pushManager.getSubscription();

//     return subscription;
// };

/**
 * push manager subscribe
 * @returns {Promise}
 */
// let pSubscribe = async function() {
//     const registration = await pRegistration();
//     const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: 'TODO' });

//     return subscription;
// };

/**
 * push manager unsubscribe
 * @returns {Promise}
 */
// let pUnsubscribe = async function() {
//     const subscription = await pSubscription();

//     return subscription.unsubscribe();
// };

let notificationModule = database => {
    return {
        namespaced: true,
        state: {
            notifStatus: 'prompt',
            isBrowserSupportOk: ('Notification' in window && 'navigator' in window && 'serviceWorker' in window.navigator),
            isSWRegistered: false,
            hasBeenInitialized: false
        },
        getters: {
            notifEnabled(state) { return (state.notifStatus === 'granted') }
        },
        mutations: {
            initializeNotifStatus(state) { state.hasBeenInitialized = true },
            SWRegistrationUpdate(state, payload) { state.isSWRegistered = payload },
            notifStatusUpdate(state, payload) { state.notifStatus = payload }
        },
        actions: {
            initialSubscriptionCheck(context) {
                pRegistration().then(reg => {
                    context.commit('SWRegistrationUpdate', true);
                }).catch(() => {
                    context.commit('SWRegistrationUpdate', false);
                });

                pSubscriptionStatus().then(status => {
                    // update subscription status and initialize
                    context.commit('notifStatusUpdate', status);
                    context.commit('initializeNotifStatus');

                    // push subscription to DB (if some changes were made offline this will update entry)
                    if (status === 'granted') {
                        // update subscription
                        FirebaseHelpers.setNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid, { pouet: 'bip' });
                    } else {
                        // remove subscription
                        FirebaseHelpers.removeNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid);
                    }
                }).catch(() => {
                    context.commit('initializeNotifStatus');
                });
            },
            notificationActivationToggle(context) {
                console.log('toggle');
            }
        }
    };
};

export default {
    notificationStore: notificationModule
};
