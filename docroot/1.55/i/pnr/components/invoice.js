{xtype:"panel",layout:"form",bodyStyle:"padding: 8px;",autoScroll:true,items:[{border:false,style:"padding: 4px 0;",html:"<p>The PNR invoice is available to download as a rich text format (RTF) document.</p>"},{xtype:"combo",fieldLabel:"Component",name:"componentName",mode:"local",width:110,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"name",valueField:"dataURI",emptyText:"Component type",store:TDS.data.componentsList,appendData:[{name:"All",dataURI:""}]},{border:false,style:"padding: 2px 0;",html:" "},{xtype:"combo",fieldLabel:"Display format",name:"displayDetailed",mode:"local",width:110,triggerAction:"all",editable:false,excludeFromSession:true,displayField:"description",valueField:"value",emptyText:"content type",value:true,store:TDS.data.invoiceDisplay},{border:false,style:"padding: 2px 0;",html:" "},{xtype:"panel",border:false,layout:"column",items:[{xtype:"panel",columnWidth:0.35,border:false,items:{xtype:"button",align:"left",text:"Download PNR invoice",handler:function(){var b=this.ownerCt.findParentByType("ajaxpanel");var a=b.baseDataURI;if(!a){return}var d=this.ownerCt.ownerCt.ownerCt.items;var c=TDS.env.currentDomain;var e="/GraphicsImg/voucher/";Ext.Ajax.request({url:TDS.env.dataPath+a+"/invoice?componentName="+d.itemAt(1).getValue()+"&displayDetailed="+d.itemAt(3).getValue(),jsonData:{currentDomain:c},method:"PUT",scope:this,callback:function(j,g,i){var h=Ext.decode(i.responseText);fileName=h.fileName;filepathh=h.filepath;e=e+fileName+".rtf";var f=window.open(e,"Information Priview","height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");f.focus()}})}}},{xtype:"panel",columnWidth:0.65,border:false,items:{xtype:"button",style:"width:3600px",text:"&nbsp;&nbsp;Send PNR Invoice&nbsp;&nbsp;",handler:function(){var u=this.ownerCt.ownerCt.ownerCt.items;var m=this.ownerCt.ownerCt.ownerCt;var a=m.items.itemAt(7);var b="";var x="";var h=a.items.itemAt(3);var c=a.items.itemAt(3).getValue();if(c==""){Ext.Msg.alert("","Send To empty, enter Send To and retry.",function(){h.focus()});return}else{c=c.replace(",",";");c=c.replace(" ","")}var o=a.items.itemAt(6);var t=a.items.itemAt(6).getValue();if(t==""){Ext.Msg.alert("","Message subject empty, enter message subject and retry.",function(){o.focus()});return}else{t=t.replace("&"," ")}var d=a.items.itemAt(7);var v=a.items.itemAt(7).getValue();if(v==""){Ext.Msg.alert("","Message body empty, enter message body and retry.",function(){d.focus()});return}else{v=v.replace("&nbsp;"," ");v=v.replace("&"," ")}var q="";var l=a.items.itemAt(4);var r=a.items.itemAt(4).getValue();r=r.replace(",",";");r=r.replace(" ","");;var w=document.getElementById("attachmentFileUpLoad").files[0];var e=document.getElementById("attachmentFileUpLoad").value;e=e.substring(e.lastIndexOf("\\")+1);var n=this.ownerCt.ownerCt.ownerCt.findParentByType("ajaxpanel");m.el.mask("","x-mask-loading");var k=TDS.env.currentDomain;Ext.Ajax.request({url:TDS.env.dataPath+n.baseDataURI+"/invoice?componentName="+u.itemAt(1).getValue()+"&displayDetailed="+u.itemAt(3).getValue(),jsonData:{currentDomain:k},method:"PUT",scope:this,callback:function(A,p,z){var y=Ext.decode(z.responseText);x=y.fileName;filepathh=y.filepath;x=x+".rtf";q="Arena Documention <arena.doc@tdsworld.com>";f()}});function f(){var p=new FormData();p.append("attachment",w);var y=new XMLHttpRequest();y.upload.addEventListener("progress",i,false);y.addEventListener("load",s,false);y.addEventListener("error",g,false);y.addEventListener("abort",j,false);y.open("POST",TDS.env.dataPath+"sendMailWithItineraryAttachment?&filepathh="+filepathh+"&fileName="+x+"&messageBodyString="+v+"&messageSubjectString="+t+"&from="+q+"&to="+c+"&ccTo="+r+"&attachedFileName="+e);y.send(p);y.onreadystatechange=function(){if(y.readyState==4){var z=y.getAllResponseHeaders();var A=y.responseText;Ext.Msg.alert("",A,function(){if(A=="Mail sent successfully."){l.setValue("");d.setValue("");o.setValue("");h.setValue("");document.getElementById("attachmentFileUpLoad").value="";document.getElementById("attachmentFileUpLoad").files[0]=null}});m.el.unmask()}}}function i(p){}function s(p){}function g(p){Ext.Msg.alert("","There was an error attempting to upload the file."+p)}function j(p){Ext.Msg.alert("","The upload has been canceled by the user or the browser dropped the connection.")}}}}]},{border:false,style:"padding: 2px 0;",html:" "},{xtype:"panel",layout:"form",height:400,width:(document.body.clientWidth*0.45),border:false,defaults:{lableWidth:300},items:[{html:"&nbsp;",height:5,border:false},{html:"&nbsp;",height:5,border:false},{html:"&nbsp;",height:5,border:false},{xtype:"textfield",allowBlank:false,name:"to",fieldLabel:"Send To",anchor:"95%"},{xtype:"textfield",name:"ccTo",fieldLabel:"CC To",anchor:"95%"},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{xtype:"label",width:300,text:"Attachment:"},{html:'<form action="attachmentFileUpLoad" enctype="multipart/form-data" method="post"><table border= 0 with=100%><td width= 5% >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td width= 95%><input  width=100% name="attachmentFileUpLoad" id="attachmentFileUpLoad" type="file"  /></td></table></form>',width:270},{xtype:"button",text:"Remove attachment",handler:function(){document.getElementById("attachmentFileUpLoad").value="";document.getElementById("attachmentFileUpLoad").files[0]=null}}]},{xtype:"textfield",allowBlank:false,name:"subject",fieldLabel:"Subject",anchor:"95%"},{xtype:"htmleditor",name:"description",allowBlank:false,hideLabel:true,labelSeparator:"",enableLinks:true,enableLists:true,enableSourceEdit:false,enableFontSize:true,enableFont:true,enableColors:true,enableAlignments:true,height:200,width:(document.body.clientWidth*0.43)}]}]}