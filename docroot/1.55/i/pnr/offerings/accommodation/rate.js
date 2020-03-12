{
	xtype: "panel",
	border: false,
	requireStores: [{
			dataURI: TDS.env.dataPath + "accommodation/inventorytypes/collection",
			identifier: "accommodation/inventorytypes",
			fields: ["name", "displayName", "dataURI"]
		}, {
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
		}, {
			dataURI: TDS.env.dataPath + "accommodation/rateType/collection",
			identifier: "accommodation/rateType",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "accommodation/roomviews/collection",
			identifier: "accommodation/roomviews",
			fields: ["name", "displayName", "dataURI"]
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
	getPNRDataURI: function () {
		var a = this.ownerCt.findParentByType("awesomegrid");
		var b = a.findParentByType("ajaxpanel").baseDataURI;
		return b
	},
	getDataURI: function () {
		alert("base");
		alert(this.ownerCt.baseDataURI);
		return this.ownerCt.baseDataURI
	},
	getPnrPanel: function () {
		var b = this.ownerCt.findParentByType("pnrpanel");
		return this.ownerCt.findParentByType("pnrpanel")
	},
	expireInterface: function () {},
	getRateGrid: function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0)
	},
	getRateToolbar: function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar()
	},
	getMultipleSelectedRateURI: function () {
		var j = this.findParentByType("tabpanel");
		var f = j.shared.stores.rates;
		var b = f.data.length;
		var a = [];
		var g = 0;
		for (var c = 0; c < b; c++) {
			var e = f.getAt(c);
			var h = e.data.shareAvailabilitywith;
			var d = e.data.dataURI;
			var k = document.getElementById("no" + d).value;
			if (h == "") {
				if (document.getElementById("rd" + d) != null && document.getElementById("rd" + d).checked && k != 0 && k != "") {
					a[g] = e;
					g++
				}
			} else {
				if (document.getElementById("ch" + d) != null && document.getElementById("ch" + d).checked) {
					a[g] = e;
					g++
				}
			}
		}
		return a
	},
	getSelectedRateURI: function () {
		var k = this.findParentByType("tabpanel");
		var g = k.getTabField("Book", "numberToReserve");
		var a = 0;
		var f = k.shared.stores.rates;
		var b = f.data.length;
		var h = "";
		for (var c = 0; c < b; c++) {
			var e = f.getAt(c);
			var j = e.data.shareAvailabilitywith;
			var d = e.data.dataURI;
			if (j == "") {
				if (document.getElementById("rd" + d) != null && document.getElementById("rd" + d).checked) {
					h = d;
					a += parseInt(document.getElementById("no" + d).value)
				}
			} else {
				if (document.getElementById("ch" + d) != null && document.getElementById("ch" + d).checked) {
					a += parseInt(document.getElementById("no" + d).value)
				}
			}
		}
		if (g) {
			g.setValue(a)
		}
		if (typeof h != "undefined") {
			return h
		} else {
			return false
		}
	},
	focusBookTab: function () {
		var h = this.findParentByType("tabpanel");
		var e = h.getTabField("Book", "datePointer");
		var g = h.getTabField("Book", "datePointerOut");
		var i = h.getTabField("Book", "nightsTemp");
		var d = this.findField("datePointerIn");
		var j = this.findField("datePointerOut");
		var f = this.findField("nightsTemp");
		if (e && d) {
			e.setValue(d.getValue())
		}
		if (g && j) {
			g.setValue(j.getValue())
		}
		if (i && f) {
			i.setValue(f.getValue())
		}
		var b = h.getTabField("Book", "rateURI");
		var c = this.getSelectedRateURI();
		if (b && c) {
			b.setValue(c)
		}
		var a = h.getTab("Book");
		if (a) {
			a.setNumberOfRatePerFieldByRateURI(c);
			a.submit()
		}
		h.setActiveTab(2)
	},
	items: {
		xtype: "panel",
		id: "p1",
		layout: "column",
		bodyStyle: "padding: 2px;",
		border: false,
		items: [{
				xtype: "panel",
				id: "p2",
				border: false,
				height: 150,
				width: 950,
				items: [{
						xtype: "awesomepanel",
						height: 136,
						layout: "fit",
						searchURI: "",
						callBeforeSearch: true,
						beforeSearch: function () {
							var d = this.getTopToolbar().items.itemAt(14).getValue();
							var b = this.getTopToolbar().items.itemAt(17).getValue();
							var a = this.getTopToolbar().items.itemAt(19).getValue();
							var c = this.getTopToolbar().items.itemAt(21);
							c.setValue((a - b) / 86400000)
						},
						store: new Ext.data.JsonStore({
							url: "",
							id: "dataURI",
							fields: ["dataURI", "nameString", "restrictions", "agencyURI", "maximumOccupancy", "inventoryTypeURI", "roomViewURI", "inventoryAvailable", "queueRequestable", "special", "available", "conversionCurrency", "convertedPricingPriceSell", "convertedPricingPriceIsNett", "convertedPricingPriceCommission", "shareAvailabilitywith", "flagCount", "offeringURI", "childChbox", "noOfPersons", "agencyGroupId", "selectedTotalGuest", "hotusaRateStatus", "hotusaRoomType", "hotusaNoofRomms", "homeCurrency", "pricingPriceSell", "hotusaId", "pricingPriceIsNett", "hotusaAvailibityStatus"]
						}),
						tbar: ["Price from", {
								xtype: "textfield",
								name: "amountLower",
								enableKeyEvents: true,
								width: 40
							}, "-", " ", "Per Room: Adult", {
								xtype: "omnicrementer",
								name: "maximumOccupancyAdult",
								maxValue: 8,
								minValue: 1,
								width: 50
							}, " ", "Child", {
								xtype: "omnicrementer",
								name: "maximumOccupancyChild",
								maxValue: 5,
								minValue: 0,
								width: 50
							}, "-", " ", "No of rooms", {
								xtype: "omnicrementer",
								name: "noofRooms",
								width: 60,
								value: 1,
								minValue: 1,
								maxValue: 7,
								listeners: {
									trigger: function () {
										this.ownerCt.ownerCt.submit()
									}
								}
							}, "Room type", {
								xtype: "combo",
								name: "inventoryTypeURI",
								mode: "local",
								width: 120,
								triggerAction: "all",
								editable: false,
								displayField: "displayName",
								valueField: "dataURI",
								store: TDS.data.getStore({
									dataURI: TDS.env.dataPath + "accommodation/inventorytypes/collection",
									identifier: "accommodation/inventorytypes",
									fields: ["name", "displayName", "dataURI"]
								}),
								appendData: [{
										name: "Any",
										displayName: "Any room type",
										dataURI: ""
									}
								]
							}, " ", "In", {
								xtype: "datefield",
								name: "datePointerIn",
								enableKeyEvents: true,
								showToday: false,
								width: 70,
								format: "dMy",
								minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime(),
								listeners: {
									extraselect: function () {
										var a = this.getValue();
										a.setDate(a.getDate() + 1);
										this.ownerCt.items.itemAt(19).setMinValue(a)
									}
								}
							}, "Out", {
								xtype: "datefield",
								name: "datePointerOut",
								enableKeyEvents: true,
								showToday: false,
								width: 70,
								format: "dMy",
								minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime()
							}, " ", {
								xtype: "omnicrementer",
								name: "nightsTemp",
								width: 60,
								editable: true,
								listeners: {
									trigger: function () {
										var b = this.ownerCt.items.itemAt(17).getValue();
										var a = this.getValue();
										this.ownerCt.items.itemAt(19).setValue(new Date(b).add(Date.DAY, a))
									}
								}
							}, " ", "nights"],
						items: [{
								xtype: "grid",
								width: 500,
								border: false,
								enableColumnHide: false,
								enableColumnMove: false,
								enableColumnResize: false,
								enableHdMenu: false,
								viewConfig: {
									forceFit: true
								},
								sm: new Ext.grid.CheckboxSelectionModel(),
								columns: [{
										header: "",
										fixed: true,
										width: 35,
										id: "chk",
										dataIndex: "chk",
										editable: false,
										renderer: function (f, c, b, e, g, d) {
											var a = b.get("dataURI");
											if (b.get("shareAvailabilitywith") == "") {
												return '<input type="radio" id = "rd' + a + '" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">'
											} else {
												return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ch' + a + '" name="rateChk[]" disabled/>'
											}
										}
									}, {
										header: "Room Type",
										dataIndex: "inventoryTypeURI",
										width: 140,
										fixed: true,
										renderer: function (e, d, a, f, c, b) {
											if (a.get("hotusaRoomType") != null && a.get("hotusaRoomType") != "") {
												return a.get("hotusaRoomType")
											} else {
												return TDS.util.Format.displayResourceName(e, "displayName")
											}
										}
									}, {
										header: "View",
										dataIndex: "roomViewURI",
										width: 100,
										fixed: true,
										renderer: TDS.util.Format.displayResourceNameRenderer("name")
									}, {
										header: "Rate",
										editable: false,
										dataIndex: "nameString",
										width: 105,
										renderer: function (c, b, a) {
											if (a.get("special")) {
												b.attr = 'style="color: red;" '
											} else {
												if (a.get("agencyURI") != "") {
													b.attr = 'style="color: blue;"'
												}
											}
											if (a.get("agencyGroupId") != "") {
												b.attr = 'style="color: green;"'
											}
											b.attr = 'ext:qtip="' + a.get("hotusaRateStatus") + '"';
											return c
										}
									}, {
										header: "Max in room",
										dataIndex: "maximumOccupancy",
										width: 100,
										fixed: true
									}, {
										header: "No. of Guest",
										dataIndex: "selectedTotalGuest",
										width: 115,
										fixed: true
									}, {
										header: "Gross Price",
										editable: false,
										dataIndex: "convertedPricingPriceSell",
										renderer: TDS.util.Price.conversionGrossNettPriceRenderer,
										fixed: true,
										width: 100
									}, {
										header: "No. of Rooms",
										dataIndex: "",
										width: 80,
										fixed: true,
										renderer: function (g, a, e, b, d, h) {
											var c = e.get("dataURI");
											var f = "no" + c;
											var i = e.get("hotusaNoofRomms");
											if (e.get("hotusaNoofRomms") != null && e.get("hotusaNoofRomms") != "") {
												return e.get("hotusaNoofRomms") + '<input type="hidden" size="3" id="' + f + '" name="noOfPersons" value="' + e.get("hotusaNoofRomms") + '" onkeyup="" >'
											} else {
												return '<input type="text" size="3" id="' + f + '" name="noOfPersons" value="1" onkeyup="" >'
											}
										}
									}, {
										header: "Status",
										editable: false,
										dataIndex: "available",
										fixed: true,
										width: 60,
										renderer: function (b, c, a) {
											if (a.get("hotusaAvailibityStatus") != null && a.get("hotusaAvailibityStatus") != "") {
												b = a.get("hotusaAvailibityStatus")
											}
											return b
										}
									}, {
										header: "",
										editable: false,
										dataIndex: "",
										fixed: true,
										width: 15,
										renderer: function (c, b, a) {
											if (a.get("shareAvailabilitywith") == "") {
												return '<input type="password" name="" style="border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none; div {text-align: lert; }; color:#ff0000" disabled value = "a">'
											}
										}
									}
								],
								listeners: {
									beforerender: function () {
										this.store = this.ownerCt.store
									},
									render: function () { ;
										var a = this.ownerCt.ownerCt;
										var b = a.findParentByType("tabpanel");
										if (b.getDetail("calcRatePerPerson")) {
											this.colModel.setColumnHeader(5, "Pricing/Per Person")
										} else {
											this.colModel.setColumnHeader(5, "Pricing/Per Room")
										}
										if (b.getDetail("supplierURI") != "" && b.getDetail("supplierURI") == "supplier/190") {
											this.colModel.setColumnHeader(3, "Basis");
											this.colModel.setColumnHeader(4, "Persons in Room");
											this.colModel.setHidden(2, true)
										} else {
											this.colModel.setColumnHeader(3, "Rate")
										}
										this.getEl().swallowEvent(["columnmove", "columnresize", "headerclick", "click", "rowclick", "rowmousedown", "sortchange", "mouseup", "mousedown"])
									},
									rowclick: function (s, v, E) {
										E.stopPropagation();
										var g = this.getStore().getAt(v);
										var d = g.get("offeringURI");
										var n = g.get("dataURI");
										g.set("noOfPersons", document.getElementById("no" + n).value);
										var r = g.get("noOfPersons");
										if (document.getElementById("rd" + n) != null) {
											var y = this.getStore();
											var f = "";
											var B = 0;
											var b = g.store.data.length;
											for (var D = 0; D < b; D++) {
												var h = y.getAt(D);
												f = h.get("dataURI");
												if (document.getElementById("rd" + f) != null && document.getElementById("rd" + f).checked && (h.get("shareAvailabilitywith") == null || h.get("shareAvailabilitywith") == "")) {
													for (var A = 0; A < h.get("flagCount"); A++) {
														document.getElementById("ch" + h.get("childChbox")[A]).disabled = false
													}
												} else {
													if ((h.get("shareAvailabilitywith") == null || h.get("shareAvailabilitywith") == "")) {
														for (var z = 0; z < h.get("flagCount"); z++) {
															document.getElementById("ch" + h.get("childChbox")[z]).disabled = true;
															document.getElementById("ch" + h.get("childChbox")[z]).checked = false
														}
													}
												}
											}
										}
										if (g == -1) {
											return
										}
										var H = {
											rate: g.data
										};
										var x = this.ownerCt.findParentByType("ajaxpanel");
										var c = this.ownerCt.findParentByType("tabpanel");
										var u = c.getPNRCurrency();
										var w = this.ownerCt.ownerCt.ownerCt.items.itemAt(1);
										w.el.mask("", "x-mask-loading");
										if (c.ownerCt.ownerCt.rowRecordData.supplierURI != TDS.util.Defaults.hotusaSupplier) {
											var m = new Ext.data.CollectionStore({
													autoLoad: true,
													url: TDS.env.dataPath + x.baseDataURI + "/searchExtras/collection?rateURI=" + g.get("dataURI") + "&currency=" + u,
													identifier: x.baseDataURI + "/searchExtras?rateURI=" + g.get("dataURI") + "&currency=" + u,
													fields: ["dataURI", "nameString", "termsAndConditions", "extraCategoryURI", "required", "minimumInventoryRequired", "conversionCurrency", "convertedPricingPriceSell", "convertedPricingPriceIsNett", "convertedPricingPriceCommission", "rateClassURI", "ratePerURI", "rateOccupancyURI", "shareAvailabilitywith", "flagCount", "offeringURI", "childChbox"]
												});
											m.on("load", function (O, p) {
												H.extras = [];
												TDS.data[g.get("dataURI")] = [];
												var N = g.get("dataURI");
												for (var K = 0; K < p.length; K++) {
													p[K].data.rateURI = N;
													p[K].data.doWork = "if(this.checked){TDS.data['" + N + "'].push(this.value);}else{TDS.data['" + N + "'].pop(this.value);}";
													H.extras[K] = p[K].data;
													Ext.apply(H.extras[K], TDS.util.Price.calculateGrossNettPrice(H.extras[K]))
												}
												var M = w.items.itemAt(0);
												var J = w.items.itemAt(1);
												var L = w.items.itemAt(2);
												var e = L.items.itemAt(0);
												var I = L.items.itemAt(1);
												var k = L.items.itemAt(2);
												var j = w.items.itemAt(3);
												M.hide();
												J.tpl.overwrite(J.body, H.rate);
												if (H.extras.length > 0) {
													j.tpl.overwrite(j.body, H.extras)
												}
												e.show();
												I.show();
												k.show();
												w.el.unmask()
											}, this)
										} else { ;
											var G = w.items.itemAt(0);
											var F = w.items.itemAt(1);
											var l = w.items.itemAt(2);
											var o = l.items.itemAt(0);
											var q = l.items.itemAt(2);
											var a = l.items.itemAt(3);
											var C = w.items.itemAt(4);
											G.hide();
											o.show();
											q.hide();
											w.el.unmask()
										}
									}
								}
							}
						],
						listeners: {
							toolbarinit: function () {
								var p = this.ownerCt.findParentByType("awesomegrid");
								var a = this.ownerCt.findParentByType("tabpanel");
								var q = p.findField("maximumOccupancyAdult"),
								n = p.findField("maximumOccupancyChild");
								var e = this.getTopToolbar().items.itemAt(5),
								o = this.getTopToolbar().items.itemAt(8);
								var k = p.findField("datePointerIn"),
								l = p.findField("datePointerOut"),
								c = p.topToolbar.items.itemAt(7);
								var f = this.getTopToolbar().items.itemAt(17),
								g = this.getTopToolbar().items.itemAt(19),
								b = this.getTopToolbar().items.itemAt(21);
								if (f) {
									f.setValue(k.getValue())
								}
								if (g) {
									g.setValue(l.getValue())
								}
								if (b) {
									b.setValue(c.getValue())
								}
								if (q) {
									e.setValue(q.getValue())
								}
								if (n) {
									o.setValue(n.getValue())
								}
								var h = p.findField("noOfRooms");
								var d = this.getTopToolbar().items.itemAt(12);
								if (d) {
									d.setValue(h.getValue())
								}
								this.searchURI = TDS.env.dataPath + a.getDetail("offeringURI") + "/searchRates";
								this.appendQueryParams.currency = a.getPNRCurrency();
								if (a.ownerCt.ownerCt.rowRecordData.supplierURI == TDS.util.Defaults.hotusaSupplier) {
									this.topToolbar.items.itemAt(13).hide(true);
									this.topToolbar.items.itemAt(14).hide(true)
								}
								var r = a.getTab("Rate");
								if (r) {
									var i = this.findField("rateURI");
									var j = r.getSelectedRateURI()
								}
								if (i && j) {
									i.setValue(j)
								}
								var m = a.shared.stores.rates;
								this.getStore().on("load", function (t, s) {
									m.removeAll();
									m.add(s)
								})
							}
						}
					}, {
						border: false,
						html: '<p style="font-size: 9px; padding-top: 3px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates And  Rates that appear highlighted green are <b style="color: green;">special agency</b> rates.</p>'
					}
				]
			}, {
				xtype: "panel",
				cls: "x-tds-rate-table",
				columnWidth: 1,
				layout: "table",
				layoutConfig: {
					columns: 2
				},
				height: 150,
				bodyStyle: "padding-left: 8px;",
				hideBorders: true,
				border: false,
				items: [{
						html: "<p>Select a rate to view available extras.</p>",
						colspan: 2
					}, {
						hidden: true,
						colspan: 2,
						tpl: new Ext.XTemplate(["<p><b>Room type:</b> {[TDS.util.Format.displayResourceName(values.inventoryTypeURI)]}</p>", "<p><b>Max. in room:</b> {maximumOccupancy}</p>"])
					}, {
						xtype: "panel",
						layout: "table",
						colspan: 2,
						width: 200,
						layoutConfig: {
							columns: 3
						},
						defaults: {
							style: "padding-left: 2px;",
							minWidth: 60
						},
						items: [{
								xtype: "formredbutton",
								text: "Select",
								hidden: true,
								handler: function () {
									var E = this.ownerCt.ownerCt.ownerCt.ownerCt;
									var h = this.ownerCt.ownerCt.findParentByType("tabpanel");
									var B = h.getTab("Rate");
									var s = h.shared.stores.rates;
									var g = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0);
									var J = g.getSelectionModel();
									var z = J.selections.items[0].data.nameString;
									var l = J.selections.items[0].data.offeringURI;
									var v = J.selections.items[0].data.offeringName;
									var w = J.selections.items[0].data.hotusaRoomType;
									var A = J.selections.items[0].data.homeCurrency;
									var r = J.selections.items[0].data.hotusaId;
									var I = J.selections.items[0].data.hotusaAvailibityStatus;
									var H = J.selections.items[0].data.hotusaNoofRomms;
									var b = J.selections.items[0].data.pricingPriceSell;
									var D = J.selections.items[0].data.pricingPriceSell;
									var e = J.selections.items[0].data.convertedPricingPriceSell;
									var n = J.selections.items[0].data.conversionCurrency;
									var i = J.selections.items[0].data.convertedPricingPriceIsNett;
									var q = J.selections.items[0].data.pricingPriceIsNett;
									var x = J.selections.items[0].data.selectedTotalGuest;
									var m = this.ownerCt.ownerCt.ownerCt.items.itemAt(0);
									if (h.ownerCt.ownerCt.rowRecordData.supplierURI == TDS.util.Defaults.hotusaSupplier) {
										if (TDS.env.user.isHotusaActive()) {
											var K = h.ownerCt.ownerCt.rowRecordData;
											var C = K.locationToString;
											var t = K.accommodationRatingURI;
											var c = B.getRateToolbar();
											var a = c.items.itemAt(17).getValue();
											var u = c.items.itemAt(19).getValue();
											var k = c.items.itemAt(21).getValue();
											var d = [];
											d[0] = a;
											d[1] = u;
											var y = E.getPNRDataURI();
											var f = h.ownerCt.ownerCt.rowRecordData.supplierURI;
											var G = 24 * 3600 * 1000;
											for (var F = [], j = a * 1, o = u * 1; j < o + G; j += G) {
												F.push(new Date(j))
											}
											TDS.window.setWindow({
												title: "Accommodation Booking Confirmation",
												interfaceURI: "pnr/offerings/accommodation/go-hotusa.js",
												postDataURI: E.getPNRDataURI() + "/components",
												mergeData: true,
												dataURI: {
													pnr: E.getPNRDataURI(),
													offering: K.dataURI,
													priceCurrency: K.conversionCurrency
												},
												data: {
													offeringURI: l,
													rateURI: E.getSelectedRateURI(),
													locationToString: C,
													rateMultipleSelectedRateURI: B.getMultipleSelectedRateURI()
												},
												params: {
													ratingURI: t,
													rateName: z,
													hotusaRoomType: w,
													ratePerURI: E.getSelectedRateURI(),
													hotusa: true,
													offeringName: h.getDetail("offeringName"),
													numberToReserveRequested: x,
													hotusaId: r,
													convertedPricingPriceIsNett: i,
													pricingPriceIsNett: q,
													hotusaNoofRomms: H,
													hotusaAvailibityStatus: I,
													homeCurrencyh: A,
													priceCurrency: n,
													conpricingPriceSellHotusa: e,
													priceSell: D,
													rateMultipleSelectedRateURI: B.getMultipleSelectedRateURI(),
													finalDateNew: d,
													supplierId: f,
													daysAvailable: 1,
													numberOfNights: k,
													wholefinalDate: F,
													daysRequestable: 1
												},
												callback: {
													fn: function (M, P, L) {
														if (M) {
															var p = this.ownerCt;
															var Q = E.getPnrPanel();
															var O = Q.getViewByName("pnr");
															if (O) {
																var N = O.findByType("awesomegrid")[0];
																N.submitQuery(true)
															}
															if (!P.makeAnotherBooking) {
																Q.focusView("pnrView", "pnr")
															}
															E.expireInterface()
														}
													},
													scope: this
												}
											})
										} else {
											Ext.Msg.alert("Alert", '"As pre-payment of the Net amount for HOTUSA accommodation is required by an agent\'s credit card, an authority to charge the credit card is required before bookings can be made."')
										}
									} else {
										E.focusBookTab()
									}
								}
							}, {
								xtype: "button",
								text: "Notes",
								hidden: true,
								extras: [],
								handler: function () {
									var c = this.ownerCt.ownerCt.ownerCt.ownerCt;
									var a = c.getSelectedRateURI();
									if (!a) {
										return
									}
									var b = this.extras;
									var f = this.ownerCt.ownerCt.findParentByType("tabpanel");
									var d = f.getTabField("Rate", "datePointerIn");
									TDS.window.setWindow({
										title: "Terms and Conditions",
										interfaceURI: "popup/terms.js",
										sourceDataURI: a,
										extras: b,
										data: {
											offeringData: f.ownerCt.ownerCt.rowRecordData,
											departureDate: d.getRawValue()
										},
										buttonOK: false,
										buttonCancel: "Close"
									})
								}
							}, {
								xtype: "button",
								text: "Facilities",
								hidden: true,
								handler: function () {
									var b = this.ownerCt.ownerCt.ownerCt.ownerCt;
									var a = b.getSelectedRateURI();
									if (!a) {
										return
									}
									var d = this.ownerCt.ownerCt.findParentByType("tabpanel");
									var c = d.getTabField("Rate", "datePointerIn");
									var e = d.ownerCt.ownerCt.rowRecordData;
									if (e.supplierURI == TDS.util.Defaults.hotusaSupplier) {
										a = "accommodation/rate/" + e.code + "/amenity"
									}
									TDS.window.setWindow({
										title: "Facilities",
										interfaceURI: "popup/facilities.js",
										sourceDataURI: a + "/roomfacilities/collection",
										buttonOK: false,
										data: {
											offeringData: d.ownerCt.ownerCt.rowRecordData,
											departureDate: c.getRawValue()
										},
										buttonCancel: "Close"
									})
								}
							}, {
								xtype: "button",
								text: "Terms",
								hidden: true,
								handler: function () {
									var d = this.ownerCt.ownerCt.ownerCt.ownerCt;
									var a = d.getSelectedRateURI();
									if (!a) {
										return
									}
									var g = this.ownerCt.ownerCt.findParentByType("tabpanel");
									var h = g.ownerCt.ownerCt.rowRecordData;
									if (h.supplierURI == TDS.util.Defaults.hotusaSupplier) {
										a = "accommodation/rate/" + h.code + "/terms"
									}
									var f = g.getTabField("Rate", "datePointerIn");
									var b = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0);
									var c = b.getSelectionModel();
									var e = c.selections.items[0].data.hotusaId;
									Ext.Ajax.request({
										url: TDS.env.dataPath + a,
										jsonData: {
											hotusaId: e
										},
										method: "PUT",
										scope: this,
										callback: function (l, i, k) { ;
											var j = Ext.util.JSON.decode(k.responseText);
											TDS.window.setWindow({
												title: "Terms",
												interfaceURI: "pnr/offerings/accommodation/terms-hotusa.js",
												buttonOK: false,
												data: j,
												buttonCancel: "Close"
											})
										}
									})
								}
							}
						]
					}, {
						colspan: 2,
						tpl: new Ext.XTemplate(['<div style="height: 90px; overflow: auto; margin-top: 8px;">', '<table class="x-tds-dataview" style="width: 100%;">', "<thead>", "<tr>", '<th style="width: 20px; padding-bottom: 2px;"></th>', '<th style="padding-bottom: 2px;">Extra</th>', '<th style="width: 90px; padding-bottom: 2px;">Min. required</th>', '<th style="width: 120px; padding-bottom: 2px;">Pricing</th>', "</tr>", "</thead>", '<tpl for=".">', '<tr class="x-tds-dataview-extras-item">', '<td ><input type="checkbox" id = "{rateURI}{dataURI}" value="{dataURI}" {[values.required ?  "disabled checked" : "" ]} onclick={doWork}></td>', '<td style="width: 140px;{[values.required ? " color: gray;" : "" ]}">{nameString}</td>', "<td>{minimumInventoryRequired}</td>", '<td style="width: 140px;{[values.priceIsCredit ? " color: green;" : "" ]}">{priceFormatted}{[values.priceIsCredit ? " CR" : "" ]}</td>', "</tr>", "</tpl>", "</table>", "</div>", '<hr style="height: 1px; border: none; border-top: 1px solid #eee;"/>', '<p style="font-size: 9px;">* Extras that appear greyed out are <b>mandatory</b> extras on this rate.</p>'])
					}
				]
			}
		]
	}
}
