/*! Built with http://stenciljs.com */
const { h: e } = window.waf;
var t = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};

function n() { throw new Error("setTimeout has not been defined") }

function r() { throw new Error("clearTimeout has not been defined") }
var i = n,
    o = r;

function a(e) { if (i === setTimeout) return setTimeout(e, 0); if ((i === n || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0); try { return i(e, 0) } catch (t) { try { return i.call(null, e, 0) } catch (t) { return i.call(this, e, 0) } } }
"function" == typeof t.setTimeout && (i = setTimeout), "function" == typeof t.clearTimeout && (o = clearTimeout);
var s, u = [],
    c = !1,
    l = -1;

function f() { c && s && (c = !1, s.length ? u = s.concat(u) : l = -1, u.length && m()) }

function m() { if (!c) { var e = a(f);
        c = !0; for (var t = u.length; t;) { for (s = u, u = []; ++l < t;) s && s[l].run();
            l = -1, t = u.length }
        s = null, c = !1,
            function(e) { if (o === clearTimeout) return clearTimeout(e); if ((o === r || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e); try { o(e) } catch (t) { try { return o.call(null, e) } catch (t) { return o.call(this, e) } } }(e) } }

function d(e, t) { this.fun = e, this.array = t }

function h() {}
d.prototype.run = function() { this.fun.apply(null, this.array) };
var p = h,
    y = h,
    w = h,
    b = h,
    g = h,
    v = h,
    A = h,
    E = t.performance || {},
    T = E.now || E.mozNow || E.msNow || E.oNow || E.webkitNow || function() { return (new Date).getTime() },
    M = new Date,
    R = { nextTick: function(e) { var t = new Array(arguments.length - 1); if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            u.push(new d(e, t)), 1 !== u.length || c || a(m) }, title: "browser", browser: !0, env: {}, argv: [], version: "", versions: {}, on: p, addListener: y, once: w, off: b, removeListener: g, removeAllListeners: v, emit: A, binding: function(e) { throw new Error("process.binding is not supported") }, cwd: function() { return "/" }, chdir: function(e) { throw new Error("process.chdir is not supported") }, umask: function() { return 0 }, hrtime: function(e) { var t = .001 * T.call(E),
                n = Math.floor(t),
                r = Math.floor(t % 1 * 1e9); return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r] }, platform: "browser", release: {}, config: {}, uptime: function() { return (new Date - M) / 1e3 } };

function _() { var e, t = void 0 !== t ? t : {},
        n = {}; for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
    t.arguments = [], t.thisProgram = "./this.program", t.quit = function(e, t) { throw t }, t.preRun = [], t.postRun = []; var r, i, o = !1,
        a = !1,
        s = !1,
        u = !1; if (t.ENVIRONMENT)
        if ("WEB" === t.ENVIRONMENT) o = !0;
        else if ("WORKER" === t.ENVIRONMENT) a = !0;
    else if ("NODE" === t.ENVIRONMENT) s = !0;
    else { if ("SHELL" !== t.ENVIRONMENT) throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.");
        u = !0 } else o = "object" == typeof window, a = "function" == typeof importScripts, s = "object" == typeof R && "function" == typeof require && !o && !a, u = !o && !s && !a; for (e in s ? (t.read = function(e, t) { var n; return r || (r = require("fs")), i || (i = require("path")), e = i.normalize(e), n = r.readFileSync(e), t ? n : n.toString() }, t.readBinary = function(e) { var n = t.read(e, !0); return n.buffer || (n = new Uint8Array(n)), n.buffer, n }, R.argv.length > 1 && (t.thisProgram = R.argv[1].replace(/\\/g, "/")), t.arguments = R.argv.slice(2), "undefined" != typeof module && (module.exports = t), R.on("uncaughtException", function(e) { if (!(e instanceof F)) throw e }), R.on("unhandledRejection", function(e, t) { R.exit(1) }), t.inspect = function() { return "[Emscripten Module object]" }) : u ? ("undefined" != typeof read && (t.read = function(e) { return read(e) }), t.readBinary = function(e) { return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : read(e, "binary") }, "undefined" != typeof scriptArgs ? t.arguments = scriptArgs : void 0 !== arguments && (t.arguments = arguments), "function" == typeof quit && (t.quit = function(e, t) { quit(e) })) : (o || a) && (t.read = function(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.send(null), t.responseText }, a && (t.readBinary = function(e) { var t = new XMLHttpRequest; return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response) }), t.readAsync = function(e, t, n) { var r = new XMLHttpRequest;
            r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function() { 200 == r.status || 0 == r.status && r.response ? t(r.response) : n() }, r.onerror = n, r.send(null) }, t.setWindowTitle = function(e) { document.title = e }), t.print = "undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null, t.printErr = "undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || t.print, t.print = t.print, t.printErr = t.printErr, n) n.hasOwnProperty(e) && (t[e] = n[e]);
    n = void 0; var c = 16;

    function l(e, t) { return t || (t = c), Math.ceil(e / t) * t } var f = 0; "undefined" != typeof TextDecoder && new TextDecoder("utf8"), "undefined" != typeof TextDecoder && new TextDecoder("utf-16le"); var m, d, h, p, y, w, b, g;

    function v() { t.HEAP8 = new Int8Array(m), t.HEAP16 = h = new Int16Array(m), t.HEAP32 = p = new Int32Array(m), t.HEAPU8 = d = new Uint8Array(m), t.HEAPU16 = new Uint16Array(m), t.HEAPU32 = new Uint32Array(m), t.HEAPF32 = new Float32Array(m), t.HEAPF64 = new Float64Array(m) }

    function A() { U("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + T + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ") }
    y = w = 0; var E = t.TOTAL_STACK || 5242880,
        T = t.TOTAL_MEMORY || 16777216; if (T < E && t.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + T + "! (TOTAL_STACK=" + E + ")"), t.buffer ? m = t.buffer : ("object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (t.wasmMemory = new WebAssembly.Memory({ initial: T / 65536, maximum: T / 65536 }), m = t.wasmMemory.buffer) : m = new ArrayBuffer(T), t.buffer = m), v(), p[0] = 1668509029, h[1] = 25459, 115 !== d[2] || 99 !== d[3]) throw "Runtime error: expected the system to be little-endian!";

    function M(e) { for (; e.length > 0;) { var n = e.shift(); if ("function" != typeof n) { var r = n.func; "number" == typeof r ? void 0 === n.arg ? t.dynCall_v(r) : t.dynCall_vi(r, n.arg) : r(void 0 === n.arg ? null : n.arg) } else n() } } var _ = [],
        x = [],
        D = [],
        N = [],
        S = [],
        W = !1,
        O = 0,
        I = null,
        L = null;
    t.preloadedImages = {}, t.preloadedAudios = {}; var P = "data:application/octet-stream;base64,";

    function B(e) { return String.prototype.startsWith ? e.startsWith(P) : 0 === e.indexOf(P) }! function() { var e = "static/wcs-assets/wasmpico.wast",
            n = "static/wcs-assets/wasmpico.wasm",
            r = "static/wcs-assets/wasmpico.temp.asm.js"; "function" == typeof t.locateFile && (B(e) || (e = t.locateFile(e)), B(n) || (n = t.locateFile(n)), B(r) || (r = t.locateFile(r))); var i = { global: null, env: null, asm2wasm: { "f64-rem": function(e, t) { return e % t }, debugger: function() {} }, parent: t },
            s = null;

        function u() { try { if (t.wasmBinary) return new Uint8Array(t.wasmBinary); if (t.readBinary) return t.readBinary(n); throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)" } catch (e) { U(e) } }

        function c(e, r, c) { if ("object" != typeof WebAssembly) return t.printErr("no native wasm support detected"), !1; if (!(t.wasmMemory instanceof WebAssembly.Memory)) return t.printErr("no native wasm Memory in use"), !1;

            function l(e, n) {
                (s = e.exports).memory && function(e) { var n = t.buffer;
                        e.byteLength < n.byteLength && t.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"); var r, i = new Int8Array(n);
                        new Int8Array(e).set(i), r = e, t.buffer = m = r, v() }(s.memory), t.asm = s, t.usingWasm = !0,
                    function(e) { if (O--, t.monitorRunDependencies && t.monitorRunDependencies(O), 0 == O && (null !== I && (clearInterval(I), I = null), L)) { var n = L;
                            L = null, n() } }() } if (r.memory = t.wasmMemory, i.global = { NaN: NaN, Infinity: 1 / 0 }, i["global.Math"] = Math, i.env = r, O++, t.monitorRunDependencies && t.monitorRunDependencies(O), t.instantiateWasm) try { return t.instantiateWasm(i, l) } catch (e) { return t.printErr("Module.instantiateWasm callback failed with error: " + e), !1 }

            function f(e) { l(e.instance, e.module) }

            function d(e) {
                (t.wasmBinary || !o && !a || "function" != typeof fetch ? new Promise(function(e, t) { e(u()) }) : fetch(n, { credentials: "same-origin" }).then(function(e) { if (!e.ok) throw "failed to load wasm binary file at '" + n + "'"; return e.arrayBuffer() }).catch(function() { return u() })).then(function(e) { return WebAssembly.instantiate(e, i) }).then(e).catch(function(e) { t.printErr("failed to asynchronously prepare wasm: " + e), U(e) }) } return t.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || B(n) || "function" != typeof fetch ? d(f) : WebAssembly.instantiateStreaming(fetch(n, { credentials: "same-origin" }), i).then(f).catch(function(e) { t.printErr("wasm streaming compile failed: " + e), t.printErr("falling back to ArrayBuffer instantiation"), d(f) }), {} }
        t.asmPreload = t.asm; var l = t.reallocBuffer;
        t.reallocBuffer = function(e) { return "asmjs" === f ? l(e) : function(e) { var n, r;
                (n = e) % (r = t.usingWasm ? 65536 : 16777216) > 0 && (n += r - n % r), e = n; var i = t.buffer.byteLength; if (t.usingWasm) try { return -1 !== t.wasmMemory.grow((e - i) / 65536) ? t.buffer = t.wasmMemory.buffer : null } catch (e) { return null } }(e) }; var f = "";
        t.asm = function(e, n, r) { var i; if (!(n = n).table) { var o = t.wasmTableSize;
                void 0 === o && (o = 1024); var a = t.wasmMaxTableSize; "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table ? n.table = void 0 !== a ? new WebAssembly.Table({ initial: o, maximum: a, element: "anyfunc" }) : new WebAssembly.Table({ initial: o, element: "anyfunc" }) : n.table = new Array(o), t.wasmTable = n.table } return n.memoryBase || (n.memoryBase = t.STATIC_BASE), n.tableBase || (n.tableBase = 0), (i = c(0, n)) || U("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), i } }(), y = 242192, x.push(), t.STATIC_BASE = 1024, t.STATIC_BUMP = 241168, g = y += 16, b = l((w = l(y = y + 4 + 15 & -16)) + E), p[g >> 2] = b, t.wasmTableSize = 0, t.wasmMaxTableSize = 0, t.asmGlobalArg = {}, t.asmLibraryArg = { enlargeMemory: function() { A() }, getTotalMemory: function() { return T }, abortOnCannotGrowMemory: A, ___setErrNo: function(e) { return t.___errno_location && (p[t.___errno_location() >> 2] = e), e }, DYNAMICTOP_PTR: g, STACKTOP: w }; var C = t.asm(t.asmGlobalArg, t.asmLibraryArg, m);

    function F(e) { this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e }

    function q(e) {
        function n() { t.calledRun || (t.calledRun = !0, f || (W || (W = !0, M(x)), M(D), t.onRuntimeInitialized && t.onRuntimeInitialized(), function() { if (t.postRun)
                    for ("function" == typeof t.postRun && (t.postRun = [t.postRun]); t.postRun.length;) e = t.postRun.shift(), S.unshift(e); var e;
                M(S) }())) }
        e = e || t.arguments, O > 0 || (function() { if (t.preRun)
                for ("function" == typeof t.preRun && (t.preRun = [t.preRun]); t.preRun.length;) e = t.preRun.shift(), _.unshift(e); var e;
            M(_) }(), O > 0 || t.calledRun || (t.setStatus ? (t.setStatus("Running..."), setTimeout(function() { setTimeout(function() { t.setStatus("") }, 1), n() }, 1)) : n())) }

    function U(e) { throw t.onAbort && t.onAbort(e), void 0 !== e ? (t.print(e), t.printErr(e), e = JSON.stringify(e)) : e = "", f = !0, "abort(" + e + "). Build with -s ASSERTIONS=1 for more info." } if (t.asm = C, t.___errno_location = function() { return t.asm.___errno_location.apply(null, arguments) }, t._cluster_detections = function() { return t.asm._cluster_detections.apply(null, arguments) }, t._find_faces = function() { return t.asm._find_faces.apply(null, arguments) }, t._free = function() { return t.asm._free.apply(null, arguments) }, t._malloc = function() { return t.asm._malloc.apply(null, arguments) }, t.asm = C, F.prototype = new Error, F.prototype.constructor = F, L = function e() { t.calledRun || q(), t.calledRun || (L = e) }, t.run = q, t.exit = function(e, n) { n && t.noExitRuntime && 0 === e || (t.noExitRuntime || (f = !0, w = void 0, M(N), t.onExit && t.onExit(e)), s && R.exit(e), t.quit(e, new F(e))) }, t.abort = U, t.preInit)
        for ("function" == typeof t.preInit && (t.preInit = [t.preInit]); t.preInit.length > 0;) t.preInit.pop()(); return t.noExitRuntime = !0, q(), t }
class x { constructor() { this.drawDetection = !1, this.width = 640, this.height = 480, this.detectionThreshold = 3, this.assetsPath = `${location.origin}/static/wcs-assets/`, this.wasmFaceDetectorFile = "wasmpico" }
    render() { return [e("video", { autoplay: !0, playsinline: !0, width: "1", height: "1" }), e("canvas", { class: "face-detect", width: this.width, height: this.height })] }
    componentDidLoad() { this.fdCanvas = this.fdElt.querySelector("canvas.face-detect"), this.fdVideo = this.fdElt.querySelector("video"); const e = this.fdCanvas.getContext("2d");
        e.translate(this.width, 0), e.scale(-1, 1), this.init() }
    init() { Promise.all([this.initCameraVideo(), this.initWebAssembly()]).then(() => { this.initCanvas() }).catch(e => { console.warn(e) }) }
    initCameraVideo() { return new Promise((e, t) => { navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({ video: !0, audio: !1 }).then(t => { this.fdVideo.srcObject = t, e() }) : t("getUserMedia() is not supported by this browser") }) }
    initWebAssembly() { return new Promise((e, t) => { WebAssembly ? WebAssembly.compileStreaming(fetch(`${this.assetsPath}${this.wasmFaceDetectorFile}.wasm`)).then(() => { this.wasmFaceDetectorModule = _(), e() }) : t("This browser can't execute Web Assembly modules") }) }
    initCanvas() { const e = this.faceDetectorAllocateMemory(this.width, this.height),
            t = () => { const n = this.fdCanvas.getContext("2d"),
                    r = this.fdVideo,
                    i = this.width,
                    o = this.height;
                n.drawImage(r, 0, 0); const a = n.getImageData(0, 0, i, o),
                    s = this.faceDetectionCalculate(a, i, o, e);
                this.wafFaceDetectorEE.emit(s), window.requestAnimationFrame(t) }; return window.requestAnimationFrame(t), Promise.resolve() }
    faceDetectorAllocateMemory(e, t, n = 1024) { let r = this.wasmFaceDetectorModule._malloc(e * t),
            i = new Uint8Array(this.wasmFaceDetectorModule.HEAPU8.buffer, r, e * t),
            o = this.wasmFaceDetectorModule._malloc(16 * n); return { ppixels: r, pixels: i, prcsq: o, rscq: new Float32Array(this.wasmFaceDetectorModule.HEAPU8.buffer, o, n), maxndetections: n } }
    faceDetectionCalculate(e, t, n, r) { const i = e.data,
            o = r.ppixels,
            a = r.pixels,
            s = r.prcsq,
            u = r.rscq,
            c = r.maxndetections;
        Array(n).fill("fake").forEach((e, n) => { Array(t).fill("fake").forEach((e, r) => { a[n * t + r] = (2 * i[4 * n * t + 4 * r + 0] + 7 * i[4 * n * t + 4 * r + 1] + 1 * i[4 * n * t + 4 * r + 2]) / 10 }) }); let l = this.wasmFaceDetectorModule._find_faces(s, c, o, n, t, t, 1.1, .1, 100, 1e3);
        l = this.wasmFaceDetectorModule._cluster_detections(s, l); let f = []; const m = this.fdCanvas.getContext("2d"); return Array(l).fill("fake").forEach((e, t) => { if (u[4 * t + 3] > this.detectionThreshold) { const e = this.width - u[4 * t + 1];
                f.push({ x: e, y: u[4 * t + 0], size: u[4 * t + 2] }), this.drawDetection && (m.beginPath(), m.arc(e, u[4 * t + 0], u[4 * t + 2] / 2, 0, 2 * Math.PI, !1), m.lineWidth = 2, m.strokeStyle = "#0093e0", m.stroke()) } }), f }
    static get is() { return "waf-face-detect" }
    static get properties() { return { drawDetection: { type: Boolean, attr: "draw-detection" }, fdElt: { elementRef: !0 }, height: { type: Number, attr: "height" }, width: { type: Number, attr: "width" } } }
    static get events() { return [{ name: "waf.face-detector.detected", method: "wafFaceDetectorEE", bubbles: !0, cancelable: !0, composed: !0 }] }
    static get style() { return "" } }
export { x as WafFaceDetect };