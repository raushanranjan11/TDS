{xtype:"panel",layout:"fit",border:!1,bodyStyle:"padding: 8px;",autoScroll:!0,requireStores:[{dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","dataURI"]}],items:{xtype:"awesomegrid",sendMinData:!0,searchURI:TDS.env.dataPath+"suppliers",pinnable:!0,enableRowExpander:!1,iconCls:"icon-grid",tbar:["Name: ",{xtype:"textfield",name:"nameLike",enableKeyEvents:!0,width:120}," ","Email: ",{xtype:"textfield",name:"emailLike",enableKeyEvents:!0,width:120}," ","Country: ",{xtype:"clearablecombo",name:"countryURI",fieldLabel:"Country",emptyText:"Type a country...",minChars:1,enableKeyEvents:!0,mode:"local",width:160,typeAhead:!0,triggerAction:"all",forceSelection:!0,selectOnFocus:!0,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection/custom",identifier:"countries",fields:["name","dataURI"]}),appendData:[{dataURI:"",name:"All"}]}," ","Total count: ",{xtype:"textfield",name:"counts",readOnly:!0,width:50,listeners:{}}," ",{xtype:"button",text:"Print",winExist:!1,a:"",handler:function(){var e="";var j="";var d=this.ownerCt.ownerCt.getStore();var c=d.data.items;if(!this.winExist){this.winExist=!0;var b=window.open("","Terms Priview","height=600,width=1800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");e='<tr bgcolor="#000000"><th width="15%"><font color="white" size="2">Name</font><br></th><th width="6%"><font color="white" size="2">Code</font></th><th width="18%"><font color="white" size="2">Email</font></th><th width="5%"><font color="white" size="2">Locality</font></th><th width="10%"><font color="white" size="2">State</font></th><th width="5%"><font color="white" size="2">Post code</font></th><th width="5%"><font color="white" size="2">Country</font></th><th width="10%"><font color="white" size="2">Home currency <font><br></th><th width="2%"><font color="white" size="2">Phone Number</font></th><th width="10%"><font color="white" size="2">Registered</font></th><th width="25%"><font color="white" size="2">Last modified </font><br></th></tr>';for(var h=0;h<c.length;h++){j+='<tr><td width="15%" align="center"><font size="2">'+c[h].data.name+'</font></td><td width="6%" align="center"><font size="2">'+c[h].data.supplierArenaCode+'</font></td><td width="18%"><font size="2">'+c[h].data.email+'</font></td><td width="5%" align="center"><font size="2">'+c[h].data.locality+'</font></td><td width="10%"><font size="2">'+c[h].data.state+'</font></td><td width="5%"><font size="2">'+c[h].data.postcode+'</font></td><td width="10%"><font size="2">'+TDS.util.Format.displayResourceName(c[h].data.countryURI)+'</font></td><td width="2%" align="center"><font size="2">'+c[h].data.homeCurrency+'</font></td><td width="10%"><font size="2">'+c[h].data.phoneNumber+'</font></td><td width="25%"><font size="2">'+c[h].data.createdDate+'</font></td><td width="25%"><font size="2">'+c[h].data.updatedDate+"</font></td></tr>"}
var f='<table  cellspacing="0" border=1 style="width:100%;border-style:solid;">'+e+j+"</table> ";b.document.write(f);b.location.reload();b.focus();b.print();b.close();this.winExist=!1}else{b.focus()}}},"->",{text:"Rate Default %",handler:function(){TDS.window.setWindow({title:"Supplier Admin Rate Default %",information:"&nbsp;",interfaceURI:"supplier/defaultPercentageAdminRate.js",sourceDataURI:"supplier/defaultPercentageRate",destinationDataURI:"supplier/defaultPercentageRate",buttonOK:"Ok"})}}," ",{text:"Default T&C",handler:function(){TDS.window.setWindow({title:"Supplier Admin Edit T&C",information:"&nbsp;",interfaceURI:"supplier/adminDefaultTCEdit.js",sourceDataURI:"supplier/defaultTC",destinationDataURI:"supplier/defaultTC",buttonOK:"Submit"})}}," ",{text:"Admin",handler:function(){var c=this.buttonContainer.ownerCt;var b=c.selModel.getSelected();if(!b){return}
var a=b.get("dataURI");TDS.window.setWindow({title:"Supplier Admin",information:"&nbsp;",interfaceURI:"supplier/supplier-admin.js",sourceDataURI:a,postDataURI:a+"/admin",data:{email:""},buttonOK:"Ok",callback:{fn:function(d){if(d){c.submitQuery(!0)}},scope:c}})}}," ",{xtype:"redbutton",text:"Create",handler:function(){var a=this.ownerCt.ownerCt;TDS.window.setWindow({title:"Supplier",information:"Please enter details of a new supplier.",interfaceURI:"supplier/create.js",postDataURI:"supplier",callback:{fn:function(b){if(b){a.submitQuery(!0)}},scope:a}})}}," ",{text:"Copy",handler:function(){var c=this.buttonContainer.ownerCt;var b=c.selModel.getSelected();if(!b){return}
var a=b.get("dataURI");TDS.window.setWindow({title:"Copy supplier",information:"This interface will create a new supplier with the following details, you may edit these details before you submit.",interfaceURI:"supplier/create.js",sourceDataURI:a,postDataURI:"supplier",data:{email:""},buttonOK:"Submit",callback:{fn:function(d){if(d){c.submitQuery(!0)}},scope:c}})}}," ",{text:"Archive",hidden:(!TDS.env.user.hasGroupPermission("ADMINISTRATION")),disabled:!0,handler:function(){var c=this.buttonContainer.ownerCt;var b=c.selModel.getSelected();var header=this.getText();var name=b.data.name;var archiveOrUnarchive=!(c.topToolbar.items.itemAt(26).checked);var archived=!1;if(archiveOrUnarchive){archived=!0}else{archived=!1}
if(!b){return}
var a=b.get("dataURI");if(TDS.env.user.hasGroupPermission('ADMINISTRATION')){var supplierArray=[];var supplierName=[];c.getSelectionModel().getSelections().forEach(function(rec){supplierArray.push(rec.id);supplierName.push(rec.data.name)});TDS.window.setWindow({title:header,message:'Are you sure you want to '+header+' "'+supplierName.toString()+'" ?',destinationDataURI:'supplier/multipleArchive?archiveOrUnarchive='+archiveOrUnarchive,data:{archived:archiveOrUnarchive,supplierArray:supplierArray},callback:{fn:function(s){if(s)
c.submitQuery(!0)},scope:c}})}else{TDS.window.setWindow({title:header,message:'Are you sure you want to '+header+' "'+name+'" ?',destinationDataURI:a,data:{archived:archived},callback:{fn:function(d){if(d){c.submitQuery(!0)}},scope:c}})}}},' ',{xtype:'checkbox',name:'showUnArchivedOnly',handler:function(){var tb=this.ownerCt.ownerCt.topToolbar;tb.items.itemAt(24).disable(!0);console.log(this.ownerCt.ownerCt.topToolbar);this.ownerCt.ownerCt.topToolbar.items.itemAt(29).setDisabled(!0);if(this.checked){tb.items.itemAt(24).setText("Restore")}else{tb.items.itemAt(24).setText("Archive")}}},'Show only Archived',' ',{xtype:'button',name:'delete',text:'Delete',disabled:!0,handler:function(){var g=this.ownerCt.ownerCt;var r=g.selModel.getSelected();if(!r)
return;var dataURI=r.get('dataURI');var header=this.getText();if(!dataURI)
return;Ext.Msg.show({title:'Alert',msg:'Are you sure you want to '+header,buttons:Ext.Msg.YESNO,fn:processResult,animEl:'elId',icon:Ext.MessageBox.QUESTION});function processResult(a,b,c){var me=this;if(a=='yes'){if(TDS.env.user.hasGroupPermission('ADMINISTRATION')){var supplierArray=[];g.getSelectionModel().getSelections().forEach(function(rec){supplierArray.push(rec.id)});console.log(supplierArray);Ext.Ajax.request({url:TDS.env.dataPath+'supplier/deleteMultiple',jsonData:{supplierArray:supplierArray},method:'PUT',headers:{'Content-Type':'application/json'},callback:function(){g.submitQuery(!0)},scope:me,disableCaching:!0})}else{Ext.Ajax.request({url:TDS.env.dataPath+dataURI,method:'DELETE',callback:function(){g.submitQuery(!0)},scope:this,disableCaching:!0})}}}}},],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","name","supplierArenaCode","locality","state","postcode","phoneNumber","email","countryURI","homeCurrency","createdDate",'adminMaintainedExcRate',"updatedDate"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Name",dataIndex:"name"},{header:"Code",dataIndex:"supplierArenaCode"},{header:"Email",dataIndex:"email"},{header:"Locality",dataIndex:"locality"},{header:"State",dataIndex:"state"},{header:"Postcode",dataIndex:"postcode"},{header:"Country",dataIndex:"countryURI",sortable:!0,renderer:TDS.util.Format.displayResourceNameRenderer()},{header:"Home currency",dataIndex:"homeCurrency"},{header:"Phone number",dataIndex:"phoneNumber"},{header:"Registered",dataIndex:"createdDate",sortable:!0,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)},{header:"Last modified",dataIndex:"updatedDate",sortable:!0,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)}]),viewConfig:{forceFit:!0},listeners:{rowdblclick:function(d,h,f){var c=d.getStore().getAt(h);if(!c){return}
var a=c.get("dataURI");var b=c.get("name");TDS.workArea.openTab(b,"supplier/supplier.js",a,a)},render:function(){var a=this.toolbarFields[3];this.getStore().on("load",function(c,b,e,d){a.setValue(c.getCount())});this.getSelectionModel().on('rowselect',function(){console.log(this.ownerCt);this.items.itemAt(24).setDisabled(!1);var archive=this.ownerCt.topToolbar.items.itemAt(26).checked;if(archive){this.ownerCt.topToolbar.items.itemAt(29).setDisabled(!1)}},this.getTopToolbar());this.getSelectionModel().on('rowdeselect',function(){this.items.itemAt(24).setDisabled(!0)},this.getTopToolbar())}}}}


