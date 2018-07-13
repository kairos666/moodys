/*! Built with http://stenciljs.com */
const { h: t } = window.waf;
var e = function(t, e, i, s) { return new(i || (i = Promise))(function(a, o) {
        function l(t) { try { r(s.next(t)) } catch (t) { o(t) } }

        function n(t) { try { r(s.throw(t)) } catch (t) { o(t) } }

        function r(t) { t.done ? a(t.value) : new i(function(e) { e(t.value) }).then(l, n) }
        r((s = s.apply(t, e || [])).next()) }) };
class i { constructor() { this.paddlePosition = .5, this.isPaused = !0, this.isGameOver = !0, this.faceDetectLimiterActive = !1, this.configURL = `${location.origin}/static/wcs-assets/arkanoid-config.json` }
    render() { return [t("canvas", { class: "arkanoid", width: this.width, height: this.height }), (() => { let e = null; return this.isPaused && (e = t("div", { class: "waf-arkanoid-menu waf-arkanoid-menu--initial" }, t("header", null, this.isGameOver ? "You failed!" : "Start game!", t("br", null), "Level ", this.player ? this.player.status.level : "1", t("br", null), "Score ", this.player ? this.player.status.score : "0", ", Lives ", this.player ? this.player.status.lives : "3"), t("button", { type: "button", onClick: () => this.start(), class: "button-stylish" }, this.isGameOver ? "restart game" : "start game!"))), e })()] }
    paddlePositionHandler(t) { let e = t < 0 ? 0 : t > 1 ? 1 : t; const i = this.model.paddle.x,
            s = this.paddlePositionConverter(e); let a = Math.abs(i - s) / this.width * this.config.paddle.maxTweenDelay;
        this.model.paddle.tween = { from: i, to: s, elapsedTime: 0, totalTime: a } }
    componentDidLoad() { return e(this, void 0, void 0, function*() {
            (yield fetch(this.configURL)).json().then(t => { this.worker = new Worker(`${location.origin}${t.externals.collision_ww}`), this.worker.addEventListener("message", t => { const e = t.data.return,
                        i = this.model.paddle.tween;
                    this.model = Object.assign(this.model, e.updatedModel), this.model.paddle.tween = i,
                        function(t) { t.forEach(t => { let { func: e, scope: i } = function(e, i) { const s = t.func.split(".").reverse(); let a = { func: i, scope: i }; for (; 0 !== s.length;) a.func = a.func[s.pop()], 1 === s.length && (a.scope = a.func); return a }(0, this);
                                e.apply(i, t.args) }) }.bind(this)(e.cmds), this.drawModel(this.model) }), this.worker.addEventListener("error", t => { console.warn(t) }), this.config = t, this.player = new s(this.config.game.levels, this.config.game.score, this.config.game.lives, this.gameover.bind(this)), this.gameInitModel(), this.activateKeyboardControls && this.setupControls("keyboard"), this.activateMouseControls && this.setupControls("mouse"), this.activateFaceControls && this.setupControls("face-detect"), this.akCanvasCtx = this.akElt.querySelector("canvas.arkanoid").getContext("2d"), this.drawLoop() }).catch(() => { console.warn("waf-arkanoid | config file couldn't be loaded or parsed") }) }) }
    updateKeyboardCtrlState(t) { t ? this.setupControls("keyboard") : this.setupControls("keyboard", !0) }
    updateMouseCtrlState(t) { t ? this.setupControls("mouse") : this.setupControls("mouse", !0) }
    updateFaceCtrlState(t) { t ? this.setupControls("face-detect") : this.setupControls("face-detect", !0) }
    componentDidUnload() { this.setupControls("keyboard", !0), this.setupControls("mouse", !0), this.setupControls("face-detect", !0), this.worker.terminate() }
    drawLoop(t) { if (!this.isPaused) { const e = this.elapsedTime(t);
            this.update(e) }
        this.faceDetectLimiterActive = !1, requestAnimationFrame(this.drawLoop.bind(this)) }
    update(t) { const e = Object.assign({}, this.model);
        e.paddle.tween.elapsedTime < e.paddle.tween.totalTime && (e.paddle = this.paddleTweener(t, Object.assign({}, e.paddle))); const i = { func: "collisionHandler", args: { dt: t, model: { ball: e.ball, bricks: e.bricks, game: e.game, paddle: e.paddle }, config: this.config, width: this.width, height: this.height } };
        this.worker.postMessage(i) }
    paddleTweener(t, e) { const i = e.tween;
        i.elapsedTime += t, i.elapsedTime > i.totalTime && (i.elapsedTime = i.totalTime), i.remainingTime -= t, i.remainingTime < 0 && (i.elapsedTime = 0); const s = (a = i.elapsedTime / i.totalTime) < .5 ? 2 * a * a : (4 - 2 * a) * a - 1; var a; return e.x = i.from + s * (i.to - i.from), e }
    drawModel(t) { const e = this.akCanvasCtx,
            i = t.paddle,
            s = t.ball;
        e.clearRect(0, 0, this.width, this.height), t.bricks.forEach(t => { t.hitCount > 0 && (e.beginPath(), e.rect(t.x, t.y, t.width, t.height), e.fillStyle = t.color, e.fill(), e.closePath()) }), e.beginPath(), e.rect(i.x, i.y, i.width, i.height), e.fillStyle = i.color, e.fill(), e.closePath(), e.beginPath(), e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.fillStyle = s.color, e.fill(), e.closePath() }
    paddlePositionConverter(t) { const e = this.config.bricks.sideSpace; return e + t * (this.width - this.config.bricks.sideSpace - this.config.paddle.paddleWidth - e) }
    elapsedTime(t) { let e = 0; const i = this.model.game.lastFrame; return this.model.game.lastFrame = t, i && (e = t - i), e }
    generateBricksModel(t, e, i) { const s = Object.assign({}, t),
            a = e[0].length,
            o = (i - 2 * s.sideSpace - s.brickGutter * (a - 1)) / a,
            l = e.map((t, e) => t.map((t, i) => ({ x: s.sideSpace + i * (o + s.brickGutter), y: s.sideSpace + e * (s.brickHeight + s.brickGutter), width: o, height: s.brickHeight, color: s.brickColor[t - 1], hitCount: t, type: "brick" }))); return [].concat.apply([], l).filter(t => t.hitCount > 0) }
    generatePaddleModel(t, e) { const i = Object.assign({}, t); return { x: this.paddlePositionConverter(this.paddlePosition), y: e - i.bottomMargin - i.paddleHeight, width: i.paddleWidth, height: i.paddleHeight, color: i.paddleColor, tween: { from: this.paddlePositionConverter(this.paddlePosition), to: this.paddlePositionConverter(this.paddlePosition), elapsedTime: 0, totalTime: 0 } } }
    generateBallModel(t, e) { const i = Object.assign({}, t); return { x: e.x + e.width / 2, y: e.y - i.ballRadius, dx: i.initialSpeed, dy: -i.initialSpeed, accel: i.acceleration, radius: i.ballRadius, color: i.ballColor } }
    gameInitModel() { const t = { bricks: null, paddle: null, ball: null, sounds: { brick: this.model ? this.model.sounds.brick : new Audio(`${location.origin}${this.config.externals.brick_snd}`), paddle: this.model ? this.model.sounds.paddle : new Audio(`${location.origin}${this.config.externals.paddle_snd}`), gameover: this.model ? this.model.sounds.gameover : new Audio(`${location.origin}${this.config.externals.gameover_snd}`) }, game: Object.assign({}, this.config.game) };
        t.bricks = this.generateBricksModel(this.config.bricks, this.config.levels[this.player.status.level - 1], this.width), t.paddle = this.generatePaddleModel(this.config.paddle, this.height), t.ball = this.generateBallModel(this.config.ball, t.paddle), this.model = t }
    setupControls(t, e = !1) { const i = t => { switch (t.which) {
                    case 37:
                        this.paddlePosition = this.paddlePosition - .05 > 0 ? this.paddlePosition - .05 : 0; break;
                    case 39:
                        this.paddlePosition = this.paddlePosition + .05 < 1 ? this.paddlePosition + .05 : 1 } },
            s = t => { const e = t.pageX / document.body.offsetWidth;
                this.paddlePosition = e },
            a = t => { if (!this.faceDetectLimiterActive && t.detail.length > 0) { const e = this.config.faceDetect.detectSideMargins,
                        i = this.config.faceDetect.jitterThreshold,
                        s = Object.assign({}, t.detail[0]),
                        a = Math.max(s.x - e, 0),
                        o = 1 - Math.min(a / (this.width - 2 * e), 1);
                    Math.abs(this.paddlePosition - o) > i && (this.faceDetectLimiterActive = !0, this.paddlePosition = o) } }; "keyboard" !== t || e || document.addEventListener("keydown", i), "mouse" !== t || e || document.body.addEventListener("mousemove", s), "face-detect" !== t || e || this.akElt.parentElement.addEventListener("waf.face-detector.detected", a), "keyboard" === t && e && document.removeEventListener("keydown", i), "mouse" === t && e && document.body.removeEventListener("mousemove", s), "face-detect" === t && e && this.akElt.parentElement.removeEventListener("waf.face-detector.detected", a) }
    pause() { this.isPaused = !0 }
    gameover() { this.isGameOver = !0, this.model.sounds.gameover.play() }
    start() { this.isGameOver && this.player.reset(), this.gameInitModel(), this.isPaused = !1, this.isGameOver = !1 }
    playSound(t) { switch (t) {
            case "brick":
                this.model.sounds.brick.play(); break;
            case "paddle":
                this.model.sounds.paddle.play(); break;
            case "gameover":
                this.model.sounds.gameover.play() } }
    static get is() { return "waf-arkanoid" }
    static get properties() { return { activateFaceControls: { type: Boolean, attr: "activate-face-controls", watchCallbacks: ["updateFaceCtrlState"] }, activateKeyboardControls: { type: Boolean, attr: "activate-keyboard-controls", watchCallbacks: ["updateKeyboardCtrlState"] }, activateMouseControls: { type: Boolean, attr: "activate-mouse-controls", watchCallbacks: ["updateMouseCtrlState"] }, akElt: { elementRef: !0 }, height: { type: Number, attr: "height" }, isGameOver: { state: !0 }, isPaused: { state: !0 }, paddlePosition: { type: Number, attr: "paddle-position", reflectToAttr: !0, mutable: !0, watchCallbacks: ["paddlePositionHandler"] }, width: { type: Number, attr: "width" } } }
    static get style() { return "waf-arkanoid{display:inline-block;position:relative}waf-arkanoid waf-face-detect{position:absolute;top:0;left:0;z-index:1}waf-arkanoid .arkanoid{position:relative;z-index:2}waf-arkanoid .waf-arkanoid-menu{position:absolute;z-index:3;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border-radius:3px;background:#fff;padding:24px;text-align:center}waf-arkanoid .waf-arkanoid-menu button{margin-top:24px}" } }
