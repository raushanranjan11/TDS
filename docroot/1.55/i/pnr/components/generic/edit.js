{xtype:"form",border:false,width:600,height:350,markDataDirtyOnLoad:true,afterDataLoad:function(a){this.initTimer();this.initRadioSelection(a.status);this.initInventory();this.initCommission(a.pricingPriceIsNett)},getPassengerGrid:function(){return this.items.itemAt(1).items.itemAt(2).items.itemAt(1)},getExtraGrid:function(){return this.items.itemAt(1).items.itemAt(1).items.itemAt(0)},getDetailsPanel:function(a){var b=this.items.itemAt(1).items.itemAt(0).items.itemAt(0);if(a=="tour"||a=="accommodation"){b.items.itemAt(1).show();return b.items.itemAt(1)}else{if(a=="sightseeing"||a=="transfer"||a=="attraction"||a=="car"||a=="hostel"){b.items.itemAt(2).show();return b.items.itemAt(2)}}},hasDetailsInventory:false,hasDetailsOffering:false,isDetailsReady:function(){if(this.hasDetailsInventory&&this.hasDetailsOffering){return true}return false},items:[{xtype:"timerlabel",hidden:true,text:"This booking will expire in...",listeners:{timerexpire:function(a){this.setText("Your booking has expired.")},timerrefresh:function(a,b){this.setText("This booking will expire in... <b>"+b+"</b>.",false)}}},{xtype:"tabpanel",border:false,height:350,autoScroll:true,defaults:{border:false},activeTab:0,layoutOnTabChange:true,defaults:{bodyStyle:"padding: 8px;"},items:[{title:"Details",items:{xtype:"panel",cls:"x-tds-offering",labelWidth:110,border:false,items:[{xtype:"panel",border:false,layout:"form",items:[{xtype:"fieldlabel",name:"supplierURI",useConcise:true,fieldLabel:"Supplier",text:"N/A"},{xtype:"fieldlabel",name:"name",fieldLabel:"Component",text:""},{xtype:"fieldlabel",fieldLabel:'<span id="test_label_span" style="display:none;">Cancellation Policy :</span>',hidden:true,labelSeparator:"",hideLabel:false,name:"hotusaCancellationRules",text:""}]},{columnWidth:0.48,xtype:"panel",id:"rateTableId",layout:"table",hidden:true,border:false,tpl:new Ext.XTemplate('<div style="   ">','<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;" >','<th style="padding: 2px; width: 30%;">Rate</th>','<th style="padding: 2px; width: 25%;">Room Type</th>','<th style="padding: 2px; width: 5%;">No</th>','<th style="padding: 2px; width: 20%;">Price</th>','<th style="padding: 2px; width: 20%;">Status</th>',"</tr>","{rateBody}","</table>","</div>","<br>")},{columnWidth:0.48,xtype:"panel",id:"sightseeingTableId",layout:"table",hidden:true,border:false,tpl:new Ext.XTemplate('<div style="  ">','<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;" >','<th style="padding: 2px; width: 30%;">Rate</th>','<th style="padding: 2px; width: 25%;">Room Type</th>','<th style="padding: 2px; width: 5%;">No</th>','<th style="padding: 2px; width: 20%;">Price</th>','<th style="padding: 2px; width: 20%;">Status</th>',"</tr>","{rateBody}","</table>","</div>","<br>")},{xtype:"fieldset",hidden:true,collapsed:false,title:"Markup",autoHeight:true,hideBorders:true,defaults:{xtype:"panel",layout:"table",bodyStyle:"padding: 2px;",layoutConfig:{columns:6}},getField:function(c){var a=this.ownerCt.findParentByType("form");var b=a.getForm().findField(c);if(b){return b}},calculateCommission:function(b){if(b){var a=Math.round((this.getField("pricingPriceCommissionPercentage").getValue()/100)*this.getField("pricingPriceSell").getValue());if(!isNaN(a)){this.getField("pricingPriceCommission").setValue(a)}}else{var a=Math.round((this.getField("pricingPriceCommission").getValue()*100)/this.getField("pricingPriceSell").getValue());if(!isNaN(a)){this.getField("pricingPriceCommissionPercentage").setValue(a)}}},items:[{items:[{xtype:"fieldlabel",name:"pricingPriceCurrency",style:"padding-right: 2px;",setValue:function(a){this.currencyValue=a;this.setText("Markup "+TDS.util.Price.formatCurrency(a))},getValue:function(){return this.currencyValue}},{xtype:"textfield",name:"pricingPriceCommission",width:60,enableKeyEvents:true,listeners:{keyup:function(){var a=this.ownerCt.ownerCt;a.calculateCommission()}}},{xtype:"label",style:"padding: 0 4px;",text:"or"},{xtype:"textfield",name:"pricingPriceCommissionPercentage",width:40,enableKeyEvents:true,listeners:{keyup:function(){var a=this.ownerCt.ownerCt;a.calculateCommission(true)}}},{xtype:"label",style:"padding-left: 4px;",text:"%"},{xtype:"fieldlabel",name:"pricingPriceSell",style:"padding: 0 4px;",setValue:function(a){this.priceValue=a;this.setText(a)},getValue:function(){return this.priceValue},setText:function(a,b){var c=this.ownerCt.items.itemAt(0);this.text=a;a="(nett "+TDS.util.Price.formatPrice(a,c.getValue())+")";if(this.rendered){this.el.dom.innerHTML=b!==false?Ext.util.Format.htmlEncode(a):a}return this}}]}]},{xtype:"fieldset",layout:"table",layoutConfig:{columns:1},autoHeight:true,defaults:{xtype:"radio",name:"status",forceSubmit:true,hideLabel:true},items:[{boxLabel:"Leave as-is.",checked:true,inputValue:"doNothing"},{boxLabel:"Confirm",hidden:true,inputValue:TDS.data.componentStatus.STATUS_CONFIRMED},{boxLabel:"Cancel",hidden:true,inputValue:TDS.data.componentStatus.STATUS_CANCELLED},{boxLabel:"Request cancellation",hidden:true,inputValue:TDS.data.componentStatus.STATUS_CANCEL_REQUESTED},{boxLabel:"Re-secure",hidden:true,inputValue:TDS.data.componentStatus.STATUS_CONFIRMED},{boxLabel:"Release",hidden:true,inputValue:TDS.data.componentStatus.STATUS_RELEASED},{boxLabel:"Confirm Request",hidden:true,inputValue:TDS.data.componentStatus.STATUS_CONFIRMED}]}]}},{title:"Extras",items:[{xtype:"panel",border:false,layout:"form",items:[{xtype:"fieldlabel",name:"supplierURI",useConcise:true,fieldLabel:"Supplier",text:"N/A"},{xtype:"fieldlabel",name:"name",fieldLabel:"Component",text:""},{xtype:"fieldlabel",fieldLabel:'<span id="test_label_span" style="display:none;">Cancellation Policy :</span>',hidden:true,labelSeparator:"",hideLabel:false,name:"hotusaCancellationRules",text:""}]},{xtype:"editorgrid",height:160,width:580,extraTpl:new Ext.XTemplate(["Name: {nameString}<br/>","Category: {[TDS.util.Format.displayResourceName(values.extraCategoryURI)]}<br/>","Required: {[TDS.util.Format.booleanRenderer(values.required)]}<br/>","Min. required: {minimumInventoryRequired}<br/>"]),enableHdMenu:false,stores:{},store:new Ext.data.JsonStore({url:"",fields:["dataURI","selectedDataURI","name","nameString","extraCategoryURI","minimumInventoryRequired","required","pricingPriceCurrency","pricingPriceCommission","pricingPriceIsNett","pricingPriceSell","quantity","pricingPriceMarkup"]}),getData:function(){var b=this.ownerCt.findParentByType("awesomewindow");var f=this.getStore().getModifiedRecords();for(var e=0,g=[];e<f.length;e++){var a=f[e].get("selectedDataURI");var c={extraURI:f[e].get("dataURI"),quantity:f[e].get("quantity")};if(f[e].get("pricingPriceMarkup")){c.pricingPriceMarkup=f[e].get("pricingPriceMarkup")}g.push({method:a?"PUT":"POST",destinationDataURI:a?TDS.env.dataPath+a+"?currency="+b.getParam("priceCurrency"):TDS.env.dataPath+this.baseDataURI+"/extras?currency="+b.getParam("priceCurrency"),data:c})}return{data:g}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Extras",dataIndex:"nameString",width:120},{header:"Quantity",width:60,fixed:true,dataIndex:"quantity",editor:new Ext.form.OmnicrementerField()},{header:"Price",dataIndex:"convertedPricingPriceSell",width:100,fixed:true,renderer:TDS.util.Price.conversionGrossNettPriceRenderer},{header:"Status",dataIndex:"status",width:70,fixed:true,editor:new Ext.form.TextField()}],viewConfig:{forceFit:true,getRowClass:function(a,d,c,b){if(a.get("required")==true){return"x-tds-disabled-row"}}},initSelectionStore:function(){;var c=this.getStore();var b=[];var a=[];this.stores.rateExtras.each(function(g){;var i={};Ext.apply(i,g.data);var f=this.stores.selectedRateExtras.find("extraURI",g.get("dataURI"));if(f!==-1){a.push(g.get("dataURI"));var h=this.stores.selectedRateExtras.getAt(f);Ext.apply(i,{selectedDataURI:h.get("dataURI"),quantity:h.get("quantity"),pricingPriceMarkup:h.get("pricingPriceIsNett")?h.get("pricingPriceCommission"):""})}else{Ext.apply(i,{selectedDataURI:"",quantity:"",pricingPriceMarkup:""})}var g=new c.recordType(i);b[b.length]=g},this);c.add(b);c.sort("required","DESC");var e=this.getStore().data;for(var d=0;d<e.length;d++){if(a.indexOf(e.items[d].data.dataURI)!=-1){this.getSelectionModel().selectRow(d,true,false)}}this.lm.hide()},listeners:{beforeedit:function(a){if(a.field=="pricingPriceMarkup"){if(!a.record.get("convertedPricingPriceIsNett")){a.cancel=true}}},render:function(){var d=this.getSelectionModel();d.on("beforerowselect",function(i,h,f,e){var g=this.ownerCt.items.itemAt(2);this.extraTpl.overwrite(g.body,e.data);if(e.get("required")==true){return false}},this);var c=this.ownerCt.findParentByType("form");var a=this.ownerCt.findParentByType("awesomewindow");a.registerItem(this.id);this.baseDataURI=a.getConfigValue("sourceDataURI");this.lm=new Ext.LoadMask(this.el,{msg:""});var b=0;this.lm.show();this.stores.rateExtras=new Ext.data.CollectionStore({autoLoad:true,identifier:a.getDataURI("offering")+"/searchExtras?rateURI="+a.getParam("rateList")+"&currency="+a.getParam("priceCurrency"),url:TDS.env.dataPath+a.getDataURI("offering")+"/searchExtras?rateURI="+a.getParam("rateList")+"&currency="+a.getParam("priceCurrency"),fields:["dataURI","name","extraCategoryURI","minimumInventoryRequired","required","conversionCurrency","convertedPricingPriceCommission","convertedPricingPriceIsNett","convertedPricingPriceSell"],listeners:{load:{fn:function(){b++;if(b==2){this.initSelectionStore()}this.lm.hide()},scope:this}}});this.stores.selectedRateExtras=new Ext.data.CollectionStore({autoLoad:true,identifier:this.baseDataURI+"/extras",url:TDS.env.dataPath+this.baseDataURI+"/extras/collection",fields:["extraURI","quantity","pricingPriceCurrency","pricingPriceCommission","pricingPriceIsNett","pricingPriceSell"],listeners:{load:{fn:function(){b++;if(b==2){this.initSelectionStore()}this.lm.hide()},scope:this}}})}}},{xtype:"panel",style:"margin-top: 4px;",bodyStyle:{background:"#ffffff",padding:"8px"},html:"Please select an extra to see additional details."}]}]}],initTimer:function(){var a=this.findParentByType("awesomewindow").getConfigValue("sourceDataURI");if(a){var c=this.items.itemAt(0);var b=Ext.TimerMgr.lookup(a);if(b){c.setTimer(b);c.show()}}},initRadioSelection:function(d){var l=this.findParentByType("awesomewindow");var j=[];var k=l.getDataURI("offering");j=k.split("/");var o=j[0];var h=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).findByType("fieldset")[1];var e=h.items.itemAt(0);var m=h.items.itemAt(1);var i=h.items.itemAt(2);var a=h.items.itemAt(3);var f=h.items.itemAt(4);var g=h.items.itemAt(5);var p=h.items.itemAt(6);var n=this.ownerCt;var c=n.getParam("status");h.items.each(function(b){if(b.inputValue==c){b.setValue(true)}else{b.setValue(false);if(c!="doNothing"&&b.inputValue!="doNothing"){b.disable(true)}}});if(d.toLowerCase()==TDS.data.componentStatus.STATUS_HELD.toLowerCase()){m.show();i.show()}if(TDS.env.user.isArenaOne()&&d.toLowerCase()==TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()&&o!="air"&&o!="car"){p.show()}else{if(d.toLowerCase()==TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()){a.show()}else{if(d.toLowerCase()==TDS.data.componentStatus.STATUS_CANCEL_REQUESTED.toLowerCase()){a.hide();f.show()}else{if(d.toLowerCase()==TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()){g.show()}}}}},initInventory:function(){;var l=this.ownerCt;var k=this.findParentByType("awesomewindow");var e=k.getConfigValue("sourceDataURI");var i=k.getDataURI("offering");l.el.mask("","x-mask-loading");var h=[];h=i.split("/");var m=h[0];var f=k.getParam("displayStatus");if(m=="tour"){Ext.Ajax.request({url:TDS.env.dataPath+l.getConfigValue("sourceDataURI")+"/inventories/collection",method:"GET",callback:function(E,B,D){;if(B){try{var z=Ext.decode(D.responseText)}catch(L){}if(z){var v=0,U,q=[];var V=0;var C=z["component/inventory/collection"];var p=C[e+"/inventories"];var K=z["component/rate/collection/"];var N=K["component/rate/collection/list"];var M=new Array();M=e.split("/");var R="";this.rateData=[];var G=p.length/N.length;var F=[];var S="";var t=[];var I=0;if(p.length>0){for(var J=0;J<p.length;J++){var y=C[p[J]];q[q.length]=TDS.util.Format.dateSpecial(y.date,TDS.env.dateFormatDisplay);S=y.pricingPriceCurrency;if(t.indexOf(y.rateId)==-1){t[J]=y.rateId;F[I]=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:y.pricingPriceCurrency,pricingPriceSell:y.pricingPriceSell,pricingPriceCommission:y.pricingPriceCommission,pricingPriceIsNett:y.pricingPriceIsNett});F[I].rateId=y.rateId;F[I].quantity=y.quantity;I++}}var x="";var W=0;if(N.length>0){for(var J=0;J<N.length;J++){var u=K[N[J]];R=K[N[J]].tempBookedDate;var P=[];var A=u.groupName;var n="";var b="";if(typeof A=="undefined"){P=""}else{P=A.split(",")}var Q=[];var O=P[0];if(typeof O=="undefined"){Q=""}else{Q=O.split(",")}var w=[];for(var H=0;H<F.length;H++){if(F[H].rateId==N[J].substring(N[J].lastIndexOf("/")+1,N[J].length)){w=F[H]}}if(w!=null){if(!w.priceIsNett){n=w.priceCommissionPercentage}else{b=w.priceCommission;V+=(w.quantity*w.priceCommission)}W+=(w.quantity*w.priceSell)}else{w=[]}x+="<tr>";x+="<td>"+u.nameString+"</td>",x+="<td>"+P[1]+"</td>",x+="<td  ALIGN=CENTER>"+w.quantity+"</td>",x+="<td  ALIGN=RIGHT>"+w.priceCurrency+" "+(w.priceSell.toFixed(2))+"</td>",x+="<td  >"+f+"</td>",x+="</tr>"}}if(q.length>0){var T=q[0]}else{var T=q}this.inventoryData={rateBody:x,numberOfNights:G,dates:T,markup:V.toFixed(2),pnrCode:M[1],total:W.toFixed(2),priceCurrency1:S,priceCurrency:S};this.hasDetailsInventory=true;if(!this.isDetailsReady()){this.displayDetails("tour")}}}}l.el.unmask()},scope:this})}else{if(m=="accommodation"){var g=this.findParentByType("awesomewindow");var c=g.aw.data;var d=c.supplierURI;if(d==TDS.util.Defaults.hotusaSupplier){var j=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2);j.show();document.getElementById("test_label_span").style.display="block"}else{var j=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2);j.hide()}Ext.Ajax.request({url:TDS.env.dataPath+l.getConfigValue("sourceDataURI")+"/inventories/collection",method:"GET",callback:function(C,z,B){if(z){try{var y=Ext.decode(B.responseText)}catch(K){}if(y){var u=0,Q,p=[];var J=0;var A=y["component/inventory/collection"];var b=A[e+"/inventories"];var I=y["component/rate/collection/"];var M=I["component/rate/collection/list"];var L=new Array();L=e.split("/");var N="";this.rateData=[];var E=b.length/M.length;var D=[];var O="";var q=[];var G=0;if(b.length>0){for(var H=0;H<b.length;H++){var x=A[b[H]];p[p.length]=TDS.util.Format.dateSpecial(x.date,TDS.env.dateFormatDisplay);O=x.pricingPriceCurrency;if(q.indexOf(x.rateId)==-1){q[H]=x.rateId;D[G]=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:x.pricingPriceCurrency,pricingPriceSell:x.pricingPriceSell,pricingPriceCommission:x.pricingPriceCommission,pricingPriceIsNett:x.pricingPriceIsNett});D[G].rateId=x.rateId;D[G].quantity=x.quantity;G++}}var w="";var R=0;var n=0;if(M.length>0){for(var H=0;H<M.length;H++){var t=I[M[H]];n=n+t.extraTotal;N=I[M[H]].tempBookedDate;var v=[];var a="";for(var F=0;F<D.length;F++){if(D[F].rateId==M[H].substring(M[H].lastIndexOf("/")+1,M[H].length)){v=D[F]}}if(v!=null){if(!v.priceIsNett){a=v.priceCommissionPercentage}if(v.priceIsNett){J+=(v.quantity*v.priceCommission)}R+=(v.quantity*v.priceSell)+t.extraTotal;w+="<tr>";w+="<td >"+t.nameString+"</td>",w+="<td >"+TDS.util.Format.displayResourceName(t.inventoryTypeURI)+"</td>",w+="<td ALIGN=CENTER>"+v.quantity+"</td>",w+="<td ALIGN=RIGHT>"+v.priceCurrency+" "+(v.priceSell.toFixed(2))+"</td>",w+="<td ALIGN=CENTER>"+f+"</td>",w+="</tr>"}else{v=[]}}R+=J}if(p.length>0){var P=p[0]}else{var P=p}this.inventoryData={rateBody:w,numberOfNights:E,dates:P,markup:J.toFixed(2),pnrCode:L[1],bookeddateDis:N,total:R.toFixed(2),extraTotal:n.toFixed(2),priceCurrency:O};this.hasDetailsInventory=true;this.displayDetails("accommodation")}}}},scope:this});l.el.unmask()}else{if(m=="sightseeing"||m=="transfer"||m=="attraction"||m=="car"||m=="hostel"){Ext.Ajax.request({url:TDS.env.dataPath+l.getConfigValue("sourceDataURI")+"/inventories/collection",method:"GET",callback:function(D,A,C){;if(A){try{var z=Ext.decode(C.responseText)}catch(L){}if(z){var v=0,R,q=[];var K=0;var B=z["component/inventory/collection"];var b=B[e+"/inventories"];var J=z["component/rate/collection/"];var N=J["component/rate/collection/list"];var M=new Array();M=e.split("/");var O="";this.rateData=[];var F=b.length/N.length;var E=[];var P="";var t=[];var H=0;if(b.length>0){for(var I=0;I<b.length;I++){var y=B[b[I]];q[q.length]=TDS.util.Format.dateSpecial(y.date,TDS.env.dateFormatDisplay);P=y.pricingPriceCurrency;if(t.indexOf(y.rateId)==-1){t[I]=y.rateId;E[H]=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:y.pricingPriceCurrency,pricingPriceSell:y.pricingPriceSell,pricingPriceCommission:y.pricingPriceCommission,pricingPriceIsNett:y.pricingPriceIsNett});E[H].rateId=y.rateId;E[H].quantity=y.quantity;H++}}var x="";var S=0;var p=0;if(N.length>0){for(var I=0;I<N.length;I++){var u=J[N[I]];p=p+u.extraTotal;O=J[N[I]].tempBookedDate;var w=null;var a="";for(var G=0;G<E.length;G++){if(E[G].rateId==N[I].substring(N[I].lastIndexOf("/")+1,N[I].length)){w=E[G]}}if(w!=null){if(!w.priceIsNett){a=w.priceCommissionPercentage}if(w.priceIsNett){K+=(w.quantity*w.priceCommission)}S+=(w.quantity*w.priceSell)+u.extraTotal;x+="<tr>";x+="<td >"+u.nameString+"</td>";var n=u.inventoryTypeURI;if(typeof n!="undefined"&&n!=""){x+="<td width: 15%;>"+TDS.util.Format.displayResourceName(u.inventoryTypeURI)+"</td>"}else{x+="<td ALIGN=CENTER> </td>"}x+="<td ALIGN=CENTER>"+w.quantity+"</td>";x+="<td ALIGN=RIGHT>"+w.priceCurrency+" "+(w.priceSell.toFixed(2))+"</td>";x+="<td ALIGN=CENTER>"+f+"</td>";x+="</tr>"}}S+=K}if(q.length>0){var Q=q[0]}else{var Q=q}Ext.getCmp("sightseeingTableId").show();this.inventoryData={rateBody:x,numberOfNights:F,dates:Q,markup:K.toFixed(2),pnrCode:M[1],bookeddateDis:O,total:S.toFixed(2),extraTotal:p.toFixed(2),priceCurrency:P};this.hasDetailsInventory=true;this.displayDetails(m)}}}},scope:this});l.el.unmask()}else{l.el.unmask()}}}},initLabels:function(){with(this.getForm()){findField("rateName").setValue(this.inventoryData.quantity+" x "+this.inventoryData.rateName)}},initCommission:function(b){if(!b){return}var a=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).findByType("fieldset")[0];a.show()},displayDetails:function(c){;var d=this.findParentByType("awesomewindow");var h=Date.parseDate(d.getData("createdDate"),TDS.env.dateFormat);var i=Date.parseDate(d.getData("updatedDate"),TDS.env.dateFormat);var a="Created on "+h.format(TDS.env.dateTimeFormatDisplay)+" by "+d.getData("createdByUserFullNameString")+", modified on "+i.format(TDS.env.dateTimeFormatDisplay)+(d.getData("createdByUserFullNameString")==d.getData("updatedByUserFullNameString")?"":" by "+d.getData("updatedByUserFullNameString"))+".";var e=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:d.getData("pricingPriceCurrency"),pricingPriceSell:d.getData("pricingPriceSell"),pricingPriceCommission:d.getData("pricingPriceCommission"),pricingPriceIsNett:d.getData("pricingPriceIsNett")});var f=(e.priceSell+e.priceCommission);var g=this.inventoryData.Ggrosstemp;if(e.priceSell==""||e.priceSell==null||e.priceSell=="undefined"){e.priceSell=0}var b=e.priceSell*parseInt(this.inventoryData.quantity);this.getDetailsPanel(c).tpl.overwrite(this.getDetailsPanel(c).body,Ext.apply({price:e.priceSell.toFixed(2)},this.inventoryData))}}