{xtype:"form",layout:"fit",border:false,bodyStyle:"padding: 8px;",autoScroll:true,getDataURI:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){var b=this.items.itemAt(0).getTopToolbar();var a=b.items.itemAt(1);if(a.getValue()){return a.getValue()+"/depots"}}else{if(TDS.env.user.isSupplier()){return TDS.env.user.getSupplierURI()+"/depots"}}},getSessionURI:function(){return this.ownerCt.sessionURI},getSessionValue:function(a){return this.ownerCt.sessionObj[a]},items:{xtype:"awesomegrid",searchURI:"",pinnable:true,enableRowExpander:false,iconCls:"icon-grid",tbar:[{xtype:"tbspecialtext",text:"Supplier: ",hidden:true},{xtype:"combo",hidden:true,name:"supplierURI",excludeSubmit:true,mode:"local",width:160,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:new Ext.data.Store(),toggleButtons:function(){var d=this.ownerCt.ownerCt;var a=d.ownerCt;var b=this.ownerCt.items.itemAt(6);var c=this.ownerCt.items.itemAt(8);if(!this.getValue()){b.disable();c.disable()}else{b.enable();c.enable()}d.searchURI=TDS.env.dataPath+a.getDataURI()},listeners:{select:function(){this.toggleButtons()}}},{xtype:"tbspecialspacer",hidden:true},"Name: ",{xtype:"textfield",name:"nameLike",enableKeyEvents:true,width:120},"->",{xtype:"redbutton",text:"Create",handler:function(){var c=this.ownerCt.ownerCt;var b=c.ownerCt;var a=b.getDataURI();if(!a){return}TDS.window.setWindow({title:"Depot",information:"Please enter details of a new depot.",interfaceURI:"supplier/depot/create.js",postDataURI:a,callback:{fn:function(d){if(d){c.submitQuery(true)}},scope:c}})}}," ",{xtype:"button",text:"Copy",handler:function(){var d=this.ownerCt.ownerCt;var b=d.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Copy depot",information:"This interface will create a new depot with the following details, you may edit these details before you submit.",interfaceURI:"supplier/depot/create.js",sourceDataURI:a,postDataURI:b.getDataURI(),data:{email:""},buttonOK:"Submit",callback:{fn:function(e){if(e){d.submitQuery(true)}},scope:d}})}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","name","email","addressString","locality","state","postcode","countryURI","phoneNumber"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Depot",dataIndex:"name"},{header:"Email",dataIndex:"email"},{header:"Locality",dataIndex:"locality"},{header:"State",dataIndex:"state"},{header:"Postcode",dataIndex:"postcode"},{header:"Country",dataIndex:"countryURI",sortable:true,renderer:TDS.util.Format.displayResourceNameRenderer()},{header:"Phone number",dataIndex:"phoneNumber"}]),viewConfig:{forceFit:true},listeners:{beforerender:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){var a=this.getTopToolbar();a[0].hidden=false;a[1].hidden=false;a[1].store=TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/concise",identifier:"suppliers",fields:["name","dataURI"]});a[2].hidden=false}},sessioninit:function(){var a=this.ownerCt.getDataURI();if(typeof a=="undefined"){return}this.searchURI=TDS.env.dataPath+a},rowdblclick:function(c,f,d){var b=c.getStore().getAt(f);if(!b){return}var a=b.get("dataURI");TDS.window.setWindow({title:"Edit depot",interfaceURI:"supplier/depot/edit.js",sourceDataURI:a,destinationDataURI:a,buttonOK:"Submit",callback:{fn:function(e){if(e){this.submitQuery(true)}},scope:c}})}}}}