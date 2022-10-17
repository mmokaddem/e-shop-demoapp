"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[607],{7894:(M,a,o)=>{o.r(a),o.d(a,{OrdersModule:()=>x});var i=o(9808),l=o(4466),d=o(5443),e=o(1223),u=o(2340),p=o(520);let c=(()=>{class r{constructor(t){this.http=t,this.baseUrl=u.N.apiUrl}getOrdersForUser(){return this.http.get(this.baseUrl+"orders")}getOrderDetailed(t){return this.http.get(this.baseUrl+"orders/"+t)}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(p.eN))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();function g(r,n){1&r&&(e.ynx(0),e.TgZ(1,"div",2)(2,"div"),e._UZ(3,"i",3),e.TgZ(4,"h4"),e._uU(5,"There is no orders found."),e.qZA()(),e.TgZ(6,"p"),e._uU(7,"Fill the shopping cart with one of our products."),e.qZA(),e.TgZ(8,"button",4),e._uU(9," Continue shopping "),e.qZA()(),e.BQk())}function m(r,n){if(1&r&&(e.TgZ(0,"tr",7)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.ALo(5,"date"),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.ALo(8,"currency"),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA()()),2&r){const t=n.$implicit;e.MGl("routerLink","/orders/",t.id,""),e.xp6(2),e.hij("# ",t.id,""),e.xp6(2),e.Oqu(e.xi3(5,5,t.orderDate,"medium")),e.xp6(3),e.Oqu(e.lcZ(8,8,t.total)),e.xp6(3),e.Oqu(t.status)}}function O(r,n){if(1&r&&(e.ynx(0),e.TgZ(1,"table",5)(2,"thead")(3,"tr")(4,"th"),e._uU(5,"Order"),e.qZA(),e.TgZ(6,"th"),e._uU(7,"Date"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Total"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Status"),e.qZA()()(),e.TgZ(12,"tbody"),e.YNc(13,m,11,10,"tr",6),e.qZA()(),e.BQk()),2&r){const t=e.oxw();e.xp6(13),e.Q6J("ngForOf",t.orders)}}let h=(()=>{class r{constructor(t){this.ordersService=t}ngOnInit(){this.getOrders()}getOrders(){this.ordersService.getOrdersForUser().subscribe({next:t=>{this.orders=t},error:t=>{console.log(t)}})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(c))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-orders"]],decls:3,vars:2,consts:[[1,"container"],[4,"ngIf"],[1,"empty"],[1,"fa-solid","fa-inbox"],["routerLink","/shop",1,"btn","btn-primary"],[1,"table"],[3,"routerLink",4,"ngFor","ngForOf"],[3,"routerLink"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.YNc(1,g,10,0,"ng-container",1),e.YNc(2,O,14,1,"ng-container",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngIf",0===(null==s.orders?null:s.orders.length)),e.xp6(1),e.Q6J("ngIf",(null==s.orders?null:s.orders.length)>0))},directives:[i.O5,d.rH,i.sg],pipes:[i.uU,i.H9],styles:[".table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{cursor:pointer;background-color:#f6f9fa}.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:.9rem}@media only screen and (min-width: 425px){.table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:1rem}}"]}),r})();var f=o(3315),Z=o(3449),v=o(9281);function C(r,n){if(1&r&&(e.ynx(0),e.TgZ(1,"div",1)(2,"div",2),e._UZ(3,"app-basket-summary",3),e.qZA(),e.TgZ(4,"div",4),e._UZ(5,"app-order-totals",5),e.qZA()(),e.BQk()),2&r){const t=e.oxw();e.xp6(3),e.Q6J("items",t.order.orderItems)("isBasket",!1)("isOrder",!0),e.xp6(2),e.Q6J("shippingPrice",t.order.shippingPrice)("subtotal",t.order.subtotal)("total",t.order.total)}}const b=[{path:"",component:h},{path:":id",component:(()=>{class r{constructor(t,s,T){this.router=t,this.breadcrumbService=s,this.ordersService=T,this.breadcrumbService.set("@OrderDetailed","")}ngOnInit(){this.ordersService.getOrderDetailed(+this.router.snapshot.paramMap.get("id")).subscribe({next:t=>{this.order=t,this.breadcrumbService.set("@OrderDetailed",`Order# ${t.id} - ${t.status}`)},error:t=>{console.log(t)}})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(d.gz),e.Y36(f.pm),e.Y36(c))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-order-detailed"]],decls:1,vars:1,consts:[[4,"ngIf"],[1,"container"],[1,"column"],[3,"items","isBasket","isOrder"],[1,"column","order-summary"],[3,"shippingPrice","subtotal","total"]],template:function(t,s){1&t&&e.YNc(0,C,6,6,"ng-container",0),2&t&&e.Q6J("ngIf",s.order)},directives:[i.O5,Z.b,v.S],styles:[".order-summary[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-end}"]}),r})(),data:{breadcrumb:{alias:"OrderDetailed"}}}];let y=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[d.Bz.forChild(b)],d.Bz]}),r})(),x=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[i.ez,l.m,y]]}),r})()}}]);