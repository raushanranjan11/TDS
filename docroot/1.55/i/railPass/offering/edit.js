{xtype:"form",border:false,beforeSubmit:function(c){var a=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).items.itemAt(2);c.global=false;if(a.checked){c.global=true}if(c.passCategory!="Europe Passes"){c.passSubCategory=""}return c},beforeDataLoad:function(f){var e=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).items.itemAt(1);var c=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).items.itemAt(2);if(f.global){c.setValue(true);e.setValue(false)}else{c.setValue(false);e.setValue(true)}return f},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:350,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:80,defaults:{},items:[{xtype:"textfield",name:"name",readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;",fieldLabel:"Name",width:260},{xtype:"textarea",name:"passDescription",height:40,fieldLabel:"Description",readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;",width:260},{xtype:"textarea",name:"countries",fieldLabel:"Countries",height:60,width:260},{xtype:"omnicrementer",name:"noOfCountries",fieldLabel:"No Of Countries",maxValue:5,width:60},{xtype:"panel",style:"padding: 0; margin-bottom: 4px;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"&nbsp;",width:Ext.isIE?110:110},{xtype:"radio",name:"global",checked:true,boxLabel:"Multi",width:Ext.isIE?65:65},{xtype:"radio",name:"global",boxLabel:"Global",value:true,width:Ext.isIE?110:110}]},{xtype:"panel",style:"padding: 0; margin-bottom: 4px; margin-left: 20px;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{xtype:"textarea",labelSeparator:"",readOnly:true,name:"detailedDescription",height:120,labelWidth:5,width:360}]}]}]},{title:"Description",layout:"form",items:{xtype:"htmleditor",name:"description",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"notes",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Localisation",layout:"form",items:[{html:"<p>Name:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"textfield",name:"nameLocale",hideLabel:true,labelSeparator:"",anchor:"100%"},{html:"<p>Description:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"htmleditor",name:"descriptionLocale",height:"auto",hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}]}]}]}