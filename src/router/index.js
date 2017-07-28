import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import accessRules from '@/config/access';
import UsersView from '@/components/UsersView';
import InputUserView from '@/components/InputUserView';
import HomeView from '@/components/HomeView';
import SignInView from '@/components/SignInView';
import ResetPassword from '@/components/ResetPassword';
import SignUp from '@/components/SignUp';
import Profile from '@/components/Profile';
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

let routeRuleFinder = function(routeName) {
    // public by default
    let rule = false;

    switch (routeName) {
    case 'users': rule = accessRules.authenticatedUser; break;
    case 'mood-input': rule = accessRules.authenticatedUser; break;
    case 'profile': rule = accessRules.authenticatedUser; break;
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
            path: '/sign-up',
            name: 'sign up',
            component: SignUp
        },
        {
            path: '/reset-password',
            name: 'reset password start',
            component: ResetPassword
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
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
        },
        {
            path: '*',
            name: '404',
            component: PageNotFound
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
        console.warn('TODO need to handle cases where user have bearer token but not yet authenticated --> trigger when navigating to guarded link to soon');
        next('/authenticate');
    }
});

export default VueRouter;
