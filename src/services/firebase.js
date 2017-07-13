import firebase from 'firebase';
import moodsConfig from '../config/moods';

let config = {
    apiKey: 'AIzaSyD9XdghOe4dGAeA4tiJ83Bu0CnUpnO5UMw',
    authDomain: 'moodies-1ad4f.firebaseapp.com',
    databaseURL: 'https://moodies-1ad4f.firebaseio.com',
    projectId: 'moodies-1ad4f',
    storageBucket: 'moodies-1ad4f.appspot.com',
    messagingSenderId: '733648315769'
};
firebase.initializeApp(config);

export default {
    database: firebase.database(),
    updateMood(moodIndex, userId, refs) {
        if (moodsConfig.moodIndexes.includes(moodIndex)) {
            // create entry
            let moodEntry = { userId: userId, value: moodIndex, timestamp: Date.now() };

            // send to firebase
            refs.moods.push(moodEntry);
        } else {
            throw new Error(`Try to update user ${userId}'s mood with invalid index: ${moodIndex}`);
        }
    }
};
