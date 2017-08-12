import moment from 'moment';

let currentWeekTimestamps = function() {
    let monday = moment().startOf('isoweek');
    let tuesday = moment().startOf('isoweek').add(1, 'days');
    let wednesday = moment().startOf('isoweek').add(2, 'days');
    let thursday = moment().startOf('isoweek').add(3, 'days');
    let friday = moment().startOf('isoweek').add(4, 'days');
    // let saturday = moment().startOf('isoweek').add(5, 'days');
    // let sunday = moment().startOf('isoweek').add(6, 'days');

    return [monday.unix(), tuesday.unix(), wednesday.unix(), thursday.unix(), friday.unix()]
        .map(timestamp => timestamp * 1000);
};

export default {
    currentWeekTimestamps: currentWeekTimestamps
};
