{xtype:"form",border:false,width:690,beforeSubmit:function(a){;a.type="TRANSFER";var d=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var c=[];for(var b=0;b<d.length;b++){c.push(d[b].data.dataURI)}a.passengerURIs=c;a.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).getData();return a},requireStores:[{dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",autoScroll:true,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;"},defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;",readOnly:true,onTriggerClick:function(){return false}},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#ff0000">Component:</font></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2"  >'+d+"</font></b>",false)}}}},{xtype:"panel",layout:"table",border:false,width:394,hideBorders:true,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationFromURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'P/U Date<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",format:"dMy",width:125},{html:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time<font color="red">*</font>:',width:53},{xtype:"combo",fieldLabel:"Time",name:"startTimeHrs",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"HH",store:TDS.data.hours,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{xtype:"combo",fieldLabel:"Time",name:"startTimeMin",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"mm",store:TDS.data.minutes,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:390,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'P/U Location<font color="red">*</font>:',width:105},{xtype:"combo",fieldLabel:"P/U Location",name:"pickUpLocation",style:"margin-left: 5px;",mode:"local",width:280,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"dataURI",emptyText:"Location",store:TDS.data.pickUpDropOffLocationTransfer,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:390,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:"Details:",width:Ext.isIE?105:110},{xtype:"textarea",name:"pickUpLocationDetails",emptyText:"eg: Flight, Train, Ammom Name & Address details..",height:40,width:280,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:390,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'D/O Location<font color="red">*</font>:',width:105},{xtype:"combo",fieldLabel:"D/O Location",name:"dropOffLocation",style:"margin-left: 5px;",mode:"local",width:280,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"dataURI",emptyText:"Location",store:TDS.data.pickUpDropOffLocationTransfer,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:390,layoutConfig:{columns:5},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:"Details:",width:Ext.isIE?105:110},{xtype:"textarea",name:"dropOffLocationDetails",emptyText:"eg: Flight, Train, Ammom Name & Address details..",height:40,width:280,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:4},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'Mode<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",fieldLabel:"Mode",name:"typeClassCategory",mode:"local",width:280,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"dataURI",emptyText:"Mode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"transfer/modetypes/collection",identifier:"transfer/modetypes",fields:["name","dataURI"]}),listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:405,calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(1).getValue();var h=this.items.itemAt(e).items.itemAt(3).getValue();var f=this.items.itemAt(e).items.itemAt(5).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.ownerCt.items.itemAt(9).setValue(g)},getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(1).getValue();var n=g.itemAt(h).items.itemAt(3).getValue();var k=g.itemAt(h).items.itemAt(5).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(7).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<k;b++){p.push(g.itemAt(h).items.itemAt(9).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},listeners:{render:function(){;var h=this.ownerCt.findParentByType("tabpanel");var l=this.ownerCt.findParentByType("awesomewindow");var k=l.aw.data;var m=k.type;var g=Ext.util.JSON.decode(k.parameters);var e=Ext.util.JSON.decode(g.mainRooms);if(typeof e!="undefined"){e=e.data}else{e=[]}for(var c=0;c<e.length;c++){this.items.itemAt(c).items.itemAt(1).setValue(e[c].adult);this.items.itemAt(c).items.itemAt(3).setValue(e[c].child);var b=e[c].childAge;for(var d=0;d<b.length;d++){this.items.itemAt(c).items.itemAt(7).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(7).items.itemAt(d).setValue(b[d])}this.items.itemAt(c).items.itemAt(5).setValue(e[c].infant);var f=e[c].infantAge;for(var d=0;d<f.length;d++){this.items.itemAt(c).items.itemAt(9).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(9).items.itemAt(d).setValue(f[d])}}}},items:[{xtype:"panel",layout:"table",width:390,border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(1).getValue();var e=this.items.itemAt(3).getValue();var d=this.items.itemAt(5).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax()},layoutConfig:{columns:6},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'Adults<font color="red">*</font>:',width:110},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",triggerAction:"all",readOnly:true,width:45,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Child:",width:72},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(7).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:73},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(9).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:" ",colspan:3,width:150},{xtype:"panel",width:45,defaults:{hidden:true},defaults:{hidden:true,readOnly:true,onTriggerClick:function(){return false}},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},defaults:{hidden:true,readOnly:true,onTriggerClick:function(){return false}},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{xtype:"numberfield",name:"totalPax",style:" margin-left: 145px; ",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total&nbsp;Pax",width:45,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},100)}}}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,defaults:{style:"padding: 0; margin-left: 130px; ",readOnly:true,onTriggerClick:function(){return false}},items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},defaults:{readOnly:true,onTriggerClick:function(){return false}},items:[{html:'Supplier<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",name:"supplierURI",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]})}]}]}]},{title:"Additional Info",layout:"fit",defaults:{border:false,readOnly:true,onTriggerClick:function(){return false}},items:[{xtype:"textarea",name:"description",height:455,width:685,hideLabel:true,border:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false}]},{title:"Passengers",layout:"fit",items:[{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"grid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],bbar:[{xtype:"button",text:"Add",disabled:true,handler:function(){var b=this.ownerCt.items.itemAt(1);var a=this.ownerCt.items.itemAt(2);a.enable();b.enable();this.disable();var d=this.ownerCt.ownerCt;var c=d.getStore();c.add([new c.recordType({type:"AD",nameFirst:"",nameLast:"",paxAge:""})]);d.newRecordIndex=c.getCount()-1;d.startEditing(d.newRecordIndex,2)}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){var c=this.ownerCt.items.itemAt(0);var b=this.ownerCt.items.itemAt(2);c.enable();b.disable();var d=this.ownerCt.ownerCt;var a=d.getStore().getAt(d.newRecordIndex);if(a==-1||typeof a.get("dataURI")!="undefined"){return}d.getStore().remove(a);this.disable()}},{xtype:"button",text:"Save",disabled:true,handler:function(){var b=this.ownerCt.findParentByType("awesomewindow");var e=this.ownerCt.ownerCt;var d=this.ownerCt.items.itemAt(0);var c=this.ownerCt.items.itemAt(1);c.disable();this.disable();var a=e.getStore().getAt(e.newRecordIndex);if(a==-1||typeof a.get("dataURI")!="undefined"){return}Ext.Ajax.request({url:TDS.env.dataPath+b.aw.data.pnrDataURI+"/passengers",jsonData:a.data,method:"POST",callback:function(h,f,g){if(f){e.getStore().load();e.getView().refresh();d.enable()}else{c.enable();this.enable()}},scope:this})}}],listeners:{beforeedit:function(a){},render:function(){;var grid=this;var w=this.ownerCt.findParentByType("awesomewindow");this.getSelectionModel().on("beforerowselect",this.validatePassenger,this);var dataURI=w.aw.sourceDataURI;with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+dataURI+"/passengers/collection/concise";load()}}}}]}]}]}]}