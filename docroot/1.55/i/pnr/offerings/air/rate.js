{xtype:"panel",border:false,requireStores:[{dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]}],findField:function(b){var a=false;this.getRateToolbar().items.each(function(c){if(c.name==b){a=c;return true}});return a},getRateGrid:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)},getRateToolbar:function(){return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar()},getSelectedRateURI:function(){var a=this.getRateGrid().getSelectionModel().getSelected();if(typeof a!="undefined"){return a.get("dataURI")}return false},getPNRDataURI:function(){return this.ownerCt.pnrDataURI},focusBookTab:function(){var h=this.findParentByType("tabpanel");var e=h.getTabField("Book","datePointer");var a=h.getTabField("Book","numberToReserve");var c=this.findField("datePointer");var d=this.findField("minimumAvailable");if(e&&c){e.setValue(c.getValue())}if(a&&d){a.setValue(d.getValue())}var f=h.getTabField("Book","rateURI");var b=this.getSelectedRateURI();if(f&&b){f.setValue(b)}var g=h.getTab("Book");if(g){g.setNumberOfRatePerFieldByRateURI(b);g.submit()}},items:{xtype:"panel",layout:"column",bodyStyle:"padding: 8px;",border:false,items:[{xtype:"panel",border:false,height:270,width:700,items:[{xtype:"awesomepanel",height:136,layout:"fit",searchURI:"",store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pricingAdult","totalFare","child","pricingChild","pricingInfant","pricingInfantNoSeat","totalFare","nameString","agencyURI","code","maximumOccupancy","groupName","inventoryAvailable","queueRequestable","special","available","conversionCurrency","convertedPricingPriceSell","convertedPricingPriceIsNett","convertedPricingPriceCommission","rateClassURI","ratePerURI","rateOccupancyURI","noOfInfantSeat","noOfInfantNoSeat","baggageDesc","tax","totalPrices","restrictions","totFareNoTax","seatsRemain"]}),tbar:[{xtype:"label",name:"adultNo",enableKeyEvents:true,width:100,style:"padding-left:20px;font-weight: bolder;"},"&nbsp;Adult &nbsp;&nbsp;&nbsp;&nbsp;"," ","  &nbsp; ",{xtype:"label",name:"childNo",text:" ",style:"font-weight: bolder;"},"&nbsp;Children(2-11 yrs)&nbsp;&nbsp;&nbsp;&nbsp;"," "," ",{xtype:"label",name:"infantNo",text:" ",style:"font-weight: bolder;"},"&nbsp;Infant (<2 yrs)&nbsp;&nbsp;&nbsp;&nbsp;"," "," ","",{xtype:"label",name:"infantNoSeat",hidden:true,text:" "}," "," ",{xtype:"datefield",name:"datePointer",enableKeyEvents:true,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime(),hidden:true},{xtype:"omnicrementer",name:"noOfAdult",enableKeyEvents:true,hidden:true,width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}},{xtype:"omnicrementer",name:"noOfChild",hidden:true,width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}},{xtype:"omnicrementer",name:"noOfInfantSeat",hidden:true,width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(20).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}},{xtype:"omnicrementer",name:"noOfInfantNoSeat",hidden:true,width:60,listeners:{trigger:function(d,c){var b=d.ownerCt.items.itemAt(11).getValue()+d.ownerCt.items.itemAt(14).getValue()+d.ownerCt.items.itemAt(17).getValue()+d.getValue();d.ownerCt.items.itemAt(23).setValue(b)}}}],items:[{xtype:"grid",width:400,border:false,enableColumnHide:false,enableColumnMove:false,enableColumnResize:false,enableHdMenu:false,viewConfig:{forceFit:true},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"",width:55,id:"chk",dataIndex:"chk",editable:false,width:20,fixed:true,renderer:function(f,c,b,e,g,d){var a=b.get("dataURI");return'<input type="radio" id = "rd'+a+'" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">'}},{header:"Fare",dataIndex:"nameString"},{header:"Adult",dataIndex:"pricingAdult",renderer:function(n,b,f,c,e,o){var j,l,k,q,g,d,p,s,h;j=f.get("conversionCurrency");l=f.get("pricingAdult");k=f.get("convertedPricingPriceCommission");g=f.get("convertedPricingPriceIsNett");d=l;if(!k){k=0}var a=((k*100)/l).toFixed(2);if(!isNaN(a)){q=a}else{q=0}p=l-k;s=TDS.util.Price.formatPrice(p,j);h=TDS.util.Price.formatPrice(d,j);var m={priceCurrency:j,priceSell:l,priceGross:d,priceNett:p,priceCommission:k,priceCommissionPercentage:q,priceIsNett:g,priceFormatted:h,priceNettFormatted:s};if(m){return m.priceFormatted}}},{header:"Child",dataIndex:"pricingChild",renderer:function(n,b,f,c,e,o){var j,l,k,q,g,d,p,s,h;j=f.get("conversionCurrency");l=f.get("pricingChild");k=f.get("convertedPricingPriceCommission");g=f.get("convertedPricingPriceIsNett");d=l;if(!k){k=0}var a=((k*100)/l).toFixed(2);if(!isNaN(a)){q=a}else{q=0}p=l-k;s=TDS.util.Price.formatPrice(p,j);h=TDS.util.Price.formatPrice(d,j);var m={priceCurrency:j,priceSell:l,priceGross:d,priceNett:p,priceCommission:k,priceCommissionPercentage:q,priceIsNett:g,priceFormatted:h,priceNettFormatted:s};if(m){return m.priceFormatted}}},{header:"Infant with seat",dataIndex:"pricingInfant",renderer:function(n,b,f,c,e,o){var j,l,k,q,g,d,p,s,h;j=f.get("conversionCurrency");l=f.get("pricingInfant");k=f.get("convertedPricingPriceCommission");g=f.get("convertedPricingPriceIsNett");d=l;if(!k){k=0}var a=((k*100)/l).toFixed(2);if(!isNaN(a)){q=a}else{q=0}p=l-k;s=TDS.util.Price.formatPrice(p,j);h=TDS.util.Price.formatPrice(d,j);var m={priceCurrency:j,priceSell:l,priceGross:d,priceNett:p,priceCommission:k,priceCommissionPercentage:q,priceIsNett:g,priceFormatted:h,priceNettFormatted:s};if(m){return m.priceFormatted}}},{header:"No Of Seats",dataIndex:"seatsRemain"},{header:"Total Fare",dataIndex:"totalFare",renderer:function(n,b,f,c,e,o){var j,l,k,q,g,d,p,s,h;j=f.get("conversionCurrency");l=f.get("totalFare");k=f.get("convertedPricingPriceCommission");g=f.get("convertedPricingPriceIsNett");d=l;if(!k){k=0}var a=((k*100)/l).toFixed(2);if(!isNaN(a)){q=a}else{q=0}p=l-k;s=TDS.util.Price.formatPrice(p,j);h=TDS.util.Price.formatPrice(d,j);var m={priceCurrency:j,priceSell:l,priceGross:d,priceNett:p,priceCommission:k,priceCommissionPercentage:q,priceIsNett:g,priceFormatted:h,priceNettFormatted:s};if(m){return m.priceFormatted}}}],id:"grid",listeners:{beforerender:function(){this.store=this.ownerCt.store},render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","mouseover","rowclick","rowmousedown","sortchange","mouseup","mousedown"]);var b=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);var c=this.findParentByType("awesomesearchgrid").getTopToolbar();var a=this.findParentByType("awesomepanel").getTopToolbar();a.items.itemAt(0).setText(c.items.itemAt(11).getValue());a.items.itemAt(4).setText(c.items.itemAt(14).getValue());a.items.itemAt(8).setText(c.items.itemAt(17).getValue())},rowclick:function(h,j,f){;var c=this.getSelectionModel().selections.items[0].data;var d=this.findParentByType("awesomepanel").findParentByType("panel").findParentByType("panel").items.itemAt(1).items.itemAt(0);d.tpl.overwrite(d.body,c);var a=this.getSelectionModel().getSelections()[0].get("nameString");var b=this.getSelectionModel().getSelections()[0].get("restrictions");var g=b.split(". ");var k="";for(i=0;i<g.length;i++){k+=g[i]+"<br>"}this.findParentByType("panel").findByType("panel")[3].getEl().dom.innerHTML="<font size='3'>"+k+"</font>"}}}],listeners:{toolbarinit:function(){var h=this.ownerCt.findParentByType("awesomesearchgrid");var g=this.ownerCt.findParentByType("tabpanel");var l=h.findField("datePointer");var d=h.findField("noOfAdult");var b=h.findField("noOfChild");var k=h.findField("noOfInfantSeat");var n=h.findField("noOfInfantNoSeat");var o=this.getTopToolbar().items.itemAt(8);var c=this.getTopToolbar().items.itemAt(16);if(l){c.setValue(l.getValue())}var m=this.getTopToolbar().items.itemAt(17);m.setValue(d.getValue());var f=this.getTopToolbar().items.itemAt(18);f.setValue(b.getValue());var a=this.getTopToolbar().items.itemAt(19);a.setValue(k.getValue());var j=this.getTopToolbar().items.itemAt(20);j.setValue(n.getValue());this.searchURI=TDS.env.dataPath+g.getDetail("offeringURI")+"/searchRates";this.appendQueryParams.currency=g.getPNRCurrency();var e=g.shared.stores.rates;this.getStore().on("load",function(q,p){e.removeAll();e.add(p)})}}},{xtype:"panel",border:true,style:"padding-top:5px;",width:700,height:100,items:[{html:" ",width:700,autoScroll:true,name:"message",style:"overflow:scroll;height:80px;padding-left:12px;padding-top:10px;",anchor:"100%"}]},{border:false,html:'<p style="font-size: 9px; padding-top: 4px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates.</p>'}]},{xtype:"panel",height:300,width:325,border:false,bodyStyle:"padding-left: 8px;",layout:"table",layoutConfig:{columns:1},items:[{xtype:"panel",height:175,width:300,border:false,tpl:new Ext.XTemplate(["<div  >",'<table style="width:100%; cellpadding:5px;border: 1px solid grey; border-collapse: collapse;">',"<tr>",'<td style="border: 1px solid grey; border-collapse: collapse; height:20px "  >Fare</td><td style="border: 1px solid grey; border-collapse: collapse; " > {conversionCurrency} {totFareNoTax} </td></tr>','<tr><td  style="border: 1px solid grey; border-collapse: collapse; height:20px">Taxes</td><td style="border: 1px solid grey; border-collapse: collapse; ">{conversionCurrency} {tax}</td></tr>','<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px">Airline Surcharge</td><td style="border: 1px solid grey; border-collapse: collapse; "></td></tr>','<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px">Fees</td><td></td style="border: 1px solid grey; border-collapse: collapse; "></tr>','<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px ">Extra</td><td style="border: 1px solid grey; border-collapse: collapse; "></td></tr>','<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px ">Total</td><td style="border: 1px solid grey; border-collapse: collapse; "> {conversionCurrency} {totalFare}</td></tr>',"</table></div>"]),listeners:{render:function(){this.tpl.overwrite(this.body,data)}}},{xtype:"panel",defaults:{style:"padding:25px;"},border:false,height:100,layout:"table",layoutConfig:{columns:3},items:[{xtype:"button",text:"Terms",handler:function(){;var b=this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items[0].data;var a=b.dataURI;TDS.window.setWindow({title:"General Terms",interfaceURI:"pnr/offerings/air/generalTerms.js",sourceDataURI:a+"/generalConditions",buttonOK:false,buttonCancel:"Close"})}},{xtype:"button",text:"Baggage",hidden:true,handler:function(){var c=this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items[0].data;var b=c.baggageDesc;var a=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);a.setValue(b)}},{xtype:"formredbutton",text:"Select",autoFill:true,handler:function(){var c=this.ownerCt.ownerCt.ownerCt.findParentByType("panel");var b=this.findParentByType("awesomesearchgrid").getSelectionModel().selections.items[0].data;var h=[];h.push(b);var f=b.marketText;var d=this.findParentByType("awesomesearchgrid").config.y;var e=this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items[0].id;d.push(e);var g=this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0);var a=this.ownerCt.findParentByType("tabpanel").getPNRCurrency();TDS.window.setWindow({title:"Flight Confirmation",interfaceURI:"pnr/offerings/air/flight.js",postDataURI:c.getPNRDataURI()+"/componentsbook",data:h,dataURI:{pnr:c.getPNRDataURI(),rateOffering:d,terms:f},data:{priceCurrency:a},buttonOK:"End Transaction",callback:{fn:function(u,m,j){var r=g;r.getView().refresh();r.getSelectionModel().clearSelections();var p=this;var k=TDS.window.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);var o=k.getStore();var q=o.data.items;d.length=0;q.forEach(function(v){var s=v;d.push(v.data.dataURI)});if(u){var l=this.ownerCt.findParentByType("pnrpanel");var t=l.getViewByName("pnr");if(t){var n=t.findByType("awesomegrid")[0];n.submitQuery(true)}l.focusView("pnrView","pnr")}},scope:this}})}}]}]},{xtype:"panel",border:true,width:250,height:220,hidden:true,items:[{xtype:"textarea",width:250,height:220,readOnly:true,autoScroll:true,name:"message",value:"Inclusion",anchor:"100%"}]}]}}