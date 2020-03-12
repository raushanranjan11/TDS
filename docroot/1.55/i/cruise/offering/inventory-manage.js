{
	xtype: "form",
	border: false,
	layout: "fit",
	width: 575,
	markDataDirtyOnLoad: true,
	beforeDataLoad: function (e) { ;
		var c = this.getForm().findFieldAggressive("cruiseRateURI");
		if (c) {
			var a = this.ownerCt;
			var b = Ext.StoreMgr.lookup(a.getConfigValue("baseDataURI") + "/rates");
			c.store = b
		}
		return e
	},
	beforeSubmit: function (a) {

			console.log('**************');
		var c = {};
		c.recurrence = a.recurrence;
		if (a.scheduleType == "day") {
			c.daily = true
		} else {
			if (a.scheduleType == "weekday") {
				c.weekdaily = true
			} else {
				if (a.scheduleType == "week") {
					c.weeklyDays = [];
					for (var b = 1; b <= 7; b++) {
						if (a["weeklyDays" + b]) {
							delete a["weeklyDays" + b];
							c.weeklyDays.push(b)
						}
					}
					c.weekly = true
				} else {
					if (a.scheduleType == "month") {
						c.monthlyDate = a.monthlyOrYearlyDate;
						delete a.monthlyOrYearlyDate;
						c.monthly = true
					} else {
						if (a.scheduleType == "year") {
							c.yearlyDate = a.monthlyOrYearlyDate;
							delete a.monthlyOrYearlyDate;
							c.yearly = true
						}
					}
				}
			}
		}
		delete a.scheduleType;
		delete a.recurrence;
		a.dateOption = "individual";
		if (a.inventoryAction) {
			if (a.freesaleLimit != "" && typeof a.freesaleLimit != "undefined") {
				a.gtdLimit = null;
				a.inventoryAmount = a.freesaleLimit
			} else {
				if (a.gtdLimit != "" && typeof a.gtdLimit != "undefined") {
					a.inventoryAmount = a.gtdLimit;
					a.freesaleLimit = null
				} else {
					a.gtdLimit = null;
					a.freesaleLimit = null
				}
			}
			if (a.inventoryAction == "set") {
				a.inventoryAmount = a.inventorySetAmount
			}
			if (a.inventoryAction == "increase") {
				a.inventoryAmount = a.inventoryIncreaseAmount
			}
			if (a.inventoryAction == "decrease") {
				a.inventoryAmount = a.inventoryDecreaseAmount
			}
		} else {
			a.inventoryAction = "doNothing"
		}
		if (a.queueAction) {
			if (a.queueAction == "set") {
				a.queueAmount = a.queueSetAmount
			}
			if (a.queueAction == "increase") {
				a.queueAmount = a.queueIncreaseAmount
			}
			if (a.queueAction == "decrease") {
				a.queueAmount = a.queueDecreaseAmount
			}
		} else {
			a.queueAction = "doNothing"
		}
		if (a.waitingAction) {
			if (a.waitingAction == "set") {
				a.waitingAmount = a.waitingSetAmount
			}
			if (a.waitingAction == "increase") {
				a.waitingAmount = a.waitingIncreaseAmount
			}
			if (a.waitingAction == "decrease") {
				a.waitingAmount = a.waitingDecreaseAmount
			}
		} else {
			a.waitingAction = "doNothing"
		}
		return {
			submitDataAsParams: true,
			paramData: a,
			data: c
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
					title: "Departures",
					items: [{
							xtype: "panel",
							layout: "auto",
							height: 380,
							frame: true,
							items: [{
									xtype: "panel",
									layout: "form",
									border: false,//labelWidth : 150,
									labelWidth: 120,
									defaults: {},
									items: [
									/*	{
											xtype: "combo",
											name: "cruiseRateURI",
											forceSubmit: true,
											mode: "local",
											fieldLabel: "Category",
											width: 200,
											triggerAction: "all",
											editable: false,
											displayField: "name",
											valueField: "dataURI"
										}*/
								{
								fieldLabel: "Category",
								xtype: "hidden",
											name: "cruiseRateURI",
											forceSubmit: true,
									},

											{
											fieldLabel: "Category",readOnly:true,
											xtype: "textfield",
											name: "code",
												width: 40,
											forceSubmit: true,
										/*	mode: "local",
											fieldLabel: "Category",
											width: 200,
											triggerAction: "all",
											editable: false,
											displayField: "name",
											valueField: "dataURI"*/
										},
										{
											fieldLabel: "Category Descr.",readOnly:true,
											xtype: "textfield",
											name: "cateName",
												labelWidth : 150,
												width: 220,
											forceSubmit: true,
										/*	mode: "local",
											fieldLabel: "Category",
											width: 200,
											triggerAction: "all",
											editable: false,
											displayField: "name",
											valueField: "dataURI"*/
										}
										,	
										{
											xtype: "textfield",
											name: "depDate",
											fieldLabel: "Dep date",
											format: "dMy",
												width: 120,
											minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime(),
											excludeFromSession: true,readOnly:true,
										/*	enableKeyEvents: true,
											showToday: false,*/
										//	width: 200
										}, 
												
										/*	{
											xtype: "textfield",
											name: "depDateTexts",
											fieldLabel: "Dep date",
											width: 200
										}*/
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
							layout: "auto",
							height: 380,
							frame: true,
							items: [{
									xtype: "panel",
									layout: "column",
									border: false,
									hideBorders: true,
									bodyStyle: "padding: 0 4px;",
									items: [{
											columnWidth: 0.33,
											bodyStyle: "padding-right: 4px;",
											items: {
												xtype: "fieldset",
												title: "Inventory adjustment",
												height: 280,
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
														boxLabel: "Guaranteed: ",
														name: "inventoryAction",
														useRawValue: true,
														inputValue: "gtd",
														listeners: {
															check: function (a, b) {
																var c = this.ownerCt.items.itemAt(9);
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
														name: "gtdLimit",
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
														xtype: "radio",
														boxLabel: "Cancel Guaranteed",
														name: "inventoryAction",
														useRawValue: true,
														inputValue: "cancelGtd"
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
											columnWidth: 0.33,
											bodyStyle: "padding-left: 4px;",
											items: {
												xtype: "fieldset",
												title: "Request adjustment",
												height: 280,
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
										}, {
											columnWidth: 0.33,
											bodyStyle: "padding-left: 4px;",
											items: {
												xtype: "fieldset",
												title: "Waitlist adjustment",
												height: 280,
												layout: "table",
												layoutConfig: {
													columns: 2
												},
												defaults: {
													style: "margin: 2px 0;"
												},
												items: [{
														xtype: "radio",
														boxLabel: "Unlimited Waitlist",
														name: "waitingAction",
														useRawValue: true,
														inputValue: "unlimited"
													}, {
														border: false
													}, {
														xtype: "radio",
														boxLabel: "Increase by",
														name: "waitingAction",
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
														name: "waitingIncreaseAmount",
														width: 40
													}, {
														xtype: "radio",
														boxLabel: "Decrease by",
														name: "waitingAction",
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
														name: "waitingDecreaseAmount",
														width: 40
													}, {
														xtype: "radio",
														boxLabel: "Set to",
														name: "waitingAction",
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
														name: "waitingSetAmount",
														width: 40
													}, {
														xtype: "radio",
														boxLabel: "No requests",
														name: "waitingAction",
														useRawValue: true,
														inputValue: "consume"
													}, {
														border: false
													}, {
														colspan: 2,
														xtype: "radio",
														boxLabel: "Do not adjust Waitlist",
														name: "waitingAction",
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
						}
					]
				}, {
					title: "Recurrence",
					disabled: true,
					items: [{
							xtype: "panel",
							layout: "auto",
							height: 380,
							frame: true,
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
	]
}
















