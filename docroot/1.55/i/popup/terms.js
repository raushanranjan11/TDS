{xtype:"form",border:false,termsAndConditions:"",markDataDirtyOnLoad:true,items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:340,width:410,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Rate",items:[{html:'<div style="height:300px; width:393px; overflow-x:auto ; overflow-y: auto; padding-left:5px;"></div>'}]},{title:"Extra",items:[{html:'<div style="height:300px; width:393px; overflow-x:auto ; overflow-y: auto; padding-left:5px;"></div>'}]}]},{xtype:"button",text:"Print",winExist:false,a:"",handler:function(){if(!this.winExist){this.winExist=true;var c=window.open("","Terms Priview","height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");c.focus();var b=this.ownerCt.ownerCt.aw.data.offeringData;var d=b.nameString;var i=this.ownerCt.ownerCt.aw.data.departureDate;var h=b.duration;var g="";if(d!=""){g="<u><b>Name:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+d+"<br>"}if(i!=""){g+="<u><b>Departure:</b></u>&nbsp;&nbsp;"+i+"<br>"}if(h!=""&&typeof h!="undefined"){g+="<u><b>Duration:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;"+h+"<br>"}var f=this.ownerCt.ownerCt.getData("restrictions");if(typeof f=="undefined"){f=""}else{f="<br><u><b>Rate:</b></u></br>"+f}var e=this.ownerCt.termsAndConditions;if(e!=""){e="<u><b>Extras:</b></u></br>"+e}c.document.write(g+f.innerHTML);c.location.reload();c.focus();c.print();c.close();this.winExist=false}else{c.focus()}}}],listeners:{render:function(){var c=this.ownerCt.getData("restrictions");if(c){this.items.itemAt(0).items.itemAt(0).items.itemAt(0).html='<div style="height:300px; width:393px; overflow-x:auto ; overflow-y: auto; padding-left:5px;">'+c+"</div>"}this.termsAndConditions="";var b=this.ownerCt.initialConfig.extras;if(typeof b!="undefined"){for(var a=0;a<b.length;a++){if(b[a].termsAndConditions){this.termsAndConditions+=(a+1)+") <u><b>"+b[a].nameString+" :</b></u><br><br>"+b[a].termsAndConditions+"<br><br>"}}}if(this.termsAndConditions){this.items.itemAt(0).items.itemAt(1).items.itemAt(0).html='<div style="height:300px; width:393px; overflow-x:auto ; overflow-y: auto; padding-left:5px;">'+this.termsAndConditions+"</div>"}}}}