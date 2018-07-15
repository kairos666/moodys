/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='waf']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(t,e,n,o){"use strict";function i(t,e){const n=`data-${t.t}`;return e&&e!==E?`${n}-${e}`:n}function s(t){return{e:t[0],n:t[1],o:!!t[2],i:!!t[3],s:!!t[4]}}function r(t,e){if(R(e)&&"object"!=typeof e&&"function"!=typeof e){if(t===Boolean||3===t)return"false"!==e&&(""===e||!!e);if(t===Number||4===t)return parseFloat(e);if(t===String||2===t)return e.toString()}return e}function c(t,e,n,o){const i=t.r.get(e);i&&((o=i["s-ld"]||i.$activeLoading)&&((n=o.indexOf(e))>-1&&o.splice(n,1),o.length||(i["s-init"]&&i["s-init"](),i.$initLoad&&i.$initLoad())),t.r.delete(e))}function l(t,e){let n,o,i=null,s=!1,r=!1;for(var c=arguments.length;c-- >2;)I.push(arguments[c]);for(;I.length>0;){let e=I.pop();if(e&&void 0!==e.pop)for(c=e.length;c--;)I.push(e[c]);else"boolean"==typeof e&&(e=null),(r="function"!=typeof t)&&(null==e?e="":"number"==typeof e?e=String(e):"string"!=typeof e&&(r=!1)),r&&s?i[i.length-1].c+=e:null===i?i=[r?{c:e}:e]:i.push(r?{c:e}:e),s=r}if(null!=e){if(e.className&&(e.class=e.className),"object"==typeof e.class){for(c in e.class)e.class[c]&&I.push(c);e.class=I.join(" "),I.length=0}null!=e.key&&(n=e.key),null!=e.name&&(o=e.name)}return"function"==typeof t?t(Object.assign({},e,{children:i}),B):{l:t,f:i,c:void 0,u:e,a:n,d:o,p:void 0,m:!1}}function f(t,e,n,o){e.split(" ").forEach(e=>{t[e]=!0,n&&(t[`${e}-${n}`]=!0,o&&(t[`${e}-${n}-${o}`]=t[`${e}-${o}`]=!0))})}function u(t,e){t.b.has(e)||(t.b.set(e,!0),t.v?t.queue.write(()=>a(t,e)):t.queue.tick(()=>a(t,e)))}function a(t,e,n,o,i,s){if(t.b.delete(e),!t.y.has(e)){if(o=t.g.get(e),n=!o){if((i=t.r.get(e))&&i.$rendered&&(i["s-rn"]=!0),i&&!i["s-rn"])return(i["s-rc"]=i["s-rc"]||[]).push(()=>{a(t,e)}),void(i.$onRender=i["s-rc"]);o=function r(t,e,n,o,i,s,c){try{(function l(t,e,n,o,i,s,r){for(r in t.w.set(o,n),t.M.has(n)||t.M.set(n,{}),(s=Object.assign({color:{type:String}},e.properties)).mode={type:String},s)p(t,s[r],n,o,r,i)})(t,i=t.j(e).k,e,o=new i,n),function f(t,e,n){if(e){const o=t.w.get(n);e.forEach(e=>{n[e.method]={emit:n=>{t.C(o,e.name,{bubbles:e.bubbles,composed:e.composed,cancelable:e.cancelable,detail:n})}}})}}(t,i.events,o);try{if(s=t.O.get(e)){for(c=0;c<s.length;c+=2)o[s[c]](s[c+1]);t.O.delete(e)}}catch(n){t.N(n,2,e)}}catch(n){o={},t.N(n,7,e,!0)}return t.g.set(e,o),o}(t,e,t.x.get(e));try{o.componentWillLoad&&(s=o.componentWillLoad())}catch(n){t.N(n,3,e)}}else try{o.componentWillUpdate&&(s=o.componentWillUpdate())}catch(n){t.N(n,5,e)}s&&s.then?s.then(()=>d(t,e,o,n)):d(t,e,o,n)}}function d(t,e,n,o){(function i(t,e,n,o){try{const i=e.k.host,s=e.k.encapsulation,r="shadow"===s&&t.P.W;let c,u;if(c=function i(t,e,n){return t&&Object.keys(t).forEach(o=>{t[o].reflectToAttr&&((n=n||{})[o]=e[o])}),n}(e.k.properties,o),u=r?n.shadowRoot:n,!n["s-rn"]){t.T(t,t.P,e,n);const i=n["s-sc"];i&&(t.P.A(n,function s(t){return`${t}-host`}(i),""),o.render||t.P.A(n,function r(t){return`${t}-slot`}(i),""))}if(o.render||o.hostData||i||c){t.S=!0;const a=o.render&&o.render();let d;if((d=o.hostData&&o.hostData())&&e.R){const t=Object.keys(d).reduce((t,n)=>e.R[n]?t.concat(n):e.R[D(n)]?t.concat(D(n)):t,[]);if(t.length>0)throw new Error("The following keys were attempted to be set with hostData() from the "+`${e.t} component: ${t.join(", ")}. `+"If you would like to modify these please set @Prop({ mutable: true, reflectToAttr: true}) on the @Prop() decorator.")}c&&(d=d?Object.assign(d,c):c),t.S=!1,i&&(d=function c(t,e,n){return t=t||{},Object.keys(e).forEach(o=>{"theme"===o?f(t.class=t.class||{},e[o],n.mode,n.color):"class"===o?f(t[o]=t[o]||{},e[o]):t[o]=e[o]}),t}(d,i,o));const p=t.L.get(n)||{};p.p=u;const m=l(null,d,a);m.m=!0,t.L.set(n,t.render(n,p,m,r,s))}t.D&&t.D.q(n),n["s-rn"]=!0,n.$onRender&&(n["s-rc"]=n.$onRender),n["s-rc"]&&(n["s-rc"].forEach(t=>t()),n["s-rc"]=null)}catch(e){t.S=!1,t.N(e,8,n,!0)}})(t,t.j(e),e,n);try{o?e["s-init"]():(n.componentDidUpdate&&n.componentDidUpdate(),k(t.L.get(e))),e["s-hmr-load"]&&e["s-hmr-load"]()}catch(n){t.N(n,6,e,!0)}}function p(t,e,n,o,i,s,c,l){if(e.type||e.state){const f=t.M.get(n);e.state||(!e.attr||void 0!==f[i]&&""!==f[i]||(c=s&&s.I)&&R(l=c[e.attr])&&(f[i]=r(e.type,l)),n.hasOwnProperty(i)&&(void 0===f[i]&&(f[i]=r(e.type,n[i])),"mode"!==i&&delete n[i])),o.hasOwnProperty(i)&&void 0===f[i]&&(f[i]=o[i]),e.watchCallbacks&&(f[H+i]=e.watchCallbacks.slice()),b(o,i,function f(e){return(e=t.M.get(t.w.get(this)))&&e[i]},function u(n,o){(o=t.w.get(this))&&(e.state||e.mutable)&&m(t,o,i,n)})}else if(e.elementRef)h(o,i,n);else if(e.method)h(n,i,o[i].bind(o));else if(e.context){const s=t.B(e.context);void 0!==s&&h(o,i,s.H&&s.H(n)||s)}else e.connect&&h(o,i,t.F(e.connect))}function m(t,e,n,o,i,s,r){(i=t.M.get(e))||t.M.set(e,i={});const c=i[n];if(o!==c&&(i[n]=o,s=t.g.get(e))){if(r=i[H+n])for(let t=0;t<r.length;t++)try{s[r[t]].call(s,o,c,n)}catch(t){}!t.S&&e["s-rn"]&&u(t,e)}}function h(t,e,n){Object.defineProperty(t,e,{configurable:!0,value:n})}function b(t,e,n,o){Object.defineProperty(t,e,{configurable:!0,get:n,set:o})}function v(t,e,n,o,i){const s=e!==(e=e.replace(/^xlink\:?/,"")),r=F[e]||o;r&&(!n||"false"===n)||i?s?t.removeAttributeNS(U,L(e)):t.removeAttribute(e):"function"!=typeof n&&(r&&(n=""),s?t.setAttributeNS(U,L(e),n):t.setAttribute(e,n))}function y(t,e,n,o,i,s,r){if("class"!==n||s)if("style"===n){for(const t in o)i&&null!=i[t]||(/-/.test(t)?e.style.U(t):e.style[t]="");for(const t in i)o&&i[t]===o[t]||(/-/.test(t)?e.style.setProperty(t,i[t]):e.style[t]=i[t])}else if("o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in e)if("list"!==n&&"type"!==n&&!s&&(n in e||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=t.j(e);o&&o.R&&o.R[n]?(g(e,n,i),r&&o.R[n].z&&v(e,o.R[n].Q,i,3===o.R[n].Z,null==i)):"ref"!==n&&(g(e,n,null==i?"":i),null!=i&&!1!==i||t.P.G(e,n))}else null!=i&&"key"!==n?v(e,n,i):(s||t.P.J(e,n)&&(null==i||!1===i))&&t.P.G(e,n);else n=L(n)in e?L(n.substring(2)):L(n[2])+n.substring(3),i?i!==o&&t.P.K(e,n,i):t.P.V(e,n);else if(o!==i){const t=$(o),n=$(i),s=t.filter(t=>!n.includes(t)),r=$(e.className).filter(t=>!s.includes(t)),c=n.filter(e=>!t.includes(e)&&!r.includes(e));r.push(...c),e.className=r.join(" ")}}function $(t){return null==t||""===t?[]:t.trim().split(/\s+/)}function g(t,e,n){try{t[e]=n}catch(t){}}function w(t,e,n,o,i){const s=11===n.p.nodeType&&n.p.host?n.p.host:n.p,r=e&&e.u||A,c=n.u||A;for(i in r)c&&null!=c[i]||null==r[i]||y(t,s,i,r[i],void 0,o,n.m);for(i in c)i in r&&c[i]===("value"===i||"checked"===i?s[i]:r[i])||y(t,s,i,r[i],c[i],o,n.m)}function M(t,e){function n(i,s,r,c,l,f,p,v,y){if(v=s.f[r],u||(m=!0,"slot"===v.l&&(d&&e.A(c,d+"-slot",""),v.f?v.X=!0:v.Y=!0)),R(v.c))v.p=e._(v.c);else if(v.Y)v.p=e._("");else{if(f=v.p=z||"svg"===v.l?e.tt("http://www.w3.org/2000/svg",v.l):e.et(v.X?"slot-fb":v.l),z="svg"===v.l||"foreignObject"!==v.l&&z,w(t,null,v,z),R(d)&&f["s-si"]!==d&&e.A(f,f["s-si"]=d,""),R(a)&&e.A(f,T,a+"."+r+(function t(e){if(e)for(var n=0;n<e.length;n++)if("slot"!==e[n].l||t(e[n].f))return!0;return!1}(v.f)?"":".")),v.f)for(l=0;l<v.f.length;++l)(p=n(i,v,l,f))&&(R(a)&&3===p.nodeType&&!p["s-cr"]&&e.nt(f,e.ot("s."+a+"."+l)),e.nt(f,p),R(a)&&3===p.nodeType&&!p["s-cr"]&&(e.nt(f,e.ot("/")),e.nt(f,e._(" "))));"svg"===v.l&&(z=!1)}return v.p["s-hn"]=h,(v.X||v.Y)&&(v.p["s-sr"]=!0,v.p["s-cr"]=b,v.p["s-sn"]=v.d||"",(y=i&&i.f&&i.f[r])&&y.l===v.l&&i.p&&o(i.p)),v.p}function o(n,i,s,r){t.it=!0;const f=e.st(n);for(s=f.length-1;s>=0;s--)(r=f[s])["s-hn"]!==h&&r["s-ol"]&&(e.rt(r),e.ct(l(r),r,c(r)),e.rt(r["s-ol"]),r["s-ol"]=null,m=!0),i&&o(r,i);t.it=!1}function i(t,o,i,s,r,l,f,u){const a=t["s-cr"]||t.$defaultHolder;for((f=a&&e.lt(a)||t).shadowRoot&&e.ft(f)===h&&(f=f.shadowRoot);r<=l;++r)s[r]&&(u=R(s[r].c)?e._(s[r].c):n(null,i,r,t))&&(s[r].p=u,e.ct(f,u,c(o)))}function s(t,n,i,s){for(;n<=i;++n)R(t[n])&&(s=t[n].p,p=!0,s["s-ol"]?e.rt(s["s-ol"]):o(s,!0),e.rt(s))}function r(t,e){return t.l===e.l&&t.a===e.a&&("slot"!==t.l||t.d===e.d)}function c(t){return t&&t["s-ol"]?t["s-ol"]:t}function l(t){return e.lt(t["s-ol"]?t["s-ol"]:t)}const f=[];let u,a,d,p,m,h,b;return function v(y,$,g,M,k,j,C,O,N,x,W,T){if(h=e.ft(y),b=y["s-cr"],u=M,a="shadow"!==k?j:null,d=y["s-sc"],m=p=!1,function f(u,a,d){const p=a.p=u.p,m=u.f,h=a.f;z=a.p&&R(e.ut(a.p))&&void 0!==a.p.ownerSVGElement,z="svg"===a.l||"foreignObject"!==a.l&&z,R(a.c)?(d=p["s-cr"]||p.$defaultHolder)?e.at(e.lt(d),a.c):u.c!==a.c&&e.at(p,a.c):("slot"!==a.l&&w(t,u,a,z),R(m)&&R(h)?function b(t,u,a,d,p,m,h,v){let y=0,$=0,g=u.length-1,w=u[0],M=u[g],k=d.length-1,j=d[0],C=d[k];for(;y<=g&&$<=k;)if(null==w)w=u[++y];else if(null==M)M=u[--g];else if(null==j)j=d[++$];else if(null==C)C=d[--k];else if(r(w,j))f(w,j),w=u[++y],j=d[++$];else if(r(M,C))f(M,C),M=u[--g],C=d[--k];else if(r(w,C))"slot"!==w.l&&"slot"!==C.l||o(e.lt(w.p)),f(w,C),e.ct(t,w.p,e.dt(M.p)),w=u[++y],C=d[--k];else if(r(M,j))"slot"!==w.l&&"slot"!==C.l||o(e.lt(M.p)),f(M,j),e.ct(t,M.p,w.p),M=u[--g],j=d[++$];else{for(p=null,m=y;m<=g;++m)if(u[m]&&R(u[m].a)&&u[m].a===j.a){p=m;break}R(p)?((v=u[p]).l!==j.l?h=n(u&&u[$],a,p,t):(f(v,j),u[p]=void 0,h=v.p),j=d[++$]):(h=n(u&&u[$],a,$,t),j=d[++$]),h&&e.ct(l(w.p),h,c(w.p))}y>g?i(t,null==d[k+1]?null:d[k+1].p,a,d,$,k):$>k&&s(u,y,g)}(p,m,a,h):R(h)?(R(u.c)&&e.at(p,""),i(p,null,a,h,0,h.length-1)):R(m)&&s(m,0,m.length-1)),z&&"svg"===a.l&&(z=!1)}($,g),R(a)&&e.A($.p,P,a),m){for(function t(n,o,i,s,r,c,l,u,a,d){for(r=0,c=(o=e.st(n)).length;r<c;r++){if((i=o[r])["s-sr"]&&(s=i["s-cr"]))for(u=e.st(e.lt(s)),a=i["s-sn"],l=u.length-1;l>=0;l--)(s=u[l])["s-cn"]||s["s-nr"]||s["s-hn"]===i["s-hn"]||((3===(d=e.pt(s))||8===d)&&""===a||1===d&&null===e.mt(s,"slot")&&""===a||1===d&&e.mt(s,"slot")===a)&&(f.some(t=>t.ht===s)||(p=!0,s["s-sn"]=a,f.push({bt:i,ht:s})));1===e.pt(i)&&t(i)}}(g.p),C=0;C<f.length;C++)(O=f[C]).ht["s-ol"]||((N=e._(""))["s-nr"]=O.ht,e.ct(e.lt(O.ht),O.ht["s-ol"]=N,O.ht));for(t.it=!0,C=0;C<f.length;C++){for(O=f[C],W=e.lt(O.bt),T=e.dt(O.bt),N=O.ht["s-ol"];N=e.vt(N);)if((x=N["s-nr"])&&x&&x["s-sn"]===O.ht["s-sn"]&&W===e.lt(x)&&(x=e.dt(x))&&x&&!x["s-nr"]){T=x;break}(!T&&W!==e.lt(O.ht)||e.dt(O.ht)!==T)&&O.ht!==T&&(e.rt(O.ht),e.ct(W,O.ht,T))}t.it=!1}return p&&function t(n,o,i,s,r,c,l,f){for(s=0,r=(i=e.st(n)).length;s<r;s++)if(o=i[s],1===e.pt(o)){if(o["s-sr"])for(l=o["s-sn"],o.hidden=!1,c=0;c<r;c++)if(i[c]["s-hn"]!==o["s-hn"])if(f=e.pt(i[c]),""!==l){if(1===f&&l===e.mt(i[c],"slot")){o.hidden=!0;break}}else if(1===f||3===f&&""!==e.yt(i[c]).trim()){o.hidden=!0;break}t(o)}}(g.p),f.length=0,g}}function k(t,e){t&&(t.u&&t.u.ref&&t.u.ref(e?null:t.p),t.f&&t.f.forEach(t=>{k(t,e)}))}function j(t,e,n,o,i){const s=t.pt(e);let r,c,l,f;if(i&&1===s){(c=t.mt(e,T))&&(l=c.split("."))[0]===o&&((f={}).l=t.ft(f.p=e),n.f||(n.f=[]),n.f[l[1]]=f,n=f,i=""!==l[2]);for(let s=0;s<e.childNodes.length;s++)j(t,e.childNodes[s],n,o,i)}else 3===s&&(r=e.previousSibling)&&8===t.pt(r)&&"s"===(l=t.yt(r).split("."))[0]&&l[1]===o&&((f={c:t.yt(e)}).p=e,n.f||(n.f=[]),n.f[l[2]]=f)}function C(t,e){const n=t.j(e);n.$t&&n.$t.forEach(n=>{n.o||t.P.K(e,n.e,function o(t,e,n,i){return o=>{(i=t.g.get(e))?i[n](o):((i=t.O.get(e)||[]).push(n,o),t.O.set(e,i))}}(t,e,n.n),n.s,n.i)})}function O(t,e){const n={nodeName:e},o=t.j(n);if(!o||!o.k)return Promise.resolve(null);const i=o.k,s=function r(t){return Object.keys(t).reduce((e,n)=>{const o=t[n];let i;const s={name:n};if(o.state)i="states",s.gt=o.watchCallbacks||[];else if(o.elementRef)i="elements";else if(o.method)i="methods";else{i="props";let t="any";o.type&&(t=o.type,"function"==typeof o.type&&(t=o.type.name)),s.type=t.toLowerCase(),s.mutable=o.mutable||!1,s.connect=o.connect||"-",s.context=o.connect||"-",s.gt=o.watchCallbacks||[]}return e[i].push(s),e},{wt:[],Mt:[],kt:[],jt:[]})}(i.properties||{}),c=(o.$t||[]).map(t=>({Ct:t.e,capture:t.s,disabled:t.o,passive:t.i,method:t.n})),l=i.events||[],f=Object.assign({Ot:i.is,Nt:o.xt||"unknown",encapsulation:i.encapsulation||"none"},s,{events:{Wt:l,listeners:c}});return Promise.resolve(f)}function N(t,e,n,o,i){return n.mode||(n.mode=t.Pt(n)),n["s-cr"]||t.mt(n,P)||t.W&&1===e.encapsulation||(n["s-cr"]=t._(""),n["s-cr"]["s-cn"]=!0,t.ct(n,n["s-cr"],t.st(n)[0])),t.W||1!==e.encapsulation||"shadowRoot"in HTMLElement.prototype||(n.shadowRoot=n),1===e.encapsulation&&t.W&&!n.shadowRoot&&t.Tt(n,{mode:"open"}),o={Et:n["s-id"],I:{}},e.R&&Object.keys(e.R).forEach(s=>{(i=e.R[s].Q)&&(o.I[i]=t.mt(n,i))}),o}function x(t,e,n,o){n.connectedCallback=function(){(function n(t,e,o){t.At.has(o)||(t.At.set(o,!0),C(t,o)),t.y.delete(o),t.St.has(o)||(t.St.set(o,!0),o["s-id"]||(o["s-id"]=t.Rt()),function i(t,e,n){for(n=e;n=t.P.ut(n);)if(t.Lt(n)){t.Dt.has(e)||(t.r.set(e,n),n.$activeLoading&&(n["s-ld"]=n.$activeLoading),(n["s-ld"]=n["s-ld"]||[]).push(e));break}}(t,o),t.queue.tick(()=>{t.x.set(o,N(t.P,e,o)),t.qt(e,o)}))})(t,e,this)},n.attributeChangedCallback=function(t,n,o){(function i(t,e,n,o,s,c,l){if(t&&o!==s)for(c in t)if((l=t[c]).Q&&L(l.Q)===L(n)){e[c]=r(l.Z,s);break}})(e.R,this,t,n,o)},n.disconnectedCallback=function(){(function e(t,n){if(!t.it&&function o(t,e){for(;e;){if(!t.lt(e))return 9!==t.pt(e);e=t.lt(e)}}(t.P,n)){t.y.set(n,!0),c(t,n),k(t.L.get(n),!0),t.P.V(n),t.At.delete(n);{const e=t.g.get(n);e&&e.componentDidUnload&&e.componentDidUnload()}t.D&&t.D.It(n),[t.r,t.Bt,t.x].forEach(t=>t.delete(n))}})(t,this)},n["s-init"]=function(){(function e(t,n,o,i,s){if(!t.Dt.has(n)&&(i=t.g.get(n))&&!t.y.has(n)&&(!n["s-ld"]||!n["s-ld"].length)){delete n["s-ld"],t.Dt.set(n,!0);try{k(t.L.get(n)),(s=t.Bt.get(n))&&(s.forEach(t=>t(n)),t.Bt.delete(n)),i.componentDidLoad&&i.componentDidLoad()}catch(e){t.N(e,4,n)}n.classList.add(o),c(t,n)}})(t,this,o)},n["s-hmr"]=function(n){(function o(t,e,n,i){e.k=null,t.Dt.delete(n);const s=t.g.get(n);s&&(t.w.delete(s),t.g.delete(n)),t.P.V(n),t.At.delete(n),e.$t=null,n["s-hmr-load"]=(()=>{delete n["s-hmr-load"],function o(t,e,n){t.At.has(n)||(t.At.set(n,!0),e.k&&e.k.listeners&&(e.$t=e.k.listeners.map(t=>({n:t.method,e:t.name,s:!!t.capture,i:!!t.passive,o:!!t.disabled})),C(t,n)))}(t,e,n)}),t.x.set(n,N(t.P,e,n)),t.qt(e,n,i)})(t,e,this,n)},n.forceUpdate=function(){u(t,this)},function i(t,e,n){e&&Object.keys(e).forEach(o=>{const i=e[o],s=i.Ht;1===s||2===s?b(n,o,function e(){return(t.M.get(this)||{})[o]},function e(n){m(t,this,o,r(i.Z,n))}):6===s&&h(n,o,q)})}(t,e.R,n)}function W(t,e,n,o){return function(){const i=arguments;return function s(t,e,n){let o=e[n];const i=t.Ft.body;return i?(o||(o=i.querySelector(n)),o||(o=e[n]=t.et(n),t.nt(i,o)),o.componentOnReady()):Promise.resolve()}(t,e,n).then(t=>t[o].apply(t,i))}}const P="data-ssrv",T="data-ssrc",E="$",A={},S={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},R=t=>null!=t,L=t=>t.toLowerCase(),D=t=>L(t).split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(""),q=()=>{},I=[],B={getTag:t=>t.l,getChildren:t=>t.f,getText:t=>t.c,getAttributes:t=>t.u,replaceAttributes:(t,e)=>t.u=e},H="wc-",F={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},U="http://www.w3.org/1999/xlink";let z=!1;(function Q(t,e,n,o,r,c){function f(t,e){if(!n.customElements.get(t.t)){x(y,a[t.t]=t,e.prototype,c);{const n=e.observedAttributes=[];for(const e in t.R)t.R[e].Q&&n.push(t.R[e].Q)}n.customElements.define(t.t,e)}}const a={html:{}},d={},p=n[t]=n[t]||{},m=function h(t,e,n){t.Ut||(t.Ut=((t,e,n,o)=>t.addEventListener(e,n,o)),t.zt=((t,e,n,o)=>t.removeEventListener(e,n,o)));const o=new WeakMap,i={Ft:n,Qt:!1,pt:t=>t.nodeType,et:t=>n.createElement(t),tt:(t,e)=>n.createElementNS(t,e),_:t=>n.createTextNode(t),ot:t=>n.createComment(t),ct:(t,e,n)=>t.insertBefore(e,n),rt:t=>t.remove(),nt:(t,e)=>t.appendChild(e),st:t=>t.childNodes,lt:t=>t.parentNode,dt:t=>t.nextSibling,vt:t=>t.previousSibling,ft:t=>L(t.nodeName),yt:t=>t.textContent,at:(t,e)=>t.textContent=e,mt:(t,e)=>t.getAttribute(e),A:(t,e,n)=>t.setAttribute(e,n),Zt:(t,e,n,o)=>t.setAttributeNS(e,n,o),G:(t,e)=>t.removeAttribute(e),J:(t,e)=>t.hasAttribute(e),Pt:e=>e.getAttribute("mode")||(t.Context||{}).mode,Gt:(t,o)=>"child"===o?t.firstElementChild:"parent"===o?i.ut(t):"body"===o?n.body:"document"===o?n:"window"===o?e:t,K:(e,n,s,r,c,l,f,u)=>{const a=n;let d=e,p=o.get(e);if(p&&p[a]&&p[a](),"string"==typeof l?d=i.Gt(e,l):"object"==typeof l?d=l:(u=n.split(":")).length>1&&(d=i.Gt(e,u[0]),n=u[1]),!d)return;let m=s;(u=n.split(".")).length>1&&(n=u[0],m=(t=>{t.keyCode===S[u[1]]&&s(t)})),f=i.Qt?{capture:!!r,passive:!!c}:!!r,t.Ut(d,n,m,f),p||o.set(e,p={}),p[a]=(()=>{d&&t.zt(d,n,m,f),p[a]=null})},V:(t,e)=>{const n=o.get(t);n&&(e?n[e]&&n[e]():Object.keys(n).forEach(t=>{n[t]&&n[t]()}))},Tt:(t,e)=>t.attachShadow(e)};i.W=!!i.Ft.documentElement.attachShadow,e.location.search.indexOf("shadow=false")>0&&(i.W=!1),i.Jt=((t,n,o)=>t&&t.dispatchEvent(new e.CustomEvent(n,o)));try{e.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>i.Qt=!0}))}catch(t){}return i.ut=((t,e)=>(e=i.lt(t))&&11===i.pt(e)?e.host:e),i}(p,n,o);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=n,e.location=n.location,e.document=o,e.resourcesUrl=e.publicPath=r,e.enableListener=((t,e,n,o,i)=>(function s(t,e,n,o,i,r){if(e){const s=t.w.get(e),c=t.j(s);if(c&&c.$t)if(o){const o=c.$t.find(t=>t.e===n);o&&t.P.K(s,n,t=>e[o.n](t),o.s,void 0===r?o.i:!!r,i)}else t.P.V(s,n)}})(y,t,e,n,o,i)),e.emit=((t,n,o)=>m.Jt(t,e.eventNameFn?e.eventNameFn(n):n,o)),p.h=l,p.Context=e;const b=n["s-defined"]=n.$definedCmps=n["s-defined"]||n.$definedCmps||{};let v=0;const y={P:m,Kt:f,C:e.emit,j:t=>a[m.ft(t)],B:t=>e[t],isClient:!0,Lt:t=>!(!b[m.ft(t)]&&!y.j(t)),Rt:()=>t+v++,N:(t,e,n)=>void 0,F:t=>(function e(t,n,o){return{create:W(t,n,o,"create"),componentOnReady:W(t,n,o,"componentOnReady")}})(m,d,t),queue:e.queue=function $(t,e){function n(t){for(let e=0;e<t.length;e++)try{t[e]()}catch(t){}t.length=0}function o(t,e){let n=0;for(;n<t.length&&s()<e;)try{t[n++]()}catch(t){}n===t.length?t.length=0:0!==n&&t.splice(0,n)}function i(){a++,n(l);const e=s()+7*Math.ceil(a*(1/22));o(f,e),o(u,e),f.length>0&&(u.push(...f),f.length=0),(d=l.length+f.length+u.length>0)?t.raf(i):a=0}const s=()=>e.performance.now(),r=Promise.resolve(),c=[],l=[],f=[],u=[];let a=0,d=!1;return t.raf||(t.raf=e.requestAnimationFrame.bind(e)),{tick(t){c.push(t),1===c.length&&r.then(()=>n(c))},read(e){l.push(e),d||(d=!0,t.raf(i))},write(e){f.push(e),d||(d=!0,t.raf(i))}}}(p,n),qt:function g(t,e,n){if(t.k)u(y,e);else{const o="string"==typeof t.xt?t.xt:t.xt[e.mode],i=2===t.encapsulation||1===t.encapsulation&&!m.W;let s=r+o+(i?".sc":"")+".js";n&&(s+="?s-hmr="+n),import(s).then(n=>{try{t.k=n[D(t.t)],function o(t,e,n,i,s){if(i){const o=e.t+(s||E);if(!e[o]){const r=t.et("template");e[o]=r;{const o=["<style",` data-style-tag="${e.t}"`];t.A(r,"data-tmpl-style-tag",e.t),s&&(o.push(` data-style-mode="${s}"`),t.A(r,"data-tmpl-style-mode",s)),(2===n||1===n&&!t.W)&&(o.push(' data-style-scoped="true"'),t.A(r,"data-tmpl-style-scoped","true")),o.push(">"),o.push(i),o.push("</style>"),r.innerHTML=o.join("")}t.nt(t.Ft.head,r)}}}(m,t,t.encapsulation,t.k.style,t.k.styleMode)}catch(e){t.k=class{}}u(y,e)}).catch(t=>void 0)}},r:new WeakMap,Vt:new WeakMap,St:new WeakMap,At:new WeakMap,Dt:new WeakMap,w:new WeakMap,x:new WeakMap,g:new WeakMap,y:new WeakMap,b:new WeakMap,Bt:new WeakMap,O:new WeakMap,L:new WeakMap,M:new WeakMap};y.render=M(y,m);const w=m.Ft.documentElement;w["s-ld"]=[],w["s-rn"]=!0,w["s-init"]=(()=>{y.Dt.set(w,p.loaded=y.v=!0),m.Jt(n,"appload",{detail:{namespace:t}})}),function k(t,e,n){const o=n.querySelectorAll(`[${P}]`),i=o.length;let s,r,c,l,f,u;if(i>0)for(t.Dt.set(n,!0),l=0;l<i;l++)for(s=o[l],r=e.mt(s,P),(c={}).l=e.ft(c.p=s),t.L.set(s,c),f=0,u=s.childNodes.length;f<u;f++)j(e,s.childNodes[f],c,r,!0)}(y,m,w),y.T=((t,e,n,o)=>{(function s(t,e,n,o){const s=n.encapsulation,r=2===s||1===s&&!t.P.W;let c=n.t+o.mode,l=n[c];if(r&&(o["s-sc"]=i(n,o.mode)),l||(l=n[c=n.t+E],r&&(o["s-sc"]=i(n))),l){let n=e.Ft.head;if(e.W)if(1===s)n=o.shadowRoot;else{let t=o;for(;t=e.lt(t);)if(t.host&&t.host.shadowRoot){n=t.host.shadowRoot;break}}let i=t.Vt.get(n);if(i||t.Vt.set(n,i={}),!i[c]){let t;{t=l.content.cloneNode(!0),i[c]=!0;const o=n.querySelectorAll("[data-styles]");e.ct(n,t,o.length&&o[o.length-1].nextSibling||n.firstChild)}}}})(t,e,n,o)}),function C(t,e,n,o){const i=n.Xt=n.Xt||{};return i.Yt=i.Yt||[],i.Yt.push(function s(t,e,n){return{namespace:e,_t:t=>t&&t.tagName?Promise.all([O(n,t.tagName),function e(t,n){return Promise.resolve(t.g.get(n))}(n,t)]).then(t=>t[0]&&t[1]?{te:t[0],ee:t[1]}:null):Promise.resolve(null),ne:t=>O(n,t),oe:()=>Promise.all(t.components.map(t=>O(n,t[0]))).then(t=>t.filter(t=>t))}}(t,e,o)),i._t||(i._t=(t=>Promise.all(i.Yt.map(e=>e._t(t))).then(t=>t.find(t=>!!t)))),i.oe||(i.oe=(()=>{const t=[];return i.Yt.forEach(e=>{t.push(e.oe())}),Promise.all(t).then(t=>{const e=[];return t.forEach(t=>{t.forEach(t=>{e.push(t)})}),e})})),i}(p,t,n,y),(p.components||[]).map(t=>{const e=function n(t,e,o){const i={t:t[0],R:{color:{Q:"color"}}};i.xt=t[1];const r=t[3];if(r)for(e=0;e<r.length;e++)o=r[e],i.R[o[0]]={Ht:o[1],z:!!o[2],Q:"string"==typeof o[3]?o[3]:o[3]?o[0]:0,Z:o[4]};return i.encapsulation=t[4],t[5]&&(i.$t=t[5].map(s)),i}(t);return a[e.t]=e}).forEach(t=>f(t,class extends HTMLElement{})),function N(t,e,n,o,i,s){if(e.componentOnReady=((e,n)=>{if(!e.nodeName.includes("-"))return n(null),!1;const o=t.j(e);if(o)if(t.Dt.has(e))n(e);else{const o=t.Bt.get(e)||[];o.push(n),t.Bt.set(e,o)}return!!o}),i){for(s=i.length-1;s>=0;s--)e.componentOnReady(i[s][0],i[s][1])&&i.splice(s,1);for(s=0;s<o.length;s++)if(!n[o[s]].componentOnReady)return;for(s=0;s<i.length;s++)i[s][1](null);i.length=0}}(y,p,n,n["s-apps"],n["s-cr"]),p.initialized=!0})(o,n,t,e,resourcesUrl,hydratedCssClass)})(window,document,Context,namespace);
})({},"waf","hydrated");