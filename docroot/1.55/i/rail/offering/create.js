{xtype:"form",border:false,markDataDirtyOnLoad:true,beforeSubmit:function(b){var e=[];if(b.weeklyScheduleSunday){e.push(TDS.data.weeklyScheduleDays.SUNDAY);delete b.weeklyScheduleSunday}if(b.weeklyScheduleMonday){e.push(TDS.data.weeklyScheduleDays.MONDAY);delete b.weeklyScheduleMonday}if(b.weeklyScheduleTuesday){e.push(TDS.data.weeklyScheduleDays.TUESDAY);delete b.weeklyScheduleTuesday}if(b.weeklyScheduleWednesday){e.push(TDS.data.weeklyScheduleDays.WEDNESDAY);delete b.weeklyScheduleWednesday}if(b.weeklyScheduleThursday){e.push(TDS.data.weeklyScheduleDays.THURSDAY);delete b.weeklyScheduleThursday}if(b.weeklyScheduleFriday){e.push(TDS.data.weeklyScheduleDays.FRIDAY);delete b.weeklyScheduleFriday}if(b.weeklyScheduleSaturday){e.push(TDS.data.weeklyScheduleDays.SATURDAY);delete b.weeklyScheduleSaturday}if(e.length){b.weeklyScheduleDays=e}var a=[];var d=this.items.itemAt(0).items.itemAt(4).items.itemAt(0).store.data.items;for(var c=0;c<d.length;c++){a[c]=d[c].data.dataURI}b.locationsJSON=a;var g=[];var f=this.items.itemAt(0).items.itemAt(5).items.itemAt(0).store.data.items;for(var c=0;c<f.length;c++){g[c]=f[c].data}b.hrefs=g;return b},beforeDataLoad:function(e,c){var b=c.getRequiredData("supplier");e.termsAndConditions=b.data.defaultOfferingTermsAndConditions;if(e.weeklyScheduleDays){var f=e.weeklyScheduleDays;for(var a=0;a<f.length;a++){if(f[a]==TDS.data.weeklyScheduleDays.SUNDAY){e.weeklyScheduleSunday=true}if(f[a]==TDS.data.weeklyScheduleDays.MONDAY){e.weeklyScheduleMonday=true}if(f[a]==TDS.data.weeklyScheduleDays.TUESDAY){e.weeklyScheduleTuesday=true}if(f[a]==TDS.data.weeklyScheduleDays.WEDNESDAY){e.weeklyScheduleWednesday=true}if(f[a]==TDS.data.weeklyScheduleDays.THURSDAY){e.weeklyScheduleThursday=true}if(f[a]==TDS.data.weeklyScheduleDays.FRIDAY){e.weeklyScheduleFriday=true}if(f[a]==TDS.data.weeklyScheduleDays.SATURDAY){e.weeklyScheduleSaturday=true}}}return e},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:300,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:80,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"textfield",allowBlank:false,name:"name",fieldLabel:"Service",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"textfield",allowBlank:false,name:"codeSupplier",fieldLabel:"Service No.",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:"Advertised rate:",width:Ext.isIE?88:85},{xtype:"textfield",allowBlank:false,name:"rackRatePriceSell",fieldLabel:"Advertised rate",name:"rackRatePriceSell",width:60},{html:" ",width:Ext.isIE?12:12},{xtype:"combo",forceSubmit:true,name:"pricingPriceIsNett",mode:"local",width:60,triggerAction:"all",editable:false,value:"false",store:[["false","Gross"],["true","Nett"]]}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:3},items:[{html:"From:",width:Ext.isIE?88:85},{xtype:"combo",allowBlank:false,name:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",allowBlank:false,name:"locationFromURI",style:"margin-left: 2px;",listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:3},items:[{html:"To:",width:Ext.isIE?88:85},{xtype:"combo",allowBlank:false,name:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",allowBlank:false,name:"locationToURI",style:"margin-left: 2px;",listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"textfield",name:"departureTime",allowBlank:false,fieldLabel:"Departure time",emptyText:"e.g. 1845",bodyStyle:"padding: 2px 4px 2px 4px;",width:80},{xtype:"textfield",name:"arrivalTime",allowBlank:false,fieldLabel:"Arrival time",emptyText:"e.g. 0630+1",bodyStyle:"padding: 2px 4px 2px 4px;",width:80},{xtype:"textfield",allowBlank:false,name:"duration",fieldLabel:"Trip time",emptyText:"e.g. 12h 15m",bodyStyle:"padding: 2px 4px 2px 4px;",width:120},{xtype:"panel",style:"padding: 0;",border:false,hideBorders:true,layout:"table",layoutConfig:{columns:15},items:[{html:"Schedule:",width:Ext.isIE?88:85},{xtype:"checkbox",name:"weeklyScheduleSunday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Sun"},{xtype:"checkbox",name:"weeklyScheduleMonday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Mon"},{xtype:"checkbox",name:"weeklyScheduleTuesday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Tue"},{xtype:"checkbox",name:"weeklyScheduleWednesday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Wed"},{xtype:"checkbox",name:"weeklyScheduleThursday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Thu"},{xtype:"checkbox",name:"weeklyScheduleFriday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Fri"},{xtype:"checkbox",name:"weeklyScheduleSaturday",forceSubmit:true},{style:"padding-left: 2px; padding-right: 6px;",html:"Sat"}]}]}]},{title:"Description",layout:"form",items:{xtype:"htmleditor",name:"description",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Notes",layout:"form",items:{xtype:"htmleditor",name:"notes",height:200,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}},{title:"Localisation",layout:"form",items:[{html:"<p>Name:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"textfield",name:"nameLocale",hideLabel:true,labelSeparator:"",anchor:"100%"},{html:"<p>Description:</p>",style:"margin-bottom: 2px;",border:false},{xtype:"htmleditor",name:"descriptionLocale",height:"auto",hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}]},{title:"Locations",layout:"fit",getButtonAdd:function(){return this.getBottomToolbar().items.itemAt(4)},getButtonRemove:function(){return this.getBottomToolbar().items.itemAt(6)},getFieldCountry:function(){return this.getBottomToolbar().items.itemAt(0)},getFieldLocation:function(){return this.getBottomToolbar().items.itemAt(2)},getGrid:function(){return this.items.itemAt(0)},beforeSubmit:function(a){return this.getGrid().getData()},items:[{xtype:"grid",store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","name","provinceName"]}),sm:new Ext.grid.RowSelectionModel({singleSelect:true}),cm:new Ext.grid.ColumnModel([{dataIndex:"name",renderer:function(c,b,a){return a.get("name")+", "+a.get("provinceName")}}]),hideHeaders:true,viewConfig:{forceFit:true},toggleButtonRemove:function(a){var b=this.ownerCt.ownerCt;if(a){b.getButtonRemove().enable()}else{b.getButtonRemove().disable()}},enableButtonRemove:function(){this.toggleButtonRemove(true)},disableButtonRemove:function(){this.toggleButtonRemove(false)},getData:function(){var a=[];this.getStore().each(function(b){a.push(b.get("dataURI"))},this);return a},listeners:{render:function(){var w=this.ownerCt.findParentByType("awesomewindow");var store=this.getStore();with(store){proxy.conn.url=TDS.env.dataPath+w.getConfigValue("destinationDataURI")+"/collection";reader.meta.identifier=w.getConfigValue("destinationDataURI")}store.loadData(w.getData());this.getSelectionModel().on("rowselect",this.enableButtonRemove,this);this.getSelectionModel().on("rowdeselect",this.disableButtonRemove,this)}}}],bbar:[{xtype:"combo",name:"countryCode",emptyText:"Type a country...",minChars:1,tpl:TDS.util.Templates.ComboNoLabel,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}],listeners:{invalid:function(b,c){var a=this.ownerCt.findParentByType("awesomewindow");a.showValidation(c)},valid:function(b){var a=this.ownerCt.findParentByType("awesomewindow");a.clearValidation()}}}," ",{xtype:"combo",name:"nameLike",minChars:3,forceSelection:true,store:new Ext.data.CollectionStore({url:"",fields:["dataURI","name","provinceName"]}),tpl:'<tpl for="."><div class="x-combo-list-item">{name}, <span style="font-style: italic; font-size: 10px; color: #999;">{provinceName}</span></div></tpl>',displayField:"name",valueField:"dataURI",queryParam:"nameLike",queryDelay:500,emptyText:"Type a city name...",enableKeyEvents:true,width:160,hideTrigger:true,getSelectedRecord:function(){return this.selectedRecord||-1},listeners:{beforequery:function(qe){var p=this.ownerCt.ownerCt;var w=this.ownerCt.findParentByType("awesomewindow");var countryCode=p.getFieldCountry().getValue();if(countryCode==""){p.getFieldCountry().markInvalid("Please select a country.");return false}var store=this.getStore();with(store){proxy.conn.url=TDS.env.dataPath+"country/"+countryCode+"/locations/collection";reader.meta.identifier="country/"+countryCode+"/locations?"+this.queryParam+"="+qe.query;proxy.conn.method="GET"}},select:function(c,b,a){this.selectedRecord=b;var d=this.ownerCt.ownerCt;d.getButtonAdd().enable()}}}," ",{xtype:"button",text:"Add",disabled:true,handler:function(){var b=this.ownerCt.ownerCt;var a=b.getFieldLocation().getSelectedRecord();var c=b.getGrid().getStore().find("dataURI",a.get("dataURI"));if(c==-1&&a!=-1){b.getGrid().getStore().add(a)}this.disable()}}," ",{xtype:"button",text:"Remove",disabled:true,handler:function(){var b=this.ownerCt.ownerCt.getGrid();var a=b.getSelectionModel().getSelected();if(a!=-1){b.getStore().remove(a)}this.disable()}}]},{title:"Links",layout:"fit",items:{xtype:"editorgrid",loadMask:{msg:""},viewConfig:{forceFit:true},store:new Ext.data.JsonStore({url:"",pruneModifiedRecords:true,fields:["dataURI","href","description"]}),getData:function(){var c=this.getStore().getModifiedRecords();for(var b=0,e=[];b<c.length;b++){var a=c[b].get("dataURI");e.push({method:a?"PUT":"POST",destinationDataURI:a?TDS.env.dataPath+a:this.baseDataURI,data:{href:c[b].get("href"),description:c[b].get("description")}})}return{data:e}},sm:new Ext.grid.RowSelectionModel({singleSelect:true}),cm:new Ext.grid.ColumnModel([{header:"URL",dataIndex:"href",editor:new Ext.form.TextField({allowBlank:false})},{header:"Description",dataIndex:"description",editor:new Ext.form.TextField({allowBlank:false})}]),bbar:[{xtype:"button",text:"Add",tooltip:"Click here to add a new link",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getStore();a.add([new a.recordType({href:"",description:""})]);b.startEditing(a.getCount()-1,0)}},{xtype:"button",text:"Remove",tooltip:"Select a link and click here to remove",handler:function(){var b=this.ownerCt.ownerCt;b.loadMask.show();var a=b.selModel.getSelected();if(a.get("dataURI")){Ext.Ajax.request({method:"DELETE",url:TDS.env.dataPath+a.get("dataURI"),callback:function(e,c,d){b.loadMask.hide();if(c){b.store.remove(a);return}}})}else{b.loadMask.hide();b.store.remove(a)}}}],removeLink:function(){},listeners:{render:function(){var b=this.ownerCt.findParentByType("awesomewindow");if(!b){b.registerItem(this.id);this.baseDataURI=TDS.env.dataPath+b.aw.baseDataURI;var g=this.getStore().recordType;var d=b.aw.data[b.aw.baseDataURI];var c=[];for(var e=0;e<d.length;e++){var a=d[e];var f=b.aw.data[a];f.dataURI=a;c[e]=new g(f)}this.getStore().add(c)}}}}}]}]}