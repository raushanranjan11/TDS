{
	height: 475,
	width: 1050,
	closable: true,
	resizable: false,
	border: false,
	xtype: "panel",
	modal: true,
	listeners: {
		render: function (a) {}
	},
	items: [{
			xtype: "panel",
			layout: "form",
			closable: false,
			frame: true,
			border: false,
			width: 1100,
			height: 500,
			listeners: {
				render: function () {
					var b = this.findParentByType("awesomewindow").getData("cruiseSelectedRecord");
					var a = this.items.itemAt(0);
					console.log(b);
					console.log(b.cruiseLine);
					console.log(b.nameString);
					console.log( (b.cruiseLine) === " " ? b.nameString :  b.cruiseLine )
					a.items.itemAt(0).html = '<table><tr style:"padding-top:2px;"><center><b><font size="2">' +
						 (b.cruiseLine) == " " ? b.nameString :  b.cruiseLine 
						//b.cruiseLine 
						+ "--" + 
						//	b.cruiseName
						 (b.cruiseName) == " " ? b.nameString :  b.cruiseName 
							
						+ '</font></b></center></tr><tr style:"padding-top:20px;"><center><b><font size="2">' +
							//b.shipName  //destination
						 (b.shipName) == " " ? b.cruiseShipName :  b.shipName 
							
						
						+ "--" +
							
						//b.destinationName 
						 (b.destinationName) == " " ? b.destination :  b.destinationName 
							
						
						+ "--" + TDS.util.Format.dateSpecial(b.sailingdate, TDS.env.dateDayFormatDisplay) + "</font></b></center></tr></table>"
				}
			},
			items: [{
					xtype: "panel",
					height: 60,
					items: {
						xtype: "panel",
						height: 50,
						width: 1050,
						bodyStyle: "background:#fdd767;padding-top:10px;"
					}
				}, {
					html: '<center><font size="3"><b><u>Category Select</u></font></b></center>'
				}, {
					xtype: "panel",
					layout: "table",
					layoutConfig: {
						columns: 1
					},
					closable: false,
					defaults: {
						height: 50
					},
					height: 720,
					width: 1100,
					items: [{
							xtype: "panel",
							height: 175,
							width: 1050,
							layout: "table",
							layoutConfig: {
								columns: 2
							},
							items: [{
									xtype: "panel",
									height: 150,
									width: 520,
									layout: "table",
									layoutConfig: {
										columns: 1
									},
									items: [{
											xtype: "panel",
											height: 50,
											width: 500,
											layout: "table",
											style: "padding-top:10px;",
											layoutConfig: {
												columns: 4
											},
											defaults: {
												style: "padding: 2px 10px 2px 10px;",
												width: 100
											},
											items: [{
													xtype: "button",
													text: "Interior",
													id: "int",
													minWidth: 130,
													listeners: {
														click: function (a) {
															var c = Ext.getCmp("rates").getSelectionModel().getSelections();
															var d = c[0].data.deal;
															this.setText('<div style="color: red">Interior</div>');
															this.ownerCt.items.itemAt(1).setText('<div style="color: black">Ocean View</div>');
															this.ownerCt.items.itemAt(2).setText('<div style="color: black">Balcony</div>');
															this.ownerCt.items.itemAt(3).setText('<div style="color: black">Suite</div>');
															var b = this.findParentByType("awesomewindow").getData("offeringURI");
															Ext.Ajax.request({
																url: TDS.env.dataPath + b + "/searchCategories/collection",
																method: "GET",
																params: {
																	nameLike: "Inside",
																	cruiseFactory: true,
																	deal: d
																},
																data: {},
																success: function (e, j) {
																	var g = a.ownerCt.ownerCt.ownerCt.ownerCt.findByType("grid")[1];
																	var h = Ext.decode(e.responseText);
																	var l = h.category;
																	if (typeof l == "undefined") {
																		return
																	}
																	var k = [];
																	for (var f = 0; f < l.length; f++) {
																		h[l[f]].dataURI = l[f];
																		k.push(h[l[f]])
																	}
																	g.getStore().loadData(k)
																}
															})
														}
													}
												}, {
													xtype: "button",
													text: "Ocean View",
													minWidth: 130,
													listeners: {
														click: function (a) {
															this.setText('<div style="color: red">Ocean View</div>');
															this.ownerCt.items.itemAt(0).setText('<div style="color: black">Interior</div>');
															this.ownerCt.items.itemAt(2).setText('<div style="color: black">Balcony</div>');
															this.ownerCt.items.itemAt(3).setText('<div style="color: black">Suite</div>');
															var c = this.findParentByType("awesomewindow").getData("offeringURI");
															var b = Ext.getCmp("rates").getSelectionModel().getSelections();
															var d = b[0].data.deal;
															Ext.Ajax.request({
																url: TDS.env.dataPath + c + "/searchCategories/collection",
																method: "GET",
																params: {
																	nameLike: "Outside",
																	cruiseFactory: true,
																	deal: d
																},
																data: {},
																success: function (e, j) {
																	var g = a.ownerCt.ownerCt.ownerCt.ownerCt.findByType("grid")[1];
																	var h = Ext.decode(e.responseText);
																	var l = h.category;
																	if (typeof l == "undefined") {
																		return
																	}
																	var k = [];
																	for (var f = 0; f < l.length; f++) {
																		h[l[f]].dataURI = l[f];
																		k.push(h[l[f]])
																	}
																	g.getStore().loadData(k)
																}
															})
														}
													}
												}, {
													xtype: "button",
													text: "Balcony",
													minWidth: 130,
													listeners: {
														click: function (a) {
															this.setText('<div style="color: red">Balcony</div>');
															this.ownerCt.items.itemAt(0).setText('<div style="color: black">Interior</div>');
															this.ownerCt.items.itemAt(1).setText('<div style="color: black">Ocean View</div>');
															this.ownerCt.items.itemAt(3).setText('<div style="color: black">Suite</div>');
															var c = this.findParentByType("awesomewindow").getData("offeringURI");
															var b = Ext.getCmp("rates").getSelectionModel().getSelections();
															var d = b[0].data.deal;
															Ext.Ajax.request({
																url: TDS.env.dataPath + c + "/searchCategories/collection",
																method: "GET",
																params: {
																	nameLike: "Balcony",
																	cruiseFactory: true,
																	deal: d
																},
																data: {},
																success: function (e, j) {
																	var g = a.ownerCt.ownerCt.ownerCt.ownerCt.findByType("grid")[1];
																	var h = Ext.decode(e.responseText);
																	var l = h.category;
																	if (typeof l == "undefined") {
																		return
																	}
																	var k = [];
																	for (var f = 0; f < l.length; f++) {
																		h[l[f]].dataURI = l[f];
																		k.push(h[l[f]])
																	}
																	g.getStore().loadData(k)
																}
															})
														}
													}
												}, {
													xtype: "button",
													text: "Suite",
													minWidth: 130,
													colspan: 4,
													listeners: {
														click: function (a) {
															this.setText('<div style="color: red">Suite</div>');
															this.ownerCt.items.itemAt(0).setText('<div style="color: black">Interior</div>');
															this.ownerCt.items.itemAt(1).setText('<div style="color: black">Ocean View</div>');
															this.ownerCt.items.itemAt(2).setText('<div style="color: black">Balcony</div>');
															var c = this.findParentByType("awesomewindow").getData("offeringURI");
															var b = Ext.getCmp("rates").getSelectionModel().getSelections();
															var d = b[0].data.deal;
															Ext.Ajax.request({
																url: TDS.env.dataPath + c + "/searchCategories/collection",
																method: "GET",
																params: {
																	nameLike: "Suite",
																	cruiseFactory: true,
																	deal: d
																},
																data: {},
																success: function (e, j) {
																	var g = a.ownerCt.ownerCt.ownerCt.ownerCt.findByType("grid")[1];
																	var h = Ext.decode(e.responseText);
																	var l = h.category;
																	if (typeof l == "undefined") {
																		return
																	}
																	var k = [];
																	for (var f = 0; f < l.length; f++) {
																		h[l[f]].dataURI = l[f];
																		k.push(h[l[f]])
																	}
																	g.getStore().loadData(k)
																}
															})
														}
													}
												}
											]
										}, {
											xtype: "panel",
											width: 600,
											height: 50,
											defaults: {},
											style: "padding-left:60px;",
											layout: "table",
											layoutConfig: {
												columns: 8
											},
											items: [{
													xtype: "checkbox"
												}, {
													html: "<b>FWD</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox",
													style: "padding-left:30px;"
												}, {
													html: "<b>AFT</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>MID FWD</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>MID Ship</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>Obstructed</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>Port</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>Starboard</b>",
													style: "padding-left:20px;padding-right:20px;"
												}, {
													xtype: "checkbox"
												}, {
													html: "<b>Access</b>",
													style: "padding-left:20px;padding-right:20px;"
												}
											]
										}, {
											xtype: "panel",
											width: 500,
											height: 50,
											border: true,
											style: "padding-top:25px;",
											items: [{
													xtype: "button",
													text: "Edit",
													minWidth: 90,
													style: "float:right",
													handler: function () {
														var a = Ext.getCmp("rates").getSelectionModel().getSelections()[0];
														if (typeof(a) == "undefined") {
															Ext.Msg.alert("Alert", "Please Select a stateroom");
															return false
														}
														var b = new Ext.Window({
																height: 150,
																width: 600,
																closable: true,
																resizable: false,
																border: false,
																layout: "fit",
																modal: true,
																items: [{
																		xtype: "panel",
																		width: 600,
																		height: 120,
																		border: false,
																		items: [{
																				xtype: "panel",
																				width: 605,
																				height: 80,
																				border: false,
																				style: "padding:10px;",
																				layout: "table",
																				layoutConfig: {
																					columns: 8
																				},
																				defaults: {
																					bodyStyle: "padding: 10px 5px 10px 5px;"
																				},
																				listeners: {
																					render: function () {
																						var c = this.findByType("omnicrementer")
																					}
																				},
																				items: [{
																						html: " Adults:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "omnicrementer",
																						id: "adult",
																						name: "noOfAdult",
																						triggerAction: "all",
																						width: 60,
																						store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
																						value: 0,
																						maxValue: 14,
																						onTrigger1Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								if (this.allowNegative || this.el.dom.value > 0) {
																									var c = (this.getValue()) - 1;
																									if (c < this.minValue) {
																										return
																									}
																									this.setValue(c);
																									if (this.isValid(true)) {
																										this.fireEvent("trigger", this, this.getValue())
																									}
																								}
																							}
																						},
																						onTrigger2Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								var c = (this.getValue()) + 1;
																								if (c > this.maxValue) {
																									return
																								}
																								this.setValue(c);
																								if (this.isValid(true)) {
																									this.fireEvent("trigger", this, this.getValue())
																								}
																							}
																						},
																						listeners: {
																							trigger: function (i, g) {
																								var j = this.ownerCt.items.itemAt(3).items;
																								var d = this.getValue();
																								for (var f = 0; f < 14; f++) {
																									if (f < d) {
																										j.itemAt(f).show(true)
																									} else {
																										j.itemAt(f).hide(true)
																									}
																								}
																								var f = "";
																								var h = Ext.getCmp("form").getForm()
																							},
																							render: function () {
																								this.setValue(a.data.adult)
																							}
																						}
																					}, {
																						html: " Child:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "omnicrementer",
																						id: "child",
																						name: "noOfChild",
																						value: "0",
																						triggerAction: "all",
																						width: 60,
																						store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
																						value: 0,
																						maxValue: 14,
																						onTrigger1Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								if (this.allowNegative || this.el.dom.value > 0) {
																									var c = (this.getValue()) - 1;
																									if (c < this.minValue) {
																										return
																									}
																									this.setValue(c);
																									if (this.isValid(true)) {
																										this.fireEvent("trigger", this, this.getValue())
																									}
																								}
																							}
																						},
																						onTrigger2Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								var c = (this.getValue()) + 1;
																								if (c > this.maxValue) {
																									return
																								}
																								this.setValue(c);
																								if (this.isValid(true)) {
																									this.fireEvent("trigger", this, this.getValue())
																								}
																							}
																						},
																						listeners: {
																							trigger: function (i, g) {
																								var j = this.ownerCt.items.itemAt(7).items;
																								var d = this.getValue();
																								for (var f = 0; f < 14; f++) {
																									if (f < d) {
																										j.itemAt(f).show(true)
																									} else {
																										j.itemAt(f).hide(true)
																									}
																								}
																								var f = "";
																								var h = Ext.getCmp("form").getForm()
																							},
																							click: function () {},
																							specialkey: function (d, c) {},
																							onTrigger1Click: function () {},
																							render: function () {
																								this.setValue(a.data.child)
																							}
																						}
																					}, {
																						html: " Infant:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "omnicrementer",
																						name: "noOfInfants",
																						value: "0",
																						triggerAction: "all",
																						width: 60,
																						store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
																						value: 0,
																						maxValue: 14,
																						onTrigger1Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								if (this.allowNegative || this.el.dom.value > 0) {
																									var c = (this.getValue()) - 1;
																									if (c < this.minValue) {
																										return
																									}
																									this.setValue(c);
																									if (this.isValid(true)) {
																										this.fireEvent("trigger", this, this.getValue())
																									}
																								}
																							}
																						},
																						onTrigger2Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								var c = (this.getValue()) + 1;
																								if (c > this.maxValue) {
																									return
																								}
																								this.setValue(c);
																								if (this.isValid(true)) {
																									this.fireEvent("trigger", this, this.getValue())
																								}
																							}
																						},
																						listeners: {
																							trigger: function (i, g) {
																								var j = this.ownerCt.items.itemAt(11).items;
																								var d = this.getValue();
																								for (var f = 0; f < 14; f++) {
																									if (f < d) {
																										j.itemAt(f).show(true)
																									} else {
																										j.itemAt(f).hide(true)
																									}
																								}
																								var f = "";
																								var h = Ext.getCmp("form").getForm()
																							},
																							render: function () {
																								this.setValue(a.data.infant)
																							}
																						}
																					}, {
																						html: " Cons:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "omnicrementer",
																						name: "noOfCons",
																						value: "0",
																						triggerAction: "all",
																						width: 60,
																						store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
																						value: 0,
																						maxValue: 14,
																						onTrigger1Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								if (this.allowNegative || this.el.dom.value > 0) {
																									var c = (this.getValue()) - 1;
																									if (c < this.minValue) {
																										return
																									}
																									this.setValue(c);
																									if (this.isValid(true)) {
																										this.fireEvent("trigger", this, this.getValue())
																									}
																								}
																							}
																						},
																						onTrigger2Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								var c = (this.getValue()) + 1;
																								if (c > this.maxValue) {
																									return
																								}
																								this.setValue(c);
																								if (this.isValid(true)) {
																									this.fireEvent("trigger", this, this.getValue())
																								}
																							}
																						},
																						listeners: {
																							trigger: function (i, g) {
																								var j = this.ownerCt.items.itemAt(15).items;
																								var d = this.getValue();
																								for (var f = 0; f < 14; f++) {
																									if (f < d) {
																										j.itemAt(f).show(true)
																									} else {
																										j.itemAt(f).hide(true)
																									}
																								}
																								var f = "";
																								var h = Ext.getCmp("form").getForm()
																							},
																							render: function () {
																								this.setValue(a.data.cons)
																							}
																						}
																					}, {
																						html: " Access:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "omnicrementer",
																						name: "noOfAccess",
																						value: "0",
																						triggerAction: "all",
																						width: 60,
																						store: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
																						value: 0,
																						maxValue: 14,
																						onTrigger1Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								if (this.allowNegative || this.el.dom.value > 0) {
																									var c = (this.getValue()) - 1;
																									if (c < this.minValue) {
																										return
																									}
																									this.setValue(c);
																									if (this.isValid(true)) {
																										this.fireEvent("trigger", this, this.getValue())
																									}
																								}
																							}
																						},
																						onTrigger2Click: function () {
																							if (!isNaN(this.el.dom.value) && !this.disabled) {
																								var c = (this.getValue()) + 1;
																								if (c > this.maxValue) {
																									return
																								}
																								this.setValue(c);
																								if (this.isValid(true)) {
																									this.fireEvent("trigger", this, this.getValue())
																								}
																							}
																						},
																						listeners: {
																							trigger: function (i, g) {
																								var j = this.ownerCt.items.itemAt(19).items;
																								var d = this.getValue();
																								for (var f = 0; f < 14; f++) {
																									if (f < d) {
																										j.itemAt(f).show(true)
																									} else {
																										j.itemAt(f).hide(true)
																									}
																								}
																								var f = "";
																								var h = Ext.getCmp("form").getForm()
																							},
																							render: function () {
																								this.setValue(a.data.access)
																							}
																						}
																					}, {
																						html: " Deal:",
																						border: false,
																						style: " padding-left: 10px;",
																						width: 50
																					}, {
																						xtype: "combo",
																						width: 90,
																						name: "deal",
																						store: TDS.data.deals2,
																						editable: false,
																						forceSelection: true,
																						mode: "local",
																						triggerAction: "all",
																						displayField: "value",
																						valueField: "name",
																						listeners: {
																							render: function () {
																								this.setValue(a.data.deal)
																							}
																						}
																					}
																				]
																			}, {
																				xtype: "panel",
																				width: 600,
																				height: 70,
																				style: "padding:20px;",
																				layout: "column",
																				border: false,
																				items: [{
																						xtype: "checkbox"
																					}, {
																						html: "<b>Delete Stateroom</b>",
																						border: false,
																						style: "padding-left:20px;padding-right:20px;"
																					}, {
																						xtype: "panel",
																						border: false,
																						items: [{
																								xtype: "button",
																								text: "Save",
																								minWidth: 100,
																								id: "save",
																								handler: function () {
																									var e = a.data;
																									singlePrice = e.price / e.totalPax;
																									var k = this.findParentByType("window").findByType("omnicrementer");
																									var d = this.findParentByType("window").findByType("combo");
																									var c = Ext.getCmp("rates").getSelectionModel().getSelections();
																									var i = Ext.getCmp("rates").getStore().indexOf(c[0]);
																									var h = this.ownerCt.ownerCt.findByType("checkbox")[0].getValue();
																									if (h) {
																										Ext.getCmp("rates").getStore().remove(c[0])
																									} else {
																										Ext.getCmp("rates").getStore().getAt(i).set("adult", k[0].getValue());
																										Ext.getCmp("rates").getStore().getAt(i).set("child", k[1].getValue());
																										Ext.getCmp("rates").getStore().getAt(i).set("infant", k[2].getValue());
																										Ext.getCmp("rates").getStore().getAt(i).set("cons", k[3].getValue());
																										Ext.getCmp("rates").getStore().getAt(i).set("access", k[4].getValue());
																										var j = k[0].getValue() + k[1].getValue() + k[2].getValue() + k[3].getValue() + k[4].getValue();
																										Ext.getCmp("rates").getStore().getAt(i).set("totalPax", j);
																										Ext.getCmp("rates").getSelectionModel().clearSelections();
																										Ext.getCmp("rates").getStore().getAt(i).set("deal", d[0].getValue());
																										Ext.getCmp("rates").getStore().getAt(i).set("price", "");
																										Ext.getCmp("rates").getStore().getAt(i).commit();
																										var f = Ext.getCmp("cat").getSelectionModel().getSelections()
																									}
																									var g = Ext.getCmp("cat").getStore().getTotalCount();
																									this.findParentByType("window").close()
																								}
																							}
																						]
																					}
																				]
																			}
																		]
																	}
																],
																listeners: {
																	show: function (c) {
																		c.setPosition(600, 150)
																	}
																}
															}).show()
													}
												}
											]
										}
									]
								}, {
									xtype: "panel",
									height: 150,
									width: 575,
									border: true,
									layout: "column",
									style: "padding-left:5px;padding-top:10px;",
									items: [{
											xtype: "grid",
											id: "rates",
											height: 150,
											border: false,
											enableHdMenu: false,
											viewConfig: {},
											stateful: true,
											stateId: "grid",
											store: new Ext.data.JsonStore({
												url: "",
												identifier: "",
												fields: ["room", "adult", "child", "infant", "cons", "access", "adultAges", "infantAges", "childAges", "accessAges", "consAges", "totalPax", "deal", "price", "name", "deal", "dataURI", "status"]
											}),
											sm: new Ext.grid.RowSelectionModel({
												singleSelect: true
											}),
											cm: new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
														dataIndex: "chk",
														singleSelect: true
													}), {
														header: "STR",
														dataIndex: "room",
														width: 35,
														fixed: true
													}, {
														header: "  Adult ",
														dataIndex: "adult",
														width: 45,
														fixed: true
													}, {
														header: "Child",
														dataIndex: "child",
														width: 45,
														fixed: true
													}, {
														header: "Infant",
														dataIndex: "infant",
														width: 50,
														fixed: true
													}, {
														header: "Cons",
														width: 40,
														fixed: true,
														dataIndex: "cons"
													}, {
														header: "Access",
														width: 50,
														fixed: true,
														dataIndex: "access"
													}, {
														header: "Total",
														width: 35,
														fixed: true,
														dataIndex: "totalPax"
													}, {
														header: "Deal",
														dataIndex: "deal",
														width: 120,
														fixed: true,
														renderer: function (e, d, a, f, c, b) {
															return e
														}
													}, {
														header: "Price",
														width: 70,
														fixed: true,
														dataIndex: "price",
														renderer: function (e, d, a, f, c, b) {
															return e
														}
													}
												]),
											listeners: {
												beforerender: function () {},
												render: function (b) {
													var c = [];
													var a = this.findParentByType("awesomewindow").getData("stateRoomStore");
													a.each(function (d) {
														c.push(d.data)
													});
													b.getStore().loadData(c);
												},
												dblclick: function () {
													return false
												},
												cellclick: function (b, d, a, c) {
													if (a == 0) {}
												},
												rowclick: function (f, b, j) {
													var a = this.getStore().getTotalCount();
													var d = Ext.getCmp("cat").getStore().getTotalCount();
													var i = Ext.getCmp("rates").getSelectionModel().getSelections();
													var h = this;
													var c = this.ownerCt.findParentByType("awesomewindow");
													Ext.Ajax.request({
														url: TDS.env.dataPath + c.getData("offeringURI") + "/searchDealRates/collection?currency=AUD",
														method: "GET",
														params: {
															deal: i[0].data.deal
														},
														success: function (e, l) {
															var k = Ext.decode(e.responseText);
															var n = k.cruiseRates;
															if (typeof n == "undefined") {
																return
															}
															var m = [];
															for (var g = 0; g < n.length; g++) {
																k[n[g]].dataURI = n[g];
																m.push(k[n[g]])
															}
															Ext.getCmp("cat").getStore().loadData(m)
														}
													})
												}
											}
										}
									]
								}
							]
						}, {
							xtype: "panel",
							height: 170,
							width: 1030,
							autoScroll: true,
							items: [{
									xtype: "grid",
									height: 170,
									autoSubmit: true,
									alwaysUseCollection: true,
									border: true,
									id: "cat",
									viewConfig: {},
									store: new Ext.data.JsonStore({
										fields: ["deck", "name", "dataURI", "priceQuad", "priceSingle", "priceTriple", "priceDouble", "availability", "dealName",
											"categoryStatus","dealDescr"]
									}),
									enableHdMenu: false,
									enableColumnHide: false,
									enableColumnMove: false,
									enableColumnResize: false,
									sm: new Ext.grid.CheckboxSelectionModel({
										singleSelect: true
									}),
									clicksToEdit: 1,
									cm: new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
												singleSelect: true
											}), {
												header: "Grade",
												dataIndex: "name",
												width: 50,
												fixed: true,
												sortable: true,
												renderer: function (e, d, a, f, c, b) {
													return e.substring(0, e.indexOf("-")).trim()
												}
											}, {
												header: "Categories",
												dataIndex: "name",
												width: 120,
												fixed: true,
												sortable: true,
												renderer: function (e, d, a, f, c, b) {
													return e.substring(e.indexOf("-") + 1, e.length).trim()
												}
											}, {
												header: "Deals",
												dataIndex: "dealName",
												width: 120,
												fixed: true,
												renderer: function (e, d, a, f, c, b) {
													d.attr = 'ext:qtip="' + a.get("dealDescr") + '"';
													if (e == "") {
														return "Cruise Only"
													} else {
														return e
													}
												}
											}, {
												header: "Via",
												dataIndex: "via",
												sortable: true,
												width: 150,
												fixed: true,
												renderer: function (f, d, a, g, c, b) {
													var e = Ext.getCmp("cruiseAwesomeGrid").getSelectionModel().getSelections()[0].data.supplierURI;
													var source = Ext.getCmp("cruiseAwesomeGrid").getSelectionModel().getSelections()[0].data;
													if(typeof(source.source) == 'undefined'){
														console.log();
													return TDS.util.Format.displayResourceConciseName(e)
													}
													return TDS.util.Format.displayResourceConciseName(e)
												}
											}, {
												header: "Single ",
												dataIndex: "priceSingle",
												sortable: true,
												width: 80,
												fixed: true,
												renderer: function (f, d, a, h, c, b) {
													var e = Ext.getCmp("rates").getSelectionModel().getSelections();
													var g = e[0].data.totalPax;
													if (g == 1) {
														return f
													} else {
														return ""
													}
												}
											}, {
												header: "Twin ",
												dataIndex: "priceDouble",
												sortable: true,
												width: 80,
												fixed: true,
												renderer: function (f, d, a, h, c, b) {
													var e = Ext.getCmp("rates").getSelectionModel().getSelections();
													var g = e[0].data.totalPax;
													if (g == 2) {
														return f
													} else {
														return ""
													}
												}
											}, {
												header: "Triple ",
												dataIndex: "priceTriple",
												sortable: true,
												width: 80,
												fixed: true,
												renderer: function (f, d, a, h, c, b) {
													var e = Ext.getCmp("rates").getSelectionModel().getSelections();
													var g = e[0].data.totalPax;
													if (g == 3) {
														return f
													} else {
														return ""
													}
												}
											}, {
												header: "Quad ",
												dataIndex: "priceQuad",
												sortable: true,
												width: 80,
												fixed: true,
												renderer: function (f, d, a, h, c, b) {
													var e = Ext.getCmp("rates").getSelectionModel().getSelections();
													var g = e[0].data.totalPax;
													if (g == 4) {
														return f
													} else {
														return ""
													}
												}
											}, {
												header: "Availabilty",
												dataIndex: "categoryStatus",
												sortable: true,
												width: 80,
												fixed: true,
												renderer: function (e, d, a, h, c, b) {
													var g = a.get("name");
													var f = a.get("name").substring(g.indexOf("-") + 1, g.length).trim();
													if (f == "Inside") {
														return "RQ"
													}
													if (f == "Balcony") {
														return "OK"
													}
													return e;
												}
											}
										]),
									listeners: {
										sessioninit: function () {},
										render: function () {},
											cellclick: function (me, rowIndex, columnIndex, e) {
				console.log(columnIndex);
				if (columnIndex == 9) {
					var record = me.getStore().getAt(rowIndex);
					console.log(record);
					var rec = record.get('categoryStatus');
					console.log(rec);

					if(rec == "OK"){
						Ext.getCmp('state').enable()


					}

//					var win = new Ext.Window({
//height: 420,
//width: 970,
//closable: true,
//resizable: false,
//border: false,	title: "Stateroom",
//layout: "fit",
//modal: true,
//items: [
//
//{
//					width: 950,
//					height: 400,
//					items: [{
//							xtype: "panel",
//							height: 400,
//							border: true,
//							defaults: {
//								border: false
//							},
//							items: [
//
//
//									{
//									xtype: "panel",
//									height: 390,
//									width: 950,
//									frame: true,
//									style: "padding-top:5px;padding-left:10px;",
//									border: true,
//									items: [{
//											xtype: "grid",
//											id: "state",
//											height: 300,
//											enableColumnHide: false,
//											enableColumnMove: false,
//											enableColumnResize: false,
//											enableHdMenu: false,
//											tbar: [{
//													xtype: "textfield",
//													name: "cabinNumber",
//													hidden: true,
//													excludeFromSession: true,
//													enableKeyEvents: true,
//													width: 150
//												}
//											],
//											viewConfig: {
//												forceFit: true
//											},
//											store: new Ext.data.JsonStore({
//												id: "dataURIs",
//												fields: ["pricingPriceSell", "name", "catName", "deck", "position", "capacity", "berths", "rollaway", "cabinStatus", "room", "adult", "access", "child", "infant", "cons", "priceDouble", "priceSingle", "priceTriple", "priceQuad", "dataURI", "price", "totalPax", "deal", "adultAges", "infantAges", "childAges", "accessAges", "consAges", "paxDetails", "packageDetails", "isPackage", "status", "adjustment"]
//											}),
//											sm: new Ext.grid.CheckboxSelectionModel({
//												singleSelect: true
//											}),
//											columns: [new Ext.grid.CheckboxSelectionModel({
//													singleSelect: true
//												}), {
//													header: "Stateroom",
//													dataIndex: "room",
//													sortable: true
//												}, {
//													header: "Type",
//													dataIndex: "type",
//													sortable: true
//												},  {
//													header: "Decks",
//													dataIndex: "deck",
//													sortable: true
//												}, {
//													header: "Position",
//													dataIndex: "position",
//													sortable: true
//												}, {
//													header: "Connect",
//													dataIndex: "deck",
//													sortable: true
//												}, {
//													header: "Obstruct",
//													dataIndex: "position",
//													sortable: true
//												}, 
//														{
//													header: "Berths",
//													dataIndex: "deck",
//													sortable: true
//												}, {
//													header: "Rollaway",
//													dataIndex: "position",
//													sortable: true
//												}, 
//													
//														
//													{
//													header: "Crib",
//												//	dataIndex: "deal",
//													sortable: true
//												},  {
//													header: "Status",
//												//	dataIndex: "status",
//													sortable: true
//												}
//											],
//											listeners: {
//												render: function () {
//											
//												},
//											
//											}
//										},
//
//											{
//xtype: "panel",
//style: "padding-top:10px;padding-right:20px;",
//border: true,
//items: [{
//xtype: "panel",
//border: true,
//style: "float:right;",
//	defaults:{
//	style: "padding: 2px 10px 2px 10px;",
//
//},
//
//layout: "table",
//layoutConfig: {
//columns: 5
//},
//items: [
//	{
//xtype: "button",
//text: "Book",
//
//},{
//width:150
//},
//
//{
//xtype: "button",
//text: "Upgrade",
//
//},
//
//{
//xtype: "button",
//text: "Continue",
//
//},
//	{
//xtype: "button",
//text: "Back",
//
//}
//
//
//
//
//
//]
//}]
//}
//									]
//								},
//								
//							]
//					}]
//				}
//]
//}).show();
				/*	TDS.window.setWindow({
						title: 'Cruise Information',
						interfaceURI: 'pnr/offerings/cruise/terms.js',
						sourceDataURI: dataURI + '/information',
						mergeData: true,
						buttonOK: "OK",
						dataURI: {},
						data: {},
						params: {},
						callback: {
							fn: function (s, data, responseData) {
								if (s) {}
								scope: this
							}
						}
					});*/
				}
										},
										rowclick: function (o, l, g) {
											var m = Ext.getCmp("rates").getSelectionModel().getSelections()[0].data;
											var f = Ext.getCmp("rates").getSelectionModel().getSelections();
											var i = f.length;
											var a = Ext.getCmp("rates").getSelectionModel().getSelections();
											var k = Ext.getCmp("rates").getStore().indexOf(a[0]);
											var n = f[0].data.totalPax;
											var j = Ext.getCmp("cat").getSelectionModel().getSelections()[0].data;
											var c = 0;
											var d = "";
											var b = j.name.substring(j.name.indexOf("-") + 1, j.name.length).trim();
											if (b == "Inside") {
												d = "RQ"
											}
											if (b == "Balcony") {
												d = "OK"
											}
											if (n == 2) {
												c = j.priceDouble;
												Ext.getCmp("rates").getStore().getAt(k).set("price", '');
												Ext.getCmp("rates").getStore().getAt(k).set("price", ((j.priceDouble) * 2).toFixed(2));
												Ext.getCmp("rates").getStore().getAt(k).set("name", (j.name));
												Ext.getCmp("rates").getStore().getAt(k).set("dataURI", (j.dataURI));
												Ext.getCmp("rates").getStore().getAt(k).set("status", (d))
											}
											if (n == 1) {
												c = j.priceDouble;
												Ext.getCmp("rates").getStore().getAt(k).set("price", '');
												Ext.getCmp("rates").getStore().getAt(k).set("price", ((j.priceSingle) * 1).toFixed(2));
												Ext.getCmp("rates").getStore().getAt(k).set("name", (j.name));
												Ext.getCmp("rates").getStore().getAt(k).set("dataURI", (j.dataURI));
												Ext.getCmp("rates").getStore().getAt(k).set("status", (d))
											}
											if (n == 3) {
												c = j.priceDouble;
												Ext.getCmp("rates").getStore().getAt(k).set("price", '');
												Ext.getCmp("rates").getStore().getAt(k).set("price", ((j.priceTriple) * 3).toFixed(2));
												Ext.getCmp("rates").getStore().getAt(k).set("name", (j.name));
												Ext.getCmp("rates").getStore().getAt(k).set("dataURI", (j.dataURI));
												Ext.getCmp("rates").getStore().getAt(k).set("status", (d))
											}
											if (n == 4) {
												c = j.priceDouble;
												Ext.getCmp("rates").getStore().getAt(k).set("price", '');
												Ext.getCmp("rates").getStore().getAt(k).set("price", ((j.priceQuad) * 4).toFixed(2));
												Ext.getCmp("rates").getStore().getAt(k).set("name", (j.name));
												Ext.getCmp("rates").getStore().getAt(k).set("dataURI", (j.dataURI));
												Ext.getCmp("rates").getStore().getAt(k).set("status", (d))
											}
											var h = false;
											Ext.getCmp("rates").getStore().each(function (e) {
												if (!e.dirty) {
													h = true;
													return false
												}
											});
											if (h) {
												Ext.getCmp("cont").disable()
											} else {
												Ext.getCmp("cont").enable()
											}
										},
										toolbarinit: function () {}
									}
								}
							]
						}, {
							xtype: "panel",
							style: "padding-top:10px;padding-right:20px;",
							border: true,
							items: [{
									xtype: "panel",
									border: true,
									style: "float:right;",

										layout: "table",
							layoutConfig: {
								columns: 3
							},
									items: [

										{
											xtype: "button",
											text: "Select stateroom",
											disabled: true,
											id: "state",
											listeners: {
												click: function () {
														var win = new Ext.Window({
height: 420,
width: 970,
closable: true,
resizable: false,
border: false,	title: "Stateroom",
layout: "fit",
modal: true,
items: [

{
					width: 950,
					height: 400,
					items: [{
							xtype: "panel",
							height: 400,
							border: true,
							defaults: {
								border: false
							},
							items: [


									{
									xtype: "panel",
									height: 390,
									width: 950,
									frame: true,
									style: "padding-top:5px;padding-left:10px;",
									border: true,
									items: [{
											xtype: "grid",
											id: "state",
											height: 300,
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
												id: "dataURIs",
												fields: ["pricingPriceSell", "name", "catName", "deck", "position", "capacity", "berths", "rollaway", "cabinStatus", "room", "adult", "access", "child", "infant", "cons", "priceDouble", "priceSingle", "priceTriple", "priceQuad", "dataURI", "price", "totalPax", "deal", "adultAges", "infantAges", "childAges", "accessAges", "consAges", "paxDetails", "packageDetails", "isPackage", "status", "adjustment"]
											}),
											sm: new Ext.grid.CheckboxSelectionModel({
												singleSelect: true
											}),
											columns: [new Ext.grid.CheckboxSelectionModel({
													singleSelect: true
												}), {
													header: "Stateroom",
													dataIndex: "room",
													sortable: true
												}, {
													header: "Type",
													dataIndex: "type",
													sortable: true
												},  {
													header: "Decks",
													dataIndex: "deck",
													sortable: true
												}, {
													header: "Position",
													dataIndex: "position",
													sortable: true
												}, {
													header: "Connect",
													dataIndex: "deck",
													sortable: true
												}, {
													header: "Obstruct",
													dataIndex: "position",
													sortable: true
												}, 
														{
													header: "Berths",
													dataIndex: "deck",
													sortable: true
												}, {
													header: "Rollaway",
													dataIndex: "position",
													sortable: true
												}, 
													
														
													{
													header: "Crib",
												//	dataIndex: "deal",
													sortable: true
												},  {
													header: "Status",
												//	dataIndex: "status",
													sortable: true
												}
											],
											listeners: {
												render: function () {
											
												},
											
											}
										},

											{
xtype: "panel",
style: "padding-top:10px;padding-right:20px;",
border: true,
items: [{
xtype: "panel",
border: true,
style: "float:right;",
	defaults:{
	style: "padding: 2px 10px 2px 10px;",

},

layout: "table",
layoutConfig: {
columns: 5
},
items: [
	{
xtype: "button",
text: "Book",

},{
width:150
},

{
xtype: "button",
text: "Upgrade",

},

{
xtype: "button",
text: "Continue",

},
	{
xtype: "button",
text: "Back",

}





]
}]
}
									]
								},
								
							]
					}]
				}
]
}).show();
												}
											}
										},
								{width:10},
									
									
									
									{
											xtype: "button",
											text: "Continue",
											disabled: true,
											id: "cont",
											listeners: {
												click: function () {
													var c = this.ownerCt.ownerCt.ownerCt.findByType("grid")[0].getStore();
													var i = 0;
													var b = this.findParentByType("awesomewindow");
													console.log('^^^^^       ^^^^^^');
													console.log(b);
													var d = b.getData("offeringURI");
													var f = b.getData("dateFrom");
													var a = this.findParentByType("awesomewindow").getDataURI("pnr");
													var h = this.findParentByType("awesomewindow").getDataURI("cruiseSelectedRecord");
													var g = Ext.getCmp("rates").getStore();
													var e = this.findParentByType("awesomewindow").initialConfig.config.rategrid;
													var passengerRange = '';
													var adjustmentMarkup = '';
													this.findParentByType("awesomewindow").hide();
													TDS.window.setWindow({
														title: "Cabin Pricing",
														interfaceURI: "pnr/offerings/cruise/cruisepricing.js",
														buttonOK: false,
														buttonCancel: "Close",
														config: {
															rategrid: e
														},
														data: {
															totalPrice: i,
															stateRoomStore: c,
															offeringURI: d,
															dateFrom: f,
															rateURI: b.getData("rateURI"),
															cruiseSelectedRecord: h,
															stateroomData: g,
															passengerRange: passengerRange,
															adjustmentMarkup: adjustmentMarkup
														},
														dataURI: {
															pnr: a,
															offeringURI: d,
															cruiseSelectedRecord: h,
															stateroomData: g
														},
														callback: {
															fn: function (k, l, j) {
																if (k) {}
															}
														}
													})
												}
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
}









































































































































































































