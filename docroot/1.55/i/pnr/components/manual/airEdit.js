{xtype:"form",border:false,width:690,beforeSubmit:function(b){b.type="AIR";try{var a=this.ownerCt;if(typeof b.airportFromURI!="undefined"&&b.airportFromURI==""){Ext.getCmp("airportFromURI").markInvalid("Please select Dep City.");Ext.getCmp("airportFromURI").focus(true);throw"Please select Dep City.";return false}if(typeof b.airportToURI!="undefined"&&b.airportToURI==""){Ext.getCmp("airportToURI").markInvalid("Please select Arr City.");Ext.getCmp("airportToURI").focus(true);throw"Please select Arr City.";return false}if(typeof b.dateFrom!="undefined"&&b.dateFrom==""){Ext.getCmp("dateFrom").markInvalid("Please select Date.");Ext.getCmp("dateFrom").focus(true);throw"Please select In Date.";return false}if(typeof b.startTimeHrs!="undefined"&&b.startTimeHrs==""||b.startTimeMin!="undefined"&&b.dateFrom==""){Ext.getCmp("startTimeHrs").markInvalid("Please select Time.");Ext.getCmp("startTimeHrs").focus(true);throw"Please select Time.";return false}if(typeof b.A1!="undefined"&&b.A1==""){Ext.getCmp("A1").markInvalid("Please select Adult.");Ext.getCmp("A1").focus(true);throw"Please select Adult.";return false}if(typeof b.class!="undefined"&&b.class==""){Ext.getCmp("class").markInvalid("Please select Property Type.");Ext.getCmp("class").focus(true);throw"Please select Class.";return false}}catch(g){this.items.itemAt(0).setActiveTab(0);a.showValidation(g);return false}var f=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var d=[];for(var c=0;c<f.length;c++){d.push(f[c].data.dataURI)}b.passengerURIs=d;b.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(6).getData();b.gridData1=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getData();b.gridData=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).items.itemAt(0).getData();b.roomTypesWithPrice=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).items.itemAt(0).getData();return b},requireStores:[{dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",items:[{height:453,autoScroll:true,border:false,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;"},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#cc0000">Component:</font></b>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b><font size="2"  >AIR</font></b>',false)}}}},{xtype:"panel",layout:"table",border:false,width:390,hideBorders:true,layoutConfig:{columns:5},items:[{html:"Flight No:",border:false,width:Ext.isIE?105:110},{xtype:"textfield",name:"flightNo",width:280,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,width:390,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Dep City<font color="red">*</font>:',border:false,width:Ext.isIE?105:110},{xtype:"airportcombo",name:"airportFromURI",id:"airportFromURI",width:280,showFullName:true,excludeFromSession:true,enableKeyEvents:true,hideTrigger:false}]},{xtype:"panel",layout:"table",border:false,width:390,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Arr City<font color="red">*</font>:',border:false,width:Ext.isIE?105:110},{xtype:"airportcombo",name:"airportToURI",id:"airportToURI",width:280,showFullName:true,excludeFromSession:true,enableKeyEvents:true,hideTrigger:false}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:8},items:[{html:'Date<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",id:"dateFrom",format:"dMy",width:125},{width:23},{html:'Time<font color="red">*</font>:',width:30},{xtype:"combo",fieldLabel:"Time",name:"startTimeHrs",id:"startTimeHrs",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"HH",store:TDS.data.hours,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{xtype:"combo",fieldLabel:"Time",name:"startTimeMin",id:"startTimeMin",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"mm",store:TDS.data.minutes,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,width:390,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Class<font color="red">*</font>:',border:false,width:Ext.isIE?105:110},{xtype:"combo",name:"class",id:"class",mode:"local",width:124,triggerAction:"all",editable:true,displayField:"name",valueField:"name",store:TDS.data.airClass,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:510,getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(1).getValue();var n=g.itemAt(h).items.itemAt(3).getValue();var k=g.itemAt(h).items.itemAt(5).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(10).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<k;b++){p.push(g.itemAt(h).items.itemAt(12).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(1).getValue();var h=this.items.itemAt(e).items.itemAt(3).getValue();var f=this.items.itemAt(e).items.itemAt(5).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.items.itemAt(0).items.itemAt(8).setValue(g);this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0).bottomToolbar.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;"+g;this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0).bottomToolbar.items.itemAt(0).roomNo=1;if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").innerHTML="Total of <b>"+g+" Passenger(s)</b> is been Added to this Manual Quote Booking."}},listeners:{render:function(){;var h=this.ownerCt.findParentByType("tabpanel");var l=this.ownerCt.findParentByType("awesomewindow");var k=l.aw.data;var m=k.type;var g=Ext.util.JSON.decode(k.parameters);var e=Ext.util.JSON.decode(g.mainRooms);if(typeof e!="undefined"){e=e.data}else{e=[]}for(var c=0;c<e.length;c++){this.items.itemAt(c).items.itemAt(1).setValue(e[c].adult);this.items.itemAt(c).items.itemAt(3).setValue(e[c].child);var b=e[c].childAge;for(var d=0;d<b.length;d++){this.items.itemAt(c).items.itemAt(10).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(10).items.itemAt(d).setValue(b[d])}this.items.itemAt(c).items.itemAt(5).setValue(e[c].infant);var f=e[c].infantAge;for(var d=0;d<f.length;d++){this.items.itemAt(c).items.itemAt(12).items.itemAt(d).show(true);this.items.itemAt(c).items.itemAt(12).items.itemAt(d).setValue(f[d])}}}},items:[{xtype:"panel",layout:"table",width:530,style:"padding: 0; margin-bottom: 4px;margin-top: 8px;",border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(1).getValue();var e=this.items.itemAt(3).getValue();var d=this.items.itemAt(5).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax()},layoutConfig:{columns:9},items:[{html:'Adults<font color="red">*</font>:',width:110},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",id:"A1",triggerAction:"all",readOnly:true,width:42,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Child:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(10).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(12).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{width:20},{html:"Total Seats:",width:70},{xtype:"numberfield",name:"totalPax",id:"ID_TOTAL_PAX",width:30,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{html:" ",colspan:3,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 492px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Save",handler:function(){var e=this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1);var a=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1);var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1);var b=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(1);var i=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);var f=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(5);var j=this.ownerCt.ownerCt.items.itemAt(5).items.itemAt(1);var h=this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(0).items.itemAt(8);var d=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);var k=d.getStore();k.removeAll();k.add([new k.recordType({no:(k.data.length+1),flightNo:e.getValue(),departs:a.getRawValue(),arrives:c.getRawValue(),date:b.getRawValue(),deptimeHr:i.getValue(),deptimeMin:f.getValue(),cls:j.getValue(),noOfPax:h.getValue()})])}},{html:"&nbsp;",width:20},{xtype:"button",text:"Clear",clearFields:function(){this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(1).setValue("");this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4).setValue("");this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(5).setValue("");this.ownerCt.ownerCt.items.itemAt(5).items.itemAt(1).setValue("")},handler:function(){this.clearFields()}},{html:"&nbsp; ",width:10}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,hidden:true,labelWidth:105,items:[{xtype:"grid",height:160,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.JsonStore({url:"",identifier:"",fields:["dataURI","no","departs","arrives","date","deptimeHr","deptimeMin","cls","flightNo","noOfPax"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:" ",dataIndex:"no",width:20,fixed:true},{header:"Flight No",dataIndex:"flightNo",width:70},{header:"Departs",dataIndex:"departs",width:80},{header:"Arrives",dataIndex:"arrives",width:80},{header:"Date",dataIndex:"date",width:60},{header:"Dep Time",dataIndex:"deptimeHr",width:70,renderer:function(c,e,a,f,d,b){if(a.get("deptimeHr")&&a.get("deptimeMin")){return a.get("deptimeHr")+a.get("deptimeMin")}else{if(a.get("deptimeMin")){return"00"+a.get("deptimeMin")}else{return a.get("deptimeHr")+"00"}}}},{header:"Class",dataIndex:"cls",width:120},{header:"No Seats",dataIndex:"noOfPax",width:70}],bbar:["->",{xtype:"button",text:"Cancel",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getStore().getAt(b.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}b.getStore().remove(a);if(b.getStore().length<=0){this.disable()}}}],listeners:{render:function(){;this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","rowclick","rowmousedown","rowblclick","cellblclick","sortchange","mouseup","mousedown"]);var h=this.ownerCt.findParentByType("tabpanel");var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;var e=Ext.util.JSON.decode(b.parameters);var f=Ext.util.JSON.decode(e.gridData1);var g=f;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}}}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,hidden:true,labelWidth:105,items:[{xtype:"editorgrid",height:120,hidden:true,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.JsonStore({url:"",identifier:"",fields:["dataURI","roomNo","a","c","i","fairType","specialService","status","paxType"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"No",dataIndex:"roomNo",width:55,editor:new Ext.form.NumberField({})},{header:"A",dataIndex:"a",width:20,editor:new Ext.form.NumberField({listeners:{blur:function(){Ext.getCmp("addAirRoomType").a+=this.getValue()}}})},{header:"C",dataIndex:"c",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addAirRoomType").c+=this.getValue()}}})},{header:"I",dataIndex:"i",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addAirRoomType").i+=this.getValue()}}})},{header:"Fare Type",dataIndex:"fairType",width:100,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:"Type",store:TDS.data.accommodationRoomTypeMQ})},{header:"Special Services",dataIndex:"specialService",width:390,height:70,editor:new Ext.ux.form.SuperBoxSelect({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"value",emptyText:"Type",xtype:"superboxselect",store:TDS.data.passengerSpecialServiceRequests}),renderer:function(c,e,a,f,d,b){e.attr='ext:qtip="'+c+'"';return c}}],bbar:[{xtype:"button",text:"Add",id:"addAirRoomType",roomNo:1,a:0,c:0,i:0,handler:function(){;var f=this.ownerCt.ownerCt;var e=f.getStore();if(e.data.length==0){this.a=0;this.c=0;this.i=0;this.roomNo=1}var a=1;if(this.roomNo<=a){var c=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(6).items.itemAt(0).totalPaxPerRoom;if((this.a+this.c+this.i)>=c&&c!=0){this.roomNo+=1;var c=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(6).items.itemAt(0).totalPaxPerRoom;this.ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;0";return}var b=(c-(this.a+this.c+this.i));this.ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;"+((b>0)?b:0);if(this.roomNo<=a){var d=this.ownerCt.items.itemAt(1);d.enable();var f=this.ownerCt.ownerCt;var e=f.getStore();e.add([new e.recordType({roomNo:this.roomNo,fairType:"",plan:"",rooms:"",specialService:" "})]);f.newRecordIndex=e.getCount()-1;f.startEditing(f.newRecordIndex,1)}}else{this.ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;0"}}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){;if(this.ownerCt.items.itemAt(0).roomNo>0){this.ownerCt.items.itemAt(0).roomNo-=1}var b=this.ownerCt.items.itemAt(0);b.enable();var c=this.ownerCt.ownerCt;var a=c.getStore().getAt(c.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}c.getStore().remove(a);if(c.getStore().length<=0){this.disable()}}},"->","Un-allocated Pax:&nbsp;&nbsp;0"],listeners:{render:function(){;this.getEl().swallowEvent(["columnmove","columnresize","headerclick","click","mouseout","rowclick","rowmousedown","rowblclick","cellblclick","sortchange","mouseup","mousedown"]);var h=this.ownerCt.findParentByType("tabpanel");var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;var e=Ext.util.JSON.decode(b.parameters);var f=Ext.util.JSON.decode(e.gridData);var g=f;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}}}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,hidden:true,labelWidth:105,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:'Supplier<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",name:"supplierURI",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]})}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:"Prefered Airline(s):",border:false,hideBorders:false,width:110},{xtype:"checkbox",name:"hasPreferedAirline",width:17,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{html:"Yes",border:false,width:23},{xtype:"textfield",name:"preferedAirline",width:240,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,listeners:{render:function(){;var d=this.ownerCt.findParentByType("awesomewindow");var c=d.aw.data;var g=c.type;var h=Ext.util.JSON.decode(c.parameters);var e=this.items;for(var f=1;f<=e.length;f++){var b=e.itemAt(f);if(typeof b!="undefined"&&typeof b.name!="undefined"){if(b.xtype=="radio"){if(b.inputValue+""==h[b.name]){b.setValue(true)}}}}}},width:420,layoutConfig:{columns:9},items:[{html:"Airline Membership:",width:Ext.isIE?105:110},{xtype:"radio",name:"airlineMembership",inputValue:"No",boxlabel:"No"},{html:"&nbsp;No",width:45},{xtype:"radio",name:"airlineMembership",inputValue:"Yes",boxlabel:"Yes"},{html:"&nbsp;Yes",width:40},{html:"&nbsp;&nbsp;&nbsp;No:&nbsp;&nbsp;",width:35},{xtype:"numberfield",name:"airlineMembershipCount",width:135,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 10px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},calculateTotalPrice:function(){;var b=this;var j=0;var g=b.items.itemAt(2).items.itemAt(4).getValue();var e=b.items.itemAt(2).items.itemAt(1).getValue();var f=b.items.itemAt(3).items.itemAt(6).getValue();var d=b.items.itemAt(3).items.itemAt(2).getValue();var h=b.items.itemAt(3).items.itemAt(6);var a=b.items.itemAt(3).items.itemAt(2);if(f!="undefined"&&f!=""){}else{}var c=b.items.itemAt(4).items.itemAt(1).getValue();var l=b.items.itemAt(4).items.itemAt(4).getValue();var m=b.items.itemAt(4).items.itemAt(4);var k=b.items.itemAt(5).items.itemAt(4);var i=b.items.itemAt(5).items.itemAt(1).getValue();if(g=="true"){h.setValue("");a.setValue("")}else{m.setValue("")}return},items:[{xtype:"editorgrid",id:"passGrid",height:120,width:630,clicksToEdit:1,store:new Ext.data.JsonStore({url:"",identifier:"",fields:["priceSell","pricingPriceCurrency","roomType","status","paxType"]}),viewConfig:{forceFit:true},getPricingTotal:function(){var a=this;setTimeout(function(){var c=a.getStore().data;var e=0;for(var b=0;b<c.length;b++){if(c.items[b].data.priceBaseSell!=null&&c.items[b].data.priceBaseSell!=""){e+=parseFloat(c.items[b].data.priceBaseSell)}}},100)},getData:function(){var b=this.getStore().data;for(var a=0,c=[];a<b.length;a++){c.push(b.items[a].data)}return{data:c}},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Pax Type",dataIndex:"paxType",width:80,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Passengers",dataIndex:"passengersTotal",width:80,fixed:true,editor:new Ext.form.TextField({})},{header:"DOB",dataIndex:"dob",width:90,fixed:true,editor:new Ext.form.TextField({})},{header:"Age",dataIndex:"age",width:50,fixed:true,editor:new Ext.form.TextField({})},{header:"Curr",dataIndex:"pricingPriceCurrency",width:50,fixed:true,editor:new Ext.form.TextField({})},{header:"Price Per Person",dataIndex:"priceSell",width:100,fixed:true,editor:new Ext.form.NumberField({}),renderer:TDS.util.Price.conversionPriceRenderer},{header:"Status",dataIndex:"status",width:60,fixed:true,editor:new Ext.form.ComboBox({store:[["OK","OK"],["RQ","RQ"],["WL","WL"],["XX","XX"]],editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})}],bbar:[{xtype:"button",text:"Add",handler:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var e=this.ownerCt.ownerCt;var d=e.getStore();d.add([new d.recordType({roomType:"",pricingPriceCurrency:b.pricingPriceCurrency,priceSell:"",status:"QT"})]);e.startEditing(d.getCount()-1,1)}},{xtype:"button",text:"Remove",handler:function(){var b=this.ownerCt.ownerCt,a;while(a=b.selModel.getSelected()){b.store.remove(a)}}}],listeners:{render:function(){;var b=this;var j=this.ownerCt.findParentByType("awesomewindow");var h=j.aw.data;var f=Ext.util.JSON.decode(h.parameters);if(typeof f!="undefined"&&typeof f.roomTypesWithPrice!="undefined"&&f.roomTypesWithPrice!=""){var d=Ext.util.JSON.decode(f.roomTypesWithPrice);var g=d;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}else{var c=Ext.util.JSON.decode(h.parameters);var d=Ext.util.JSON.decode(c.gridData);var g=[];if(typeof g=="undefined"){g=[]}if(typeof d.data!="undefined"){for(var e=0;e<d.data.length;e++){if(g.indexOf(d.data[e].roomType)==-1){var k=this.getStore();k.add([new k.recordType({roomType:d.data[e].roomType,pricingPriceCurrency:h.pricingPriceCurrency,priceSell:"",status:"QT"})])}}}}}}},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:"Supplier:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"supplierName",mode:"local",width:290}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Booking Ref:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"bookingReferenceNumber",mode:"local",width:95,triggerAction:"all",editable:true},{width:20,border:false},{html:"Gross/Net:",border:false,hideBorders:false,width:80},{xtype:"combo",name:"pricingPriceIsNett",mode:"local",width:95,triggerAction:"all",editable:true,store:[["false","Gross"],["true","Nett"]],listeners:{select:function(){;var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);if(this.getValue()=="true"){var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);c.disable(true);c.setValue("");b.disable(true);b.setValue("");var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.enable().focus(false,10);this.ownerCt.ownerCt.calculateTotalPrice()}else{var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.disable(true);a.setValue("");var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);this.ownerCt.ownerCt.calculateTotalPrice()}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:7},items:[{xtype:"radio",name:"gross",checked:true,width:20,boxlabel:"No",inputValue:"priceCommission",listeners:{check:function(){;var c=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(4).getValue();var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var a=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);if(this.getValue()&&c!="true"){b.enable();a.disable(true);a.setValue("")}else{if(!this.getValue()&&c!="true"){b.disable(true);b.setValue("");a.enable();this.ownerCt.ownerCt.calculateTotalPrice()}}}}},{html:"Commision %",border:false,hideBorders:false,width:80},{xtype:"textfield",name:"pricingPriceCommission",mode:"local",width:95,triggerAction:"all",editable:true,listeners:{render:function(){;var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var g=d.pricingPriceCommission;var f=d.pricingPriceIsNett;if(f){var c=this;setTimeout(function(){c.setValue("")},500)}}}},{width:20,border:false},{xtype:"radio",name:"gross",width:20,boxlabel:"No",inputValue:"priceCommission"},{html:"Commision $",border:false,hideBorders:false,width:60},{xtype:"textfield",name:"priceCommission$",mode:"local",width:95,triggerAction:"all",editable:true}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Markdown",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"markdown",mode:"local",width:95,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{width:20,border:false},{html:"",border:false,hideBorders:false,width:80,xtype:"label",listeners:{render:function(){;var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.pricingPriceCurrency;if(typeof d!="undefined"&&d){this.setText("Markup "+d+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ",false)}}}},{xtype:"textfield",name:"pricingPriceCommission",mode:"local",width:95,triggerAction:"all",editable:true,listeners:{render:function(){;var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var g=d.pricingPriceCommission;var f=d.pricingPriceIsNett;if(!f){var c=this;setTimeout(function(){c.setValue("")},500)}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:2},items:[{html:"Details:",border:false,hideBorders:false,width:100},{xtype:"textarea",name:"details",mode:"local",hieght:40,width:290,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]}]}]},{border:false,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"Back"},{html:"&nbsp;",width:80},{xtype:"button",text:"Next",handler:function(){;var j=this.ownerCt.findParentByType("awesomewindow");var g=Ext.getCmp("airportFromURI").getValue();var i=Ext.getCmp("airportToURI").getValue();var c=Ext.getCmp("dateFrom").getValue();var h=Ext.getCmp("startTimeHrs").getValue();var f=Ext.getCmp("class").getValue();var b=Ext.getCmp("A1").getValue();try{var j=this.ownerCt;if(typeof g!="undefined"&&g==""){Ext.getCmp("airportFromURI").markInvalid("Please select Dep City.");Ext.getCmp("airportFromURI").focus(true);throw"Please select Dep City.";return false}if(typeof i!="undefined"&&i==""){Ext.getCmp("airportToURI").markInvalid("Please select Arr City.");Ext.getCmp("airportToURI").focus(true);throw"Please select Arr City.";return false}if(typeof c!="undefined"&&c==""){Ext.getCmp("dateFrom").markInvalid("Please select Date.");Ext.getCmp("dateFrom").focus(true);throw"Please select In Date.";return false}if(typeof h!="undefined"&&h==""||startTimeMin!="undefined"&&c==""){Ext.getCmp("startTimeHrs").markInvalid("Please select Time.");Ext.getCmp("startTimeHrs").focus(true);throw"Please select Time.";return false}if(typeof b!="undefined"&&b==""){Ext.getCmp("A1").markInvalid("Please select Adult.");Ext.getCmp("A1").focus(true);throw"Please select Adult.";return false}if(typeof f!="undefined"&&f==""){Ext.getCmp("class").markInvalid("Please select Property Type.");Ext.getCmp("class").focus(true);throw"Please select Class.";return false}}catch(d){this.items.itemAt(0).setActiveTab(0);j.showValidation(d);return false}var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]},{title:"Additional Info",items:[{xtype:"textarea",name:"description",height:455,width:685,hideLabel:true,border:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:500},{xtype:"button",text:"Back",handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.setActiveTab(0)}},{html:"&nbsp;",width:10},{xtype:"button",text:"Next",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].enable(true);a.buttons[1].enable(true);b.setActiveTab(2)}},{html:"&nbsp; ",width:10}]}]},{title:"Passengers",items:[{xtype:"panel",border:false,style:"margin-bottom: 6px;",html:'<div id="DISPLAY_PAX_COUNT"></div>',listeners:{render:function(){var a=Ext.getCmp("ID_TOTAL_PAX").getValue();if(!a){a=0}if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").InnerHTML="Total "+a+" is been Added to this Manual Quote Booking."}else{this.html='<font size="2" >Total of <b>'+a+" Passenger(s)</b> is been Added to this Manual Quote Booking.</font>"}}}},{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"editorgrid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],listeners:{beforeedit:function(a){},render:function(){var grid=this;var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/concise";load()}var dataURI=w.aw.sourceDataURI;Ext.Ajax.request({url:TDS.env.dataPath+dataURI+"/passengers/collection/concise",method:"GET",callback:function(o,s,r){;if(s){var ro=Ext.util.JSON.decode(r.responseText);var collection=ro[dataURI+"/passengers"];if(typeof collection=="undefined"){return}for(var i=0;i<collection.length;i++){var s=this.getStore().data;for(var j=0;j<s.length;j++){if(s.items[j].data.dataURI==collection[i]){grid.getSelectionModel().selectRow(j,true,false)}}}}},scope:this})}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 10px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"next"},{html:"&nbsp;",width:80},{xtype:"button",text:"Back",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].disable(true);a.buttons[1].disable(true);b.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]}]}