import vuid from 'vuid';
;
;
export class WafTabs {
    constructor() {
        /** used to generate a unique ID for the component HTML DOM nodes that require it (will change at each run - for IE11 fallback to timestamp) */
        this.uniqueId = (window.crypto) ? vuid() : Date.now();
        this.observerConfig = { childList: true };
        this.model = [];
    }
    render() {
        const tabsRenderer = () => {
            return (h("nav", { class: "waf-tabs__nav" },
                h("ol", { role: "tablist" }, this.model.map((tabInfo, index) => h("li", Object.assign({}, this.spreadAttributesTab(tabInfo), { role: "tab", tabindex: "0", onClick: () => { this.onTabSelected(index); }, onKeyDown: evt => { this.onTabSelected(index, evt); } }))))));
        };
        return [tabsRenderer(), h("div", { class: "waf-tabs__tabpanel-container" },
                h("slot", null))];
    }
    componentDidLoad() {
        // polyfills checks
        if (!Array.prototype.findIndex)
            console.warn('need Array.findIndex() polyfill');
        if (!Array.from)
            console.warn('need Array.from() polyfill');
        // slot
        this.slottedElt = this.wafTabsElt.querySelector('.waf-tabs__tabpanel-container');
        // is live up-to-date
        this.slotHTMLLiveHTMLCollection = this.slottedElt.children;
        // mutation observer to detect changes
        this.slotMutationObserver = new MutationObserver(this.mutationsHandler.bind(this));
        this.slotMutationObserver.observe(this.slottedElt, this.observerConfig);
        // initial model creation
        this.mutationsHandler();
    }
    componentDidUnload() {
        // disconnect mutation observer
        this.slotMutationObserver.disconnect();
    }
    idGenerator(type, index) { return `${type}-${this.uniqueId}-${index}`; }
    spreadAttributesTab(tabInfo) { return { 'id': tabInfo.tabID, 'aria-controls': tabInfo.tabPaneID, 'aria-selected': tabInfo.isSelected, 'innerHTML': tabInfo.tabContent }; }
    spreadAttributesTabPane(tabInfo) { return { 'id': tabInfo.tabPaneID, 'aria-labelledby': tabInfo.tabID, 'aria-hidden': String(!tabInfo.isSelected), 'selected': String(tabInfo.isSelected) }; }
    onTabSelected(tabIndexSelected, evt) {
        // utility function that switch focus if possible and return true|false depending on action feasability
        const shiftFocus = function (target, shiftDirection) {
            const newTarget = target[shiftDirection + 'ElementSibling'];
            if (newTarget) {
                // bring focus to new target
                newTarget.focus();
                return true;
            }
            else {
                // exit (no previous tab)
                return false;
            }
        };
        // is it keyboard driven event and continue on return (13), left arrow (37), right arrow (39) TODO make it work with focus changes http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml
        if (evt) {
            switch (evt.which) {
                case 13: /* do nothing - let pass through */ break;
                case 37:
                    if (!shiftFocus(evt.target, 'previous'))
                        return;
                    const updatedLesserIndex = tabIndexSelected - 1;
                    tabIndexSelected = Math.max(updatedLesserIndex, 0);
                    break;
                case 39:
                    if (!shiftFocus(evt.target, 'next'))
                        return;
                    const updatedHigherIndex = tabIndexSelected + 1;
                    const tabCount = this.model.length - 1;
                    tabIndexSelected = Math.min(updatedHigherIndex, tabCount);
                    break;
                default:
                    return;
            }
        }
        // operate update
        const currentlySelectedIndex = this.model.findIndex(tab => tab.isSelected);
        if (tabIndexSelected !== currentlySelectedIndex) {
            // only act on model if selected tab is changed
            this.model = this.model.map((item, index) => {
                item.isSelected = (tabIndexSelected === index);
                return item;
            });
            // update in slotted elements (out of VDOM)
            const wafTabs = Array.from(this.slotHTMLLiveHTMLCollection);
            wafTabs.forEach((elt, index) => {
                elt.setAttribute('aria-hidden', (index === tabIndexSelected) ? 'false' : 'true');
                elt.setAttribute('selected', (index === tabIndexSelected).toString());
            });
        }
    }
    mutationsHandler() {
        const newModel = [];
        const wafTabs = Array.from(this.slotHTMLLiveHTMLCollection);
        wafTabs.forEach((elt, index) => {
            // check if valid waf-tab tag
            if (elt.nodeName !== 'WAF-TAB') {
                console.warn('waf-tabs | this tag should only contain "waf-tab" tags', elt.nodeName);
                return;
            }
            // get tab pane data
            const humanReadableIndex = index + 1;
            const tabContentTxt = this.cleanEscapedCharacters(elt.getAttribute('tab-header'));
            const isSelectedAtr = elt.getAttribute('selected');
            // build entry
            const modelEntry = {
                tabID: this.idGenerator('tab', humanReadableIndex),
                tabContent: (tabContentTxt) ? tabContentTxt : '',
                tabPaneID: this.idGenerator('tabpane', humanReadableIndex),
                isSelected: (isSelectedAtr === '' || isSelectedAtr === 'true') // boolean attribute
            };
            // update tab panes (out of VDOM)
            const tabPaneAttributes = this.spreadAttributesTabPane(modelEntry);
            Object.keys(tabPaneAttributes).forEach(attributeName => {
                elt.setAttribute(attributeName, tabPaneAttributes[attributeName]);
            });
            // push to state
            newModel.push(modelEntry);
        });
        // apply to component state
        this.model = newModel;
    }
    cleanEscapedCharacters(inString) {
        return inString.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"');
    }
    static get is() { return "waf-tabs"; }
    static get properties() { return {
        "model": {
            "state": true
        },
        "wafTabsElt": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:waf-tabs:**/"; }
}
