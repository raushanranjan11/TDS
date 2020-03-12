{xtype:"panel",header:true,autoHeight:true,border:true,refreshGrid:function(){var a=this.ownerCt.findParentByType("awesomegrid");a.submitQuery(true)},items:{xtype:"tabpanel",border:false,activeTab:0,layoutOnTabChange:true,height:240,shared:{details:{}},setDetail:function(b,c){if(typeof b=="object"){for(var a in b){this.shared.details[a]=b[a]}}else{this.shared.details[b]=c}},getDetail:function(a){return this.shared.details[a]},items:[{title:"Details",items:{xtype:"panel",border:false,layout:"column",height:240,bodyStyle:"padding: 4px;",items:[{columnWidth:1,style:"padding: 0px; margin-right: 8px;",xtype:"ajaxpanel",height:300,interfaceURI:"pnr/components/rail/detail.js"},{width:150,xtype:"panel",autoHeight:true,border:false,bodyStyle:"padding: 4px;",defaults:{minWidth:100},invokeWindow:function(a,b){if(!b){b={}}var d=this.ownerCt.findParentByType("tabpanel");var c=d.ownerCt;Ext.apply(b,{title:"Amend",interfaceURI:"pnr/components/generic/edit.js",destinationDataURI:d.getDetail("dataURI"),sourceDataURI:d.getDetail("dataURI"),dataURI:{pnr:d.getDetail("pnrDataURI"),offering:d.getDetail("offeringURI"),component:d.getDetail("dataURI")},params:{status:a,priceCurrency:d.getDetail("pricingPriceCurrency")},callback:{fn:function(e){if(e){c.refreshGrid()}},scope:this}});TDS.window.setWindow(b)},listeners:{render:function(){var d=this.items.itemAt(0);var h=this.items.itemAt(1);var e=this.items.itemAt(2);var b=this.items.itemAt(3);var f=this.items.itemAt(4);var g=this.ownerCt.findParentByType("tabpanel");var a=g.getDetail("status");if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CANCELLED.toLowerCase()){d.disable()}if(a.toLowerCase()==TDS.data.componentStatus.STATUS_HELD.toLowerCase()){h.show();e.show()}var c=g.getDetail("supplierURI");if(c==TDS.env.user.getAgencySupplierURI()&&TDS.env.user.isArenaOne()&&a.toLowerCase()==TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()){h.show();h.setText("Confrim RQ")}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()){e.show()}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CANCEL_REQUESTED.toLowerCase()){b.show()}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()){f.show()}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_RELEASED.toLowerCase()){d.disable()}}}}}}},items:[{xtype:"button",text:"Amend",handler:function(){var a=this.ownerCt;a.invokeWindow("doNothing")}},{xtype:"button",text:"Confirm",hidden:true,handler:function(){var a=this.ownerCt;a.invokeWindow(TDS.data.componentStatus.STATUS_CONFIRMED)}},{xtype:"button",text:"Cancel",hidden:true,handler:function(){var b=this.ownerCt;var c=this.ownerCt.findParentByType("tabpanel");var a=c.getDetail("status");if(!a){return}if(a.toLowerCase()==TDS.data.componentStatus.STATUS_HELD.toLowerCase()){b.invokeWindow(TDS.data.componentStatus.STATUS_CANCELLED)}else{if(a.toLowerCase()==TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()){b.invokeWindow(TDS.data.componentStatus.STATUS_CANCEL_REQUESTED)}}}},{xtype:"button",text:"Re-secure",hidden:true,handler:function(){var a=this.ownerCt;a.invokeWindow(TDS.data.componentStatus.STATUS_CONFIRMED)}},{xtype:"button",text:"Release",hidden:true,handler:function(){var a=this.ownerCt;a.invokeWindow(TDS.data.componentStatus.STATUS_RELEASED)}},{xtype:"button",text:"Note",handler:function(){var b=this.ownerCt.findParentByType("tabpanel");var a=b.getDetail("dataURI");TDS.window.setWindow({title:"Send a note",information:"Please enter your note below.",interfaceURI:"note.js",postDataURI:a+"/note",callback:{fn:function(c){},scope:this}})}},{xtype:"timerlabel",expire:function(){var a=this.ownerCt;a.items.itemAt(0).disable();a.items.itemAt(1).disable();this.setText("Expired.")},listeners:{render:function(){var d=this.ownerCt.findParentByType("tabpanel");var b=d.getDetail("dataURI");var a=d.getDetail("timeHeldUntil");if(!b||!a){this.hide();var c=Ext.TimerMgr.lookup(b);if(c){Ext.TimerMgr.stop(c)}return}var e=new Ext.Timer({id:b,expireTime:a});var c=Ext.TimerMgr.start(e);this.setTimer(c)},timerexpire:function(){this.expire()}}}]}]}},{title:"Extras",items:{xtype:"ajaxpanel",height:190,interfaceURI:"pnr/components/generic/extras.js"}},{title:"Terms and Conditions",items:{xtype:"ajaxpanel",height:190,interfaceURI:"pnr/components/generic/terms.js"}},{title:"Links",items:{xtype:"ajaxpanel",height:190,interfaceURI:"pnr/components/generic/links.js"}},{title:"Queues",items:{xtype:"ajaxpanel",height:190,interfaceURI:"pnr/components/generic/messages.js"}},{title:"Information",items:{xtype:"ajaxpanel",height:190,interfaceURI:"pnr/components/rail/information.js"}}]},listeners:{render:function(){var d=this.ownerCt;var b=this.ownerCt.ownerCt;var e=this.items.itemAt(0);var e=this.items.itemAt(0);e.setDetail(d.rowRecordData);e.setDetail("pnrDataURI",b.ownerCt.ownerCt.baseDataURI);var c=d.rowRecordData.supplierURI;if(c){var a=TDS.util.Format.displayResourceConciseName(c)}this.setTitle(d.rowRecordData.name+" ("+a+")")}}}