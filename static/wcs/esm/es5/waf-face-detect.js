/*! Built with http://stenciljs.com */
import { h } from "./waf.core.js";
var global$1 = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};

function defaultSetTimout() { throw new Error("setTimeout has not been defined") }

function defaultClearTimeout() { throw new Error("clearTimeout has not been defined") }
var cachedSetTimeout = defaultSetTimout,
    cachedClearTimeout = defaultClearTimeout;

function runTimeout(e) { if (cachedSetTimeout === setTimeout) return setTimeout(e, 0); if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0); try { return cachedSetTimeout(e, 0) } catch (t) { try { return cachedSetTimeout.call(null, e, 0) } catch (t) { return cachedSetTimeout.call(this, e, 0) } } }

function runClearTimeout(e) { if (cachedClearTimeout === clearTimeout) return clearTimeout(e); if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e); try { return cachedClearTimeout(e) } catch (t) { try { return cachedClearTimeout.call(null, e) } catch (t) { return cachedClearTimeout.call(this, e) } } }
"function" == typeof global$1.setTimeout && (cachedSetTimeout = setTimeout), "function" == typeof global$1.clearTimeout && (cachedClearTimeout = clearTimeout);
var currentQueue, queue = [],
    draining = !1,
    queueIndex = -1;

function cleanUpNextTick() { draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue()) }

function drainQueue() { if (!draining) { var e = runTimeout(cleanUpNextTick);
        draining = !0; for (var t = queue.length; t;) { for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
            queueIndex = -1, t = queue.length }
        currentQueue = null, draining = !1, runClearTimeout(e) } }

function nextTick(e) { var t = new Array(arguments.length - 1); if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue) }

function Item(e, t) { this.fun = e, this.array = t }
Item.prototype.run = function() { this.fun.apply(null, this.array) };
var title = "browser",
    platform = "browser",
    browser = !0,
    env = {},
    argv = [],
    version = "",
    versions = {},
    release = {},
    config = {};

function noop() {}
var on = noop,
    addListener = noop,
    once = noop,
    off = noop,
    removeListener = noop,
    removeAllListeners = noop,
    emit = noop;

function binding(e) { throw new Error("process.binding is not supported") }

function cwd() { return "/" }

function chdir(e) { throw new Error("process.chdir is not supported") }

function umask() { return 0 }
var performance = global$1.performance || {},
    performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() { return (new Date).getTime() };

function hrtime(e) { var t = .001 * performanceNow.call(performance),
        n = Math.floor(t),
        r = Math.floor(t % 1 * 1e9); return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r] }
var startTime = new Date;

function uptime() { return (new Date - startTime) / 1e3 }
var process = { nextTick: nextTick, title: title, browser: browser, env: env, argv: argv, version: version, versions: versions, on: on, addListener: addListener, once: once, off: off, removeListener: removeListener, removeAllListeners: removeAllListeners, emit: emit, binding: binding, cwd: cwd, chdir: chdir, umask: umask, hrtime: hrtime, platform: platform, release: release, config: config, uptime: uptime };

