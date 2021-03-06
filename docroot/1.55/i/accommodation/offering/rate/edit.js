{
	xtype: "form",
	height: 430,
	border: false,
	requireStores: [{
			dataURI: TDS.env.dataPath + "accommodation/inventorytypes/collection",
			identifier: "accommodation/inventorytypes",
			fields: ["name", "displayName", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "accommodation/roomviews/collection",
			identifier: "accommodation/roomviews",
			fields: ["name", "displayName", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "rate/basises/collection",
			identifier: "rate/basises",
			fields: ["name", "dataURI"]
		}, {
			dataURI: TDS.env.dataPath + "accommodation/rateType/collection",
			identifier: "accommodation/rateType",
			fields: ["name", "displayName", "dataURI"]
		}
	],
	fieldMap: {
		defaultMaxHoldTimeSeconds: ["defaultMaxHoldTimeHours", "defaultMaxHoldTimeMinutes"]
	},
	getSupplierDataURI: function () {
		return this.ownerCt.getRequiredData("supplier").dataURI
	},
	getAgencyAdminGroup: function (d) { ;
		var b = this.getSupplierDataURI();
		var e = TDS.env.dataPath + b + "/agencyGroupAdmin/collection";
		Ext.Ajax.request({
			url: e,
			method: "GET",
			callback: function c(m, g, j) { ;
				var h = Ext.util.JSON.decode(j.responseText);
				var l = h["supplier/agencyGroupAdmin"];
				if (typeof l == "undefined") {
					return
				}
				var k = [];
				for (var a = 0; a < l.length; a++) {
					h[l[a]].dataURI = l[a];
					k.push(h[l[a]])
				}
				d.store.loadData(k);
				var f = d.ownerCt.items.itemAt(5).getValue();
				if (typeof f != "undefined" && f != null && f != "") {
					d.setValue("agency/" + f);
					d.ownerCt.items.itemAt(0).setValue(true)
				}
			}
		})
	},
	beforeSubmit: function (a) { ;
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
		var b = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).items.itemAt(3);
		if (!isNaN(a.noOfChildren) && a.noOfChildren > 0 && (isNaN(a.ageBelow) || a.ageBelow <= 0)) {
			Ext.Msg.alert("Alert", "Enter the child age to proceed.", function () {
				b.markInvalid("Please enter age.");
				b.focus(true)
			});
			return
		}
		var c = this.items.itemAt(0).items.itemAt(2).items.itemAt(0);
		if (c && c.rendered) {
			a.roomFacilityURIs = c.getData()
		}
		return a
	},
	beforeDataLoad: function (d, a) { ;
		var j = d.defaultMaxHoldTimeSeconds;
		d.defaultMaxHoldTimeHours = Math.floor(parseInt(d.defaultMaxHoldTimeSeconds) / 60 / 60);
		if (d.defaultMaxHoldTimeHours > 0) {
			j -= d.defaultMaxHoldTimeHours * 60 * 60
		}
		d.defaultMaxHoldTimeMinutes = j / 60;
		if (d.agencyURI) {
			d.rateAvailableForAgencyOnly = true
		}
		var c = this.getForm().items.items[13];
		var h = a.getRequiredData("EditdataURI");
		if (c) {
			var e = this.ownerCt;
			var g = Ext.StoreMgr.lookup(h.dataURI + "/rates");
			for (var b = 0; b < g.data.length; b++) {
				if (g.getAt(b).data.shareAvailabilitywith == "") {
					g.getAt(b).data.shareAvailabilitywith = "no"
				}
			}
			var f = g;
			c.store = f
		}
		return d
	},
	items: [{
			xtype: "tabpanel",
			activeTab: 0,
			layoutOnTabChange: true,
			height: 430,
			defaults: {
				bodyStyle: "padding: 6px 4px 6px 4px;"
			},
			items: [{
					title: "Details",
					items: [{
							xtype: "panel",
							layout: "form",
							border: false,
							labelWidth: 133,
							defaults: {},
							items: [{
									xtype: "combo",
									name: "inventoryTypeURI",
									mode: "local",
									fieldLabel: "Room type",
									width: 200,
									triggerAction: "all",
									editable: false,
									displayField: "displayName",
									valueField: "dataURI",
									store: TDS.data.getStore({
										dataURI: TDS.env.dataPath + "accommodation/inventorytypes/collection",
										identifier: "accommodation/inventorytypes",
										fields: ["name", "displayName", "dataURI"]
									})
								}, {
									xtype: "combo",
									name: "roomViewURI",
									mode: "local",
									fieldLabel: "Room Grade",
									width: 200,
									triggerAction: "all",
									editable: false,
									displayField: "displayName",
									valueField: "dataURI",
									store: TDS.data.getStore({
										dataURI: TDS.env.dataPath + "accommodation/roomviews/collection",
										identifier: "accommodation/roomviews",
										fields: ["name", "displayName", "dataURI"]
									})
								}, {
									xtype: "omnicrementer",
									name: "maximumOccupancy",
									fieldLabel: "Max. in room",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 60
								}, {
									xtype: "textfield",
									name: "name",
									fieldLabel: "Rate name",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "combo",
									name: "rateBasisURI",
									forceSubmit: true,
									mode: "local",
									fieldLabel: "Basis",
									width: 185,
									triggerAction: "all",
									editable: false,
									displayField: "name",
									valueField: "dataURI",
									store: TDS.data.getStore({
										dataURI: TDS.env.dataPath + "rate/basises/collection",
										identifier: "rate/basises",
										fields: ["name", "dataURI"]
									}),
									appendData: [{
											name: " ",
											dataURI: ""
										}
									]
								}, {
									xtype: "combo",
									name: "rateTypeURI",
									forceSubmit: true,
									mode: "local",
									fieldLabel: "Seasons",
									width: 185,
									triggerAction: "all",
									editable: false,
									displayField: "name",
									valueField: "dataURI",
									store: TDS.data.getStore({
										dataURI: TDS.env.dataPath + "accommodation/rateType/collection",
										identifier: "accommodation/rateType",
										fields: ["name", "displayName", "dataURI"]
									})
								}, {
									xtype: "textfield",
									name: "nameLocale",
									fieldLabel: "Rate name (Alt Language)",
									bodyStyle: "padding: 2px 4px 2px 4px;",
									width: 185
								}, {
									xtype: "panel",
									style: "padding: 0; margin-top: 4px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 4
									},
									defaults: {
										border: false
									},
									items: [{
											html: "No of Adults:",
											width: Ext.isIE ? 140 : 138
										}, {
											xtype: "omnicrementer",
											name: "noOfAdults",
											id: "adultomnicrementerId",
											maxValue: 23
										}, {
											html: "&nbsp;",
											width: 4
										}, {
											xtype: "checkbox",
											name: "adultcheck",
											inputValue: "true",
											checked: true,
											listeners: {
												check: function (a, b) {
													if (b) {
														Ext.getCmp("adultomnicrementerId").enable();
														Ext.getCmp("childrenId").enable()
													} else {
														Ext.getCmp("adultomnicrementerId").disable();
														Ext.getCmp("childrenId").disable()
													}
												},
												render: function (a) {
													if (a.checked) {
														Ext.getCmp("adultomnicrementerId").enable();
														Ext.getCmp("childrenId").enable()
													} else {
														Ext.getCmp("adultomnicrementerId").disable();
														Ext.getCmp("childrenId").disable()
													}
												}
											}
										}
									]
								}, {
									xtype: "panel",
									style: "padding: 0; margin-top: 4px; margin-bottom: 4px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 5
									},
									defaults: {
										border: false
									},
									items: [{
											html: "No of Children:",
											width: Ext.isIE ? 140 : 138
										}, {
											xtype: "omnicrementer",
											name: "noOfChildren",
											id: "childrenId",
											bodyStyle: "padding: 2px 4px 2px 4px;",
											width: 59,
											onTrigger1Click: function () {
												if (!isNaN(this.el.dom.value) && !this.disabled) {
													if (this.allowNegative || this.el.dom.value > 0) {
														var a = this.getValue() - 1;
														if (a < this.minValue) {
															return
														}
														this.setValue(a);
														if (this.isValid(true)) {
															this.fireEvent("trigger", this, this.getValue())
														}
														if (a == 0) {
															this.ownerCt.items.items[3].setValue(null)
														}
													}
												}
											}
										}, {
											html: "Under",
											bodyStyle: "padding: 0 4px;"
										}, {
											xtype: "textfield",
											name: "ageBelow",
											bodyStyle: "padding: 2px 4px 2px 4px;",
											width: 30
										}, {
											html: "Years",
											bodyStyle: "padding: 0 4px;"
										}
									]
								}, {
									xtype: "panel",
									style: "padding: 0; margin-top: 4px; margin-bottom: 4px;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 4
									},
									defaults: {
										border: false
									},
									items: [{
											html: "Min Night:",
											width: Ext.isIE ? 140 : 138
										}, {
											xtype: "omnicrementer",
											name: "minNights",
											id: "minnightId",
											maxValue: 23
										}, {
											html: "&nbsp;",
											width: 4
										}, {
											xtype: "checkbox",
											name: "minchecknight",
											checked: true,
											inputValue: "true",
											listeners: {
												check: function (a, b) {
													if (b) {
														Ext.getCmp("minnightId").enable()
													} else {
														Ext.getCmp("minnightId").disable()
													}
												},
												render: function (a) {
													if (a.checked) {
														Ext.getCmp("minnightId").enable()
													} else {
														Ext.getCmp("minnightId").disable()
													}
												}
											}
										}
									]
								}, {
									xtype: "combo",
									name: "shareAvailabilitywith",
									forceSubmit: true,
									mode: "local",
									fieldLabel: "Share availability with",
									width: 160,
									triggerAction: "all",
									editable: false,
									displayField: "name",
									valueField: "dataURI",
									appendData: [{
											name: "NONE",
											dataURI: ""
										}
									]
								}, {
									xtype: "checkbox",
									name: "active",
									fieldLabel: "Active",
									inputValue: "true"
								}, {
									xtype: "checkbox",
									name: "special",
									fieldLabel: "Special",
									inputValue: "true"
								}, {
									xtype: "panel",
									style: "padding: 0;",
									border: false,
									layout: "table",
									layoutConfig: {
										columns: 5
									},
									defaults: {
										border: false
									},
									items: [{
											html: "Inventory Max. hold time:",
											width: Ext.isIE ? 140 : 138
										}, {
											xtype: "omnicrementer",
											name: "defaultMaxHoldTimeHours",
											forceSubmit: true,
											maxValue: 23
										}, {
											html: "hours",
											bodyStyle: "padding: 0 4px;"
										}, {
											xtype: "omnicrementer",
											name: "defaultMaxHoldTimeMinutes",
											forceSubmit: true,
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
											html: "Inventory Cut-off time:",
											width: Ext.isIE ? 140 : 138
										}, {
											xtype: "omnicrementer",
											name: "defaultCutoffTimeDays",
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
							border: false,
							items: [{
									xtype: "panel",
									anchor: "100%",
									border: false,
									height: 220,
									items: [{
											xtype: "pricepanel"
										}, {
											xtype: "packagepricepanel"
										}, {
											xtype: "panel",
											border: false,
											items: [{
													xtype: "panel",
													layout: "table",
													style: " padding-left: 35px;padding-top:5px; ",
													border: false,
													hideBorders: true,
													layoutConfig: {
														columns: 5
													},
													items: [{
															xtype: "radio",
															name: "cruiseLink",
															boxLabel: "Pricing",
															inputValue: false,
															listeners: {
																render: function () {
																	var c = this.ownerCt.findParentByType("awesomewindow");
																	var b = c.aw.data;
																	this.setValue(!b.cruiseLink)
																},
																check: function (b, a) {
																	if (a) {
																		this.ownerCt.ownerCt.ownerCt.items.itemAt(1).disable();
																		this.ownerCt.ownerCt.ownerCt.items.itemAt(0).enable();
																		this.ownerCt.ownerCt.ownerCt.findByType("packagepricepanel")[0].findByType("textfield")[1].setValue(0);
																		this.ownerCt.ownerCt.ownerCt.findByType("packagepricepanel")[0].findByType("textfield")[2].setValue(0);
																		this.ownerCt.ownerCt.ownerCt.findByType("packagepricepanel")[0].findByType("textfield")[3].setValue("");
																		this.ownerCt.ownerCt.ownerCt.findByType("packagepricepanel")[0].findByType("label")[1].setText("0.00");
																		this.ownerCt.ownerCt.ownerCt.findByType("packagepricepanel")[0].findByType("checkbox")[0].setValue(false)
																	}
																}
															}
														}, {
															width: 50
														}, {
															xtype: "radio",
															name: "cruiseLink",
															boxLabel: "Package Pricing",
															inputValue: true,
															listeners: {
																render: function () {
																	var c = this.ownerCt.findParentByType("awesomewindow");
																	var b = c.aw.data;
																	this.setValue(b.cruiseLink)
																},
																check: function (b, a) {
																	if (a) {
																		this.ownerCt.ownerCt.ownerCt.items.itemAt(0).disable();
																		this.ownerCt.ownerCt.ownerCt.items.itemAt(1).enable();
																		this.ownerCt.ownerCt.ownerCt.findByType("pricepanel")[0].findByType("textfield")[1].setValue(0);
																		this.ownerCt.ownerCt.ownerCt.findByType("pricepanel")[0].findByType("textfield")[2].setValue(0);
																		this.ownerCt.ownerCt.ownerCt.findByType("pricepanel")[0].findByType("textfield")[3].setValue(0);
																		this.ownerCt.ownerCt.ownerCt.findByType("pricepanel")[0].findByType("label")[1].setText("0.00")
																	}
																},
																change: function (b, c, a) {}
															}
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
				}, {
					title: "Facilities",
					items: {
						xtype: "grid",
						hideHeaders: true,
						height: 240,
						store: TDS.data.getStore({
							dataURI: TDS.env.dataPath + "accommodation/roomfacilities/collection",
							identifier: "accommodation/roomfacilities",
							fields: ["name", "displayName", "dataURI"]
						}),
						viewConfig: {
							forceFit: true
						},
						getData: function () {
							var b = this.selModel.getSelections();
							var c = [];
							for (var a = 0; a < b.length; a++) {
								c.push(b[a].get("dataURI"))
							}
							return c
						},
						sm: new Ext.grid.CheckboxSelectionModel(),
						columns: [new Ext.grid.CheckboxSelectionModel(), {
								dataIndex: "displayName",
								width: 200
							}
						],
						listeners: {
							render: function () {
								var a = this.ownerCt.findParentByType("awesomewindow");
								this.destinationDataURI = TDS.env.dataPath + a.aw.sourceDataURI + "/roomfacilities";
								this.getSelectedData()
							}
						}
					}
				}, {
					title: "CUG",
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
							lookupAgency: function (a, c) { ;
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
									callback: function (i, d, g) { ;
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
							xtype: "panel",
							border: false,
							height: 30
						}, {
							xtype: "panel",
							layout: "table",
							border: false,
							hideBorders: true,
							showLoadMask: false,
							layoutConfig: {
								columns: 5
							},
							items: [{
									xtype: "checkbox",
									name: "rateAvailableForAgencyAdminGroupOnly",
									forceSubmit: true,
									width: 20
								}, {
									colspan: 4,
									html: "Rate is only available to specific agency group only.",
									width: 320
								}, {
									width: 20
								}, {
									html: "Agency group:",
									width: 80
								}, {
									xtype: "combo",
									name: "agencyAdminGroup",
									forceSubmit: true,
									mode: "local",
									width: 160,
									triggerAction: "",
									editable: false,
									triggerAction: "all",
									displayField: "name",
									valueField: "dataURI",
									store: new Ext.data.JsonStore({
										fields: ["dataURI", "name"]
									})
								}, {
									xtype: "hidden",
									name: "agencyGroupId",
									forceSubmit: true,
									width: 20
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
									this.ownerCt.ownerCt.ownerCt.getAgencyAdminGroup(this.items.itemAt(4))
								}
							}
						}, {
							html: "<div><center></br></br></br></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>",
							width: 320,
							border: false
						}
					]
				}, {
					title: "Notes",
					layout: "form",
					items: {
						xtype: "htmleditor",
						name: "restrictions",
						height: 200,
						hideLabel: true,
						labelSeparator: "",
						anchor: "100%",
						enableLinks: false,
						enableLists: true,
						enableSourceEdit: false,
						enableFontSize: false,
						enableFont: false,
						enableColors: false,
						enableAlignments: false
					}
				}
			],
			listeners: {
				render: function () {
					var f = this;
					f = this.ownerCt.ownerCt;
					var e = f.aw.requiredData[0].data.specialSupplier;
					if (e) {
						var h = this;
						var g = h.items.itemAt(3);
						g.hide();
						g.setVisible(false);
						g.hideParent = true;
						g.hidden = true;
						g.disable();
						g.disabled = true;
						h.remove(g, true)
					}
				}
			}
		}
	]
}


















