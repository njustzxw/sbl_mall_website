webpackJsonp([10],{U6fA:function(e,n){},a1Ff:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("HzJ8"),i=t.n(r),c={components:{Shzc:function(e){t.e(26).then(function(){var n=[t("fASV")];e.apply(null,n)}.bind(this)).catch(t.oe)},Gmzn:function(e){t.e(23).then(function(){var n=[t("Eebg")];e.apply(null,n)}.bind(this)).catch(t.oe)},Zffs:function(e){t.e(36).then(function(){var n=[t("agHz")];e.apply(null,n)}.bind(this)).catch(t.oe)},Shfw:function(e){t.e(32).then(function(){var n=[t("Q2+s")];e.apply(null,n)}.bind(this)).catch(t.oe)},Lsmd:function(e){t.e(25).then(function(){var n=[t("3SeL")];e.apply(null,n)}.bind(this)).catch(t.oe)},Rdzx:function(e){t.e(33).then(function(){var n=[t("gQrD")];e.apply(null,n)}.bind(this)).catch(t.oe)},Ddwl:function(e){t.e(27).then(function(){var n=[t("IkTA")];e.apply(null,n)}.bind(this)).catch(t.oe)},Gsjj:function(e){t.e(28).then(function(){var n=[t("yusa")];e.apply(null,n)}.bind(this)).catch(t.oe)},Jrwm:function(e){t.e(34).then(function(){var n=[t("64kt")];e.apply(null,n)}.bind(this)).catch(t.oe)},Ryjx:function(e){t.e(16).then(function(){var n=[t("6rrB")];e.apply(null,n)}.bind(this)).catch(t.oe)},QQ:function(e){t.e(31).then(function(){var n=[t("7XaS")];e.apply(null,n)}.bind(this)).catch(t.oe)},Weixin:function(e){t.e(35).then(function(){var n=[t("qqj3")];e.apply(null,n)}.bind(this)).catch(t.oe)},Lxwm:function(e){t.e(30).then(function(){var n=[t("zdNi")];e.apply(null,n)}.bind(this)).catch(t.oe)}},data:function(){return{currentroute:"",currentroutearr:[],show1:!0,list:[{name:"订单服务",url:"/service",children:[{name:"购买指南",url:"/service"},{name:"支付方式",url:"/service"},{name:"送货政策",url:"/service"}]},{name:"服务支持",url:"/service",children:[{name:"售后服务",url:"/service"},{name:"零售门店",url:"/service"}]},{name:"自助服务",url:"/service",children:[{name:"热点咨询",url:"/service"},{name:"订单物流",url:"/service"}]},{name:"媒体中心",url:"/service",children:[{name:"新闻动态",url:"/service"}]},{name:"关于公司",url:"/service",children:[{name:"公司简介",url:"/service"},{name:"加入我们",url:"/service"},{name:"荣誉奖项",url:"/service"}]},{name:"关注我们",url:"/service",children:[{name:"官方QQ",url:"/service"},{name:"官方微信",url:"/service"},{name:"联系我们",url:"/service"}]}]}},mounted:function(){var e=this;this.$nextTick(function(){e.menu()})},computed:{servicename:function(){return this.$store.state.app.servicename}},watch:{servicename:function(){}},methods:{menu:function(){var e=this;this.currentroute=this.servicename;var n=[],t=!0,r=!1,c=void 0;try{for(var a,s=i()(this.list);!(t=(a=s.next()).done);t=!0){var u=a.value,l=!0,o=!1,v=void 0;try{for(var h,m=i()(u.children);!(l=(h=m.next()).done);l=!0){var f=h.value;this.servicename==f.name&&n.push(u.name)}}catch(e){o=!0,v=e}finally{try{!l&&m.return&&m.return()}finally{if(o)throw v}}}}catch(e){r=!0,c=e}finally{try{!t&&s.return&&s.return()}finally{if(r)throw c}}this.currentroutearr=n,this.show1=!1,setTimeout(function(){e.show1=!0},10),console.log(this.servicename),console.log(this.currentroutearr)},select:function(e){console.log(e),this.$store.commit("servicename",e)}}},a={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"clearfix"},[t("div",{staticClass:"lb"}),e._v(" "),e.show1?t("div",{staticClass:"aside fl"},[t("Menu",{attrs:{"active-name":e.currentroute,"open-names":e.currentroutearr,accordion:""},on:{"on-select":e.select}},e._l(e.list,function(n,r){return t("Submenu",{key:r,attrs:{name:n.name}},[t("template",{slot:"title"},[t("Icon",{attrs:{type:"ios-paper"}}),e._v("\n                    "+e._s(n.name)+"\n                ")],1),e._v(" "),e._l(n.children,function(n,r){return t("MenuItem",{key:r,attrs:{name:n.name}},[e._v(e._s(n.name))])})],2)}))],1):e._e(),e._v(" "),t("div",{staticClass:"contentright fl "},["送货政策"==e.servicename?t("Shzc"):e._e(),e._v(" "),"购买指南"==e.servicename?t("Gmzn"):e._e(),e._v(" "),"支付方式"==e.servicename?t("Zffs"):e._e(),e._v(" "),"售后服务"==e.servicename?t("Shfw"):e._e(),e._v(" "),"零售门店"==e.servicename?t("Lsmd"):e._e(),e._v(" "),"热点咨询"==e.servicename?t("Rdzx"):e._e(),e._v(" "),"订单物流"==e.servicename?t("Ddwl"):e._e(),e._v(" "),"公司简介"==e.servicename?t("Gsjj"):e._e(),e._v(" "),"加入我们"==e.servicename?t("Jrwm"):e._e(),e._v(" "),"荣誉奖项"==e.servicename?t("Ryjx"):e._e(),e._v(" "),"官方QQ"==e.servicename?t("QQ"):e._e(),e._v(" "),"官方微信"==e.servicename?t("Weixin"):e._e(),e._v(" "),"联系我们"==e.servicename?t("Lxwm"):e._e()],1)])},staticRenderFns:[]};var s=t("C7Lr")(c,a,!1,function(e){t("U6fA")},"data-v-7326f41a",null);n.default=s.exports}});
//# sourceMappingURL=10.ecfe5a3a9cbfa9fb865d.js.map