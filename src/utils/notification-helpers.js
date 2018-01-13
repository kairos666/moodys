import EmojiHelpers from '@/utils/emoji-helpers';
import WebPushConfig from '@/config/web-push';
import moment from 'moment';
import Axios from 'axios';

/**
 * Mood Notif builder - Transform and extend notif object to fit web push format
 * @param {Object} moodToNotif
 * @return {NotifObject}
 */
let moodNotifBuilder = function(moodToNotif) {
    let emoji = EmojiHelpers.emojiData(moodToNotif.value);
    return {
        title: `${moodToNotif.firstname} ${moodToNotif.lastname}`,
        options: {
            body: `feels ${emoji.label.toUpperCase()}`,
            icon: `static/img/smileys/${emoji.image.replace('.svg', '.png')}`,
            badge: WebPushConfig.badgeIcon,
            image: moodToNotif.avatar.replace('?s=60&', '?'),
            tag: 'mood',
            data: {
                url: WebPushConfig.notifClickedURL,
                uid: moodToNotif.uid
            }
        }
    };
};

/**
 * Execute Xhr request for web push to moodys backend
 * @param {NotifObject} requestBody
 * @return {Promise}
 */
let pFireNotif = function(requestBody) {
    let requestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    requestConfig.headers[WebPushConfig.apiServerKeyHeaderName] = WebPushConfig.apiServerKey;

    return Axios.post(
        WebPushConfig.serverURL,
        requestBody,
        requestConfig
    );
};

/**
 * Filter daymoods to select the ONE that is eligible for notification (in-app and push notification)
 * filter heuristic 1 - consider only values that are less than 1 minute old
 * filter heuristic 2 - consider only newest value
 * @param {Mood[]} newDayMoods
 * @return {Mood|null}
 */
let filterEligibleDyaMoodsChangesForNotification = function(newDayMoods) {
    const thresholdTimestamp = moment().subtract(1, 'minutes').unix() * 1000;

    // apply heuristics 1 - filter out too old day moods updates
    let moodToNotif = (newDayMoods) ? Object.keys(newDayMoods).map(uid => newDayMoods[uid]).filter(dayMoods => (dayMoods.timestamp > thresholdTimestamp)) : [];

    // apply heuristic 2 - keep only one value (several updates would each trigger an update event anyway)
    if (moodToNotif.length >= 2) {
        // reduce if 2 entries or more
        moodToNotif = moodToNotif.reduce((a, b) => {
            return (a.timestamp > b.timestamp) ? a : b;
        });
    } else if (moodToNotif.length === 1) {
        // only one entry case
        moodToNotif = moodToNotif[0];
    } else {
        // no valid entry case
        moodToNotif = null;
    }

    return moodToNotif;
};

export default {
    moodNotifBuilder: moodNotifBuilder,
    pFireNotif: pFireNotif,
    filterEligibleDyaMoodsChangesForNotification: filterEligibleDyaMoodsChangesForNotification
};
