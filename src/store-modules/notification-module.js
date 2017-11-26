import FirebaseHelpers from '@/utils/firebase-helpers';
const vapidPublicKey = 'BFx9xYoe2fg5q3j0GUTgbL59MdxMmOIdX0KTRYpntTnIKaZCH0YIObpCo71sX8PiEkliXeYQtQeHZl_PxmC-bYA';
/**
 * format vapid key for binding to subscription
 * @param {String} base64String
 * @returns {Uint8Array}
 */
let urlBase64ToUint8Array = function(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+') // eslint-disable-line no-useless-escape
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

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
    const subscriptionStatus = await registration.pushManager.permissionState({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) });
    // possible values "granted", "prompt", "denied"
    return subscriptionStatus;
};

/**
 * get push manager subscription
 * @returns {Promise}
 */
let pSubscription = async function() {
    const registration = await pRegistration();
    const subscription = await registration.pushManager.getSubscription();

    return subscription;
};

/**
 * push manager subscribe
 * @returns {Promise}
 */
let pSubscribe = async function() {
    const registration = await pRegistration();
    const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) });

    return subscription;
};

/**
 * push manager unsubscribe
 * @returns {Promise}
 */
let pUnsubscribe = async function() {
    const subscription = await pSubscription();

    return subscription.unsubscribe();
};

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
                        pSubscription().then(subscription => {
                            FirebaseHelpers.setNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid, subscription.toJSON());
                        });
                    } else {
                        // remove subscription
                        FirebaseHelpers.removeNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid);
                    }
                }).catch(() => {
                    context.commit('initializeNotifStatus');
                });
            },
            notificationActivationToggle(context) {
                if (context.getters.notifEnabled) {
                    // unsubscribe notifications
                    pUnsubscribe().then(() => {
                        // update status
                        pSubscriptionStatus().then(status => { context.commit('notifStatusUpdate', status) });
                        // update DB
                        FirebaseHelpers.removeNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid);
                    });
                } else {
                    // subscribe notifications
                    pSubscribe().then(subscription => {
                        // update status
                        pSubscriptionStatus().then(status => { context.commit('notifStatusUpdate', status) });
                        // update DB
                        FirebaseHelpers.setNotificationsSubscriptionEntry(context.rootState.auth.currentFirebaseUser.uid, subscription.toJSON());
                    });
                }
            }
        }
    };
};

export default {
    notificationStore: notificationModule
};
