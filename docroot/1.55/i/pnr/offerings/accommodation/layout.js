{xtype:"panel",header:true,autoHeight:true,border:false,items:{xtype:"tabpanel",border:false,activeTab:1,layoutOnTabChange:true,height:196,getPNRCurrency:function(){if(!this.pnrCurrency){var a=this.ownerCt.findParentByType("pnrpanel");this.pnrCurrency=a.getPNRCurrency()}return this.pnrCurrency},shared:{stores:{rates:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","nameString","maximumOccupancy","inventoryTypeURI","roomViewURI","inventoryAvailable","queueRequestable","special"]})},details:{}},setDetail:function(b,c){if(typeof b=="object"){for(var a in b){this.shared.details[a]=b[a]}}else{this.shared.details[b]=c}},getDetail:function(a){return this.shared.details[a]},tabIndexNameLookup:{Rate:1,Book:2},getTab:function(c){var b=this.items.itemAt(this.tabIndexNameLookup[c]);var a=b.items.itemAt(0);if(a.isReady()){return a.items.itemAt(0)}return false},getTabField:function(e,f){var b=this.items.itemAt(this.tabIndexNameLookup[e]);var a=b.items.itemAt(0);if(a.isReady()){var d=a.items.itemAt(0);var c=d.findField(f);if(c){return c}}return false},items:[{title:"Details",items:{xtype:"ajaxpanel",height:170,interfaceURI:"pnr/offerings/accommodation/detail.js"}},{title:"Rates",items:{xtype:"ajaxpanel",height:170,autiScroll:true,interfaceURI:"pnr/offerings/accommodation/rate.js"}},{title:"Book",items:{xtype:"ajaxpanel",height:160,interfaceURI:"pnr/offerings/accommodation/availability.js"}}],listeners:{render:function(){var c=this.ownerCt.findParentByType("ajaxpanel");var b=this.ownerCt.findParentByType("awesomegrid");this.shared.details.offeringName=c.rowRecordData.nameString;this.shared.details.offeringURI=c.rowRecordData.dataURI;var a=c.rowRecordData.dataURI;var e=b.findParentByType("ajaxpanel").baseDataURI;var d=this.items.itemAt(1).items.itemAt(0);d.baseDataURI=a;var f=this.items.itemAt(2).items.itemAt(0);f.baseDataURI=a;f.pnrDataURI=e}}},listeners:{render:function(){var c=this.ownerCt;var e=this.items.itemAt(0);e.setDetail(c.rowRecordData);var b=c.rowRecordData.supplierURI;if(b){var a=TDS.util.Format.displayResourceConciseName(b)}this.setTitle(c.rowRecordData.nameString+" ("+a+")");if(b==TDS.util.Defaults.hotusaSupplier){var d=e.items.itemAt(2);d.disable(true)}}}}