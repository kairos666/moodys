/*! Built with http://stenciljs.com */
const{h:e}=window.waf;import{a as t}from"./chunk-d4fed76e.js";var n=function(e,t){t=t||{};var n,i,a,o=e.ownerDocument||e,r=[],s=[],c=function(e){var t=[];return function(n){if(n===e.documentElement)return!1;var i=e.defaultView.getComputedStyle(n);return!!function n(i,a){if(i===e.documentElement)return!1;for(var o=0,r=t.length;o<r;o++)if(t[o][0]===i)return t[o][1];var s=!1;return"none"===(a=a||e.defaultView.getComputedStyle(i)).display?s=!0:i.parentNode&&(s=n(i.parentNode)),t.push([i,s]),s}(n,i)||"hidden"===i.visibility}}(o),d=["input","select","a[href]","textarea","button","[tabindex]"],l=e.querySelectorAll(d.join(","));if(t.includeContainer){var u=Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;d.some(function(t){return u.call(e,t)})&&(l=Array.prototype.slice.apply(l)).unshift(e)}for(var p=0,h=l.length;p<h;p++)n=l[p],i=parseInt(n.getAttribute("tabindex"),10),(a=isNaN(i)?n.tabIndex:i)<0||"INPUT"===n.tagName&&"hidden"===n.type||n.disabled||c(n,o)||(0===a?r.push(n):s.push({index:p,tabIndex:a,node:n}));var v=s.sort(function(e,t){return e.tabIndex===t.tabIndex?e.index-t.index:e.tabIndex-t.tabIndex}).map(function(e){return e.node});return Array.prototype.push.apply(v,r),v},i=null;function a(e){e&&e.focus&&e!==document.activeElement&&(e.focus(),"input"===e.tagName.toLowerCase()&&e.select())}var o=function(e,t){var o=[],r=null,s=null,c=null,d=!1,l=!1,u=null,p="string"==typeof e?document.querySelector(e):e,h=t||{};h.returnFocusOnDeactivate=!t||void 0===t.returnFocusOnDeactivate||t.returnFocusOnDeactivate,h.escapeDeactivates=!t||void 0===t.escapeDeactivates||t.escapeDeactivates;var v={activate:function(e){if(!d){var t={onActivate:e&&void 0!==e.onActivate?e.onActivate:h.onActivate};return d=!0,l=!1,c=document.activeElement,t.onActivate&&t.onActivate(),m(),v}},deactivate:f,pause:function(){!l&&d&&(l=!0,g())},unpause:function(){l&&d&&(l=!1,m())}};return v;function f(e){if(d){var t={returnFocus:e&&void 0!==e.returnFocus?e.returnFocus:h.returnFocusOnDeactivate,onDeactivate:e&&void 0!==e.onDeactivate?e.onDeactivate:h.onDeactivate};return g(),t.onDeactivate&&t.onDeactivate(),t.returnFocus&&setTimeout(function(){a(c)},0),d=!1,l=!1,this}}function m(){if(d)return i&&i.pause(),i=v,D(),setTimeout(function(){a(function(){var e;if(!(e=null!==b("initialFocus")?b("initialFocus"):p.contains(document.activeElement)?document.activeElement:o[0]||b("fallbackFocus")))throw new Error("You can't have a focus-trap without at least one focusable element");return e}())},0),document.addEventListener("focus",k,!0),document.addEventListener("click",w,!0),document.addEventListener("mousedown",y,!0),document.addEventListener("touchstart",y,!0),document.addEventListener("keydown",E,!0),v}function g(){if(d&&i===v)return document.removeEventListener("focus",k,!0),document.removeEventListener("click",w,!0),document.removeEventListener("mousedown",y,!0),document.removeEventListener("touchstart",y,!0),document.removeEventListener("keydown",E,!0),i=null,v}function b(e){var t=h[e],n=t;if(!t)return null;if("string"==typeof t&&!(n=document.querySelector(t)))throw new Error("`"+e+"` refers to no known node");if("function"==typeof t&&!(n=t()))throw new Error("`"+e+"` did not return a node");return n}function y(e){h.clickOutsideDeactivates&&!p.contains(e.target)&&f({returnFocus:!1})}function w(e){h.clickOutsideDeactivates||p.contains(e.target)||(e.preventDefault(),e.stopImmediatePropagation())}function k(e){p.contains(e.target)||(e.preventDefault(),e.stopImmediatePropagation(),"function"==typeof e.target.blur&&e.target.blur(),u&&function(e){if(u.shiftKey)return a(s);a(r)}())}function E(e){"Tab"!==e.key&&9!==e.keyCode||function(e){if(D(),e.target.hasAttribute("tabindex")&&Number(e.target.getAttribute("tabindex"))<0)return u=e;e.preventDefault();var t=o.indexOf(e.target);e.shiftKey?e.target===r||-1===o.indexOf(e.target)?a(s):a(o[t-1]):e.target===s?a(r):a(o[t+1])}(e),!1!==h.escapeDeactivates&&function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&f()}function D(){o=n(p),r=o[0],s=o[o.length-1]}};class r{constructor(){this.closeAttrName="data-dialog-close",this.uniqueId=window.crypto?t():Date.now(),this.isOpen=!1}render(){return e("div",{tabindex:"-1",class:"waf-dialog-backdrop "+this.backdropClass(),style:this.backdropStyles()},e("div",{"aria-hidden":(!this.isOpen).toString(),"aria-labelledby":this.idGenerator("title"),"aria-describedby":this.idGenerator("description"),role:"dialog",class:this.dialogClass()},e("section",{role:"document",tabindex:"-1"},e("div",{id:this.idGenerator("description"),class:"sr-only"},"Beginning of dialog window. Escape will cancel and close the window."),e("div",{id:this.idGenerator("title")},e("slot",{name:"title"})),e("slot",{name:"content"}),e("slot",{name:"actions"}))))}componentDidLoad(){this.wafDialogElt.addEventListener("click",this.innerCloseHandler.bind(this),!0),this.backdropElt=this.wafDialogElt.querySelector(".waf-dialog-backdrop"),this.backdropElt.addEventListener("click",this.backdropClickHandler.bind(this)),document.addEventListener("keydown",this.escapeKeyHandler.bind(this));const e=this.wafDialogElt.querySelector('[role="document"]');this.focusTrap=o(this.wafDialogElt,{onActivate:void 0,onDeactivate:void 0,initialFocus:void 0,fallbackFocus:e,escapeDeactivates:!0,clickOutsideDeactivates:!1,returnFocusOnDeactivate:!0})}componentDidUnload(){this.wafDialogElt.removeEventListener("click",this.innerCloseHandler.bind(this),!0),this.backdropElt.removeEventListener("click",this.backdropClickHandler.bind(this)),document.removeEventListener("keydown",this.escapeKeyHandler.bind(this))}innerCloseHandler(e){const t=e.target.attributes;let n=!1;for(let e=0;e<t.length;e++)if(t.item(e).name===this.closeAttrName){n=!0;break}n&&this.hideModal()}backdropClickHandler(e){this.preventBackdropClosing||this.noBackdrop||e.target!==e.currentTarget||this.hideModal()}escapeKeyHandler(e){this.isOpen&&27===e.keyCode&&this.hideModal()}idGenerator(e){return`dialog-${this.uniqueId}-${e}`}backdropStyles(){let e={};return this.isOpen||(e.display="none"),e}backdropClass(){return this.noBackdrop?"no-backdrop":""}dialogClass(){return this.limitedHeight?"limited-height":""}showModal(){this.isOpen=!0,this.focusTrap.activate(),this.wafDialogOpenEE.emit()}hideModal(){this.isOpen=!1,this.focusTrap.deactivate(),this.wafDialogCloseEE.emit()}toggleModal(){this.isOpen?this.hideModal():this.showModal()}static get is(){return"waf-dialog"}static get properties(){return{hideModal:{method:!0},isOpen:{state:!0},limitedHeight:{type:Boolean,attr:"limited-height"},noBackdrop:{type:Boolean,attr:"no-backdrop"},preventBackdropClosing:{type:Boolean,attr:"prevent-backdrop-closing"},showModal:{method:!0},toggleModal:{method:!0},wafDialogElt:{elementRef:!0}}}static get events(){return[{name:"waf.dialog.open",method:"wafDialogOpenEE",bubbles:!0,cancelable:!0,composed:!0},{name:"waf.dialog.close",method:"wafDialogCloseEE",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"waf-dialog .waf-dialog-backdrop{position:fixed;z-index:666;background-color:rgba(0,0,0,.5);top:0;left:0;width:100vw;height:100vh;overflow-y:auto}waf-dialog .waf-dialog-backdrop.no-backdrop{background-color:transparent;pointer-events:none}waf-dialog [role=document]{outline:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}waf-dialog [role=document]>:not(.sr-only){-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto}waf-dialog [role=document] [slot=content]{overflow-y:auto}waf-dialog [role=dialog]{position:absolute;z-index:667;background-color:#fff;padding:24px;-webkit-box-shadow:0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);box-shadow:0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);top:25vh;margin-bottom:25vh;pointer-events:all}waf-dialog [role=dialog].limited-height{position:fixed;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}waf-dialog [role=dialog].limited-height [role=document]{max-height:80vh}\@media (min-width:1024px){waf-dialog [role=dialog]{width:50%}}\@media (max-width:1023px){waf-dialog [role=dialog]{width:80%}}waf-dialog .sr-only{position:absolute;overflow:hidden;clip:rect(0 0 0 0);height:1px;width:1px;margin:-1px;padding:0;border:0}"}}export{r as WafDialog};