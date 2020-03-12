{
	xtype: "form",
	border: false,
	layout: "fit",
	width: 560,
	markDataDirtyOnLoad: true,
	beforeDataLoad: function (e) {
		var c = this.getForm().findFieldAggressive("sightseeingRateURI");
		if (c) {
			var a = this.ownerCt;
			var b = Ext.StoreMgr.lookup(a.getConfigValue("baseDataURI") + "/rates");
			c.store = b
		}
		return e
	},
	beforeSubmit: function (f) {
		var e = {};
		e.recurrence = f.recurrence;
		if (f.scheduleType == "day") {
			e.daily = true
		} else {
			if (f.scheduleType == "weekday") {
				e.weekdaily = true
			} else {
				if (f.scheduleType == "week") {
					e.weeklyDays = [];
					for (var a = 1; a <= 7; a++) {
						if (f["weeklyDays" + a]) {
							delete f["weeklyDays" + a];
							e.weeklyDays.push(a)
						}
					}
					e.weekly = true
				} else {
					if (f.scheduleType == "month") {
						e.monthlyDate = f.monthlyOrYearlyDate;
						delete f.monthlyOrYearlyDate;
						e.monthly = true
					} else {
						if (f.scheduleType == "year") {
							e.yearlyDate = f.monthlyOrYearlyDate;
							delete f.monthlyOrYearlyDate;
							e.yearly = true
						}
					}
				}
			}
		}
		delete f.scheduleType;
		delete f.recurrence;
		if (f.startDate) {
			f.startDate = f.startDate.format(TDS.env.dateFormat)
		}
		if (f.endDate) {
			f.endDate = f.endDate.format(TDS.env.dateFormat)
		}
		var g = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).items.itemAt(0).items.itemAt(0);
		var j = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(6).items.itemAt(0).items.itemAt(0);
		var c = j.getData();
		c = c.join(",");
		var b = g.getData();
		b = b.join(",");
		var k = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).items.itemAt(0).items.itemAt(1);
		var h = k.getData();
		h = h.join(",");
		if (h) {
			f.excludeDatesRange = h
		}
		if (c) {
			f.includeDates = c
		}
		if (b) {
			f.excludeDates = b
		}
		if (f.inventoryAction) {
			if (f.freesaleLimit == "" || typeof f.freesaleLimit == "undefined") {
				f.freesaleLimit = null
			}
			f.inventoryAmount = f.freesaleLimit;
			if (f.inventoryAction == "set") {
				f.inventoryAmount = f.inventorySetAmount
			}
			if (f.inventoryAction == "increase") {
				f.inventoryAmount = f.inventoryIncreaseAmount
			}
			if (f.inventoryAction == "decrease") {
				f.inventoryAmount = f.inventoryDecreaseAmount
			}
		} else {
			f.inventoryAction = "doNothing"
		}
		if (f.queueAction) {
			if (f.queueAction == "set") {
				f.queueAmount = f.queueSetAmount
			}
			if (f.queueAction == "increase") {
				f.queueAmount = f.queueIncreaseAmount
			}
			if (f.queueAction == "decrease") {
				f.queueAmount = f.queueDecreaseAmount
			}
		} else {
			f.queueAction = "doNothing"
		}
		return {
			submitDataAsParams: true,
			paramData: f,
			data: e
		}
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
					title: "Validity",
					items: [{
							xtype: "panel",
							layout: "form",
							border: false,
							labelWidth: 40,
							defaults: {},
							items: [{
									xtype: "combo",
									name: "sightseeingRateURI",
									forceSubmit: true,
									mode: "local",
									fieldLabel: "Rate",
									width: 200,
									triggerAction: "all",
									editable: false,
									displayField: "name",
									valueField: "dataURI"
								}, {
									xtype: "panel",
									layout: "table",
									border: false,
									layoutConfig: {
										columns: 4
									},
									items: [{
											xtype: "radio",
											boxLabel: "Date range from &nbsp;",
											checked: true,
											name: "dateOption",
											inputValue: "range",
											forceSubmit: true,
											listeners: {
												check: function (t, checked) {
													with (this.ownerCt) {
														if (checked) {
															items.itemAt(1).enable();
															items.itemAt(3).enable();
															items.itemAt(4).enable()
														} else {
															items.itemAt(1).disable();
															items.itemAt(3).disable();
															items.itemAt(4).disable()
														}
													}
												}
											}
										}, {
											xtype: "datefield",
											name: "startDate",
											fieldLabel: "Start date",
											showToday: false,
											width: 80,
											format: "dMy",
											minValue: "01/01/06"
										}, {
											xtype: "label",
											text: "to",
											style: "padding: 0 4px;"
										}, {
											xtype: "datefield",
											name: "endDate",
											fieldLabel: "End date",
											showToday: false,
											width: 80,
											format: "dMy",
											minValue: "01/01/06"
										}, {
											colspan: 4,
											xtype: "panel",
											border: false,
											style: "margin-left: 16px; margin-top: 4px;",
											items: {
												xtype: "fieldset",
												title: "Block-out dates",
												collapsible: true,
												layout: "table",
												layoutConfig: {
													columns: 2
												},
												height: 190,
												width: 430,
												defaults: {
													style: "margin-left: 5px; margin-right: 5px;"
												},
												items: [{
														xtype: "grid",
														hideHeaders: true,
														height: 150,
														width: 130,
														store: new Ext.data.JsonStore({
															url: "",
															fields: [{
																	name: "date"
																}
															]
														}),
														sm: new Ext.grid.RowSelectionModel(),
														cm: new Ext.grid.ColumnModel([{
																	dataIndex: "date",
																	width: 40
																}
															]),
														viewConfig: {
															forceFit: true
														},
														getData: function () {
															var a = [];
															this.store.each(function (b) {
																a.push(Date.parseDate(b.data.date, TDS.env.dateFormatDisplay).format(TDS.env.dateFormat))
															});
															return a
														},
														bbar: [{
																xtype: "button",
																text: "+",
																handler: function () {
																	if (this.menu == null) {
																		this.menu = new Ext.menu.DateMenu();
																		Ext.apply(this.menu.picker, {
																			format: TDS.env.dateFormatDisplay,
																			showToday: false
																		});
																		this.menu.picker.setValue(new Date());
																		this.menu.on("select", function (e, b) {
																			var d = this.getStore().recordType;
																			var a = new d({
																					date: b.format(TDS.env.dateFormatDisplay)
																				});
																			this.getStore().add([a])
																		}, this.ownerCt.ownerCt)
																	}
																	this.menu.show(this.el, "tl-bl?")
																}
															}, {
																xtype: "button",
																text: "-",
																handler: function () {
																	var b = this.ownerCt.ownerCt;
																	var a = b.selModel.getSelected();
																	b.store.remove(a)
																}
															}
														]
													}, {
														xtype: "editorgrid",
														height: 150,
														width: 260,
														store: new Ext.data.JsonStore({
															fields: ["startDate", "endDate"]
														}),
														getData: function () {
															var a = [];
															this.store.each(function (b) {
																if (b.data.startDate && b.data.endDate) {
																	a.push(b.data.startDate.format(TDS.env.dateFormat) + "&&" + b.data.endDate.format(TDS.env.dateFormat))
																}
															});
															return a
														},
														sm: new Ext.grid.RowSelectionModel(),
														cm: new Ext.grid.ColumnModel([{
																	header: "From",
																	dataIndex: "startDate",
																	flex: 1,
																	editor: new Ext.form.DateField({
																		showToday: false,
																		format: "dMy",
																		minValue: "01/01/06"
																	})
																}, {
																	header: "To",
																	dataIndex: "endDate",
																	flex: 1,
																	editor: new Ext.form.DateField({
																		showToday: false,
																		format: "dMy",
																		minValue: "01/01/06"
																	})
																}
															]),
														viewConfig: {
															forceFit: true
														},
														tbar: ["Enter the date range to be blocked"],
														bbar: [{
																xtype: "button",
																text: "Add",
																handler: function () {
																	var b = this.ownerCt.ownerCt;
																	var a = b.getStore();
																	a.add([new a.recordType({
																				startDate: "",
																				endDate: ""
																			})]);
																	b.startEditing(a.getCount() - 1, 0)
																}
															}, {
																xtype: "button",
																text: "Remove",
																handler: function () {
																	var b = this.ownerCt.ownerCt,
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
											colspan: 4,
											xtype: "radio",
											boxLabel: "Individual dates only",
											name: "dateOption",
											inputValue: "individual",
											forceSubmit: true,
											listeners: {
												check: function (t, checked) {
													var tp = this.ownerCt.findParentByType("tabpanel");
													with (this.ownerCt) {
														if (checked) {
															items.itemAt(6).enable();
															tp.items.itemAt(2).disable()
														} else {
															items.itemAt(6).disable();
															tp.items.itemAt(2).enable()
														}
													}
												}
											}
										}, {
											colspan: 4,
											xtype: "panel",
											disabled: true,
											border: false,
											style: "margin-left: 16px; margin-top: 4px;",
											items: {
												xtype: "fieldset",
												title: "Individual departure dates",
												height: 130,
												width: 200,
												items: {
													xtype: "grid",
													hideHeaders: true,
													height: 90,
													store: new Ext.data.JsonStore({
														url: "",
														fields: [{
																name: "date"
															}
														]
													}),
													sm: new Ext.grid.RowSelectionModel(),
													cm: new Ext.grid.ColumnModel([{
																dataIndex: "date",
																width: 40
															}
														]),
													viewConfig: {
														forceFit: true
													},
													getData: function () {
														var a = [];
														this.store.each(function (b) {
															a.push(Date.parseDate(b.data.date, TDS.env.dateFormatDisplay).format(TDS.env.dateFormat))
														});
														return a
													},
													bbar: [{
															xtype: "button",
															text: "+",
															tooltip: "Click here to add a date to include",
															handler: function () {
																if (this.menu == null) {
																	this.menu = new Ext.menu.DateMenu();
																	Ext.apply(this.menu.picker, {
																		format: TDS.env.dateFormatDisplay,
																		showToday: false
																	});
																	this.menu.picker.setValue(new Date());
																	this.menu.on("select", function (e, b) {
																		var d = this.getStore().recordType;
																		var a = new d({
																				date: b.format("dMy")
																			});
																		this.getStore().add([a])
																	}, this.ownerCt.ownerCt)
																}
																this.menu.show(this.el, "tl-bl?")
															}
														}, {
															xtype: "button",
															text: "-",
															tooltip: "Select a date from the list and click here to remove",
															handler: function () {
																var b = this.ownerCt.ownerCt;
																var a = b.selModel.getSelected();
																b.store.remove(a)
															}
														}
													]
												}
											}
										}
									]
								}
							]
						}
					]
				}, {
					title: "Status",
					layout: "form",
					items: [{
							xtype: "panel",
							layout: "column",
							border: false,
							hideBorders: true,
							bodyStyle: "padding: 0 4px;",
							items: [{
									columnWidth: 0.5,
									bodyStyle: "padding-right: 4px;",
									items: {
										xtype: "fieldset",
										title: "Inventory adjustment",
										height: 200,
										layout: "table",
										layoutConfig: {
											columns: 2
										},
										defaults: {
											style: "margin: 2px 0;"
										},
										items: [{
												xtype: "radio",
												boxLabel: "Make freesale Set: ",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "freesale",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(1);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "freesaleLimit",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Increase by",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "increase",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(3);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "inventoryIncreaseAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Decrease by",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "decrease",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(5);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "inventoryDecreaseAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Set to",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "set",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(7);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "inventorySetAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Consume all",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "consume"
											}, {
												border: false
											}, {
												xtype: "radio",
												boxLabel: "Cancel freesale",
												name: "inventoryAction",
												useRawValue: true,
												inputValue: "cancelFreesale"
											}, {
												border: false
											}, {
												colspan: 2,
												xtype: "radio",
												boxLabel: "Do not adjust inventory",
												name: "inventoryAction",
												useRawValue: true,
												checked: true,
												inputValue: "doNothing"
											}
										]
									}
								}, {
									columnWidth: 0.5,
									bodyStyle: "padding-left: 4px;",
									items: {
										xtype: "fieldset",
										title: "Request adjustment",
										height: 200,
										layout: "table",
										layoutConfig: {
											columns: 2
										},
										defaults: {
											style: "margin: 2px 0;"
										},
										items: [{
												xtype: "radio",
												boxLabel: "Unlimited requests",
												name: "queueAction",
												useRawValue: true,
												inputValue: "unlimited"
											}, {
												border: false
											}, {
												xtype: "radio",
												boxLabel: "Increase by",
												name: "queueAction",
												useRawValue: true,
												inputValue: "increase",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(3);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "queueIncreaseAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Decrease by",
												name: "queueAction",
												useRawValue: true,
												inputValue: "decrease",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(5);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "queueDecreaseAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "Set to",
												name: "queueAction",
												useRawValue: true,
												inputValue: "set",
												listeners: {
													check: function (a, b) {
														var c = this.ownerCt.items.itemAt(7);
														if (b) {
															c.enable().focus(false, 10)
														} else {
															c.disable()
														}
													}
												}
											}, {
												xtype: "textfield",
												disabled: true,
												name: "queueSetAmount",
												width: 40
											}, {
												xtype: "radio",
												boxLabel: "No requests",
												name: "queueAction",
												useRawValue: true,
												inputValue: "consume"
											}, {
												border: false
											}, {
												colspan: 2,
												xtype: "radio",
												boxLabel: "Do not adjust requests",
												name: "queueAction",
												useRawValue: true,
												checked: true,
												inputValue: "doNothing"
											}
										]
									}
								}
							]
						}
					]
				}, {
					title: "Recurrence",
					items: {
						xtype: "panel",
						layout: "form",
						border: false,
						labelWidth: 120,
						defaults: {
							style: "padding: 2px 4px 2px 4px;"
						},
						items: [{
								xtype: "combo",
								fieldLabel: "Repeat",
								name: "recurrence",
								value: "1",
								forceSubmit: true,
								store: new Ext.data.JsonStore({
									root: "",
									fields: [{
											name: "label"
										}, {
											name: "value"
										}
									],
									data: [{
											value: "1",
											label: "every"
										}, {
											value: "2",
											label: "every 2nd"
										}, {
											value: "3",
											label: "every 3rd"
										}, {
											value: "4",
											label: "every 4th"
										}
									]
								}),
								mode: "local",
								displayField: "label",
								valueField: "value",
								forceSelection: true,
								typeAhead: true,
								minChars: 1,
								queryDelay: 10,
								valueNotFoundText: "...",
								triggerAction: "all",
								emptyText: "..."
							}, {
								xtype: "combo",
								fieldLabel: "",
								labelSeparator: "",
								name: "scheduleType",
								value: "day",
								forceSubmit: true,
								store: new Ext.data.JsonStore({
									root: "",
									fields: [{
											name: "label"
										}, {
											name: "value"
										}
									],
									data: [{
											value: "day",
											label: "day"
										}, {
											value: "weekday",
											label: "weekday"
										}, {
											value: "week",
											label: "week"
										}, {
											value: "month",
											label: "month"
										}, {
											value: "year",
											label: "year"
										}
									]
								}),
								listeners: {
									beforeselect: {
										fn: function (e, a, b) {
											var d = this.getValue();
											if (d == "week") {
												for (var c = 0; c <= 6; c++) {
													Ext.getCmp("dayOfWeek" + c).hide()
												}
											}
											if (d == "month") {
												Ext.getCmp("dayOfMonth").hide()
											}
											if (d == "year") {
												Ext.getCmp("dayOfMonth").hide();
												Ext.getCmp("monthOfYear").hide()
											}
											if (a.data.value == "day") {}
											if (a.data.value == "weekday") {}
											if (a.data.value == "week") {
												for (var c = 0; c <= 6; c++) {
													Ext.getCmp("dayOfWeek" + c).show()
												}
											}
											if (a.data.value == "month") {
												Ext.getCmp("dayOfMonth").show()
											}
											if (a.data.value == "year") {
												Ext.getCmp("dayOfMonth").show();
												Ext.getCmp("monthOfYear").show()
											}
										}
									}
								},
								mode: "local",
								displayField: "label",
								valueField: "value",
								forceSelection: true,
								typeAhead: true,
								minChars: 1,
								queryDelay: 10,
								valueNotFoundText: "...",
								triggerAction: "all",
								emptyText: "..."
							}, {
								xtype: "checkbox",
								id: "dayOfWeek1",
								boxLabel: Date.dayNames[1],
								fieldLabel: "On:",
								labelSeparator: "",
								name: "weeklyDays2",
								inputValue: 2,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek2",
								boxLabel: Date.dayNames[2],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays3",
								inputValue: 3,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek3",
								boxLabel: Date.dayNames[3],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays4",
								inputValue: 4,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek4",
								boxLabel: Date.dayNames[4],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays5",
								inputValue: 5,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek5",
								boxLabel: Date.dayNames[5],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays6",
								inputValue: 6,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek6",
								boxLabel: Date.dayNames[6],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays7",
								inputValue: 7,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "checkbox",
								id: "dayOfWeek0",
								boxLabel: Date.dayNames[0],
								fieldLabel: "",
								labelSeparator: "",
								name: "weeklyDays1",
								inputValue: 1,
								hidden: true,
								hideMode: "display"
							}, {
								xtype: "combo",
								id: "dayOfMonth",
								name: "monthlyOrYearlyDate",
								fieldLabel: "On",
								store: new Ext.data.JsonStore({
									root: "",
									fields: [{
											name: "label"
										}, {
											name: "value"
										}
									],
									data: [{
											value: 1,
											label: 1 + new Date("01/" + 1 + "/1970 00:00:00").format("S")
										}, {
											value: 2,
											label: 2 + new Date("01/" + 2 + "/1970 00:00:00").format("S")
										}, {
											value: 3,
											label: 3 + new Date("01/" + 3 + "/1970 00:00:00").format("S")
										}, {
											value: 4,
											label: 4 + new Date("01/" + 4 + "/1970 00:00:00").format("S")
										}, {
											value: 5,
											label: 5 + new Date("01/" + 5 + "/1970 00:00:00").format("S")
										}, {
											value: 6,
											label: 6 + new Date("01/" + 6 + "/1970 00:00:00").format("S")
										}, {
											value: 7,
											label: 7 + new Date("01/" + 7 + "/1970 00:00:00").format("S")
										}, {
											value: 8,
											label: 8 + new Date("01/" + 8 + "/1970 00:00:00").format("S")
										}, {
											value: 9,
											label: 9 + new Date("01/" + 9 + "/1970 00:00:00").format("S")
										}, {
											value: 10,
											label: 10 + new Date("01/" + 10 + "/1970 00:00:00").format("S")
										}, {
											value: 11,
											label: 11 + new Date("01/" + 11 + "/1970 00:00:00").format("S")
										}, {
											value: 12,
											label: 12 + new Date("01/" + 12 + "/1970 00:00:00").format("S")
										}, {
											value: 13,
											label: 13 + new Date("01/" + 13 + "/1970 00:00:00").format("S")
										}, {
											value: 14,
											label: 14 + new Date("01/" + 14 + "/1970 00:00:00").format("S")
										}, {
											value: 15,
											label: 15 + new Date("01/" + 15 + "/1970 00:00:00").format("S")
										}, {
											value: 16,
											label: 16 + new Date("01/" + 16 + "/1970 00:00:00").format("S")
										}, {
											value: 17,
											label: 17 + new Date("01/" + 17 + "/1970 00:00:00").format("S")
										}, {
											value: 18,
											label: 18 + new Date("01/" + 18 + "/1970 00:00:00").format("S")
										}, {
											value: 19,
											label: 19 + new Date("01/" + 19 + "/1970 00:00:00").format("S")
										}, {
											value: 20,
											label: 20 + new Date("01/" + 20 + "/1970 00:00:00").format("S")
										}, {
											value: 21,
											label: 21 + new Date("01/" + 21 + "/1970 00:00:00").format("S")
										}, {
											value: 22,
											label: 22 + new Date("01/" + 22 + "/1970 00:00:00").format("S")
										}, {
											value: 23,
											label: 23 + new Date("01/" + 23 + "/1970 00:00:00").format("S")
										}, {
											value: 24,
											label: 24 + new Date("01/" + 24 + "/1970 00:00:00").format("S")
										}, {
											value: 25,
											label: 25 + new Date("01/" + 25 + "/1970 00:00:00").format("S")
										}, {
											value: 26,
											label: 26 + new Date("01/" + 26 + "/1970 00:00:00").format("S")
										}, {
											value: 27,
											label: 27 + new Date("01/" + 27 + "/1970 00:00:00").format("S")
										}, {
											value: 28,
											label: 28 + new Date("01/" + 28 + "/1970 00:00:00").format("S")
										}, {
											value: 29,
											label: 29 + new Date("01/" + 29 + "/1970 00:00:00").format("S")
										}, {
											value: 30,
											label: 30 + new Date("01/" + 30 + "/1970 00:00:00").format("S")
										}, {
											value: 31,
											label: 31 + new Date("01/" + 31 + "/1970 00:00:00").format("S")
										}
									]
								}),
								mode: "local",
								displayField: "label",
								valueField: "value",
								forceSelection: true,
								typeAhead: true,
								minChars: 1,
								queryDelay: 10,
								valueNotFoundText: "...",
								triggerAction: "all",
								emptyText: "...",
								hidden: true
							}, {
								xtype: "combo",
								id: "monthOfYear",
								name: "yearlyMonth",
								fieldLabel: "",
								labelSeparator: "",
								store: new Ext.data.JsonStore({
									root: "",
									fields: [{
											name: "label"
										}, {
											name: "value"
										}
									],
									data: [{
											value: 1,
											label: "January"
										}, {
											value: 2,
											label: "February"
										}, {
											value: 3,
											label: "March"
										}, {
											value: 4,
											label: "April"
										}, {
											value: 5,
											label: "May"
										}, {
											value: 6,
											label: "June"
										}, {
											value: 7,
											label: "July"
										}, {
											value: 8,
											label: "August"
										}, {
											value: 9,
											label: "September"
										}, {
											value: 10,
											label: "October"
										}, {
											value: 11,
											label: "November"
										}, {
											value: 12,
											label: "December"
										}
									]
								}),
								mode: "local",
								displayField: "label",
								valueField: "value",
								forceSelection: true,
								typeAhead: true,
								minChars: 1,
								queryDelay: 10,
								valueNotFoundText: "...",
								triggerAction: "all",
								emptyText: "...",
								hidden: true
							}
						]
					}
				}
			]
		}
	]
}











