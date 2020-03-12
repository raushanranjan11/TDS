{xtype:"panel",layout:Ext.isIE?"fit":"",autoScroll:true,bodyStyle:"padding: 8px;",items:{xtype:"awesomesearchgrid",searchOfferingType:TDS.data.componentType.TYPE_AIR.toUpperCase(),pinnable:true,enableRowExpander:true,config:{y:[]},tbar:["Available"," ",{xtype:"datefield",name:"datePointer",excludeFromSession:true,value:new Date(),enableKeyEvents:true,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()},"",{xtype:"omnicrementer",name:"dateDays",width:60,hidden:true,editable:false},"",""," ","-"," ","Adults:",{xtype:"omnicrementer",name:"noOfAdult",enableKeyEvents:true,width:60,listeners:{trigger:function(d,c){;var b=d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}}," ","Child:",{xtype:"omnicrementer",name:"noOfChild",width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}}," ","Infants:",{xtype:"omnicrementer",name:"noOfInfantSeat",width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}}," ","",{xtype:"omnicrementer",name:"noOfInfantNoSeat",hidden:true,width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}}," ","Total PAX:",{xtype:"textfield",name:"maximumOccupancys",value:0,width:60,readOnly:true}," ",{xtype:"textfield",name:"rateId",value:0,width:60,hidden:true,readOnly:true}," ","Time:",{xtype:"combo",name:"time",enableKeyEvents:true,width:80,minChars:1,enableKeyEvents:true,mode:"local",editable:false,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"time",valueField:"time",store:new Ext.data.SimpleStore({fields:["time","time"],data:[["AM","am"],["PM","pm"],["Any Time","anyTime"]]}),listeners:{load:function(){this.setValue("anyTime")}}},"->",{xtype:"label",width:200},{text:"Help",xtype:"redbutton",cls:"x-button-blue",overCls:"x-button-blue-over",opened:false,toggle:false,handler:function(){TDS.needHelp("Search View Help","23");if(!this.opened){this.opened=true;TDS.needHelp("Search View Help","23")}else{this.opened=false;TDS.helpwindow.hide()}}}],tbar2:["From: ",{xtype:"airportcombo",name:"airportFromURI",excludeFromSession:true,enableKeyEvents:true,hideTrigger:false,width:200,listeners:{focus:function(){var b=this.ownerCt;var a=b.items.itemAt(19);a.setValue("AS")}}}," ",{xtype:"button",icon:"images/arrow-black.gif",cls:"x-btn-icon",tooltip:"Click here to swap the departure and arrival airports",excludeFromSession:true,enableKeyEvents:true,hideTrigger:false,handler:function(){var a=this.ownerCt;var f=a.items.itemAt(1);var e=a.items.itemAt(6);var d=f.getValue();var c=e.getValue();setTimeout(1500);f.setValue(c);e.setValue(d);var b=this;setTimeout(function(){b.ownerCt.ownerCt.refreshResults()},1200)}}," ","To:",{xtype:"airportcombo",name:"airportToURI",excludeFromSession:true,enableKeyEvents:true,hideTrigger:false,width:200}," ","Airline: ",{xtype:"clearablecombo",name:"airLineCode",fieldLabel:"nameLike",emptyText:"Type a Airline...",minChars:1,enableKeyEvents:true,mode:"local",width:160,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,excludeFromSession:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"airline/collection",identifier:"airline",fields:["name","dataURI"]}),tpl:'<tpl for="."><div class="x-combo-list-item">{name}  [<b>{dataURI}</b>]</div></tpl>'}," ","Class:",{xtype:"combo",mode:"local",width:120,name:"rateClass",triggerAction:"all",editable:false,displayField:"text",valueField:"value",store:TDS.data.airClass}," ","",{xtype:"radio",hidden:true,value:"AS",fieldLabel:"Normal flight",id:"availabilitySearchId",enableKeyEvents:true,checked:true,name:"searchTypeCode1"}," ","",{xtype:"radio",value:"LFS",hidden:true,name:"searchTypeCode1",fieldLabel:"Low Fare flight",enableKeyEvents:true,id:"lowFareSearchId",listeners:{check:function(c){var b=this.ownerCt;var a=b.items.itemAt(19);if(Ext.getCmp("lowFareSearchId").getValue()){a.setValue("LFS")}else{a.setValue("AS")}}}},{xtype:"combo",mode:"local",width:120,name:"searchTypeCode",triggerAction:"all",excludeFromSession:true,hidden:true,editable:false,value:"AS",displayField:"text",valueField:"value",store:TDS.data.airSearchType}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["pinned","dataURI","sectorFlight","supplierURI","flightNum","aircrafts","nameString","airportFromURI","airportFromString","airportToURI","airportToString","stopOversString","departureTime","arrivalTime","duration","stopOvers","direct","aircraft","departureDate","arrivalDate","lastUpdatedFromRemote","airSupplierName","termsAndConditions","noPrePaymentRequired","pytInFull","fullPytPriorDays","depositWithin","balancePriorToDeparture","depositWithinDays","depositPerOption","balancePriorToDepartureDay","graphicImgPath","airportsFrom","airportsTo","depDate","arrDate","marketText","stops","segmentFlight","noStops","faresFrom"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Airline",dataIndex:"airSupplierName",sortable:true},{header:"Flight No.",dataIndex:"flightNum",sortable:true,renderer:function addTooltip(f,e,b,g,d,c){var a=b.get("sectorFlight");if(typeof a!="undefined"&&a!=""){e.attr='ext:qtip="'+a+'" ext:qwidth="400"'}return f}},{header:"From",dataIndex:"airportFromURI",sortable:true,renderer:function(a){return a.substring(a.lastIndexOf("/")+1)}},{header:"To",dataIndex:"airportToURI",sortable:true,renderer:function(a){return a.substring(a.lastIndexOf("/")+1)}},{header:"Departure Date",dataIndex:"departureDate",sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)},{header:"Arrival Date",dataIndex:"arrivalDate",sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)},{header:"Departs",dataIndex:"departureTime",sortable:true},{header:"Arrives",dataIndex:"arrivalTime",sortable:true},{header:"Flight time",dataIndex:"duration",sortable:true},{header:"Stops",dataIndex:"noStops",sortable:true,renderer:function addTooltip(f,e,b,g,d,c){var a=b.get("segmentFlight");if(typeof a!="undefined"&&a!=""){e.attr='ext:qtip="'+b.get("segmentFlight")+'"'}return f}},{header:"Fares From",dataIndex:"faresFrom",sortable:true,renderer:function addTooltip(e,d,a,f,c,b){return'<font color="red"><b>'+e+"<b><font> "}},{header:"Aircraft",dataIndex:"aircrafts",sortable:true,width:200,fixed:true}]),viewConfig:{forceFit:true},getRowInterface:function(a,c,b){return"pnr/offerings/air/layout.js"},listeners:{sessioninit:function(){;var a=this.ownerCt.findParentByType("pnrpanel");var b=this.getTopToolbar().items.itemAt(11);b.setValue(a.getPassengerCount());this.appendQueryParams.currency=a.getPNRCurrency()},rowclick:function(){this.enableRowExpander=true},celldblclick:function(b,d,a,c){if(this.searchOfferingType=="AIR"){this.enableRowExpander=false}if(a==9){TDS.window.setWindow({title:"Connecting",buttonOK:false,interfaceURI:"pnr/offerings/air/connectedInfo.js"})}}}}}