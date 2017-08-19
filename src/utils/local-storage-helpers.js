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
    weekMoods: 'week-moods'
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
let getDayMoods = () => getLS(storageKeys.dayMoods);
let setDayMoods = (dataObj) => setLS(storageKeys.dayMoods, dataObj);
let removeDayMoods = () => removeLS(storageKeys.dayMoods);

/* WEEK MOODS */
let getWeekMoods = () => getLS(storageKeys.weekMoods);
let setWeekMoods = (dataObj) => setLS(storageKeys.weekMoods, dataObj);
let removeWeekMoods = () => removeLS(storageKeys.weekMoods);

/* GENERAL */
let getAll = () => {
    let result = {
        users: getAllUsers(),
        moods: getAllMoods(),
        dayMoods: getDayMoods(),
        weekMoods: getWeekMoods()
    };

    return result;
};
let setAll = (usersData, moodsData, dayMoodsData, weekMoodsData) => {
    let resultUsers = setAllUsers(usersData);
    let resultMoods = setAllMoods(moodsData);
    let resultDayMoods = setDayMoods(dayMoodsData);
    let resultWeekMoods = setWeekMoods(weekMoodsData);

    return (resultUsers && resultMoods && resultDayMoods && resultWeekMoods);
};
let removeLocalyStoredData = () => {
    let resultUsers = removeAllUsers();
    let resultMoods = removeAllMoods();
    let resultDayMoods = removeDayMoods();
    let resultWeekMoods = removeWeekMoods();

    return (resultUsers && resultMoods && resultDayMoods && resultWeekMoods);
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
    getAll: getAll,
    setAll: setAll,
    removeLocalyStoredData: removeLocalyStoredData
};
