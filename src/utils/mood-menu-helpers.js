import Konva from 'konva';
import EmojiHelpers from '@/utils/emoji-helpers';

const genericProperties = {
    moodTweenDuration: 0.3,
    selectorsTweenDuration: 0.45,
    delay: 0.3
};

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

            // setup mood value (to use when clicked)
            kImage.moodValue = item.index;

            return kImage;
        });
        this._allImagesLoadedPromise = Promise.all(pImageLoadersArray);

        this._mainSelection.add(circleBg, ...this._moodEmojisCollection);
    }

    _swapEmojis(newIndex, formerIndex) {
        const newerNode = this._moodEmojisCollection.find(emoji => (emoji.moodValue === newIndex));
        const formerNode = this._moodEmojisCollection.find(emoji => (emoji.moodValue === formerIndex));
        const showNewEmojiTween = new Konva.Tween({
            node: newerNode,
            duration: genericProperties.moodTweenDuration * (1 - newerNode.opacity()),
            easing: Konva.Easings.Linear,
            opacity: 1,
            onFinish: function() { this.destroy() }
        }).play();
        const hideFormerEmojiTween = new Konva.Tween({
            node: formerNode,
            duration: genericProperties.moodTweenDuration * formerNode.opacity(),
            easing: Konva.Easings.Linear,
            opacity: 0,
            onFinish: function() { this.destroy() }
        }).play();
        this._tweenersCollection.push(showNewEmojiTween, hideFormerEmojiTween);
    }

    // public methods
    get instance() { return this._mainSelection }
    get currentMood() { return this._options.currentMood }
    set currentMood(newMood) {
        const formerIndex = this._options.currentMood;
        const newerIndex = newMood;
        this._options.currentMood = newMood;

        // animate swap between images
        this._swapEmojis(newerIndex, formerIndex);
    }
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
            offsetRotationAngle: 125,
            arcsDegOffset: 5,
            arcBaseOptions: {
                outerRadius: 200,
                innerRadius: 130
            },
            moodEmojisBaseURL: '/static/img/smileys/',
            moodEmojiBaseOptions: {
                width: 50,
                height: 50,
                x: -25,
                y: -25
            }
        }, options);
        this._moodUpdateCb = moodUpdateCb;
        this._layer = undefined;
        this._allImagesLoadedPromise = undefined;
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

    _moodValueColorConverter(moodValue, isHover) {
        let result;
        if (isHover) {
            result = 'rgba(255, 255, 255, 1)';

            switch (moodValue) {
            case '-5': result = 'rgba(255, 80, 80, 1)'; break;
            case '-4': result = 'rgba(255, 110, 110, 1)'; break;
            case '-3': result = 'rgba(255, 140, 140, 1)'; break;
            case '-2': result = 'rgba(255, 170, 170, 1)'; break;
            case '-1': result = 'rgba(255, 200, 200, 1)'; break;
            case '1': result = 'rgba(200, 255, 200, 1)'; break;
            case '2': result = 'rgba(170, 255, 170, 1)'; break;
            case '3': result = 'rgba(140, 255, 140, 1)'; break;
            case '4': result = 'rgba(110, 255, 110, 1)'; break;
            case '5': result = 'rgba(80, 255, 80, 1)'; break;
            }
        } else {
            result = 'rgba(220, 220, 220, 1)';

            switch (moodValue) {
            case '-5': result = 'rgba(255, 130, 130, 1)'; break;
            case '-4': result = 'rgba(255, 160, 160, 1)'; break;
            case '-3': result = 'rgba(255, 190, 190, 1)'; break;
            case '-2': result = 'rgba(255, 220, 220, 1)'; break;
            case '-1': result = 'rgba(255, 240, 240, 1)'; break;
            case '1': result = 'rgba(240, 255, 240, 1)'; break;
            case '2': result = 'rgba(220, 255, 220, 1)'; break;
            case '3': result = 'rgba(190, 255, 190, 1)'; break;
            case '4': result = 'rgba(160, 255, 160, 1)'; break;
            case '5': result = 'rgba(130, 255, 130, 1)'; break;
            }
        }

        return result;
    }

    _arcsBuilder() {
        let results = [];
        let pImagesArray = [];

        // clone emoji array then remove last element (not a valid selection)
        let cleanedUpEmojiArray = EmojiHelpers.emojiDataArray.slice(0);
        cleanedUpEmojiArray.pop();
        const arcWidth = (360 / cleanedUpEmojiArray.length) - this._options.arcsDegOffset;

        // create arcs
        cleanedUpEmojiArray.forEach((emojiData, index) => {
            // calculus
            const rotAngle = (this._options.offsetRotationAngle - this._options.arcsDegOffset) + index * (arcWidth + this._options.arcsDegOffset);
            const imageAngle = (this._options.offsetRotationAngle + arcWidth / 2 - this._options.arcsDegOffset) + index * (arcWidth + this._options.arcsDegOffset);
            const hypothenus = this._options.arcBaseOptions.innerRadius + (this._options.arcBaseOptions.outerRadius - this._options.arcBaseOptions.innerRadius) / 2;
            const arcColor = this._moodValueColorConverter(emojiData.index);

            // group
            let group = new Konva.Group({ name: 'mood-arc-group' });
            group.on('mouseover', evt => {
                const arc = evt.currentTarget.find('.mood-arc')[0];
                arc.fill(this._moodValueColorConverter(arc.moodValue, true));
                arc.getStage().container().style.cursor = 'pointer';
                this._layer.draw();
            });
            group.on('mouseout', evt => {
                const arc = evt.currentTarget.find('.mood-arc')[0];
                arc.fill(this._moodValueColorConverter(arc.moodValue, false));
                arc.getStage().container().style.cursor = 'default';
                this._layer.draw();
            });

            // arc
            let arc = new Konva.Arc(Object.assign({}, this._options.arcBaseOptions, {
                angle: arcWidth,
                rotation: rotAngle,
                fill: arcColor,
                strokeWidth: 0,
                strokeHitEnabled: false,
                name: 'mood-arc'
            }));

            // image
            let kImage = new Konva.Image(Object.assign({}, this._options.moodEmojiBaseOptions, {
                offsetX: -hypothenus * Math.cos(imageAngle * Math.PI / 180),
                offsetY: -hypothenus * Math.sin(imageAngle * Math.PI / 180)
            }));

            // load image into kImage
            const emojiURL = `${this._options.moodEmojisBaseURL}${emojiData.image}`;
            pImagesArray.push(pImageLoaderFunc(emojiURL, kImage));

            // bind everything to group
            group.add(arc, kImage);

            // setup mood value (to use when clicked)
            kImage.moodValue = arc.moodValue = group.moodValue = emojiData.index;

            results.push(group);
        });

        // image generic promise for redraw
        this._allImagesLoadedPromise = Promise.all(pImagesArray);

        return results;
    }

    _showSelectors() {
        this._selectors.setAttrs({ rotation: 60, scaleX: 0.25, scaleY: 0.25 });
        setTimeout(() => {
            const showSelectorTweenA = new Konva.Tween({
                node: this._selectors,
                duration: genericProperties.selectorsTweenDuration,
                easing: Konva.Easings.BackEaseOut,
                scaleX: 1,
                scaleY: 1,
                onFinish: function() { this.destroy() }
            }).play();
            const showSelectorTweenB = new Konva.Tween({
                node: this._selectors,
                duration: genericProperties.selectorsTweenDuration,
                easing: Konva.Easings.EaseOut,
                rotation: 0,
                onFinish: function() { this.destroy() }
            }).play();
            this._tweenersCollection.push(showSelectorTweenA, showSelectorTweenB);
        }, genericProperties.delay * 1000);
    }

    _hideSelectors() {
        this._selectors.setAttrs({ rotation: 0, scaleX: 1, scaleY: 1 });
        setTimeout(() => {
            const hideSelectorTweenA = new Konva.Tween({
                node: this._selectors,
                duration: genericProperties.selectorsTweenDuration,
                easing: Konva.Easings.BackEaseIn,
                scaleX: 0.25,
                scaleY: 0.25,
                onFinish: function() { this.destroy() }
            }).play();
            const hideSelectorTweenB = new Konva.Tween({
                node: this._selectors,
                duration: genericProperties.selectorsTweenDuration,
                easing: Konva.Easings.EaseOut,
                rotation: 60,
                onFinish: function() { this.destroy() }
            }).play();
            this._tweenersCollection.push(hideSelectorTweenA, hideSelectorTweenB);
        }, genericProperties.delay * 1000);
    }

    // public methods
    get instance() { return this._selectors }
    destroy() {
        // destroy event listeners
        this._selectors.off('click');
        this._selectors.find('.mood-arc-group').forEach(arcGroup => {
            arcGroup.off('mouseover');
            arcGroup.off('mouseout');
        });

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
        this._layer = this._selectors.getLayer();

        // redraw when all images are loaded (and layer is available)
        this._allImagesLoadedPromise.then(() => { this._layer.draw() });
    }
    show() { this._showSelectors() }
    hide() { this._hideSelectors() }
}

export default {
    genericProperties,
    MainSelection,
    Selectors
};
