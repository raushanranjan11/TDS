{xtype:"form",border:false,markDataDirtyOnLoad:true,fieldMap:{rateClass:"rateClassURI",ratePer:"ratePerURI",rateOccupancy:"rateOccupancyURI",defaultMaxHoldTimeSeconds:["defaultMaxHoldTimeHours","defaultMaxHoldTimeMinutes"]},beforeSubmit:function(b){b.defaultMaxHoldTimeSeconds=0;if(typeof b.defaultMaxHoldTimeHours==="number"){b.defaultMaxHoldTimeSeconds+=parseInt(b.defaultMaxHoldTimeHours)*60*60}if(typeof b.defaultMaxHoldTimeMinutes==="number"){b.defaultMaxHoldTimeSeconds+=parseInt(b.defaultMaxHoldTimeMinutes)*60}if(isNaN(b.defaultMaxHoldTimeSeconds)||b.defaultMaxHoldTimeSeconds==0){delete b.defaultMaxHoldTimeSeconds}return b},beforeDataLoad:function(f,g){var e=f.defaultMaxHoldTimeSeconds;f.defaultMaxHoldTimeHours=Math.floor(parseInt(f.defaultMaxHoldTimeSeconds)/60/60);if(f.defaultMaxHoldTimeHours>0){e-=f.defaultMaxHoldTimeHours*60*60}f.defaultMaxHoldTimeMinutes=e/60;if(f.agencyURI){f.rateAvailableForAgencyOnly=true}var h=g.getRequiredData("supplier");f.restrictions=h.data.defaultRateTermsAndConditions;return f},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:370,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:135,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",name:"name",fieldLabel:"Rate name",width:185},{xtype:"textfield",name:"nameLocale",fieldLabel:"Rate name (Alt Language)",width:185},{xtype:"textfield",name:"code",fieldLabel:"Code",width:60},{xtype:"combo",name:"rateClassURI",fieldLabel:"Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]})},{xtype:"combo",name:"ratePerURI",fieldLabel:"Per",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/pers/collection",identifier:"rate/pers",fields:["name","dataURI"]})},{xtype:"combo",name:"railClass",fieldLabel:"Class",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"value",valueField:"value",store:TDS.data.railClasses},{columnWidth:4,border:false,bodyStyle:"padding-right: 12px;",items:{title:"",height:60,border:false,layout:"table",layoutConfig:{columns:2},defaults:{style:"margin: 2px 0;"},items:[{xtype:"radio",boxLabel:"Seat",name:"seat",width:134,listeners:{check:function(e,d){var f=this.ownerCt.items.itemAt(3);if(d){f.disable();f.setValue("")}else{f.enable().focus(false,10)}}}},{xtype:"",disabled:true,name:"",border:false,width:40},{xtype:"radio",boxLabel:"Cabin Type",name:"seat",listeners:{check:function(e,d){var f=this.ownerCt.items.itemAt(3);if(d){f.enable().focus(false,10)}else{f.disable();f.setValue("")}}}},{xtype:"combo",name:"railSeat",fieldLabel:"Cabin Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"value",valueField:"value",store:TDS.data.railCabinType},{xtype:"combo",name:"rateOccupancyURI",forceSubmit:true,value:"rate/occupancy/1",fieldLabel:"Share",mode:"local",width:110,hidden:true,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/occupancies/collection",identifier:"rate/occupancies",fields:["name","dataURI"]})}]}},{xtype:"checkbox",name:"active",fieldLabel:"Active",inputValue:true},{xtype:"checkbox",name:"special",fieldLabel:"Special",inputValue:"true"},{xtype:"panel",style:"padding: 0;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Inventory Max. hold time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultMaxHoldTimeHours",maxValue:23},{html:"hours",bodyStyle:"padding: 0 4px;"},{xtype:"omnicrementer",name:"defaultMaxHoldTimeMinutes",maxValue:59},{html:"minutes",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{html:"Inventory Cut-off time:",width:Ext.isIE?140:138},{xtype:"omnicrementer",name:"defaultCutoffTimeDays",value:0,forceSubmit:true,maxValue:30},{html:"days",bodyStyle:"padding: 0 4px;"}]}]}]},{title:"Pricing",items:[{xtype:"panel",border:false,items:[{xtype:"panel",anchor:"100%",border:false,height:350,items:[{xtype:"panel",border:false,items:[{xtype:"panel",layout:"table",style:" padding-left: 35px;padding-top:5px; ",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{xtype:"radio",name:"cruiseLink",boxLabel:"Pricing",inputValue:false,listeners:{render:function(){},check:function(b,a){if(a){this.ownerCt.ownerCt.ownerCt.items.itemAt(2).disable();this.ownerCt.ownerCt.ownerCt.items.itemAt(1).enable()}}}},{width:50},{xtype:"radio",name:"cruiseLink",boxLabel:"Package Pricing",inputValue:true,listeners:{render:function(){},check:function(b,a){if(a){this.ownerCt.ownerCt.ownerCt.items.itemAt(1).disable();this.ownerCt.ownerCt.ownerCt.items.itemAt(2).enable()}}}}]}]},{xtype:"pricepanel"},{xtype:"packagepricepanel"}]}]}]},{title:"CUG",items:[{xtype:"panel",layout:"table",border:false,hideBorders:true,showLoadMask:false,layoutConfig:{columns:5},initAgency:function(){var b=this.getAgencyURIField().getValue();if(b){this.showLoadMask=true;this.lookupAgencyByURI(b)}},lookupAgencyByURI:function(b){this.lookupAgency(false,b)},lookupAgencyByAgencyArenaCode:function(b){this.lookupAgency(b,false)},lookupAgency:function(e,f){if(this.showLoadMask){this.el.mask("","x-mask-loading")}var d={};if(e){d.agencyArenaCode=e}if(f){d.agencyURI=f}Ext.Ajax.request({url:TDS.env.dataPath+"search/agencies/collection",disableCaching:false,method:"GET",params:d,callback:function(b,m,k){if(this.showLoadMask){this.showLoadMask=false;this.el.unmask()}this.getLookupButton().enable();if(m){try{var l=Ext.decode(k.responseText);var a=l["search/agencies?"+Ext.urlEncode(d)][0];if(!a){this.setAgencyLabel("No agent found.");return}this.setAgencyLabel(l[a]["name"]);this.setAgencyArenaCodeField(l[a]["agencyArenaCode"]);this.setAgencyAddressLabel(l[a]["addressString"]);this.setAgencyURIField(a)}catch(c){}}else{this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>')}},scope:this})},getLookupButton:function(){return this.items.itemAt(5)},getRateAvailableForAgencyField:function(){return this.items.itemAt(0)},getAgencyURIField:function(){return this.items.itemAt(7)},getAgencyArenaCodeField:function(){return this.items.itemAt(4)},setAgencyArenaCodeField:function(b){this.getAgencyArenaCodeField().setValue(b)},setAgencyURIField:function(b){this.getAgencyURIField().setValue(b)},setAgencyLabel:function(b){this.items.itemAt(9).setText(b)},setAgencyAddressLabel:function(b){this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">'+b+"</span>")},clearAllFields:function(){this.setAgencyLabel("");this.setAgencyAddressLabel("");this.setAgencyURIField("")},items:[{xtype:"checkbox",name:"rateAvailableForAgencyOnly",forceSubmit:true,width:20},{colspan:4,html:"Rate is only available to specific agent only.",width:320},{width:20},{html:"Agent code:",width:80},{xtype:"textfield",name:"agencyArenaCode",width:60},{xtype:"button",text:"Lookup",width:60,handler:function(){var b=this.ownerCt;this.disable();b.clearAllFields();b.setAgencyLabel("Lookup in progress...");b.lookupAgencyByAgencyArenaCode(b.getAgencyArenaCodeField().getValue())}},{width:120},{xtype:"hidden",name:"agencyURI",forceSubmit:true,width:20},{html:"Agent:",width:80},{colspan:3,xtype:"labelpanel",html:"Not set",width:240},{colspan:2,width:100},{colspan:3,xtype:"labelpanel",width:240}],listeners:{render:function(){this.initAgency()}}},{html:"<div><center></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>",width:320,border:false}]},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"restrictions",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}}]}]}