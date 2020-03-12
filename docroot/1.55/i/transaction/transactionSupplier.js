{xtype:"panel",layout:"fit",border:false,bodyStyle:"padding: 8px;",autoScroll:true,getDataURI:function(){if(this.ownerCt.ownerCt.title=="Announcements "){return null}else{return this.ownerCt.ownerCt.getDataURI()}},items:{xtype:"awesomegrid",searchURI:"",enableRowExpander:false,tbar:[{xtype:"tbspecialtext",text:"Month/Year: "},{xtype:"datefield",name:"monthYear",format:"My",enableKeyEvents:true,width:80},"  ",{xtype:"tbspecialtext",text:"Country: "},{xtype:"combo",name:"countryURI",fieldLabel:"Country",emptyText:"Type a country...",minChars:1,enableKeyEvents:true,mode:"local",width:220,typeAhead:true,triggerAction:"all",forceSelection:true,selectOnFocus:true,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"countries/collection",identifier:"countries",fields:["name","dataURI"]}),appendData:[{name:"All",dataURI:""}]},"  ",{xtype:"tbspecialtext",text:"Supplier: "},{xtype:"combo",name:"supplierURI",mode:"local",width:200,triggerAction:"all",editable:false,displayField:"name",valueField:"dataURI",store:TDS.data.getStore({dataURI:TDS.env.dataPath+"suppliers/collection/conciseLoadData",identifier:"suppliers",fields:["name","dataURI"]}),appendData:[{name:"All",dataURI:""}]},"->",{xtype:"button",text:"Summary",handler:function(){var a=this.ownerCt.items.itemAt(7);TDS.window.setWindow({title:"Summary per Supplier",interfaceURI:"transaction/summary.js",data:{supplierName:a.getRawValue()},buttonOK:false})}}],store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","leadPaxName","pnrPaxCount","agencyName","supplierName","supplierID","amountUsd","createdDate","pnrCode","supplierCountryName","method"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Confirm Date",dataIndex:"createdDate",width:50,sortable:true,renderer:TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)},{header:"Supplier",dataIndex:"supplierName",width:50,sortable:true},{header:"ID",dataIndex:"supplierID",sortable:true,width:50},{header:"Country",dataIndex:"supplierCountryName",sortable:true,width:50},{header:"PNR No",dataIndex:"pnrCode",width:50,sortable:true},{header:"Agent",dataIndex:"agencyName",width:50,sortable:true},{header:"Lead Name",dataIndex:"leadPaxName",width:50,sortable:true},{header:"No Of Pax",dataIndex:"pnrPaxCount",width:50,sortable:true},{header:"Payment Method",dataIndex:"method",width:50,sortable:true},{header:"Trans Fee",dataIndex:"amountUsd",width:50,sortable:true,renderer:function(c,b,a){return TDS.util.Price.formatPrice(c,"USD")}}]),viewConfig:{forceFit:true},listeners:{sessioninit:function(){;var b=this.ownerCt.findParentByType("panel");var a=b.initialConfig.dataURI;this.searchURI=TDS.env.dataPath+"supplier/transactions"},rowdblclick:function(a,c,b){}}}}