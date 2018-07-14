import firebaseHelpers from '@/utils/firebase-helpers';
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

let postsModule = database => {
    return {
        namespaced: true,
        state: {
            posts: []
        },
        actions: {
            addPost({ state }, payload) {
                // action with no commit --> firebase update
                const newPost = new Post(payload.body, state.auth.currentFirebaseUser.uid, payload.mood);
                firebaseHelpers.addPost(newPost);
            }
        }
    };
};

export default {
    postsStore: postsModule
};
