{xtype:"form",layout:"fit",border:false,bodyStyle:"padding: 8px;",autoScroll:true,getDataURI:function(){return"help"},getAgencyDataURI:function(){},getSessionURI:function(){return this.ownerCt.sessionURI},getSessionValue:function(a){return this.ownerCt.sessionObj[a]},items:{xtype:"awesomegrid",autoSubmit:false,searchURI:"",enableRowExpander:false,iconCls:"icon-grid",tbar:["->",{xtype:"button",text:"Preview",handler:function(){var d=this.ownerCt.ownerCt;var b=d.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");if(!a){return}TDS.helpwindow.setWindow({sourceDataURI:a,buttonOK:false,modal:false,title:"Help Preview",interfaceURI:"help/preview.js"})}},{xtype:"button",text:"Create",handler:function(){var c=this.ownerCt.ownerCt;var b=c.ownerCt;var a=b.getDataURI();if(!a){return}TDS.window.setWindow({title:"Create Help",information:"Please enter details Help.",interfaceURI:"help/create.js",postDataURI:a,params:{},callback:{fn:function(d){if(d){c.submitQuery(true)}},scope:c}})}}," ",{xtype:"button",text:"Copy",handler:function(){var d=this.ownerCt.ownerCt;var b=d.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Copy Help",information:"This interface will create a new Help with the following details, you may edit these details before you submit.",interfaceURI:"help/create.js",sourceDataURI:a,postDataURI:b.getDataURI(),params:{},data:{email:""},buttonOK:"Submit",callback:{fn:function(e){if(e){d.submitQuery(true)}},scope:d}})}}," ",{xtype:"button",text:"Edit",handler:function(){var d=this.ownerCt.ownerCt;var b=d.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Edit Help",interfaceURI:"help/edit.js",sourceDataURI:a,destinationDataURI:a,params:{},buttonOK:"Submit",callback:{fn:function(e){if(e){this.submitQuery(true)}},scope:d}})}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pageSection","description"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Page/Section",dataIndex:"pageSection",fixed:true,width:150},{header:"Description",dataIndex:"description",renderer:function(b,c,a){return a.get("description").replace(/<br>/g,"")}}]),viewConfig:{forceFit:true},listeners:{beforerender:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){}},sessioninit:function(){var a=this.ownerCt.getDataURI();if(typeof a=="undefined"){return}this.searchURI=TDS.env.dataPath+a;this.autoSubmit=true},rowdblclick:function(d,h,f){var b=this.ownerCt;var c=d.getStore().getAt(h);if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Edit Help",interfaceURI:"help/edit.js",sourceDataURI:a,destinationDataURI:a,params:{},buttonOK:"Submit",callback:{fn:function(e){if(e){this.submitQuery(true)}},scope:d}})}}}}