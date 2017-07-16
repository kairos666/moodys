// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import firebaseConfig from './config/firebase';
import firebaseService from './services/firebase-service';
import router from './router';
import VueResource from 'vue-resource';
import Vuefire from 'vuefire';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuefire);

// custom services
Vue.use(firebaseService, firebaseConfig);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    firebase: {
        users: firebaseService.database.ref('users'),
        moods: firebaseService.database.ref('moods')
    },
    router,
    template: '<App/>',
    components: { App },
    created() {
        /* post creation actions */
        // firebase service init
        firebaseService.init(this);
    }
});
