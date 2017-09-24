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

/**
 * get label and related timestamps for date range
 * @param {String} scope can be day | week | month
 * @param {timestamp} referenceDate date from which scope is applied, if undefined take current date
 * @return {Object} get range object (label, array with 2 values min timestamp, max timestamp)
 */
let getDateRange = function(scope, referenceDate) {
    let result = {
        label: '',
        range: []
    };
    let min;
    let max;

    switch (scope) {
    case 'day':
        if (!referenceDate) {
            // today
            min = moment().startOf('date');
            max = moment().endOf('date');
            result.label = min.format('dddd Do MMM YYYY');
        } else {
            // reference day
            min = moment(referenceDate).startOf('date');
            max = moment(referenceDate).endOf('date');
            result.label = min.format('dddd Do MMM YYYY');
        }
        break;
    case 'week':
        if (!referenceDate) {
            // current week
            min = moment().startOf('isoweek');
            max = moment().endOf('isoweek').subtract(2, 'days');
            result.label = `${min.format('Do MMM')} - ${max.format('Do MMM')}`;
        } else {
            // reference week
            min = moment(referenceDate).startOf('isoweek');
            max = moment(referenceDate).endOf('isoweek').subtract(2, 'days');
            result.label = `${min.format('Do MMM')} - ${max.format('Do MMM')}`;
        }
        break;
    case 'month':
        if (!referenceDate) {
            // current month (without week ends)
            min = moment().startOf('month');
            max = moment().endOf('month');
            result.label = min.format('MMMM YYYY');
        } else {
            // reference month
            min = moment(referenceDate).startOf('month');
            max = moment(referenceDate).endOf('month');
            result.label = min.format('MMMM YYYY');
        }
        break;
    }
    result.range = [min.unix() * 1000, max.unix() * 1000];

    return result;
};

export default {
    currentDayTimestamp: currentDayTimestamp,
    currentWeekTimestamps: currentWeekTimestamps,
    isWeekEnd: isWeekEnd,
    getDateRange: getDateRange
};
