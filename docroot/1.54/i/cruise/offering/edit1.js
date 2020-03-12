{
	xtype : 'form',
	border : false,
	id : 'form',
	width : 775,
	requireStores : [{
			dataURI : TDS.env.dataPath + 'cruise/offer',
			identifier : 'cruise/classes',
			fields : ['name', 'dataURI']
		}, ],
	beforeSubmit : function (jd) {
		var g = this.findByType('grid')[0];
		var data = g.getSelectionModel().getSelections()[0].data;
		var dealsArray = [];
		var dealsStore = Ext.getCmp('form').findByType('grid')[0].getStore();
		dealsStore.each(function (rec) {
			dealsArray.push(rec.data)
		})
		data.dealDescr = Ext.getCmp('deal').getValue();
		jd.deals = dealsArray;
		return jd;
	},
	items : [{
			xtype : 'tabpanel',
			activeTab : 2,
			layoutOnTabChange : true,
			height : 500,
			defaults : {
				bodyStyle : 'padding: 6px 4px 6px 4px;'
			},
			items : [{
					title : 'General Info',
					items : [{
							xtype : 'panel',
							layout : 'fit',
							height : 600,
							frame : true,
							items : {
								xtype : 'htmleditor',
								id : 'editor1',
								style : " font-size: 12px;",
								name : 'description',
								height : 200,
								hideLabel : true,
								labelSeparator : '',
								anchor : '100%',
								enableLinks : false,
								enableLists : false,
								enableSourceEdit : false,
								enableFontSize : false,
								enableFont : false,
								enableColors : false,
								enableAlignments : false,
								fontFamilies : ['Arial', ],
							}
						}
					]
				}, {
					title : 'Included',
					items : [{
							xtype : 'panel',
							layout : 'fit',
							height : 460,
							frame : true,
							items : {
								xtype : 'htmleditor',
								id : 'editor',
								name : 'descIncluded',
								height : 200,
								hideLabel : true,
								labelSeparator : '',
								anchor : '100%',
								enableLinks : false,
								enableLists : false,
								enableSourceEdit : false,
								enableFontSize : false,
								enableFont : false,
								enableColors : false,
								enableAlignments : false,
								enableFontSize : true,
								style : " font-size: 21px;",
								fontFamilies : ['Arial', ],
								listeners : {
									render : function () {}

								}
							}
						}
					]
				}, {
					title : 'Details',
					items : [{
							xtype : 'panel',
							border : false,
							items : [{
									xtype : 'panel',
									border : false,
									items : [{
											xtype : 'panel',
											frame : true,
											layout : 'form',
											border : false,
											labelWidth : 90,
											defaults : {
												style : 'padding: 2px 4px 2px 4px;'
											},
											items : [{
													xtype : 'textfield',
													allowBlank : false,
													name : 'cruiseline',
													readOnly : true,
													fieldLabel : 'Cruise Line',
													bodyStyle : 'padding: 2px 4px 2px 4px;',
													width : 185
												}, {
													xtype : 'textfield',
													allowBlank : false,
													name : 'cruiseShips',
													readOnly : true,
													fieldLabel : 'Ship',
													bodyStyle : 'padding: 2px 4px 2px 4px;',
													width : 185
												}, {
													xtype : 'panel',
													layout : 'table',
													style : 'padding-left: 20; margin-bottom: 4px;',
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : 'Cruise Name:',
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : 'textfield',
															name : 'cruiseName',
															readOnly : true,
															bodyStyle : 'padding: 2px 4px 2px 4px;',
															width : 185
														}, {
															html : '',
															width : Ext.isIE ? 10 : 50
														}, {
															html : 'Duration:',
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : 'textfield',
															allowBlank : false,
															fieldLabel : 'Day/Date',
															enableKeyEvents : true,
															width : 180,
														}, ]
												}, {
													xtype : 'panel',
													layout : 'table',
													style : 'padding-left: 20; margin-bottom: 4px;',
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : 'Cruise ID:',
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : 'textfield',
															name : 'cruiseNumber',
															readOnly : true,
															fieldLabel : 'Cruise ID',
															bodyStyle : 'padding: 2px 4px 2px 4px;',
															width : 185
														}, {
															html : '',
															width : Ext.isIE ? 10 : 50
														}, {
															html : 'Star Rating:',
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : 'combo',
															store : TDS.data.destination,
															name : 'starrating',
															fieldLabel : 'Star Rating',
															width : 185,
															editable : false,
															forceSelection : true,
															mode : 'local',
															triggerAction : 'all',
															displayField : 'text',
															valueField : 'text',
															value : '...',
															tpl : '<tpl for="."><div class="x-combo-list-item"> {text}&nbsp;</div></tpl>',
														}, ]
												}, {
													xtype : 'panel',
													layout : 'table',
													style : 'padding-left: 20; margin-bottom: 4px;',
													border : true,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : 'Destination:',
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : 'combo',
															name : 'cruiseDestination',
															fieldLabel : 'Destination',
															width : 185,
															editable : false,
															forceSelection : true,
															mode : 'local',
															triggerAction : 'all',
															displayField : 'name',
															valueField : 'externalId',
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath + 'destination/collection',
																identifier : 'destination',
																fields : ['name', 'externalId']
															}),
														}, {
															html : '',
															width : Ext.isIE ? 10 : 50
														}, {
															html : 'Seasion:',
															width : Ext.isIE ? 90 : 75
														}, {
															xtype : 'combo',
															name : 'seasion',
															fieldLabel : 'Seasion',
															width : 185,
															editable : false,
															forceSelection : true,
															triggerAction : 'all',
															displayField : 'startMonth',
															valueField : 'startMonth',
															value : '...',
															tpl : '<tpl for="."><div class="x-combo-list-item"> {startMonth} - {endMonth}&nbsp;</div></tpl>',
															store : new Ext.data.CollectionStore({
																identifier : 'seasion',
																fields : ['name', 'id', 'dataURI', 'startMonth', 'endMonth'],
																reader : new Ext.data.CollectionReader({
																	identifier : 'seasion',
																	fields : ['name', 'id', 'dataURI', 'startMonth', 'endMonth'],
																}),
															}),
															listeners : {
																beforequery : function (qe) {
																	var destinationValue = this.findParentByType('form').getForm().findField('destination').getValue();
																	this.getStore().proxy.conn.method = 'GET',
																	this.getStore().proxy.conn.url = TDS.env.dataPath + 'cruise/offerings/seasion/collection',
																	this.getStore().load({
																		params : {
																			'destinationId' : destinationValue
																		}
																	});
																}
															}
														}, ]
												}, {
													xtype : 'panel',
													layout : 'table',
													style : 'padding: 0; margin-bottom: 4px;',
													border : false,
													hideBorders : true,
													layoutConfig : {
														columns : 5
													},
													items : [{
															html : 'Embarkation:',
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : 'combo',
															name : 'embarkation',
															minChars : 1,
															width : 185,
															typeAhead : true,
															triggerAction : 'all',
															forceSelection : true,
															selectOnFocus : true,
															displayField : 'name',
															valueField : 'id',
															store : new Ext.data.CollectionStore({
																identifier : 'embarkation',
																fields : ['name', 'id', 'dataURI'],
																reader : new Ext.data.CollectionReader({
																	identifier : 'embarkation',
																	fields : ['name', 'id', 'dataURI'],
																}),
															}),
															listeners : {
																beforequery : function (qe) {
																	var destinationValue = this.findParentByType('form').getForm().findField('destination').getValue();
																	this.getStore().proxy.conn.method = 'GET',
																	this.getStore().proxy.conn.url = TDS.env.dataPath + 'cruise/offerings/embarkation/collection',
																	this.getStore().load({
																		params : {
																			'destinationId' : destinationValue
																		}
																	});
																}
															}
														}, {
															html : '',
															width : Ext.isIE ? 10 : 50
														}, {
															html : 'Date:',
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : 'datefield',
															allowBlank : false,
															name : 'embarkDate',
															fieldLabel : 'Day/Date',
															bodyStyle : 'padding: 2px 4px 2px 4px;',
															enableKeyEvents : true,
															showToday : false,
															width : 100,
															format : 'dMy D',
															minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
														}, ]
												}, {
													xtype : 'panel',
													layout : 'table',
													style : 'padding: 0; margin-bottom: 4px;',
													border : false,
													hideBorders : true,
													layoutConfig : {
														columns : 6
													},
													items : [{
															html : 'Dis-Embarkation:',
															width : Ext.isIE ? 90 : 95
														}, {
															xtype : 'combo',
															name : 'countryFrom',
															minChars : 1,
															mode : 'local',
															width : 185,
															typeAhead : true,
															triggerAction : 'all',
															forceSelection : true,
															selectOnFocus : true,
															displayField : 'name',
															valueField : 'isoCode',
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath + 'countries/collection',
																identifier : 'countries',
																fields : ['name', 'isoCode']
															}),
															appendData : [{
																	name : '',
																	dataURI : ''
																}
															],
															listeners : {
																render : function () {
																	var w = this.ownerCt.findParentByType('awesomewindow');
																	var val = w.getData('fromCountryURI');
																	val = val.substring(val.lastIndexOf('/') + 1);
																	this.setValue(val);
																}
															}
														}, {
															html : '',
															width : Ext.isIE ? 10 : 50
														}, {
															html : 'Date:',
															width : Ext.isIE ? 60 : 75
														}, {
															xtype : 'datefield',
															allowBlank : false,
															name : 'departureDate',
															fieldLabel : 'Day/Date',
															bodyStyle : 'padding: 2px 4px 2px 4px;',
															enableKeyEvents : true,
															showToday : false,
															width : 100,
															format : 'dMy D',
															minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
														}, {
															xtype : 'button',
															text : 'Summary',
															style : 'padding-left:50px;',
															handler : function () {
																console.log('&&&&&&&&&&&&');
																var win = new Ext.Window({
																		height : 400,
																		width : 550,
																		closable : true,
																		resizable : false,
																		border : false,
																		layout : 'fit',
																		modal : true,
																		items : [{
																				xtype : 'panel',
																				bodyStyle : 'padding: 0px;',
																				border : false,
																				layout : 'fit',
																				frame : false,
																				width : 1000,
																				height : 400,
																				beforeSubmit : function (jd) {},
																				items : [{
																						xtype : 'tabpanel',
																						activeTab : 0,
																						layoutOnTabChange : true,
																						height : 400,
																						defaults : {},
																						items : [{
																								title : 'Cruise Package',
																								layout : 'form',
																								closable : false,
																								frame : true,
																								defaults : {
																									style : 'padding-top:20px;'
																								},
																								width : 640,
																								items : [{
																										html : '<font size="3"><b><u>Cruise Package Components</u></font></b>',
																										style : 'padding-left:180px;'
																									}, {
																										xtype : 'panel',
																										layout : 'table',
																										style : 'padding-left:220px;padding-top:50px;',
																										layoutConfig : {
																											columns : 4
																										},
																										items : [{
																												xtype : 'label',
																												html : 'Gross',
																												style : 'padding-left:20px;padding-right:20px;'
																											}, {
																												xtype : 'label',
																												html : 'Comm',
																												style : 'padding-left:20px;padding-right:20px;'
																											}, {
																												xtype : 'label',
																												html : 'Nett',
																												style : 'padding-left:20px;padding-right:20px;'
																											}, {
																												xtype : 'label',
																												html : 'Status',
																												style : 'padding-left:20px;padding-right:20px;'
																											}
																										]
																									}, {
																										xtype : 'panel',
																										layout : 'table',
																										layoutConfig : {
																											columns : 6
																										},
																										items : [{
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Cruise </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, {
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Air </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, {
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Accommodation </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, {
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Day Tours </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, {
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Services </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, {
																												xtype : 'checkbox'
																											}, {
																												html : '<font size="2"><b><u>Transfer </u></font></b>',
																												style : 'padding-left:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:110px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:35px;padding-right:10px;'
																											}, {
																												html : '100',
																												style : 'padding-left:40px;padding-right:20px;'
																											}, {
																												html : '100',
																												style : 'padding-left:30px;padding-right:20px;'
																											}, ]
																									}, {
																										xtype : 'panel',
																										layout : 'table',
																										style : 'padding-left:125px;padding-top:20px;',
																										layoutConfig : {
																											columns : 2
																										},
																										items : [{
																												html : '<font size="2"><b><u>Totals :  </u></font></b>'
																											}, {
																												html : '200'
																											}
																										]
																									}, {
																										xtype : 'panel',
																										layout : 'table',
																										style : 'padding-left:225px;padding-top:20px;',
																										layoutConfig : {
																											columns : 3
																										},
																										items : [{
																												xtype : 'button',
																												text : 'Edit',//id:'edit',
																												handler: function () {
																													//TDS.window.hide();


																												//	var b = this.ownerCt.findParentByType("form");
																												//	var a = b.getDataURI();
																												//	if (!a) {
//return
																													//}
																													/*TDS.window.setWindow({
																														title : "Edit transfer details",
																														interfaceURI : "transfer/offering/edit.js",
																													//	sourceDataURI : a,
																													//	destinationDataURI : a,
																														buttonOK : "Submit",
																														callback : {
																															fn : function () {
																																//var d = this.ownerCt.findParentByType("ajaxpanel");
																																//var c = this.ownerCt.findParentByType("fieldset");
																																//d.reloadData()
																															},
																															scope : this
																														}
																													})*/

																											var window1 = 		new Ext.Window({
																		height : 400,
																		width : 550,
																		closable : true,
																		resizable : false,
																		border : false,
																		layout : 'fit',
																		modal : true,
																		items : [{
																				xtype : 'form',
																				bodyStyle : 'padding: 0px;',
																				border : false,
																				layout : 'fit',
																				frame : true,
																				width : 1000,
																				height : 400,
																				beforeSubmit : function (jd) {},
																				items : [{
																						xtype : 'tabpanel',
																						activeTab : 0,
																						layoutOnTabChange : true,
																						height : 400,
																						defaults : {},
																						items : [
																						//	title : 'Pricing',
																							{
																								title : 'Pricing',
																		xtype : 'panel',
																		border : false,
																									frame:true,
																		items : [{
																				xtype : 'panel',
																				anchor : '100%',
																				border : false,
																				height : 220,
																				items : [{
																						xtype : 'pricepanel',
																					}, {
																						xtype : 'packagepricepanel',
																					}, {
																						xtype : 'panel',
																						border : false,
																						items : [{
																								xtype : 'panel',
																								layout : 'table',
																								style : ' padding-left: 35px;padding-top:5px; ',
																								border : false,
																								hideBorders : true,
																								layoutConfig : {
																									columns : 5
																								},
																								items : [{
																										xtype : 'radio',
																										name : 'cruiseLink',
																										boxLabel : 'Pricing',
																									//	id : 'pricing',
																										inputValue : false,
																										listeners : {
																											render : function () {
																												//var w = this.ownerCt.findParentByType('awesomewindow');
																												//var a = w.aw.data;
																												//this.setValue(!a.cruiseLink);
																											},
																											check : function (th, checked) {
																												if (checked) {
																												/*	this.ownerCt.ownerCt.ownerCt.items.itemAt(1).disable();
																													this.ownerCt.ownerCt.ownerCt.items.itemAt(0).enable();
																													this.ownerCt.ownerCt.ownerCt.findByType('packagepricepanel')[0].findByType('textfield')[1].setValue(0);
																													this.ownerCt.ownerCt.ownerCt.findByType('packagepricepanel')[0].findByType('textfield')[2].setValue(0);
																													this.ownerCt.ownerCt.ownerCt.findByType('packagepricepanel')[0].findByType('textfield')[3].setValue("");
																													this.ownerCt.ownerCt.ownerCt.findByType('packagepricepanel')[0].findByType('label')[1].setText('0.00');
																													this.ownerCt.ownerCt.ownerCt.findByType('packagepricepanel')[0].findByType('checkbox')[0].setValue(false)
																														*/
																												}
																											}
																										}
																									}, {
																										width : 50
																									}, {
																										xtype : 'radio',
																										name : 'cruiseLink',
																										//id : 'pPricing',
																										boxLabel : 'Package Pricing',
																										inputValue : true,
																										listeners : {
																											render : function () {
																												//var w = this.ownerCt.findParentByType('awesomewindow');
																											//	var a = w.aw.data;
																											//	this.setValue(a.cruiseLink);
																											},
																											check : function (th, checked) {
																												if (checked) {
																												/*	this.ownerCt.ownerCt.ownerCt.items.itemAt(0).disable();
																													this.ownerCt.ownerCt.ownerCt.items.itemAt(1).enable();
																													this.ownerCt.ownerCt.ownerCt.findByType('pricepanel')[0].findByType('textfield')[1].setValue(0);
																													this.ownerCt.ownerCt.ownerCt.findByType('pricepanel')[0].findByType('textfield')[2].setValue(0);
																													this.ownerCt.ownerCt.ownerCt.findByType('pricepanel')[0].findByType('textfield')[3].setValue(0);
																													this.ownerCt.ownerCt.ownerCt.findByType('pricepanel')[0].findByType('label')[1].setText('0.00');
																													*/
																												}
																											},
																											change : function (me, newValue, oldValue) {}

																										}
																									}, ]
																							}, ]
																					}, ]
																			}
																		]
																	}
																																	
																																	
																																	
																																	
																																	]
																															}]
																													}]
																													}).show();



																												}
																											}, {
																												width : 20,
																												border : false
																											}, {
																												xtype : 'button',
																												text : 'Close',
																													handler: function () {
																												//	TDS.window.show();
																												}
																											}, ]
																									}
																								]
																							}
																						]
																					}
																				]
																			}
																		]
																	}).show();
															}
														}
													]
												}, ]
										}, ]
								}, {
									xtype : 'panel',
									layout : 'fit',
									frame : true,
									height : 160,
									width : 755,
									style : 'padding-top: 10px; margin-bottom: 2px;',
									border : true,
									items : [{
											xtype : 'editorgrid',
											id : 'eeee',
											border : true,
											clicksToEdit : 1,
											multiSelect : true,
											width : 650,
											sm : new Ext.grid.CheckboxSelectionModel({
												singleSelect : true,
												checkOnly : true
											}),
											store : new Ext.data.CollectionStore({
												url : '',
												id : 'dataURI',
												identifier : "deals",
												fields : ['nameString', 'dataURI', 'currency', 'priceSingle', 'priceDouble', 'priceTriple', 'cruiseRateURI', 'paxType', 'priceQuad', 'expireDate', 'dealDescr'],
											}),
											cm : new Ext.grid.ColumnModel([new Ext.grid.CheckboxSelectionModel({
														checkOnly : true
													}), {
														header : 'Deals',
														dataIndex : 'dealName',
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
														header : 'Type',
														dataIndex : 'paxType',
														width : 60,
														fixed : true,
														editor : new Ext.form.ComboBox({
															editable : false,
															forceSelection : true,
															mode : 'local',
															displayField : 'text',
															valueField : 'text',
															triggerAction : 'all',
															tpl : '<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',
															store : TDS.data.passengerType
														})
													}, {
														header : 'Category',
														dataIndex : 'cruiseRateURI',
														width : 120,
														editor : new Ext.form.ComboBox({
															mode : "remote",
															triggerAction : "all",
															displayField : "nameString",
															valueField : "dataURI",
															store : TDS.data.getStore({
																dataURI : TDS.env.dataPath,
																identifier : 'categories',
																fields : ['name', 'nameString', 'dataURI', ],
																autoLoad : false,
																reader : new Ext.data.CollectionReader({
																	identifier : 'categories',
																	fields : ['name', 'nameString', 'dataURI'],
																}),
															}),
															listeners : {
																beforequery : function (qe) {
																	var sourceDataURI = Ext.getCmp('form').findByType('grid')[0].initialConfig.cruiseURI;
																	this.getStore().proxy.conn.method = 'GET',
																	this.getStore().proxy.conn.url = TDS.env.dataPath + sourceDataURI + '/categories',
																	this.getStore().load({});
																},
																select : function (combo, record, index) {}

															}
														}),
													}, {
														header : 'Currency',
														dataIndex : 'currency',
														width : 60,
													}, {
														header : 'Single',
														width : 80,
														dataIndex : 'priceSingle',
														editor : new Ext.form.NumberField({}),
														renderer : function (c, b, a) {
															return c != "" ? parseFloat(a.get("priceSingle")).toFixed(2) : ""
														}
													}, {
														header : 'Double',
														width : 80,
														dataIndex : 'priceDouble',
														editor : new Ext.form.NumberField({}),
														renderer : function (c, b, a) {
															return c != "" ? parseFloat(a.get("priceDouble")).toFixed(2) : ""
														}
													}, {
														header : 'Triple',
														width : 80,
														dataIndex : 'priceTriple',
														editor : new Ext.form.NumberField({}),
														renderer : function (c, b, a) {
															return c != "" ? parseFloat(a.get("priceTriple")).toFixed(2) : ""
														}
													}, {
														header : 'Quad',
														dataIndex : 'priceQuad',
														width : 80,
														editor : new Ext.form.NumberField({}),
														renderer : function (c, b, a) {
															return c != "" ? parseFloat(a.get("priceQuad")).toFixed(2) : ""
														}
													}, {
														header : 'Expires',
														width : 80,
														dataIndex : 'expireDate',
														editor : new Ext.form.DateField({
															format : 'dMy',
														}),
													}
												]),
											listeners : {
												render : function (me) {
													var cruiseURI = this.findParentByType('awesomewindow').aw.sourceDataURI
														this.getStore().proxy.conn.method = 'GET',
													this.getStore().proxy.conn.url = TDS.env.dataPath + cruiseURI + '/dealRate',
													this.getStore().load();
												},
												rowclick : function (me, rowIndex, e) {
													var record = me.getStore().getAt(rowIndex);
													me.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0).setValue(record.get('dealDescr'));
													if (me.getSelectionModel().selections.length == 0) {
														me.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0).setValue('');
													}
												},
												beforeedit : function (e, context) {
													if (e.column == 3 && typeof(e.record.get('dataURI')) != 'undefined')
														return false;
												},
												afteredit : function (e, context) {}

											}
										}
									],
									bbar : [{
											xtype : "button",
											text : "Add",
											handler : function () {
												var e = this.ownerCt.ownerCt.findByType('editorgrid')[0];
												var f = e.getStore();
												f.add([new f.recordType({
															name : '',
															currency : "AUD",
															priceSingle : "",
															priceDouble : '',
															priceTriple : '',
															priceQuad : '',
														})]);
												e.newRecordIndex = f.getCount() - 1;
												e.startEditing(e.newRecordIndex, 1);
												e.getSelectionModel().selectRow(e.newRecordIndex);
											}
										}, {
											xtype : "button",
											text : "Cancel",
											handler : function () {
												var e = this.ownerCt.ownerCt.findByType('editorgrid')[0];
												var h = e.getStore().getAt(e.newRecordIndex);
												if (h == -1 || typeof h.get("dataURI") != "undefined") {
													return
												}
												e.getStore().remove(h);
											}
										}, {
											xtype : "button",
											text : "Delete",
											handler : function () {
												var j = this.ownerCt.ownerCt.findByType('editorgrid')[0];
												var selectedData = j.getSelectionModel().getSelections();
												console.log(selectedData[0].get('dataURI'));
												if (selectedData.length == 1) {
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'cruise/offering/' + selectedData[0].get('dataURI'),
														callback : function (b, a, c) {
															if (a) {
																j.getStore().remove(selectedData[0]);
															} else {}

														},
														scope : this
													})
												}
											}
										}
									]
								}, {
									xtype : 'panel',
									border : false,
									style : 'padding-top:10px;',
									height : 175,
									items : [{
											height : 90,
											xtype : 'textarea',
											name : 'deals_description',
											id : 'deal',
											width : 750,
											height : 90,
										}
									]
								}, ]
						}
					]
				}, {
					title : 'Ship Info',
					items : [{
							xtype : 'panel',
							height : 460,
							frame : true,
							layout : 'table',
							layoutConfig : {
								columns : 2
							},
							defaults : {
								style : 'padding:10px'
							},
							autoScroll : true,
							items : [{
									xtype : 'panel',
									border : false,
									items : [{
											width : 320,
											height : 150,
											autoScroll : true,
											border : false,
											id : 'shipInfo',
											html : 'shipInfoImage',
											listeners : {
												render : function () {
													debugger;
													this.body.setStyle('background', 'white');
													var grap_image_path = "";
													var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
													var graphicImagePath = aw.aw.data.shipInfoGraphicImgPath;
													if (typeof graphicImagePath == 'undefined') {
														graphicImagePath = '';
													}
													var imageHotusa = graphicImagePath.substring(0, 4);
													if (Ext.isEmpty(imageHotusa)) {
														this.html = '<center><img  id="shipInfoImageId"   name="shipInfoImage"   alt="shipInfoImage" align="middle" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
													} else {
														grap_image_path = "../" + graphicImagePath;
														this.html = '<center><img  id="shipInfoImageId"  name="shipInfoImage" src=' + grap_image_path + ' alt="shipInfoImage" align="middle" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
													}
												}
											}
										}, {
											xtype : 'panel',
											border : false,
											layout : 'table',
											style : 'padding: 20px 10px 0px 50px; ',
											column : 3,
											items : [{
													xtype : 'textfield',
													id : 'shipInfoImageValue',
													hidden : true,
													name : 'shipInfoGraphicImgPath',
												}, {
													html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="shipInfofileUpLoads"type="file"  /></td></form>',
													width : 165,
													style : 'padding: 0px 10px 0px 0px; ',
												}, {
													xtype : 'button',
													text : 'Upload',
													style : 'padding: 0px 50px 0px 15px;',
													handler : function (btn) {
														debugger;
														Ext.getCmp('shipInfo').html = '<img border="0" id="shipInfoImageId" name="shipInfoImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
														var w = this.ownerCt.findParentByType('awesomewindow');
														var sourceDataURI = w.aw.sourceDataURI;
														var im = document.getElementById('shipInfofileUpLoads').value
															var file = document.getElementById('shipInfofileUpLoads').files[0];
														if (file) {
															var fileSize = 0;
															uploadFile();
														}
														function uploadFile() {
															var fd = new FormData();
															fd.append("image", file);
															var xhr = new XMLHttpRequest();
															xhr.upload.addEventListener("progress", uploadProgress, false);
															xhr.addEventListener("load", uploadComplete, false);
															xhr.addEventListener("error", uploadFailed, false);
															xhr.addEventListener("abort", uploadCanceled, false);
															xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp('shipInfoImageValue').getValue() + "&imageStorePath=" + sourceDataURI);
															xhr.send(fd);
															xhr.onreadystatechange = function () {
																if (xhr.readyState == 4) {
																	var hdrs = xhr.getAllResponseHeaders();
																	var resp = xhr.responseText;
																	var dataURI = sourceDataURI;
																	var imageNameNew = "GraphicsImg/" + resp;
																	document.getElementById('imageName').value = imageNameNew;
																	Ext.getCmp('shipInfoImageValue').setValue(imageNameNew);
																	document.images['shipInfoImage'].src = "../" + imageNameNew;
																	document.getElementById('imageName').value = imageNameNew;
																}
															}
														}
														function uploadProgress(evt) {}
														function uploadComplete(evt) {}
														function uploadFailed(evt) {
															Ext.Msg.alert("", "There was an error attempting to upload the file.");
														}
														function uploadCanceled(evt) {
															Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
														}
													}
												}, {
													xtype : 'button',
													text : 'Delete',
													style : 'border="0";',
													handler : function (btn) {
														document.images['shipInfoImage'].src = "";
														document.getElementById('shipInfofileUpLoads').value = '';
														Ext.getCmp('shipInfoImageValue').setValue('');
													}
												}
											]
										}
									]
								}, {
									xtype : 'htmleditor',
									name : 'notes',
									height : 400,
									width : 320,
									hideLabel : true,
									labelSeparator : '',
									anchor : '100%',
									enableLinks : false,
									enableLists : false,
									enableSourceEdit : false,
									enableFontSize : false,
									enableFont : false,
									enableColors : false,
									enableAlignments : false,
								}
							]
						}
					]
				}, {
					title : 'Deck Plan',
					items : [{
							xtype : 'panel',
							height : 460,
							frame : true,
							layout : 'table',
							layoutConfig : {
								columns : 2
							},
							autoScroll : true,
							items : [{
									width : 320,
									height : 150,
									autoScroll : true,
									border : false,
									id : 'ship',
									html : 'cabinImage',
									listeners : {
										render : function () {
											debugger;
											this.body.setStyle('background', 'white');
											var grap_image_path = "";
											var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var graphicImagePath = aw.aw.data.shipGraphicImgPath;
											if (typeof graphicImagePath == 'undefined') {
												graphicImagePath = '';
											}
											var imageHotusa = graphicImagePath.substring(0, 4);
											if (Ext.isEmpty(imageHotusa)) {
												this.html = '<center><img border="0" max-width="100%" max-height = "100%" id="shipImageId" name="shipImage"   alt="shipImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
											} else {
												grap_image_path = "../" + graphicImagePath;
												this.html = '<center><img border="0"   id="shipImageId" name="shipImage" src=' + grap_image_path + ' alt="shipImage" > </center> <input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
											}
										}
									}
								}, {
									autoScroll : true,
									id : 'deck',
									html : 'deckImage',
									style : '  padding-left:10px; ',
									border : true,
									width : 320,
									height : 425,
									rowspan : 5,
									listeners : {
										render : function () {
											debugger;
											this.body.setStyle('background', 'white');
											var grap_image_path = "";
											var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var graphicImagePath = aw.aw.data.deckGraphicImgPath;
											if (typeof graphicImagePath == 'undefined') {
												graphicImagePath = '';
											}
											var imageHotusa = graphicImagePath.substring(0, 4);
											if (imageHotusa == 'http') {
												this.html = '<center><img border="0" id="deckImageId" name="deckImage"  alt="deckImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
											} else {
												grap_image_path = "../" + graphicImagePath;
												this.html = '<center><img border="0"  id="deckImageId" name="deckImage" src=' + grap_image_path + ' alt="deckImage"></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
											}
										}
									}
								}, {
									xtype : 'label',
									html : '<b><u>Ship Decks</u></b>'
								}, {
									xtype : 'panel',
									border : false,
									layout : 'table',
									column : 4,
									items : [{
											html : 'Browse',
											border : false,
										}, {
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border=false;"><td width= "75"><input width= "75" name="fileUpLoad" id="shipUpLoads"type="file"  /></td></form>',
											width : 185,
											style : 'padding: 0px 15px 0px 10px; ',
										}, {
											xtype : 'textfield',
											id : 'shipImageValue',
											hidden : true,
											name : 'shipGraphicImgPath',
										}, {
											xtype : 'button',
											text : 'Upload',
											style : 'padding: 0px 00px 0px 10px; ',
											handler : function (btn) {
												debugger;
												Ext.getCmp('ship').html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var im = document.getElementById('shipUpLoads').value
													var file = document.getElementById('shipUpLoads').files[0];
												if (file) {
													var fileSize = 0;
													uploadFile();
												}
												function uploadFile() {
													var fd = new FormData();
													fd.append("image", file);
													var xhr = new XMLHttpRequest();
													xhr.upload.addEventListener("progress", uploadProgress, false);
													xhr.addEventListener("load", uploadComplete, false);
													xhr.addEventListener("error", uploadFailed, false);
													xhr.addEventListener("abort", uploadCanceled, false);
													xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''" + "&imageStorePath=" + sourceDataURI);
													xhr.send(fd);
													xhr.onreadystatechange = function () {
														if (xhr.readyState == 4) {
															var hdrs = xhr.getAllResponseHeaders();
															var resp = xhr.responseText;
															var dataURI = sourceDataURI;
															var imageNameNew = "GraphicsImg/" + resp;
															document.getElementById('imageName').value = imageNameNew;
															var jd = {
																deletePath : false,
																imagePath : document.getElementById('imageName').value
															};
															Ext.Ajax.request({
																url : TDS.env.dataPath + sourceDataURI + "/shipGraphicImage",
																method : 'POST',
																jsonData : jd,
																callback : function (o, s, r) {
																	if (s) {
																		Ext.Msg.alert("", "Graphics Uploaded successfully..");
																		var ro = Ext.util.JSON.decode(r.responseText);
																		Ext.getCmp('shipImageValue').setValue(ro.shipGraphicImgPath);
																		document.images['shipImage'].src = "../" + ro.shipGraphicImgPath;
																		document.getElementById('imageName').value = ro.shipGraphicImgPath;
																	} else {
																		Ext.Msg.alert("", "Error coocured..");
																	}
																},
																scope : this
															});
														}
													}
												}
												function uploadProgress(evt) {}
												function uploadComplete(evt) {}
												function uploadFailed(evt) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.");
												}
												function uploadCanceled(evt) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
												}
											}
										}, {
											xtype : 'button',
											text : 'Delete',
											style : 'padding: 0px 00px 0px 10px; ',
											handler : function (btn) {
												debugger;
												document.images['shipImage'].src = "";
												Ext.getCmp('ship').html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var imName = document.getElementById('imageName').value;
												if (imName) {
													var params = {};
													if (imName)
														params['removefile'] = imName;
													if (imName)
														params['imageStorePath'] = sourceDataURI;
													params['imageName'] = Ext.getCmp('shipImageValue').getValue();
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'fileUpload',
														method : 'POST',
														params : params,
														callback : function (o, s, r) {
															if (s) {
																Ext.Msg.alert("", "Deleted succussefully.");
																document.images['shipImageId'].src = '';
																document.getElementById('imageName').value = '';
																document.getElementById('shipUpLoads').value = '';
																var jd = {
																	deletePath : true,
																	imagePath : document.getElementById('imageName').value
																};
																Ext.Ajax.request({
																	url : TDS.env.dataPath + sourceDataURI + "/shipGraphicImage",
																	method : 'POST',
																	jsonData : jd,
																	scope : this
																});
															} else {
																Ext.Msg.alert("", "Error coocured..");
															}
														}
													});
												}
											}
										}
									]
								}, {
									xtype : 'label',
									html : '<b><u>Decks Plan</u></b>'
								}, {
									xtype : 'panel',
									border : false,
									layout : 'table',
									column : 5,
									items : [{
											html : 'Browse',
											border : false,
										}, {
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="deckUpLoads"type="file"  /></td></form>',
											width : 185,
											style : 'padding: 0px 15px 0px 10px; ',
										}, {
											xtype : 'textfield',
											id : 'deckImageValue',
											hidden : true,
											name : 'deckGraphicImgPath',
										}, {
											xtype : 'button',
											text : 'Upload',
											style : 'padding: 0px 00px 0px 10px; ',
											handler : function (btn) {
												debugger;
												Ext.getCmp('deck').html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var im = document.getElementById('deckUpLoads').value
													var file = document.getElementById('deckUpLoads').files[0];
												if (file) {
													var fileSize = 0;
													uploadFile();
												}
												function uploadFile() {
													var fd = new FormData();
													fd.append("image", file);
													var xhr = new XMLHttpRequest();
													xhr.upload.addEventListener("progress", uploadProgress, false);
													xhr.addEventListener("load", uploadComplete, false);
													xhr.addEventListener("error", uploadFailed, false);
													xhr.addEventListener("abort", uploadCanceled, false);
													xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''" + "&imageStorePath=" + sourceDataURI);
													xhr.send(fd);
													xhr.onreadystatechange = function () {
														if (xhr.readyState == 4) {
															var hdrs = xhr.getAllResponseHeaders();
															var resp = xhr.responseText;
															var dataURI = sourceDataURI;
															var imageNameNew = "GraphicsImg/" + resp;
															document.getElementById('imageName').value = imageNameNew;
															var jd = {
																deletePath : false,
																imagePath : document.getElementById('imageName').value
															};
															Ext.Ajax.request({
																url : TDS.env.dataPath + sourceDataURI + "/deckGraphicImage",
																method : 'POST',
																jsonData : jd,
																callback : function (o, s, r) {
																	if (s) {
																		Ext.Msg.alert("", "Graphics Uploaded successfully..");
																		var ro = Ext.util.JSON.decode(r.responseText);
																		Ext.getCmp('deckImageValue').setValue(ro.deckGraphicImgPath);
																		document.images['deckImage'].src = "../" + ro.deckGraphicImgPath;
																		document.getElementById('imageName').value = ro.deckGraphicImgPath;
																	} else {
																		Ext.Msg.alert("", "Error coocured..");
																	}
																},
																scope : this
															});
														}
													}
												}
												function uploadProgress(evt) {}
												function uploadComplete(evt) {}
												function uploadFailed(evt) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.");
												}
												function uploadCanceled(evt) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
												}
											}
										}, {
											xtype : 'button',
											text : 'Delete',
											style : 'padding: 0px 00px 0px 10px; ',
											handler : function (btn) {
												debugger;
												document.images['deckImage'].src = "";
												Ext.getCmp('deck').html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var imName = document.getElementById('imageName').value;
												if (imName) {
													var params = {};
													if (imName)
														params['removefile'] = imName;
													if (imName)
														params['imageStorePath'] = sourceDataURI;
													params['imageName'] = Ext.getCmp('deckImageValue').getValue();
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'fileUpload',
														method : 'POST',
														params : params,
														callback : function (o, s, r) {
															if (s) {
																Ext.Msg.alert("", "Deleted succussefully.");
																document.images['deckImage'].src = '';
																document.getElementById('imageName').value = '';
																document.getElementById('deckUpLoads').value = '';
																var jd = {
																	deletePath : true,
																	imagePath : document.getElementById('imageName').value
																};
																Ext.Ajax.request({
																	url : TDS.env.dataPath + sourceDataURI + "/deckGraphicImage",
																	method : 'POST',
																	jsonData : jd,
																	scope : this
																});
															} else {
																Ext.Msg.alert("", "Error coocured..");
															}
														}
													});
												}
											}
										}, {
											xtype : 'button',
											text : 'Clear',
											style : 'padding: 0px 00px 0px 10px; ',
											handler : function (btn) {
												document.images['shipImage'].src = "";
												document.getElementById('shipUpLoads').value = '';
												document.getElementById('deckUpLoads').value = '';
												document.images['deckImage'].src = "";
												this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(3).setValue();
												this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(1).setValue();
											}
										}
									]
								}, {
									xtype : 'panel',
									style : 'padding: 0px 0px 0px 50px; ',
									border : false,
									layout : 'column',
									items : [{
											html : 'Date: ',
											border : false,
											style : 'padding: 0px 15px 0px 20px; ',
										}, {
											xtype : 'datefield',
											width : 80,
											name : 'deckPlanDate',
											format : 'dMy D',
											allowBlank : false,
											enableKeyEvents : true,
											showToday : false,
											minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}, {
											html : 'Deck:',
											border : false,
											style : 'padding: 0px 15px 0px 20px; ',
										}, {
											xtype : 'textfield',
											width : 80,
											name : 'deckPlanNo'
										}
									]
								}
							]
						}
					]
				}, {
					title : 'Ports',
					items : [{
							xtype : 'panel',
							layout : 'fit',
							height : 460,
							frame : true,
							items : [{
									xtype : 'panel',
									layout : 'table',
									layoutConfig : {
										columns : 1
									},
									labelWidth : 110,
									border : false,
									style : 'padding: 2px;',
									defaultType : 'textfield',
									items : [{
											xtype : 'panel',
											width : 775,
											height : 150,
											border : true,
											style : 'padding: 2px;',
											defaultType : 'textfield',
											items : [{
													xtype : 'grid',
													alwaysUseCollection : true,
													width : 775,
													height : 150,
													border : false,
													store : new Ext.data.JsonStore({
														url : '',
														id : 'dataURI',
														fields : ['travelDate', 'portName', 'travelDateDisp', 'arrival', 'departure', 'cruiseOfferingURI', 'expiryDate', 'dataURI']
													}),
													sm : new Ext.grid.RowSelectionModel(),
													columns : [{
															header : 'Day/Date',
															dataIndex : 'travelDateDisp',
															width : 100
														}, {
															header : 'Ports',
															dataIndex : 'portName',
															width : 100
														}, {
															header : 'Arr',
															dataIndex : 'arrival',
															width : 100
														}, {
															header : 'Dep',
															dataIndex : 'departure',
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
											xtype : 'panel',
											layout : 'table',
											border : false,
											style : 'padding: 3px;',
											layoutConfig : {
												columns : 7
											},
											defaults : {
												border : false
											},
											items : [{
													width : 100
												}, {
													xtype : 'textfield',
													name : 'travelDate',
													fieldLabel : 'Travel Date',
													format : 'dMy',
													width : 150
												}, {
													html : '',
													height : 30,
													width : 20
												}, {
													width : 80
												}, {
													xtype : 'textfield',
													name : 'departure',
													fieldLabel : 'Departure',
													width : 150
												}, {
													width : 100
												}, {
													xtype : 'button',
													align : 'right',
													minWidth : 80,
													text : 'Add',
												}, {
													width : 100
												}, {
													xtype : 'textfield',
													name : 'portName',
													fieldLabel : 'Ports',
													width : 150
												}, {
													html : '',
													width : 20
												}, {
													width : 80
												}, {
													xtype : 'textfield',
													name : 'arrival Time',
													fieldLabel : 'Arrival',
													width : 150
												}, {
													width : 100
												}, {
													xtype : 'button',
													align : 'right',
													minWidth : 80,
													text : 'Remove',
												}
											]
										}, {
											xtype : 'panel',
											border : false,
											layout : 'table',
											column : 2,
											items : [{
													width : 400,
													height : 225,
													border : true,
													autoScroll : true,
													id : 'portId',
													html : 'portImages',
													listeners : {
														render : function () {
															debugger;
															this.body.setStyle('background', 'white');
															var grap_image_path = "";
															var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
															var graphicImagePath = aw.aw.data.portGraphicImgPath;
															if (typeof graphicImagePath == 'undefined') {
																graphicImagePath = '';
															}
															var imageHotusa = graphicImagePath.substring(0, 4);
															if (Ext.isEmpty(imageHotusa)) {
																this.html = '<center><img border="0"   id="portImageId" name="portImages"   alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
															} else {
																grap_image_path = "../" + graphicImagePath;
																this.html = '<center><img border="0"   id="portImageId" name="portImages" src=' + grap_image_path + ' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
															}
														}
													},
													colspan : 1,
												}, {
													xtype : 'panel',
													border : false,
													layout : 'table',
													style : 'padding: 20px 0px 0px 25px; ',
													column : 3,
													items : [{
															xtype : 'textfield',
															id : 'portImageValue',
															hidden : true,
															name : 'portGraphicImgPath',
														}, {
															html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="portfileUpLoads"type="file"  /></td></form>',
															width : 165,
															style : 'padding: 0px 10px 0px 0px; ',
														}, {
															xtype : 'button',
															text : 'Upload',
															style : 'padding: 0px 10px 0px 15px;',
															handler : function (btn) {
																debugger;
																Ext.getCmp('portId').html = '<img border="0" id="portImageId" name="portImages" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
																var w = this.ownerCt.findParentByType('awesomewindow');
																var sourceDataURI = w.aw.sourceDataURI;
																var im = document.getElementById('portfileUpLoads').value
																	var file = document.getElementById('portfileUpLoads').files[0];
																if (file) {
																	var fileSize = 0;
																	uploadFile();
																}
																function uploadFile() {
																	var fd = new FormData();
																	fd.append("image", file);
																	var xhr = new XMLHttpRequest();
																	xhr.upload.addEventListener("progress", uploadProgress, false);
																	xhr.addEventListener("load", uploadComplete, false);
																	xhr.addEventListener("error", uploadFailed, false);
																	xhr.addEventListener("abort", uploadCanceled, false);
																	xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp('portImageValue').getValue() + "&imageStorePath=" + sourceDataURI);
																	xhr.send(fd);
																	xhr.onreadystatechange = function () {
																		if (xhr.readyState == 4) {
																			var hdrs = xhr.getAllResponseHeaders();
																			var resp = xhr.responseText;
																			var dataURI = sourceDataURI;
																			var imageNameNew = "GraphicsImg/" + resp;
																			document.getElementById('imageName').value = imageNameNew;
																			Ext.getCmp('portImageValue').setValue(imageNameNew);
																			document.images['portImages'].src = "../" + imageNameNew;
																			document.getElementById('imageName').value = imageNameNew;
																		}
																	}
																}
																function uploadProgress(evt) {}
																function uploadComplete(evt) {}
																function uploadFailed(evt) {
																	Ext.Msg.alert("", "There was an error attempting to upload the file.");
																}
																function uploadCanceled(evt) {
																	Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
																}
															}
														}, {
															xtype : 'button',
															text : 'Delete',
															style : 'border="0";',
															handler : function (btn) {
																document.images['portImages'].src = "";
																document.getElementById('portfileUpLoads').value = '';
																Ext.getCmp('portImageValue').setValue('');
															}
														}, ]
												}
											]
										}
									]
								}
							]
						}
					]
				}, {
					title : 'Dinning Times',
					items : [{
							xtype : 'panel',
							layout : 'fit',
							height : 460,
							frame : true,
							items : [{
									xtype : 'panel',
									layout : 'form',
									border : false,
									labelWidth : 90,
									defaults : {
										style : 'padding: 2px 4px 2px 4px;'
									},
									items : [{
											xtype : 'label',
											hidden : true,
											name : 'label1'
										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 10px 20px 10px 20px;',
											items : [{
													xtype : 'checkbox',
													boxLabel : 'First Sitting',
													width : 100,
													name : 'firstSitting',
												}, {
													xtype : 'textfield',
													allowBlank : false,
													name : 'firstSittingTime',
												}, {
													xtype : 'panel',
													layout : 'column',
													border : false,
													style : 'padding: 0px 20px 0px 20px;',
													items : [{
															xtype : 'combo',
															width : 50,
															listWidth : 50,
															name : 'timePeriod1',
															mode : 'local',
															triggerAction : 'all',
															editable : false,
															allowBlank : true,
															valueField : 'id',
															displayField : 'value',
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ['id', 'value'],
																data : [{
																		id : 0,
																		value : ' '
																	}, {
																		id : 1,
																		value : 'AM'
																	}, {
																		id : 2,
																		value : 'PM'
																	}
																]
															}),
														}
													]
												}, {
													xtype : 'numberfield',
													name : 'firstSittingNo',
													width : 50,
													emptyText : 'No'
												}, {
													html : 'Status:',
													border : false,
													style : 'padding: 5px 10px 0px 10px;',
												}, {
													xtype : 'combo',
													width : 100,
													name : 'status1',
													mode : 'local',
													triggerAction : 'all',
													editable : false,
													allowBlank : true,
													valueField : 'id',
													displayField : 'value',
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ['id', 'value'],
														data : [{
																id : ' ',
																value : ' '
															}, {
																id : 'OK',
																value : 'OK'
															}, {
																id : 'FULL',
																value : 'FULL'
															}, {
																id : 'RQ',
																value : 'RQ'
															}
														]
													}),
												}
											]
										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 10px 20px 10px 20px;',
											items : [{
													xtype : 'checkbox',
													boxLabel : 'Second Sitting',
													name : 'secondSitting',
													width : 100,
													id : 'check',
													listeners : {
														check : function (e, checked) {}

													}
												}, {
													xtype : 'textfield',
													allowBlank : false,
													name : 'secondSittingTime',
												}, {
													xtype : 'panel',
													layout : 'column',
													border : false,
													style : 'padding: 0px 20px 0px 20px;',
													items : [{
															xtype : 'combo',
															width : 50,
															listWidth : 50,
															name : 'timePeriod2',
															mode : 'local',
															triggerAction : 'all',
															editable : false,
															allowBlank : true,
															valueField : 'id',
															displayField : 'value',
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ['id', 'value'],
																data : [{
																		id : 0,
																		value : ' '
																	}, {
																		id : 1,
																		value : 'AM'
																	}, {
																		id : 2,
																		value : 'PM'
																	}
																]
															}),
														}
													]
												}, {
													xtype : 'numberfield',
													name : 'secondSittingNo',
													width : 50,
													emptyText : 'No'
												}, {
													html : 'Status:',
													border : false,
													style : 'padding: 5px 10px 0px 10px;',
												}, {
													xtype : 'combo',
													width : 100,
													fieldLabel : 'dd',
													name : 'status2',
													mode : 'local',
													triggerAction : 'all',
													editable : false,
													allowBlank : true,
													valueField : 'id',
													displayField : 'value',
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ['id', 'value'],
														data : [{
																id : ' ',
																value : ' '
															}, {
																id : 'OK',
																value : 'OK'
															}, {
																id : 'FULL',
																value : 'FULL'
															}, {
																id : 'RQ',
																value : 'RQ'
															}
														]
													}),
												}
											]
										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 10px 20px 10px 20px;',
											items : [{
													xtype : 'checkbox',
													boxLabel : 'Third Sitting',
													width : 100,
													name : 'thirdSitting',
												}, {
													xtype : 'textfield',
													allowBlank : false,
													name : 'thirdSittingTime',
												}, {
													xtype : 'panel',
													layout : 'column',
													border : false,
													style : 'padding: 0px 20px 0px 20px;',
													items : [{
															xtype : 'combo',
															width : 50,
															listWidth : 50,
															name : 'timePeriod3',
															mode : 'local',
															triggerAction : 'all',
															editable : false,
															allowBlank : true,
															valueField : 'id',
															displayField : 'value',
															tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
															store : new Ext.data.JsonStore({
																fields : ['id', 'value'],
																data : [{
																		id : 0,
																		value : ' '
																	}, {
																		id : 1,
																		value : 'AM'
																	}, {
																		id : 2,
																		value : 'PM'
																	}
																]
															}),
														}
													]
												}, {
													xtype : 'numberfield',
													name : 'thirdSittingNo',
													width : 50,
													emptyText : 'No'
												}, {
													html : 'Status:',
													border : false,
													style : 'padding: 5px 10px 0px 10px;',
												}, {
													xtype : 'combo',
													width : 100,
													name : 'status3',
													mode : 'local',
													triggerAction : 'all',
													editable : false,
													allowBlank : true,
													valueField : 'id',
													displayField : 'value',
													tpl : '<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
													store : new Ext.data.JsonStore({
														fields : ['id', 'value'],
														data : [{
																id : ' ',
																value : ' '
															}, {
																id : 'OK',
																value : 'OK'
															}, {
																id : 'FULL',
																value : 'FULL'
															}, {
																id : 'RQ',
																value : 'RQ'
															}
														]
													}),
												}
											],
										}, {
											html : '<hr>',
											border : false
										}, {
											xtype : 'label',
											html : '<b><u>Table Sizes</u></b>'
										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 10px 20px 20px 20px;',
											items : [{
													xtype : 'checkbox',
													boxLabel : 'Seats 2',
													width : 100,
													name : 'seat2',
													value : 2,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 4',
													width : 100,
													name : 'seat4',
													value : 4,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 6',
													width : 100,
													name : 'seat6',
													value : 6,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 8',
													width : 100,
													name : 'seat8',
													value : 8,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 10',
													width : 100,
													name : 'seat10',
													value : 10,
													excludeSubmit : true
												}, ]
										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 10px 20px 20px 20px;',
											items : [{
													xtype : 'checkbox',
													boxLabel : 'Seats 12',
													width : 100,
													name : 'seat12',
													value : 12,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 14',
													width : 100,
													name : 'seat14',
													value : 14,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 16',
													width : 100,
													name : 'seat16',
													value : 16,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 18',
													width : 100,
													name : 'seat18',
													value : 18,
													excludeSubmit : true
												}, {
													xtype : 'checkbox',
													boxLabel : 'Seats 20',
													width : 100,
													name : 'seat20',
													value : 20,
													excludeSubmit : true
												}, ]
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
					this.findByType('grid')[0].initialConfig.cruiseURI = this.findParentByType('awesomewindow').aw.sourceDataURI;
				}
			}
		}, ]
}









































































































































