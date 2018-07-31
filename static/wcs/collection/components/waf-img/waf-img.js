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
export class WafImg {
    constructor() {
        /** flag for toggling on/off the visble async loading behavior when off the default behavior is async loading after page is fully loaded */
        this.visibleAsyncLoading = false;
        /** flag for marking an error in fetching image */
        this.isBroken = false;
    }
    /**
     * Based on component state, it will render either the image itself, or the loading state, or the broken state
     */
    render() {
        const renderedEl = (this.innerSrc) ? (h("img", { src: this.innerSrc, alt: this.alt, width: this.width, height: this.height, sizes: this.sizes, srcset: this.srcset, decoding: this.decoding })) : (this.isBroken) ? (h("span", { class: "waf-img__broken", style: this.infoDynamicStyles() },
            h("span", null, "broken image"),
            h("span", null, this.alt))) : (h("span", { class: "waf-img__loading", style: this.infoDynamicStyles() },
            h("span", { class: "lds-ellipsis" },
                h("span", null),
                h("span", null),
                h("span", null),
                h("span", null)),
            h("span", null, this.alt)));
        return renderedEl;
    }
    /**
     * When initiated the component check if a "src" attribute was provided then depending on the situation do one of this 3 possible actions
     * 1. load and insert the image in the DOM (cf. [[srcSwapHandler]])
     * 2. listen for document load event and then execute action 1.
     * 3. observe the element is visible event and then execute action 2.
     */
    componentDidLoad() {
        // checks for at least "src" ("alt" is not necessary if only used for decoration)
        if (!this.src) {
            console.warn('waf-img | a src is required');
            this.isBroken = true;
        }
        else if (!this.visibleAsyncLoading || !('IntersectionObserver' in window)) {
            // async load when browser is available (not waiting for element to be visible in viewport)
            const docState = document.readyState.toString();
            if (docState === 'loaded' || docState === 'interactive' || docState === 'complete') {
                // page is fully loaded
                this.srcSwapHandler(this.src);
            }
            else {
                // wait for the page to be fully loaded
                window.addEventListener('load', () => {
                    this.srcSwapHandler(this.src);
                });
            }
        }
        else {
            // async load when browser is available (waiting for element to be visible in viewport)
            // default is according to viewport and as soon as the first pixel is visible
            this.intersectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // element is visible - but yet we make sure that the rest of the page is loaded
                        const docState = document.readyState.toString();
                        if (docState === 'loaded' || docState === 'interactive' || docState === 'complete') {
                            // page is fully loaded
                            this.srcSwapHandler(this.src);
                        }
                        else {
                            // wait for the page to be fully loaded
                            window.addEventListener('load', () => {
                                this.srcSwapHandler(this.src);
                            });
                        }
                        observer.disconnect();
                    }
                });
            });
            this.intersectionObserver.observe(this.wafImg);
        }
    }
    /**
     * Component destroy function
     */
    componentDidUnload() {
        // cleanup observer if needed
        if (this.intersectionObserver)
            this.intersectionObserver.disconnect();
    }
    /**
     * Calculate dynamic inline styles to be applied on the component tag (both width and height must be provided as attributes otherwise no styles are applied)
     */
    infoDynamicStyles() {
        return (this.width && this.height) ? {
            width: `${this.width}px`,
            height: `${this.height}px`
        } : {};
    }
    /**
     * This handler performs a fetch request then pass directly the response to the <img> tag that will be generated at rerender.
     * This handler is called at component instanciation and each time the src attribute is updated
     * @param srcURL the provided "src" attribute for the custom tag
     */
    srcSwapHandler(srcURL) {
        // first fetch the image (browser put it in cache)
        if (fetch) {
            fetch(srcURL)
                .then(response => {
                return response.blob();
            })
                .then(responseBlob => {
                return URL.createObjectURL(responseBlob);
            })
                .then(responseBlobObjectURL => {
                // then add src set that will use that response directly
                this.isBroken = false;
                this.innerSrc = responseBlobObjectURL;
            })
                .catch(() => {
                // if image can't be fetched
                this.isBroken = true;
                this.innerSrc = undefined;
            });
        }
        else {
            // just go through for older browsers without fetch API
            this.isBroken = false;
            this.innerSrc = srcURL;
        }
    }
    static get is() { return "waf-img"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "decoding": {
            "type": String,
            "attr": "decoding"
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "innerSrc": {
            "state": true
        },
        "isBroken": {
            "state": true
        },
        "sizes": {
            "type": String,
            "attr": "sizes"
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["srcSwapHandler"]
        },
        "srcset": {
            "type": String,
            "attr": "srcset"
        },
        "visibleAsyncLoading": {
            "type": Boolean,
            "attr": "visible-async-loading"
        },
        "wafImg": {
            "elementRef": true
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:waf-img:**/"; }
}
