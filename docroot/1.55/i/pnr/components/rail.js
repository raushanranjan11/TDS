{xtype:"form",border:false,width:690,beforeSubmit:function(a){;a.type="RAIL";var d=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var c=[];for(var b=0;b<d.length;b++){c.push(d[b].data.dataURI)}a.passengerURIs=c;a.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(5).getData();a.gridData1=this.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getData();a.gridData=this.items.itemAt(0).items.itemAt(0).items.itemAt(2).items.itemAt(3).getData();a.roomTypesWithPrice=this.items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(0).getData();return a},requireStores:[{dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]},{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",autoScroll:true,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 70px;margin-top: 8px;margin-bottom: 4px;"},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#ff0000">Component:</font></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2"   >'+d+"</font></b>",false)}}}},{xtype:"panel",layout:"table",border:false,width:530,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Dep Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationFromURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}},{width:10},{xtype:"textfield",name:"departStationAriport",width:130}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:13},items:[{html:'Dep Date<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",format:"dMy",width:125},{width:20},{html:'Time<font color="red">*</font>:',width:30},{xtype:"combo",fieldLabel:"Time",name:"startTimeHrs",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"HH",store:TDS.data.hours},{xtype:"combo",fieldLabel:"Time",name:"startTimeMin",style:"margin-left: 2px;",mode:"local",width:50,triggerAction:"all",editable:false,displayField:"numeric",valueField:"numeric",emptyText:"mm",store:TDS.data.minutes},{width:15},{xtype:"radio",name:"depStationAriportRadio",width:13,inputValue:"Station",checked:true,boxlabel:"No"},{html:"&nbsp;Station",width:63},{xtype:"radio",name:"depStationAriportRadio",width:13,inputValue:"AirPort",boxlabel:"Yes"},{html:"&nbsp;AirPort",width:60}]},{xtype:"panel",layout:"table",border:false,width:530,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Arr Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryToCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationToURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}},{width:10},{xtype:"textfield",name:"arrStationAriport",width:130}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,width:530,layoutConfig:{columns:12},items:[{html:"Train No:",width:Ext.isIE?105:110},{xtype:"textfield",name:"trainNo",width:125},{html:' &nbsp;&nbsp;&nbsp;Class<font color="red">*</font>:',width:45},{xtype:"combo",name:"class",mode:"local",width:110,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"name",emptyText:"",store:TDS.data.railClasses},{width:10},{xtype:"radio",name:"arrStationAriportRadio",width:13,inputValue:"Station",checked:true,boxlabel:"No"},{html:"&nbsp;Station",width:63},{xtype:"radio",name:"arrStationAriportRadio",width:13,inputValue:"AirPort",boxlabel:"Yes"},{html:"&nbsp;AirPort",width:60}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:530,getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(1).getValue();var n=g.itemAt(h).items.itemAt(3).getValue();var k=g.itemAt(h).items.itemAt(5).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(10).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<k;b++){p.push(g.itemAt(h).items.itemAt(12).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(1).getValue();var h=this.items.itemAt(e).items.itemAt(3).getValue();var f=this.items.itemAt(e).items.itemAt(5).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.items.itemAt(0).items.itemAt(8).setValue(g)},items:[{xtype:"panel",layout:"table",width:530,style:"padding: 0; margin-bottom: 4px;margin-top: 8px;",border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(1).getValue();var e=this.items.itemAt(3).getValue();var d=this.items.itemAt(5).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax()},layoutConfig:{columns:9},items:[{html:'Adults<font color="red">*</font>:',width:110},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",triggerAction:"all",readOnly:true,width:42,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Child:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(10).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:63},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(12).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{width:40},{html:"Total Pax:&nbsp;&nbsp;",width:80},{xtype:"numberfield",name:"totalPax",width:50},{html:" ",colspan:3,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{layout:"form",border:false,autoHeight:true,labelWidth:100,width:530,items:[{xtype:"panel",layout:"table",width:530,style:"padding: 0; margin-bottom: 4px;margin-top: 8px;",border:false,hideBorders:true,layoutConfig:{columns:9},items:[{html:"Consession:",width:110},{xtype:"combo",store:[0,1,2,3,4,5],name:"consession",triggerAction:"all",readOnly:true,width:42},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Youth:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"youth",triggerAction:"all",readOnly:true,width:40},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Senior:",width:68},{xtype:"combo",store:[0,1,2,3,4,5],name:"senior",triggerAction:"all",readOnly:true,width:40}]}]},{xtype:"panel",layout:"table",border:false,width:530,hideBorders:true,layoutConfig:{columns:8},items:[{html:"Pensioner:",width:110},{xtype:"combo",store:[0,1,2,3,4,5],name:"pensioner",triggerAction:"all",readOnly:true,width:42},{width:193},{xtype:"button",text:"Age Rules",handler:function(){TDS.helpwindow.setWindow({buttonOK:false,winToRight:true,displayCenter:true,modal:true,title:"Rail Age Rules",data:{description:'<font size="2" color="#660000"><b>Passenger Age Requirements for Ticketing</b></font><br><br>Adults: ages 26 to 59<br><br>  Senior<font color="red">*</font>: ages 60 and over<br><br>  Youth<font color="red">*</font>: ages 25 and under.<br><br>  Children<font color="red">*</font>: ages vary per country and per product. Below you will find a list of examples.  Please check the specific sales conditions of the fares you select to ensure age requirements are met.<br><br>  Infants: aged under 4 or 6 yrs, depending on country of travel. Please note that infants travel for free provided they share a seat/sleeping berth with a paying passenger.  <br>  <br>  <font color="red">*</font>If there are Senior, Youth or Child fares available for you reuested journey, you will automatically be offered the adult fare.<br><br>  <font size="2" color="#660000"><b>Child Ages</b></font><br>  Cross border Tickets: 4-11<br><br>  Domestic tickets in:<br>  <table>  <tr>	<td width=400px>Austria</td>	<td width=200px>6-15</td>	<td width=200px></td>	<td width=400px>Italy</td>	<td width=200px>4-11</td>  </tr>  <tr>	<td>Belgium</td>	<td>6-11</td>	<td></td>	<td>Luxemborg</td>	<td>6-11</td> </tr>  <tr>	<td>Bulgaria</td>	<td>6-11</td>	<td></td>	<td>Macedonia</td>	<td>4-11</td>  </tr>  <tr>	<td>Croatia</td>	<td>4-11</td>	<td></td>	<td>Netherlands</td>	<td>4-11</td>  </tr>  <tr>	<td>Denmark</td>	<td>6-15</td>	<td></td>	<td>Norway</td>	<td>4-15</td>  </tr>  <tr>	<td>Czech Rupublic</td>	<td>6-11</td>	<td></td>	<td>Poland</td>	<td>4-11</td>  </tr>  <tr>	<td>Ex-Yugoslavia</td>	<td>4-11</td>	<td></td>	<td>Portugal</td>	<td>4-11</td>  </tr>  <tr>	<td>Finland</td>	<td>6-16</td>	<td></td>	<td>Republic of reland</td>	<td>4-15</td>  </tr>  <tr>	<td>France</td>	<td>4-11</td>	<td></td>	<td>Romania</td>	<td>4-11</td> </tr>  <tr>	<td>Germany</td>	<td>4-14</td>	<td></td>	<td>Slovakia</td>	<td>6-11</td>  </tr>  <tr>	<td>Greece</td>	<td>4-11</td>	<td></td>	<td>Slovenia</td>	<td>6-11</td>  </tr>  <tr>	<td>Hungary</td>	<td>6-13</td>	<td></td>	<td>Spain</td>	<td>4-11</td>  </tr>  <tr>	<td></td>	<td></td>	<td></td>	<td>Switezerland</td>	<td>6-15</td>  </tr>  </table>',pageSection:" "},interfaceURI:"help/preview.js"})}},{width:10},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Save",handler:function(){;var c=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(2);var d=this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(4);var e=this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1);var o=this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(4);var m=this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(5);var q=this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(7);var h=this.ownerCt.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var f=this.ownerCt.ownerCt.ownerCt.items.itemAt(3).items.itemAt(4);var b=this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(1);var n=this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(3);var a=this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(5);var l=this.ownerCt.ownerCt.ownerCt.items.itemAt(5).items.itemAt(0).items.itemAt(8);d=d.getValue()?(d.getValue()):(q.checked?"(Station)":" (Airport)");var k=q.checked?"(Station)":" (Airport)";if(d!=k){d=d+k}f=f.getValue()?(f.getValue()):(a.checked?"(Station)":" (Airport)");var i=a.checked?"(Station)":" (Airport)";if(d!=i){f=f+i}var j=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);var p=j.getStore();p.add([new p.recordType({no:(p.data.length+1),trainNo:b.getValue(),departs:c.getRawValue()+d,arrives:h.getRawValue()+f,date:e.getRawValue(),deptimeHr:o.getValue(),deptimeMin:m.getValue(),cls:n.getValue(),noOfPax:l.getValue()})])}},{html:"&nbsp;",width:10},{xtype:"button",text:"Clear",clearFields:function(){this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(2).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(4).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(1).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(4).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(7).setValue(true);this.ownerCt.ownerCt.ownerCt.items.itemAt(2).items.itemAt(9).setValue(false);this.ownerCt.ownerCt.ownerCt.items.itemAt(3).items.itemAt(1).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(3).items.itemAt(4).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(1).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(3).setValue("");this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(5).setValue(true);this.ownerCt.ownerCt.ownerCt.items.itemAt(4).items.itemAt(7).setValue(false);this.ownerCt.ownerCt.ownerCt.items.itemAt(5).items.itemAt(0).items.itemAt(8).setValue("")},handler:function(){this.clearFields()}},{html:"&nbsp; ",width:10}]}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,items:[{xtype:"editorgrid",height:120,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["dataURI","no","departs","arrives","date","deptimeHr","deptimeMin","cls","status","noOfPax"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:" ",dataIndex:"no",width:20,fixed:true},{header:"Train No",dataIndex:"trainNo",width:50,fixed:true},{header:"Departs",dataIndex:"departs",width:150},{header:"Arrives",dataIndex:"arrives",width:150},{header:"Class",dataIndex:"cls",width:100},{header:"Date",dataIndex:"date",width:60},{header:"Time",dataIndex:"deptimeHr",width:50,renderer:function(c,e,a,f,d,b){if(a.get("deptimeHr")&&a.get("deptimeMin")){return a.get("deptimeHr")+a.get("deptimeMin")}else{if(a.get("deptimeMin")){return"00"+a.get("deptimeMin")}else{return a.get("deptimeHr")+"00"}}}}],bbar:["->",{xtype:"button",text:"Cancel",handler:function(){var b=this.ownerCt.ownerCt;var a=b.getStore().getAt(b.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}b.getStore().remove(a);if(b.getStore().length<=0){this.disable()}}}]}]},{xtype:"fieldset",defaults:{style:"margin-bottom:5px;  margin-left: 60px; "},autoHeight:true,labelWidth:105,items:[{xtype:"panel",layout:"table",border:false,disabled:true,width:390,hideBorders:false,layoutConfig:{columns:4},items:[{html:'Supplier<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",name:"supplierUR",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]})}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Preferred Fare Type:",border:false,hideBorders:false,width:110},{xtype:"radio",name:"preferredFareType",inputValue:"Cheapest",boxlabel:"No"},{html:"&nbsp;Cheapest",width:90},{xtype:"radio",name:"preferredFareType",inputValue:"Flexible",boxlabel:"Yes"},{html:"&nbsp;Flexible",width:40}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:10},defaults:{border:false},items:[{html:"Preferred Travel Type:",border:false,hideBorders:false,width:110},{xtype:"checkbox",name:"stop",width:15},{html:"&nbsp;Non Stop",width:90},{xtype:"checkbox",name:"express",width:15},{html:"&nbsp;Express",width:90},{xtype:"checkbox",name:"pointToPoint",width:15},{html:"&nbsp;Point to Point",width:100},{xtype:"checkbox",name:"multiSectors",width:15},{html:"&nbsp;Multi Sectors",width:70}]},{xtype:"editorgrid",height:160,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["dataURI","no","cls","optionService","preference","rooms","price","extras","status","paxType"]}),viewConfig:{},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"No",dataIndex:"no",width:25,editor:new Ext.form.NumberField({})},{header:"A",dataIndex:"a",width:20,editor:new Ext.form.NumberField({listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").a+=this.getValue()}}})},{header:"C",dataIndex:"c",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").c+=this.getValue()}}})},{header:"I",dataIndex:"i",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").i+=this.getValue()}}})},{header:"Co",dataIndex:"a",width:20,editor:new Ext.form.NumberField({listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").a+=this.getValue()}}})},{header:"Y",dataIndex:"c",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").c+=this.getValue()}}})},{header:"S",dataIndex:"i",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){Ext.getCmp("addCruiseCabinType").i+=this.getValue()}}})},{header:"Preferences",dataIndex:"preference",width:95,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.accommodationPreference})},{header:"Option Services",dataIndex:"optionService",width:95,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.accommodationOptionalServices})},{header:"Class",dataIndex:"cls",width:95,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.railClasses})},{header:"Extras",dataIndex:"extras",width:175,height:70,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:" ",store:TDS.data.accommodationExtras}),renderer:function(c,e,a,f,d,b){if(c!=""){e.attr='ext:qtip="'+c+'"'}return c}},{header:"Price",dataIndex:"price",hidden:true,width:60,fixed:true},{header:"Extras",dataIndex:"extras",hidden:true,width:60,fixed:true},{header:"Status",dataIndex:"status",hidden:true,width:60,fixed:true}],bbar:[{xtype:"button",text:"Add",id:"addCruiseCabinType",roomNo:1,a:0,c:0,i:0,handler:function(){;var e=this.ownerCt.ownerCt;var d=e.getStore();if(d.data.length==0){this.a=0;this.c=0;this.i=0;this.roomNo=1}var a=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(5).items.length;if(this.roomNo<=a){var b=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(5).items.itemAt((this.roomNo-1)).totalPaxPerRoom;if((this.a+this.c+this.i)>=b&&b!=0){this.roomNo+=1;this.a=0;this.c=0;this.i=0;if((this.roomNo-1)>=a){b=0}else{b=this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(5).items.itemAt((this.roomNo-1)).totalPaxPerRoom}}this.ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax: "+(b-(this.a+this.c+this.i));if(this.roomNo<=a){var c=this.ownerCt.items.itemAt(1);c.enable();var e=this.ownerCt.ownerCt;var d=e.getStore();d.add([new d.recordType({no:this.roomNo,preference:"",optionService:"",cls:"",roomType:"",rooms:"",extras:" "})]);e.newRecordIndex=d.getCount()-1;e.startEditing(e.newRecordIndex,1)}}else{this.ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp; 0"}}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){;if(this.ownerCt.items.itemAt(0).roomNo>0){this.ownerCt.items.itemAt(0).roomNo-=1}var b=this.ownerCt.items.itemAt(0);b.enable();var c=this.ownerCt.ownerCt;var a=c.getStore().getAt(c.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}c.getStore().remove(a);if(c.getStore().length<=0){this.disable()}}},"->","Un-allocated Pax:&nbsp;&nbsp;0"]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 120px;margin-top: 4px;margin-bottom: 5px;",border:false,hideBorders:false,layoutConfig:{columns:7},defaults:{border:false},items:[{html:"&nbsp;&nbsp;Rail Pass Holder:",border:false,hideBorders:false,width:110},{xtype:"radio",name:"railPassHolder",checked:true,inputValue:"No",listeners:{check:function(){if(this.getValue()){this.ownerCt.items.itemAt(6).disable(true);this.ownerCt.items.itemAt(6).setValue("")}}}},{html:"&nbsp;No",width:50},{xtype:"radio",name:"railPassHolder",boxlabel:"Yes",inputValue:"Yes",listeners:{check:function(){if(this.getValue()){this.ownerCt.items.itemAt(6).enable(true);this.ownerCt.items.itemAt(6).setValue("")}}}},{html:"&nbsp;Yes",width:40},{width:20},{xtype:"numberfield",width:145,disabled:true,name:"railPassHolderMembersCount"}]},{xtype:"textfield",style:"margin-bottom:5px;  margin-left: 120px; ",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pass&nbsp;Name",name:"name",width:280},{xtype:"textfield",style:"margin-bottom:5px;  margin-left: 120px; ",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pass&nbsp;Duration",name:"duration",width:280}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 10px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},calculateTotalPrice:function(){;var b=this;var j=0;var g=b.items.itemAt(2).items.itemAt(4).getValue();var e=b.items.itemAt(2).items.itemAt(1).getValue();var f=b.items.itemAt(3).items.itemAt(6).getValue();var d=b.items.itemAt(3).items.itemAt(2).getValue();var h=b.items.itemAt(3).items.itemAt(6);var a=b.items.itemAt(3).items.itemAt(2);if(f!="undefined"&&f!=""){}else{}var c=b.items.itemAt(4).items.itemAt(1).getValue();var l=b.items.itemAt(4).items.itemAt(4).getValue();var m=b.items.itemAt(4).items.itemAt(4);var k=b.items.itemAt(5).items.itemAt(4);var i=b.items.itemAt(5).items.itemAt(1).getValue();if(g=="true"){h.setValue("");a.setValue("")}else{m.setValue("")}return},items:[{xtype:"editorgrid",id:"passGrid",height:120,width:630,clicksToEdit:1,store:new Ext.data.JsonStore({url:"",identifier:"",fields:["priceSell","pricingPriceCurrency","roomType","status","paxType"]}),viewConfig:{forceFit:true},getPricingTotal:function(){var a=this;setTimeout(function(){var c=a.getStore().data;var e=0;for(var b=0;b<c.length;b++){if(c.items[b].data.priceSell!=null&&c.items[b].data.priceSell!=""){e+=parseFloat(c.items[b].data.priceSell)}}},100)},getData:function(){var b=this.getStore().data;for(var a=0,c=[];a<b.length;a++){c.push(b.items[a].data)}return{data:c}},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Pax Type",dataIndex:"paxType",width:80,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Passengers",dataIndex:"passengersTotal",width:80,fixed:true,editor:new Ext.form.TextField({})},{header:"DOB",dataIndex:"dob",width:90,fixed:true,editor:new Ext.form.TextField({})},{header:"Age",dataIndex:"age",width:50,fixed:true,editor:new Ext.form.TextField({})},{header:"Curr",dataIndex:"pricingPriceCurrency",width:50,fixed:true,editor:new Ext.form.TextField({})},{header:"Price Per Person",dataIndex:"priceSell",width:100,fixed:true,editor:new Ext.form.NumberField({}),renderer:TDS.util.Price.conversionPriceRenderer},{header:"Status",dataIndex:"status",width:60,fixed:true,editor:new Ext.form.ComboBox({store:[["NA","NA"],["QT","QT"],["OK","OK"]],editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})}],bbar:[{xtype:"button",text:"Add",handler:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var e=this.ownerCt.ownerCt;var d=e.getStore();d.add([new d.recordType({roomType:"",pricingPriceCurrency:b.pricingPriceCurrency,priceSell:"",status:"QT"})]);e.startEditing(d.getCount()-1,1)}},{xtype:"button",text:"Remove",handler:function(){var b=this.ownerCt.ownerCt,a;while(a=b.selModel.getSelected()){b.store.remove(a)}}}],listeners:{render:function(){;var b=this;var j=this.ownerCt.findParentByType("awesomewindow");var h=j.aw.data;var f=Ext.util.JSON.decode(h.parameters);if(typeof f!="undefined"&&typeof f.roomTypesWithPrice!="undefined"&&f.roomTypesWithPrice!=""){var d=Ext.util.JSON.decode(f.roomTypesWithPrice);var g=d;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}else{var c=Ext.util.JSON.decode(h.parameters);if(typeof c!="undefined"&&c!=""&&typeof c.gridData!="undefined"&&c.gridData!=""){var d=Ext.util.JSON.decode(c.gridData);var g=[];if(typeof g=="undefined"){g=[]}if(typeof d.data!="undefined"){for(var e=0;e<d.data.length;e++){if(g.indexOf(d.data[e].roomType)==-1){var k=this.getStore();k.add([new k.recordType({roomType:d.data[e].roomType,pricingPriceCurrency:h.pricingPriceCurrency,priceSell:"",status:"QT"})])}}}}}}}},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:"Supplier:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"supplierURI",mode:"local",width:290}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Booking Ref:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"bookingReferenceNumber",mode:"local",width:95,triggerAction:"all",editable:true},{width:20,border:false},{html:"Gross/Net:",border:false,hideBorders:false,width:80},{xtype:"combo",name:"pricingPriceIsNett",mode:"local",width:95,triggerAction:"all",editable:true,store:[["false","Gross"],["true","Nett"]],listeners:{select:function(){;var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);if(this.getValue()=="true"){var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);c.disable(true);c.setValue("");b.disable(true);b.setValue("");var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.enable().focus(false,10);this.ownerCt.ownerCt.calculateTotalPrice()}else{var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.disable(true);a.setValue("");var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);this.ownerCt.ownerCt.calculateTotalPrice()}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:7},items:[{xtype:"radio",name:"priceCommissionr",checked:true,width:20,boxlabel:"No",inputValue:"priceCommission",listeners:{check:function(){;var c=this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(4).getValue();var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var a=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);if(this.getValue()&&c!="true"){b.enable();a.disable(true);a.setValue("")}else{if(!this.getValue()&&c!="true"){b.disable(true);b.setValue("");a.enable();this.ownerCt.ownerCt.calculateTotalPrice()}}}}},{html:"Commision %",border:false,hideBorders:false,width:80},{xtype:"textfield",name:"pricingPriceCommission",mode:"local",width:95,triggerAction:"all",editable:true},{width:20,border:false},{xtype:"radio",name:"priceCommissionr",width:20,boxlabel:"No",inputValue:"priceCommission"},{html:"Commision $",border:false,hideBorders:false,width:60},{xtype:"textfield",name:"priceCommission$",mode:"local",width:95,triggerAction:"all",editable:true}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Markdown",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"markdown",mode:"local",width:95,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{width:20,border:false},{html:"",border:false,hideBorders:false,width:80,xtype:"label",listeners:{render:function(){;var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.fixedCurrency;if(typeof d!="undefined"&&d){this.setText("Markup "+d+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ",false)}}}},{xtype:"textfield",name:"pricingPriceCommission",mode:"local",width:95,triggerAction:"all",editable:true}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:2},items:[{html:"Details:",border:false,hideBorders:false,width:100},{xtype:"textarea",name:"details",mode:"local",hieght:40,width:290,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Menu",handler:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[1].backToMenu()}},{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"Back"},{html:"&nbsp;",width:80},{xtype:"button",text:"Next",handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]},{title:"Additional Info",items:[{xtype:"textarea",name:"description",height:455,width:685,hideLabel:true,border:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Menu",handler:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[1].backToMenu()}},{html:"&nbsp;",width:500},{xtype:"button",text:"Back",handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.setActiveTab(0)}},{html:"&nbsp;",width:10},{xtype:"button",text:"Next",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].enable(true);a.buttons[1].enable(true);b.setActiveTab(2)}},{html:"&nbsp; ",width:10}]}]},{title:"Passengers",items:[{xtype:"panel",border:false,style:"margin-bottom: 6px;",html:"<p>Please select the passengers for this booking below.</p>"},{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"editorgrid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],bbar:[{xtype:"button",text:"Add",handler:function(){var b=this.ownerCt.items.itemAt(1);var a=this.ownerCt.items.itemAt(2);a.enable();b.enable();this.disable();var d=this.ownerCt.ownerCt;var c=d.getStore();c.add([new c.recordType({type:"AD",nameFirst:"",nameLast:"",paxAge:""})]);d.newRecordIndex=c.getCount()-1;d.startEditing(d.newRecordIndex,2)}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){var c=this.ownerCt.items.itemAt(0);var b=this.ownerCt.items.itemAt(2);c.enable();b.disable();var d=this.ownerCt.ownerCt;var a=d.getStore().getAt(d.newRecordIndex);if(a==-1||typeof a.get("dataURI")!="undefined"){return}d.getStore().remove(a);this.disable()}},{xtype:"button",text:"Save",disabled:true,handler:function(){var b=this.ownerCt.findParentByType("awesomewindow");var e=this.ownerCt.ownerCt;var d=this.ownerCt.items.itemAt(0);var c=this.ownerCt.items.itemAt(1);c.disable();this.disable();var a=e.getStore().getAt(e.newRecordIndex);if(a==-1||typeof a.get("dataURI")!="undefined"){return}Ext.Ajax.request({url:TDS.env.dataPath+b.aw.data.pnrDataURI+"/passengers",jsonData:a.data,method:"POST",callback:function(h,f,g){if(f){e.getStore().load();grid.getView().refresh();d.enable()}else{c.enable();this.enable()}},scope:this})}}],listeners:{beforeedit:function(a){},render:function(){var w=this.ownerCt.findParentByType("awesomewindow");this.getSelectionModel().on("beforerowselect",this.validatePassenger,this);with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/concise";load()}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 10px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{xtype:"button",text:"Menu",handler:function(){var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[1].backToMenu()}},{html:"&nbsp;",width:480},{xtype:"button",hidden:true,text:"next"},{html:"&nbsp;",width:80},{xtype:"button",text:"Back",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].disable(true);a.buttons[1].disable(true);b.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]}]}