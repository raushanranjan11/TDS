{xtype:"form",border:false,markDataDirtyOnLoad:true,beforeSubmit:function(a){if(a.extra!="Add Extra"){a.name=a.extra}var b=this.getForm().findField("availableForAllRates");if(!b.getValue()){var c=this.findByType("grid")[0];a.rateURIs=c.getData()}return a},afterDataLoad:function(b){if(typeof b.availableForAllRates!=="undefined"){var a=this.ownerCt;var c=this.findByType("grid")[0];c.destinationDataURI=TDS.env.dataPath+a.getConfigValue("sourceDataURI")+"/rates"}},beforeDataLoad:function(c,b){var a=b.getRequiredData("supplier");c.termsAndConditions=a.data.defaultExtraTermsAndConditions;return c},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:330,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"auto",height:290,frame:true,items:[{xtype:"panel",layout:"form",border:false,labelWidth:120,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"panel",border:false,layout:"form",items:[{fieldLabel:"Extra's",xtype:"combo",forceSubmit:true,name:"extra",mode:"local",triggerAction:"all",editable:false,displayField:"displayData",valueField:"valueData",width:120,store:new Ext.data.SimpleStore({fields:["valueData","displayData"],data:[["Add Extra","Add Extra"],["Discount","Discount"],["Fees And Taxes","Fees And Taxes"],["Port Charges","Port Charges"],["GST","GST"],["Future Cruise Credits","Future Cruise Credits"],["Special Services","Special Services"],["On Board Credits","On Board Credits"]]}),listeners:{change:function(){if(this.getValue()=="Add Extra"){this.ownerCt.items.itemAt(1).setValue();this.ownerCt.items.itemAt(1).el.dom.readOnly=false;this.ownerCt.items.itemAt(1).selectText()}else{this.ownerCt.items.itemAt(1).el.dom.readOnly=true}}}},{xtype:"textfield",readOnly:true,name:"name",id:"name",fieldLabel:"Name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",name:"nameLocale",fieldLabel:"Name (localisation)",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"combo",name:"extraCategoryURI",mode:"local",fieldLabel:"Category",width:120,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"cruise/extracategories/collection",identifier:"cruise/extracategories",fields:["name","dataURI"]})},{xtype:"checkbox",name:"required",fieldLabel:"Required",inputValue:"true"},{xtype:"checkbox",name:"availableForAllRates",fieldLabel:"Available for all rates",inputValue:"true",listeners:{check:function(b,c){var a=this.ownerCt.ownerCt.items.itemAt(1);if(c){a.disable()}else{a.enable()}}}}]},{xtype:"panel",border:false,items:{xtype:"fieldset",title:"Select rates:",layout:"form",autoHeight:true,items:{xtype:"grid",border:false,hideHeaders:true,height:80,loadMask:{msg:"Loading"},store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["dataURI","name","homeCurrency","pricingPriceSell","pricingPriceIsNett","pricingPriceCommission"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c.push(b[a].get("dataURI"))}return c},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{dataIndex:"name"},{dataIndex:"pricingPriceSell",width:80,renderer:TDS.util.Price.homeCurrencyGrossNettPriceRenderer}],listeners:{render:function(){var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){proxy.conn.url=TDS.env.dataPath+w.getConfigValue("baseDataURI")+"/rates/collection";reader.meta.identifier=w.getConfigValue("baseDataURI")+"/rates";on("load",this.getSelectedData,this);load()}}}}}}]}]}]},{title:"Pricing",items:[{xtype:"panel",layout:"auto",height:290,frame:true,items:[{xtype:"pricepanel"}]}]},{title:"Notes",items:[{xtype:"panel",layout:"auto",height:290,frame:true,items:{xtype:"htmleditor",name:"termsAndConditions",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}}]}]}]}