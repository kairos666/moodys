import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: null,
        users: [],
        latestMoods: []
    }
});

export default store;
