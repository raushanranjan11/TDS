{xtype:"panel",layout:Ext.isIE?"fit":"",autoScroll:true,bodyStyle:"padding: 8px;",tbar:[" ","->",{xtype:"redbutton",text:"Create",handler:function(){var a=this.ownerCt.findParentByType("form");var b=this.ownerCt.ownerCt.items.itemAt(0);TDS.window.setWindow({title:"Create tour extra",information:"Please enter details of the new extra for this offering.",interfaceURI:"tour/offering/extra/create.js",baseDataURI:a.getDataURI(),postDataURI:a.getDataURI()+"/extras",helpTitel:"Creat Tour Extra Help",helpId:"18",requiredData:[{id:"supplier",dataURI:a.getSupplierURI()}],callback:{fn:function(c){if(c){this.submitQuery(true)}},scope:b}})}},{xtype:"button",text:"Copy",handler:function(){var b=this.ownerCt.findParentByType("form");var d=this.ownerCt.ownerCt.items.itemAt(0);var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Copy tour extra",information:"This interface will create a new extra with the following details, you may edit these details before you submit.",interfaceURI:"tour/offering/extra/create.js",sourceDataURI:a,baseDataURI:b.getDataURI(),postDataURI:b.getDataURI()+"/extras",requiredData:[{id:"supplier",dataURI:b.getSupplierURI()}],callback:{fn:function(e){if(e){this.submitQuery(true)}},scope:d}})}},{text:"Help",xtype:"redbutton",cls:"x-button-blue",overCls:"x-button-blue-over",opened:false,toggle:false,handler:function(){TDS.needHelp("Creat Tour Extra Help","18");if(!this.opened){this.opened=true;TDS.needHelp("Creat Tour Extra Help","18")}else{this.opened=false;TDS.helpwindow.hide()}}}],items:{xtype:"awesomegrid",enableSession:false,store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","name","homeCurrency","pricingPriceSell","pricingPriceIsNett","pricingPriceCommission","required","availableForAllRates","minimumInventoryRequired","extraCategoryURI"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Name",dataIndex:"name",sortable:true},{header:"Category",dataIndex:"extraCategoryURI",sortable:true,renderer:TDS.util.Format.displayResourceNameRenderer()},{header:"Required",dataIndex:"required",sortable:true,renderer:TDS.util.Format.booleanRenderer},{header:"Min. required",dataIndex:"minimumInventoryRequired",sortable:true},{header:"All rates",dataIndex:"availableForAllRates",sortable:true,renderer:TDS.util.Format.booleanRenderer},{header:"Pricing",dataIndex:"pricingPriceSell",sortable:true,renderer:TDS.util.Price.homeCurrencyGrossNettPriceRenderer}]),viewConfig:{forceFit:true},listeners:{toolbarinit:function(){var a=this.ownerCt.findParentByType("form");this.searchURI=TDS.env.dataPath+a.getDataURI()+"/extras";this.overrideCollectionIdentifier=a.getDataURI()+"/extras"},rowdblclick:function(d,h,f){var b=this.ownerCt.findParentByType("form");var c=d.getStore().getAt(h);var a=c.get("dataURI");TDS.window.setWindow({title:"Update tour extra",interfaceURI:"tour/offering/extra/edit.js",baseDataURI:b.getDataURI(),sourceDataURI:a,destinationDataURI:a,buttonOK:"Submit",callback:{fn:d.submitQuery,scope:d}})}}},listeners:{render:function(){var b=this.ownerCt.findParentByType("form");var a=b.getData("nameString");this.topToolbar.items.itemAt(0).td.innerHTML="<font color='#003399'><b>"+a+"</b></font>"}}}