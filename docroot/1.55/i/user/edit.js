{xtype:"form",border:false,trackResetOnLoad:true,items:[{xtype:"tabpanel",activeTab:0,deferredRender:false,layoutOnTabChange:true,height:300,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},listeners:{render:function(){this.hideTabStripItem(2);this.hideTabStripItem(3);this.hideTabStripItem(4)}},items:[{title:"Details",border:false,hideBorders:true,items:[{xtype:"panel",layout:"form",border:false,hideBorders:true,labelWidth:70,height:198,defaults:{hideBorders:true},items:[{xtype:"textfield",name:"nameFirst",fieldLabel:"Name",labelWidth:100,width:185},{xtype:"textfield",name:"nameLast",fieldLabel:"Last name",labelWidth:100,width:185},{xtype:"combo",store:TDS.data.salutations,name:"salutation",fieldLabel:"Title",width:90,labelWidth:100,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text",value:"..."},{xtype:"textfield",name:"emailAddress",fieldLabel:"Email",labelWidth:100,width:260},{xtype:"fieldset",checkboxToggle:true,title:"Change password",autoHeight:true,labelWidth:110,defaults:{xtype:"textfield",width:150,inputType:"password"},collapsed:true,items:[{fieldLabel:"New password",name:"password",allowBlank:false},{fieldLabel:"Confirm password",name:"confirmPassword",allowBlank:false}]}]},{html:'<hr align="left" />',width:385},{layout:"form",border:false,labelWidth:150,labelAlign:"right",defaults:{bodyStyle:"padding: 10px 4px 2px 10px;",border:false,labelAlign:"right",hideBorders:true,readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;",width:200},items:[{xtype:"textfield",fieldLabel:"TDSMedia Username",name:"emailAddress"},{xtype:"textfield",name:"password",fieldLabel:"Password"}]}]},{title:"Permissions",items:{xtype:"panel",border:false,listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.registerItem(this.id);var b=this.items.itemAt(0);this.destinationDataURI=TDS.env.dataPath+a.getConfigValue("sourceDataURI")+"/parentGroups";this.el.mask("","x-mask-loading");Ext.Ajax.request({url:this.destinationDataURI,method:"GET",callback:function(i,d,g){if(d){try{var f=Ext.decode(g.responseText)}catch(h){}if(f){this.items.each(function(e){if(e.xtype=="panel"){e.items.itemAt(0).setValue(f[e.items.itemAt(0).name])}else{e.setValue(f[e.name])}})}}this.el.unmask();var c=a.aw.data.userActive;if(c){b.setValue(c)}},scope:this})}},getData:function(){var a={};this.items.each(function(b){;if(b.xtype=="panel"){a[b.items.itemAt(0).name]=b.items.itemAt(0).getValue();a[b.items.itemAt(2).name]=b.items.itemAt(2).getValue()}else{a[b.name]=b.getValue()}});return{destinationDataURI:this.destinationDataURI,data:a}},items:[{xtype:"checkbox",name:"userActive",boxLabel:"Active",forceSubmit:true},{xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",layoutConfig:{columns:8},defaults:{border:false},items:[{xtype:"checkbox",name:"group/ADMINISTRATION",boxLabel:"Administration",forceSubmit:true,listeners:{check:function(a,b){return;var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(2)}else{c.hideTabStripItem(2)}}}},{html:" Authority Code:",bodyStyle:"padding-left: 20px;"},{xtype:"textfield",inputType:"password",allowBlank:false,name:"authorityCodeFromClint",width:100}]},{xtype:"checkbox",name:"group/SUB_ADMINISTRATION",boxLabel:"Sub Administration",forceSubmit:true,listeners:{check:function(a,b){return;var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(2)}else{c.hideTabStripItem(2)}}}},{xtype:"checkbox",name:"group/BPAY_ADMINISTRATION",boxLabel:"BPAY Administration",forceSubmit:true,listeners:{check:function(a,b){return;var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(2)}else{c.hideTabStripItem(2)}}}},{xtype:"checkbox",name:"group/UPLOAD_ADMINISTRATION",boxLabel:"Upload Administration",forceSubmit:true,listeners:{check:function(a,b){return;var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(2)}else{c.hideTabStripItem(2)}}}},{xtype:"checkbox",name:"group/LOCATION_ADMINISTRATION",boxLabel:"Location Administration",forceSubmit:true,listeners:{check:function(a,b){return;var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(2)}else{c.hideTabStripItem(2)}}}},{xtype:"checkbox",name:"group/AGENCY",boxLabel:"Agency",forceSubmit:true,listeners:{check:function(a,b){var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(3)}else{c.hideTabStripItem(3)}}}},{xtype:"checkbox",name:"group/SUPPLIER",boxLabel:"Supplier",forceSubmit:true,listeners:{check:function(a,b){var c=this.ownerCt.ownerCt.ownerCt;if(b){c.unhideTabStripItem(4)}else{c.hideTabStripItem(4)}}}},{xtype:"checkbox",name:"group/ARENA_MOBILE_API_USER",boxLabel:"Arena mobile API user",forceSubmit:true},{xtype:"checkbox",name:"cannotBeArchived",readOnly:(!TDS.env.user.hasGroupPermission("ADMINISTRATION")),boxLabel:"Cannot be archived or Deleted",forceSubmit:true,listeners:{render:function(){}}}]}},{title:"Administration",items:{xtype:"panel",border:false,html:"<p>To be implemented.</p>"}},{title:"Agency",items:{xtype:"panel",border:false,items:[{xtype:"awesometree",height:250,getData:function(){return{data:this.getModifiedNodes()}},listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.registerItem(this.id);this.getLoader().setDataUrl(TDS.env.dataPath+a.getConfigValue("sourceDataURI"))}},root:{text:"Inventory",baseDataURI:"group/AGENCY",isChild:true,leaf:false}}]}},{title:"Supplier",items:{xtype:"panel",border:false,items:[{xtype:"awesometree",height:250,getData:function(){return{data:this.getModifiedNodes()}},listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.registerItem(this.id);this.getLoader().setDataUrl(TDS.env.dataPath+a.getConfigValue("sourceDataURI"))}},root:{text:"Inventory",baseDataURI:"group/SUPPLIER",isChild:true,leaf:false}}]}}]}]}