import '../../stencil.core';
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
export declare class WafRippleFX {
    private debounceDelay;
    private hookAttribute;
    /** the custom DOM element itself */
    private wafFX;
    /** include all element inside the custom tag that matches the selector */
    selector: string;
    /**
     * Empty renderer
     */
    render(): JSX.Element;
    componentDidLoad(): void;
    private addMissingRippleAttribute;
    private generateRipple;
}
