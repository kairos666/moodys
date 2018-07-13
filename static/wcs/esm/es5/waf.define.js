// waf: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './waf.core.js';
import {
  WafArkanoid,
  WafDialog,
  WafFaceDetect,
  WafImg,
  WafInput,
  WafRippleFX,
  WafTabs
} from './waf.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    WafArkanoid,
    WafDialog,
    WafFaceDetect,
    WafImg,
    WafInput,
    WafRippleFX,
    WafTabs
  ], opts);
}