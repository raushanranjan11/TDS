{xtype:"form",height:410,width:450,border:false,fieldMap:{rateClass:"rateClassURI",ratePer:"ratePerURI",rateOccupancy:"rateOccupancyURI",defaultMaxHoldTimeSeconds:["defaultMaxHoldTimeHours","defaultMaxHoldTimeMinutes"]},beforeSubmit:function(a){var d=this.items.itemAt(0).items.itemAt(0).items.itemAt(0);a.connect=d.items.itemAt(8).items.itemAt(1).getValue();a.cabinInfo=this.items.itemAt(0).items.itemAt(1).findByType("editorgrid")[0].getData();var b=[],c=[];Ext.getCmp("pan6").items.items.forEach(function(e){if(e.getValue()){b.push(e.boxLabel)}});a.position=b.toString();return a},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:550,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Cabin",items:[{xtype:"panel",layout:"form",border:false,frame:true,labelWidth:95,autoScroll:true,defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"panel",style:"padding-bottom: 4px;",border:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{html:"Cabin Number:",width:100},{xtype:"textfield",name:"cabinNumber",width:85},{html:"&nbsp;&nbsp;&nbsp;&nbsp;Status:",width:55},{xtype:"combo",name:"cabinStatus",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:85,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:new Ext.data.SimpleStore({fields:["dataURI","name"],data:[["OK","OK"],["GTD","GTD"],["WL","WL"],["RQ","RQ"],["FS","FS"],["NA","NA"],["Sold","Sold"]]})}]},{xtype:"textfield",name:"catName",readOnly:true,fieldLabel:"Category",width:230},{xtype:"panel",style:"padding-bottom: 4px;",border:false,hidden:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{html:"Deck:",width:100},{xtype:"combo",name:"deck",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:70,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"text",valueField:"text",store:TDS.data.cruiseDeckNew},{width:75,html:"Berths",style:"margin-left:25px;"},{xtype:"omnicrementer",name:"berths",width:60,maxValue:8}]},{xtype:"panel",style:"padding-bottom: 4px;",border:false,hidden:false,layout:"table",layoutConfig:{columns:6},defaults:{border:false},items:[{xtype:"label",text:"Valid From :",width:100},{style:" margin-left:40px",xtype:"datefield",name:"fromDate",width:80,format:"dMy",enableKeyEvents:true,showToday:false,minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()},{xtype:"label",text:"To :",width:80,style:"margin-left:50px;"},{xtype:"datefield",name:"toDate",style:"position: relative; margin-left:25px",width:80,format:"dMy",enableKeyEvents:true,showToday:false,minValue:Ext.TimerMgr.getServerCalculatedDate().clearTime()}]},{xtype:"panel",height:150,width:400,style:"padding-left:10px;padding-top:5px;",layout:"table",border:false,layoutConfig:{columns:2},defaults:{style:"margin:10px;"},items:[{xtype:"label",text:"Position :",style:"margin-left:75px"},{border:false},{xtype:"panel",id:"pan6",width:185,frame:false,border:true,bodyStyle:"padding-left:15px;",height:120,style:"    position: relative;  margin-left:10px; ",items:[{boxLabel:"Aft",xtype:"checkbox",inputValue:"Aft"},{boxLabel:"Mid Ship",xtype:"checkbox",inputValue:"Mid Ship"},{boxLabel:"Forward",xtype:"checkbox",inputValue:"Forward"},{boxLabel:"Mid Ship/ Forward",xtype:"checkbox",inputValue:"Mid Ship/ Forward"},{boxLabel:"Mid Ship/ Aft",xtype:"checkbox",inputValue:"Mid Ship/ Aft"}],listeners:{render:function(){this.body.setStyle("background","white");var a=this.findParentByType("awesomewindow").getData("position").split(",");this.items.items.forEach(function(b){a.forEach(function(c){if(b.boxLabel==c){b.setValue(true)}})})}}}]},{xtype:"panel",style:"padding: 3px 0px 0px 0px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{xtype:"radio",name:"smoking",labelSeparator:"",boxLabel:"Non Smoking",inputValue:false,width:300,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;this.setValue(!b.smoking)}}}]},{xtype:"panel",style:"padding: 3px 0px 0px 0px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{xtype:"radio",name:"smoking",labelSeparator:"",boxLabel:"Smoking",inputValue:true,width:300,listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;this.setValue(b.smoking)}}}]},{xtype:"panel",style:"padding: 3px 0px 0px 0px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{xtype:"checkbox",name:"disableCabin",labelSeparator:"",boxLabel:"Disabled Cabin",inputValue:true,width:300}]},{xtype:"panel",style:"padding: 3px 0px 0px 0px;",border:false,layout:"table",layoutConfig:{columns:3},defaults:{border:false},items:[{xtype:"checkbox",name:"connectCheck",labelSeparator:"",boxLabel:"Connect",inputValue:true,width:100,listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");var b=a.getData("connect");if(b!=""&&b!=null&&typeof b!="undefined"){this.checked=true;this.ownerCt.items.itemAt(1).enable(true)}},check:function(){if(this.getValue()){this.ownerCt.items.itemAt(1).enable(true)}else{this.ownerCt.items.itemAt(1).setValue("");this.ownerCt.items.itemAt(1).disable(true)}}}},{xtype:"textfield",name:"connect",disabled:true,width:200}]}]}]},{title:"Details",autoScroll:true,items:[{xtype:"panel",height:470,frame:true,items:[{xtype:"panel",border:false,layout:"table",column:3,items:[{html:'<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="fileUpLoads"type="file"  /></td></form>',width:250,style:"padding: 0px 30px 0px 25px; "},{xtype:"button",text:"Delete",style:'border="0";',handler:function(d){;document.images.image1.src="";Ext.getCmp("cabinPanel").html='<img border="0" id="imageId" name="image1" src="" ><input type="hidden" id ="imgName"  name="imgName" value="">';var c=this.ownerCt.findParentByType("awesomewindow");var a=c.aw.sourceDataURI;var b=document.getElementById("imgName").value;if(b){var e={};if(b){e.removefile=b}if(b){e.imageStorePath=a}e.imageName=Ext.getCmp("gip").getValue();Ext.Ajax.request({url:TDS.env.dataPath+"fileUpload",method:"POST",params:e,callback:function(i,g,h){if(g){Ext.Msg.alert("","Deleted succussefully.");document.images.image1.src="";document.getElementById("imgName").value="";document.getElementById("fileUpLoads").value="";var f={deletePath:true,imagePath:document.getElementById("imgName").value};Ext.Ajax.request({url:TDS.env.dataPath+a+"/graphicImage",method:"POST",jsonData:f,scope:this})}else{Ext.Msg.alert("","Error coocured..")}}})}}},{xtype:"button",text:"Upload",id:"upload",style:"padding: 0px 50px 0px 15px;",handler:function(b){;Ext.getCmp("cabinPanel").html='<img border="0" id="imageId" name="image1" src="" ><input type="hidden" id ="imgName"  name="imgName" value="">';var i=this.ownerCt.findParentByType("awesomewindow");var a=i.aw.sourceDataURI;var h=document.getElementById("fileUpLoads").value;var d=document.getElementById("fileUpLoads").files[0];if(d){var e=0;j()}function j(){var l=new FormData();l.append("image",d);var m=new XMLHttpRequest();m.upload.addEventListener("progress",f,false);m.addEventListener("load",g,false);m.addEventListener("error",c,false);m.addEventListener("abort",k,false);m.open("POST",TDS.env.dataPath+"fileUpload?&imageName="+Ext.getCmp("gip").getValue()+"&imageStorePath="+a);m.send(l);m.onreadystatechange=function(){if(m.readyState==4){var q=m.getAllResponseHeaders();var r=m.responseText;var p=a;var o="GraphicsImg/"+r;document.getElementById("imgName").value=o;var n={deletePath:false,imagePath:document.getElementById("imgName").value};Ext.Ajax.request({url:TDS.env.dataPath+a+"/graphicImage",method:"POST",jsonData:n,callback:function(w,t,v){if(t){Ext.Msg.alert("","Graphics Uploaded successfully..");var u=Ext.util.JSON.decode(v.responseText);Ext.getCmp("gip").setValue(u.graphicImgPath);document.images.image1.src="../"+u.graphicImgPath;document.getElementById("imgName").value=u.graphicImgPath}else{Ext.Msg.alert("","Error coocured..")}},scope:this})}}}function f(l){}function g(l){}function c(l){Ext.Msg.alert("","There was an error attempting to upload the file.")}function k(l){Ext.Msg.alert("","The upload has been canceled by the user or the browser dropped the connection.")}}}]},{html:"cabinImage",id:"cabinPanel",border:false,style:"padding: 5px; 0px; 0px; 0px;",height:"auto",width:"auto",listeners:{render:function(){;var b="";var d=this.ownerCt.ownerCt.findParentByType("awesomewindow");var c=d.aw.data.graphicImgPath;if(typeof c=="undefined"){c=""}var a=c.substring(0,4);if(a=="http"){this.html='<img border="0" height ="190px" width="360px" id="imageId" name="image1" src='+c+' ><input type="hidden" id ="imgName"  name="imgName" value='+c+">"}else{b="../"+c;this.html='<img border="0"height ="190px" width="360px" id="imageId" name="image1" src='+b+' ><input type="hidden" id ="imgName"  name="imgName" value='+b+">"}}}},{xtype:"textfield",id:"gip",hidden:true,name:"graphicImgPath",style:"padding: 25px; 5px; 25px; 25px;"},{xtype:"editorgrid",width:385,height:200,tbar:[" ",{xtype:"combo",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:160,typeAhead:true,excludeFromSession:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"text",valueField:"text",store:TDS.data.cruiseInfoDropDown}," &nbsp;&nbsp;&nbsp;&nbsp;",{xtype:"textfield",width:80},"&nbsp;&nbsp;&nbsp;&nbsp;","-",{xtype:"button",text:"Save",handler:function(){var f=this.ownerCt.ownerCt;var e=f.getStore();var b=this.ownerCt.items;var a=e.data.items;var d=true;for(var c=0;c<a.length;c++){if(a[c].data.name==b.itemAt(1).getValue()){d=false}}if(d){e.add([new e.recordType({name:b.itemAt(1).getValue(),value:b.itemAt(3).getValue()})])}}},"-",{xtype:"button",text:"Delete",handler:function(){var b=this.ownerCt.ownerCt;var a;while(a=b.selModel.getSelected()){b.store.remove(a)}}}],height:220,getData:function(){var b=this.getStore().data;for(var a=0,c=[];a<b.length;a++){c.push(b.items[a].data)}return{cabinInfo:c}},enableRowExpander:false,clicksToEdit:1,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["name","value"]}),hideHeaders:true,sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Name",dataIndex:"name",width:200,fixed:true,sortable:true},{header:"Value",dataIndex:"value",width:200,fixed:true,sortable:true}]),viewConfig:{forceFit:true},listeners:{render:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.aw.data;var d=Ext.util.JSON.decode(b.parameters);if(typeof d!="undefined"){var e=Ext.util.JSON.decode(d.cabinInfo);var f=e;if(typeof f=="undefined"){f=[]}if(typeof f!="undefined"){this.getStore().loadData(f)}}}}}]}]},{title:"Floor Plan",items:[{xtype:"panel",height:470,frame:true,items:[{border:false,xtype:"panel",border:false,layout:"table",column:3,items:[{html:'<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="floorfileUpLoads"type="file"  /></td></form>',width:250,style:"padding: 0px 30px 0px 25px; "},{xtype:"button",text:"Delete",style:'border="0";',handler:function(a){document.images.floorImageName.src="";document.getElementById("floorfileUpLoads").value="";Ext.getCmp("floorPlanId").setValue()}},{xtype:"button",text:"Upload",style:"padding: 0px 50px 0px 15px;",handler:function(b){;Ext.getCmp("floorPanel").html='<img border="0" id="floorImageId" name="floorImageName" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';var i=this.ownerCt.findParentByType("awesomewindow");var a=i.aw.sourceDataURI;var h=document.getElementById("floorfileUpLoads").value;var d=document.getElementById("floorfileUpLoads").files[0];if(d){var e=0;j()}function j(){var l=new FormData();l.append("image",d);var m=new XMLHttpRequest();m.upload.addEventListener("progress",f,false);m.addEventListener("load",g,false);m.addEventListener("error",c,false);m.addEventListener("abort",k,false);m.open("POST",TDS.env.dataPath+"fileUpload?&imageName="+Ext.getCmp("floorPlanId").getValue()+"&imageStorePath="+a);m.send(l);m.onreadystatechange=function(){if(m.readyState==4){var p=m.getAllResponseHeaders();var q=m.responseText;var o=a;var n="GraphicsImg/"+q;document.getElementById("imageName").value=n;Ext.getCmp("floorPlanId").setValue(n);document.images.floorImageName.src="../"+n;document.getElementById("imageName").value=n}}}function f(l){}function g(l){}function c(l){Ext.Msg.alert("","There was an error attempting to upload the file.")}function k(l){Ext.Msg.alert("","The upload has been canceled by the user or the browser dropped the connection.")}}}]},{html:"floorImage",id:"floorPanel",border:false,style:"padding: 5px; 0px; 0px; 0px;",height:"auto",width:"auto",listeners:{render:function(){;this.body.setStyle("background","white");var b="";var d=this.ownerCt.ownerCt.findParentByType("awesomewindow");var c=d.aw.data.floorGraphicImgPath;if(typeof c=="undefined"){c=""}var a=c.substring(0,4);if(a=="http"){this.html='<img border="0" height ="190px" width="360px" id="floorImageId" name="floorImageName" src='+c+' ><input type="hidden" id ="imageName"  name="imageName" value='+c+">"}else{b="../"+c;this.html='<img border="0"height ="190px" width="360px" id="floorImageId" name="floorImageName" src='+b+' ><input type="hidden" id ="imageName"  name="imageName" value='+b+">"}}}},{xtype:"textfield",id:"floorPlanId",hidden:true,name:"floorGraphicImgPath",style:"padding: 25px; 5px; 25px; 25px;"}]}]}]}]}