import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import moment from 'moment';

export class Post {
    constructor(body, userID, linkeMoodIndex) {
        this.body = body;
        this.meta = {
            user: userID,
            timestamp: moment().unix() * 1000,
            linkedMoodIndex: (linkeMoodIndex) ? linkeMoodIndex.toString() : 'none'
        };
    }
}

// local storage retrieval
let localyStoredPosts = LSHelpers.getAllPosts();

let postsModule = {
    namespaced: true,
    state: {
        entries: localyStoredPosts
    },
    mutations: {
        updatePosts(state, payload) {
            // convert fbObject to array
            const payloadArray = Object.keys(payload).map(key => payload[key]).reverse();
            state.entries = payloadArray;
            LSHelpers.setAllPosts(payloadArray);
        }
    },
    actions: {
        addPost({ rootState }, payload) {
            // action with no commit --> firebase update
            const newPost = new Post(payload.body, rootState.auth.currentFirebaseUser.uid, payload.mood);
            firebaseHelpers.addPostEntry(newPost);
        }
    }
};

export default postsModule;
