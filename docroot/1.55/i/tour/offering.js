{xtype:"panel",layout:"fit",border:false,bodyStyle:"padding: 2px; padding-right: 22px;",autoScroll:true,requireStores:[{dataURI:TDS.env.dataPath+"tour/types/collection",identifier:"tour/types",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"tour/classes/collection",identifier:"tour/classes",fields:["name","dataURI"]}],listeners:{render:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/concise",identifier:"suppliers",fields:["name","dataURI"]})}else{if(TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")){TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/currentUser/collection/concise",identifier:"currentUserCreatedsuppliers",fields:["name","dataURI"]})}}}},items:{xtype:"awesomegrid",searchURI:"",pinnable:true,enableRowExpander:false,iconCls:"icon-grid",getDataURI:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")||TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")){var c=this.getTopToolbar();var a=c.items.itemAt(1);var b=a.getValue();if(!b){return false}return a.getValue()}else{if(TDS.env.user.hasGroupPermission("INVENTORY_MANAGEMENT_TOUR")){return TDS.env.user.getSupplierURI()}}},tbar:[{xtype:"tbspecialtext",text:"Supplier: ",hidden:true},{xtype:"combo",hidden:true,name:"supplierURI",mode:"local",width:200,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:new Ext.data.Store(),appendData:[{name:"All",dataURI:""}],toggleButtons:function(){var a=this.ownerCt.items.itemAt(9);var b=this.ownerCt.items.itemAt(11);if(!this.getValue()){a.disable();b.disable()}else{a.enable();b.enable()}},listeners:{select:function(){this.toggleButtons()}}},{xtype:"tbspecialspacer",hidden:true},"Name: ",{xtype:"textfield",name:"nameLike",enableKeyEvents:true,width:120}," ","ARENA Code: ",{xtype:"textfield",name:"codeLike",enableKeyEvents:true,width:120}," ","Country: ",{xtype:"combo",name:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,allowBlank:false,minChars:1,enableKeyEvents:true,tpl:TDS.util.Templates.ComboNoLabel,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationURI",allowBlank:false,hideTrigger:false,excludeFromSession:true,style:"margin-left: 2px;",width:120,emptyText:"Type a city",listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(10);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}},"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",{xtype:"checkbox",boxLabel:"Show only Archived",name:"showUnArchivedOnly",excludeFromSession:true,handler:function(){var a=this.ownerCt.ownerCt.topToolbar;a.items.itemAt(19).disable(true);if(this.checked){a.items.itemAt(19).setText("Restore")}else{a.items.itemAt(19).setText("Archive")}}},"  ",{xtype:"button",name:"delete",text:"Delete",disabled:true,handler:function(){var d=this.ownerCt.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");var e=this.getText();if(!a){return}Ext.Msg.show({title:"Alert",msg:"Are you sure you want to "+e,buttons:Ext.Msg.YESNO,fn:b,animEl:"elId",icon:Ext.MessageBox.QUESTION});function b(g,f,h){if(g=="yes"){Ext.Ajax.request({url:TDS.env.dataPath+a,method:"DELETE",callback:function(){d.submitQuery(true)},scope:this,disableCaching:true})}}}},"->",{xtype:"redbutton",text:"Create",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getDataURI();if(!a){return}TDS.window.setWindow({title:"Tour details",information:"Please enter details of a new tour.",interfaceURI:"tour/offering/create.js",postDataURI:a+"/tourOfferings",helpTitel:"Creat Tour Help",helpId:"2",requiredData:[{id:"supplier",dataURI:a}],callback:{fn:function(c){if(c){b.submitQuery(true)}},scope:b}})}}," ",{xtype:"button",text:"Copy",handler:function(){var d=this.ownerCt.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");var b=c.get("supplierURI");if(!a&&!b){return}TDS.window.setWindow({title:"Copy tour offering",information:"This interface will create a new tour offering with the following details, you may edit these details before you submit.",interfaceURI:"tour/offering/create.js",sourceDataURI:a,postDataURI:b+"/tourOfferings",buttonOK:"Submit",requiredData:[{id:"supplier",dataURI:b}],callback:{fn:function(e){if(e){d.submitQuery(true)}},scope:d}})}}," ",{text:"Archive",handler:function(){var e=this.buttonContainer.ownerCt;var d=e.selModel.getSelected();if(!d){return}var c=d.get("dataURI");var b=this.buttonContainer.items.itemAt(13).getValue();var f=this.getText();if(!c){return}TDS.window.setWindow({title:"Archive tour offering",message:"Are you sure you want to "+f+" this tour offering?",destinationDataURI:c,data:{archived:!b},callback:{fn:function(a){if(a){e.submitQuery(true)}},scope:e}})}}," ",{text:"Help",xtype:"redbutton",cls:"x-button-blue",overCls:"x-button-blue-over",opened:false,toggle:false,handler:function(){TDS.needHelp("Creat Tour Help","2");if(!this.opened){this.opened=true;TDS.needHelp("Creat Tour Help","2")}else{this.opened=false;TDS.helpwindow.hide()}}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["published","dataURI","supplierURI","pinned","homeCurrency","rackRatePriceSell","locationFromString","locationToString","name","code","createdDate","updatedDate","duration","pricingPriceIsNett"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Published",width:40,dataIndex:"published",renderer:function(c,b,a){if(a.get("published")){return'<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'}else{return""}}},{header:"Supplier",dataIndex:"supplierURI",hidden:true,renderer:TDS.util.Format.displayResourceConciseNameRenderer()},{header:"Name",dataIndex:"name",sortable:true},{header:"Code",dataIndex:"code",sortable:true,menuDisabled:true,width:80,fixed:true},{header:"From",dataIndex:"locationFromString",sortable:true},{header:"To",dataIndex:"locationToString",sortable:true},{header:"Duration",dataIndex:"duration",sortable:true},{header:"Advertised rate",dataIndex:"rackRatePriceSell",width:120,fixed:true,sortable:true,renderer:function(c,b,a){return TDS.util.Price.formatPrice(c,a.data.homeCurrency)+" ("+(a.data.pricingPriceIsNett?"Nett":"Gross")+")"}},{header:"Published",dataIndex:"createdDate",sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)},{header:"Last modified",dataIndex:"updatedDate",sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)}]),viewConfig:{forceFit:true},listeners:{render:function(){this.getSelectionModel().on("rowselect",function(){var a=this.items.itemAt(13).checked;if(!a){this.items.itemAt(15).setDisabled(true)}else{this.items.itemAt(15).setDisabled(false)}this.items.itemAt(21).setDisabled(false)},this.getTopToolbar());this.getSelectionModel().on("rowdeselect",function(){this.items.itemAt(21).setDisabled(true)},this.getTopToolbar())},beforerender:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){var b=this.getTopToolbar();b[0].hidden=false;b[1].hidden=false;b[1].store=TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/concise",identifier:"suppliers",fields:["name","dataURI"]});b[2].hidden=false;var a=this.getColumnModel();a.setHidden(0,false)}else{if(!TDS.env.user.hasGroupPermission("ADMINISTRATION")&&TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")){var b=this.getTopToolbar();b[0].hidden=false;b[1].hidden=false;b[1].store=TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/currentUser/collection/concise",identifier:"currentUserCreatedsuppliers",fields:["name","dataURI"]});b[2].hidden=false;var a=this.getColumnModel();a.setHidden(0,false)}}},sessioninit:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")||TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")){this.searchURI=TDS.env.dataPath+"tour/offerings"}else{if(TDS.env.user.hasGroupPermission("INVENTORY_MANAGEMENT_TOUR")){this.searchURI=TDS.env.dataPath+TDS.env.user.getSupplierURI()+"/tourOfferings"}}},rowdblclick:function(d,h,f){var c=d.getStore().getAt(h);if(!c){return}var a=c.get("dataURI");var b=c.get("name");TDS.workArea.openTab(b,"tour/offering/view.js",a,TDS.env.sessionPath+a)}}}}