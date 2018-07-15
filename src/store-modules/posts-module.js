import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import moment from 'moment';

class Post {
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
        posts: localyStoredPosts
    },
    mutations: {
        updatePosts(state, payload) {
            state.posts = payload;
            LSHelpers.setAllPosts(payload);
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
