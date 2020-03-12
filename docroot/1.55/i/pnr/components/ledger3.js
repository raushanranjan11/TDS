{
	xtype : "panel",
	layout : Ext.isIE ? "fit" : "",
	autoScroll : true,
	border : true,
	bodyStyle : "padding: 8px;",
	updateLedgerscreen : function (d, c, g, b, a, h) {
		var e = this.findParentByType("ajaxpanel");
		var i = e.baseDataURI;
		var f = {
			grossTotal : a,
			recievedTotal : b,
			owingAmount : d,
			paidTotal : g,
			marginTotal : c,
			percentageCommision : h
		};
		Ext.Ajax.request({
			url : TDS.env.dataPath + i + "/updateLedger",
			method : "POST",
			jsonData : f,
			scope : this
		})
	},
	// items : [{
	// 		xtype : "panel",
			items : [{
					xtype : "panel",
					height : 300,
					autoScroll : true,
					width : 1325,
					border : true,
					layout : "absolute",
					items : [{
							border : false,
							cellpadding : false,
							cellspacing : false,
							xtype : "awesomegrid",
							cls : "custom-dirty",
							searchURI : "",
							width : 1300,//1100,
							pinnable : false,
							enableRowExpander : false,
							iconCls : "icon-grid",
							firstLoad : 0,
							height : 200,
							tbar : [
							'<font color="#3333ff"><b>Trip Cost</font>', "&nbsp;", "->", {
									xtype : "redbutton",
									text : "To Pay",
									disabled : true,
									handler : function () { ;
										var a = this.ownerCt.ownerCt;
										var f = this.ownerCt.findParentByType("ajaxpanel");
										var l = a.selModel.getSelected();
										var e = l.get("dataURI");
										var n = a.getStore();
										var d = l.store.data.length;
										l.data.componentArray = [];
										l.data.payAmount = parseFloat(document.getElementById("pay" + e).value);
										l.data.amount = parseFloat(document.getElementById("pay" + e).value);
										l.data.type = "";
										l.data.amount = 0;
										var g = 0;
										var m = true;
										var k = "";
										for (var h = 0; h < d; h++) {
											var b = n.getAt(h);
											var o = b.get("dataURI");
											if (document.getElementById("ch" + o).checked) {
												if (k == "") {
													k = b.get("supplierName")
												} else {
													if (k != b.get("supplierName")) {
														m = false;
														break
													}
												}
												k = b.get("supplierName");
												l.data.grossAmount = l.data.grossAmount + b.data.grossAmount;
												l.data.nettAmount = l.data.nettAmount + b.data.nettAmount;
												l.data.componentArray[g] = {
													rowNo : (h + 1),
													supplierURI : b.get("supplierURI"),
													dataURI : o,
													amountPayed : parseFloat(document.getElementById("pay" + o).value)
												};
												l.data.amount = l.data.amount + parseFloat(document.getElementById("pay" + o).value);
												g++
											}
										}
										if (!m) {
											Ext.Msg.alert("Alert", "Select single supplier to Proceed payment.");
											return
										}
										l.data.amount = l.data.amount.toFixed(2);
										l.data.payAmountTemp = l.data.payAmount.toFixed(2);
										var c = this.ownerCt.findParentByType("pnrpanel");
										TDS.window.setWindow({
											title : "Create transaction",
											information : "Please enter details of the transaction.",
											buttonOK : "Pay",
											data : l.data,
											postDataURI : f.baseDataURI + "/transactions",
											interfaceURI : "pnr/ledger/singlePayment.js",
											dataURI : {
												agency : c.getPNRAgencyURI()
											},
											callback : {
												fn : function (i) {
													if (i) {
														a.submitQuery(true);
														this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0).items.itemAt(0).submitQuery(true)
													}
												},
												scope : this.ownerCt.ownerCt
											}
										})
									}
								}
							],
							// width:1100,
							cm : new Ext.grid.ColumnModel([{
										header : "",
										fixed : true,
										width : 25,
										editable : false,
										renderer : function (f, c, b, e, g, d) {
											var a = b.get("dataURI");
											return ' <input type="checkbox" value="true" id="ch' + a + '"/> '
										}
									}, {
										header : "",
										fixed : true,
										width : 20,
										editable : false,
										renderer : function (e, b, a, d, f, c) {
											return d + 1
										}
									}, {
										header : "Supplier",
										width : 110,
										flex : 2,
										fixed : true,
										dataIndex : "supplierName",
										sortable : true,
										renderer : function (e, d, a, f, c, b) {
											d.attr = 'ext:qtip="' + a.get("supplierContactDet") + '"';
											return e
										}
									}, {
										header : "Component",
										width : 150,
										flex : 1,
										fixed : true,
										sortable : true,
										dataIndex : "type",
										renderer : function (c, b, a) {
											if (c === TDS.data.componentType.TYPE_OWN) {
												return "OA"
											} else {
												if (c === TDS.data.componentType.TYPE_MANUAL) {
													return "Manual entry"
												} else {
													if (c === TDS.data.componentType.TYPE_SIGHTSEEING) {
														return "Day Tours"
													} else {
														if (c === TDS.data.componentType.TYPE_ATTRACTION && a.get("status")) {
															return "Services"
														}
													}
												}
											}
											return c.substring(0, 1).toUpperCase() + c.substring(1).toLowerCase()
										}
									}, {
										header : "Description",
										width : 210,
										fixed : true,
										sortable : true,
										dataIndex : "name"
									}, {
										header : "Nights",
										width : 80,
										fixed : true,
										sortable : true,
										dataIndex : "nights"
									}, {
										header : "Status",
										width : 90,
										fixed : true,
										sortable : true,
										dataIndex : "status"
									}, {
										header : "Gross",
										width : 100,
										fixed : true,
										sortable : true,
										dataIndex : "grossAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "%",
										width : 55,
										fixed : true,
										sortable : true,
										dataIndex : "commissionPercentage",
										renderer : function (b, c, a) {
											if (b) {
												return parseFloat(b).toFixed(2)
											} else {
												return b
											}
										}
									}, {
										header : "Comm/Markup",
										width : 100,
										fixed : true,
										sortable : true,
										dataIndex : "commissionAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRendererLedger
									}, {
										header : "Net",
										width : 80,
										fixed : true,
										sortable : true,
										dataIndex : "nettAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "To Pay",
										dataIndex : "",
										width : 94,
										fixed : true,
										renderer : function (h, a, f, b, d, i) {
											var c = f.get("dataURI");
											var e = f.get("nettAmount");
											var g = f.get("currency");
											var j = f.get("transactionBalance");
											if (j <= 0) {
												e = 0;
												return TDS.util.Price.formatCurrency(g) + '<input type="text"  size="7" id="pay' + c + '"  value=' + parseFloat(e).toFixed(2) + " readOnly><table><tr><td></td></tr></table>"
											} else {
												if (j > 0) {
													e = j;
													return TDS.util.Price.formatCurrency(g) + '<input type="text"  size="7" id="pay' + c + '"  value=' + parseFloat(e).toFixed(2) + "><table><tr><td></td></tr></table>"
												}
											}
										}
									}, {
										header : "Balance",
										width : 80,
										fixed : true,
										sortable : true,
										dataIndex : "transactionBalance",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "Credit Card",
										width : 80,
										fixed : true,
										sortable : true,
										dataIndex : "creditCardPaymentAllowed",
										renderer : function (b, c, a) {
											if (b) {
												return "Accepted"
											} else {
												return ""
											}
										}
									}, {
										header : "priceIsNetFlag1",
										fixed : true,
										hidden : true,
										sortable : true,
										dataIndex : "priceIsNetFlag"
									}, {
										header : "priceIsCancelFlag",
										fixed : true,
										hidden : true,
										sortable : true,
										dataIndex : "priceIsCancelFlag"
									}
								]),
							store : new Ext.data.JsonStore({
								id : "dataURI",
								fields : ["dataURI", "supplierURI", "nights", "creditCardPaymentAllowed", "amount", "name", "type", "offeringURI", "currency", "grossAmount", 
									"nettAmount", "commissionAmount", "commissionPercentage", "passengersTotal", "gst", "status", "description", "supplierName", "priceIsNetFlag", 
									"supplierContactDet", "paymentGatewayAllowed", "transactionBalance"]
							}),
							summaryCurrency : undefined,
							processCollectionData : function (m) { ;
								var b = this.ownerCt.findParentByType("pnrpanel");
								this.pnrCurrency = b.getPNRCurrency();
								var p = 0;
								var f = 0;
								var k = m[this.getCollectionIdentifier()]; ;
								if (typeof k != "undefined") {
									for (var g = 0; g < k.length; g++) {
										var j = m[k[g]].currency;
										var h = m[k[g]].grossAmount;
										var d = m[k[g]].commissionAmount;
										if (d == "" || isNaN(d)) {
											d = 0
										}
										if (typeof this.summaryCurrency == "undefined") {
											this.summaryCurrency = j
										}
										if (this.summaryCurrency != j) {
											this.summaryCurrency = false
										}
										p += h;
										f += d
									}
								}
							/*	console.log(this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0).items);
								var l = this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0).items.itemAt(1).items.itemAt(0).items;
								l.itemAt(12).setValue(p);
								l.itemAt(1).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + p.toFixed(2));
								var a = l.itemAt(12).getValue();
								var c = l.itemAt(13).getValue();
								var o = l.itemAt(14).getValue();
								var e = a - c;
								if (e == "NaN" || e == NaN || isNaN(e)) {
									e = 0
								}
								l.itemAt(5).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + (e.toFixed(2)));
								var f = c - o;
								l.itemAt(9).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + (f).toFixed(2));
								l.itemAt(15).setValue(f);
								var n = (f / a) * 100;
								if (n != 0 && n != "NaN" && !isNaN(n)) {
									l.itemAt(11).setValue(n.toFixed(2) + " %")
								} else {
									l.itemAt(11).setValue(0 + " %")
								}*/
								//this.ownerCt.ownerCt.ownerCt.updateLedgerscreen(e, f, o, c, a, n);
								return m
							},
							sm : new Ext.grid.CheckboxSelectionModel(),
							plugins : new Ext.ux.grid.GridSummary({
								processSummaryData : function (a) {
									if (this.grid.summaryCurrency) {
										a.data.currency = this.grid.summaryCurrency;
										return a
									}
									return {
										data : {}

									}
								}
							}),
							viewConfig : {
								getRowClass : function (a, b) {
									if (a.get("priceIsNetFlag") && a.get("status") == "Confirmed") {
										return "price-is-green-net"
									} else {
										if (a.get("priceIsNetFlag") == false && a.get("status") == "Confirmed") {
											return "price-is-blue-net"
										}
									}
								}
							},
							getRowInterface : function () {
								return "pnr/components/financial/layout.js"
							},
							listeners : {
								rowclick : function () { ;
									var a = this;
									var e = this.topToolbar.items.itemAt(3);
									var c = a.store.data.length;
									var g = a.getStore();
									var d = false;
									for (var f = 0; f < c; f++) {
										var b = a.store.data.items[f];
										var h = b.data.dataURI;
										var j = document.getElementById("ch" + h).checked;
										if (j) {
											d = true
										}
									}
									if (d) {
										e.enable(true)
									} else {
										e.disable(true)
									}
								},
								cellclick : function (b, o, w, v) {
									var p = this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0).items.itemAt(0);
									var g = b.getStore().getAt(o);
									var l = g.get("dataURI");
									var n = g.get("supplierName");
									var x = document.getElementById("ch" + l).value;
									var k = p.getStore();
									if (false) {
										var q = this.ownerCt.findParentByType("ajaxpanel");
										var y = g.get("creditCardPaymentAllowed");
										if (y) {
											var k = this.getStore();
											var d = g.store.data.length;
											g.data.componentArray = [];
											g.data.componentArray[0] = {
												dataURI : l,
												amountPayed : parseFloat(document.getElementById("pay" + l).value)
											};
											g.data.payAmount = parseFloat(document.getElementById("pay" + l).value);
											var t = 1;
											for (var u = 0; u < d; u++) {
												var h = k.getAt(u);
												var f = h.get("dataURI");
												if (document.getElementById("ch" + f).checked && f != l) {
													g.data.grossAmount = g.data.grossAmount + h.data.grossAmount;
													g.data.nettAmount = g.data.nettAmount + h.data.nettAmount;
													g.data.componentArray[t] = {
														dataURI : f,
														amountPayed : parseFloat(document.getElementById("pay" + f).value)
													};
													g.data.payAmount = g.data.payAmount + parseFloat(document.getElementById("pay" + f).value);
													t++
												}
											}
											g.data.payAmountTemp = g.data.payAmount.toFixed(2);
											var s = this.ownerCt.findParentByType("pnrpanel");
											TDS.window.setWindow({
												title : "Payment Gateway",
												buttonOK : "Pay",
												data : g.data,
												sourceDataURI : g.data.supplierURI,
												postDataURI : q.baseDataURI + "/transactions",
												interfaceURI : "pnr/ledger/creditCardPayment.js",
												dataURI : {
													agency : s.getPNRAgencyURI()
												},
												callback : {
													fn : function (a) {
														if (a) {
															b.submitQuery(true);
															p.submitQuery(true)
														}
													},
													scope : this.ownerCt.ownerCt
												}
											})
										}
									} else {
										if (false && w == 11 && document.getElementById("ch" + l).checked) { ;
											var q = this.ownerCt.findParentByType("ajaxpanel");
											var k = this.getStore();
											var d = g.store.data.length;
											g.data.componentArray = [];
											g.data.payAmount = parseFloat(document.getElementById("pay" + l).value);
											g.data.amount = parseFloat(document.getElementById("pay" + l).value);
											g.data.type = "";
											g.data.amount = 0;
											var t = 0;
											var r = true;
											var c = "";
											for (var u = 0; u < d; u++) {
												var h = k.getAt(u);
												var f = h.get("dataURI");
												if (document.getElementById("ch" + f).checked) {
													if (c == "") {
														c = h.get("supplierName")
													} else {
														if (c != h.get("supplierName")) {
															r = false;
															break
														}
													}
													c = h.get("supplierName");
													g.data.grossAmount = g.data.grossAmount + h.data.grossAmount;
													g.data.nettAmount = g.data.nettAmount + h.data.nettAmount;
													g.data.componentArray[t] = {
														rowNo : (u + 1),
														supplierURI : h.get("supplierURI"),
														dataURI : f,
														amountPayed : parseFloat(document.getElementById("pay" + f).value)
													};
													g.data.amount = g.data.amount + parseFloat(document.getElementById("pay" + f).value);
													t++
												}
											}
											if (!r) {
												Ext.Msg.alert("Alert", "Select single supplier to Proceed payment.");
												return
											}
											g.data.amount = g.data.amount.toFixed(2);
											g.data.payAmountTemp = g.data.payAmount.toFixed(2);
											var s = this.ownerCt.findParentByType("pnrpanel");
											TDS.window.setWindow({
												title : "Create transaction",
												information : "Please enter details of the transaction.",
												buttonOK : "Pay",
												data : g.data,
												postDataURI : q.baseDataURI + "/transactions",
												interfaceURI : "pnr/ledger/singlePayment.js",
												dataURI : {
													agency : s.getPNRAgencyURI()
												},
												callback : {
													fn : function (a) {
														if (a) {
															b.submitQuery(true);
															p.submitQuery(true)
														}
													},
													scope : this.ownerCt.ownerCt
												}
											})
										} else {
											if (w == 0) {
												var k = this.getStore();
												var d = g.store.data.length;
												var m = 0;
												for (var u = 0; u < d; u++) {
													var h = k.getAt(u);
													var f = h.get("dataURI");
													if (document.getElementById("ch" + f).checked) {
														m++;
														break
													}
												}
												if (m > 0) {
													for (var u = 0; u < d; u++) {
														var h = k.getAt(u);
														var f = h.get("dataURI");
														if (n != h.get("supplierName") && (document.getElementById("ch" + l).checked || !document.getElementById("ch" + f).checked)) {
															document.getElementById("ch" + f).checked = false;
															document.getElementById("ch" + f).disabled = true
														} else {
															document.getElementById("ch" + f).disabled = false
														}
													}
												} else {
													for (var u = 0; u < d; u++) {
														var h = k.getAt(u);
														var f = h.get("dataURI");
														document.getElementById("ch" + f).checked = false;
														document.getElementById("ch" + f).disabled = false
													}
												}
											}
										}
									}
								},
								sessioninit : function () {
									var a = this.ownerCt.findParentByType("ajaxpanel");
									if (!a) {
										return
									}
									this.searchURI = TDS.env.dataPath + a.baseDataURI + "/financials";
									this.overrideCollectionIdentifier = a.baseDataURI + "/financials"
								}
							}
						}, 
					/**	{
							cellpadding : false,
							cellspacing : false,
							x : 1100,
							xtype : "awesomegrid",
							searchURI : "",
							width : 330,
							pinnable : false,
							enableRowExpander : false,
							iconCls : "icon-grid",
							enableRowExpander : false,
							alwaysUseCollection : true,
							tbar : ["<font color='#3333ff'><b>Supplier's Currency</font>", "&nbsp;"],
							store : new Ext.data.JsonStore({
								url : "",
								id : "dataURI",
								fields : ["dataURI", "grossAmount", "passengersTotal", "commissionAmount", "commissionPercentage", "nettAmount", "currency"]
							}),
							sm : new Ext.grid.RowSelectionModel(),
							cm : new Ext.grid.ColumnModel([{
										header : "",
										fixed : true,
										width : 1,
										editable : false,
										renderer : function (f, c, b, e, g, d) {
											var a = b.get("dataURI");
											return '<table><tr><td>&nbsp;&nbsp;&nbsp;<input type="checkbox" value="true" id="ch1' + a + '"/> </td></tr></table>'
										}
									}, {
										header : "Gross",
										width : 100,
										fixed : true,
										dataIndex : "grossAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "%",
										width : 55,
										fixed : true,
										dataIndex : "commissionPercentage",
										renderer : function (b, c, a) {
											if (b) {
												return parseFloat(b).toFixed(2)
											} else {
												return b
											}
										}
									}, {
										header : "Comm",
										width : 80,
										fixed : true,
										dataIndex : "commissionAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "Net",
										width : 100,
										fixed : true,
										dataIndex : "nettAmount",
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}
								]),
							plugins : new Ext.ux.grid.GridSummary({
								processSummaryData : function (a) {
									if (this.grid.summaryCurrency) {
										a.data.currency = this.grid.summaryCurrency;
										return a
									}
									return {
										data : {}

									}
								}
							}),
							viewConfig : {
								width : 200
							},
							getRowInterface : function () {
								return "pnr/components/financial/layout.js"
							},
							listeners : {
								sessioninit : function () {
									var a = this.ownerCt.findParentByType("ajaxpanel");
									if (!a) {
										return
									}
									this.searchURI = TDS.env.dataPath + a.baseDataURI + "/baseFinancials";
									this.overrideCollectionIdentifier = a.baseDataURI + "/baseFinancials"
								}
							}
						}
						*/
					]
			// 	}
			// ]
		}, {
			xtype : "panel",
			height : 300,
			autoScroll : true,
			border : true,
			items : [{
					xtype : "panel",
					height : 300,
					autoScroll : true,
					layout : "absolute",
					items : [{
							border : false,
							cellpadding : false,
							cellspacing : false,
							xtype : "awesomegrid",
							searchURI : "",
							width : 1100,
							pinnable : false,
							iconCls : "icon-grid",
							style : "margin:0 auto;margin-top;",
							autoScroll : true,
							enableRowExpander : true,
							alwaysUseCollection : true,
							tbar : ['<font color="#3333ff"><b>Receipts & Non Credit Card Payments</font>', "->", {
									xtype : "button",
									text : "External Payments",
									information : "Please enter details of the Payment.",
									handler : function () {
										var a = this.ownerCt.findParentByType("ajaxpanel");
										if (!a) {
											return
										}
										TDS.window.setWindow({
											title : "Payments Details",
											interfaceURI : "pnr/components/payment.js",
											postDataURI : a.baseDataURI + "/ownPayments",
											dataURI : a.baseDataURI,
											buttonOK : "Submit",
											autoScroll : true
										})
									}
								}, {
									xtype : "redbutton",
									text : "Create",
									handler : function () {
										var b = this.ownerCt.findParentByType("ajaxpanel");
										var a = this.ownerCt.findParentByType("pnrpanel");
										if (!b && !a) {
											return
										}
										TDS.window.setWindow({
											title : "Create transaction",
											information : "Please enter details of the transaction.",
											interfaceURI : "pnr/ledger/create.js",
											postDataURI : b.baseDataURI + "/transactions",
											dataURI : {
												agency : a.getPNRAgencyURI()
											},
											callback : {
												fn : function (c) {
													if (c) {
														this.submitQuery(true)
													}
												},
												scope : this.ownerCt.ownerCt
											}
										})
									}
								}, {
									xtype : "button",
									text : "Export",
									handler : function () {}

								}
							],
							processCollectionData : function (h) {
								var j = this.ownerCt.findParentByType("panel");
								var k = this.ownerCt.items.itemAt(1).items.itemAt(0).items;
								var l = 0;
								var r = 0;
								var m = 0;
								var g = h[this.getCollectionIdentifier()];
								for (var f = (g.length - 1); f >= 0; f--) {
									var e = h[g[f]];
									e.currency = this.pnrCurrency;
									if (e.amount == "NaN" || typeof e.amount == "undefined") {
										e.amount = 0
									}
									if (e.credit) {
										e.amountCredit = e.amount;
										l += e.amount;
										m += e.amount
									} else {
										e.amountDebit = e.amount;
										l -= e.amount;
										r += e.amount
									}
									e.amountBalance = l
								}
								k.itemAt(13).setValue(m);
								k.itemAt(14).setValue(r);
								k.itemAt(3).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + m.toFixed(2));
								var b = k.itemAt(12).getValue();
								var c = k.itemAt(13).getValue();
								var p = k.itemAt(14).getValue();
								var q = c - p;
								var d = b - c;
								if (d == "NaN" || d == NaN || isNaN(d)) {
									d = 0
								}
								k.itemAt(5).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + d.toFixed(2));
								k.itemAt(7).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + p.toFixed(2));
								var o = q.toFixed(2);
								k.itemAt(9).setValue(TDS.util.Price.formatCurrency(this.pnrCurrency) + " " + q.toFixed(2));
								k.itemAt(15).setValue(q);
								var n = (q / b) * 100;
								if (n == 0 || n == "NaN" || isNaN(n)) {
									k.itemAt(11).setValue("0.00 %")
								} else {
									k.itemAt(11).setValue(n.toFixed(2) + " %")
								}
								this.ownerCt.ownerCt.ownerCt.updateLedgerscreen(d, o, p, c, b, n);
								return h
							},
							store : new Ext.data.JsonStore({
								id : "dataURI",
								fields : ["dataURI", "dateCreated", "componentPaymentDetails", "paymentType", "agencyTransactionTypeName", "passengerNameRecordComponentURI", "description", "notes", "amount", "credit", "amountCredit", "supplierURI", "supplierNameString", "amountDebit", "amountBalance", "currency", "type", "passengerNameRecordTransactionMethodName"],
								sortInfo : {
									field : "dateCreated",
									direction : "DESC"
								}
							}),
							width : 1100,
							id : "main",
							sm : new Ext.grid.RowSelectionModel(),
							cm : new Ext.grid.ColumnModel([{
										header : "Date/Time",
										dataIndex : "dateCreated",
										width : 150,
										fixed : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)
									}, {
										header : "Supplier",
										dataIndex : "supplierNameString",
										width : 140,
										fixed : true
									}, {
										header : "Type",
										width : 150,
										dataIndex : "agencyTransactionTypeName",
										fixed : true,
										renderer : function (c, b, a) {
											if (typeof a.get("paymentType") != "undefined" && a.get("paymentType") != null && a.get("paymentType") != "") {
												return a.get("paymentType")
											} else {
												return c
											}
										}
									}, {
										header : "Details",
										width : 350,
										dataIndex : "description",
										renderer : function (c, b, a) {
											return a.get("passengerNameRecordComponentURI") ? "<b>" + c + "</b>" : c
										}
									}, {
										header : "Method",
										dataIndex : "passengerNameRecordTransactionMethodName",
										width : 150,
										fixed : true
									}, {
										hidden : true,
										summaryType : "sum"
									}, {
										hidden : true,
										summaryType : "sum"
									}, {
										header : "Received",
										dataIndex : "amountCredit",
										width : 100,
										fixed : true,
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "Paid",
										dataIndex : "amountDebit",
										width : 100,
										fixed : true,
										summaryType : "sum",
										renderer : TDS.util.Price.amountRenderer
									}, {
										header : "",
										editable : false,
										dataIndex : "",
										fixed : true,
										width : 15,
										renderer : function (c, b, a) {
											if (typeof a.get("notes") != "undefined" && a.get("notes") != "") {
												return '<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'
											}
										}
									}
								]),
							plugins : new Ext.ux.grid.GridSummary({
								processSummaryData : function (a) {
									if (this.grid.pnrCurrency) {
										a.data.currency = this.grid.pnrCurrency;
										return a
									}
									return {
										data : {}

									}
								}
							}),
							viewConfig : {
								html : "&nbsp;",
								forceFit : true,
								height : 200
							},
							updateAmountCache : function (b, c, e) {
								var d = Ext.DomQuery.selectNode("div.x-grid3-col-5", this.view.summary.dom);
								Ext.fly(d).update(TDS.util.Price.formatPrice(this.totalPaid, e.fixedCurrency));
								var a = Ext.DomQuery.selectNode("div.x-grid3-col-4", this.view.summary.dom);
								Ext.fly(a).update(TDS.util.Price.formatPrice(this.totalRec, e.fixedCurrency))
							},
							listeners : {
								sessioninit : function () {
									var c = this.ownerCt.findParentByType("ajaxpanel");
									var b = this.ownerCt.findParentByType("pnrpanel");
									if (!c || !b) {
										return
									}
									this.searchURI = TDS.env.dataPath + c.baseDataURI + "/transactions";
									this.overrideCollectionIdentifier = c.baseDataURI + "/transactions";
									this.pnrCurrency = b.getPNRCurrency();
									var a = b.findParentByType("ajaxpanel");
									a.on("reloaddata", this.updateAmountCache, this);
									this.store.on("load", a.reloadData, a)
								}
							},
							getRowInterface : function (a) {
								return "pnr/ledger/layout.js"
							}
						}, {
							x : 1100,
							border : true,
							cellpadding : false,
							cellspacing : false,
							height : 240,
							items : [{
									border : false,
									cellpadding : false,
									cellspacing : false,
									layout : "table",
									style : "padding-bottom: 20px;padding-top: 20px;padding-right: 30px;padding-left: 30px;",
									layoutConfig : {
										columns : 2
									},
									closable : false,
									defaults : {
										width : 400
									},
									items : [{
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Total Gross Amount : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											style : " margin-bottom: 15px; font-weight: bold; ",
											height : 20,
											readOnly : true,
											xtype : "textfield",
											value : 0,
											name : "totalGrossAmount"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Total Recived : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											style : " margin-bottom: 15px; font-weight: bold; ",
											height : 20,
											readOnly : true,
											xtype : "textfield",
											value : 0,
											name : "totalRecived"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Amount Owing : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											style : " margin-bottom: 15px; font-weight: bold; ",
											height : 20,
											readOnly : true,
											xtype : "textfield",
											value : 0,
											name : "amount"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Total Paid : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											style : " margin-bottom: 15px; font-weight: bold; ",
											height : 20,
											readOnly : true,
											xtype : "textfield",
											value : 0,
											name : "totalPaid"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Margin : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											style : " margin-bottom: 15px;   font-weight: bold; ",
											height : 20,
											readOnly : true,
											xtype : "textfield",
											value : 0,
											name : "margin"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											height : 30,
											html : "<b>Percentage : </b>"
										}, {
											border : false,
											cellpadding : false,
											cellspacing : false,
											width : 130,
											readOnly : true,
											height : 20,
											style : " margin-bottom: 15px;  font-weight: bold;  ",
											xtype : "textfield",
											value : 0,
											name : "percentage"
										}, {
											xtype : "numberfield",
											hidden : true,
											width : 130,
											value : 0,
											name : "grossHiddenTotalId"
										}, {
											xtype : "numberfield",
											hidden : true,
											width : 130,
											value : 0,
											name : "receiveHiddenTotalIdNew"
										}, {
											xtype : "numberfield",
											hidden : true,
											width : 130,
											value : 0,
											name : "paidHiddenTotalIdNew"
										}, {
											xtype : "numberfield",
											hidden : true,
											width : 130,
											value : 0,
											name : "marginHiddenTotalIdNew"
										}
									]
								}
							]
						}
					]
				}
			]
		}
	]
}

























