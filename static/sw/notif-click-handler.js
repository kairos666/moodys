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

    // ajax call to backend special events
    let ajaxConfig = _config.achievementsbackend;
    let pajax = fetch(`${ajaxConfig.baseURL}/${ajaxConfig.endPoints.specialEvts}`, {
        mode: 'cors',
        method: 'post',
        headers: ajaxConfig.baseHeaders,
        body: ajaxConfig.bodyBuilder('notification-click', 'notif-action', event.notification.data.uid, event.notification.data.toUid, event.notification.data.pushTimestamp)
    }).then(() => {
        console.log('successful backend service call from SW');
        return Promise.resolve();
    }).catch(() => {
        console.log('failed backend service call from SW');
        // make it a success anyway - we only need the service worker to be active until it is resolved
        return Promise.resolve();
    });

    event.waitUntil(
        Promise.all([
            clickResponsePromise,
            pajax
        ])
    );
});