import EmojiHelpers from '@/utils/emoji-helpers';

// messages that may be displayed in a snackbar
const snackBarMessages = {
    onlineDB: () => `<i class="material-icons">wifi</i> connected`,
    offlineDB: () => `<i class="material-icons">signal_wifi_off</i> disconnected`,
    moodUpdate: (options) => {
        let result;
        let moodObj = EmojiHelpers.emojiData(options.value);
        if (options.isCurrentUser) {
            // notify that change has been taken into account
            result = `<img class="avatar" src="${options.avatar}" alt=""/> You feel ${moodObj.label.toUpperCase()} <img width="60" height="60" class="mood" src="/static/img/smileys/${moodObj.image}" alt=""/>`;
        } else {
            // notify others that someone has updated his mood
            result = `<img class="avatar" src="${options.avatar}" alt=""/> ${options.firstname} ${options.lastname} feels ${moodObj.label.toUpperCase()} <img width="60" height="60" class="mood" src="/static/img/smileys/${moodObj.image}" alt=""/>`;
        }

        return result;
    },
    badgeUpdate: (options) => {
        return `<img class="badge-icon" src="static/img/badges/${options.badge}.svg" alt=""/> You achieved ${options.title.toUpperCase()}`;
    }
};

export default snackBarMessages;
