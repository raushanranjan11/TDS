{xtype:"form",border:false,items:[{xtype:"tabpanel",activeTab:0,deferredRender:false,layoutOnTabChange:true,height:300,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",border:false,hideBorders:true,items:[{xtype:"panel",layout:"form",border:false,labelWidth:70,height:190,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",name:"nameFirst",fieldLabel:"Name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"nameLast",fieldLabel:"Last name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"combo",store:TDS.data.salutations,name:"salutation",fieldLabel:"Title",width:90,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text",value:"..."},{xtype:"textfield",name:"emailAddress",fieldLabel:"Email",bodyStyle:"padding: 2px 4px 2px 4px;",width:260},{xtype:"fieldset",checkboxToggle:true,title:"Change password",autoHeight:true,labelWidth:110,defaults:{xtype:"textfield",width:150,inputType:"password"},collapsed:true,items:[{fieldLabel:"New password",name:"password",allowBlank:false},{fieldLabel:"Confirm password",name:"confirmPassword",allowBlank:false}]}]},{html:'<hr align="left" />',width:385},{layout:"form",border:false,labelWidth:150,labelAlign:"right",defaults:{bodyStyle:"padding: 10px 4px 2px 10px;",border:false,labelAlign:"right",hideBorders:true,readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;",width:200},items:[{xtype:"textfield",fieldLabel:"TDSMedia Username",name:"emailAddress"},{xtype:"textfield",name:"password",fieldLabel:"Password"}]}]},{title:"Permissions",items:{xtype:"panel",border:false,items:[{xtype:"checkbox",name:"userTypeSupplierManagement",boxLabel:"<b>Management</b><br/>Has access to modify supplier details and create new users.",forceSubmit:true},{xtype:"checkbox",name:"userTypeSupplierInventoryManagement",boxLabel:"<b>Inventory management</b><br/>Has access to create or modify permitted offerings.",forceSubmit:true},{xtype:"checkbox",name:"userTypeSupplierFulfillment",boxLabel:"<b>Fulfillment</b><br/>Has access to fulfillment tasks.",forceSubmit:true}]}}]}]}