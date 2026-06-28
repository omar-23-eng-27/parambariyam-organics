(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[331],{6882:function(e,t,s){Promise.resolve().then(s.bind(s,6063))},8030:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var r=s(2265);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=function(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.filter((e,t,s)=>!!e&&s.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,r.forwardRef)((e,t)=>{let{color:s="currentColor",size:n=24,strokeWidth:o=2,absoluteStrokeWidth:i,className:c="",children:d,iconNode:x,...u}=e;return(0,r.createElement)("svg",{ref:t,...a,width:n,height:n,stroke:s,strokeWidth:i?24*Number(o)/Number(n):o,className:l("lucide",c),...u},[...x.map(e=>{let[t,s]=e;return(0,r.createElement)(t,s)}),...Array.isArray(d)?d:[d]])}),i=(e,t)=>{let s=(0,r.forwardRef)((s,a)=>{let{className:i,...c}=s;return(0,r.createElement)(o,{ref:a,iconNode:t,className:l("lucide-".concat(n(e)),i),...c})});return s.displayName="".concat(e),s}},2468:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(8030).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},8422:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(8030).Z)("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]])},2513:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(8030).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},883:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(8030).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},4697:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,s(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},6063:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return f}});var r=s(7437),n=s(2265),l=s(4601),a=s(9752),o=s(2513),i=s(2468),c=s(4697),d=s(8422),x=s(883);let u=()=>({id:"cat-".concat(Date.now()),slug:"",name:{en:"",ta:""}});function m(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}function f(){let[e,t]=(0,n.useState)((0,a.CP)()),[s,f]=(0,n.useState)(null),[h,p]=(0,n.useState)(!1),b=s=>{if(!confirm("Delete this category?"))return;let r=e.filter(e=>e.id!==s);t(r),(0,a.Dg)(r)};return(0,r.jsxs)(l.Z,{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-forest",children:"Categories"}),(0,r.jsxs)("button",{onClick:()=>{f(u()),p(!0)},className:"bg-leaf text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5",children:[(0,r.jsx)(o.Z,{size:15})," Add New"]})]}),s&&(0,r.jsxs)("div",{className:"bg-white border border-lime/30 rounded-2xl p-6 mb-6 space-y-4",children:[(0,r.jsx)("h2",{className:"font-semibold text-forest",children:h?"New Category":"Edit Category"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("span",{className:"text-xs font-semibold text-forest/60 mb-1 block",children:"Name (English)"}),(0,r.jsx)("input",{value:s.name.en,onChange:e=>f({...s,name:{...s.name,en:e.target.value}}),className:"w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"})]}),(0,r.jsxs)("label",{className:"block",children:[(0,r.jsx)("span",{className:"text-xs font-semibold text-forest/60 mb-1 block",children:"Name (Tamil)"}),(0,r.jsx)("input",{value:s.name.ta,onChange:e=>f({...s,name:{...s.name,ta:e.target.value}}),className:"w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/40"})]})]}),(0,r.jsxs)("div",{className:"flex gap-3",children:[(0,r.jsxs)("button",{onClick:()=>{if(!s)return;let r=h?[...e,{...s,slug:m(s.name.en)}]:e.map(e=>e.id===s.id?{...s,slug:m(s.name.en)}:e);t(r),(0,a.Dg)(r),f(null),p(!1)},className:"bg-leaf text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-forest transition-colors flex items-center gap-1.5",children:[(0,r.jsx)(i.Z,{size:14})," Save"]}),(0,r.jsxs)("button",{onClick:()=>{f(null),p(!1)},className:"border border-gray-200 text-sm px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5",children:[(0,r.jsx)(c.Z,{size:14})," Cancel"]})]})]}),(0,r.jsx)("div",{className:"bg-white rounded-2xl border border-lime/20 overflow-hidden",children:(0,r.jsxs)("table",{className:"w-full text-sm",children:[(0,r.jsx)("thead",{className:"bg-cream border-b border-lime/20",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase",children:"Name (EN)"}),(0,r.jsx)("th",{className:"text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase",children:"Name (TA)"}),(0,r.jsx)("th",{className:"text-left px-5 py-3 text-xs font-semibold text-forest/60 uppercase",children:"Slug"}),(0,r.jsx)("th",{className:"px-5 py-3 w-24"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-lime/10",children:e.map(e=>(0,r.jsxs)("tr",{className:"hover:bg-cream/50 transition-colors",children:[(0,r.jsx)("td",{className:"px-5 py-3 font-medium text-forest",children:e.name.en}),(0,r.jsx)("td",{className:"px-5 py-3 text-gray-600",children:e.name.ta}),(0,r.jsx)("td",{className:"px-5 py-3 text-gray-400 font-mono text-xs",children:e.slug}),(0,r.jsx)("td",{className:"px-5 py-3",children:(0,r.jsxs)("div",{className:"flex gap-2 justify-end",children:[(0,r.jsx)("button",{onClick:()=>{f(e),p(!1)},className:"p-1.5 text-leaf hover:bg-leaf/10 rounded-lg transition-colors",children:(0,r.jsx)(d.Z,{size:14})}),(0,r.jsx)("button",{onClick:()=>b(e.id),className:"p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors",children:(0,r.jsx)(x.Z,{size:14})})]})})]},e.id))})]})})]})}}},function(e){e.O(0,[648,138,336,971,23,744],function(){return e(e.s=6882)}),_N_E=e.O()}]);