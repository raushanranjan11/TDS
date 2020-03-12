{xtype:'panel',layout:'fit',border:false,bodyStyle:'padding: 8px;',autoScroll:true,requireStores:[{dataURI:TDS.env.dataPath+'countries/collection',identifier:'countries',fields:['name','dataURI']}],items:{xtype:'awesomegrid',searchURI:TDS.env.dataPath+'agencies',pinnable:true,enableRowExpander:false,iconCls:'icon-grid',tbar:['Name: ',{xtype:'textfield',name:'nameLike',enableKeyEvents:true,width:120},' ','Email: ',{xtype:'textfield',name:'emailLike',enableKeyEvents:true,width:120},' ','Country: ',{xtype:'clearablecombo',name:'countryURI',fieldLabel:'Country',emptyText:'Type a country...',minChars:1,enableKeyEvents:true,mode:'local',width:160,typeAhead:true,triggerAction:'all',forceSelection:true,selectOnFocus:true,displayField:'name',valueField:'dataURI',store:TDS.data.getStore({dataURI:TDS.env.dataPath+'countries/collection/custom',identifier:'countries',fields:['name','dataURI']})},' ','Total count: ',{xtype:'textfield',name:'counts',readOnly:true,width:50,listeners:{}},' ',{xtype:'button',text:'Print',winExist:false,a:'',handler:function(){var gh='';var g='';var store=this.ownerCt.ownerCt.getStore();var records=store.data.items;if(!this.winExist){this.winExist=true;var a=window.open('','Terms Priview','height=600,width=1800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');gh='<tr bgcolor="#000000"><th width="15%"><font color="white" size="2">Name</font><br></th><th width="6%"><font color="white" size="2">Code </font></th><th width="18%"><font color="white" size="2">Email</font></th><th width="5%"><font color="white" size="2">Locality</font></th><th width="10%"><font color="white" size="2">State</font></th><th width="5%"><font color="white" size="2">Post code</font></th><th width="5%"><font color="white" size="2">Country</font></th><th width="10%"><font color="white" size="2">Home currency <font><br></th><th width="2%"><font color="white" size="2">Phone Number</font></th><th width="10%"><font color="white" size="2">Registered</font></th><th width="25%"><font color="white" size="2">Last modified </font><br></th></tr>';for(var i=0;i<records.length;i++){g+='<tr><td width="15%" align="center"><font size="2">'+records[i].data.name+'</font></td><td width="6%" align="center"><font size="2">'+records[i].data.agencyArenaCode+'</font></td><td width="18%"><font size="2">'+records[i].data.email+'</font></td><td width="5%" align="center"><font size="2">'+records[i].data.locality+'</font></td><td width="10%"><font size="2">'
+records[i].data.state+'</font></td><td width="5%"><font size="2">'+records[i].data.postcode+'</font></td><td width="10%"><font size="2">'
+TDS.util.Format.displayResourceName(records[i].data.countryURI)+'</font></td><td width="2%" align="center"><font size="2">'+records[i].data.homeCurrency+'</font></td><td width="10%"><font size="2">'
+records[i].data.phoneNumber+'</font></td><td width="25%"><font size="2">'+records[i].data.createdDate+'</font></td><td width="25%"><font size="2">'+records[i].data.updatedDate+'</font></td></tr>'}
var t='<table  cellspacing="0" border=1 style="width:100%;border-style:solid;">'+gh+g+'</table> ';a.document.write(t);a.location.reload();a.focus();a.print();a.close();this.winExist=false;}else{a.focus();}}},'->',{text:'Admin',handler:function(){var g=this.buttonContainer.ownerCt;var r=g.selModel.getSelected();if(!r)return;var dataURI=r.get('dataURI');TDS.window.setWindow({title:'Agency Admin',information:'&nbsp;',interfaceURI:'agency/agency-admin.js',sourceDataURI:dataURI,postDataURI:dataURI+'/mobile',data:{email:''},buttonOK:'Ok',callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}},' ',{text:'Payment Fee',handler:function(){var g=this.buttonContainer.ownerCt;TDS.window.setWindow({title:'Agent Admin',information:'&nbsp;',interfaceURI:'agency/defaultFee.js',postDataURI:'agency/paymentFee',data:{email:''},buttonOK:'Ok',callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}},' ',{xtype:'redbutton',text:'Create',handler:function(){var g=this.ownerCt.ownerCt;TDS.window.setWindow({title:'Agency',information:'Please enter details of a new agency.',interfaceURI:'agency/create.js',postDataURI:'agency',callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}},' ',{text:'Copy',handler:function(){var g=this.buttonContainer.ownerCt;var r=g.selModel.getSelected();if(!r)return;var dataURI=r.get('dataURI');TDS.window.setWindow({title:'Copy agency',information:'This interface will create a new agency with the following details, you may edit these details before you submit.',interfaceURI:'agency/create.js',sourceDataURI:dataURI,postDataURI:'agency',data:{email:''},buttonOK:'Submit',callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}},' ',{text:'Archive',hidden:(!TDS.env.user.hasGroupPermission('ADMINISTRATION')),handler:function(){var g=this.buttonContainer.ownerCt;var r=g.selModel.getSelected();if(!r)return;var dataURI=r.get('dataURI');var header=this.getText();var name=r.data.name;var archiveOrUnarchive=!(g.topToolbar.items.itemAt(24).checked);var archived=false;if(archiveOrUnarchive){archived=true}else{archived=false;}
if(TDS.env.user.hasGroupPermission('ADMINISTRATION')){var agencyArray=[];var agencyName=[];g.getSelectionModel().getSelections().forEach(function(rec){console.log(rec.data);agencyArray.push(rec.id);agencyName.push(rec.data.name);});console.log(agencyName);TDS.window.setWindow({title:header,message:'Are you sure you want to '+header+' "'+agencyName.toString()+'" ?',destinationDataURI:'agency/multipleArchive?archiveOrUnarchive='+archiveOrUnarchive,data:{archived:archiveOrUnarchive,agencyArray:agencyArray},callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}else{TDS.window.setWindow({title:header,message:'Are you sure you want to '+header+' "'+name+'" ?',destinationDataURI:dataURI,data:{archived:archived},callback:{fn:function(s){if(s)g.submitQuery(true);},scope:g}});}}},' ',{xtype:'checkbox',name:'showUnArchivedOnly',id:'cl',handler:function(){var tb=this.ownerCt.ownerCt.topToolbar;tb.items.itemAt(22).disable(true);console.log(this.ownerCt.ownerCt.topToolbar);this.ownerCt.ownerCt.topToolbar.items.itemAt(27).setDisabled(true);if(this.checked){tb.items.itemAt(22).setText("Restore");}
else
{tb.items.itemAt(22).setText("Archive");}}},'Show only Archived',' ',{xtype:'button',name:'delete',text:'Delete',disabled:true,handler:function(){var g=this.ownerCt.ownerCt;var r=g.selModel.getSelected();if(!r)return;var dataURI=r.get('dataURI');var header=this.getText();if(!dataURI)return;Ext.Msg.show({title:'Alert',msg:'Are you sure you want to '+header,buttons:Ext.Msg.YESNO,fn:processResult,animEl:'elId',icon:Ext.MessageBox.QUESTION});function processResult(a,b,c){var me=this;if(a=='yes'){if(TDS.env.user.hasGroupPermission('ADMINISTRATION')){var agencyArray=[];g.getSelectionModel().getSelections().forEach(function(rec){agencyArray.push(rec.id);});console.log(agencyArray);Ext.Ajax.request({url:TDS.env.dataPath+'agency/deleteMultiple',jsonData:{agencyArray:agencyArray},method:'PUT',headers:{'Content-Type':'application/json'},callback:function(){g.submitQuery(true);},scope:me,disableCaching:true});}else{Ext.Ajax.request({url:TDS.env.dataPath+dataURI,method:'DELETE',callback:function(){g.submitQuery(true);},scope:this,disableCaching:true});}}}}},],store:new Ext.data.JsonStore({url:'',id:'dataURI',fields:['dataURI','pinned','agencyArenaCode','name','locality','state','postcode','countryURI','homeCurrency','phoneNumber','email','createdDate','updatedDate']}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:'Name',dataIndex:'name'},{header:'Code',dataIndex:'agencyArenaCode',width:60,fixed:true},{header:'Email',dataIndex:'email'},{header:'Locality',dataIndex:'locality'},{header:'State',dataIndex:'state'},{header:'Postcode',dataIndex:'postcode',width:60,fixed:true},{header:'Country',dataIndex:'countryURI',sortable:true,renderer:TDS.util.Format.displayResourceNameRenderer()},{header:'Home currency',dataIndex:'homeCurrency'},{header:'Phone number',dataIndex:'phoneNumber'},{header:'Registered',dataIndex:'createdDate',sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)},{header:'Last modified',dataIndex:'updatedDate',sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)}]),viewConfig:{forceFit:true},listeners:{rowdblclick:function(g,rowIndex,e){var r=g.getStore().getAt(rowIndex);if(!r)return;var dataURI=r.get('dataURI');var tabTitle=r.get('name');TDS.workArea.openTab(tabTitle,'agency/agency.js',dataURI,dataURI);},render:function(){var count=this.toolbarFields[3]
this.getStore().on('load',function(store,records,successful,eOpts){count.setValue(store.getCount());});this.getSelectionModel().on('rowselect',function(){console.log(this.ownerCt);this.items.itemAt(22).setDisabled(false);var archive=this.ownerCt.topToolbar.items.itemAt(24).checked;if(archive){this.ownerCt.topToolbar.items.itemAt(27).setDisabled(false);}},this.getTopToolbar());this.getSelectionModel().on('rowdeselect',function(){this.items.itemAt(22).setDisabled(true);},this.getTopToolbar());}}}}