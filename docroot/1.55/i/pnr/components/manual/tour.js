{xtype:"form",border:false,width:690,beforeSubmit:function(b){;b.type="TOUR";try{var a=this.ownerCt;if(typeof b.countryFromCode=="undefined"||b.countryFromCode==""){Ext.getCmp("countryFromCode").markInvalid("Please select Dep Country.");Ext.getCmp("countryFromCode").focus(true);throw"Please select Dep Country.";return false}if(typeof b.countryToCode=="undefined"||b.countryToCode==""){Ext.getCmp("countryToCode").markInvalid("Please select Arr Country.");Ext.getCmp("countryToCode").focus(true);throw"Please select Arr Country.";return false}if(typeof b.dateFrom=="undefined"||b.dateFrom==""){Ext.getCmp("dateFrom").markInvalid("Please select Dep Date From.");Ext.getCmp("dateFrom").focus(true);throw"Please select Dep Date From.";return false}if(typeof b.A1=="undefined"||b.A1==""){Ext.getCmp("A1").markInvalid("Please select Adult.");Ext.getCmp("A1").focus(true);throw"Please select Adult.";return false}if(typeof b.tourTypeURI=="undefined"||b.tourTypeURI==""){Ext.getCmp("tourTypeURI").markInvalid("Please select Tour Type.");Ext.getCmp("tourTypeURI").focus(true);throw"Please select Tour Type.";return false}}catch(h){a.showValidation(h);return false}var g=this.items.itemAt(0).items.itemAt(2).items.itemAt(1).items.itemAt(0).selModel.selections.items;var f=[];for(var c=0;c<g.length;c++){f.push(g[c].data.dataURI)}b.passengerURIs=f;b.mainRooms=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(5).getData();var d=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).getData();b.gridData=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).getData();b.roomTypesWithPrice=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).items.itemAt(0).getData();return b},requireStores:[{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:510,width:690,items:[{title:"Quote Details",layout:"form",items:[{height:453,autoScroll:true,border:false,items:[{xtype:"fieldset",layout:"form",border:false,autoHeight:true,labelWidth:100,style:"padding: 0;  margin-top: 8px; ",defaults:{style:"padding: 0; margin-left: 140px;margin-top: 8px;margin-bottom: 4px;"},items:[{html:"",xtype:"label",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d){this.setText('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2" color="#ff0000">Component:</font></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font size="2"   >PACKAGE '+d+"S</font></b>",false)}}}},{xtype:"panel",layout:"table",border:false,width:394,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Dep Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryFromCode",id:"countryFromCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationFromURI",id:"locationFromURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",border:false,width:394,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Arr Country/City<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"combo",name:"countryToCode",id:"countryToCode",emptyText:"Type a country...",excludeSubmit:true,tpl:TDS.util.Templates.ComboNoLabel,minChars:1,enableKeyEvents:true,mode:"local",width:124,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"isoCode",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","isoCode"]}),appendData:[{name:"",dataURI:""}]},{xtype:"locationcombo",name:"locationToURI",id:"locationToURI",style:"margin-left: 2px;",width:154,listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+"country/"+a.getValue()+"/locations/collection";c.searchIdentifier="country/"+a.getValue()+"/locations"}}}]},{xtype:"panel",layout:"table",border:false,hideBorders:true,layoutConfig:{columns:5},items:[{html:'Dep Date From<font color="red">*</font>:',width:Ext.isIE?105:110},{xtype:"datefield",name:"dateFrom",id:"dateFrom",format:"dMy",minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime(),width:125,menuListeners:Ext.applyIf({select:function(c,b){Ext.form.DateField.prototype.menuListeners.select.call(this,c,b);var a=this.getValue();a.setDate(a.getDate()+1);this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(3).setMinValue(a)}},Ext.form.DateField.prototype.menuListeners)},{html:"&nbsp;&nbsp;&nbsp;To:",width:30},{xtype:"datefield",name:"dateTo",id:"dateTo",format:"dMy",width:125}]},{xtype:"panel",layout:"table",width:390,border:false,hideBorders:true,layoutConfig:{columns:5},items:[{html:"Duration:",width:Ext.isIE?105:110},{html:"Nights:",width:60},{xtype:"numberfield",name:"durationNights",width:65},{html:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;of&nbsp;Days:",width:80},{xtype:"numberfield",name:"durationDays",width:75}]},{layout:"form",border:false,id:"roomsPaxId",autoHeight:true,labelWidth:100,width:405,getData:function(){var g=this.items;var f=g.length;var m=[];for(var h=0;h<f;h++){var d={};var e=[];var p=[];var o=g.itemAt(h).items.itemAt(3).getValue();var n=g.itemAt(h).items.itemAt(5).getValue();var k=g.itemAt(h).items.itemAt(7).getValue();d.adult=o;d.child=n;for(var b=0;b<n;b++){e.push(g.itemAt(h).items.itemAt(9).items.itemAt(b).getValue())}d.childAge=e;d.infant=k;for(var b=0;b<n;b++){p.push(g.itemAt(h).items.itemAt(11).items.itemAt(b).getValue())}d.infantAge=p;m.push(d)}return{data:m}},calculateTotalPax:function(){var g=0;var d=this.items.length;for(var e=0;e<d;e++){var b=this.items.itemAt(e).items.itemAt(3).getValue();var h=this.items.itemAt(e).items.itemAt(5).getValue();var f=this.items.itemAt(e).items.itemAt(7).getValue();b=b?b:0;h=h?h:0;f=f?f:0;g+=(b+h+f)}this.ownerCt.items.itemAt(6).items.itemAt(4).setValue(g);Ext.getCmp("addTourRoomType").totalPassengers=g;Ext.getCmp("addTourRoomType").ownerCt.ownerCt.displayTotalPaxForAllocation();if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").innerHTML="Total of <b>"+g+" Passenger(s)</b> is been Added to this Manual Quote Booking."}},items:[{xtype:"panel",layout:"table",width:390,style:"padding: 0; margin-bottom: 4px;margin-top: 8px;",border:false,hideBorders:true,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(3).getValue();var e=this.items.itemAt(5).getValue();var d=this.items.itemAt(7).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;this.ownerCt.calculateTotalPax();this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(4).bottomToolbar.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;"+((this.totalPaxPerRoom>0)?this.totalPaxPerRoom:0)},layoutConfig:{columns:8},items:[{xtype:"checkbox",readOnly:true,width:20},{html:"Room 1",width:90},{html:'Adults<font color="red">*</font>:',width:48},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A1",id:"A1",triggerAction:"all",readOnly:true,width:42,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Child:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"C1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(9).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:55},{xtype:"combo",store:[0,1,2,3,4,5],name:"I1",triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var c=this.ownerCt.items.itemAt(11).items;var b=this.getValue();for(var a=0;a<5;a++){if(a<b){c.itemAt(a).show(true)}else{c.itemAt(a).hide(true)}}}}},{html:" ",colspan:5,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C11",width:30},{xtype:"numberfield",name:"C12",width:30},{xtype:"numberfield",name:"C13",width:30},{xtype:"numberfield",name:"C14",width:30},{xtype:"numberfield",name:"C15",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I11",width:30},{xtype:"numberfield",name:"I12",width:30},{xtype:"numberfield",name:"I13",width:30},{xtype:"numberfield",name:"I14",width:30},{xtype:"numberfield",name:"I15",width:30}]}]}]},{xtype:"panel",layout:"table",border:false,hideBorders:false,layoutConfig:{columns:8},items:[{xtype:"button",text:"<b>+</b>",roomNo:1,handler:function(){this.roomNo+=1;var a=this.roomNo;if(a<=5){this.ownerCt.ownerCt.items.itemAt(5).add(new Ext.Panel({layout:"table",width:390,style:"padding: 0; margin-bottom: 4px;margin-top: 8px;",border:false,name:a,totalPaxPerRoom:0,totalPaxPerRoomCalc:function(){var b=this.items.itemAt(3).getValue();var e=this.items.itemAt(5).getValue();var d=this.items.itemAt(7).getValue();b=b?b:0;e=e?e:0;d=d?d:0;this.totalPaxPerRoom=b+e+d;;this.ownerCt.calculateTotalPax()},hideBorders:true,layoutConfig:{columns:8},items:[{xtype:"checkbox",width:20},{html:"Room "+a,width:90},{html:'Adults<font color="red">*</font>:',width:48},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"A"+a,triggerAction:"all",readOnly:true,width:42,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc()}}},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Child:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"C"+a,triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var d=this.ownerCt.items.itemAt(9).items;var c=this.getValue();for(var b=0;b<5;b++){if(b<c){d.itemAt(b).show(true)}else{d.itemAt(b).hide(true)}}}}},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Infants:",width:55},{xtype:"combo",store:[0,1,2,3,4,5],name:"I"+a,triggerAction:"all",readOnly:true,width:40,listeners:{select:function(){this.ownerCt.totalPaxPerRoomCalc();var d=this.ownerCt.items.itemAt(11).items;var c=this.getValue();for(var b=0;b<5;b++){if(b<c){d.itemAt(b).show(true)}else{d.itemAt(b).hide(true)}}}}},{html:" ",colspan:5,width:150},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"C"+a+"1",width:30},{xtype:"numberfield",name:"C"+a+"2",width:30},{xtype:"numberfield",name:"C"+a+"3",width:30},{xtype:"numberfield",name:"C"+a+"4",width:30},{xtype:"numberfield",name:"C"+a+"5",width:30}]},{html:" ",width:53},{xtype:"panel",width:45,defaults:{hidden:true},items:[{xtype:"numberfield",name:"I"+a+"1",width:30},{xtype:"numberfield",name:"I"+a+"2",width:30},{xtype:"numberfield",name:"I"+a+"3",width:30},{xtype:"numberfield",name:"I"+a+"4",width:30},{xtype:"numberfield",name:"I"+a+"5",width:30}]}]}));this.ownerCt.ownerCt.items.itemAt(5).doLayout()}}},{xtype:"button",text:"<b>-</b>",roomNo:1,handler:function(){var c=1;var e=this.ownerCt.ownerCt.items.itemAt(5).items;var f=this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(0);if(f.roomNo>5){f.roomNo=5}for(var d=0;d<e.length;d++){if(e.itemAt(d).items.itemAt(0).checked){this.ownerCt.ownerCt.items.itemAt(5).remove(e.itemAt(d),true);f.roomNo-=1;d=-1}}for(var d=0;d<e.length;d++){if(e.itemAt(d).items.itemAt(0).checked||e.itemAt(d).hidden){e.itemAt(d).items.itemAt(0).checked=false}else{var b=e.itemAt(d).items.itemAt(1);e.itemAt(d).items.itemAt(1).el.dom.innerHTML="Room "+(c);c++}}this.ownerCt.ownerCt.items.itemAt(5).calculateTotalPax()}},{border:false,width:50},{border:false,html:"Total&nbsp;Pax:",width:50},{xtype:"numberfield",name:"totalPax",id:"ID_TOTAL_PAX",width:41}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 130px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,disabled:true,hidden:true,width:390,hideBorders:false,layoutConfig:{columns:4},items:[{html:'Supplier<font color="red">*</font>',border:false,hideBorders:false,width:110},{xtype:"combo",mode:"local",width:280,triggerAction:"all",editable:true,displayField:"name",valueField:"dataURI",store:TDS.data.MQsupplierStore}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:'Tour Type<font color="red">*</font>:',border:false,hideBorders:false,width:110},{xtype:"combo",fieldLabel:"Type",name:"tourTypeURI",id:"tourTypeURI",mode:"local",width:280,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"dataURI",emptyText:"Type",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"tour/types/collection",identifier:"tour/types",fields:["name","dataURI"]})}]},{xtype:"textfield",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tour&nbsp;Name",name:"name",width:280},{xtype:"textfield",fieldLabel:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tour&nbsp;Description",name:"tourDescription",width:280},{xtype:"editorgrid",height:160,hidden:true,clicksToEdit:1,width:630,style:"padding: 0;margin-left: 10px; margin-bottom: 6px;margin-top: 6px;",store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["dataURI","roomNo","roomType","plan","rooms","price","extras","status","paxType"]}),viewConfig:{},getTotalPaxAdded:function(){;var h=this.getStore().data;var g=0;for(var e=0,k=[];e<h.length;e++){var b=h.items[e].data.a;var l=h.items[e].data.c;var f=h.items[e].data.i;if(b!=""&&typeof b!="undefined"){g+=b}if(l!=""&&typeof l!="undefined"){g+=l}if(f!=""&&typeof f!="undefined"){g+=f}}return g},displayTotalPaxForAllocation:function(){var a=Ext.getCmp("addTourRoomType").totalPassengers-this.getTotalPaxAdded();if(a<0){a=0}Ext.getCmp("addTourRoomType").ownerCt.items.itemAt(3).td.innerHTML="Un-allocated Pax:&nbsp;&nbsp;"+a},validateTotalPax:function(e,b){var l=this;var n=Ext.getCmp("addTourRoomType").roomNo;var u=Ext.getCmp("roomsPaxId").items.itemAt(n-1).items;var m=u.itemAt(3).getValue();var k=u.itemAt(5).getValue();var g=u.itemAt(7).getValue();var p=l.getStore().data;var o=0;var q=0;var f=0;var h=0;for(var v=0,x=[];v<p.length;v++){if(p.items[v].data.roomNo==n){var z=p.items[v].data.a;var y=p.items[v].data.c;var w=p.items[v].data.i;if(z!=""&&typeof z!="undefined"){q+=z}if(y!=""&&typeof y!="undefined"){f+=y}if(w!=""&&typeof w!="undefined"){h+=w}}}this.displayTotalPaxForAllocation();if(e=="a"&&q>m){Ext.Msg.alert("Alert","Enter Valid Adults.",function(){l.startEditing(l.newRecordIndex,1)});return false}if(e=="c"&&f>k){Ext.Msg.alert("Alert","Enter Valid Children.",function(){l.startEditing(l.newRecordIndex,2)});return false}if(e=="i"&&h>g){Ext.Msg.alert("Alert","Enter Valid Infants.",function(){l.startEditing(l.newRecordIndex,3)});return false}return true},getNextRoomNo:function(){var N=Ext.getCmp("addTourRoomType").roomNo;var Q=Ext.getCmp("roomsPaxId").items;var v=0;var G=0;var O=0;var q=0;var F=0;var K=0;var o=0;var E=0;var J=0;var m=0;var D=0;var I=0;var l=0;var C=0;var H=0;for(var R=0,U=[];R<Q.length;R++){var L=Q.itemAt(R).items;var W=L.itemAt(3).getValue();var V=L.itemAt(5).getValue();var S=L.itemAt(7).getValue();if(R==0){if(W!=""&&typeof W!="undefined"){v=W}if(V!=""&&typeof V!="undefined"){G=V}if(S!=""&&typeof S!="undefined"){O=S}}else{if(R==1){if(W!=""&&typeof W!="undefined"){q=W}if(V!=""&&typeof V!="undefined"){F=V}if(S!=""&&typeof S!="undefined"){K=S}}else{if(R==2){if(W!=""&&typeof W!="undefined"){o=W}if(V!=""&&typeof V!="undefined"){E=V}if(S!=""&&typeof S!="undefined"){J=S}}else{if(R==3){if(W!=""&&typeof W!="undefined"){m=W}if(V!=""&&typeof V!="undefined"){D=V}if(S!=""&&typeof S!="undefined"){I=S}}else{if(R==4){if(W!=""&&typeof W!="undefined"){l=W}if(V!=""&&typeof V!="undefined"){C=V}if(S!=""&&typeof S!="undefined"){H=S}}}}}}}var P=this.getStore().data;var M=0;var w=0;var h=0;var B=0;var u=0;var g=0;var A=0;var p=0;var f=0;var z=0;var n=0;var e=0;var y=0;var k=0;var b=0;var x=0;for(var R=0,U=[];R<P.length;R++){var W=P.items[R].data.a;var V=P.items[R].data.c;var S=P.items[R].data.i;if(P.items[R].data.roomNo==1){if(W!=""&&typeof W!="undefined"){w+=W}if(V!=""&&typeof V!="undefined"){h+=V}if(S!=""&&typeof S!="undefined"){B+=S}}else{if(P.items[R].data.roomNo==2){if(W!=""&&typeof W!="undefined"){u+=W}if(V!=""&&typeof V!="undefined"){g+=V}if(S!=""&&typeof S!="undefined"){A+=S}}else{if(P.items[R].data.roomNo==3){if(W!=""&&typeof W!="undefined"){p+=W}if(V!=""&&typeof V!="undefined"){f+=V}if(S!=""&&typeof S!="undefined"){z+=S}}else{if(P.items[R].data.roomNo==4){if(W!=""&&typeof W!="undefined"){n+=W}if(V!=""&&typeof V!="undefined"){e+=V}if(S!=""&&typeof S!="undefined"){y+=S}}else{if(P.items[R].data.roomNo==5){if(W!=""&&typeof W!="undefined"){k+=W}if(V!=""&&typeof V!="undefined"){b+=V}if(S!=""&&typeof S!="undefined"){x+=S}}}}}}}var T=Ext.getCmp("addTourRoomType");if(v>w||G>h||O>B){T.roomNo=1}else{if(q>u||F>g||K>A){T.roomNo=2}else{if(o>p||E>f||J>z){T.roomNo=3}else{if(m>n||D>e||I>y){T.roomNo=4}else{if(l>k||C>b||H>x){T.roomNo=5}else{if(P.length==0){T.roomNo=1}}}}}}},getData:function(){var c=this.getStore().data;for(var b=0,e=[];b<c.length;b++){var a=c.items[b].data.mode;if(a!=""){e.push(c.items[b].data)}}return{data:e}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[{header:"Room No",dataIndex:"roomNo",width:55,editor:new Ext.form.NumberField({})},{header:"A",dataIndex:"a",width:20,editor:new Ext.form.NumberField({listeners:{blur:function(){var a=this;setTimeout(function(){var b=Ext.getCmp("addTourRoomType");if(!b.ownerCt.ownerCt.validateTotalPax("a",a)){if(a.getValue()!=""){b.a+=parseInt(a.getValue())}}},100)}}})},{header:"C",dataIndex:"c",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){var a=this;setTimeout(function(){var b=Ext.getCmp("addTourRoomType");if(!b.ownerCt.ownerCt.validateTotalPax("c",a)){if(this.getValue()!=""){b.c+=parseInt(this.getValue())}}},100)}}})},{header:"I",dataIndex:"i",width:20,editor:new Ext.form.NumberField({minValue:0,maxValue:5,listeners:{blur:function(){var a=this;setTimeout(function(){var b=Ext.getCmp("addTourRoomType");if(!b.ownerCt.ownerCt.validateTotalPax("i",a)){if(this.getValue()!=""){b.i+=parseInt(this.getValue())}}},100)}}})},{header:"Room Type",dataIndex:"roomType",width:150,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:"Type",store:TDS.data.tourRoomTypeMQ})},{header:"Extras",dataIndex:"extras",width:340,height:70,editor:new Ext.ux.form.SuperBoxSelect({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"name",emptyText:"Type",xtype:"superboxselect",store:TDS.data.accommodationExtraMQ}),renderer:function(c,e,a,f,d,b){if(c!=""){e.attr='ext:qtip="'+c+'"'}return c}},{header:"Price",dataIndex:"price",hidden:true,width:60,fixed:true},{header:"Extras",dataIndex:"extras",hidden:true,width:60,fixed:true},{header:"Status",dataIndex:"status",hidden:true,width:60,fixed:true}],bbar:[{xtype:"button",text:"Add",id:"addTourRoomType",totalPassengers:0,totalPassengersAdded:0,roomNo:1,a:0,c:0,i:0,handler:function(){;var a=this.ownerCt.ownerCt.ownerCt.ownerCt;var e=a.items.itemAt(0).items.itemAt(2).items.itemAt(1);var d=a.items.itemAt(0).items.itemAt(3).items.itemAt(1);var c=e.getValue();var f=d.getValue();if(c==""||c==null){e.markInvalid("In Date Required.");e.focus(true);return false}var b=this;setTimeout(function(){if((b.totalPassengers-b.ownerCt.ownerCt.getTotalPaxAdded())>0){b.ownerCt.ownerCt.getNextRoomNo();b.ownerCt.ownerCt.displayTotalPaxForAllocation();var h=b.ownerCt.items.itemAt(1);h.enable();var j=b.ownerCt.ownerCt;var i=j.getStore();i.add([new i.recordType({roomNo:b.roomNo,roomType:"",plan:"",rooms:"",extras:" "})]);j.newRecordIndex=i.getCount()-1;j.startEditing(j.newRecordIndex,1)}},100)}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){;if(this.ownerCt.items.itemAt(0).roomNo>0){this.ownerCt.items.itemAt(0).roomNo-=1}var b=this.ownerCt.items.itemAt(0);b.enable();var c=this.ownerCt.ownerCt;var a=c.getStore().getAt(c.selModel.last);if(a==-1||typeof a.get("dataURI")!="undefined"){return}c.getStore().remove(a);if(c.getStore().length<=0){this.disable()}this.ownerCt.ownerCt.displayTotalPaxForAllocation()}},"->","Un-allocated Pax:&nbsp;&nbsp;0"]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:11},defaults:{border:false},items:[{html:"Tour Club Member:",border:false,hideBorders:false,width:110},{xtype:"radio",name:"tourClubMember",checked:true,boxlabel:"No",inputValue:"noTourMember",listeners:{check:function(){if(this.getValue()){this.ownerCt.items.itemAt(10).enable(true);this.ownerCt.items.itemAt(10).setValue("")}}}},{html:"&nbsp;No",width:50},{xtype:"radio",name:"tourClubMember",inputValue:"yesTourMember",boxlabel:"Yes",listeners:{check:function(){if(this.getValue()){this.ownerCt.items.itemAt(10).enable(true);this.ownerCt.items.itemAt(10).setValue("")}}}},{html:"&nbsp;yes",width:40},{html:"Adults:",width:40},{xtype:"combo",store:[0,1,2,3,4,5,6,7,8,9,10],name:"adultsTourMember",triggerAction:"all",readOnly:true,width:42},{html:" &nbsp;&nbsp;&nbsp;&nbsp;Child:",width:50},{xtype:"combo",store:[0,1,2,3,4,5],name:"childTourMember",triggerAction:"all",readOnly:true,width:40},{width:20},{xtype:"numberfield",width:93,disabled:true,name:"tourMembersCount"}]}]},{xtype:"fieldset",defaults:{style:"padding: 0; margin-left: 10px; "},autoHeight:true,labelWidth:105,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.type;if(typeof d!="undefined"&&d==TDS.data.componentType.TYPE_ACCOMMODATION){this.enable(true);this.show(true)}}},calculateTotalPrice:function(){;var b=this;var j=0;var g=b.items.itemAt(2).items.itemAt(4).getValue();var e=b.items.itemAt(2).items.itemAt(1).getValue();var f=b.items.itemAt(3).items.itemAt(6).getValue();var d=b.items.itemAt(3).items.itemAt(2).getValue();var h=b.items.itemAt(3).items.itemAt(6);var a=b.items.itemAt(3).items.itemAt(2);if(f!="undefined"&&f!=""){}else{}var c=b.items.itemAt(4).items.itemAt(1).getValue();var l=b.items.itemAt(4).items.itemAt(4).getValue();var m=b.items.itemAt(4).items.itemAt(4);var k=b.items.itemAt(5).items.itemAt(4);var i=b.items.itemAt(5).items.itemAt(1).getValue();if(g=="true"){h.setValue("");a.setValue("")}else{m.setValue("")}return},items:[{xtype:"editorgrid",id:"passGrid",height:120,width:630,clicksToEdit:1,store:new Ext.data.JsonStore({url:"",identifier:"",fields:["priceSell","pricingPriceCurrency","roomType","passengersTotal","dob","age","status","paxType"]}),viewConfig:{forceFit:true},getPricingTotal:function(){var a=this;setTimeout(function(){var c=a.getStore().data;var e=0;for(var b=0;b<c.length;b++){if(c.items[b].data.priceSell!=null&&c.items[b].data.priceSell!=""){e+=parseFloat(c.items[b].data.priceSell)}}},100)},getData:function(){var b=this.getStore().data;for(var a=0,c=[];a<b.length;a++){c.push(b.items[a].data)}return{data:c}},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Room Type",dataIndex:"roomType",width:130,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.tourRoomTypeMQ,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"value"})},{header:"Pax Type",dataIndex:"paxType",width:80,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Passengers",dataIndex:"passengersTotal",width:60,fixed:true,editor:new Ext.form.TextField({})},{header:"DOB",dataIndex:"dob",width:80,fixed:true,editor:new Ext.form.TextField({})},{header:"Age",dataIndex:"age",width:40,fixed:true,editor:new Ext.form.TextField({})},{header:"Curr",dataIndex:"pricingPriceCurrency",width:50,fixed:true,editor:new Ext.form.TextField({})},{header:"Price Per Person",dataIndex:"priceSell",width:90,fixed:true,editor:new Ext.form.NumberField({}),renderer:TDS.util.Price.conversionPriceRenderer},{header:"Status",dataIndex:"status",width:50,fixed:true,editor:new Ext.form.ComboBox({store:[["OK","OK"],["RQ","RQ"],["WL","WL"],["XX","XX"]],editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})}],bbar:[{xtype:"button",text:"Add",handler:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var e=this.ownerCt.ownerCt;var d=e.getStore();d.add([new d.recordType({roomType:"",passengersTotal:"",dob:"",age:"",pricingPriceCurrency:b.pricingPriceCurrency,priceSell:"",status:"WL"})]);e.startEditing(d.getCount()-1,1)}},{xtype:"button",text:"Remove",handler:function(){var b=this.ownerCt.ownerCt,a;while(a=b.selModel.getSelected()){b.store.remove(a)}}}],listeners:{render:function(){;var b=this;var j=this.ownerCt.findParentByType("awesomewindow");var h=j.aw.data;var f=Ext.util.JSON.decode(h.parameters);if(typeof f!="undefined"&&typeof f.roomTypesWithPrice!="undefined"&&f.roomTypesWithPrice!=""){var d=Ext.util.JSON.decode(f.roomTypesWithPrice);var g=d;if(typeof g=="undefined"){g=[]}if(typeof g.data!="undefined"){this.getStore().loadData(g.data)}}else{var c=Ext.util.JSON.decode(h.parameters);if(typeof c!="undefined"&&c!=""&&typeof c.gridData!="undefined"&&c.gridData!=""){var d=Ext.util.JSON.decode(c.gridData);var g=[];if(typeof g=="undefined"){g=[]}if(typeof d.data!="undefined"){for(var e=0;e<d.data.length;e++){if(g.indexOf(d.data[e].roomType)==-1){var k=this.getStore();k.add([new k.recordType({roomType:d.data[e].roomType,dob:d.data[e].dob,age:d.data[e].age,pricingPriceCurrency:h.pricingPriceCurrency,priceSell:"",status:"WL"})])}}}}}}}},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:4},items:[{html:"Supplier:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"supplierURI",id:"supplierURI",mode:"local",width:290}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Booking Ref:",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"bookingReferenceNumber",mode:"local",width:95,triggerAction:"all",editable:true},{width:20,border:false},{html:"Gross/Net:",border:false,hideBorders:false,width:80},{xtype:"combo",name:"priceIsNett",mode:"local",width:95,triggerAction:"all",editable:true,store:[["false","Gross"],["true","Nett"]],listeners:{select:function(){;var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);if(this.getValue()=="true"){var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);c.disable(true);c.setValue("");b.disable(true);b.setValue("");var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.enable().focus(false,10);this.ownerCt.ownerCt.calculateTotalPrice()}else{var a=this.ownerCt.ownerCt.items.itemAt(4).items.itemAt(4);a.disable(true);a.setValue("");var c=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);this.ownerCt.ownerCt.calculateTotalPrice()}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:7},items:[{xtype:"radio",name:"gross",width:20,boxlabel:"No",inputValue:"priceCommission",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;if(b.pricingPriceIsNett==false){this.setValue(true)}},check:function(){if(this.getValue()){var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);b.enable();var a=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);a.disable(true)}else{var b=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(2);b.disable(true);var a=this.ownerCt.ownerCt.items.itemAt(3).items.itemAt(6);a.enable();this.ownerCt.ownerCt.calculateTotalPrice()}}}},{html:"Commision %",border:false,hideBorders:false,width:80},{xtype:"textfield",name:"priceCommission",mode:"local",width:95,triggerAction:"all",editable:true},{width:20,border:false},{xtype:"radio",name:"gross",width:20,boxlabel:"No",inputValue:"priceCommission",listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;if(b.pricingPriceIsNett==true){this.setValue(true)}}}},{html:"Commision $",border:false,hideBorders:false,width:60},{xtype:"textfield",name:"priceCommission$",mode:"local",width:95,triggerAction:"all",editable:true}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:5},items:[{html:"Markdown",border:false,hideBorders:false,width:100},{xtype:"textfield",name:"markdown",mode:"local",width:95,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}},{width:20,border:false},{html:"",border:false,hideBorders:false,width:80,xtype:"label",listeners:{render:function(){;var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=b.fixedCurrency;if(typeof d!="undefined"&&d){this.setText("Markup "+d+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ",false)}}}},{xtype:"textfield",name:"priceCommission",mode:"local",width:95,triggerAction:"all",editable:true}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 130px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:2},items:[{html:"Details:",border:false,hideBorders:false,width:100},{xtype:"textarea",name:"details",mode:"local",hieght:40,width:290,triggerAction:"all",editable:true,listeners:{render:function(){var e=this.ownerCt.findParentByType("awesomewindow");var d=e.aw.data;var f=d.type;var g=Ext.util.JSON.decode(d.parameters);var c=this;setTimeout(function(){c.setValue(g[c.name])},500)}}}]}]}]},{border:false,items:[{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:430},{xtype:"button",hidden:true,text:"Back"},{html:"&nbsp;",width:80},{xtype:"button",text:"Next",handler:function(){;var a=this.ownerCt.ownerCt.ownerCt.ownerCt;a.setActiveTab(1);a.items.itemAt(1).setDisabled(false);a.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}],listeners:{render:function(){;var a=this.ownerCt;a.items.itemAt(1).setDisabled(true);a.items.itemAt(2).setDisabled(true)}}},{title:"Additional Info",items:[{xtype:"textarea",name:"description",height:455,width:685,hideLabel:true,border:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:true,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 4px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:470},{xtype:"button",text:"Back",handler:function(){var a=this.ownerCt.ownerCt.ownerCt;a.setActiveTab(0);a.items.itemAt(0).setDisabled(false);a.items.itemAt(1).setDisabled(true);a.items.itemAt(2).setDisabled(true);a.setActiveTab(0)}},{html:"&nbsp;",width:10},{xtype:"button",text:"Next",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].enable(true);a.buttons[1].enable(true);b.setActiveTab(2);b.items.itemAt(0).setDisabled(true);b.items.itemAt(1).setDisabled(true);b.items.itemAt(2).setDisabled(false);b.setActiveTab(2)}},{html:"&nbsp; ",width:10}]}]},{title:"Passengers",items:[{xtype:"panel",border:false,style:"margin-bottom: 6px;",html:'<div id="DISPLAY_PAX_COUNT"></div>',listeners:{render:function(){var a=Ext.getCmp("ID_TOTAL_PAX").getValue();if(!a){a=0}if(document.getElementById("DISPLAY_PAX_COUNT")){document.getElementById("DISPLAY_PAX_COUNT").InnerHTML="Total "+a+" is been Added to this Manual Quote Booking."}else{this.html='<font size="2" >Total of <b>'+a+" Passenger(s)</b> is been Added to this Manual Quote Booking.</font>"}}}},{xtype:"panel",border:false,layout:"fit",height:430,items:[{xtype:"editorgrid",height:440,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge"]}),viewConfig:{forceFit:true},getData:function(){var b=this.selModel.getSelections();var c=[];for(var a=0;a<b.length;a++){c[a]=b[a].get("dataURI")}return c},preselect:function(c,b){var a=[];this.getStore().each(function(d){if(a.length>=b){return false}if((!c||d.get("type")==c)&&d.get("nameFirst")&&d.get("nameLast")){a[a.length]=d}},this);if(a.length>0){this.getSelectionModel().selectRecords(a)}return a.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({allowBlank:false})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({allowBlank:false})},{header:"Title",dataIndex:"salutation",width:40,fixed:true,editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Age",dataIndex:"paxAge",width:40,renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}},editor:new Ext.form.NumberField({allowBlank:false})}],listeners:{beforeedit:function(a){},render:function(){var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/concise";load();var s=this.getStore().data;var t=this;setTimeout(function(){for(var j=0;j<s.length;j++){t.getSelectionModel().selectRow(j,true,false)}},800)}}}}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-left: 10px;margin-top: 10px;margin-bottom: 2px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;",width:450},{xtype:"button",hidden:true,text:"next"},{html:"&nbsp;",width:80},{xtype:"button",text:"Back",handler:function(){var b=this.ownerCt.ownerCt.ownerCt;var a=this.ownerCt.findParentByType("awesomewindow");a.buttons[0].disable(true);a.buttons[1].disable(true);b.setActiveTab(1);b.items.itemAt(0).setDisabled(true);b.items.itemAt(1).setDisabled(false);b.items.itemAt(2).setDisabled(true);b.setActiveTab(1)}},{html:"&nbsp; ",width:10}]}]}]}]}