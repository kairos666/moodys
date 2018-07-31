/**
 * &lt;WAF-MATERIAL-DESIGN-BUTTONS&gt;
 * ===============
 *
 * - apply md styles to all buttons | some instances | all instances in particular DOM node
 * - apply ripple effect to all buttons | some instances | all instances in particular DOM node
 *
 * Sample
 * ------
 * ```
 * TODO
 * ```
 *
 * Know limitations
 * ----------------
 * - TODO
 */
export class WafRippleFX {
    constructor() {
        this.debounceDelay = 2000;
        this.hookAttribute = '[ripple]';
    }
    /**
     * Empty renderer
     */
    render() {
        return h("slot", null);
    }
    componentDidLoad() {
        // add missing ripple attributes
        if (this.selector)
            this.addMissingRippleAttribute();
        // select all occurrences
        const elts = this.wafFX.querySelectorAll(this.hookAttribute);
        // process all elts
        if (Array.from) {
            Array.from(elts).forEach(this.generateRipple.bind(this));
        }
        else {
            console.warn('need Array.from() polyfill');
        }
    }
    addMissingRippleAttribute() {
        const elts = this.wafFX.querySelectorAll(`${this.selector}:not(${this.hookAttribute})`);
        // process all elts
        Array.from(elts).forEach(elt => {
            // add ripple attribute if missing
            elt.setAttribute('ripple', 'ripple');
        });
    }
    generateRipple(elt) {
        // handlers
        const addRipple = function (evt) {
            const evtPos = {
                x: (evt.touches) ? evt.touches[0].pageX : evt.pageX,
                y: (evt.touches) ? evt.touches[0].pageY : evt.pageY
            };
            const ripple = this;
            const size = ripple.offsetWidth;
            const pos = ripple.getBoundingClientRect();
            const rippler = document.createElement('span');
            const x = evtPos.x - pos.left - (size / 2) - window.scrollX;
            const y = evtPos.y - pos.top - (size / 2) - window.scrollY;
            const style = `top:${y}px;left:${x}px;height:${size}px;width:${size}px;`;
            ripple.rippleContainer.appendChild(rippler);
            rippler.setAttribute('style', style);
        };
        const cleanUp = function () {
            const container = this.rippleContainer;
            while (this.rippleContainer.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
        const debounce = function (func, delay) {
            let inDebounce = undefined;
            return function () {
                let args = arguments;
                let context = this;
                clearTimeout(inDebounce);
                return inDebounce = setTimeout(function () {
                    return func.apply(context, args);
                }, delay);
            };
        };
        // setup (only if not done yet)
        if (!elt.rippleContainer) {
            const rippleContainer = document.createElement('div');
            rippleContainer.className = 'ripple--container';
            // mouse
            elt.addEventListener('mousedown', addRipple);
            elt.addEventListener('mouseup', debounce(cleanUp, this.debounceDelay));
            // touch
            elt.addEventListener('touchstart', addRipple);
            elt.addEventListener('touchend', debounce(cleanUp, this.debounceDelay));
            elt.rippleContainer = rippleContainer;
            elt.appendChild(rippleContainer);
        }
    }
    static get is() { return "waf-utils-ripple-effect"; }
    static get properties() { return {
        "selector": {
            "type": String,
            "attr": "selector"
        },
        "wafFX": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:waf-utils-ripple-effect:**/"; }
}
