{xtype:"form",border:false,items:[{xtype:"tabpanel",activeTab:0,deferredRender:false,layoutOnTabChange:true,height:380,defaults:{},items:[{title:"About US",layout:"fit",bodyStyle:"padding: 0px 0px 0px 0px;",items:[{xtype:"panel",tbar:[{xtype:"label",value:" Maximun of 600 character allowed, Remaining character 600",height:25}," "],items:[{xtype:"textarea",name:"aboutUs",height:340,width:410,enableKeyEvents:true,listeners:{keyup:function(){;if(this.getValue().length<600){this.ownerCt.topToolbar.items.itemAt(0).setText(" Maximun of 600 character allowed, Remaining character "+(600-this.getValue().length))}else{this.ownerCt.topToolbar.items.itemAt(0).setText(" Maximun of 600 character allowed, Remaining character "+(0));var b=this.getValue();b=b.substring(0,600);this.setValue(b)}},render:function(){var a=this.ownerCt.findParentByType("awesomewindow");var b=a.aw.data.aboutUs;if(typeof b!="undefined"&&b!=null){this.ownerCt.topToolbar.items.itemAt(0).setText(" Maximun of 600 character allowed, Remaining character "+(600-b.length))}else{this.ownerCt.topToolbar.items.itemAt(0).setText(" Maximun of 600 character allowed, Remaining character 600")}}}}]}]}]}]}