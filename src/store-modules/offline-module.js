import { EventBus, NotificationEvt } from '@/utils/events-bus';

let offlineModule = database => {
    return {
        namespaced: true,
        state: {
            isDBOnline: false
        },
        mutations: {
            updateDBConnectionStatus(state, payload) {
                state.isDBOnline = payload;
            }
        },
        actions: {
            updateDBConnectionStatus(context, payload) {
                context.commit('updateDBConnectionStatus', payload);

                // generate notification
                let evt = new NotificationEvt((payload) ? 'onlineDB' : 'offlineDB');
                EventBus.$emit(evt.type, evt);
            }
        }
    };
};

export default {
    offlineStore: offlineModule
};
