/**
 * Get the timestamp for the current day 00:00:00
 */
let getCurrentDateAtZeroHour = function() {
    let now = new Date();
    let then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0, 0, 0
    );

    return then.getTime();
};

/**
 * Get only relevant moods for the day
 * @param {Array} allMoods Array containing all the moods
 * @param {Boolean} sortByLatest if true, sort by recency
 * @return {Array} relevant moods array for today
 */
let filterMoodsOfTheDay = function(allMoods, sortByLatest) {
    let todayStamp = getCurrentDateAtZeroHour();
    // clone array, reverse (latest to oldest), find first item older than today, cut today's part
    let cloneMoods = allMoods.slice(0);
    let thresholdIndex = cloneMoods.reverse().findIndex(el => (el.timestamp < todayStamp));

    // cut and recency
    // console.log(allMoods.slice(13).reverse().map(el => el.timestamp));
    // cut and chronological
    // console.log(allMoods.slice(13).map(el => el.timestamp));
    if (!sortByLatest) return allMoods.slice(thresholdIndex);
    return allMoods.slice(thresholdIndex).reverse();
};

/**
 * get specific user currently set mood
 * @param {String} userId unique user identifier
 * @param {Array} allMoods Array containing all the moods
 * @return {Object | undefined} relevant mood if available
 */
let getUserCurrentMood = function(userId, allMoods) {
    // console.log(allMoods.child(userId).orderByChild('timestamp').limitToLast(1));
    console.log(allMoods);
    let todayMoods = filterMoodsOfTheDay(allMoods, true);
    let latestMood = todayMoods.find(el => (el.userId === userId));

    return latestMood;
};

export {
    getCurrentDateAtZeroHour,
    filterMoodsOfTheDay,
    getUserCurrentMood
};
