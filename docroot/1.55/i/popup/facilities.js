{xtype:"panel",facilities:"",items:[{autoScroll:true,xtype:"panel",height:160,html:'<div style="padding: 6px;">No facilities specified.</div>'},{xtype:"button",text:"Print",winExist:false,a:"",handler:function(){if(!this.winExist){this.winExist=true;var c=window.open("","Facilities Priview","height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes");c.focus();var g=this.ownerCt.facilities;var b=this.ownerCt.ownerCt.aw.data.offeringData;var d=b.nameString;var h=this.ownerCt.ownerCt.aw.data.departureDate;var f=b.duration;var e="";if(d!=""){e="<u><b>Name:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+d+"<br>"}if(h!=""){e+="<u><b>Departure:</b></u>&nbsp;&nbsp;"+h+"<br>"}if(f!=""&&typeof f!="undefined"){e+="<u><b>Duration:</b></u>&nbsp;&nbsp;&nbsp;&nbsp;"+f+"<br>"}if(typeof g=="undefined"){g=""}else{g="<u><b>Facilities:</b></u></br>"+g}c.document.write(e+terms.innerHTML);c.location.reload();c.focus();c.print();c.close();this.winExist=false}else{c.focus()}}}],listeners:{render:function(){var a=this.ownerCt.getConfigValue("sourceDataURI");a=a.substring(0,a.lastIndexOf("/"));var b=this.ownerCt.getData();var c=b[a];if(c.length<0){return}this.facilities=TDS.util.collectionToEnglishSentenceLists({fieldName:"name",data:b,collection:c});this.items.itemAt(0).html='<div style="padding: 6px;">'+this.facilities+"</div>"}}}