{xtype:"panel",height:350,width:800,items:[{xtype:"form",border:false,style:"margin-bottom: 6px;",html:"<p>Please select the passengers for this booking below.</p>",listeners:{beforerender:function(){}}},{xtype:"panel",border:false,layout:"fit",items:[{xtype:"editorgrid",height:325,width:300,alwaysUseCollection:true,singleSelect:true,store:new Ext.data.CollectionStore({url:"",identifier:"",fields:["type","code","nameFirst","nameLast","salutation","displayName","dateOfBirth","paxAge","gender"]}),viewConfig:{forceFit:true},getData:function(){var a=this.selModel.getSelections();var b=[];for(var c=0;c<a.length;c++){b[c]=a[c].get("dataURI")}return b},preselect:function(b,a){var c=[];this.getStore().each(function(d){if(c.length>=a){return false}if((!b||d.get("type")==b)&&d.get("nameFirst")&&d.get("nameLast")){c[c.length]=d}},this);if(c.length>0){this.getSelectionModel().selectRecords(c)}return c.length},validatePassenger:function(d,a,c,b){if(!b.get("nameFirst")&&!b.get("nameLast")){return false}},sm:new Ext.grid.CheckboxSelectionModel(),columns:[new Ext.grid.CheckboxSelectionModel(),{header:"Type",dataIndex:"type",width:40,fixed:true,editor:new Ext.form.ComboBox({editable:false,forceSelection:true,mode:"local",displayField:"text",valueField:"text",triggerAction:"all",tpl:'<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',store:TDS.data.passengerType})},{header:"Last name",dataIndex:"nameLast",editor:new Ext.form.TextField({})},{header:"First name",dataIndex:"nameFirst",editor:new Ext.form.TextField({})},{header:"Title",dataIndex:"salutation",editor:new Ext.form.ComboBox({store:TDS.data.salutations,editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text"})},{header:"Gender",dataIndex:"gender",editor:new Ext.form.ComboBox({forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text",store:TDS.data.gender})},{header:"Code",dataIndex:"code",editor:new Ext.form.TextField({allowBlank:false})},{header:"DOB",dataIndex:"dateOfBirth",editor:new Ext.form.DateField({allowBlank:false}),renderer:function(a,d,c){if(typeof a!="undefined"){if(typeof a!="string"){var b=new Date();b.setTime(Ext.TimerMgr.getServerCalculatedTime());var e=Math.floor((b.getTime()-a.getTime())/(365.25*24*60*60*1000));c.set("paxAge",((e&&e>0)?e:""));return Ext.util.Format.date(a,TDS.env.dateBirthdayFormatDisplay)}else{if(c.get("paxAge")){var e=TDS.util.Format.age(a);c.set("paxAge",((e&&e>0)?e:""))}return TDS.util.Format.dateSpecial(a,TDS.env.dateBirthdayFormatDisplay)}}return TDS.util.Format.dateSpecial(a,TDS.env.dateBirthdayFormatDisplay)}},{header:"Age",dataIndex:"paxAge",renderer:function(b,a,c){if(b){return b}else{return TDS.util.Format.age(c.get("dateOfBirth"))}},editor:new Ext.form.TextField({allowBlank:false})}],bbar:[{xtype:"button",text:"Add",handler:function(){var b=this.ownerCt.items.itemAt(1);var a=this.ownerCt.items.itemAt(2);a.enable();b.enable();this.disable();var d=this.ownerCt.ownerCt;var c=d.getStore();c.add([new c.recordType({type:"AD",nameFirst:"",nameLast:""})]);d.newRecordIndex=c.getCount()-1;d.startEditing(d.newRecordIndex,2);d.getSelectionModel().selectRow(d.newRecordIndex)}},{xtype:"button",text:"Cancel",disabled:true,handler:function(){var c=this.ownerCt.items.itemAt(0);var b=this.ownerCt.items.itemAt(2);c.enable();b.disable();var d=this.ownerCt.ownerCt;var a=d.getStore().getAt(d.newRecordIndex);if(a==-1||typeof a.get("dataURI")!="undefined"){return}d.getStore().remove(a);this.disable()}},{xtype:"button",text:"Save",disabled:true,handler:function(){var d=this.ownerCt.findParentByType("awesomewindow");var b=this.ownerCt.ownerCt;var k=this.ownerCt.items.itemAt(0);var e=this.ownerCt.items.itemAt(1);e.disable();this.disable();var c=b.getStore().getAt(b.newRecordIndex);var m=b.getSelectionModel().getSelections();var a="",l="";if(m.length==1){if(typeof m[0].get("dataURI")!="undefined"){a="PUT",l=TDS.env.dataPath+m[0].get("dataURI")}else{a="POST",l=TDS.env.dataPath+d.getData("pnr")+"/passengers"}}Ext.Ajax.request({url:l,jsonData:m[0].data,method:a,callback:function(f,g,h){if(g){b.getStore().load();k.enable()}else{e.enable();this.enable()}},scope:this})}}],listeners:{beforeedit:function(a){},render:function(){var w=this.ownerCt.findParentByType("awesomewindow");with(this.store){reader.meta.identifier=w.getData("pnr")+"/passengers";proxy.conn.url=TDS.env.dataPath+w.getData("pnr")+"/passengers/concise";load()}},rowdblclick:function(b,a,c){},afteredit:function(a){if(this.getSelectionModel().getSelections()[0].dirty){this.getBottomToolbar().items.itemAt(2).enable()}}}}]}]}