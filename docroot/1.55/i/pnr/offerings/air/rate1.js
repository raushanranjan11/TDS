{
	xtype : 'panel',
	border : false,
	//	width:1200,
	//:'panel',
	requireStores : [{
			dataURI : TDS.env.dataPath + 'rate/classes/collection',
			identifier : 'rate/classes',
			fields : ['name', 'dataURI']
		}, {
			dataURI : TDS.env.dataPath + 'rate/occupancies/collection',
			identifier : 'rate/occupancies',
			fields : ['name', 'dataURI']
		}, {
			dataURI : TDS.env.dataPath + 'rate/pers/collection',
			identifier : 'rate/pers',
			fields : ['name', 'dataURI']
		}
	],
	// findField must be implemented
	findField : function (fieldName) {
		var field = false;
		this.getRateToolbar().items.each(function (item) {
			if (item.name == fieldName) {
				field = item;
				return true;
			}
		});
		return field;
	},
	getRateGrid : function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
	},
	getRateToolbar : function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).getTopToolbar();
	},
	getSelectedRateURI : function () {
		var record = this.getRateGrid().getSelectionModel().getSelected();
		if (typeof record != 'undefined')
			return record.get('dataURI');
		return false;
	},
	getPNRDataURI: function () {
		return this.ownerCt.pnrDataURI;
	},

	focusBookTab : function () {
		var tp = this.findParentByType('tabpanel');

		// set the date selection fields on "Book" tab from local date selection fields
		var bookDatePointerField = tp.getTabField('Book', 'datePointer');
		var bookNumberToReserveField = tp.getTabField('Book', 'numberToReserve');
		var datePointerField = this.findField('datePointer');
		var minimumAvailableField = this.findField('minimumAvailable');
		if (bookDatePointerField && datePointerField)
			bookDatePointerField.setValue(datePointerField.getValue());
		if (bookNumberToReserveField && minimumAvailableField)
			bookNumberToReserveField.setValue(minimumAvailableField.getValue());

		// set the rate
		var bookRateField = tp.getTabField('Book', 'rateURI');
		var selectedRateURI = this.getSelectedRateURI();
		if (bookRateField && selectedRateURI)
			bookRateField.setValue(selectedRateURI);

		// get reference to the book tab (if it has been rendered)
		var bookTab = tp.getTab('Book');
		if (bookTab) {
			// set the "# of <per>" label
			bookTab.setNumberOfRatePerFieldByRateURI(selectedRateURI);
			// submit availability request
			bookTab.submit();
		}

		// display the "Book" tab
		tp.setActiveTab(2);
	},
	items : {
		xtype : 'panel',
		layout : 'column',
		bodyStyle : 'padding: 8px;',
		border : false,
		items : [{
				xtype : 'panel',
				border : false,
				height : 270, //150
				//width: 560,
				//width: 700,
				width : 700, //850
				items : [{
						xtype : 'awesomepanel',
						height : 136,
						layout : 'fit',
						searchURI : '',
						store : new Ext.data.JsonStore({
							url : '',
							id : 'dataURI',
							fields : ['dataURI','pricingAdult','totalFare', 'child','pricingChild','pricingInfant','pricingInfantNoSeat','totalFare','nameString', 'agencyURI', 'code', 'maximumOccupancy', 'groupName', 'inventoryAvailable', 'queueRequestable', 'special', 'available', 'conversionCurrency', 'convertedPricingPriceSell', 'convertedPricingPriceIsNett', 'convertedPricingPriceCommission', 'rateClassURI', 'ratePerURI', 'rateOccupancyURI','noOfInfantSeat','noOfInfantNoSeat','baggageDesc','tax','totalPrices']
						}),
						tbar : [

							'Adult: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 
							{
								xtype : 'label',
								name : 'adultNo',
								enableKeyEvents : true,
								width : 100
							},
							' ',
							'  &nbsp; ',
							'Children(2-11 yrs):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
							{
								xtype : 'label',
								name : 'childNo',
								text : ' '

							},
							' ',
							' ',
							'Infant (<2 yrs):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', {
								xtype : 'label',
								name : 'infantNo',
								text : ' '
							},
							' ',
							' ',
							'', {
								xtype : 'label',
								name : 'infantNoSeat',
								hidden:true,
								text : ' '
							},
							' ',
							' ', 
							{
								xtype : 'datefield',
								name : 'datePointer',
								enableKeyEvents : true,
								showToday : false,
								width : 80,
								format : 'dMy',
								minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime(),
								hidden : true
							}, 
			{
				xtype: 'omnicrementer',
 				name: 'noOfAdult',
					 enableKeyEvents:true,
				hidden : true,
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(14).getValue()+e.ownerCt.items.itemAt(17).getValue()+e.ownerCt.items.itemAt(20).getValue()+e.getValue();
				e.ownerCt.items.itemAt(23).setValue(a);
				}
				}
			},
			 
			{
				xtype: 'omnicrementer',
				name: 'noOfChild',
						hidden : true,
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(11).getValue()+e.ownerCt.items.itemAt(17).getValue()+e.ownerCt.items.itemAt(20).getValue()+e.getValue();
				e.ownerCt.items.itemAt(23).setValue(a);
				}
				}
			},
			 
			{
				xtype: 'omnicrementer',
				name: 'noOfInfantSeat',
						hidden : true,
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(11).getValue()+e.ownerCt.items.itemAt(14).getValue()+e.ownerCt.items.itemAt(20).getValue()+e.getValue();

				e.ownerCt.items.itemAt(23).setValue(a);
				}
				}
			}, 
			{
				xtype: 'omnicrementer',
				name: 'noOfInfantNoSeat',
						hidden : true,
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(11).getValue()+e.ownerCt.items.itemAt(14).getValue()+e.ownerCt.items.itemAt(17).getValue()+e.getValue();

				e.ownerCt.items.itemAt(23).setValue(a);
				}
				}
			}

						],

						items : [{
								xtype : 'grid',
								width : 400,
								border : false,
								enableColumnHide : false,
								enableColumnMove : false,
								enableColumnResize : false,
								enableHdMenu : false,
								viewConfig : {
									forceFit : true
								},
								sm :new Ext.grid.CheckboxSelectionModel(),// new Ext.grid.RowSelectionModel(),
								columns : [
									/*	{header: 'Rate', dataIndex: 'nameString', renderer: function(v, metaData, record) {
									if (record.get('special')) metaData.attr = 'style="color: red;"';
									else if (record.get('agencyURI') != '') metaData.attr = 'style="color: blue;"';
									return v;
									}},{header: 'Code', dataIndex: 'code', width: 60, fixed: true},{header: 'Basis', dataIndex: 'groupName', width: 180, fixed: true},{header: 'Gross Price', dataIndex: 'convertedPricingPriceSell', width: 80, renderer: TDS.util.Price.conversionGrossNettPriceRenderer},{header: 'Status', dataIndex: 'available', width: 80, fixed: true, renderer: function (v, meta, record) {
									//if (v) return 'Available';
									//else return 'Part available';
									return v;
									}}
									 */
									{
										header : "",
										width : 55,
										id : 'chk',
										dataIndex : 'chk',
										editable : false,
										width : 20,
										fixed : true,
										renderer : function (value, metaData, record, rowIdx, colIdx, store) {
											var dataURI = record.get('dataURI');
											return '<input type="radio" id = "rd' + dataURI + '" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">';
										}
									}, {
										header : 'Fare',
										dataIndex : 'nameString',
										//width : 100,
										//fixed : true
									},
										 
									{
										header : 'Adult',
										dataIndex : 'pricingAdult',
										//width : 100,
										//fixed : true,
										//renderer: TDS.util.Price.conversionGrossNettChildPriceRenderer
										 renderer : function (value, metaData, record, rowIdx, colIdx, store) {
										  var priceCurrency, priceSell, priceCommission, priceCommissionPercentage, priceIsNett, priceGross, priceNett, priceNettFormatted, priceFormatted;
										debugger;
											      priceCurrency=record.get('conversionCurrency');
												  priceSell=record.get('pricingAdult');
												  priceCommission=record.get('convertedPricingPriceCommission');
												  priceIsNett=record.get('convertedPricingPriceIsNett');

												  	priceGross = priceSell;

													if (!priceCommission) priceCommission = 0;
													// calculate the commission percentage

													//var r = Math.round((priceCommission * 100) / priceSell);
													var r = ((priceCommission * 100) / priceSell).toFixed(2);
													if (!isNaN(r)) priceCommissionPercentage = r;
													else priceCommissionPercentage = 0;
													// get the nett price
													priceNett = priceSell - priceCommission;
													priceNettFormatted = TDS.util.Price.formatPrice(priceNett, priceCurrency);

												// formatted gross nett price
															//priceFormatted = TDS.util.Price.formatPrice(priceSell, priceCurrency) + '* (' + TDS.util.Price.formatPrice(priceNett, priceCurrency) + ' nett)';

										//	priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency) + ' (' + priceCommissionPercentage + '%)';
											priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency);
										var pricing= {


											'priceCurrency': priceCurrency,


											'priceSell': priceSell,


											'priceGross': priceGross,


											'priceNett': priceNett,


											'priceCommission': priceCommission,


											'priceCommissionPercentage': priceCommissionPercentage,


											'priceIsNett': priceIsNett,


											'priceFormatted': priceFormatted,


											'priceNettFormatted': priceNettFormatted


										};

										if (pricing) return pricing.priceFormatted;


											 
									  }
									}, {
									  header : 'Child',
									  dataIndex : 'pricingChild',
									 // width : 100,
									 // fixed : true,
									  renderer : function (value, metaData, record, rowIdx, colIdx, store) {
										  var priceCurrency, priceSell, priceCommission, priceCommissionPercentage, priceIsNett, priceGross, priceNett, priceNettFormatted, priceFormatted;
														 debugger;
											      priceCurrency=record.get('conversionCurrency');
												  priceSell=record.get('pricingChild');
												  priceCommission=record.get('convertedPricingPriceCommission');
												  priceIsNett=record.get('convertedPricingPriceIsNett');

												  	priceGross = priceSell;

													if (!priceCommission) priceCommission = 0;
													// calculate the commission percentage

													//var r = Math.round((priceCommission * 100) / priceSell);
													var r = ((priceCommission * 100) / priceSell).toFixed(2);
													if (!isNaN(r)) priceCommissionPercentage = r;
													else priceCommissionPercentage = 0;
													// get the nett price
													priceNett = priceSell - priceCommission;
													priceNettFormatted = TDS.util.Price.formatPrice(priceNett, priceCurrency);

												// formatted gross nett price
															//priceFormatted = TDS.util.Price.formatPrice(priceSell, priceCurrency) + '* (' + TDS.util.Price.formatPrice(priceNett, priceCurrency) + ' nett)';

										//	priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency) + ' (' + priceCommissionPercentage + '%)';
											priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency);
										var pricing= {


											'priceCurrency': priceCurrency,


											'priceSell': priceSell,


											'priceGross': priceGross,


											'priceNett': priceNett,


											'priceCommission': priceCommission,


											'priceCommissionPercentage': priceCommissionPercentage,


											'priceIsNett': priceIsNett,


											'priceFormatted': priceFormatted,


											'priceNettFormatted': priceNettFormatted


										};

										if (pricing) return pricing.priceFormatted;


											 
									  }
									 }, {
									  header : 'Infant with seat',
									  dataIndex : 'pricingInfant',
									  //width : 110,
									  //fixed : true,
									     renderer : function (value, metaData, record, rowIdx, colIdx, store) {
									 
										  var priceCurrency, priceSell, priceCommission, priceCommissionPercentage, priceIsNett, priceGross, priceNett, priceNettFormatted, priceFormatted;

											      priceCurrency=record.get('conversionCurrency');
												  priceSell=record.get('pricingInfant');
												  priceCommission=record.get('convertedPricingPriceCommission');
												  priceIsNett=record.get('convertedPricingPriceIsNett');

												  	priceGross = priceSell;

													if (!priceCommission) priceCommission = 0;
													// calculate the commission percentage

													//var r = Math.round((priceCommission * 100) / priceSell);
													var r = ((priceCommission * 100) / priceSell).toFixed(2);
													if (!isNaN(r)) priceCommissionPercentage = r;
													else priceCommissionPercentage = 0;
													// get the nett price
													priceNett = priceSell - priceCommission;
													priceNettFormatted = TDS.util.Price.formatPrice(priceNett, priceCurrency);

												// formatted gross nett price
															//priceFormatted = TDS.util.Price.formatPrice(priceSell, priceCurrency) + '* (' + TDS.util.Price.formatPrice(priceNett, priceCurrency) + ' nett)';

											//priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency) + ' (' + priceCommissionPercentage + '%)';
											priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency);
										var pricing= {


											'priceCurrency': priceCurrency,


											'priceSell': priceSell,


											'priceGross': priceGross,


											'priceNett': priceNett,


											'priceCommission': priceCommission,


											'priceCommissionPercentage': priceCommissionPercentage,


											'priceIsNett': priceIsNett,


											'priceFormatted': priceFormatted,


											'priceNettFormatted': priceNettFormatted


										};

										if (pricing) return pricing.priceFormatted;


											 
									  }
									 }, {
									  header : 'Total Fare',
									  dataIndex : 'totalFare',
									//  width : 80,
									 // fixed : true,
									   renderer : function (value, metaData, record, rowIdx, colIdx, store) {
										  var priceCurrency, priceSell, priceCommission, priceCommissionPercentage, priceIsNett, priceGross, priceNett, priceNettFormatted, priceFormatted;

											      priceCurrency=record.get('conversionCurrency');
												  priceSell=record.get('totalFare');
												  priceCommission=record.get('convertedPricingPriceCommission');
												  priceIsNett=record.get('convertedPricingPriceIsNett');

												  	priceGross = priceSell;

													if (!priceCommission) priceCommission = 0;
													// calculate the commission percentage

													//var r = Math.round((priceCommission * 100) / priceSell);
													var r = ((priceCommission * 100) / priceSell).toFixed(2);
													if (!isNaN(r)) priceCommissionPercentage = r;
													else priceCommissionPercentage = 0;
													// get the nett price
													priceNett = priceSell - priceCommission;
													priceNettFormatted = TDS.util.Price.formatPrice(priceNett, priceCurrency);

												// formatted gross nett price
															//priceFormatted = TDS.util.Price.formatPrice(priceSell, priceCurrency) + '* (' + TDS.util.Price.formatPrice(priceNett, priceCurrency) + ' nett)';

											//priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency) + ' (' + priceCommissionPercentage + '%)';
												priceFormatted = TDS.util.Price.formatPrice(priceGross, priceCurrency);
										var pricing= {


											'priceCurrency': priceCurrency,


											'priceSell': priceSell,


											'priceGross': priceGross,


											'priceNett': priceNett,


											'priceCommission': priceCommission,


											'priceCommissionPercentage': priceCommissionPercentage,


											'priceIsNett': priceIsNett,


											'priceFormatted': priceFormatted,


											'priceNettFormatted': priceNettFormatted


										};

										if (pricing) return pricing.priceFormatted;


											 
									  }
									 },
									//	{header: 'Baggege', dataIndex: 'baggege',   },
									/*{
										header : 'Status',
										dataIndex : 'available',
										width : 60,
										fixed : true
									},*/
								],
								id:'grid',
								listeners : {
									beforerender : function () {
										this.store = this.ownerCt.store;
									},
									render : function () {
										this.getEl().swallowEvent(['columnmove', 'columnresize', 'headerclick', 'click', 'mouseout', 'mouseover', 'rowclick', 'rowmousedown', 'sortchange', 'mouseup', 'mousedown']);
									//	console.log(this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0))
										var ap = this.ownerCt.ownerCt.ownerCt.items.itemAt(1).items.itemAt(0);
										var toolList = this.findParentByType('awesomesearchgrid').getTopToolbar();
									//	toolist.items.itemAt(11);
										var innerGridtoolbar = this.findParentByType('awesomepanel').getTopToolbar();
										innerGridtoolbar.items.itemAt(1).setText(toolList.items.itemAt(11).getValue());
										innerGridtoolbar.items.itemAt(5).setText(toolList.items.itemAt(14).getValue());

										//ap.tpl.overwrite(this.getDetailsPanel().body, Ext.apply({}));

									},
										rowclick:function( me, rowIndex, e){
										var datas = this.getSelectionModel().selections.items[0].data;
									//	console.log(datas);
									var tpls=	this.findParentByType('awesomepanel').findParentByType('panel').findParentByType('panel').items.itemAt(1).items.itemAt(0);
									//tpls.apply(datas )
									//tpls.append(Ext.getBody(), datas);
									tpls.tpl.overwrite(tpls.body, datas);
								

									},
//									rowclick : function (t, ri, e) {
//										e.stopPropagation();
//
//										var record = this.getStore().getAt(ri);
//										if (record == -1)
//											return;
//
//										var data = {
//											rate : record.data
//										};
//
//										var ap = this.ownerCt.findParentByType('ajaxpanel');
//										var tp = this.ownerCt.findParentByType('tabpanel');
//
//										var pnrCurrency = tp.getPNRCurrency();
//
//										var p = this.ownerCt.ownerCt.ownerCt.items.itemAt(1);
//										p.el.mask('', 'x-mask-loading');
//
//										var store = new Ext.data.CollectionStore({
//												autoLoad : true,
//												url : TDS.env.dataPath + ap.baseDataURI + '/searchExtras/collection?rateURI=' + record.get('dataURI') + '&currency=' + pnrCurrency,
//												identifier : ap.baseDataURI + '/searchExtras?rateURI=' + record.get('dataURI') + '&currency=' + pnrCurrency,
//												fields : ['dataURI', 'nameString', 'termsAndConditions', 'groupName', 'required', 'minimumInventoryRequired', 'conversionCurrency', 'convertedPricingPriceSell', 'convertedPricingPriceIsNett', 'convertedPricingPriceCommission']
//											});
//
//										store.on('load', function (t, records) {
//											debugger;
//											data.extras = [];
//											TDS.data[record.get('dataURI')] = []; //ec
//											var rateURI = record.get('dataURI'); //ec
//											for (var i = 0; i < records.length; i++) {
//												records[i].data.rateURI = rateURI; //ec
//												records[i].data.doWork = "if(this.checked){TDS.data['" + rateURI + "'].push(this.value);}else{TDS.data['" + rateURI + "'].pop(this.value);}"; //ec
//												data.extras[i] = records[i].data;
//												Ext.apply(data.extras[i], TDS.util.Price.calculateGrossNettPrice(data.extras[i]));
//											}
//
//											var panelMessage = p.items.itemAt(0);
//											var panelRate = p.items.itemAt(1);
//											var panelButtons = p.items.itemAt(2);
//											var buttonTerms = panelButtons.items.itemAt(1);
//											var buttonBook = panelButtons.items.itemAt(0);
//											var panelExtras = p.items.itemAt(3);
//
//											panelMessage.hide();
//
//											//panelRate.tpl.overwrite(panelRate.body, data.rate);
//
//											// only render the extras if any exist for this selected rate
//											if (data.extras.length > 0) {
//												panelExtras.tpl.overwrite(panelExtras.body, data.extras);
//											}
//											//buttonTerms.show();
//
//											buttonBook.show();
//
//											p.el.unmask();
//										}, this);
//									}
								}
							}
						],
						listeners : {
							toolbarinit : function () {
								var ag = this.ownerCt.findParentByType('awesomesearchgrid');
								var tp = this.ownerCt.findParentByType('tabpanel');

								// default the available date + range selection fields
								var datePointerField = ag.findField('datePointer');
								var adult = ag.findField('noOfAdult');
								var child = ag.findField('noOfChild');
								var infant = ag.findField('noOfInfantSeat');
								var infantNoSeat = ag.findField('noOfInfantNoSeat');
								var localMinimumAvailableField = this.getTopToolbar().items.itemAt(8);
								//var localDatePointerField = this.getTopToolbar().items.itemAt(12);
								var localDatePointerField = this.getTopToolbar().items.itemAt(16);

								if (datePointerField)
									localDatePointerField.setValue(datePointerField.getValue());

								var adultField = this.getTopToolbar().items.itemAt(17);
								adultField.setValue(adult.getValue());
								var childField = this.getTopToolbar().items.itemAt(18);
								childField.setValue(child.getValue());
								var infantField = this.getTopToolbar().items.itemAt(19);
								infantField.setValue(infant.getValue());
								var infantNoSeatField = this.getTopToolbar().items.itemAt(20);
								infantNoSeatField.setValue(infantNoSeat.getValue());



								this.searchURI = TDS.env.dataPath + tp.getDetail('offeringURI') + '/searchRates';

								// set the currency to request for, use the PNR currency
								this.appendQueryParams['currency'] = tp.getPNRCurrency();
								//Ext.getCmp('maximumOccupancyId').setValue(Ext.getCmp('minimumAvailableId').getValue());
								// update shared rate store when records changed in "Rates" listing store
								var rateStore = tp.shared.stores.rates;
								this.getStore().on('load', function (store, records) {
									rateStore.removeAll();
									//Ext.getCmp('maximumOccupancyId').setValue(Ext.getCmp('minimumAvailableId').getValue());
									rateStore.add(records);
								});
							}
						}
					}, {
						xtype : 'panel',
						border : true,
						style : 'padding-top:5px;',
						width : 700,
						height : 100,
						items : [{

								xtype : 'textarea',
								width : 700,
								height : 100,
								autoScroll : true,
								name : 'message',
								value : 'Message',
								anchor : '100%'
							}
						]

					}, {
						border : false,
						html : '<p style="font-size: 9px; padding-top: 4px;">* Rates that appear highlighted red are <b style="color: red;">special</b> rates.</p>'
					}
				]
			}, {
				xtype : 'panel',
				height : 300,
				width : 325,
				border : false,
				bodyStyle : 'padding-left: 8px;',
				layout : 'table',
				layoutConfig : {
					columns : 1
				},
				items : [{
						xtype : 'panel',
						height : 175,
						width : 300,
						border : false,
						tpl : new Ext.XTemplate([
								'<div  >',
								'<table style="width:100%; cellpadding:5px;border: 1px solid grey; border-collapse: collapse;">',
								'<tr>',
								'<td style="border: 1px solid grey; border-collapse: collapse; height:20px "  >Fare</td><td style="border: 1px solid grey; border-collapse: collapse; " > {conversionCurrency} {totalFare} </td></tr>',
								'<tr><td  style="border: 1px solid grey; border-collapse: collapse; height:20px">Taxes</td><td style="border: 1px solid grey; border-collapse: collapse; ">{conversionCurrency} {tax}</td></tr>',
								'<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px">Airline Surcharge</td><td style="border: 1px solid grey; border-collapse: collapse; "></td></tr>',
								'<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px">Fees</td><td></td style="border: 1px solid grey; border-collapse: collapse; "></tr>',
								'<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px ">Extra</td><td style="border: 1px solid grey; border-collapse: collapse; "></td></tr>',
								'<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px">Seats</td><td style="border: 1px solid grey; border-collapse: collapse; "></td></tr>',
								'<tr><td style="border: 1px solid grey; border-collapse: collapse; height:20px ">Total</td><td style="border: 1px solid grey; border-collapse: collapse; "> {conversionCurrency} {totalPrices}</td></tr>',
								'</table></div>'
							]),
						listeners : {
							render : function () {
								this.tpl.overwrite(this.body, data);
							}
						}

					}, {
						xtype : 'panel',
						defaults : {
							style : 'padding:25px;',
							//width:150
						},
						border : false,
						height : 100,
						layout : 'table',
						layoutConfig : {
							columns : 3
						},
						 
						items : [{
								xtype : 'button',
								text : 'Terms',
								handler : function () {
									debugger;
								var selectedGridRow = this.findParentByType('awesomesearchgrid').getSelectionModel().selections.items[0].data;
								var terms=selectedGridRow.marketText;
								var termsBox = this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);
								termsBox.setValue(terms);
								}
							}, {
								xtype : 'button',
								text : 'Baggage',
								handler : function () {
									debugger;
								var rateGrid = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items[0].data;
								var baggageDesc=rateGrid.baggageDesc;
								var termsBox = this.ownerCt.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0);
								termsBox.setValue(baggageDesc);
								}
							}, {
								xtype : 'formredbutton',
								text : 'Select',
								autoFill : true,
							//	bodyStyle : "width : 100px;",
							  	handler : function () {
									debugger;
								var fp = this.ownerCt.ownerCt.ownerCt.findParentByType('panel');
								var selectedGridRow = this.findParentByType('awesomesearchgrid').getSelectionModel().selections.items[0].data;
								var selectedStore=[];
								selectedStore.push(selectedGridRow);
								var terms=selectedGridRow.marketText;
								var rate = this.findParentByType('awesomesearchgrid').config.y;
								var selectedRow = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items[0].id;
								rate.push(selectedRow);
								var rateGrid = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0);
								var currency=  this.ownerCt.findParentByType('tabpanel').getPNRCurrency();
							 
									TDS.window.setWindow({
										title : 'Flight Confirmation',
										interfaceURI : 'pnr/offerings/air/flight.js',
										postDataURI: fp.getPNRDataURI() + '/componentsbook',
										data:selectedStore,
										dataURI: {
														pnr: fp.getPNRDataURI(),
														rateOffering: rate,
														terms:terms
												},
										data: {
												priceCurrency: currency,
											},
 
									 buttonOK : 'End Transaction', 
									 callback : {
											fn : function (s, data, responseData) {
											debugger;
											var rg=rateGrid;
											rg.getView().refresh();
											rg.getSelectionModel().clearSelections();
											var a=this;
											var fgrid=TDS.window.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
											var stor=fgrid.getStore();
										    var fgridData=stor.data.items;
										    rate.length=0;
											fgridData.forEach(function(record){
												var a=record;
												console.log(record.data.dataURI);
												   rate.push(record.data.dataURI)
											 })
												if (s) { 
												  var pnrPanel = this.ownerCt.findParentByType('pnrpanel');
												  var pnrPanelPnrView = pnrPanel.getViewByName('pnr');
												  // check if the PNR view "PNR" panel is rendered, refresh the PNR grid
												  if (pnrPanelPnrView) {
												   // get the PNR grid and force a refresh
												   var g = pnrPanelPnrView.findByType('awesomegrid')[0];
												   g.submitQuery(true);
												  }
												   pnrPanel.focusView('pnrView', 'pnr'); 
												}
											 },
											scope : this
										}
									}); 
								}
							}
						]

					}
				]

			}, {

				xtype : 'panel',
				border : true,
				//style:'padding-top:5px;',
				width : 250,
				height : 220,
				items : [{

						xtype : 'textarea',
						width : 250,
						height : 220,
						readOnly:true,
						autoScroll : true,
						name : 'message',
						value : 'Inclusion',
						anchor : '100%'
					}
				]
			},

			/*{
			xtype: 'panel',
			//	cls: 'x-tds-rate-table',
			columnWidth: 1,
			layout: 'fit',
			/*		layoutConfig: {
			columns: 2
			},
			height: 150,
			width:100,
			bodyStyle: 'padding-left: 8px;',
			hideBorders: true,
			border: true,
			items: [{
			/* information message
			html: '<p>Select a rate to view more details and available extras.</p>',
			colspan: 2  */
			/*	colspan: 2,
			tpl:
			new Ext.XTemplate([
			'<p>ram</p>',
			'<div  style="height: 100px; overflow: auto; margin-top: 8px;">',
			'<table >',
			'<tr>',
			'<td >Fare</td>', //ec
			'<td >Fare</td>',
			'</tr>',
			'<tr>',
			'<td>Extra</td>',
			'<td>Extra</td>',
			'</tr>',
			'</table>',
			'</div>',
			])

			//colspan: 2,
			tpl: new Ext.XTemplate([
			'<div style="height: 100px; overflow: auto; margin-top: 8px;">',
			'<table class="x-tds-dataview" style="width: 70%;">',
			'<thead>',
			'<tr>',
			'<th style="width: 20px; padding-bottom: 2px;"></th>', //ec
			'<th style="padding-bottom: 2px;">Extra</th>',
			'<th style="width: 90px; padding-bottom: 2px;">Min. required</th>',
			'<th style="width: 120px; padding-bottom: 2px;">Pricing</th>',
			'</tr>',
			'</thead>',
			'</table></div>'
			]),



			},
		{
			/* rate information
			colspan: 2,
			hidden: true,
			tpl: new Ext.XTemplate([
			'<p>{groupName}</p>'
			])
			},
		{
			xtype: 'panel',
			layout: 'table',
			width: 160,
			colspan: 2,
			layoutConfig: {
			columns: 2
			},
			defaults: {
			style: 'padding-left: 2px;',
			minWidth: 80
			},
			items: [

		{
			//cellCls: 'x-tds-rate-button',
			xtype: 'button',
			//text: 'Book',
			text: 'Select',
			hidden: true,
			handler: function () {
			var p = this.ownerCt.ownerCt.ownerCt.ownerCt;
			p.focusBookTab();
			}
			},
		{
			//cellCls: 'x-tds-rate-button',
			xtype: 'button',
			text: 'Fare Rule',
			hidden: true,
			handler: function () {
			var p = this.ownerCt.ownerCt.ownerCt.ownerCt;
			var dataURI = p.getSelectedRateURI();
			if (!dataURI) return;
			var tp = this.ownerCt.ownerCt.findParentByType('tabpanel');
			var rateDatePointerField = tp.getTabField('Rate', 'datePointer');
			// pop dialog with terms and conditions
			TDS.window.setWindow({
			title: 'Fare Rule text',
			interfaceURI: 'popup/terms.js',
			sourceDataURI: dataURI,
			data:{
			offeringData:tp.ownerCt.ownerCt.rowRecordData,
			departureDate:rateDatePointerField.getRawValue()
			},
			buttonOK: false,
			buttonCancel: 'Close'
			});
			}
			}
			]
			},
		{
			/* available extras
			colspan: 2,
			tpl: new Ext.XTemplate([
			'<div style="height: 100px; overflow: auto; margin-top: 8px;">',
			'<table class="x-tds-dataview" style="width: 100%;">',
			'<thead>',
			'<tr>',
			'<th style="width: 20px; padding-bottom: 2px;"></th>', //ec
			'<th style="padding-bottom: 2px;">Extra</th>',
			'<th style="width: 90px; padding-bottom: 2px;">Min. required</th>',
			'<th style="width: 120px; padding-bottom: 2px;">Pricing</th>',
			'</tr>',
			'</thead>',
			'<tpl for=".">',
			'<tr class="x-tds-dataview-extras-item">',
			'<td ><input type="checkbox" id = "{rateURI}{dataURI}" value="{dataURI}" {[values.required ?  "disabled checked" : "" ]} onclick={doWork}></td>',  //ec
			'<td style="width: 140px;{[values.required ? " color: gray;" : "" ]}">{nameString}</td>',
			'<td>{minimumInventoryRequired}</td>',
			'<td>{priceFormatted}</td>',
			'</tr>',
			'</tpl>',
			'</table>',
			'</div>',
			'<hr style="height: 1px; border: none; border-top: 1px solid #eee;"/>',
			'<p style="font-size: 9px;">* Extras that appear greyed out are <b>mandatory</b> extras on this rate.</p>'
			])
			}
			]
			}

			 */
		]
	}
} 	  


  












































































































