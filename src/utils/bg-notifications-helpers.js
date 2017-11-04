/**
 * Background notifications (FCM + service worker dependent)
 */
const NotificationObj = window.Notification;

let pNotificationsPermission = function() {
    // for older browsers
    if (!NotificationObj) return Promise.reject('Notifications aren\'t supported in this browser');

    // resolve: permission granted = true, permission denied or dismissed = false
    return NotificationObj.requestPermission().then(result => (result === 'granted') ? Promise.resolve(true) : Promise.resolve(false));
};

export default {
    pNotificationsPermission: pNotificationsPermission
};
