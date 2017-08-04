import moodsConfig from '@/config/moods';
let firebaseDB;

/**
 * initialize FirebaseDatabase ref for all helpers
 * @param {FirebaseDatabase} fDB
 */
let initialize = function(fDB) {
    firebaseDB = fDB;
};

/* USERS */
/**
 * get once all users
 * @return {Promise}
 */
let getAllUsers = function() {
    return firebaseDB.ref('users').once('value');
};

/**
 * get notified on all users updates
 * @param {function(FirebaseSnapshot)} cb
 * @param {Boolean} isToBeShutDown
 */
let onAllUsersChange = function(cb, isToBeShutDown) {
    if (!isToBeShutDown) {
        firebaseDB.ref('users').on('value', cb);
    } else {
        firebaseDB.ref('users').off('value', cb);
    }
};

/* MOODS */
/**
 * get once all moods
 * @return {Promise}
 */
let getAllMoods = function() {
    return firebaseDB.ref('moods').orderByKey().once('value');
};

/**
 * get current mood from uid user
 * @param {Object} moodsObj
 * @param {String} uid
 * @return {String|null} current mood of this user
 */
let getCurrentMood = function(moodsObj, uid) {
    // get timestamp limit for today
    let now = new Date();
    let timestampThresholdForToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // get registered timestamps sorted from newer to older
    let sortedKeys = Object.keys(moodsObj).reverse();

    // get registered timestamps sorted and limited to today entries
    let relevantKeysIndexThreshold = sortedKeys.findIndex(timestamp => (timestamp < timestampThresholdForToday));
    let relevantKeys = (relevantKeysIndexThreshold !== -1) ? sortedKeys.splice(0, relevantKeysIndexThreshold) : sortedKeys;

    // extract user current mood (if exists)
    if (relevantKeys.length !== 0) {
        let foundMood = relevantKeys.map(timestamp => moodsObj[timestamp]).find(item => (item.uid === uid));
        // return value corresponding to uid user
        if (foundMood) return foundMood.value;
    }

    // otherwise return the no data value
    return null;
};

/**
 * get notified on all moods updates
 * @param {function(FirebaseSnapshot)} cb
 * @param {Boolean} isToBeShutDown
 */
let onAllMoodsChange = function(cb, isToBeShutDown) {
    if (!isToBeShutDown) {
        firebaseDB.ref('moods').orderByKey().on('value', cb);
    } else {
        firebaseDB.ref('moods').orderByKey().off('value', cb);
    }
};

/**
 * add mood entry
 * @param {String} moodIndex
 * @param {String} userId
 */
let addMoodEntry = function(moodIndex, userId) {
    if (moodsConfig.moodIndexes.includes(moodIndex)) {
        // mood entry
        let timestamp = Date.now();
        let moodEntry = { value: moodIndex, timestamp: timestamp, uid: userId };

        // send to firebase
        firebaseDB.ref(`moods/${timestamp}`).set(moodEntry);
    } else {
        throw new Error(`Try to update user ${userId}'s mood with invalid index: ${moodIndex}`);
    }
};

/**
 * add user metadata corresponding to user account (in addition to email and password)
 * @param {String} userID
 * @param {Object} userMetaData
 */
let setUserEntry = function(userID, userMetaData) {
    return firebaseDB.ref(`users/${userID}`).set(userMetaData);
};

/**
 * transform users database response in users array (optional parameter currentUserID)
 * @param {Object} usersObj
 * @param {String} currentUserId
 * @param {Object} object with moods entry
 * @return {Array} user full detailed entries
 */
let formatUsersToArray = function(usersObj, currentUserID, moods) {
    let resultArray = [];

    let uidKeys = Object.keys(usersObj);
    uidKeys.forEach(uid => {
        // build user object
        let resultUser = {
            id: uid,
            currentMood: getCurrentMood(moods, uid),
            isCurrentUser: (currentUserID && uid === currentUserID),
            firstname: usersObj[uid].firstname,
            lastname: usersObj[uid].lastname,
            motto: usersObj[uid].motto,
            avatar: `https://api.adorable.io/avatars/60/${uid}@adorable.png`
        };

        // fill array
        resultArray.push(resultUser);
    });

    return resultArray;
};

export default {
    initialize: initialize,
    getAllMoods: getAllMoods,
    getCurrentMood: getCurrentMood,
    getAllUsers: getAllUsers,
    onAllMoodsChange: onAllMoodsChange,
    onAllUsersChange: onAllUsersChange,
    addMoodEntry: addMoodEntry,
    setUserEntry: setUserEntry,
    formatUsersToArray: formatUsersToArray
};
