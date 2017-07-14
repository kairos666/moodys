import firebase from 'firebase';
import moodsConfig from '../config/moods';

let updateMoodBuilder = function(refs, moodsConfig) {
    return function(moodIndex, userId) {
        if (moodsConfig.moodIndexes.includes(moodIndex)) {
            // create entry
            let moodEntry = { userId: userId, value: moodIndex, timestamp: Date.now() };

            // send to firebase
            console.log(refs);
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
        this.vueRef = Vue;
    },
    init(refs) {
        this.firebaseRefs = refs;

        this.vueRef.prototype.$firebaseActions = {
            updateMood: updateMoodBuilder(this.firebaseRefs, moodsConfig)
        };
    },
    database: null,
    firebaseRefs: null,
    vueRef: null
};

export default firebaseService;
