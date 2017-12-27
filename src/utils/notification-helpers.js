import EmojiHelpers from '@/utils/emoji-helpers';
import WebPushConfig from '@/config/web-push';

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

export default {
    moodNotifBuilder: moodNotifBuilder
};
