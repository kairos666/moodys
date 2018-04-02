/**
 * a function that provides an array of new achievements titles by comparing previous/next achievements list
 * @param {Object} oldBadgesObject
 * @param {Object} newBadgesObject
 * @return {Object}
 */
let BadgesDifferer = function(oldBadgesObject, newBadgesObject) {
    // remove badges that are already achieved
    let missingBadges = Object.keys(oldBadgesObject).filter(badgeTitle => (!oldBadgesObject[badgeTitle]));

    // remove badges that are not achieved or counters
    let freshAchievedBadges = Object.keys(newBadgesObject).filter(badgeTitle => (typeof newBadgesObject[badgeTitle] === 'boolean' && newBadgesObject[badgeTitle]));

    // intersection between those two arrays are the newly achieved badges
    return missingBadges.filter(badgeTitle => freshAchievedBadges.includes(badgeTitle));
};

/**
 * function that remove counters from badgesData
 * @param {Object} originalBadgesData
 * @return {Object}
 */
let cleanupBadgesObject = function(originalBadgesData) {
    let toBeDeletedProperties = Object.keys(originalBadgesData).filter(badgeTitle => (typeof originalBadgesData[badgeTitle] !== 'boolean'));
    let clone = Object.assign({}, originalBadgesData);
    toBeDeletedProperties.forEach(badgeTitle => {
        delete clone[badgeTitle];
    });

    return clone;
};

export {
    BadgesDifferer,
    cleanupBadgesObject
};
