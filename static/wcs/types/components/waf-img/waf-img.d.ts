import '../../stencil.core';
/**
 * &lt;WAF-IMG&gt;
 * ===============
 *
 * replace [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag
 * Accepts all attributes that a regular img tag would (ignoring deprecated ones).
 * - Add customized loading and broken display to any image
 * - async loading image after page is fully loading (better performance in first paint)
 * - (optionnal) async loading when element is in the visible part of the viewport
 *
 * Sample
 * ------
 * ```
 * <waf-img src="https://picsum.photos/200/200/?image=500" alt="cached image"></waf-img>
 * ```
 *
 * Know limitations
 * ----------------
 * - can't specify custom HTML for loading and broken placeholders. You can still style them though.
 * - not optimal for srcset settings because the browser act as a black box and we don't know which image source will be applied beforehand.
 * - <waf-img> can't be self closing tag like <img> because it is not allowed by CustomElements specs
 */
export declare class WafImg {
    /** used for visible async loading behavior */
    private intersectionObserver;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (required) */
    src: string;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute */
    srcset: string;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute (optional only when used as pure decorational image, otherwise you should always have one) */
    alt: string;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute */
    decoding: 'sync' | 'async' | 'auto';
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute */
    width: string;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute */
    height: string;
    /** same as [&lt;img&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) tag attribute */
    sizes: string;
    /** flag for toggling on/off the visble async loading behavior when off the default behavior is async loading after page is fully loaded */
    visibleAsyncLoading: boolean;
    /** generated DOMString from a fetched image */
    private innerSrc;
    /** flag for marking an error in fetching image */
    private isBroken;
    /** DOM Element used as target for intersectionObserver */
    private wafImg;
    /**
     * Based on component state, it will render either the image itself, or the loading state, or the broken state
     */
    render(): JSX.Element;
    /**
     * When initiated the component check if a "src" attribute was provided then depending on the situation do one of this 3 possible actions
     * 1. load and insert the image in the DOM (cf. [[srcSwapHandler]])
     * 2. listen for document load event and then execute action 1.
     * 3. observe the element is visible event and then execute action 2.
     */
    componentDidLoad(): void;
    /**
     * Component destroy function
     */
    componentDidUnload(): void;
    /**
     * Calculate dynamic inline styles to be applied on the component tag (both width and height must be provided as attributes otherwise no styles are applied)
     */
    private infoDynamicStyles();
    /**
     * This handler performs a fetch request then pass directly the response to the <img> tag that will be generated at rerender.
     * This handler is called at component instanciation and each time the src attribute is updated
     * @param srcURL the provided "src" attribute for the custom tag
     */
    private srcSwapHandler(srcURL);
}
