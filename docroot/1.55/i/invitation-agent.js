{xtype:"panel",layout:"fit",height:700,width:700,border:true,items:[{html:'<iframe id="invitationa" style="width: 100%; height: 100%;  border: true;"></iframe>',fieldLabel:"Invitation",name:"invitation",width:290}],listeners:{render:function(){;setTimeout(function(){var a=TDS.env.currentDomain;document.getElementById("invitationa").src=a+"html/agentemail.html"},800)}}}