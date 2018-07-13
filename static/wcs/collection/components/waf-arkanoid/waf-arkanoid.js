var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    return new(P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

        function step(result) { result.done ? resolve(result.value) : new P(function(resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class WafArkanoid {
    constructor() {
        this.paddlePosition = 0.5;
        this.isPaused = true;
        this.isGameOver = true;
        this.faceDetectLimiterActive = false;
        this.configURL = `${location.origin}/static/wcs-assets/arkanoid-config.json`;
    }
    render() {
        const menuRenderer = () => {
            let result = null;
            if (this.isPaused) {
                // need game menu
                result = (h("div", { class: "waf-arkanoid-menu waf-arkanoid-menu--initial" },
                    h("header", null,
                        this.isGameOver ? 'You failed!' : 'Start game!',
                        h("br", null),
                        "Level ",
                        this.player ? this.player.status.level : '1',
                        h("br", null),
                        "Score ",
                        this.player ? this.player.status.score : '0',
                        ", Lives ",
                        this.player ? this.player.status.lives : '3'),
                    h("button", { type: "button", onClick: () => this.start(), class: "button-stylish" }, this.isGameOver ? 'restart game' : 'start game!')));
            }
            return result;
        };
        return [
            h("canvas", { class: "arkanoid", width: this.width, height: this.height }),
            menuRenderer()
        ];
    }
    paddlePositionHandler(newValue) {
        // enforce boundaries
        let newPositionRatio = (newValue < 0) ?
            0 :
            (newValue > 1) ?
            1 :
            newValue;
        // time for tween
        const from = this.model.paddle.x;
        const to = this.paddlePositionConverter(newPositionRatio);
        let transitionTime = Math.abs(from - to) / this.width * this.config.paddle.maxTweenDelay;
        // convert to position & apply to model
        this.model.paddle.tween = { from: from, to: to, elapsedTime: 0, totalTime: transitionTime };
    }
    componentDidLoad() {
        return __awaiter(this, void 0, void 0, function*() {
            // load game config json
            const configResp = yield fetch(this.configURL);
            const configJSON = configResp.json();
            configJSON.then(config => {
                // load worker file
                this.worker = new Worker(`${location.origin}${config.externals.collision_ww}`);
                this.worker.addEventListener('message', msg => {
                    const response = msg.data.return;
                    // update model
                    const paddleTween = this.model.paddle.tween;
                    this.model = Object.assign(this.model, response.updatedModel);
                    this.model.paddle.tween = paddleTween; // reinject paddle tween after merge
                    // execute post calculations commands
                    commandsExecutor.bind(this)(response.cmds);
                    // draw game state
                    this.drawModel(this.model);
                });
                this.worker.addEventListener('error', err => {
                    console.warn(err);
                });
                // successfully loaded game config
                this.config = config;
                this.player = new PlayerGame(this.config.game.levels, this.config.game.score, this.config.game.lives, this.gameover.bind(this));
                // init
                this.gameInitModel();
                // controls setup
                if (this.activateKeyboardControls)
                    this.setupControls('keyboard');
                if (this.activateMouseControls)
                    this.setupControls('mouse');
                if (this.activateFaceControls)
                    this.setupControls('face-detect');
                // get canvas element
                this.akCanvasCtx = this.akElt.querySelector('canvas.arkanoid').getContext('2d');
                // init game
                this.drawLoop();
            }).catch(() => {
                // failed to load game config
                console.warn('waf-arkanoid | config file couldn\'t be loaded or parsed');
            });
        });
    }
    updateKeyboardCtrlState(isActive) {
        // keyboard controls setup or destroy
        if (isActive) {
            this.setupControls('keyboard');
        } else {
            this.setupControls('keyboard', true);
        }
    }
    updateMouseCtrlState(isActive) {
        // mouse controls setup or destroy
        if (isActive) {
            this.setupControls('mouse');
        } else {
            this.setupControls('mouse', true);
        }
    }
    updateFaceCtrlState(isActive) {
        // mouse controls setup or destroy
        if (isActive) {
            this.setupControls('face-detect');
        } else {
            this.setupControls('face-detect', true);
        }
    }
    componentDidUnload() {
        // controls destroy
        this.setupControls('keyboard', true);
        this.setupControls('mouse', true);
        this.setupControls('face-detect', true);
        // worker termination
        this.worker.terminate();
    }
    drawLoop(DHRTimeStamp) {
        if (!this.isPaused) {
            // calculate elapsed time
            const dt = this.elapsedTime(DHRTimeStamp);
            // collision detection & applied acceleration (async response through worker response)
            this.update(dt);
        }
        // allow face detection input to pass 
        this.faceDetectLimiterActive = false;
        // recursively call itself at each animation frame
        requestAnimationFrame(this.drawLoop.bind(this));
    }
    update(dt) {
        // collision detection & reaction
        const newModel = Object.assign({}, this.model);
        // update paddlePosition
        if (newModel.paddle.tween.elapsedTime < newModel.paddle.tween.totalTime) {
            // paddle will move
            newModel.paddle = this.paddleTweener(dt, Object.assign({}, newModel.paddle));
        }
        // send to worker (do not send sounds because it invalidates object cloning)
        const workerMsg = {
            func: 'collisionHandler',
            args: {
                dt: dt,
                model: {
                    ball: newModel.ball,
                    bricks: newModel.bricks,
                    game: newModel.game,
                    paddle: newModel.paddle
                },
                config: this.config,
                width: this.width,
                height: this.height
            }
        };
        this.worker.postMessage(workerMsg);
    }
    paddleTweener(dt, paddle) {
        function easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
        const pTween = paddle.tween;
        // update time trackers
        pTween.elapsedTime += dt;
        if (pTween.elapsedTime > pTween.totalTime)
            pTween.elapsedTime = pTween.totalTime;
        pTween.remainingTime -= dt;
        if (pTween.remainingTime < 0)
            pTween.elapsedTime = 0;
        // find current position
        const timeRatio = pTween.elapsedTime / pTween.totalTime;
        const positionRatio = easeInOutQuad(timeRatio);
        paddle.x = pTween.from + positionRatio * (pTween.to - pTween.from);
        return paddle;
    }
    drawModel(model) {
        const ctx = this.akCanvasCtx;
        const paddle = model.paddle;
        const ball = model.ball;
        // clear canvas
        ctx.clearRect(0, 0, this.width, this.height);
        // draw - bricks
        model.bricks.forEach(brickData => {
            if (brickData.hitCount > 0) {
                ctx.beginPath();
                ctx.rect(brickData.x, brickData.y, brickData.width, brickData.height);
                ctx.fillStyle = brickData.color;
                ctx.fill();
                ctx.closePath();
            }
        });
        // draw - paddle
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = paddle.color;
        ctx.fill();
        ctx.closePath();
        // draw - ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }
    paddlePositionConverter(ratio) {
        // convert position ratio to x position on canvas
        const maxLeftX = this.config.bricks.sideSpace;
        const maxRightX = this.width - this.config.bricks.sideSpace - this.config.paddle.paddleWidth;
        return maxLeftX + ratio * (maxRightX - maxLeftX);
    }
    elapsedTime(DHRTimeStamp) {
        let result = 0;
        const previousDHRTimeStamp = this.model.game.lastFrame;
        // register
        this.model.game.lastFrame = DHRTimeStamp;
        if (previousDHRTimeStamp)
            result = DHRTimeStamp - previousDHRTimeStamp;
        return result;
    }
    generateBricksModel(configBrick, levelBluePrint, canvasWidth) {
        const config = Object.assign({}, configBrick);
        const brickPerRowCount = levelBluePrint[0].length;
        const brickWidth = (canvasWidth - config.sideSpace * 2 - config.brickGutter * (brickPerRowCount - 1)) / brickPerRowCount;
        const bricksBluePrint = levelBluePrint.map((_itemRow, i) => {
            return _itemRow.map((_itemColumn, j) => {
                return {
                    x: config.sideSpace + j * (brickWidth + config.brickGutter),
                    y: config.sideSpace + i * (config.brickHeight + config.brickGutter),
                    width: brickWidth,
                    height: config.brickHeight,
                    color: config.brickColor[_itemColumn - 1],
                    hitCount: _itemColumn,
                    type: 'brick'
                };
            });
        });
        return [].concat.apply([], bricksBluePrint).filter(brick => (brick.hitCount > 0));
    }
    generatePaddleModel(configPaddle, canvasHeight) {
        const config = Object.assign({}, configPaddle);
        return {
            x: this.paddlePositionConverter(this.paddlePosition),
            y: canvasHeight - config.bottomMargin - config.paddleHeight,
            width: config.paddleWidth,
            height: config.paddleHeight,
            color: config.paddleColor,
            tween: { from: this.paddlePositionConverter(this.paddlePosition), to: this.paddlePositionConverter(this.paddlePosition), elapsedTime: 0, totalTime: 0 }
        };
    }
    generateBallModel(configBall, paddleModel) {
        const config = Object.assign({}, configBall);
        return {
            x: paddleModel.x + paddleModel.width / 2,
            y: paddleModel.y - config.ballRadius,
            dx: config.initialSpeed,
            dy: -config.initialSpeed,
            accel: config.acceleration,
            radius: config.ballRadius,
            color: config.ballColor
        };
    }
    gameInitModel() {
        const model = {
            bricks: null,
            paddle: null,
            ball: null,
            sounds: {
                brick: (this.model) ? this.model.sounds.brick : new Audio(`${location.origin}${this.config.externals.brick_snd}`),
                paddle: (this.model) ? this.model.sounds.paddle : new Audio(`${location.origin}${this.config.externals.paddle_snd}`),
                gameover: (this.model) ? this.model.sounds.gameover : new Audio(`${location.origin}${this.config.externals.gameover_snd}`)
            },
            game: Object.assign({}, this.config.game)
        };
        // generate model - bricks
        model.bricks = this.generateBricksModel(this.config.bricks, this.config.levels[this.player.status.level - 1], this.width);
        // generate model - paddle
        model.paddle = this.generatePaddleModel(this.config.paddle, this.height);
        // generate model - ball
        model.ball = this.generateBallModel(this.config.ball, model.paddle);
        this.model = model;
    }
    setupControls(controlType, destroy = false) {
        const keyboardHandler = (evt) => {
            switch (evt.which) {
                case 37:
                    // left
                    this.paddlePosition = (this.paddlePosition - 0.05 > 0) ? this.paddlePosition - 0.05 : 0;
                    break;
                case 39:
                    // right
                    this.paddlePosition = (this.paddlePosition + 0.05 < 1) ? this.paddlePosition + 0.05 : 1;
                    break;
            }
        };
        const mouseHandler = (evt) => {
            const posRatio = evt.pageX / document.body.offsetWidth;
            this.paddlePosition = posRatio;
        };
        const faceDetectHandler = (evt) => {
            if (!this.faceDetectLimiterActive && evt.detail.length > 0) {
                const sideMargins = this.config.faceDetect.detectSideMargins; // allow to go all the way left or right
                const jitterThreshold = this.config.faceDetect.jitterThreshold; // smooth jitter from detection jumps
                const detection = Object.assign({}, evt.detail[0]); // ignoring other detected faces
                const offsettedX = Math.max(detection.x - sideMargins, 0);
                const posRatio = 1 - Math.min(offsettedX / (this.width - 2 * sideMargins), 1);
                if (Math.abs(this.paddlePosition - posRatio) > jitterThreshold) {
                    // update position and limit face detection input until next frame
                    this.faceDetectLimiterActive = true;
                    this.paddlePosition = posRatio;
                }
            }
        };
        // setup keyboard
        if (controlType === 'keyboard' && !destroy)
            document.addEventListener('keydown', keyboardHandler);
        // setup mouse
        if (controlType === 'mouse' && !destroy)
            document.body.addEventListener('mousemove', mouseHandler);
        // setup face detect
        if (controlType === 'face-detect' && !destroy)
            this.akElt.parentElement.addEventListener('waf.face-detector.detected', faceDetectHandler);
        // destroy keyboard controls
        if (controlType === 'keyboard' && destroy)
            document.removeEventListener('keydown', keyboardHandler);
        // destroy mouse controls
        if (controlType === 'mouse' && destroy)
            document.body.removeEventListener('mousemove', mouseHandler);
        // face detect controls
        if (controlType === 'face-detect' && destroy)
            this.akElt.parentElement.removeEventListener('waf.face-detector.detected', faceDetectHandler);
    }
    pause() {
        this.isPaused = true;
    }
    gameover() {
        this.isGameOver = true;
        this.model.sounds.gameover.play();
    }
    start() {
        // reset if game was previously game over
        if (this.isGameOver) {
            this.player.reset();
        }
        this.gameInitModel();
        this.isPaused = false;
        this.isGameOver = false;
    }
    playSound(soundKey) {
        switch (soundKey) {
            case "brick":
                this.model.sounds.brick.play();
                break;
            case "paddle":
                this.model.sounds.paddle.play();
                break;
            case "gameover":
                this.model.sounds.gameover.play();
                break;
        }
    }
    static get is() { return "waf-arkanoid"; }
    static get properties() {
        return {
            "activateFaceControls": {
                "type": Boolean,
                "attr": "activate-face-controls",
                "watchCallbacks": ["updateFaceCtrlState"]
            },
            "activateKeyboardControls": {
                "type": Boolean,
                "attr": "activate-keyboard-controls",
                "watchCallbacks": ["updateKeyboardCtrlState"]
            },
            "activateMouseControls": {
                "type": Boolean,
                "attr": "activate-mouse-controls",
                "watchCallbacks": ["updateMouseCtrlState"]
            },
            "akElt": {
                "elementRef": true
            },
            "height": {
                "type": Number,
                "attr": "height"
            },
            "isGameOver": {
                "state": true
            },
            "isPaused": {
                "state": true
            },
            "paddlePosition": {
                "type": Number,
                "attr": "paddle-position",
                "reflectToAttr": true,
                "mutable": true,
                "watchCallbacks": ["paddlePositionHandler"]
            },
            "width": {
                "type": Number,
                "attr": "width"
            }
        };
    }
    static get style() { return "/**style-placeholder:waf-arkanoid:**/"; }
}
class PlayerGame {
    constructor(level = 1, score = 0, lives = 3, gameoverCallback) {
        this.initialConfig = {};
        this.level = this.initialConfig.level = level;
        this.score = this.initialConfig.score = score;
        this.lives = this.initialConfig.lives = lives;
        this.cb = gameoverCallback;
    }
    levelUp() {
        this.level++;
        return this.status;
    }
    die() {
        this.lives--;
        if (this.lives <= 0)
            this.cb(this.status);
        return this.status;
    }
    scoreUpdate(amount = 1) {
        this.score += amount;
        return this.status;
    }
    reset() {
        this.level = this.initialConfig.level;
        this.score = this.initialConfig.score;
        this.lives = this.initialConfig.lives;
        return this.status;
    }
    get status() {
        return {
            level: this.level,
            score: this.score,
            lives: this.lives
        };
    }
    static get is() { return "waf-arkanoid"; }
    static get properties() {
        return {
            "activateFaceControls": {
                "type": Boolean,
                "attr": "activate-face-controls",
                "watchCallbacks": ["updateFaceCtrlState"]
            },
            "activateKeyboardControls": {
                "type": Boolean,
                "attr": "activate-keyboard-controls",
                "watchCallbacks": ["updateKeyboardCtrlState"]
            },
            "activateMouseControls": {
                "type": Boolean,
                "attr": "activate-mouse-controls",
                "watchCallbacks": ["updateMouseCtrlState"]
            },
            "akElt": {
                "elementRef": true
            },
            "height": {
                "type": Number,
                "attr": "height"
            },
            "isGameOver": {
                "state": true
            },
            "isPaused": {
                "state": true
            },
            "paddlePosition": {
                "type": Number,
                "attr": "paddle-position",
                "reflectToAttr": true,
                "mutable": true,
                "watchCallbacks": ["paddlePositionHandler"]
            },
            "width": {
                "type": Number,
                "attr": "width"
            }
        };
    }
    static get style() { return "/**style-placeholder:waf-arkanoid:**/"; }
}

function commandsExecutor(commands) {
    // traverse from a root object to desired function
    let funcFetcher = function(path, root) {
        const depthArray = path.split('.').reverse();
        let result = {
            func: root,
            scope: root
        };
        while (depthArray.length !== 0) {
            // go to function
            result.func = result.func[depthArray.pop()];
            // scope is parent of function
            if (depthArray.length === 1)
                result.scope = result.func;
        }
        return result;
    };
    commands.forEach(cmd => {
        let { func, scope } = funcFetcher(cmd.func, this);
        // execute function with provided arguments
        func.apply(scope, cmd.args);
    });
}