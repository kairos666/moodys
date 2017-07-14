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
    let thresholdIndex = allMoods.slice(0).reverse().findIndex(el => (el.timestamp < todayStamp));

    if (!sortByLatest) return allMoods.slice(0, thresholdIndex);
    return allMoods.slice(0, thresholdIndex).reverse();
};

/**
 * get specific user currently set mood
 * @param {String} userId unique user identifier
 * @param {Array} allMoods Array containing all the moods
 * @return {Object | undefined} relevant mood if available
 */
let getUserCurrentMood = function(userId, allMoods) {
    let todayMoods = filterMoodsOfTheDay(allMoods, true);
    let latestMood = todayMoods.find(el => (el.userId === userId));

    return latestMood;
};

export {
    getCurrentDateAtZeroHour,
    filterMoodsOfTheDay,
    getUserCurrentMood
};
