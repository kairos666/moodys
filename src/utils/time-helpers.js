import moment from 'moment';

/**
 * Week end checker
 * @return {Boolean} is today a week-end day
 */
let isWeekEnd = function() {
    if (moment().format('d') === '0' || moment().format('d') === '6') return true;
    return false;
};

/**
 * get current week days timestamps
 * @param {Boolean} isFullWeek include/exclude week-end days
 */
let currentWeekTimestamps = function(isFullWeek) {
    let monday = moment().startOf('isoweek');
    let tuesday = moment().startOf('isoweek').add(1, 'days');
    let wednesday = moment().startOf('isoweek').add(2, 'days');
    let thursday = moment().startOf('isoweek').add(3, 'days');
    let friday = moment().startOf('isoweek').add(4, 'days');
    let saturday = moment().startOf('isoweek').add(5, 'days');
    let sunday = moment().startOf('isoweek').add(6, 'days');

    if (!isFullWeek) {
        return [monday.unix(), tuesday.unix(), wednesday.unix(), thursday.unix(), friday.unix()]
            .map(timestamp => timestamp * 1000);
    } else {
        return [monday.unix(), tuesday.unix(), wednesday.unix(), thursday.unix(), friday.unix(), saturday.unix(), sunday.unix()]
            .map(timestamp => timestamp * 1000);
    }
};

/**
 * get start of the day timestamp
 * @return {Integer}
 */
let currentDayTimestamp = function() {
    return moment().startOf('date').unix() * 1000;
};

export default {
    currentDayTimestamp: currentDayTimestamp,
    currentWeekTimestamps: currentWeekTimestamps,
    isWeekEnd: isWeekEnd
};
