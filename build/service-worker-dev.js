// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432

const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
// [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' ||
// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(
  /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
)
);

self.addEventListener('install', () => self.skipWaiting());

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
      console.log('Service Worker');
    });
  }
});

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });

  self.addEventListener('push', function(event) {
    console.log('Received push notif', event);
    var notificationTitle = 'Hello';
    var notificationOptions = {
      body: 'Thanks for sending this push msg.',
      tag: 'simple-push-demo-notification'
    };
  
    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
  });
});