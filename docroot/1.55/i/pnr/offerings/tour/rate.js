{xtype:"panel",border:false,requireStores:[{dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]}],findField:function(b){var a=false;this.getRateToolbar().items.each(function(c){if(c.name==b){a=c;return true}});return a},getRateGrid:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)},getRateToolbar:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar()},getMultipleSelectedRateURI:function(){var j=this.findParentByType("tabpanel");var f=j.shared.stores.rates;var b=f.data.length;var a=[];var g=0;for(var c=0;c<b;c++){var e=f.getAt(c);var h=e.data.shareAvailabilitywith;var d=e.data.dataURI;var k=document.getElementById("no"+d).value;if(h==""){if(document.getElementById("rd"+d)!=null&&document.getElementById("rd"+d).checked&&k!=0&&k!=""){a[g]=e;g++}}else{if(document.getElementById("ch"+d)!=null&&document.getElementById("ch"+d).checked){a[g]=e;g++}}}return a},getSelectedRateURI:function(){var k=this.findParentByType("tabpanel");var g=k.getTabField("Book","numberToReserve");var a=0;var f=k.shared.stores.rates;var b=f.data.length;var h="";for(var c=0;c<b;c++){var e=f.getAt(c);var j=e.data.shareAvailabilitywith;var d=e.data.dataURI;if(j==""){if(document.getElementById("rd"+d)!=null&&document.getElementById("rd"+d).checked){h=d;a+=parseInt(document.getElementById("no"+d).value)}}else{if(document.getElementById("ch"+d)!=null&&document.getElementById("ch"+d).checked){a+=parseInt(document.getElementById("no"+d).value)}}}if(g){g.setValue(a)}if(typeof h!="undefined"){return h}else{return false}},focusBookTab:function(){var g=this.findParentByType("tabpanel");var j=g.getTabField("Book","datePointer");var h=g.getTabField("Book","dateDays");var e=g.getTabField("Book","numberToReserve");var i=this.findField("datePointer");var f=this.findField("dateDays");var d=this.findField("minimumAvailable");if(j&&i){j.setValue(i.getValue())}if(h&&f){h.setValue(f.getValue())}if(e&&d){e.setValue(d.getValue())}var b=g.getTabField("Book","rateURI");var c=this.getSelectedRateURI();if(b&&c){b.setValue(c)}var a=g.getTab("Book");if(a){a.setNumberOfRatePerFieldByRateURI(c);a.submit()}g.setActiveTab(2)},items:{xtype:"panel",layout:"column",bodyStyle:"padding: 8px;",border:false,items:[{xtype:"panel",border:false,height:150,width:750,items:[{xtype:"awesomepanel",height:136,layout:"fit",searchURI:"",store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","nameString","agencyURI","maximumOccupancy","groupName","inventoryAvailable","queueRequestable","special","available","conversionCurrency","convertedPricingPriceSell","convertedPricingPriceIsNett","convertedPricingPriceCommission","rateClassURI","ratePerURI","rateOccupancyURI","shareAvailabilitywith","flagCount","offeringURI","childChbox","noOfPersons","agencyGroupId","restrictions","defaultFee","homeCurrency","suppierPricing","noOfPersons"]}),tbar:["Price from ",{xtype:"textfield",name:"amountLower",enableKeyEvents:true,width:60},"","",{xtype:"combo",name:"rateClassURI",mode:"local",width:110,triggerAction:"all",editable:false,hidden:true,displayField:"name",valueField:"dataURI",emptyText:"Class",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"tour/classes/collection",identifier:"tour/classes",fields:["name","dataURI"]}),appendData:[{name:"All",dataURI:""}]},"","","","","Available"," ",{xtype:"datefield",name:"datePointer",enableKeyEvents:true,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()},"&plusmn;",{xtype:"omnicrementer",name:"dateDays",width:60,editable:false}," ","Days",{xtype:"omnicrementer",name:"noOfPassToReserver",hidden:true,width:60,value:1,minValue:1,maxValue:7},{xtype:"omnicrementer",name:"minimumAvailable",hidden:true,width:60,value:1,minValue:1,maxValue:7}],items:[{xtype:"grid",width:375,border:false,clicksToEdit:1,viewConfig:{forceFit:true},sm:new Ext.grid.CheckboxSelectionModel({singleSelect:true,checkOnly:true}),columns:[{header:"",width:20,id:"chk",dataIndex:"chk",editable:false,renderer:function(f,c,b,e,g,d){var a=b.get("dataURI");if(b.get("shareAvailabilitywith")==""){return'<input type="radio" id = "rd'+a+'" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">'}else{return'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ch'+a+'" name="rateChk[]" disabled/>'}}},{header:"Rate",editable:false,dataIndex:"nameString",width:110,renderer:function(c,b,a){if(a.get("special")){b.attr='style="color: red;"'}else{if(a.get("agencyURI")!=""){b.attr='style="color: blue;"'}}if(a.get("agencyGroupId")!=""&&typeof a.get("agencyGroupId")!="undefined"){b.attr='style="color: green;"'}return c}},{header:"Basis",editable:false,dataIndex:"groupName",width:165},{header:"Room Type",editable:false,dataIndex:"rateOccupancyURI",width:60,renderer:function(e,d,a,f,c,b){return TDS.util.Format.displayResourceName(e)}},{header:"Gross Price",editable:false,dataIndex:"convertedPricingPriceSell",renderer:TDS.util.Price.conversionGrossNettPriceRenderer,width:125},{header:"No of Pax.",dataIndex:"noOfPersons",width:60,value:1,renderer:function(h,a,f,c,e,i){var d=f.get("dataURI");var g="no"+d;function b(){alert("333");var j=1;document.getElementsByClassName("ss")[0].value=j++}return'<input type="text" size="3" id="'+g+'" class = "ss" name="noOfPersons" value="1" disabled>&nbsp;<button type="button" onclick= >+</button>'}},{header:"Status",editable:false,dataIndex:"available",fixed:true,width:75,renderer:function(b,c,a){return b}},{header:"",editable:false,dataIndex:"",width:45,renderer:function(c,b,a){if(a.get("shareAvailabilitywith")==""){return'<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'}}}],id:"aa",listeners:{beforerender:function(){this.store=this.ownerCt.store},render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","mouseover","rowclick","rowmousedown","sortchange","mouseup","mousedown"])},rowclick:function(r,u,C){C.stopPropagation();var g=this.getStore().getAt(u);var d=g.get("offeringURI");var n=g.get("dataURI");if(document.getElementById("rd"+n)!=null){var x=this.getStore();var f="";var A=0;var b=g.store.data.length;for(var B=0;B<b;B++){var l=x.getAt(B);f=l.get("dataURI");if(document.getElementById("rd"+f)!=null&&document.getElementById("rd"+f).checked&&(l.get("shareAvailabilitywith")==null||l.get("shareAvailabilitywith")=="")){for(var z=0;z<l.get("flagCount");z++){document.getElementById("ch"+l.get("childChbox")[z]).disabled=false}}else{if((l.get("shareAvailabilitywith")==null||l.get("shareAvailabilitywith")=="")){for(var y=0;y<l.get("flagCount");y++){document.getElementById("ch"+l.get("childChbox")[y]).disabled=true;document.getElementById("ch"+l.get("childChbox")[y]).checked=false}}else{}}}}if(g==-1){return}var G={rate:g.data};var w=this.ownerCt.findParentByType("ajaxpanel");var c=this.ownerCt.findParentByType("tabpanel");var s=c.getPNRCurrency();var v=this.ownerCt.ownerCt.ownerCt.items.itemAt(1);v.el.mask("","x-mask-loading");var m=new Ext.data.CollectionStore({autoLoad:true,url:TDS.env.dataPath+w.baseDataURI+"/searchExtras/collection?rateURI="+g.get("dataURI")+"&currency="+s,identifier:w.baseDataURI+"/searchExtras?rateURI="+g.get("dataURI")+"&currency="+s,fields:["dataURI","nameString","termsAndConditions","groupName","required","minimumInventoryRequired","conversionCurrency","convertedPricingPriceSell","convertedPricingPriceIsNett","convertedPricingPriceCommission","rateClassURI","ratePerURI","rateOccupancyURI","shareAvailabilitywith","flagCount","offeringURI","childChbox","defaultFee"]});var q="";m.on("load",function(M,p){G.extras=[];TDS.data[g.get("dataURI")]=[];var L=g.get("dataURI");for(var I=0;I<p.length;I++){p[I].data.rateURI=L;p[I].data.doWork="if(this.checked){TDS.data['"+L+"'].push(this.value);}else{TDS.data['"+L+"'].pop(this.value);}";G.extras[I]=p[I].data;Ext.apply(G.extras[I],TDS.util.Price.calculateGrossNettPrice(G.extras[I]))}var K=v.items.itemAt(0);var H=v.items.itemAt(1);var J=v.items.itemAt(2);var a=J.items.itemAt(1);var k=J.items.itemAt(0);var j=J.items.itemAt(2);var e=v.items.itemAt(3);var N=v.items.itemAt(4);K.hide();if(G.extras.length>0){e.tpl.overwrite(e.body,G.extras);a.extras=G.extras;N.show()}else{N.hide(true)}if(document.getElementById("ch"+n)==null){if(document.getElementById("rd"+n)!=null){if(document.getElementById("rd"+n).checked){a.show();k.show();if(G.rate.restrictions&&G.rate.restrictions.length>6){j.show()}else{j.hide()}}else{if(a.hidden){a.hide();k.hide();j.hide()}}}}else{}v.el.unmask()},this);var F=this.getStore().data.items.length;for(var E=0;E<=F-1;E++){if(this.getStore().data.items[E].id==this.getStore().getAt(u).data.shareAvailabilitywith){q=this.getStore().getAt(u).data.defaultFee+this.getStore().data.items[E].data.defaultFee}}var o=this.getSelectionModel().selections.items[0].data;var h=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);;var D={};D=o}}}],listeners:{toolbarinit:function(){var h=this.ownerCt.findParentByType("awesomegrid");var g=this.ownerCt.findParentByType("tabpanel");var i=h.findField("datePointer"),f=h.findField("dateDays"),j=h.findField("maximumOccupancy");var k=this.getTopToolbar().items.itemAt(7);var d=this.getTopToolbar().items.itemAt(11);var c=this.getTopToolbar().items.itemAt(13);var b=this.getTopToolbar().items.itemAt(16);var a=this.getTopToolbar().items.itemAt(17);if(i){d.setValue(i.getValue())}if(f){c.setValue(f.getValue())}if(j){b.setValue(j.getValue())}if(j){a.setValue(j.getValue())}this.searchURI=TDS.env.dataPath+g.getDetail("offeringURI")+"/searchRates";this.appendQueryParams.currency=g.getPNRCurrency();var e=g.shared.stores.rates;this.getStore().on("load",function(m,l){e.removeAll();e.add(l)})}}},{border:false,html:'<p style="font-size: 9px; padding-top: 3px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates And  Rates that appear highlighted green are <b style="color: green;">special agency</b> rates.</p>'}]},{xtype:"panel",cls:"x-tds-rate-table",columnWidth:1,layout:"table",layoutConfig:{columns:2},height:150,bodyStyle:"padding-left: 8px;",hideBorders:true,border:false,items:[{html:"<p>Select a rate to view more details and available extras.</p>",colspan:2},{colspan:2,tpl:new Ext.XTemplate(["<p>{groupName}</p>"])},{xtype:"panel",layout:"table",width:160,colspan:2,layoutConfig:{columns:2},defaults:{style:"padding-left: 2px;",minWidth:80},items:[{xtype:"formredbutton",text:"Select",hidden:true,handler:function(){var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.focusBookTab()}},{xtype:"button",text:"Notes",extras:[],hidden:true,handler:function(){var c=this.ownerCt.ownerCt.ownerCt.ownerCt;var a=c.getSelectedRateURI();if(!a){return}var d=this.ownerCt.ownerCt.findParentByType("tabpanel");var b=d.getTabField("Rate","datePointer");TDS.window.setWindow({title:"Notes",interfaceURI:"popup/terms.js",sourceDataURI:a,extras:this.extras,data:{offeringData:d.ownerCt.ownerCt.rowRecordData,departureDate:b.getRawValue()},buttonOK:false,buttonCancel:"Close"})}},{colspan:2,border:false,hidden:true,html:'<font size="4" color="#cc0033">*</font><font color="#0000ff">Notes available for this rate.</font>'}]},{colspan:2,tpl:new Ext.XTemplate(['<div style="height: 100px; overflow-x:hidden; margin-top: 8px;">','<table class="x-tds-dataview" style="width: 100%;">',"<thead>","<tr>",'<th style="width: 20px; padding-bottom: 2px;"></th>','<th style="padding-bottom: 2px;">Extra</th>','<th style="width: 30px; padding-bottom: 2px;">No.</th>','<th style="width: 120px; padding-bottom: 2px;">Pricing</th>',"</tr>","</thead>",'<tpl for=".">','<tr class="x-tds-dataview-extras-item">','<td ><input type="checkbox" id = "{rateURI}{dataURI}" value="{dataURI}" {[values.required ?  "disabled checked" : "" ]} onclick={doWork}></td>','<td style="width: 140px;{[values.required ? " color: gray;" : "" ]}">{nameString}</td>',"<td>{minimumInventoryRequired}</td>",'<td style="width: 140px;{[values.priceIsCredit ? " color: green;" : "" ]}">{priceFormatted}{[values.priceIsCredit ? " CR" : "" ]}</td>',"</tr>","</tpl>","</table>","</div>"])},{colspan:2,hidden:true,border:false,html:'<p style="font-size: 9px;">* Extras that appear greyed out are <b>mandatory</b> extras on this rate.</p>'}]}]}}