{xtype:"panel",border:false,requireStores:[{dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]}],findField:function(b){var a=false;this.getRateToolbar().items.each(function(c){if(c.name==b){a=c;return true}});return a},getRateGrid:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)},getRateToolbar:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar()},getSelectedRateURI:function(){var g=this.findParentByType("tabpanel");var c=g.shared.stores.rates;var a=c.data.length;var f="";for(var d=0;d<a;d++){var b=c.getAt(d);var h=b.data.shareAvailabilitywith;var e=b.data.dataURI;if(h==""){if(document.getElementById("rd"+e)!=null&&document.getElementById("rd"+e).checked){f=e}}}if(typeof f!="undefined"){return f}else{return false}},getMultipleSelectedRateURI:function(){var n=this.findParentByType("tabpanel");var b=this.getRateGrid();var j=n.shared.stores.rates;var d=j.data.length;var c=[];var l=0;var a=0;for(var e=0;e<d;e++){var g=j.getAt(e);var m=g.data.shareAvailabilitywith;var f=g.data.dataURI;var o=document.getElementById("no"+f).value;if(m==""){if(document.getElementById("rd"+f)!=null&&document.getElementById("rd"+f).checked&&o!=0&&o!=""){c[l]=g;l++;a+=parseInt(o)}}else{if(document.getElementById("ch"+f)!=null&&document.getElementById("ch"+f).checked){c[l]=g;l++;a+=parseInt(o)}}}var n=this.findParentByType("tabpanel");var k=n.getTabField("Book","numberToReserve");var h=this.findField("minimumAvailable");if(k&&h){k.setValue(a)}return c},getRateGrid:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)},focusBookTab:function(){var h=this.findParentByType("tabpanel");var d=h.getTabField("Book","datePointer");var g=h.getTabField("Book","dateDays");var b=this.findField("datePointer");var c=this.findField("dateDays");if(d&&b){d.setValue(b.getValue())}if(g&&c){g.setValue(c.getValue())}var e=h.getTabField("Book","rateURI");var a=this.getSelectedRateURI();if(e&&a){e.setValue(a)}this.getMultipleSelectedRateURI();var f=h.getTab("Book");if(f){f.setNumberOfRatePerFieldByRateURI(a);f.submit()}h.setActiveTab(2)},items:{xtype:"panel",layout:"column",bodyStyle:"padding: 8px;",border:false,items:[{xtype:"panel",border:false,height:150,width:700,items:[{xtype:"awesomepanel",height:136,layout:"fit",searchURI:"",store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","nameString","agencyURI","maximumOccupancy","groupName","inventoryAvailable","queueRequestable","special","available","conversionCurrency","convertedPricingPriceSell","convertedPricingPriceIsNett","convertedPricingPriceCommission","rateClassURI","ratePerURI","rateOccupancyURI","agencyGroupId","shareAvailabilitywith","flagCount","offeringURI","childChbox","noOfPersons","defaultFee","suppierPricing","homeCurrency"]}),tbar:["Price from ",{xtype:"textfield",name:"amountLower",enableKeyEvents:true,width:60}," ","Pax.",{xtype:"omnicrementer",name:"minimumAvailable",width:60,value:1,minValue:1,maxValue:8}," ","Available"," ",{xtype:"datefield",name:"datePointer",enableKeyEvents:true,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()},{xtype:"omnicrementer",name:"dateDays",width:60,hidden:true,editable:false}],items:[{xtype:"grid",width:500,border:false,enableColumnHide:false,enableColumnMove:false,enableColumnResize:false,enableHdMenu:false,viewConfig:{forceFit:true},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"",width:45,id:"chk",dataIndex:"chk",editable:false,renderer:function(f,c,b,e,g,d){var a=b.get("dataURI");if(b.get("shareAvailabilitywith")==""){return'<input type="radio" id = "rd'+a+'" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">'}else{return'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ch'+a+'" name="rateChk[]" disabled/>'}}},{header:"Rate",editable:false,dataIndex:"nameString",width:125,renderer:function(c,b,a){if(a.get("special")){b.attr='style="color: red;"'}else{if(a.get("agencyURI")!=""){b.attr='style="color: blue;"'}}if(a.get("agencyGroupId")!=""){b.attr='style="color: green;"'}return c}},{header:"Basis",editable:false,dataIndex:"groupName",width:155},{header:"Gross Price",editable:false,dataIndex:"convertedPricingPriceSell",renderer:TDS.util.Price.conversionGrossNettPriceRenderer,width:105},{header:"Pax.",dataIndex:"",width:75,renderer:function(g,c,b,e,h,d){var a=b.get("dataURI");var f="no"+a;return'<input type="text" size="3" id="'+f+'" name="noOfPersons" value="1" disabled >&nbsp;<button type="button"> + </button>'}},{header:"Status",editable:false,dataIndex:"available",fixed:true,width:75,renderer:function(b,c,a){return b}},{header:"",editable:false,dataIndex:"",width:35,renderer:function(c,b,a){if(a.get("shareAvailabilitywith")==""){return'<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'}}}],listeners:{beforerender:function(){this.store=this.ownerCt.store},render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","mouseover","rowclick","rowmousedown","sortchange","mouseup","mousedown"])},rowclick:function(r,u,C){C.stopPropagation();var f=this.getStore().getAt(u);var c=f.get("offeringURI");var n=f.get("dataURI");f.set("noOfPersons",document.getElementById("no"+n).value);var q=f.get("noOfPersons");var l=false;if(document.getElementById("rd"+n)!=null){document.getElementById("no"+n).disabled=false;var x=this.getStore();var d="";var A=0;var a=f.store.data.length;for(var B=0;B<a;B++){var h=x.getAt(B);d=h.get("dataURI");if(document.getElementById("rd"+d)!=null&&document.getElementById("rd"+d).checked&&(h.get("shareAvailabilitywith")==null||h.get("shareAvailabilitywith")=="")){l=true;for(var z=0;z<h.get("flagCount");z++){document.getElementById("ch"+h.get("childChbox")[z]).disabled=false}}else{if((h.get("shareAvailabilitywith")==null||h.get("shareAvailabilitywith")=="")){for(var y=0;y<h.get("flagCount");y++){document.getElementById("ch"+h.get("childChbox")[y]).disabled=true;document.getElementById("ch"+h.get("childChbox")[y]).checked=false}}}}}if(f==-1){return}var E={rate:f.data};var w=this.ownerCt.findParentByType("ajaxpanel");var b=this.ownerCt.findParentByType("tabpanel");var s=b.getPNRCurrency();var v=this.ownerCt.ownerCt.ownerCt.items.itemAt(1);v.el.mask("","x-mask-loading");var m=new Ext.data.CollectionStore({autoLoad:true,url:TDS.env.dataPath+w.baseDataURI+"/searchExtras/collection?rateURI="+f.get("dataURI")+"&currency="+s,identifier:w.baseDataURI+"/searchExtras?rateURI="+f.get("dataURI")+"&currency="+s,fields:["dataURI","nameString","termsAndConditions","extraCategoryURI","required","minimumInventoryRequired","conversionCurrency","convertedPricingPriceSell","convertedPricingPriceIsNett","convertedPricingPriceCommission","rateClassURI","ratePerURI","rateOccupancyURI","shareAvailabilitywith","flagCount","offeringURI","childChbox","defaultFee"]});m.on("load",function(K,F){E.extras=[];for(var H=0;H<F.length;H++){E.extras[H]=F[H].data;Ext.apply(E.extras[H],TDS.util.Price.calculateGrossNettPrice(E.extras[H]))}var J=v.items.itemAt(0);var G=v.items.itemAt(1);var I=v.items.itemAt(2);var e=I.items.itemAt(1);var k=I.items.itemAt(2);var p=I.items.itemAt(0);var j=v.items.itemAt(3);J.hide();G.tpl.overwrite(G.body,E.rate);if(E.extras.length>0){j.tpl.overwrite(j.body,E.extras)}if(document.getElementById("ch"+n)==null){if(document.getElementById("rd"+n)!=null){if(document.getElementById("rd"+n).checked){e.extras=E.extras;e.show();p.show();if(E.rate.restrictions&&E.rate.restrictions.length>6){k.show()}else{k.hide()}}else{if(e.hidden){e.hide();p.hide();k.hide()}}}}v.el.unmask()},this);var o=this.getSelectionModel().selections.items[0].data;var g=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);;var D={};D=o;g.tpl.overwrite(g.body,Ext.apply({convertedPricingPriceSells:TDS.util.Price.formatPrice((D.convertedPricingPriceSell*D.noOfPersons),D.conversionCurrency),defaultFees:TDS.util.Price.formatPrice(D.defaultFee,D.conversionCurrency),totals:TDS.util.Price.formatPrice((D.convertedPricingPriceSell*D.noOfPersons)+D.defaultFee,D.conversionCurrency)},D))}}}],listeners:{toolbarinit:function(){var f=this.ownerCt.findParentByType("awesomegrid");var e=this.ownerCt.findParentByType("tabpanel");var g=f.findField("datePointer");var d=f.findField("dateDays");var h=f.findField("maximumOccupancy");var i=this.getTopToolbar().items.itemAt(4);var b=this.getTopToolbar().items.itemAt(8);var a=this.getTopToolbar().items.itemAt(9);if(g){b.setValue(g.getValue())}if(d){a.setValue(d.getValue())}if(h){i.setValue(h.getValue())}this.searchURI=TDS.env.dataPath+e.getDetail("offeringURI")+"/searchRates";this.appendQueryParams.currency=e.getPNRCurrency();var c=e.shared.stores.rates;this.getStore().on("load",function(k,j){c.removeAll();c.add(j)})}}},{border:false,html:'<p style="font-size: 9px; padding-top: 3px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates And  Rates that appear highlighted green are <b style="color: green;">special agency</b> rates.</p>'}]},{xtype:"panel",cls:"x-tds-rate-table",columnWidth:1,layout:"table",layoutConfig:{columns:2},height:150,bodyStyle:"padding-left: 8px;",hideBorders:true,border:false,items:[{html:"<p>Select a rate to view more details and available extras.</p>",colspan:2},{colspan:2,hidden:true,tpl:new Ext.XTemplate(["<p>{groupName}</p>"])},{xtype:"panel",layout:"table",width:160,colspan:2,layoutConfig:{columns:2},defaults:{style:"padding-left: 2px;",minWidth:80},items:[{xtype:"formredbutton",text:"Select",hidden:true,handler:function(){var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.focusBookTab()}},{xtype:"button",text:"Notes",extras:[],hidden:true,handler:function(){var c=this.ownerCt.ownerCt.ownerCt.ownerCt;var a=c.getSelectedRateURI();if(!a){return}var d=this.ownerCt.ownerCt.findParentByType("tabpanel");var b=d.getTabField("Rate","datePointer");TDS.window.setWindow({title:"Notes",interfaceURI:"popup/terms.js",sourceDataURI:a,extras:this.extras,data:{offeringData:d.ownerCt.ownerCt.rowRecordData,departureDate:b.getRawValue()},buttonOK:false,buttonCancel:"Close"})}},{colspan:2,border:false,hidden:true,html:'<font size="4" color="#cc0033">*</font><font color="#0000ff">Notes available for this rate.</font>'}]},{colspan:2,tpl:new Ext.XTemplate(['<div style="height: 100px; overflow-x:hidden; margin-top: 8px;">','<table class="x-tds-dataview" style="width: 100%;">',"<thead>","<tr>",'<th style="padding-bottom: 2px;">Extra</th>','<th style="width: 90px; padding-bottom: 2px;">Min. required</th>','<th style="width: 120px; padding-bottom: 2px;">Pricing</th>',"</tr>","</thead>",'<tpl for=".">','<tr class="x-tds-dataview-item">','<td style="width: 140px;{[values.required ? " color: gray;" : "" ]}">{nameString}</td>',"<td>{minimumInventoryRequired}</td>",'<td style="width: 140px;{[values.priceIsCredit ? " color: green;" : "" ]}">{priceFormatted}{[values.priceIsCredit ? " CR" : "" ]}</td>',"</tr>","</tpl>","</table>","</div>",'<hr style="height: 1px; border: none; border-top: 1px solid #eee;"/>','<p style="font-size: 9px;">* Extras that appear greyed out are <b>mandatory</b> extras on this rate.</p>'])}]}]}}