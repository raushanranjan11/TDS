{xtype:"form",width:600,border:false,items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:300,width:600,border:false,defaults:{bodyStyle:"padding: 6px 0px 0px 20px;"},items:[{title:"Package Price",autoScroll:true,items:[{border:false,xtype:"label",name:"summary",listeners:{render:function(){this.getEl().dom.innerHTML=this.findParentByType("awesomewindow").aw.data.packageSummary}}}]}]}]}