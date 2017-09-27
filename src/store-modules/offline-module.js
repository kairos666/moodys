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
                context.dispatch('notify', { subType: (payload) ? 'onlineDB' : 'offlineDB' }, { root: true });
            }
        }
    };
};

export default {
    offlineStore: offlineModule
};
