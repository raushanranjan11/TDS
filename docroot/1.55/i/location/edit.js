{xtype:"form",border:false,beforeSubmit:function(b){;var a=this.ownerCt;try{var c=this.getForm().findField("countryURI");if(c.getValue()==""){c.markInvalid("Please select a country.");return false}var f=c.getValue();b.cc=f.substring(f.lastIndexOf("/")+1);return b}catch(d){alert("Error encountered");return false}},beforeDataLoad:function(a,b){a.countryURI="country/"+a.cc;return a},items:[{xtype:"tabpanel",activeTab:0,layoutOnTabChange:true,height:380,defaults:{bodyStyle:"padding: 6px 4px 6px 4px;"},items:[{title:"Location",items:[{xtype:"panel",layout:"form",border:false,labelWidth:80,defaults:{},items:[{xtype:"textfield",name:"name",fieldLabel:"Name",bodyStyle:"padding: 2px 4px 2px 4px;",width:185},{xtype:"awesomecombo",name:"countryURI",fieldLabel:"Country",listeners:{select:function(b){var a=this.ownerCt.items.itemAt(2);a.setValue("")}},emptyText:"Type a country...",excludeSubmit:true,minChars:1,enableKeyEvents:true,mode:"local",width:120,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","dataURI"]})},{xtype:"awesomecombo",name:"provinceURI",fieldLabel:"Province",listeners:{beforesearch:function(c){var b=this.ownerCt;var a=b.items.itemAt(1);if(a.getValue()==""){a.markInvalid("Please select a country.");return false}c.searchURI=TDS.env.dataPath+a.getValue()+"/provinces/collection";c.searchIdentifier=a.getValue()+"/provinces"}}},{xtype:"textfield",name:"latitude",fieldLabel:"Latitude",bodyStyle:"padding: 2px 4px 2px 4px;",width:80},{xtype:"textfield",name:"longitude",fieldLabel:"Longitude",bodyStyle:"padding: 2px 4px 2px 4px;",width:80},{xtype:"checkbox",name:"active",fieldLabel:"Active",border:true,width:180},{xtype:"checkbox",name:"bold",fieldLabel:"Bold",border:true,width:180}]}]}]}]}