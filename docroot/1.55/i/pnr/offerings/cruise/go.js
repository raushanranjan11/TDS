{
	xtype: "form",
	border: false,
	width: 900,
	height: 500,
	markDataDirtyOnLoad: true,
	id: "forms",
	beforeSubmit: function (t) {
		console.log(t);
		var d = [],
		m = [],
		u = false;
		var f = this.findParentByType("awesomewindow").aw.data;
		console.log(f);
		var n = [];
		n[0] = t.rateURI;
		var g = this.getPassengerGrid().getSelectionModel().selections.items;
		console.log(g);
		var e = [];
		for (var k = 0; k < g.length; k++) {
			var s = {};
			s.rateURI = t.rateURI;
			s.passengerURI = g[k].id;
			e[k] = s
		}
		console.log(e);
		console.log(t);
		var c = [];
		var c = [];
		for (var l = 0; l < t.rateMultipleSelectedRateURI.length; l++) {
			var q = {};
			q.rateURI = t.rateMultipleSelectedRateURI[l].data.dataURI;
			q.noOfPass = 2;
			c[l] = q;
			console.log(t.rateMultipleSelectedRateURI[l]);
			n[l] = t.rateMultipleSelectedRateURI[l].data.dataURI
		}
		console.log(n);
		var o = new Date();
		o.format("mm/dd/yy");
		var h = new Array();
		h[0] = f.dateFrom;
		var r = this.findByType("tabpanel")[0].items.itemAt(0).findByType("radio")[2].getValue();
		var p = this.findByType("tabpanel")[0].items.itemAt(0).findByType("radio")[0].getValue();
		var t = {
			submitDataAsParams: true,
			paramData: {
				action: "request",
				currency: "AUD",
				componentFrom: "CRUISE"
			},
			data: {
				rateURI: f.rateURI,
				rateMultipleSelectedRateURI: n,
				offeringURI: f.offeringURI,
				inventoryAmount: 1,
				dateFrom: f.dateFrom,
				duration: 1,
				passengerURIs: e,
				bookedDate: h,
				noOfPer: ["2"],
				noOfPerPerRate: c
			}
		};
		return t
	},
	requireStores: [{
			dataURI: TDS.env.dataPath + "countries/collection",
			identifier: "countries",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "rate/classes/collection",
			identifier: "rate/classes",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "accommodation/inventorytypes/collection",
			identifier: "accommodation/inventorytypes",
			fields: ["name", "displayName", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "rate/basises/collection",
			identifier: "rate/basises",
			fields: ["name", "dataURI"]
		}
	],
	initPassengerSelection: function () {
		var a = this.ownerCt;
		var b = this.getPassengerGrid();
		var d = this.getDetail("paxType");
		var c = this.getDetail("numberOfPaxRequired");
		b.getStore().on("load", function () {
			var e = b.preselect(d, c)
		}, this)
	},
	getPassengerTab: function () {
		return this.items.itemAt(1).items.itemAt(1)
	},
	getPassengerGrid: function () {
		return this.getPassengerTab().items.itemAt(1).items.itemAt(0)
	},
	items: [{
			xtype: "timerlabel",
			text: "This availability will expire in...",
			listeners: {
				timerexpire: function (a) {
					this.setText("Your availability has expired.")
				},
				timerrefresh: function (a, b) {
					this.setText("This availability will expire in... <b>" + b + "</b>.", false)
				}
			}
		}, {
			xtype: "tabpanel",
			border: false,
			activeTab: 0,
			layoutOnTabChange: true,
			deferredRender: false,
			width: 900,
			height: 475,
			defaults: {
				bodyStyle: "padding: 0px 2px 0px 0px;"
			},
			items: [{
					title: "Review",
					autoScroll: true,
					items: {
						xtype: "panel",
						layout: "anchor",
						frame: true,
						height: 445,
						labelWidth: 80,
						border: false,
						defaults: {
							border: false,
							bodyStyle: "padding: 0px 5px 0px 0px;"
						},
						items: [{
								xtype: "grid",
								width: 880,
								height: 150,
								enableColumnHide: false,
								enableColumnMove: false,
								enableColumnResize: false,
								enableHdMenu: false,
								tbar: [{
										xtype: "textfield",
										name: "cabinNumber",
										hidden: true,
										excludeFromSession: true,
										enableKeyEvents: true,
										width: 150
									}
								],
								viewConfig: {
									forceFit: true
								},
								store: new Ext.data.JsonStore({
									id: "dataURI",
									fields: ["pricingPriceSell", "name", "catName", "deck", "maximumOccupancy", "dataURI", "pinned", "cabinNumber", "position", "capacity", "conversionCurrency", "convertedPricingPriceSell", "convertedPricingPriceIsNett", "convertedPricingPriceCommission", "connect", "obstruct", "berths", "rollaway", "cabinStatus", "crib", "catStatus", "cabinTypeText", "packagePrice", "room", "adult", "access", "child", "infant", "cons", "priceDouble", "priceSingle", "priceTriple", "priceQuad"]
								}),
								sm: new Ext.grid.RowSelectionModel(),
								columns: [{
										header: "Grade",
										dataIndex: "name",
										sortable: true,
										renderer: function (e, d, a, f, c, b) {
											return e.substring(0, e.indexOf("-")).trim()
										}
									}, {
										header: "Category",
										dataIndex: "name",
										sortable: true,
										renderer: function (e, d, a, f, c, b) {
											return e.substring(e.indexOf("-") + 1, e.length).trim()
										}
									}, {
										header: "Stateroom",
										dataIndex: "room",
										sortable: true
									}, {
										header: "Deck",
										dataIndex: "deck",
										sortable: true
									}, {
										header: "Connect",
										dataIndex: "connect",
										sortable: true
									}, {
										header: "Berth",
										dataIndex: "berths",
										sortable: true
									}, {
										header: "Price",
										dataIndex: "convertedPricingPriceSell",
										sortable: true,
										renderer: function (f, e, a, g, d, c) {
											var b = a.get("adult") + a.get("access") + a.get("child") + a.get("cons") + a.get("infant");
											if (b == 2) {
												return a.get("priceDouble")
											}
											if (b == 1) {
												return a.get("priceSingle")
											}
											if (b == 3) {
												return a.get("priceTriple")
											}
											if (b == 4) {
												return a.get("priceQuad")
											}
										}
									}, {
										header: "Status",
										dataIndex: "cabinStatus",
										sortable: true,
										renderer: function (e, d, a, h, c, b) {
											var g = a.get("name");
											var f = a.get("name").substring(g.indexOf("-") + 1, g.length).trim();
											if (f == "Inside") {
												return "RQ"
											}
											if (f == "Balcony") {
												return "OK"
											}
										}
									}
								],
								listeners: {
									render: function () { ;
										var f = this.ownerCt.findParentByType("awesomewindow");
										console.log(f);
										var e = f.getParam("selectedCabin");
										console.log(e);
										var b = f.getParam("paxdetails");
										var a = [];
										a.push(JSON.parse((JSON.stringify(e) + JSON.stringify(b)).replace(/}{/g, ",")));
										console.log(a);
										this.getStore().loadData(a)
									}
								}
							}, {
								html: " ",
								border: false,
								height: 2
							}, {
								xtype: "panel",
								layout: "table",
								border: false,
								width: 880,
								layoutConfig: {
									columns: 3
								},
								defaults: {
									border: false,
									bodyStyle: "padding: 7px 7px 0px 0px;"
								},
								items: [{
										xtype: "panel",
										style: "margin-left:200px;",
										width: 250,
										items: [{
												xtype: "fieldset",
												style: "margin-top: 20px;",
												layout: "table",
												layoutConfig: {
													columns: 2
												},
												autoHeight: true,
												defaults: {
													colspan: 2,
													xtype: "radio",
													name: "action",
													forceSubmit: true,
													hideLabel: true
												},
												items: [{
														boxLabel: "Book available",
														inputValue: "book"
													}, {
														colspan: 1,
														boxLabel: "Request",
														inputValue: "request",
														hidden: true,
														handler: function (c, a) {
															var b = this.ownerCt.items.itemAt(2);
															if (a) {
																b.enable().focus()
															} else {
																b.disable()
															}
														}
													}, {
														colspan: 1,
														xtype: "datefield",
														name: "releaseDate",
														hidden: true,
														disabled: true,
														showToday: false,
														width: 80,
														format: TDS.env.dateFormatDisplay,
														minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime(),
														listeners: {
															render: function () {
																var a = Ext.TimerMgr.getServerCalculatedDate().add(Date.DAY, 28);
																this.setValue(a)
															}
														}
													}
												]
											}
										]
									}, {
										xtype: "panel",
										width: 250,
										items: [{
												xtype: "fieldset",
												style: "margin-top: 20px;margin-left:25px;",
												layout: "table",
												layoutConfig: {
													columns: 2
												},
												autoHeight: true,
												defaults: {
													colspan: 2,
													xtype: "radio",
													name: "action",
													forceSubmit: true,
													hideLabel: true
												},
												items: [{
														boxLabel: "Quote only",
														inputValue: "quote",
														listeners: {
															check: function () {}
														}
													}
												]
											}
										]
									}
								]
							}, {
								html: "<b>Term & Conditions</b>",
								style: "padding-left:50px;"
							}, {
								xtype: "textarea",
								style: "margin-left:50px;",
								width: 800,
								height: 140
							}
						],
						beforeSubmit: function (v) {
							var n = this.ownerCt.findParentByType("awesomewindow"); ;
							var u = this.findParentByType("awesomewindow");
							u.clearValidation();
							var j = new Date();
							var m = u.getParam("selectedCabin");
							var B = "";
							var x = "";
							if (typeof m != "undefined" && m != "") {
								B = u.getParam("selectedCabin").cabinId;
								x = m.selectedcabin.length
							} else {
								x = 1
							}
							var d = this.ownerCt.items.itemAt(0).items.itemAt(3).items.itemAt(0);
							var A = d.getSelectionModel().getSelections();
							var l = this.ownerCt.items.itemAt(0).items.itemAt(0);
							var p = l.store.data.items;
							var k = [];
							for (var y = 0; y < p.length; y++) {
								k[y] = p[y].data
							}
							v.cabinlist = k;
							var r = [];
							for (var s = 0; s < A.length; s++) {
								r[s] = A[s].data
							}
							v.sittings = r;
							var o = [];
							var t = [];
							t[0] = v.rateURI;
							for (var s = 0; s < t.length; s++) {
								var z = {};
								z.rateURI = v.rateURI;
								z.noOfPass = x;
								o[s] = z
							}
							try {
								var q = {};
								this.validateBooking(v);
								var v = {
									submitDataAsParams: true,
									paramData: {
										action: "book",
										currency: n.getData("priceCurrency")
									},
									data: {
										rateURI: n.getData("rateURI"),
										rateMultipleSelectedRateURI: t,
										offeringURI: n.getData("offeringURI"),
										inventoryAmount: x,
										dateFrom: n.getData("dateFrom"),
										duration: 1,
										timeheldDate: j,
										cabinlist: k,
										sittings: r,
										selectedCabinId: B,
										noOfPerPerRate: o,
										passengerURIs: this.getPassengerGrid().getData(),
										selectedNonMandatoryExtras: TDS.data[u.getParam("rateId")],
										releaseDate: v.action == "request" ? v.releaseDate : ""
									}
								};
								return v
							} catch (w) {
								u.showValidation(w);
								return false
							}
						},
						validateBooking: function (a) { ;
							var c = this.getPassengerGrid();
							var d = this.getDetail("numberOfPaxRequired");
							var b = c.getSelectionModel().getCount();
							if (b < d) {
								throw "You must select " + (d - b) + " passengers to complete this booking."
							}
							if (!a.action) {
								throw "You must select an available booking option to proceed."
							}
						},
						shared: {
							details: {}
						},
						setDetail: function (a, b) {
							if (typeof a == "object") {
								for (var c in a) {
									this.shared.details[c] = a[c]
								}
							} else {
								this.shared.details[a] = b
							}
						},
						getDetail: function (a) {
							return this.shared.details[a]
						},
						initBooking: function () {},
						initPassengerSelection: function () {
							var a = this.ownerCt;
							var b = this.getPassengerGrid();
							var d = this.getDetail("paxType");
							var c = this.getDetail("numberOfPaxRequired");
							b.getStore().on("load", function () {
								var e = b.preselect(d, c)
							}, this)
						},
						getPassengerTab: function () {
							return this.ownerCt.ownerCt.items.itemAt(1)
						},
						getDataURI: function () {
							return this.findParentByType("awesomewindow").baseDataURI
						},
						getPassengerGrid: function () {
							return this.getPassengerTab().items.itemAt(1).items.itemAt(0)
						},
						initRadioButtons: function (a) {
							var h = this.findParentByType("awesomewindow");
							var b = h.getParam("daysAvailable");
							var f = h.getParam("daysRequestable");
							var g = this.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).findByType("fieldset")[0];
							var d = g.items.itemAt(0);
							var c = g.items.itemAt(1);
							var e = g.items.itemAt(2);
							if (b > 0) {
								d.show()
							}
							if (f > 0) {
								c.show()
							}
						},
						listeners: {
							click: function () {},
							render: function () {
								this.initBooking();
								this.initRadioButtons();
								this.initPassengerSelection()
							}
						}
					}
				}, {
					title: "Passengers",
					items: [{
							xtype: "panel",
							border: false,
							style: "margin-bottom: 6px;",
							html: "<p>Please select the passengers for this booking below.</p>",
							listeners: {
								beforerender: function () {}
							}
						}, {
							xtype: "panel",
							border: false,
							layout: "fit",
							items: [{
									xtype: "editorgrid",
									height: 210,
									clicksToEdit: 1,
									store: new Ext.data.CollectionStore({
										url: "",
										identifier: "",
										fields: ["type", "code", "nameFirst", "nameLast", "salutation", "displayName", "dateOfBirth", "paxAge", "dataURI"]
									}),
									viewConfig: {
										forceFit: true
									},
									getData: function () {
										var a = this.selModel.getSelections();
										var b = [];
										for (var c = 0; c < a.length; c++) {
											b[c] = a[c].get("dataURI")
										}
										return b
									},
									preselect: function (b, a) {
										var c = [];
										this.getStore().each(function (d) {
											if (c.length >= a) {
												return false
											}
											if ((!b || d.get("type") == b) && d.get("nameFirst") && d.get("nameLast")) {
												c[c.length] = d
											}
										}, this);
										if (c.length > 0) {
											this.getSelectionModel().selectRecords(c)
										}
										return c.length
									},
									validatePassenger: function (d, a, c, b) {
										if (!b.get("nameFirst") && !b.get("nameLast")) {
											return false
										}
									},
									sm: new Ext.grid.CheckboxSelectionModel(),
									columns: [new Ext.grid.CheckboxSelectionModel(), {
											header: "Last name",
											dataIndex: "nameLast",
											editor: new Ext.form.TextField({
												allowBlank: false
											}),
											renderer: function (e, b, a, d, f, c) {
												return e.substr(0, 1).toUpperCase() + e.substr(1)
											}
										}, {
											header: "First name",
											dataIndex: "nameFirst",
											editor: new Ext.form.TextField({
												allowBlank: false,
												fieldStyle: "text-transform:uppercase"
											}),
											renderer: function (a, c, b) {
												return a.substr(0, 1).toUpperCase() + a.substr(1)
											}
										}, {
											header: "Title",
											dataIndex: "salutation",
											width: 40,
											fixed: true,
											editor: new Ext.form.ComboBox({
												store: TDS.data.salutations,
												editable: false,
												forceSelection: true,
												mode: "local",
												triggerAction: "all",
												displayField: "text",
												valueField: "text"
											})
										}, {
											header: "Type",
											dataIndex: "type",
											width: 60,
											fixed: true,
											editor: new Ext.form.ComboBox({
												editable: false,
												forceSelection: true,
												mode: "local",
												displayField: "text",
												valueField: "text",
												triggerAction: "all",
												tpl: '<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',
												store: TDS.data.passengerType
											})
										}, {
											header: "DOB",
											dataIndex: "dateOfBirth",
											width: 70,
											fixed: true,
											editor: new Ext.form.DateField({
												allowBlank: false
											}),
											renderer: function (a, d, c) {
												if (typeof a != "undefined") {
													if (typeof a != "string") {
														var b = new Date();
														b.setTime(Ext.TimerMgr.getServerCalculatedTime());
														var e = Math.floor((b.getTime() - a.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
														c.set("paxAge", ((e && e > 0) ? e : ""));
														return Ext.util.Format.date(a, TDS.env.dateBirthdayFormatDisplay)
													} else {
														if (c.get("paxAge")) {
															var e = TDS.util.Format.age(a);
															c.set("paxAge", ((e && e > 0) ? e : ""))
														}
														return TDS.util.Format.dateSpecial(a, TDS.env.dateBirthdayFormatDisplay)
													}
												}
												return TDS.util.Format.dateSpecial(a, TDS.env.dateBirthdayFormatDisplay)
											}
										}, {
											header: "Age",
											dataIndex: "paxAge",
											renderer: function (b, a, c) {
												if (b) {
													return b
												} else {
													return TDS.util.Format.age(c.get("dateOfBirth"))
												}
											},
											editor: new Ext.form.TextField({
												allowBlank: false
											})
										}
									],
									bbar: [{
											xtype: "button",
											text: "Add",
											id: "add",
											handler: function () {
												var b = this.ownerCt.items.itemAt(1);
												var a = this.ownerCt.items.itemAt(2);
												a.enable();
												b.enable();
												this.disable();
												var d = this.findParentByType("editorgrid");
												var c = d.getStore();
												c.add([new c.recordType({
															type: "AD",
															nameFirst: "",
															nameLast: ""
														})]);
												d.newRecordIndex = c.getCount() - 1;
												d.startEditing(d.newRecordIndex, 2);
												d.getSelectionModel().selectRow(d.newRecordIndex)
											}
										}, {
											xtype: "button",
											text: "Cancel",
											disabled: true,
											handler: function () {
												var c = this.ownerCt.items.itemAt(0);
												var b = this.ownerCt.items.itemAt(2);
												c.enable();
												b.disable();
												var d = this.ownerCt.ownerCt;
												var a = d.getStore().getAt(d.newRecordIndex);
												if (a == -1 || typeof a.get("dataURI") != "undefined") {
													return
												}
												d.getStore().remove(a);
												this.disable()
											}
										}, {
											xtype: "button",
											text: "Save",
											disabled: true,
											handler: function () {
												var c = this.ownerCt.findParentByType("awesomewindow");
												var b = this.ownerCt.ownerCt;
												var e = this.ownerCt.items.itemAt(0);
												var d = this.ownerCt.items.itemAt(1);
												d.disable();
												this.disable();
												var k = b.getSelectionModel().getSelections();
												var a = "",
												i = "";
												if (k.length == 1) {
													if (typeof k[0].get("dataURI") != "undefined") {
														a = "PUT",
														i = TDS.env.dataPath + k[0].get("dataURI")
													} else {
														a = "POST",
														i = TDS.env.dataPath + c.getDataURI("pnr") + "/passengers"
													}
												}
												Ext.Ajax.request({
													url: i,
													jsonData: k[0].data,
													method: a,
													callback: function (f, g, h) {
														if (g) {
															b.getStore().load();
															e.enable()
														} else {
															d.enable();
															this.enable()
														}
													},
													scope: this
												})
											}
										}, {
											xtype: "button",
											text: "Additional Info",
											handler: function (i) {
												var c = this.ownerCt.findParentByType("awesomewindow");
												var h = this.ownerCt.ownerCt;
												var b = h.getStore().getAt(h.newRecordIndex);
												var a = "";
												var f = this.ownerCt.ownerCt.getSelectionModel().selections;
												if (f.length == 1) {
													a = f.items[0].get("dataURI")
												}
												var d = this.ownerCt.findParentByType("form");
												TDS.innerWindow.setWindow({
													height: 300,
													width: 200,
													autoDestroy: false,
													title: "Passenger Profile",
													interfaceURI: "pnr/passenger/passengerDetails.js",
													sourceDataURI: a,
													destinationDataURI: a,
													closeAction: "hide",
													buttonOK: "Submit",
													callback: {
														fn: function (g, j, e) {},
														scope: this
													}
												})
											}
										}
									],
									listeners: {
										beforeedit: function (a) {},
										render: function () {
											var w = this.ownerCt.findParentByType("awesomewindow");
											with (this.store) {
												reader.meta.identifier = w.getDataURI("pnr") + "/passengers";
												proxy.conn.url = TDS.env.dataPath + w.getDataURI("pnr") + "/passengers/concise";
												load()
											}
										},
										rowdblclick: function (f, d, h) {
											var b = this.getStore().getAt(d);
											var k = this.ownerCt.findParentByType("awesomewindow");
											console.log(b);
											console.log(d);
											console.log(this.getStore());
											TDS.session.setByPath(k.getDataURI("pnr"), {
												view: "pnrView",
												option: "passenger",
												focusRecord: b.get("dataURI")
											});
											var i = "";
											if (b.get("primaryPassengerName") != null && b.get("primaryPassengerName") != "") {
												i = " (" + b.get("primaryPassengerName") + ")"
											}
											var a = k.getDataURI("pnr") + i;
											var l = "pnr.js";
											var o = k.getDataURI("pnr");
											var p = k.getDataURI("pnr");
											var n = p;
											if (TDS.workArea.isTabReady("pnr.js", o)) {
												var j = TDS.workArea.getTab("pnr.js", o);
												var c = j.items.itemAt(0).items.itemAt(0);
												var m = c.getPassengerNameRecordPanel();
												if (m.isViewRendered("passenger")) {
													m.focusView("pnrView", "passenger");
													var f = m.getView().findByType("awesomegrid")[0];
													f.focusResult(b.get("dataURI"), false, true)
												} else {
													m.focusView("pnrView", "passenger")
												}
											}
											TDS.workArea.openTab(o, "pnr.js", o, o);
											k.hide()
										}
									}
								}
							]
						}
					]
				}
			],
			id: "tab",
			listeners: {
				beforetabchange: function (a, c, b) {
					if (c.hidden) {
						c.setTitle('<font color="green">' + a.getTabEl(c).textContent + "</font>")
					}
					if (b != null) {
						b.setTitle('<font color="#15428b">' + a.getTabEl(b).textContent + "</font>")
					}
				},
				tabchange: function (b, a) {},
				render: function () {}
			}
		}
	]
}
