/**
 * FIREBASE CUSTOM SERVICE (peer dependencies firebase & vue-fire)
 * 1. install phase: setup firebase connexion with config
 * 2. Vue app bind vue-fire with databases
 * 3. init plugin at app creation to get & use $firebaseRefs
 */
import firebase from 'firebase';
import moodsConfig from '../config/moods';

let vueRef = null;
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
        firebase.initializeApp(options);
        this.database = firebase.database();
        vueRef = Vue;
    },
    init(refs) {
        vueRef.prototype.$firebaseActions = {
            updateMood: updateMoodBuilder(refs.$root.$firebaseRefs, moodsConfig)
        };
    },
    database: null
};

export default firebaseService;
