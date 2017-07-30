let asyncStateModule = {
    state: {
        signup: undefined,
        signin: undefined,
        reset: undefined,
        profile: undefined
    },
    getters: {
        isAsyncSignUp(state) {
            return state.signup;
        },
        isAsyncSignIn(state) {
            return state.signin;
        },
        isAsyncResetPassword(state) {
            return state.reset;
        },
        isAsyncProfileUpdate(state) {
            return state.profile;
        }
    },
    mutations: {
        updateAsyncTransaction(state, payload) {
            state[payload.transaction] = payload;
        }
    }
};

class AsyncState {
    constructor(transaction, state, isEnded, isSuccess) {
        if (asyncStateModule.state.hasOwnProperty(transaction)) {
            this.transaction = transaction;
            this.state = state;
            this.isEnded = (isEnded !== undefined) ? isEnded : false;
            this.isSuccess = (isSuccess !== undefined) ? isSuccess : false;
        } else {
            // throw if invalid transaction
            throw new Error('AsyncState transaction ' + transaction + ' is invalid');
        }
    }
};

export default {
    asyncStateModule: asyncStateModule,
    AsyncState: AsyncState
};
