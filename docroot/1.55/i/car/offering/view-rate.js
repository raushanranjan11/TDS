{xtype:"panel",layout:Ext.isIE?"fit":"",autoScroll:true,bodyStyle:"padding: 8px;",tbar:[" ","->",{xtype:"redbutton",text:"Create",handler:function(){var a=this.ownerCt.findParentByType("form");var b=this.ownerCt.ownerCt.items.itemAt(0);TDS.window.setWindow({title:"Create car rental rate",information:"Please enter details of the new rate for this offering.",interfaceURI:"car/offering/rate/create.js",postDataURI:a.getDataURI()+"/rates",requiredData:[{id:"supplier",dataURI:a.getSupplierURI()},{id:"dataURI",dataURI:a.getDataURI()}],callback:{fn:function(d){if(d){this.submitQuery(true)}var c=Ext.StoreMgr.lookup(a.getDataURI()+"/rates");if(c){c.reload()}},scope:b}})}},{xtype:"button",text:"Copy",handler:function(){var b=this.ownerCt.findParentByType("form");var d=this.ownerCt.ownerCt.items.itemAt(0);var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Copy car rental rate",information:"This interface will create a new rate with the following details, you may edit these details before you submit.",interfaceURI:"car/offering/rate/create.js",sourceDataURI:a,postDataURI:b.getDataURI()+"/rates",requiredData:[{id:"supplier",dataURI:b.getSupplierURI()},{id:"dataURI",dataURI:b.getDataURI()}],buttonOK:"Submit",callback:{fn:function(f){if(f){var e=Ext.StoreMgr.lookup(b.getDataURI()+"/rates");if(e){e.reload()}this.submitQuery(true)}},scope:d}})}}," ",{xtype:"button",text:"Archive",disabled:true,handler:function(){var b=this.ownerCt.findParentByType("form");var e=this.ownerCt.ownerCt.items.itemAt(0);var d=e.selModel.getSelected();if(!d){return}var a=d.get("dataURI");var f=this.getText();var c=!(e.topToolbar.items.itemAt(3).checked);TDS.window.setWindow({title:f,message:"Are you sure you want to "+f+" ?",destinationDataURI:a,data:{archived:c},callback:{fn:function(g){if(g){e.submitQuery(true)}},scope:e}})}}],items:[{xtype:"awesomegrid",pinnable:true,enableRowExpander:false,tbar:["Rate name:",{xtype:"textfield",name:"nameLike",enableKeyEvents:true,width:120}," ",{xtype:"checkbox",name:"archived",boxLabel:"Show only Archived",handler:function(){;var b=this.ownerCt.ownerCt.ownerCt.ownerCt;var a=b.items.itemAt(0).topToolbar;a.items.itemAt(5).disable(true)}}," ",{xtype:"button",name:"delete",text:"Delete",disabled:true,handler:function(){var d=this.ownerCt.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");var e=this.getText();if(!a){return}Ext.Msg.show({title:"Alert",msg:"Are you sure you want to "+e,buttons:Ext.Msg.YESNO,fn:b,animEl:"elId",icon:Ext.MessageBox.QUESTION});function b(g,f,h){if(g=="yes"){Ext.Ajax.request({url:TDS.env.dataPath+a,method:"DELETE",callback:function(){d.submitQuery(true)},scope:this,disableCaching:true})}}}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","name","homeCurrency","pricingPriceSell","pricingPriceIsNett","pricingPriceCommission","maximumKilometers","active","special","packagepricingPriceSell","packagepricingPriceIsNett","packagepricingPriceCommission"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Rate name",dataIndex:"name",sortable:true},{header:"Max. Kilometers",dataIndex:"maximumKilometers",sortable:true,renderer:function(a){if(a==0){return"Unlimited"}return a}},{header:"Active",dataIndex:"active",sortable:true,renderer:TDS.util.Format.booleanRenderer},{header:"Special",dataIndex:"special",sortable:true,renderer:TDS.util.Format.booleanRenderer},{header:"Pricing",dataIndex:"pricingPriceSell",sortable:true,renderer:TDS.util.Price.homeCurrencyGrossNettPriceRenderer},{header:"Package Pricing",dataIndex:"packagepricingPriceSell",sortable:true,renderer:TDS.util.Price.homeCurrencyPackageGrossNettPriceRenderer},{header:"Own Availibility",editable:false,dataIndex:"",width:50,renderer:function(c,b,a){if(a.get("shareAvailabilitywith")==""){return'<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'}}}]),viewConfig:{forceFit:true},listeners:{toolbarinit:function(){var a=this.ownerCt.findParentByType("ajaxpanel");this.searchURI=TDS.env.dataPath+a.baseDataURI+"/rates"},render:function(){this.getSelectionModel().on("rowselect",function(){var c=this.items.itemAt(3).checked;var b=this.ownerCt.ownerCt.ownerCt;var a=b.items.itemAt(0).topToolbar;if(!c){a.items.itemAt(5).setDisabled(false);this.items.itemAt(5).setDisabled(true)}else{a.items.itemAt(5).setDisabled(true);this.items.itemAt(5).setDisabled(false)}},this.getTopToolbar());this.getSelectionModel().on("rowdeselect",function(){var b=this.ownerCt.ownerCt.ownerCt;var a=b.items.itemAt(0).topToolbar;a.items.itemAt(5).setDisabled(true)},this.getTopToolbar())},rowdblclick:function(d,h,f){var b=this.ownerCt.findParentByType("form");var c=d.getStore().getAt(h);var a=c.get("dataURI");TDS.window.setWindow({title:"Update car rental rate",interfaceURI:"car/offering/rate/edit.js",sourceDataURI:a,destinationDataURI:a,buttonOK:"Submit",requiredData:[{id:"supplier",dataURI:b.getSupplierURI()},{id:"EditdataURI",dataURI:b.getDataURI()}],callback:{fn:function(g){if(g){var e=Ext.StoreMgr.lookup(b.getDataURI()+"/rates");if(e){e.reload()}this.submitQuery(true)}},scope:d}})}}}],listeners:{render:function(){var b=this.ownerCt.findParentByType("form");var a=b.getData("nameString");this.topToolbar.items.itemAt(0).td.innerHTML="<font color='#003399'><b>"+a+"</b></font>"}}}