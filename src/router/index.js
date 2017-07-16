import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import accessRules from '@/config/access';
import UsersView from '@/components/UsersView';
import InputUserView from '@/components/InputUserView';
import HomeView from '@/components/HomeView';
import SignInView from '@/components/SignInView';

Vue.use(Router);

let routeRuleFinder = function(routeName) {
    // public by default
    let rule = false;

    switch (routeName) {
    case 'users': rule = accessRules.authenticatedUser; break;
    case 'mood-input': rule = accessRules.authenticatedSpecificUserOrAdmin; break;
    }

    return rule;
};

const VueRouter = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/authenticate',
            name: 'authenticate',
            component: SignInView
        },
        {
            path: '/users',
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

VueRouter.beforeEach((to, from, next) => {
    // public pages
    if (!routeRuleFinder(to.name)) {
        next();
        return;
    }

    // all authenticated users
    if (routeRuleFinder(to.name) === accessRules.authenticatedUser && store.getters.isAuthenticated) {
        next();
        return;
    }

    // specific authenticated user
    if (routeRuleFinder(to.name) === accessRules.authenticatedSpecificUserOrAdmin && store.getters.isAuthenticated) {
        if (to.params.id === store.state.currentFirebaseUser.uid) {
            next();
            return;
        } else {
            next(false);
        }
    }

    // need authentication and none was provided, go to sign in/up
    if (routeRuleFinder(to.name) && !store.getters.isAuthenticated) {
        next('/authenticate');
    }
});

export default VueRouter;
