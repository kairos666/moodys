import emojiHelpers from '@/utils/emoji-helpers';
import moment from 'moment';
import timeHelpers from '@/utils/time-helpers';

/**
 * Aggregate mood data for the whole week
 * @param {MoodEntries} moods firebase week moods entries
 * @param {String[]} stampTargets use only related dates
 * @param {String} usersID target specific user by ID
 * @return {Object} contains userID, week average, moods sorted by day of the week
 */
let userWeekMoodFormat = function(moods, stampTargets, usersID) {
    let result = {
        uid: '',
        weekAverage: null,
        weekMoods: []
    };

    // set ID
    result.uid = usersID;

    // set week moods
    let weekMoods = stampTargets.map(dayStamp => {
        // map day entries
        let weekDayEntry = moods[dayStamp];
        if (weekDayEntry) return weekDayEntry;
        return null;
    }).map(weekDayEntry => {
        // skip null entries
        if (!weekDayEntry) return null;
        // filter out irrelevant data
        let currentUserDayEntry = weekDayEntry[usersID];
        if (currentUserDayEntry) return currentUserDayEntry.value;
        return null;
    });
    result.weekMoods = weekMoods;

    // calculate week average
    let averageTempArray = weekMoods.filter(item => (item !== null && item !== 'sick' && item !== 'holiday'))
        .map(item => parseInt(item));

    if (averageTempArray.length !== 0) {
        result.weekAverage = '' + Math.round(averageTempArray.reduce((a, b) => {
            return a + b;
        }, 0) / averageTempArray.length);
    }

    return result;
};

let averageWeekMoodFormat = function(moods, stampTargets) {
    let result = {
        weekAverage: null,
        weekMoods: []
    };

    // set week moods
    let weekMoods = stampTargets.map(dayStamp => {
        // map day entries
        let weekDayEntry = moods[dayStamp];
        if (weekDayEntry) return weekDayEntry;
        return null;
    }).map(weekDayEntry => {
        // skip null entries
        if (!weekDayEntry) return null;
        // average day entry
        let averageTempArray = Object.keys(weekDayEntry).map(uid => {
            return weekDayEntry[uid].value;
        }).filter(item => (item !== null && item !== 'sick' && item !== 'holiday')).map(item => parseInt(item));

        return Math.round(averageTempArray.reduce((a, b) => {
            return a + b;
        }, 0) / averageTempArray.length);
    });
    result.weekMoods = weekMoods;

    // calculate week average
    let averageTempArray = weekMoods.filter(item => (item !== null && item !== 'sick' && item !== 'holiday'))
        .map(item => parseInt(item));

    if (averageTempArray.length !== 0) {
        result.weekAverage = '' + Math.round(averageTempArray.reduce((a, b) => {
            return a + b;
        }, 0) / averageTempArray.length);
    }

    return result;
};

class CompletionObject {
    constructor(completionRate, respondentNb, totalUserNb) {
        this.completionRate = completionRate;
        this.respondentNb = respondentNb;
        this.totalUserNb = totalUserNb;
    }
}

let statsModule = {
    getters: {
        averageMoodObject(state, getters) {
            // today's user moods sorted by value (without holiday|sick|null values)
            let sortedArray = getters.usersArray
                .filter(item => (item.currentMood !== null && item.currentMood !== 'sick' && item.currentMood !== 'holiday'))
                .map(item => parseInt(item.currentMood))
                .sort();

            let averageCalculator = function(src) {
                // early stopping if no data
                if (src.length === 0) return null;

                let moodLength = src.length;
                return Math.round(src.reduce((a, b) => a + b, 0) / moodLength);
            };
            let average = averageCalculator(sortedArray);
            let result = (average !== null) ? emojiHelpers.emojiData(average.toString()) : emojiHelpers.emojiData(average);

            return result;
        },
        todayCompletionObject(state, getters, rootState) {
            // total nb of users
            let totalUsers = getters.usersArray.length;
            // total nb of today's respondents
            let respondentUsers = Object.keys(rootState.daysmoods).length;
            let completionRate = Math.round((respondentUsers / totalUsers) * 100);

            return new CompletionObject(completionRate, respondentUsers, totalUsers);
        },
        currentUserWeekMoods(state, getters, rootState) {
            let targetDaysStamps = timeHelpers.currentWeekTimestamps(timeHelpers.isWeekEnd);
            if (rootState.auth.currentFirebaseUser && rootState.weekmoods) {
                // when enough data is available
                return userWeekMoodFormat(rootState.weekmoods, targetDaysStamps, rootState.auth.currentFirebaseUser.uid);
            } else {
                // default if no data is available
                return {
                    uid: '',
                    weekAverage: null,
                    weekMoods: []
                };
            }
        },
        averageWeekMoods(state, getters, rootState) {
            let targetDaysStamps = timeHelpers.currentWeekTimestamps(timeHelpers.isWeekEnd);
            if (rootState.auth.currentFirebaseUser && rootState.weekmoods) {
                // when enough data is available
                return averageWeekMoodFormat(rootState.weekmoods, targetDaysStamps);
            } else {
                // default if no data is available
                return {
                    weekAverage: null,
                    weekMoods: []
                };
            }
        },
        averageTodayMoods(state, getters, rootState) {
            let dayStamp = moment().startOf('date').unix() * 1000;
            let todayEntries = rootState.weekmoods[dayStamp.toString()];
            if (!todayEntries) return null;

            let averageTempArray = Object.keys(todayEntries).map(uid => {
                return todayEntries[uid].value;
            })
            .filter(item => (item !== null && item !== 'sick' && item !== 'holiday')).map(item => parseInt(item));

            return '' + Math.round(averageTempArray.reduce((a, b) => {
                return a + b;
            }, 0) / averageTempArray.length);
        }
    }
};

export default statsModule;
