{xtype:"form",border:false,termsAndConditions:"",markDataDirtyOnLoad:true,id:"dd",width:900,id:"tab",items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:450,defaults:{},items:[{title:"Itinerary",layout:"auto",items:[{xtype:"panel",layout:"auto",autoScroll:true,height:320,border:false,items:[{xtype:"panel",height:320,layout:"table",border:false,layoutConfig:{columns:2},style:"padding: 2px;",items:[{xtype:"panel",layout:"auto",border:true,height:300,items:[{xtype:"awesomegrid",id:"grid",alwaysUseCollection:true,width:450,height:150,border:false,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["day","portName","travelDateDisp","arrive","depart","cruiseOfferingURI","dataURI"]}),sm:new Ext.grid.RowSelectionModel(),columns:[{header:"Day/Date",dataIndex:"day",width:80},{header:"Ports",dataIndex:"portName",width:150},{header:"Arr",dataIndex:"arrive",width:80},{header:"Dep",dataIndex:"depart",width:80}],viewConfig:{forceFit:true},listeners:{beforerender:function(){},sessioninit:function(){var b=this.findParentByType("awesomewindow");var c=b.initialConfig.destinationDataURI;this.searchURI=TDS.env.dataPath+c+"/cruisePorts"},render:function(){var c=Ext.util.JSON.decode(Ext.getCmp("grid").findParentByType("awesomewindow").getData("itenaryList"));var f=c["sailingDates/itenaries"];if(typeof f=="undefined"){return}var e=[];for(var b=0;b<f.length;b++){c[f[b]].dataURI=f[b];e.push(c[f[b]])}var d=Ext.getCmp("grid").getStore();d.loadData(e);var a="";a="http://images.cruisefactory.net/images/cruises/"+e[0].portGraphics;this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0).items.itemAt(0).html='<center><img border="0"  width=400px;height:300px;   id="cruiseId" name="portImages" src='+a+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+a+">"}}}]},{xtype:"panel",layout:"auto",border:true,height:300,style:"padding-left:20px;",items:[{xtype:"panel",border:false,autoWidth:true,items:[{border:false,width:400,height:300,id:"portId",html:"portImages",listeners:{}}]}]}]}]},{xtype:"panel",layout:"auto",style:"padding: 2px;",height:50,border:true,items:{border:false,style:{"font-size":"12px","padding-left":"100px","padding-top":"10px"},html:"Itenary may vary by sailing date and itenaries may be changed at the cruise lines discretion.<br> Please check itenary details at time of booking and before booking other travel services such as airline tickets"}}]},{title:"Cruise Info",height:550,layout:"form",items:[{xtype:"panel",layout:"fit",autoScroll:true,border:false,style:"padding: 2px;",items:[{xtype:"panel",autoScroll:true,height:420,layout:"table",border:false,layoutConfig:{columns:1},style:"padding: 2px;",items:[{xtype:"panel",border:false,autoScroll:true,layout:"column",items:[{autoHeight:true,border:false,html:"logo",listeners:{render:function(b){var c=b.findParentByType("awesomewindow").getData("logo");var a="";a="http://images.cruisefactory.net/images/ships/thumbnails//"+c.thumbnail;this.html='<center style="position: relative; top: 40%; "> <img src="data:image/png;base64,'+c+'"></center><br><p><center style="font-weight:bold;font-size:25px;align:center; ">'+b.findParentByType("awesomewindow").getData("shipName")+"<center></p>"}}},{autoHeight:true,border:false,style:"padding-left:50px;",html:"shipImages",listeners:{render:function(b){var c=b.findParentByType("awesomewindow").getData("shipObj");var a="";a="http://images.cruisefactory.net/images/ships/thumbnails//"+c.thumbnail;this.html='<center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+a+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+a+">"}}}]},{xtype:"panel",width:850,layout:"fit",style:"padding-top:20px;",items:[{xtype:"textarea",name:"description",readOnly:true,height:400,style:{"font-size":"13px"},listeners:{}}]}]}]}]},{xtype:"panel",title:"Services ",height:400,layout:"form",items:[{xtype:"panel",layout:"fit",autoScroll:true,border:false,style:"padding: 2px;",items:[{xtype:"panel",height:400,layout:"table",border:false,layoutConfig:{columns:3},defaults:{style:"padding-left:50px;"},items:[{xtype:"panel",border:false,height:50,width:820,colspan:3,style:"padding-top:20px;",items:[{xtype:"label",fieldLabel:"shipName",name:"shipName",style:"font-weight:bold;font-size:13px;align:center;padding-left:350px;padding-top:20px;",listeners:{render:function(){var a=this.findParentByType("awesomewindow").getData("shipName");if(a!=null&&a!="undefined"){this.setText("Ship: "+a)}else{this.setText("Ship: ")}}}}]},{xtype:"panel",border:true,height:350,width:375,items:[{xtype:"panel",border:false,height:350,width:350,tbar:["-","-","-","-","-","-","-","-","-","<b>Cabin Amenities</b>"],items:[{xtype:"grid",height:350,border:true,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["cabin","image","description","name","cabinOrder","photo"]}),columns:[{dataIndex:"name",width:320}],listeners:{render:function(c){var b=Ext.util.JSON.decode(Ext.getCmp("grid").findParentByType("awesomewindow").getData("amenaties"));var f=b.amenaties;if(typeof f=="undefined"){return}var e=[];for(var a=0;a<f.length;a++){b[f[a]].dataURI=f[a];e.push(b[f[a]])}var d=this.getStore();d.loadData(e)}}}]}]},{xtype:"panel",border:true,height:350,width:400,tbar:["-","-","-","-","-","-","-","-","-","-","-","-","-","<b>Ship Facilities</b>"],items:[{xtype:"grid",height:350,border:true,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["cabin","image","description","name","cabinOrder","photo"]}),columns:[{dataIndex:"name",width:320}],listeners:{render:function(c){var b=Ext.util.JSON.decode(Ext.getCmp("grid").findParentByType("awesomewindow").getData("facilityInfo"));var f=b.facitities;if(typeof f=="undefined"){return}var e=[];for(var a=0;a<f.length;a++){b[f[a]].dataURI=f[a];e.push(b[f[a]])}var d=this.getStore();d.loadData(e)}}}]}]}]}]},{xtype:"panel",title:"Port Info",layout:"fit",items:{xtype:"textarea",name:"portDescription",height:200,hideLabel:true,readOnly:true,style:{"font-size":"13px"},listeners:{beforerender:function(a){}}}},{xtype:"panel",title:"Ship Info ",height:400,layout:"form",items:[{xtype:"panel",layout:"fit",autoScroll:true,border:false,style:"padding: 2px;",items:[{xtype:"panel",height:320,layout:"table",border:false,layoutConfig:{columns:2},style:"padding: 2px;",items:[{xtype:"panel",layout:"auto",border:true,height:300,width:400,items:[{xtype:"panel",border:false,height:300,width:400,items:[{xtype:"panel",border:false,height:300,width:400,items:[{xtype:"panel",border:false,height:50,width:400,items:[{xtype:"label",style:"font-weight: bold;padding-left: 150px;font-size:13px",name:"shipName",listeners:{render:function(a){a.setText(a.findParentByType("awesomewindow").getData("shipName"))}}}]},{border:true,html:"shipImages",listeners:{render:function(b){var c=b.findParentByType("awesomewindow").getData("shipObj");var a="";a="http://images.cruisefactory.net/images/ships/thumbnails//"+c.thumbnail;this.html='<center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+a+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+a+">"}}}]}]}]},{xtype:"panel",layout:"form",border:true,height:310,width:450,style:"padding-left:50px;",listeners:{},items:[{xtype:"htmleditor",name:"shipInfo",readOnly:true,height:310,hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false,listeners:{render:function(a){a.getToolbar().hide(false)}}}]}]}]},{xtype:"panel",layout:"auto",style:"padding-top:00px;padding-left:5px;",height:100,border:false,items:[{border:false,xtype:"textarea",name:"shipDescription",width:850,height:100,readOnly:true,style:"padding: 20px 00px 0px 0px; ",style:{"font-size":"13px"},listeners:{}}]}]},{xtype:"panel",title:"Dining ",height:450,items:[{xtype:"panel",autoScroll:true,border:false,style:"padding: 2px;",layout:"column",items:[{xtype:"panel",height:450,layout:"column",items:[{xtype:"panel",height:410,width:450,layout:"table",layoutConfig:{columns:1},items:[{xtype:"panel",layout:"fit",width:440,height:400,style:"padding-top:20px;",items:[{xtype:"textarea",name:"dining",readOnly:true,width:320,height:400,style:{"font-size":"13px",width:"430px",height:"400px"},enableAlignments:false,listeners:{render:function(a){var b=a.findParentByType("awesomewindow").getData("dining");a.setValue(a.findParentByType("awesomewindow").getData("dining").introduction)}}}]}]},{xtype:"panel",height:400,width:420,style:"padding-left:10px;",layout:"table",layoutConfig:{columns:1},items:[{border:true,width:250,html:"shipImages",listeners:{render:function(b){var c=b.findParentByType("awesomewindow").getData("dining");var a="";a="http://images.cruisefactory.net/images/cruiselines/dining/"+c.photo;this.html='<center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+a+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+a+">"}}},{xtype:"panel",height:300,width:400,style:"padding-top:10px;",listeners:{render:function(d){var c=d.findParentByType("awesomewindow").getData("diningtimes");var f=c.dinningTime;var e=[];for(var b=0;b<f.length;b++){e.push(c[f[b]])}var a=new Ext.Panel({autoWidth:true,autoHeight:true,border:false,layout:"table",layoutConfig:{columns:3},defaults:{}});Ext.each(e,function(j){var h=new Ext.form.Label({text:j.meal,style:{"font-size":"13px",padding:"10px"}});var i=new Ext.form.Label({text:j.normalSitting,style:{"font-size":"13px"}});var g=new Ext.form.Label({text:j.lateSitting,style:{"font-size":"13px"}});a.add(h);a.add(i);a.add(g);a.doLayout()});d.add(a);d.doLayout()}}}]}]}]}]},{xtype:"panel",title:"Wine ",items:[{xtype:"panel",height:600,width:900,style:"padding-top:10px;",listeners:{render:function(c){var e=c.findParentByType("awesomewindow").getData("wineLists");var f=e.winelist;var d=[];for(var b=0;b<f.length;b++){d.push(e[f[b]])}var a=new Ext.Panel({autoWidth:true,autoHeight:true,border:false,layout:"table",style:"padding-top:10px;",layoutConfig:{columns:1},defaults:{}});Ext.each(d,function(i){var g=new Ext.form.Label({text:i.name,style:{"font-size":"13px","font-weight":"bold",padding:"10px"}});var h=new Ext.form.HtmlEditor({height:300,width:875,hideLabel:true,readOnly:true,labelSeparator:"",anchor:"100%",enableLinks:false,enableLists:false,enableSourceEdit:false,enableFontSize:false,enableFont:false,enableColors:false,enableAlignments:false,style:{"font-size":"13px"},listeners:{render:function(j){j.setValue(i.description)}}});a.add(g);a.add(h);a.doLayout()});c.add(a);c.doLayout()}}}]},{xtype:"panel",title:"Tipping ",items:[{xtype:"panel",height:600,width:900,style:"padding-top:10px;",listeners:{render:function(c){var e=c.findParentByType("awesomewindow").getData("tippings");var f=e.tipping;var d=[];for(var b=0;b<f.length;b++){d.push(e[f[b]])}var a=new Ext.Panel({autoWidth:true,autoHeight:true,border:false,layout:"table",style:"padding-top:10px;",layoutConfig:{columns:1},defaults:{}});Ext.each(d,function(i){var g=new Ext.form.Label({text:i.name,style:{"font-size":"13px","font-weight":"bold",padding:"10px"}});var h=new Ext.form.TextArea({height:300,width:875,style:{"font-size":"13px"},listeners:{render:function(j){j.setValue(i.description)}}});a.add(g);a.add(h);a.doLayout()});c.add(a);c.doLayout()}}}]}]},{xtype:"button",text:"Print",winExist:false,id:"print",a:"",handler:function(){if(!this.winExist){this.winExist=true;var P=window.open("","Terms Priview","height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");P.focus();var D=this.ownerCt.ownerCt.aw.data.offeringData;var A="<p><center>Information</center></p>";if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Itinerary"){var c=Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().items.itemAt(0).findByType("grid")[0].getStore();var I='<div style= " width: auto; height: auto;"><div style= " width: auto; height: auto;    column-count: 2;"> ';var o='<div style= " width: auto; height: auto; "><table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0 ><tr style="background-color: #d0def0;"><th style="padding: 2px; width: 3%;">Day/Date</th><th  style="padding: 2px; width: 15%;">Ports</th><th  style="padding: 2px; width: 5%;">Arrival</th><th  style="padding: 2px; width: 3%;">Departure</th></tr>';var r="";c.each(function(a){r+="<tr><td>"+a.get("day")+"</td><td>"+a.get("portName")+"</td><td>"+a.get("arrive")+"</td><td>"+a.get("depart")+"</td></tr>"});var E="</table></div>";var H="</div>";var w=Ext.util.JSON.decode(Ext.getCmp("grid").findParentByType("awesomewindow").getData("itenaryList"));var B=w["sailingDates/itenaries"];if(typeof B=="undefined"){return}var p=[];for(var K=0;K<B.length;K++){w[B[K]].dataURI=B[K];p.push(w[B[K]])}var m=Ext.getCmp("grid").getStore();m.loadData(p);var Q="";Q="http://images.cruisefactory.net/images/cruises/"+p[0].portGraphics;var R=this.ownerCt.items.itemAt(0).getActiveTab().items.itemAt(1).items.itemAt(0).initialConfig.html;var s='<div style = "width:auto;height:auto;border: 1px solid #73AD21; float:right"><center><img border="0"    id="cruiseId" name="portImages" src='+Q+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+Q+"</div>";var k='<div style = "width:auto;height:auto;border: 1px solid black; "><center>'+R+"</center></div>";var v=A+I+o+r+E+s+H+"</div><p>"+k+"</p>";P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Cruise Info"){var F=this.findParentByType("awesomewindow").getData("shipObj");var Q="";Q="http://images.cruisefactory.net/images/ships/thumbnails//"+F.thumbnail;var I='<div style= " width: auto; height: auto; border: 1px solid black; "><div style= " width: auto; height: auto;    column-count: 2;"> ';var C='<div style= " width: auto; height: auto; float:right; "><center style="position: relative; top: 40%; "> <img src="data:image/png;base64,'+this.ownerCt.findParentByType("awesomewindow").getData("logo")+'"></center><br><p><center style="font-weight:bold;font-size:25px;align:center; ">'+this.findParentByType("awesomewindow").getData("shipName")+"<center></p></div>";var J='<div style= " width: auto; height: auto; float:left border: 1px solid red; "><center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+Q+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+Q+">";var H="</div></div>";var z=this.findParentByType("awesomewindow").getData("description");var t='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="120" cols="150">'+z+"</textarea></div>";var v=A+I+C+J+H+"<p>"+t+"</p>";P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Services "){var I='<div style= " width: auto; height: auto; border: 1px solid green; "><div style= " width: auto; height: auto;    column-count: 2;"> ';var H="</div></div>";var o='<div style= " width: 400; height: 630; float:right border: 1px solid blue; "><table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0 ><tr style="background-color: #d0def0;"><th style="padding: 2px; width: 10%;">Cabin Amanities</th></tr>';var r="";var x='<div style= " width: auto; height: auto;float:left border: 1px solid red; "><table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0 ><tr style="background-color: #d0def0;"><th style="padding: 2px; width: 10%;">Ship Facility</th></tr>';var G="";var b=this.ownerCt.items.itemAt(0).getActiveTab().items.itemAt(0).findByType("grid")[0].getStore();var j=this.ownerCt.items.itemAt(0).getActiveTab().items.itemAt(0).findByType("grid")[1].getStore();b.each(function(a){r+="<tr><td>"+a.get("name")+"</td></tr>"});var E="</table></div>";j.each(function(a){G+="<tr><td>"+a.get("name")+"</td></tr>"});var e="</table></div>";var v=A+I+o+r+E+x+G+e+H;P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Port Info"){var I='<div style= " width: auto; height: auto;"><div style= " width: auto; height: auto; "> ';var H="</div></div>";var q=this.findParentByType("awesomewindow").getData("portDescription");var l='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="50" cols="120">'+q+"</textarea></div>";var v=A+I+"<p>"+l+"</p>"+H;P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Ship Info "){var F=this.findParentByType("awesomewindow").getData("shipObj");var Q="";Q="http://images.cruisefactory.net/images/ships/thumbnails//"+F.thumbnail;var I='<div style= " width: auto; height: auto; border: 1px solid black; "><div style= " width: auto; height: auto;    column-count: 2;"> ';var J='<div style= " width: auto; height: auto; float:right border: 1px solid red; "><center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+Q+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+Q+">";var g='<div style= " width: auto; height: auto; float:left border: 1px solid red; ">'+this.findParentByType("awesomewindow").getData("shipInfo")+"</div>";var H="</div></div>";var z=this.findParentByType("awesomewindow").getData("shipDescription");var t='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="20" cols="120">'+z+"</textarea></div>";var v=A+I+J+g+H+"<p>"+t+"</p>";P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Dining "){var o='<div style= " width: auto; height: auto;  float:left"><table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0 ><tr style="background-color: #d0def0;"><th style="padding: 2px; width: 3%;">Meal</th><th  style="padding: 2px; width: 15%;">Normal time</th><th  style="padding: 2px; width: 5%;">Late Time</th></tr>';var r="";var E="</table></div>";var u=this.findParentByType("awesomewindow").getData("diningtimes");var B=u.dinningTime;var p=[];for(var K=0;K<B.length;K++){p.push(u[B[K]])}Ext.each(p,function(a){dining_list=a.description;r+="<tr><td>"+a.meal+"</td><td>"+a.normalSitting+"</td><td>"+a.lateSitting+"</td> </tr>"});var L=this.findParentByType("awesomewindow").getData("dining").photo;var Q="";Q="http://images.cruisefactory.net/images/cruiselines/dining/"+L;var I='<div style= " width: auto; height: auto; border: 1px solid black; "><div style= " width: auto; height: auto;    column-count: 2;"> ';var N='<div style= " width: auto; height: auto; float:right border: 1px solid red; "><center style="position: relative; top: 40%; "><img border="0"   id="portImageId" name="portImages" src='+Q+' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value='+Q+">";var M='<div style= " width: auto; height: auto; float:left border: 1px solid red; ">'+this.findParentByType("awesomewindow").getData("dining").introduction+"</div>";var H="</div></div>";var z=this.findParentByType("awesomewindow").getData("shipDescription");var t='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="20" cols="120">'+z+"</textarea></div>";var v=A+I+N+o+r+E+M+H;P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Wine "){var h=this.findParentByType("awesomewindow").getData("wineLists");var B=h.winelist;var p=[];for(var K=0;K<B.length;K++){p.push(h[B[K]])}var f="";var y="";Ext.each(p,function(a){f=a.description;y+='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="120" cols="150">'+f+"</textarea> </div>"});var I='<div style= " width: auto; height: auto;"><div style= " width: auto; height: auto; "> ';var H="</div></div>";var v=A+I+"<p>"+y+"</p>"+H;P.document.write(v)}else{if(Ext.getCmp("print").ownerCt.items.itemAt(0).getActiveTab().title=="Tipping "){var d=this.findParentByType("awesomewindow").getData("tippings");var B=d.tipping;var p=[];for(var K=0;K<B.length;K++){p.push(d[B[K]])}var O="";var n="";Ext.each(p,function(a){O=a.description;n+='<div style = "width:auto;height:auto; padding:2px; "><textarea rows="30" cols="120">'+O+"</textarea> </div>"});var I='<div style= " width: auto; height: auto;"><div style= " width: auto; height: auto; "> ';var H="</div></div>";var v=A+I+"<p>"+n+"</p>"+H;P.document.write(v)}}}}}}}}P.location.reload();P.focus();P.print();P.close();this.winExist=false}else{P.focus()}}}],listeners:{render:function(){}}}