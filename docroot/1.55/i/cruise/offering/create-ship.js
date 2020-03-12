{
	xtype : "form",
	border : false,
	width : 750,
	markDataDirtyOnLoad : true,
	beforeSubmit : function (t) {
		var c = this.findByType("grid")[2];
		var s = c.getStore().data.items;
		var p = this.findByType("grid")[3];
		var k = p.getStore().data.items;
		var f = this.findByType("grid")[0];
		var e = f.getStore().data.items;
		var h = p.getStore().data.length;
		var a = c.getStore().data.length;
		var o = [];
		var m = [];
		var l = [],
		g = [];
		console.log(k)
		for (var r = 0; r < a; r++) {
			if (h == 0) {
				s[r].data.cabins = m
			} else {
				for (var q = 0; q < h; q++) {
					console.log(s[r].data)
						console.log(k[q].data)
					//if (s[r].data.category == k[q].data.catName) {
						if (s[r].data.code == k[q].data.code) {
						m[q] = k[q].data
					}
					s[r].data.cabins = m
				}
			}
			m = [];
			console.log(s[r])
			o[r] = s[r].data
		}
		t.categeories = o;
		this.ownerCt.findByType("grid")[0].getStore().each(function (i) {
			l.push(i.data)
		});
		t.deckList = l;
		this.ownerCt.findByType("grid")[1].getStore().each(function (i) {
			g.push(i.data)
		});
		t.deckPlanList = g;
		var n = "",
		d = "";
		d = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).findByType("combo")[0].getValue();
		var u = this.ownerCt.aw.postDataURI;
		if (d) {
			n = d.substring(d.lastIndexOf("/") + 1, d.length);
			this.ownerCt.aw.destinationDataURI = u + "/" + n;
			this.ownerCt.aw.postDataURI = u
		}
		function b(y) {
			var B = [];
			var A = {};
			for (var w = 0; w < y.length; w++) {
				var x = Object.keys(y[w]);
				x.sort(function (j, i) {
					return j - i
				});
				var z = "";
				for (var v = 0; v < x.length; v++) {
					z += JSON.stringify(x[v]);
					z += JSON.stringify(y[w][x[v]])
				}
				if (!A.hasOwnProperty(z)) {
					B.push(y[w]);
					A[z] = true
				}
			}
			return B
		}
		return t
	},
	beforeDataLoad : function (c, b) {
		var a = b.getRequiredData("supplier");
		c.termsAndConditions = a.data.defaultOfferingTermsAndConditions;
		return c
	},
	items : [{
			xtype : "tabpanel",
			//id : "tab",
			activeTab : 0,
			layoutOnTabChange : true,
			height : 500,
			config : {
				shipImage : "",
				deckImage : ""
			},
			defaults : {
				bodyStyle : "padding: 6px 4px 6px 4px;"
			},
			items : [{
					title : "Ship Info",
					items : [{
							xtype : "panel",
							height : 460,
							layout : "table",
							frame : true,
							layoutConfig : {
								columns : 2
							},
							defaults : {
								bodyStyle : "padding:10px;padding-bottom: 150px;"
							},
							autoScroll : true,
							items : [{
									xtype : "panel",
									border : false,
									height : 400,
									style : "bottom:50px;",
									items : [{
											xtype : "panel",
											border : false,
											layout : "form",
											layoutConfig : {
												columns : 1
											},
											items : [
													{
													xtype : "textfield",
													width : 150,
													fieldLabel : " Ship ",
													emptyText : "Ship Name",
													name : "shipName"
												},{
													xtype : "textfield",
													fieldLabel : "Company ",
													name : "cruiseline"
												},  {
													xtype : "panel",
													border : false,
													layout : "column",
													items : [{
															xtype : "label",
															text : "Recall Ship :",
															width : 105
														}, {
															xtype : "combo",
															fieldLabel : "Recall Ship",
															emptyText : "Ship Name",
															allowBlank : false,
															name : "ship",
															hideLabel : true,
															enableKeyEvents : true,
															width : 150,
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
																	var d = "";
																	var c = a.combo.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
																	console.log("^^^^^^^^^^^^^^^^^^^     ");
																	this.getStore().proxy.conn.method = "GET",
																	this.getStore().proxy.conn.url = TDS.env.dataPath + c + "/cruiseOfferings/shipName",
																	this.getStore().load()
																},
																select : function (g, b) {
																	var c = this.getValue();
																	shipId = c.substring(c.lastIndexOf("/") + 1, c.length);
																	console.log(shipId);
																	var f = g.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
																	var e = this.findParentByType("form").getForm();
																	var d = this.findParentByType("tabpanel").items.itemAt(2);
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/shipName/" + shipId,//---------------------
																		method : "GET",
																		success : function (j, m) {
																			var l = Ext.decode(j.responseText);
																			e.findField("notes").setValue(l.notes);
																			e.findField("cruiseline").setValue(l.shipCompany);
																			e.findField("shipName").setValue(l.shipName);
																			var i = "",
																			k = "",
																			h;
																			i = "../" + l.shipInfoGraphicImgPath;
																			document.getElementById("shipInfoImageId").src = i;
																			k = "../" + l.shipGraphicImgPath;
																			h = "../" + l.deckGraphicImgPath;
																			g.findParentByType("tabpanel").config.shipImage = k
																		}
																	});
																	var a = this.findParentByType("tabpanel").findByType("grid");
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/deck/" + shipId,
																		method : "GET",
																		success : function (h, l) {
																			var k = Ext.decode(h.responseText);
																			var n = k["ship/deck/collection"];
																			if (typeof n == "undefined") {
																				return
																			}
																			var m = [];
																			for (var j = 0; j < n.length; j++) {
																				k[n[j]].dataURI = n[j];
																				m.push(k[n[j]])
																			}
																			a[0].getStore().loadData(m)
																		}
																	});
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/deckPlan/" + shipId,
																		method : "GET",
																		success : function (h, l) {
																			var k = Ext.decode(h.responseText);
																			var n = k["ship/deckPlan/collection"];
																			if (typeof n == "undefined") {
																				return
																			}
																			var m = [];
																			for (var j = 0; j < n.length; j++) {
																				k[n[j]].dataURI = n[j];
																				m.push(k[n[j]])
																			}
																			a[1].getStore().loadData(m)
																		}
																	});
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/categeories/" + shipId,
																		method : "GET",
																		success : function (h, l) {
																			var k = Ext.decode(h.responseText);
																			var n = k["ship/category/collection"];
																			if (typeof n == "undefined") {
																				return
																			}
																			var m = [];
																			for (var j = 0; j < n.length; j++) {
																				k[n[j]].dataURI = n[j];
																				m.push(k[n[j]])
																			}
																			a[2].getStore().loadData(m)
																		}
																	});
																	Ext.Ajax.request({
																		url : TDS.env.dataPath + f + "/cruiseOfferings/cabin/" + shipId,
																		method : "GET",
																		success : function (h, l) {
																			var k = Ext.decode(h.responseText);
																			var n = k["ship/cabin/collection"];
																			if (typeof n == "undefined") {
																				return
																			}
																			var m = [];
																			for (var j = 0; j < n.length; j++) {
																				k[n[j]].dataURI = n[j];
																				m.push(k[n[j]])
																			}
																			a[3].getStore().loadData(m)
																		}
																	})
																}
															}
														}, {
															xtype : "omnicrementer",
															name : "defaultCutoffTimeDays",
															value : 30,
															forceSubmit : true,
															maxValue : 30,
															hidden : true
														}
													]
												}
											],
											colspan : 1
										}, {
											width : 350,
											height : 275,
											border : false,
											style : "padding-top:20px;",
											autoScroll : true,
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
														this.html = '<center><img border="0"   id="shipInfoImageId" name="shipInfoImage"   alt="Ship Image" width=350px;height:275px; ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
													} else {
														b = "../" + c;
														this.html = '<center><img border="0"   id="shipInfoImageId" name="shipInfoImage" src=' + b + ' alt="shipInfoImage" width=350px;height:275px; ></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
													}
												}
											}
										}, {
											xtype : "panel",
											border : false,
											layout : "table",
											style : "padding: 20px 00px 0px 0px; ",
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
														document.getElementById("shipInfoImageValue").value = "";
														Ext.getCmp("gip").setValue("")
													}
												}
											]
										}
									]
								}, {
									xtype : "htmleditor",
									name : "notes",
									height : 400,
									width : 350,
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
									style : "padding: 20px 00px 0px 0px; "
								}
							]
						}
					]
				}, {
					title : "Decks",
					items : [{
							xtype : "panel",
							height : 460,
							frame : true,
							border : true,
							layout : "column",
							items : [{
									xtype : "panel",
									style : "padding:10px;",
									border : true,
									height : 300,
									width : 320,
									layout : "table",
									layoutConfig : {
										columns : 2
									},
									items : [{
											xtype : "grid",
											alwaysUseCollection : true,
											autoExpandColumn : true,
											autoScroll : true,
											width : 300,
											height : 300,
											border : true,
											stateful : true,
											stateId : "gridId",
											columns : [{
													header : "Decks",
													dataIndex : "deck"
												}, {
													header : "From Date",
													dataIndex : "fromDate",
													renderer : Ext.util.Format.dateRenderer("d-M-Y")
												}, {
													header : "",
													width : 40,
													dataIndex : "action",
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button>  <input type="image" id = "editCell" src="images/grid/edit.png"> </button>'
													}
												}, {
													header : "",
													dataIndex : "action",
													width : 40,
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button style="width:30px; padding-right:10px;"> <input type="image" id="remove" src="images/grid/remove.png"></button>'
													}
												}
											],
											viewConfig : {
												forceFit : true
											},
											store : new Ext.data.Store({
												url : "",
												id : "dataURI",
												reader : new Ext.data.JsonReader({
													fields : ["deck", "deckName", "dataURI", "fromDate", "deckImgPath"]
												})
											}),
											sm : new Ext.grid.RowSelectionModel(),
											listeners : {
												cellclick : function (c, f, a, d) {
													if (a == 3) {
														var b;
														while (b = c.selModel.getSelected()) {
															c.store.remove(b)
														}
														c.ownerCt.ownerCt.findByType("textfield")[2].reset();
														c.ownerCt.ownerCt.findByType("datefield")[0].reset();
														c.ownerCt.items.itemAt(0).reset();
														document.getElementById("shipImageId").src = "";
														document.getElementById("shipUpLoads").value = ""
													}
													if (a == 2) {
														if (Ext.isEmpty(c.getSelectionModel().getSelections()[0].data.fromDate)) {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue()
														} else {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue(new Date(c.getSelectionModel().getSelections()[0].data.fromDate))
														}
														this.ownerCt.ownerCt.findByType("textfield")[2].setValue(c.getSelectionModel().getSelections()[0].data.deck);
														this.ownerCt.ownerCt.findByType("combo")[0].setValue(c.getSelectionModel().getSelections()[0].data.deckName);
														this.ownerCt.ownerCt.findByType("button")[1].show();
														this.ownerCt.ownerCt.findByType("button")[2].show();
														this.ownerCt.ownerCt.findByType("button")[3].hide()
													}
												}
											}
										}
									]
								}, {
									xtype : "panel",
									style : "padding-left:10px;padding-bottom:20px;",
									border : true,
									height : 350,
									width : 400,
									layout : "table",
									layoutConfig : {
										columns : 1
									},
									border : true,
									items : [{
											xtype : "label",
											html : "<b><u>Ship Decks</u></b>"
										}, {
											width : 375,
											height : 220,
											style : "padding-top:10px;",
											border : true,
											columnWidth : 0.6,
											autoScroll : true,
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
														this.html = '<center><img border="0" max-width="100%" max-height = "100%" width=350px;height:120px; id="shipImageId" name="shipImage"   alt="Ship Deck Image"></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
													} else {
														b = "../" + c;
														this.html = '<center><img border="0"  max-width="100%" max-height = "100%" id="shipImageId" name="shipImage" src=' + b + '  alt="Ship Deck Image" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
													}
												}
											}
										}, {
											xtype : "panel",
											style : "padding-top: 20px; ",
											border : false,
											layout : "table",
											column : 4,
											items : [{
													html : "Browse",
													border : false
												}, {
													html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border=true;"><td width= "75"><input width= "75" name="fileUpLoad" id="shipUpLoads"type="file"  /></td></form>',
													width : 185,
													style : "padding: 0px 15px 0px 10px; "
												}, {
													xtype : "textfield",
													id : "shipImageValue",
													hidden : true,
													name : "shipGraphicImgPath",
													style : "padding-left:  15px;"
												}, {
													xtype : "button",
													text : "Upload",
													style : "padding: 0px 00px 0px 10px; ",
													handler : function (b) { ;
														Ext.getCmp("ship").html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
														var i = this.ownerCt.findParentByType("awesomewindow");
														var a = i.aw.postDataURI;
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
																	var p = m.getAllResponseHeaders();
																	var q = m.responseText;
																	var o = a;
																	var n = "GraphicsImg/" + q;
																	document.getElementById("imageName").value = n;
																	Ext.getCmp("shipImageValue").setValue(n);
																	document.images.shipImage.src = "../" + n;
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
												}
											]
										}
									]
								}, {
									xtype : "panel",
									height : 150,
									width : 750,
									style : "padding-left:10px;",
									layout : "table",
									border : false,
									layoutConfig : {
										columns : 4
									},
									defaults : {
										bodyStyle : "padding-top:10px;"
									},
									items : [{
											xtype : "combo",
											width : 150,
											name : "deckNumber",
											minChars : 1,
											enableKeyEvents : true,
											mode : "local",
											editable : false,
											width : 100,
											typeAhead : true,
											excludeFromSession : true,
											triggerAction : "all",
											forceSelection : true,
											selectOnFocus : true,
											displayField : "name",
											valueField : "dataURI",
											store : new Ext.data.SimpleStore({
												fields : ["dataURI", "name"],
												data : [["Deck Name", "Deck Name"], ["Deck Number", "Deck Number"]]
											})
										}, {
											xtype : "textfield",
											fieldLabel : "Deck",
											name : "deck",
											width : 200,
											style : "margin-left:10px;"
										}, {
											border : false
										}, {
											border : false
										}, {
											border : false
										}, {
											xtype : "panel",
											height : 40,
											layout : "table",
											border : true,
											layoutConfig : {
												columns : 2
											},
											items : [{
													xtype : "label",
													text : "From Date ",
													width : 160
												}, {
													xtype : "datefield",
													fieldLabel : "Deck",
													name : "deckFromDate",
													width : 127,
													style : "margin-left:20px;margin-bottom:5px;",
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
												}
											]
										}, {
											border : false
										}, {
											border : false
										}, {
											xtype : "button",
											text : "Update",
											hidden : true,
											style : "padding-top: 10px;",
											handler : function () {
												var c = this.ownerCt.findByType("combo")[0];
												var d = this.ownerCt.findByType("textfield")[1];
												var g = this.ownerCt.findByType("datefield")[0];
												var f = this.ownerCt.ownerCt.findByType("grid")[0];
												var h = f.getStore();
												var e = h.indexOf(f.getSelectionModel().getSelections()[0]);
												var b = "";
												if (f.getSelectionModel().getSelections()[0].data.dataURI != "undefined") {
													b = f.getSelectionModel().getSelections()[0].data.dataURI
												}
												f.getStore().remove(f.selModel.getSelected());
												var a = [new h.recordType({
														deck : d.getValue(),
														fromDate : g.getValue(),
														deckName : c.getValue(),
														dataURI : !Ext.isEmpty(b) ? b : ""
													})];
												h.insert(e, a);
												this.ownerCt.ownerCt.findByType("button")[1].hide();
												this.ownerCt.ownerCt.findByType("button")[2].hide();
												this.ownerCt.ownerCt.findByType("button")[3].show()
											}
										}, {
											xtype : "button",
											text : "Cancel",
											hidden : true,
											style : "padding-top: 10px;",
											handler : function () {
												this.ownerCt.findByType("button")[0].hide();
												this.ownerCt.findByType("button")[1].hide();
												this.ownerCt.findByType("button")[2].show();
												var a = this.ownerCt.items.itemAt(1);
												var b = this.ownerCt.ownerCt.findByType("datefield")[0];
												a.reset();
												b.reset();
												this.ownerCt.findByType("combo")[0].reset();
												document.getElementById("shipImageId").src = "";
												document.getElementById("shipUpLoads").value = "";
												this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().clearSelections()
											}
										}, {
											xtype : "button",
											text : "Add",
											id : "adds",
											style : "padding-top: 10px;margin-left: -250px;padding-right: 10px;",
											handler : function () {
												var b = false;
												var a = this.ownerCt.findByType("combo")[0];
												var c = this.ownerCt.findByType("textfield")[1];
												var d = this.ownerCt.findByType("datefield")[0];
												var e = this.ownerCt.ownerCt.findByType("grid")[0].getStore();
												e.add([new e.recordType({
															deck : c.getValue(),
															fromDate : d.getValue(),
															deckName : a.getValue()
														})]);
												a.reset();
												c.reset();
												d.reset();
												this.ownerCt.items.itemAt(0).reset()
											}
										}, {
											xtype : "button",
											text : "Clear",
											style : "padding-top: 10px;margin-left: -150px;padding-right: 50px;",
											handler : function () {
												var c = this.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0),
												d;
												c.store.removeAll();
												var a = this.ownerCt.items.itemAt(1);
												var b = this.ownerCt.items.itemAt(3).findByType("textfield")[0];
												a.reset();
												b.reset();
												this.ownerCt.items.itemAt(0).reset();
												document.getElementById("shipImageId").src = "";
												document.getElementById("shipUpLoads").value = ""
											}
										}
									]
								}
							]
						}
					]
				}, {
					title : "Deck Plan",
					closable : true,
					items : [{
							xtype : "panel",
							height : 460,
							frame : true,
							layout : "table",
							frame : true,
							layoutConfig : {
								columns : 2
							},
							defaults : {},
							items : [{
									xtype : "panel",
									layout : "table",
									height : 450,
									border : false,
									layoutConfig : {
										columns : 1
									},
									items : [{
											xtype : "panel",
											style : "padding:10px;",
											border : true,
											height : 300,
											width : 320,
											layout : "table",
											layoutConfig : {
												columns : 2
											},
											items : [{
													xtype : "grid",
													alwaysUseCollection : true,
													autoExpandColumn : true,
													autoScroll : true,
													width : 300,
													height : 300,
													border : true,
													columns : [{
															header : "Decks",
															dataIndex : "deck"
														}, {
															header : "Plan Date",
															dataIndex : "planDate",
															renderer : Ext.util.Format.dateRenderer("d-M-Y")
														}, {
															header : "Deck Plan",
															dataIndex : "deckPlanGraphics",
															renderer : function (b, a, c) {
																return '<img src="../' + c.get("deckPlanGraphics") + '"  width="16px" height= "16px"/>'
															}
														}, {
															header : "",
															width : 40,
															dataIndex : "action",
															iconCls : "remove",
															renderer : function (c, b, a) {
																return '<button>  <input type="image" id = "editCell" src="images/grid/edit.png"> </button>'
															}
														}, {
															header : "",
															dataIndex : "action",
															width : 40,
															iconCls : "remove",
															renderer : function (c, b, a) {
																return '<button style="width:30px; padding-right:10px;"> <input type="image" id="remove" src="images/grid/remove.png"></button>'
															}
														}
													],
													viewConfig : {
														forceFit : true
													},
													store : new Ext.data.Store({
														url : "",
														id : "dataURI",
														reader : new Ext.data.JsonReader({
															fields : ["deck", "deckName", "dataURI", "planDate", "deckPlanGraphics"]
														})
													}),
													sm : new Ext.grid.RowSelectionModel(),
													listeners : {
														cellclick : function (c, g, a, f) {
															if (a == 4) {
																var b;
																while (b = c.selModel.getSelected()) {
																	c.store.remove(b)
																}
															}
															if (a == 3) {
																this.ownerCt.ownerCt.findByType("button")[1].show();
																this.ownerCt.ownerCt.findByType("button")[2].show();
																this.ownerCt.ownerCt.findByType("button")[3].hide();
																var d = c.getSelectionModel().getSelections()[0].data;
																if (Ext.isEmpty(d.planDate)) {
																	this.ownerCt.ownerCt.findByType("datefield")[0].setValue()
																} else {
																	this.ownerCt.ownerCt.findByType("datefield")[0].setValue(new Date(d.planDate))
																}
																this.ownerCt.ownerCt.findByType("combo")[0].setRawValue(d.deck);
																document.images.deckImage.src = "../" + d.deckPlanGraphics;
																Ext.getCmp("deckImageValue").reset()
															}
														}
													}
												}
											]
										}, {
											xtype : "label",
											html : "<b><u>Decks Plan</u></b>"
										}, {
											xtype : "panel",
											layout : "table",
											layoutConfig : {
												columns : 6
											},
											style : "padding-top: 20px; ",
											border : false,
											items : [{
													html : "Deck:",
													border : false,
													style : "margin-left: 2px;padding-right: 10px;"
												}, {
													labelStyle : "padding-left: 50px;",
													xtype : "combo",
													width : 80,
													name : "deckPlanNo",
													allowAddNewData : true,
													editable : false,
													enableKeyEvents : true,
													mode : "local",
													typeAhead : true,
													excludeFromSession : true,
													triggerAction : "all",
													forceSelection : true,
													selectOnFocus : true,
													multiSelect : true,
													displayField : "deck",
													valueField : "deck",
													store : new Ext.data.Store({
														fields : ["deck", "dataURI", "deckName", "fromDate", "deckImgPath"]
													}),
													config : {
														index : "",
														dataURI : ""
													},
													listeners : {
														beforequery : function (b, c) {
															document.getElementById("deckImageId").src = "";
															this.ownerCt.ownerCt.findByType("datefield")[0].reset();
															var a = this.findParentByType("tabpanel").findByType("grid")[0].getStore();
															this.store.removeAll();
															var d = "";
															a.each(function (e) {
																d = ({
																	deck : e.get("deck"),
																	dataURI : e.get("dataURI"),
																	fromDate : e.get("fromDate"),
																	deckImgPath : e.get("deckImgPath")
																});
																b.combo.store.add(new Ext.data.Record(d))
															})
														},
														select : function (e, a, b) {
															var d = this;
															var c = a.data.dataURI;
															if (a.data.dataURI != "" && typeof c != "undefined") {
																Ext.Ajax.request({
																	url : TDS.env.dataPath + this.findParentByType("awesomewindow").getData("dataURI") + "/cruiseOfferings/" + c,
																	method : "POST",
																	success : function (f, h) {
																		var g = Ext.decode(f.responseText);
																		document.images.deckImage.src = "../" + g.deckImgPath;
																		d.ownerCt.findByType("datefield")[0].setValue(TDS.util.Format.dateFormatNew(g.fromDate))
																	}
																})
															} else {
																d.ownerCt.findByType("datefield")[0].setValue(a.get("fromDate"))
															}
														}
													}
												}, {
													html : "Plan Date: ",
													border : false,
													style : "padding-left: 20px;"
												}, {
													xtype : "datefield",
													width : 80,
													name : "deckPlanDate",
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
												}
											]
										}, {
											xtype : "panel",
											style : "padding-top: 20px; ",
											border : false,
											layout : "table",
											column : 3,
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
													id : "upload",
													style : "padding: 0px 00px 0px 10px; ",
													config : {
														counter : 0,
														deckList : [],
														array : [],
														flag : false
													},
													handler : function (b) { ;
														Ext.getCmp("deck").html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
														var i = this.ownerCt.findParentByType("awesomewindow");
														var a = i.aw.postDataURI;
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
																	var s = m.getAllResponseHeaders();
																	var u = m.responseText;
																	var p = a;
																	var o = "GraphicsImg/" + u;
																	document.getElementById("imageName").value = o;
																	Ext.getCmp("deckImageValue").setValue(o);
																	document.images.deckImage.src = "../" + o;
																	document.getElementById("imageName").value = o;
																	var q = "";
																	var t = "";
																	var n = false
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
													xtype : "hidden",
													name : "decks"
												}
											]
										}, {
											xtype : "panel",
											style : "padding-left:100px;padding-top: 20px; ",
											border : false,
											layout : "table",
											column : 4,
											items : [{
													xtype : "button",
													text : "Update",
													hidden : true,
													handler : function (b) {
														var e = this.ownerCt.ownerCt.findByType("combo")[0];
														var h = this.ownerCt.ownerCt.findByType("datefield")[0];
														var d = this.ownerCt.ownerCt.findByType("textfield")[2];
														var a = this.ownerCt.ownerCt.findByType("grid")[0];
														var i = a.getStore();
														var g = i.indexOf(a.getSelectionModel().getSelections()[0]);
														var c = "";
														if (a.getSelectionModel().getSelections()[0].data.dataURI != "undefined") {
															c = a.getSelectionModel().getSelections()[0].data.dataURI
														}
														a.getStore().remove(a.selModel.getSelected());
														var f = [new i.recordType({
																deck : e.getValue(),
																planDate : h.getValue(),
																deckPlanGraphics : d.getValue(),
																dataURI : !Ext.isEmpty(c) ? c : ""
															})];
														i.insert(g, f);
														this.ownerCt.ownerCt.findByType("button")[1].hide();
														this.ownerCt.ownerCt.findByType("button")[2].hide();
														this.ownerCt.ownerCt.findByType("button")[3].show()
													}
												}, {
													xtype : "button",
													style : "  padding-left:30px; ",
													text : "Cancel",
													hidden : true,
													handler : function (a) {
														this.ownerCt.ownerCt.findByType("button")[1].hide();
														this.ownerCt.ownerCt.findByType("button")[2].hide();
														this.ownerCt.ownerCt.findByType("button")[3].show()
													}
												}, {
													xtype : "button",
													text : "Add",
													id : "sdfa",
													handler : function (e) {
														var b = false;
														var a = this.ownerCt.ownerCt.findByType("combo")[0];
														var d = this.ownerCt.ownerCt.findByType("datefield")[0];
														var c = this.ownerCt.ownerCt.findByType("textfield")[2];
														var f = this.ownerCt.ownerCt.findByType("grid")[0].getStore();
														f.add([new f.recordType({
																	deck : a.getValue(),
																	planDate : d.getValue(),
																	deckPlanGraphics : c.getValue()
																})]);
														a.reset();
														d.reset()
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
														this.ownerCt.ownerCt.findByType("datefield")[0].reset();
														this.ownerCt.ownerCt.findByType("combo")[0].reset();
														Ext.getCmp("deckImageValue").reset();
														Ext.getCmp("shipImageValue").reset()
													}
												}
											]
										}
									]
								}, {
									autoScroll : true,
									id : "deck",
									html : "deckImage",
									columnWidth : 0.4,
									style : "  padding-left:30px; ",
									border : true,
									width : 375,
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
											if (Ext.isEmpty(a)) {
												this.html = '<center><img border="0" id="deckImageId" name="deckImage"   alt="Deck Image" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
											} else {
												b = "../" + c;
												this.html = '<center><img border="0"  id="deckImageId" name="deckImage" src=' + b + '  alt="deckImage"></center><input type="hidden" id ="imageName"  name="imageName" value=' + b + ">"
											}
										}
									}
								}
							]
						}
					]
				}, {
					title : "Categories",
					items : [{
							xtype : "panel",
							height : 460,
							frame : true,
							items : [{
									xtype : "panel",
									//style : "padding-left:20px;",
									border : true,
									height : 200,
									width : 700,
									layout : "table",
									layoutConfig : {
										columns : 1
									},
									items : [{
											xtype : "grid",
											id : "asd",
											alwaysUseCollection : true,
											autoExpandColumn : true,
											autoScroll : true,
											width : 700,
											height : 250,
											border : false,
											columns : [
												{
													header : "Categeory",
													dataIndex : "code"
												},
												{
													header : "Categeory Descr.",
													dataIndex : "category"
												}, /*{
													header : "Code",
													dataIndex : "code"
												},*/ {
													header : "Decks",
													dataIndex : "deck"
												}, {
													header : "Position",
													dataIndex : "position"
												}, {
													header : "Dates",
													renderer : function (c, b, a) {
														function d(h) {
															var g = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
															var k = new Date(h),
															j = "" + (k.getMonth()),
															f = "" + k.getDate(),
															i = k.getFullYear().toString();
															return [f, g[j], Number(i.slice(i.length - 2, i.length))].join("")
														}
														var e;
														if (Ext.isEmpty(a.get("toDate")) && Ext.isEmpty(a.get("fromDate"))) {
															return ""
														} else {
															return d(a.get("fromDate")) + "-" + d(a.get("toDate"))
														}
													}
												},
												/*	{
													header : "Status",
													dataIndex : "status"
												},
												*/	
												{
													header : "",
													width : 40,
													dataIndex : "action",
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button>  <input type="image" id = "editCell" src="images/grid/edit.png"> </button>'
													}
												}, {
													header : "",
													dataIndex : "action",
													width : 40,
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button style="width:30px; padding-right:10px;"> <input type="image" id="remove" src="images/grid/remove.png"></button>'
													}
												}, {
													header : "CutOfftime",
													dataIndex : "defaultCutoffTimeDays",
													hidden : true
												}, {
													header : "CutOfftime",
													dataIndex : "defaultMaxHoldTimeSeconds",
													hidden : true
												}
											],
											sm : new Ext.grid.RowSelectionModel(),
											viewConfig : {
												forceFit : true
											},
											selectRows : function () {
												return this.getSelectionModel().getSelections()
											},
											store : new Ext.data.JsonStore({
												url : "",
												id : "dataURI",
												fields : ["category", "code", "cruiseDeck", "position", "paxtype", "status", "dataURI", "cabins", "categoryInfo", "paxtypeURI", "name", "locations", "categoryStatus", "cruiseShipOfferingURI", "categoryDeck", "defaultCutoffTimeDays", "defaultMaxHoldTimeSeconds", "fromDate", "toDate", "deck"]
											}),
											sm : new Ext.grid.RowSelectionModel(),
											stateful : true,
											stateId : "grid",
											listeners : {
												cellclick : function (c, i, a, g) {
													console.log(a);
													if (a == 6) {
														var b;
														while (b = c.selModel.getSelected()) {
															c.store.remove(b)
														}
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[0].setValue();
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[1].setValue();
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("datefield")[0].setValue();
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("datefield")[1].setValue();
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("combo")[0].setRawValue();
														if (c.getSelectionModel().getSelections() != "undefined") {
															var f = c.ownerCt.ownerCt.findByType("panel")[6].items.items;
															var h = c.ownerCt.ownerCt.findByType("panel")[7].items.items;
															f.forEach(function (e) {
																e.setValue(false)
															});
															h.forEach(function (e) {
																e.setValue(false)
															})
														}
													}
													if (a == 5) {
														var d = c.getSelectionModel().getSelections()[0].data;
														/* c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[0].setValue(d.category);
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[1].setValue(d.code);
														*/

														c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[0].setValue(d.code);
														c.ownerCt.ownerCt.findByType("panel")[2].findByType("textfield")[1].setValue(d.category);





														if (Ext.isEmpty(d.fromDate)) {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue()
														} else {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue(new Date(d.fromDate))
														}
														if (Ext.isEmpty(d.toDate)) {
															this.ownerCt.ownerCt.findByType("datefield")[1].setValue()
														} else {
															this.ownerCt.ownerCt.findByType("datefield")[1].setValue(new Date(d.toDate))
														}
													//	c.ownerCt.ownerCt.findByType("panel")[2].findByType("combo")[0].setRawValue(d.status);
														var f = c.ownerCt.ownerCt.findByType("panel")[6].items.items;
														var h = c.ownerCt.ownerCt.findByType("panel")[7].items.items;
														f.forEach(function (e) {
															e.setValue(false)
														});
														h.forEach(function (e) {
															e.setValue(false)
														});
														c.getSelectionModel().getSelections()[0].data.position.split(",").forEach(function (e) {
															f.forEach(function (j) {
																if (e == j.boxLabel) {
																	j.setValue(true)
																}
															})
														});
														c.getSelectionModel().getSelections()[0].data.deck.split(",").forEach(function (e) {
															h.forEach(function (j) {
																if (e == j.boxLabel) {
																	j.setValue(true)
																}
															})
														});
														c.ownerCt.ownerCt.findByType("button")[0].show();
														c.ownerCt.ownerCt.findByType("button")[1].show();
														c.ownerCt.ownerCt.findByType("button")[2].hide()
													}
												}
											}
										}
									]
								}, {
									xtype : "panel",
									height : 210,
									width : 700,
									style : "padding-left:20px;padding-top:5px;",
									layout : "table",
									border : false,
									layoutConfig : {
										columns : 3
									},
									defaults : {
										style : "margin:10px;"
									},
									items : [{
											xtype : "label",
											text : "Category :",
												style : "margin-left:25px",width:100
											//style : "margin-left:150px"
										}, 
											{
											xtype : "label",
											text : "Category Description :",width:150,
											//style : "margin-left:75px"
											//style : "margin-left:50px"
										}, {
											xtype : "label",
											text : "Deck :",
											style : "margin-left:120px",//width:150,
											colspan : 2
										},
												{
											xtype : "textfield",
											name : "code",
											width : 100,
												fieldStyle : "margin-right:50px",
										//	style : "    position: relative; float: left; right: 100px; "
										}, 
												
											{
											xtype : "textfield",
											name : "categeory",
											width : 300,
											//fieldStyle : "margin-right:50px",
											style : "position: relative; float: left; right: 100px;",
											colspan : 2
										}, {
											border : false,
											width : 0
										}, {}, {
											xtype : "label",
											text : "Position :",
											style : "    position: relative; float: left; right: 90px; "
										}, {
											xtype : "panel",
											width : 225,
											height : 120,
											layout : "form",
											style : "    position: relative; bottom:25px; padding:10px;",
											items : [{
													fieldLabel : "Valid Date From",
													xtype : "datefield",
													name : "fromDate",
													width : 80,
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
												}, {
													xtype : "datefield",
													name : "toDate",
													fieldLabel : "Valid Date To",
													width : 80,
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
												}, 
														/*{
													xtype : "combo",
													fieldLabel : "Status",
													excludeSubmit : true,
													name : "status",
													minChars : 1,
													enableKeyEvents : true,
													mode : "local",
													editable : false,
													width : 100,
													typeAhead : true,
													excludeFromSession : true,
													triggerAction : "all",
													forceSelection : true,
													selectOnFocus : true,
													displayField : "name",
													valueField : "dataURI",
													store : new Ext.data.SimpleStore({
														fields : ["dataURI", "name"],
														data : [["OK", "OK"], ["GTD", "GTD"], ["WL", "WL"], ["RQ", "RQ"], ["FS", "FS"], ["NA", "NA"], ["Sold", "Sold"]]
													})
												}
												*/
											]
										}, {
											xtype : "panel",
											width : 185,
											bodyStyle : "padding-left:25px;",
											height : 120,
											autoScroll : true,
											style : "    position: relative; bottom:25px;margin-left:10px; ",
											items : [{
													boxLabel : "Aft",
													xtype : "checkbox",
													name : "position1",
													inputValue : "Aft"
												}, {
													boxLabel : "Mid Ship",
													xtype : "checkbox",
													name : "position2",
													inputValue : "Mid Ship"
												}, {
													boxLabel : "Forward",
													xtype : "checkbox",
													name : "position3",
													inputValue : "Forward"
												}, {
													boxLabel : "Mid Ship/ Forward",
													xtype : "checkbox",
													name : "position6",
													inputValue : "Mid Ship/ Forward"
												}, {
													boxLabel : "Mid Ship/ Aft",
													xtype : "checkbox",
													name : "position7",
													inputValue : "Mid Ship/ Aft"
												}
											],
											listeners : {
												render : function () {
													this.body.setStyle("background", "white")
												}
											}
										}, {
											xtype : "panel",
											bodyStyle : "padding-left:15px;",
											autoScroll : true,
											width : 258,
											height : 170,
											style : "    position: relative; float: right; left: 20px;bottom:52px; ",
											items : [],
											listeners : {
												render : function () {
													this.body.setStyle("background", "white")
												}
											}
										}
									]
								}, {
									xtype : "panel",
									height : 50,
									border : false,
									style : "padding:5px;height:30px;",
									layout : "table",
									layoutConfig : {
										columns : 4
									},
									items : [{
											xtype : "button",
											style : "padding-left: 150px;padding-right: 50px;",
											text : "Update",
											hidden : true,
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0];
												var n = a.getStore();
												var c = this.ownerCt.ownerCt.findByType("textfield")[0];
												var b = this.ownerCt.ownerCt.findByType("textfield")[1];
											//	var g = this.ownerCt.ownerCt.findByType("combo")[0];
												var k = this.ownerCt.ownerCt.findByType("datefield")[0];
												var m = this.ownerCt.ownerCt.findByType("datefield")[1];
												var i = [],
												l = [],
												e = [];
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (o) {
													if (o.checked) {
														i.push(o.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (o) {
													if (o.checked) {
														e.push(o.getRawValue())
													}
												});
												var j = n.indexOf(a.getSelectionModel().getSelections()[0]);
												var f = "";
												if (a.getSelectionModel().getSelections()[0].data.dataURI != "undefined") {
													f = a.getSelectionModel().getSelections()[0].data.dataURI
												}
												a.getStore().remove(a.selModel.getSelected());
												var d = this.ownerCt.findParentByType("tabpanel").items;
												var h = [new n.recordType({
														category : b.getValue(),
														code : c.getValue(),
														deck : e.toString(),
														fromDate : k.getValue(),
														toDate : m.getValue(),
														position : i.toString(),
														//status : g.getRawValue(),
														locations : l.toString(),
														dataURI : !Ext.isEmpty(f) ? f : ""
													})];
												n.insert(j, h);
												c.reset();
												b.reset();
												//g.reset();
												k.reset();
												m.reset();
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (o) {
													o.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (o) {
													o.setValue(false)
												});
												this.ownerCt.findByType("button")[0].hide();
												this.ownerCt.findByType("button")[1].hide();
												this.ownerCt.findByType("button")[2].show()
											}
										}, {
											xtype : "button",
											style : "padding-left: 50px;padding-right: 50px;",
											text : "Cancel",
											hidden : true,
											handler : function () {
												this.ownerCt.findByType("button")[0].hide();
												this.ownerCt.findByType("button")[1].hide();
												this.ownerCt.findByType("button")[2].show();
												var a = this.ownerCt.ownerCt.findByType("grid")[0],
												b;
												a.store.removeAll();
												this.ownerCt.ownerCt.findByType("textfield")[0].reset();
												this.ownerCt.ownerCt.findByType("textfield")[1].reset();
												//this.ownerCt.ownerCt.findByType("combo")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[1].reset();
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (c) {
													c.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (c) {
													c.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().clearSelections()
											}
										}, {
											xtype : "button",
											text : "Add",
											id : "cdc",
											style : "padding-left: 150px;padding-right: 50px;",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0];
												var l = a.getStore();
												var c = this.ownerCt.ownerCt.findByType("textfield")[0];
												var b = this.ownerCt.ownerCt.findByType("textfield")[1];
											//	var f = this.ownerCt.ownerCt.findByType("combo")[0];
												var i = this.ownerCt.ownerCt.findByType("datefield")[0];
												var k = this.ownerCt.ownerCt.findByType("datefield")[1];
												var g = [],
												j = [],
												e = [];
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (m) {
													if (m.checked) {
														g.push(m.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (m) {
													if (m.checked) {
														e.push(m.getRawValue())
													}
												});
												var d = this.ownerCt.findParentByType("tabpanel").items;
												var h = [];
												if (d.itemAt(5).title == "Cabin Info") {
													d.itemAt(5).findByType("grid")[0].getStore().each(function (m) {
														h.push(m.data)
													})
												}
												l.add([new l.recordType({
															category : b.getValue(),
															code : c.getValue(),
															deck : e.toString(),
															fromDate : i.getValue(),
															toDate : k.getValue(),
															position : g.toString(),
														//	status : f.getRawValue(),
															locations : j.toString(),
															gridInfos : h
														})]);
												c.reset();
												b.reset();
											//	f.reset();
												i.reset();
												k.reset();
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (m) {
													m.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (m) {
													m.setValue(false)
												})
											}
										}, {
											xtype : "button",
											text : "Clear",
											style : "padding-left: 50px;padding-right: 50px;",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0],
												b;
												a.store.removeAll();
												this.ownerCt.ownerCt.findByType("textfield")[0].reset();
												this.ownerCt.ownerCt.findByType("textfield")[1].reset();
												//this.ownerCt.ownerCt.findByType("combo")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[1].reset();
												this.ownerCt.ownerCt.findByType("panel")[6].items.items.forEach(function (c) {
													c.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[7].items.items.forEach(function (c) {
													c.setValue(false)
												})
											}
										}
									]
								}
							],
							listeners : {
								render : function (d) {
									var c = d.findParentByType("awesomewindow").initialConfig.requiredData[0].dataURI;
									var b = d.findParentByType("tabpanel").items.itemAt(0).findByType("combo")[0].getValue();
									var a = this.findByType("grid")[0]
								}
							}
						}
					]
				}, {
					title : "Cabins",
					items : [{
							xtype : "panel",
							height : 460,
							layout : "table",
							frame : true,
							layoutConfig : {
								columns : 2
							},
							items : [{
									xtype : "panel",
									//style : "padding-left:5px;",
									border : true,
									height : 175,
									width : 710,
									layout : "table",
									layoutConfig : {
										columns : 1
									},
									colspan : 2,
									items : [{
											xtype : "grid",
											id : "dddd",
											alwaysUseCollection : true,
											autoExpandColumn : true,
											autoScroll : true,
											width : 700,
											height : 175,
											border : false,
											columns : [{
													header : "Category",
													dataIndex : "code",//"catName"
												}, {
													header : "Decks",
													dataIndex : "deck"
												}, {
													header : "Cabin/Range",
													dataIndex : "range"
												}, {
													header : "Position",
													dataIndex : "position"
												}, {
													header : "Berths",
													dataIndex : "berths"
												}, {
													header : "Dates",
													renderer : function (d, b, a) {
														function e(j) {
															var i = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
															var m = new Date(j),
															l = "" + (m.getMonth()),
															h = "" + m.getDate(),
															k = m.getFullYear().toString();
															if (l.length < 2) {
																l = l
															}
															if (h.length < 2) {
																h = "0" + h
															}
															return [h, i[l], Number(k.slice(k.length - 2, k.length))].join("")
														}
														var f,
														c,
														g;
														if (Ext.isEmpty(a.get("toDate")) && Ext.isEmpty(a.get("fromDate"))) {
															return ""
														} else {
															return e(a.get("fromDate")) + "-" + e(a.get("toDate"))
														}
													}
												}, 
													{
													header : "Status",
													dataIndex : "cabinStatus"
												},
													{
													header : "",
													width : 40,
													dataIndex : "action",
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button>  <input type="image" id = "editCell" src="images/grid/edit.png"> </button>'
													}
												}, {
													header : "",
													dataIndex : "action",
													width : 40,
													iconCls : "remove",
													renderer : function (c, b, a) {
														return '<button style="width:30px; padding-right:10px;"> <input type="image" id="remove" src="images/grid/remove.png"></button>'
													}
												}
											],
											viewConfig : {
												forceFit : true
											},
											store : new Ext.data.JsonStore({
												url : "",
												id : "dataURI",
												fields : ["catName", "cabinNumber", "cabinTypeText", "deck", "fromToDates", "locations", "position", "berths", "code",
													"dataURI", "totals", "cabinStatus", "range", "fromDate", "toDate", "shipInfoImage", "cabinInfoGridData",
													"graphicImgPath", "floorGraphicImgPath", "cabinInfo", "parameters", "toText", "fromText"]
											}),
											sm : new Ext.grid.RowSelectionModel(),
											listeners : {
												cellclick : function (i, j, g, f) {
													if (g == 8) {
														var b;
														while (b = i.selModel.getSelected()) {
															i.store.remove(b)
														}
														this.ownerCt.ownerCt.findByType("combo")[0].reset();
														this.ownerCt.ownerCt.findByType("combo")[1].reset();
														this.ownerCt.ownerCt.findByType("textfield")[1].reset();
														this.ownerCt.ownerCt.findByType("textfield")[2].reset();
														this.ownerCt.ownerCt.findByType("textfield")[3].reset();
														this.ownerCt.ownerCt.findByType("datefield")[0].reset();
														this.ownerCt.ownerCt.findByType("datefield")[1].reset();
														if (this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().getSelections() != "undefined") {
															var a = this.ownerCt.ownerCt.findByType("panel")[14].items.items;
															var h = this.ownerCt.ownerCt.findByType("panel")[16].items.items;
															a.forEach(function (e) {
																e.setValue(false)
															});
															h.forEach(function (e) {
																e.setValue(false)
															})
														}
													}
													if (g == 7) {
														rangeData = i.getSelectionModel().getSelections()[0].data.range;
														if (Ext.isEmpty(i.getSelectionModel().getSelections()[0].data.fromDate)) {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue()
														} else {
															this.ownerCt.ownerCt.findByType("datefield")[0].setValue(new Date(i.getSelectionModel().getSelections()[0].data.fromDate))
														}
														if (Ext.isEmpty(i.getSelectionModel().getSelections()[0].data.toDate)) {
															this.ownerCt.ownerCt.findByType("datefield")[1].setValue()
														} else {
															this.ownerCt.ownerCt.findByType("datefield")[1].setValue(new Date(i.getSelectionModel().getSelections()[0].data.toDate))
														}
														if (rangeData.range != "undefined") {
															this.ownerCt.ownerCt.findByType("textfield")[2].setValue(rangeData.substring(0, 1));
															this.ownerCt.ownerCt.findByType("textfield")[3].setValue(parseInt(rangeData.substring(1, rangeData.length)))
														}
														this.ownerCt.ownerCt.findByType("combo")[1].setValue(i.getSelectionModel().getSelections()[0].data.berths);
														//this.ownerCt.ownerCt.findByType("combo")[0].setValue(i.getSelectionModel().getSelections()[0].data.catName);
														this.ownerCt.ownerCt.findByType("combo")[0].setValue(i.getSelectionModel().getSelections()[0].data.code);
														this.ownerCt.ownerCt.findByType("textfield")[1].setValue(i.getSelectionModel().getSelections()[0].data.catName);
														//this.ownerCt.ownerCt.findByType("combo")[1].setValue(i.getSelectionModel().getSelections()[0].data.catName);
														this.ownerCt.ownerCt.findByType("combo")[2].setValue(i.getSelectionModel().getSelections()[0].data.cabinStatus);
														var c = this.ownerCt.findParentByType("tabpanel").items;
														var d = "";
														if (!Ext.isEmpty(i.getSelectionModel().getSelections()[0].data.parameters)) {
															d = Ext.util.JSON.decode(i.getSelectionModel().getSelections()[0].data.parameters)
														}
														this.ownerCt.ownerCt.findByType("button")[0].config.cabinImage = "";
														this.ownerCt.ownerCt.findByType("button")[0].config.floorImage = "";
														this.ownerCt.ownerCt.findByType("button")[0].config.cabingrid = "";
														this.ownerCt.ownerCt.findByType("button")[0].config.cabinImage = "../" + i.getSelectionModel().getSelections()[0].data.graphicImgPath;
														this.ownerCt.ownerCt.findByType("button")[0].config.floorImage = "../" + i.getSelectionModel().getSelections()[0].data.floorGraphicImgPath;
														this.ownerCt.ownerCt.findByType("button")[0].config.cabingrid = d;
														var a = i.ownerCt.ownerCt.findByType("panel")[18].items.items;
														var h = i.ownerCt.ownerCt.findByType("panel")[20].items.items;
														a.forEach(function (e) {
															e.setValue(false)
														});
														h.forEach(function (e) {
															e.setValue(false)
														});
														i.getSelectionModel().getSelections()[0].data.position.split(",").forEach(function (e) {
															a.forEach(function (k) {
																if (e == k.boxLabel) {
																	k.setValue(true)
																}
															})
														});
														i.getSelectionModel().getSelections()[0].data.deck.split(",").forEach(function (e) {
															h.forEach(function (k) {
																if (e == k.inputValue) {
																	k.setValue(true)
																}
															})
														});
														i.ownerCt.ownerCt.findByType("button")[1].show();
														i.ownerCt.ownerCt.findByType("button")[2].show();
														i.ownerCt.ownerCt.findByType("button")[3].hide()
													}
												}
											}
										}
									]
								}, 
										
									
									//----------------------
									{
									xtype : "panel",
									height : 250,
									width : 500,
									style : "padding:5px;",
									layout : "table",
									border : false,
									layoutConfig : {
										columns : 1
									},
									items : [
											
										{
											xtype : "panel",
											style : "padding-top:5px;",
											layout : "table",
												height:50,
											border : true,
											layoutConfig : {
												columns : 2
											},
											items : [
													
											/*	{
													xtype : "label",
													text : "Cabin/Range :",
													width : 270
												}, 
														*/

														{
											xtype : "label",
											text : "Category :",
												style : "margin-left:25px",width:100
											//style : "margin-left:150px"
										}, 
											{
											xtype : "label",
											text : "Category Description :",width:150,
											style : "margin-left:50px"
											//style : "margin-left:50px"
										}, 
											
										
									/**	{
											xtype : "label",
											text : "Deck :",
											style : "margin-left:120px",//width:150,
											colspan : 2
										},*/
										/*		{
											xtype : "textfield",
											name : "code",
											width : 100,
												fieldStyle : "margin-right:50px",
										//	style : "    position: relative; float: left; right: 100px; "
										}, */
												
										/*	{
											xtype : "textfield",
											name : "categeory",
											width : 120,
											//fieldStyle : "margin-right:50px",
											//style : "    position: relative; float: left; right: 100px; ",
											//colspan : 2
										},*/

										{
											xtype : "combo",
											name : "categeory",
											width : 120,
												id:'cat5',
											//colspan : 4,
											excludeSubmit : true,
											minChars : 1,
											enableKeyEvents : true,
											mode : "local",
											typeAhead : true,
											excludeFromSession : true,
											triggerAction : "all",
											forceSelection : true,
											selectOnFocus : true,
											displayField : "code",
											valueField : "code",
											store : new Ext.data.Store({
												fields : ["code", "category"]
											}),
											listeners : {
												beforequery : function (b, c) {
													var a = this.findParentByType("tabpanel").items.itemAt(3).findByType("grid")[0].getStore().data;
													console.log(a);
													b.combo.store.removeAll();
													var d = "";
													a.each(function (e) {
														d = ({
															code : e.get("code"),
																category:e.get("category")
														});
															console.log(d);
														b.combo.store.add(new Ext.data.Record(d))
													})
												},
															select : function (g, b) {
															console.log(b.get('category'));
															this.ownerCt.findByType('textfield')[1].setValue(b.get('category'));



														}
											}
										},
											{
											xtype : "textfield",
											name : "categeory",
											width : 320,
												readOnly:true,
											style : "margin-left:40px",
											//style : "  margin-right:50px  ",
											//colspan : 2
										},
														]
											},
											
									/*	{
											xtype : "label",
											text : "Category Description :",
											style : "margin-left:75px"
										}, {
											border : false
										}, {
											xtype : "combo",
											name : "categeory",
											width : 462,
											colspan : 4,
											excludeSubmit : true,
											minChars : 1,
											enableKeyEvents : true,
											mode : "local",
											typeAhead : true,
											excludeFromSession : true,
											triggerAction : "all",
											forceSelection : true,
											selectOnFocus : true,
											displayField : "categeory",
											valueField : "categeory",
											store : new Ext.data.Store({
												fields : ["categeory", "categeory"]
											}),
											listeners : {
												beforequery : function (b, c) {
													var a = this.findParentByType("tabpanel").items.itemAt(3).findByType("grid")[0].getStore().data;
													b.combo.store.removeAll();
													var d = "";
													a.each(function (e) {
														d = ({
															categeory : e.get("category")
														});
														b.combo.store.add(new Ext.data.Record(d))
													})
												}
											}
										},
											*/

										/*	{
											xtype : "panel",
											style : "padding-top:5px;",
											layout : "table",
											border : false,
											layoutConfig : {
												columns : 8
											},
											items : [{
													xtype : "label",
													text : "Cabin/Range :",
													width : 270
												}, 
														]
											},
														*/
											
										
										
										{
											xtype : "panel",
											style : "padding-top:5px;",
											layout : "table",
											border : false,
											layoutConfig : {
												columns : 8
											},
											items : [{
													xtype : "label",
													text : "Cabin/Range :",
													width : 270
												}, {
													xtype : "textfield",
													name : "fromText",
													width : 20,
													maxLength : 1,
													enforceMaxLength : true,
													maskRe : /[A-Z]/,
													enableKeyEvents : true,
													listeners : {
														keyup : function () {
															this.ownerCt.findByType("textfield")[2].setValue(this.getValue())
														}
													}
												}, {
													xtype : "numberfield",
													name : "from",
													fieldLabel : "Cabin",
													width : 80,
													allowBlank : false,
													maxLength : 4,
													enforceMaxLength : true,
													maskRe : /[0-9]/
												}, {
													xtype : "label",
													text : "To :",
													style : "padding-right:15px;padding-left:15px;"
												}, {
													xtype : "textfield",
													name : "toText",
													readOnly : true,
													width : 20,
													listeners : {
														render : function () {}

													}
												}, {
													xtype : "numberfield",
													name : "to",
													enableKeyEvents : true,
													width : 80,
													maxLength : 4,
													listeners : {
														keyup : function () {}

													}
												}, {
													xtype : "label",
													text : "Berths :",
													style : "padding-right:15px;padding-left:15px;"
												}, {
													xtype : "combo",
													name : "total",
													width : 60,
													store : [1, 2, 3, 4, 5, 6, 7, 8],
													triggerAction : "all",
													readOnly : true
												}, {
													height : 5,
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													border : false
												}, {
													xtype : "label",
													text : "Validity Dates From :",
													width : 270,
													style : "position: relative; margin-top:15px"
												}, {}, {
													xtype : "datefield",
													name : "fromDate",
													width : 80,
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
												}, {
													xtype : "label",
													text : "To :",
													style : "padding-right:15px;padding-left:15px;"
												}, {}, {
													xtype : "datefield",
													name : "toDate",
													width : 80,
													format : "dMy",
													enableKeyEvents : true,
													showToday : false,
													minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime(),
													listeners : {
														change : function (b, d, a) {
															var e = this.ownerCt.findByType("datefield")[0].getValue();
															var c = this.getValue()
														}
													}
												}
											]
										}, {
											xtype : "panel",
											height : 210,
											width : 700,
											style : "padding-left:20px;padding-top:5px;",
											layout : "table",
											border : false,
											layoutConfig : {
												columns : 2
											},
											defaults : {
												style : "margin:10px;"
											},
											items : [{
													border : false,
													text : "Cabins info :"
												}, {
													xtype : "label",
													text : "Position :",
													style : "margin-left:75px"
												}, {
													xtype : "panel",
													bodyStyle : "padding-left:15px;",
													width : 185,
													height : 120,
													autoScroll : true,
													style : "    position: relative; margin-left:20px; ",
													items : [{
															xtype : "button",
															text : "Cabin Info",
															style : "margin-top:50px",
															config : {
																cabinImage : "",
																floorImage : "",
																cabingrid : ""
															},
															handler : function (a) {
																new Ext.Window({
																	height : 540,
																	width : 550,
																	closable : true,
																	border : false,
																	layout : "fit",
																	modal : true,
																	items : [{
																			xtype : "form",
																			border : false,
																			width : 550,
																			items : [{
																					xtype : "tabpanel",
																					activeTab : 0,
																					layoutOnTabChange : true,
																					height : 500,
																					defaults : {
																						bodyStyle : "padding: 6px 4px 6px 4px;"
																					},
																					items : [{
																							title : "Cabin Info",
																							autoScroll : true,
																							items : [{
																									xtype : "panel",
																									height : 450,
																									frame : true,
																									layout : "column",
																									items : [{
																											xtype : "panel",
																											border : false,
																											layout : "table",
																											layoutConfig : {
																												columns : 3
																											},
																											items : [{
																													html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="cabinfileUpLoad" id="cabinfileUpLoads"type="file"  /></td></form>',
																													width : 250,
																													style : "padding: 5px 30px 0px 25px; "
																												}, {
																													xtype : "button",
																													text : "Upload",
																													style : "padding: 0px 30px 0px 15px;",
																													handler : function (c) { ;
																														Ext.getCmp("cabinPanel").html = '<img border="0" id="cabinImageIds" name="cabinImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
																														var j = a.ownerCt.findParentByType("awesomewindow");
																														var b = j.aw.postDataURI;
																														var i = document.getElementById("cabinfileUpLoads").value;
																														var e = document.getElementById("cabinfileUpLoads").files[0];
																														if (e) {
																															var f = 0;
																															k()
																														}
																														function k() {
																															var m = new FormData();
																															m.append("image", e);
																															var n = new XMLHttpRequest();
																															n.upload.addEventListener("progress", g, false);
																															n.addEventListener("load", h, false);
																															n.addEventListener("error", d, false);
																															n.addEventListener("abort", l, false);
																															n.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''&imageStorePath=" + b);
																															n.send(m);
																															n.onreadystatechange = function () {
																																if (n.readyState == 4) {
																																	var q = n.getAllResponseHeaders();
																																	var r = n.responseText;
																																	var p = b;
																																	var o = "GraphicsImg/" + r;
																																	document.getElementById("cabinName").value = o;
																																	Ext.getCmp("gip").setValue(o);
																																	document.images.cabinImage.src = "../" + o;
																																	document.getElementById("cabinName").value = o
																																}
																															}
																														}
																														function g(m) {}

																														function h(m) {}

																														function d(m) {
																															Ext.Msg.alert("", "There was an error attempting to upload the file.")
																														}
																														function l(m) {
																															Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
																														}
																													}
																												}, {
																													xtype : "button",
																													text : "Delete",
																													style : 'border="0";',
																													handler : function (e) { ;
																														document.images.cabinImage.src = "";
																														Ext.getCmp("cabinPanel").html = '<img border="0" id="imageId" name="cabinImage" src="" ><input type="hidden" id ="imgName"  name="imgName" value="">';
																														var d = this.ownerCt.findParentByType("awesomewindow");
																														var b = d.aw.sourceDataURI;
																														var c = document.getElementById("imgName").value;
																														if (c) {
																															var f = {};
																															if (c) {
																																f.removefile = c
																															}
																															if (c) {
																																f.imageStorePath = b
																															}
																															f.imageName = Ext.getCmp("gip").getValue();
																															Ext.Ajax.request({
																																url : TDS.env.dataPath + "fileUpload",
																																method : "POST",
																																params : f,
																																callback : function (j, h, i) {
																																	if (h) {
																																		Ext.Msg.alert("", "Deleted succussefully.");
																																		document.images.image1.src = "";
																																		document.getElementById("imgName").value = "";
																																		document.getElementById("fileUpLoads").value = "";
																																		var g = {
																																			deletePath : true,
																																			imagePath : document.getElementById("imgName").value
																																		};
																																		Ext.Ajax.request({
																																			url : TDS.env.dataPath + b + "/graphicImage",
																																			method : "POST",
																																			jsonData : g,
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
																											xtype : "panel",
																											border : false,
																											height : 200,
																											style : "padding:5px;",
																											items : [{
																													html : "cabinImage",
																													id : "cabinPanel",
																													autoScroll : true,
																													border : false,
																													style : "padding: 2px; 0px; 0px; 0px;",
																													height : 190,
																													width : 400,
																													listeners : {
																														render : function () { ;
																															this.body.setStyle("background", "white");
																															var c = "";
																															var e = a.ownerCt.ownerCt.findParentByType("awesomewindow");
																															var d = a.config.cabinImage;
																															if (typeof d == "undefined") {
																																d = ""
																															}
																															var b = d.substring(0, 4);
																															if (Ext.isEmpty(b)) {
																																this.html = '<center><img border="0" max-width="100%"   width=350px;height:75px; id="cabinImageIds" name="cabinImage"   alt="Cabin Images"></center><input type="hidden" id ="cabinName"  name="cabinName" value=' + d + ">"
																															} else {
																																c = "../" + d;
																																this.html = '<center><img border="0" max-width="100%"    width=350px;height:75px;  id="cabinImageIds" name="cabinImage" src=' + c + '  alt="Cabin Image" ></center><input type="hidden" id ="cabinName"  name="cabinName" value=' + c + ">"
																															}
																														}
																													}
																												}, {
																													xtype : "textfield",
																													id : "gip",
																													hidden : true,
																													name : "graphicImgPath",
																													style : "padding: 25px; 5px; 25px; 25px;"
																												}
																											]
																										}, {
																											xtype : "editorgrid",
																											width : 410,
																											height : 200,
																											style : "padding:5px;",
																											tbar : [" ", {
																													xtype : "combo",
																													excludeSubmit : true,
																													minChars : 1,
																													enableKeyEvents : true,
																													mode : "local",
																													width : 160,
																													typeAhead : true,
																													excludeFromSession : true,
																													triggerAction : "all",
																													forceSelection : true,
																													selectOnFocus : true,
																													displayField : "text",
																													valueField : "text",
																													store : TDS.data.cruiseInfoDropDown
																												}, " &nbsp;&nbsp;&nbsp;&nbsp;", {
																													xtype : "textfield",
																													width : 80
																												}, "&nbsp;&nbsp;&nbsp;&nbsp;", "-", {
																													xtype : "button",
																													text : "Save",
																													handler : function () {
																														var h = this.ownerCt.ownerCt;
																														var f = h.getStore();
																														var c = this.ownerCt.items;
																														var b = f.data.items;
																														var e = true;
																														for (var d = 0; d < b.length; d++) {
																															if (b[d].data.name == c.itemAt(1).getValue()) {
																																e = false
																															}
																														}
																														if (e) {
																															f.add([new f.recordType({
																																		name : c.itemAt(1).getValue(),
																																		value : c.itemAt(3).getValue()
																																	})])
																														}
																													}
																												}, "-", {
																													xtype : "button",
																													text : "Delete",
																													handler : function () {
																														var c = this.ownerCt.ownerCt;
																														var b;
																														while (b = c.selModel.getSelected()) {
																															c.store.remove(b)
																														}
																													}
																												}
																											],
																											height : 220,
																											getData : function () {
																												var c = this.getStore().data;
																												for (var b = 0, e = []; b < c.length; b++) {
																													e.push(c.items[b].data)
																												}
																												return {
																													cabinInfo : e
																												}
																											},
																											enableRowExpander : false,
																											clicksToEdit : 1,
																											store : new Ext.data.JsonStore({
																												url : "",
																												id : "dataURI",
																												fields : ["name", "value"]
																											}),
																											hideHeaders : true,
																											sm : new Ext.grid.RowSelectionModel(),
																											cm : new Ext.grid.ColumnModel([{
																														header : "Name",
																														dataIndex : "name",
																														width : 200,
																														fixed : true,
																														sortable : true
																													}, {
																														header : "Value",
																														dataIndex : "value",
																														width : 200,
																														fixed : true,
																														sortable : true
																													}
																												]),
																											id : "cruise",
																											viewConfig : {
																												forceFit : true
																											},
																											listeners : {
																												render : function () {
																													var b = a.config.cabingrid;
																													if (typeof b != "undefined") {
																														var c = Ext.util.JSON.decode(b.cabinInfo);
																														var d = c;
																														if (typeof d == "undefined") {
																															d = []
																														}
																														if (typeof d != "undefined") {
																															this.getStore().loadData(d)
																														}
																													}
																												}
																											}
																										}
																									]
																								}
																							],
																							listeners : {
																								render : function () {},
																								afterlayout : function () {}

																							}
																						}, {
																							title : "Floor Plan",
																							items : [{
																									xtype : "panel",
																									height : 450,
																									frame : true,
																									items : [{
																											border : false,
																											xtype : "panel",
																											border : false,
																											layout : "table",
																											column : 3,
																											items : [{
																													html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="floorfileUpLoads"type="file"  /></td></form>',
																													width : 250,
																													style : "padding: 0px 30px 0px 25px; "
																												}, {
																													xtype : "button",
																													text : "Upload",
																													style : "padding: 0px 30px 0px 15px;",
																													handler : function (c) { ;
																														Ext.getCmp("floorPanel").html = '<img border="0" id="floorImageId" name="floorImageName" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
																														var j = a.ownerCt.findParentByType("awesomewindow");
																														var b = j.aw.postDataURI;
																														var i = document.getElementById("floorfileUpLoads").value;
																														var e = document.getElementById("floorfileUpLoads").files[0];
																														if (e) {
																															var f = 0;
																															k()
																														}
																														function k() {
																															var m = new FormData();
																															m.append("image", e);
																															var n = new XMLHttpRequest();
																															n.upload.addEventListener("progress", g, false);
																															n.addEventListener("load", h, false);
																															n.addEventListener("error", d, false);
																															n.addEventListener("abort", l, false);
																															n.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp("floorPlanId").getValue() + "&imageStorePath=" + b);
																															n.send(m);
																															n.onreadystatechange = function () {
																																if (n.readyState == 4) {
																																	var q = n.getAllResponseHeaders();
																																	var r = n.responseText;
																																	var p = b;
																																	var o = "GraphicsImg/" + r;
																																	document.getElementById("imageName").value = o;
																																	Ext.getCmp("floorPlanId").setValue(o);
																																	document.images.floorImageName.src = "../" + o;
																																	document.getElementById("imageName").value = o
																																}
																															}
																														}
																														function g(m) {}

																														function h(m) {}

																														function d(m) {
																															Ext.Msg.alert("", "There was an error attempting to upload the file.")
																														}
																														function l(m) {
																															Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.")
																														}
																													}
																												}, {
																													xtype : "button",
																													text : "Delete",
																													style : 'border="0";',
																													handler : function (b) {
																														document.images.floorImageName.src = "";
																														document.getElementById("floorfileUpLoads").value = "";
																														Ext.getCmp("floorPlanId").setValue()
																													}
																												}
																											]
																										}, {
																											html : "floorImage",
																											id : "floorPanel",
																											border : false,
																											style : "padding: 5px; 0px; 0px; 0px;",
																											height : 350,
																											width : 300,
																											autoScroll : true,
																											listeners : {
																												render : function () { ;
																													this.body.setStyle("background", "white");
																													var c = "";
																													var e = a.ownerCt.ownerCt.findParentByType("awesomewindow");
																													var d = a.config.floorImage;
																													if (typeof d == "undefined") {
																														d = ""
																													}
																													var b = d.substring(0, 4);
																													if (b == "http") {
																														this.html = '<center><img border="0"   id="floorImageId" name="floorImageName"  src=' + d + ' alt="Floor Image" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + d + ">"
																													} else {
																														c = "../" + d;
																														this.html = '<center><img border="0" id="floorImageId" name="floorImageName"  src=' + c + ' alt="Floor Image" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + c + ">"
																													}
																												}
																											}
																										}, {
																											xtype : "textfield",
																											id : "floorPlanId",
																											hidden : true,
																											name : "floorGraphicImgPath",
																											style : "padding: 25px; 5px; 25px; 25px;"
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
																	buttons : [{
																			text : "Submit",
																			handler : function () {
																				a.config.cabinImage = Ext.getCmp("gip").getValue();
																				a.config.floorImage = Ext.getCmp("floorPlanId").getValue();
																				var b = [];
																				this.ownerCt.items.itemAt(0).findByType("grid")[0].getStore().each(function (c) {
																					b.push(c.data)
																				});
																				a.config.cabingrid = b;
																				this.ownerCt.close()
																			}
																		}, {
																			text : "Close",
																			handler : function () {
																				a.config.cabinImage = "";
																				a.config.floorImage = "";
																				a.config.cabingrid = "";
																				this.ownerCt.close()
																			}
																		}
																	]
																}).show()
															}
														}
													],
													listeners : {
														render : function () {}

													}
												}, {
													xtype : "panel",
													width : 185,
													frame : false,
													bodyBorder : false,
													hideBorders : true,
													bodyStyle : "padding-left:15px;",
													height : 120,
													style : "    position: relative;  margin-left:10px; ",
													items : [{
															boxLabel : "Aft",
															xtype : "checkbox",
															inputValue : "Aft"
														}, {
															boxLabel : "Mid Ship",
															xtype : "checkbox",
															inputValue : "Mid Ship"
														}, {
															boxLabel : "Forward",
															xtype : "checkbox",
															inputValue : "Forward"
														}, {
															boxLabel : "Mid Ship/ Forward",
															xtype : "checkbox",
															inputValue : "Mid Ship/ Forward"
														}, {
															boxLabel : "Mid Ship/ Aft",
															xtype : "checkbox",
															inputValue : "Mid Ship/ Aft"
														}
													],
													listeners : {
														render : function () {
															this.body.setStyle("background", "white")
														}
													}
												}
											]
										}
									]
								},
										//--------------------
										
									
									{
									xtype : "panel",
									height : 250,
									width : 220,
									style : "padding-top:5px;",
									layout : "table",
									border : false,
									layoutConfig : {
										columns : 1
									},
									items : [{
											xtype : "label",
											text : "Decks :",
											style : "padding-left:75px;margin-top:5px;"
										}, {
											xtype : "panel",
											autoScroll : true,
											bodyStyle : "padding-left:15px;",
											width : 185,
											height : 120,
											style : "    position: relative; margin-left:5px; ",
											name : "column",
											items : [],
											listeners : {
												render : function () {
													this.body.setStyle("background", "white")
												},
												check : function (b, a) {
													if (a) {}

												}
											}
										}, {
											xtype : "panel",
											layout : "column",
											border : false,
											style : "padding-top: 25px;",
											items : [{
													xtype : "label",
													text : "Status :",
													width : 75,
													style : "padding-left: 25px;"
												}, {
													xtype : "combo",
													excludeSubmit : true,
													name : "status",
													minChars : 1,
													enableKeyEvents : true,
													mode : "local",
													editable : false,
													width : 100,
													typeAhead : true,
													excludeFromSession : true,
													triggerAction : "all",
													forceSelection : true,
													selectOnFocus : true,
													displayField : "name",
													valueField : "dataURI",
														value:'AV',
													store : new Ext.data.SimpleStore({
														fields : ["dataURI", "name"],
														//data : [["OK", "OK"], ["GTD", "GTD"], ["WL", "WL"], ["RQ", "RQ"], ["FS", "FS"], ["NA", "NA"], ["Sold", "Sold"]]
														data : [["AV", "AV"], ["NA", "NA"]]
													})
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
										columns : 4
									},
									items : [{
											xtype : "button",
											text : "Update",
											hidden : true,id:'update',
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0];
												var o = a.getStore();
												//var p = this.ownerCt.ownerCt.findByType("combo")[0];
												var p = this.ownerCt.ownerCt.findByType("textfield")[0];
												var p1 = this.ownerCt.ownerCt.findByType("textfield")[1];
												console.log(p);
												console.log(p.getValue());
												var z = this.ownerCt.ownerCt.findByType("textfield")[3];
												var r = this.ownerCt.ownerCt.findByType("datefield")[0];
												var j = this.ownerCt.ownerCt.findByType("datefield")[1];
												function m(B) {
													var A = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
													var E = new Date(B),
													D = "" + (E.getMonth()),
													s = "" + E.getDate(),
													C = E.getFullYear().toString();
													return [s, A[D], Number(C.slice(C.length - 2, C.length))].join("")
												}
												var u;
												if (!Ext.isEmpty(r.getValue()) && !Ext.isEmpty(j.getValue())) {
													u = m(r.getValue()) + " - " + m(j.getValue())
												}
												var i = this.ownerCt.ownerCt.findByType("combo")[1].getValue();
												var q = this.ownerCt.ownerCt.findByType("combo")[2];
												var b = this.ownerCt.ownerCt.findByType("numberfield")[0];
												var n = this.ownerCt.ownerCt.findByType("numberfield")[1];
												/*var x = this.ownerCt.ownerCt.findByType("textfield")[1];
												var k = this.ownerCt.ownerCt.findByType("textfield")[3];*/

												var x = this.ownerCt.ownerCt.findByType("textfield")[2];
												var k = this.ownerCt.ownerCt.findByType("textfield")[4];

												var t = false,
												g = false,
												y = 0;
												y = n.getValue() - b.getValue();
												var w = [],
												v = [],
												l = [];
												this.ownerCt.ownerCt.findByType("panel")[18].items.items.forEach(function (s) {
													if (s.checked) {
														w.push(s.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[20].items.items.forEach(function (s) {
													if (s.checked) {
														l.push(s.getRawValue())
													}
												});
												var a = this.findParentByType("tabpanel").findByType("grid")[3];
												var f = o.indexOf(a.getSelectionModel().getSelections()[0]);
												var e = "";
												if (a.getSelectionModel().getSelections()[0].data.dataURI != "undefined") {
													e = a.getSelectionModel().getSelections()[0].data.dataURI
												}
												a.getStore().remove(a.selModel.getSelected());
												var h = this.ownerCt.ownerCt.findByType("panel")[17].findByType("button")[0].config;
												var d = b.getValue();
												var c = [new o.recordType({
														//catName : p.getRawValue(),
															code : p.getValue(),
														fromDate : r.getValue(),
														toDate : j.getValue(),
														deck : l.toString(),
														locations : v.toString(),
														position : w.toString(),
														cabinStatus : q.getRawValue(),
														range : x.getValue() != "" ? x.getValue() + d : d,
														berths : i,
														graphicImgPath : h.cabinImage,
														cabinInfo : {
															cabinInfo : h.cabingrid
														},
														floorGraphicImgPath : h.floorImage,
														dataURI : !Ext.isEmpty(e) ? e : ""
													})];
												o.insert(f, c);
												p.reset();
												p1.reset();
												b.reset();
												n.reset();
												q.reset();
												r.reset();
												j.reset();
												this.ownerCt.ownerCt.findByType("combo")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[2].reset();
												this.ownerCt.ownerCt.findByType("textfield")[3].reset();
												this.ownerCt.ownerCt.findByType("panel")[18].items.items.forEach(function (s) {
													s.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[20].items.items.forEach(function (s) {
													s.setValue(false)
												});
												this.ownerCt.findByType("button")[1].hide();
												this.ownerCt.findByType("button")[2].hide();
												this.ownerCt.findByType("button")[3].show()
											}
										}, {
											xtype : "button",
											text : "Cancel",
											style : "padding-left: 50px;padding-right: 50px;",
											hidden : true,
											handler : function () {
												this.ownerCt.findByType("button")[0].hide();
												this.ownerCt.findByType("button")[1].hide();
												this.ownerCt.findByType("button")[2].show();
												this.ownerCt.ownerCt.findByType("combo")[0].reset();
												this.ownerCt.ownerCt.findByType("combo")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[2].reset();
												this.ownerCt.ownerCt.findByType("textfield")[3].reset();
												this.ownerCt.ownerCt.findByType("datefield")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[1].reset();
												if (this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().getSelections() != "undefined") {
													var a = this.ownerCt.ownerCt.findByType("panel")[14].items.items;
													var b = this.ownerCt.ownerCt.findByType("panel")[17].items.items;
													a.forEach(function (c) {
														c.setValue(false)
													});
													b.forEach(function (c) {
														c.setValue(false)
													})
												}
												this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().clearSelections()
											}
										}, {
											xtype : "button",
											text : "Add",id:'add',
											style : "padding-left: 50px;padding-right: 50px;",
											handler : function () {
												var a = this.ownerCt.ownerCt.findByType("grid")[0];
												var p = a.getStore();
											/*	var r = this.ownerCt.ownerCt.findByType("combo")[0];
												var F = this.ownerCt.ownerCt.findByType("combo")[1];

												*/

												var r = this.ownerCt.ownerCt.findByType("combo")[0];
												var F = this.ownerCt.ownerCt.findByType("combo")[1];


												var v = this.ownerCt.ownerCt.findByType("datefield")[0];
												var j = this.ownerCt.ownerCt.findByType("datefield")[1];
												function n(G) {
													var s = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
													var J = new Date(G),
													I = "" + (J.getMonth()),
													i = "" + J.getDate(),
													H = J.getFullYear().toString();
													return [i, s[I], Number(H.slice(H.length - 2, H.length))].join("")
												}
												var y;
												var q,
												d;
												y = n(v.getValue()) + " - " + n(j.getValue());
												var b = this.ownerCt.ownerCt.findByType("numberfield")[0];
												var o = this.ownerCt.ownerCt.findByType("numberfield")[1];
											/*	var D = this.ownerCt.ownerCt.findByType("textfield")[1];
												var k = this.ownerCt.ownerCt.findByType("textfield")[3];*/
												var D = this.ownerCt.ownerCt.findByType("textfield")[2];
												var k = this.ownerCt.ownerCt.findByType("textfield")[4];
												var x = false,
											//		var D1 = this.ownerCt.ownerCt.findByType("textfield")[1];
												//var k = this.ownerCt.ownerCt.findByType("textfield")[4];


												f = false,
												E = 0;
												E = o.getValue() - b.getValue();
												var h = this.ownerCt.ownerCt.findByType("combo")[1].getValue();
												var u = this.ownerCt.ownerCt.findByType("combo")[2];
												var C = [],
												A = [],
												m = [];
												this.ownerCt.ownerCt.findByType("panel")[18].items.items.forEach(function (i) {
													if (i.checked) {
														C.push(i.getRawValue())
													}
												});
												this.ownerCt.ownerCt.findByType("panel")[20].items.items.forEach(function (i) {
													if (i.checked) {
														m.push(i.getRawValue())
													}
												});
												var a = this.findParentByType("tabpanel").findByType("grid")[3];
												var B = [];
												this.findParentByType("tabpanel").findByType("grid")[3].getStore().each(function (i) {
													B.push(i.data)
												});
												var l = this.ownerCt.findParentByType("tabpanel").items;
												var t = [],
												z = "",
												e = "";
												var g = this.ownerCt.ownerCt.findByType("panel")[17].findByType("button")[0].config;
												for (var w = 0; w <= E; w++) {
													var c = b.getValue() + w;
													p.add([new p.recordType({
																//catName : r.getRawValue(),
																	code : r.getValue(),
																fromDate : v.getValue(),
																toDate : j.getValue(),
																deck : m.toString(),
																locations : A.toString(),
																position : C.toString(),
																cabinStatus : u.getRawValue(),
																range : D.getValue() != "" ? D.getValue() + c : c,
																berths : h,
																graphicImgPath : g.cabinImage,
																cabinInfo : {
																	cabinInfo : g.cabingrid
																},
																floorGraphicImgPath : g.floorImage
															})])
												}
												r.reset();
												b.reset();
												o.reset();
												u.reset();
												v.reset();
												j.reset();
												//D1.reset();
												this.ownerCt.ownerCt.findByType("textfield")[3].reset();
												this.ownerCt.ownerCt.findByType("combo")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[1].reset();
												this.ownerCt.ownerCt.findByType("panel")[18].items.items.forEach(function (i) {
													i.setValue(false)
												});
												this.ownerCt.ownerCt.findByType("panel")[20].items.items.forEach(function (i) {
													i.setValue(false)
												})
											}
										}, {
											xtype : "button",
											text : "Clear",
											style : "padding-left: 50px;padding-right: 50px;",
											handler : function () {
												this.ownerCt.ownerCt.findByType("combo")[0].reset();
												this.ownerCt.ownerCt.findByType("combo")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[1].reset();
												this.ownerCt.ownerCt.findByType("textfield")[2].reset();
												this.ownerCt.ownerCt.findByType("textfield")[3].reset();
												this.ownerCt.ownerCt.findByType("datefield")[0].reset();
												this.ownerCt.ownerCt.findByType("datefield")[1].reset();
												if (this.ownerCt.ownerCt.findByType("grid")[0].getSelectionModel().getSelections() != "undefined") {
													var a = this.ownerCt.ownerCt.findByType("panel")[14].items.items;
													var b = this.ownerCt.ownerCt.findByType("panel")[17].items.items;
													a.forEach(function (c) {
														c.setValue(false)
													});
													b.forEach(function (c) {
														c.setValue(false)
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
					title : "Vehicles",
					xtype : "panel"
				}
			],
			listeners : {
				tabchange : function (c, b) {
					if (b.title == "Decks") {
						document.getElementById("shipImageId").src = c.config.shipImage
					}
					if (b.title == "Categories") {
						if (typeof c.items.itemAt(3).findByType("panel")[8].items != "undefined") {
							c.items.itemAt(3).findByType("panel")[8].removeAll()
						}
						this.items.itemAt(1).findByType("grid")[0].getStore().each(function (d) {
							var e = new Ext.form.Checkbox({
									name : d.get("dataURI"),
									boxLabel : d.get("deck"),
									inputValue : d.get("deck")
								});
							c.items.itemAt(3).findByType("panel")[8].add(e);
							c.items.itemAt(3).findByType("panel")[8].doLayout()
						})
					}
					if (b.title == "Cabins") {
						c.items.itemAt(4).findByType("panel")[21].removeAll();
						function a(g) {
							var f = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
							var j = new Date(g),
							i = "" + (j.getMonth()),
							e = "" + j.getDate(),
							h = j.getFullYear().toString();
							return [e, f[i], Number(h.slice(h.length - 2, h.length))].join("")
						}
						this.items.itemAt(2).findByType("grid")[0].getStore().each(function (d) {
							var e = new Ext.form.Checkbox({
									name : d.get("dataURI"),
									boxLabel : d.get("deck") + " " + (!Ext.isEmpty(d.get("planDate")) ? a(d.get("planDate")) : " "),
									inputValue : d.get("deck"),
									data : d,
									forceSelection : true,
									listeners : {
										change : function (g, h, f) {},
										check : function (g, f) {
											console.log(g.ownerCt);
											if (f) {
												new Ext.Window({
													title : "Deck  " + d.get("deck"),
													height : 580,
													width : 370,
													closable : true,
													border : false,
													layout : "fit",
													modal : true,
													items : [{
															xtype : "panel",
															border : false,
															autoScroll : true,
															style : "padding:10px; 5px; 0px; 10px;",
															items : [{
																	html : "DeckImage",
																	style : "padding:10px;",
																	height : "505",
																	width : "310",
																	autoScroll : true,
																	listeners : {
																		render : function () {
																			this.html = '<center><img border="0" width=370px;height:500px;  id="deckImageids" name="deckImageName" src=../' + d.get("deckPlanGraphics") + " ></center>"
																		}
																	}
																}
															]
														}
													]
												}).show()
											}
										}
									}
								});
							fieldLabel : (!Ext.isEmpty(d.get("planDate")) ? a(d.get("planDate")) : " "),
							c.items.itemAt(4).findByType("panel")[21].add(e);
							c.items.itemAt(4).findByType("panel")[21].doLayout()
						})
					}
				}
			}
		}
	]
}

















