{xtype:"panel",layout:Ext.isIE?"fit":"",autoScroll:true,bodyStyle:"padding: 8px;",requireStores:[{dataURI:TDS.env.dataPath+"accommodation/ratings/collection",identifier:"accommodation/ratings",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"accommodation/propertyclasstypes/collection",identifier:"accommodation/propertyclasstypes",fields:["name","displayName","dataURI"]},{dataURI:TDS.env.dataPath+"accommodation/groups/collection",identifier:"accommodation/groups",fields:["name","dataURI"]}],items:{xtype:"awesomegrid",searchURI:TDS.env.dataPath+"search/accommodations",pinnable:true,enableRowExpander:true,progressbar:true,callBeforeSearch:true,beforeSearch:function(){var b=this.getTopToolbar().items.itemAt(2).getValue();var a=this.getTopToolbar().items.itemAt(5).getValue();var c=this.getTopToolbar().items.itemAt(7);if((a-b)>=0){c.setValue((a-b)/86400000)}else{c.setValue("")}},tbar:["","In:",{xtype:"datefield",name:"datePointerIn",enableKeyEvents:true,excludeFromSession:true,value:TDS.env.defaultDateSearchGrid,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime(),listeners:{extraselect:function(){var a=this.getValue();a.setDate(a.getDate()+1);this.ownerCt.items.itemAt(5).setMinValue(a)}}}," ","Out:",{xtype:"datefield",name:"datePointerOut",enableKeyEvents:true,excludeFromSession:true,showToday:false,width:80,format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()}," ",{xtype:"omnicrementer",name:"dateDays",width:60,editable:true,listeners:{trigger:function(){var b=this.ownerCt.items.itemAt(2).getValue();var a=this.getValue();this.ownerCt.items.itemAt(5).setValue(new Date(b).add(Date.DAY,a))}}}," ","nights"," ","-"," ","Guest per Room: Adult",{xtype:"omnicrementer",name:"maximumOccupancyAdult",maxValue:8,minValue:1,width:60}," ","Child",{xtype:"omnicrementer",name:"maximumOccupancyChild",maxValue:5,minValue:0,width:60}," ","No. of Rooms:",{xtype:"omnicrementer",name:"noOfRooms",excludeFromSession:true,maxValue:4,minValue:1,value:1,width:60}," ","-"," ",{xtype:"combo",name:"ownContent",mode:"local",width:110,triggerAction:"all",editable:false,excludeFromSession:true,hidden:true,displayField:"description",valueField:"value",emptyText:"content type",value:false,store:TDS.data.countentType,listeners:{render:function(){if(TDS.env.user.isArenaOne()){this.show()}}}},"->",{text:"Help",xtype:"redbutton",cls:"x-button-blue",overCls:"x-button-blue-over",opened:false,toggle:false,handler:function(){TDS.needHelp("Search View Help","23");if(!this.opened){this.opened=true;TDS.needHelp("Search View Help","23")}else{this.opened=false;TDS.helpwindow.hide()}}}],tbar2:["Location:",{xtype:"combo",name:"countryURI",emptyText:"Type a country...",excludeFromSession:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["dataURI","name","isoCode"]}),appendData:[{name:"",dataURI:""}],listeners:{select:function(c){var b=this.ownerCt;var a=b.items.itemAt(3);a.setValue("")}}}," ",{xtype:"locationcombo",name:"locationURI",excludeFromSession:true,hideTrigger:false,listeners:{beforesearch:function(d){var c=this.ownerCt;var b=c.items.itemAt(1);var a=b.getValue().substring(b.getValue().lastIndexOf("/")+1);if(a==""){b.markInvalid("Please select a country.");return false}d.searchURI=TDS.env.dataPath+"country/"+a+"/locations/collection";d.searchIdentifier="country/"+a+"/locations"}}}," ",{xtype:"checkbox",name:"includeAllLocations"}," ","Include surrounding locations"],tbar3:["Property Name:",{xtype:"textfield",name:"nameLike",enableKeyEvents:true,width:120}," ","ARENA Code:",{xtype:"textfield",name:"codeLike",enableKeyEvents:true,width:80}," ","Property type:",{xtype:"combo",name:"accommodationPropertyClassTypeURI",mode:"local",tpl:TDS.util.Templates.ComboNoLabel,width:180,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",emptyText:"Property type",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"accommodation/propertyclasstypes/collection",identifier:"accommodation/propertyclasstypes",fields:["name","dataURI"]}),appendData:[{name:"",dataURI:""}]}," ","Group:",{xtype:"combo",name:"accommodationGroupURI",mode:"local",tpl:TDS.util.Templates.ComboNoLabel,fieldLabel:"Group",width:180,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",emptyText:"Accommodation group",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"accommodation/groups/collection",identifier:"accommodation/groups",fields:["name","dataURI"]}),appendData:[{name:"",dataURI:""}]}," ","Rating:",{xtype:"combo",name:"accommodationRatingURI",tpl:TDS.util.Templates.ComboNoLabel,mode:"local",width:70,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",emptyText:"Rating",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"accommodation/ratings/collection",identifier:"accommodation/ratings",fields:["name","dataURI"]}),appendData:[{name:"",dataURI:""}]}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","contactName","nameString","supplierURI","code","locationToString","conversionCurrency","convertedPricingPriceSell","termsAndConditions","descriptionString","primaryHref","addressString","accommodationRatingURI","accommodationPropertyClassTypeURI","accommodationGroupURI","termsAndConditions","noPrePaymentRequired","pytInFull","fullPytPriorDays","depositWithin","balancePriorToDeparture","depositWithinDays","depositPerOption","balancePriorToDepartureDay","graphicImgPath","supplierDetails","pricingPriceIsNett","phoneNumber","calcRatePerPerson"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Supplier",dataIndex:"supplierURI",sortable:true,flex:3,renderer:function(e,d,a,f,c,b){d.attr='ext:qtip="'+a.get("supplierDetails").replace(/\"/g,"'")+'"';if(e=="supplier/190"){return"Restel"}return TDS.util.Format.displayResourceConciseName(e)}},{header:"Location",dataIndex:"locationToString",sortable:true,flex:3},{header:"Name",dataIndex:"nameString",sortable:true,flex:3,renderer:function(e,d,a,f,c,b){return TDS.util.firstWordCapital(e)}},{header:"ARENA Code",dataIndex:"code",flex:1,sortable:true},{header:"Rating",dataIndex:"accommodationRatingURI",flex:1,sortable:true,renderer:TDS.util.Format.displayResourceNameRenderer()},{header:"Lowest Rate Calculation",hidden:"true",dataIndex:"convertedPricingPriceSell",flex:1,sortable:true,renderer:function(c,b,a){if(a.data.convertedPricingPriceSell==0){return" Not Available"}else{return TDS.util.Price.formatPrice(c,a.data.conversionCurrency)+" ("+(a.data.pricingPriceIsNett?"Nett":"Gross")+")"}}}]),sm:new Ext.grid.RowSelectionModel(),viewConfig:{forceFit:true},getRowInterface:function(a,c,b){return"pnr/offerings/accommodation/layout.js"},listeners:{sessioninit:function(){var a=this.ownerCt.findParentByType("pnrpanel");var b=this.getTopToolbar().items.itemAt(14);b.setValue(a.getPassengerCount());this.appendQueryParams.currency=a.getPNRCurrency()}}}}