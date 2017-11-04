import Vue from 'vue';
import snackBarMessages from '@/config/snack-bar-messages';

export const EventBus = new Vue();

// foreground notification type event
export class NotificationEvt {
    constructor(subType, options) {
        this.type = 'notifications';
        this.subType = subType;
        this.options = options;
        this.content = snackBarMessages[subType](options);
    }
}
