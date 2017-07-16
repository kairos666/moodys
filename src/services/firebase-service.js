/**
 * FIREBASE CUSTOM SERVICE (peer dependencies firebase & vue-fire)
 * 1. install phase: setup firebase connexion with config
 * 2. Vue app bind vue-fire with databases
 * 3. init plugin at app creation to get & use $firebaseRefs
 */
import firebase from 'firebase';
import firebaseConfig from '../config/firebase';
import moodsConfig from '../config/moods';
import Vue from 'vue';

let updateMoodBuilder = function(refs, moodsConfig) {
    return function(moodIndex, userId) {
        if (moodsConfig.moodIndexes.includes(moodIndex)) {
            // create entry
            let moodEntry = { userId: userId, value: moodIndex, timestamp: Date.now() };

            // send to firebase
            refs.moods.push(moodEntry);
        } else {
            throw new Error(`Try to update user ${userId}'s mood with invalid index: ${moodIndex}`);
        }
    };
};

const firebaseService = {
    install(Vue, options) {
        // firebase app init
        let firebaseApp = firebase.initializeApp(options);
        this.database = firebase.database();

        // firebase auth init
        let firebaseAuth = firebase.auth(firebaseApp);
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                console.info('status connected', user);
            } else {
                console.info('status disconnected');
            }
        });

        // assign global vue method
        this.firebaseActions = Vue.prototype.$firebaseActions = {
            authenticate: function(email, password) { return firebaseAuth.signInWithEmailAndPassword(email, password) },
            onAuthStateChange: function(cb) { firebaseAuth.onAuthStateChanged(cb) },
            signOut: function() { return firebaseAuth.signOut() },
            getCurrentUser: function() { return firebaseAuth.currentUser }
        };
    },
    init(refs) {
        this.firebaseActions.updateMood = Vue.prototype.$firebaseActions.updateMood = updateMoodBuilder(refs.$root.$firebaseRefs, moodsConfig);
    },
    database: null,
    firebaseActions: null
};

Vue.use(firebaseService, firebaseConfig);

export default firebaseService;
