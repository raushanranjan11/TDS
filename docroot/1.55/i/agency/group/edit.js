{xtype:"form",border:false,height:180,width:250,markDataDirtyOnLoad:true,beforeSubmit:function(a){var b=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items;if(b.itemAt(5).checked){a.status="A"}else{if(b.itemAt(6).checked){a.status="C"}else{if(b.itemAt(7).checked){a.status="S"}else{if(b.itemAt(4).checked){a.status="I"}else{a.status="I"}}}}return a},items:{xtype:"tabpanel",border:false,defaults:{border:false},activeTab:0,layoutOnTabChange:true,height:330,items:[{title:"Agent",items:{xtype:"panel",border:false,bodyStyle:"padding:  6px 4px 6px 4px; ",defaults:{labelSeparator:""},items:[{xtype:"panel",style:"padding: 0;",border:false,hideBorders:true,layout:"table",labelWidth:480,bodyStyle:"padding: 0 2px 4px 0px;",width:480,layoutConfig:{columns:2},items:[{html:"Agent name:",bodyStyle:"padding: 2px 23px 2px 0;"},{xtype:"textfield",name:"name",fieldLabel:"Agent name",readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;"},{xtype:"textfield",name:"parentDatURI",forceSubmit:true,hidden:true}]},{html:" ",border:false,height:5},{xtype:"panel",style:"padding: 0;",border:false,hideBorders:true,layout:"table",labelWidth:480,bodyStyle:"padding: 0 2px 4px 0px;",width:480,layoutConfig:{columns:2},items:[{html:"Franchise Name:",bodyStyle:"padding: 2px 2px 2px 0;"},{xtype:"textfield",name:"franchise",readOnly:true,style:"border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;"}]},{html:" ",border:false,height:5},{xtype:"radio",name:"status",forceSubmit:true,value:"I",boxLabel:"Make In Active"},{xtype:"radio",name:"status",forceSubmit:true,value:"A",boxLabel:"Make Active"},{xtype:"radio",name:"status",forceSubmit:true,value:"C",boxLabel:"Cancel"},{xtype:"radio",name:"status",forceSubmit:true,value:"S",boxLabel:"Suspend"}]}}],listeners:{render:function(){var a=this.ownerCt.ownerCt.initialConfig.record.json;var b=this.items.itemAt(0).items.itemAt(0).items;if(a.status=="A"){b.itemAt(5).checked=true}else{if(a.status=="C"){b.itemAt(6).checked=true}else{if(a.status=="S"){b.itemAt(7).checked=true}else{b.itemAt(4).checked=true}}}b.itemAt(2).items.itemAt(1).setValue(a.franchise);b.itemAt(0).items.itemAt(1).setValue(a.name);b.itemAt(0).items.itemAt(2).setValue(a.parentDatURI)}}}}