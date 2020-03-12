{xtype:"form",border:false,markDataDirtyOnLoad:true,items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:380,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:120,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",name:"name",fieldLabel:"Name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"supplierArenaCode",fieldLabel:"ARENA code",bodyStyle:"padding: 2px 4px 2px 4px;",width:40},{xtype:"combo",name:"homeCurrency",store:TDS.data.currencies,fieldLabel:"Home currency",width:180,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"value",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{value}</span></div></tpl>',value:"..."},{xtype:"textfield",name:"addressLine1",fieldLabel:"Address",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"websiteURL",fieldLabel:"Website address",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"locality",fieldLabel:"Locality",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"state",fieldLabel:"State",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"postcode",fieldLabel:"Postcode",bodyStyle:"padding: 2px 4px 2px 4px;",width:60},{xtype:"combo",name:"countryURI",fieldLabel:"Country",emptyText:"Type a country...",minChars:1,enableKeyEvents:true,hideTrigger:true,mode:"local",width:160,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection/custom",identifier:"countries",fields:["name","dataURI"]})},{xtype:"textfield",name:"email",fieldLabel:"Email",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"phoneNumber",fieldLabel:"Phone number",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"textfield",name:"fax",fieldLabel:"Fax",bodyStyle:"padding: 2px 4px 2px 4px;",width:120}]}]},{title:"Components",items:{xtype:"panel",border:false,layout:"form",labelWidth:120,defaults:{xtype:"checkbox",labelSeparator:"",inputValue:"true"},items:[{name:"permittedComponentAccommodation",fieldLabel:"Permitted components",labelSeparator:":",boxLabel:"Accommodation"},{name:"permittedComponentAttraction",boxLabel:"Services"},{name:"permittedComponentCar",boxLabel:"Car rental"},{name:"permittedComponentCruise",boxLabel:"Cruise"},{name:"permittedComponentFlight",boxLabel:"Air"},{name:"permittedComponentHostel",boxLabel:"Hostel"},{name:"permittedComponentRail",boxLabel:"Rail"},{name:"permittedComponentRailPass",boxLabel:"Rail Pass"},{name:"permittedComponentTour",boxLabel:"Tour"},{name:"permittedComponentTransfer",boxLabel:"Transfer"},{name:"permittedComponentSightseeing",boxLabel:"Day Tour"}]}},{title:"Alerts",items:{xtype:"panel",layout:"form",border:false,labelWidth:140,items:[{xtype:"textfield",name:"welcorpUsername",fieldLabel:"Communications username",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"textfield",name:"welcorpPassword",fieldLabel:"Communications password",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"textfield",name:"welcorpConfirmPassword",fieldLabel:"Confirm communications password",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"textfield",name:"alertEmailAddress",fieldLabel:"Email alert address",bodyStyle:"padding: 2px 4px 2px 4px;",width:180},{xtype:"textfield",name:"alertSMSNumber",fieldLabel:"SMS alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100},{xtype:"textfield",name:"alertFaxNumber",fieldLabel:"Fax alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100},{xtype:"textfield",name:"alertTTVNumber",fieldLabel:"Text-to-voice alert number",bodyStyle:"padding: 2px 4px 2px 4px;",width:100}]}},{title:"Additional Info.",items:{xtype:"panel",layout:"form",border:false,labelAlign:"right",labelWidth:140,defaults:{border:false,bodyStyle:"padding: 2px 4px 2px 4px;",labelAlign:"right",width:180,hideBorders:true},items:[{html:"<u><b>Supplier's Additional Information</b></u>",style:"padding: 2px 4px 2px 64px;",width:300},{html:"",height:20},{xtype:"textfield",fieldLabel:"Abbreviated Name"},{xtype:"textfield",fieldLabel:"CEO/General Manager"},{xtype:"textfield",fieldLabel:"Email"},{xtype:"textfield",fieldLabel:"Finance Manager/CFO"},{xtype:"textfield",fieldLabel:"Email"},{xtype:"textfield",fieldLabel:"Reservation Manager"},{xtype:"textfield",fieldLabel:"Email"}]}}]}]}