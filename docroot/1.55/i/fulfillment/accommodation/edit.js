{xtype:"form",border:false,width:690,beforeSubmit:function(a){var b=this.items.itemAt(0).items.itemAt(1).items.itemAt(0).getData();a.passengersWithStatus=b;a.status=this.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).getValue();a.applyAll=this.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(3).getValue();return a},requireStores:[{dataURI:TDS.env.dataPath+"accommodation/inventorytypes/collection",identifier:"accommodation/inventorytypes",fields:["name","displayName","dataURI"]},{dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]}],items:[{xtype:"panel",activeTab:0,layoutOnTabChange:true,height:310,width:690,items:[{xtype:"panel",border:false,defaults:{border:false},style:"margin-top: 16px;",items:[{xtype:"panel",items:[{xtype:"label",style:"padding-left:300px;font-size:large;",listeners:{render:function(){var a=this.ownerCt.findParentByType("awesomewindow");this.setText(a.aw.data.componentName)}}}]},{xtype:"panel",hidden:true,layout:"table",style:"margin-bottom: 22px;margin-top: 22px;",border:false,hideBorders:false,layoutConfig:{columns:9},defaults:{border:false},items:[{html:"&nbsp;&nbsp;&nbsp;&nbsp;Status:",width:100},{xtype:"combo",store:[["NA","NA"],["QT","QT"],["OK","OK"],["RQ","RQ"],["WL","WL"],["XX","XX"]],editable:false,forceSelection:true,mode:"local",fieldLabel:"Status",width:150,triggerAction:"all",displayField:"text",valueField:"text"},{width:30},{xtype:"checkbox",name:"applyAll"},{html:"&nbsp;&nbsp;&nbsp;All Passengers"}]}]},{xtype:"panel",style:"padding-top:50px;",border:false,layout:"fit",height:213,width:687,items:[{xtype:"editorgrid",clicksToEdit:1,height:340,width:570,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","rateURI","paxAge","roomType","status","dataURI","name","basis","inDate","outDate","roomTypeDataURI","roomTypeName","rateBasisURI"]}),viewConfig:{forceFit:true},getData:function(){var b=this.getStore().data;var c=[];for(var a=0;a<b.length;a++){c[a]=b.items[a].data}return c},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Name",dataIndex:"displayName",width:120,editor:new Ext.form.TextField({allowBlank:false})},{header:"DOB",dataIndex:"dateOfBirth",width:80,fixed:true,renderer:function(a,d,c){if(typeof a!="undefined"){if(typeof a!="string"){var b=new Date();b.setTime(Ext.TimerMgr.getServerCalculatedTime());var e=Math.floor((b.getTime()-a.getTime())/(365.25*24*60*60*1000));c.set("paxAge",((e&&e>0)?e:""));return Ext.util.Format.date(a,TDS.env.dateBirthdayFormatDisplay)}else{if(c.get("paxAge")){var e=TDS.util.Format.age(a);c.set("paxAge",((e&&e>0)?e:""))}return TDS.util.Format.dateSpecial(a,TDS.env.dateBirthdayFormatDisplay)}}return TDS.util.Format.dateSpecial(a,TDS.env.dateBirthdayFormatDisplay)},editor:new Ext.form.DateField({allowBlank:false})},{header:"Age",dataIndex:"paxAge",width:40,fixed:true,editor:new Ext.form.TextField({allowBlank:false}),renderer:function(c,b,a){if(c){return c}else{return TDS.util.Format.age(a.get("dateOfBirth"))}}},{header:"Room Type",dataIndex:"roomTypeDataURI",width:80,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"displayName",valueField:"dataURI",lazyRender:false,store:TDS.data.getStore({storeId:"inventorytypes",dataURI:TDS.env.dataPath+"accommodation/inventorytypes/collection",identifier:"accommodation/inventorytypes",fields:["name","displayName","dataURI"]}),listeners:{select:function(c,a,b){}}}),renderer:function(l,i,g,k,m,n){var j=Ext.getCmp("roomTypeCombo");var h=j.findRecord(j.valueField,l);return h?h.get(j.displayField):j.valueNotFoundText;return l}},{header:"In Date",dataIndex:"inDate",width:70,fixed:true,editor:new Ext.form.DateField({allowBlank:false}),renderer:function(c,b,a){return TDS.util.Format.dateSpecial(c,TDS.env.dateFormatDisplay)}},{header:"Out Date",dataIndex:"outDate",width:70,fixed:true,editor:new Ext.form.DateField({allowBlank:false}),renderer:function(c,b,a){return TDS.util.Format.dateSpecial(c,TDS.env.dateFormatDisplay)}},{header:"Basis",dataIndex:"rateBasisURI",width:70,fixed:true,editor:new Ext.form.ComboBox({name:"rateBasisURI",forceSubmit:true,mode:"local",fieldLabel:"Basis",width:185,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"rate/basises/collection",identifier:"rate/basises",fields:["name","dataURI"]})}),renderer:function(l,i,g,k,m,n){var j=Ext.getCmp("basis");var h=j.findRecord(j.valueField,l);return h?h.get(j.displayField):j.valueNotFoundText}},{header:"Status",dataIndex:"status",width:60,fixed:true,editor:new Ext.form.ComboBox({store:[["NA","NA"],["QT","QT"],["OK","OK"],["RQ","RQ"],["WL","WL"],["XX","XX"]],editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})}],listeners:{render:function(){var grid=this;var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.aw.data.pnrDataURI+"/passengers";proxy.conn.url=TDS.env.dataPath+w.aw.data.pnrDataURI+"/passengers/collection/concise";load()}}}}]}]}]}