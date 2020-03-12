{xtype:"form",border:false,items:[{xtype:"tabpanel",activeTab:0,deferredRender:false,layoutOnTabChange:true,height:380,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},listeners:{render:function(){if(!TDS.env.user.hasGroupPermission("ADMINISTRATION")){this.hideTabStripItem(1);this.hideTabStripItem(2)}}},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:120,defaults:{style:"padding: 2px 4px 2px 4px;"},listeners:{render:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){this.items.itemAt(2).show()}}},items:[{name:"name",width:280,border:false,listeners:{render:function(){var d=this.ownerCt.ownerCt.ownerCt.ownerCt;var c=d.ownerCt.aw.data.name;if(c!=null&&c!=""){this.html="Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(c?c:"")}}}},{name:"supplierArenaCode",width:280,border:false,listeners:{render:function(){var d=this.ownerCt.ownerCt.ownerCt.ownerCt;var c=d.ownerCt.aw.data.supplierArenaCode;if(c!=null&&c!=""){this.html="ARENA code:   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+c}}}},{xtype:"combo",name:"homeCurrency",hidden:true,store:TDS.data.currencies,fieldLabel:"Home currency",width:180,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"value",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{value}</span></div></tpl>',value:"..."},{xtype:"textfield",name:"addressLine1",fieldLabel:"Address",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"websiteURL",fieldLabel:"Website address",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"locality",fieldLabel:"Locality",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"state",fieldLabel:"State",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"postcode",fieldLabel:"Postcode",bodyStyle:"padding: 2px 4px 2px 4px;",width:60},{xtype:"combo",name:"countryURI",fieldLabel:"Country",emptyText:"Type a country...",minChars:1,enableKeyEvents:true,hideTrigger:true,mode:"local",width:160,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection/custom",identifier:"countries",fields:["name","dataURI"]})},{xtype:"textfield",name:"email",fieldLabel:"Email",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"phoneNumber",fieldLabel:"Phone number",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"fax",fieldLabel:"Fax",bodyStyle:"padding: 2px 4px 2px 4px;",width:120}]}]},{title:"Components",items:{xtype:"panel",border:false,layout:"form",labelWidth:120,defaults:{xtype:"checkbox",labelSeparator:"",inputValue:"true"},items:[{name:"permittedComponentAccommodation",fieldLabel:"Permitted components",labelSeparator:":",boxLabel:"Accommodation",style:"overflow:auto;"},{name:"permittedComponentAttraction",boxLabel:"Services"},{name:"permittedComponentCar",boxLabel:"Car rental"},{name:"permittedComponentCruise",boxLabel:"Cruise"},{name:"permittedComponentFlight",boxLabel:"Air"},{name:"permittedComponentHostel",boxLabel:"Hostel"},{name:"permittedComponentRail",boxLabel:"Rail"},{name:"permittedComponentRailPass",boxLabel:"Rail Pass"},{name:"permittedComponentTour",boxLabel:"Tour"},{name:"permittedComponentTransfer",boxLabel:"Transfer"},{name:"permittedComponentSightseeing",boxLabel:"Day Tour"}]}},{title:"Alerts",items:{xtype:"panel",layout:"form",border:false,labelWidth:140,items:[{xtype:"textfield",name:"welcorpUsername",fieldLabel:"Communications username",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"fieldset",checkboxToggle:true,title:"Change communications password",autoHeight:true,labelWidth:130,defaults:{xtype:"textfield",width:150,inputType:"password"},collapsed:true,items:[{fieldLabel:"New password",name:"welcorpPassword",allowBlank:false},{fieldLabel:"Confirm password",name:"welcorpConfirmPassword",allowBlank:false}]},{xtype:"textfield",name:"alertEmailAddress",fieldLabel:"Email alert address",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"textfield",name:"alertSMSNumber",fieldLabel:"SMS alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100},{xtype:"textfield",name:"alertFaxNumber",fieldLabel:"Fax alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100},{xtype:"textfield",name:"alertTTVNumber",fieldLabel:"Text-to-voice alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100}]}},{title:"Additional Info.",items:{xtype:"panel",layout:"form",border:false,labelAlign:"left",labelWidth:140,defaults:{border:false,bodyStyle:"padding: 2px 4px 2px 4px;",labelAlign:"left",width:180,hideBorders:true},items:[{html:"<center><u><b>Supplier's Additional Information</b></u></center>",style:"padding: 2px 4px 2px 84px;",width:300},{html:"",height:20},{xtype:"textfield",name:"additionalInfoAbbreviatedName",fieldLabel:"Abbreviated Name"},{xtype:"textfield",name:"additionalInfoCeoGeneralManager",fieldLabel:"CEO/General Manager"},{xtype:"textfield",name:"additionalInfoCeoGeneralManagerEmail",fieldLabel:"Email"},{xtype:"textfield",name:"additionalInfoFinanceManagerCfo",fieldLabel:"Finance Manager/CFO"},{xtype:"textfield",name:"additionalInfoFinanceManagerCfoEmail",fieldLabel:"Email"},{xtype:"textfield",name:"additionalInfoReservationManager",fieldLabel:"Reservation Manager"},{xtype:"textfield",name:"additionalInfoReservationManagerEmail",fieldLabel:"Email"}]}}]}]}