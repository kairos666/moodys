import Vue from 'vue';
import Router from 'vue-router';
import firebaseService from '@/services/firebase-service';
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
    let user = firebaseService.firebaseActions.getCurrentUser();
    console.log(to);
    console.log(user);
    console.info('is public nav: ', (!routeRuleFinder(to.name)));
    console.info('is authenticated nav: ', (routeRuleFinder(to.name) === accessRules.authenticatedUser && user !== null));
    console.info('is specific auth nav: ', (routeRuleFinder(to.name) === accessRules.authenticatedSpecificUserOrAdmin && user !== null));
    // public pages
    if (!routeRuleFinder(to.name)) {
        next();
        return;
    }

    // let user = firebaseService.firebaseActions.getCurrentUser();
    // all authenticated users
    if (routeRuleFinder(to.name) === accessRules.authenticatedUser && user !== null) {
        next();
        return;
    }

    // specific authenticated user
    if (routeRuleFinder(to.name) === accessRules.authenticatedSpecificUserOrAdmin && user !== null) {
        if (to.params.id === user.uid) {
            next();
            return;
        } else {
            console.warn('TODO handle access block');
            next(false);
        }
    }

    // need authentication and none was provided, go to sign in/up
    if (routeRuleFinder(to.name) && user === null) {
        console.warn('TODO sign in/up page');
        next('/authenticate');
    }
});

export default VueRouter;
