import Konva from 'konva';
import EmojiHelpers from '@/utils/emoji-helpers';

class WaterTank {
    constructor(yAxis, options) {
        this._yAxis = yAxis;
        this._options = Object.assign({
            stageWidth: undefined,
            stageHeight: undefined,
            verticalLevelUpdateDuration: 2,
            frontWaterLineDuration: 4,
            backWaterLineDuration: 1.8,
            frontWaterColor: '#2c7fbe',
            backWaterColor: '#32bafa',
            waterLineBaseOptions: { points: [], fill: '#ffffff', bezier: true, tension: 0.35, closed: true, name: 'waterline' }
        }, options);
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._waterLineFg = undefined;
        this._waterLineBg = undefined;
        this._waterTank = undefined;
        this._layer = undefined;

        this._init();
    }

    _init() {
        // foreground water line
        this._waterLineFg = new Konva.Line(Object.assign({}, this._options.waterLineBaseOptions, {
            fill: this._options.frontWaterColor,
            points: this._waterLineBuilder(-1 * this._options.stageWidth, 0, 2 * this._options.stageWidth, 15, 2, Math.PI)
        }));

        // background water line
        this._waterLineBg = new Konva.Line(Object.assign({}, this._options.waterLineBaseOptions, {
            fill: this._options.backWaterColor,
            points: this._waterLineBuilder(0, 0, 2 * this._options.stageWidth, 15, 2, 0)
        }));

        // water tank instance
        this._waterTank = new Konva.Group({ y: this._yAxis });
        this._waterTank.add(this._waterLineFg, this._waterLineBg);
    }
    _animate() {
        // tweens for waves
        this._tweenersCollection.push(
            this._waterLineTween(this._waterLineBg, this._options.backWaterLineDuration, 1).play(),
            this._waterLineTween(this._waterLineFg, this._options.frontWaterLineDuration, -1).play()
        );
    }

    _waterLineBuilder(x, y, width, amplitude, Hz, offsetRad) {
        let offset = offsetRad;
        if (!offset) offset = 0;
        let result = [];

        // point bottom left of tank to first wave point
        result.push(x);
        result.push(this._options.stageHeight * 2);
        result.push(x);
        result.push(y);

        for (let i = 0; i < Hz; i++) {
            // each hz is comprised of 5 points
            for (let j = 0; j < 5; j++) {
                result.push(x + 0.25 * j * width / Hz + i * width / Hz);
                result.push(y + amplitude * Math.sin(j * Math.PI / 2 + offset));
            }
        }

        // point last wave point to bottom of tank
        result.push(x + width);
        result.push(y);
        result.push(x + width);
        result.push(this._options.stageHeight * 2);

        return result;
    }

    _waterLineTween(node, duration, direction) {
        return new Konva.Tween({
            node: node,
            duration: duration,
            offsetX: direction * this._options.stageWidth,
            onFinish: function() { this.reset() },
            onReset: function() { this.play() }
        });
    }

    // public methods
    destroy() {
        // destroy all tweeners
        this._tweenersCollection.forEach(tweener => {
            tweener.destroy();
        });
        // destroy all animations
        this._animationsCollection.forEach(animation => {
            animation.stop();
        });
    }
    launch() {
        // call this function after instance has been attached to stage/layer
        this._layer = this._waterTank.getLayer();
        this._animate();
    }
    get instance() { return this._waterTank }
    get y() { return this._yAxis }
    set y(newY) {
        // update water tank level
        this._yAxis = newY;
        const tweenTankLevel = new Konva.Tween({
            node: this._waterTank,
            duration: this._options.verticalLevelUpdateDuration,
            easing: Konva.Easings.ElasticEaseInOut,
            y: this._yAxis,
            onFinish: function() { this.destroy() }
        }).play();
        this._tweenersCollection.push(tweenTankLevel);
    }
}

