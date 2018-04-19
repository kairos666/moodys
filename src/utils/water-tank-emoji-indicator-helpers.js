import Konva from 'konva';

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

export default {
    WaterTank: WaterTank,
    BubblesFountain: {},
    MoodIndicator: {}
};
