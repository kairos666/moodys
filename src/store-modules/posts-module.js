import firebaseHelpers from '@/utils/firebase-helpers';
import LSHelpers from '@/utils/local-storage-helpers';
import moment from 'moment';

class Post {
    constructor(body, userID, linkeMoodIndex) {
        this.body = body;
        this.meta = {
            user: userID,
            timestamp: moment().unix() * 1000,
            linkedMoodIndex: linkeMoodIndex
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
        addPost({ state }, payload) {
            // action with no commit --> firebase update
            const newPost = new Post(payload.body, state.auth.currentFirebaseUser.uid, payload.mood);
            firebaseHelpers.addPost(newPost);
        }
    }
};

export default postsModule;
