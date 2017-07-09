import Vue from 'vue';
import Router from 'vue-router';
import UsersView from '@/components/UsersView';
import InputUserView from '@/components/InputUserView';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'users',
            component: UsersView
        },
        {
            path: '/mood-input/:id',
            name: 'mood-input',
            component: InputUserView,
            props: true
        }
    ]
});
