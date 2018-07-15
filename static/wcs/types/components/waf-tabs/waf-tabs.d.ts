import '../../stencil.core';
interface SingleTabModel {
    tabID: string;
    tabContent: string;
    tabPaneID: string;
    isSelected: boolean;
}
interface TabModel extends Array<SingleTabModel> {
}
export declare class WafTabs {
    /** used to generate a unique ID for the component HTML DOM nodes that require it (will change at each run - for IE11 fallback to timestamp) */
    private uniqueId;
    private slottedElt;
    private slotHTMLLiveHTMLCollection;
    private slotMutationObserver;
    private observerConfig;
    wafTabsElt: HTMLElement;
    model: TabModel;
    render(): JSX.Element[];
    componentDidLoad(): void;
    componentDidUnload(): void;
    idGenerator(type: 'tab' | 'tabpane', index: any): string;
    spreadAttributesTab(tabInfo: SingleTabModel): {
        'id': string;
        'aria-controls': string;
        'aria-selected': boolean;
        'innerHTML': string;
    };
    spreadAttributesTabPane(tabInfo: SingleTabModel): {
        'id': string;
        'aria-labelledby': string;
        'aria-hidden': string;
        'selected': string;
    };
    onTabSelected(tabIndexSelected: number, evt?: KeyboardEvent): void;
    mutationsHandler(): void;
    cleanEscapedCharacters(inString: string): string;
}
export {};
