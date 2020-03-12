Ext.AwesomePanel=Ext.extend(Ext.Panel,{cls:"x-tds-awesomepanel",searchURI:"",delay:200,dt:new Ext.util.DelayedTask(),collectionIdentifier:"",isCollectionValid:false,toolbarFields:[],groupURI:undefined,hasGroups:false,deferQuery:false,appendQueryParams:{},callBeforeSearch:false,initComponent:function(){Ext.AwesomePanel.superclass.initComponent.apply(this,arguments);this.appendQueryParams={};this.addEvents("toolbarinit","queryresponse");if(typeof this.groupURI!="undefined"){this.hasGroups=true;this.initGroups()}},onRender:function(){Ext.AwesomePanel.superclass.onRender.apply(this,arguments);if(this.tbar2){this.topToolBar2=new Ext.Toolbar({renderTo:this.tbar,items:this.tbar2});this.topToolBar2.ownerCt=this}if(this.tbar){this.initToolbar()}},initGroups:function(){var c={callback:function(){this.groupResponse()},scope:this};if(Ext.isArray(this.groupURI)){this.groupsRemaining=this.groupURI.length;for(var b=0;b<this.groupURI.length;b++){if(this.groupURI[b]=="parent"){this.groupURI[b]=""}Ext.apply(c,{groupURI:this.groupURI[b]});if(this.groupURI[b]==""){var a=TDS.env.user.getParentGroups(c)}else{var a=TDS.env.user.getChildGroups(c)}if(a!==-1){this.groupResponse()}}}else{this.groupsRemaining=1;if(this.groupURI=="parent"){this.groupURI=""}Ext.apply(c,{groupURI:this.groupURI});if(this.groupURI==""){var a=TDS.env.user.getParentGroups(c)}else{var a=TDS.env.user.getChildGroups(c)}if(a!==-1){this.groupResponse()}}},isReady:function(){if(this.hasGroups&&this.groupsRemaining>0){return false}return true},groupResponse:function(){this.groupsRemaining--;if(this.isReady()){this.activateItems()}},activateItems:function(){for(var a=0;a<this.itemConfigs.length;a++){var c=this.itemConfigs[a];if(typeof c.groupPermission!="undefined"){var b=c.groupPermission;if(!TDS.env.user.hasGroupPermission(b)){continue}}this.add(c)}this.doLayout()},getTopToolbar2:function(){return this.topToolBar2},initToolbar:function(){this.fireEvent("toolbarinit",this);this.toolbarFields=[];var b=this.getTopToolbar();var a=this.getTopToolbar2();if(typeof b=="object"){this.setToolbarItems(b)}if(typeof a=="object"){this.setToolbarItems(a)}if(!this.deferQuery){this.submitQuery(true)}},getStore:function(){return this.store},setToolbarItems:function(a){a.items.each(function(c){if(!c.xtype){return true}var b=c;if(b.xtype=="textfield"||b.xtype=="datefield"){b.on("keyup",this.submit,this)}else{if(b.xtype=="combo"||b.xtype=="clearablecombo"||b.xtype=="awesomecombo"||b.xtype=="locationcombo"||b.xtype=="airportcombo"){b.on("select",this.submit,this);if(b.xtype=="clearablecombo"||b.xtype=="awesomecombo"||b.xtype=="locationcombo"||b.xtype=="airportcombo"){b.on("clear",this.submit,this)}}else{if(b.xtype=="checkbox"){b.on("check",this.submit,this)}else{if(b.xtype=="awesomesplitbutton"){b.on("click",this.submit,this)}else{if(b.xtype=="omnicrementer"){b.on("trigger",this.submit,this)}else{if(b.xtype=="hidden"){}else{return true}}}}}}if(b.xtype=="datefield"){b.addEvents("extraselect");Ext.apply(b,{grid:this,menuListeners:{select:function(e,f){this.setValue(f);this.fireEvent("extraselect",this,f);this.grid.submit()}}})}this.toolbarFields.push(b)},this)},findField:function(c){for(var a=0;a<this.toolbarFields.length;a++){var b=this.toolbarFields[a];if(typeof b.name!==undefined&&b.name==c){return b}}return false},submit:function(){this.dt.cancel();this.dt.delay(this.delay,this.submitQuery,this)},submitQuery:function(e){if(this.callBeforeSearch){this.beforeSearch()}var g,f;this.queryParams={};for(var d=0;d<this.toolbarFields.length;d++){g=this.toolbarFields[d];if(g.excludeSubmit){continue}if(g.xtype=="datefield"){f=g.getValue();if(typeof f=="object"){f=f.format(TDS.env.dateFormat)}}else{f=g.getValue()}if(f==""){continue}this.queryParams[g.name]=f;if(g.originalValue==f){continue}if(g.originalValue.length==0){this.isCollectionValid=false}else{if(f.length>g.originalValue.length&&f.substring(0,g.originalValue.length)==g.originalValue){}else{this.isCollectionValid=false}}g.originalValue=f}Ext.apply(this.queryParams,this.appendQueryParams);if(this.searchURI.indexOf(TDS.env.dataPath)!=-1){this.collectionIdentifier=this.searchURI.substring(TDS.env.dataPath.length)}else{this.collectionIdentifier=this.searchURI}var a=Ext.urlEncode(this.queryParams);if(a){this.collectionIdentifier+="?"+a}if(e&&this.isCollectionValid){this.isCollectionValid=false}var c=this.isCollectionValid?this.searchURI:this.searchURI+"/collection";var b=this.items.itemAt(0);if(b!=null&&b!=undefined){b.initialConfig.viewConfig.emptyText="No Results";b.ownerCt.el.mask(" ","x-mask-loading")}Ext.Ajax.request({url:c,method:"GET",disableCaching:false,params:this.queryParams,callback:this.submitQueryResponse,scope:this})},getQueryParams:function(a){if(a){return Ext.urlEncode(this.queryParams)}return this.queryParams},getQueryValue:function(a){return this.queryParams[a]},clearQueryParams:function(){for(var a=0;a<this.toolbarFields.length;a++){var b=this.toolbarFields[a];b.setValue("")}},setQueryParams:function(c){for(var a=0;a<this.toolbarFields.length;a++){var b=this.toolbarFields[a];if(typeof c[b.name]!="undefined"){b.setValue(c[b.name])}}},submitQueryResponse:function(g,b,d){var a=this.items.itemAt(0);if(a!=null&&a!=undefined){a.ownerCt.el.unmask()}this.fireEvent("queryresponse",this,b);if(b){try{var c=Ext.util.JSON.decode(d.responseText)}catch(f){return}if(this.isCollectionValid){this.processData(c)}else{this.processCollectionData(c)}return}},processData:function(d){var b=this.getStore();var e=[];for(var c=0;c<d.length;c++){var a=b.indexOfId(d[c]);if(a>-1){e.push(b.getAt(a))}}b.removeAll();b.add(e)},processCollectionData:function(b){var d=b[this.overrideCollectionIdentifier||this.collectionIdentifier];if(typeof d=="undefined"){return}var c=[];for(var a=0;a<d.length;a++){b[d[a]].dataURI=d[a];c.push(b[d[a]])}this.getStore().loadData(c)},getItemByPanelKey:function(b){var a=-1;this.items.each(function(d,c){if(d.panelKey==b){a=d;return false}});return a}});Ext.reg("awesomepanel",Ext.AwesomePanel);