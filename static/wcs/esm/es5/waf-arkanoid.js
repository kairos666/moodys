/*! Built with http://stenciljs.com */
var __generator=this&&this.__generator||function(e,t){var i,o,a,n,r={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return n={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function s(n){return function(s){return function(n){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,o&&(a=2&n[0]?o.return:n[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return r.label++,{value:n[1],done:!1};case 5:r.label++,o=n[1],n=[0];continue;case 7:n=r.ops.pop(),r.trys.pop();continue;default:if(!(a=(a=r.trys).length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){r=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){r.label=n[1];break}if(6===n[0]&&r.label<a[1]){r.label=a[1],a=n;break}if(a&&r.label<a[2]){r.label=a[2],r.ops.push(n);break}a[2]&&r.ops.pop(),r.trys.pop();continue}n=t.call(e,r)}catch(e){n=[6,e],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}([n,s])}}};import{h}from"./waf.core.js";var __awaiter=function(e,t,i,o){return new(i||(i=Promise))(function(a,n){function r(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){e.done?a(e.value):new i(function(t){t(e.value)}).then(r,s)}l((o=o.apply(e,t||[])).next())})},WafArkanoid=function(){function e(){this.paddlePosition=.5,this.isPaused=!0,this.isGameOver=!0,this.faceDetectLimiterActive=!1,this.configURL=location.origin+"/static/wcs-assets/arkanoid-config.json"}return e.prototype.render=function(){var e,t=this;return[h("canvas",{class:"arkanoid",width:this.width,height:this.height}),(e=null,t.isPaused&&(e=h("div",{class:"waf-arkanoid-menu waf-arkanoid-menu--initial"},h("header",null,t.isGameOver?"You failed!":"Start game!",h("br",null),"Level ",t.player?t.player.status.level:"1",h("br",null),"Score ",t.player?t.player.status.score:"0",", Lives ",t.player?t.player.status.lives:"3"),h("button",{type:"button",onClick:function(){return t.start()},class:"button-stylish"},t.isGameOver?"restart game":"start game!"))),e)]},e.prototype.paddlePositionHandler=function(e){var t=e<0?0:e>1?1:e,i=this.model.paddle.x,o=this.paddlePositionConverter(t),a=Math.abs(i-o)/this.width*this.config.paddle.maxTweenDelay;this.model.paddle.tween={from:i,to:o,elapsedTime:0,totalTime:a}},e.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,function(){var e=this;return __generator(this,function(t){switch(t.label){case 0:return[4,fetch(this.configURL)];case 1:return t.sent().json().then(function(t){e.worker=new Worker(""+location.origin+t.externals.collision_ww),e.worker.addEventListener("message",function(t){var i=t.data.return,o=e.model.paddle.tween;e.model=Object.assign(e.model,i.updatedModel),e.model.paddle.tween=o,commandsExecutor.bind(e)(i.cmds),e.drawModel(e.model)}),e.worker.addEventListener("error",function(e){console.warn(e)}),e.config=t,e.player=new PlayerGame(e.config.game.levels,e.config.game.score,e.config.game.lives,e.gameover.bind(e)),e.gameInitModel(),e.activateKeyboardControls&&e.setupControls("keyboard"),e.activateMouseControls&&e.setupControls("mouse"),e.activateFaceControls&&e.setupControls("face-detect"),e.akCanvasCtx=e.akElt.querySelector("canvas.arkanoid").getContext("2d"),e.drawLoop()}).catch(function(){console.warn("waf-arkanoid | config file couldn't be loaded or parsed")}),[2]}})})},e.prototype.updateKeyboardCtrlState=function(e){e?this.setupControls("keyboard"):this.setupControls("keyboard",!0)},e.prototype.updateMouseCtrlState=function(e){e?this.setupControls("mouse"):this.setupControls("mouse",!0)},e.prototype.updateFaceCtrlState=function(e){e?this.setupControls("face-detect"):this.setupControls("face-detect",!0)},e.prototype.componentDidUnload=function(){this.setupControls("keyboard",!0),this.setupControls("mouse",!0),this.setupControls("face-detect",!0),this.worker.terminate()},e.prototype.drawLoop=function(e){if(!this.isPaused){var t=this.elapsedTime(e);this.update(t)}this.faceDetectLimiterActive=!1,requestAnimationFrame(this.drawLoop.bind(this))},e.prototype.update=function(e){var t=Object.assign({},this.model);t.paddle.tween.elapsedTime<t.paddle.tween.totalTime&&(t.paddle=this.paddleTweener(e,Object.assign({},t.paddle)));var i={func:"collisionHandler",args:{dt:e,model:{ball:t.ball,bricks:t.bricks,game:t.game,paddle:t.paddle},config:this.config,width:this.width,height:this.height}};this.worker.postMessage(i)},e.prototype.paddleTweener=function(e,t){var i=t.tween;i.elapsedTime+=e,i.elapsedTime>i.totalTime&&(i.elapsedTime=i.totalTime),i.remainingTime-=e,i.remainingTime<0&&(i.elapsedTime=0);var o,a=(o=i.elapsedTime/i.totalTime)<.5?2*o*o:(4-2*o)*o-1;return t.x=i.from+a*(i.to-i.from),t},e.prototype.drawModel=function(e){var t=this.akCanvasCtx,i=e.paddle,o=e.ball;t.clearRect(0,0,this.width,this.height),e.bricks.forEach(function(e){e.hitCount>0&&(t.beginPath(),t.rect(e.x,e.y,e.width,e.height),t.fillStyle=e.color,t.fill(),t.closePath())}),t.beginPath(),t.rect(i.x,i.y,i.width,i.height),t.fillStyle=i.color,t.fill(),t.closePath(),t.beginPath(),t.arc(o.x,o.y,o.radius,0,2*Math.PI),t.fillStyle=o.color,t.fill(),t.closePath()},e.prototype.paddlePositionConverter=function(e){var t=this.config.bricks.sideSpace;return t+e*(this.width-this.config.bricks.sideSpace-this.config.paddle.paddleWidth-t)},e.prototype.elapsedTime=function(e){var t=0,i=this.model.game.lastFrame;return this.model.game.lastFrame=e,i&&(t=e-i),t},e.prototype.generateBricksModel=function(e,t,i){var o=Object.assign({},e),a=t[0].length,n=(i-2*o.sideSpace-o.brickGutter*(a-1))/a,r=t.map(function(e,t){return e.map(function(e,i){return{x:o.sideSpace+i*(n+o.brickGutter),y:o.sideSpace+t*(o.brickHeight+o.brickGutter),width:n,height:o.brickHeight,color:o.brickColor[e-1],hitCount:e,type:"brick"}})});return[].concat.apply([],r).filter(function(e){return e.hitCount>0})},e.prototype.generatePaddleModel=function(e,t){var i=Object.assign({},e);return{x:this.paddlePositionConverter(this.paddlePosition),y:t-i.bottomMargin-i.paddleHeight,width:i.paddleWidth,height:i.paddleHeight,color:i.paddleColor,tween:{from:this.paddlePositionConverter(this.paddlePosition),to:this.paddlePositionConverter(this.paddlePosition),elapsedTime:0,totalTime:0}}},e.prototype.generateBallModel=function(e,t){var i=Object.assign({},e);return{x:t.x+t.width/2,y:t.y-i.ballRadius,dx:i.initialSpeed,dy:-i.initialSpeed,accel:i.acceleration,radius:i.ballRadius,color:i.ballColor}},e.prototype.gameInitModel=function(){var e={bricks:null,paddle:null,ball:null,sounds:{brick:this.model?this.model.sounds.brick:new Audio(""+location.origin+this.config.externals.brick_snd),paddle:this.model?this.model.sounds.paddle:new Audio(""+location.origin+this.config.externals.paddle_snd),gameover:this.model?this.model.sounds.gameover:new Audio(""+location.origin+this.config.externals.gameover_snd)},game:Object.assign({},this.config.game)};e.bricks=this.generateBricksModel(this.config.bricks,this.config.levels[this.player.status.level-1],this.width),e.paddle=this.generatePaddleModel(this.config.paddle,this.height),e.ball=this.generateBallModel(this.config.ball,e.paddle),this.model=e},e.prototype.setupControls=function(e,t){var i=this;void 0===t&&(t=!1);var o=function(e){switch(e.which){case 37:i.paddlePosition=i.paddlePosition-.05>0?i.paddlePosition-.05:0;break;case 39:i.paddlePosition=i.paddlePosition+.05<1?i.paddlePosition+.05:1}},a=function(e){var t=e.pageX/document.body.offsetWidth;i.paddlePosition=t},n=function(e){if(!i.faceDetectLimiterActive&&e.detail.length>0){var t=i.config.faceDetect.detectSideMargins,o=i.config.faceDetect.jitterThreshold,a=Object.assign({},e.detail[0]),n=Math.max(a.x-t,0),r=1-Math.min(n/(i.width-2*t),1);Math.abs(i.paddlePosition-r)>o&&(i.faceDetectLimiterActive=!0,i.paddlePosition=r)}};"keyboard"!==e||t||document.addEventListener("keydown",o),"mouse"!==e||t||document.body.addEventListener("mousemove",a),"face-detect"!==e||t||this.akElt.parentElement.addEventListener("waf.face-detector.detected",n),"keyboard"===e&&t&&document.removeEventListener("keydown",o),"mouse"===e&&t&&document.body.removeEventListener("mousemove",a),"face-detect"===e&&t&&this.akElt.parentElement.removeEventListener("waf.face-detector.detected",n)},e.prototype.pause=function(){this.isPaused=!0},e.prototype.gameover=function(){this.isGameOver=!0,this.model.sounds.gameover.play()},e.prototype.start=function(){this.isGameOver&&this.player.reset(),this.gameInitModel(),this.isPaused=!1,this.isGameOver=!1},e.prototype.playSound=function(e){switch(e){case"brick":this.model.sounds.brick.play();break;case"paddle":this.model.sounds.paddle.play();break;case"gameover":this.model.sounds.gameover.play()}},Object.defineProperty(e,"is",{get:function(){return"waf-arkanoid"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activateFaceControls:{type:Boolean,attr:"activate-face-controls",watchCallbacks:["updateFaceCtrlState"]},activateKeyboardControls:{type:Boolean,attr:"activate-keyboard-controls",watchCallbacks:["updateKeyboardCtrlState"]},activateMouseControls:{type:Boolean,attr:"activate-mouse-controls",watchCallbacks:["updateMouseCtrlState"]},akElt:{elementRef:!0},height:{type:Number,attr:"height"},isGameOver:{state:!0},isPaused:{state:!0},paddlePosition:{type:Number,attr:"paddle-position",reflectToAttr:!0,mutable:!0,watchCallbacks:["paddlePositionHandler"]},width:{type:Number,attr:"width"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"waf-arkanoid{display:inline-block;position:relative}waf-arkanoid waf-face-detect{position:absolute;top:0;left:0;z-index:1}waf-arkanoid .arkanoid{position:relative;z-index:2}waf-arkanoid .waf-arkanoid-menu{position:absolute;z-index:3;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border-radius:3px;background:#fff;padding:24px;text-align:center}waf-arkanoid .waf-arkanoid-menu button{margin-top:24px}"},enumerable:!0,configurable:!0}),e}(),PlayerGame=function(){function e(e,t,i,o){void 0===e&&(e=1),void 0===t&&(t=0),void 0===i&&(i=3),this.initialConfig={},this.level=this.initialConfig.level=e,this.score=this.initialConfig.score=t,this.lives=this.initialConfig.lives=i,this.cb=o}return e.prototype.levelUp=function(){return this.level++,this.status},e.prototype.die=function(){return this.lives--,this.lives<=0&&this.cb(this.status),this.status},e.prototype.scoreUpdate=function(e){return void 0===e&&(e=1),this.score+=e,this.status},e.prototype.reset=function(){return this.level=this.initialConfig.level,this.score=this.initialConfig.score,this.lives=this.initialConfig.lives,this.status},Object.defineProperty(e.prototype,"status",{get:function(){return{level:this.level,score:this.score,lives:this.lives}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"is",{get:function(){return"waf-arkanoid"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{activateFaceControls:{type:Boolean,attr:"activate-face-controls",watchCallbacks:["updateFaceCtrlState"]},activateKeyboardControls:{type:Boolean,attr:"activate-keyboard-controls",watchCallbacks:["updateKeyboardCtrlState"]},activateMouseControls:{type:Boolean,attr:"activate-mouse-controls",watchCallbacks:["updateMouseCtrlState"]},akElt:{elementRef:!0},height:{type:Number,attr:"height"},isGameOver:{state:!0},isPaused:{state:!0},paddlePosition:{type:Number,attr:"paddle-position",reflectToAttr:!0,mutable:!0,watchCallbacks:["paddlePositionHandler"]},width:{type:Number,attr:"width"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"/**style-placeholder:waf-arkanoid:**/"},enumerable:!0,configurable:!0}),e}();function commandsExecutor(e){var t=this;e.forEach(function(e){var i=function(e,t){for(var i=e.split(".").reverse(),o={func:t,scope:t};0!==i.length;)o.func=o.func[i.pop()],1===i.length&&(o.scope=o.func);return o}(e.func,t),o=i.func,a=i.scope;o.apply(a,e.args)})}export{WafArkanoid};