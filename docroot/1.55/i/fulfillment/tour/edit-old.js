{
	xtype: 'form',
	border: false,
	//markDataDirtyOnLoad: true,
	requireStores: [
 		{
			dataURI: TDS.env.dataPath + 'rate/classes/collection',
			identifier: 'rate/classes',
			fields: ['name', 'dataURI']
		},
		{
			dataURI: TDS.env.dataPath + 'rate/occupancies/collection',
			identifier: 'rate/occupancies',
			fields: ['name', 'dataURI']
		}
	],
	beforeSubmit: function (jd) {
		//debugger;
		var w = this.ownerCt;
 		jd.selectedPassengerURI = w.getDataURI('passenger');
		return jd;
	},
	afterDataLoad: function (jd) {
		this.initRadioSelection(jd.status);
		this.initInventory();
	},
	getDetailTab: function () {
		return this.items.itemAt(0).items.itemAt(0);
	},
	items: [
		{
			xtype: 'tabpanel',
			border: false,
			defaults: {
				border: false
			},
			
			activeTab: 0,
			layoutOnTabChange: true, // and... important
			height: 330,
			defaults: {
				bodyStyle: 'padding: 8px;'
			},
			items: [
				// details tab
				{
					title: 'Details',
					border: false,
					bodyStyle: 'padding: 8px;',
					items: {
						xtype: 'panel',
						labelWidth: 110,
						
						border: false,
						items: [{
							border: false,
							tpl: new Ext.XTemplate([
								'<div style="height:134px; ">',
								'<table  style="width: 100%;" border=0 cellpadding = 1 cellspacing=0  >',
								'<tr height="20px"><td width="75px"><b>Component:</b></td><td>{componentName}</td></tr>',
								'<tr height="20px"><td><b>Date:</b></td><td>{bookedDate}</td></tr>',
								'<tr height="20px"><td><b>Pax Type:</b></td><td>{paxType}</td></tr>',
								'<tr height="20px"><td><b>Room Type:</b></td><td>{roomType}</td></tr>',
								'<tr height="20px"><td><b>Price:</b></td><td>{price}</td></tr>',
								'<tr height="20px"><td><b>Expire date:</b></td><td>{expireDate}</td></tr>',
								'</table>',
								'</div>'
							]),
							listeners: {
								render: function () {	
									 // debugger;
									 var bb= TDS.data.getStore({
										dataURI: TDS.env.dataPath + 'rate/occupancies/collection',
										identifier: 'rate/occupancies',
										fields: ['name', 'dataURI']
									}) ;
									var aa =  TDS.data.getStore({
										dataURI: TDS.env.dataPath + 'rate/classes/collection',
										identifier: 'rate/classes',
										fields: ['name', 'dataURI']
									});
									var w = this.ownerCt.ownerCt.findParentByType('awesomewindow');
									var b = w.aw.data;
									var pricing = TDS.util.Price.calculateGrossNettPrice(b, true);
									 var e =TDS.util.Format.displayResourceName(b.rateClassURI);
                                    var a = 0;
	                                if (pricing) a = pricing.priceFormatted;
									this.ownerCt.ownerCt.ownerCt.ownerCt.rateData = {paxType: TDS.util.Format.displayResourceName(b.rateClassURI),
												roomType: TDS.util.Format.displayResourceName(b.rateOccupancyURI),
												price: pricing.priceFormatted};
									//alert(w.getParam("componentName"));
//									Ext.Ajax.request({
//										url: TDS.env.dataPath + w.getConfigValue('destinationDataURI') + '/inventories/collection',
//										method: 'GET',
//										callback: function (o, s, r) {
//											debugger;
											this.tpl.overwrite(this.body, {
												component: "",
												bookedDate: "",
												paxType: "",//TDS.util.Format.displayResourceName(b.rateClassURI),
												roomType: "",//TDS.util.Format.displayResourceName(b.rateOccupancyURI),
												price: "",//pricing.priceFormatted,
												expireDate:""
											});	
											this.ownerCt.ownerCt.rateDetails = {	componentName: w.getParam("componentName"),
																					paxType: TDS.util.Format.displayResourceName(b.rateClassURI),
																					roomType: TDS.util.Format.displayResourceName(b.rateOccupancyURI),
																					price: pricing.priceFormatted
																				}
//									}
//									});
								}
							}
						},
							{
								xtype: 'fieldset',
								layout: 'table',
								layoutConfig: {
									columns: 1
								},
								autoHeight: true,
								defaults: {
									xtype: 'radio',
									name: 'status',
									forceSubmit: true,
									hideLabel: true
								},
								items: [
									{
										boxLabel: 'Leave as-is.',
										checked: true,
										inputValue: 'doNothing'
									},
									{
										boxLabel: 'Confirm component',
										disabled: true,
										inputValue: TDS.data.componentStatus.STATUS_CONFIRMED
									},
									{
										boxLabel: 'Confirm a passenger',
										disabled: true,
										inputValue: TDS.data.componentStatus.STATUS_CONFIRM_PASSENGER
									},
									{
										boxLabel: 'Confirm passenger of waitlist',
										disabled: true,
 										inputValue: TDS.data.componentStatus.STATUS_CONFIRM_PASSENGER 
									},
									{
										boxLabel: 'Cancel a passenger',
										disabled: true,
										hidden: true,
										inputValue: TDS.data.componentStatus.STATUS_CANCEL_PASSENGER
									},
									{
										boxLabel: 'Cancel a component',
										disabled: true,
										inputValue: TDS.data.componentStatus.STATUS_CANCELLED
									}
								]
							}
						]
					}
				},
				// extras
				{
					title: 'Extras',
					items: [
						{
							xtype: 'grid',
							height: 160,
							width: 380,
							extraTpl: new Ext.XTemplate([
								'Name: {nameString}<br/>',
								'Category: {[TDS.util.Format.displayResourceName(values.extraCategoryURI)]}<br/>',
								'Required: {[TDS.util.Format.booleanRenderer(values.required)]}<br/>',
								'Min. required: {minimumInventoryRequired}<br/>'
							]),
							enableHdMenu: false,
							stores: {},
							store: new Ext.data.JsonStore({
								url: '',
								fields: ['dataURI', 'selectedDataURI', 'name','nameString', 'extraCategoryURI', 'minimumInventoryRequired', 'required', 'pricingPriceCurrency', 'pricingPriceCommission', 'pricingPriceIsNett', 'pricingPriceSell', 'quantity', 'pricingPriceMarkup']
							}),
							getData: function () {
								var w = this.ownerCt.findParentByType('awesomewindow');
								var s = this.getStore().getModifiedRecords();
								for (var i = 0, d = []; i < s.length; i++) 
								{
									var rdu = s[i].get('selectedDataURI');

									// set the selected extra data
									var selectedExtraData = {
										extraURI: s[i].get('dataURI'),
										quantity: s[i].get('quantity')
									};

									// check if a markup amount has been supplied, set the price markup field
									if (s[i].get('pricingPriceMarkup')) selectedExtraData['pricingPriceMarkup'] = s[i].get('pricingPriceMarkup');

									d.push({
										method: rdu ? 'PUT' : 'POST',
										//destinationDataURI: rdu ? TDS.env.dataPath + rdu + '?currency=' + 'AUD' : TDS.env.dataPath + this.baseDataURI + '/extras?currency=' + 'AUD',
										 destinationDataURI: rdu ? TDS.env.dataPath + rdu + '?currency=' + w.getParam('priceCurrency') : TDS.env.dataPath + this.baseDataURI + '/extras?currency=' + w.getParam('priceCurrency'),
										data: selectedExtraData
									});
								}
								return {
									data: d
								};
							},
							columns: [
								{header: 'Name', dataIndex: 'nameString', width: 150},
								{header: 'Price', dataIndex: 'convertedPricingPriceSell', width: 100, fixed: true, renderer: TDS.util.Price.conversionGrossNettPriceRenderer},
								{header: 'Markup ($)', dataIndex: 'pricingPriceMarkup', width: 70, fixed: true},//, editor: new Ext.form.TextField()},
								{header: 'Quantity', width: 60, fixed: true, dataIndex: 'quantity'}//, editor: new Ext.form.OmnicrementerField()}
							],
							sm: new Ext.grid.RowSelectionModel(),
							viewConfig: {
								forceFit: true,
								getRowClass: function (record, rowIndex, rowParams, store) {
									if (record.get('required') == true) return 'x-tds-disabled-row';
								}
							},
							initSelectionStore: function () {
							//	debugger;
								var store = this.getStore();
								var records = [];

								this.stores.rateExtras.each(function (record) {
								//	debugger;
									var d = {};
									Ext.apply(d, record.data);

									// check if this extra has been selected
									var ri = this.stores.selectedRateExtras.find('extraURI', record.get('dataURI'));
									if (ri !== -1) {
										// retrieve the dataURI, quantity and markup (only if nett priced) for the component selected extra
										var r = this.stores.selectedRateExtras.getAt(ri);
										Ext.apply(d, {
											selectedDataURI: r.get('dataURI'),
											quantity: r.get('quantity'),
											pricingPriceMarkup: r.get('pricingPriceIsNett') ? r.get('pricingPriceCommission') : ''
										});
									}
									// defaults
									else {
										Ext.apply(d, {
											selectedDataURI: '',
											quantity: '',
											pricingPriceMarkup: ''
										});
									}

									var record = new store.recordType(d);
									records[records.length] = record;

								}, this);

								store.add(records);
								store.sort('required', 'DESC');

								// remove loading mask
								this.lm.hide();
							},
							listeners: {
								beforeedit: function (e) {
									// check if the pricing markup field is "attempting" to be edited
									if (e.field == 'pricingPriceMarkup') {
										// check if the extra is a "Gross" priced extra, dont allow edit
										if (!e.record.get('convertedPricingPriceIsNett')) e.cancel = true;
									}
								},
								render: function() {
									var sm = this.getSelectionModel();
									sm.on('beforerowselect', function (sm, rowIndex, keep, record) {
										var dp = this.ownerCt.items.itemAt(1);
										this.extraTpl.overwrite(dp.body, record.data);
										if (record.get('required') == true) {
											return false;
										}
									}, this);


//debugger;
									var f = this.ownerCt.findParentByType('form');
									var w = this.ownerCt.findParentByType('awesomewindow');

									w.registerItem(this.id);
									this.baseDataURI = w.getConfigValue('destinationDataURI');

									// setup loading mask
									this.lm = new Ext.LoadMask(this.el, {msg: ''});
									 var loaded = 0;
									this.lm.show();
										// for(var i=0;i<w.getParam('rateList').length;i++)	{
											 
									// retrieve the "rate" extras
									this.stores.rateExtras = new Ext.data.CollectionStore({
										autoLoad: true,
										identifier:  w.getDataURI('offering') + '/searchExtras?rateURI=' + w.getConfigValue('sourceDataURI')  + '&currency=' + w.getParam('priceCurrency'),
										//identifier: w.getDataURI('offering') + '/searchExtras?rateURI=' + f.inventoryData['rateURI'] + '&currency=' + w.getParam('priceCurrency'),
										url: TDS.env.dataPath + w.getDataURI('offering') + '/searchExtras?rateURI=' + w.getConfigValue('sourceDataURI')  + '&currency=' + w.getParam('priceCurrency'),
										//url: TDS.env.dataPath + w.getDataURI('offering') + '/searchExtras/collection?rateURI=' + f.inventoryData['rateURI'] + '&currency=' + w.getParam('priceCurrency'),
										fields: ['dataURI', 'name', 'extraCategoryURI', 'minimumInventoryRequired', 'required', 'conversionCurrency', 'convertedPricingPriceCommission', 'convertedPricingPriceIsNett', 'convertedPricingPriceSell'],
										listeners: {
											load: {
												fn: function () {
													loaded++;
													 //alert("--1--"+loaded);
													if (loaded == 2) this.initSelectionStore();

													this.lm.hide();
												},
												scope: this
											}
										}
									});
									//	 }
									// retrieve the "selected" component extras
									this.stores.selectedRateExtras = new Ext.data.CollectionStore({
										autoLoad: true,
										//identifier: this.baseDataURI + '/extras',
										identifier: this.baseDataURI + '/extras',
										url: TDS.env.dataPath + this.baseDataURI + '/extras/collection',
										fields: ['extraURI', 'quantity', 'pricingPriceCurrency', 'pricingPriceCommission', 'pricingPriceIsNett', 'pricingPriceSell'],
										listeners: {
											load: {
												fn: function () {
													loaded++;
													// alert("--2--"+loaded);
													if (loaded == 2) this.initSelectionStore();
													
													this.lm.hide();
												},
												scope: this
											}
										}
									});
										 //}
									//this.lm.hide();
								}
							}
						},
						{
							xtype: 'panel',
							style: 'margin-top: 4px;',
							bodyStyle: {
								background: '#ffffff',
								padding: '8px'
							},
							html: 'Please select an extra to see additional details.'
						}
					]
				}
			]
		}
	],
	initInventory: function () {
		// retrieve the inventory data
		var w = this.ownerCt;
		w.el.mask('', 'x-mask-loading');
		Ext.Ajax.request({
			url: TDS.env.dataPath + w.getConfigValue('destinationDataURI') + '/inventories/collection',
			method: 'GET',
			callback: function (o, s, r) {

				if (s) {
					try {
						var ro = Ext.decode(r.responseText);
					} catch (e) {}
					if (ro) {
						var dataURI = w.getConfigValue('destinationDataURI');
						// debugger;
						// process the inventory collection data
						var quantity = 0, rateURI, dates = [];
						//var inventories = ro[dataURI + '/inventories'];
						var inventoriesRo = ro['component/inventory/collection'];
 								var inventories = inventoriesRo[dataURI + '/inventories'];

						var bookedDate,expireDate;
						for (var i = 0; i < inventories.length; i++) {
							var inventory = inventoriesRo[inventories[i]];
							bookedDate = inventory.date;
							expireDate = inventory.componentPaybyDate;
							if (!rateURI) rateURI = inventory.rateURI;
							quantity += inventory.quantity;
							dates[dates.length] = inventory.date;
						}

						var ratesRo= ro['component/rate/collection/'];

									var roRateList= ratesRo['component/rate/collection/list'];
									var rate = ratesRo[roRateList[0]];

						this.inventoryData = {
							'bookedDate': bookedDate,
							'expireDate': expireDate 
						};

						// inititate the details tab
						this.initDetails();
					}
				}
				w.el.unmask();
			},
			scope: this
		});
	},
	initDetails: function () {
		 //debugger;
		var bb= TDS.data.getStore({
			dataURI: TDS.env.dataPath + 'rate/occupancies/collection',
			identifier: 'rate/occupancies',
			fields: ['name', 'dataURI']
		}) ;
		var aa =  TDS.data.getStore({
									dataURI: TDS.env.dataPath + 'rate/classes/collection',
									identifier: 'rate/classes',
									fields: ['name', 'dataURI']
								});
		var w = this.ownerCt;
		var f = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
		var a = this.inventoryData
		var b = this.getDetailTab().rateDetails;
		b.paxType=TDS.util.Format.displayResourceName(b.paxType);
		b.roomType=TDS.util.Format.displayResourceName(b.roomType);
		b.bookedDate = TDS.util.Format.dateSpecial(a.bookedDate, TDS.env.dateFormatDisplay);
		b.expireDate = TDS.util.Format.dateSpecial(a.expireDate, TDS.env.dateFormatDisplay);
 		
		f.tpl.overwrite(f.body, Ext.apply(b,  b));
		 
	},
	initRadioSelection: function (status) {
		// radio action selections
		// debugger;
		 status = this.ownerCt.initialConfig.params.status;
		var fs = this.items.itemAt(0).items.itemAt(0).items.itemAt(0).findByType('fieldset')[0];
		var radioLeave = fs.items.itemAt(0);
		var radioConfirmComponent = fs.items.itemAt(1);
		var radioConfirmPassenger = fs.items.itemAt(2);
		var radioConfirmPassengerWL = fs.items.itemAt(3);
		var radioCancelPassenger = fs.items.itemAt(4);
		var radioCancelComponent = fs.items.itemAt(5);
		radioCancelPassenger.hide(true);

//		radioConfirmComponent.disabled(true);
//		  radioConfirmPassenger.disabled(true);
//		  radioConfirmPassengerWL.disabled(true);
//		  radioCancelPassenger.disabled(true);
//		  radioCancelComponent.disabled(true);

		var w = this.ownerCt;
		var selectedStatus = w.getParam('status');
//		fs.items.each(function (item) {
//			(item.inputValue == selectedStatus) ? item.setValue(true) : item.setValue(false);
//		});

		// check if component in state of "Held", show confirm and cancel buttons
		if (status.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase() || status.toLowerCase() == TDS.data.componentStatus.STATUS_CANCELLED.toLowerCase()) {
			//radioConfirm.show();
			//radioCancel.show();
		}
		// check if component in state of "Requested", show accept and reject buttons
		else if (status.toLowerCase() == TDS.data.componentStatus.STATUS_PART_CONFIRMED.toLowerCase()) {
			 radioConfirmComponent.enable(true);
//		  radioConfirmPassenger.show();
 		  radioConfirmPassengerWL.enable(true);
 		 // radioCancelPassenger.enable(true);
 		  radioCancelComponent.enable(true);
		}
		// check if component in state of "Confirmed", show only cancel button
		else if (status.toLowerCase() == TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()) {
			// radioCancelPassenger.enable(true);
		  radioCancelComponent.enable(true);
		}
		// check if component in state of "Cancel requested", show only cancel button
		else if (status.toLowerCase() == TDS.data.componentStatus.STATUS_CANCEL_REQUESTED.toLowerCase()) {
			radioCancelComponent.enable(true);
		}
		// check if component in state of "Cancel requested", show only cancel button
		else if (status.toLowerCase() == TDS.data.componentStatus.STATUS_REJECTED.toLowerCase()) {
			radioCancelComponent.enable(true);
		}
		// check if component in state of "Cancel requested", show only cancel button
		else if (status.toLowerCase() == TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()) {
		  radioConfirmComponent.enable(true);
 //		  radioConfirmPassenger.show();
 //		  radioConfirmPassengerWL.enable(true);
 		 // radioCancelPassenger.enable(true);
 		  radioCancelComponent.enable(true);
		}
		radioConfirmComponent.setValue(false);
		radioConfirmPassenger.setValue(false);
		radioConfirmPassengerWL.setValue(false);
		radioCancelPassenger.setValue(false);
		radioCancelComponent.setValue(false);

//		   radioConfirmComponent.show();
//		  radioConfirmPassenger.show();
//		  radioConfirmPassengerWL.show();
//		  radioCancelPassenger.show();
//		  radioCancelComponent.show();
radioLeave.setValue(true);

	}
}




















































































































































































































































































































































































































































































































































































































































































































































