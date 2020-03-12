{
	xtype : 'form',
	border : false,
	//	height: 450,
	width : 650,
	markDataDirtyOnLoad : true,

	beforeSubmit : function (jd) {
		// debugger;
		var noOfPassengesId = Ext.getCmp('noOfPassengesId').getValue();
		var noOfquantity = Ext.getCmp('noOfquantityId').getValue();
		var g = this.getPassengerGrid();
		var totalPaxSelected = g.getSelectionModel().getCount();
		var selectedPassengers = g.selModel.selections.items;
		var w = this.ownerCt;
		w.clearValidation();
		var reservedAvailable = this.ownerCt.initialConfig.params.reservedAvailable;
		var noOfPassToWaiting = 0;
		if (noOfPassengesId > reservedAvailable && reservedAvailable != -1)
			noOfPassToWaiting = noOfPassengesId - reservedAvailable;

		var arr = [];
		var noOfPer = [];
		noOfPer = noOfquantity.split("$");
		if (noOfPer[0] == "") {
			noOfPer.remove(noOfPer[0]);
		}
		var rateSelectedAgainstPassenger = false;
		var checkRateAgainstPassengerSelection = false;
		var noOfPersons = 0;
		var rateNoOfPassArr = [];

		var timeheldDate = new Date();

		for (var i = 0; i < jd.rateMultipleSelectedRateURI.length; i++) {
			rateSelectedAgainstPassenger = false;
			var passCount = 0;
			var b = {};
			b.rateURI = jd.rateMultipleSelectedRateURI[i].id;
			b.noOfPass = document.getElementById("no" + jd.rateMultipleSelectedRateURI[i].data.dataURI).value;
			rateNoOfPassArr[i] = b;
			noOfPersons = document.getElementById("no" + jd.rateMultipleSelectedRateURI[i].data.dataURI).value;
			arr[i] = jd.rateMultipleSelectedRateURI[i].id;
			for (var j = 0; j < selectedPassengers.length; j++) {
				if (jd.rateMultipleSelectedRateURI.length == 1) {
					selectedPassengers[j].data.rateURI = jd.rateMultipleSelectedRateURI[i].id;
					passCount++;
					rateSelectedAgainstPassenger = true;
				} else {
					if (selectedPassengers[j].data.rateURI === jd.rateMultipleSelectedRateURI[i].data.nameString || selectedPassengers[j].data.rateURI === jd.rateMultipleSelectedRateURI[i].id) {
						selectedPassengers[j].data.rateURI = jd.rateMultipleSelectedRateURI[i].id;
						passCount++;
						rateSelectedAgainstPassenger = true;
					}
				}
			}
			if (!rateSelectedAgainstPassenger || passCount != noOfPersons) {
				if (passCount != noOfPersons)
					checkRateAgainstPassengerSelection = true;
				break;
			}
		}
		if (rateSelectedAgainstPassenger && !checkRateAgainstPassengerSelection) {
			var sp = [];
			for (var j = 0; j < selectedPassengers.length; j++) {
				var a = {};
				a.rateURI = selectedPassengers[j].data.rateURI;
				a.passengerURI = selectedPassengers[j].id;
				sp[j] = a;
			}
			this.validateBooking(jd);
			if (noOfPassengesId == totalPaxSelected) {
				try {

					var jd = {
						submitDataAsParams : true,
						paramData : {
							action : jd.action,
							currency : jd.priceCurrency
						},
						data : {
							rateURI : jd.rateURI,
							rateMultipleSelectedRateURI : arr,
							noOfPer : noOfPer,
							offeringURI : jd.offeringURI,
							inventoryAmount : this.getDetail('inventoryAmount'),
							dateFrom : jd.dateFrom,
							duration : 1,
							noOfPerPerRate : rateNoOfPassArr,
							tourTypeURI : Ext.getCmp('ID_OF_tourTypeURI').getRawValue(),
							noOfPassToWaiting : noOfPassToWaiting,
							selectedNonMandatoryExtras : TDS.data[w.getParam('rateId')], //ec
							passengerURIs : sp,
							timeheldDate : timeheldDate,
							releaseDate : jd.action == 'request' ? jd.releaseDate : ''
						}
					};
					return jd;
				} catch (e) {
					// display validation message
					w.showValidation(e);
					return false;
				}
			} else {
				Ext.Msg.alert('Alert', "No.of person and Passenger should be match.");
			}
		} else {
			if (checkRateAgainstPassengerSelection)
				Ext.Msg.alert('Alert', 'select no. of passengers not matching against the rate.');
			else
				Ext.Msg.alert('Alert', 'select rate against the passenger');
		}
	},
	validateBooking : function (jd) {
		var g = this.getPassengerGrid();

		var numberOfPaxRequired = this.getDetail('numberOfPaxRequired');
		var totalPaxSelected = g.getSelectionModel().getCount();
		// check if total passengers selected meets the required number for this booking, throw error
		if (totalPaxSelected < numberOfPaxRequired) {
			throw 'You must select ' + (numberOfPaxRequired - totalPaxSelected) + ' passengers to complete this booking.';
		}
		// check if a booking action has been selected
		if (!jd.action) {
			throw 'You must select an available booking option to proceed.';
		}
	},

	initBooking : function () {
		var w = this.ownerCt;
		var numberToReserveRequested = w.getParam('numberToReserveRequested');
		var rateClassURI = w.getParam('rateClassURI');
		var ratePerURI = w.getParam('ratePerURI');
		var rateOccupancyURI = w.getParam('rateOccupancyURI');

		var rateClassRecord = TDS.data.findRecordByResourceDataURI(rateClassURI);
		var ratePerRecord = TDS.data.findRecordByResourceDataURI(ratePerURI);
		var rateOccupancyRecord = TDS.data.findRecordByResourceDataURI(rateOccupancyURI);

		var ratePerType = ratePerRecord.get('name');
		var rateOccupancyType = rateOccupancyRecord.get('name');
		var rateClassType = rateClassRecord.get('name');

		var ratePriceCurrency = w.getParam('priceCurrency');
		var ratePriceUnit = w.getParam('priceSell');
		var ratePriceTotal = ratePriceUnit * numberToReserveRequested;

		// determine the type of PAX needed - fuzzy logic
		var paxType;
		if (rateClassType == TDS.data.rateClassType.ADULT) {
			paxType = TDS.data.passengerTypeLookup.ADULT;
		} else if (rateClassType == TDS.data.rateClassType.CHILD) {
			paxType = TDS.data.passengerTypeLookup.CHILD;
		} else if (rateClassType == TDS.data.rateClassType.CONCESSION) {
			paxType = TDS.data.passengerTypeLookup.CONCESSION;
		}

		// store the details, used within this interface
		this.setDetail({
			'inventoryAmount' : numberToReserveRequested,
			'paxType' : paxType,
			'numberOfPaxRequired' : 1,
			'ratePerType' : ratePerType,
			'ratePriceUnit' : ratePriceUnit,
			'ratePriceTotal' : ratePriceTotal,
			'ratePriceCurrency' : ratePriceCurrency
		});
	},

	initPassengerSelection : function () {
		var w = this.ownerCt;
		var g = this.getPassengerGrid();

		var paxType = this.getDetail('paxType');
		var numberOfPaxRequired = this.getDetail('numberOfPaxRequired');

		// add "load" listener to passenger grid store to run pre-selection logic
		g.getStore().on('load', function () {
			var numberOfPaxSelected = g.preselect(paxType, numberOfPaxRequired);
		}, this);
	},

	getPassengerTab : function () {
		return this.items.itemAt(1).items.itemAt(1);
	},

	getPassengerGrid : function () {
		return this.getPassengerTab().items.itemAt(1).items.itemAt(0);
	},
	// shared details
	shared : {
		details : {}
	},
	setDetail : function (key, value) {
		if (typeof key == 'object') {
			for (var i in key) {
				this.shared.details[i] = key[i];
			}
		} else
			this.shared.details[key] = value;
	},
	getDetail : function (key) {
		return this.shared.details[key];
	},
	// end shared details
	listeners : {
		render : function () {
			var aw = this.ownerCt;
			var timerLabel = this.items.itemAt(0);
			var t = Ext.TimerMgr.lookup(aw.getDataURI('offering') + '/availability');
			if (t)
				timerLabel.setTimer(t);
			// initialise booking details
			this.initBooking();
			// initialise the radio buttons
			this.initRadioButtons();
			// initialise the passenger selection
			this.initPassengerSelection();
		}
	},
	items : [{
			xtype : 'timerlabel',
			text : 'This availability will expire in...',
			listeners : {
				timerexpire : function (t) {
					this.setText('Your availability has expired.');
				},
				timerrefresh : function (t, text) {
					this.setText('This availability will expire in... <b>' + text + '</b>.', false);
				}
			}
		}, {
			xtype : 'tabpanel',
			border : false,
			activeTab : 0,
			layoutOnTabChange : true, // important
			deferredRender : false,
			height : 450,
			autoScroll : true,
			autoDestroy : false,
			width : 650,
			defaults : {
				bodyStyle : 'padding: 6px 4px 6px 4px;'
			},
			items : [
				// details tab
				{
					title : 'Details',
					//height: 350,
					autoScroll : true,
					items : {
						xtype : 'panel',
						layout : 'form',
						labelWidth : 80,
						border : false,
						items : [
							// offering name
							{
								xtype : 'panel',
								style : 'padding: 0;',
								border : false,
								layout : 'table',
								layoutConfig : {
									columns : 2
								},
								defaults : {
									height : 20,
									border : false
								},
								items : [{
										html : '<u><b>Tour Name:</b></u>',
										width : Ext.isIE ? 88 : 85
									}, {
										listeners : {
											render : function () {
												// set offering name
												var w = this.ownerCt.findParentByType('awesomewindow');
												this.html = '<b>' + w.getParam('offeringName');
											}
										}
									}
								]
							},
							//Date
							{
								xtype : 'panel',
								style : 'padding: 0;',
								border : false,
								layout : 'table',
								format : 'dMy',
								layoutConfig : {
									columns : 2
								},
								defaults : {
									height : 20,
									border : false
								},
								items : [{
										html : '<u><b>Dep. Date:</b></u>',
										width : Ext.isIE ? 88 : 85
									}, {
										width : Ext.isIE ? 438 : 435,
										listeners : {
											render : function () {
												var w = this.ownerCt.findParentByType('awesomewindow');

												var d1 = new Date(w.getData('dateFrom'));
												var departureLocation = w.getData('departureLocation');
												this.html = '<b>' + d1.format(TDS.env.dateFormatDisplay) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Departs:</u></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + departureLocation;
											}
										}
									}, {
										html : '<u><b>Duration:</b></u>',
										width : Ext.isIE ? 78 : 75
									}, {
										width : Ext.isIE ? 438 : 435,
										listeners : {
											render : function () {
												var w = this.ownerCt.findParentByType('awesomewindow');
												this.html = '<b>' + w.getData('duration');
											}
										}
									}
								]
							}, {
								xtype : 'panel',
								style : 'padding: 0; margin-top: 4px;',
								border : false,
								layout : 'table',
								layoutConfig : {
									columns : 1
								},
								defaults : {
									border : false
								},
								items : [{
										/* available extras */
										colspan : 2,
										name : 'EXTRA_RATE_DISP_AREA',
										tpl : new Ext.XTemplate([
												'<br><table class="x-tds-dataview" border=1; style="width: 90%; margin-left: 3px;">',
												'<thead>',
												'<tr style="background-color: #d0def0;">',
												'<th style="padding-bottom: 2px; width: 325px;">Extra</th>',
												'<th style="width: 85px; padding-bottom: 2px;">Min. required</th>',
												'<th style="width: 75px; padding-bottom: 2px;">Pricing</th>',
												//'<th style="width: 70px; padding-bottom: 2px;">Markup</th>',
												//'<th style="width: 35px; padding-bottom: 2px;">Basis</th>',
												'<th style="width: 30px; padding-bottom: 2px;">Comm</th>',
												'</tr>',
												'</thead>',
												'<tpl for=".">',
												'<tr >',
												'<td style=" {[values.required ? " color: gray;" : "" ]}">&nbsp;{nameString}</td>',
												'<td ALIGN=CENTER >{minimumInventoryRequired}</td>',
												'<td ALIGN=RIGHT >{priceCurrency} {[values.priceIsNett ? values.priceNett:values.priceGross]}</td>',
												//'<td ALIGN=RIGHT >{[(values.priceIsNett? (values.priceCurrency+" "+values.markUp):"")]}</td>',
												//'<td ALIGN=CENTER >{[values.priceIsNett ? "Nett":"Gross"]}</td>',
												'<td ALIGN=CENTER >{priceCommissionPercentage}{[(values.priceCommissionPercentage || values.priceCommissionPercentage == 0 )? "%":""]}</td>',
												'</tr>',
												'</tpl>',
												'</table>' //,
												//'</div>',
												//'<hr style="height: 1px; border: none; border-top: 1px solid #eee;"/>',
												//'<p style="font-size: 9px;">* Extras that appear greyed out are <b>mandatory</b> extras on this rate.</p>'
											])
									}

								]
							}, {
								xtype : 'panel',
								style : 'padding: 0;',
								border : false,
								layout : 'table',
								//width:00,
								layoutConfig : {
									columns : 1
								},
								defaults : {
									border : false
								},
								items : [{
										html : '<br><u><b>Booked Rates</b></u>',
										//width: Ext.isIE ? 88 : 85
										width : 300
									} //,

								]
							},
							// rate name
							{
								xtype : 'panel',
								style : 'padding: 0; margin-top: 4px;',
								border : false,
								layout : 'table',
								layoutConfig : {
									columns : 2
								},
								defaults : {
									border : false
								},
								items : [{
										xtype : 'numberfield',
										id : 'noOfPassengesId',
										name : 'noOfPassenges',
										hidden : true
									}, {
										xtype : 'textfield',
										id : 'noOfquantityId',
										name : 'noOfquantity',
										hidden : true
									},
									{
										width : 620,
										listeners : {
											render : function () {
												var rateBody = '<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 0 cellspacing=0  >';
												/*	rateBody+='<thead><tr style="background-color: #d0def0;" class="x-tds-dataview-item">';
												rateBody+='<th style="padding: 2px; width: 40%;">Rate</th>';
												rateBody+='<th style="padding: 2px; width: 15%;">Room Type</th>';
												rateBody+='<th style="padding: 2px; width: 3%;">Pax.</th>';
												rateBody+='<th style="padding: 2px; width: 12%;">Pax. Type</th>';
												rateBody+='<th style="padding: 2px; width: 15%;">Price</th>';
												rateBody+='<th style="padding: 2px; width: 10%;">Markup</th>';
												rateBody+='<th style="padding: 2px; width: 10%;">Per</th>';
												rateBody+='<th style="padding: 2px; width: 10%;">Basis</th>';
												rateBody+='<th style="padding: 2px; width: 5%;">Comm</th>';
												rateBody+='</tr></thead>';*/

												rateBody += '<thead><tr style="background-color: #d0def0;" class="x-tds-dataview-item">';
												rateBody += '<th style="padding: 2px; width: 35%;">Rate</th>';
												rateBody += '<th style="padding: 2px; width: 20%;">Room Type</th>';
												//rateBody+='<th style="padding: 2px; width: 3%;">Pax.</th>';
												rateBody += '<th style="padding: 2px; width: 10%;">Pax Type</th>';
												rateBody += '<th style="padding: 2px; width: 5%;">No</th>';
												//	rateBody+='<th style="padding: 2px; width: 15%;">Gross/Net</th>';
												rateBody += '<th style="padding: 2px; width: 15%;">Gross Price</th>';
												//	rateBody+='<th style="padding: 2px; width: 10%;">Markup</th>';
												//	rateBody+='<th style="padding: 2px; width: 10%;">Per</th>';
												//	rateBody+='<th style="padding: 2px; width: 10%;">Basis</th>';
												//	rateBody+='<th style="padding: 2px; width: 5%;">Comm</th>';
												rateBody += '</tr></thead>';

												var priceCommission = "";
												var w = this.ownerCt.findParentByType('awesomewindow');
												var fp = this.ownerCt.findParentByType('form');

												var rateMultipleSelectedRateURI = w.getParam('rateMultipleSelectedRateURI');

												var count = rateMultipleSelectedRateURI.length - 1;
												var flag_new;
												var inventoryGross_new;
												var priceCommissionPercentage_new;
												var temp = "";
												var totalTemp = 0;
												var noOfPersonsTemp = 0;
												var noOfquantity = "";

												var rateStr = TDS.data.selectedRates;
												rateStr.removeAll();
												rateStr.data.addAll(rateMultipleSelectedRateURI);
												for (var i = 0; i < rateMultipleSelectedRateURI.length; i++) {

													var noOfPersons = document.getElementById("no" + rateMultipleSelectedRateURI[i].data.dataURI).value;
													noOfPersonsTemp = parseInt(noOfPersonsTemp) + parseInt(noOfPersons);
													noOfquantity += "$" + noOfPersons;

													var nameString = rateMultipleSelectedRateURI[i].data.nameString;//json
													//var groupName=rateMultipleSelectedRateURI[i].json.groupName;
													var groupName = rateMultipleSelectedRateURI[i].data.groupName;//json
													console.log('********************');
													console.log(rateMultipleSelectedRateURI);
													var a = groupName.split(", ");
													var perArr = a[0].split("per ");
													//var perArr = per.split("per ");
													var per = perArr[1];
													var roomType = a[1];
													var conversionCurrency = rateMultipleSelectedRateURI[i].data.conversionCurrency;
													var convertedPricingPriceSell = rateMultipleSelectedRateURI[i].data.convertedPricingPriceSell;
													//alert("convertedPricingPriceSell-----"+convertedPricingPriceSell);
													var convertedPricingPriceCommission = rateMultipleSelectedRateURI[i].data.convertedPricingPriceCommission;
													//alert("convertedPricingPriceCommission-----"+convertedPricingPriceCommission);
													var convertedPricingPriceIsNett = rateMultipleSelectedRateURI[i].data.convertedPricingPriceIsNett;
													if (convertedPricingPriceIsNett) {

														flag_new = "Nett";
													} else {

														flag_new = "Gross";

													}

													if (typeof priceCommissionPercentage_new == 'undefined' || priceCommissionPercentage_new == "") {

														priceCommissionPercentage_new = 0;

													}
													if (typeof convertedPricingPriceSell == 'undefined' || convertedPricingPriceSell == "") {
														convertedPricingPriceSell = 0;

													}

													//var rateClassURI = rateMultipleSelectedRateURI[i].json.rateClassURI;
													var rateClassURI = rateMultipleSelectedRateURI[i].data.rateClassURI;
													var rateClassRecord = TDS.data.findRecordByResourceDataURI(rateClassURI);
													var rateClassType = rateClassRecord.get('name');

													var pricing = TDS.util.Price.calculateFixedGrossNettPrice({
															'pricingPriceCurrency' : conversionCurrency,
															'pricingPriceSell' : convertedPricingPriceSell,
															'pricingPriceCommission' : convertedPricingPriceCommission,
															'pricingPriceIsNett' : convertedPricingPriceIsNett
														});

													if (noOfPersons != "" && noOfPersons != 0) {
														/*	rateBody+="<tr>";
														rateBody+='<td  >'+nameString+'</td>',
														rateBody+='<td  >'+roomType+'</td>',
														rateBody+='<td ALIGN=CENTER>'+noOfPersons+'</td>',
														rateBody+='<td ALIGN=CENTER>'+rateClassType+'</td>',
														rateBody+='<td ALIGN=RIGHT>'+conversionCurrency+convertedPricingPriceSell.toFixed(2)+'</td>',
														rateBody+='<td ALIGN=RIGHT>'+(pricing.priceIsNett? (conversionCurrency+(convertedPricingPriceSell*TDS.env.user.agencyDefaultComm()/100).toFixed(2)):"")+'</td>',
														rateBody+='<td >'+per+'</td>',
														rateBody+='<td  ALIGN=CENTER>'+flag_new+'</td>',
														rateBody+='<td ALIGN=CENTER>'+(pricing.priceIsNett? "":pricing.priceCommissionPercentage)+'</td>',
														rateBody+="</tr>";
														 */
														//pricing.priceIsNett? (conversionCurrency+(convertedPricingPriceSell).toFixed(2)):(conversionCurrency+(convertedPricingPriceSell*TDS.env.user.agencyDefaultComm()/100).toFixed(2));
														rateBody += "<tr>";
														rateBody += '<td  >' + nameString + '</td>',
														rateBody += '<td  >' + roomType + '</td>',
														rateBody += '<td ALIGN=CENTER>' + rateClassType + '</td>',
														rateBody += '<td ALIGN=CENTER>' + noOfPersons + '</td>',
														//	rateBody+='<td  ALIGN=CENTER>'+flag_new+'</td>',
														rateBody += '<td ALIGN=RIGHT>' + (conversionCurrency + (convertedPricingPriceSell).toFixed(2)) + '</td>',
														rateBody += "</tr>";
													}

													//temp=temp+"<table border=01 width=150% cellspacing=3><tr><td><b>"+noOfPersons+'&nbsp;X </td><td><b>'+groupName+'</td><td>'+conversionCurrency +'</td><td>'+convertedPricingPriceSell.toFixed(2)+'</td><td>('+flag_new+')<br></td></tr><table>';

												}
												rateBody += "</table></div>";
												Ext.getCmp('noOfPassengesId').setValue(noOfPersonsTemp);
												Ext.getCmp('noOfquantityId').setValue(noOfquantity);
												this.html = rateBody;

											}
										}
									}
								]
							}, {
								xtype : 'panel',
								style : 'padding: 0; margin-top: 4px;',
								border : false,
								layout : 'table',
								layoutConfig : {
									columns : 2
								},
								defaults : {
									border : false
								},
								items : [
									{
										html : '<u><b>Total:</b></u>',
										width : Ext.isIE ? 88 : 40
									}, {
										xtype : 'textfield',
										readOnly : true,
										style : 'border:#FFFFFF; display:compact; font:Verdana; font-weight: bold; background: none;  text-decoration: none; div {text-align: left; } ',
										listeners : {
											render : function () {

												//debugger;
												var w = this.ownerCt.findParentByType('awesomewindow');
												var fp = this.ownerCt.findParentByType('form');
												var rateMultipleSelectedRateURI = w.getParam('rateMultipleSelectedRateURI');
												//alert("rateMultipleSelectedRateURI---cc-----"+rateMultipleSelectedRateURI);
												var d = [];

												for (var i = 0; i < rateMultipleSelectedRateURI.length; i++) {
													d[i] = rateMultipleSelectedRateURI[i].get('dataURI');

												}

												var count = rateMultipleSelectedRateURI.length - 1;
												var flag_new;
												var inventoryGross_new;
												var priceCommissionPercentage_new = 0;
												var temp = "";
												var totalTemp = 0;
												var data = {};
												data.extras = [];
												var extraTotal = 0;
												for (var i = 0; i < rateMultipleSelectedRateURI.length; i++) {
													//alert(rateMultipleSelectedRateURI[i].data.);
													var noOfPersons = document.getElementById("no" + rateMultipleSelectedRateURI[i].data.dataURI).value;

													//var groupName=rateMultipleSelectedRateURI[i].json.groupName;
													var conversionCurrency = rateMultipleSelectedRateURI[i].data.conversionCurrency; //; //convertedPricingPriceSell
													var convertedPricingPriceSell = rateMultipleSelectedRateURI[i].data.convertedPricingPriceSell;
													//alert("convertedPricingPriceSell---------"+convertedPricingPriceSell);
													var convertedPricingPriceCommission = rateMultipleSelectedRateURI[i].data.convertedPricingPriceCommission;
													var convertedPricingPriceIsNett = rateMultipleSelectedRateURI[i].data.convertedPricingPriceIsNett;
													if (convertedPricingPriceIsNett) {
														flag_new = "Nett";
														//priceCommissionPercentage_new = "";
													} else {
														flag_new = "Gross";
														//inventoryGross_new = Math.round((convertedPricingPriceCommission *100) / convertedPricingPriceSell);
														//if (!isNaN(inventoryGross_new))
														//alert("inventoryGross_new----"+inventoryGross_new);
														//priceCommissionPercentage_new = inventoryGross_new ;
													}
													if (typeof priceCommissionPercentage_new == 'undefined' || priceCommissionPercentage_new == "") {
														//alert("priceCommissionPercentage_new--11---"+priceCommissionPercentage_new);
														priceCommissionPercentage_new = 0;

													}
													if (typeof convertedPricingPriceSell == 'undefined' || convertedPricingPriceSell == "") {
														//alert("priceCommissionPercentage_new--11---"+priceCommissionPercentage_new);
														convertedPricingPriceSell = 0;

													}

													totalTemp = totalTemp + parseInt(noOfPersons) * parseFloat(convertedPricingPriceSell); // priceCommissionPercentage_new

													// to get extras for each rate..
													var store = new Ext.data.CollectionStore({
															autoLoad : true,
															url : TDS.env.dataPath + rateMultipleSelectedRateURI[i].data.offeringURI + '/searchExtras/collection?rateURI=' + rateMultipleSelectedRateURI[i].data.dataURI + '&currency=' + conversionCurrency,
															identifier : rateMultipleSelectedRateURI[i].data.offeringURI + '/searchExtras?rateURI=' + rateMultipleSelectedRateURI[i].data.dataURI + '&currency=' + conversionCurrency,
															fields : ['dataURI', 'nameString', 'termsAndConditions', 'extraCategoryURI', 'required', 'minimumInventoryRequired', 'conversionCurrency', 'convertedPricingPriceSell', 'convertedPricingPriceIsNett', 'convertedPricingPriceCommission', 'rateClassURI', 'ratePerURI', 'rateOccupancyURI', 'shareAvailabilitywith', 'flagCount', 'offeringURI', 'childChbox', 'markUp']
														});
													//alert("---------------------");
													//debugger;

													var a = this.html;
													store.on('load', function (t, records) {
														debugger;
														var e = data.extras;
														var extraStoreLength = data.extras.length;
														var cntOnCont = 0;
														var selectedExtras = TDS.data[w.getParam('rateId')]; //ec
														for (var j = extraStoreLength; j < (extraStoreLength + records.length); j++) {

															if (records[(j - extraStoreLength)].data.required || selectedExtras.indexOf(records[(j - extraStoreLength)].data.dataURI) != -1) {

																data.extras[(j - cntOnCont)] = records[(j - extraStoreLength)].data;

																Ext.apply(data.extras[(j - cntOnCont)], TDS.util.Price.calculateGrossNettPrice(data.extras[(j - cntOnCont)]));
																//commented
																//extraTotal +=records[(j-extraStoreLength)].data.priceSell;
																//extras and min required multiplication: as per Norm Discussion
																var minimumInventoryRequired = records[(j - extraStoreLength)].data.minimumInventoryRequired;
																extraTotal += records[(j - extraStoreLength)].data.priceSell * minimumInventoryRequired;

																if (data.extras[(j - cntOnCont)].priceIsNett) {
																	data.extras[(j - cntOnCont)].priceNett = data.extras[(j - cntOnCont)].priceSell.toFixed(2);
																	//commented two line for making extras multiplyd by min required, and markup removed for extras
																	//	data.extras[(j-cntOnCont)].markUp = (data.extras[(j-cntOnCont)].priceSell*TDS.env.user.agencyDefaultComm()/100).toFixed(2);
																	//	extraTotal += (data.extras[(j-cntOnCont)].priceSell*TDS.env.user.agencyDefaultComm()/100);

																	data.extras[(j - cntOnCont)].markUp = (data.extras[(j - cntOnCont)].priceSell * minimumInventoryRequired).toFixed(2);
																	//extraTotal += (data.extras[(j-cntOnCont)].priceSell*minimumInventoryRequired);
																} else {
																	data.extras[(j - cntOnCont)].priceGross = data.extras[(j - cntOnCont)].priceGross.toFixed(2);
																}
															} else {
																cntOnCont++;
																continue;
															}

														}
														// debugger;
														var panelExtras = this.ownerCt.ownerCt.items.itemAt(2).items.itemAt(0);
														if (data.extras.length > 0) {
															// calcMainTotal(this.initialConfig.html);
															panelExtras.tpl.overwrite(panelExtras.body, data.extras);
														}

														//changed extras per person to component extras as per Norm on 03-12-14
														//	var c = " "+conversionCurrency+" "+((extraTotal*parseInt(noOfPersons))+(totalTemp)).toFixed(2)+" ";
														var c = " " + conversionCurrency + " " + ((extraTotal) + (totalTemp)).toFixed(2) + " ";

														this.setValue(c);
													}, this);
													//alert(rateMultipleSelectedRateURI[i].data.convertedPricingPriceIsNett);
													if (!rateMultipleSelectedRateURI[i].data.convertedPricingPriceIsNett) {
														//totalTemp+=(convertedPricingPriceSell*TDS.env.user.agencyDefaultComm()/100);
													}
													//changed extras per person to component extras as per Norm on 03-12-14
													//	var totalMain = " "+conversionCurrency+" "+((extraTotal*parseInt(noOfPersons))+(totalTemp)).toFixed(2)+" ";
													//alert(extraTotal);
													var totalMain = " " + conversionCurrency + " " + ((extraTotal) + (totalTemp)).toFixed(2) + " ";
													//	alert(totalMain);
													this.setValue(totalMain);

													//End of extras..
												}
												//alert(conversionCurrency);
												if (conversionCurrency == "" || conversionCurrency == null)
													conversionCurrency = "AUD";

												this.html = conversionCurrency + "&nbsp;" + totalTemp.toFixed(2);
											}
										}
									}
								]
							},
							// rate price
							/*{
							xtype: 'panel',
							style: 'padding: 0; margin-top: 4px;',
							border: false,
							layout: 'table',
							layoutConfig: {
							columns: 2
							},
							defaults: {
							border: false
							},
							items: [
						{
							html: 'Price:',
							width: Ext.isIE ? 88 : 85
							},
						{
							listeners: {
							render: function () {
							// set rate price
							var fp = this.ownerCt.findParentByType('form');
							this.html = TDS.util.Price.formatPrice(fp.getDetail('ratePriceUnit'), fp.getDetail('ratePriceCurrency')) + ' per ' + fp.getDetail('ratePerType') + '.';
							}
							}
							}
							]
							},
							// rate price total
						{
							xtype: 'panel',
							style: 'padding: 0; margin-top: 4px;',
							border: false,
							layout: 'table',
							layoutConfig: {
							columns: 2
							},
							defaults: {
							border: false
							},
							items: [
						{
							html: 'Total:',
							width: Ext.isIE ? 88 : 85
							},
						{
							listeners: {
							render: function () {
							// set rate price total
							var w = this.ownerCt.findParentByType('awesomewindow');
							var fp = this.ownerCt.findParentByType('form');
							this.html = TDS.util.Price.formatPrice(fp.getDetail('ratePriceTotal'), fp.getDetail('ratePriceCurrency')) + ' for ' + w.getParam('numberToReserveRequested') + ' ' + fp.getDetail('ratePerType') + '.';
							}
							}
							}
							]
							},*/
							// action radios
							{
								xtype : 'fieldset',
								style : 'margin-top: 8px;',
								layout : 'table',
								layoutConfig : {
									columns : 2
								},
								autoHeight : true,
								defaults : {
									colspan : 2,
									xtype : 'radio',
									name : 'action',
									forceSubmit : true,
									hideLabel : true
								},
								items : [{
										boxLabel : 'Book available',
										inputValue : 'book',
										hidden : true
									}, {
										colspan : 1,
										boxLabel : 'Request',
										inputValue : 'request',
										hidden : true,
										handler : function (t, checked) {
											var releaseDateField = this.ownerCt.items.itemAt(2);
											if (checked)
												releaseDateField.enable().focus();
											else
												releaseDateField.disable();
										}
									}, {
										colspan : 1,
										xtype : 'datefield',
										name : 'releaseDate',
										hidden : true,
										disabled : true,
										showToday : false,
										width : 80,
										format : TDS.env.dateFormatDisplay,
										minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime(),
										listeners : {
											render : function () {
												// add 28 days (4 weeks) for the default date
												var defaultDate = Ext.TimerMgr.getServerCalculatedDate().add(Date.DAY, 28);
												this.setValue(defaultDate);
											}
										}
									}, {
										boxLabel : 'Quote only',
										inputValue : 'quote'
									}
								]
							}, {
								xtype : 'checkbox',
								name : 'makeAnotherBooking',
								forceSubmit : true,
								hideLabel : true,
								checked : false,
								hidden : true,
								boxLabel : 'Make another booking'
							}
						]
					}
				}, {
					title : 'Passengers',
					//	autoDestroy:false,
					//	height:400,
					items : [{
							xtype : 'panel',
							border : false,
							style : 'margin-bottom: 6px;',
							html : '<p>Please select the passengers for this booking below.</p>',
							listeners : {
								beforerender : function () {
									var fp = this.ownerCt.findParentByType('form');
									var numberOfPaxRequired = fp.getDetail('numberOfPaxRequired');
									if (numberOfPaxRequired > 0) {
										this.html = '<p>Please select the ' + numberOfPaxRequired + ' passengers required for this booking below.</p>';
									}
								}
							}
						}, {
							xtype : 'panel',
							border : false,
							layout : 'fit',
							//	height: 350,
							//			width:600,
							items : [{
									xtype : 'editorgrid',
									alwaysUseCollection : true,
									//		tbar: [''],
									maskDisabled : false,
								//	id : 'editorgrid2',
									//clicksToEdit:1,
									autoDestroy : false,
											height: 375,
											width:300,
									store : new Ext.data.CollectionStore({
										url : '',
										identifier : '',
										fields : ['type', 'code', 'nameFirst', 'nameLast', 'salutation', 'displayName', 'dateOfBirth', 'paxAge']
									}),
									viewConfig : {
										forceFit : true
									},
									getData : function () {
										var s = this.selModel.getSelections();
										var d = [];
										for (var i = 0; i < s.length; i++) {
											d[i] = s[i].get('dataURI');
										}
										return d;
									},
									// returns the number of passengers selected
									preselect : function (paxType, numberOfPaxRequired) {
										var selections = [];
										this.getStore().each(function (record) {
											// check if the "required" number of pax types have been selected
											if (selections.length >= numberOfPaxRequired)
												return false;
											if ((!paxType || record.get('type') == paxType) && record.get('nameFirst') && record.get('nameLast')) {
												selections[selections.length] = record;
											}
										}, this);
										if (selections.length > 0)
											this.getSelectionModel().selectRecords(selections);
										return selections.length;
									},
									// validates passenger selection
									validatePassenger : function (sm, ri, keepExisting, r) {
										if (!r.get('nameFirst') && !r.get('nameLast'))
											return false;
									},
									//clicksToEdit:1,
									sm : new Ext.grid.CheckboxSelectionModel(),
									//columns: [
									cm : new Ext.grid.ColumnModel([

											new Ext.grid.CheckboxSelectionModel(), {
												header : 'Type',
												dataIndex : 'type',
												width : 40,
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
												header : 'Last name',
												dataIndex : 'nameLast',
												editor : new Ext.form.TextField({
													allowBlank : false
												}),
														renderer : function (j, g, h) {
 												return	j.substr(0, 1).toUpperCase() + j.substr(1);
												}
											}, {
												header : 'First name',
												dataIndex : 'nameFirst',
												editor : new Ext.form.TextField({
													allowBlank : false
												}),
														renderer : function (j, g, h) {
 												return	j.substr(0, 1).toUpperCase() + j.substr(1);
												}
											},
											{
												header : 'Title',
												dataIndex : 'salutation',
												width : 40,
												fixed : true,
												editor : new Ext.form.ComboBox({
													store : TDS.data.salutations,
													editable : false,
													forceSelection : true,
													mode : 'local',
													triggerAction : 'all',
													displayField : 'text',
													valueField : 'text'
												})
											},
											//{header: 'Code', dataIndex: 'code', width: 40, fixed: true},
											{
												header : 'DOB',
												dataIndex : 'dateOfBirth',
												width : 70,
												fixed : true,
												editor : new Ext.form.DateField({
													allowBlank : false
												}),
												renderer : function (v, metaData, record) {
													//record.set('paxAge',TDS.util.Format.age(v));
													debugger;
													if (typeof v != 'undefined') {
														if (typeof v != 'string') {
															//alert(v);
															var nDate = new Date();
															nDate.setTime(Ext.TimerMgr.getServerCalculatedTime());
															var age = Math.floor((nDate.getTime() - v.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
															record.set('paxAge', ((age && age > 0) ? age : ''));
															return Ext.util.Format.date(v, TDS.env.dateBirthdayFormatDisplay);
														} else {
															//	alert(v+"-2");
															if (record.get('paxAge')) {
																var age = TDS.util.Format.age(v);
																record.set('paxAge', ((age && age > 0) ? age : ''));
															}
															return TDS.util.Format.dateSpecial(v, TDS.env.dateBirthdayFormatDisplay);
														}
													}
													return TDS.util.Format.dateSpecial(v, TDS.env.dateBirthdayFormatDisplay);
												}
											}, {
												header : 'Age',
												dataIndex : 'paxAge',
												width : 30,
												fixed : true,
												editor : new Ext.form.NumberField({
													allowBlank : false
												}),
												renderer : function (v, metaData, record) {
													//debugger;
													if (v)
														return v;
													else {
														if (typeof record.get('dateOfBirth') != 'undefined') {
															if (typeof record.get('dateOfBirth') != 'string') {
																var nDate = new Date();
																nDate.setTime(Ext.TimerMgr.getServerCalculatedTime());
																var age = Math.floor((nDate.getTime() - record.get('dateOfBirth').getTime()) / (365.25 * 24 * 60 * 60 * 1000));
																return ((age && age > 0) ? age : '');
															} else {
																var age = TDS.util.Format.age(record.get('dateOfBirth'));
																return ((age && age > 0) ? age : '');
															}
														}
														return '';

													}
												}
											},
											//{header: 'DOB', dataIndex: 'dateOfBirth', width: 40, renderer: TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay), editor: new Ext.form.DateField({ showToday: false, format: TDS.env.dateBirthdayFormatDisplay, minValue: '01/01/1901' })},
											{
												header : 'Rate',
												dataIndex : 'rateURI',
												fixed : true,
												editor : new Ext.form.ComboBox({
													editable : false,
													forceSelection : true,
													mode : 'local',
													//displayField: 'nameString',
													//valueField: 'dataURI',
													displayField : 'nameString',
													valueField : 'nameString',
													triggerAction : 'all',
													store : TDS.data.selectedRates
												})
											}
										]),
									bbar : [{
											xtype : 'button',
											text : 'Add',
											handler : function () {
												// enable the "Save" and "Cancel" buttons
												var buttonCancel = this.ownerCt.items.itemAt(1);
												var buttonSave = this.ownerCt.items.itemAt(2);
												buttonSave.enable();
												buttonCancel.enable();

												// disable the "Add" button
												this.disable();

												var g = this.ownerCt.ownerCt;
												var s = g.getStore();
												s.add([new s.recordType({
															type : 'AD',
															nameFirst : '',
															nameLast : ''
														})]);
												// store the new record index
												g.newRecordIndex = s.getCount() - 1;
												g.startEditing(g.newRecordIndex, 2);
											}
										}, {
											xtype : 'button',
											text : 'Cancel',
											disabled : true,
											handler : function () {
												// enable the "Add" button, disable the "Save" button
												var buttonAdd = this.ownerCt.items.itemAt(0);
												var buttonSave = this.ownerCt.items.itemAt(2);
												buttonAdd.enable();
												buttonSave.disable();

												var g = this.ownerCt.ownerCt;

												var record = g.getStore().getAt(g.newRecordIndex);
												// check if we found a record and that it is really a "new" record
												if (record == -1 || typeof record.get('dataURI') != 'undefined')
													return;

												g.getStore().remove(record);
												this.disable();
											}
										}, {
											xtype : 'button',
											text : 'Save',
											disabled : true,
											handler : function () {
												var w = this.ownerCt.findParentByType('awesomewindow');
												var g = this.ownerCt.ownerCt;

												// disable the "Save" button
												var buttonAdd = this.ownerCt.items.itemAt(0);
												var buttonCancel = this.ownerCt.items.itemAt(1);
												buttonCancel.disable();
												this.disable();

												var record = g.getStore().getAt(g.newRecordIndex);
												// check if we found a record and that it is really a "new" record
												if (record == -1 || typeof record.get('dataURI') != 'undefined')
													return;

												Ext.Ajax.request({
													url : TDS.env.dataPath + w.getDataURI('pnr') + '/passengers',
													jsonData : record.data,
													method : 'POST',
													callback : function (o, s, r) {
														if (s) {
															// reload the grid store (pre-selection runs on "load" listener), enable "Add" button
															g.getStore().load();
															buttonAdd.enable();
														} else {
															// re-enable the "Cancel" and "Save" buttons
															buttonCancel.enable();
															this.enable();
														}
													},
													scope : this
												});
											}
										}, {
											xtype : 'button',
											text : 'Additional Info',
											//id : 'add',
											handler : function (e) {

												var w = this.ownerCt.findParentByType('awesomewindow');
												var g = this.ownerCt.ownerCt;
												var record = g.getStore().getAt(g.newRecordIndex);
												var dataURI = '';
												var selection = this.ownerCt.ownerCt.getSelectionModel().selections; //.items[0].get('dataURI');
												if (selection.length == 1) {
													dataURI = selection.items[0].get('dataURI');

												}
												console.log('%%%%%%%%%%%%%');
												var dataURI55 = dataURI;
												console.log(dataURI55);
												var bookingWindow = TDS.window;
												console.log(TDS.window);
												//var dataURI = ap.rowRecordData['dataURI'];
											//	console.log(dataURI);

												var fp = this.ownerCt.findParentByType('form');
												console.log(fp);
												//	var dataURI2 = fp.getDataURI();
												//	if (!dataURI2) return;

												//if (!dataURI) return;

											TDS.innerWindow.setWindow({
												height:300,
												width:200,
												autoDestroy:false,
  												title : 'Passenger Profile',
												interfaceURI :'pnr/passenger/passengerDetails.js',//'pnr/passenger/viewDetails.js',
 												sourceDataURI: dataURI,
												destinationDataURI: dataURI,
 												 
												closeAction: 'hide',
												buttonOK : 'Submit',
													
												callback : {
												fn : function (s, data, responseData) {
 											 
											 
												},
 												
												scope:this
												}
												});

 
												//new Ext.LoadMask(this.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.body, {
												//												new Ext.LoadMask(this, {
												//													msg : ""
												//												}).show();
												//								this.loadMask = new Ext.LoadMask(this.body, {
												//													msg : ""
												//												});
												//		this.findParentByType('awesomewindow').loadMask.show();

				/* 						var myMask = new Ext.LoadMask(this.findParentByType('awesomewindow').el, {
														msg : ""
													});
												myMask.show();

												new Ext.Window({
													title : 'Passenger Profile',
													height : 550,
													width : 700,
													layout : 'fit',
													maskDisabled : false,
													closeAction : 'hide',
													closable : false,
														draggable:false,
													plain : true,
													items : new Ext.TabPanel({

														activeTab : 0,
														layoutOnTabChange : true,
														items : [
															{

																title : 'Documentation',
																items : {
																	xtype : 'panel',
																	layout : 'form',
																	labelWidth : 80,
																	border : false,
																	style : 'padding: 2px;',
																	items : [
//																		{
//																			xtype : 'textfield',
//																			name : 'nationalityCountry',
//																			fieldLabel : 'Nationality',
//																			width : 200,
//																				readOnly:true
//																		},
																				{
																			xtype : 'editorgrid',
																			style: 'padding-bottom: 12px;',
																			height : 230,
																			//loadMask: { msg: '' },
																			viewConfig : {
																				forceFit : true
																			},
																			store : new Ext.data.CollectionStore({
																				url : '',
																				identifier : '',
																				pruneModifiedRecords : true,
																				fields : ['dataURI', 'typeURI', 'value', 'extraInfo1']
																			}),
																			getData : function () {
																				var s = this.getStore().getModifiedRecords();
																				for (var i = 0, d = []; i < s.length; i++) {
																					var rdu = s[i].get('dataURI');
																					d.push({
																						method : rdu ? 'PUT' : 'POST',
																						destinationDataURI : rdu ? TDS.env.dataPath + rdu : this.baseDataURI,
																						data : {
																							typeURI : s[i].get('typeURI'),
																							value : s[i].get('value'),
																							extraInfo1 : s[i].get('extraInfo1')
																						}
																					});
																				}
																				return {
																					data : d
																				};
																			},
																			sm : new Ext.grid.RowSelectionModel({
																				singleSelect : true
																			}),
																			cm : new Ext.grid.ColumnModel([{
																						dataIndex : 'typeURI',
																						header : 'ID Type',
																						renderer : TDS.util.Format.displayResourceNameRenderer(),
																						editor : new Ext.form.ComboBox({
																							mode : 'local',
																							triggerAction : 'all',
																							editable : false,
																							displayField : 'displayName',
																							valueField : 'dataURI',
																							store : TDS.data.getStore({
																								dataURI : TDS.env.dataPath + 'passenger/documenttypes/collection',
																								identifier : 'passenger/documenttypes',
																								fields : ['name', 'displayName', 'dataURI']
																							})
																						})
																					}, {
																						dataIndex : 'value',
																						header : 'Number',
																						editor : new Ext.form.TextField({
																							allowBlank : false
																						})
																					}, {
																						dataIndex : 'extraInfo1',
																						header : 'Notes',
																						editor : new Ext.form.TextField({
																							allowBlank : false
																						})
																					}
																				]),
																					bbar: [
								{
									xtype: 'button',
									text: 'Add',
									tooltip: 'Click here to add a new document',
									handler: function() {
										var g = this.ownerCt.ownerCt;
										var s = g.getStore();
										s.add([new s.recordType({typeURI: '', value: '', extraInfo1: ''})]);
										g.startEditing(s.getCount() - 1, 0);
									}
								},
								{
									xtype: 'button',
									text: 'Remove',
									tooltip: 'Select a document and click here to remove',
									handler: function() {
										var g = this.ownerCt.ownerCt;

										var record = g.selModel.getSelected();
										if (!record) return;

										// display the load mask
										g.loadMask.show();

										// check if this document has a dataURI set (already exists)
										if (record.get('dataURI')) {
											var a = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var b  = a.getConfigValue('sourceDataURI');
											var c = b.split('/')[1];
											var rdu = record.get('dataURI');
											rdu= rdu ?rdu.replace("pnr","pnr/"+c):null; 
											Ext.Ajax.request({
												method: 'DELETE',
												url: TDS.env.dataPath + rdu,
												callback: function (o, s, r) {
													// hide load mask
													g.loadMask.hide();
													if (s) {
														g.store.remove(record);
														return;
													}
													// TODO: handle any server errors.
												}
											});
										}
										else {
											g.loadMask.hide();
											g.store.remove(record);
										}
									}
								}
							],

																			listeners : {
																				render : function () {
																					//									var w = this.ownerCt.findParentByType('awesomewindow');


																					var dataURI1 = dataURI + '/documents';
																					var collectionDataURI = TDS.env.dataPath + dataURI1 + '/collection';
																					this.baseDataURI = TDS.env.dataPath + dataURI1;
																				//	this.baseDataURI = TDS.env.dataPath + dataURI;

																					with (this.store) {
																						reader.meta.identifier = dataURI1;
																						proxy.conn.url = collectionDataURI;
																						load();
																					}

																				}
																			}
																		},
																			{
							xtype: 'textfield',
							name: 'nationalityCountry',
							fieldLabel: 'Nationality',
							width: 150,
							//	style:'padding-top:10px;',
						},

																	{													
							layout:'table',

							layoutConfig: { columns: 5 },
							labelWidth: 110,
							border: false,
								defaults:{border: false},
							style: 'padding: 2px;',
							items:[{
								html: 'Country of Birth:',
								width: Ext.isIE ? 80 : 83
								
							},
							{
								xtype:'combo',
								width: 150,
								name:'ppCountryOfBirthURI',
								fieldLabel:'Country of Birth',
								hideTrigger: false,
								mode: 'local',
								typeAhead: true,
								triggerAction: 'all',
								forceSelection: true,
								selectOnFocus: true,
								editable: false,
								displayField: 'name',
								valueField: 'dataURI',
								store: TDS.data.getStore({
									dataURI: TDS.env.dataPath + 'countries/collection/custom',
									identifier: 'countries',
									fields: ['name', 'dataURI']
								})
							},{
								html: ' ',
								width: Ext.isIE ? 10 : 13
							},{
								html: 'Location:',
								width: Ext.isIE ? 80 : 83
							},{
								xtype:'combo',
								width: 200,
								name: 'documentationLocation',
								fieldLabel:'Location',
								editable: false,
								forceSelection: true,
								mode: 'local',
								triggerAction: 'all',
								displayField: 'text',
								valueField: 'text',
								store: TDS.data.documentLocation
							}]
						},
									{
							layout:'table',
							defaults:{border: false},
							layoutConfig: { columns: 5 },
							labelWidth: 110,
							border: false,
							style: 'padding: 2px;',
							items:[{
								html: 'Passport No:',
								width: Ext.isIE ? 80 : 83
							},{
								xtype: 'textfield',
								name: 'ppNo',
								fieldLabel: 'Passport No',
								width: 150
							},{
								html: ' ',
								width: Ext.isIE ? 10 : 13
							},{
								html: 'Notes:',
								width: Ext.isIE ? 80 : 83
							},
							{
								xtype: 'textfield',
								name: 'ppNotes',
								fieldLabel: 'Notes',
								width: 200
							}]
						},
						{
							layout:'table',
							defaults:{border: false},
							layoutConfig: { columns: 5 },
							labelWidth: 110,
							border: false,
							style: 'padding: 2px;',
							items:[{
								html: 'Date of Issue:',
								width: Ext.isIE ? 80 : 83
							},{
								xtype: 'datefield',
								name: 'ppIssuedDate',
								fieldLabel: 'Date of issue',
								format:'dMy',
								maxValue:new Date(),
								width: 80
							},{
								html: ' ',
								width: Ext.isIE ? 80 : 83
							},{
								html: 'Date of Expiry:',
								width: Ext.isIE ? 80 : 83
							},
							{
								xtype: 'datefield',
								name: 'ppExpiryDate',
								fieldLabel: 'Date of Expiry',
								format:'dMy',
								minValue:new Date(),
								width: 80
							}
								]}
																	]
																}

															}, {

																title : 'SSR',
																items : [{
																	xtype : 'editorgrid',
																	style : 'padding: 8px;',
																	height : 230,
																	loadMask : {
																		msg : ''
																	},
																	viewConfig : {
																		forceFit : true
																	},
																	store : new Ext.data.CollectionStore({
																		url : '',
																		identifier : '',
																		pruneModifiedRecords : true,
																		fields : ['dataURI', 'ssr']
																	}),
																	getData : function () {
																		//						var s = this.getStore().getModifiedRecords();
																		//						for (var i = 0, d = []; i < s.length; i++) {
																		//							var rdu = s[i].get('dataURI');
																		//							d.push({
																		//								method: rdu ? 'PUT' : 'POST',
																		//								destinationDataURI: rdu ? TDS.env.dataPath + rdu : this.baseDataURI,
																		//								data: {
																		//									ssr: s[i].get('ssr')
																		//								}
																		//							});
																		//						}
																		//						return {
																		//							data: d
																		//						};
																	},
																	sm : new Ext.grid.RowSelectionModel({
																		singleSelect : true
																	}),
																	cm : new Ext.grid.ColumnModel([{
																				dataIndex : 'ssr',
																				header : 'Special Service Request',
																				editor : new Ext.form.ComboBox({
																					getValue : function () {
																						return (this.getRawValue());
																					},
																					mode : 'local',
																					triggerAction : 'all',
																					forceSelection : false,
																					validateOnBlur : false,
																					displayField : 'value',
																					valueField : 'text',
																					store : TDS.data.passengerSpecialServiceRequests,
																					tpl : '<tpl for="."><div class="x-combo-list-item">{text}</div></tpl>'
																				})
																			}
																		]),
																			bbar: [
						{
							xtype: 'button',
							text: 'Add',
							tooltip: 'Click here to add a new special service request',
							handler: function() {
								var g = this.ownerCt.ownerCt;
								var s = g.getStore();
								s.add([new s.recordType({ssr: ''})]);
								g.startEditing(s.getCount() - 1, 0);
							}
						},
						{
							xtype: 'button',
							text: 'Remove',
							tooltip: 'Select a special service request and click here to remove',
							handler: function() {
								var g = this.ownerCt.ownerCt;

								var record = g.selModel.getSelected();
								if (!record) return;

								// display the load mask
								g.loadMask.show();

								// check if this document has a dataURI set (already exists)
								if (record.get('dataURI')) {
									var a = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var b  = a.getConfigValue('sourceDataURI');
											var c = b.split('/')[1];
											var rdu = record.get('dataURI');
											rdu= rdu ?rdu.replace("pnr","pnr/"+c):null; 
									Ext.Ajax.request({
										method: 'DELETE',
										url: TDS.env.dataPath + rdu,
										callback: function (o, s, r) {
											// hide load mask
											g.loadMask.hide();
											if (s) {
												g.store.remove(record);
												return;
											}
											// TODO: handle any server errors.
										}
									});
								}
								else {
									g.loadMask.hide();
									g.store.remove(record);
								}
							}
						}
					],

																	listeners : {
																		render : function () {
																			//							var w = this.ownerCt.findParentByType('awesomewindow');
																			//var dataURI = w.getConfigValue('sourceDataURI') + '/ssrs';
																			var dataURI2 = dataURI + '/ssrs';
																			var collectionDataURI = TDS.env.dataPath + dataURI2 + '/collection';

																			this.baseDataURI = TDS.env.dataPath + dataURI2;

																			with (this.store) {
																				reader.meta.identifier = dataURI2;
																				proxy.conn.url = collectionDataURI;
																				load();
																			}
																			//							}
																		}
																	}
																},
																		{
					xtype:'textarea',
					height:110,
					width:590,
					emptyText:'Enter SSR free form Text..',
 					name:'ssrNotes'
				}
																]

															}, {

																title : 'Memberships',
																items : {
																	xtype : 'panel',
																	layout : 'table',

																	layoutConfig : {
																		columns : 1
																	},
																	labelWidth : 110,
																	border : false,
																		//	height:200,
																	style : 'padding: 2px;',
																	defaultType : 'textfield',
																	items : [{
																			xtype : 'panel',
																			layout : 'fit',
																				height:200,

																			border : true,
																			autoScroll : true,
																			style : 'padding: 2px;',
																			defaultType : 'textfield',
																			items : [{
																					xtype : 'editableGrid', //awesomegrid   editorgrid
																					id : 'member',
																					//searchURI: TDS.env.dataPath + '/PassengerMemberships',
																					//	clicksToEdit : 1,
																					alwaysUseCollection : true,
																					width : 670,
																					height : 520,
																					border : false,
																					loadMask: { msg: '' },
																					tbar : [
																						'Supplier',
																						' ', {
																							xtype : 'combo',
																							name : 'supplierDataURI',
																							emptyText : 'Suppliers',
																							//excludeSubmit: true,
																							//tpl: TDS.util.Templates.ComboNoLabel,
																							minChars : 1,
																							enableKeyEvents : true,
																							mode : 'local',
																							width : 150,
																							typeAhead : true,
																							excludeFromSession : true,
																							triggerAction : 'all',
																							forceSelection : true,
																							selectOnFocus : true,
																							displayField : 'name',
																							valueField : 'dataURI',
																							store : TDS.data.getStore({
																								dataURI : TDS.env.dataPath + 'suppliers/collection/concise',
																								identifier : 'suppliers',
																								fields : ['name', 'dataURI']
																							}),
																							appendData : [{
																									name : '',
																									dataURI : ''
																								}
																							]

																						}
																					],
																					store : new Ext.data.JsonStore({
																						url : '',
																						id : 'dataURI',
																						fields : ['serviceType', 'club', 'cardNumber', 'supplierURI', 'PassengerURI', 'expiryDate', 'dataURI', 'supplierName']
																					}),
																					sm : new Ext.grid.RowSelectionModel(),

																					cm : new Ext.grid.ColumnModel([

																							//Meal Times   Number
																							{
																								header : 'Supplier',
																								dataIndex : 'supplierURI',
																								width : 100,
																								renderer : TDS.util.Format.displayResourceConciseNameRenderer(),
																								editor : new Ext.form.ComboBox({

																									store : TDS.data.getStore({
																										dataURI : TDS.env.dataPath + 'suppliers/collection/concise',
																										identifier : 'suppliers',
																										fields : ['name', 'dataURI']
																									}),
																									mode : 'local',
																									triggerAction : 'all',
																									typeAhead : true,
																									displayField : 'name',
																									valueField : 'dataURI',

																								})
																							}, {
																								header : 'Club',
																								dataIndex : 'club',
																								width : 100,
																								editor : new Ext.form.TextField({})
																							}, {
																								header : 'Card No',
																								dataIndex : 'cardNumber',
																								width : 100,
																								editor : new Ext.form.TextField({})
																							}, {
																								header : 'Type',
																								dataIndex : 'serviceType',
																								width : 100,
																								editor : new Ext.form.TextField({})
																							}, {
																								header : 'Expiry Date',
																								dataIndex : 'expiryDate',
																								width : 100,
																								editor : new Ext.form.DateField({
																									format : 'm/d/Y',
																									allowBlank : false
																								}),

																								renderer : Ext.util.Format.dateRenderer('dMy')

																							}
																						]),
																					viewConfig : {
																						forceFit : true
																					},
																					listeners : {
																						beforerender : function () {
																							//this.store = this.ownerCt.store;
																						},
																						sessioninit : function () {
																							//debugger;
																							var a = this.findParentByType('awesomewindow');
																							//		var pnrDataURI = a.initialConfig.destinationDataURI;
																							this.searchURI = TDS.env.dataPath + dataURI + '/passengerMemberships';

																						},
																						render : function () {

																							//							var dataURI2 = dataURI + '/passengerMemberships';
																							//								var collectionDataURI = TDS.env.dataPath + dataURI2 + '/collection';
																							//
																							//								this.baseDataURI = TDS.env.dataPath + dataURI2;
																							//
																							//								with (this.store) {
																							//									reader.meta.identifier = dataURI2;
																							//									proxy.conn.url = collectionDataURI;
																							//									load();
																							//								}


																						}
																					}
																				}
																			]
																		},
																				///raushan
																	{
						xtype:'panel',
						layout:'table',
						border:false,
						width: 500,
						height:300,
						style: 'padding: 7px;',
						layoutConfig: { columns: 2 },
						items:[{
							//xtype:'panel',
							width:250,
							height:300,
							border:false,
							layout:'form',
							defaultType	: 'textfield',
							labelWidth:80,
							items:[{
								xtype: 'combo',
								name: 'supplier',
								emptyText: 'Suppliers',
								excludeSubmit: true,
								//tpl: TDS.util.Templates.ComboNoLabel,
								minChars: 1,
								enableKeyEvents: true,
								mode: 'local',
								width: 150,
								typeAhead: true,
								fieldLabel: 'Supplier',
								//labelSeparator:"",
								triggerAction: 'all',
								forceSelection: true,
								selectOnFocus: true,
								displayField: 'name',
								valueField: 'dataURI',
								store: TDS.data.getStore({
									dataURI: TDS.env.dataPath + 'suppliers/collection/concise',
									identifier: 'suppliers',
									fields: ['name', 'dataURI']
								})
//										,
//								listeners: {
//						select: function () {
//							alert(this.getValue());
//						}
//									}

							},
							{
								name: 'club',
								fieldLabel: 'Club',
								width: 150
							},
							{
								name: 'cardNumber',
								fieldLabel: 'Membership No',
								width: 150
							},
							{
								name: 'serviceType',
								fieldLabel: 'Type',
								width: 150
							},
							{
								xtype: 'datefield',
								name: 'expiryDate',
								format:'dMy',
								fieldLabel: 'Expiry Date',
								width: 70
							},
							{
 								fieldLabel: 'Password',
								inputType: 'password',
								width: 150
							},
							{
								fieldLabel: 'Pin',
								inputType: 'password',
 								width: 150
							}]
						},
						{
							xtype:'panel',
							border:false,
							layout:'form',
							width: 250,
							height:300,
							labelWidth:20,
							defaults: { minWidth: 60},
							items:[
								{
								xtype:'textfield',
								fieldLabel: '<b>Or',
								labelSeparator:'',
								emptyText: 'Enter the supplier Name',
								border:false,
								width:200
							},
							{
								html:'',
								border:false,
								height:30
							},
							{
								xtype: 'formredbutton',
								text: 'Save',
									id:'a',
								style: 'margin-left: 20px;',
								handler:function(){
									 //debugger;
									 console.log(dataURI55);
									var w = this.ownerCt.findParentByType('awesomewindow');
									var dataURI = dataURI55;
									var jd ={};
						 			var fieldItems =  this.ownerCt.ownerCt.items.itemAt(0).items;
						 			var fieldItems1 =  this.ownerCt.ownerCt.items.itemAt(1).items;
									
									//var grid =  this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0);
									 var supplierDataURIField = fieldItems.itemAt(0);
									 var supplierNameField = fieldItems1.itemAt(0);
									var clubField = fieldItems.itemAt(1);
									
									 var cardNoField = fieldItems.itemAt(2);
									var serviceTypeField = fieldItems.itemAt(3);
									var expiryDateField = fieldItems.itemAt(4);

									var passwordField = fieldItems.itemAt(5);
									var pinField = fieldItems.itemAt(6);

									jd.cardNumber = cardNoField.getValue();
									jd.club = clubField.getValue();
									jd.expiryDate = expiryDateField.getValue();
									jd.supplierDataURI = supplierDataURIField.getValue();
									jd.supplierName = supplierNameField.getValue();
									jd.serviceType = serviceTypeField.getValue();

									jd.password = passwordField.getValue();
									jd.pin = pinField.getValue();

									var sup = supplierDataURIField.getRawValue()?supplierDataURIField.getRawValue():supplierNameField.getValue();
if((jd.cardNumber!=null && jd.cardNumber != '') && (jd.club!=null && jd.club != '')&& (jd.expiryDate!=null && jd.expiryDate != '')&& (jd.serviceType!=null && jd.serviceType != '')&& (jd.password!=null && jd.password != '') && (jd.pin!=null && jd.pin != '')&& (sup!=null && sup != '')){
									var g = this.ownerCt.ownerCt.ownerCt.items.itemAt(0).items.itemAt(0);
									//alert(g.getType());
								var sa = g.getStore();
								

									/*supplierDataURIField.setValue('');
									supplierNameField.setValue('');
									clubField.setValue('');
									cardNoField.setValue('');
									serviceTypeField.setValue('');
									expiryDateField.setValue('');
									passwordField.setValue('');
									pinField.setValue('');                             
 									 g.loadMask.show();          
									 Ext.Ajax.request({

										url: TDS.env.dataPath+dataURI + '/passengerMembership',

										method: 'POST',

										disableCaching: false,

										jsonData: jd,

										callback: function (o, s, r) {

											if (s) {
												 
												var msg = r.responseText;
												

												sa.add([
													new sa.recordType({
														cardNumber:cardNoField.getValue(),
														club : clubField.getValue(),
														expiryDate : expiryDateField.getValue(),
														//supplierDataURI : supplierDataURIField.getRawValue(),
														supplierName : supplierDataURIField.getRawValue()?supplierDataURIField.getRawValue():supplierNameField.getValue(),
														serviceType : serviceTypeField.getValue(),
														dataURI : msg,
														password : passwordField.getValue(),
														pin : pinField.getValue() 
													})
												]);
														supplierDataURIField.setValue('');
												supplierNameField.setValue('');
												clubField.setValue('');
 												cardNoField.setValue('');
												serviceTypeField.setValue('');
												expiryDateField.setValue('');
												passwordField.setValue('');
												pinField.setValue('');
 												g.loadMask.hide();
												 
											}

										}

									}); 
}
								}
							},
							{
								html:'',
								border:false,
								height:10
							},
							{
								xtype: 'button',
								style: 'margin-left: 20px;',
								text: 'Remove',
								tooltip: 'Select a Membership and click here to remove',
								handler: function() {
									var g = this.ownerCt.ownerCt.ownerCt.items.itemAt(0);

									var record = g.selModel.getSelected();
									if (!record) return;

									// display the load mask
									g.loadMask.show();

									// check if this document has a dataURI set (already exists)
									if (record.get('dataURI')) {
										var a = this.ownerCt.ownerCt.findParentByType('awesomewindow');
												var b  = a.getConfigValue('sourceDataURI');
												var c = b.split('/')[1];
												var rdu = record.get('dataURI');
												rdu= rdu ?rdu.replace("pnr","pnr/"+c):null; 
										Ext.Ajax.request({
											method: 'DELETE',
											url: TDS.env.dataPath + rdu,
											callback: function (o, s, r) {
												// hide load mask
												g.loadMask.hide();
												if (s) {
													g.store.remove(record);
													return;
												}
												// TODO: handle any server errors.
											}
										});
									}
									else {
										g.loadMask.hide();
										g.store.remove(record);
									}
								}
							}]
						}]
					}







																	]
																}


															}
														],
															listeners:{
														render:function(){
														//console.log('jjjjjjjjjjjj');
														Ext.Ajax.request({
																	url : TDS.env.dataPath + dataURI,
																	//jsonData : documentattach,
																	method : "GET",
																	callback : function (b, a, c) {
																	//	console.log(a);
																	//	console.log(b);
																	//	console.log(c);
																		if(a){ 
																		var ro = Ext.util.JSON.decode(c.responseText); 
																		this.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(ro.nationalityCountry);

																		}
																	},
																	scope : this
														}
														);
														
														}
														
														}

													}),

													buttons : [{
															text : 'Submit',
															id : 'submit',
															disabled : false,
															handler : function () {
																var modifiedDocs = this.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).getStore().modified;
																var documentArray = [],
																documentattach = {},
																ssrArray = [],
																memberShipArray = [];
																var modifiedSsr = this.ownerCt.items.itemAt(0).items.itemAt(1).items.itemAt(0).getStore().modified;
																var modifiedMemberShip = this.ownerCt.items.itemAt(0).items.itemAt(2).items.itemAt(0).items.itemAt(0).items.itemAt(0).getStore().modified;
																for (var i = 0; i < modifiedDocs.length; i++) {
																	documentArray.push(modifiedDocs[i].data);

																}
																documentattach.documents = documentArray;

																for (var i = 0; i < modifiedSsr.length; i++) {
																	ssrArray.push(modifiedSsr[i].data);

																}
																documentattach.ssr = ssrArray;

																for (var i = 0; i < modifiedMemberShip.length; i++) {
																	memberShipArray.push(modifiedMemberShip[i].data);

																}
																documentattach.memberShip = memberShipArray;

																Ext.Ajax.request({
																	url : TDS.env.dataPath + dataURI + "/passengerDocuments",
																	jsonData : documentattach,
																	method : "POST",
																	callback : function (b, a, c) {
																		console.log(a);
																		console.log(b);
																		console.log(c);
																		if (c.status == 200) {
																			console.log(c.statusText);
																			Ext.Msg.alert('Status', 'Changes saved successfully.');
																			myMask.hide();
																this.ownerCt.close();
																		}
																		//														if (a) {
																		//															j.getStore().load();
																		//															f.enable()
																		//														} else {
																		//															g.enable();
																		//															this.enable()
																		//														}
																	},
																	scope : this
																});
															//	myMask.hide();
																//this.ownerCt.close();

															}
														}, {
															text : 'Close',
															id : 'close',
															handler : function () {
																myMask.hide();
																this.ownerCt.close();
															}
														}
													],

												}).show();

*/

											}
										}
									],
									listeners : {
										beforeedit : function (e) {
											//		console.log(e);
											//	if (typeof e.record.get('dataURI') != 'undefined') e.cancel = true;
										},
										rowdblclick : function (g, rowIndex, columnIndex, e) {
											//										 	console.log('rowclick');
											//												console.log(g.clicksToEdit);
											//												var task = new Ext.util.DelayedTask(function(){});
											//
											//
											//
											//
											//  										new Ext.AwesomeWindow().setWindow({
											//											height:300,
											//											width:200,
											//										title : 'Pessenger',
											//										interfaceURI : 'pnr/passenger/passengerDetails.js',
											//
											//										buttonOK : 'Submit',
											//										callback : {
											//											fn : function () {
											//												console.log('&&&&&&&&&&');
											//												console.log(g);
											//
											//											},
											//											scope : g
											//										}
											//									});
											//g.clicksToEdit=0;
											//	grid.startEditing( rowIndex, columnIndex );
										},

										//	celldblclick:function(grid, rowIndex, columnIndex, e ){

										//	console.log(grid.clicksToEdit);
										//	grid.clicksToEdit=1;
										//	grid.startEditing( rowIndex, columnIndex );


										//				},
										//													celldblclick:function( g, rowIndex, columnIndex, e ){
										//													console.log(g.getColumnModel());
										//													console.log(rowIndex);
										//													console.log(columnIndex);
										//
										//												},


										//		afteredit:function( e ){
										//	e.clicksToEdit=1;
										//	e.isEditAllowed = false;
										//	console.log(e);
										//	},

										render : function () {
											var w = this.ownerCt.findParentByType('awesomewindow');
											console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
											console.log(w);

											this.getSelectionModel().on('beforerowselect', this.validatePassenger, this);

											with (this.store) {
												reader.meta.identifier = w.getDataURI('pnr') + '/passengers';
												proxy.conn.url = TDS.env.dataPath + w.getDataURI('pnr') + '/passengers/concise';
												load();
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
	],
	initRadioButtons : function (status) {
		var w = this.ownerCt;
		var daysAvailable = w.getParam('daysAvailable');
		var daysRequestable = w.getParam('daysRequestable');
		// radio action selections
		var fs = this.items.itemAt(1).items.itemAt(0).items.itemAt(0).findByType('fieldset')[0];
		var radioBook = fs.items.itemAt(0);
		var radioRequest = fs.items.itemAt(1);
		var radioRequestReleaseDate = fs.items.itemAt(2);
		// display the "Book" option if days available is greater than zero
		if (daysAvailable > 0)
			radioBook.show();
		// display the "Request" option if days available is greater than zero
		if (daysRequestable > 0) {
			radioRequest.show();
			//radioRequestReleaseDate.show();
		}
	}
}








 






  
 







 


 

 
 
 
    