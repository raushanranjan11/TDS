{xtype:"form",border:false,fileUpload:true,markDataDirtyOnLoad:true,items:[{xtype:"htmleditor",name:"notes",hideLabel:true,labelSeparator:"",anchor:"100%",enableLinks:true,enableLists:true,enableSourceEdit:false,enableFontSize:true,enableFont:false,enableColors:true,enableAlignments:true,height:290,width:400},{xtype:"textfield",name:"parentDatURI",forceSubmit:true,hidden:true}],listeners:{render:function(){var a=this.findParentByType("awesomewindow");var c=a.initialConfig.data.parentDataURI;var b=a.initialConfig.data.notes;this.items.itemAt(0).setValue(b);this.items.itemAt(1).setValue(c)}}}