{xtype:"form",border:false,trackResetOnLoad:true,items:{xtype:"tabpanel",border:false,defaults:{border:false},activeTab:0,layoutOnTabChange:true,height:300,items:[{title:"Details",layout:"form",defaults:{style:"padding: 2px 4px 2px 4px;"},items:[{xtype:"panel",border:false,items:{xtype:"panel",layout:"form",labelWidth:100,border:false,defaultType:"textfield",items:[{xtype:"panel",style:"padding: 0; margin-bottom: 4px;",border:false,layout:"table",layoutConfig:{columns:5},defaults:{border:false},items:[{html:"Transaction:",width:Ext.isIE?108:105},{xtype:"combo",name:"type",width:140,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"dataURI",value:"...",tpl:'<tpl for="."><div class="x-combo-list-item">{name} <span style="font-style: italic; font-size: 10px; color: #999;">{code}</span></div></tpl>',listeners:{beforerender:function(){var b=this.ownerCt.findParentByType("awesomewindow");this.store=new Ext.data.CollectionStore({autoLoad:true,identifier:b.getDataURI("agency")+"/transactionTypes",url:TDS.env.dataPath+b.getDataURI("agency")+"/transactionTypes/collection",fields:["dataURI","code","type","name","description","amount","credit"]})},select:function(i,h){var c=this.ownerCt.ownerCt.items.itemAt(1);var j=this.ownerCt.ownerCt.items.itemAt(2);var k=this.ownerCt.items.itemAt(3);var l=this.ownerCt.items.itemAt(4);c.setValue(h.get("description"));if(h.get("amount")){j.setValue(h.get("amount").toFixed(2))}if(h.get("credit")){k.show();l.setValue("true")}else{k.hide();l.setValue("false")}}}},{bodyStyle:"padding: 0 4px;"},{xtype:"combo",name:"passengerNameRecordTransactionMethodURI",hidden:false,mode:"local",width:120,triggerAction:"all",editable:false,editable:false,forceSelection:true,displayField:"name",valueField:"dataURI",listeners:{beforerender:function(){var b=this.ownerCt.findParentByType("awesomewindow");this.store=new Ext.data.CollectionStore({autoLoad:true,identifier:"pnr/transactionMethods",url:TDS.env.dataPath+"pnr/transactionMethods/collection",fields:["dataURI","code","type","name","description","amount","credit"]})}}},{xtype:"hidden",name:"credit",value:"false"}]},{name:"description",fieldLabel:"Description",width:200},{name:"amount",fieldLabel:"Amount",width:100}]}},{xtype:"panel",layout:"form",border:false,items:[{border:false,style:"padding-bottom: 4px;",html:"<p>Notes:</p>"},{xtype:"textarea",name:"notes",height:160,hideLabel:true,labelSeparator:"",anchor:"100%"}]}]}]}}