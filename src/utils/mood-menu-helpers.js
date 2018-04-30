import Konva from 'konva';

class MainSelection {
    constructor(options) {
        this._options = Object.assign({
            currentMood: null,
            backgroundColor: '#e7eaec',
            radius: 200
        }, options);
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._mainSelection = undefined;

        this._init();
    }

    _init() {}

    // public methods
    get instance() { return this._mainSelection }
    destroy() {}
    launch() {}
}

class Selectors {
    constructor(options) {
        this._options = Object.assign({}, options);
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._selectors = undefined;

        this._init();
    }

    _init() {}

    // public methods
    get instance() { return this._selectors }
    destroy() {}
    launch() {}
}

export default {
    MainSelection,
    Selectors
};
