{xtype:"form",border:false,fieldMap:{rateClass:"rateClassURI",ratePer:"ratePerURI",rateOccupancy:"rateOccupancyURI",defaultMaxHoldTimeSeconds:["defaultMaxHoldTimeHours","defaultMaxHoldTimeMinutes"]},beforeSubmit:function(a){a.defaultMaxHoldTimeSeconds=0;if(typeof a.defaultMaxHoldTimeHours==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeHours)*60*60}if(typeof a.defaultMaxHoldTimeMinutes==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeMinutes)*60}if(isNaN(a.defaultMaxHoldTimeSeconds)||a.defaultMaxHoldTimeSeconds==0){delete a.defaultMaxHoldTimeSeconds}return a},beforeDataLoad:function(a){var b=a.defaultMaxHoldTimeSeconds;a.defaultMaxHoldTimeHours=Math.floor(parseInt(a.defaultMaxHoldTimeSeconds)/60/60);if(a.defaultMaxHoldTimeHours>0){b-=a.defaultMaxHoldTimeHours*60*60}a.defaultMaxHoldTimeMinutes=b/60;if(a.agencyURI){a.rateAvailableForAgencyOnly=true}return a},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:330,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:135,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",name:"name",fieldLabel:"Rate name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"nameLocale",fieldLabel:"Rate name (Alt Language)",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"code",fieldLabel:"Code",bodyStyle:"padding: 2px 4px 2px 4px;",width:60},{xtype:"combo",name:"rateClassURI",fieldLabel:"Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]})},{xtype:"combo",name:"ratePerURI",fieldLabel:"Per",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]})},{xtype:"combo",name:"rateOccupancyURI",fieldLabel:"Room type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]})},{xtype:"checkbox",name:"active",fieldLabel:"Publish",inputValue:true},{xtype:"checkbox",name:"special",fieldLabel:"Special",inputValue:"true"},{xtype:"panel",style:"padding: 0;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Max. hold time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultMaxHoldTimeHours",forceSubmit:true,maxValue:23},{html:"hours",bodyStyle:"padding: 0 4px;"},{xtype:"omnicrementer",name:"defaultMaxHoldTimeMinutes",forceSubmit:true,maxValue:59},{html:"minutes",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{html:"Cut-off time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultCutoffTimeDays",maxValue:30},{html:"days",bodyStyle:"padding: 0 4px;"}]}]}]},{title:"Pricing",items:{xtype:"pricepanel"}},{title:"CUG",items:{xtype:"panel",layout:"table",border:false,hideBorders:true,showLoadMask:false,layoutConfig:{columns:5},initAgency:function(){var a=this.getAgencyURIField().getValue();if(a){this.showLoadMask=true;this.lookupAgencyByURI(a)}},lookupAgencyByURI:function(a){this.lookupAgency(false,a)},lookupAgencyByAgencyArenaCode:function(a){this.lookupAgency(a,false)},lookupAgency:function(a,c){if(this.showLoadMask){this.el.mask("","x-mask-loading")}var b={};if(a){b.agencyArenaCode=a}if(c){b.agencyURI=c}Ext.Ajax.request({url:TDS.env.dataPath+"search/agencies/collection",disableCaching:false,method:"GET",params:b,callback:function(i,d,g){if(this.showLoadMask){this.showLoadMask=false;this.el.unmask()}this.getLookupButton().enable();if(d){try{var f=Ext.decode(g.responseText);var j=f["search/agencies?"+Ext.urlEncode(b)][0];if(!j){this.setAgencyLabel("No agent found.");return}this.setAgencyLabel(f[j]["name"]);this.setAgencyArenaCodeField(f[j]["agencyArenaCode"]);this.setAgencyAddressLabel(f[j]["addressString"]);this.setAgencyURIField(j)}catch(h){}}else{this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>')}},scope:this})},getLookupButton:function(){return this.items.itemAt(5)},getRateAvailableForAgencyField:function(){return this.items.itemAt(0)},getAgencyURIField:function(){return this.items.itemAt(7)},getAgencyArenaCodeField:function(){return this.items.itemAt(4)},setAgencyArenaCodeField:function(a){this.getAgencyArenaCodeField().setValue(a)},setAgencyURIField:function(a){this.getAgencyURIField().setValue(a)},setAgencyLabel:function(a){this.items.itemAt(9).setText(a)},setAgencyAddressLabel:function(a){this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">'+a+"</span>")},clearAllFields:function(){this.setAgencyLabel("");this.setAgencyAddressLabel("");this.setAgencyURIField("")},items:[{xtype:"checkbox",name:"rateAvailableForAgencyOnly",forceSubmit:true,width:20},{colspan:4,html:"Rate is only available to specific agent only.",width:320},{width:20},{html:"Agent code:",width:80},{xtype:"textfield",name:"agencyArenaCode",width:60},{xtype:"button",text:"Lookup",width:60,handler:function(){var a=this.ownerCt;this.disable();a.clearAllFields();a.setAgencyLabel("Lookup in progress...");a.lookupAgencyByAgencyArenaCode(a.getAgencyArenaCodeField().getValue())}},{width:120},{xtype:"hidden",name:"agencyURI",forceSubmit:true,width:20},{html:"Agent:",width:80},{colspan:3,xtype:"labelpanel",html:"Not set",width:240},{colspan:2,width:100},{colspan:3,xtype:"labelpanel",width:240}],listeners:{render:function(){this.initAgency()}}}},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"restrictions",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}}]}]}