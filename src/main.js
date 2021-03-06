// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VeeValidateConfig from './config/form-validation';

Vue.config.productionTip = false;
Vue.use(VeeValidate, VeeValidateConfig);

// ignore web components defined components (all waf-xxxx components)
Vue.config.ignoredElements = [
    /^waf-/,
    'waf-tab'
];

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: { App }
});
