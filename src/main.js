// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from './services/firebase';
import VueResource from 'vue-resource';
import Vuefire from 'vuefire';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuefire);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    firebase: {
        users: firebase.database.ref('users'),
        moods: firebase.database.ref('moods')
    },
    router,
    template: '<App/>',
    components: { App }
});
