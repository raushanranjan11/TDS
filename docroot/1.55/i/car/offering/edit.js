{xtype:"form",border:false,beforeSubmit:function(a){var d=[];var b=this.items.itemAt(0).items.itemAt(4).items.itemAt(0).getSelections();for(var c=0;c<b.length;c++){d[c]=b[c].data.dataURI}a.depotsJSON=d;var f=[];var e=this.items.itemAt(0).items.itemAt(5).items.itemAt(0).store.data.items;for(var c=0;c<e.length;c++){f[c]=e[c].data}a.hrefs=f;return a},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:300,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:120,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",name:"name",fieldLabel:"Vehicle",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"codeSupplier",fieldLabel:"Vehicle code",bodyStyle:"padding: 2px 4px 2px 4px;",width:100},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:"Advertised rate:",width:Ext.isIE?125:125},{xtype:"textfield",allowBlank:false,name:"rackRatePriceSell",fieldLabel:"Advertised rate",name:"rackRatePriceSell",width:60},{html:" ",width:Ext.isIE?12:12},{xtype:"combo",forceSubmit:true,name:"pricingPriceIsNett",mode:"local",width:60,triggerAction:"all",editable:false,value:"false",store:[["false","Gross"],["true","Nett"]]}]},{xtype:"combo",name:"carTypeURI",mode:"local",fieldLabel:"Vehicle type",width:120,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"car/types/collection",identifier:"car/types",fields:["name","dataURI"]})},{xtype:"combo",allowBlank:false,name:"carVehicleSizeURI",mode:"local",fieldLabel:"Vehicle Size",width:120,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"car/vehicleSizes/collection",identifier:"car/vehicleSizes",fields:["name","dataURI"]})},{xtype:"checkbox",name:"commercial",fieldLabel:"Commercial",inputValue:"true"},{xtype:"checkbox",name:"automaticTransmission",fieldLabel:"Automatic transmission",inputValue:"true"},{xtype:"omnicrementer",name:"capacityPeople",fieldLabel:"Number of seats"},{xtype:"omnicrementer",name:"minimumAgeRequired",fieldLabel:"Min. age required",value:24}]}]},{title:"Description",layout:"form",items:{xtype:"htmleditor",name:"description",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"notes",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Localisation",layout:"form",items:[{html:"<p>Name:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"textfield",name:"nameLocale",hideLabel:true,labelSeparator:"",anchor:"100%"},{html:"<p>Description:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"htmleditor",name:"descriptionLocale",height:"auto",hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}]},{title:"Depots",layout:"fit",items:{xtype:"grid",viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Depot",dataIndex:"name"},{header:"Address",dataIndex:"addressString"}],listeners:{beforerender:function(){var a=this.ownerCt.findParentByType("awesomewindow");var b=a.initialConfig.requiredData[0].dataURI;this.store=new Ext.data.CollectionStore({autoLoad:true,identifier:b+"/depots",url:TDS.env.dataPath+b+"/depots/collection",fields:["dataURI","name","addressString"],listeners:{load:{fn:function(){this.destinationDataURI=TDS.env.dataPath+a.getConfigValue("destinationDataURI");this.getSelectedData()},scope:this}}})}}}},{title:"Links",layout:"fit",items:{xtype:"editorgrid",loadMask:{msg:""},height:240,viewConfig:{forceFit:true},store:new Ext.data.JsonStore({url:"",pruneModifiedRecords:true,fields:["dataURI","href","description"]}),getData:function(){var c=this.getStore().getModifiedRecords();for(var b=0,e=[];b<c.length;b++){var a=c[b].get("dataURI");e.push({method:a?"PUT":"POST",destinationDataURI:a?TDS.env.dataPath+a:this.baseDataURI,data:{href:c[b].get("href"),description:c[b].get("description")}})}return{data:e}},sm:new Ext.grid.RowSelectionModel({singleSelect:true}),cm:new Ext.grid.ColumnModel([{header:"URL",dataIndex:"href",editor:new Ext.form.TextField({allowBlank:false})},{header:"Description",dataIndex:"description",editor:new Ext.form.TextField({allowBlank:false})}]),bbar:[{xtype:"button",text:"Add",tooltip:"Click here to add a new link",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getStore();a.add([new a.recordType({href:"",description:""})]);b.startEditing(a.getCount()-1,0)}},{xtype:"button",text:"Remove",tooltip:"Select a link and click here to remove",handler:function(){var b=this.ownerCt.ownerCt;b.loadMask.show();var a=b.selModel.getSelected();if(a.get("dataURI")){Ext.Ajax.request({method:"DELETE",url:TDS.env.dataPath+a.get("dataURI"),callback:function(e,c,d){b.loadMask.hide();if(c){b.store.remove(a);return}}})}else{b.loadMask.hide();b.store.remove(a)}}}]}}]}]}