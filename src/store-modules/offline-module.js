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
            }
        }
    };
};

export default {
    offlineStore: offlineModule
};
