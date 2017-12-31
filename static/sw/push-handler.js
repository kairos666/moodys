// push notifications handler (generate actual notification when application is not into focus)
self.addEventListener('push', function(event) {
    console.info('received push', event);
    if (event.data) {
        const notifData = event.data.json();
        console.log(notifData);

        let pushResponsePromise = clients.matchAll().then(function(clis) {
        let focusedClient = clis.find(function(c) {
            return c.focused;
        });

        if (focusedClient === undefined) {
            // Show notification
            return self.registration.showNotification(notifData.title, notifData.options);
        } else {
            // Send a message to the page
            console.info('push prevented, application is already focused', notifData);
            return Promise.resolve();
        }
        })

        event.waitUntil(pushResponsePromise);
    }
});