function moduleInit() { var e, t = void 0 !== t ? t : {},
        n = {}; for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
    t.arguments = [], t.thisProgram = "./this.program", t.quit = function(e, t) { throw t }, t.preRun = [], t.postRun = []; var r, i, o = !1,
        a = !1,
        u = !1,
        s = !1; if (t.ENVIRONMENT)
        if ("WEB" === t.ENVIRONMENT) o = !0;
        else if ("WORKER" === t.ENVIRONMENT) a = !0;
    else if ("NODE" === t.ENVIRONMENT) u = !0;
    else { if ("SHELL" !== t.ENVIRONMENT) throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.");
        s = !0 } else o = "object" == typeof window, a = "function" == typeof importScripts, u = "object" == typeof process && "function" == typeof require && !o && !a, s = !o && !u && !a; for (e in u ? (t.read = function(e, t) { var n; return r || (r = require("fs")), i || (i = require("path")), e = i.normalize(e), n = r.readFileSync(e), t ? n : n.toString() }, t.readBinary = function(e) { var n = t.read(e, !0); return n.buffer || (n = new Uint8Array(n)), n.buffer, n }, process.argv.length > 1 && (t.thisProgram = process.argv[1].replace(/\\/g, "/")), t.arguments = process.argv.slice(2), "undefined" != typeof module && (module.exports = t), process.on("uncaughtException", function(e) { if (!(e instanceof P)) throw e }), process.on("unhandledRejection", function(e, t) { process.exit(1) }), t.inspect = function() { return "[Emscripten Module object]" }) : s ? ("undefined" != typeof read && (t.read = function(e) { return read(e) }), t.readBinary = function(e) { return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : read(e, "binary") }, "undefined" != typeof scriptArgs ? t.arguments = scriptArgs : void 0 !== arguments && (t.arguments = arguments), "function" == typeof quit && (t.quit = function(e, t) { quit(e) })) : (o || a) && (t.read = function(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.send(null), t.responseText }, a && (t.readBinary = function(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response) }), t.readAsync = function(e, t, n) { var r = new XMLHttpRequest;
            r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function() { 200 == r.status || 0 == r.status && r.response ? t(r.response) : n() }, r.onerror = n, r.send(null) }, t.setWindowTitle = function(e) { document.title = e }), t.print = "undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null, t.printErr = "undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || t.print, t.print = t.print, t.printErr = t.printErr, n) n.hasOwnProperty(e) && (t[e] = n[e]);
    n = void 0; var c = 16;

    function l(e, t) { return t || (t = c), Math.ceil(e / t) * t } var f = 0; "undefined" != typeof TextDecoder && new TextDecoder("utf8"), "undefined" != typeof TextDecoder && new TextDecoder("utf-16le"); var m, d, p, h, y, w, b, g;

    function v() { t.HEAP8 = new Int8Array(m), t.HEAP16 = p = new Int16Array(m), t.HEAP32 = h = new Int32Array(m), t.HEAPU8 = d = new Uint8Array(m), t.HEAPU16 = new Uint16Array(m), t.HEAPU32 = new Uint32Array(m), t.HEAPF32 = new Float32Array(m), t.HEAPF64 = new Float64Array(m) }

    function T() { F("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + E + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ") }
    y = w = 0; var A = t.TOTAL_STACK || 5242880,
        E = t.TOTAL_MEMORY || 16777216; if (E < A && t.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + E + "! (TOTAL_STACK=" + A + ")"), t.buffer ? m = t.buffer : ("object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (t.wasmMemory = new WebAssembly.Memory({ initial: E / 65536, maximum: E / 65536 }), m = t.wasmMemory.buffer) : m = new ArrayBuffer(E), t.buffer = m), v(), h[0] = 1668509029, p[1] = 25459, 115 !== d[2] || 99 !== d[3]) throw "Runtime error: expected the system to be little-endian!";

    function M(e) { for (; e.length > 0;) { var n = e.shift(); if ("function" != typeof n) { var r = n.func; "number" == typeof r ? void 0 === n.arg ? t.dynCall_v(r) : t.dynCall_vi(r, n.arg) : r(void 0 === n.arg ? null : n.arg) } else n() } } var R = [],
        _ = [],
        x = [],
        S = [],
        I = [],
        C = !1,
        N = 0,
        D = null,
        O = null;
    t.preloadedImages = {}, t.preloadedAudios = {}; var W = "data:application/octet-stream;base64,";

    function L(e) { return String.prototype.startsWith ? e.startsWith(W) : 0 === e.indexOf(W) }! function() { var e = "static/wcs-assets/wasmpico.wast",
            n = "static/wcs-assets/wasmpico.wasm",
            r = "static/wcs-assets/wasmpico.temp.asm.js"; "function" == typeof t.locateFile && (L(e) || (e = t.locateFile(e)), L(n) || (n = t.locateFile(n)), L(r) || (r = t.locateFile(r))); var i = { global: null, env: null, asm2wasm: { "f64-rem": function(e, t) { return e % t }, debugger: function() {} }, parent: t },
            u = null;

        function s() { try { if (t.wasmBinary) return new Uint8Array(t.wasmBinary); if (t.readBinary) return t.readBinary(n); throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)" } catch (e) { F(e) } }

        function c(e, r, c) { if ("object" != typeof WebAssembly) return t.printErr("no native wasm support detected"), !1; if (!(t.wasmMemory instanceof WebAssembly.Memory)) return t.printErr("no native wasm Memory in use"), !1;

            function l(e, n) {
                (u = e.exports).memory && function(e) { var n = t.buffer;
                        e.byteLength < n.byteLength && t.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"); var r, i = new Int8Array(n);
                        new Int8Array(e).set(i), r = e, t.buffer = m = r, v() }(u.memory), t.asm = u, t.usingWasm = !0,
                    function(e) { if (N--, t.monitorRunDependencies && t.monitorRunDependencies(N), 0 == N && (null !== D && (clearInterval(D), D = null), O)) { var n = O;
                            O = null, n() } }() } if (r.memory = t.wasmMemory, i.global = { NaN: NaN, Infinity: 1 / 0 }, i["global.Math"] = Math, i.env = r, N++, t.monitorRunDependencies && t.monitorRunDependencies(N), t.instantiateWasm) try { return t.instantiateWasm(i, l) } catch (e) { return t.printErr("Module.instantiateWasm callback failed with error: " + e), !1 }

            function f(e) { l(e.instance, e.module) }

            function d(e) {
                (t.wasmBinary || !o && !a || "function" != typeof fetch ? new Promise(function(e, t) { e(s()) }) : fetch(n, { credentials: "same-origin" }).then(function(e) { if (!e.ok) throw "failed to load wasm binary file at '" + n + "'"; return e.arrayBuffer() }).catch(function() { return s() })).then(function(e) { return WebAssembly.instantiate(e, i) }).then(e).catch(function(e) { t.printErr("failed to asynchronously prepare wasm: " + e), F(e) }) } return t.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || L(n) || "function" != typeof fetch ? d(f) : WebAssembly.instantiateStreaming(fetch(n, { credentials: "same-origin" }), i).then(f).catch(function(e) { t.printErr("wasm streaming compile failed: " + e), t.printErr("falling back to ArrayBuffer instantiation"), d(f) }), {} }
        t.asmPreload = t.asm; var l = t.reallocBuffer;
        t.reallocBuffer = function(e) { return "asmjs" === f ? l(e) : function(e) { var n, r;
                (n = e) % (r = t.usingWasm ? 65536 : 16777216) > 0 && (n += r - n % r), e = n; var i = t.buffer.byteLength; if (t.usingWasm) try { return -1 !== t.wasmMemory.grow((e - i) / 65536) ? t.buffer = t.wasmMemory.buffer : null } catch (e) { return null } }(e) }; var f = "";
        t.asm = function(e, n, r) { var i; if (!(n = n).table) { var o = t.wasmTableSize;
                void 0 === o && (o = 1024); var a = t.wasmMaxTableSize; "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table ? n.table = void 0 !== a ? new WebAssembly.Table({ initial: o, maximum: a, element: "anyfunc" }) : new WebAssembly.Table({ initial: o, element: "anyfunc" }) : n.table = new Array(o), t.wasmTable = n.table } return n.memoryBase || (n.memoryBase = t.STATIC_BASE), n.tableBase || (n.tableBase = 0), (i = c(0, n)) || F("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), i } }(), y = 242192, _.push(), t.STATIC_BASE = 1024, t.STATIC_BUMP = 241168, g = y += 16, b = l((w = l(y = y + 4 + 15 & -16)) + A), h[g >> 2] = b, t.wasmTableSize = 0, t.wasmMaxTableSize = 0, t.asmGlobalArg = {}, t.asmLibraryArg = { enlargeMemory: function() { T() }, getTotalMemory: function() { return E }, abortOnCannotGrowMemory: T, ___setErrNo: function(e) { return t.___errno_location && (h[t.___errno_location() >> 2] = e), e }, DYNAMICTOP_PTR: g, STACKTOP: w }; var q = t.asm(t.asmGlobalArg, t.asmLibraryArg, m);

    function P(e) { this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e }

    function B(e) {
        function n() { t.calledRun || (t.calledRun = !0, f || (C || (C = !0, M(_)), M(x), t.onRuntimeInitialized && t.onRuntimeInitialized(), function() { if (t.postRun)
                    for ("function" == typeof t.postRun && (t.postRun = [t.postRun]); t.postRun.length;) e = t.postRun.shift(), I.unshift(e); var e;
                M(I) }())) }
        e = e || t.arguments, N > 0 || (function() { if (t.preRun)
                for ("function" == typeof t.preRun && (t.preRun = [t.preRun]); t.preRun.length;) e = t.preRun.shift(), R.unshift(e); var e;
            M(R) }(), N > 0 || t.calledRun || (t.setStatus ? (t.setStatus("Running..."), setTimeout(function() { setTimeout(function() { t.setStatus("") }, 1), n() }, 1)) : n())) }

    function F(e) { throw t.onAbort && t.onAbort(e), void 0 !== e ? (t.print(e), t.printErr(e), e = JSON.stringify(e)) : e = "", f = !0, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info." } if (t.asm = q, t.___errno_location = function() { return t.asm.___errno_location.apply(null, arguments) }, t._cluster_detections = function() { return t.asm._cluster_detections.apply(null, arguments) }, t._find_faces = function() { return t.asm._find_faces.apply(null, arguments) }, t._free = function() { return t.asm._free.apply(null, arguments) }, t._malloc = function() { return t.asm._malloc.apply(null, arguments) }, t.asm = q, P.prototype = new Error, P.prototype.constructor = P, O = function e() { t.calledRun || B(), t.calledRun || (O = e) }, t.run = B, t.exit = function(e, n) { n && t.noExitRuntime && 0 === e || (t.noExitRuntime || (f = !0, w = void 0, M(S), t.onExit && t.onExit(e)), u && process.exit(e), t.quit(e, new P(e))) }, t.abort = F, t.preInit)
        for ("function" == typeof t.preInit && (t.preInit = [t.preInit]); t.preInit.length > 0;) t.preInit.pop()(); return t.noExitRuntime = !0, B(), t }
var WafFaceDetect = function() {
    function e() { this.drawDetection = !1, this.width = 640, this.height = 480, this.detectionThreshold = 3, this.assetsPath = location.origin + "/static/wcs-assets/", this.wasmFaceDetectorFile = "wasmpico" } return e.prototype.render = function() { return [h("video", { autoplay: !0, playsinline: !0, width: "1", height: "1" }), h("canvas", { class: "face-detect", width: this.width, height: this.height })] }, e.prototype.componentDidLoad = function() { this.fdCanvas = this.fdElt.querySelector("canvas.face-detect"), this.fdVideo = this.fdElt.querySelector("video"); var e = this.fdCanvas.getContext("2d");
        e.translate(this.width, 0), e.scale(-1, 1), this.init() }, e.prototype.init = function() { var e = this;
        Promise.all([this.initCameraVideo(), this.initWebAssembly()]).then(function() { e.initCanvas() }).catch(function(e) { console.warn(e) }) }, e.prototype.initCameraVideo = function() { var e = this; return new Promise(function(t, n) { navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({ video: !0, audio: !1 }).then(function(n) { e.fdVideo.srcObject = n, t() }) : n("getUserMedia() is not supported by this browser") }) }, e.prototype.initWebAssembly = function() { var e = this; return new Promise(function(t, n) { WebAssembly ? WebAssembly.compileStreaming(fetch("" + e.assetsPath + e.wasmFaceDetectorFile + ".wasm")).then(function() { e.wasmFaceDetectorModule = moduleInit(), t() }) : n("This browser can't execute Web Assembly modules") }) }, e.prototype.initCanvas = function() { var e = this,
            t = this.faceDetectorAllocateMemory(this.width, this.height),
            n = function() { var r = e.fdCanvas.getContext("2d"),
                    i = e.fdVideo,
                    o = e.width,
                    a = e.height;
                r.drawImage(i, 0, 0); var u = r.getImageData(0, 0, o, a),
                    s = e.faceDetectionCalculate(u, o, a, t);
                e.wafFaceDetectorEE.emit(s), window.requestAnimationFrame(n) }; return window.requestAnimationFrame(n), Promise.resolve() }, e.prototype.faceDetectorAllocateMemory = function(e, t, n) { void 0 === n && (n = 1024); var r = this.wasmFaceDetectorModule._malloc(e * t),
            i = new Uint8Array(this.wasmFaceDetectorModule.HEAPU8.buffer, r, e * t),
            o = this.wasmFaceDetectorModule._malloc(16 * n); return { ppixels: r, pixels: i, prcsq: o, rscq: new Float32Array(this.wasmFaceDetectorModule.HEAPU8.buffer, o, n), maxndetections: n } }, e.prototype.faceDetectionCalculate = function(e, t, n, r) { var i = this,
            o = e.data,
            a = r.ppixels,
            u = r.pixels,
            s = r.prcsq,
            c = r.rscq,
            l = r.maxndetections;
        Array(n).fill("fake").forEach(function(e, n) { Array(t).fill("fake").forEach(function(e, r) { u[n * t + r] = (2 * o[4 * n * t + 4 * r + 0] + 7 * o[4 * n * t + 4 * r + 1] + 1 * o[4 * n * t + 4 * r + 2]) / 10 }) }); var f = this.wasmFaceDetectorModule._find_faces(s, l, a, n, t, t, 1.1, .1, 100, 1e3);
        f = this.wasmFaceDetectorModule._cluster_detections(s, f); var m = [],
            d = this.fdCanvas.getContext("2d"); return Array(f).fill("fake").forEach(function(e, t) { if (c[4 * t + 3] > i.detectionThreshold) { var n = i.width - c[4 * t + 1];
                m.push({ x: n, y: c[4 * t + 0], size: c[4 * t + 2] }), i.drawDetection && (d.beginPath(), d.arc(n, c[4 * t + 0], c[4 * t + 2] / 2, 0, 2 * Math.PI, !1), d.lineWidth = 2, d.strokeStyle = "#0093e0", d.stroke()) } }), m }, Object.defineProperty(e, "is", { get: function() { return "waf-face-detect" }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function() { return { drawDetection: { type: Boolean, attr: "draw-detection" }, fdElt: { elementRef: !0 }, height: { type: Number, attr: "height" }, width: { type: Number, attr: "width" } } }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "events", { get: function() { return [{ name: "waf.face-detector.detected", method: "wafFaceDetectorEE", bubbles: !0, cancelable: !0, composed: !0 }] }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function() { return "" }, enumerable: !0, configurable: !0 }), e }();
export { WafFaceDetect };