class s { constructor(t = 1, e = 0, i = 3, s) { this.initialConfig = {}, this.level = this.initialConfig.level = t, this.score = this.initialConfig.score = e, this.lives = this.initialConfig.lives = i, this.cb = s }
    levelUp() { return this.level++, this.status }
    die() { return this.lives--, this.lives <= 0 && this.cb(this.status), this.status }
    scoreUpdate(t = 1) { return this.score += t, this.status }
    reset() { return this.level = this.initialConfig.level, this.score = this.initialConfig.score, this.lives = this.initialConfig.lives, this.status }
    get status() { return { level: this.level, score: this.score, lives: this.lives } }
    static get is() { return "waf-arkanoid" }
    static get properties() { return { activateFaceControls: { type: Boolean, attr: "activate-face-controls", watchCallbacks: ["updateFaceCtrlState"] }, activateKeyboardControls: { type: Boolean, attr: "activate-keyboard-controls", watchCallbacks: ["updateKeyboardCtrlState"] }, activateMouseControls: { type: Boolean, attr: "activate-mouse-controls", watchCallbacks: ["updateMouseCtrlState"] }, akElt: { elementRef: !0 }, height: { type: Number, attr: "height" }, isGameOver: { state: !0 }, isPaused: { state: !0 }, paddlePosition: { type: Number, attr: "paddle-position", reflectToAttr: !0, mutable: !0, watchCallbacks: ["paddlePositionHandler"] }, width: { type: Number, attr: "width" } } }
    static get style() { return "/**style-placeholder:waf-arkanoid:**/" } }
export { i as WafArkanoid };