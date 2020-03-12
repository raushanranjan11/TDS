{
	xtype : 'form',
	border : false,
	width : 750,
	//	id:'f',
	markDataDirtyOnLoad : true,
	beforeSubmit : function (jd) {
 
		var b = this;
		var a = jd;

		//console.log(this.getFlightGrid().getSelectionModel().selections.items);


var selcted  =this.getFlightGrid().getSelectionModel().selections.items;
		var aa = [],bb = {};
for (var j = 0; j < selcted.length; j++) {
 
	aa.push( {dataURI :selcted[j].data. dataURI,rateURI:selcted[j].json.rateIds }  );

} 
bb.root = aa;

		return jd.root =  bb;
	},
	beforeDataLoad : function (d, aw) {
 
		return d;
	},
	getRateURI : function () {
		return this.ownerCt.getDataURI('rateOffering');
	},
	getTermsURI : function () {
		return this.ownerCt.getDataURI('terms');
	},

	getFlightGrid : function () {
		return this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
	},
		getPriceCurrency : function () {
		return this.ownerCt.getData('priceCurrency');
	},

	getPassGrid : function () {
	 
		return this.items.itemAt(0).items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0);
	},


	items : [{
			xtype : 'tabpanel',
			activeTab : 0,
			layoutOnTabChange : true,
			height : 350,
			defaults : {
				bodyStyle : 'padding: 6px 4px 6px 4px;'
			},
			items : [{
					title : 'Flights',
					//	frame:true,
					items : [{
							xtype : 'panel',
							//layout: 'form',
							layout : 'table',
							frame : true,

							layoutConfig : {
								columns : 1
							},
							labelWidth : 110,
							border : false,
							style : 'padding: 2px;',
							defaultType : 'textfield',
							items : [{
									xtype : 'panel',
									width : 725,
									height : 225,
									border : true,
									style : 'padding: 2px;',
									items : [{
											xtype : 'grid',
											alwaysUseCollection : true,
											width : 725,
											height : 170,
											border : false,
											store : new Ext.data.JsonStore({
												//url : '',
												//	id : 'dataURI',
												fields : ['noOfSeats','rateId','travelDate', 'rateName', 'nameString', 'airportFromURI', 'airportFromString', 'airportToURI', 'airportToString', 'departure', 'stopOvers', 'expiryDate', 'dataURI', 'departureDate', 'arrivalDate', 'arrivalTime', 'departureTime', 'airportFrom', 'airportTo','bookStatus','adultRate','childRate','infantRate','adultNo','childNo','infantNo','offeringURI','dateFrom']
											}),
											//sm : new Ext.grid.RowSelectionModel(),
											sm : new Ext.grid.CheckboxSelectionModel(),

											columns : [
												new Ext.grid.CheckboxSelectionModel(),
											/*	{
													header : "",
													width : 55,
													dataIndex : 'chkbox',
													editable : false,
													width : 30,
													fixed : true,
													renderer : function (value, metaData, record, rowIdx, colIdx, store) {
														var dataURI = record.get('dataURI');
														return '<input type="checkbox" id = "rd' + dataURI + '" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">';
													}
												},*/
												{
													header : 'Flight Nos',
													dataIndex : 'nameString',
													width : 80,
													fixed:true
												}, {
													header : 'Class',
													dataIndex : 'rateName',
													//width : 100
												}, {
													header : 'From',
													dataIndex : 'airportFromURI',
													sortable : true,
													renderer : function (v) {
														// display the IATA code (from the URI)
														return v.substring(v.lastIndexOf('/') + 1);
													}
													//width : 100
												}, {
													header : 'Date',
													dataIndex : 'departureDate',
													//renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)
													//	width : 100
												}, {
													header : 'Time',
													dataIndex : 'departureTime',
													sortable : true
												}, {
													header : 'To',
													dataIndex : 'airportToURI',
													sortable : true,
													renderer : function (v) {
														// display the IATA code (from the URI)
														return v.substring(v.lastIndexOf('/') + 1);
													}
												}, {
													header : 'Date',
													dataIndex : 'arrivalDate',
													sortable : true,
													//renderer : TDS.util.Format.dateSpecialRenderer(TDS.env.dateFormatDisplay)
												}, {
													header : 'Time',
													dataIndex : 'arrivalTime',
												}, {
													header : 'Stop',
													dataIndex : 'stopOvers',
													sortable : true,
													renderer : function addTooltip(value, metadata, record, rowIndex, colIndex, store) {
														metadata.attr = 'ext:qtip="' + record.get('stopOversString') + '"';
														return value;
													}
												}, {
													 
													header : 'Seats',
													dataIndex : 'noOfSeats',
												}, {
													 
													header : 'Status',
													dataIndex : 'bookStatus' 
												}
											],
											viewConfig : {
												forceFit : true
											},
												//	id:'flightGrid',
											listeners : {
												beforerender : function () {
													//this.store = this.ownerCt.store;
												},
												sessioninit : function () {
													//debugger;
												},
												render : function () {
													debugger;
										 
													var a = {
														rateURI : this.findParentByType('form').getRateURI()
													};
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'search/air/rateOffering',
														method : 'POST',
														jsonData : a,
														callback : function (o, s, r) {
															if (s) {
																debugger;
																var ro = Ext.util.JSON.decode(r.responseText);
																var collection = ro['air/rateOffering/collection'];
																if (typeof collection == 'undefined')
																	return;
																var sd = [];
																for (var i = 0; i < collection.length; i++) {

																	// munge the dataURI for this record into the record

																	ro[collection[i]].dataURI = collection[i];

																	sd.push(ro[collection[i]]);

																}

																// load the results into the store
																var storeData = this.store;
																storeData.loadData(sd);
																this.getView().refresh();
															}
														},
														scope : this
													});
														 

												//search


												}
											},
											/*	submitGrid:function(){
											
											var a = {
														rateURI : this.findParentByType('form').getRateURI()
													};
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'search/air/rateOffering',
														method : 'POST',
														jsonData : a,
														callback : function (o, s, r) {
															if (s) {
																debugger;
																var ro = Ext.util.JSON.decode(r.responseText);
																var collection = ro['air/rateOffering/collection'];
																if (typeof collection == 'undefined')
																	return;
																var sd = [];
																for (var i = 0; i < collection.length; i++) {

																	// munge the dataURI for this record into the record

																	ro[collection[i]].dataURI = collection[i];

																	sd.push(ro[collection[i]]);

																}

																// load the results into the store
																var storeData = this.store;
																storeData.loadData(sd);
																this.getView().refresh();
															}
														},
														scope : this
													});
											*/
									//		}
								//}


										}, {
											xtype : 'panel',
											style : 'padding: 0; margin-top: 25px; margin-bottom: 4px;',
											border : false,
											layout : 'table',
											layoutConfig : {
												columns : 5
											},
											defaults : {
												border : false
											},
											items : [{
													html : '',
													width : Ext.isIE ? 125 : 250
												}, {
													xtype : 'radio',
													name : 'book',
													 width: 16,
													inputValue : false,
													listeners : {
														render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

														//	this.setValue(!a.transportType);
														},
														check : function (th, checked) { //newValue, oldValue
														  if (checked) {
															  debugger;
														  var selection = this.ownerCt.ownerCt.items.itemAt(0).getSelectionModel().selections.items;
												 
														  for (var j = 0; j < selection.length; j++) {
											  
															 var offeringURI=selection[j].data.offeringURI;
															 var noOfSeats=selection[j].data.noOfSeats;
															 var departureDate=selection[j].data.departureDate;
															// var rateId=selection[j].data.rateId;	
															  
																  var rateId=selection[j].data.adultRate;	
															  setTimeout(function () {
																	 debugger;
																	 Ext.Ajax.request({
																	 method : 'GET',
																	 url : TDS.env.dataPath + '' + offeringURI + '/reservation?numberToReserve='+noOfSeats+'&datePointer=' + departureDate  + '&dateDays=0&rateURI=' + rateId,
																	// params : h,
																	 callback : function (o, s, r) {
																	  if (s) {}
																	 },
																	 scope : this
																	});

																 },
																 500
																 );
														  }
														  }
														}







													}
												}, {
													html : 'Book',
													style : 'padding: 0; margin-left: 1px; margin-right: 25px;',
													width : Ext.isIE ? 43 : 45
												}, {
													xtype : 'radio',
													name : 'book',
													width: 16,
													inputValue : true,
													listeners : {
														render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

														//	this.setValue(a.transportType);
														},
													}
												}, {
													html : 'Quote',
													style : 'padding: 0; margin-left: 1px; margin-right:25px;',
													width : Ext.isIE ? 38 : 40
												}
											]
										}
									]
								},

							]
						}, {
							xtype : 'panel',
							layout : 'table',
							border : false,
							//defaults:{
							style : 'padding: 20px;',
							//},

							layoutConfig : {
								columns : 7
							},
							defaults : {
								border : false
							},
							items : [{
									xtype : 'button',
									text : 'Seat Allocation',
									hidden:true,
									 
								}, {
									width : 160
								}, {
									xtype: 'formredbutton',
									text : 'Submit',
									cls:'x-button-orange',
									overCls:'x-button-orange-over',
									handler : function () {
									debugger;
									var url = this.findParentByType('awesomewindow').getPostDataURI();
								    var selctedPass  =this.findParentByType('form').getPassGrid().getSelectionModel().selections.items;
									var currency = this.findParentByType('form').getPriceCurrency();
									var flightsGrid=this.findParentByType('form').getFlightGrid();
									var selcted  =this.findParentByType('form').getFlightGrid().getSelectionModel().selections.items;
									var flights = [],passengers = [];
								//	var timeheldDate=new Date(); 
									for (var k = 0; k < selctedPass.length; k++) {
										//passengers.push( {pax :selctedPass[k].data. dataURI }  );
										passengers.push(  selctedPass[k].data. dataURI   );
									} 
										 
									var componentString={};
									var componentArray=[];
									for (var j = 0; j < selcted.length; j++) {
										var perBook={};
										var offeringURI=selcted[j].data.offeringURI;
										var dateFrom=selcted[j].data.dateFrom;
							 
										var rateURI=selcted[j].data.adultRate
										var adultRate=selcted[j].data.adultRate
										var childRate=selcted[j].data.childRate
										var infantRate=selcted[j].data.infantRate
										var	noOfSeats=selcted[j].data. noOfSeats;
										var adultNo=selcted[j].data. adultNo;
										var childNo=selcted[j].data. childNo;
										var infantNo=selcted[j].data. infantNo;
										var passengerLength=passengers.length;
									
										var noOfRates = [],noOfPer=[],noOfPerPerRate=[],passengerURIs=[];
										if(typeof adultRate!='undefined' && adultRate!=''){
											noOfRates.push(adultRate);
											noOfPerPerRate.push( {rateURI :selcted[j].data. adultRate,noOfPass:selcted[j].data. adultNo+"" }  );
										}
										if(typeof childRate!='undefined' && childRate!=''){
											noOfRates.push(childRate);
											noOfPerPerRate.push( {rateURI :selcted[j].data. childRate,noOfPass:selcted[j].data. adultNo+"" }  );
										}
										if(typeof infantRate!='undefined' && infantRate!=''){
											noOfRates.push(infantRate);
											noOfPerPerRate.push( {rateURI :selcted[j].data. infantRate,noOfPass:selcted[j].data. adultNo+"" }  );
										}
										
										if(typeof adultNo!='undefined' && adultNo!=0){
											noOfPer.push( selcted[j].data. adultNo+"");
										}
										if(typeof childNo!='undefined' && childNo!=0){
											noOfPer.push( selcted[j].data. childNo+"");
										}
										if(typeof infantNo!='undefined' && infantNo!=0){
											noOfPer.push( selcted[j].data. infantNo+"");
										}
										 
										for (var m = 0; m < selctedPass.length; m++) {
											var paxType=selctedPass[m].data. type;
											if(paxType=='AD'){
												passengerURIs.push( {rateURI :selcted[j].data. adultRate,passengerURI:selctedPass[m].data. dataURI }  );
											}
											if(paxType=='CH'){
												passengerURIs.push( {rateURI :selcted[j].data. childRate,passengerURI:selctedPass[m].data. dataURI}  );
											}
											if(paxType=='IN'){
												passengerURIs.push( {rateURI :selcted[j].data. infantRate,passengerURI:selctedPass[m].data. dataURI}  );
											}
										 
										} 

										  
											var timeheldDate=new Date(); 
										perBook.rateMultipleSelectedRateURI=noOfRates;
										perBook.passengers=passengers;
										//perBook.timeheldDate=timeheldDate;
										perBook.noOfSeats=noOfSeats;
										perBook.passengerLength=passengerLength;
										perBook.adultNo=adultNo;
										perBook.childNo=childNo;
										perBook.infantNo=infantNo;
										perBook.inventoryAmount=noOfSeats;
										perBook.noOfPer=noOfPer;
										perBook.offeringURI=offeringURI;
										perBook.noOfPerPerRate=noOfPerPerRate;
										perBook.passengerURIs=passengerURIs;
										perBook.dateFrom=dateFrom;
										perBook.rateURI=rateURI;
										perBook.duration=1;

										componentArray.push(perBook);

									} 
									componentString=componentArray;

							 
									//for (var j = 0; j < selcted.length; j++) {
										//aa.push( {dataURI :selcted[j].data. dataURI,rateURI:selcted[j].json.rateIds,timeheldDate:timeheldDate }  );
									 
									//}  

								 
									//
							//		"noOfPerPerRate":[
//{"rateURI":"tour/rate/1646","noOfPass":"2"},
//{"rateURI":"tour/rate/1648","noOfPass":"1"}
//],
									//if(passengerLength!==noOfSeats){
									// }

										//for (var j = 0; j < selcted.length; j++) {
										 	 
									 //	} 

									  
								 
								/*	var componentString={};
									componentString.rateMultipleSelectedRateURI=flights;
									componentString.passengers=passengers;
									componentString.timeheldDate=timeheldDate;
									componentString.noOfSeats=noOfSeats;
									componentString.passengerLength=passengerLength;
									componentString.adultNo=adultNo;
									componentString.childNo=childNo;
									componentString.infantNo=infantNo;
									componentString.inventoryAmount=noOfSeats;
									componentString.noOfPer=noOfPer;
									*/

									

									var flightStoreArrays = [];
									var flightStore = flightsGrid.getStore().data;
									flightStore.each(function(record,idx){flightStoreArrays.push(record.data)});
									//var myMask = new Ext.LoadMask(this.findParentByType('awesomewindow').el, { msg : "Booking.." });
									var myMask = new Ext.LoadMask(this.findParentByType('awesomewindow').el, { msg : "" });
									myMask.show();
									Ext.Ajax.request({
										url : TDS.env.dataPath + url+'/air'+'?action=book&componentFrom=AIR&currency='+currency,
										jsonData : componentString,
										method : "POST",
										callback : function (b, a, c) {
											 		debugger;
											if (c.status == 200) {
											//	console.log(c.statusText);
											//	Ext.Msg.alert('Status', 'Booked successfully.');
												//myMask.hide();
												//flightsGrid.getStore().load();
												//flightsGrid.getStore().proxy.conn.url=TDS.env.dataPath + 'search/air/rateOffering',
												//	flightsGrid.getStore().load();
												//flightsGrid.getStore().loadData(flightStoreArrays)
 
											 




												var rate = {
														rateURI : this.findParentByType('form').getRateURI()
													};
													Ext.Ajax.request({
														url : TDS.env.dataPath + 'search/air/rateOffering',
														method : 'POST',
														jsonData : rate,
														callback : function (o, s, r) {
													 
															if (s) {
																debugger;
												 
																var ro = Ext.util.JSON.decode(r.responseText);
																var collection = ro['air/rateOffering/collection'];
																if (typeof collection == 'undefined')
																	return;
																var sd = [];
																for (var i = 0; i < collection.length; i++) {

																	// munge the dataURI for this record into the record

																	ro[collection[i]].dataURI = collection[i];

																	sd.push(ro[collection[i]]);

																}

																// load the results into the store
																var storeData = flightsGrid.getStore();
																storeData.loadData(sd);
																flightsGrid.getView().refresh();
															}
														},
														scope : this
													});




  

												 
												myMask.hide();
												this.ownerCt.close();
											}else{
												Ext.Msg.alert('Status',c.responseText);
												myMask.hide();
											}
										},
										scope : this
									});

									},
								}, {
									width : 60
								}, {
									xtype : 'button',
									text : 'Remove',
								 
										handler:function(){
										debugger;
							//rateId
							//dataURI
					 

										var a = this.findParentByType('form').getFlightGrid().getSelectionModel().selections.items[0]
										if(!(a.data.bookStatus=='Held')){
											this.findParentByType('form').getFlightGrid().getStore().remove(a);
										}
									
									
									}

								}, {
									width : 60
								}, {
									xtype : 'button',
									text : 'More Flights',
									//id : 'bookReturn',
									handler : function () {
										debugger;
									 
										//Ext.getCmp('awsomeGrid').getView().refresh();
									//	this.findParentByType('awesomewindow').getView().refresh();;
										this.findParentByType('awesomewindow').hide();
										//this.findParentByType('awesomewindow').close();

									}
								},

							]
						}
					]
				}, {
					title : 'Passenger',
					//	frame:true,
					items : [{
							xtype : 'panel',
							//layout: 'form',
							layout : 'table',
							frame : true,

							layoutConfig : {
								columns : 1
							},
							labelWidth : 110,
							border : false,
							style : 'padding: 2px;',
							defaultType : 'textfield',
							items : [{
									xtype : 'panel',
									width : 725,
									height : 255,
									border : true,
									style : 'padding: 2px;',
									items : [{
											xtype : 'editorgrid',
											alwaysUseCollection : true,
											singleSelect:true,
											width : 725,
											height : 170,
											border : false,
											
											store : new Ext.data.CollectionStore({
												url : '',
												identifier : '',
												fields : ['type', 'code', 'nameFirst', 'nameLast', 'salutation', 'displayName', 
													'dateOfBirth', 'paxAge','gender']
											}),
											sm : new Ext.grid.CheckboxSelectionModel({ }),
											

											columns : [
												new Ext.grid.CheckboxSelectionModel({ }),
												/*{
													header : "",
													width : 55,
													dataIndex : 'chkbox',
													editable : false,
													width : 30,
													fixed : true,
													renderer : function (value, metaData, record, rowIdx, colIdx, store) {
														var dataURI = record.get('dataURI');
														return '<input type="checkbox" id = "rd' + dataURI + '" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">';
													}
												},*/ {
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
													header : 'Last Name',
													dataIndex : 'nameLast',
													editor : new Ext.form.TextField({
														allowBlank : false
													})
													//	width : 100
												}, {
													header : 'First Name',
													dataIndex : 'nameFirst',
													//width : 100
													editor : new Ext.form.TextField({
														allowBlank : false
													})
												}, {
													header : 'Title',
													dataIndex : 'salutation',
													//width : 100
													editor : new Ext.form.ComboBox({
														store : TDS.data.salutations,
														editable : false,
														forceSelection : true,
														mode : 'local',
														triggerAction : 'all',
														displayField : 'text',
														valueField : 'text'
													})
												}, {
													header : 'Gender',
													dataIndex : 'gender',
													//	width : 100
													editor : new Ext.form.ComboBox({
														//allowBlank : false
														forceSelection : true,
														mode : 'local',
														triggerAction : 'all',
														displayField : 'text',
														valueField : 'text',
															store:TDS.data.gender
													})
												}, {
													header : 'DOB',
													dataIndex : 'dateOfBirth',
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
												}, {
													header : 'Seat No',
													dataIndex : 'seat',
													editor : new Ext.form.TextField({
														allowBlank : false
													})
												}, {
													header : 'Xtra',
													dataIndex : 'xtra',
													editor : new Ext.form.TextField({
														allowBlank : false
													})
												}
//															{
//													header : 'Rate',
//													dataIndex : 'departure',
//													editor : new Ext.form.TextField({
//														allowBlank : false
//													})
//												},

											],
											viewConfig : {
												forceFit : true
											},
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
																//s.add(dirty:true);
														// store the new record index
														g.newRecordIndex = s.getCount() - 1;
														//g.startEditing(g.newRecordIndex, 2);
														g.startEditing(g.newRecordIndex, 1);
														g.getSelectionModel().selectRow(g.newRecordIndex);//raushan
													}
												},
												{
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
													text : 'Save',//id:'save',
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
													//	if (record == -1 || typeof record.get('dataURI') != 'undefined')
														//{
														//}
														//	return;
														
														//console.log(record);

														// raushan
												
														var selectedData = g.getSelectionModel().getSelections();
														//var modifiedRecord = g.getStore().getModifiedRecords();
														var methods = '', urls = '';

														if( selectedData.length == 1 //&& selectedData[0].dirty == false
															) {
															if(typeof selectedData[0].get('dataURI') != 'undefined' ){
																	methods = 'PUT',
																	urls = TDS.env.dataPath + selectedData[0].get('dataURI');
																}else{
																methods ='POST',
																urls=TDS.env.dataPath + w.getDataURI('pnr') + '/passengers'
																
															}
														
														
														}
													

														Ext.Ajax.request({
															url : urls,
															jsonData : selectedData[0].data,
															method : methods,
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
													text : 'Addional Info',
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

													/*	var fp = this.ownerCt.findParentByType('form');

														var myMask = new Ext.LoadMask(this.findParentByType('awesomewindow').el, {
																msg : ""
															});
														myMask.show();
														*/

														TDS.innerWindow.setWindow({
													height : 300,
													width : 200,
													autoDestroy : false,
													title : 'Passenger Profile',
													interfaceURI : 'pnr/passenger/passengerDetails.js',
													sourceDataURI : dataURI,
													destinationDataURI : dataURI,

													closeAction : 'hide',
													buttonOK : 'Submit',

													callback : {
														fn : function (s, data, responseData) {},

														scope : this
													}
												});

													/*	new Ext.Window({
															title : 'Passenger Profile',
															height : 420,//750 350
															width : 760,
															layout : 'fit',
															maskDisabled : false,
															closeAction : 'hide',
															closable : false,
															draggable : false,
															plain : true,
															items : new Ext.TabPanel({

																activeTab : 0,
																layoutOnTabChange : true,
																items : [{

																		title : 'Documentation',
																		items : {
																			xtype : 'panel',
																			layout : 'form',
																			labelWidth : 110,
																			border : false,
																			style : 'padding: 8px;',
																			items : [{
																					xtype : 'textfield',
																					name : 'nationalityCountry',
																					fieldLabel : 'Nationality',
																					width : 200,
																					readOnly : true
																				}, {
																					xtype : 'editorgrid',
																					height : 230,
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

																					listeners : {
																						render : function () {

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
																				}
																			]
																		}

																	}, {

																		title : 'SSR',
																		items : {
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

																			listeners : {
																				render : function () {

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
																		}

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
																			style : 'padding: 2px;',
																			defaultType : 'textfield',
																			items : [{
																					xtype : 'panel',
																					layout : 'fit',

																					border : true,
																					autoScroll : true,
																					style : 'padding: 2px;',
																					defaultType : 'textfield',
																					items : [{
																							xtype : 'editableGrid', //awesomegrid   editorgrid
																							//id : 'member',
																							//searchURI: TDS.env.dataPath + '/PassengerMemberships',
																							//	clicksToEdit : 1,
																							alwaysUseCollection : true,
																							width : 670,
																							height : 120,
																							border : false,

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
																								beforerender : function () {},
																								sessioninit : function () {
																									//debugger;
																									var a = this.findParentByType('awesomewindow');
																									this.searchURI = TDS.env.dataPath + dataURI + '/passengerMemberships';

																								},
																								render : function () {}
																							}
																						}
																					]
																				}
																			]
																		}

																	}
																],
																listeners : {
																	render : function () {
																		Ext.Ajax.request({
																			url : TDS.env.dataPath + dataURI,
																			method : "GET",
																			callback : function (b, a, c) {

																				if (a) {
																					var ro = Ext.util.JSON.decode(c.responseText);
																					this.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(ro.nationalityCountry);

																				}
																			},
																			scope : this
																		});

																	}

																}

															}),

															buttons : [{
																	text : 'Submit',
																	//id : 'submit',
																	disabled : false,
																	handler : function () {
																		var modifiedDocs = this.ownerCt.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).getStore().modified;
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
																			},
																			scope : this
																		});
																	}
																}, {
																	text : 'Close',
																	//id : 'close',
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

											],//id:'xxx',
											listeners : {
												beforerender : function () {},
												sessioninit : function () {
													//debugger;
													//								var a = this.findParentByType('awesomewindow');
													//								var pnrDataURI = a.initialConfig.destinationDataURI;
													//								//alert(TDS.env.dataPath +pnrDataURI+ '/PassengerMemberships');
													// 								this.searchURI = TDS.env.dataPath +pnrDataURI+ '/cruisePorts';

												},
												render : function () {
													var w = this.ownerCt.findParentByType('awesomewindow');
												 
													with (this.store) {
														reader.meta.identifier = w.getDataURI('pnr') + '/passengers';
														proxy.conn.url = TDS.env.dataPath + w.getDataURI('pnr') + '/passengers/concise';
														load();
													}
												},
													afteredit:   function( e) {
													
													if(this.getSelectionModel().getSelections()[0].dirty){
														this.getBottomToolbar().items.itemAt(2).enable();
													
													}

												}


											}
										}, {
											xtype : 'panel',
											style : 'padding: 0; margin-top: 25px; margin-bottom: 4px;',
											border : false,
											layout : 'table',
											layoutConfig : {
												columns : 5
											},
											defaults : {
												border : false
											},
											items : [{
													html : '',
													width : Ext.isIE ? 125 : 200
												}, {
													xtype : 'checkbox',
													name : 'book',
													inputValue : false,
													hidden:true,
													listeners : {
														render : function () {},
													}
												}, {
													html : 'Extra Leg Room',
													style : 'padding: 0; margin-left: 1px; margin-right: 25px;',
													width : Ext.isIE ? 43 : 125,
													hidden:true
												}, {
													xtype : 'checkbox',
													name : 'quote',
													inputValue : true,
													hidden:true,
													listeners : {
														render : function () {},
													}
												}, {
													html : 'Priority Check In',
													style : 'padding: 0; margin-left: 1px; margin-right:25px;',
													width : Ext.isIE ? 38 : 120,
													hidden:true
												}, {
													html : '',
													width : Ext.isIE ? 125 : 200
												}, {}, {
													html : ' ',
													width : Ext.isIE ? 43 : 125
												}, {
													xtype : 'checkbox',
													name : 'bording',
													inputValue : true,
													hidden:true,
													listeners : {
														render : function () {
															//
														},
													}
												}, {
													html : 'Priority Boarding',
													style : 'padding: 0; margin-left: 1px; margin-right:25px;',
													width : Ext.isIE ? 38 : 120,
													hidden:true
												}
											]
										}
									]
								},

							]
						}, 
//								{
//							xtype : 'panel',
//							layout : 'table',
//							border : false,
//							style : 'padding: 20px;',
//
//							layoutConfig : {
//								columns : 7
//							},
//							defaults : {
//								border : false
//							},
//							items : [
//								{
//									width : 250
//								}, {
//									xtype : 'button',
//									text : 'Confirm',
//									//	style : 'padding-left: 20px;',
//								}, {
//									width : 50
//								}, {
//									xtype : 'button',
//									text : 'Close'
//								},
//
//							]
//						}
					]
				},
				// activity tab
					{
					title : 'Seats', //'Activity',
					layout : 'fit',
					items: [
					/*	{
							 
							html: '', 
							listeners: { 
									beforerender: function () {
										//debugger;
										// this.html=  'ddd';
										 // this.html=   this.findParentByType('form').getTermsURI()
									}
							} 
						}
						*/
					{
						
							xtype : 'panel',
							//layout: 'form',
							layout : 'column',
							//frame : true,

						//	layoutConfig : {
						//		columns : 2
						//	},
							labelWidth : 110,
							border : false,
							style : 'padding: 2px;',
							defaultType : 'textfield',
							items : [
								{
									xtype : 'panel',
									width : '25%',
									height : 255,
									border : true,
									style : 'padding: 2px;',
										 columnWidth: .3,
									items : [
										/*
															{
						xtype: 'awesomepanel',
						height: 136,
						layout: 'fit',
						searchURI: '',
						store: new Ext.data.JsonStore({
							url: '',
							id: 'dataURI',
							fields: ['dataURI','nameFirst' ]
						}),
						tbar: [
							'Flight',
							{
								xtype: 'textfield',
								name: 'flight',
								enableKeyEvents: true,
								width: 60
							},
									],
									*/

								//	items:[
										{
											xtype : 'grid',//grid
												border: false,
								enableColumnHide: false,
								enableColumnMove: false,
								enableColumnResize: false,
								enableHdMenu: false,
								viewConfig: {
									forceFit: true
								},height:150,
										sm :new Ext.grid.CheckboxSelectionModel(),
										store: new Ext.data.JsonStore({
																	url: '',
																	id: 'id',
																	fields: ['nameFirst', 'dataURI']
																}),
			//	id:'ll',
												columns : [
				{
										header : "",
										width : 55,
										id : 'check',
										dataIndex : 'chk',
										editable : false,
										width : 20,
										fixed : true,
										renderer : function (value, metaData, record, rowIdx, colIdx, store) {
											var dataURI = record.get('dataURI');
											return '<input type="radio" id = "rd' + dataURI + '" name="parentRate" /><input type="hidden" name="existingParentId" id="existingParentId" value="">';
										}
									},

									 

									{
										header : "Passenger",
									//	width : 50,										 
										dataIndex : 'nameFirst',
											//fixed:true
										 

									},
										{
										header : "Flight",
									//	width : 40,						
										dataIndex : 'flight',										 

									},
										{
										header : "Seat No",
										//width : 40,	
										dataIndex : 'seatNo',
										 

									}
									]
										}
															]
														//	}
									//]
								},
										{
									xtype : 'panel',
									width :'75%',
									height : 255,
									border : true,
									style : 'padding: 2px;',
										 columnWidth: .7,
									items : [
										//{
										//	xtype : 'textfield',

									//}
									]
								}
									]
					}
							
						
						
						
						
						
						
						
						
						
						
						
						]
				},
				{
					title : 'Terms', //'Activity',
					layout : 'fit',
					 
					items: [
						{
							 
							html: '', 
							autoScroll:true,
							style:'padding:10px',
							border:false,
							listeners: { 
									beforerender: function () {
										// this.html=  'ddd';
										  this.html=   this.findParentByType('form').getTermsURI()
									}
							} 
						}]
				},
				// details tab
				/*
				{
					title : 'Inclusions',
					bodyStyle : 'padding: 0px 0px 0px 0px;',
					hidden:true,
					items : [{
							xtype : 'panel',
							//layout: 'form',
							layout : 'table',

							layoutConfig : {
								columns : 1
							},
							labelWidth : 110,
							border : false,
							style : 'padding: 2px;',
							//defaultType : 'textfield',
							items : []
						}
					]

				},*/

			],
				listeners: { 
				tabchange : function (  tabPanel, newCard, oldCard, eOpts ) {

					
 					 
					if(tabPanel.getActiveTab().title== 'Seats'){
						debugger;




 

						var flightgridLength=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items.length;
						var paxgridLength=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections.items.length;
 								var flightgrid=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
								var selectedFlight=flightgrid.getSelectionModel().selections;
								var offeringId = [],adultRate = [],childRate = [], infantRate = [], rateName = [], offeringData =[];
								selectedFlight.each(function(record,idx){
									offeringData.push({'offeringId':record.data.offeringURI,
											'adultRate':record.data.adultRate,
											'childRate':record.data.childRate,
											'infantRate':record.data.infantRate,
											'rateName':record.data.rateName,
										
									})
						 
									});
 								var selectedPax=this.items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections;
								var selectedPaxId=[];
								selectedPax.each(function(record,idx){selectedPaxId.push(record.id);});
								 
								var jsonData = {};
								jsonData.offeringData = offeringData;
 								jsonData.selectedPaxId = selectedPaxId;
 							//	console.log(jsonData);



/*
						var store = Ext.getCmp('tab').items.itemAt(1).items.itemAt(0).items.itemAt(0).items.itemAt(0).getSelectionModel().selections;
						var a = [];
  
						store.each(function(record,idx){a.push({'nameFirst':record.data.nameFirst});});
						Ext.getCmp('ll').getStore().loadData(a);
						*/
                                   var pnr =   this.findParentByType('awesomewindow').initialConfig.dataURI.pnr;
											Ext.Ajax.request({
													url : TDS.env.dataPath + pnr+ "/passengers",
													jsonData : jsonData,
													method : "POST",
													callback : function (b, a, c) {
														 
													},
													scope : this
												})




					//	}
					 
					}

				},
					titlechange:function( p, The ){
				//	console.log('^^^^^^^^^^^^^^^^^         1');
				//console.log(p.getTitle());
				
				}
			}
		}
	]
}
 

















































































































































































































































































































































































































































































































































