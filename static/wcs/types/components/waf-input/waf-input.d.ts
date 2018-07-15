import '../../stencil.core';
export declare class WafInput {
    label: string;
    errors: Object | string;
    float: boolean;
    alignRight: boolean;
    fullWidth: boolean;
    inputAttrs: any;
    isFocused: boolean;
    isDirty: boolean;
    isInvalid: boolean;
    innerErrors: Object;
    errorText: string;
    textfieldElt: HTMLElement;
    private inputEl;
    errorsWatchHandler(newValue: Object | string): void;
    render(): JSX.Element;
    componentDidLoad(): void;
    private init;
    private onValueUpdate;
    private cmpntStyleClasses;
    private inputTagChecker;
}
