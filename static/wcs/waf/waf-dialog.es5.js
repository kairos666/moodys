/*! Built with http://stenciljs.com */
waf.loadBundle("waf-dialog",["exports","./chunk-22a129c0.js"],function(e,t){var n=window.waf.h,o=function(e,t){t=t||{};var n,o,i,a=e.ownerDocument||e,r=[],c=[],s=function(e){var t=[];return function(n){if(n===e.documentElement)return!1;var o=e.defaultView.getComputedStyle(n);return!!function n(o,i){if(o===e.documentElement)return!1;for(var a=0,r=t.length;a<r;a++)if(t[a][0]===o)return t[a][1];var c=!1;return"none"===(i=i||e.defaultView.getComputedStyle(o)).display?c=!0:o.parentNode&&(c=n(o.parentNode)),t.push([o,c]),c}(n,o)||"hidden"===o.visibility}}(a),d=["input","select","a[href]","textarea","button","[tabindex]"],u=e.querySelectorAll(d.join(","));if(t.includeContainer){var l=Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;d.some(function(t){return l.call(e,t)})&&(u=Array.prototype.slice.apply(u)).unshift(e)}for(var p=0,f=u.length;p<f;p++)n=u[p],o=parseInt(n.getAttribute("tabindex"),10),(i=isNaN(o)?n.tabIndex:o)<0||"INPUT"===n.tagName&&"hidden"===n.type||n.disabled||s(n,a)||(0===i?r.push(n):c.push({index:p,tabIndex:i,node:n}));var h=c.sort(function(e,t){return e.tabIndex===t.tabIndex?e.index-t.index:e.tabIndex-t.tabIndex}).map(function(e){return e.node});return Array.prototype.push.apply(h,r),h},i=Object.freeze({default:o,__moduleExports:o}),a=i&&o||i,r=null;function c(e){e&&e.focus&&e!==document.activeElement&&(e.focus(),"input"===e.tagName.toLowerCase()&&e.select())}var s=function(){function e(){this.closeAttrName="data-dialog-close",this.uniqueId=window.crypto?t.vuid():Date.now(),this.isOpen=!1}return e.prototype.render=function(){return n("div",{tabindex:"-1",class:"waf-dialog-backdrop "+this.backdropClass(),style:this.backdropStyles()},n("div",{"aria-hidden":(!this.isOpen).toString(),"aria-labelledby":this.idGenerator("title"),"aria-describedby":this.idGenerator("description"),role:"dialog",class:this.dialogClass()},n("section",{role:"document",tabindex:"-1"},n("div",{id:this.idGenerator("description"),class:"sr-only"},"Beginning of dialog window. Escape will cancel and close the window."),n("div",{id:this.idGenerator("title")},n("slot",{name:"title"})),n("slot",{name:"content"}),n("slot",{name:"actions"}))))},e.prototype.componentDidLoad=function(){this.wafDialogElt.addEventListener("click",this.innerCloseHandler.bind(this),!0),this.backdropElt=this.wafDialogElt.querySelector(".waf-dialog-backdrop"),this.backdropElt.addEventListener("click",this.backdropClickHandler.bind(this)),document.addEventListener("keydown",this.escapeKeyHandler.bind(this));var e=this.wafDialogElt.querySelector('[role="document"]');this.focusTrap=function(e,t){var n=[],o=null,i=null,s=null,d=!1,u=!1,l=null,p="string"==typeof e?document.querySelector(e):e,f=t||{};f.returnFocusOnDeactivate=!t||void 0===t.returnFocusOnDeactivate||t.returnFocusOnDeactivate,f.escapeDeactivates=!t||void 0===t.escapeDeactivates||t.escapeDeactivates;var h={activate:function(e){if(!d){var t={onActivate:e&&void 0!==e.onActivate?e.onActivate:f.onActivate};return d=!0,u=!1,s=document.activeElement,t.onActivate&&t.onActivate(),m(),h}},deactivate:v,pause:function(){!u&&d&&(u=!0,b())},unpause:function(){u&&d&&(u=!1,m())}};return h;function v(e){if(d){var t={returnFocus:e&&void 0!==e.returnFocus?e.returnFocus:f.returnFocusOnDeactivate,onDeactivate:e&&void 0!==e.onDeactivate?e.onDeactivate:f.onDeactivate};return b(),t.onDeactivate&&t.onDeactivate(),t.returnFocus&&setTimeout(function(){c(s)},0),d=!1,u=!1,this}}function m(){if(d)return r&&r.pause(),r=h,D(),c(function(){var e;if(!(e=null!==g("initialFocus")?g("initialFocus"):p.contains(document.activeElement)?document.activeElement:n[0]||g("fallbackFocus")))throw new Error("You can't have a focus-trap without at least one focusable element");return e}()),document.addEventListener("focus",E,!0),document.addEventListener("click",w,!0),document.addEventListener("mousedown",y,!0),document.addEventListener("touchstart",y,!0),document.addEventListener("keydown",k,!0),h}function b(){if(d&&r===h)return document.removeEventListener("focus",E,!0),document.removeEventListener("click",w,!0),document.removeEventListener("mousedown",y,!0),document.removeEventListener("touchstart",y,!0),document.removeEventListener("keydown",k,!0),r=null,h}function g(e){var t=f[e],n=t;if(!t)return null;if("string"==typeof t&&!(n=document.querySelector(t)))throw new Error("`"+e+"` refers to no known node");if("function"==typeof t&&!(n=t()))throw new Error("`"+e+"` did not return a node");return n}function y(e){f.clickOutsideDeactivates&&!p.contains(e.target)&&v({returnFocus:!1})}function w(e){f.clickOutsideDeactivates||p.contains(e.target)||(e.preventDefault(),e.stopImmediatePropagation())}function E(e){p.contains(e.target)||(e.preventDefault(),e.stopImmediatePropagation(),"function"==typeof e.target.blur&&e.target.blur(),l&&function(e){if(l.shiftKey)return c(i);c(o)}())}function k(e){"Tab"!==e.key&&9!==e.keyCode||function(e){if(D(),e.target.hasAttribute("tabindex")&&Number(e.target.getAttribute("tabindex"))<0)return l=e;e.preventDefault();var t=n.indexOf(e.target);e.shiftKey?e.target===o||-1===n.indexOf(e.target)?c(i):c(n[t-1]):e.target===i?c(o):c(n[t+1])}(e),!1!==f.escapeDeactivates&&function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&v()}function D(){n=a(p),o=n[0],i=n[n.length-1]}}(this.wafDialogElt,{onActivate:void 0,onDeactivate:void 0,initialFocus:void 0,fallbackFocus:e,escapeDeactivates:!0,clickOutsideDeactivates:!1,returnFocusOnDeactivate:!0})},e.prototype.componentDidUnload=function(){this.wafDialogElt.removeEventListener("click",this.innerCloseHandler.bind(this),!0),this.backdropElt.removeEventListener("click",this.backdropClickHandler.bind(this)),document.removeEventListener("keydown",this.escapeKeyHandler.bind(this))},e.prototype.innerCloseHandler=function(e){for(var t=e.target.attributes,n=!1,o=0;o<t.length;o++)if(t.item(o).name===this.closeAttrName){n=!0;break}n&&this.hideModal()},e.prototype.backdropClickHandler=function(e){this.preventBackdropClosing||this.noBackdrop||e.target!==e.currentTarget||this.hideModal()},e.prototype.escapeKeyHandler=function(e){this.isOpen&&27===e.keyCode&&this.hideModal()},e.prototype.idGenerator=function(e){return"dialog-"+this.uniqueId+"-"+e},e.prototype.backdropStyles=function(){var e={};return this.isOpen||(e.display="none"),e},e.prototype.backdropClass=function(){return this.noBackdrop?"no-backdrop":""},e.prototype.dialogClass=function(){return this.limitedHeight?"limited-height":""},e.prototype.showModal=function(){this.isOpen=!0,this.focusTrap.activate(),this.wafDialogOpenEE.emit()},e.prototype.hideModal=function(){this.isOpen=!1,this.focusTrap.deactivate(),this.wafDialogCloseEE.emit()},e.prototype.toggleModal=function(){this.isOpen?this.hideModal():this.showModal()},Object.defineProperty(e,"is",{get:function(){return"waf-dialog"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{hideModal:{method:!0},isOpen:{state:!0},limitedHeight:{type:Boolean,attr:"limited-height"},noBackdrop:{type:Boolean,attr:"no-backdrop"},preventBackdropClosing:{type:Boolean,attr:"prevent-backdrop-closing"},showModal:{method:!0},toggleModal:{method:!0},wafDialogElt:{elementRef:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"waf.dialog.open",method:"wafDialogOpenEE",bubbles:!0,cancelable:!0,composed:!0},{name:"waf.dialog.close",method:"wafDialogCloseEE",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"waf-dialog .waf-dialog-backdrop{position:fixed;z-index:666;background-color:rgba(0,0,0,.5);top:0;left:0;width:100vw;height:100vh;overflow-y:auto}waf-dialog .waf-dialog-backdrop.no-backdrop{background-color:transparent;pointer-events:none}waf-dialog [role=document]{outline:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}waf-dialog [role=document]>:not(.sr-only){-webkit-box-flex:0;-webkit-flex:0 1 auto;-ms-flex:0 1 auto;flex:0 1 auto}waf-dialog [role=document] [slot=content]{overflow-y:auto}waf-dialog [role=dialog]{position:absolute;z-index:667;background-color:#fff;padding:24px;-webkit-box-shadow:0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);box-shadow:0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2);left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);top:25vh;margin-bottom:25vh;pointer-events:all}waf-dialog [role=dialog].limited-height{position:fixed;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}waf-dialog [role=dialog].limited-height [role=document]{max-height:80vh}\@media (min-width:1024px){waf-dialog [role=dialog]{width:50%}}\@media (max-width:1023px){waf-dialog [role=dialog]{width:80%}}waf-dialog .sr-only{position:absolute;overflow:hidden;clip:rect(0 0 0 0);height:1px;width:1px;margin:-1px;padding:0;border:0}"},enumerable:!0,configurable:!0}),e}();e.WafDialog=s,Object.defineProperty(e,"__esModule",{value:!0})});