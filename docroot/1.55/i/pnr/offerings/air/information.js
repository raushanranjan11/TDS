{xtype:"form",border:false,markDataDirtyOnLoad:true,items:[{xtype:"panel",border:false,layout:"column",height:150,defaults:{height:150,border:true,bodyStyle:"padding: 0 0 0 0;"},items:[{xtype:"panel",columnWidth:0.27,detailsTpl:new Ext.XTemplate('<div style="height:145px; width:100%; overflow-x:auto ; overflow-y: auto;"><input   type="image" src={graphicImgPath}><div>'),listeners:{render:function(){var a=this.ownerCt.findParentByType("tabpanel");if(a.getDetail("graphicImgPath")){this.detailsTpl.overwrite(this.body,{graphicImgPath:a.getDetail("graphicImgPath")})}}}},{xtype:"panel",bodyStyle:"padding: 8px;",columnWidth:0.25,detailsTpl:new Ext.XTemplate("<p><b>Stop overs</b>: {stopOversString}</p>","<p><b>Address:</b> {addressString}</p>","<p><b>Website:</b> {website}</p>","<p><b>Description:</b></p>",'<div style="height: 60px; overflow: auto;">{description}</div>'),listeners:{render:function(){var a=this.ownerCt.findParentByType("tabpanel");this.detailsTpl.overwrite(this.body,{stopOversString:a.getDetail("stopOversString"),descriptionString:a.getDetail("descriptionString"),website:a.getDetail("primaryHref"),addressString:a.getDetail("addressString")})}}},{xtype:"panel",bodyStyle:"padding: 8px;",columnWidth:0.4,height:150,detailsTpl:new Ext.XTemplate('<div style="height:140px; width:100%; overflow-x:auto ; overflow-y: scroll; padding-left:0px;"><u><b><center>Description</center></b></u><br>{descriptionString}<div>'),listeners:{render:function(){var a=this.ownerCt.findParentByType("tabpanel");this.detailsTpl.overwrite(this.body,{descriptionString:a.getDetail("descriptionString")})}}},{xtype:"panel",columnWidth:0.08,bodyStyle:"margin-left: 10px; margin-top: 40px;",border:false,items:{xtype:"button",text:"Print",minWidth:70,winExist:false,a:"",handler:function(){if(!this.winExist){this.winExist=true;var b=window.open("","Information Priview","height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");b.focus();var g=this.ownerCt.findParentByType("tabpanel");var c=g.getDetail("nameString");var h=g.getTabField("Rate","datePointer").getRawValue();var f=g.getDetail("duration");var e="";if(c!=""){e="<u><b>Name:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+c+"<br>"}if(h!=""){e+="<u><b>Departure:</b></u>&nbsp;&nbsp;"+h+"<br>"}if(f!=""&&typeof f!="undefined"){e+="<u><b>Duration:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;"+f+"<br>"}var d=g.getDetail("descriptionString");if(typeof d=="undefined"){d=""}else{d="<br><u><b>Description:</b></u></br>"+d}b.document.write(e+d.innerHTML);b.location.reload();b.focus();b.print();b.close();this.winExist=false}else{b.focus()}}}}]}]}