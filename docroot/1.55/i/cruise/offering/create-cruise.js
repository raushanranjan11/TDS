{
	xtype : "form",
	border : false,
	width : 750,
	markDataDirtyOnLoad : true,
	beforeSubmit : function (a) {
		return a
	},
	beforeDataLoad : function (c, b) {
		var a = b.getRequiredData("supplier");
		c.termsAndConditions = a.data.defaultOfferingTermsAndConditions;
		return c
	},
	items : [{
			xtype : "tabpanel",
			activeTab : 0,
			layoutOnTabChange : true,
			height : 440,
			defaults : {
				bodyStyle : "padding: 6px 4px 6px 4px;"
			},
			items : [{
					title : "Details",
					items : [{
							xtype : "panel",
							border : false,
							items : [{
									xtype : "panel",
									border : false,
									items : [{
											xtype : "panel",
											layout : "form",
											border : false,
											frame : true,
											labelWidth : 90,
											defaults : {
												style : "padding: 2px 4px 2px 4px;"
											},
											items : [
												 {
													//xtype : "textfield",
													xtype : "combo",
													allowBlank : false,
													name : "cruiseShips",
													fieldLabel : "Ship",
													bodyStyle : "padding: 2px 4px 2px 4px;",
													width : 185,
														allowBlank : false,
															name : "shipId",
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
																	var d = "";
																	var c = a.combo.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + c + "/cruiseOfferings/shipName",
																	this.getStore().load()
																},
																		select : function (g, b) {
																	var c = this.getValue();
																	shipId = c.substring(c.lastIndexOf("/") + 1, c.length);
																	var f = g.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
																	var e = this.findParentByType("form").getForm();
																	var d = this.findParentByType("tabpanel").items.itemAt(2);
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/shipName/" + shipId,
																		method : "GET",
																		success : function (j, m) {
																			var l = Ext.decode(j.responseText);
																			//e.findField("notes").setValue(l.notes);
																			e.findField("shipCompany").setValue(l.shipCompany);
																			//e.findField("shipName").setValue(l.shipName);
																			/*var i = "",
																			k = "",
																			h;
																			i = "../" + l.shipInfoGraphicImgPath;
																			document.getElementById("shipInfoImageId").src = i;
																			k = "../" + l.shipGraphicImgPath;
																			h = "../" + l.deckGraphicImgPath;
																			g.findParentByType("tabpanel").config.shipImage = k*/
																		}
																	});

																	}
																	}


												},{
													xtype : "textfield",
													//xtype : "combo",
													allowBlank : false,
													name :'shipCompany',// "cruiseline",
													fieldLabel : "Cruise Line",
													bodyStyle : "padding: 2px 4px 2px 4px;",
													width : 185
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
															html : "Cruise Name:",
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : "textfield",
															//name : "cruiseName",
																name : "name",
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
															fieldLabel : "Day/Date",
															enableKeyEvents : true,
															width : 180
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
															name : "cruiseNumber",
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
															//xtype : "textfield",
															//name : "cruiseDestination",
															name : "destination",
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
															name : "embarkation",
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
															html : "Dept Date:",
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : "datefield",
															allowBlank : false,
															name : "departureDate",//departureDate   embarkDate
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
														columns : 5
													},
													items : [{
															html : "Dis-Embarkation:",
															width : Ext.isIE ? 90 : 95
														}, {
															//xtype : "combo",
															xtype : "textfield",
															name : "countryFrom",
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
																	var a = this.ownerCt.findParentByType("awesomewindow")
																}
															}
														}, {
															html : "",
															width : Ext.isIE ? 10 : 50
														}, {
															html : "Arr. Date:",
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : "datefield",
															allowBlank : false,
															name : "arrivalDate",
															fieldLabel : "Day/Date",
															bodyStyle : "padding: 2px 4px 2px 4px;",
															enableKeyEvents : true,
															showToday : false,
															width : 100,
															format : "dMy D",
															minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
														}
													]
												}
											]
										}
									]
								}, 

						/*		{
									xtype : "panel",
									layout : "fit",
									frame : true,
									height : 160,
									width : 735,
									style : "padding-top: 10px; margin-bottom: 2px;",
									border : true,
									items : [{
											xtype : "editorgrid",
											id : "eeee",
											border : true,
											clicksToEdit : 1,
											multiSelect : true,
											autoWidth : true,
											width : 750,
											sm : new Ext.grid.CheckboxSelectionModel({
												singleSelect : true,
												checkOnly : true
											}),
											store : new Ext.data.JsonStore({
												url : "",
												id : "dataURI",
												identifier : "deals",
												fields : ["name", "dataURI", "currency", "interior", "ocean", "balcony", "suite", "expireDate", "dealDescr"],
												data : [{
														name : "Standard",
														currency : "AUD",
														interior : "",
														ocean : "",
														balcony : "",
														suite : "",
														expireDate : ""
													}
												]
											}),
											cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
														checkOnly : true
													}), {
														header : "Deals",
														dataIndex : "name",
														width : 100,
														editor : new Ext.form.ComboBox({
															store : TDS.data.deals,
															editable : false,
															forceSelection : true,
															mode : "local",
															triggerAction : "all",
															displayField : "text",
															valueField : "text"
														})
													}, {
														header : "Category",
														dataIndex : "category",
														width : 80,
														editor : new Ext.form.TextField({})
													}, {
														header : "Curr",
														dataIndex : "currency",
														width : 40,
														editor : new Ext.form.TextField({})
													}, {
														header : "Single",
														dataIndex : "interior",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("interior")).toFixed(2) : ""
														}
													}, {
														header : "Double",
														dataIndex : "ocean",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("ocean")).toFixed(2) : ""
														}
													}, {
														header : "Tripple",
														dataIndex : "balcony",
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("balcony")).toFixed(2) : ""
														}
													}, {
														header : "Quad",
														dataIndex : "suite",
														width : 80,
														editor : new Ext.form.NumberField({}),
														renderer : function (f, d, e) {
															return f != "" ? parseFloat(e.get("suite")).toFixed(2) : ""
														}
													}, {
														header : "Expires",
														dataIndex : "expireDate",
														editor : new Ext.form.DateField({
															format : "dMy"
														})
													}
												]),
											listeners : {
												render : function (b) {
													var a = Ext.decode(b.ownerCt.ownerCt.findParentByType("awesomewindow").aw.data.cruiseDeals);
													var c = []
												},
												rowclick : function (b, d, c) {
													var a = b.getStore().getAt(d);
													b.ownerCt.ownerCt.findByType("textarea")[0].setValue(a.get("dealDescr"))
												}
											}
										}
									],
									bbar : [{
											xtype : "button",
											text : "Add",
											id : "ss",
											handler : function () {
												var b = this.ownerCt.ownerCt.findByType("editorgrid")[0];
												var a = b.getStore();
												a.add([new a.recordType({
															name : "Standard",
															balcony : "",
															interior : ""
														})]);
												b.newRecordIndex = a.getCount() - 1;
												b.startEditing(b.newRecordIndex, 1);
												b.getSelectionModel().selectRow(b.newRecordIndex)
											}
										}, {
											xtype : "button",
											text : "Cancel",
											handler : function () {
												var b = this.ownerCt.ownerCt.findByType("editorgrid")[0];
												var a = b.getStore().getAt(b.newRecordIndex);
												if (a == -1 || typeof a.get("dataURI") != "undefined") {
													return
												}
												b.getStore().remove(a)
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
								},

*/


						/*		 {
									xtype : "panel",
									border : false,
									style : "padding-top:10px;",
									height : 175,
									items : [{
											height : 90,
											xtype : "textarea",
											name : "deals_description",
											id : "deal",
											width : 735,
											height : 90
										}
									]
								}
									*/


 {
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
 },
							]
						}
					]
				},/* {
					title : "Itinerary",
					layout : "fit",
					items : {
						xtype : "htmleditor",
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
						enableAlignments : false
					}
				},*/ {
					title : "Included",
					layout : "fit",
					items : {
						xtype : "htmleditor",
						name : "descIncluded",
						height : 200,
						hideLabel : false,
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
				}, {
					title : "Ports",
					bodyStyle : "padding: 0px 0px 0px 0px;",
					items : [{
							xtype : "panel",
							layout : "table",
							frame : true,
							layoutConfig : {
								columns : 1
							},
							labelWidth : 110,
							border : false,
							style : "padding: 5px;",
							defaultType : "textfield",
							items : [{
									xtype : "panel",
									width : 775,
									height : 165,
									border : true,
									style : "padding: 2px;",
									defaultType : "textfield",
									items : [{
											xtype : "grid",
											alwaysUseCollection : true,
											name : "ggg",
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
											html : "Day/Date:",
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
											html : "Departure Time:",
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
											name : "arrival",
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
											height : 165,
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
											style : "padding: 20px 0px 0px 10px; ",
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
				}, {
					title : "Dinning Times",
					items : [{
							xtype : "panel",
							layout : "column",
							frame : true,
							items : [{
									xtype : "panel",
									style : "padding-left:5px;",
									border : true,
									frame : true,
									height : 175,
									width : 710,
									layout : "table",
									layoutConfig : {
										columns : 1
									},
									colspan : 2,
									items : [{
											xtype : "grid",
											alwaysUseCollection : true,
											autoExpandColumn : true,
											autoScroll : true,
											width : 700,
											height : 175,
											border : false,
											columns : [{
													header : "",
													width : 40,
													id : "chk",
													fixed : true,
													dataIndex : "chk",
													editable : true,
													renderer : function (f, c, b, e, g, d) {
														var a = b.get("dataURI");
														return '<input type="checkbox" id="ch' + a + '" name="rateChk[]"  />'
													}
												}, {
													header : "Restaurant",
													dataIndex : "restaurant"
												}, {
													header : "Sitting",
													dataIndex : "range"
												}, {
													header : "Time",
													dataIndex : "position"
												}, {
													header : "No",
													dataIndex : "locations"
												}, {
													header : "Status",
													dataIndex : "totals"
												}
											],
											viewConfig : {
												forceFit : true
											},
											store : new Ext.data.JsonStore({
												url : "",
												id : "dataURI",
												fields : ["catName", "cabinNumber", "cabinTypeText", "deck", "dates", "locations", "position", "dataURI", "totals", "cabinStatus", "range", "connect", "obstruct", "berths", "rollway", "crib"]
											}),
											sm : new Ext.grid.RowSelectionModel()
										}
									]
								}, {
									xtype : "panel",
									width : 700,
									style : "padding:10px;",
									layout : "table",
									border : false,
									layoutConfig : {
										columns : 2
									},
									items : [{
											xtype : "label",
											text : "Restaurant Name :"
										}, {
											xtype : "textfield",
											name : "total",
											width : 375,
											style : "margin-left:75px"
										}, {
											xtype : "panel",
											style : "padding-top:5px;",
											layout : "table",
											border : false,
											layoutConfig : {
												columns : 2
											},
											items : [{
													xtype : "label",
													text : "Sitting :",
													style : "padding-right:55px",
													width : 75
												}, {
													xtype : "textfield",
													name : "sitting",
													width : 80
												}
											]
										}, {
											xtype : "panel",
											style : "padding-top:5px;padding-left:75px;",
											layout : "table",
											border : false,
											layoutConfig : {
												columns : 6
											},
											items : [{
													xtype : "combo",
													name : "sitting",
													width : 120
												}, {
													xtype : "label",
													text : "No :",
													style : "padding-left:10px;padding-right:10px",
													width : 75
												}, {
													xtype : "textfield",
													name : "total",
													width : 80
												}, {
													xtype : "label",
													text : "Status :",
													style : "padding-left:10px;padding-right:10px",
													width : 75
												}, {
													xtype : "combo",
													name : "total",
													width : 80
												}
											]
										}
									]
								}, {
									xtype : "label",
									html : "<b><u>Table Sizes</u></b>"
								}, {
									xtype : "panel",
									height : 110,
									width : 550,
									style : "padding:5px;",
									layout : "column",
									border : false,
									defaults : {
										style : "padding:10px"
									},
									items : [{
											xtype : "panel",
											layout : "column",
											border : false,
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
								}, {
									xtype : "panel",
									height : 50,
									border : false,
									style : "padding-left:125px;height:30px;",
									layout : "table",
									layoutConfig : {
										columns : 2
									},
									items : [{
											xtype : "button",
											text : "Add",
											style : "padding-left: 50px;padding-right: 50px;",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0];
												var p = a.getStore();
												var c = this.ownerCt.ownerCt.findByType("combo")[0];
												var l = this.ownerCt.ownerCt.findByType("textfield")[3];
												var j = this.ownerCt.ownerCt.findByType("datefield")[0];
												var m = this.ownerCt.ownerCt.findByType("datefield")[1];
												function o(s) {
													var r = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
													var v = new Date(s),
													u = "" + (v.getMonth() + 1),
													q = "" + v.getDate(),
													t = v.getFullYear().toString();
													if (u.length < 2) {
														u = "0" + u
													}
													if (q.length < 2) {
														q = "0" + q
													}
													return [q, r[u], Number(t.slice(t.length - 2, t.length))].join("")
												}
												var e;
												if (!Ext.isEmpty(j.getValue()) && !Ext.isEmpty(m.getValue())) {
													e = o(j.getValue()) + " - " + o(m.getValue())
												}
												var n = this.ownerCt.ownerCt.findByType("numberfield")[0];
												var g = this.ownerCt.ownerCt.findByType("numberfield")[1];
												var i = g.getValue().toString() + " - " + n.getValue().toString();
												var b = this.ownerCt.ownerCt.findByType("textfield")[3].getValue();
												var f = this.ownerCt.ownerCt.findByType("combo")[1];
												var h = [],
												k = [],
												d = [];
												this.ownerCt.ownerCt.findByType("panel")[12].items.items.forEach(function (q) {
													if (q.checked) {
														h.push(q.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[13].items.items.forEach(function (q) {
													if (q.checked) {
														k.push(q.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[14].findByType("panel")[0].items.items.forEach(function (q) {
													if (q.checked) {
														d.push(q.getRawValue())
													}
												});
												p.add([new p.recordType({
															catName : c.getRawValue(),
															dates : e,
															deck : d.toString(),
															locations : k.toString(),
															position : h.toString(),
															cabinStatus : f.getRawValue(),
															range : i,
															totals : b
														})]);
												c.reset();
												n.reset();
												g.reset();
												f.reset();
												j.reset();
												m.reset();
												this.ownerCt.ownerCt.findByType("textfield")[3].reset();
												this.ownerCt.ownerCt.findByType("panel")[12].items.items.forEach(function (q) {
													q.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[13].items.items.forEach(function (q) {
													q.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[14].items.items.forEach(function (q) {
													q.setValue(false)
												})
											}
										}, {
											xtype : "button",
											text : "Clear",
											style : "padding-left: 50px;padding-right: 50px;",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0],
												b;
												while (b = a.selModel.getSelected()) {
													a.store.remove(b)
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





























