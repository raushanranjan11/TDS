{
	xtype: "form",
	height: 425,
	width: 800,
	border: false,
	fieldMap: {
		rateClass: "rateClassURI",
		ratePer: "ratePerURI",
		rateOccupancy: "rateOccupancyURI",
		defaultMaxHoldTimeSeconds: ["defaultMaxHoldTimeHours", "defaultMaxHoldTimeMinutes"]
	},
	beforeSubmit: function (a) {
		var b = [],
		c = [],
		d = [];
		Ext.getCmp("pan1").items.items.forEach(function (e) {
			if (e.getValue()) {
				b.push(e.boxLabel)
			}
		});
		a.position = b.toString();
		a.locations = c.toString();
		a.deck = d.toString();
		a.defaultMaxHoldTimeSeconds = 0;
		if (typeof a.defaultMaxHoldTimeHours === "number") {
			a.defaultMaxHoldTimeSeconds += parseInt(a.defaultMaxHoldTimeHours) * 60 * 60
		}
		if (typeof a.defaultMaxHoldTimeMinutes === "number") {
			a.defaultMaxHoldTimeSeconds += parseInt(a.defaultMaxHoldTimeMinutes) * 60
		}
		if (isNaN(a.defaultMaxHoldTimeSeconds) || a.defaultMaxHoldTimeSeconds == 0) {
			delete a.defaultMaxHoldTimeSeconds
		}
		return a
	},
	beforeDataLoad: function (a) {
		var b = a.defaultMaxHoldTimeSeconds;
		a.defaultMaxHoldTimeHours = Math.floor(parseInt(a.defaultMaxHoldTimeSeconds) / 60 / 60);
		if (a.defaultMaxHoldTimeHours > 0) {
			b -= a.defaultMaxHoldTimeHours * 60 * 60
		}
		a.defaultMaxHoldTimeMinutes = b / 60;
		if (a.agencyURI) {
			a.rateAvailableForAgencyOnly = true
		}
		return a
	},
	items: [{
			xtype: "tabpanel",
			activeTab: 0,
			layoutOnTabChange: true,
			height: 420,
			defaults: {
				bodyStyle: "padding: 6px 4px 6px 4px;"
			},
			items: [{
					title: "Details",
					items: [{
							xtype: "panel",
							layout: "form",
							frame: true,
							border: false,
							labelWidth: 95,
							defaults: {},
							items: [{
									xtype: "panel",
									style: "padding-bottom: 4px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 6
									},
									defaults: {
										border: false
									},
									items: [
										/*	{
											html: "Category:",
											width: 80
										}, {
											xtype: "textfield",
											name: "name",
											emptyText: "E!",
											width: 120
										}, {
											width: 20,
											border: false
										},
												*/
												
											{
											width: 70,
											html: " Category :"
										}, {
											xtype: "textfield",
											name: "code",
											width: 75
										},
												{
											width: 20,
											border: false
										},


												{
											html: "Category Descr:",
											width: 80
										}, {
											xtype: "textfield",
											name: "name",
											emptyText: "E!",
											width: 120
										}, 
									]
								}, {
									xtype: "panel",
									style: "padding-bottom: 4px;padding-top:10px;",
									border: false,
									layout: "table",
									height: 205,
									layoutConfig: {
										columns: 3
									},
									defaults: {
										border: true
									},
									items: [{
											xtype: "label",
											text: "Decks :",
											style: "padding-left:25px;padding-top:20px;"
										}, {
											xtype: "label",
											text: "Position :",
											style: "padding-left:45px;padding-top:20px;"
										}, {
											border: false
										}, {
											xtype: "panel",
											bodyStyle: "padding-left:15px;",
											autoScroll: true,
											width: 105,
											height: 110,
											style: "    position: relative; bottom:0px;margin-left:10px; ",
											listeners: {
												render: function (a) {
													this.body.setStyle("background", "white")
												},
												afterlayout: function (b, a) {
													var c = this.findParentByType("awesomewindow").getData("deck").split(",");
													this.items.items.forEach(function (d) {
														c.forEach(function (e) {
															if (d.boxLabel == e) {
																d.setValue(true)
															}
														})
													})
												}
											}
										}, {
											xtype: "panel",
											width: 135,
											bodyStyle: "padding-left:10px;",
											height: 110,
											autoScroll: true,
											style: "    position: relative;  margin-left:20px; ",
											items: [{
													boxLabel: "Aft",
													xtype: "checkbox",
													inputValue: "Aft"
												}, {
													boxLabel: "Mid Ship",
													xtype: "checkbox",
													inputValue: "Mid Ship"
												}, {
													boxLabel: "Forward",
													xtype: "checkbox",
													inputValue: "Forward"
												}, {
													boxLabel: "Mid Ship / Forward",
													xtype: "checkbox",
													inputValue: "Mid Ship / Forward"
												}, {
													boxLabel: "Mid Ship / Aft",
													xtype: "checkbox",
													inputValue: "Mid Ship / Aft"
												}, {
													boxLabel: "Mid Ship/ Forward",
													xtype: "checkbox",
													inputValue: "Mid Ship/ Forward"
												}, {
													boxLabel: "Mid Ship/ Aft",
													xtype: "checkbox",
													inputValue: "Mid Ship/ Aft"
												}
											],
											listeners: {
												render: function () {
													this.body.setStyle("background", "white")
												}
											}
										}
									]
								}, {
									xtype: "combo",
									name: "pax",
									fieldLabel: "Pax ",
									mode: "local",
									width: 70,
									triggerAction: "all",
									editable: false,
									displayField: "name",
									valueField: "dataURI",
									tpl: TDS.util.Templates.ComboNoLabel,
									store: new Ext.data.SimpleStore({
										fields: ["name", "dataURI"],
										data: [["1st Pax", "1"], ["2nd Pax", "2"], ["3rd Pax", "3"], ["4th Pax", "4"], ["5th Pax", "5"], ["6th Pax", "6"]]
									})
								}, {
									xtype: "textfield",
									fieldLabel: "Fare Code",
									name: "priceCode",
									width: 60
								}, {
									xtype: "panel",
									style: "padding: 0px 0px 4px 0px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 3
									},
									defaults: {
										border: false
									},
									items: [{
											xtype: "checkbox",
											name: "active",
											fieldLabel: "Active",
											boxLabel: "Active",
											inputValue: true,
											width: 100
										}, {
											xtype: "checkbox",
											name: "special",
											fieldLabel: "Special",
											boxLabel: "Special",
											inputValue: "true"
										}
									]
								}, {
									xtype: "panel",
									style: "padding: 0;",
									border: false,
									style: "padding: 0; margin-top: 4px;",
									layout: "table",
									layoutConfig: {
										columns: 5
									},
									defaults: {
										border: false
									},
									items: [{
											html: "Inventory Max. hold time:",
											width: Ext.isIE ? 100 : 100
										}, {
											xtype: "omnicrementer",
											name: "defaultMaxHoldTimeHours",
											maxValue: 23
										}, {
											html: "hours",
											bodyStyle: "padding: 0 4px;"
										}, {
											xtype: "omnicrementer",
											name: "defaultMaxHoldTimeMinutes",
											maxValue: 59
										}, {
											html: "minutes",
											bodyStyle: "padding: 0 4px;"
										}
									]
								}, {
									xtype: "panel",
									style: "padding: 0; margin-top: 4px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 3
									},
									defaults: {
										border: false
									},
									items: [{
											html: "Cut-off time:",
											width: Ext.isIE ? 100 : 100
										}, {
											xtype: "omnicrementer",
											name: "defaultCutoffTimeDays",
											value: 0,
											forceSubmit: true,
											maxValue: 30
										}, {
											html: "days",
											bodyStyle: "padding: 0 4px;"
										}
									]
								}
							]
						}
					]
				}, {
					title: "Pricing",
					items: [{
							xtype: "panel",
							layout: "fit",
							frame: true,
							height: 125,
							width: 785,
							style: "padding-top: 10px; margin-bottom: 2px;",
							border: true,
							items: [{
									xtype: "editorgrid",
									id: "pricingtab",
									border: true,
									clicksToEdit: 1,
									multiSelect: true,
									autoWidth: true,
									width: 750,
									sm: new Ext.grid.CheckboxSelectionModel({
										singleSelect: true,
										checkOnly: true
									}),
									store: new Ext.data.JsonStore({
										url: "",
										id: "dataURI",
										identifier: "deals",
										fields: ["dataURI", "name", "currency", "interior", "ocean", "balcony", "suite", "expireDate", "dealDescr", "comm",
											"category"],
										data: [{
												name: "Standard",
												currency: "AUD",
												interior: "",
												ocean: "",
												balcony: "",
												suite: "",
												expireDate: "",
												category: "Interior"
											}
										]
									}),
									cm: new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
												checkOnly: true
											}), {
												header: "Category",
												dataIndex: "category",
												width: 80,
												editor: new Ext.form.ComboBox({
													store: TDS.data.category,
													forceSelection: true,
													mode: "local",
													triggerAction: "all",
													displayField: "text",
													valueField: "text"
												})
											}, {
												header: "Deals",
												dataIndex: "name",
												width: 100,
												editor: new Ext.form.ComboBox({
													store: TDS.data.deals,
													editable: false,
													forceSelection: true,
													mode: "local",
													triggerAction: "all",
													displayField: "text",
													valueField: "text"
												})
											}, {
												header: "Curr",
												dataIndex: "currency",
												width: 40,
												editor: new Ext.form.TextField({})
											}, {
												header: "Single",
												dataIndex: "interior",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("interior")).toFixed(2) : ""
												}
											}, {
												header: "Double",
												dataIndex: "ocean",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("ocean")).toFixed(2) : ""
												}
											}, {
												header: "Triple",
												dataIndex: "balcony",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("balcony")).toFixed(2) : ""
												}
											}, {
												header: "Quad",
												dataIndex: "suite",
												width: 80,
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("suite")).toFixed(2) : ""
												}
											}, {
												header: "Expires",
												dataIndex: "expireDate",
												editor: new Ext.form.DateField({
													format: "dMy"
												})
											}, {
												header: "Comm",
												dataIndex: "comm",
												renderer: function (c, b, a) {
													return '<button>  <input type="image" id = "editCell" src="images/grid/edit.png"> </button>'
												}
											}
										]),
									listeners: {
										render: function (b) {
											var a = Ext.decode(b.ownerCt.ownerCt.findParentByType("awesomewindow").aw.data.cruiseDeals);
											var c = []
										},
										rowclick: function (b, d, c) {
											var a = b.getStore().getAt(d);
										},
										cellclick: function (c, f, a, d) {
											if (a == 9) {
												var win = new Ext.Window({
														width: 400,
														height: 150,
														title: 'Comm',
														autoScroll: true,
														modal: true,
														items: [{
																xtype: "panel",
																border: true,
																height: 105,
																frame: true,
																layout: "table",
																layoutConfig: {
																	columns: 3
																},
																style: 'margin-top:5px;',
																labelWidth: 90,
																items: [{
																		width: 100,
																		border: false,
																	}, {
																		xtype: "combo",
																		width: 150,
																	}, {
																		border: false,
																	}, {
																		html: "Commission Amount:",
																		border: false,
																		width: 150,
																		style: "margin-top: 5px;"
																	}, {
																		xtype: "textfield",
																		width: 150,
																		style: "margin-top: 5px;"
																	}, {
																		border: false,
																	}, {
																		border: false,
																	}, {
																		html: '<b>or</b>',
																		border: false,
																	}, {
																		border: false,
																	}, {
																		border: false,
																	}, {
																		xtype: "panel",
																		layout: "column",
																		items: [{
																				width: 100,
																				border: false,
																			}, {
																				xtype: "textfield",
																				width: 100
																			}, {
																				border: false,
																				html: "%"
																			}, ]
																	}, {
																		border: false,
																	}
																]
															}, ]
													}).show();
											}
										}
									}
								}
							],
							bbar: [{
									xtype: "button",
									text: "Delete",
									handler: function () {
										var a = this.ownerCt.ownerCt.findByType("editorgrid")[0];
										var b = a.getSelectionModel().getSelections();
										if (b.length == 1) {
											Ext.Ajax.request({
												url: TDS.env.dataPath + "cruise/offering/" + b[0].get("dataURI"),
												callback: function (d, e, f) {
													if (e) {
														a.getStore().remove(b[0])
													} else {}
												},
												scope: this
											})
										}
									}
								}
							]
						}, {
							xtype: "panel",
							layout: "fit",
							frame: true,
							height: 175,
							width: 785,
							style: "padding-top: 10px; margin-bottom: 2px;",
							border: true,
							items: [{
									xtype: "editorgrid",
									border: true,
									clicksToEdit: 1,
									multiSelect: true,
									autoWidth: true,
									width: 750,
									sm: new Ext.grid.CheckboxSelectionModel({
										singleSelect: true,
										checkOnly: true
									}),
									store: new Ext.data.JsonStore({
										url: "",
										id: "dataURI",
										identifier: "deals",
										fields: ["dataURI", "name", "currency", "interior", "ocean", "balcony", "suite", "expireDate", "dealDescr", "comm", "category"]
									
										/*
										data: [{
												name: "Standard",
												currency: "AUD",
												interior: "",
												ocean: "",
												balcony: "",
												suite: "",
												expireDate: "",
												category: "Interior"
											}
										]

											*/
									}),
									cm: new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
												checkOnly: true
											}), {
												header: "Category",
												dataIndex: "category",
												editor: new Ext.form.ComboBox({
													store: TDS.data.category,
													forceSelection: true,
													mode: "local",
													triggerAction: "all",
													displayField: "text",
													valueField: "text"
												})
											}, {
												header: "Type",
												dataIndex: "name",
												width: 100,
											}, {
												header: "Deck",
												dataIndex: "currency",
													width: 80,
											}, {
												header: "Position",
													width: 80,
												dataIndex: "interior",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("interior")).toFixed(2) : ""
												}
											}, {
												header: "Upgrade Details",
												width: 310,
												dataIndex: "ocean",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("ocean")).toFixed(2) : ""
												}
											}, {
												header: "Status",width: 60,
												dataIndex: "balcony",
												editor: new Ext.form.TextField({}),
												renderer: function (f, d, e) {
													return f != "" ? parseFloat(e.get("balcony")).toFixed(2) : ""
												}
											}, ]),
									listeners: {
										render: function (b) {},
										rowclick: function (b, d, c) {
											var a = b.getStore().getAt(d);
										},
										cellclick: function (c, f, a, d) {
											if (a == 9) {
												var win = new Ext.Window({
														width: 400,
														height: 150,
														title: 'Comm',
														autoScroll: true,
														modal: true,
														items: [{
																xtype: "panel",
																border: true,
																height: 105,
																frame: true,
																layout: "table",
																layoutConfig: {
																	columns: 3
																},
																style: 'margin-top:5px;',
																labelWidth: 90,
																items: [{
																		width: 100,
																		border: false,
																	}, {
																		xtype: "combo",
																		width: 150,
																	}, {
																		border: false,
																	}, {
																		html: "Commission Amount:",
																		border: false,
																		width: 150,
																		style: "margin-top: 5px;"
																	}, {
																		xtype: "textfield",
																		width: 150,
																		style: "margin-top: 5px;"
																	}, {
																		border: false,
																	}, {
																		border: false,
																	}, {
																		html: '<b>or</b>',
																		border: false,
																	}, {
																		border: false,
																	}, {
																		border: false,
																	}, {
																		xtype: "panel",
																		layout: "column",
																		items: [{
																				width: 100,
																				border: false,
																			}, {
																				xtype: "textfield",
																				width: 100
																			}, {
																				border: false,
																				html: "%"
																			}, ]
																	}, {
																		border: false,
																	}
																]
															}, ]
													}).show();
											}
										}
									}
								}
							],
							bbar: [{
									xtype: "button",
									text: "Add",
									id: "ss",
									handler: function () {
										var b = this.ownerCt.ownerCt.findByType("editorgrid")[0];
										var a = b.getStore();
										a.add([new a.recordType({
													name: "Standard",
													category: "Interior"
												})]);
										b.newRecordIndex = a.getCount() - 1;
										b.startEditing(b.newRecordIndex, 1);
										b.getSelectionModel().selectRow(b.newRecordIndex)
									}
								}, {
									xtype: "button",
									text: "Cancel",
									handler: function () {
										var b = this.ownerCt.ownerCt.findByType("editorgrid")[0];
										var a = b.getStore().getAt(b.newRecordIndex);
										if (a == -1 || typeof a.get("dataURI") != "undefined") {
											return
										}
										b.getStore().remove(a)
									}
								}, {
									xtype: "button",
									text: "Delete",
									handler: function () {
										var a = this.ownerCt.ownerCt.findByType("editorgrid")[0];
										var b = a.getSelectionModel().getSelections();
										if (b.length == 1) {
											Ext.Ajax.request({
												url: TDS.env.dataPath + "cruise/offering/" + b[0].get("dataURI"),
												callback: function (d, e, f) {
													if (e) {
														a.getStore().remove(b[0])
													} else {}
												},
												scope: this
											})
										}
									}
								}
							]
						}, {
							xtype: "panel",
							border: false,
							style: "padding-top:5px;",
							height: 105,
							items: [{
									height: 70,
									xtype: "textarea",
									name: "deals_description",
									id: "deal",
									width: 785,
								}
							]
						}
					]
				}, {
					title: "CUG",
					items: [{
							xtype: "panel",
							layout: "auto",
							height: 375,
							frame: true,
							items: [{
									xtype: "panel",
									layout: "table",
									border: false,
									hideBorders: true,
									showLoadMask: false,
									layoutConfig: {
										columns: 5
									},
									initAgency: function () {
										var a = this.getAgencyURIField().getValue();
										if (a) {
											this.showLoadMask = true;
											this.lookupAgencyByURI(a)
										}
									},
									lookupAgencyByURI: function (a) {
										this.lookupAgency(false, a)
									},
									lookupAgencyByAgencyArenaCode: function (a) {
										this.lookupAgency(a, false)
									},
									lookupAgency: function (a, c) {
										if (this.showLoadMask) {
											this.el.mask("", "x-mask-loading")
										}
										var b = {};
										if (a) {
											b.agencyArenaCode = a
										}
										if (c) {
											b.agencyURI = c
										}
										Ext.Ajax.request({
											url: TDS.env.dataPath + "search/agencies/collection",
											disableCaching: false,
											method: "GET",
											params: b,
											callback: function (i, d, g) {
												if (this.showLoadMask) {
													this.showLoadMask = false;
													this.el.unmask()
												}
												this.getLookupButton().enable();
												if (d) {
													try {
														var f = Ext.decode(g.responseText);
														var j = f["search/agencies?" + Ext.urlEncode(b)][0];
														if (!j) {
															this.setAgencyLabel("No agent found.");
															return
														}
														this.setAgencyLabel(f[j]["name"]);
														this.setAgencyArenaCodeField(f[j]["agencyArenaCode"]);
														this.setAgencyAddressLabel(f[j]["addressString"]);
														this.setAgencyURIField(j)
													} catch (h) {}
												} else {
													this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>')
												}
											},
											scope: this
										})
									},
									getLookupButton: function () {
										return this.items.itemAt(5)
									},
									getRateAvailableForAgencyField: function () {
										return this.items.itemAt(0)
									},
									getAgencyURIField: function () {
										return this.items.itemAt(7)
									},
									getAgencyArenaCodeField: function () {
										return this.items.itemAt(4)
									},
									setAgencyArenaCodeField: function (a) {
										this.getAgencyArenaCodeField().setValue(a)
									},
									setAgencyURIField: function (a) {
										this.getAgencyURIField().setValue(a)
									},
									setAgencyLabel: function (a) {
										this.items.itemAt(9).setText(a)
									},
									setAgencyAddressLabel: function (a) {
										this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">' + a + "</span>")
									},
									clearAllFields: function () {
										this.setAgencyLabel("");
										this.setAgencyAddressLabel("");
										this.setAgencyURIField("")
									},
									items: [{
											xtype: "checkbox",
											name: "rateAvailableForAgencyOnly",
											forceSubmit: true,
											width: 20
										}, {
											colspan: 4,
											html: "Rate is only available to specific agent only.",
											width: 320
										}, {
											width: 20
										}, {
											html: "Agent code:",
											width: 80
										}, {
											xtype: "textfield",
											name: "agencyArenaCode",
											width: 60
										}, {
											xtype: "button",
											text: "Lookup",
											width: 60,
											handler: function () {
												var a = this.ownerCt;
												this.disable();
												a.clearAllFields();
												a.setAgencyLabel("Lookup in progress...");
												a.lookupAgencyByAgencyArenaCode(a.getAgencyArenaCodeField().getValue())
											}
										}, {
											width: 120
										}, {
											xtype: "hidden",
											name: "agencyURI",
											forceSubmit: true,
											width: 20
										}, {
											html: "Agent:",
											width: 80
										}, {
											colspan: 3,
											xtype: "labelpanel",
											html: "Not set",
											width: 240
										}, {
											colspan: 2,
											width: 100
										}, {
											colspan: 3,
											xtype: "labelpanel",
											width: 240
										}
									],
									listeners: {
										render: function () {
											this.initAgency()
										}
									}
								}, {
									html: "<div><center></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>",
									width: 320,
									border: false
								}
							]
						}
					]
				}, ]
		}
	]
}



























































































































































































































































































































































































































































