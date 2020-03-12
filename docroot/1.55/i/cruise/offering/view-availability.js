{
	xtype: "panel",
	layout: Ext.isIE ? "fit" : "",
	autoScroll: true,
	bodyStyle: "padding: 8px;",
	tbar: ["->", {
			xtype: "button",
			text: "Block Availability",
			handler: function () {
				var b = this.ownerCt.ownerCt.ownerCt;
				var a = this.ownerCt.ownerCt.items.itemAt(0);
				var c = a.getQueryParams();

			/*	var  = this.findParentByType('ajaxpanel').ownerCt.items.itemAt(2).findByType('awesomegrid')[0].getSelectionModel().getSelections();
				var catName ="";
							if(categoriyData.length == 1){
							catName = categoriyData[0].get('name');

							}else{
							console.log('^^^^^^^^^^^');
							}
							*/




				if (c) {
					var e = {
						startDate: c.dateFrom,
						endDate: c.dateTo,
						rateURI: c.accommodationRateURI
					}
				}
				TDS.window.setWindow({
					title: "Block accommodation Availability",
					interfaceURI: "popup/blockOutAvailability.js",
					baseDataURI: b.baseDataURI,
					destinationDataURI: b.baseDataURI + "/availability/blockOut",
					data: e,
					callback: {
						fn: function (g, h, f, d) {
							if (g) {
								if (d == 202) {
									TDS.env.heartbeat.pulseStart(true)
								} else {
									this.submitQuery(true)
								}
							}
						},
						scope: a
					}
				})
			}
		}, " ", {
			xtype: "redbutton",
			text: "Manage Availability",id:'redbutton',
			handler: function () { ;
				var b = this.ownerCt.ownerCt.ownerCt;
				var a = this.ownerCt.ownerCt.items.itemAt(0);
				var g = "";
				var c = "";
				var catName ="";
				var code = '';
					var categoryGrid = this.findParentByType('ajaxpanel').ownerCt.items.itemAt(2).findByType('awesomegrid')[0];
					if(typeof (categoryGrid)!='undefined' ){
					var categoriyData  = categoryGrid.getSelectionModel().getSelections();
				
							if(categoriyData.length == 1){
							catName = categoriyData[0].get('name');
							code = categoriyData[0].get('code');

							}else{
							//console.log('^^^^^^^^^^^');
							 Ext.MessageBox.alert('Message', 'Please select a categories', function(){

								 console.log('^^^^^^^^^^^');
									  return false;
								 });
							}


					}else{
						console.log('Not grid');
						 Ext.MessageBox.alert('Message', 'Please select a categories', function(){
									  return false;
								 });

					}
				/*	function GetFormattedDate(todayTime) {
  //  var todayTime = new Date();
    var month = format(todayTime .getMonth() + 1);
    var day = format(todayTime .getDate());
    var year = format(todayTime .getFullYear());
    return month + "/" + day + "/" + year;
}*/
function dateformat(date){
var mydate = new Date(date);
var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][mydate.getMonth()];
return mydate.getDate()+  ""+ month + '' + mydate.getFullYear().toString().substr(2,2);

}


				Ext.Ajax.request({
					method: "GET",
					url: TDS.env.dataPath + b.baseDataURI,
					callback: function (j, d, h) {
						if (d) {
							depDateText = g;
							depDateTexts = c;
							var i = Ext.util.JSON.decode(h.responseText);

						/*	console.log("*************");
							var  categoriyData= this.findParentByType('ajaxpanel').ownerCt.items.itemAt(2).findByType('awesomegrid')[0].getSelectionModel().getSelections();
							if(categoriyData.length == 1){
							//[0].get('name')

							}*/

							console.log(i.departureDate);
							depDateText = i.departureDate;
							depDateTexts = i.departureDateText
						}
					},
					scope: this
				});
				/*var e = a.getQueryParams();
				if (e) {
					var f = {
						startDate: e.dateFrom,
						endDate: e.dateTo,
						cruiseRateURI: e.cruiseRateURI,
						depDate: dateformat(depDateText),
					//	depDateTexts: depDateTexts,
							cateName:catName,
								code:code
					}
				}*/
				var e = a.getQueryParams();
				if (e)
				var f = {
						startDate: e.dateFrom,
						endDate: e.dateTo,
						cruiseRateURI: e.cruiseRateURI,
							depDate:depDateText,
						depDate1:dateformat(depDateText),
						depDateTexts:depDateTexts ,
						cateName:catName,
						code:code
						};

						console.log('^^^^^^^^^^^^^^^^^^^^^^');
						console.log(f);
				TDS.window.setWindow({
					title: "Manage cruise Availability",
					instentClose: true,
					interfaceURI: "cruise/offering/inventory-manage.js",
					baseDataURI: b.baseDataURI,
					destinationDataURI: b.baseDataURI + "/availability",
					data: f,
					helpTitel: "Manage Availability Help",
					helpId: "25",
					callback: {
						fn: function (i, j, h, d) {
							if (i) {
								if (d == 202) {
									TDS.env.heartbeat.pulseStart(true)
								} else {
									this.submitQuery(true)
								}
							}
						},
						scope: a
					}
				})
			}
		}
	],
	items: {
		xtype: "awesomegrid",
		pinnable: true,
		enableRowExpander: false,
		tbar: ["", {
				xtype: "datefield",
				name: "dateFrom",
				enableKeyEvents: true,
				showToday: false,
				width: 80,
				format: "dMy",
				hidden: true,
				excludeFromSession: true,
				value: new Date(),
				format: "dMy",
				minValue: new Date(),
				listeners: {
					extraselect: function (b, a) {}
				}
			}, "", "", "", {
				xtype: "datefield",
				name: "dateTo",
				enableKeyEvents: true,
				showToday: false,
				hidden: true,
				width: 80,
				format: "dMy",
				excludeFromSession: true,
				value: new Date(current_year, current_month + 3, current_date),
				format: "dMy",
				minValue: new Date(),
				listeners: {
					extraselect: function (b, a) {}
				}
			}, "", "Category ", " ", {
				xtype: "combo",
				name: "cruiseRateURI",
				mode: "local",
				width: 200,
				triggerAction: "all",
				editable: false,
				displayField: "code",
				valueField: "dataURI",
				updateRates: function (b, a, c) {
					this.store.removeAll();
					this.store.add(a);
					if ((this.getValue() == null || this.getValue() == "") && a.length > 0) {
						this.setValue(a[1].data.dataURI)
					} else {
						this.setValue(this.getValue())
					}
				}
			}, " ", "Show:", {
				xtype: "combo",
				name: "showOnly",
				mode: "local",
				width: 60,
				value: "50",
				triggerAction: "all",
				editable: false,
				store: ["25", "50", "100"]
			}, "->", {
				xtype: "button",
				disabled: true,
				text: "Cabins Availability",
				handler: function () {
					var a = this.ownerCt.ownerCt;
					var b = a.getSelections();
					TDS.window.setWindow({
						title: "Cruise cabins availability",
						buttonOK: false,
						searchURI: TDS.env.dataPath + b[0].data.rateURI,
						interfaceURI: "cruise/offering/availability/cabinAvailability.js"
					})
				}
			}
		],
		store: new Ext.data.JsonStore({
			url: "",
			id: "dataURI",
			fields: ["dataURI", "date", "rateURI", "rateName", "inventoryAvailable", "inventoryHeld", "inventoryConfirmed", "inventoryCancelled",
				"queueRequestable", "queueRequested", "queueAccepted", "queueDenied", "availabilityBlocked", "waitingWaitable", "waitingWaiting", 
				"waitingAccepted", "waitingDenied", "category"]
		}),
		sm: new Ext.grid.RowSelectionModel(),
		cm: new Ext.grid.ColumnModel([{
					header: "Date",
					dataIndex: "date",
					sortable: true,
					renderer: function (c, b, a) {
						if (a.get("availabilityBlocked")) {
							return TDS.util.Format.dateSpecial(c, TDS.env.dateFormatDisplay) + " (Blocked)"
						} else {
							return TDS.util.Format.dateSpecial(c, TDS.env.dateFormatDisplay)
						}
					}
				}, {
					header: "Category",
					dataIndex: "category",
					sortable: true
				}, {
					header: "Available",
					dataIndex: "inventoryAvailable",
					sortable: true,
					renderer: TDS.util.Format.availabilityInventory
				}, {
					header: "Held",
					dataIndex: "inventoryHeld",
					sortable: true
				}, {
					header: "Confirmed",
					dataIndex: "inventoryConfirmed",
					sortable: true
				}, {
					header: "Cancelled",
					dataIndex: "inventoryCancelled",
					sortable: true
				}, {
					header: "Requests",
					dataIndex: "queueRequestable",
					sortable: true,
					renderer: TDS.util.Format.availabilityQueue
				}, {
					header: "Requested",
					dataIndex: "queueRequested",
					sortable: true
				}, {
					header: "Accepted",
					dataIndex: "queueAccepted",
					sortable: true
				}, {
					header: "Denied",
					dataIndex: "queueDenied",
					sortable: true
				}, {
					header: "Waitlist Total",
					dataIndex: "waitingWaitable",
					sortable: true,
					renderer: TDS.util.Format.availabilityWaiting
				}, {
					header: "Waitlist No",
					dataIndex: "waitingWaiting",
					sortable: true
				}, {
					header: "Confirmed",
					dataIndex: "waitingAccepted",
					sortable: true
				}, {
					header: "Denied",
					dataIndex: "waitingDenied",
					sortable: true
				}
			]),
		viewConfig: {
			forceFit: true
		},
		listeners: {
			toolbarinit: function () {
				var d = this.ownerCt.findParentByType("ajaxpanel");
				this.searchURI = TDS.env.dataPath + d.baseDataURI + "/availability";
				var a = this.getTopToolbar();
				var b = a.items.itemAt(9);
				var c = Ext.StoreMgr.lookup(d.baseDataURI + "/rates");
				console.log(c)
				b.store = c;
				c.on("load", b.updateRates, b)
			},
			render: function () {
				this.getSelectionModel().on("rowselect", function () {
					this.items.itemAt(14).setDisabled(false)
				}, this.getTopToolbar());
				this.getSelectionModel().on("rowdeselect", function () {
					this.items.itemAt(14).setDisabled(true)
				}, this.getTopToolbar())
			},
			rowdblclick: function (c, f, d) { ;
				var b = c.getStore().getAt(f);
				var a = b.get("dataURI");
				TDS.window.setWindow({
					title: "Update cruise availability",
					interfaceURI: "cruise/offering/inventory-edit.js",
					destinationDataURI: a,
					sourceDataURI: a,
					buttonOK: "Submit",
					callback: {
						fn: function (h, i, g, e) {
							if (h) {
								if (e == 202) {
									TDS.env.heartbeat.pulseStart(true)
								} else {
									this.submitQuery(true)
								}
							}
						},
						scope: c
					}
				})
			}
		}
	}
}























