{
	xtype: "panel",
	border: true,
	requireStores: [{
			dataURI: TDS.env.dataPath + "rate/classes/collection",
			identifier: "rate/classes",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "rate/occupancies/collection",
			identifier: "rate/occupancies",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "rate/pers/collection",
			identifier: "rate/pers",
			fields: ["name", "dataURI"]
		}
	],
	findField: function (b) {
		var a = false;
		this.getRateToolbar().items.each(function (c) {
			if (c.name == b) {
				a = c;
				return true
			}
		});
		return a
	},
	getRateGrid: function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)
	},
	getPnrPanel: function () {
		var b = this.ownerCt.findParentByType("pnrpanel");
		return this.ownerCt.findParentByType("pnrpanel")
	},
	getDataURI: function () {
		return this.ownerCt.baseDataURI
	},
	getRateToolbar: function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar()
	},
	getSelectedRateURI: function () {
		var a = this.getRateGrid().getSelectionModel().getSelected();
		if (typeof a != "undefined") {
			return a.get("dataURI")
		}
		return false
	},
	getPNRDataURI: function () {
		var a = this.ownerCt.findParentByType("awesomegrid");
		var b = a.findParentByType("ajaxpanel").baseDataURI;
		return b
	},
	focusBookTab: function () {
		var g = this.findParentByType("tabpanel");
		var j = g.getTabField("Book", "datePointer");
		var h = g.getTabField("Book", "dateDays");
		var e = g.getTabField("Book", "numberToReserve");
		var i = this.findField("datePointer");
		var f = this.findField("dateDays");
		var d = this.findField("minimumAvailable");
		if (j && i) {
			j.setValue(i.getValue())
		}
		if (h && f) {
			h.setValue(f.getValue())
		}
		if (e && d) {
			e.setValue(d.getValue())
		}
		var b = g.getTabField("Book", "rateURI");
		var c = this.getSelectedRateURI();
		if (b && c) {
			b.setValue(c)
		}
		var a = g.getTab("Book");
		if (a) {
			a.setNumberOfRatePerFieldByRateURI(c);
			a.submit()
		}
		g.setActiveTab(2)
	},
	focusBookTab1: function () {},
	items: {
		xtype: "panel",
		layout: "column",
		border: true,
		items: [{
				xtype: "panel",
				border: true,
				height: 260,
				width: 700,
				items: [{
						xtype: "awesomepanel",
						height: 240,
						layout: "fit",
						searchURI: "",
						store: new Ext.data.JsonStore({
							url: "",
							id: "dataURIs",
							fields: ["dataURI", "nameString", "adultNo", "childNo", "agencyURI", "maximumOccupancy", "inside", "groupName", "cabinTypeURI", "cabinTypeText", "deck", "grade", "ageBelow", "ages", "locations", "suppierPricing", "homeCurrency", "defaultFee", "noOfAdult", "shipName", "shipcomapny", "packagePrice", "cabin", "currency", "priceSingle", "priceDouble", "priceTriple", "priceQuad", "currency", "dealName", "balcony", "outsideCabin", "totalBalcony", "totalInside", "totalTriple", "totalQuad", "suite", "insideCabin", "stateroom", "pax", "dealDescr"]
						}),
						tbar: [" ", ' <style:"color:red"><b> # : Indicates Package</b> ', {
								xtype: "textfield",
								name: "amountLower",
								enableKeyEvents: true,
								width: 60,
								hidden: true
							}, " ", {
								xtype: "label",
								name: "room1",
								config: {
									rooms: ""
								},
								hidden: true
							}, "->", {
								xtype: "label",
								text: "Hot Deals",
								hidden: true,
								handler: function (a) {}
							}, {
								xtype: "label",
								text: "Advertised Deals",
								hidden: true,
								handler: function (a) {}
							}, {
								xtype: "label",
								text: "Specials Deals",
								hidden: true,
								handler: function (a) {}
							}, {
								xtype: "button",
								text: "Comparision",
								disabled: true,
								handler: function () {
									var b = this.findParentByType("tabpanel").ownerCt.ownerCt.ownerCt.getSelectionModel().getSelections()[0].data.cruiseName;
									var d = this.findParentByType("tabpanel").ownerCt.ownerCt.ownerCt.getSelectionModel().getSelections()[0].data.shipName;
									var g = this.findParentByType("tabpanel").ownerCt.ownerCt.ownerCt.getSelectionModel().getSelections()[0].data.embarkport;
									var f = [];
									var e = this.findParentByType("awesomepanel").findByType("grid")[0].getSelectionModel().getSelections();
									for (var c = 0; c < e.length; c++) {
										f.push(e[c].data)
									}
									TDS.window.setWindow({
										title: "Special Deals",
										interfaceURI: "pnr/offerings/cruise/comparision.js",
										buttonOK: "Proceed",
										buttonQueues: "Proceed",
										dataURI: {},
										data: {
											selectedRecords: f,
											cruiseName: b,
											shipName: d,
											departure: g
										},
										params: {},
										callback: {
											fn: function (h, i, a) {
												if (h) {}
												scope: this
											}
										}
									})
								}
							}, " ", " ", " ", " <b>Currency : AUD</b> "],
						items: [{
								xtype: "grid",
								id: "mainrate",
								border: false,
								enableHdMenu: false,
								enableColumnHide: false,
								enableColumnMove: false,
								enableColumnResize: false,
								viewConfig: {
									markDirty: false
								},
								sm: new Ext.grid.RowSelectionModel({
									singleSelect: false
								}),
								stateful: true,
								stateId: "grid",
								cm: new Ext.grid.ColumnModel([{
											header: "",
											width: 25,
											fixed: true,
											renderer: function (g, d, c, f, h, e) {
												var b = c.get("dataURI");
												return ' <input type="checkbox" value="true" id="chk' + b + '"/> '
											}
										}, {
											header: '<span style="color:red"><b> Deals</b></span>',
											dataIndex: "dealName",
											width: 120,
											fixed: true
										}, {
											header: "Interior",
											dataIndex: "totalInside",
											width: 90,
											fixed: true
										}, {
											header: "Ocean View",
											width: 90,
											dataIndex: "totalBalcony",
											fixed: true
										}, {
											header: "Balcony",
											width: 90,
											dataIndex: "totalTriple",
											fixed: true
										}, {
											header: "Suite",
											width: 90,
											dataIndex: "totalQuad",
											fixed: true
										}, {
											header: "Stateroom",
											width: 90,
											dataIndex: "stateroom",
											tdCls: "no-dirty",
											fixed: true
										}, {
											header: "Pax",
											width: 90,
											dataIndex: "pax",
											fixed: true
										}
									]),
								listeners: {
									beforerender: function () {
										this.store = this.ownerCt.store
									},
									render: function () {
										this.getEl().swallowEvent(["columnmove", "columnresize", "headerclick", "click", "mouseout", "mouseover", "rowmousedown", "sortchange", "mouseup", "mousedown"])
									},
									dblclick: function () {
										return false
									},
									cellclick: function (i, k, h, g) {
										if (h == 0) {}
										if (h == 1) {
											var a = i.getSelectionModel().getSelections()[0].data.dealDescr;
											var l = i.findParentByType("tabpanel");
											var b = l.getDetail("offeringURI");
											var f = l.getDetail("sailingdate");
											var d = i.getStore().getAt(k);
											var c = d.get("dealName");
											if (c.endsWith("#")) {
												var j = new Ext.Window({
														width: 800,
														height: 300,
														closeAction: "hide",
														title: "Package Summary",
														modal: true,
														closable: true,
														items: [{
																xtype: "panel",
																width: 785,
																autoHeight: true,
																items: [{
																		xtype: "panel",
																		width: 785,
																		layout: "auto",
																		border: false,
																		items: [{
																				html: "<b>Accommodation:</b>",
																				border: false
																			}
																		]
																	}, {
																		xtype: "grid",
																		hideHeaders: true,
																		autoHeight: true,
																		border: true,
																		store: new Ext.data.JsonStore({
																			url: "",
																			identifier: "",
																			fields: ["locationToString", "name", "inDate", "outDate", "roomType", "dataURI", "accommodationRatingURI", "basis", "rateUri", "status", "inventoryTypeURI", "maximumOccupancy", "packagePrice", "isPreHotel", "accommodationRate"]
																		}),
																		viewConfig: {
																			forceFit: true
																		},
																		id: "hotelGrid",
																		sm: new Ext.grid.CheckboxSelectionModel({
																			singleSelect: true
																		}),
																		clicksToEdit: 1,
																		cm: new Ext.grid.ColumnModel([{
																					header: "Destination",
																					width: 250,
																					fixed: true,
																					dataIndex: "locationToString",
																					renderer: function (p, o, e, q, n, m) {
																						return p + " -- " + e.get("name")
																					}
																				}, {
																					header: "In Date",
																					width: 90,
																					fixed: true,
																					dataIndex: "inDate",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("inDate") != "") {
																							return "In : " + new Date(e.get("inDate")).format(TDS.env.dateFormatDisplay)
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Out Date",
																					width: 90,
																					fixed: true,
																					dataIndex: "outDate",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("outDate") != "") {
																							return "Out : " + new Date(e.get("outDate")).format(TDS.env.dateFormatDisplay)
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Nights",
																					width: 50,
																					fixed: true,
																					dataIndex: "night",
																					renderer: function (q, p, m, r, o, n) {
																						if (m.get("outDate") != "" && m.get("inDate") != "") {
																							var e = ((new Date(m.get("outDate")) - new Date(m.get("inDate"))) / 86400000);
																							return "Nts : " + e
																						} else {
																							return "Nts: 0"
																						}
																					}
																				}, {
																					header: "Room Type",
																					width: 100,
																					fixed: true,
																					dataIndex: "roomType"
																				}, {
																					header: "Room Type",
																					dataIndex: "basis",
																					width: 120,
																					fixed: true
																				}, {
																					header: "Pre",
																					dataIndex: "isPreHotel",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("isPreHotel") == true) {
																							return "(Pre)"
																						} else {
																							return "(Post)"
																						}
																					}
																				}
																			]),
																		listeners: {
																			render: function () {
																				var e = this;
																				Ext.Ajax.request({
																					url: TDS.env.dataPath + b + "/accommodations",
																					method: "GET",
																					params: {
																						Ispost: "true",
																						dateFrom: f,
																						dateDays: 6,
																						numberToReserve: 1
																					},
																					success: function (m, p) {
																						var o = Ext.decode(m.responseText);
																						var r = o.preHotels;
																						if (typeof r == "undefined") {
																							return
																						}
																						var q = [];
																						for (var n = 0; n < r.length; n++) {
																							o[r[n]].dataURI = r[n];
																							q.push(o[r[n]])
																						}
																						e.getStore().loadData(q)
																					}
																				})
																			}
																		}
																	}, {
																		xtype: "panel",
																		width: 150,
																		layout: "auto",
																		border: false,
																		items: [{
																				html: "<b>Transfer:</b>",
																				border: false
																			}
																		]
																	}, {
																		xtype: "grid",
																		hideHeaders: true,
																		autoHeight: true,
																		border: true,
																		height: 25,
																		store: new Ext.data.JsonStore({
																			url: "",
																			identifier: "",
																			fields: ["locationToString", "name", "inDate", "departureDate", "modeType", "dataURI", "rateClassUri", "rateUri", "status", "packagePrice", "transferModeTypeURI", "accommodationRatingURI", "toMode", "fromMode", "transferPlaceTypeFromURI", "transferPlaceTypeToURI", "isPre", "accommodationRate"]
																		}),
																		viewConfig: {
																			forceFit: true
																		},
																		id: "tranfergrid",
																		sm: new Ext.grid.CheckboxSelectionModel({
																			singleSelect: true
																		}),
																		clicksToEdit: 1,
																		cm: new Ext.grid.ColumnModel([{
																					header: "Destination",
																					width: 150,
																					fixed: true,
																					dataIndex: "locationToString"
																				}, {
																					header: "modeype",
																					fixed: true,
																					width: 100,
																					dataIndex: "modeType"
																				}, {
																					header: "Out Date",
																					width: 90,
																					fixed: true,
																					dataIndex: "departureDate",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("departureDate") != "") {
																							return new Date(e.get("departureDate")).format(TDS.env.dateFormatDisplay)
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Room Type",
																					width: 140,
																					fixed: true,
																					dataIndex: "fromMode",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("departureDate") != "") {
																							return "From : " + p
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Room Type",
																					width: 220,
																					fixed: true,
																					dataIndex: "toMode",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("departureDate") != "") {
																							return "To : " + p
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Pre",
																					dataIndex: "isPre",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("isPre") == true) {
																							return "(Pre)"
																						} else {
																							return "(Post)"
																						}
																					}
																				}
																			]),
																		listeners: {
																			render: function () {
																				var e = this;
																				Ext.Ajax.request({
																					url: TDS.env.dataPath + b + "/transfer",
																					method: "GET",
																					params: {
																						dateFrom: f,
																						dateDays: 6,
																						numberToReserve: 1
																					},
																					success: function (m, p) {
																						var o = Ext.decode(m.responseText);
																						var r = o.transfer;
																						if (typeof r == "undefined") {
																							return
																						}
																						var q = [];
																						for (var n = 0; n < r.length; n++) {
																							o[r[n]].dataURI = r[n];
																							q.push(o[r[n]])
																						}
																						e.getStore().loadData(q)
																					}
																				})
																			}
																		}
																	}, {
																		xtype: "panel",
																		width: 150,
																		layout: "auto",
																		border: false,
																		items: [{
																				html: "<b>Day Tours:</b>",
																				border: false
																			}
																		]
																	}, {
																		xtype: "grid",
																		autoHeight: true,
																		hideHeaders: true,
																		border: true,
																		height: 25,
																		store: new Ext.data.JsonStore({
																			url: "",
																			identifier: "",
																			fields: ["locationToString", "name", "inDate", "departureDate", "sightseeingTypeURI", "dayTourType", "dataURI", "time", "status", "rateUri", "rateClassUri", "packagePrice", "duration", "departureTime", "sightseeingTypeURI", "isPre"]
																		}),
																		viewConfig: {
																			forceFit: true
																		},
																		id: "SIGHTGrid",
																		sm: new Ext.grid.CheckboxSelectionModel({
																			singleSelect: true
																		}),
																		clicksToEdit: 1,
																		cm: new Ext.grid.ColumnModel([{
																					header: "Destination",
																					dataIndex: "locationToString",
																					width: 250,
																					fixed: true,
																					renderer: function (p, o, e, q, n, m) {
																						return p + " -- " + e.get("name")
																					}
																				}, {
																					header: "Depart Date",
																					width: 90,
																					fixed: true,
																					dataIndex: "departureDate",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("departureDate") != "") {
																							return new Date(e.get("departureDate")).format(TDS.env.dateFormatDisplay)
																						} else {
																							return ""
																						}
																					}
																				}, {
																					header: "Out Date",
																					width: 140,
																					fixed: true,
																					dataIndex: "departureTime",
																					renderer: function (p, o, e, q, n, m) {
																						return "Departs  " + e.get("departureTime")
																					}
																				}, {
																					header: "Duration",
																					dataIndex: "duration",
																					fixed: true,
																					width: 220,
																					renderer: function (p, o, e, q, n, m) {
																						return "Duration  " + e.get("duration") + "  Hours"
																					}
																				}, {
																					header: "Pre",
																					dataIndex: "isPre",
																					renderer: function (p, o, e, q, n, m) {
																						if (e.get("isPre") == true) {
																							return "(Pre)"
																						} else {
																							return "(Post)"
																						}
																					}
																				}
																			]),
																		listeners: {
																			render: function () {
																				var e = this;
																				Ext.Ajax.request({
																					url: TDS.env.dataPath + b + "/dayTours",
																					method: "GET",
																					params: {
																						dateFrom: f,
																						dateDays: 6,
																						numberToReserve: 1
																					},
																					success: function (m, p) {
																						var o = Ext.decode(m.responseText);
																						var r = o.sight;
																						if (typeof r == "undefined") {
																							return
																						}
																						var q = [];
																						for (var n = 0; n < r.length; n++) {
																							o[r[n]].dataURI = r[n];
																							q.push(o[r[n]])
																						}
																						e.getStore().loadData(q)
																					}
																				})
																			}
																		}
																	}
																]
															}
														]
													}).show()
											}
										}
									},
									rowclick: function (b, a, c) {},
									render: function () {}
								}
							}
						],
						listeners: {
							toolbarinit: function () {
								var a = this.findByType("grid")[0];
								var f = this.ownerCt.findParentByType("awesomegrid");
								var e = this.ownerCt.findParentByType("tabpanel");
								var h = e.getDetail("sailingdate");
								var d = e.getDetail("sailingdate");
								var i = f.findField("datePointer"),
								c = f.findField("dateDays");
								this.searchURI = TDS.env.dataPath + e.getDetail("offeringURI") + "/searchCategorys";
								this.appendQueryParams.currency = e.getPNRCurrency();
								var g = f.ajaxpanel.baseDataURI;
								this.appendQueryParams.pnrURI = g;
								var b = [];
								Ext.Ajax.request({
									url: TDS.env.dataPath + e.getDetail("offeringURI") + "/searchCategorys/collection",
									method: "GET",
									params: {
										pnrURI: g,
										currency: e.getPNRCurrency()
									},
									success: function (j, k) {
										a.getStore().loadData(Ext.decode(j.responseText).dealsRecords)
									}
								})
							},
							render: function () {},
							activate: function (a) {}
						}
					}, {
						border: false,
						html: '<p style="font-size: 9px; padding-top: 4px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates.</p>'
					}
				]
			}, {
				xtype: "panel",
				border: false,
				height: 260,
				width: 420,
				style: "padding-left:50px;",
				items: [{
						xtype: "panel",
						border: false,
						height: 55,
						width: 450,
						style: "padding-top:5px;padding-left:25px;",
						layout: "table",
						layoutConfig: {
							columns: 2
						},
						defaults: {},
						items: [{
								border: false,
								html: '<p style="font-size: 12px; padding-top: 10px; color:red"><b>Start here => </b></p>'
							}, {
								xtype: "button",
								text: "Add/ Edit Pax & Stateroom",
								style: "width:350px!important;padding-top:10px;",
								minWidth: 200,
								colspan: 2,
								handler: function () {
									var a = this.ownerCt.ownerCt.findByType("grid")[0];
									TDS.window.setWindow({
										title: "Passenger Information",
										interfaceURI: "pnr/offerings/cruise/paxinfo.js",
										dataURI: {},
										data: {},
										buttonOK: false,
										buttonCancel: "Close",
										scope: a,
										params: {},
										callback: {
											fn: function (c, d, b) {
												if (c) {}
												scope: this
											}
										},
										listeners: {
											render: function () {}
										}
									})
								}
							}
						]
					}, {
						xtype: "panel",
						border: true,
						height: 120,
						items: [{
								xtype: "grid",
								height: 120,
								border: false,
								enableHdMenu: false,
								viewConfig: {},
								config: {
									paxRecord: ""
								},
								stateful: true,
								stateId: "stateroom",
								store: new Ext.data.JsonStore({
									url: "",
									identifier: "",
									fields: ["room", "adult", "child", "infant", "cons", "access", "adultAges", "infantAges", "childAges", "accessAges", "consAges", "totalPax", "deal", "dataURI"]
								}),
								sm: new Ext.grid.CheckboxSelectionModel({
									singleSelect: true
								}),
								cm: new Ext.grid.ColumnModel([{
											header: "",
											width: 25,
											fixed: true,
											renderer: function (g, d, c, f, h, e) {
												var b = c.get("dataURI");
												return ' <input type="checkbox" value="true" id="chk1' + b + '"/> '
											}
										}, {
											header: "STATEROOMS",
											dataIndex: "room",
											width: 100
										}, {
											header: "  PASSENGERS ",
											dataIndex: "totalPax",
											width: 100
										}, {
											header: "DEALS",
											dataIndex: "deal",
											width: 120
										}
									]),
								listeners: {
									render: function () {
										this.getEl().swallowEvent(["columnmove", "columnresize", "headerclick", "click", "mouseout", "mouseover", "rowmousedown", "sortchange", "mouseup", "mousedown"])
									}
								}
							}
						]
					}, {
						xtype: "button",
						text: "Attach to a Deal before Proceeding",
						style: "padding-top:10px;padding-left:60px;",
						config: {
							totalpax: 0,
							totalStateroom: 0
						},
						handler: function () {
							var f = this.ownerCt.ownerCt.findByType("grid")[0];
							var e = f.getSelectionModel().getSelections();
							if (e.length) {
								var a = this.ownerCt.findByType("grid")[0].getStore();
								var b = this.ownerCt.findByType("grid")[0].getSelectionModel().getSelections();
								var d = this.ownerCt.findByType("grid")[0].getStore().indexOf(b[0]);
								a.removeAt(d);
								a.insert(d, [new a.recordType({
											room: b[0].data.room,
											totalPax: b[0].data.totalPax,
											deal: e[0].data.dealName == "undefined" || e[0].data.dealName == "" ? "Cruise Only" : e[0].data.dealName,
											adult: b[0].data.adult,
											child: b[0].data.child,
											access: b[0].data.access,
											infant: b[0].data.infant,
											cons: b[0].data.cons,
											adultAges: b[0].data.adultAges,
											childAges: b[0].data.childAges,
											infantAges: b[0].data.infantAges,
											accessAges: b[0].data.accessAges,
											consAges: b[0].data.consAges
										})])
							}
							f.getStore().each(function (i, g) {
								if ((typeof(b[0].data.deal) != "undefined") && (b[0].data.deal == i.data.dealName)) {
									f.getStore().getAt(g).set("pax", "");
									f.getStore().getAt(g).set("stateroom", "");
									var h = f.getStore().indexOf(i);
									f.getSelectionModel().selectRow(h);
									f.getSelectionModel().getSelections()[0].commit()
								}
							});
							var c = f.getStore().indexOf(e[0]);
							f.getStore().getAt(c).set("pax", b[0].data.totalPax);
							f.getStore().getAt(c).set("stateroom", b[0].data.room);
							this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(2).enable()
						}
					}
				]
			}, {
				xtype: "panel",
				style: "padding-left:50px;",
				border: false,
				items: [{
						xtype: "button",
						style: "padding-top:15px;",
						minWidth: 100,
						text: "Cruise Info",
						handler: function () {
							var c = this.ownerCt.ownerCt.ownerCt;
							var a = c.getDataURI();
							if (!a) {
								return
							}
							var d = this.ownerCt.ownerCt.findParentByType("tabpanel");
							var b = d.getTabField("Rate", "datePointer");
							TDS.window.setWindow({
								title: "Information",
								interfaceURI: "pnr/offerings/cruise/terms.js",
								sourceDataURI: a + "/information",
								buttonOK: false,
								buttonCancel: "Close",
								callback: {
									fn: function (f, g, e) {
										if (f) {}
									}
								}
							})
						}
					}, {
						xtype: "button",
						text: "Cabin Info",
						style: "padding-top:20px;",
						minWidth: 100,
						handler: function () {
							var d = this.ownerCt.ownerCt.ownerCt;
							var a = d.getSelectedRateURI();
							var e = this.ownerCt.ownerCt.findParentByType("tabpanel");
							var c = e.getDetail("offeringURI");
							var b = d.getRateGrid().getSelectionModel().getSelected();
							var e = this.ownerCt.ownerCt.findParentByType("tabpanel");
							TDS.window.setWindow({
								title: "Cabin Information",
								interfaceURI: "pnr/offerings/cruise/categoryInformation.js",
								data: {
									sailingURI: c
								},
								buttonOK: false,
								buttonCancel: "Close"
							})
						}
					}, {
						xtype: "button",
						text: "Proceed",
						minWidth: 100,
						disabled: true,
						style: "padding-top:100px;",
						handler: function () {
							var e = this.ownerCt.ownerCt.findByType("grid")[1];
							var h = this.ownerCt.ownerCt.findByType("grid")[0];
							var d = this.ownerCt.ownerCt.ownerCt;
							var g = this.ownerCt.ownerCt.ownerCt.findParentByType("tabpanel");
							var b = this.findParentByType("tabpanel").getDetail("offeringURI");
							var f = this.findParentByType("tabpanel").getDetail("sailingdate");
							console.log('***************************************************');
							console.log(f);
							var c = this.findParentByType("tabpanel").ownerCt.ownerCt.rowRecordData;
							var a = e.getStore();
							TDS.window.setWindow({
								title: "Category Select",
								interfaceURI: "pnr/offerings/cruise/category.js",
								buttonOK: false,
								buttonCancel: "Close",
								config: {
									rategrid: h
								},
								scope: e,
								dataURI: {
									pnr: d.getPNRDataURI(),
									offering: d.getDataURI(),
									cruiseSelectedRecord: c
								},
								data: {
									offeringURI: g.getDetail("offeringURI"),
									dateFrom: f,
									cruiseSelectedRecord: c,
									rateURI: d.getSelectedRateURI(),
									stateRoomStore: a
								},
								params: {
									pnr: d.getPNRDataURI()
								},
								callback: {
									fn: function (j, k, i) {
										if (j) {}
									}
								}
							})
						}
					}
				]
			}
		]
	}
}



















