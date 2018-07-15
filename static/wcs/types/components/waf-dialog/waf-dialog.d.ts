import '../../stencil.core';
/**
 * &lt;WAF-DIALOG&gt;
 * ===============
 * A full feature dialog box component to generate modal windows effortlessly
 * - accessible (ARIA & focus trap)
 * - backdrop closing on click/tap (controllable for confirmation modals)
 * - RWD for smaller screens
 * - 2 alternatives to display long dialog (height bigger than viewport)
 * - component emit custom events when opening (waf.dialog.open) & closing (waf.dialog.close)
 *
 * Sample
 * ------
 * ```
 * <waf-dialog>
 *  <!-- START - your dialog content here -->
 *  <h1 slot="title">Allow data collection?</h1>
 *  <p slot="content">Allowing us to collect data will let us get you the information you want faster.</p>
 *  <menu slot="actions">
 *   <button type="button" class="mdl-button">Agree</button>
 *   <button type="button" data-dialog-close class="mdl-button">Disagree</button>
 *  </menu>
 *  <!-- END - your dialog content here -->
 * </waf-dialog>
 * ```
 *
 * Know limitations
 * ----------------
 * - if either prevent-backdrop-closing OR no-backdrop is set, the only non programmatic way to close the modal is to use the escape key. To avoid trapping users make sure to use 'data-dialog-close' attribute somewhere in the dialog content
 * - styling inside the dialog is the responsability of the user (it is not really a limitation :)
 */
export declare class WafDialog {
    /** class name used to target on click close modal side effect */
    private closeAttrName;
    /** used to generate a unique ID for the component HTML DOM nodes that require it (will change at each run - for IE11 fallback to timestamp) */
    private uniqueId;
    /** DOM Element used as backdrop for this specific dialog box */
    private backdropElt;
    /** [focus trap](https://github.com/davidtheclark/focus-trap) instance  */
    private focusTrap;
    /** DOM Element for the component */
    private wafDialogElt;
    /** emitter for 'waf.dialog.open' custom event - fired when modal is opened */
    private wafDialogOpenEE;
    /** emitter for 'waf.dialog.close' custom event - fired when modal is closed */
    private wafDialogCloseEE;
    /** current state of this dialog box open|close */
    private isOpen;
    /** flag for toggling off the closing of modal when backdrop is clicked */
    preventBackdropClosing: boolean;
    /** flag for toggling off the backdrop effect entirely */
    noBackdrop: boolean;
    /** by default long dialog box are scrollable in the viewport, this attribute toggle on the behavior where the dialog box is limited to the visible viewport, scroll happens in the content section of the box */
    limitedHeight: boolean;
    /**
     * Based on component state, render the dialog HTML structure and displays it or hide it
     */
    render(): JSX.Element;
    /**
     * When initiated the component setup event listeners and the focus trap
     */
    componentDidLoad(): void;
    /**
     * Component destroy function
     */
    componentDidUnload(): void;
    /**
     * React to all events originating from inside the dialog (capture phase) and triggers a closing of the modal when 'data-dialog-close' attribute is set on the target element
     * @param evt originate from any clicked element inside the dialog
     */
    private innerCloseHandler;
    /**
     * React to clicked backdrop
     */
    private backdropClickHandler;
    /**
     * React to escape key being pressed
     * @param evt
     */
    private escapeKeyHandler;
    /**
     * Util function for unique ID generation
     * @param type represent the targeted element inside the dialog DOM
     */
    private idGenerator;
    /**
     * Util function for dynamic styles generation based on component state - target backdrop
     */
    private backdropStyles;
    /**
     * Util function for dynamic classes generation based on component state - target backdrop
     */
    private backdropClass;
    /**
     * Util function for dynamic classes generation based on component state - target dialog box
     */
    private dialogClass;
    /**
     * Public method to open the dialog
     */
    showModal(): void;
    /**
     * Public method to close the dialog
     */
    hideModal(): void;
    /**
     * Public method to toggle the dialog
     */
    toggleModal(): void;
}