class BubblesFountain {
    constructor(maxY, options) {
        this._maxY = maxY;
        this._options = Object.assign({
            stageWidth: undefined,
            stageHeight: undefined,
            bubblesCount: 4,
            bubblesPeriod: 2000,
            bubblesAmplitude: 1 / 6,
            bubblesInitialScale: 0.1,
            bubbleBaseOptions: {
                bubbleOuter: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50s50-22.386,50-50S77.614,0,50,0z M50,97.5 C23.767,97.5,2.5,76.233,2.5,50S23.767,2.5,50,2.5S97.5,23.767,97.5,50S76.233,97.5,50,97.5z' },
                bubbleInner: { x: -50, y: -50, fill: '#ffffff', visible: 'inherit', data: 'M72.846,10.525C62.055,4.126,51.13,3.281,47.973,8.603c-2.775,4.68-0.039,6.486,13.441,11.258 c2.085,0.738,6.515,3.302,7.67,4.403c9.226,8.799,14.219,12.486,17.375,7.165S83.637,16.925,72.846,10.525z M83.979,29.958 c-2.36,3.979-7.678-5.271-16.764-10.66c-9.087-5.389-19.121-5.245-16.762-9.224c2.36-3.979,12.029-2.788,21.116,2.602 C80.656,18.065,86.339,25.979,83.979,29.958z' }
            }
        }, options);
        this._bubblesCollection = [];
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._bubblesFountain = undefined;
        this._layer = undefined;

        this._init();
    }

    _singleBubbleBuilder() {
        const bubbleOuter = new Konva.Path(this._options.bubbleBaseOptions.bubbleOuter);
        const bubbleInner = new Konva.Path(this._options.bubbleBaseOptions.bubbleInner);
        const bubble = new Konva.Group();
        bubble.add(bubbleOuter, bubbleInner);

        return bubble;
    }
    _bubblesAnimation(bubbles, layer) {
        const period = this._options.bubblesPeriod;
        const stageHeight = this._options.stageHeight;
        const xAmplitude = this._options.bubblesAmplitude * this._options.stageWidth;
        const originalBubblesProperties = bubbles.map(bubble => {
            return { x: bubble.x(), y: bubble.y(), scale: bubble.scaleX() };
        });

        const anim = new Konva.Animation(frame => {
            bubbles.forEach((bubble, index) => {
                // ondulate on X axis
                bubble.setX(originalBubblesProperties[index].x + xAmplitude * Math.cos(frame.time * (1.5 + 0.4 * index) * Math.PI / period));
                // regularly go up on Y axis (start over when reached slightly beneath the surface)
                let newY = bubble.y() - (0.5 + 0.75 * index);
                if (newY <= (this._maxY + 25)) newY = originalBubblesProperties[index].y;
                bubble.setY(newY);
                // scale is proportional to distance to surface
                let newScale = originalBubblesProperties[index].scale + 0.3 * (1 - Math.abs(this._maxY - bubble.y()) / stageHeight);
                bubble.scale({ x: newScale, y: newScale });
                // opacity
                bubble.opacity(0.4 + 0.6 * Math.abs(this._maxY - bubble.y()) / stageHeight);
            });
        }, this._layer);

        anim.start();
        this._animationsCollection.push(anim);
    }
    _init() {
        // generate bubbles elements
        for (let i = 0; i < this._options.bubblesCount; i++) {
            this._bubblesCollection.push(this._singleBubbleBuilder());
        }

        // set initial properties
        this._bubblesCollection.forEach(bubble => {
            bubble.setAttrs({ y: this._options.stageHeight, scaleX: this._options.bubblesInitialScale, scaleY: this._options.bubblesInitialScale });
        });

        // generate bubbles fountain (group)
        this._bubblesFountain = new Konva.Group({ x: this._options.stageWidth / 2, y: 0 });
        this._bubblesFountain.add(...this._bubblesCollection);
    }
    _animate() {
        this._bubblesAnimation(this._bubblesCollection, this._layer);
    }

    // public methods
    destroy() {
        // destroy all tweeners
        this._tweenersCollection.forEach(tweener => {
            tweener.destroy();
        });
        // destroy all animations
        this._animationsCollection.forEach(animation => {
            animation.stop();
        });
    }
    launch() {
        // call this function after instance has been attached to stage/layer
        this._layer = this._bubblesFountain.getLayer();
        this._animate();
    }
    get instance() { return this._bubblesFountain }
    get maxY() { return this._maxY }
    set maxY(newMaxY) { this._maxY = newMaxY }
}

