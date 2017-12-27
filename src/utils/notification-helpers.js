import EmojiHelpers from '@/utils/emoji-helpers';
import WebPushConfig from '@/config/web-push';
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

export default {
    moodNotifBuilder: moodNotifBuilder,
    pFireNotif: pFireNotif
};
