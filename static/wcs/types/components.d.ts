import './stencil.core';
/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import './stencil.core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface WafArkanoid {
      'activateFaceControls': boolean;
      'activateKeyboardControls': boolean;
      'activateMouseControls': boolean;
      'height': number;
      'paddlePosition': number;
      'width': number;
    }
  }

  interface HTMLWafArkanoidElement extends StencilComponents.WafArkanoid, HTMLStencilElement {}

  var HTMLWafArkanoidElement: {
    prototype: HTMLWafArkanoidElement;
    new (): HTMLWafArkanoidElement;
  };
  interface HTMLElementTagNameMap {
    'waf-arkanoid': HTMLWafArkanoidElement;
  }
  interface ElementTagNameMap {
    'waf-arkanoid': HTMLWafArkanoidElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-arkanoid': JSXElements.WafArkanoidAttributes;
    }
  }
  namespace JSXElements {
    export interface WafArkanoidAttributes extends HTMLAttributes {
      'activateFaceControls'?: boolean;
      'activateKeyboardControls'?: boolean;
      'activateMouseControls'?: boolean;
      'height'?: number;
      'paddlePosition'?: number;
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafDialog {
      /**
       * Public method to close the dialog
       */
      'hideModal': () => void;
      /**
       * by default long dialog box are scrollable in the viewport, this attribute toggle on the behavior where the dialog box is limited to the visible viewport, scroll happens in the content section of the box 
       */
      'limitedHeight': boolean;
      /**
       * flag for toggling off the backdrop effect entirely 
       */
      'noBackdrop': boolean;
      /**
       * flag for toggling off the closing of modal when backdrop is clicked 
       */
      'preventBackdropClosing': boolean;
      /**
       * Public method to open the dialog
       */
      'showModal': () => void;
      /**
       * Public method to toggle the dialog
       */
      'toggleModal': () => void;
    }
  }

  interface HTMLWafDialogElement extends StencilComponents.WafDialog, HTMLStencilElement {}

  var HTMLWafDialogElement: {
    prototype: HTMLWafDialogElement;
    new (): HTMLWafDialogElement;
  };
  interface HTMLElementTagNameMap {
    'waf-dialog': HTMLWafDialogElement;
  }
  interface ElementTagNameMap {
    'waf-dialog': HTMLWafDialogElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-dialog': JSXElements.WafDialogAttributes;
    }
  }
  namespace JSXElements {
    export interface WafDialogAttributes extends HTMLAttributes {
      /**
       * by default long dialog box are scrollable in the viewport, this attribute toggle on the behavior where the dialog box is limited to the visible viewport, scroll happens in the content section of the box 
       */
      'limitedHeight'?: boolean;
      /**
       * flag for toggling off the backdrop effect entirely 
       */
      'noBackdrop'?: boolean;
      /**
       * emitter for 'waf.dialog.close' custom event - fired when modal is closed 
       */
      'onWaf.dialog.close'?: (event: CustomEvent) => void;
      /**
       * emitter for 'waf.dialog.open' custom event - fired when modal is opened 
       */
      'onWaf.dialog.open'?: (event: CustomEvent) => void;
      /**
       * flag for toggling off the closing of modal when backdrop is clicked 
       */
      'preventBackdropClosing'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafFaceDetect {
      /**
       * boolean attribute to make detections visible on video stream 
       */
      'drawDetection': boolean;
      /**
       * number attribute - face detection element height (px) 
       */
      'height': number;
      /**
       * number attribute - face detection element width (px) 
       */
      'width': number;
    }
  }

  interface HTMLWafFaceDetectElement extends StencilComponents.WafFaceDetect, HTMLStencilElement {}

  var HTMLWafFaceDetectElement: {
    prototype: HTMLWafFaceDetectElement;
    new (): HTMLWafFaceDetectElement;
  };
  interface HTMLElementTagNameMap {
    'waf-face-detect': HTMLWafFaceDetectElement;
  }
  interface ElementTagNameMap {
    'waf-face-detect': HTMLWafFaceDetectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-face-detect': JSXElements.WafFaceDetectAttributes;
    }
  }
  namespace JSXElements {
    export interface WafFaceDetectAttributes extends HTMLAttributes {
      /**
       * boolean attribute to make detections visible on video stream 
       */
      'drawDetection'?: boolean;
      /**
       * number attribute - face detection element height (px) 
       */
      'height'?: number;
      /**
       * custom event emitter - fire each animation frame with detection results 
       */
      'onWaf.face-detector.detected'?: (event: CustomEvent) => void;
      /**
       * number attribute - face detection element width (px) 
       */
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafImg {
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (optional only when used as pure decorational image, otherwise you should always have one) 
       */
      'alt': string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'decoding': 'sync'|'async'|'auto';
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'height': string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'sizes': string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (required) 
       */
      'src': string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'srcset': string;
      /**
       * flag for toggling on/off the visble async loading behavior when off the default behavior is async loading after page is fully loaded 
       */
      'visibleAsyncLoading': boolean;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'width': string;
    }
  }

  interface HTMLWafImgElement extends StencilComponents.WafImg, HTMLStencilElement {}

  var HTMLWafImgElement: {
    prototype: HTMLWafImgElement;
    new (): HTMLWafImgElement;
  };
  interface HTMLElementTagNameMap {
    'waf-img': HTMLWafImgElement;
  }
  interface ElementTagNameMap {
    'waf-img': HTMLWafImgElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-img': JSXElements.WafImgAttributes;
    }
  }
  namespace JSXElements {
    export interface WafImgAttributes extends HTMLAttributes {
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (optional only when used as pure decorational image, otherwise you should always have one) 
       */
      'alt'?: string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'decoding'?: 'sync'|'async'|'auto';
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'height'?: string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'sizes'?: string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (required) 
       */
      'src'?: string;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'srcset'?: string;
      /**
       * flag for toggling on/off the visble async loading behavior when off the default behavior is async loading after page is fully loaded 
       */
      'visibleAsyncLoading'?: boolean;
      /**
       * same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute 
       */
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafInput {
      'alignRight': boolean;
      'errors': Object | string;
      'float': boolean;
      'fullWidth': boolean;
      'label': string;
    }
  }

  interface HTMLWafInputElement extends StencilComponents.WafInput, HTMLStencilElement {}

  var HTMLWafInputElement: {
    prototype: HTMLWafInputElement;
    new (): HTMLWafInputElement;
  };
  interface HTMLElementTagNameMap {
    'waf-input': HTMLWafInputElement;
  }
  interface ElementTagNameMap {
    'waf-input': HTMLWafInputElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-input': JSXElements.WafInputAttributes;
    }
  }
  namespace JSXElements {
    export interface WafInputAttributes extends HTMLAttributes {
      'alignRight'?: boolean;
      'errors'?: Object | string;
      'float'?: boolean;
      'fullWidth'?: boolean;
      'label'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafTabs {

    }
  }

  interface HTMLWafTabsElement extends StencilComponents.WafTabs, HTMLStencilElement {}

  var HTMLWafTabsElement: {
    prototype: HTMLWafTabsElement;
    new (): HTMLWafTabsElement;
  };
  interface HTMLElementTagNameMap {
    'waf-tabs': HTMLWafTabsElement;
  }
  interface ElementTagNameMap {
    'waf-tabs': HTMLWafTabsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-tabs': JSXElements.WafTabsAttributes;
    }
  }
  namespace JSXElements {
    export interface WafTabsAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface WafUtilsRippleEffect {
      /**
       * include all element inside the custom tag that matches the selector 
       */
      'selector': string;
    }
  }

  interface HTMLWafUtilsRippleEffectElement extends StencilComponents.WafUtilsRippleEffect, HTMLStencilElement {}

  var HTMLWafUtilsRippleEffectElement: {
    prototype: HTMLWafUtilsRippleEffectElement;
    new (): HTMLWafUtilsRippleEffectElement;
  };
  interface HTMLElementTagNameMap {
    'waf-utils-ripple-effect': HTMLWafUtilsRippleEffectElement;
  }
  interface ElementTagNameMap {
    'waf-utils-ripple-effect': HTMLWafUtilsRippleEffectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'waf-utils-ripple-effect': JSXElements.WafUtilsRippleEffectAttributes;
    }
  }
  namespace JSXElements {
    export interface WafUtilsRippleEffectAttributes extends HTMLAttributes {
      /**
       * include all element inside the custom tag that matches the selector 
       */
      'selector'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;