{xtype:"form",border:false,markDataDirtyOnLoad:true,fieldMap:{rateClass:"rateClassURI",ratePer:"ratePerURI",rateOccupancy:"rateOccupancyURI",defaultMaxHoldTimeSeconds:["defaultMaxHoldTimeHours","defaultMaxHoldTimeMinutes"]},getSupplierDataURI:function(){return this.ownerCt.getRequiredData("supplier").dataURI},getAgencyAdminGroup:function(d){var b=this.getSupplierDataURI();var e=TDS.env.dataPath+b+"/agencyGroupAdmin/collection";Ext.Ajax.request({url:e,method:"GET",callback:function c(l,f,h){var g=Ext.util.JSON.decode(h.responseText);var k=g["supplier/agencyGroupAdmin"];if(typeof k=="undefined"){return}var j=[];for(var a=0;a<k.length;a++){g[k[a]].dataURI=k[a];j.push(g[k[a]])}d.loadData(j)}})},beforeSubmit:function(a){a.defaultMaxHoldTimeSeconds=0;if(typeof a.defaultMaxHoldTimeHours==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeHours)*60*60}if(typeof a.defaultMaxHoldTimeMinutes==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeMinutes)*60}if(isNaN(a.defaultMaxHoldTimeSeconds)||a.defaultMaxHoldTimeSeconds==0){delete a.defaultMaxHoldTimeSeconds}return a},beforeDataLoad:function(a,d){var b=a.defaultMaxHoldTimeSeconds;a.defaultMaxHoldTimeHours=Math.floor(parseInt(a.defaultMaxHoldTimeSeconds)/60/60);if(a.defaultMaxHoldTimeHours>0){b-=a.defaultMaxHoldTimeHours*60*60}a.defaultMaxHoldTimeMinutes=b/60;if(a.agencyURI){a.rateAvailableForAgencyOnly=true}var c=d.getRequiredData("supplier");a.restrictions=c.data.defaultRateTermsAndConditions;return a},beforeDataLoad:function(j,h){var f=h.getRequiredData("dataURI");var g=this.getForm().items.items[7];if(g){var a=this.ownerCt;var b=Ext.StoreMgr.lookup(f.dataURI+"/rates");for(var e=0;e<b.data.length;e++){if(b.getAt(e).data.shareAvailabilitywith==""){b.getAt(e).data.shareAvailabilitywith="no"}}var c=b;g.store=c}return j},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:360,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:135,defaults:{},items:[{xtype:"textfield",name:"name",fieldLabel:"Rate name",width:185},{xtype:"combo",name:"rateBasisURI",forceSubmit:true,mode:"local",fieldLabel:"Basis",width:185,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}),appendData:[{name:" ",dataURI:""}]},{xtype:"textfield",name:"nameLocale",fieldLabel:"Rate name (Alt Language)",width:185},{xtype:"combo",name:"rateClassURI",fieldLabel:"Pax Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]}),listeners:{select:function(c,b,a){if(a==2){Ext.getCmp("ageBelowId").enable()}else{Ext.getCmp("ageBelowId").disable()}}}},{xtype:"textfield",name:"ageBelow",id:"ageBelowId",fieldLabel:"Age below",width:110},{xtype:"combo",name:"ratePerURI",fieldLabel:"Per",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]})},{xtype:"combo",name:"rateOccupancyURI",forceSubmit:true,value:"rate/occupancy/1",fieldLabel:"Room Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]})},{xtype:"combo",name:"shareAvailabilitywith",forceSubmit:true,mode:"local",fieldLabel:"Share Availability with",width:200,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",listeners:{expand:function(a){a.getStore().filter("shareAvailabilitywith","no")}}},{xtype:"checkbox",name:"active",fieldLabel:"Active",inputValue:true},{xtype:"checkbox",name:"special",fieldLabel:"Special",inputValue:"true"},{xtype:"panel",style:"padding: 0;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Inventory Max. hold time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultMaxHoldTimeHours",maxValue:23},{html:"hours",bodyStyle:"padding: 0 4px;"},{xtype:"omnicrementer",name:"defaultMaxHoldTimeMinutes",maxValue:59},{html:"minutes",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{html:"Inventory Cut-off time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultCutoffTimeDays",value:0,forceSubmit:true,maxValue:30},{html:"days",bodyStyle:"padding: 0 4px;"}]}]}]},{title:"Pricing",items:[{xtype:"panel",border:false,items:[{xtype:"panel",anchor:"100%",border:false,height:350,items:[{xtype:"panel",border:false,items:[{xtype:"panel",layout:"table",style:" padding-left: 35px;padding-top:5px; ",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{xtype:"radio",name:"cruiseLink",boxLabel:"Pricing",inputValue:false,listeners:{render:function(){},check:function(b,a){if(a){this.ownerCt.ownerCt.ownerCt.items.itemAt(2).disable();this.ownerCt.ownerCt.ownerCt.items.itemAt(1).enable()}}}},{width:50},{xtype:"radio",name:"cruiseLink",boxLabel:"Package Pricing",inputValue:true,listeners:{render:function(){},check:function(b,a){if(a){this.ownerCt.ownerCt.ownerCt.items.itemAt(1).disable();this.ownerCt.ownerCt.ownerCt.items.itemAt(2).enable()}}}}]}]},{xtype:"pricepanel"},{xtype:"packagepricepanel"}]}]}]},{title:"CUG",items:[{xtype:"panel",layout:"table",border:false,hideBorders:true,showLoadMask:false,layoutConfig:{columns:5},initAgency:function(){var a=this.getAgencyURIField().getValue();if(a){this.showLoadMask=true;this.lookupAgencyByURI(a)}},lookupAgencyByURI:function(a){this.lookupAgency(false,a)},lookupAgencyByAgencyArenaCode:function(a){this.lookupAgency(a,false)},lookupAgency:function(a,c){if(this.showLoadMask){this.el.mask("","x-mask-loading")}var b={};if(a){b.agencyArenaCode=a}if(c){b.agencyURI=c}Ext.Ajax.request({url:TDS.env.dataPath+"search/agencies/collection",disableCaching:false,method:"GET",params:b,callback:function(i,d,g){if(this.showLoadMask){this.showLoadMask=false;this.el.unmask()}this.getLookupButton().enable();if(d){try{var f=Ext.decode(g.responseText);var j=f["search/agencies?"+Ext.urlEncode(b)][0];if(!j){this.setAgencyLabel("No agent found.");return}this.setAgencyLabel(f[j]["name"]);this.setAgencyArenaCodeField(f[j]["agencyArenaCode"]);this.setAgencyAddressLabel(f[j]["addressString"]);this.setAgencyURIField(j)}catch(h){}}else{this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>')}},scope:this})},getLookupButton:function(){return this.items.itemAt(5)},getRateAvailableForAgencyField:function(){return this.items.itemAt(0)},getAgencyURIField:function(){return this.items.itemAt(7)},getAgencyArenaCodeField:function(){return this.items.itemAt(4)},setAgencyArenaCodeField:function(a){this.getAgencyArenaCodeField().setValue(a)},setAgencyURIField:function(a){this.getAgencyURIField().setValue(a)},setAgencyLabel:function(a){this.items.itemAt(9).setText(a)},setAgencyAddressLabel:function(a){this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">'+a+"</span>")},clearAllFields:function(){this.setAgencyLabel("");this.setAgencyAddressLabel("");this.setAgencyURIField("")},items:[{xtype:"checkbox",name:"rateAvailableForAgencyOnly",forceSubmit:true,width:20},{colspan:4,html:"Rate is only available to specific agent only.",width:320},{width:20},{html:"Agent code:",width:80},{xtype:"textfield",name:"agencyArenaCode",width:60},{xtype:"button",text:"Lookup",width:60,handler:function(){var a=this.ownerCt;this.disable();a.clearAllFields();a.setAgencyLabel("Lookup in progress...");a.lookupAgencyByAgencyArenaCode(a.getAgencyArenaCodeField().getValue())}},{width:120},{xtype:"hidden",name:"agencyURI",forceSubmit:true,width:20},{html:"Agent:",width:80},{colspan:3,xtype:"labelpanel",html:"Not set",width:240},{colspan:2,width:100},{colspan:3,xtype:"labelpanel",width:240}],listeners:{render:function(){this.initAgency()}}},{xtype:"panel",border:false,height:30},{xtype:"panel",layout:"table",border:false,hideBorders:true,showLoadMask:false,layoutConfig:{columns:5},items:[{xtype:"checkbox",name:"rateAvailableForAgencyAdminGroupOnly",forceSubmit:true,width:20},{colspan:4,html:"Rate is only available to specific agency group only.",width:320},{width:20},{html:"Agency group:",width:80},{xtype:"combo",name:"agencyAdminGroup",forceSubmit:true,mode:"local",width:160,triggerAction:"",editable:false,triggerAction:"all",displayField:"name",valueField:"dataURI",store:new Ext.data.JsonStore({fields:["dataURI","name"]})},{colspan:2,width:100},{colspan:3,xtype:"labelpanel",width:240}],listeners:{render:function(){this.ownerCt.ownerCt.ownerCt.getAgencyAdminGroup(this.items.itemAt(4).store)}}},{html:"<div><center></br></br></br></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>",width:320,border:false}]},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"restrictions",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}}],listeners:{render:function(){var f=this;f=this.ownerCt.ownerCt;var e=f.aw.requiredData[0].data.specialSupplier;if(e){var h=this;var g=h.items.itemAt(2);g.hide();g.setVisible(false);g.hideParent=true;g.hidden=true;g.disable();g.disabled=true;h.remove(g,true)}}}}]}