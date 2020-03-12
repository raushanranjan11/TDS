{xtype:"panel",border:false,layout:"column",bodyStyle:"padding: 2px;",requireStores:[{dataURI:TDS.env.dataPath+"car/types/collection",identifier:"car/types",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"car/vehicleSizes/collection",identifier:"car/vehicleSizes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"car/extracategories/collection",identifier:"car/extracategories",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]}],items:[{xtype:"panel",height:150,border:false,frame:false,layout:"column",columnWidth:0.95,getAgencyPanel:function(){return this.items.itemAt(0)},getDetailsPanel:function(){return this.items.itemAt(1)},getPassengersPanel:function(){return this.items.itemAt(2)},hasDetailsInventory:false,hasDetailsOffering:false,hasDetailsDepot:false,isDetailsReady:function(){if(this.hasDetailsInventory&&this.hasDetailsOffering&&this.hasDetailsDepot){return true}return false},items:[{xtype:"panel",layout:"column",columnWidth:0.1,hideBorders:true,height:150,items:[{tpl:new Ext.XTemplate(["<p><b>Agent:</b> {agencyName}</p>","<p><b>Consultant:</b> {consultantName}</p>","<p><b>Tel:</b> {telephoneNo}</p>","<p><b>Email:</b> {email}</p>","<p><b>Location:</b> {agentLocation}</p>","<p><b>Country:</b> {country}</p>","<p><b>Date / Time:</b> {bookingDateTime}</p>"]),listeners:{render:function(){var a=this.ownerCt.findParentByType("tabpanel");var b=a.getComponentDetail("agencyURI");Ext.Ajax.request({url:TDS.env.dataPath+b+"?forceGet=true",method:"GET",callback:function(h,d,f){if(d){try{var c=Ext.util.JSON.decode(f.responseText);this.tpl.overwrite(this.body,{agencyName:TDS.util.Format.displayResourceName(b),consultantName:a.getComponentDetail("createdByUserFullNameString"),telephoneNo:c.phoneNumber,email:c.email,agentLocation:c.locality,country:TDS.util.Format.displayResourceName(c.countryURI),bookingDateTime:TDS.util.Format.dateSpecial(a.getComponentDetail("createdDate"),TDS.env.dateTimeFormatDisplay)})}catch(g){}}},scope:this,disableCaching:true})}}}]},{columnWidth:0.5,xtype:"panel",height:150,border:true,tpl:new Ext.XTemplate('<div style="height:270px; ">','<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;" >','<th style="padding: 2px; width: 22%;">Vehicle Type</th>','<th style="padding: 2px; width: 22%;">Category</th>','<th style="padding: 2px; width: 20%;">Transmission</th>','<th style="padding: 2px; width: 16%;">Seats</th>','<th style="padding: 2px; width: 18%;">Kilometers</th>','<th style="padding: 2px; width: 14%;">Status</th>',"</tr>","<tr>","<td>{carType}</td>","<td>{carVehicleSizeURI}</td>","<td>{automaticTransmission}</td>","<td>{capacityPeople}</td>","<td>{maximumKilometers}</td>","<td>{status}</td>","</tr>","</tr>","</table>",'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #C0D9D9;">','<th style="padding: 2px; width: 20%;">Rate</th>','<th style="padding: 2px; width: 12%;">Price P/D</th>','<th style="padding: 2px; width: 10%;">Days</th>','<th style="padding: 2px; width: 10%;">Gross/Net</th>','<th style="padding: 2px; width: 12%;">Extras</th>','<th style="padding: 2px; width: 15%;">Total Price ({netorgross})</th>','<th style="padding: 2px; width: 8%;">Comm%</th>',"</tr>","{rateBody}","</table>",'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;">','<th style="padding: 2px; width: 14%;">From</th>','<th style="padding: 2px; width: 14%;">Pick-Up</th>','<th style="padding: 2px; width: 14%;" >Date</th>','<th style="padding: 2px; width: 14%;" >Time</th>',"</tr>","<tr>","<td >{fromCityString}</td>","<td >{depotPickupAddress}</td>","<td >{fromDate}</td>","<td >{fromTime}</td>","</tr>","</table>",' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;">','<th style="padding: 2px; width: 14%;">Return</th>','<th style="padding: 2px; width: 14%;">Drop-Off</th>','<th style="padding: 2px; width: 14%;">Date</th>','<th style="padding: 2px; width: 14%;">Time</th>',"</tr>","<tr>","<td >{toCityString}</td>","<td >{depotDropoffName}</td>","<td >{toDate}</td>","<td >{toTime}</td>","</tr>","</table>","</div>")},{xtype:"panel",height:150,columnWidth:0.4,layout:"fit",items:[{xtype:"grid",enableRowExpander:false,sessionExpandedRows:false,height:110,autoScroll:true,border:false,enableColumnHide:false,enableColumnMove:false,enableColumnResize:false,enableHdMenu:false,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","displayName","roomType","code","dateOfBirth","addressString","phoneNumber1","emailAddress","gender","status","abstractRateId"]}),columns:[{header:"Passenger",dataIndex:"displayName",width:220,fixed:true,sortable:true,renderer:function(e,d,a,f,c,b){return e}},{header:"Type",dataIndex:"code",width:40,fixed:true},{header:"Gender",dataIndex:"gender",renderer:TDS.util.Format.gender,width:50,fixed:true},{header:"DOB",dataIndex:"dateOfBirth",width:70,fixed:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay)},{header:"Age",dataIndex:"dateOfBirth",renderer:TDS.util.Format.age,width:40,fixed:true},{header:"Price",dataIndex:"price",width:40,fixed:true},{header:"Status",dataIndex:"status",width:50,fixed:true}],viewConfig:{forceFit:true},listeners:{render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","rowclick","rowmousedown","rowdbclick","cellblclick","sortchange","mouseup","mousedown"]);var b=this.ownerCt.findParentByType("tabpanel");var a=b.getComponentDetail("dataURI");Ext.Ajax.request({url:TDS.env.dataPath+a+"/passengers/collection/concise",method:"GET",callback:function(f,l,d){if(l){var j=Ext.util.JSON.decode(d.responseText);var h=j[a+"/passengers"];if(typeof h=="undefined"){return}var k=[];for(var g=0;g<h.length;g++){j[h[g]].dataURI=h[g];k.push(j[h[g]])}var e=this;var c=e.store;c.loadData(k);e.getView().refresh()}},scope:this})}}}]}],listeners:{render:function(){this.initInventory();this.initOffering();this.initDepots()}},initInventory:function(){var c=this.ownerCt.findParentByType("tabpanel");var a=c.getComponentDetail("dataURI");var b=a;Ext.Ajax.request({url:TDS.env.dataPath+a+"/inventories/collection",method:"GET",callback:function(N,J,L){if(J){try{var D=Ext.decode(L.responseText)}catch(Y){}if(D){var aa=this.ownerCt.findParentByType("tabpanel");var v=1,F,R=[];var C=0;var H=0;var W=D["component/inventory/collection"];var g=W[a+"/inventories"];var M=D["component/rate/collection/"];var d=M["component/rate/collection/list"];aa.setDetail("rateList",d);var K=new Array();K=a.split("/");var w="";this.rateData=[];var ab=g.length/d.length;var S=[];var x="";var X=[];var u=0;if(g.length>0){for(var V=0;V<g.length;V++){var Z=W[g[V]];R[R.length]=TDS.util.Format.dateSpecial(Z.componentPaybyDate,TDS.env.dateFormatDisplay);x=Z.pricingPriceCurrency;if(X.indexOf(Z.rateId)==-1){X[V]=Z.rateId;S[u]=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:Z.pricingPriceCurrency,pricingPriceSell:Z.pricingPriceSell,pricingPriceCommission:Z.pricingPriceCommission,pricingPriceIsNett:Z.pricingPriceIsNett});S[u].rateId=Z.rateId;u++}}var m=0;var B=0;var G="";var A=0;var U=0;if(d.length>0){for(var V=0;V<d.length;V++){var y=M[d[V]];y.maximumOccupancy=g.length;U=y.extraTotal*y.maximumOccupancy;var n=y.extraTotal*y.maximumOccupancy;w=M[d[V]].tempBookedDate;var p="";var f="";var t=null;var h="";for(var T=0;T<S.length;T++){if(S[T].rateId==d[V].substring(d[V].lastIndexOf("/")+1,d[V].length)){t=S[T]}}var k=this.ownerCt.ownerCt.findParentByType("ajaxpanel");var z=k.rowRecordData.status;if(!t.priceIsNett){h=t.priceCommissionPercentage}else{p=t.priceCommission;C+=(y.maximumOccupancy*t.priceCommission)}A+=(y.maximumOccupancy*t.priceSell);G+="<tr>";G+="<td >"+y.nameString+"</td>";G+="<td >"+TDS.util.Price.formatPrice(t.priceSell,t.priceCurrency)+"</td>";G+="<td >"+y.maximumOccupancy+"</td>";G+="<td>"+t.flag+"</td>";G+="<td >"+TDS.util.Price.formatPrice(n,t.priceCurrency)+"</td>";G+="<td >"+TDS.util.Price.formatPrice(((t.priceSell*y.maximumOccupancy)+n),t.priceCurrency)+"</td>";G+="<td >"+h+"</td>";G+="</tr>";f=(t.priceIsNett?"Nett":"Gross");m=y.maximumKilometers;B=y.excessPerKilometers}var P=A;A+=C;A+=U}var E=D["component/collection"];var q=E[a];var I=Ext.util.JSON.decode(q.parameters);var Q=new Date();var O=new Date();if(typeof I!="undefined"){this.pickUpAndDropOff=I;Q=new Date(I.fromDate);O=new Date(I.toDate)}else{I=[]}if(R.length>0){var l=R[0]}else{var l=R}aa.setDetail("pricingPriceCurrency",x);this.inventoryData={rateBody:G,dataURI:a,divDataUri:b,numberOfNights:ab,dates:l,markup:C.toFixed(2),pnrCode:K[1],bookeddateDis:w,total:A.toFixed(2),extraTotal:U.toFixed(2),fromCityString:I.fromCityString,fromTime:I.fromTime,fromDate:Q.format(TDS.env.dateFormatDisplay),status:z,netorgross:f,totprice:P,toCityString:I.toCityString,toDate:O.format(TDS.env.dateFormatDisplay),toTime:I.toTime,noOfDays:I.noOfDays,maximumKilometers1:(m&&m>0)?"Max. Kilometers":"Unlimited",maximumKilometers:(m&&m>0)?m:"",excessPerKilometers:(B&&B>0)?(x+" "+B):"",priceCurrency:x};this.hasDetailsInventory=true;if(this.isDetailsReady()){this.displayDetails()}}}}},scope:this})},initOffering:function(){var b=this.ownerCt.findParentByType("tabpanel");var a=b.getComponentDetail("offeringURI");Ext.Ajax.request({url:TDS.env.dataPath+a,method:"GET",callback:function(h,c,f){if(c){try{var d=Ext.decode(f.responseText)}catch(g){}if(d){this.offeringData={offeringName:d.name,automaticTransmission:d.automaticTransmission?"Auto":"Manual",capacityPeople:d.capacityPeople,minimumAgeRequired:d.minimumAgeRequired,carVehicleSizeURI:TDS.util.Format.displayResourceName(d.carVehicleSizeURI),carType:TDS.util.Format.displayResourceName(d.carTypeURI)};this.hasDetailsOffering=true;if(this.isDetailsReady()){this.displayDetails()}}}},scope:this})},initDepots:function(){var b=this.ownerCt.findParentByType("tabpanel");var a=b.getComponentDetail("dataURI");Ext.Ajax.request({url:TDS.env.dataPath+a+"/parameters/collection",method:"GET",callback:function(k,d,h){if(d){try{var g=Ext.decode(h.responseText)}catch(j){}if(g){var f=g[a+"/parameters"];if(f.length>0){for(var c=0;c<f.length;c++){var l=g[f[c]];if(l.name=="supplierDepotPickupURI"){this.getDepot(l.value,"pickup")}if(l.name=="supplierDepotDropoffURI"){this.getDepot(l.value,"dropoff")}}}else{this.depotData={};this.hasDetailsDepot=true;if(this.isDetailsReady()){this.displayDetails()}}}}},scope:this})},depots:{},depotData:{},isDepotReady:function(){if(typeof this.depots.pickup!="undefined"&&typeof this.depots.dropoff!="undefined"){return true}return false},getDepot:function(a,b){Ext.Ajax.request({url:TDS.env.dataPath+a,method:"GET",callback:function(h,c,f){try{var d=Ext.decode(f.responseText);this.depots[b]=d}catch(g){}if(this.isDepotReady()){this.depotData=this.depots;delete this.depots;this.hasDetailsDepot=true;if(this.isDetailsReady()){this.displayDetails()}}},scope:this})},displayDetails:function(){var e=this.ownerCt.findParentByType("tabpanel");var b=Date.parseDate(e.getComponentDetail("createdDate"),TDS.env.dateFormat);var d=Date.parseDate(e.getComponentDetail("updatedDate"),TDS.env.dateFormat);var a="Created on "+b.format(TDS.env.dateTimeFormatDisplay)+" by "+e.getComponentDetail("createdByUserFullNameString")+", modified on "+d.format(TDS.env.dateTimeFormatDisplay)+(e.getComponentDetail("createdByUserFullNameString")==e.getComponentDetail("updatedByUserFullNameString")?"":" by "+e.getComponentDetail("updatedByUserFullNameString"))+".";var c=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:e.getComponentDetail("pricingPriceCurrency"),pricingPriceSell:e.getComponentDetail("pricingPriceSell"),pricingPriceCommission:e.getComponentDetail("pricingPriceCommission"),pricingPriceIsNett:e.getComponentDetail("pricingPriceIsNett")});this.getDetailsPanel().tpl.overwrite(this.getDetailsPanel().body,Ext.apply({depotPickupName:this.depotData.pickup?this.depotData.pickup.name:"",depotPickupAddress:this.depotData.pickup?this.depotData.pickup.addressString:"",depotDropoffName:this.depotData.dropoff?this.depotData.dropoff.name:"",depotDropoffAddress:this.depotData.dropoff?this.depotData.dropoff.addressString:"",createdString:a},this.inventoryData,this.offeringData))}},{type:"panel",autoHeight:true,border:false,bodyStyle:"padding: 2px;",width:60,columnWidth:0.05,defaults:{minWidth:60},invokeWindow:function(g,e){if(!e){e={}}var k=this.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);var h=k.selModel.selections;var j=this.ownerCt.findParentByType("tabpanel");var c=j.ownerCt;var f=j.getComponentDetail("dataURI");var d=j.getComponentDetail("offeringURI");var i=j.getComponentDetail("pricingPriceCurrency");if(!f){return}Ext.apply(e,{title:"Edit",information:"You may edit the details of this component below.",interfaceURI:"fulfillment/rail/edit.js",destinationDataURI:f,sourceDataURI:"rail/rate/"+h.items[0].data.abstractRateId,dataURI:{component:f,offeringDataURI:d,passenger:h.items[0].id,offering:j.getComponentDetail("offeringURI")},params:{status:g,componentName:j.getComponentDetail("name"),priceCurrency:j.getComponentDetail("pricingPriceCurrency")},callback:{fn:function(a){if(a){c.refreshGrid()}},scope:this}});TDS.window.setWindow(e)},invokeAltOffWindow:function(f,g){if(!g){g={}}var e=this.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);var c=e.selModel.selections;var i=this.ownerCt.findParentByType("tabpanel");var h=i.ownerCt;var d=i.getComponentDetail("dataURI");if(!d){return}Ext.apply(g,{title:"Alternative offer",information:"You may offer with new offering below.",interfaceURI:"fulfillment/rail/alternative.js",destinationDataURI:d+"/altOffering",dataURI:{component:d,offering:i.getComponentDetail("offeringURI")},params:{status:f,priceCurrency:i.getComponentDetail("pricingPriceCurrency")},callback:{fn:function(a){if(a){h.refreshGrid()}},scope:this}});TDS.window.setWindow(g)},listeners:{render:function(){var b=this.items.itemAt(0);var c=this.ownerCt.findParentByType("tabpanel");var a=c.getComponentDetail("status");if(a.toLowerCase()==TDS.data.componentStatus.STATUS_HELD.toLowerCase()){}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()){}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_REJECTED.toLowerCase()){b.disable()}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()||a.toLowerCase()==TDS.data.componentStatus.STATUS_PART_CONFIRMED.toLowerCase()){}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CANCEL_REQUESTED.toLowerCase()){}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CANCELLED.toLowerCase()){}}}}}}}},items:[{xtype:"button",text:"Edit",handler:function(){var d=this.ownerCt.findParentByType("tabpanel");var c=d.ownerCt;var b="CAR";var a=d.getComponentDetail("dataURI");TDS.window.setWindow({title:"Car Rental Edit Fulfillment",information:"Please enter your required details.",interfaceURI:"fulfillment/car/edit.js",destinationDataURI:a+"/fulfillment/editPassStatus",buttonOK:"Save",data:{type:b,pnrDataURI:a,MQ:true},callback:{fn:function(e){if(e){c.refreshGrid()}},scope:this.ownerCt.ownerCt}})}},{xtype:"button",text:"Note",handler:function(){var b=this.ownerCt.findParentByType("tabpanel");var a=b.getComponentDetail("dataURI");TDS.window.setWindow({title:"Send a note",information:"Please enter your note below.",interfaceURI:"note.js",postDataURI:a+"/note",callback:{fn:function(c){},scope:this}})}}]}]}