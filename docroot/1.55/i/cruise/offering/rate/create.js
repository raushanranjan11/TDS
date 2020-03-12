{xtype:"form",border:false,height:350,markDataDirtyOnLoad:true,fieldMap:{rateClass:"rateClassURI",ratePer:"ratePerURI",rateOccupancy:"rateOccupancyURI",defaultMaxHoldTimeSeconds:["defaultMaxHoldTimeHours","defaultMaxHoldTimeMinutes"]},beforeSubmit:function(a){a.defaultMaxHoldTimeSeconds=0;if(typeof a.defaultMaxHoldTimeHours==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeHours)*60*60}if(typeof a.defaultMaxHoldTimeMinutes==="number"){a.defaultMaxHoldTimeSeconds+=parseInt(a.defaultMaxHoldTimeMinutes)*60}if(isNaN(a.defaultMaxHoldTimeSeconds)||a.defaultMaxHoldTimeSeconds==0){delete a.defaultMaxHoldTimeSeconds}return a},beforeDataLoad:function(a,d){var b=a.defaultMaxHoldTimeSeconds;a.defaultMaxHoldTimeHours=Math.floor(parseInt(a.defaultMaxHoldTimeSeconds)/60/60);if(a.defaultMaxHoldTimeHours>0){b-=a.defaultMaxHoldTimeHours*60*60}a.defaultMaxHoldTimeMinutes=b/60;if(a.agencyURI){a.rateAvailableForAgencyOnly=true}var c=d.getRequiredData("supplier");a.restrictions=c.data.defaultRateTermsAndConditions;return a},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:350,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:95,defaults:{},items:[{xtype:"textfield",fieldLabel:"Category",emptyText:"E!",name:"name",width:210},{xtype:"textfield",hidden:true,fieldLabel:"Discription",name:"category",width:210},{xtype:"textfield",fieldLabel:"Code",name:"grade",width:210},{xtype:"panel",style:"padding-bottom: 4px;",border:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{html:"Deck:",width:100},{xtype:"combo",name:"deck",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:70,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"text",valueField:"text",store:TDS.data.cruiseDeckNew},{width:7,html:""},{xtype:"textfield",name:"deckDescription",emptyText:"Deck Description",fieldLabel:"Deck ",width:150}]},{xtype:"combo",name:"position",excludeSubmit:true,minChars:1,fieldLabel:"Position",enableKeyEvents:true,mode:"local",width:70,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"text",valueField:"text",store:TDS.data.cruisePositions},{xtype:"panel",style:"padding-bottom: 4px;",border:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{html:"Pax Type:",width:100},{xtype:"combo",name:"rateClassURI",fieldLabel:"Pax Type",mode:"local",width:110,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",tpl:TDS.util.Templates.ComboNoLabel,store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/classes/collection",identifier:"rate/classes",fields:["name","dataURI"]}),listeners:{select:function(c,b,a){if(a==2){Ext.getCmp("ageBelowId").enable()}else{Ext.getCmp("ageBelowId").disable()}}}},{width:5},{width:27,html:"Age:"},{xtype:"combo",name:"ages",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:70,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"text",valueField:"text",store:TDS.data.ages}]},{xtype:"textfield",fieldLabel:"Price Code",name:"priceCode",width:60},{xtype:"panel",style:"padding: 0px 0px 4px 0px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{xtype:"checkbox",name:"active",fieldLabel:"Active",boxLabel:"Active",inputValue:true,width:100},{xtype:"checkbox",name:"special",fieldLabel:"Special",boxLabel:"Special",inputValue:"true"}]},{xtype:"panel",style:"padding: 0;",border:false,style:"padding: 0; margin-top: 4px;",layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Inventory Max. hold time:",width:Ext.isIE?100:100},{xtype:"omnicrementer",name:"defaultMaxHoldTimeHours",maxValue:23},{html:"hours",bodyStyle:"padding: 0 4px;"},{xtype:"omnicrementer",name:"defaultMaxHoldTimeMinutes",maxValue:59},{html:"minutes",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{html:"Cut-off time:",width:Ext.isIE?100:100},{xtype:"omnicrementer",name:"defaultCutoffTimeDays",value:0,forceSubmit:true,maxValue:30},{html:"days",bodyStyle:"padding: 0 4px;"}]}]}]},{title:"Pricing",items:{xtype:"pricepanel"}},{title:"CUG",items:[{xtype:"panel",layout:"table",border:false,hideBorders:true,showLoadMask:false,layoutConfig:{columns:5},initAgency:function(){var a=this.getAgencyURIField().getValue();if(a){this.showLoadMask=true;this.lookupAgencyByURI(a)}},lookupAgencyByURI:function(a){this.lookupAgency(false,a)},lookupAgencyByAgencyArenaCode:function(a){this.lookupAgency(a,false)},lookupAgency:function(a,c){if(this.showLoadMask){this.el.mask("","x-mask-loading")}var b={};if(a){b.agencyArenaCode=a}if(c){b.agencyURI=c}Ext.Ajax.request({url:TDS.env.dataPath+"search/agencies/collection",disableCaching:false,method:"GET",params:b,callback:function(i,d,g){if(this.showLoadMask){this.showLoadMask=false;this.el.unmask()}this.getLookupButton().enable();if(d){try{var f=Ext.decode(g.responseText);var j=f["search/agencies?"+Ext.urlEncode(b)][0];if(!j){this.setAgencyLabel("No agent found.");return}this.setAgencyLabel(f[j]["name"]);this.setAgencyArenaCodeField(f[j]["agencyArenaCode"]);this.setAgencyAddressLabel(f[j]["addressString"]);this.setAgencyURIField(j)}catch(h){}}else{this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>')}},scope:this})},getLookupButton:function(){return this.items.itemAt(5)},getRateAvailableForAgencyField:function(){return this.items.itemAt(0)},getAgencyURIField:function(){return this.items.itemAt(7)},getAgencyArenaCodeField:function(){return this.items.itemAt(4)},setAgencyArenaCodeField:function(a){this.getAgencyArenaCodeField().setValue(a)},setAgencyURIField:function(a){this.getAgencyURIField().setValue(a)},setAgencyLabel:function(a){this.items.itemAt(9).setText(a)},setAgencyAddressLabel:function(a){this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">'+a+"</span>")},clearAllFields:function(){this.setAgencyLabel("");this.setAgencyAddressLabel("");this.setAgencyURIField("")},items:[{xtype:"checkbox",name:"rateAvailableForAgencyOnly",forceSubmit:true,width:20},{colspan:4,html:"Rate is only available to specific agent only.",width:320},{width:20},{html:"Agent code:",width:80},{xtype:"textfield",name:"agencyArenaCode",width:60},{xtype:"button",text:"Lookup",width:60,handler:function(){var a=this.ownerCt;this.disable();a.clearAllFields();a.setAgencyLabel("Lookup in progress...");a.lookupAgencyByAgencyArenaCode(a.getAgencyArenaCodeField().getValue())}},{width:120},{xtype:"hidden",name:"agencyURI",forceSubmit:true,width:20},{html:"Agent:",width:80},{colspan:3,xtype:"labelpanel",html:"Not set",width:240},{colspan:2,width:100},{colspan:3,xtype:"labelpanel",width:240}],listeners:{render:function(){this.initAgency()}}},{html:"<div><center></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>",width:320,border:false}]},{title:"Category",layout:"fit",bodyStyle:"padding: 0px 0px 0px 0px;",items:{xtype:"htmleditor",name:"restrictions",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}}]}]}