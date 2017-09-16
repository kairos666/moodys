import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import accessRules from '@/config/access';
import HomeView from '@/components/HomeView';
const UsersView = () => import('@/components/UsersView');
const InputUserView = () => import('@/components/InputUserView');
const SignInView = () => import('@/components/SignInView');
const ResetPassword = () => import('@/components/ResetPassword');
const SignUp = () => import('@/components/SignUp');
const Profile = () => import('@/components/Profile');
const PageNotFound = () => import('@/components/PageNotFound');
const InitialLoading = () => import('@/components/InitialLoading');

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
        { path: '/index.html', redirect: { name: 'home' } },
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
            path: '/mood-input',
            name: 'mood-input',
            component: InputUserView
        },
        {
            path: '/loading',
            name: 'initial-loading',
            component: InitialLoading
        },
        {
            path: '*',
            name: '404',
            component: PageNotFound
        }
    ]
});

let delayFirstNavigation = (to, router, storeInstance) => {
    // react to change
    storeInstance.watch(
        state => state.auth.isInitalAuthDone,
        value => {
            if (value) router.push(to.path);
        }
    );
};

VueRouter.beforeEach((to, from, next) => {
    if (!store.state.auth.isInitalAuthDone && to.name !== 'initial-loading') {
        delayFirstNavigation(to, VueRouter, store);

        // cancel current navigation
        next('/loading');
        return;
    }

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
        if (to.params.id === store.state.auth.currentFirebaseUser.uid) {
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