class MoodIndicator {
    constructor(state, yAxis, options) {
        this._state = state;
        this._yAxis = yAxis;
        this._options = Object.assign({
            stageWidth: undefined,
            stageHeight: undefined,
            moodIndicatorAmplitude: 18,
            moodIndicatorSwayThreshold: 1,
            moodTweenDuration: 0.5,
            moodEmojisWingURL: '/static/img/svg/wings.svg',
            moodEmojisBaseURL: '/static/img/smileys/',
            moodEmojiBaseOptions: {
                width: 100,
                height: 100,
                x: -50,
                y: -55
            },
            moodEmojiWingsBaseOptions: {
                id: 'emojiWings',
                width: 300,
                height: 100,
                x: -150,
                y: -75
            }
        }, options);
        this._wings = undefined;
        this._moodEmojisCollection = [];
        this._tweenersCollection = [];
        this._animationsCollection = [];
        this._moodIndicator = undefined;
        this._layer = undefined;
        this._allImagesLoadedPromise = undefined;

        this._init();
    }

    _propToEmojiIndexConverter(moodScore) {
        return EmojiHelpers.emojiDataArray.findIndex(item => (item.index === moodScore));
    }
    _moodIndicatorSwayAnimationBuilder(moodIndicator, layer) {
        console.log('TODO sway animation');
    }
    _moodIndicatorFadeMoods(emojiTargetIndex) {
        console.log('TODO fade emojis with cancel if not needed');
    }
    _showWings() {
        const showWingsTween = new Konva.Tween({
            node: this._wings,
            duration: this._options.moodTweenDuration * (1 - this._wings.opacity()),
            easing: Konva.Easings.ElasticEaseIn,
            opacity: 1,
            onFinish: function() { this.destroy() }
        }).play();
        this._tweenersCollection.push(showWingsTween);
    }
    _hideWings() {
        const hideWingsTween = new Konva.Tween({
            node: this._wings,
            duration: this._options.moodTweenDuration * this._wings.opacity(),
            easing: Konva.Easings.ElasticEaseOut,
            opacity: 0,
            onFinish: function() { this.destroy() }
        }).play();
        this._tweenersCollection.push(hideWingsTween);
    }
    _pImageLoaderFunc = function(imgPath, konvaImage) {
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
    }
    _init() {
        // generate images (wings + all emojis)
        this._wings = new Konva.Image(Object.assign({}, this._options.moodEmojiWingsBaseOptions, { visible: true }));
        this._moodEmojisCollection = EmojiHelpers.emojiDataArray.map(() => {
            return new Konva.Image(Object.assign({}, this._options.moodEmojiBaseOptions, { visible: true }));
        });

        // attach everything to the group
        this._moodIndicator = new Konva.Group({ x: this._options.stageWidth / 2, y: this._yAxis });
        this._moodIndicator.add(this._wings, ...this._moodEmojisCollection);

        // start downloading images and attach to Konva Images when ready (wings + all emojis)
        const pWings = this._pImageLoaderFunc(this._options.moodEmojisWingURL, this._wings);
        const pEmojisArray = EmojiHelpers.emojiDataArray
            .map(emojiData => `${this._options.moodEmojisBaseURL}${emojiData.image}`)
            .map((emojiURL, index) => this._pImageLoaderFunc(emojiURL, this._moodEmojisCollection[index]));
        this._allImagesLoadedPromise = Promise.all([pWings, ...pEmojisArray]);
    }
    _update() {}

    // public methods
    destroy() {
        // destroy all tweeners
        this._tweenersCollection.forEach(tweener => {
            tweener.destroy();
        });
        // destroy all animations
        this._animationsCollection.forEach(animation => {
            animation.stop();
        });
    }
    launch() {
        // call this function after instance has been attached to stage/layer
        this._layer = this._moodIndicator.getLayer();

        // redraw when all images are loaded (and layer is available)
        this._allImagesLoadedPromise.then(() => { this._layer.draw() });

        this._update();
    }
    get instance() { return this._moodIndicator }
    get y() { return this._yAxis }
    set y(newY) {
        // update model
        this._yAxis = newY;
        // update indicator display
        const tweenMoodLevel = new Konva.Tween({
            node: this._moodIndicator,
            duration: this._options.moodTweenDuration,
            easing: Konva.Easings.ElasticEaseInOut,
            y: this._yAxis,
            onFinish: function() { this.destroy() }
        }).play();
        this._tweenersCollection.push(tweenMoodLevel);
    }
    get state() { return this._state }
    set state(newState) {
        // update model
        this._state = newState;
        // update indicator display
        this._update();
    }
}

export default {
    WaterTank: WaterTank,
    BubblesFountain: BubblesFountain,
    MoodIndicator: MoodIndicator
};
