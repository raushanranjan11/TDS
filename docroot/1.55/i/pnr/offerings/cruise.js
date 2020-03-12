{
	xtype: 'panel',
	layout: Ext.isIE ? 'fit' : '',
	autoScroll: true,
	bodyStyle: 'padding: 8px;',
	requireStores: [{
			dataURI: TDS.env.dataPath + 'cruise/offerings/cruiselines/collection',
			identifier: 'cruiseline',
			fields: ['name', 'dataURI']
		}, {
			dataURI: TDS.env.dataPath + 'cruise/offerings/ship/collection',
			identifier: 'ship',
			fields: ['name', 'dataURI']
		}, {
			dataURI: TDS.env.dataPath + 'cruise/offerings/cruiseType/collection',
			identifier: 'cruiseType',
			fields: ['name', 'dataURI']
		}
	],
	items: {
		xtype: 'awesomegrid',
		id: 'cruiseAwesomeGrid',
		pinnable: true,
		enableRowExpander: true,
		allowPagination: true,
		getDealsRecords: function (deals) {
			var me = this;
			Ext.Ajax.request({
				url: TDS.env.dataPath + 'search/cruises/deals/collection',
				method: 'GET',
				params: {
					cruiseType: '',
					shipNameLike: '',
					cruiselines: '',
					datePointerOut: '',
					embark: '',
					deals: deals,
					cruiseFactory: true
				},
				data: {},
				success: function (response, request) {
					var grid = me
						var ro = Ext.decode(response.responseText);
					var collection = ro['search/cruises'];
					if (typeof collection == 'undefined')
						return;
					var sd = [];
					for (var i = 0; i < collection.length; i++) {
						ro[collection[i]].dataURI = collection[i];
						sd.push(ro[collection[i]]);
					}
					grid.getStore().loadData(sd);
				}
			});
		},
		tbar: [' ', '-', ' ', {
				xtype: 'redbutton',
				text: '<b>Search</b>',
				minWidth: 120,
				listeners: {
					click: function (me) {
						var grid = me.findParentByType('awesomegrid');
						var gridRowSelection = me.findParentByType('awesomegrid').getSelectionModel().getSelections()[0];
						if (typeof(gridRowSelection) !== 'undefined') {
							TDS.window.setWindow({
								title: 'Cruise Search',
								interfaceURI: 'pnr/offerings/cruise/searchCruise.js',
								dataURI: {},
								sourceDataObj: grid,
								data: {
									'aa': gridRowSelection.data
								},
								buttonOK: false,
								buttonCancel: 'Close',
								params: {},
								callback: {
									fn: function (s, data, responseData) {
										if (s) {}
										scope: this
									}
								},
								listeners: {
									render: function () {}
								}
							});
						} else {
							TDS.window.setWindow({
								title: 'Cruise Search',
								interfaceURI: 'pnr/offerings/cruise/searchCruise.js',
								dataURI: {},
								data: {},
								params: {},
								sourceDataObj: grid,
								callback: {
									fn: function (s, data, responseData) {
										if (s) {}
										scope: this
									}
								},
								listeners: {
									render: function () {}
								}
							});
						}
					}
				}
			}, {
				xtype: 'hidden',
				name: 'adult',
				value: 0
			}, {
				xtype: 'hidden',
				name: 'child',
				value: 0
			}, {
				xtype: 'hidden',
				name: 'infant',
				value: 0
			}, {
				xtype: 'hidden',
				name: 'cons',
				value: 0
			}, {
				xtype: 'hidden',
				name: 'access',
				value: 0
			}, {
				xtype: 'hidden',
				name: 'room1',
				config: {
					rooms: ''
				},
				value: 0
			}, ' ', '->', {
				xtype: 'hidden',
				name: 'destination',
				value: 0
			}, {
				xtype: 'datefield',
				name: 'datePointer',
				hidden: true,
				format: 'F Y',
				value: 0
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>CUG</b></span>-Close User Group',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>CO</b></span>-Cruise Only',
				handler: function (me) {
					var deal = me.getText();
				}
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>AD</b></span>-Advertised Deals',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>DD</b></span>-Discount Deals',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				xtype: 'button',
				style: 'left:200px;',
				text: '<span style="color:green"><b>HD</b></span>-Hot Deals',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>SD</b></span>-Specials Deals',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				xtype: 'button',
				text: '<span style="color:green"><b>PRO</b></span>-Promo ',
				handler: function (me) {
					var deal = me.getText();
					me.ownerCt.ownerCt.getDealsRecords(deal);
				}
			}, {
				text: 'Help',
				xtype: 'redbutton',
				cls: 'x-button-blue',
				overCls: 'x-button-blue-over',
				opened: false,
				toggle: false,
				handler: function () {
					TDS.needHelp('Search View Help', '23');
					if (!this.opened) {
						this.opened = true;
						TDS.needHelp('Search View Help', '23');
					} else {
						this.opened = false;
						TDS.helpwindow.hide();
					}
				}
			}
		],
		store: new Ext.data.JsonStore({
			url: '',
			id: 'dataURI',
			fields: ['pinned', 'dataURI', 'nameString', 'destination', 'code', 'supplierURI', 'shipName', 'locationToString', 'locationFromString', 
				'conversionCurrency', 'convertedPricingPriceSell', 'descriptionString', 'primaryHref', 'addressString', 'duration', 'cruiseClassURI', 
				'termsAndConditions', 'noPrePaymentRequired', 'pytInFull', 'fullPytPriorDays', 'depositWithin', 'balancePriorToDeparture', 'depositWithinDays', 
				'depositPerOption', 'Nights', 'balancePriorToDepartureDay', 'graphicImgPath', 'arrivalTime', 'departureTime', 'cruisePortsDisplay', 'arrivalDate',
				'departureDate', 'supplierDetails', 'pricingPriceIsNett', 'pricingPriceIsNett2', 'pricingPriceIsNett3', 'pricingPriceIsNett4', 'rackRatePriceSell',
				'rackRatePriceSell2', 'rackRatePriceSell3', 'rackRatePriceSell4', 'departureDateText', 'rackRatePriceSell5', 'pricingPriceIsNett5', 'interiorDesc',
				'oceanDesc', 'specialDesc', 'suiteDesc', 'balconyDesc', 'cruiseShipName', 'shipGraphicImage', 'embarkPorts', 'balconyPrice', 'oceanPrice', 
				'suitPrice', 'interiorPrice', 'destinationNames', 'currency', 'sailingdate', 'cruiseLine', 'supplierDetails', 'cruiseType', 'cruiseName',
				'shipName', 'embarkport', 'balcony', 'ocean', 'interior', 'suite', 'destinationName', 'hotDeals', 'advancedDeals', 'specialdeal', 'cruiseNumber',
				'embarkPorts','di_embarkPorts']
		}),
		sm: new Ext.grid.RowSelectionModel(),
		cm: new Ext.grid.ColumnModel([{
					header: 'Supplier',
					dataIndex: 'supplierURI',
					width: 100,
					fixed: true,
					sortable: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						metadata.attr = 'ext:qtip="' + record.get('supplierDetails').replace(/\"/g, '\'') + '"';
						return TDS.util.Format.displayResourceConciseName(value);
					}
				}, {
					header: 'Destination',
					dataIndex: 'destinationName',
					width: 100,
					fixed: true,
					sortable: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if(record.get('destinationName') != ""){
						metadata.attr = 'ext:qtip="' + record.get('destinationName') + '"';
						return record.get('destinationName');
						}else{
							metadata.attr = 'ext:qtip="' + record.get('destination') + '"';
							return record.get('destination');

						}
						//return value;
					}
				}, {
					header: 'Ship',
					dataIndex: 'shipName',
					width: 110,
					fixed: true,
					sortable: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if(record.get('shipName') != ""){
						metadata.attr = 'ext:qtip="' + record.get('shipName') + '"';
						return value;
						}else{
							metadata.attr = 'ext:qtip="' + record.get('cruiseShipName') + '"';
							return record.get('cruiseShipName');

						}
						
					}
				}, {
					header: 'Name',
					dataIndex: 'cruiseName',
					sortable: true,
					width: 200,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if(record.get('cruiseName') != ""){
						metadata.attr = 'ext:qtip="' + record.get('cruiseName') + '"';
						return value;
						
						}else{
							metadata.attr = 'ext:qtip="' + record.get('nameString') + '"';
							return record.get('nameString');

						}
					}
				}, {
					header: 'Number',
					dataIndex: 'cruiseNumber',
					width: 50,
					fixed: true,
					sortable: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						metadata.attr = 'ext:qtip="' + record.get('cruiseNumber') + '"';
						return value;
					}
				}, {
					header: 'Dep Port',
					dataIndex: 'embarkport',
					sortable: true,
					width: 100,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						metadata.attr = 'ext:qtip="' + record.get('embarkport') + '"';
						if(value == ''){
						return record.get('embarkPorts');
						}
						return value;
					}
				}, {
					header: 'Date From',
					dataIndex: 'sailingdate',
					sortable: true,
					width: 70,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						
						if(record.get('sailingdate') != ""){
						//metadata.attr = 'ext:qtip="' + record.get('cruiseName') + '"';
						//return value;
						metadata.attr = 'ext:qtip="' + record.get('sailingdate') + '"';
						var dateFrom = TDS.util.Format.dateSpecial(record.get('sailingdate'), TDS.env.dateDayFormatDisplay);
						return dateFrom;
						
						}else{
						//	console.log('manual-----------------')
							metadata.attr = 'ext:qtip="' + record.get('departureDate') + '"';
							//return record.get('nameString');record.set('idEntreprise', vidEntreprise);
							var dateFrom = TDS.util.Format.dateSpecial(record.get('departureDate'), TDS.env.dateDayFormatDisplay);
							//console.log(record.get('departureDate'));

							//record.set('sailingdate', dateFrom);
							rowIndex = store.indexOf(record);
							//console.log(store);
							//console.log(rowIndex);
							var aa = record.get('departureDate');
							//record.set('sailingdate', aa);
							var record1 = store.getAt(rowIndex);
						//	console.log(record1);
							record1.beginEdit();
record1.set("sailingdate", aa);
//record1.endEdit();
record1.dirty=false;

						return dateFrom;

						}
					}
				}, {
					header: 'Date To',
					sortable: true,
						dataIndex:'arrivalDate',
					width: 60,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {

						var arrivalDate = TDS.util.Format.dateSpecial(value, TDS.env.dateDayFormatDisplay);
					return arrivalDate;
					}
				}, {
					header: 'Duration',
					dataIndex: 'duration',
					width: 60,
					fixed: true,
					sortable: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						metadata.attr = 'ext:qtip="' + record.get('duration') + '"';
						return value;
					}
				}, {
					header: '<span style="color:#A52A2A"><b>CUG</b></span>',
					dataIndex: 'cug',
					sortable: true,
					width: 45,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if (record.get('cug')) {
							metadata.attr = 'ext:qtip="' + record.get('cug') + '"';
							return '<span style="color:#A52A2A; font-weight: bold;">' + "CUG" + "</span>";
						}
					}
				}, {
					header: '<span style="color:blue"><b>CO</b></span>',
					dataIndex: 'cruiseOnly',
					sortable: true,
					width: 30,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						return '<span style="color:blue; font-weight: bold;">' + "CO" + "</span>";
					}
				}, {
					header: '<span style="color:green"><b>AD</b></span>',
					dataIndex: 'advancedDeals',
					sortable: true,
					width: 35,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if (record.get('advancedDeals')) {
							metadata.attr = 'ext:qtip="' + record.get('advancedDeals') + '"';
							return '<span style="color:green; font-weight: bold;">' + "AD" + "</span>";
						}
					}
				}, {
					header: '<span style="color:#FFA500"><b>DD</b></span>',
					dataIndex: 'ds',
					sortable: true,
					width: 30,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if (record.get('ds')) {
							metadata.attr = 'ext:qtip="' + record.get('ds') + '"';
							return '<span style="color:#FFA500; font-weight: bold;">' + "DD" + "</span>";
						}
					}
				}, {
					header: '<span style="color:red"><b>HD</b></span>',
					dataIndex: 'hotDeals',
					sortable: true,
					width: 30,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if (record.get('hotDeals')) {
							metadata.attr = 'ext:qtip="' + record.get('hotDeals') + '"';
							return '<span style="color:red; font-weight: bold;">' + "HD" + "</span>";
						}
					}
				}, {
					header: '<span style="color:#2E8B57"><b>SD</b></span>',
					dataIndex: 'specialdeal',
					sortable: true,
					width: 30,
					fixed: true,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
						if (record.get('specialdeal')) {
							metadata.attr = 'ext:qtip="' + record.get('specialdeal') + '"';
							return '<span style="color:#2E8B57; font-weight: bold;">' + "SD" + "</span>";
						}
					}
				}, {
					header: '<span style="color:#9ACD32"><b>PRO</b></span>',
					dataIndex: 'pro',
					sortable: true,
					fixed: true,
					width: 35,
					renderer: function (value, metadata, record, rowIndex, colIndex, store) {
					//	metadata.attr = 'ext:qtip="' + record.get('duration') + '"';
						return value;
					}
				}, {
					header: '<span style="color:red"><b>Interior</b></span>  ',
					dataIndex: 'interior',
					width: 100,
					fixed: true,
					sortable: true,
				}, {
					header: '<span style="color:red"><b>Ocean View </b></span> ',
					dataIndex: 'ocean',
					width: 100,
					fixed: true,
					sortable: true,
				}, {
					header: '<span style="color:red"><b>Balcony </b></span> ',
					dataIndex: 'balcony',
					width: 100,
					fixed: true,
					sortable: true,
				}, {
					header: '<span style="color:red"><b>Suite </b></span> ',
					dataIndex: 'suite',
					width: 100,
					fixed: true,
					sortable: true,
				}
			]),
		viewConfig: {},
		getRowInterface: function (record, rowIndex, store) {
			return 'pnr/offerings/cruise/layout.js';
		},
		listeners: {
			sessioninit: function () {},
			cellclick: function (me, rowIndex, columnIndex, e) {
				console.log(columnIndex);
				if (columnIndex == 3) {
					var record = me.getStore().getAt(rowIndex);
					var dataURI = record.get('dataURI');
					TDS.window.setWindow({
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
					});
				}
				if (columnIndex == 9) {
					var record = me.getStore().getAt(rowIndex);
					var dataURI = record.get('dataURI');
					TDS.window.setWindow({
						title: 'Promotional Details',
						interfaceURI: 'pnr/offerings/cruise/pro.js',
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
					});
				}
			},
		}
	}
}
















































































