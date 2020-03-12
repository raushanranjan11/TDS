{xtype:"form",layout:"fit",border:false,bodyStyle:"padding: 8px;",autoScroll:true,getDataURI:function(){return this.getAgencyDataURI()?this.getAgencyDataURI()+"/customers":undefined},getAgencyDataURI:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){var a=this.items.itemAt(0).getTopToolbar();var b=a.items.itemAt(1);if(b.getValue()){return b.getValue()}}else{if(TDS.env.user.isAgencyUser()){return TDS.env.user.getAgencyURI()}}},getSessionURI:function(){return this.ownerCt.sessionURI},getSessionValue:function(a){return this.ownerCt.sessionObj[a]},items:{xtype:"awesomegrid",autoSubmit:true,searchURI:"",pinnable:true,callBeforeSearch:false,enableRowExpander:false,iconCls:"icon-grid",tbar:[{xtype:"tbspecialtext",text:"Agency: ",hidden:true},{xtype:"combo",hidden:true,name:"agencyURI",mode:"local",width:160,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:new Ext.data.Store(),toggleButtons:function(){var d=this.ownerCt.ownerCt;var a=d.ownerCt;var b=this.ownerCt.items.itemAt(9);var c=this.ownerCt.items.itemAt(11);if(!this.getValue()){b.disable();c.disable()}else{b.enable();c.enable()}d.searchURI=TDS.env.dataPath+a.getDataURI()},listeners:{select:function(){this.toggleButtons()}}},{xtype:"tbspecialspacer",hidden:true},"Name: ",{xtype:"textfield",name:"nameLike",enableKeyEvents:true,width:120}," ","Email: ",{xtype:"textfield",name:"emailLike",enableKeyEvents:true,width:120},"->",{xtype:"redbutton",text:"Create",handler:function(){var c=this.ownerCt.ownerCt;var b=c.ownerCt;var a=b.getDataURI();if(!a){return}TDS.window.setWindow({title:"Customer",information:"Please enter details of a new customer.",interfaceURI:"agency/customer/create.js",postDataURI:a,params:{agencyURI:b.getAgencyDataURI()},callback:{fn:function(d){if(d){c.submitQuery(true)}},scope:c}})}}," ",{xtype:"button",text:"Copy",handler:function(){var d=this.ownerCt.ownerCt;var b=d.ownerCt;var c=d.selModel.getSelected();if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Copy customer",information:"This interface will create a new customer with the following details, you may edit these details before you submit.",interfaceURI:"agency/customer/create.js",sourceDataURI:a,postDataURI:b.getDataURI(),params:{agencyURI:b.getAgencyDataURI()},data:{email:""},buttonOK:"Submit",callback:{fn:function(e){if(e){d.submitQuery(true)}},scope:d}})}}," ",{xtype:"button",text:"Archive",handler:function(){var c=this.ownerCt.ownerCt;var b=c.selModel.getSelected();if(!b){return}var a=b.get("dataURI");TDS.window.setWindow({title:"Archive customer",message:"Are you sure you want to archive this customer?",destinationDataURI:a,data:{archived:true},callback:{fn:function(d){if(d){c.submitQuery(true)}},scope:c}})}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","fullNameString","commissionableUserFullNameString","customerCode","dateOfBirth","addressString","phoneNumber1","emailAddress","createdDate","updatedDate","salutation"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Customer code",dataIndex:"customerCode",width:64},{header:"Consultant",dataIndex:"commissionableUserFullNameString"},{header:"Name",dataIndex:"fullNameString",renderer:function(c,b,a){return"<b>"+a.get("salutation")+"</b>"+a.get("fullNameString")}},{header:"DOB",dataIndex:"dateOfBirth",width:60,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay)},{header:"Age",dataIndex:"dateOfBirth",width:30,renderer:TDS.util.Format.age},{header:"Telephone",dataIndex:"phoneNumber1",width:60},{header:"Email",dataIndex:"emailAddress"},{header:"Registered",dataIndex:"createdDate",sortable:true,width:80,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)},{header:"Last modified",dataIndex:"updatedDate",sortable:true,width:80,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)}]),viewConfig:{forceFit:true},listeners:{beforerender:function(){if(TDS.env.user.hasGroupPermission("ADMINISTRATION")){var a=this.getTopToolbar();a[0].hidden=false;a[1].hidden=false;a[1].store=TDS.data.getStore({dataURI:TDS.env.dataPath+"agencies/collection",identifier:"agencies",fields:["name","dataURI"]});a[2].hidden=false}},render:function(){var a=this.ownerCt.getDataURI();if(typeof a=="undefined"){return}this.searchURI=TDS.env.dataPath+a;this.autoSubmit=true;this.submitQuery(true)},rowdblclick:function(d,h,f){var b=this.ownerCt;var c=d.getStore().getAt(h);if(!c){return}var a=c.get("dataURI");TDS.window.setWindow({title:"Edit customer",interfaceURI:"agency/customer/edit.js",sourceDataURI:a,destinationDataURI:a,params:{agencyURI:b.getAgencyDataURI()},buttonOK:"Submit",callback:{fn:function(e){if(e){this.submitQuery(true)}},scope:d}})}}}}