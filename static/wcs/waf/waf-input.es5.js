/*! Built with http://stenciljs.com */
waf.loadBundle("waf-input",["exports"],function(t){var e=window.waf.h,i=function(){function t(){this.label="error - label required",this.inputAttrs={id:""},this.isFocused=!1,this.isDirty=!1,this.isInvalid=!1,this.innerErrors={badInput:"donnée incorrecte",patternMismatch:"donnée enfreignant les règles",rangeOverflow:"supérieur au maximum autorisé",rangeUnderflow:"inférieur au minimum autorisé",stepMismatch:"valeur non autorisée",tooLong:"trop de caractères",tooShort:"trop peu de caractères",typeMismatch:"format incorrect",valueMissing:"champs requis"},this.errorText=""}return t.prototype.errorsWatchHandler=function(t){if("object"==typeof t)this.innerErrors=Object.assign(this.innerErrors,t);else if("string"==typeof t)try{this.innerErrors=Object.assign(this.innerErrors,JSON.parse(t))}catch(t){console.warn("waf-input | invalid errors object passed",t)}},t.prototype.render=function(){return e("div",{class:this.cmpntStyleClasses()},e("label",{class:"waf-textfield__label",htmlFor:this.inputAttrs.id},this.label),e("slot",null),e("span",{class:"waf-textfield__error"},this.errorText))},t.prototype.componentDidLoad=function(){var t=this.inputTagChecker();this.inputEl=t.element,this.inputAttrs=t.elementAttrObj,this.errorsWatchHandler(this.errors),this.inputEl&&this.inputAttrs.id&&this.init()},t.prototype.init=function(){var t=this;this.inputEl.addEventListener("focus",function(){t.isFocused=!0}),this.inputEl.addEventListener("blur",function(){t.isFocused=!1}),this.inputEl.addEventListener("change",this.onValueUpdate.bind(this)),this.inputEl.addEventListener("keyup",this.onValueUpdate.bind(this)),this.onValueUpdate(!1)},t.prototype.onValueUpdate=function(t){var e=this;this.isDirty=""!==this.inputEl.value,this.isInvalid=t?this.isDirty&&!this.inputEl.checkValidity()||this.inputEl.validity.valueMissing:this.isDirty&&!this.inputEl.checkValidity();var i=this.inputEl.validity,r=[];Object.keys(this.innerErrors).forEach(function(t){i[t]&&r.push(e.innerErrors[t])}),this.errorText=0===r.length?"":r.join(" | ")},t.prototype.cmpntStyleClasses=function(){var t="waf-textfield";return this.float&&(t+=" waf-textfield--floating-label"),this.alignRight&&(t+=" waf-textfield--align-right"),this.fullWidth&&(t+=" waf-textfield--full-width"),this.inputAttrs.placeholder&&(t+=" has-placeholder"),void 0!==this.inputAttrs.disabled&&(t+=" is-disabled"),this.isDirty&&(t+=" is-dirty"),this.isFocused&&(t+=" is-focused"),this.isInvalid&&(t+=" is-invalid"),t},t.prototype.inputTagChecker=function(){var t,e={element:null,elementAttrObj:{id:""}},i=this.textfieldElt.querySelectorAll("*:not(.waf-textfield):not(label):not(.waf-textfield__error)"),r=this.textfieldElt.querySelector("input");if(i.length>=2&&(t="waf-input | only a unique input tag is permitted inside the slot"),null===r&&(t="waf-input | missing slotted input tag"),t)return console.warn(t),e;for(var n=r.attributes,s={},a=0;a<n.length;a++){var l=n.item(a);s[l.name]=l.value}return void 0===s.id&&(t='waf-input | input tag is missing an "id" attribute'),t?(console.warn(t),e):e={element:r,elementAttrObj:s}},Object.defineProperty(t,"is",{get:function(){return"waf-input"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{alignRight:{type:Boolean,attr:"align-right"},errors:{type:String,attr:"errors",watchCallbacks:["errorsWatchHandler"]},errorText:{state:!0},float:{type:Boolean,attr:"float"},fullWidth:{type:Boolean,attr:"full-width"},innerErrors:{state:!0},inputAttrs:{state:!0},isDirty:{state:!0},isFocused:{state:!0},isInvalid:{state:!0},label:{type:String,attr:"label",reflectToAttr:!0},textfieldElt:{elementRef:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"waf-input input:disabled+.waf-textfield__error,waf-input input:valid+.waf-textfield__error{display:none}waf-input .waf-textfield{position:relative;font-size:16px;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:300px;max-width:100%;margin:0;padding:20px 0}waf-input .waf-textfield--align-right .waf-textfield__error,waf-input .waf-textfield--align-right input,waf-input .waf-textfield--align-right label{text-align:right}waf-input .waf-textfield--full-width{width:100%}waf-input input{border:none;border-bottom:1px solid rgba(0,0,0,.12);display:block;font-size:16px;font-family:Helvetica,Arial,sans-serif;margin:0;padding:4px 0;width:100%;background:0 0;text-align:left;color:inherit}waf-input input[type=number]{-moz-appearance:textfield}waf-input input[type=number]::-webkit-inner-spin-button,waf-input input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}waf-input .waf-textfield.is-focused input{outline:0}waf-input .waf-textfield.is-invalid input{border-color:#d32f2f;-webkit-box-shadow:none;box-shadow:none}waf-input .waf-textfield.is-disabled input,waf-input fieldset[disabled] .waf-textfield input{background-color:transparent;border-bottom:1px dotted rgba(0,0,0,.12);color:rgba(0,0,0,.26)}waf-input .waf-textfield__label{bottom:0;color:rgba(0,0,0,.26);font-size:16px;font-family:Helvetica,Arial,sans-serif;left:0;right:0;pointer-events:none;position:absolute;display:block;top:24px;width:100%;overflow:hidden;white-space:nowrap;text-align:left}waf-input .waf-textfield__label:after{background-color:#3f51b5;bottom:20px;content:'';height:2px;left:45%;position:absolute;-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);visibility:hidden;width:10px}waf-input .waf-textfield.has-placeholder .waf-textfield__label,waf-input .waf-textfield.is-dirty .waf-textfield__label{visibility:hidden}waf-input .waf-textfield--floating-label .waf-textfield__label{-webkit-transition-duration:.2s;transition-duration:.2s;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1)}waf-input .waf-textfield--floating-label.has-placeholder .waf-textfield__label{-webkit-transition:none;transition:none}waf-input .waf-textfield.is-disabled.is-disabled .waf-textfield__label,waf-input fieldset[disabled] .waf-textfield .waf-textfield__label{color:rgba(0,0,0,.26)}waf-input .waf-textfield--floating-label.has-placeholder .waf-textfield__label,waf-input .waf-textfield--floating-label.is-dirty .waf-textfield__label,waf-input .waf-textfield--floating-label.is-focused .waf-textfield__label{color:#3f51b5;font-size:12px;top:4px;visibility:visible}waf-input .waf-textfield--floating-label.is-invalid .waf-textfield__label{color:#d32f2f;font-size:12px}waf-input .waf-textfield.is-focused .waf-textfield__label:after{left:0;visibility:visible;width:100%}waf-input .waf-textfield.is-invalid .waf-textfield__label:after{background-color:#d32f2f}waf-input .waf-textfield__error{color:#d32f2f;position:absolute;font-size:12px;font-family:Helvetica,Arial,sans-serif;margin-top:3px;visibility:hidden;display:block}waf-input .waf-textfield.is-invalid .waf-textfield__error{visibility:visible}"},enumerable:!0,configurable:!0}),t}();t.WafInput=i,Object.defineProperty(t,"__esModule",{value:!0})});