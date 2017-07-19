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
    return firebaseDB.ref('moods').orderByChild('timestamp').once('value');
};

/**
 * get notified on all moods updates
 * @param {function(FirebaseSnapshot)} cb
 * @param {Boolean} isToBeShutDown
 */
let onAllMoodsChange = function(cb, isToBeShutDown) {
    if (!isToBeShutDown) {
        firebaseDB.ref('moods').orderByChild('timestamp').on('value', cb);
    } else {
        firebaseDB.ref('moods').orderByChild('timestamp').off('value', cb);
    }
};

let addMoodEntry = function(moodIndex, userId) {
    if (moodsConfig.moodIndexes.includes(moodIndex)) {
        // mood entry
        let moodEntry = { value: moodIndex, timestamp: Date.now() };

        // send to firebase
        firebaseDB.ref('moods').child(userId).push(moodEntry);
    } else {
        throw new Error(`Try to update user ${userId}'s mood with invalid index: ${moodIndex}`);
    }
};

export default {
    initialize: initialize,
    getAllMoods: getAllMoods,
    getAllUsers: getAllUsers,
    onAllMoodsChange: onAllMoodsChange,
    onAllUsersChange: onAllUsersChange,
    addMoodEntry: addMoodEntry
};
