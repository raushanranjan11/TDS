{xtype:"panel",layout:"fit",border:false,getDataURI:function(){return this.ownerCt.dataURI},getSessionURI:function(){return this.ownerCt.sessionURI},getSessionValue:function(a){return this.ownerCt.sessionObj[a]},sessionDefaults:{option:"accommodation",cardIndex:2},items:[{xtype:"panel",layout:"card",activeItem:0,border:false,viewConfig:{loadMask:false},hideBorders:true,hideToggleGroup:function(a){this.getTopToolbar().items.each(function(b){if(b.ourToggleGroup==a){b.hide()}},this)},showToggleGroup:function(a){this.getTopToolbar().items.each(function(b){if(b.ourToggleGroup==a){if(b.pressed){b.handler()}b.show()}},this)},showInterface:function(a,b){if(!a.pressed){a.toggle(true);return}this.getTopToolbar().items.each(function(e){if(e.ourToggleGroup==a.ourToggleGroup){if(e.pressed&&(e.id!=a.id)){e.toggle(false)}}},this);var d=this.items.itemAt(b);d.sessionURI=this.ownerCt.getSessionURI()+"/"+a.value;this.displayCardByIndex(b);var c=this.ownerCt.getSessionURI();TDS.session.setByPath(c,{option:a.value,cardIndex:b})},displayCardByIndex:function(b){this.getLayout().setActiveItem(b);var a=this.getLayout().activeItem;a.baseDataURI=this.ownerCt.getDataURI();if(!a.isReady()){a.initLoad()}return a},defaults:{layout:"fit",border:false,autoLoadPanel:false,maskDisabled:false},listeners:{render:function(){var a=this.ownerCt.sessionDefaults;var e={};e.option=this.ownerCt.getSessionValue("option");e.cardIndex=this.ownerCt.getSessionValue("cardIndex");var b=e.option?e.option:a.option;var c=e.cardIndex?e.cardIndex:a.cardIndex;this.getTopToolbar().items.each(function(f){if(f.value==b){f.toggle(true)}else{f.toggle(false)}},this);this.activeItem=c;var d=this.items.itemAt(this.activeItem);d.baseDataURI=this.ownerCt.getDataURI();d.sessionURI=this.ownerCt.getSessionURI()+"/"+b;d.autoLoadPanel=true;this.findParentByType("ajaxpanel").getEl().unmask()}},tbar:[{xtype:"button",text:"Supplier Transaction",value:"supplier",enableToggle:true,handler:function(){this.ownerCt.ownerCt.showInterface(this,1)}},{xtype:"button",text:"Agent Transaction",value:"agent",enableToggle:true,handler:function(){this.ownerCt.ownerCt.showInterface(this,2)}}],items:[{},{xtype:"ajaxpanel",interfaceURI:"transaction/transactionSupplier.js",height:425},{xtype:"ajaxpanel",interfaceURI:"transaction/transactionAgent.js",height:425}]}]}