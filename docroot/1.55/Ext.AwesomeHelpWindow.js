Ext.HelpAwesomeWindow=Ext.extend(Ext.Window,{interfacePathURI:TDS.env.interfacePath,dataURIPrefix:TDS.env.dataPath,displayCenter:false,stateful:false,aw:{_data:undefined,_responseData:undefined,_responseStatus:undefined,data:{},mergeData:false,baseDataURI:"",dataURI:{},params:{},sourceDataURI:"",postDataURI:"",destinationDataURI:"",interfaceURI:"",interfaceObj:undefined,sourceDataObj:undefined,registeredItems:[],requiredData:[],requiredDataRemaining:0,callback:{fn:undefined,scope:undefined}},initComponent:function(){var a={title:"",border:false,closeAction:"hide",renderTo:Ext.getBody(),modal:true,resizable:false,defaults:{xtype:"panel",border:false,width:416,bodyStyle:"background-color: #D0DEF0; padding: 2px;"},items:[{width:416,hidden:true},{},{hidden:true}],buttons:[{text:"OK",handler:function(){this.ownerCt.submit()}},{text:"Cancel",hidden:true,handler:function(){this.ownerCt.affirmative=false;this.ownerCt.hide()}}]};Ext.apply(this,this.initialConfig,a);Ext.AwesomeWindow.superclass.initComponent.apply(this,arguments)},getConfigValue:function(a){return this.aw[a]},getData:function(a){if(a){return this.aw.data[a]}return this.aw.data},getDataURI:function(a){return this.aw.dataURI[a]},getParams:function(){return this.aw.params},getParam:function(a){return this.aw.params[a]},getPostDataURI:function(){return this.aw.postDataURI},setPostDataURI:function(a){this.aw.postDataURI=a},getRequiredData:function(b){if(b){for(var a=0;a<this.aw.requiredData.length;a++){if(this.aw.requiredData[a].id==b){return this.aw.requiredData[a]}}return -1}return this.aw.requiredData},initEvents:function(){Ext.AwesomeWindow.superclass.initEvents.apply(this,arguments);this.loadMask=new Ext.LoadMask(this.body,{msg:""})},afterShow:function(){Ext.AwesomeWindow.superclass.afterShow.apply(this,arguments);this.loadMask.show()},hasActiveTrans:function(){return this.aw.registeredItems&&this.aw.registeredItems[0]},registerItem:function(a){var c=this.aw.registeredItems;for(var b=0;b<c.length;b++){if(c[b].id==a){return}}this.aw.registeredItems.push({id:a})},removeRegisteredItem:function(a){for(var b=0;b<this.aw.registeredItems.length;b++){if(this.aw.registeredItems[b].id==a){this.aw.registeredItems.splice(b,1)}}},getRegisteredItems:function(){var a=this.aw.registeredItems;var b=[];for(var c=0;c<a.length;c++){b[c]=Ext.getCmp(a[c].id)}return b.length>0?b:-1},getRegisteredItemById:function(b){var a=this.aw.registeredItems;for(var c=0;c<a.length;c++){if(b==a[c].id){return a[c]}}return -1},getTopPanel:function(){return this.items.itemAt(0)},getCenterPanel:function(){return this.items.itemAt(1)},getBottomPanel:function(){return this.items.itemAt(2)},afterHide:function(){Ext.AwesomeWindow.superclass.afterHide.apply(this,arguments);this.cleanWindow()},cleanWindow:function(){if(this.aw.callback.fn!==undefined){Ext.callback(this.aw.callback.fn,this.aw.callback.scope||this,[this.affirmative,this.aw._data,this.aw._responseData,this.aw._responseStatus])}this.affirmative=undefined;with(this.getTopPanel()){body.dom.innerHTML="";setWidth(420);hide()}with(this.getBottomPanel()){body.dom.innerHTML="";setWidth(420);hide()}with(this.getCenterPanel()){body.dom.innerHTML="";setWidth(420);hide()}this.setTitle("");this.buttons[0].setText("OK");this.buttons[1].setText("Cancel");if(this.buttons[0].hidden){this.buttons[0].show()}if(this.buttons[0].disabled){this.buttons[0].enable()}if(this.buttons[1].disabled){this.buttons[1].enable()}this.aw._data=undefined;this.aw._responseData=undefined;this.aw._responseStatus=undefined;this.aw.data={};this.aw.mergeData=false;this.aw.interfaceURI="";this.aw.interfaceObj=undefined;this.aw.dataURI={};this.aw.params={};this.aw.baseDataURI="";this.aw.sourceDataURI="";this.aw.sourceDataObj=undefined;this.aw.postDataURI="";this.aw.destinationDataURI="";this.aw.registeredItems=[];this.aw.requiredData=[];this.aw.requiredDataRemaining=0;this.aw.callback.fn=undefined;this.aw.callback.scope=undefined;this.remove(1);this.insert(1,{xtype:"panel"})},setWindow:function(config){if(!this.hidden){return}this.initialConfig=config;if(config.information){with(this.getTopPanel()){body.dom.innerHTML="<p>"+config.information+"</p>";show()}}if(config.message){this.remove(1);this.insert(1,{xtype:"panel",html:"<p>"+config.message+"</p>"})}if(config.interfaceURI){this.aw.interfaceURI=config.interfaceURI;this.fetchInterfaceURI()}if(config.sourceDataURI){this.aw.sourceDataURI=config.sourceDataURI;this.fetchSourceDataURI()}if(config.requiredData){this.aw.requiredData=config.requiredData;this.fetchRequiredData()}if(config.dataURI){this.aw.dataURI=config.dataURI}if(config.params){this.aw.params=config.params}if(config.baseDataURI){this.aw.baseDataURI=config.baseDataURI}if(config.data){this.aw.data=config.data}if(config.destinationDataURI){this.aw.destinationDataURI=config.destinationDataURI}if(config.postDataURI){this.aw.postDataURI=config.postDataURI}if(config.callback){this.aw.callback.fn=config.callback.fn;this.aw.callback.scope=config.callback.scope}if(config.mergeData){this.aw.mergeData=true}if(typeof config.modal=="boolean"&&!config.modal){this.modal=false}else{this.modal=true}if(config.title){this.setTitle(config.title)}if(typeof config.buttonOK=="boolean"&&config.buttonOK==false){this.buttons[0].hide()}else{if(config.buttonOK){this.buttons[0].setText(config.buttonOK)}}if(config.buttonCancel){this.buttons[1].setText(config.buttonCancel)}if(config.showCancelButton){this.buttons[1].show()}this.show();if(config.displayCenter){this.center();this.displayCenter=true}else{if(config.winToRight){this.setPosition(856,140)}else{this.setPosition(0,140)}}if(this.isReady()){this.renderWindow(config.nonCenter)}},renderWindow:function(){if(this.aw.interfaceURI&&this.aw.interfaceObj){this.remove(1);this.insert(1,this.aw.interfaceObj)}this.doLayout();var e=this.getCenterPanel();if(this.aw.data||this.aw.requiredData.length>0){if(e.xtype=="form"){if(typeof e.beforeDataLoad=="function"){this.aw.data=e.beforeDataLoad(this.aw.data,this)}var d=e.getForm();for(var b=0;b<d.items.length;b++){var c=d.items.items[b];var a=this.aw.data[c.name];if(a!==undefined){if(c.xtype=="radio"&&a.toString()!=c.inputValue){continue}if(c.xtype=="datefield"&&typeof a==="string"){a=new Date.parseDate(a,TDS.env.dateFormat);c.setValue(a)}else{c.setValue(a.toString())}if(!e.markDataDirtyOnLoad){c.originalValue=a}}}if(typeof e.afterDataLoad=="function"){e.afterDataLoad(this.aw.data,this)}}}if(typeof e.afterRenderWindow=="function"){e.afterRenderWindow(this.initialConfig,this)}if(this.displayCenter){this.syncShadow();this.center()}this.loadMask.hide()},isReady:function(){if(this.aw.interfaceURI&&typeof this.aw.interfaceObj=="undefined"){return false}if(this.aw.sourceDataURI&&typeof this.aw.sourceDataObj=="undefined"){return false}if(this.aw.requiredData&&this.requiredDataRemaining>0){return false}return true},fetchRequiredData:function(){this.requiredDataRemaining=this.aw.requiredData.length;Ext.each(this.aw.requiredData,function(a){Ext.Ajax.request({url:this.dataURIPrefix+a.dataURI,requiredData:a,method:"GET",callback:this.fetchRequiredDataResponse,scope:this,disableCaching:true})},this)},fetchRequiredDataResponse:function(g,b,c){this.requiredDataRemaining--;var a=g.requiredData;try{var d=Ext.util.JSON.decode(c.responseText);Ext.apply(a,{data:d})}catch(f){}if(this.isReady()){this.renderWindow()}},fetchSourceDataURI:function(){Ext.Ajax.request({url:this.dataURIPrefix+this.aw.sourceDataURI,method:"GET",callback:this.fetchSourceDataResponse,scope:this,disableCaching:true})},fetchSourceDataResponse:function(d,a,b){if(a){try{this.aw.sourceDataObj=Ext.util.JSON.decode(b.responseText)}catch(c){this.aw.sourceDataObj={}}if(this.aw.data){this.aw.data=Ext.apply(this.aw.sourceDataObj,this.aw.data)}if(this.isReady()){this.renderWindow()}}},fetchInterfaceURI:function(){Ext.Ajax.request({url:this.interfacePathURI+this.aw.interfaceURI,method:"GET",callback:this.fetchInterfaceResponse,scope:this,disableCaching:true})},fetchInterfaceResponse:function(c,a,b){if(a){this.aw.interfaceObj=Ext.util.JSON.decode(b.responseText);if(this.isReady()){this.renderWindow()}}},onSubmit:function(){this.loadMask.show();this.clearValidation();var g=this.items.itemAt(1);if(g.xtype=="form"){var c={};var e=g.getForm();e.clearInvalid();e.items.each(function(i){if(i.xtype=="fieldlabel"){return true}if(!i.forceSubmit){if(!i.isDirty()){return true}}var f=i.getValue();if((i.xtype=="radio"||i.xtype=="checkbox")&&typeof i.getGroupValue=="function"){f=i.getGroupValue()}c[i.name]=f});if(this.aw.mergeData){Ext.apply(c,this.aw.data)}}else{var c=this.aw.data}this.aw._data=c;if(!Ext.isEmpty(this.aw.destinationDataURI)||!Ext.isEmpty(this.aw.postDataURI)){if(typeof this.getCenterPanel().beforeSubmit=="function"){var a=this.getCenterPanel().beforeSubmit(c,this);if(!a){this.loadMask.hide();return}c=a}var h=this.aw.destinationDataURI?"PUT":"POST";var d=this.aw.destinationDataURI?this.aw.destinationDataURI:this.aw.postDataURI;if(c.submitDataAsParams&&c.paramData!==undefined){d+=(d.indexOf("?")!=-1?"&":"?")+Ext.urlEncode(c.paramData);if(c.data!==undefined){c=c.data}else{c=undefined}}}Ext.Ajax.request({url:this.dataURIPrefix+d,method:h,headers:{"Content-Type":"application/json"},callback:this.sendDataResponse,jsonData:c,scope:this});var b=this.getRegisteredItems();if(b){this.sendRegisteredItems(b)}},sendRegisteredItems:function(b){for(var g=0;g<b.length;g++){var k=b[g];if(typeof k.getData=="function"){var h=k.getData();if(!h){this.removeRegisteredItem(k.id);if(!this.hasActiveTrans()){this.hide()}continue}if(h.destinationDataURI){Ext.Ajax.request({url:h.destinationDataURI,method:h.method||"PUT",registeredItemID:k.id,headers:{"Content-Type":"application/json"},callback:function(i,c,d){if(c){this.removeRegisteredItem(i.registeredItemID);if(!this.hasActiveTrans()){this.hide()}}},jsonData:h.data,scope:this})}else{if(h.data){var f=this.getRegisteredItemById(k.id);f.activeTrans=h.data.length;if(f.activeTrans==0){this.removeRegisteredItem(k.id);if(!this.hasActiveTrans()){this.hide()}}for(var e=0;e<f.activeTrans;e++){var a=h.data[e];Ext.Ajax.request({url:a.destinationDataURI,method:a.method||"PUT",registeredItemID:k.id,headers:{"Content-Type":"application/json"},callback:function(j,d,i){var c=this.getRegisteredItemById(j.registeredItemID);if(d){c.activeTrans--;if(c.activeTrans==0){this.removeRegisteredItem(j.registeredItemID);if(!this.hasActiveTrans()){this.hide()}}}},jsonData:a.data,scope:this})}}}}}},sendDataResponse:function(f,a,c){this.aw._responseStatus=c.status;if(a){try{var b=Ext.decode(c.responseText);this.aw._responseData=b}catch(d){}if(!this.hasActiveTrans()){this.hide()}}else{if(c.status==409){this.loadMask.hide();var f=c.responseText;try{f=Ext.decode(c.responseText)}catch(d){}this.showValidation(f)}else{if(c.status==403){this.loadMask.hide();this.applyValidationText("You have insufficient permissions to modify this resource.")}else{if(c.status==500){this.loadMask.hide()}}}}},showValidation:function(a){if(typeof a=="object"){var g=[];if(typeof a.fields!="undefined"){for(var e in a.fields){g[g.length]=e}}if(a.message){var c=a.message;if(g.length>0){c+=" ("+g.length+" fields mandatory,those fields highlighted in red color)"}this.applyValidationText(c)}var k=this.getCenterPanel();if(k.xtype=="form"&&g){var h=k.getForm();for(var e=0;e<g.length;e++){var b=g[e];if(typeof k.fieldMap!="undefined"&&k.fieldMap[b]){var b=k.fieldMap[b];if(typeof b==="object"){for(var d=0;d<b.length;d++){var l=h.findField(b[d]);if(l){l.markInvalid()}}continue}}var l=h.findField(b);if(l){l.markInvalid()}}}}else{this.applyValidationText(a)}this.syncShadow()},applyValidationText:function(text){with(this.getBottomPanel()){body.dom.innerHTML='<p style="color: red;">'+text+"</p>";show()}},clearValidation:function(){with(this.getBottomPanel()){body.dom.innerHTML="";hide()}this.syncShadow()},getButtonOK:function(){return this.buttons[0]},getButtonCancel:function(){return this.buttons[1]},submit:function(){if(!this.isReady()){return}this.affirmative=true;this.onSubmit()},sendDataURI:function(){this.onSubmit()}});Ext.reg("awesomehelpwindow",Ext.HelpAwesomeWindow);