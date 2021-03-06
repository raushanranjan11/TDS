{
	height: 450,
	frame: true,
	width: 400,
	closable: true,
	resizable: false,
	border: false,
	xtype: "panel",
	modal: true,
	config: {
		roomArray: [],
		buttons: [],
		totalPax: 0,
		totalAllPax: 0,
		totalPaxFlag: false,
		roomwithPaxDetail: []
	},
	listeners: {
		render: function (a) {}
	},
	items: [{
			items: [{
					xtype: "panel",
					html: '<center><font size="3"><b><u>Search for a Cruise</u></font></b></center>'
				}, {
					xtype: "panel",
					height: 450,
					layout: "auto",
					items: [{
							xtype: "form",
							bodyStyle: "padding-top: 10px;padding-left: 40px;",
							border: false,
							height: 440,
							items: [{
									xtype: "panel",
									height: 180,
									layout: "table",
									layoutConfig: {
										columns: 2
									},
									defaults: {
										bodyStyle: "padding-top:10px;padding-right:50px;padding-bottom:5px;"
									},
									items: [{
											html: "Destination"
										}, {
											xtype: "combo",id:'desti',
											fieldLabel: "Destination",
											name: "destination",
											editable: false,
											forceSelection: true,
											mode: "local",
											triggerAction: "all",
											displayField: "name",
											valueField: "dataURI",
											enableKeyEvents: true,
											store: TDS.data.getStore({
												dataURI: TDS.env.dataPath + "destination/collection",
												identifier: "destination",
												fields: ["name", "externalId", "dataURI"]
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											],
											listeners: {
												select: function (g, c, d) {
													var b = g.getValue();
													var f = this.findParentByType("form").getForm().findField("shipNameLike").getValue();
													var a = this.findParentByType("form").getForm().findField("cruiselines").getValue();
													var e = this.findParentByType("form").getForm().findField("cruiseType").getValue();
													var d = this.findParentByType("awesomewindow");
													var cruiseFactory = g.findParentByType('form').getForm().findField('cruiseFactory').getValue();
													console.log(e);
													Ext.Ajax.request({
														url: TDS.env.dataPath + "cruise/offering/allRecords/collection",
														timeout: 90000,
														method: "POST",
														params: {
															destination_id: g.getValue(),
															cruiseLine_id: a,
															ship_id: f,
															c_type_id: e,
																cruiseFactory:cruiseFactory
														},
														callback: function (n, o, l) {
															if (l.status == 200) {
																var k = Ext.decode(l.responseText);
																g.findParentByType("form").getForm().findField("cruiselines").getStore().removeAll();
																g.findParentByType("form").getForm().findField("cruiselines").getStore().loadData(Ext.decode(k.allRecords[0].cruiselines));
																g.findParentByType("form").getForm().findField("shipNameLike").getStore().loadData(Ext.decode(k.allRecords[0].ships));
																//g.findParentByType("form").getForm().findField("cruiseType").getStore().loadData(Ext.decode(k.allRecords[0].type));
																g.findParentByType("form").ownerCt.ownerCt.ownerCt.config.shipStore = Ext.decode(k.allRecords[0].ships);
																g.findParentByType("form").ownerCt.ownerCt.ownerCt.config.sailingDate = k.allRecords[0].sailing;
																var p = new Ext.data.CollectionStore({
																		identifier: "sailingDates",
																		fields: ["sailingdate", "dataURI"],
																		reader: new Ext.data.CollectionReader({
																			identifier: "sailingDates",
																			fields: ["sailingdate", "dataURI"]
																		})
																	});
																p.loadData(Ext.decode(g.findParentByType("form").ownerCt.ownerCt.ownerCt.config.sailingDate));
																var h = new Date().getMonth();
																var i = [];
																var q = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
																p.each(function (r) {
																					//	console.log(r.get("departureDate"));
																						if(!cruiseFactory){

																					//console.log(r.get("departureDate"));
																	//	console.log(TDS.util.Format.dateSpecial(r.get('departureDate'), TDS.env.dateDayFormatDisplay));
																	

																						if (new Date() <= new Date(r.get("departureDate"))) {
																		i.push({
																			name:TDS.util.Format.dateSpecial(r.get('departureDate'), TDS.env.dateDayFormatDisplay),
																			//name: q[new Date(r.get("departureDate")).getMonth()] + " " + (new Date(r.get("departureDate")).getFullYear()),
																			//value: new Date(new Date(r.get("departureDate")).getFullYear(), new Date(r.get("departureDate")).getMonth(), 1)
																				value:r.get('departureDate')
																		})
																	}
																						
																						}else{

																							console.log('&&&&&&&&&&&&&&&&&&&&&&');



																	if (new Date() <= new Date(r.get("sailingdate"))) {
																		console.log(r.get("departureDate"));
																		console.log(TDS.util.Format.dateSpecial(r.get('sailingdate'), TDS.env.dateDayFormatDisplay));
																	//	TDS.util.Format.dateSpecial(record.get('sailingdate'), TDS.env.dateDayFormatDisplay)
																		i.push({
																			name: q[new Date(r.get("sailingdate")).getMonth()] + " " + (new Date(r.get("sailingdate")).getFullYear()),
																			value: new Date(new Date(r.get("sailingdate")).getFullYear(), new Date(r.get("sailingdate")).getMonth(), 1)
																		})
																	}
																						}
																	/*i.push({
																			name: q[new Date().getMonth()] + " " + (new Date().getFullYear()),
																			value: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
																		})*/
																});
																console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
																console.log(i);
																function j(u) {
																	var x = [];
																	var w = {};
																	for (var s = 0; s < u.length; s++) {
																		var t = Object.keys(u[s]);
																		t.sort(function (z, y) {
																			return z - y
																		});
																		var v = "";
																		for (var r = 0; r < t.length; r++) {
																			v += JSON.stringify(t[r]);
																			v += JSON.stringify(u[s][t[r]])
																		}
																		if (!w.hasOwnProperty(v)) {
																			x.push(u[s]);
																			w[v] = true
																		}
																	}
																	return x
																}
																function m(r) {
																	return function (t, s) {
																		if (t[r] > s[r]) {
																			return 1
																		} else {
																			if (t[r] < s[r]) {
																				return -1
																			}
																		}
																		return 0
																	}
																}
																g.findParentByType("form").getForm().findField("datePointer").getStore().removeAll();
																g.findParentByType("form").getForm().findField("datePointer").getStore().loadData(j(i).sort(m("value")));
																g.findParentByType("form").getForm().findField("datePointerOut").getStore().loadData(j(i).sort(m("value")))
															}
														},
														scope: this
													})
												},
												render: function () {
													if (this.findParentByType("awesomewindow").title == "Edit Passenger") {
														var a = Ext.getCmp("awGrid").getSelectionModel().getSelections()[0].data;
														this.setValue(a.destinationName)
													}
												}
											}
										}, {
											html: "Cruise Line"
										}, {
											xtype: "combo",
											fieldLabel: "Cruise Line",
											name: "cruiselines",
											mode: "local",
											enableKeyEvents: true,
											triggerAction: "all",
											displayField: "name",
											valueField: "dataURI",
											enableKeyEvents: true,
											enableKeyEvents: true,
											store: new Ext.data.CollectionStore({
												identifier: "cruiseline",
												fields: ["name", "dataURI", "externalId"],
												reader: new Ext.data.CollectionReader({
													identifier: "cruiseline",
													fields: ["name", "externalId ", "dataURI"]
												})
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											],
											listeners: {
												render: function () {
													this.getStore().removeAll();
													if (this.findParentByType("awesomewindow").title == "Edit Passenger") {
														var a = Ext.getCmp("awGrid").getSelectionModel().getSelections()[0].data;
														this.setValue(a.cruiseLine)
													}
												},
												beforequery: function (b) {
													var c = this.findParentByType("form").getForm();
													if (c.findField("destination").getValue() == "" && c.findField("shipNameLike").getValue() == "" && c.findField("cruiseType").getValue() == "") {
														var a = TDS.data.getStore({
																dataURI: TDS.env.dataPath + "cruise/offerings/cruiselines/collection",
																identifier: "cruiseline",
																fields: ["name", "dataURI"]
															});
														this.getStore().sortOnLoad = false;
														this.getStore().loadData(a.reader.jsonData)
													}
												},
												select: function (f, b, c) {
													var a = this.findParentByType("form").getForm().findField("destination").getValue();
													var e = this.findParentByType("form").getForm().findField("shipNameLike").getValue();
													var d = this.findParentByType("form").getForm().findField("cruiseType").getValue();
													var cruiseFactory = this.findParentByType('form').getForm().findField('cruiseFactory').getValue();
													Ext.Ajax.request({
														url: TDS.env.dataPath + "cruise/offering/allRecords/collection",
														method: "POST",
														params: {
															destination_id: a,
															cruiseLine_id: f.getValue(),
															ship_id: e,
															c_type_id: d,
																	cruiseFactory:f.findParentByType('form').getForm().findField('cruiseFactory').getValue()
														},
														callback: function (m, n, k) {
															if (k.status == 200) {
																var j = Ext.decode(k.responseText);
																f.findParentByType("form").getForm().findField("shipNameLike").getStore().loadData(Ext.decode(j.allRecords[0].ships));
															//	f.findParentByType("form").getForm().findField("destination").getStore().loadData(Ext.decode(j.allRecords[0].destination));
															//	f.findParentByType("form").getForm().findField("cruiseType").getStore().loadData(Ext.decode(j.allRecords[0].type));
																var o = new Ext.data.CollectionStore({
																		identifier: "sailingDates",
																		fields: ["sailingdate", "dataURI"],
																		reader: new Ext.data.CollectionReader({
																			identifier: "sailingDates",
																			fields: ["sailingdate", "dataURI"]
																		})
																	});
																o.loadData(Ext.decode(j.allRecords[0].sailing));
																var g = new Date().getMonth();
																var h = [];
																var p = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
																
																
																/*	if(!cruiseFactory){
																	name:TDS.util.Format.dateSpecial(r.get('departureDate'), TDS.env.dateDayFormatDisplay),
																	value:r.get('departureDate')

																	}else{*/

																o.each(function (q) {

																	if(!cruiseFactory){
																		if (new Date() <= new Date(q.get("departureDate"))) {
																		h.push({
																	name:TDS.util.Format.dateSpecial(q.get('departureDate'), TDS.env.dateDayFormatDisplay),
																	value:q.get('departureDate')
																		})
																		}

																	}else{



																	if (new Date() <= new Date(q.get("sailingdate"))) {
																		h.push({
																			name: p[new Date(q.get("sailingdate")).getMonth()] + " " + (new Date(q.get("sailingdate")).getFullYear()),
																			value: new Date(new Date(q.get("sailingdate")).getFullYear(), new Date(q.get("sailingdate")).getMonth(), 1)
																		})
																	}

																	}



																});
																function i(t) {
																	var w = [];
																	var v = {};
																	for (var r = 0; r < t.length; r++) {
																		var s = Object.keys(t[r]);
																		s.sort(function (y, x) {
																			return y - x
																		});
																		var u = "";
																		for (var q = 0; q < s.length; q++) {
																			u += JSON.stringify(s[q]);
																			u += JSON.stringify(t[r][s[q]])
																		}
																		if (!v.hasOwnProperty(u)) {
																			w.push(t[r]);
																			v[u] = true
																		}
																	}
																	return w
																}
																function l(q) {
																	return function (s, r) {
																		if (s[q] > r[q]) {
																			return 1
																		} else {
																			if (s[q] < r[q]) {
																				return -1
																			}
																		}
																		return 0
																	}
																}
																f.findParentByType("form").getForm().findField("datePointer").getStore().removeAll();
																f.findParentByType("form").getForm().findField("datePointer").getStore().loadData(i(h).sort(l("value")));
																f.findParentByType("form").getForm().findField("datePointerOut").getStore().loadData(i(h).sort(l("value")))
															}
														}
													})
												}
											}
										}, {
											html: "Cruise Ship"
										}, {
											xtype: "combo",
											fieldLabel: "Cruise Ship",
											bodyStyle: "padding-top: 5px;",
											name: "shipNameLike",
											forceSelection: true,
											triggerAction: "all",
											mode: "local",
											displayField: "name",
											valueField: "dataURI",
											enableKeyEvents: true,
											config: {},
											store: new Ext.data.CollectionStore({
												identifier: "ship",
												fields: ["name", "dataURI", "externalId", "cruiselineURI"],
												reader: new Ext.data.CollectionReader({
													identifier: "ship",
													fields: ["name", "externalId ", "dataURI", "cruiselineURI"]
												})
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											],
											listeners: {
												beforequery: function (b) {
													var c = this.findParentByType("form").getForm();
													if (c.findField("destination").getValue() == "" && c.findField("cruiselines").getValue() == "" && c.findField("cruiseType").getValue() == "") {
														var a = TDS.data.getStore({
																dataURI: TDS.env.dataPath + "cruise/offerings/ship/collection",
																identifier: "ship",
																fields: ["name", "dataURI"]
															});
														this.getStore().sortOnLoad = false;
														this.getStore().loadData(a.reader.jsonData)
													}
												},
												render: function () {
													if (this.findParentByType("awesomewindow").title == "Edit Passenger") {
														var a = Ext.getCmp("awGrid").getSelectionModel().getSelections()[0].data;
														this.setValue(a.shipName)
													}
												},
												select: function (f, b, d) {
													var a = this.findParentByType("form").getForm().findField("destination").getValue();
													var c = this.findParentByType("form").getForm().findField("cruiselines").getValue();
													var e = this.findParentByType("form").getForm().findField("cruiseType").getValue();
													var cruiseFactory = this.findParentByType('form').getForm().findField('cruiseFactory').getValue();
													Ext.Ajax.request({
														url: TDS.env.dataPath + "cruise/offering/allRecords/collection",
														method: "POST",
														params: {
															destination_id: a,
															cruiseLine_id: c,
															ship_id: f.getValue(),
															c_type_id: e,
																	cruiseFactory:f.findParentByType('form').getForm().findField('cruiseFactory').getValue()
														},
														callback: function (m, n, k) {
															if (k.status == 200) {
																var j = Ext.decode(k.responseText);
																f.findParentByType("form").getForm().findField("cruiselines").getStore().removeAll();
																f.findParentByType("form").getForm().findField("cruiselines").getStore().loadData(Ext.decode(j.allRecords[0].cruiselines));
																//f.findParentByType("form").getForm().findField("destination").getStore().loadData(Ext.decode(j.allRecords[0].destination));
															//	f.findParentByType("form").getForm().findField("cruiseType").getStore().loadData(Ext.decode(j.allRecords[0].type));
															//	f.findParentByType("form").getForm().findField("datePointer").getStore().removeAll();
																var o = new Ext.data.CollectionStore({
																		identifier: "sailingDates",
																		fields: ["sailingdate", "dataURI"],
																		reader: new Ext.data.CollectionReader({
																			identifier: "sailingDates",
																			fields: ["sailingdate", "dataURI"]
																		})
																	});
																o.loadData(Ext.decode(j.allRecords[0].sailing));
																var g = new Date().getMonth();
																var h = [];
																var p = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
																o.each(function (q) {

																	if(!cruiseFactory){
																		if (new Date() <= new Date(q.get("departureDate"))) {
																		h.push({
																	name:TDS.util.Format.dateSpecial(q.get('departureDate'), TDS.env.dateDayFormatDisplay),
																	value:q.get('departureDate')
																		})
																		}

																	}else{



																	if (new Date() <= new Date(q.get("sailingdate"))) {
																		console.log(new Date(q.get("sailingdate")));



																		h.push({
																			name: p[new Date(q.get("sailingdate")).getMonth()] + " " + (new Date(q.get("sailingdate")).getFullYear()),
																			value: new Date(new Date(q.get("sailingdate")).getFullYear(), new Date(q.get("sailingdate")).getMonth(), 1)
																		})



																	}
																	}
																});
																function i(t) {
																	var w = [];
																	var v = {};
																	for (var r = 0; r < t.length; r++) {
																		var s = Object.keys(t[r]);
																		s.sort(function (y, x) {
																			return y - x
																		});
																		var u = "";
																		for (var q = 0; q < s.length; q++) {
																			u += JSON.stringify(s[q]);
																			u += JSON.stringify(t[r][s[q]])
																		}
																		if (!v.hasOwnProperty(u)) {
																			w.push(t[r]);
																			v[u] = true
																		}
																	}
																	return w
																}
																function l(q) {
																	return function (s, r) {
																		if (s[q] > r[q]) {
																			return 1
																		} else {
																			if (s[q] < r[q]) {
																				return -1
																			}
																		}
																		return 0
																	}
																}
																f.findParentByType("form").getForm().findField("datePointer").getStore().removeAll();
																f.findParentByType("form").getForm().findField("datePointer").getStore().loadData(i(h).sort(l("value")));
																f.findParentByType("form").getForm().findField("datePointerOut").getStore().loadData(i(h).sort(l("value")))
															}
														}
													})
												}
											}
										}, {
											html: "Date From"
										}, {
											fieldLabel: "Date From",
											xtype: "combo",
											id: "dropdown",
											name: "datePointer",
											format: "F Y",
											mode: "local",
											triggerAction: "all",
											displayField: "name",
											valueField: "value",
											store: new Ext.data.JsonStore({
												url: "",
												id: "dataURI",
												fields: ["name", "value", "dataURI"]
											}),
											listeners: {
												select: function () {},
												render: function () {
													if (this.findParentByType("awesomewindow").title == "Edit Passenger") {
														var a = Ext.getCmp("awGrid").getSelectionModel().getSelections()[0].data;
														this.setValue(a.sailingdate)
													}
												},
												beforequery: function (c) {

													var cruiseFactory = this.findParentByType('form').getForm().findField('cruiseFactory').getValue();
													/*var h = this.findParentByType("form").getForm().findField("shipNameLike").getValue();
													if (this.getStore().getTotalCount() == 0) {
														var f = "";
														var k = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
														var a = new Date().getMonth();
														var b = [];
														for (var e = 0; e < 5; e++) {
															for (var d = a; d < k.length; ) {
																var g = this.ownerCt.getForm().findField("datePointerOut").getValue();
																if (!Ext.isEmpty(g)) {
																	if (new Date((new Date().getFullYear() + e), d, 1) <= this.ownerCt.getForm().findField("datePointerOut").getValue()) {
																		b.push({
																			name: k[d] + " " + (new Date().getFullYear() + e),
																			value: new Date((new Date().getFullYear() + e), d, 1)
																		})
																	}
																} else {
																	b.push({
																		name: k[d] + " " + (new Date().getFullYear() + e),
																		value: new Date((new Date().getFullYear() + e), d, new Date().getDate())
																	})
																}
																d++
															}
															a = 0
														}
														this.getStore().loadData(b)
													}*/

													if(cruiseFactory){

													var d = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
														var c = new Date().getMonth();
														var a = [];
														for (var f = 0; f < 5; f++) {
															for (var b = c; b < d.length; ) {
																a.push({
																	name: d[b] + " " + (new Date().getFullYear() + f),
																	value: new Date((new Date().getFullYear() + f), b, 1)
																});
																b++
															}
															c = 0
														}
														this.getStore().loadData(a)

													}


												}
											}
										}, {
											html: "Date To"
										}, {
											fieldLabel: "Date To",
											xtype: "combo",
											name: "datePointerOut",
											mode: "local",
											triggerAction: "all",
											displayField: "name",
											valueField: "value",
											store: new Ext.data.JsonStore({
												url: "",
												id: "dataURI",
												fields: ["name", "value", "dataURI"]
											}),
											listeners: {
												beforequery: function (e) {
													if (this.getStore().getTotalCount() == 0) {
														var d = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
														var c = new Date().getMonth();
														var a = [];
														for (var f = 0; f < 5; f++) {
															for (var b = c; b < d.length; ) {
																a.push({
																	name: d[b] + " " + (new Date().getFullYear() + f),
																	value: new Date((new Date().getFullYear() + f), b, 1)
																});
																b++
															}
															c = 0
														}
														this.getStore().loadData(a)
													}
												}
											}
										}
									]
								}, {
									xtype: "panel",
									height: 160,
									layout: "table",
									layoutConfig: {
										columns: 2
									},
									html: '<font size="3"><b><u>Optional</u></font></b>',
									defaults: {
										bodyStyle: "padding-top:10px;padding-right:50px;padding-bottom:5px;"
									},
									items: [{
											html: "Cruise Type"
										}, {
											xtype: "combo",
											fieldLabel: "Cruise Type",
											name: "cruiseType",
											enableKeyEvents: true,
											mode: "local",
											triggerAction: "all",
											displayField: "name",
											valueField: "dataURI",
											enableKeyEvents: true,
											enableKeyEvents: true,
											store: new Ext.data.CollectionStore({
												identifier: "cruiseType",
												fields: ["name", "externalId", "dataURI"],
												reader: new Ext.data.CollectionReader({
													identifier: "cruiseType",
													fields: ["name", "externalId", "dataURI"]
												})
											}),
											appendData: [{
													name: "",
													dataURI: ""
												}
											],
											listeners: {
												beforequery: function (b) {
													var c = this.findParentByType("form").getForm();
													if (c.findField("destination").getValue() == "" && c.findField("shipNameLike").getValue() == "" && c.findField("cruiselines").getValue() == "") {
														var a = TDS.data.getStore({
																dataURI: TDS.env.dataPath + "cruise/offerings/cruiseType/collection",
																identifier: "cruiseType",
																fields: ["name", "dataURI"]
															});
														this.getStore().sortOnLoad = false;
														this.getStore().loadData(a.reader.jsonData)
													}
												}
											}
										}, {
											html: "Duration"
										}, {
											xtype: "combo",
											name: "duration"
										}, {
											html: "Embark"
										}, {
											xtype: "combo",
											fieldLabel: "Dis-Embark",
											name: "embark"
										}, {
											html: "Dis-Embark"
										}, {
											xtype: "combo",
											fieldLabel: "Dis-Embark",
											name: "disEmbark"
										}
									]
								}, {
									xtype: "panel",
									border: false,
									style: "padding-top:10px;",
									layout: "table",
									layoutConfig: {
										columns: 5
									},
									items: [
										{html:'<b>CF</b>',width:30,
										},
										{xtype:'checkbox',name:'cruiseFactory',
											//checked:true,
											//text: "Cruise Factory",
											},
											
										
										{
											xtype: "button",
											text: "Clear",
											style: " padding-left:110px",
											id: "clear",
											listeners: {
												click: function (a) {
													a.findParentByType("awesomewindow").findByType("form")[0].getForm().reset();
												//	a.findParentByType("awesomewindow").findByType("form")[1].getForm().reset()
												}
											}
										}, {
											xtype: "button",
											text: "Search",
											id: "search",
											style: " padding-left:50px",
											listeners: {
												click: function (a) {
													a.findParentByType("awesomewindow").getEl().mask(" ", "x-mask-loading");
													Ext.getCmp("cruiseAwesomeGrid").getStore().removeAll();
													Ext.Ajax.request({
														url: TDS.env.dataPath + "search/cruises/collection",
														//url: TDS.env.dataPath + "search/cruises",
														method: "GET",
														timeout: 180000,
														params: {
															destination: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("destination").getValue(),
															cruiseType: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("cruiseType").getValue(),
															shipNameLike: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("shipNameLike").getValue(),
															cruiselines: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("cruiselines").getValue(),
															datePointer: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("datePointer").getValue(),
															datePointerOut: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("datePointerOut").getValue(),
															embark: a.findParentByType("awesomewindow").findByType("form")[0].getForm().findField("embark").getValue(),
															//cruiseFactory: true,
															cruiseFactory:a.findParentByType('panel').findByType('checkbox')[0].getValue()
														},
														data: {},
														success: function (b, e) {
															var d = Ext.util.JSON.decode(b.responseText);
															var g = d["search/cruises"];
															if (typeof g == "undefined") {
																return
															}
															var f = [];
															for (var c = 0; c < g.length; c++) {
																d[g[c]].dataURI = g[c];
																f.push(d[g[c]])
															}
															f.length == 0 ? Ext.Msg.alert("Status", "No records found,please do  search again.") : Ext.getCmp("cruiseAwesomeGrid").getStore().loadData(f);
															a.findParentByType("awesomewindow").getEl().unmask();
															a.findParentByType("awesomewindow").hide()
														},
														failure: function (b, c) {
															Ext.Msg.alert("Status", b.responseText == "undefined" ? "Please do search again." : b.responseText);
															a.findParentByType("awesomewindow").getEl().unmask()
														},
														scope: this
													})
												}
											}
										}
									]
								}
							],
							listeners: {
								render: function () {
									this.findParentByType("awesomewindow").buttons[0].hide();
									if ((this.ownerCt.ownerCt.ownerCt.ownerCt.title) == "Edit Passenger") {
										Ext.getCmp("form").ownerCt.ownerCt.findByType("form")[0].disable();
										Ext.getCmp("search").hide();
										Ext.getCmp("clear").hide()
									}
								}
							}
						}
					]
				}
			]
		}
	]
}





































































































































































