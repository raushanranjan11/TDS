{xtype:"panel",border:false,layout:"column",items:[{requireStores:[{dataURI:TDS.env.dataPath+"sightseeing/types/collection",identifier:"sightseeing/types",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"sightseeing/extracategories/collection",identifier:"sightseeing/extracategories",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]}],xtype:"panel",height:180,border:false,frame:false,layout:"column",columnWidth:0.95,getAgencyPanel:function(){return this.items.itemAt(0)},getDetailsPanel:function(){return this.items.itemAt(1)},getPassengersPanel:function(){return this.items.itemAt(2)},hasDetailsInventory:false,hasDetailsOffering:false,isDetailsReady:function(){if(this.hasDetailsInventory&&this.hasDetailsOffering){return true}return false},items:[{xtype:"panel",layout:"column",bodyStyle:"padding: 2px;",columnWidth:0.12,hideBorders:true,height:180,items:[{tpl:new Ext.XTemplate(['<div style="height:130px;  overflow-y: scroll;">',"<p><b>Agent:</b> {agencyName}</p>","<p><b>Consultant:</b> {consultantName}</p>","<p><b>Tel:</b> {telephoneNo}</p>","<p><b>Email:</b> {email}</p>","<p><b>Location:</b> {agentLocation}</p>","<p><b>Country:</b> {country}</p>","<p><b>Date / Time:</b> {bookingDateTime}</p>","</div>"]),listeners:{render:function(){var d=this.ownerCt.findParentByType("tabpanel");var c=d.getComponentDetail("agencyURI");Ext.Ajax.request({url:TDS.env.dataPath+c+"?forceGet=true",method:"GET",callback:function(a,i,e){if(i){try{var j=Ext.util.JSON.decode(e.responseText);this.tpl.overwrite(this.body,{agencyName:TDS.util.Format.displayResourceName(c),consultantName:d.getComponentDetail("createdByUserFullNameString"),telephoneNo:j.phoneNumber,email:j.email,agentLocation:j.locality,country:TDS.util.Format.displayResourceName(j.countryURI),bookingDateTime:TDS.util.Format.dateSpecial(d.getComponentDetail("createdDate"),TDS.env.dateTimeFormatDisplay)})}catch(b){}}},scope:this,disableCaching:true})}}}]},{columnWidth:0.5,xtype:"panel",height:180,tpl:new Ext.XTemplate('<div style="height:130px; overflow-y: scroll; ">','<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;" >','<th style="padding: 2px; width: 35%;">Tour Name</th>','<th style="padding: 2px; width: 25%;">City</th>','<th style="padding: 2px; width: 25%;">Dep Date</th>','<th style="padding: 2px; width: 15%;">Time</th>','<th style="padding: 2px; width: 15%;">Duration</th>',"</tr>","<tr>","<td>{name}</td>","<td>{toLocationString}</td>","<td>{dateFrom}</td>","<td>{time}</td>","<td>{duration}</td>","</tr>","</table>",'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #d0def0;" >','<th style="padding: 2px; width: 25%;">Rate</th>','<th style="padding: 2px; width: 15%;">Passenger Type</th>','<th style="padding: 2px; width: 5%;">No.</th>','<th style="padding: 2px; width: 20%;">Price Per Person</th>','<th style="padding: 2px; width: 10%;">Status</th>',"</tr>","{rateBody}","</table>",'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >','<tr style="background-color: #C0D9D9;">','<th style="padding: 2px; width: 14%;">Price</th>','<th style="padding: 2px; width: 13%;">Gross/Net</th>','<th style="padding: 2px; width: 14%;">Extras</th>','<th style="padding: 2px; width: 20%;">Total Price ({grossOrNet})</th>','<th style="padding: 2px; width: 7%;">Comm%</th>',"</tr>","<tr>","<td>{tourPrice}</td>","<td>{grossOrNet}</td>","<td>{extras}</td>","<td>{totalPrice}</td>","<td>{comm}</td>","</tr>","</table>","</div>")},{xtype:"panel",height:150,columnWidth:0.38,layout:"fit",items:[{xtype:"grid",enableRowExpander:false,sessionExpandedRows:false,height:120,autoScroll:true,border:false,enableColumnHide:false,enableColumnMove:false,enableColumnResize:false,enableHdMenu:false,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","displayName","code","dateOfBirth","addressString","phoneNumber1","emailAddress","gender","status","abstractRateId","priceSell"]}),columns:[{header:"Passenger",dataIndex:"displayName",width:220,fixed:true,sortable:true,renderer:function(j,k,h,i,l,g){return j}},{header:"Type",dataIndex:"code",width:40,fixed:true},{header:"Gender",dataIndex:"gender",renderer:TDS.util.Format.gender,width:50,fixed:true},{header:"DOB",dataIndex:"dateOfBirth",width:70,fixed:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay)},{header:"Age",dataIndex:"dateOfBirth",renderer:TDS.util.Format.age,width:40,fixed:true},{header:"Price",dataIndex:"priceSell",width:40,fixed:true},{header:"Status",dataIndex:"status",width:50,fixed:true}],viewConfig:{forceFit:true},listeners:{render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","rowclick","rowmousedown","rowdbclick","cellblclick","sortchange","mouseup","mousedown"]);var c=this.ownerCt.findParentByType("tabpanel");var d=c.getComponentDetail("dataURI");Ext.Ajax.request({url:TDS.env.dataPath+d+"/passengers/collection/concise",method:"GET",callback:function(o,a,q){if(a){var i=Ext.util.JSON.decode(q.responseText);var m=i[d+"/passengers"];if(typeof m=="undefined"){return}var b=[];for(var n=0;n<m.length;n++){i[m[n]].dataURI=m[n];b.push(i[m[n]])}var p=this;var r=p.store;r.loadData(b);p.getView().refresh()}},scope:this})}}}]}],listeners:{render:function(){this.initInventory();this.initOffering()}},initInventory:function(){var h=this.ownerCt.findParentByType("tabpanel");var g=h.getComponentDetail("dataURI");var i=g;var j=new Array();var f=0;j=g.split("/");Ext.Ajax.request({url:TDS.env.dataPath+g+"/inventories/collection",method:"GET",callback:function(ae,ai,ag){var d=this.ownerCt.findParentByType("tabpanel");if(ai){try{var am=Ext.decode(ag.responseText)}catch(o){}if(am){var at=0,al,ad=[];var an=0;var s=am["component/inventory/collection"];var aC=s[g+"/inventories"];var af=am["component/rate/collection/"];var aE=af["component/rate/collection/list"];var av=af.TOUR_TYPR_STRING;d.setDetail("rateList",aE);var ah=new Array();ah=g.split("/");var ar="";this.rateData=[];var a=aC.length/aE.length;var ab=[];var aq="";var r=[];var au=0;if(aC.length>0){for(var Y=0;Y<aC.length;Y++){var e=s[aC[Y]];ad[ad.length]=TDS.util.Format.dateSpecial(e.componentPaybyDate,TDS.env.dateFormatDisplay);aq=e.pricingPriceCurrency;if(r.indexOf(e.rateId)==-1){r[Y]=e.rateId;ab[au]=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:e.pricingPriceCurrency,pricingPriceSell:e.pricingPriceSell,pricingPriceCommission:e.pricingPriceCommission,pricingPriceIsNett:e.pricingPriceIsNett});ab[au].rateId=e.rateId;ab[au].quantity=e.quantity;au++}}var aj="";var aD="";var ay=false;var ao=0;var az=0;var Z=0;if(aE.length>0){for(var Y=0;Y<aE.length;Y++){var ap=af[aE[Y]];Z=ap.extraTotal;ar=af[aE[Y]].tempBookedDate;var ak=[];var b=ap.groupName;var aB="";var ax="";var c=[];if(typeof(b)!="undefined"){ak=b.split(",");var ac=ak[0];c=ac.split(" ")}var aw=null;for(var aa=0;aa<ab.length;aa++){if(ab[aa].rateId==aE[Y].substring(aE[Y].lastIndexOf("/")+1,aE[Y].length)){aw=ab[aa]}}ay=aw.priceIsNett;if(!aw.priceIsNett){aB=aw.priceCommissionPercentage;if(typeof aB=="undefined"){aB="0%"}}else{ax=aw.priceCommission;an+=(aw.quantity*aw.priceCommission)}ao+=(aw.quantity*aw.priceSell);az+=(aw.quantity*aw.priceSell);aj+="<tr>";aj+="<td>"+ap.nameString+"</td>",aj+="<td>"+c[0]+"</td>",aj+="<td>"+aw.quantity+"</td>",aj+="<td>"+TDS.util.Price.formatPrice(aw.priceSell,aw.priceCurrency)+"</td>",aj+="<td>"+d.getComponentDetail("status")+"</td>",aj+="</tr>"}ao+=an;ao+=Z}if(ad.length>0){var aA=ad[0]}else{var aA=ad}d.setDetail("pricingPriceCurrency",aq);this.inventoryData={name:d.getComponentDetail("name"),fromLocationString:d.getComponentDetail("locationFromString"),toLocationString:d.getComponentDetail("locationToString"),dateFrom:TDS.util.Format.dateSpecial(d.getComponentDetail("dateFrom"),TDS.env.dateFormatDisplay),duration:d.getComponentDetail("duration"),status:d.getComponentDetail("status"),rateBody:aj,dataURI:g,divDataUri:i,numberOfNights:a,dates:aA,markup:an.toFixed(2),pnrCode:ah[1],bookeddateDis:ar,total:ao.toFixed(2),extraTotal:Z.toFixed(2),priceCurrency:aq,tourPrice:TDS.util.Price.formatPrice(az,aq),grossOrNet:(ay?"Nett":"Gross"),extras:TDS.util.Price.formatPrice(Z,aq),markUp:an,totalPrice:TDS.util.Price.formatPrice(ao,aq),comm:aD};this.hasDetailsInventory=true;if(this.isDetailsReady()){this.displayDetails()}}}}},scope:this})},initOffering:function(){var f=this.ownerCt.findParentByType("tabpanel");var d=f.getComponentDetail("offeringURI");var e;Ext.Ajax.request({url:TDS.env.dataPath+d,method:"GET",callback:function(a,k,c){if(k){try{var j=Ext.decode(c.responseText)}catch(b){}if(j){this.offeringData={locationsString:j.locationsString,website:j.primaryHref,addressString:j.addressString,locationPickup:j.locationPickup,locationDropoff:j.locationDropoff,departureTime:j.departureTime,duration:j.duration,sightseeingType:TDS.util.Format.displayResourceName(j.sightseeingTypeURI)};this.hasDetailsOffering=true;if(this.isDetailsReady()){this.displayDetails()}}}},scope:this})},displayDetails:function(){var k=this.ownerCt.findParentByType("tabpanel");var i=Date.parseDate(k.getComponentDetail("createdDate"),TDS.env.dateFormat);var o=Date.parseDate(k.getComponentDetail("updatedDate"),TDS.env.dateFormat);var j="Created on "+i.format(TDS.env.dateTimeFormatDisplay)+" by "+k.getComponentDetail("createdByUserFullNameString")+", modified on "+o.format(TDS.env.dateTimeFormatDisplay)+(k.getComponentDetail("createdByUserFullNameString")==k.getComponentDetail("updatedByUserFullNameString")?"":" by "+k.getComponentDetail("updatedByUserFullNameString"))+".";var p=TDS.util.Price.calculateFixedGrossNettPrice({pricingPriceCurrency:k.getComponentDetail("pricingPriceCurrency"),pricingPriceSell:k.getComponentDetail("pricingPriceSell"),pricingPriceCommission:k.getComponentDetail("pricingPriceCommission"),pricingPriceIsNett:k.getComponentDetail("pricingPriceIsNett")});var l=(p.priceSell+p.priceCommission);var m=this.inventoryData.Ggrosstemp;if(p.priceSell==""||p.priceSell==null||p.priceSell=="undefined"){p.priceSell=0}var n=p.priceSell*parseInt(this.inventoryData.quantity);this.getDetailsPanel().tpl.overwrite(this.getDetailsPanel().body,Ext.apply({price:p.priceSell.toFixed(2),createdString:j,pricenet:p.priceIsNett,flag:p.flag,priceCommissionPercentage:p.priceCommissionPercentage,extragross:p.extragross,quaPrice:n.toFixed(2)},this.inventoryData,this.offeringData))}},{type:"panel",autoHeight:true,border:false,bodyStyle:"padding: 2px;",width:60,columnWidth:0.05,defaults:{minWidth:60},invokeWindow:function(n,p){if(!p){p={}}var a=this.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);var m=a.selModel.selections;var b=this.ownerCt.findParentByType("tabpanel");var r=b.ownerCt;var o=b.getComponentDetail("dataURI");var q=b.getComponentDetail("offeringURI");var l=b.getComponentDetail("pricingPriceCurrency");if(!o){return}Ext.apply(p,{title:"Edit",information:"You may edit the details of this component below.",interfaceURI:"fulfillment/sightseeing/edit.js",destinationDataURI:o,sourceDataURI:"sightseeing/rate/"+m.items[0].data.abstractRateId,dataURI:{offeringDataURI:q,component:o,passenger:m.items[0].id,offering:b.getComponentDetail("offeringURI")},params:{status:n,componentName:b.getComponentDetail("name"),priceCurrency:b.getComponentDetail("pricingPriceCurrency")},callback:{fn:function(c){if(c){r.refreshGrid()}},scope:this}});TDS.window.setWindow(p)},invokeAltOffWindow:function(k,j){if(!j){j={}}var l=this.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);var n=l.selModel.selections;var a=this.ownerCt.findParentByType("tabpanel");var b=a.ownerCt;var m=a.getComponentDetail("dataURI");if(!m){return}Ext.apply(j,{title:"Alternative offer",information:"You may offer with new offering below.",interfaceURI:"fulfillment/sightseeing/alternative.js",destinationDataURI:m+"/altOffering",dataURI:{component:m,offering:a.getComponentDetail("offeringURI")},params:{status:k,priceCurrency:a.getComponentDetail("pricingPriceCurrency")},callback:{fn:function(c){if(c){b.refreshGrid()}},scope:this}});TDS.window.setWindow(j)},items:[{xtype:"button",text:"Edit",handler:function(){var g=this.ownerCt.findParentByType("tabpanel");var h=g.ownerCt;var e="SIGHTSEEING";var f=g.getComponentDetail("dataURI");TDS.window.setWindow({title:"Day Tour Edit Fulfillment",information:"Please enter your required details.",interfaceURI:"fulfillment/sightseeing/edit.js",destinationDataURI:f+"/fulfillment/editPassStatus",buttonOK:"Save",data:{type:e,pnrDataURI:f,MQ:true,componentName:g.getComponentDetail("name")},callback:{fn:function(a){if(a){h.refreshGrid()}},scope:this.ownerCt.ownerCt}})}},{xtype:"button",text:"Note",handler:function(){var c=this.ownerCt.findParentByType("tabpanel");var d=c.getComponentDetail("dataURI");TDS.window.setWindow({title:"Send a note",information:"Please enter your note below.",interfaceURI:"note.js",postDataURI:d+"/note",callback:{fn:function(a){},scope:this}})}}]}]}