{xtype:"form",border:false,width:470,markDataDirtyOnLoad:true,items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:540,width:470,defaults:{},items:[{title:"Details",layout:"form",border:true,labelWidth:120,height:540,autoScroll:true,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{html:"<center><b><u>Payment Conditions</u></b></center>",border:false,hideBorders:false,width:440,height:20},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"&nbsp;",width:20},{html:"Full Payment with in",width:100},{xtype:"numberfield",readOnly:true,name:"fullPytPriorDays",bodyStyle:"padding: 0 4px;",width:40,mode:"local",displayField:"numeric",triggerAction:"all",store:TDS.data.salutationsoh},{html:"days",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{html:"&nbsp;",width:20},{html:"Deposit within",width:100},{xtype:"numberfield",readOnly:true,name:"depositWithinDays",bodyStyle:"padding: 0 4px;",width:40},{html:"days",bodyStyle:"padding: 0 0 0 4px;",width:30},{xtype:"textfield",name:"depositPerOption",bodyStyle:"padding: 0 4px;",width:115}]},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:1},defaults:{border:false},items:[{xtype:"textarea",height:50,readOnly:true,name:"depositWithInDiscription",bodyStyle:"padding: 0 0 0 4px;",border:false,width:420}]},{html:'<hr align="left" />',border:false,width:420},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"&nbsp;",width:20},{html:"Balance Due",width:100},{xtype:"numberfield",readOnly:true,name:"balancePriorToDepartureDay",width:40},{html:"days prior to departure from destination",bodyStyle:"padding: 0 4px;"}]},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:1},defaults:{border:false},items:[{xtype:"textarea",height:50,readOnly:true,name:"balanceDueDiscription",bodyStyle:"padding: 0 0 0 4px;",border:false,width:420}]},{html:'<hr align="left" />',border:false,width:420},{xtype:"panel",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"&nbsp;",width:20},{xtype:"checkbox",name:"autoCancel",boxLabel:"Auto Cancel",forceSubmit:true,readOnly:true,width:100},{xtype:"numberfield",name:"bufferCancelDays",boxLabel:"Buffer Days",readOnly:true,width:40},{html:"&nbsp;&nbsp;Buffer Days"}]},{xtype:"panel",border:false,width:465,height:220,style:"padding: 0px 0px 0px 2px;",defaults:{border:false,style:"padding: 0px 0px 0px 0px;"},items:[{xtype:"panel",width:460,height:200,border:true,detailsTpl:new Ext.XTemplate('<div style="height:196px; width:447px; overflow-x:auto ; overflow-y: auto; padding-left:5px; padding-right:5px; ">{defaultOfferingTermsAndConditions}</div>'),listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");if(a.aw.data.defaultOfferingTermsAndConditions){this.detailsTpl.overwrite(this.body,{defaultOfferingTermsAndConditions:a.aw.data.defaultOfferingTermsAndConditions})}}}},{xtype:"checkbox",name:"tcApplyToAllOfferings",boxLabel:"Apply these terms and conditions to all offerings",style:"padding: 0; margin-top: 0px;",forceSubmit:true,readOnly:true,width:410}]}]},{title:"Help",xtype:"panel",style:"padding: 0; margin-top: 4px;",border:false,layout:"table",width:515,layoutConfig:{columns:1},defaults:{border:false},items:[{html:'<div style="height:300px; width:407px; overflow-x:auto ; overflow-y: auto; padding-left:5px; padding-right:5px; "><br>The Default Terms and Conditions allow a supplier to set the payment conditions and terms globally, that is for each offering (or component) within their inventory, if applicable.<br><br>This can avoid having to setup separate terms for each offering. By selecting the tick box, at the bottom of the screen, (Apply these terms and conditions to all offerings) all the terms will be duplicated on the terms and conditions screen for each offering. It is then possible to edit these terms, if required.<br><br>The terms and conditions that display on each offering (or component) are the ones that can be viewed by travel agent users.<br></div>'}]}]}]}