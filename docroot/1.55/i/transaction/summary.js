{xtype:"panel",border:false,width:400,trackResetOnLoad:true,beforeSubmit:function(a){},items:{xtype:"tabpanel",border:false,activeTab:0,height:300,items:[{title:"Fee Summary",bodyStyle:"padding: 8px;",layout:"fit",items:[{html:'<b><font size="3" ><center><br>Supplier: sdfgsdfgfdgdfg</font></b><br><br><br><table><tr><td><b>Total Fee To Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><b>US$ 0000.00</b></td></tr><tr><td> </td><td>&nbsp;</td></tr><tr><td><b>Amount Paid:</b></td><td><b>US$ 0000.00</b></td></tr><tr><td></td><td>------------------</td></tr><tr><td><b>Balance:</b></td><td><b>US$ 0000.00</b></td></tr></table></center>'}],listeners:{beforerender:function(){var a=this.ownerCt.findParentByType("awesomewindow");var b=a.getData("supplierName");this.items.itemAt(0).html='<b><font size="3" ><center><br>Supplier: '+b+"</font></b><br><br><br><table><tr><td><b>Total Fee To Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><b>US$ 0000.00</b></td></tr><tr><td> </td><td>&nbsp;</td></tr><tr><td><b>Amount Paid:</b></td><td><b>US$ 0000.00</b></td></tr><tr><td></td><td>------------------</td></tr><tr><td><b>Balance:</b></td><td><b>US$ 0000.00</b></td></tr></table></center>"}}},{title:"payment History",bodyStyle:"padding: 8px;",layout:"fit",items:{xtype:"grid",pinnable:true,enableRowExpander:false,iconCls:"icon-grid",summaryCurrency:"USD",store:new Ext.data.JsonStore({url:"",id:"dataURI",fields:["dataURI","pinned","agencyURI","departuresDate","primaryPassnger","code","passengersTotal","mpercentage","marginTotal","percentageCommision","owingAmount","currency","grossTotal","updatedByUserFullName"]}),sm:new Ext.grid.RowSelectionModel(),cm:new Ext.grid.ColumnModel([{header:"Date",dataIndex:"departuresDate",sortable:true,width:60,fixed:true,renderer:function(c,b,a){var e=TDS.util.Format.dateSpecial(c,TDS.env.dateFormatDisplay);return e}},{header:"Method",dataIndex:"code"},{header:"Amount",dataIndex:"grossTotal",summaryType:"sum",renderer:TDS.util.Price.amountRenderer}]),plugins:new Ext.ux.grid.GridSummary({processSummaryData:function(f){;var e=f;var c=this;if(typeof this.grid!="undefined"&&this.grid.summaryCurrency){f.data.currency=this.grid.summaryCurrency;return f}return{data:{}}}}),viewConfig:{forceFit:true},listeners:{}}}]}}