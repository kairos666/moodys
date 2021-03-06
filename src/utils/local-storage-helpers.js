import moment from 'moment';

let isLocalStorageAvailableFinder = function() {
    // modernizr technic
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.warn('Local storage is unavailable');
        return false;
    }
};

/**
 * set some data in local storage
 * @param {String} key
 * @param {Object} value
 * @return {Boolean} action success status
 */
let setLS = function(key, value) {
    if (isLocalStorageAvailable) {
        localStorage.setItem(`${localStorageMasterKey}-${key}`, JSON.stringify(value));
        return true;
    }
    return false;
};

/**
 * get some data in local storage
 * @param {String} key
 * @return {Object} locally stored JSON object
 * @return {Object|Boolean} action success status
 */
let getLS = function(key) {
    if (isLocalStorageAvailable) {
        let result = localStorage.getItem(`${localStorageMasterKey}-${key}`);
        return (result) ? JSON.parse(result) : {};
    }
    return false;
};

/**
 * remove some data in local storage
 * @param {String} key
 * @return {Boolean} action success status
 */
let removeLS = function(key) {
    if (isLocalStorageAvailable) {
        localStorage.removeItem(`${localStorageMasterKey}-${key}`);
        return true;
    }
    return false;
};

const localStorageMasterKey = 'moody-storage';
const storageKeys = {
    users: 'users',
    moods: 'moods',
    dayMoods: 'day-moods',
    weekMoods: 'week-moods',
    achievements: 'user-achievements',
    posts: 'posts'
};
const isLocalStorageAvailable = isLocalStorageAvailableFinder();

/* USERS */
let getAllUsers = () => getLS(storageKeys.users);
let setAllUsers = (dataObj) => setLS(storageKeys.users, dataObj);
let removeAllUsers = () => removeLS(storageKeys.users);

/* MOODS */
let getAllMoods = () => getLS(storageKeys.moods);
let setAllMoods = (dataObj) => setLS(storageKeys.moods, dataObj);
let removeAllMoods = () => removeLS(storageKeys.moods);

/* DAY MOODS */
let getDayMoods = () => {
    // retrieve local storage unfiltered (may be older than 1 day)
    let dayMoods = getLS(storageKeys.dayMoods);
    if (!dayMoods) return dayMoods;

    // filter out entries that are too old
    let dayThreshold = moment().startOf('date').unix() * 1000;
    let toBeDeletedKeys = Object.keys(dayMoods).filter(uid => (dayMoods[uid].dayTimestamp < dayThreshold));
    toBeDeletedKeys.forEach(key => {
        delete dayMoods[key];
    });

    return dayMoods;
};
let setDayMoods = (dataObj) => setLS(storageKeys.dayMoods, dataObj);
let removeDayMoods = () => removeLS(storageKeys.dayMoods);

/* WEEK MOODS (no need to filter out older keys, this is done in statistics computations) */
let getWeekMoods = () => getLS(storageKeys.weekMoods);
let setWeekMoods = (dataObj) => setLS(storageKeys.weekMoods, dataObj);
let removeWeekMoods = () => removeLS(storageKeys.weekMoods);

/* ACHIEVEMENTS */
let getAchievements = () => getLS(storageKeys.achievements);
let setAchievements = (dataObj) => setLS(storageKeys.achievements, dataObj);
let removeAchievements = () => removeLS(storageKeys.achievements);

/* POSTS */
let getAllPosts = () => getLS(storageKeys.posts);
let setAllPosts = (dataObj) => setLS(storageKeys.posts, dataObj);
let removeAllPosts = () => removeLS(storageKeys.posts);

/* GENERAL */
let getAll = () => {
    let result = {
        users: getAllUsers(),
        moods: getAllMoods(),
        dayMoods: getDayMoods(),
        weekMoods: getWeekMoods(),
        achievements: getAchievements(),
        posts: getAllPosts()
    };

    return result;
};
let setAll = (usersData, moodsData, dayMoodsData, weekMoodsData, achievementsData, postsData) => {
    let resultUsers = setAllUsers(usersData);
    let resultMoods = setAllMoods(moodsData);
    let resultDayMoods = setDayMoods(dayMoodsData);
    let resultWeekMoods = setWeekMoods(weekMoodsData);
    let resultAchievements = setAchievements(achievementsData);
    let resultPosts = setAllPosts(postsData);

    return (resultUsers && resultMoods && resultDayMoods && resultWeekMoods && resultAchievements && resultPosts);
};
let removeLocalyStoredData = () => {
    let resultUsers = removeAllUsers();
    let resultMoods = removeAllMoods();
    let resultDayMoods = removeDayMoods();
    let resultWeekMoods = removeWeekMoods();
    let resultAchievements = removeAchievements();
    let resultPosts = removeAllPosts();

    return (resultUsers && resultMoods && resultDayMoods && resultWeekMoods && resultAchievements && resultPosts);
};

export default {
    getAllUsers: getAllUsers,
    setAllUsers: setAllUsers,
    getAllMoods: getAllMoods,
    setAllMoods: setAllMoods,
    getDayMoods: getDayMoods,
    setDayMoods: setDayMoods,
    getWeekMoods: getWeekMoods,
    setWeekMoods: setWeekMoods,
    getAchievements: getAchievements,
    setAchievements: setAchievements,
    removeAchievements: removeAchievements,
    getAllPosts: getAllPosts,
    setAllPosts: setAllPosts,
    getAll: getAll,
    setAll: setAll,
    removeLocalyStoredData: removeLocalyStoredData
};
