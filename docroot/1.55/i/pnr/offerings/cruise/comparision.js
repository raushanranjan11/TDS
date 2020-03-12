{height:475,xtype:"form",width:775,closable:true,resizable:false,border:false,modal:true,config:{shipStore:"",sailingDate:""},id:"forms",listeners:{render:function(a){a.findParentByType("awesomewindow").buttons[0].hide()}},items:[{xtype:"panel",border:false,frame:true,layout:"auto",border:false,hideBorders:true,autoHeight:true,items:[{xtype:"fieldset",title:"Deals",cls:"x-tds-offering",autoHeight:true,labelWidth:150,defaults:{autoWidth:true,isFormField:true,getName:function(){return this.name},setValue:function(c){if(this.renderer&&typeof this.renderer=="function"){c=this.renderer(c)}else{if(this.name.substring(this.name.length-3)=="URI"){var d=TDS.data.getStoreNameByResourceDataURI(c);var a=TDS.data.findRecordBy(d,"dataURI",c);if(a!=-1){c=a.get("name")}}}var b=this.allowHTML?false:true;this.setText(c,b)},getValue:Ext.emptyFn},items:[{xtype:"label",name:"cruiseName",fieldLabel:" Cruise",width:200,listeners:{render:function(){var a=this.findParentByType("awesomewindow");this.setValue(a.getData("cruiseName"))}}},{xtype:"label",name:"shipName",fieldLabel:"Ship",listeners:{render:function(){var a=this.findParentByType("awesomewindow");this.setValue(a.getData("shipName"))}}},{xtype:"label",name:"departure",fieldLabel:"Departure ",listeners:{render:function(){var a=this.findParentByType("awesomewindow");this.setValue(a.getData("departure"))}}}]}]},{xtype:"panel",border:false,style:"padding-top:20px;",height:350,autoWidth:true,frame:true,items:[{html:"<i><b>Select a deal to display the conditions<b></i>"},{xtype:"grid",style:"padding-top:20px;",id:"ff",height:300,clicksToEdit:1,multiSelect:true,border:true,sm:new Ext.grid.CheckboxSelectionModel({singleSelect:true}),store:new Ext.data.JsonStore({url:"",id:"dataURI",identifier:"deals",fields:["dealName","dataURI","currency","priceQuad","priceDouble","priceTriple","priceSingle","expireDate","dealDescr"]}),cm:new Ext.grid.ColumnModel([{header:"",width:40,id:"chk",fixed:true,dataIndex:"chk",editable:true,renderer:function(f,c,b,e,g,d){var a=b.get("dataURI");return'<input type="checkbox" id="ch'+a+'" name="rateChk[]"  />'}},{header:"Deals",dataIndex:"dealName",width:120,editor:new Ext.form.ComboBox({store:TDS.data.deals,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Currency",dataIndex:"currency",width:80,editor:new Ext.form.TextField({})},{header:"Interior",dataIndex:"priceQuad",editor:new Ext.form.NumberField({}),renderer:function(f,d,e){return f!=""?parseFloat(e.get("priceQuad")).toFixed(2):""}},{header:"Ocean View",dataIndex:"priceTriple",editor:new Ext.form.NumberField({}),renderer:function(f,d,e){return f!=""?parseFloat(e.get("priceTriple")).toFixed(2):""}},{header:"Balcony",dataIndex:"priceDouble",editor:new Ext.form.NumberField({}),renderer:function(f,d,e){return f!=""?parseFloat(e.get("priceDouble")).toFixed(2):""}},{header:"Suite",dataIndex:"priceSingle",width:80,editor:new Ext.form.NumberField({}),renderer:function(f,d,e){return f!=""?parseFloat(e.get("priceSingle")).toFixed(2):""}},{header:"Expires",dataIndex:"expireDate",editor:new Ext.form.DateField({}),renderer:function(e,d,a,g,c,b){var f=TDS.util.Format.dateSpecial(a.get("expireDate"),TDS.env.dateDayFormatDisplay);return f}}]),listeners:{render:function(){var a=this.findParentByType("awesomewindow");this.getStore().loadData(a.getData("selectedRecords"))},rowclick:function(a,c,b){},cellclick:function(f,h,c,g){if(c==0){var b=this.getStore().getAt(h);var a=b.get("dataURI");var d=document.getElementById("ch"+a).checked;if(d){this.ownerCt.getBottomToolbar().items.itemAt(2).enable();new Ext.Window({height:520,width:775,closable:true,resizable:false,border:false,layout:"fit",modal:true,modal:true,items:[{xtype:"panel",bodyStyle:"padding: 0px;",border:false,layout:"fit",frame:false,width:1000,height:400}]}).show();f.getStore().each(function(e){if(e.data.dataURI!=a){document.getElementById("ch"+e.data.dataURI).checked=false}})}else{this.ownerCt.getBottomToolbar().items.itemAt(2).disable();this.getSelectionModel().clearSelections()}}},check:function(b,a){},checkchange:function(a,d,c,b){}}}],bbar:["","->",{xtype:"button",text:"Proceed",disabled:true,id:"ss",handler:function(d){var b=this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().getSelections()[0].get("dataURI");var c=document.getElementById("ch"+b).checked;var e=this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().getSelections()[0].get("name");if(c){var a=Ext.getCmp("proceed");a.handler.call(a)}this.findParentByType("awesomewindow").hide()}},{xtype:"button",text:"Print"}]}]}