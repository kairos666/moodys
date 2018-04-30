import Konva from 'konva';
import EmojiHelpers from '@/utils/emoji-helpers';

let pImageLoaderFunc = function(imgPath, konvaImage) {
    // load as promise
    const asyncImg = new Promise(resolve => {
        const imgElement = new Image();
        imgElement.onload = () => resolve({ path: imgPath, status: 'ok', image: imgElement });
        imgElement.onerror = () => resolve({ path: imgPath, status: 'fail', image: imgElement });
        imgElement.src = imgPath;
    });

    // when promise fulfill associate image
    return asyncImg.then(resp => {
        konvaImage.setImage(resp.image);
        return konvaImage;
    });
};

class MainSelection {
    constructor(options) {
        this._options = Object.assign({
            stageWidth: undefined,
            stageHeight: undefined,
            currentMood: null,
            moodEmojisBaseURL: '/static/img/smileys/',
            moodEmojiBaseOptions: {
                width: 100,
                height: 100,
                x: -50,
                y: -52
            },
            circleBgOptions: {
                fill: '#e7eaec',
                stroke: '#e7eaec',
                radius: 80
            }
        }, options);
        this._layer = undefined;
        this._allImagesLoadedPromise = undefined;
        this._emojiIndicator = undefined;
        this._moodEmojisCollection = [];
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._mainSelection = undefined;

        this._init();
    }

    _init() {
        // create group
        this._mainSelection = new Konva.Group({
            x: this._options.stageWidth / 2,
            y: this._options.stageHeight / 2
        });

        // create background
        const circleBg = new Konva.Circle(this._options.circleBgOptions);

        // create emoji indicator
        const pImageLoadersArray = [];
        this._moodEmojisCollection = EmojiHelpers.emojiDataArray.map((item, index) => {
            const kImage = new Konva.Image(Object.assign({}, this._options.moodEmojiBaseOptions, { visible: true, opacity: (item.index === this._options.currentMood) ? 1 : 0 }));

            // load image into kImage
            const emojiURL = `${this._options.moodEmojisBaseURL}${item.image}`;
            pImageLoadersArray.push(pImageLoaderFunc(emojiURL, kImage));

            return kImage;
        });
        this._allImagesLoadedPromise = Promise.all(pImageLoadersArray);

        this._mainSelection.add(circleBg, ...this._moodEmojisCollection);
    }

    // public methods
    get instance() { return this._mainSelection }
    destroy() {}
    launch() {
        // call this function after instance has been attached to stage/layer
        this._layer = this._mainSelection.getLayer();

        // redraw when all images are loaded (and layer is available)
        this._allImagesLoadedPromise.then(() => { this._layer.draw() });
    }
}

class Selectors {
    constructor(options, moodUpdateCb) {
        this._options = Object.assign({
            stageWidth: undefined,
            stageHeight: undefined,
            arcsDegOffset: 5,
            fill: '#e7eaec',
            stroke: '#e7eaec',
            arcOuterRadius: 200,
            arcInnerRadius: 130
        }, options);
        this._moodUpdateCb = moodUpdateCb;
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._arcsCollection = [];
        this._selectors = undefined;

        this._init();
    }

    _init() {
        // create group
        this._selectors = new Konva.Group({
            x: this._options.stageWidth / 2,
            y: this._options.stageHeight / 2
        });

        // generate all mood arcs
        this._arcsCollection = this._arcsBuilder();
        this._selectors.add(...this._arcsCollection);

        // setup event listener
        this._selectors.on('click', evt => {
            if (this._moodUpdateCb) this._moodUpdateCb(evt.target.moodValue);
        });
    }

    _arcsBuilder() {
        let results = [];

        // clone emoji array then remove last element (not a valid selection)
        let cleanedUpEmojiArray = EmojiHelpers.emojiDataArray.slice(0);
        cleanedUpEmojiArray.pop();
        const arcWidth = (360 / cleanedUpEmojiArray.length) - this._options.arcsDegOffset;

        // create arcs
        cleanedUpEmojiArray.forEach((emojiData, index) => {
            let arc = new Konva.Arc({
                innerRadius: this._options.arcInnerRadius,
                outerRadius: this._options.arcOuterRadius,
                angle: arcWidth,
                fill: this._options.fill,
                stroke: this._options.stroke,
                rotation: -this._options.arcsDegOffset + index * (arcWidth + this._options.arcsDegOffset)
            });

            // setup arc mood value (to use when clicked)
            arc.moodValue = emojiData.index;

            results.push(arc);
        });

        return results;
    }

    // public methods
    get instance() { return this._selectors }
    destroy() {
        // destroy event listener
        this._selectors.off('click');

        // destroy all tweeners
        this._tweenersCollection.forEach(tweener => {
            tweener.destroy();
        });
        // destroy all animations
        this._animationsCollection.forEach(animation => {
            animation.stop();
        });
    }
    launch() {}
}

export default {
    MainSelection,
    Selectors
};
