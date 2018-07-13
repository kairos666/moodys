import '../../stencil.core';
/**
 * &lt;WAF-FACE-DETECT&gt;
 * ===============
 * Access to device camera and detect faces in range. It supports multiple faces detection
 * Great thanks to tehnokv for providing great ressources https://github.com/tehnokv/picojs
 *
 * attributes:
 * - (optional) *draw-detection* [boolean] enable visual feedback on what is detected
 * - (optional) *width* width [number] of visual feedback (default 640px)
 * - (optional) *height* width [number] of visual feedback (default 480px)
 *
 * Sample
 * ------
 * ```
 * <waf-face-detect></waf-face-detect>
 * ```
 *
 * Know limitations
 * ----------------
 * - good detection happens when you face the camera and look in front of you. The more the head and gaze stray from this the harder it is to get a good detection
 * - WebAssembly necessary for performance
 * - component freeze if used in a rerendered slot (nesting in other component)
 * - WebRTC needed for video stream capture (sorry iOS users)
 * - still bugs to fix (works only in Chrome right now)
 */
export declare class WafFaceDetect {
    /** boolean attribute to make detections visible on video stream */
    drawDetection: boolean;
    /** number attribute - face detection element width (px) */
    width: number;
    /** number attribute - face detection element height (px) */
    height: number;
    /** face detect tag root DOM Element */
    private fdElt;
    /** custom event emitter - fire each animation frame with detection results */
    private wafFaceDetectorEE;
    /** face detect canvas DOM Element (the visible video) */
    private fdCanvas;
    /** face detect video DOM Element (invisible, only used to access video stream) */
    private fdVideo;
    /** config variable to tune face detect algorithm results */
    private detectionThreshold;
    /** path to async loaded dependencies */
    private assetsPath;
    /** file name for async loaded dependencies ([name].wasm & [name].js) */
    private wasmFaceDetectorFile;
    /** once async loaded and instanciated, this variable holds the WebAssembly module for face detection */
    private wasmFaceDetectorModule;
    /**
     * component render function
     */
    render(): JSX.Element[];
    /**
     * on component init reference canvas & video object
     */
    componentDidLoad(): void;
    /**
     * component functionality async initialisation
     */
    private init();
    /**
     * component init phase - get access to video stream (WebRTC) and bind it to video Element
     */
    private initCameraVideo();
    /**
     * component init phase - load and instanciate wasm module
     */
    private initWebAssembly();
    /**
     * component final init phase - bind everything to canvas to handle both video stream and face detection calculus inputs matrix
     */
    private initCanvas();
    /**
     * WebAssembly module - memory management
     */
    private faceDetectorAllocateMemory(width, height, maxndetections?);
    /**
     * WebAssembly module - input data -> calculate detection results -> handle results
     */
    private faceDetectionCalculate(image, width, height, allocations);
}
