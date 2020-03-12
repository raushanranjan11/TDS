{
	xtype : "form",
	border : false,
	id : "form",
	width : 775,
	requireStores : [{
			dataURI : TDS.env.dataPath + "cruise/offer",
			identifier : "cruise/classes",
			fields : ["name", "dataURI"]
		}
	],
/**	beforeSubmit : function (b) {
		var c = this.findByType("grid")[0];
		var d = c.getSelectionModel().getSelections()[0].data;
		var e = [];
		var a = Ext.getCmp("form").findByType("grid")[0].getStore();
		a.each(function (f) {
			e.push(f.data)
		});
		b.deals = e;
		return b
	},*/
	items : [{
			xtype : "tabpanel",
			activeTab : 0,
			layoutOnTabChange : true,
			height : 500,
			defaults : {
				bodyStyle : "padding: 6px 4px 6px 4px;"
			},
			items : [
			/*	{
					title : "General Info",
					items : [{
							xtype : "panel",
							layout : "fit",
							height : 600,
							frame : true,
							items : {
								xtype : "htmleditor",
								id : "editor1",
								style : " font-size: 12px;",
								name : "description",
								height : 200,
								hideLabel : true,
								labelSeparator : "",
								anchor : "100%",
								enableLinks : false,
								enableLists : false,
								enableSourceEdit : false,
								enableFontSize : false,
								enableFont : false,
								enableColors : false,
								enableAlignments : false,
								fontFamilies : ["Arial"]
							}
						}
					]
				},*/ {
					title : "Details",
					items : [{
							xtype : "panel",
							border : false,
							items : [
								{
									xtype : "panel",
									border : false,
									items : [{
											xtype : "panel",
											frame : true,
											layout : "form",
											border : false,
											labelWidth : 90,
											defaults : {
												style : "padding: 2px 4px 2px 4px;"
											},
											items : [
												{
													xtype : "textfield",
													//	xtype : "combo",
													allowBlank : false,
													name : "cruiseShipName",
													//readOnly : true,
													fieldLabel : "Ship",
													bodyStyle : "padding: 2px 4px 2px 4px;",
													width : 185,
/*
															allowBlank : false,
															//name : "shipId",
															//hideLabel : true,
															enableKeyEvents : true,
															//width : 150,
															typeAhead : true,
															excludeFromSession : true,
															triggerAction : "all",
															forceSelection : true,
															selectOnFocus : true,
															displayField : "shipName",
															valueField : "dataURI",
															editable : false,
															id : "dataURI",
															store : new Ext.data.CollectionStore({
																identifier : "ship",
																fields : ["shipName", "shipId"],
																reader : new Ext.data.CollectionReader({
																	identifier : "ship",
																	fields : ["shipName", "shipId", "dataURI"]
																})
															}),
																		listeners : {
																beforequery : function (a, b) {
																	console.log('hhhhhhhhhhhhhhhhhh');
																	console.log(a.combo.findParentByType("awesomewindow").initialConfig)
																		var supplierURI =  TDS.env.user.getSupplierURI();
																	var d = "";
																	//var c = a.combo.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + supplierURI + "/cruiseOfferings/shipName",
																	this.getStore().load()
																},
																	}*/
												},{
													xtype : "textfield",
													allowBlank : false,
													name : "cruiseLineName",
												//	readOnly : true,
													fieldLabel : "Cruise Line",
													bodyStyle : "padding: 2px 4px 2px 4px;",
													width : 185
												},  {
													xtype : "panel",
													layout : "table",
													style : "padding-left: 20; margin-bottom: 4px;",
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : "Cruise Name:",
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : "textfield",
															name : "name",
														//	readOnly : true,
															bodyStyle : "padding: 2px 4px 2px 4px;",
															width : 185
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Duration:",
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : "textfield",
															allowBlank : false,
															//fieldLabel : "Day/Date",
															enableKeyEvents : true,
															width : 180,//duration
															name : "duration",
														}
													]
												}, {
													xtype : "panel",
													layout : "table",
													style : "padding-left: 20; margin-bottom: 4px;",
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : "Cruise ID:",
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : "textfield",
															id : "cruiseNumber",
															name : "cruiseNumber",
															readOnly : true,
															fieldLabel : "Cruise ID",
															bodyStyle : "padding: 2px 4px 2px 4px;",
															width : 185
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Star Rating:",
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : "combo",
															store : TDS.data.destination,
															name : "starrating",
															fieldLabel : "Star Rating",
															width : 185,
															editable : false,
															forceSelection : true,
															mode : "local",
															triggerAction : "all",
															displayField : "text",
															valueField : "text",
															value : "...",
															tpl : '<tpl for="."><div class="x-combo-list-item"> {text}&nbsp;</div></tpl>'
														}
													]
												}, {
													xtype : "panel",
													layout : "table",
													style : "padding-left: 20; margin-bottom: 4px;",
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : "Destination:",
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : "combo",
															name : "destination",
															fieldLabel : "Destination",
															width : 185,
															editable : false,
															forceSelection : true,
															mode : "local",
															triggerAction : "all",
															displayField : "name",
															valueField : "externalId",
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath + "destination/collection",
																identifier : "destination",
																fields : ["name", "externalId"]
															})
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Seasion:",
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : "combo",
															name : "seasion",
															fieldLabel : "Seasion",
															width : 185,
															editable : false,
															forceSelection : true,
															triggerAction : "all",
															displayField : "startMonth",
															valueField : "startMonth",
															value : "...",
															tpl : '<tpl for="."><div class="x-combo-list-item"> {startMonth} - {endMonth}&nbsp;</div></tpl>',
															store : new Ext.data.CollectionStore({
																identifier : "seasion",
																fields : ["name", "id", "dataURI", "startMonth", "endMonth"],
																reader : new Ext.data.CollectionReader({
																	identifier : "seasion",
																	fields : ["name", "id", "dataURI", "startMonth", "endMonth"]
																})
															}),
															listeners : {
																beforequery : function (a) {
																	var b = this.findParentByType("form").getForm().findField("destination").getValue();
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + "cruise/offerings/seasion/collection",
																	this.getStore().load({
																		params : {
																			destinationId : b
																		}
																	})
																}
															}
														}
													]
												}, {
													xtype : "panel",
													layout : "table",
													style : "padding: 0; margin-bottom: 4px;",
													border : false,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : "Embarkation:",
															width : Ext.isIE ? 90 : 95
														}, {
															//xtype : "combo",
																xtype : "textfield",
																//textfield
																name:'embarkPorts',
															//name : "embarkation",
															minChars : 1,
															width : 185,
															typeAhead : true,
															triggerAction : "all",
															forceSelection : true,
															selectOnFocus : true,
															displayField : "name",
															valueField : "id",
															store : new Ext.data.CollectionStore({
																identifier : "embarkation",
																fields : ["name", "id", "dataURI"],
																reader : new Ext.data.CollectionReader({
																	identifier : "embarkation",
																	fields : ["name", "id", "dataURI"]
																})
															}),
															listeners : {
																beforequery : function (a) {
																	var b = this.findParentByType("form").getForm().findField("destination").getValue();
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + "cruise/offerings/embarkation/collection",
																	this.getStore().load({
																		params : {
																			destinationId : b
																		}
																	})
																}
															}
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Date:",
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : "datefield",
															allowBlank : false,
															//name : "embarkDate",
															//name: "arrivalDate",
															name: "departureDate",
															fieldLabel : "Day/Date",
															bodyStyle : "padding: 2px 4px 2px 4px;",
															enableKeyEvents : true,
															showToday : false,
															width : 100,
															format : "dMy D",
															minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
														}
													]
												}, {
													xtype : "panel",
													layout : "table",
													style : "padding: 0; margin-bottom: 4px;",
													border : false,
													hideBorders : true,
													layoutConfig : {
														columns : 6
													},
													items : [{
															html : "Dis-Embarkation:",
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : "combo",
																xtype : "textfield",
															name : "di_embarkPorts",
															minChars : 1,
															mode : "local",
															width : 185,
															typeAhead : true,
															triggerAction : "all",
															forceSelection : true,
															selectOnFocus : true,
															displayField : "name",
															valueField : "isoCode",
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath + "countries/collection",
																identifier : "countries",
																fields : ["name", "isoCode"]
															}),
															appendData : [{
																	name : "",
																	dataURI : ""
																}
															],
															listeners : {
																render : function () {
																	var a = this.ownerCt.findParentByType("awesomewindow");
																	var b = a.getData("fromCountryURI");
																	b = b.substring(b.lastIndexOf("/") + 1);
																	this.setValue(b)
																}
															}
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Date:",
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : "datefield",
															allowBlank : false,
														//	name : "departureDate",
															name: "arrivalDate",
															fieldLabel : "Day/Date",
															bodyStyle : "padding: 2px 4px 2px 4px;",
															enableKeyEvents : true,
															showToday : false,
															width : 100,
															format : "dMy D",
															minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
														}, 

																
														/*	{
															xtype : "button",
															text : "Summary",
															style : "padding-left:50px;",
															scope : this,
															handler : function (a) {
																var b = new Ext.Window({
																		height : 500,
																		width : 680,
																		closable : true,
																		resizable : false,
																		title : "Cruise Package Summary",
																		border : false,
																		layout : "fit",
																		modal : true,
																		scope : a,
																		items : [{
																				xtype : "panel",
																				bodyStyle : "padding: 0px;",
																				border : false,
																				layout : "form",
																				width : 680,
																				height : 400,
																				items : [{
																						xtype : "panel",
																						frame : true,
																						items : [{
																								xtype : "panel",
																								style : "padding:10px;",
																								layout : "table",
																								width : 600,
																								height : 80,
																								layoutConfig : {
																									columns : 1
																								},
																								items : [{
																										style : "padding-left:200px;",
																										html : '<center><font size="3"><b><u>Cruise Name Components</u></font></b></center>'
																									}, {
																										style : "padding-left:200px;padding-top:10px;",
																										html : '<center><font size="3"><b><u>Package Component</u></font></b></center>'
																									}
																								]
																							}, {
																								xtype : "panel",
																								layout : "table",
																								width : 600,
																								height : 30,
																								style : "padding-left:500px;padding-top:10px;",
																								items : [{
																										html : '<center><font size="3"><b><u>Hot Deals</u></font></b></center>'
																									}
																								]
																							}, {
																								xtype : "panel",
																								width : 650,
																								height : 50,
																								defaults : {},
																								style : "padding-left:60px;",
																								layout : "table",
																								layoutConfig : {
																									columns : 6
																								},
																								items : [{
																										xtype : "checkbox"
																									}, {
																										html : "<b>Air</b>",
																										style : "padding-left:20px;padding-right:20px;"
																									}, {
																										xtype : "checkbox",
																										style : "padding-left:30px;",
																										listeners : {
																											check : function () {
																												if (this.getValue()) {
																													Ext.getCmp("panel").show()
																												} else {
																													this.ownerCt.items.itemAt(1).setValue("")
																												}
																											}
																										}
																									}, {
																										html : "<b>Accommodation</b>",
																										style : "padding-left:20px;padding-right:20px;"
																									}, {
																										xtype : "checkbox"
																									}, {
																										html : "<b>Transfer</b>",
																										style : "padding-left:20px;padding-right:20px;"
																									}, {
																										xtype : "checkbox"
																									}, {
																										html : "<b>Rail</b>",
																										style : "padding-left:20px;padding-right:20px;"
																									}, {
																										xtype : "checkbox",
																										style : "padding-left:30px;"
																									}, {
																										html : "<b>Day Tours</b>",
																										style : "padding-left:20px;padding-right:20px;"
																									}
																								]
																							}
																						]
																					}, {
																						xtype : "panel",
																						width : 665,
																						height : 225,
																						autoScroll : true,
																						style : "padding:4px;",
																						layout : "table",
																						layoutConfig : {
																							columns : 1
																						},
																						items : [{
																								xtype : "panel",
																								id : "panel",
																								hidden : true,
																								autoScroll : true,
																								style : "padding:4px;",
																								layout : "table",
																								layoutConfig : {
																									columns : 1
																								},
																								items : [{
																										xtype : "panel",
																										border : false,
																										style : "padding-left:5px; padding-top:10px",
																										autoHeight : true,
																										layout : "column",
																										items : [{
																												xtype : "panel",
																												width : 100,
																												border : false,
																												items : [{
																														html : "<b>Pre-Cruise :</b>",
																														border : false,
																														style : " padding:5px"
																													}
																												]
																											}, {
																												xtype : "grid",
																												border : false,
																												width : 520,
																												autoHeight : true,
																												autoScroll : true,
																												store : new Ext.data.JsonStore({
																													url : "",
																													identifier : "packagePrice",
																													fields : ["gross", "comm", "nett", "status", "component", "cardIndex"]
																												}),
																												sm : new Ext.grid.CheckboxSelectionModel({
																													singleSelect : false
																												}),
																												clicksToEdit : 1,
																												cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
																															singleSelect : true,
																															dataIndex : "CheckBoxValue"
																														}), {
																															header : "City",
																															dataIndex : "city",
																															width : 50,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Hotel Name",
																															dataIndex : "hotelName",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Room Type",
																															dataIndex : "type",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Nts",
																															dataIndex : "nts",
																															width : 40,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Gross",
																															dataIndex : "gross",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("gross")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Comm",
																															width : 70,
																															fixed : true,
																															dataIndex : "comm",
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("comm")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Nett",
																															width : 70,
																															fixed : true,
																															dataIndex : "nett",
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("nett")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Status",
																															dataIndex : "status",
																															width : 50,
																															fixed : true
																														}
																													]),
																												listeners : {
																													render : function (e) {
																														var d = Ext.getCmp("cruiseNumber").getValue();
																														var f = Ext.getCmp("cruiseEditGrid").ownerCt.ownerCt.findParentByType("awesomewindow");
																														var c = f.initialConfig.destinationDataURI; ;
																														Ext.Ajax.request({
																															url : TDS.env.dataPath + c + "/packagePrice",
																															method : "GET",
																															success : function (g, i) {
																																var h = Ext.decode(g.responseText);
																																var j = h.packagePrice;
																																e.getStore().loadData(j)
																															}
																														})
																													}
																												}
																											}
																										]
																									}, {
																										xtype : "panel",
																										border : false,
																										style : "padding-left:5px; padding-top:10px",
																										autoHeight : true,
																										layout : "column",
																										items : [{
																												xtype : "panel",
																												width : 100,
																												border : false,
																												items : [{
																														html : "<b>Post-Cruise :</b>",
																														border : false,
																														style : " padding:5px"
																													}
																												]
																											}, {
																												xtype : "grid",
																												border : false,
																												width : 520,
																												autoHeight : true,
																												autoScroll : true,
																												store : new Ext.data.JsonStore({
																													url : "",
																													identifier : "packagePrice",
																													fields : ["gross", "comm", "nett", "status", "component", "cardIndex"]
																												}),
																												sm : new Ext.grid.CheckboxSelectionModel({
																													singleSelect : false
																												}),
																												clicksToEdit : 1,
																												cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
																															singleSelect : true,
																															dataIndex : "CheckBoxValue"
																														}), {
																															header : "City",
																															dataIndex : "city",
																															width : 50,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Hotel Name",
																															dataIndex : "hotelName",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Room Type",
																															dataIndex : "type",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Nts",
																															dataIndex : "nts",
																															width : 40,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g
																															}
																														}, {
																															header : "Gross",
																															dataIndex : "gross",
																															width : 70,
																															fixed : true,
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("gross")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Comm",
																															width : 70,
																															fixed : true,
																															dataIndex : "comm",
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("comm")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Nett",
																															width : 70,
																															fixed : true,
																															dataIndex : "nett",
																															renderer : function (g, f, c, h, e, d) {
																																return g != "" ? parseFloat(c.get("nett")).toFixed(2) : "0.00"
																															}
																														}, {
																															header : "Status",
																															dataIndex : "status",
																															width : 50,
																															fixed : true
																														}
																													]),
																												listeners : {
																													render : function (e) {
																														var d = Ext.getCmp("cruiseNumber").getValue();
																														var f = Ext.getCmp("cruiseEditGrid").ownerCt.ownerCt.findParentByType("awesomewindow");
																														var c = f.initialConfig.destinationDataURI; ;
																														Ext.Ajax.request({
																															url : TDS.env.dataPath + c + "/packagePrice",
																															method : "GET",
																															success : function (g, i) {
																																var h = Ext.decode(g.responseText);
																																var j = h.packagePrice;
																																e.getStore().loadData(j)
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
																					}, {
																						xtype : "panel",
																						layout : "table",
																						width : 668,
																						frame : true,
																						height : 40,
																						style : "padding-top:5px;",
																						layoutConfig : {
																							columns : 2
																						},
																						items : [{
																								style : "padding-left:200px;",
																								html : '<center><font size="3"><b><u>Gross Land Total</u></font></b></center>'
																							}, {
																								style : "padding-left:20px;",
																								html : '<center><font size="3"><b><u>00000.00</u></font></b></center>'
																							}
																						]
																					}
																				]
																			}
																		],
																		buttons : [{
																				text : "Edit",
																				id : "but",
																				handler : function () {}

																			}, {
																				text : "Close",
																				handler : function () {
																					this.findParentByType("window").close()
																				}
																			}
																		]
																	}).show()
															}
														}*/
													]
												},
											/*			{
									xtype : "panel",///title : "Itinerary",
									border : false,
									style : "padding-top:10px;",
									height : 205,
									items : [
										 {
						xtype : "htmleditor",
						name : "description",
						height :190,width : 735,
						//hideLabel : true,
						labelSeparator : "",
						anchor : "100%",
						enableLinks : true,
						enableLists : true,
						enableSourceEdit : true,
						enableFontSize : true,
						enableFont : true,
						enableColors : true,
						enableAlignments : true
					}


										]
 },*/
											]
										}
									]
								}, 
										 {
					title : "Included",
					items : [{
							xtype : "panel",
							layout : "fit",
							height : 460,
							frame : true,
							items : {
								xtype : "htmleditor",
								id : "editor",
								name : "descIncluded",
								height : 200,
								hideLabel : true,
								labelSeparator : "",
								anchor : "100%",
								enableLinks : true,
								enableLists : true,
								enableSourceEdit : true,
								enableFontSize : true,
								enableFont : true,
								enableColors : true,
								enableAlignments : true,
								enableFontSize : true,
								style : " font-size: 21px;",
								fontFamilies : ["Arial"],
								listeners : {
									render : function () {}

								}
							}
						}
					]
				},
										{
									xtype : "panel",///title : "Itinerary",
									border : false,
									style : "padding-top:10px;",
									height : 225,
									items : [
										 {
						xtype : "htmleditor",
						name : "description",
						height :200,width : 765,
						//hideLabel : true,
						labelSeparator : "",
						anchor : "100%",
						enableLinks : true,
						enableLists : true,
						enableSourceEdit : true,
						enableFontSize : true,
						enableFont : true,
						enableColors : true,
						enableAlignments : true
					}


										]
 },
										
									
									
									
									
					/*				{
									xtype : "panel",
									layout : "fit",
									frame : true,
									height : 260,
									width : 760,
									style : "padding-top: 10px; margin-bottom: 2px;",
									border : true,
									items : [{
											xtype : "editorgrid",
											id : "cruiseEditGrid",
											border : true,
											clicksToEdit : 1,
											multiSelect : true,
											width : 650,
											sm : new Ext.grid.CheckboxSelectionModel({
												singleSelect : true,
												checkOnly : true
											}),
											store : new Ext.data.CollectionStore({
												url : "",
												id : "dataURI",
												identifier : "deals",
												fields : ["nameString", "dataURI", "currency", "priceSingle", "priceDouble", "priceTriple", "cruiseRateURI", "paxType", "priceQuad", "expireDate", "dealDescr", "inc", "cruiseDealInclusionURI"]
											}),
											cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
														checkOnly : true,
														listeners : {
															selectionchange : function (a) {}

														}
													}), {
														header : "Deals",
														dataIndex : "dealName",
														width : 100,
														editor : new Ext.form.ComboBox({
															store : TDS.data.deals2,
															editable : false,
															forceSelection : true,
															mode : "local",
															triggerAction : "all",
															displayField : "name",
															valueField : "value",
															listeners : {
																beforequery : function (a) {}

															}
														})
													}, {
														header : "Category",
														dataIndex : "dataURI",
														width : 100,
														editor : new Ext.form.ComboBox({
															mode : "remote",
															triggerAction : "all",
															displayField : "nameString",
															valueField : "dataURI",
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath,
																identifier : "categories",
																fields : ["name", "nameString", "dataURI"],
																autoLoad : false,
																reader : new Ext.data.CollectionReader({
																	identifier : "categories",
																	fields : ["name", "nameString", "dataURI"]
																})
															}),
															listeners : {
																beforequery : function (b) {
																	var a = Ext.getCmp("form").findByType("grid")[0].initialConfig.cruiseURI;
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + a + "/categories",
																	this.getStore().load({})
																},
																select : function (c, a, b) {}

															}
														}),
														renderer : function (f, d, e) {
															return e.get("name")
														}
													}, {
														header : "Currency",
														dataIndex : "currency",
														width : 60
													}, {
														header : "Single",
														width : 80,
														dataIndex : "priceSingle",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("priceSingle")).toFixed(2) : ""
														}
													}, {
														header : "Twin",
														width : 80,
														dataIndex : "priceDouble",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("priceDouble")).toFixed(2) : ""
														}
													}, {
														header : "Triple",
														width : 80,
														dataIndex : "priceTriple",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("priceTriple")).toFixed(2) : ""
														}
													}, {
														header : "Quad",
														dataIndex : "priceQuad",
														width : 80,
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("priceQuad")).toFixed(2) : ""
														}
													}, {
														header : "Expires",
														width : 60,
														dataIndex : "expireDate",
														editor : new Ext.form.DateField({}),
														renderer : Ext.util.Format.dateRenderer("dMy")
													}, {
														header : "Inc",
														width : 80,
														dataIndex : "inc",
														renderer : function (f, b, a, d, g, c) {
															var e = Ext.getCmp("cruiseEditGrid");
															return ' <button type="button" text="Description" id="button' + d + g + '" ">Inc.</button>'
														}
													}
												]),
											listeners : {
												render : function (b) {
													var a = this.findParentByType("awesomewindow").aw.sourceDataURI;
													this.getStore().proxy.conn.method = "GET",
													this.getStore().proxy.conn.url = TDS.env.dataPath + a + "/dealRate",
													this.getStore().load()
												},
												rowclick : function (b, d, c) {
													var a = b.getStore().getAt(d);
													if (b.getSelectionModel().selections.length == 0) {
														b.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0).setValue("")
													}
												},
												beforeedit : function (b, a) {
													if (b.column == 3 && typeof(b.record.get("dataURI")) != "undefined") {
														return false
													}
												},
												afteredit : function (b, a) {},
												cellclick : function (c, j, d, i) {
													var h = c.getStore().getAt(j);
													var a = h.get("dataURI");
													if (d == 9) {
														var f = document.getElementById("button" + j + d);
														function b() {
															var e = new Ext.Window({
																	height : 400,
																	width : 600,
																	closable : true,
																	resizable : false,
																	border : false,
																	layout : "fit",
																	modal : true,
																	frame : true,
																	title : "Deal Inclusion",
																	items : [{
																			xtype : "form",
																			width : 600,
																			height : 320,
																			frame : true,
																			border : false,
																			items : [{
																					xtype : "panel",
																					width : 550,
																					height : 120,
																					frame : true,
																					border : true,
																					style : "padding:20px;",
																					layout : "fit",
																					items : [{
																							height : 100,
																							xtype : "textarea",
																							name : "dealDescription",
																							width : 520,
																							emptyText : "Free Form Text"
																						}
																					]
																				}, {
																					xtype : "panel",
																					width : 580,
																					height : 220,
																					border : true,
																					layout : "fit",
																					items : [{
																							xtype : "panel",
																							width : 550,
																							height : 200,
																							border : true,
																							style : "padding:20px;",
																							layout : "table",
																							layoutConfig : {
																								columns : 8
																							},
																							items : [{
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "cruiseOnly"
																								}, {
																									html : "<b>Cruise Only</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "portcharge"
																								}, {
																									html : "<b>Port Charges and Taxes</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "cruiselandpackage"
																								}, {
																									html : "<b>Cruise & Land Package</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "drinkpackage"
																								}, {
																									html : "<b>Drink Package</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "flycruise"
																								}, {
																									html : "<b>Fly Cruise </b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "gratuities"
																								}, {
																									html : "<b>Gratuities</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "sightseeing"
																								}, {
																									html : "<b>Sightseeing</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "sightseeingpre"
																								}, {
																									html : "<b>Pre</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "sightseeingpost"
																								}, {
																									html : "<b>Post</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "meal"
																								}, {
																									html : "<b>Meals</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "transfer"
																								}, {
																									html : "<b>Transfers</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "transferpre"
																								}, {
																									html : "<b>Pre</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "transferpost"
																								}, {
																									html : "<b>Post</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "airfairtaxes"
																								}, {
																									html : "<b>Air Fair & Taxes</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "accommodation"
																								}, {
																									html : "<b>Accommodation</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "accommodationpre"
																								}, {
																									html : "<b>Pre</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									name : "accommodationpost"
																								}, {
																									html : "<b>Post</b>",
																									style : "padding-left:5px;padding-right:5px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "onboard_credit"
																								}, {
																									html : "<b>On Board Credit</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "rail_cruise"
																								}, {
																									html : "<b>Rail / Cruise</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									width : 20
																								}, {
																									xtype : "checkbox",
																									style : "padding-left:20px;",
																									name : "shore_excursions"
																								}, {
																									html : "<b>Shore Excursions</b>",
																									style : "padding-left:10px;padding-right:10px;padding-top:5px;"
																								}
																							]
																						}
																					]
																				}, {
																					xtype : "button",
																					text : "Save",
																					id : "save",
																					handler : function () {
																						var k = {};
																						Ext.getCmp("save").findParentByType("form").getForm().items.each(function (m) {
																							var l = m.getValue();
																							k[m.name] = l
																						});
																						var g = [];
																						g.push(k);
																						c.getStore().getAt(j).set("inc", k);
																						this.findParentByType("window").close()
																					}
																				}
																			],
																			listeners : {
																				render : function () {
																					var g = h.get("cruiseDealInclusionURI");
																					if (g == "") {}

																					Ext.Ajax.request({
																						url : TDS.env.dataPath + h.get("dataURI") + "/inclusion",
																						params : {
																							cruiseDealInclusionURI : g
																						},
																						method : "GET",
																						success : function (l, p) {
																							var o = Ext.decode(l.responseText);
																							var q = Ext.getCmp("save").findParentByType("form").getForm();
																							for (var m = 0; m < q.items.length; m++) {
																								var n = q.items.items[m];
																								var k = o[n.name];
																								n.setValue(k)
																							}
																						}
																					})
																				}
																			}
																		}
																	]
																}).show()
														}
														f.addEventListener("click", b, false)
													}
												}
											}
										}
									],
									bbar : [{
											xtype : "button",
											text : "Add",
											handler : function () {
												var b = this.ownerCt.ownerCt.findByType("editorgrid")[0];
												var a = b.getStore();
												a.add([new a.recordType({
															name : "",
															currency : "AUD",
															priceSingle : "",
															priceDouble : "",
															priceTriple : "",
															priceQuad : ""
														})]);
												b.newRecordIndex = a.getCount() - 1;
												b.startEditing(b.newRecordIndex, 1);
												b.getSelectionModel().selectRow(b.newRecordIndex)
											}
										}, {
											xtype : "button",
											text : "Delete",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("editorgrid")[0];
												var b = a.getSelectionModel().getSelections();
												if (b.length == 1) {
													Ext.Ajax.request({
														url : TDS.env.dataPath + "cruise/offering/" + b[0].get("dataURI"),
														callback : function (d, e, f) {
															if (e) {
																a.getStore().remove(b[0])
															} else {}

														},
														scope : this
													})
												}
											}
										}
									]
								}
									*/
							]
						}
					]
				}, {
					title : "Ship Info",
					items : [{
							xtype : "panel",
							height : 460,
							frame : true,
							layout : "table",
							layoutConfig : {
								columns : 2
							},
							defaults : {
								style : "padding:10px"
							},
							autoScroll : true,
							items : [{
									xtype : "panel",
									border : false,
									items : [{
											width : 320,
											height : 150,
											autoScroll : true,
											border : false,
											id : "shipInfo",
											html : "shipInfoImage",
											listeners : {
												render : function () { ;
													this.body.setStyle("background", "white");
													var b = "";
													var d = this.ownerCt.ownerCt.findParentByType("awesomewindow");
													var c = d.aw.data.shipInfoGraphicImgPath;
													if (typeof c == "undefined") {
														c = ""
													}
													var a = c.substring(0, 4);
													if (Ext.isEmpty(a)) {
														this.html = '<center><img  id="shipInfoImageId"   name="shipInfoImage"   alt="shipInfoImage" align="middle" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
													} else {
														b = "../" + c;
														this.html = '<center><img  id="shipInfoImageId"  name="shipInfoImage" src=' + b + ' alt="shipInfoImage" align="middle" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
													}
												}
											}
										}, {
											xtype : "panel",
											border : false,
											layout : "table",
											style : "padding: 20px 10px 0px 50px; ",
											column : 3,
											items : [{
													xtype : "textfield",
													id : "shipInfoImageValue",
													hidden : true,
													name : "shipInfoGraphicImgPath"
												}, {
													html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="shipInfofileUpLoads"type="file"  /></td></form>',
													width : 165,
													style : "padding: 0px 10px 0px 0px; "
												}, {
													xtype : "button",
													text : "Upload",
													style : "padding: 0px 50px 0px 15px;",
													handler : function (b) { ;
														Ext.getCmp("shipInfo").html = '<img border="0" id="shipInfoImageId" name="shipInfoImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
														var i = this.ownerCt.findParentByType("awesomewindow");
														var a = i.aw.sourceDataURI;
														var h = document.getElementById("shipInfofileUpLoads").value;
														var d = document.getElementById("shipInfofileUpLoads").files[0];
														if (d) {
															var e = 0;
															j()
														}
														function j() {
															var l = new FormData();
															l.append("image", d);
															var m = new XMLHttpRequest();
															m.upload.addEventListener("progress", f, false);
															m.addEventListener("load", g, false);
															m.addEventListener("error", c, false);
															m.addEventListener("abort", k, false);
															m.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp("shipInfoImageValue").getValue() + "&imageStorePath=" + a);
															m.send(l);
															m.onreadystatechange = function () {  
																if (m.readyState == 4) {
																	var p = m.getAllResponseHeaders();
																	var q = m.responseText;
																	var o = a;
																	var n = "GraphicsImg/" + q;
																	document.getElementById("imageName").value = n;
																	Ext.getCmp("shipInfoImageValue").setValue(n);
																	document.images.shipInfoImage.src = "../" + n;
																	document.getElementById("imageName").value = n
																}
															}
														}
														function f(l) {}

														function g(l) {}

														function c(l) {
															Ext.Msg.alert("", "There was an error attempting to upload the file.")
														}
														function k(l) {
															Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
														}
													}
												}, {
													xtype : "button",
													text : "Delete",
													style : 'border="0";',
													handler : function (a) {
														document.images.shipInfoImage.src = "";
														document.getElementById("shipInfofileUpLoads").value = "";
														Ext.getCmp("shipInfoImageValue").setValue("")
													}
												}
											]
										}
									]
								}, {
									xtype : "htmleditor",
									name : "notes",
									height : 400,
									width : 320,
									hideLabel : true,
									labelSeparator : "",
									anchor : "100%",
									enableLinks : false,
									enableLists : false,
									enableSourceEdit : false,
									enableFontSize : false,
									enableFont : false,
									enableColors : false,
									enableAlignments : false
								}
							]
						}
					]
				}, {
					title : "Deck Plan",
					items : [{
							xtype : "panel",
							height : 460,
							frame : true,
							layout : "table",
							layoutConfig : {
								columns : 2
							},
							autoScroll : true,
							items : [{
									width : 320,
									height : 150,
									autoScroll : true,
									border : false,
									id : "ship",
									html : "cabinImage",
									listeners : {
										render : function () { ;
											this.body.setStyle("background", "white");
											var b = "";
											var d = this.ownerCt.ownerCt.findParentByType("awesomewindow");
											var c = d.aw.data.shipGraphicImgPath;
											if (typeof c == "undefined") {
												c = ""
											}
											var a = c.substring(0, 4);
											if (Ext.isEmpty(a)) {
												this.html = '<center><img border="0" max-width="100%" max-height = "100%" id="shipImageId" name="shipImage"   alt="shipImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
											} else {
												b = "../" + c;
												this.html = '<center><img border="0"   id="shipImageId" name="shipImage" src=' + b + ' alt="shipImage" > </center> <input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
											}
										}
									}
								}, {
									autoScroll : true,
									id : "deck",
									html : "deckImage",
									style : "  padding-left:10px; ",
									border : true,
									width : 320,
									height : 425,
									rowspan : 5,
									listeners : {
										render : function () { ;
											this.body.setStyle("background", "white");
											var b = "";
											var d = this.ownerCt.ownerCt.findParentByType("awesomewindow");
											var c = d.aw.data.deckGraphicImgPath;
											if (typeof c == "undefined") {
												c = ""
											}
											var a = c.substring(0, 4);
											if (a == "http") {
												this.html = '<center><img border="0" id="deckImageId" name="deckImage"  alt="deckImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
											} else {
												b = "../" + c;
												this.html = '<center><img border="0"  id="deckImageId" name="deckImage" src=' + b + ' alt="deckImage"></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
											}
										}
									}
								}, {
									xtype : "label",
									html : "<b><u>Ship Decks</u></b>"
								}, {
									xtype : "panel",
									border : false,
									layout : "table",
									column : 4,
									items : [{
											html : "Browse",
											border : false
										}, {
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border=false;"><td width= "75"><input width= "75" name="fileUpLoad" id="shipUpLoads"type="file"  /></td></form>',
											width : 185,
											style : "padding: 0px 15px 0px 10px; "
										}, {
											xtype : "textfield",
											id : "shipImageValue",
											hidden : true,
											name : "shipGraphicImgPath"
										}, {
											xtype : "button",
											text : "Upload",
											style : "padding: 0px 00px 0px 10px; ",
											handler : function (b) { ;
												Ext.getCmp("ship").html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var i = this.ownerCt.findParentByType("awesomewindow");
												var a = i.aw.sourceDataURI;
												var h = document.getElementById("shipUpLoads").value;
												var d = document.getElementById("shipUpLoads").files[0];
												if (d) {
													var e = 0;
													j()
												}
												function j() {
													var l = new FormData();
													l.append("image", d);
													var m = new XMLHttpRequest();
													m.upload.addEventListener("progress", f, false);
													m.addEventListener("load", g, false);
													m.addEventListener("error", c, false);
													m.addEventListener("abort", k, false);
													m.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''&imageStorePath=" + a);
													m.send(l);
													m.onreadystatechange = function () {
														if (m.readyState == 4) {
															var q = m.getAllResponseHeaders();
															var r = m.responseText;
															var p = a;
															var o = "GraphicsImg/" + r;
															document.getElementById("imageName").value = o;
															var n = {
																deletePath : false,
																imagePath : document.getElementById("imageName").value
															};
															Ext.Ajax.request({
																url : TDS.env.dataPath + a + "/shipGraphicImage",
																method : "POST",
																jsonData : n,
																callback : function (w, t, v) {
																	if (t) {
																		Ext.Msg.alert("", "Graphics Uploaded successfully..");
																		var u = Ext.util.JSON.decode(v.responseText);
																		Ext.getCmp("shipImageValue").setValue(u.shipGraphicImgPath);
																		document.images.shipImage.src = "../" + u.shipGraphicImgPath;
																		document.getElementById("imageName").value = u.shipGraphicImgPath
																	} else {
																		Ext.Msg.alert("", "Error coocured..")
																	}
																},
																scope : this
															})
														}
													}
												}
												function f(l) {}

												function g(l) {}

												function c(l) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.")
												}
												function k(l) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
												}
											}
										}, {
											xtype : "button",
											text : "Delete",
											style : "padding: 0px 00px 0px 10px; ",
											handler : function (d) { ;
												document.images.shipImage.src = "";
												Ext.getCmp("ship").html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var c = this.ownerCt.findParentByType("awesomewindow");
												var a = c.aw.sourceDataURI;
												var b = document.getElementById("imageName").value;
												if (b) {
													var e = {};
													if (b) {
														e.removefile = b
													}
													if (b) {
														e.imageStorePath = a
													}
													e.imageName = Ext.getCmp("shipImageValue").getValue();
													Ext.Ajax.request({
														url : TDS.env.dataPath + "fileUpload",
														method : "POST",
														params : e,
														callback : function (i, g, h) {
															if (g) {
																Ext.Msg.alert("", "Deleted succussefully.");
																document.images.shipImageId.src = "";
																document.getElementById("imageName").value = "";
																document.getElementById("shipUpLoads").value = "";
																var f = {
																	deletePath : true,
																	imagePath : document.getElementById("imageName").value
																};
																Ext.Ajax.request({
																	url : TDS.env.dataPath + a + "/shipGraphicImage",
																	method : "POST",
																	jsonData : f,
																	scope : this
																})
															} else {
																Ext.Msg.alert("", "Error coocured..")
															}
														}
													})
												}
											}
										}
									]
								}, {
									xtype : "label",
									html : "<b><u>Decks Plan</u></b>"
								}, {
									xtype : "panel",
									border : false,
									layout : "table",
									column : 5,
									items : [{
											html : "Browse",
											border : false
										}, {
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="deckUpLoads"type="file"  /></td></form>',
											width : 185,
											style : "padding: 0px 15px 0px 10px; "
										}, {
											xtype : "textfield",
											id : "deckImageValue",
											hidden : true,
											name : "deckGraphicImgPath"
										}, {
											xtype : "button",
											text : "Upload",
											style : "padding: 0px 00px 0px 10px; ",
											handler : function (b) { ;
												Ext.getCmp("deck").html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var i = this.ownerCt.findParentByType("awesomewindow");
												var a = i.aw.sourceDataURI;
												var h = document.getElementById("deckUpLoads").value;
												var d = document.getElementById("deckUpLoads").files[0];
												if (d) {
													var e = 0;
													j()
												}
												function j() {
													var l = new FormData();
													l.append("image", d);
													var m = new XMLHttpRequest();
													m.upload.addEventListener("progress", f, false);
													m.addEventListener("load", g, false);
													m.addEventListener("error", c, false);
													m.addEventListener("abort", k, false);
													m.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''&imageStorePath=" + a);
													m.send(l);
													m.onreadystatechange = function () {
														if (m.readyState == 4) {
															var q = m.getAllResponseHeaders();
															var r = m.responseText;
															var p = a;
															var o = "GraphicsImg/" + r;
															document.getElementById("imageName").value = o;
															var n = {
																deletePath : false,
																imagePath : document.getElementById("imageName").value
															};
															Ext.Ajax.request({
																url : TDS.env.dataPath + a + "/deckGraphicImage",
																method : "POST",
																jsonData : n,
																callback : function (w, t, v) {
																	if (t) {
																		Ext.Msg.alert("", "Graphics Uploaded successfully..");
																		var u = Ext.util.JSON.decode(v.responseText);
																		Ext.getCmp("deckImageValue").setValue(u.deckGraphicImgPath);
																		document.images.deckImage.src = "../" + u.deckGraphicImgPath;
																		document.getElementById("imageName").value = u.deckGraphicImgPath
																	} else {
																		Ext.Msg.alert("", "Error coocured..")
																	}
																},
																scope : this
															})
														}
													}
												}
												function f(l) {}

												function g(l) {}

												function c(l) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.")
												}
												function k(l) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
												}
											}
										}, {
											xtype : "button",
											text : "Delete",
											style : "padding: 0px 00px 0px 10px; ",
											handler : function (d) { ;
												document.images.deckImage.src = "";
												Ext.getCmp("deck").html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var c = this.ownerCt.findParentByType("awesomewindow");
												var a = c.aw.sourceDataURI;
												var b = document.getElementById("imageName").value;
												if (b) {
													var e = {};
													if (b) {
														e.removefile = b
													}
													if (b) {
														e.imageStorePath = a
													}
													e.imageName = Ext.getCmp("deckImageValue").getValue();
													Ext.Ajax.request({
														url : TDS.env.dataPath + "fileUpload",
														method : "POST",
														params : e,
														callback : function (i, g, h) {
															if (g) {
																Ext.Msg.alert("", "Deleted succussefully.");
																document.images.deckImage.src = "";
																document.getElementById("imageName").value = "";
																document.getElementById("deckUpLoads").value = "";
																var f = {
																	deletePath : true,
																	imagePath : document.getElementById("imageName").value
																};
																Ext.Ajax.request({
																	url : TDS.env.dataPath + a + "/deckGraphicImage",
																	method : "POST",
																	jsonData : f,
																	scope : this
																})
															} else {
																Ext.Msg.alert("", "Error coocured..")
															}
														}
													})
												}
											}
										}, {
											xtype : "button",
											text : "Clear",
											style : "padding: 0px 00px 0px 10px; ",
											handler : function (a) {
												document.images.shipImage.src = "";
												document.getElementById("shipUpLoads").value = "";
												document.getElementById("deckUpLoads").value = "";
												document.images.deckImage.src = "";
												this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(3).setValue();
												this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(1).setValue()
											}
										}
									]
								}, {
									xtype : "panel",
									style : "padding: 0px 0px 0px 50px; ",
									border : false,
									layout : "column",
									items : [{
											html : "Date: ",
											border : false,
											style : "padding: 0px 15px 0px 20px; "
										}, {
											xtype : "datefield",
											width : 80,
											name : "deckPlanDate",
											format : "dMy D",
											allowBlank : false,
											enableKeyEvents : true,
											showToday : false,
											minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}, {
											html : "Deck:",
											border : false,
											style : "padding: 0px 15px 0px 20px; "
										}, {
											xtype : "textfield",
											width : 80,
											name : "deckPlanNo"
										}
									]
								}
							]
						}
					]
				}, {
					title : "Ports",
					items : [{
							xtype : "panel",
							layout : "fit",
							height : 460,
							frame : true,
							items : [{
									xtype : "panel",
									layout : "table",
									layoutConfig : {
										columns : 1
									},
									labelWidth : 110,
									border : false,
									style : "padding: 2px;",
									defaultType : "textfield",
									items : [{
											xtype : "panel",
											width : 775,
											height : 150,
											border : true,
											style : "padding: 2px;",
											defaultType : "textfield",
											items : [{
													xtype : "grid",
													alwaysUseCollection : true,
													width : 775,
													height : 150,
													border : false,
													store : new Ext.data.JsonStore({
														url : "",
														id : "dataURI",
														fields : ["travelDate", "portName", "travelDateDisp", "arrival", "departure", "cruiseOfferingURI", "expiryDate", "dataURI"]
													}),
													sm : new Ext.grid.RowSelectionModel(),
													columns : [{
															header : "Day/Date",
															dataIndex : "travelDateDisp",
															width : 100
														}, {
															header : "Ports",
															dataIndex : "portName",
															width : 100
														}, {
															header : "Arr",
															dataIndex : "arrival",
															width : 100
														}, {
															header : "Dep",
															dataIndex : "departure",
															width : 100
														}
													],
													viewConfig : {
														forceFit : true
													},
													listeners : {
														beforerender : function () {},
														sessioninit : function () {},
														render : function () {}

													}
												}
											]
										}, {
											xtype : "panel",
											layout : "table",
											border : false,
											style : "padding: 3px;",
											layoutConfig : {
												columns : 7
											},
											defaults : {
												border : false
											},
											items : [{
													width : 100
												}, {
													xtype : "textfield",
													name : "travelDate",
													fieldLabel : "Travel Date",
													format : "dMy",
													width : 150
												}, {
													html : "",
													height : 30,
													width : 20
												}, {
													width : 80
												}, {
													xtype : "textfield",
													name : "departure",
													fieldLabel : "Departure",
													width : 150
												}, {
													width : 100
												}, {
													xtype : "button",
													align : "right",
													minWidth : 80,
													text : "Add"
												}, {
													width : 100
												}, {
													xtype : "textfield",
													name : "portName",
													fieldLabel : "Ports",
													width : 150
												}, {
													html : "",
													width : 20
												}, {
													width : 80
												}, {
													xtype : "textfield",
													name : "arrival Time",
													fieldLabel : "Arrival",
													width : 150
												}, {
													width : 100
												}, {
													xtype : "button",
													align : "right",
													minWidth : 80,
													text : "Remove"
												}
											]
										}, {
											xtype : "panel",
											border : false,
											layout : "table",
											column : 2,
											items : [{
													width : 400,
													height : 225,
													border : true,
													autoScroll : true,
													id : "portId",
													html : "portImages",
													listeners : {
														render : function () { ;
															this.body.setStyle("background", "white");
															var b = "";
															var d = this.ownerCt.ownerCt.findParentByType("awesomewindow");
															var c = d.aw.data.portGraphicImgPath;
															if (typeof c == "undefined") {
																c = ""
															}
															var a = c.substring(0, 4);
															if (Ext.isEmpty(a)) {
																this.html = '<center><img border="0"   id="portImageId" name="portImages"   alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
															} else {
																b = "../" + c;
																this.html = '<center><img border="0"   id="portImageId" name="portImages" src=' + b + ' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
															}
														}
													},
													colspan : 1
												}, {
													xtype : "panel",
													border : false,
													layout : "table",
													style : "padding: 20px 0px 0px 25px; ",
													column : 3,
													items : [{
															xtype : "textfield",
															id : "portImageValue",
															hidden : true,
															name : "portGraphicImgPath"
														}, {
															html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="portfileUpLoads"type="file"  /></td></form>',
															width : 165,
															style : "padding: 0px 10px 0px 0px; "
														}, {
															xtype : "button",
															text : "Upload",
															style : "padding: 0px 10px 0px 15px;",
															handler : function (b) { ;
																Ext.getCmp("portId").html = '<img border="0" id="portImageId" name="portImages" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
																var i = this.ownerCt.findParentByType("awesomewindow");
																var a = i.aw.sourceDataURI;
																var h = document.getElementById("portfileUpLoads").value;
																var d = document.getElementById("portfileUpLoads").files[0];
																if (d) {
																	var e = 0;
																	j()
																}
																function j() {
																	var l = new FormData();
																	l.append("image", d);
																	var m = new XMLHttpRequest();
																	m.upload.addEventListener("progress", f, false);
																	m.addEventListener("load", g, false);
																	m.addEventListener("error", c, false);
																	m.addEventListener("abort", k, false);
																	m.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp("portImageValue").getValue() + "&imageStorePath=" + a);
																	m.send(l);
																	m.onreadystatechange = function () {
																		if (m.readyState == 4) {
																			var p = m.getAllResponseHeaders();
																			var q = m.responseText;
																			var o = a;
																			var n = "GraphicsImg/" + q;
																			document.getElementById("imageName").value = n;
																			Ext.getCmp("portImageValue").setValue(n);
																			document.images.portImages.src = "../" + n;
																			document.getElementById("imageName").value = n
																		}
																	}
																}
																function f(l) {}

																function g(l) {}

																function c(l) {
																	Ext.Msg.alert("", "There was an error attempting to upload the file.")
																}
																function k(l) {
																	Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
																}
															}
														}, {
															xtype : "button",
															text : "Delete",
															style : 'border="0";',
															handler : function (a) {
																document.images.portImages.src = "";
																document.getElementById("portfileUpLoads").value = "";
																Ext.getCmp("portImageValue").setValue("")
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
					title : "Dinning Times",
					items : [{
							xtype : "panel",
							layout : "fit",
							height : 460,
							frame : true,
							items : [{
									xtype : "panel",
									layout : "form",
									border : false,
									labelWidth : 90,
									defaults : {
										style : "padding: 2px 4px 2px 4px;"
									},
									items : [{
											xtype : "label",
											hidden : true,
											name : "label1"
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding: 10px 20px 10px 20px;",
											items : [{
													xtype : "checkbox",
													boxLabel : "First Sitting",
													width : 100,
													name : "firstSitting"
												}, {
													xtype : "textfield",
													allowBlank : false,
													name : "firstSittingTime"
												}, {
													xtype : "panel",
													layout : "column",
													border : false,
													style : "padding: 0px 20px 0px 20px;",
													items : [{
															xtype : "combo",
															width : 50,
															listWidth : 50,
															name : "timePeriod1",
															mode : "local",
															triggerAction : "all",
															editable : false,
															allowBlank : true,
															valueField : "id",
															displayField : "value",
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ["id", "value"],
																data : [{
																		id : 0,
																		value : " "
																	}, {
																		id : 1,
																		value : "AM"
																	}, {
																		id : 2,
																		value : "PM"
																	}
																]
															})
														}
													]
												}, {
													xtype : "numberfield",
													name : "firstSittingNo",
													width : 50,
													emptyText : "No"
												}, {
													html : "Status:",
													border : false,
													style : "padding: 5px 10px 0px 10px;"
												}, {
													xtype : "combo",
													width : 100,
													name : "status1",
													mode : "local",
													triggerAction : "all",
													editable : false,
													allowBlank : true,
													valueField : "id",
													displayField : "value",
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ["id", "value"],
														data : [{
																id : " ",
																value : " "
															}, {
																id : "OK",
																value : "OK"
															}, {
																id : "FULL",
																value : "FULL"
															}, {
																id : "RQ",
																value : "RQ"
															}
														]
													})
												}
											]
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding: 10px 20px 10px 20px;",
											items : [{
													xtype : "checkbox",
													boxLabel : "Second Sitting",
													name : "secondSitting",
													width : 100,
													id : "check",
													listeners : {
														check : function (b, a) {}

													}
												}, {
													xtype : "textfield",
													allowBlank : false,
													name : "secondSittingTime"
												}, {
													xtype : "panel",
													layout : "column",
													border : false,
													style : "padding: 0px 20px 0px 20px;",
													items : [{
															xtype : "combo",
															width : 50,
															listWidth : 50,
															name : "timePeriod2",
															mode : "local",
															triggerAction : "all",
															editable : false,
															allowBlank : true,
															valueField : "id",
															displayField : "value",
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ["id", "value"],
																data : [{
																		id : 0,
																		value : " "
																	}, {
																		id : 1,
																		value : "AM"
																	}, {
																		id : 2,
																		value : "PM"
																	}
																]
															})
														}
													]
												}, {
													xtype : "numberfield",
													name : "secondSittingNo",
													width : 50,
													emptyText : "No"
												}, {
													html : "Status:",
													border : false,
													style : "padding: 5px 10px 0px 10px;"
												}, {
													xtype : "combo",
													width : 100,
													fieldLabel : "dd",
													name : "status2",
													mode : "local",
													triggerAction : "all",
													editable : false,
													allowBlank : true,
													valueField : "id",
													displayField : "value",
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ["id", "value"],
														data : [{
																id : " ",
																value : " "
															}, {
																id : "OK",
																value : "OK"
															}, {
																id : "FULL",
																value : "FULL"
															}, {
																id : "RQ",
																value : "RQ"
															}
														]
													})
												}
											]
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding: 10px 20px 10px 20px;",
											items : [{
													xtype : "checkbox",
													boxLabel : "Third Sitting",
													width : 100,
													name : "thirdSitting"
												}, {
													xtype : "textfield",
													allowBlank : false,
													name : "thirdSittingTime"
												}, {
													xtype : "panel",
													layout : "column",
													border : false,
													style : "padding: 0px 20px 0px 20px;",
													items : [{
															xtype : "combo",
															width : 50,
															listWidth : 50,
															name : "timePeriod3",
															mode : "local",
															triggerAction : "all",
															editable : false,
															allowBlank : true,
															valueField : "id",
															displayField : "value",
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ["id", "value"],
																data : [{
																		id : 0,
																		value : " "
																	}, {
																		id : 1,
																		value : "AM"
																	}, {
																		id : 2,
																		value : "PM"
																	}
																]
															})
														}
													]
												}, {
													xtype : "numberfield",
													name : "thirdSittingNo",
													width : 50,
													emptyText : "No"
												}, {
													html : "Status:",
													border : false,
													style : "padding: 5px 10px 0px 10px;"
												}, {
													xtype : "combo",
													width : 100,
													name : "status3",
													mode : "local",
													triggerAction : "all",
													editable : false,
													allowBlank : true,
													valueField : "id",
													displayField : "value",
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ["id", "value"],
														data : [{
																id : " ",
																value : " "
															}, {
																id : "OK",
																value : "OK"
															}, {
																id : "FULL",
																value : "FULL"
															}, {
																id : "RQ",
																value : "RQ"
															}
														]
													})
												}
											]
										}, {
											html : "<hr>",
											border : false
										}, {
											xtype : "label",
											html : "<b><u>Table Sizes</u></b>"
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding: 10px 20px 20px 20px;",
											items : [{
													xtype : "checkbox",
													boxLabel : "Seats 2",
													width : 100,
													name : "seat2",
													value : 2,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 4",
													width : 100,
													name : "seat4",
													value : 4,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 6",
													width : 100,
													name : "seat6",
													value : 6,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 8",
													width : 100,
													name : "seat8",
													value : 8,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 10",
													width : 100,
													name : "seat10",
													value : 10,
													excludeSubmit : true
												}
											]
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding: 10px 20px 20px 20px;",
											items : [{
													xtype : "checkbox",
													boxLabel : "Seats 12",
													width : 100,
													name : "seat12",
													value : 12,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 14",
													width : 100,
													name : "seat14",
													value : 14,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 16",
													width : 100,
													name : "seat16",
													value : 16,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 18",
													width : 100,
													name : "seat18",
													value : 18,
													excludeSubmit : true
												}, {
													xtype : "checkbox",
													boxLabel : "Seats 20",
													width : 100,
													name : "seat20",
													value : 20,
													excludeSubmit : true
												}
											]
										}
									]
								}
							]
						}
					]
				}
			],
			listeners : {
				render : function () {
					this.findByType("grid")[0].initialConfig.cruiseURI = this.findParentByType("awesomewindow").aw.sourceDataURI
				}
			}
		}
	]
}




























