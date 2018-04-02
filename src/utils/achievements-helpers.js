/**
 * a function that provides an array of new achievements titles by comparing previous/next achievements list
 * @param {Object} oldBadgesObject
 * @param {Object} newBadgesObject
 * @return {Object}
 */
let BadgesDifferer = function(oldBadgesObject, newBadgesObject) {
    // remove badges that are already achieved
    console.log('oldBadgesObject', oldBadgesObject);
    let missingBadges = oldBadgesObject.filter(badgeData => !badgeData.achieved);
    console.log('missingBadges', missingBadges);

    // remove badges that are not achieved or counters
    let freshAchievedBadges = Object.keys(newBadgesObject).filter(badgeTitle => (typeof newBadgesObject[badgeTitle] === 'boolean' && newBadgesObject[badgeTitle]));

    // intersection between those two arrays are the newly achieved badges
    return missingBadges.filter(badgeData => freshAchievedBadges.includes(badgeData.title));
};

export {
    BadgesDifferer
};
