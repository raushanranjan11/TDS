{xtype:"panel",border:false,height:300,getButtonAdd:function(){return this.getBottomToolbar().items.itemAt(4)},getButtonRemove:function(){return this.getBottomToolbar().items.itemAt(6)},getFieldCountry:function(){return this.getBottomToolbar().items.itemAt(0)},getFieldLocation:function(){return this.getBottomToolbar().items.itemAt(2)},getGrid:function(){return this.items.itemAt(0).items.itemAt(0)},beforeSubmit:function(a){return this.getGrid().getData()},items:[{xtype:"fieldset",layout:"fit",height:260,items:{xtype:"grid",store:new Ext.data.CollectionStore({url:"",id:"dataURI",fields:["dataURI","name","provinceName"]}),sm:new Ext.grid.RowSelectionModel({singleSelect:true}),cm:new Ext.grid.ColumnModel([{dataIndex:"name",renderer:function(c,b,a){return a.get("name")+", "+a.get("provinceName")}}]),hideHeaders:true,viewConfig:{forceFit:true},toggleButtonRemove:function(a){var b=this.ownerCt.ownerCt;if(a){b.getButtonRemove().enable()}else{b.getButtonRemove().disable()}},enableButtonRemove:function(){this.toggleButtonRemove(true)},disableButtonRemove:function(){this.toggleButtonRemove(false)},getData:function(){var a=[];this.getStore().each(function(b){a.push(b.get("dataURI"))},this);return a},listeners:{render:function(){var w=this.ownerCt.findParentByType("awesomewindow");var store=this.getStore();with(store){proxy.conn.url=TDS.env.dataPath+w.getConfigValue("destinationDataURI")+"/collection";reader.meta.identifier=w.getConfigValue("destinationDataURI")}store.loadData(w.getData());this.getSelectionModel().on("rowselect",this.enableButtonRemove,this);this.getSelectionModel().on("rowdeselect",this.disableButtonRemove,this)}}}}],bbar:[{xtype:"combo",name:"countryCode",emptyText:"Type a country...",minChars:1,tpl:TDS.util.Templates.ComboNoLabel,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}],listeners:{invalid:function(b,c){var a=this.ownerCt.findParentByType("awesomewindow");a.showValidation(c)},valid:function(b){var a=this.ownerCt.findParentByType("awesomewindow");a.clearValidation()}}}," ",{xtype:"combo",name:"nameLike",minChars:3,forceSelection:true,store:new Ext.data.CollectionStore({url:"",fields:["dataURI","name","provinceName"]}),tpl:'<tpl for="."><div class="x-combo-list-item">{name}, <span style="font-style: italic; font-size: 10px; color: #999;">{provinceName}</span></div></tpl>',displayField:"name",valueField:"dataURI",queryParam:"nameLike",queryDelay:500,emptyText:"Type a city name...",enableKeyEvents:true,width:160,hideTrigger:true,getSelectedRecord:function(){return this.selectedRecord||-1},listeners:{beforequery:function(qe){var p=this.ownerCt.ownerCt;var w=this.ownerCt.findParentByType("awesomewindow");var countryCode=p.getFieldCountry().getValue();if(countryCode==""){p.getFieldCountry().markInvalid("Please select a country.");return false}var store=this.getStore();with(store){proxy.conn.url=TDS.env.dataPath+"country/"+countryCode+"/locations/collection";reader.meta.identifier="country/"+countryCode+"/locations?"+this.queryParam+"="+qe.query;proxy.conn.method="GET"}},select:function(c,b,a){this.selectedRecord=b;var d=this.ownerCt.ownerCt;d.getButtonAdd().enable()}}}," ",{xtype:"button",text:"Add",disabled:true,handler:function(){var b=this.ownerCt.ownerCt;var a=b.getFieldLocation().getSelectedRecord();var c=b.getGrid().getStore().find("dataURI",a.get("dataURI"));if(c==-1&&a!=-1){b.getGrid().getStore().add(a)}this.disable()}}," ",{xtype:"button",text:"Remove",disabled:true,handler:function(){var b=this.ownerCt.ownerCt.getGrid();var a=b.getSelectionModel().getSelected();if(a!=-1){b.getStore().remove(a)}this.disable()}}]}