{xtype:"form",style:"padding: 8px;",bodyStyle:"padding: 8px;",tbar:[{text:"Set session",handler:function(){var d=this.buttonContainer.ownerCt.getForm().findField("path").getValue();var a=this.buttonContainer.ownerCt.getForm().findField("sessionKey").getValue();var c=this.buttonContainer.ownerCt.getForm().findField("value").getValue();var b={};b[a]=c;TDS.session.set(d,b)}},{text:"Get session",handler:function(){var a=this.buttonContainer.ownerCt.getForm().findField("path").getValue();TDS.session.get(a)}},{text:"Remove session",handler:function(){var a=this.buttonContainer.ownerCt.getForm().findField("path").getValue();TDS.session.removeByPath(a)}}],items:[{xtype:"textfield",fieldLabel:"path",name:"path",value:"pnr/"},{xtype:"textfield",fieldLabel:"session_key",name:"sessionKey"},{xtype:"textfield",fieldLabel:"value",name:"value"},{xtype:"editorgrid",layout:"fit",width:700,height:300,store:TDS.session,viewConfig:{forceFit:true},columns:[{header:"path",dataIndex:"path"},{header:"session_key",dataIndex:"session_key"},{header:"value",dataIndex:"value",editor:new Ext.form.TextField({allowBlank:false})}]}]}