/**
 * Background notifications (FCM + service worker dependent)
 */
let pNotificationsPermission = async function() {
    // for older browsers
    if (!window.Notification) return Promise.reject('Notifications aren\'t supported in this browser');

    // resolve: permission granted = true, permission denied or dismissed = false
    const permission = await window.Notification.requestPermission();

    return (permission === 'granted') ? true : Promise.reject('Permission for Notifications was not granted');
};

let pRegistration = async function() {
    // for older browsers
    if (!window.navigator || !window.navigator.serviceWorker) return Promise.reject('Service Workers aren\'t supported in this browser');

    // resolve: permission granted = true, permission denied or dismissed = false
    const registration = await window.navigator.serviceWorker.getRegistration();

    return (registration !== undefined) ? registration : Promise.reject('No Service Worker was registered');
};

let pGenerateNotification = async function() {
    // act if permission is granted and registration object was found
    await pNotificationsPermission(); // may reject otherwise don't care of this
    const registration = await pRegistration();

    return registration;
};

export default {
    pGenerateNotification: pGenerateNotification
};
