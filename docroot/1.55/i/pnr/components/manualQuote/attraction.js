{xtype:"form",border:false,width:690,beforeSubmit:function(b){;b.type="ATTRACTION";try{var c=Ext.getCmp("ID_TOTAL_PAX").getValue();var f=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;if(f.length>c){Ext.Msg.alert("Alert","More than "+c+" passengers selected");return false}var a=this.ownerCt;if(typeof b.countryFromCode=="undefined"||b.countryFromCode==""){Ext.getCmp("countryFromCode").markInvalid("Please select a Country.");Ext.getCmp("countryFromCode").focus(true);throw"Please select a Country.";return false}if(typeof b.dateFrom=="undefined"||b.dateFrom==""){Ext.getCmp("dateFrom").markInvalid("Please select In Date.");Ext.getCmp("dateFrom").focus(true);throw"Please select In Date.";return false}if(typeof b.duration=="undefined"||b.duration==""){Ext.getCmp("duration").markInvalid("Please select Duration.");Ext.getCmp("duration").focus(true);throw"Please select Duration.";return false}if(typeof b.A1=="undefined"||b.A1==""){Ext.getCmp("A1").markInvalid("Please select Adult.");Ext.getCmp("A1").focus(true);throw"Please select Adult.";return false}if(typeof b.supplierURI=="undefined"||b.supplierURI==""){Ext.getCmp("supplierURI").markInvalid("Please select Supplier.");Ext.getCmp("supplierURI").focus(true);throw"Please select Supplier.";return false}}catch(j){a.showValidation(j);return false}var h=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var g=[];for(var d=0;d<h.length;d++){g.push(h[d].data.dataURI)}b.passengerURIs=g;b.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).getData();b.gridData=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getData();b.name=b.gridData.data[0].serciceName;return b},requireStores:[{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",items:[{height:453,autoScroll:true,border:false,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;"},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#ff0000">Component:</font></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2"   >SERVICES</font></b>',false)}}}},{xtype:"panel",layout:"table",border:false,width:394,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryFromCode",id:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}],listeners:{select:function(){var a=this.getValue();var b=TDS.util.firstWordCapital(this.ownerCt.findParentByType("awesomewindow").aw.data.type);if(a!=""){var c=Ext.getCmp("supplierURI").store;c.removeAll();c=TDS.data.getStore({reload:true,dataURI:TDS.env.dataPath+"suppliers/collection/byFilters?type="+b+"&countryURI="+a,identifier:"suppliers",fields:["name","displayName","dataURI","creditCardCharges"]});setTimeout(function(){Ext.getCmp("supplierURI").bindStore(c)},500)}}}},{xtype:"locationcombo",name:"locationFromURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Date From<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",id:"dateFrom",format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime(),width:125,menuListeners:Ext.applyIf({select:function(c,a){Ext.form.DateField.prototype.menuListeners.select.call(this,c,a);var b=this.getValue();b.setDate(b.getDate()+1);this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3).setMinValue(b)}},Ext.form.DateField.prototype.menuListeners)},{html:" &nbsp;&nbsp;&nbsp;&nbsp;To:",width:30},{xtype:"datefield",name:"dateTo",format:"dMy",width:125}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Duration<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"duration",id:"duration",mode:"local",width:125,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"name",emptyText:"Duration",store:TDS.data.dayToursDuration}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:405,getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(1).getValue();var n=g.itemAt(h).items.itemAt(3).getValue();var k=g.itemAt(h).items.itemAt(5).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(7).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<k;b++){p.push(g.itemAt(h).items.itemAt(9).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(1).getValue();var h=this.items.itemAt(e).items.itemAt(3).getValue();var f=this.items.itemAt(e).items.itemAt(5).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.ownerCt.items.itemAt(5).setValue(g);if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").innerHTML="Total of <b>"+g+" Passenger(s)</b> is been Added to this Manual Quote Booking."}},items:[{xtype:"panel",layout:"table",width:390,border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(1).getValue();var e=this.items.itemAt(3).getValue();var d=this.items.itemAt(5).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax()},layoutConfig:{columns:6},items:[{html:'Adults<font color="red">*</font>:',width:110},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",id:"A1",triggerAction:"all",readOnly:true,width:45,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Child:",width:72},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(7).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:73},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(9).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:" ",colspan:3,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{xtype:"numberfield",name:"totalPax",id:"ID_TOTAL_PAX",style:" margin-left: 145px; ",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total&nbsp;Pax",width:44},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 535px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Save",handler:function(){var b=this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(2);var h=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1);var l=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3);var d=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1);var k=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(1);var j=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(3);var e=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(5);var f=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);var m=f.getStore();m.removeAll();m.add([new m.recordType({no:(m.data.length+1),departs:b.getRawValue(),dateFrom:h.getRawValue(),dateTo:l.getRawValue(),duration:d.getValue(),a:k.getValue(),c:j.getValue(),i:e.getValue()})])}},{html:"&nbsp;",width:20},{xtype:"button",text:"Clear",clearFields:function(){this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(2).setValue("");this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3).setValue("");this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1).setValue("")},handler:function(){this.clearFields()}},{html:"&nbsp; ",width:10}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},items:[{xtype:"editorgrid",height:160,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["dataURI","roomNo","roomType","plan","rooms","price","extras","status","paxType"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"No",dataIndex:"no",width:20,editor:new Ext.form.NumberField({})},{header:"A",dataIndex:"a",width:20,editor:new Ext.form.NumberField({})},{header:"C",dataIndex:"c",width:20,editor:new Ext.form.NumberField({})},{header:"I",dataIndex:"i",width:20,editor:new Ext.form.NumberField({})},{header:"Service Types",dataIndex:"serviceType",width:140,height:70,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.attractionServices}),renderer:function(c,e,a,f,d,b){e.attr='ext:qtip="'+c+'"';return c}},{header:"City",dataIndex:"departs",width:80},{header:"Date/Range",dataIndex:"dateRange",width:120,renderer:function(c,e,a,f,d,b){if(a.get("dateFrom")&&a.get("dateTo")){return a.get("dateFrom")+" - "+a.get("dateTo")}else{if(a.get("dateTo")){return a.get("dateTo")}else{if(a.get("dateFrom")){return a.get("dateFrom")}}}return c}},{header:"Duration",dataIndex:"duration",width:50},{header:"Service Name",dataIndex:"serciceName",width:130,height:70,editor:new Ext.form.TextField({})}],bbar:[{xtype:"button",text:"Delete",handler:function(){;if(this.ownerCt.items.itemAt(0).roomNo>0){this.ownerCt.items.itemAt(0).roomNo-=1}var b=this.ownerCt.items.itemAt(0);b.enable();var c=this.ownerCt.ownerCt;var a=c.getStore().getAt(c.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}c.getStore().remove(a);if(c.getStore().length<=0){this.disable()}}}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,width:390,layoutConfig:{columns:4},items:[{html:'Supplier<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",name:"supplierURI",id:"supplierURI",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.MQsupplierStore}]},{xtype:"textarea",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Service&nbsp;Description",name:"serviceDescription",width:280}]}]},{border:false,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:50},{html:"&nbsp;",width:430},{xtype:"button",hidden:true,text:"Back"},{html:"&nbsp;",width:80},{xtype:"button",text:"Next",handler:function(){var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.items.itemAt(0).setDisabled(true);a.items.itemAt(1).setDisabled(false);a.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}],listeners:{render:function(){;var a=this.ownerCt;a.items.itemAt(1).setDisabled(true);a.items.itemAt(2).setDisabled(true)}}},{title:"Additional Info",items:[{xtype:"textarea",name:"description",height:455,width:685,hideLabel:true,border:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:50},{html:"&nbsp;",width:470},{xtype:"button",text:"Back",handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.items.itemAt(0).setDisabled(false);a.items.itemAt(1).setDisabled(true);a.items.itemAt(2).setDisabled(true);a.setActiveTab(0)}},{html:"&nbsp;",width:10},{xtype:"button",text:"Next",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].enable(true);a.buttons[1].enable(true);b.items.itemAt(0).setDisabled(true);b.items.itemAt(1).setDisabled(true);b.items.itemAt(2).setDisabled(false);b.setActiveTab(2)}},{html:"&nbsp; ",width:10}]}]},{title:"Passengers",items:[{xtype:"panel",border:false,style:"margin-bottom: 6px;",html:'<div id="DISPLAY_PAX_COUNT"></div>',listeners:{render:function(){var a=Ext.getCmp("ID_TOTAL_PAX").getValue();if(!a){a=0}if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").InnerHTML="Total "+a+" is been Added to this Manual Quote Booking."}else{this.html='<font size="2" >Total of <b>'+a+" Passenger(s)</b> is been Added to this Manual Quote Booking.</font>"}}}},{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"editorgrid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Gender",dataIndex:"gender",renderer:TDS.util.Format.gender,width:100},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],listeners:{beforeedit:function(a){},render:function(){var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/concise";load();var s=this.getStore().data;var t=this;setTimeout(function(){for(var j=0;j<s.length;j++){t.getSelectionModel().selectRow(j,true,false)}},2000)}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 10px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:50},{html:"&nbsp;",width:450},{xtype:"button",hidden:true,text:"next"},{html:"&nbsp;",width:80},{xtype:"button",text:"Back",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].disable(true);b.items.itemAt(0).setDisabled(true);b.items.itemAt(1).setDisabled(false);b.items.itemAt(2).setDisabled(true);b.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]}]}