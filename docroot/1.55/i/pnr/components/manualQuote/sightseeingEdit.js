{xtype:"form",border:false,width:690,beforeSubmit:function(b){;b.type="SIGHTSEEING";try{var c=Ext.getCmp("ID_TOTAL_PAX").getValue();var f=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;if(f.length>c){Ext.Msg.alert("Alert","More than "+c+" passengers selected");return false}var a=this.ownerCt;if(typeof b.countryFromCode!="undefined"&&b.countryFromCode==""){Ext.getCmp("countryFromCode").markInvalid("Please select a Country.");Ext.getCmp("countryFromCode").focus(true);throw"Please select a Country.";return false}if(typeof b.dateFrom!="undefined"!="undefined"&&b.dateFrom==""){Ext.getCmp("dateFrom").markInvalid("Please select Dep Date From.");Ext.getCmp("dateFrom").focus(true);throw"Please select Dep Date From.";return false}if(typeof b.duration!="undefined"&&b.duration==""){Ext.getCmp("duration").markInvalid("Please select Duration.");Ext.getCmp("duration").focus(true);throw"Please select Duration.";return false}if(typeof b.A1!="undefined"&&b.A1==""){Ext.getCmp("A1").markInvalid("Please select Adult.");Ext.getCmp("A1").focus(true);throw"Please select Adult.";return false}if(typeof b.supplierURI!="undefined"&&b.supplierURI==""){Ext.getCmp("supplierURI").markInvalid("Please select Supplier.");Ext.getCmp("supplierURI").focus(true);throw"Please select Supplier.";return false}}catch(j){this.items.itemAt(0).setActiveTab(0);a.showValidation(j);return false}var h=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var g=[];for(var d=0;d<h.length;d++){g.push(h[d].data.dataURI)}b.passengerURIs=g;b.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).getData();b.gridData=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getData();b.name=b.gridData.data[0].tourName;return b},beforeDataLoad:function(a){var b=a.countryFromCode;var c=TDS.util.firstWordCapital(a.type);if(b!=""){var d=Ext.getCmp("supplierURI").store;d.removeAll();d=TDS.data.getStore({reload:true,dataURI:TDS.env.dataPath+"suppliers/collection/byFilters?type="+c+"&countryURI="+b,identifier:"suppliers",fields:["name","displayName","dataURI","creditCardCharges"]});setTimeout(function(){Ext.getCmp("supplierURI").bindStore(d);Ext.getCmp("supplierURI").setRawValue(a.supplierName)},800)}return a},requireStores:[{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",items:[{height:453,autoScroll:true,border:false,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;"},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#ff0000">Component:</font></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2"   >DAY TOURS</font></b>',false)}}}},{xtype:"panel",layout:"table",border:false,width:394,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryFromCode",id:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}],listeners:{select:function(){var a=this.getValue();var b=TDS.util.firstWordCapital(this.ownerCt.findParentByType("awesomewindow").aw.data.type);if(a!=""){var c=Ext.getCmp("supplierURI").store;c.removeAll();c=TDS.data.getStore({reload:true,dataURI:TDS.env.dataPath+"suppliers/collection/byFilters?type="+b+"&countryURI="+a,identifier:"suppliers",fields:["name","displayName","dataURI","creditCardCharges"]});setTimeout(function(){Ext.getCmp("supplierURI").bindStore(c)},500)}}}},{xtype:"locationcombo",name:"locationFromURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Dep Date From<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",id:"dateFrom",format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime(),width:125,menuListeners:Ext.applyIf({select:function(c,a){Ext.form.DateField.prototype.menuListeners.select.call(this,c,a);var b=this.getValue();b.setDate(b.getDate()+1);this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3).setMinValue(b)}},Ext.form.DateField.prototype.menuListeners)},{html:" &nbsp;&nbsp;&nbsp;&nbsp;To:",width:30},{xtype:"datefield",name:"dateTo",format:"dMy",width:125}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:390,layoutConfig:{columns:5},items:[{html:'Duration<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"duration",id:"duration",mode:"local",width:125,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"name",emptyText:"Duration",store:TDS.data.dayToursDuration}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:405,getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(1).getValue();var n=g.itemAt(h).items.itemAt(3).getValue();var k=g.itemAt(h).items.itemAt(5).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(7).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<k;b++){p.push(g.itemAt(h).items.itemAt(9).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(1).getValue();var h=this.items.itemAt(e).items.itemAt(3).getValue();var f=this.items.itemAt(e).items.itemAt(5).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.ownerCt.items.itemAt(5).setValue(g);if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").innerHTML="Total of <b>"+g+" Passenger(s)</b> is been Added to this Manual Quote Booking."}},listeners:{render:function(){;var h=this.ownerCt.findParentByType("tabpanel");var l=this.ownerCt.findParentByType("awesomewindow");var k=l.aw.data;var m=k.type;var g=Ext.util.JSON.decode(k.parameters);var e=Ext.util.JSON.decode(g.mainRooms);if(typeof e!="undefined"){e=e.data}else{e=[]}for(var c=0;c<e.length;c++){this.items.itemAt(c).items.itemAt(1).setValue(e[c].adult);this.items.itemAt(c).items.itemAt(3).setValue(e[c].child);var b=e[c].childAge;for(var d=0;d<b.length;d++){this.items.itemAt(c).items.itemAt(7).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(7).items.itemAt(d).setValue(b[d])}this.items.itemAt(c).items.itemAt(5).setValue(e[c].infant);var f=e[c].infantAge;for(var d=0;d<f.length;d++){this.items.itemAt(c).items.itemAt(9).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(9).items.itemAt(d).setValue(f[d])}}}},items:[{xtype:"panel",layout:"table",width:390,border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(1).getValue();var e=this.items.itemAt(3).getValue();var d=this.items.itemAt(5).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax()},layoutConfig:{columns:6},items:[{html:'Adults<font color="red">*</font>:',width:110},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",id:"A1",triggerAction:"all",readOnly:true,width:45,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Child:",width:72},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(7).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:73},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:44,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(9).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:" ",colspan:3,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{xtype:"numberfield",name:"totalPax",id:"ID_TOTAL_PAX",style:" margin-left: 145px; ",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total&nbsp;Pax",width:45,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 535px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Save",handler:function(){var e=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1);var h=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3);var b=e.getValue();var f=h.getValue();if(b==""||b==null){e.markInvalid("Date From Required.");e.focus(true);return false}var d=this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(2);var m=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1);var p=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3);var j=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1);var o=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(1);var n=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(3);var k=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(0).items.itemAt(5);var l=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);var q=l.getStore();q.removeAll();q.add([new q.recordType({no:(q.data.length+1),departs:d.getRawValue(),dateFrom:m.getRawValue(),dateTo:p.getRawValue(),duration:j.getValue(),a:o.getValue(),c:n.getValue(),i:k.getValue()})])}},{html:"&nbsp;",width:20},{xtype:"button",text:"Clear",clearFields:function(){this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(3).setValue("");this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1).setValue("")},handler:function(){this.clearFields()}},{html:"&nbsp; ",width:10}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,items:[{xtype:"editorgrid",height:160,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.JsonStore({url:"",identifier:"",fields:["dataURI","no","a","c","i","tourType","departs","dateRange","duration","tourName","dateFrom","dateTo"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"No",dataIndex:"no",width:20},{header:"A",dataIndex:"a",width:20},{header:"C",dataIndex:"c",width:20},{header:"I",dataIndex:"i",width:20},{header:"Tour Types",dataIndex:"tourType",width:100,height:70,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.dayToursType}),renderer:function(c,e,a,f,d,b){e.attr='ext:qtip="'+c+'"';return c}},{header:"City",dataIndex:"departs",width:80},{header:"Date/Range",dataIndex:"dateRange",width:140,renderer:function(c,e,a,f,d,b){if(a.get("dateFrom")&&a.get("dateTo")){return a.get("dateFrom")+" - "+a.get("dateTo")}else{if(a.get("dateTo")){return a.get("dateTo")}else{if(a.get("dateFrom")){return a.get("dateFrom")}}}return c}},{header:"Duration",dataIndex:"duration",width:70},{header:"Tour Name",dataIndex:"tourName",width:120,height:70,editor:new Ext.form.TextField({})}],bbar:[{xtype:"button",text:"Delete",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getStore().getAt(b.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}b.getStore().remove(a);if(b.getStore().length<=0){this.disable()}}}],listeners:{render:function(){this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","rowclick","rowmousedown","rowblclick","cellblclick","sortchange","mouseup","mousedown"]);var h=this.ownerCt.findParentByType("tabpanel");var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;var e=Ext.util.JSON.decode(b.parameters);var f=Ext.util.JSON.decode(e.gridData);var g=f;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}}}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:'Supplier<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",name:"supplierURI",id:"supplierURI",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.MQsupplierStore}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:5},defaults:{border:false},listeners:{render:function(){;var d=this.ownerCt.findParentByType("awesomewindow");var c=d.aw.data;var g=c.type;var h=Ext.util.JSON.decode(c.parameters);var e=this.items;for(var f=1;f<=e.length;f++){var b=e.itemAt(f);if(typeof b!="undefined"&&typeof b.name!="undefined"){if(b.xtype=="checkbox"){b.setValue(h[b.name])}else{if(b.inputValue+""==h[b.name]){b.setValue(true)}}}}}},items:[{html:"Hotel P/U:",border:false,hideBorders:false,width:110},{xtype:"radio",name:"hotelPU",inputValue:"noHotelPU",boxlabel:"No"},{html:"&nbsp;No",width:50},{xtype:"radio",name:"hotelPU",inputValue:"yesHotelPU",boxlabel:"Yes"},{html:"&nbsp;yes",width:40}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:5},defaults:{border:false},listeners:{render:function(){;var d=this.ownerCt.findParentByType("awesomewindow");var c=d.aw.data;var g=c.type;var h=Ext.util.JSON.decode(c.parameters);var e=this.items;for(var f=1;f<=e.length;f++){var b=e.itemAt(f);if(typeof b!="undefined"&&typeof b.name!="undefined"){if(b.xtype=="checkbox"){b.setValue(h[b.name])}else{if(b.inputValue+""==h[b.name]){b.setValue(true)}}}}}},items:[{html:"Hotel D/O:",border:false,hideBorders:false,width:110},{xtype:"radio",name:"hotelDO",inputValue:"noHotelDO",boxlabel:"No"},{html:"&nbsp;No",width:50},{xtype:"radio",name:"hotelDO",inputValue:"yesHotelDO",boxlabel:"Yes"},{html:"&nbsp;yes",width:40}]},{xtype:"textarea",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hotel&nbsp;Name/Address",name:"hotelName",width:280,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]}]},{border:false,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"Back"},{html:"&nbsp;",width:80},{xtype:"button",text:"Next",hidden:true,handler:function(){var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]},{title:"Additional Info",items:[{title:'<font color="#cc0000"><b></b></font> ',collapsedTitle:"rrr",collapsed:true,collapsible:true,enableCollapsedTitle:true,minHeight:200,highlightInterval:10000,height:200,border:true,items:[{xtype:"textarea",name:"description",height:150,width:685,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false},{xtype:"button",text:"Edit Last Entry",handler:function(){;var f=this;var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var c=d.pnrinfoId;var g=d.pnrinfoText;var b=e.initialConfig.sourceDataURI;TDS.helpwindow.setWindow({title:"Additional Info",information:"Additional Info.",interfaceURI:"pnr/components/manualQuote/additionalInfo.js",destinationDataURI:b+"/additionalInfo/"+c,data:{pnrinfoText:g},buttonOK:"Submit",callback:{fn:function(k,i,j){;var a=j.conversations;var h=f.ownerCt.ownerCt.items.itemAt(1);h.el.dom.innerHTML=a},scope:this.ownerCt.ownerCt}})}}]},{html:"",height:445,width:685,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.conversations;this.html=d}}},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:500},{xtype:"button",text:"Back",hidden:true,handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.setActiveTab(0)}},{html:"&nbsp;",width:10},{xtype:"button",text:"Next",hidden:true,handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].enable(true);a.buttons[1].enable(true);b.setActiveTab(2)}},{html:"&nbsp; ",width:10}]}]},{title:"Passengers",items:[{xtype:"panel",border:false,style:"margin-bottom: 6px;",html:'<div id="DISPLAY_PAX_COUNT"></div>',listeners:{render:function(){var a=Ext.getCmp("ID_TOTAL_PAX").getValue();if(!a){a=0}if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").InnerHTML="Total "+a+" is been Added to this Manual Quote Booking."}else{this.html='<font size="2" >Total of <b>'+a+" Passenger(s)</b> is been Added to this Manual Quote Booking.</font>"}}}},{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"editorgrid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Gender",dataIndex:"gender",renderer:TDS.util.Format.gender,width:100},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],listeners:{beforeedit:function(a){},render:function(){var grid=this;var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/concise";load()}var dataURI=w.aw.sourceDataURI;Ext.Ajax.request({url:TDS.env.dataPath+dataURI+"/passengers/collection/concise",method:"GET",callback:function(o,s,r){;if(s){var ro=Ext.util.JSON.decode(r.responseText);var collection=ro[dataURI+"/passengers"];if(typeof collection=="undefined"){return}for(var i=0;i<collection.length;i++){var s=this.getStore().data;for(var j=0;j<s.length;j++){if(s.items[j].data.dataURI==collection[i]){grid.getSelectionModel().selectRow(j,true,false)}}}}},scope:this})}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 10px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"next"},{html:"&nbsp;",width:80},{xtype:"button",text:"Back",hidden:true,handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].disable(true);a.buttons[1].disable(true);b.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]}]}