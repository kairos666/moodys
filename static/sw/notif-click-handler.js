// push notifications click behavior
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    let clickResponsePromise = Promise.resolve();
    if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.matchAll().then(function(clis) {
        if (event.notification.data && event.notification.data.url) {
            let visibleClient = clis.find(function(c) {
            return c.visibilityState === 'visible';
            });
            if (visibleClient !== undefined) {
            // display the page in the visible client
            visibleClient.navigate(event.notification.data.url);
            return visibleClient.focus();
            } else {
            // there are no visible windows. Open one.
            return clients.openWindow(event.notification.data.url);
            }
        }
        event.notification.close();
        });
    };

    event.waitUntil(clickResponsePromise);
});
