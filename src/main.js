// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VeeValidateConfig from './config/form-validation';

Vue.config.productionTip = false;
Vue.use(VeeValidate, VeeValidateConfig);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: { App }
});
