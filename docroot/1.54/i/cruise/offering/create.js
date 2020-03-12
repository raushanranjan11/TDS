{
	xtype: "form",
	border: false,
	width: 600,
	markDataDirtyOnLoad: true,
	beforeSubmit: function (b) {
		var e = this.items.itemAt(0).items.itemAt(5).items.itemAt(0).items.itemAt(0).items.itemAt(0);
		var f = e.getStore().data.items;
		var a = e.getStore().data.length;
		var d = [];
		for (var c = 0; c < a; c++) {
			d[c] = f[c].data
		}
		b.ports = d;
		return b
	},
	beforeDataLoad: function (c, b) {
		var a = b.getRequiredData("supplier");
		c.termsAndConditions = a.data.defaultOfferingTermsAndConditions;
		return c
	},
	items: [{
			xtype: "tabpanel",
			activeTab: 0,
			layoutOnTabChange: true,
			height: 410,
			defaults: {
				bodyStyle: "padding: 6px 4px 6px 4px;"
			},
			items: [{
					title: "Details",
					items: [{
							xtype: "panel",
							layout: "form",
							border: false,
							labelWidth: 90,
							defaults: {
								style: "padding: 2px 4px 2px 4px;"
							},
							items: [{
									xtype: "textfield",
									allowBlank: false,
									name: "cruiseCompany ",
									fieldLabel: "Cruise Company ",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "textfield",
									allowBlank: false,
									name: "shipName",
									fieldLabel: "Ship",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "textfield",
									allowBlank: false,
									name: "name",
									fieldLabel: "Cruise Name",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "textfield",
									name: "codeSupplier",
									allowBlank: false,
									fieldLabel: "Voyage No",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 120
								}, {
									xtype: "panel",
									layout: "table",
									style: "padding: 0; margin-bottom: 4px; ",
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 4
									},
									items: [{
											html: "Interior:",
											width: Ext.isIE ? 98 : 95
										}, {
											xtype: "textfield",
											allowBlank: false,
											name: "rackRatePriceSell",
											fieldLabel: "Advertised rate",
											name: "rackRatePriceSell",
											width: 60
										}, {
											html: " ",
											height: 30,
											width: Ext.isIE ? 12 : 12
										}, {
											xtype: "combo",
											forceSubmit: true,
											name: "pricingPriceIsNett",
											mode: "local",
											width: 60,
											triggerAction: "all",
											editable: false,
											value: "false",
											store: [["false", "Gross"], ["true", "Nett"]]
										}, {
											html: "Ocean View:",
											width: Ext.isIE ? 98 : 95
										}, {
											xtype: "textfield",
											allowBlank: false,
											name: "rackRatePriceSell2",
											fieldLabel: "Advertised rate",
											name: "rackRatePriceSell",
											width: 60
										}, {
											html: " ",
											height: 30,
											width: Ext.isIE ? 12 : 12
										}, {
											xtype: "combo",
											forceSubmit: true,
											name: "pricingPriceIsNett2",
											mode: "local",
											width: 60,
											triggerAction: "all",
											editable: false,
											value: "false",
											store: [["false", "Gross"], ["true", "Nett"]]
										}, {
											html: "Balcony:",
											width: Ext.isIE ? 98 : 95
										}, {
											xtype: "textfield",
											allowBlank: false,
											name: "rackRatePriceSell3",
											fieldLabel: "Advertised rate",
											name: "rackRatePriceSell",
											width: 60
										}, {
											html: " ",
											height: 30,
											width: Ext.isIE ? 12 : 12
										}, {
											xtype: "combo",
											forceSubmit: true,
											name: "pricingPriceIsNett3",
											mode: "local",
											width: 60,
											triggerAction: "all",
											editable: false,
											value: "false",
											store: [["false", "Gross"], ["true", "Nett"]]
										}, {
											html: "Special:",
											width: Ext.isIE ? 98 : 95
										}, {
											xtype: "textfield",
											allowBlank: false,
											name: "rackRatePriceSell4",
											fieldLabel: "Advertised rate",
											name: "rackRatePriceSell",
											width: 60
										}, {
											html: " ",
											height: 30,
											width: Ext.isIE ? 12 : 12
										}, {
											xtype: "combo",
											forceSubmit: true,
											name: "pricingPriceIsNett4",
											mode: "local",
											width: 60,
											triggerAction: "all",
											editable: false,
											value: "false",
											store: [["false", "Gross"], ["true", "Nett"]]
										}
									]
								}, {
									xtype: "combo",
									store: TDS.data.destination,
									name: "destination",
									fieldLabel: "Destination",
									width: 150,
									editable: false,
									forceSelection: true,
									mode: "local",
									triggerAction: "all",
									displayField: "text",
									valueField: "text",
									value: ""
								}, {
									xtype: "panel",
									layout: "table",
									style: "padding: 0; margin-bottom: 4px;",
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 6
									},
									items: [{
											html: "Departure city:",
											width: Ext.isIE ? 90 : 95
										}, {
											xtype: "combo",
											allowBlank: false,
											name: "fromCountryURI",
											emptyText: "Type a country...",
											excludeSubmit: true,
											tpl: TDS.util.Templates.ComboNoLabel,
											minChars: 1,
											enableKeyEvents: true,
											mode: "local",
											width: 110,
											typeAhead: true,
											triggerAction: "all",
											forceSelection: true,
											selectOnFocus: true,
											displayField: "name",
											valueField: "isoCode",
											store: TDS.data.getStore({
												dataURI: TDS.env.dataPath + "countries/collection",
												identifier: "countries",
												fields: ["name", "isoCode"]
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											]
										}, {
											xtype: "locationcombo",
											allowBlank: false,
											name: "locationFromURI",
											width: 100,
											style: "margin-left: 2px;",
											listeners: {
												beforesearch: function (c) {
													var b = this.ownerCt;
													var a = b.items.itemAt(1);
													if (a.getValue() == "") {
														a.markInvalid("Please select a country.");
														return false
													}
													c.searchURI = TDS.env.dataPath + "country/" + a.getValue() + "/locations/collection";
													c.searchIdentifier = "country/" + a.getValue() + "/locations"
												}
											}
										}, {
											html: "",
											width: Ext.isIE ? 10 : 5
										}, {
											html: "Day/Date:",
											width: Ext.isIE ? 60 : 55
										}, {
											xtype: "datefield",
											allowBlank: false,
											name: "departureDate",
											fieldLabel: "Day/Date",
											bodyStyle: "padding: 2px 4px 2px 4px;",
											enableKeyEvents: true,
											showToday: false,
											width: 100,
											format: "dMy D",
											minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}
									]
								}, {
									xtype: "panel",
									layout: "table",
									style: "padding: 0; margin-bottom: 4px;",
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 6
									},
									items: [{
											html: "Return City:",
											width: Ext.isIE ? 90 : 95
										}, {
											xtype: "combo",
											allowBlank: false,
											name: "toCountryURI",
											emptyText: "Type a country...",
											excludeSubmit: true,
											tpl: TDS.util.Templates.ComboNoLabel,
											minChars: 1,
											enableKeyEvents: true,
											mode: "local",
											width: 110,
											typeAhead: true,
											triggerAction: "all",
											forceSelection: true,
											selectOnFocus: true,
											displayField: "name",
											valueField: "isoCode",
											store: TDS.data.getStore({
												dataURI: TDS.env.dataPath + "countries/collection",
												identifier: "countries",
												fields: ["name", "isoCode"]
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											]
										}, {
											xtype: "locationcombo",
											allowBlank: false,
											name: "locationToURI",
											width: 100,
											style: "margin-left: 2px;",
											listeners: {
												beforesearch: function (c) {
													var b = this.ownerCt;
													var a = b.items.itemAt(1);
													if (a.getValue() == "") {
														a.markInvalid("Please select a country.");
														return false
													}
													c.searchURI = TDS.env.dataPath + "country/" + a.getValue() + "/locations/collection";
													c.searchIdentifier = "country/" + a.getValue() + "/locations"
												}
											}
										}, {
											html: "",
											width: Ext.isIE ? 10 : 5
										}, {
											html: "Day/Date:",
											width: Ext.isIE ? 60 : 55
										}, {
											xtype: "datefield",
											allowBlank: false,
											name: "arrivalDate",
											fieldLabel: "Day/Date",
											bodyStyle: "padding: 2px 4px 2px 4px;",
											enableKeyEvents: true,
											showToday: false,
											width: 100,
											format: "dMy D",
											minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}
									]
								}, {
									xtype: "textfield",
									name: "duration",
									allowBlank: false,
									fieldLabel: "Duration",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 110
								}
							]
						}
					]
				}, {
					title: "Description",
					layout: "form",
					items: {
						xtype: "htmleditor",
						name: "description",
						height: 200,
						hideLabel: true,
						labelSeparator: "",
						anchor: "100%",
						enableLinks: false,
						enableLists: false,
						enableSourceEdit: false,
						enableFontSize: false,
						enableFont: false,
						enableColors: false,
						enableAlignments: false
					}
				}, {
					title: "Activity",
					html: "<p>The list of activities will be available for selection once you have created the offering.</p>"
				}, {
					title: "Notes",
					layout: "form",
					items: {
						xtype: "htmleditor",
						name: "notes",
						height: 200,
						hideLabel: true,
						labelSeparator: "",
						anchor: "100%",
						enableLinks: false,
						enableLists: false,
						enableSourceEdit: false,
						enableFontSize: false,
						enableFont: false,
						enableColors: false,
						enableAlignments: false
					}
				}, {
					title: "Localisation",
					layout: "form",
					items: [{
							html: "<p>Name:</p>",
							style: "margin-bottom: 2px;",
							border: false
						}, {
							xtype: "textfield",
							name: "nameLocale",
							hideLabel: true,
							labelSeparator: "",
							anchor: "100%"
						}, {
							html: "<p>Description:</p>",
							style: "margin-bottom: 2px;",
							border: false
						}, {
							xtype: "htmleditor",
							name: "descriptionLocale",
							height: "auto",
							hideLabel: true,
							labelSeparator: "",
							anchor: "100%",
							enableLinks: false,
							enableLists: false,
							enableSourceEdit: false,
							enableFontSize: false,
							enableFont: false,
							enableColors: false,
							enableAlignments: false
						}
					]
				}, {
					title: "Ports",
					bodyStyle: "padding: 0px 0px 0px 0px;",
					items: {
						xtype: "panel",
						layout: "table",
						layoutConfig: {
							columns: 1
						},
						labelWidth: 110,
						border: false,
						style: "padding: 2px;",
						defaultType: "textfield",
						items: [{
								xtype: "panel",
								width: 590,
								height: 170,
								border: true,
								style: "padding: 2px;",
								defaultType: "textfield",
								items: [{
										xtype: "grid",
										alwaysUseCollection: true,
										name: "ggg",
										width: 570,
										height: 170,
										border: false,
										store: new Ext.data.JsonStore({
											url: "",
											id: "dataURI",
											fields: ["travelDate", "portName", "travelDateDisp", "arrival", "departure", "cruiseOfferingURI", "expiryDate", "dataURI"]
										}),
										sm: new Ext.grid.RowSelectionModel(),
										columns: [{
												header: "Day/Date",
												dataIndex: "travelDateDisp",
												width: 100
											}, {
												header: "Ports",
												dataIndex: "portName",
												width: 100
											}, {
												header: "Arr",
												dataIndex: "arrival",
												width: 100
											}, {
												header: "Dep",
												dataIndex: "departure",
												width: 100
											}
										],
										viewConfig: {
											forceFit: true
										},
										listeners: {
											beforerender: function () {},
											sessioninit: function () {},
											render: function () {}
										}
									}
								]
							}, {
								xtype: "panel",
								layout: "table",
								border: false,
								width: 580,
								height: 60,
								style: "padding: 3px;",
								layoutConfig: {
									columns: 5
								},
								defaults: {
									border: false
								},
								items: [{
										html: "Day/Date:",
										width: 100
									}, {
										xtype: "datefield",
										name: "travelDate",
										fieldLabel: "Travel Date",
										format: "dMy",
										width: 150
									}, {
										html: "",
										height: 30,
										width: 20
									}, {
										html: "Departure Time:",
										width: 80
									}, {
										xtype: "textfield",
										name: "departure",
										fieldLabel: "Departure",
										width: 150
									}, {
										html: "Ports:",
										width: 100
									}, {
										xtype: "textfield",
										name: "portName",
										fieldLabel: "Ports",
										width: 150
									}, {
										html: "",
										width: 20
									}, {
										html: "Arrival Time:",
										width: 80
									}, {
										xtype: "textfield",
										name: "arrival Time",
										fieldLabel: "Arrival",
										width: 150
									}
								]
							}, {
								xtype: "panel",
								layout: "table",
								border: false,
								width: 580,
								style: "padding: 0px;",
								layoutConfig: {
									columns: 4
								},
								defaults: {
									border: false
								},
								items: [{
										html: "",
										height: 40,
										width: 150
									}, {
										xtype: "button",
										align: "right",
										minWidth: 80,
										text: "Add",
										handler: function () {
											var e = this.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0);
											var l = e.getStore();
											var j = this.ownerCt.ownerCt.items.itemAt(1).items;
											var h = j.itemAt(1);
											var d = j.itemAt(4);
											var b = j.itemAt(6);
											var i = j.itemAt(9);
											var c = j.itemAt(1).getValue();
											var a = j.itemAt(4).getValue();
											var f = j.itemAt(6).getValue();
											var k = j.itemAt(9).getValue();
											if ((c != null && c != "") && (a != null && a != "") && (f != null && f != "") && (k != null && k != "")) {
												l.add([new l.recordType({
															travelDateDisp: h.getRawValue(),
															travelDate: h.getValue(),
															portName: b.getValue(),
															arrival: d.getValue(),
															departure: i.getValue()
														})]);
												h.setValue("");
												d.setValue("");
												b.setValue("");
												i.setValue("")
											}
										}
									}, {
										html: "",
										height: 40,
										width: 20
									}, {
										xtype: "button",
										minWidth: 80,
										text: "Remove",
										handler: function () {
											var b = this.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0),
											a;
											console.log(b.getStore().getCount());
											while (a = b.selModel.getSelected()) {
												b.store.remove(a)
											}
										}
									}
								]
							}
						]
					}
				}, {
					title: "Dinning Times",
					items: [{
							xtype: "panel",
							layout: "form",
							border: false,
							labelWidth: 90,
							defaults: {
								style: "padding: 2px 4px 2px 4px;"
							},
							items: [{
									xtype: "textfield",
									allowBlank: false,
									name: "dinnerFirstSitting",
									fieldLabel: "First Sitting ",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "textfield",
									allowBlank: false,
									name: "dinnerSecondSitting ",
									fieldLabel: "Second Sitting ",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "textfield",
									allowBlank: false,
									name: "dinnerLastSitting",
									fieldLabel: "Any Time",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}
							]
						}
					]
				}
			]
		}
	]
}

































