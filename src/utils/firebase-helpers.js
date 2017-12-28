import moodsConfig from '@/config/moods';
import moment from 'moment';
import timeHelpers from '@/utils/time-helpers';
import md5 from 'blueimp-md5';
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
 * @param {Object} daysmoodsObj
 * @param {String} uid
 * @return {String|null} current mood of this user
 */
let getCurrentMood = function(daymoodsObj, uid) {
    // find, if exists, relevant entry in object
    let foundUserEntryForTheDay = Object.keys(daymoodsObj).find(item => (item === uid));
    if (foundUserEntryForTheDay !== undefined) return daymoodsObj[foundUserEntryForTheDay].value;
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
 * get notified on all day's moods updates
 * @param {function(FirebaseSnapshot)} cb
 * @param {Boolean} isToBeShutDown
 */
let onDayMoodsChange = function(cb, isToBeShutDown) {
    let dayTimestamp = timeHelpers.currentDayTimestamp();
    if (!isToBeShutDown) {
        firebaseDB.ref(`daysmoods/${dayTimestamp}`).orderByKey().on('value', cb);
    } else {
        firebaseDB.ref(`daysmoods/${dayTimestamp}`).orderByKey().off('value', cb);
    }
};

/**
 * get notified on all week's moods updates
 * @param {function(FirebaseSnapshot)} cb
 * @param {Boolean} isToBeShutDown
 */
let onWeekMoodsChange = function(cb, isToBeShutDown) {
    if (!isToBeShutDown) {
        firebaseDB.ref(`daysmoods`).orderByKey().limitToLast(7).on('value', cb);
    } else {
        firebaseDB.ref(`daysmoods`).orderByKey().limitToLast(7).off('value', cb);
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
        let timestamp = moment().unix() * 1000;
        let dayTimestamp = timeHelpers.currentDayTimestamp();
        let moodEntry = { value: moodIndex, dayTimestamp: dayTimestamp, timestamp: timestamp, uid: userId };

        // send to firebase - all moods
        firebaseDB.ref(`moods/${timestamp}`).set(moodEntry);
        // send to firebase - today's moods
        firebaseDB.ref(`daysmoods/${dayTimestamp}/${userId}`).set(moodEntry);
    } else {
        throw new Error(`Try to update user ${userId}'s mood with invalid index: ${moodIndex}`);
    }
};

/**
 * add user metadata corresponding to user account (in addition to email and password)
 * @param {String} userID
 * @param {Object} userMetaData
 * @return {Promise}
 */
let setUserEntry = function(userID, userMetaData) {
    return firebaseDB.ref(`users/${userID}`).set(userMetaData);
};

/**
 * update user email metadata corresponding to user account
 * @param {String} userID
 * @param {String} email
 * @return {Promise}
 */
let updateUserEmailDBEntry = function(userID, email) {
    return firebaseDB.ref(`users/${userID}`).update({ email: email });
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
            avatar: `https://www.gravatar.com/avatar/${md5(usersObj[uid].email)}?s=60&d=https://api.adorable.io/avatars/60/${uid}@adorable.png`
        };

        // fill array
        resultArray.push(resultUser);
    });

    return resultArray;
};

/* NOTIFICATIONS ENDPOINTS (no need to store this in local storage - only works if online) add fingerprinting in addition to uid because a user can have multiple subscriptions (browsers and devices) */
/**
 * set PushSubscription data related to user (will completely overwrite eventual previous node)
 * @param {String} userID
 * @param {PushSubscription} subscriptionData
 * @return {Promise}
 */
let setNotificationsSubscriptionEntry = function(userID, fingerPrint, subscriptionData) {
    return firebaseDB.ref(`notifsSubscriptionEntries/${userID}/${fingerPrint}`).set(subscriptionData);
};

/**
 * remove PushSubscription data related to user
 * @param {String} userID
 * @return {Promise}
 */
let removeNotificationsSubscriptionEntry = function(userID, fingerPrint) {
    return firebaseDB.ref(`notifsSubscriptionEntries/${userID}/${fingerPrint}`).remove();
};

export default {
    initialize: initialize,
    getAllMoods: getAllMoods,
    getCurrentMood: getCurrentMood,
    getAllUsers: getAllUsers,
    onAllMoodsChange: onAllMoodsChange,
    onAllUsersChange: onAllUsersChange,
    onDayMoodsChange: onDayMoodsChange,
    onWeekMoodsChange: onWeekMoodsChange,
    addMoodEntry: addMoodEntry,
    setUserEntry: setUserEntry,
    updateUserEmailDBEntry: updateUserEmailDBEntry,
    formatUsersToArray: formatUsersToArray,
    setNotificationsSubscriptionEntry: setNotificationsSubscriptionEntry,
    removeNotificationsSubscriptionEntry: removeNotificationsSubscriptionEntry
};
