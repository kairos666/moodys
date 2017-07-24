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

/**
 * add mood entry
 * @param {String} moodIndex
 * @param {String} userId
 */
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

/**
 * add user metadata corresponding to user account (in addition to email and password)
 * @param {String} userID
 * @param {Object} userMetaData
 */
let addUserEntry = function(userID, userMetaData) {
    return firebaseDB.ref('users').child(userID).push(userMetaData);
};

/**
 * transform users database response in users array
 * @param {Object} usersObj
 */
let formatUsersToArray = function(usersObj) {
    let resultArray = [];

    for (let userObj in usersObj) {
        // construct user obj
        let resultUser = { id: userObj };
        let key = Object.keys(usersObj[userObj])[0]; // take first uid key in object
        resultUser.firstname = usersObj[userObj][key].firstname;
        resultUser.lastname = usersObj[userObj][key].lastname;
        resultUser.motto = usersObj[userObj][key].motto;
        resultUser.avatar = `https://api.adorable.io/avatars/60/${resultUser.id}@adorable.png`;

        // fill array
        resultArray.push(resultUser);
    }

    return resultArray;
};

export default {
    initialize: initialize,
    getAllMoods: getAllMoods,
    getAllUsers: getAllUsers,
    onAllMoodsChange: onAllMoodsChange,
    onAllUsersChange: onAllUsersChange,
    addMoodEntry: addMoodEntry,
    addUserEntry: addUserEntry,
    formatUsersToArray: formatUsersToArray
};
