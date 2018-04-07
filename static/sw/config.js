let _config = {
    pushbackend: {},
    achievementsbackend: {
        baseURL: 'https://achievements-moodysbackend.wedeploy.io',
        endPoints: {
            specialEvts: 'special-events-achievements'
        },
        baseHeaders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'XUocZ8HVQAsqz8273aEEmW75QPs7gjHIV9oKW36b'
        },
        bodyBuilder: function(achievementID, updateDtype, fromUID, toUID, timestamp) {
            return JSON.stringify({ achievementID: achievementID, updateType: updateDtype, originUID: fromUID, targetUID: toUID, pushTimestamp: timestamp });
        }
    }
};
