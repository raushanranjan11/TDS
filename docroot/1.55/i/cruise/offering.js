{
	xtype : "panel",
	layout : "fit",
	border : false,
	bodyStyle : "padding: 8px;",
	autoScroll : true,
	requireStores : [{
			dataURI : TDS.env.dataPath + "cruise/classes/collection",
			identifier : "cruise/classes",
			fields : ["name", "dataURI"]
		}
	],
	listeners : {
		render : function () {
			if (TDS.env.user.hasGroupPermission("ADMINISTRATION")) {
				TDS.data.getStore({
					dataURI : TDS.env.dataPath + "suppliers/collection/concise",
					identifier : "suppliers",
					fields : ["name", "dataURI"]
				})
			} else {
				if (TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")) {
					TDS.data.getStore({
						dataURI : TDS.env.dataPath + "suppliers/currentUser/collection/concise",
						identifier : "currentUserCreatedsuppliers",
						fields : ["name", "dataURI"]
					})
				}
			}
		}
	},
	items : [{
			xtype : "tabpanel",
			//id : "tab",
			activeTab : 0,
			layoutOnTabChange : true,
			items : [{
					title : "Imported Cruise ",
					items : [{
							xtype : "awesomegrid",
							searchURI : "",
							pinnable : true,
							enableRowExpander : false,
							allowPagination : true,
							iconCls : "icon-grid",
							getDataURI : function () {
								if (TDS.env.user.hasGroupPermission("ADMINISTRATION") || TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")) {
									var c = this.getTopToolbar();
									var a = c.items.itemAt(1);
									var b = a.getValue();
									if (!b) {
										return false
									}
									return a.getValue()
								} else {
									if (TDS.env.user.hasGroupPermission("INVENTORY_MANAGEMENT_CRUISE")) {
										return TDS.env.user.getSupplierURI()
									}
								}
							},
							tbar : [{
									xtype : "tbspecialtext",
									text : "Supplier: ",
									hidden : true
								}, {
									xtype : "combo",
									hidden : true,
									name : "supplierURI",
									mode : "local",
									width : 170,
									triggerAction : "all",
									editable : false,
									displayField : "name",
									valueField : "dataURI",
									//value : "supplier/235",
									store : new Ext.data.Store(),
									appendData : [{
											name : "All",
											dataURI : ""
										}
									],
									toggleButtons : function () {
										var a = this.ownerCt.items.itemAt(9);
										var b = this.ownerCt.items.itemAt(11);
										if (!this.getValue()) {
											a.disable();
											b.disable()
										} else {
											a.enable();
											b.enable()
										}
									},
									listeners : {
										select : function () {
											this.toggleButtons()
										}
									}
								}, {
									xtype : "tbspecialspacer",
									hidden : true
								}, " ", "Destination: ", {
									xtype : "combo",
									name : "destination",
									fieldLabel : "Destination:",
									width : 150,
									editable : false,
									forceSelection : true,
									mode : "local",
									triggerAction : "all",
									displayField : "name",
									valueField : "dataURI",
									enableKeyEvents : true,
									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "destination/collection",
										identifier : "destination",
										fields : ["name", "externalId", "dataURI"]
									}),
									appendData : [{
											name : "",
											dataURI : ""
										}
									]
								}, "", "Cruise Line: ", {
									xtype : "combo",
									name : "cruiselines",
									enableKeyEvents : true,
									id : "cruise",
									triggerAction : "all",
									displayField : "name",
									valueField : "dataURI",
									enableKeyEvents : true,
									enableKeyEvents : true,
									width : 120,
									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "cruise/offerings/cruiseline/collection",
										identifier : "cruiseline",
										fields : ["name", "externalId", "dataURI"]
									}),
									appendData : [{
											name : "",
											dataURI : ""
										}
									],
									listeners : {
										beforequery : function (c) {
											var a = this.ownerCt.items.itemAt(5).getValue();
											var supplierURI = this.ownerCt.items.itemAt(1).getValue();
											this.setValue("");
											var b = this.getStore();
											b.baseParams = {
												destinationId : a,
												supplierURI : supplierURI
											};
											b.load()
										}
									}
								}, " ", "Ship: ", {
									xtype : "combo",
									id : "ships",
									name : "shipNameLike",
									forceSelection : true,
									triggerAction : "all",
									displayField : "name",
									valueField : "dataURI",
									enableKeyEvents : true,
									width : 180,
									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "cruise/offerings/ship/collection",
										identifier : "ship",
										fields : ["name", "externalId", "dataURI"]
									}),
									appendData : [{
											name : "",
											dataURI : ""
										}
									],
									appendData : [{
											name : "",
											dataURI : ""
										}
									],
									listeners : {
										load : function () {
											this.setValue("");
											var a = {
												externalId : "",
												name : "-"
											};
											this.getStore().insert(0, a)
										},
										keyup : function () {
											this.setValue("")
										},
										beforequery : function (c) {
											var a = this.ownerCt.items.itemAt(8).getValue();
											this.setValue("");
											var b = this.getStore();
											b.baseParams = {
												cruiseLineid : a
											};
											b.load()
										}
									}
								}, "", "Cruise Type: ", {
									xtype : "combo",
									name : "cruiseType",
									enableKeyEvents : true,
									mode : "local",
									triggerAction : "all",
									displayField : "name",
									valueField : "dataURI",
									enableKeyEvents : true,
									enableKeyEvents : true,
									width : 100,
									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "cruise/offerings/cruiseType/collection",
										identifier : "cruiseType",
										fields : ["name", "externalId", "dataURI"]
									}),
									appendData : [{
											name : "",
											dataURI : ""
										}
									]
								}, " ", "From Date: ", {
									xtype : "datefield",
									name : "dateFrom",
									format : "dMy",
									enableKeyEvents : true,
									width : 80
								}, "&nbsp;&nbsp;", "To Date: ", {
									xtype : "datefield",
									name : "dateTo",
									format : "dMy",
									enableKeyEvents : true,
									width : 80
								}, "&nbsp;&nbsp;", {
									xtype : "checkbox",
									boxLabel : "Show only Archived",
									name : "showUnArchivedOnly",
									excludeFromSession : true
								}, "->"],
							tbar2 : [{
									xtype : "button",
									text : "Copy",
									handler : function () {
										var d = this.ownerCt.ownerCt;
										var c = d.selModel.getSelected();
										if (!c) {
											return
										}
										var a = c.get("dataURI");
										var b = c.get("supplierURI");
										if (!a && !b) {
											return
										}
										TDS.window.setWindow({
											title : "Copy cruise offering",
											information : "This interface will create a new cruise offering with the following details, you may edit these details before you submit.",
											interfaceURI : "cruise/offering/create.js",
											sourceDataURI : a,
											postDataURI : b + "/cruiseOfferings",
											buttonOK : "Submit",
											requiredData : [{
													id : "supplier",
													dataURI : b
												}
											],
											callback : {
												fn : function (e) {
													if (e) {
														d.submitQuery(true)
													}
												},
												scope : d
											}
										})
									}
								}, "", {
									text : "Archive",
									handler : function () {
										var c = this.buttonContainer.ownerCt;
										var b = c.selModel.getSelected();
										if (!b) {
											return
										}
										var a = b.get("dataURI");
										if (!a) {
											return
										}
										TDS.window.setWindow({
											title : "Archive cruise offering",
											message : "Are you sure you want to archive this cruise offering?",
											destinationDataURI : a,
											data : {
												archived : true
											},
											callback : {
												fn : function (d) {
													if (d) {
														c.submitQuery(true)
													}
												},
												scope : c
											}
										})
									}
								}, "->", {
									xtype : "redbutton",
									text : "Showing 0 to 25",
									cls : "x-button-green",
									overCls : "x-button-green-over"
								}, "-", {
									xtype : "redbutton",
									text : "Next 25",
									cls : "x-button-blue-tour",
									overCls : "x-button-blue-over-tour",
									handler : function () {
										var a = this.ownerCt.ownerCt;
										a.next25();
										this.ownerCt.items.itemAt(18).td.innerHTML = "Showing " + a.startLimit + " to " + (a.startLimit + 25)
									}
								}, "-", {
									xtype : "redbutton",
									text : "Previous 25",
									cls : "x-button-orange",
									overCls : "x-button-orange-over",
									handler : function () {
										var a = this.ownerCt.ownerCt;
										a.previous25();
										if (a.startLimit >= 0) {
											this.ownerCt.items.itemAt(18).td.innerHTML = "Showing " + a.startLimit + " to " + (a.startLimit + 25)
										}
									}
								}, " "],
							store : new Ext.data.JsonStore({
								url : "",
								id : "dataURI",
								fields : ["published", "dataURI", "supplierURI", "destination", "pinned", "homeCurrency", "rackRatePriceSell", "rackRatePriceSell2",
									"rackRatePriceSell3", "rackRatePriceSell4", "locationFromString", "locationToString", "shipName",
									"name", "code", "createdDate", "updatedDate", "departureDate", "arrivalDate", "pricingPriceIsNett", "pricingPriceIsNett2", 
									"pricingPriceIsNett3", "pricingPriceIsNett4", "rackRatePriceSell5", "cruiseShipName", "cruiseTypeName", "cruiseLineName",
									"starRating", "embarkPorts", "cruiseShipNames", "destinationName", "balconyPrice", "oceanPrice", "suitPrice", "interiorPrice",
									"sailingdate", "cruiseLine", "cruiseType", "cruiseName", "shipName", "embarkport", "balcony", "ocean", "interior", "suite", "cruiseShipName",
									"cruiseNumber"]
							}),
							sm : new Ext.grid.RowSelectionModel(),
							cm : new Ext.grid.ColumnModel([{
										header : "Supplier",
										dataIndex : "supplierURI",
										hidden : true,
										renderer : TDS.util.Format.displayResourceConciseNameRenderer()
									}, {
										header : "Destination",
										dataIndex : "destinationName",
										sortable : true
									}, {
										header : "Cruise Line",
										dataIndex : "cruiseLine",
										sortable : true
									}, {
										header : "Ship",
										dataIndex : "shipName",//cruiseShipName  shipName
										sortable : true
									}, {
										header : "Cruise Type",
										dataIndex : "cruiseType",
										sortable : true
									}, {
										header : "Star Rating",
										dataIndex : "starRating",
										sortable : true
									}, {
										header : "Embarkation",
										dataIndex : "embarkport",
										sortable : true
									}, {
										header : "Departure Date",
										dataIndex : "sailingdate",
										width : 120,
										fixed : true,
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)
									}, {
										header : "Terminates",
										dataIndex : "locationToString",
										sortable : true
									}, {
										header : "Code",
										dataIndex : "cruiseNumber",
										sortable : true,
										menuDisabled : true,
										width : 80,
										fixed : true
									}, {
										header : "Interior  ",
										dataIndex : "interior",
										width : 100,
										fixed : true,
										sortable : true
									}, {
										header : "Ocean View  ",
										dataIndex : "ocean",
										width : 100,
										fixed : true,
										sortable : true
									}, {
										header : "Balcony  ",
										dataIndex : "balcony",
										width : 100,
										fixed : true,
										sortable : true
									}, {
										header : "Special  ",
										dataIndex : "rackRatePriceSell4",
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (c, b, a) {
											return TDS.util.Price.formatPrice(c, a.data.homeCurrency) + " (" + (a.data.pricingPriceIsNett4 ? "Nett" : "Gross") + ")"
										}
									}, {
										header : "Suite  ",
										dataIndex : "suite",
										width : 100,
										fixed : true,
										sortable : true
									}, {
										header : "Published",
										dataIndex : "createdDate",
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)
									}, {
										header : "Last modified",
										dataIndex : "updatedDate",
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)
									}, ]),
							viewConfig : {
								forceFit : true
							},
							listeners : {
								beforerender : function () {
									if (TDS.env.user.hasGroupPermission("ADMINISTRATION")) {
										var b = this.getTopToolbar();
										b[0].hidden = false;
										b[1].hidden = false;
										b[1].store = TDS.data.getStore({
												dataURI : TDS.env.dataPath + "suppliers/collection/concise",
												identifier : "suppliers",
												fields : ["name", "dataURI"]
											});
										b[2].hidden = false;
										var a = this.getColumnModel();
										a.setHidden(0, false)
									} else {
										if (!TDS.env.user.hasGroupPermission("ADMINISTRATION") && TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")) {
											var b = this.getTopToolbar();
											b[0].hidden = false;
											b[1].hidden = false;
											b[1].store = TDS.data.getStore({
													dataURI : TDS.env.dataPath + "suppliers/currentUser/collection/concise",
													identifier : "currentUserCreatedsuppliers",
													fields : ["name", "dataURI"]
												});
											b[2].hidden = false;
											var a = this.getColumnModel();
											a.setHidden(0, false)
										}
									}
								},
								sessioninit : function () {
									if (TDS.env.user.hasGroupPermission("ADMINISTRATION") || TDS.env.user.hasGroupPermission("SUB_ADMINISTRATION")) {
										this.searchURI = TDS.env.dataPath + "cruise/offerings"
									} else {
										if (TDS.env.user.hasGroupPermission("INVENTORY_MANAGEMENT_CRUISE")) {
											this.searchURI = TDS.env.dataPath + TDS.env.user.getSupplierURI() + "/cruiseOfferings"
										}
									}
								},
								rowdblclick : function (d, h, f) {
									var c = d.getStore().getAt(h);
									if (!c) {
										return
									}
									var a = c.get("dataURI");
									var b = c.get("cruiseName");
									TDS.workArea.openTab(b, "cruise/offering/view.js", a, TDS.env.sessionPath + a)
								}
							}
						}
					]
				}, {
					title : "Cruise Manual",
					items : [{
							xtype : 'awesomegrid',
							searchURI : '',
							pinnable : true,
							enableRowExpander : false,
							iconCls : 'icon-grid',//id:'manual',
							getDataURI : function () {
								if (TDS.env.user.hasGroupPermission('ADMINISTRATION') || TDS.env.user.hasGroupPermission('SUB_ADMINISTRATION')) {
									var tb = this.getTopToolbar();
									var supplierCombo = tb.items.itemAt(1);
									var dataURI = supplierCombo.getValue();
									if (!dataURI)
										return false;
									return supplierCombo.getValue();
								} else if (TDS.env.user.hasGroupPermission('INVENTORY_MANAGEMENT_CRUISE')) {
									return TDS.env.user.getSupplierURI();
								}
							},
							tbar : [{
									xtype : 'tbspecialtext',
									text : 'Supplier: ',
									hidden : true
								}, {
									xtype : 'combo',
									hidden : true,
									name : 'supplierURI',
									mode : 'local',
									width : 170,
									triggerAction : 'all',
									editable : false,
									displayField : 'name',
									valueField : 'dataURI',
									store : new Ext.data.Store(),
									appendData : [{
											name : 'All',
											dataURI : ''
										}
									],
									toggleButtons : function () {
										var btnCreate = this.ownerCt.items.itemAt(9);
										var btnCopy = this.ownerCt.items.itemAt(11);
										if (!this.getValue()) {
											btnCreate.disable();
											btnCopy.disable();
										} else {
											btnCreate.enable();
											btnCopy.enable();
										}
									},
									listeners : {
										select : function () {
											this.toggleButtons();
										}
									}
								}, {
									xtype : 'tbspecialspacer',
									hidden : true
								}, 'Destination: ', {
									xtype : "combo",
									name : "destinationNameLike",
									fieldLabel : "Destination",
									width : 185,
									editable : false,
									forceSelection : true,
									mode : "local",
									triggerAction : "all",
									displayField : "name",
									valueField : "name",
									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "destination/collection",
										identifier : "destination",
										fields : ["name", "externalId"]
									})
								}, 'Cruise Lines: ', {
									xtype : 'combo',
									name : 'nameLike',
									enableKeyEvents : true,
									width : 80,
										forceSelection : true,
									triggerAction : "all",
									enableKeyEvents : true,
									width : 180,
									typeAhead : true,
									excludeFromSession : true,
									selectOnFocus : true,
									displayField : "shipCompany",
									valueField : "dataURI",
									editable : false,
									//id : "dataURI",
									store : new Ext.data.CollectionStore({
										identifier : "cruiseline",
										fields : ["shipName", "shipId",'shipCompany'],
										reader : new Ext.data.CollectionReader({
											identifier : "cruiseline",
											fields : ["shipName", "shipId", "dataURI",'shipCompany']
										})
									}),
												appendData : [{
											shipName : "",
											dataURI : ""
										}
									],
									listeners : {
										beforequery : function (a, b) {
											//console.log('hhhhhhhhhhhhhhhhhh');
											var dataURI = this.ownerCt.ownerCt.getDataURI();
											var d = "";
											var c = dataURI;
											this.getStore().proxy.conn.method = "GET",
											this.getStore().proxy.conn.url = TDS.env.dataPath + c + "/cruiseOfferings/cruiseline",
											this.getStore().load()
										},
									}
								}, " ", "Ship: ", {
									xtype : "combo",
									id : "ship",
									name : "shipName",
									forceSelection : true,
									triggerAction : "all",
									enableKeyEvents : true,
									width : 180,
									typeAhead : true,
									excludeFromSession : true,
									selectOnFocus : true,
									displayField : "shipName",
									valueField : "dataURI",
									editable : false,
									//id : "dataURI",
								/**	store : new Ext.data.CollectionStore({
										identifier : "ship",
										fields : ["shipName", "shipId"],
										reader : new Ext.data.CollectionReader({
											identifier : "ship",
											fields : ["shipName", "shipId", "dataURI"]
										})
									}),*/

									store : TDS.data.getStore({
										dataURI : TDS.env.dataPath + "cruise/offerings/ship/collection",
										identifier : "ship",
										fields : ["shipName", "shipId", "dataURI"]
									}),
									listeners : {
										beforequery : function (a, b) {
											console.log('hhhhhhhhhhhhhhhhhh');
											var dataURI = this.ownerCt.ownerCt.getDataURI();
											var d = "";
											var c = dataURI;
											var a = this.findParentByType('awesomegrid').getTopToolbar().items.itemAt(6).getValue();
											this.getStore().proxy.conn.method = "GET",
											this.getStore().proxy.conn.url = TDS.env.dataPath + c + "/cruiseOfferings/shipNames?cruiseLineid="+a,
												this.getStore();
											/*b.baseParams = {
												cruiseLineid : a
											};*/
											this.getStore().load()

										/*		var a = this.findParentByType('awesomegrid').getTopToolbar().items.itemAt(6).getValue();
											//this.setValue("");
											var b = this.getStore();
											b.baseParams = {
												cruiseLineid : a
											};
												b.proxy.conn.method = "GET",
												b.load()*/
										},

											/**	var a = this.ownerCt.items.itemAt(8).getValue();
											this.setValue("");
											var b = this.getStore();
											b.baseParams = {
												cruiseLineid : a
											};
											b.load()*/
									}
								}, "", ' ', " ", "From Date: ", {
									xtype : "datefield",
									name : "fromDate",
									format : "dMy",
									enableKeyEvents : true,
									width : 80
								}, "&nbsp;&nbsp;", "To Date: ", {
									xtype : "datefield",
									name : "toDate",//departureDate
									format : "dMy",
									enableKeyEvents : true,
									width : 80
								}, "&nbsp;&nbsp;", {
									xtype : 'checkbox',
									boxLabel : 'Show only Archived',
									name : 'showUnArchivedOnly',
									excludeFromSession : true
								}, '->', ],
							tbar2 : [{
									xtype : "redbutton",
									text : "Create Ship",
									handler : function () {
										var b = this.ownerCt.ownerCt;
										var a = b.getDataURI();
										if (!a) {
											return
										}
										TDS.window.setWindow({
											title : "Ship Details",
											information : "Please enter details of a new cruise.",
											interfaceURI : "cruise/offering/create-ship.js",
											postDataURI : a + "/cruiseOfferings/ship",
											buttonOK : "Save",
											requiredData : [{
													id : "supplier",
													dataURI : a
												}
											],
											data : {
												dataURI : a
											},
											callback : {
												fn : function (c) {
													if (c) {
														b.submitQuery(true)
													} else {}

												},
												scope : b
											}
										})
									}
								}, " ", {
									xtype : "redbutton",
									text : "Create Cruise",
									handler : function () {
										var b = this.ownerCt.ownerCt;
										var a = b.getDataURI();
										if (!a) {
											return
										}
										TDS.window.setWindow({
											title : "Cruise Info",
											information : "Please enter details of a new cruise.",
											interfaceURI : "cruise/offering/create-cruise.js",
											postDataURI : a + "/cruiseOfferings/cruise",
											requiredData : [{
													id : "supplier",
													dataURI : a
												}
											],
											callback : {
												fn : function (c) {
													if (c) {
														b.submitQuery(true)
													} else {}

												},
												scope : b
											}
										})
									}
								}, " ", ' ', {
									xtype : 'button',
									text : 'Copy',
									handler : function () {
										var g = this.ownerCt.ownerCt;
										var r = g.selModel.getSelected();
										if (!r)
											return;
										var dataURI = r.get('dataURI');
										var supplierURI = r.get('supplierURI');
										if (!dataURI && !supplierURI)
											return;
										TDS.window.setWindow({
											title : 'Copy cruise offering',
											information : 'This interface will create a new cruise offering with the following details, you may edit these details before you submit.',
											interfaceURI : 'cruise/offering/create.js',
											sourceDataURI : dataURI,
											postDataURI : supplierURI + '/cruiseOfferings/manual',
											buttonOK : 'Submit',
											requiredData : [{
													id : 'supplier',
													dataURI : supplierURI
												}
											],
											callback : {
												fn : function (s) {
													if (s)
														g.submitQuery(true);
												},
												scope : g
											}
										});
									}
								}, ' ', {
									text : 'Archive',
									handler : function () {
										var g = this.buttonContainer.ownerCt;
										var r = g.selModel.getSelected();
										if (!r)
											return;
										var dataURI = r.get('dataURI');
										if (!dataURI)
											return;
										TDS.window.setWindow({
											title : 'Archive cruise offering',
											message : 'Are you sure you want to archive this cruise offering?',
											destinationDataURI : dataURI,
											data : {
												archived : true
											},
											callback : {
												fn : function (s) {
													if (s)
														g.submitQuery(true);
												},
												scope : g
											}
										});
									}
								}, "->", {
									xtype : "redbutton",
									text : "Showing 0 to 25",
									cls : "x-button-green",
									overCls : "x-button-green-over"
								}, "-", {
									xtype : "redbutton",
									text : "Next 25",
									cls : "x-button-blue-tour",
									overCls : "x-button-blue-over-tour",
									handler : function () {
										var a = this.ownerCt.ownerCt;
										a.next25();
										this.ownerCt.items.itemAt(18).td.innerHTML = "Showing " + a.startLimit + " to " + (a.startLimit + 25)
									}
								}, "-", {
									xtype : "redbutton",
									text : "Previous 25",
									cls : "x-button-orange",
									overCls : "x-button-orange-over",
									handler : function () {
										var a = this.ownerCt.ownerCt;
										a.previous25();
										if (a.startLimit >= 0) {
											this.ownerCt.items.itemAt(18).td.innerHTML = "Showing " + a.startLimit + " to " + (a.startLimit + 25)
										}
									}
								}, " "],
							store : new Ext.data.JsonStore({
								url : '',
								id : 'dataURI',
								fields : ['published', 'dataURI', 'supplierURI', 'destination', 'pinned', 'homeCurrency', 'rackRatePriceSell',
									'rackRatePriceSell2', 'rackRatePriceSell3', 'rackRatePriceSell4', 'locationFromString', 'locationToString','cruiseLineName',
									'shipName', 'name', 'code', 'createdDate', 'updatedDate', 'departureDate', 'arrivalDate', 'pricingPriceIsNett',
									'pricingPriceIsNett2', 'pricingPriceIsNett3', 'pricingPriceIsNett4', 'rackRatePriceSell5', 'cruiseShipName','source']
							}),
							sm : new Ext.grid.RowSelectionModel(),
							cm : new Ext.grid.ColumnModel([{
										header : 'Supplier',
										dataIndex : 'supplierURI',
										hidden : true,
										renderer : TDS.util.Format.displayResourceConciseNameRenderer()
									}, {
										header : 'Destination',
										dataIndex : 'destination',
										sortable : true
									}, {
										header : 'Cruise Lines',
										dataIndex : 'cruiseLineName',
										sortable : true
									}, {
										header : 'Ship',
										dataIndex : 'cruiseShipName',
										sortable : true
									}, {
										header : 'Cruise',
										dataIndex : 'name',
										sortable : true
									}, {
										header : "Star Rating",
										dataIndex : "starRating",
										sortable : true
									}, {
										header : "Embarkation",
										dataIndex : "embarkport",
										sortable : true
									}, {
										header : 'Departure Date',
										dataIndex : 'departureDate',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)
									}, {
										header : 'Terminates',
										dataIndex : 'locationToString',
										sortable : true
									}, {
										header : 'Code',
										dataIndex : 'code',
										sortable : true,
										menuDisabled : true,
										width : 80,
										fixed : true
									}, {
										header : 'Interior  ',
										dataIndex : 'rackRatePriceSell',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (v, metaData, record) {
											if(record.data['source'] == '')
											{
											return "N/A";
											}
											//return TDS.util.Price.formatPrice(v, record.data['homeCurrency']) + ' (' + (record.data['pricingPriceIsNett'] ? 'Nett' : 'Gross') + ')';
										}
									}, {
										header : 'Ocean View  ',
										dataIndex : 'rackRatePriceSell2',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (v, metaData, record) {
											if(record.data['source'] == '')
											{
											return "N/A";
											}
											//return TDS.util.Price.formatPrice(v, record.data['homeCurrency']) + ' (' + (record.data['pricingPriceIsNett2'] ? 'Nett' : 'Gross') + ')';
										}
									}, {
										header : 'Balcony  ',
										dataIndex : 'rackRatePriceSell3',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (v, metaData, record) {
										if(record.data['source'] == '')
											{
											return "N/A";
											}
										//	return TDS.util.Price.formatPrice(v, record.data['homeCurrency']) + ' (' + (record.data['pricingPriceIsNett3'] ? 'Nett' : 'Gross') + ')';
										}
									}, {
										header : 'Special  ',
										dataIndex : 'rackRatePriceSell4',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (v, metaData, record) {
										if(record.data['source'] == '')
											{
											return "N/A";
											}
										//	return TDS.util.Price.formatPrice(v, record.data['homeCurrency']) + ' (' + (record.data['pricingPriceIsNett4'] ? 'Nett' : 'Gross') + ')';
										}
									}, {
										header : 'Suite  ',
										dataIndex : 'rackRatePriceSell5',
										width : 100,
										fixed : true,
										sortable : true,
										renderer : function (v, metaData, record) {
											if(record.data['source'] == '')
											{
											return "N/A";
											}
											//return TDS.util.Price.formatPrice(v, record.data['homeCurrency']) + ' (' + (record.data['pricingPriceIsNett5'] ? 'Nett' : 'Gross') + ')';
										}
									}, {
										header : 'Published',
										dataIndex : 'createdDate',
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)
									}, {
										header : 'Last modified',
										dataIndex : 'updatedDate',
										sortable : true,
										renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateTimeFormatDisplay)
									}
								]),
							viewConfig : {
								forceFit : true
							},
							listeners : {
								beforerender : function () {
									if (TDS.env.user.hasGroupPermission('ADMINISTRATION')) {
										var tb = this.getTopToolbar();
										tb[0].hidden = false;
										tb[1].hidden = false;
										tb[1].store = TDS.data.getStore({
												dataURI : TDS.env.dataPath + 'suppliers/collection/concise',
												identifier : 'suppliers',
												fields : ['name', 'dataURI']
											});
										tb[2].hidden = false;
										var cm = this.getColumnModel();
										cm.setHidden(0, false);
									} else if (!TDS.env.user.hasGroupPermission('ADMINISTRATION') && TDS.env.user.hasGroupPermission('SUB_ADMINISTRATION')) {
										var tb = this.getTopToolbar();
										tb[0].hidden = false;
										tb[1].hidden = false;
										tb[1].store = TDS.data.getStore({
												dataURI : TDS.env.dataPath + 'suppliers/currentUser/collection/concise',
												identifier : 'currentUserCreatedsuppliers',
												fields : ['name', 'dataURI']
											});
										tb[2].hidden = false;
										var cm = this.getColumnModel();
										cm.setHidden(0, false);
									}
								},
								sessioninit : function () {
									if (TDS.env.user.hasGroupPermission('ADMINISTRATION') || TDS.env.user.hasGroupPermission('SUB_ADMINISTRATION')) {
										this.searchURI = TDS.env.dataPath + 'cruise/offerings/manual';
									} else if (TDS.env.user.hasGroupPermission('INVENTORY_MANAGEMENT_CRUISE')) {
										this.searchURI = TDS.env.dataPath + TDS.env.user.getSupplierURI() + '/cruiseOfferings/manual';
									}
								},
								rowdblclick : function (g, rowIndex, e) {
									var r = g.getStore().getAt(rowIndex);
									if (!r)
										return;
									var dataURI = r.get('dataURI');
									var tabTitle = r.get('name');
									TDS.workArea.openTab(tabTitle, 'cruise/offering/viewManual.js', dataURI, TDS.env.sessionPath + dataURI);
								}
							}
						}
					]
				}
			]
		}
	]
}




































































































































































