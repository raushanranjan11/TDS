{xtype:"form",border:false,fileUpload:true,markDataDirtyOnLoad:true,height:300,width:1200,initialcall:true,tbar:["->",{xtype:"button",text:"Cancel Flights",disabled:true,handler:function(){;var i=this.ownerCt.ownerCt.items.itemAt(0);var h=i.getSelectionModel().selections.items;var k=h[0].data.rloc;var f=h[0].data.rateId;var c=h.length;var d={status:TDS.data.componentStatus.STATUS_CANCELLED};var g=new Ext.Window({height:550,width:550,border:false,layout:"fit",modal:true,items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:400,defaults:{},items:[{title:"Cancellation Terms",layout:"fit",items:[{xtype:"form",layout:"form",border:false,items:[{xtype:"textarea",hideLabel:true,name:"rules",height:470,width:535},{xtype:"hidden",hideLabel:true,name:"status",value:12}]}]}],listeners:{render:function(l){Ext.Ajax.request({url:TDS.env.dataPath+"air/rate/"+f+"/generalConditions",method:"GET",callback:function(q,m,p){var n=Ext.util.JSON.decode(p.responseText);l.findByType("form")[0].getForm().findField("rules").setValue(n.rules)}})}}}],buttons:[{text:"Cancel",handler:function(){var l=this.ownerCt.findByType("form")[0].getForm().getValues();this.findParentByType("window").hide();Ext.Ajax.request({url:TDS.env.dataPath+"pnr/"+k+"/flightconfirm",method:"PUT",jsonData:{status:TDS.data.componentStatus.STATUS_CANCELLED},callback:function(p,m,n){if(m){this.findParentByType("window").hide()}}})}},{text:"Close",handler:function(){this.findParentByType("window").hide()}}]}).show();var j=this.ownerCt.ownerCt.ownerCt.initialConfig.dataURI+"/air/components/collection";var e=this.ownerCt.ownerCt.ownerCt.initialConfig.dataURI+"/air/components";var a=this.ownerCt.ownerCt.items.itemAt(0);var b=this.ownerCt.ownerCt.items.itemAt(0).store;Ext.Ajax.request({url:TDS.env.dataPath+j,method:"GET",callback:function(v,m,p){if(m){var n=Ext.util.JSON.decode(p.responseText);var u=n[e];if(typeof u=="undefined"){return}var t=[];for(var l=0;l<u.length;l++){n[u[l]].dataURI=u[l];t.push(n[u[l]])}var q=b;q.loadData(t);a.getView().refresh()}},scope:this.ownerCt.ownerCt})}},{xtype:"button",text:"Hide Cancelled Flights",allowDepress:true,enableToggle:true,handler:function(){}}],items:[{xtype:"grid",width:1200,height:300,border:false,enableColumnHide:false,enableColumnMove:false,enableColumnResize:false,enableHdMenu:false,viewConfig:{forceFit:true},rowspan:2,sm:new Ext.grid.CheckboxSelectionModel({singleSelect:true}),store:new Ext.data.JsonStore({fields:["dataURI","offeringURI","rloc","passengersTotal","timeHeldUntil","description","type","supplierURI","name","dateFrom","dateTo","pax","status","createdDate","createdByLogin","createdByUserFullNameString","updatedDate","updatedByLogin","updatedByUserFullNameString","supplierName","locationToString","locationFromString","airportToString","airportFromString","bookingReferenceNumber","pricingPriceCurrency","pricingPriceSell","pricingPriceIsNett","pricingPriceCommission","departTime","arrivalTime","noOfStops","airCraft","class","airportFromIataString","airportToIataString","externalPNRCode","TTLDate","rateId"]}),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",hidden:true,renderer:function(a){if(a===TDS.data.componentType.TYPE_OWN){return"Own arrangement"}else{if(a===TDS.data.componentType.TYPE_MANUAL){return"Manual entry"}}return a.substring(0,1).toUpperCase()+a.substring(1).toLowerCase()}},{header:"Airline",dataIndex:"supplierName",width:140},{header:"RLOC",dataIndex:"rloc",width:100},{header:"Flt No",dataIndex:"name",width:100},{header:"Class",dataIndex:"class",width:130},{header:"From",dataIndex:"locationToString",width:150,renderer:function(c,b,a){return"<b>"+a.get("airportFromIataString")+"</b> ("+a.get("airportFromString")+")"}},{header:"To",dataIndex:"locationToString",width:150,renderer:function(c,b,a){return"<b>"+a.get("airportToIataString")+"</b> ("+a.get("airportToString")+")"}},{header:"Date",dataIndex:"dateTo",sortable:true,width:100,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)},{header:"Dep",dataIndex:"departTime",width:50},{header:"Arr",dataIndex:"arrivalTime",width:50},{header:"Stops",dataIndex:"noOfStops",width:60},{header:"Aircraft",dataIndex:"airCraft",width:100},{header:"Status",dataIndex:"status",width:80}],listeners:{rowclick:function(d,h,f){;if(this.getSelectionModel().getSelections()[0].get("status")=="Cancelled"){this.getSelectionModel().deselectRow(h)}var b=this.store;var c=this.getSelectionModel().selections.items;var a=c.length;var g=this.ownerCt.getTopToolbar().items.itemAt(1);if(a>0){g.enable()}},celldblclick:function(b,d,a,c){if(a==5){TDS.innerWindow.setWindow({title:"Terms",buttonOK:false,terms:"aee",interfaceURI:"pnr/offerings/air/terms.js"})}}}}],listeners:{render:function(){;var b=this.ownerCt.initialConfig.dataURI+"/air/components/collection";var a=this.ownerCt.initialConfig.dataURI+"/air/components";var c=this.items.itemAt(0).store;Ext.Ajax.request({url:TDS.env.dataPath+b,method:"GET",callback:function(l,e,g){if(e){var f=Ext.util.JSON.decode(g.responseText);var k=f[a];if(typeof k=="undefined"){return}var j=[];for(var d=0;d<k.length;d++){f[k[d]].dataURI=k[d];j.push(f[k[d]])}var h=c;h.loadData(j)}},scope:this.ownerCt.ownerCt})}}}