{xtype:"panel",header:true,autoHeight:true,border:false,pnrRecordData:{},refreshGrid:function(){var a=this.ownerCt.findParentByType("awesomegrid");a.submitQuery(true)},requireStores:[{dataURI:TDS.env.dataPath+"cruise/cabintypes/collection",identifier:"cruise/cabintypes",fields:["name","dataURI","displayName"]}],items:{xtype:"tabpanel",border:false,activeTab:0,layoutOnTabChange:true,height:210,inventoryData:{},shared:{details:{}},config:{cruiseName:""},passengersData:new Ext.util.MixedCollection(),getComponentDetail:function(a){if(a){return this.ownerCt.ownerCt.rowRecordData[a]}return this.ownerCt.ownerCt.rowRecordData},getPNRDetail:function(a){if(a){return this.ownerCt.pnrRecordData[a]}return this.ownerCt.pnrRecordData},getInventoryDetail:function(a){if(a){return this.inventoryData[a]}return this.inventoryData},getPassengers:function(b){if(b){return this.passengersData.get(b)}else{var a=[];this.passengersData.each(function(c){a.push(c)});return a}},setDetail:function(b,c){if(typeof b=="object"){for(var a in b){this.shared.details[a]=b[a]}}else{this.shared.details[b]=c}},getDetail:function(a){return this.shared.details[a]},items:[{title:"Details",items:{xtype:"ajaxpanel",height:250,interfaceURI:"fulfillment/cruise/detail.js"}},{title:"Extras",items:{xtype:"ajaxpanel",height:170,interfaceURI:"fulfillment/generic/extras.js"}},{title:"SSR",items:{xtype:"ajaxpanel",height:170,interfaceURI:"fulfillment/generic/ssr.js"}},{title:"Queues",items:{xtype:"ajaxpanel",height:170,interfaceURI:"fulfillment/generic/messages.js"}}]},initPnr:function(){var a=this.pnrRecordData.dataURI;Ext.Ajax.request({url:TDS.env.dataPath+a,method:"GET",callback:function(h,b,c){if(b){try{var g=Ext.decode(c.responseText)}catch(f){}Ext.apply(this.pnrRecordData,g)}this.el.unmask()},scope:this})},listeners:{render:function(){var b=this.ownerCt;var a=this.ownerCt.ownerCt;var c=this.items.itemAt(0);this.dataURI=b.rowRecordData.dataURI;this.setTitle(b.rowRecordData.name);this.pnrRecordData.dataURI=b.rowRecordData.dataURI.split("/",2).join("/");c.setDetail(b.rowRecordData);this.el.mask("","x-mask-loading");this.initPnr()}}}