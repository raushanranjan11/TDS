Ext.namespace("TDS.data");
TDS.data = {
	currentPNRComponentType : "",
	passengerTypeLookup : {
		ADULT : "AD",
		CONCESSION : "CN",
		INFANT : "IN"
	},
	rateClassType : {
		ADULT : "Adult",
		CHILD : "Child",
		CONCESSION : "Concession"
	},
	ratePerType : {
		PERSON : "person",
		GROUP : "group",
		ROOM : "room",
		CABIN : "cabin"
	},
	rateOccupancyType : {
		SINGLE : "single",
		TWIN : "twin",
		TRIPLE : "triple",
		QUAD : "quad"
	},
	rateOccupancyTypeLookup : {
		single : 1,
		twin : 2,
		triple : 3,
		quad : 4
	},
	ratePerTypePlural : {
		person : "people",
		group : "groups",
		room : "rooms",
		cabin : "cabins"
	},
	weeklyScheduleDays : {
		SUNDAY : 1,
		MONDAY : 2,
		TUESDAY : 3,
		WEDNESDAY : 4,
		THURSDAY : 5,
		FRIDAY : 6,
		SATURDAY : 7
	},
	componentStatus : {
		STATUS_NEW : "New",
		STATUS_HELD : "Held",
		STATUS_REQUESTED : "Requested",
		STATUS_CONFIRMED : "Confirmed",
		STATUS_PART_CONFIRMED : "Part confirmed",
		STATUS_CONFIRM_PASSENGER : "confirm passenger",
		STATUS_CANCEL_PASSENGER : "Cancel passenger",
		STATUS_CANCEL_REQUESTED : "Cancel requested",
		STATUS_CANCELLED : "Cancelled",
		STATUS_REJECTED : "Rejected",
		STATUS_RELEASED : "Released",
		STATUS_QUOTE : "Quote",
		STATUS_OK : "Ok",
		STATUS_SET : "Alarm set",
		STATUS_GO : "Alarm off",
		STATUS_DELETE : "Deleted"
	},
	componentStatusAbbr : {
		STATUS_HELD : "HK",
		STATUS_REQUESTED : "RQ",
		STATUS_CONFIRMED : "HK",
		STATUS_CANCEL_REQUESTED : "XK",
		STATUS_CANCELLED : "XX",
		STATUS_QUOTE : "QT"
	},
	reservationStatus : {
		STATUS_REQUEST : "RQ",
		STATUS_NOT_AVAILABLE : "NA",
		STATUS_OK : "OK"
	},
	reservationType : {
		FREESALE : -1,
		UNLIMITED : -1
	},
	reservationTypeAbbr : {
		FREESALE : "FS",
		UNLIMITED : "UL"
	},
	componentActivityLogType : {
		REQUEST : "REQUEST",
		ACCEPTED_REQUEST : "ACCEPTED_REQUEST",
		REJECTED_REQUEST : "REJECTED_REQUEST",
		RELEASED_REQUEST : "RELEASED_REQUEST",
		BOOKING : "BOOKING",
		CONFIRMATION : "CONFIRMATION",
		CANCELLATION : "CANCELLATION",
		PASSENGER_CANCEL : "PASSENGER_CANCEL",
		PART_CONFIRMATION : "PART_CONFIRMATION",
		ALT_OFFER_NOTE : "ALT_OFFER_NOTE",
		CANCELLATION_REQUEST : "CANCELLATION_REQUEST",
		ACCEPTED_CANCELLATION : "ACCEPTED_CANCELLATION",
		REQUEST_NOTE : "REQUEST_NOTE",
		REQUEST_NOTE_TO_SUPPLIER : "REQUEST_NOTE_TO_SUPPLIER",
		REQUEST_NOTE_TO_AGENT : "REQUEST_NOTE_TO_AGENT",
		BOOKING_NOTE : "BOOKING_NOTE",
		BOOKING_NOTE_TO_SUPPLIER : "BOOKING_NOTE_TO_SUPPLIER",
		BOOKING_NOTE_TO_AGENT : "BOOKING_NOTE_TO_AGENT",
		CANCELLATION_NOTE : "CANCELLATION_NOTE",
		CANCELLATION_NOTE_TO_SUPPLIER : "CANCELLATION_NOTE_TO_SUPPLIER",
		CANCELLATION_NOTE_TO_AGENT : "CANCELLATION_NOTE_TO_AGENT"
	},
	componentType : {
		TYPE_ACCOMMODATION : "ACCOMMODATION",
		TYPE_HOSTEL : "HOSTEL",
		TYPE_TOUR : "TOUR",
		TYPE_CAR : "CAR",
		TYPE_RAIL : "RAIL",
		TYPE_RAIL_PASS : "RAILPASS",
		TYPE_AIR : "AIR",
		TYPE_CRUISE : "CRUISE",
		TYPE_ATTRACTION : "ATTRACTION",
		TYPE_ATTRACTION_NEW : "SERVICES",
		TYPE_OWN : "OWN",
		TYPE_TRANSFER : "TRANSFER",
		TYPE_SIGHTSEEING : "SIGHTSEEING",
		TYPE_SIGHTSEEING_NEW : "DAY TOUR",
		TYPE_MANUAL : "MANUAL"
	},
	componentActivityLogType : {
		REQUEST : "REQUEST",
		ACCEPTED_REQUEST : "ACCEPTED_REQUEST",
		REJECTED_REQUEST : "REJECTED_REQUEST",
		RELEASED_REQUEST : "RELEASED_REQUEST",
		BOOKING : "BOOKING",
		CONFIRMATION : "CONFIRMATION",
		CANCELLATION : "CANCELLATION",
		PASSENGER_CANCEL : "PASSENGER_CANCEL",
		PART_CONFIRMATION : "PART_CONFIRMATION",
		ALT_OFFER_NOTE : "ALT_OFFER_NOTE",
		CANCELLATION_REQUEST : "CANCELLATION_REQUEST",
		ACCEPTED_CANCELLATION : "ACCEPTED_CANCELLATION",
		REQUEST_NOTE : "REQUEST_NOTE",
		REQUEST_NOTE_TO_SUPPLIER : "REQUEST_NOTE_TO_SUPPLIER",
		REQUEST_NOTE_TO_AGENT : "REQUEST_NOTE_TO_AGENT",
		BOOKING_NOTE : "BOOKING_NOTE",
		BOOKING_NOTE_TO_SUPPLIER : "BOOKING_NOTE_TO_SUPPLIER",
		BOOKING_NOTE_TO_AGENT : "BOOKING_NOTE_TO_AGENT",
		CANCELLATION_NOTE : "CANCELLATION_NOTE",
		CANCELLATION_NOTE_TO_SUPPLIER : "CANCELLATION_NOTE_TO_SUPPLIER",
		CANCELLATION_NOTE_TO_AGENT : "CANCELLATION_NOTE_TO_AGENT"
	},
	getStore : function (a) {
		var d = this.getStoreName(a.dataURI);
		var b = false;
		if (typeof a.reload != "undefined" && a.reload) {
			b = true
		}
		var c = (typeof TDS.data[d] == "object");
		if (c && TDS.data[d].storeLoaded && !b) {
			return TDS.data[d]
		}
		if (!c || b) {
			TDS.data[d] = new Ext.data.Store({
					storeId : d,
					autoLoad : true,
					id : "dataURI",
					url : a.dataURI,
					reader : new Ext.data.CollectionReader({
						identifier : a.identifier,
						fields : a.fields
					}),
					listeners : {
						load : this.onStoreLoad
					}
				})
		}
		if (typeof a.callback != "undefined") {
			this.applyStoreCallback(TDS.data[d], a.callback);
			return -1
		}
		return TDS.data[d]
	},
	applyStoreCallback : function (a, b) {
		a.on("load", b.fn, b.scope)
	},
	onStoreLoad : function (b, a) {
		this.storeLoaded = true
	},
	getStoreName : function (a) {
		var c = a.split("/");
		for (var b = 2; b < c.length; b++) {
			c[b] = c[b].substr(0, 1).toUpperCase() + c[b].substr(1).toLowerCase()
		}
		c = c.join("");
		return c
	},
	findRecordBy : function (d, f, e, g) {
		if (g) {
			d += "Concise"
		}
		var c = TDS.data[d];
		if (!c) {
			return -1
		}
		var b = c.findBy(function (h, i) {
				if ((h.data[f]) == e) {
					return true
				}
			}, this, 0);
		if (b == -1) {
			return -1
		}
		var a = c.getAt(b);
		if (typeof a == "undefined") {
			return -1
		}
		return a
	},
	getStoreNameByResourceDataURI : function (b) {
		if (typeof b == "undefined") {
			return false
		}
		var c = b.substring(0, b.lastIndexOf("/"));
		var a = c.length,
		d = c.charAt(a - 1);
		if (d == "y") {
			c = c.substring(0, a - 1) + "ies"
		} else {
			c += (d == "s") ? "es" : "s"
		}
		var e = TDS.data.getStoreName(TDS.env.dataPath + "/" + c + "/collection");
		return e
	},
	findRecordByResourceDataURI : function (b) {
		var c = TDS.data.getStoreNameByResourceDataURI(b);
		if (!c) {
			return -1
		}
		var a = TDS.data.findRecordBy(c, "dataURI", b);
		if (a != -1) {
			return a
		}
		return -1
	},
	supplierURI : "",
	getCCStore : function (a) {
		var c = this.getStoreName(a.dataURI);
		var b = this.supplierURI;
		TDS.data[c] = new Ext.data.Store({
				storeId : c,
				autoLoad : true,
				id : "dataURI",
				url : a.dataURI + "?supplierURI=" + b,
				reader : new Ext.data.CollectionReader({
					identifier : a.identifier + "?supplierURI=" + b,
					fields : a.fields
				}),
				listeners : {
					load : this.onStoreLoad
				}
			});
		this.supplierURI = "";
		if (typeof a.callback != "undefined") {
			this.applyStoreCallback(TDS.data[c], a.callback);
			return -1
		}
		return TDS.data[c]
	},
	salutations : new Ext.data.SimpleStore({
		storeId : "salutations",
		fields : ["text"],
		expandData : true,
		data : ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Rev", "Master"]
	}),
	passengerType : new Ext.data.SimpleStore({
		storeId : "passengerType",
		fields : ["text", "description"],
		data : [[" ", " "], ["AD", "Adult"], ["CN", "Concession"], ["CH", "Child"], ["IN", "Infant"]]
	}),
	countentType : new Ext.data.SimpleStore({
		storeId : "countentType",
		fields : ["value", "description"],
		data : [[" ", " "], [true, "Own Content"], [false, "All Content"]]
	}),
	itineraryDisplay : new Ext.data.SimpleStore({
		storeId : "itineraryDisplay",
		fields : ["value", "description"],
		data : [[0, "No prices"], [1, "Grand Total only"], [2, "Component Prices and Grand Total"]]
	}),
	invoiceDisplay : new Ext.data.SimpleStore({
		storeId : "invoiceDisplay",
		fields : ["value", "description"],
		data : [[true, "Detailed"], [false, "Summary"]]
	}),
	selectedRates : new Ext.data.SimpleStore({
		storeId : "selectedRates",
		fields : ["nameString", "dataURI"],
		data : []
	}),
	componentStatusStore : new Ext.data.SimpleStore({
		storeId : "compStatus",
		fields : ["name", "dataURI"],
		data : [[" ", " "], ["Held", "Held"], ["Requested", "Requested"], ["Confirmed", "Confirmed"], ["Cancel request", "Cancel request"], ["Cancel", "Cancel"], ["Quote", "Quote"]]
	}),
	currencies : new Ext.data.SimpleStore({
		storeId : "currencies",
		id : 0,
		fields : ["value", "text"],
		data : [[" ", " "], ["ARS", "Argentinian Peso"], ["AUD", "Australian Dollar"], ["THB", "Thai Baht"], ["BHD", "Bahrain Dinar"], ["GBP", "British Pound"], ["BND", "Brunei Dollar"], ["CAD", "Canadian Dollar"], ["CLP", "Chilean Peso"], ["XPF", "CF du Pacifique Franc"], ["DKK", "Danish Krone"], ["MAD", "Moroccan Dirham"], ["VND", "Vietnamese Dong"], ["EUR", "Euro"], ["FJD", "Fiji Dollar"], ["HUF", "Hungarian forint"], ["HKD", "Hong Kong Dollar"], ["INR", "Indian Rupees"], ["IDR", "Indonesia Rupiah"], ["PGK", "Papua New Guinean kina"], ["CZK", "Czech Koruna"], ["SEK", "Swedish Krona"], ["KWD", "Kuwaiti Dinar"], ["BGN", "Bulgarian Lev"], ["TWD", "Taiwan New Dollar"], ["TRY", "New Lira"], ["ILS", "New Shekel"], ["NZD", "New Zealand Dollar"], ["NOK", "Norway Krone"], ["PEN", "Nuevos Sole"], ["MXN", "Mexican Peso"], ["PHP", "Philippine Peso"], ["BRL", "Brazilian Real"], ["OMR", "Omani Rial"], ["MYR", "Malaysian Ringgit"], ["SAR", "Saudi Riyal"], ["RUB", "Russian Ruble"], ["SCR", "Seychelles Rupee"], ["LKR", "Sri Lankan Rupee"], ["SGD", "Singapore Dollar"], ["ZAR", "South Africa Ran"], ["CHF", "Switzerland Franc"], ["AED", "UAE Dirham"], ["USD", "United States Dollar"], ["VUV", "Vanuatu Vatu"], ["KRW", "South Korean Won"], ["JPY", "Japanese Yen"], ["CNY", "Yuan Renminbi"], ["PLN", "Polish Zloty"], ["CNH", "Chinese Renminbi Off-Shore"], ["MGA", "Malagasy Ariary"], ["SBD", "Solomon Islands Dollar"], ["TOP", "Tonga Pa`anga"], ["WST", "Samoa Tala"]]
	})
};
TDS.data.salutations = new Ext.data.SimpleStore({
		storeId : "salutations",
		fields : ["text"],
		expandData : true,
		data : ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Rev", "Master"]
	});
TDS.data.time = new Ext.data.SimpleStore({
		storeId : "time",
		fields : ["numeric"],
		expandData : true,
		data : ["", "0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300"]
	});
TDS.data.hours = new Ext.data.SimpleStore({
		storeId : "hours",
		fields : ["numeric"],
		expandData : true,
		data : ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
	});
TDS.data.minutes = new Ext.data.SimpleStore({
		storeId : "minutes",
		fields : ["numeric"],
		expandData : true,
		data : ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]
	});
TDS.data.destination = new Ext.data.SimpleStore({
		storeId : "destination",
		fields : ["text"],
		expandData : true,
		data : ["", "Alaska", "Bahamas", "Barcelona", "Bermuda/Atlantic Coast", "Boston", "Caribbean", "Copenhagen", "Cruises to nowhere", "Hawaii", "Honolulu", "Houston", "Los Angeles", "Malaga", "Marseille", "Mediterranean", "Miami", "New Orleans", "New York", "Quebec City", "Rome", "Scandinavia", "Seattle", "South Pacific", "Tampa", "Transatlantic", "US Pacific", "Vancouver", "Venice", "Whittier"]
	});
TDS.data.cruiseCategoryNew = new Ext.data.SimpleStore({
		storeId : "cruiseCategoryNew",
		fields : ["text"],
		expandData : true,
		data : ["Specialty", "Luxury", "Contemporary", "River"]
	});
TDS.data.cruisePositions = new Ext.data.SimpleStore({
		storeId : "cruisePositions",
		fields : ["text"],
		expandData : true,
		data : ["Aft", "Mid Ship", "Forward", "Aft / Forward", "Forward / Aft"]
	});
TDS.data.cruisePositionss = new Ext.data.SimpleStore({
		storeId : "cruisePositionss",
		fields : ["text"],
		expandData : true,
		data : ["Aft", "Mid Ship", "Forward"]
	});
TDS.data.cruiseInfoDropDown = new Ext.data.SimpleStore({
		storeId : "cruiseInfoDropDown",
		fields : ["text"],
		expandData : true,
		data : ["No of Berths", "Max in Room", "Adults", "Children", "Infants", "Upper Berths", "Lower Beds", "Twin Beds", "Rollaway", "Crib", "King", "Queen", "Double", "Single", "Handicap", "Wheelchair Access", "Shower", "Shower over Bath", "Bath", "Phone", "Radio", "TV", "Balcony", "Location", "Connect", "Obstruct", "Dimensions"]
	});
TDS.data.cruiseDeckNew = new Ext.data.SimpleStore({
		storeId : "cruiseDeckNew",
		fields : ["text"],
		expandData : true,
		data : ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"]
	});
TDS.data.ages = new Ext.data.SimpleStore({
		storeId : "ages",
		fields : ["text"],
		expandData : true,
		data : ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
	});
TDS.data.salutationsp = new Ext.data.SimpleStore({
		storeId : "salutationsp",
		fields : ["numeric"],
		expandData : true,
		data : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
	});
TDS.data.StopsNos = new Ext.data.SimpleStore({
		storeId : "StopsNos",
		fields : ["numeric"],
		expandData : true,
		data : ["0", "1", "2", "3", "4", "5"]
	});
TDS.data.salutationsoh = new Ext.data.SimpleStore({
		storeId : "salutationsoh",
		fields : ["numeric"],
		expandData : true,
		data : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
	});
TDS.data.salutationsamt = new Ext.data.SimpleStore({
		storeId : "salutationsamt",
		fields : ["text"],
		expandData : true,
		data : ["Per Person", "Per Adult", "Per Booking"]
	});
TDS.data.position = new Ext.data.SimpleStore({
		storeId : "position",
		fields : ["value", "text"],
		data : [["", "Both"], ["true", "Inside"], ["false", "Outside"]]
	});
TDS.data.globalIndicator = new Ext.data.SimpleStore({
		storeId : "globalIndicator",
		fields : ["value", "text"],
		data : [[" ", " "], ["AP", "Atlantic and Pacific"], ["AT", "Atlantic"], ["PA", "Pacific"], ["EH", "Eastern Hemisphere"], ["WH", "Western Hemisphere"], ["FE", "Far East"], ["PN", "Transpacific via North America"], ["RW", "Round the World"], ["SA", "South Atlantic"], ["TS", "Trans Siberia"]]
	});
TDS.data.dayOrTimeRestriction = new Ext.data.SimpleStore({
		storeId : "dayOrTimeRestriction",
		fields : ["value", "text"],
		data : [["D", "Day restriction"], ["T", "Time Restriction"]]
	});
TDS.data.seasonalCode = new Ext.data.SimpleStore({
		storeId : "seasonalCode",
		fields : ["value", "text"],
		data : [[" ", " "], ["H", "High or peak season"], ["L", "Low or basic season"], ["K", "High shoulder season"], ["O", "Mid shoulder season"], ["J", "Low shoulder season"], ["F", "Variations on the shoulder season"], ["T", "Variations on the shoulder season"], ["Q", "Variations on the shoulder season"], ["Y", "Variations on the shoulder season"]]
	});
TDS.data.airSearchType = new Ext.data.SimpleStore({
		storeId : "airSearchType",
		fields : ["value", "text"],
		data : [["AS", "Normal flight"], ["LFS", "Low Fare flight"]]
	});
TDS.data.messageActionTypes = new Ext.data.SimpleStore({
		storeId : "messageActionTypes",
		fields : ["value", "text"],
		data : [["all", "All"], ["quotes", "Quotes"], ["requests", "Requests"], ["acceptedRequests", "Accepted requests"], ["rejectedRequests", "Rejected requests"], ["releasedRequests", "Released requests"], ["bookings", "Bookings"], ["confirmations", "Confirmations"], ["cancellations", "Cancellations"], ["cancellationRequests", "Cancellation requests"], ["acceptedCancellations", "Accepted cancellations"]]
	});
TDS.data.messageNoteTypes = new Ext.data.SimpleStore({
		storeId : "messageNoteTypes",
		fields : ["value", "text"],
		data : [["all", "All"], ["requests", "Requests"], ["bookings", "Bookings"], ["cancellations", "Cancellations"]]
	});
TDS.data.historyInventoryTypes = new Ext.data.SimpleStore({
		storeId : "historyInventoryTypes",
		fields : ["value", "text"],
		data : [["all", "All"], ["freesaleInventory", "Freesale"], ["setInventory", "Sets"], ["increasedInventory", "Increases"], ["decreasedInventory", "Decreases"], ["consumedInventory", "Consumed"], ["cancelFreesaleInventory", "Freesale cancellation"]]
	});
TDS.data.historyRequestTypes = new Ext.data.SimpleStore({
		storeId : "historyRequestTypes",
		fields : ["value", "text"],
		data : [["all", "All"], ["unlimitedRequest", "Unlimited"], ["setRequest", "Sets"], ["increasedRequest", "Increases"], ["decreasedRequest", "Decreases"], ["cancelledRequest", "Cancellations"]]
	});
TDS.data.historyStatusTypes = new Ext.data.SimpleStore({
		storeId : "historyStatusTypes",
		fields : ["value", "text"],
		data : [["All", "All"], ["Inventory", "Inventory"], ["Request", "Request"], ["Waitlist", "Waitlist"], ["Freesale", "Freesale"]]
	});
TDS.data.permissions = new Ext.data.JsonStore({
		storeId : "permissions",
		fields : ["groupKey", "name"],
		id : "groupKey",
		data : [{
				groupKey : "ARENA_MOBILE_API_USER",
				name : "Arena mobile API user"
			}, {
				groupKey : "ADMINISTRATION",
				name : "Administration"
			}, {
				groupKey : "SUPPLIER",
				name : "Supplier"
			}, {
				groupKey : "AGENCY",
				name : "Agency"
			}, {
				groupKey : "RESERVATION",
				name : "Reservation"
			}, {
				groupKey : "INVENTORY",
				name : "Inventory"
			}, {
				groupKey : "FULFILLMENT",
				name : "Fulfillment"
			}, {
				groupKey : "SUPPLIER_MANAGEMENT",
				name : "Can modify supplier details and users"
			}, {
				groupKey : "AGENCY_MANAGEMENT",
				name : "Can modify agency details and users"
			}, {
				groupKey : "AGENCY_REPORTING",
				name : "Can access agency reports"
			}, {
				groupKey : "INVENTORY_MANAGEMENT",
				name : "Inventory management"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_ACCOM",
				name : "Can modify and create accommodation offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_TOUR",
				name : "Can modify and create tour offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_FLIGHT",
				name : "Can modify and create flight offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_CAR",
				name : "Can modify and create car rentals"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_RAIL",
				name : "Can modify and create rail offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_CRUISE",
				name : "Can modify and create cruise offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_ATTRACTION",
				name : "Can modify and create attraction offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_TRANSFER",
				name : "Can modify and create transfer offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_HOSTEL",
				name : "Can modify and create hostel offerings"
			}, {
				groupKey : "INVENTORY_MANAGEMENT_SIGHTSEEING",
				name : "Can modify and create sightseeing offerings"
			}, {
				groupKey : "RESERVATION_ACCOM",
				name : "Can modify and create accommodation reservations"
			}, {
				groupKey : "RESERVATION_TOUR",
				name : "Can modify and create tour reservations"
			}, {
				groupKey : "RESERVATION_FLIGHT",
				name : "Can modify and create flight reservations"
			}, {
				groupKey : "RESERVATION_CAR",
				name : "Can modify and create car rentals"
			}, {
				groupKey : "RESERVATION_RAIL",
				name : "Can modify and create rail reservations"
			}, {
				groupKey : "RESERVATION_CRUISE",
				name : "Can modify and create cruise reservations"
			}, {
				groupKey : "RESERVATION_ATTRACTION",
				name : "Can modify and create attraction reservations"
			}, {
				groupKey : "RESERVATION_TRANSFER",
				name : "Can modify and create transfer reservations"
			}, {
				groupKey : "RESERVATION_HOSTEL",
				name : "Can modify and create hostel reservations"
			}, {
				groupKey : "RESERVATION_SIGHTSEEING",
				name : "Can modify and create sightseeing reservations"
			}
		]
	});
TDS.data.passengerType = new Ext.data.SimpleStore({
		storeId : "passengerType",
		fields : ["text", "description"],
		data : [[" ", " "], ["AD", "Adult"], ["CN", "Concession"], ["CH", "Child"], ["IN", "Infant"]]
	});
TDS.data.passengerTypeLookup = {
	ADULT : "AD",
	CHILD : "CH",
	CONCESSION : "CN",
	INFANT : "IN"
};
TDS.data.componentType = {
	TYPE_ACCOMMODATION : "ACCOMMODATION",
	TYPE_HOSTEL : "HOSTEL",
	TYPE_TOUR : "TOUR",
	TYPE_CAR : "CAR",
	TYPE_RAIL : "RAIL",
	TYPE_RAIL_PASS : "RAILPASS",
	TYPE_AIR : "AIR",
	TYPE_CRUISE : "CRUISE",
	TYPE_ATTRACTION : "ATTRACTION",
	TYPE_ATTRACTION_NEW : "SERVICES",
	TYPE_OWN : "OWN",
	TYPE_TRANSFER : "TRANSFER",
	TYPE_SIGHTSEEING : "SIGHTSEEING",
	TYPE_SIGHTSEEING_NEW : "DAY TOUR",
	TYPE_MANUAL : "MANUAL"
};
TDS.data.componentStatus = {
	STATUS_NEW : "New",
	STATUS_HELD : "Held",
	STATUS_REQUESTED : "Requested",
	STATUS_CONFIRMED : "Confirmed",
	STATUS_PART_CONFIRMED : "Part confirmed",
	STATUS_CONFIRM_PASSENGER : "confirm passenger",
	STATUS_CANCEL_PASSENGER : "Cancel passenger",
	STATUS_CANCEL_REQUESTED : "Cancel requested",
	STATUS_CANCELLED : "Cancelled",
	STATUS_REJECTED : "Rejected",
	STATUS_RELEASED : "Released",
	STATUS_QUOTE : "Quote",
	STATUS_OK : "Ok",
	STATUS_SET : "Alarm set",
	STATUS_GO : "Alarm off",
	STATUS_MANUAL_QUOTE : "Quote",
	STATUS_MANUAL_QUOTE_DISPLAY : "Quote(M)",
	STATUS_DELETE : "Deleted",
	STATUS_GUARANTEE : "Guarantee"
};
TDS.data.componentStatusAbbr = {
	STATUS_HELD : "HK",
	STATUS_REQUESTED : "RQ",
	STATUS_CONFIRMED : "HK",
	STATUS_CANCEL_REQUESTED : "XK",
	STATUS_CANCELLED : "XX",
	STATUS_QUOTE : "QT"
};
TDS.data.reservationStatus = {
	STATUS_REQUEST : "RQ",
	STATUS_NOT_AVAILABLE : "NA",
	STATUS_OK : "OK"
};
TDS.data.reservationType = {
	FREESALE : -1,
	UNLIMITED : -1
};
TDS.data.reservationTypeAbbr = {
	FREESALE : "FS",
	UNLIMITED : "UL"
};
TDS.data.componentActivityLogType = {
	REQUEST : "REQUEST",
	ACCEPTED_REQUEST : "ACCEPTED_REQUEST",
	REJECTED_REQUEST : "REJECTED_REQUEST",
	RELEASED_REQUEST : "RELEASED_REQUEST",
	BOOKING : "BOOKING",
	CONFIRMATION : "CONFIRMATION",
	CANCELLATION : "CANCELLATION",
	CANCELLATION_REQUEST : "CANCELLATION_REQUEST",
	ACCEPTED_CANCELLATION : "ACCEPTED_CANCELLATION",
	REQUEST_NOTE : "REQUEST_NOTE",
	REQUEST_NOTE_TO_SUPPLIER : "REQUEST_NOTE_TO_SUPPLIER",
	REQUEST_NOTE_TO_AGENT : "REQUEST_NOTE_TO_AGENT",
	BOOKING_NOTE : "BOOKING_NOTE",
	BOOKING_NOTE_TO_SUPPLIER : "BOOKING_NOTE_TO_SUPPLIER",
	BOOKING_NOTE_TO_AGENT : "BOOKING_NOTE_TO_AGENT",
	CANCELLATION_NOTE : "CANCELLATION_NOTE",
	CANCELLATION_NOTE_TO_SUPPLIER : "CANCELLATION_NOTE_TO_SUPPLIER",
	CANCELLATION_NOTE_TO_AGENT : "CANCELLATION_NOTE_TO_AGENT"
};
TDS.data.passengerSpecialServiceRequests = new Ext.data.SimpleStore({
		storeId : "passengerSpecialServiceRequests",
		fields : ["value", "text"],
		data : [[" ", " "], ["Passenger Traveling with Pet in Luggage or Cargo", "Passenger Traveling with Pet in Luggage or Cargo"], ["Baby Sleeping Bag Requested", "Baby Sleeping Bag Requested"], ["Passenger Traveling with Sports Equipment", "Passenger Traveling with Sports Equipment"], ["Language assistance needed", "Language assistance needed"], ["Diabetic Meal Requested", "Diabetic Meal Requested"], ["Kosher Meal Requested", "Kosher Meal Requested"], ["Vegetarian Meal Requested", "Vegetarian Meal Requested"], ["Wheelchair Assistance", "Wheelchair Assistance"], ["Disabled Passenger", "Disabled Passenger"], ["Unaccompanied Child", "Unaccompanied Child"], ["Baby Bassinet", "Baby Bassinet"], ["Halal Food", "Halal Food"], ["AVML", "Asian Vegetarian Meal*"], ["BBML", "Baby Meal*"], ["BLML", "Bland Meal"], ["CHML", "Child Meal*"], ["DBML", "Diabetic Meal*"], ["FPML", "Fruit Platter*"], ["GFML", "Gluten Free Meal*"], ["HFML", "High Fibre Meal*"], ["HNML", "Hindu Meal*"], ["KSML", "Kosher Meal*"], ["LCML", "Low Calorie Meal*"], ["LFML", "Low Fat/Cholesterol Meal*"], ["LPML", "Low Protein Meal*"], ["LSML", "Low Sodium Meal*"], ["MOML", "Moslem Meal*"], ["NLML", "Non Lactose Meal*"], ["ORML", "Oriental Meal*"], ["PRML", "Low Purine Meal*"], ["RVML", "Raw Vegetarian Meal*"], ["SFML", "Sea Food Meal+"], ["SPML", "Special Meal*"], ["VGML", "Vegetarian Meal*"], ["VLML", "Vegetarian meal lacto-ovo (allows milk and eggs)"], ["DEAF", "Deaf Passenger"], ["BLND", "Blind Passenger"], ["CHLD", "Child Travelling"], ["DOCA", "APIS Passenger Residence Address Info"], ["DOCO", "APIS Secondary Document Info"], ["DOCS", "Passport Information"], ["FOID", "Form of ID"], ["FQTU", "Frequent Traveller with Upgrade & Mileage Accrual"], ["INFT", "Infant Travelling on Lap"], ["TKNM", "Manually Entered Ticket Number"], ["TWOU", "Transit without Visa"], ["WCH", "Wheelchair Needed - Pax cannot go long distance"], ["WCHR", "Wheelchair Needed - Pax cannot climb stairs"]]
	});
TDS.data.passengerSSRTravelPort = new Ext.data.SimpleStore({
		storeId : "passengerSSRTravelPort",
		fields : ["value", "text"],
		data : [[" ", " "], ["AVML", "Asian Vegetarian Meal*"], ["BBML", "Baby Meal*"], ["BLML", "Bland Meal"], ["CHML", "Child Meal*"], ["DBML", "Diabetic Meal*"], ["FPML", "Fruit Platter*"], ["GFML", "Gluten Free Meal*"], ["HFML", "High Fibre Meal*"], ["HNML", "Hindu Meal*"], ["KSML", "Kosher Meal*"], ["LCML", "Low Calorie Meal*"], ["LFML", "Low Fat/Cholesterol Meal*"], ["LPML", "Low Protein Meal*"], ["LSML", "Low Sodium Meal*"], ["MOML", "Moslem Meal*"], ["NLML", "Non Lactose Meal*"], ["ORML", "Oriental Meal*"], ["PRML", "Low Purine Meal*"], ["RVML", "Raw Vegetarian Meal*"], ["SFML", "Sea Food Meal+"], ["SPML", "Special Meal*"], ["VGML", "Vegetarian Meal*"], ["VLML", "Vegetarian meal lacto-ovo (allows milk and eggs)"], ["DEAF", "Deaf Passenger"], ["BLND", "Blind Passenger"], ["CHLD", "Child Travelling"], ["DOCA", "APIS Passenger Residence Address Info"], ["DOCO", "APIS Secondary Document Info"], ["DOCS", "Passport Information"], ["FOID", "Form of ID"], ["FQTU", "Frequent Traveller with Upgrade & Mileage Accrual"], ["INFT", "Infant Travelling on Lap"], ["TKNM", "Manually Entered Ticket Number"], ["TWOU", "Transit without Visa"], ["WCH", "Wheelchair Needed - Pax cannot go long distance"], ["WCHR", "Wheelchair Needed - Pax cannot climb stairs"]]
	});
TDS.data.rateClassType = {
	ADULT : "Adult",
	CHILD : "Child",
	CONCESSION : "Concession"
};
TDS.data.ratePerType = {
	PERSON : "person",
	GROUP : "group",
	ROOM : "room",
	CABIN : "cabin"
};
TDS.data.rateOccupancyType = {
	SINGLE : "single",
	TWIN : "twin",
	TRIPLE : "triple",
	QUAD : "quad"
};
TDS.data.rateOccupancyTypeLookup = {
	single : 1,
	twin : 2,
	triple : 3,
	quad : 4
};
TDS.data.ratePerTypePlural = {
	person : "people",
	group : "groups",
	room : "rooms",
	cabin : "cabins"
};
TDS.data.weeklyScheduleDays = {
	SUNDAY : 1,
	MONDAY : 2,
	TUESDAY : 3,
	WEDNESDAY : 4,
	THURSDAY : 5,
	FRIDAY : 6,
	SATURDAY : 7
};
TDS.data.currencies = new Ext.data.SimpleStore({
		storeId : "currencies",
		id : 0,
		fields : ["value", "text"],
		data : [[" ", " "], ["ARS", "Argentinian Peso"], ["AUD", "Australian Dollar"], ["THB", "Thai Baht"], ["BHD", "Bahrain Dinar"], ["GBP", "British Pound"], ["BND", "Brunei Dollar"], ["CAD", "Canadian Dollar"], ["CLP", "Chilean Peso"], ["XPF", "CF du Pacifique Franc"], ["DKK", "Danish Krone"], ["MAD", "Moroccan Dirham"], ["VND", "Vietnamese Dong"], ["EUR", "Euro"], ["FJD", "Fiji Dollar"], ["HUF", "Hungarian forint"], ["HKD", "Hong Kong Dollar"], ["INR", "Indian Rupees"], ["IDR", "Indonesia Rupiah"], ["PGK", "Papua New Guinean kina"], ["CZK", "Czech Koruna"], ["SEK", "Swedish Krona"], ["KWD", "Kuwaiti Dinar"], ["BGN", "Bulgarian Lev"], ["TWD", "Taiwan New Dollar"], ["TRY", "New Lira"], ["ILS", "New Shekel"], ["NZD", "New Zealand Dollar"], ["NOK", "Norway Krone"], ["PEN", "Nuevos Sole"], ["MXN", "Mexican Peso"], ["PHP", "Philippine Peso"], ["BRL", "Brazilian Real"], ["OMR", "Omani Rial"], ["MYR", "Malaysian Ringgit"], ["SAR", "Saudi Riyal"], ["RUB", "Russian Ruble"], ["SCR", "Seychelles Rupee"], ["LKR", "Sri Lankan Rupee"], ["SGD", "Singapore Dollar"], ["ZAR", "South Africa Ran"], ["CHF", "Switzerland Franc"], ["AED", "UAE Dirham"], ["USD", "United States Dollar"], ["VUV", "Vanuatu Vatu"], ["KRW", "South Korean Won"], ["JPY", "Japanese Yen"], ["CNY", "Yuan Renminbi"], ["PLN", "Polish Zloty"], ["CNH", "Chinese Renminbi Off-Shore"], ["MGA", "Malagasy Ariary"], ["SBD", "Solomon Islands Dollar"], ["TOP", "Tonga Pa`anga"], ["WST", "Samoa Tala"]]
	});
TDS.data.componentStatusStore = new Ext.data.SimpleStore({
		storeId : "compStatus",
		fields : ["name", "dataURI"],
		data : [[" ", " "], ["Held", "Held"], ["Requested", "Requested"], ["Confirmed", "Confirmed"], ["Cancel request", "Cancel request"], ["Cancel", "Cancel"], ["Quote", "Quote"]]
	});
TDS.data.MQsupplierStore = new Ext.data.SimpleStore({
		storeId : "MQsupplierStore",
		fields : ["name", "dataURI"],
		data : []
	});
TDS.data.commonStore = new Ext.data.SimpleStore({
		storeId : "commonStore",
		fields : ["name", "dataURI"],
		data : []
	});
TDS.data.componentsList = new Ext.data.SimpleStore({
		storeId : "components",
		fields : ["name", "dataURI"],
		data : [[TDS.data.componentType.TYPE_ACCOMMODATION, TDS.data.componentType.TYPE_ACCOMMODATION], [TDS.data.componentType.TYPE_HOSTEL, TDS.data.componentType.TYPE_HOSTEL], [TDS.data.componentType.TYPE_TOUR, TDS.data.componentType.TYPE_TOUR], [TDS.data.componentType.TYPE_CAR, TDS.data.componentType.TYPE_CAR], [TDS.data.componentType.TYPE_RAIL, TDS.data.componentType.TYPE_RAIL], [TDS.data.componentType.TYPE_RAIL_PASS, TDS.data.componentType.TYPE_RAIL_PASS], [TDS.data.componentType.TYPE_AIR, TDS.data.componentType.TYPE_AIR], [TDS.data.componentType.TYPE_CRUISE, TDS.data.componentType.TYPE_CRUISE], [TDS.data.componentType.TYPE_ATTRACTION_NEW, TDS.data.componentType.TYPE_ATTRACTION], [TDS.data.componentType.TYPE_TRANSFER, TDS.data.componentType.TYPE_TRANSFER], [TDS.data.componentType.TYPE_SIGHTSEEING_NEW, TDS.data.componentType.TYPE_SIGHTSEEING]]
	});
TDS.data.componentsListMQ = new Ext.data.SimpleStore({
		storeId : "componentsListMQ",
		fields : ["name", "dataURI"],
		data : [["Accommodation", TDS.data.componentType.TYPE_ACCOMMODATION], ["Air", TDS.data.componentType.TYPE_AIR], ["Car Rental", TDS.data.componentType.TYPE_CAR], ["Cruises", TDS.data.componentType.TYPE_CRUISE], ["Day Tours", TDS.data.componentType.TYPE_SIGHTSEEING], ["Package Tours", TDS.data.componentType.TYPE_TOUR], ["Rail", TDS.data.componentType.TYPE_RAIL], ["Services", TDS.data.componentType.TYPE_ATTRACTION], ["Transfers", TDS.data.componentType.TYPE_TRANSFER]]
	});
TDS.data.componentsTourDataLoadFor = new Ext.data.SimpleStore({
		storeId : "componentsTourDataLoadFor",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["tour_offering", "Tour offering details"], ["tour_rate", "Tour rates"], ["tour_extra", "Tour rate extras"]]
	});
TDS.data.tourOfferingTableMaping = new Ext.data.SimpleStore({
		storeId : "tourOfferingTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["name", "Name"], ["code_supplier", "Supplier code"], ["rack_rate_price_sell", "Adv. Rate"], ["from_country", "Country From"], ["from_location_uni", "location From"], ["to_country", "Country To"], ["to_location_uni", "location To"], ["duration", "Duration"], ["tour_type_id", "Tour type"], ["description", "Description"], ["notes", "Notes"], ["name_locale", "Name locale"], ["description_locale", "Description locale"], ["", "NONE"]]
	});
TDS.data.tourRateTableMaping = new Ext.data.SimpleStore({
		storeId : "tourRateTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["rate_belongs_to_offering", "Rate belongs to offering"], ["name", "Rate name"], ["name_locale", "Rate name (Alt Language)"], ["rate_class_id", "Pax Type"], ["ageBelow", "Age below"], ["rate_per_id", "Per"], ["rate_occupancy_id", "Room Type"], ["is_active", "Pulish"], ["is_special", "Special"], ["max_hold_hours", "Max. hold Hours"], ["max_hold_minutes", "Max. hold minutes"], ["default_cutoff_time_days", "Cut-off time days"], ["price_is_nett", "Price nett or gross"], ["price_sell", "Price"], ["price_commission", "Price commission"], ["restrictions", "Restrictions"], ["", "NONE"]]
	});
TDS.data.componentsSightseeingDataLoadFor = new Ext.data.SimpleStore({
		storeId : "componentsSightseeingDataLoadFor",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["sightseeing_offering", "Day Tours offering details"], ["sightseeing_rate", "Day Tours rates"], ["sightseeing_extra", "Day Tours rate extras"]]
	});
TDS.data.sightseeingOfferingTableMaping = new Ext.data.SimpleStore({
		storeId : "sightseeingOfferingTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["rate_belongs_to_offering", "Rate belongs to offering"], ["name", "Rate name"], ["name_locale", "Rate name (Alt Language)"], ["rate_class_id", "Pax Type"], ["ageBelow", "Age below"], ["rate_per_id", "Per"], ["rate_occupancy_id", "Room Type"], ["is_active", "Pulish"], ["is_special", "Special"], ["max_hold_hours", "Max. hold Hours"], ["max_hold_minutes", "Max. hold minutes"], ["default_cutoff_time_days", "Cut-off time days"], ["price_is_nett", "Price nett or gross"], ["price_sell", "Price"], ["price_commission", "Price commission"], ["restrictions", "Restrictions"], ["", "NONE"]]
	});
TDS.data.sightseeingRateTableMaping = new Ext.data.SimpleStore({
		storeId : "sightseeingRateTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["rate_belongs_to_offering", "Rate belongs to offering"], ["name", "Rate name"], ["name_locale", "Rate name (Alt Language)"], ["rate_class_id", "Pax Type"], ["rate_per_id", "Per"], ["is_active", "Pulish"], ["is_special", "Special"], ["max_hold_hours", "Max. hold Hours"], ["max_hold_minutes", "Max. hold minutes"], ["default_cutoff_time_days", "Cut-off time days"], ["price_is_nett", "Price nett or gross"], ["price_sell", "Price"], ["price_commission", "Price commission"], ["restrictions", "Restrictions"], ["", "NONE"]]
	});
TDS.data.componentsAccommodationDataLoadFor = new Ext.data.SimpleStore({
		storeId : "componentsAccommodationDataLoadFor",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["accommodation_offering", "Accommodation offering details"], ["accommodation_rate", "Accommodation rates"], ["accommodation_extra", "Accommodation rate extras"]]
	});
TDS.data.accommodationOfferingTableMaping = new Ext.data.SimpleStore({
		storeId : "accommodationOfferingTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["name", "Name"], ["code_supplier", "Supplier code"], ["rack_rate_price_sell", "Adv. Rate"], ["to_country", "Country To"], ["to_location_uni", "location To"], ["accommodation_rating_id", "Rating"], ["accommodation_property_class_type_id", "Property Type"], ["accommodation_group_id", "Group"], ["description", "Description"], ["notes", "Notes"], ["name_locale", "Name locale"], ["description_locale", "Description locale"], ["", "NONE"]]
	});
TDS.data.accommodationRateTableMaping = new Ext.data.SimpleStore({
		storeId : "accommodationRateTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["rate_belongs_to_offering", "Rate belongs to offering"], ["name", "Rate name"], ["name_locale", "Rate name (Alt Language)"], ["maximum_occupancy", "Max in Room"], ["no_of_adults", "No of Adults"], ["no_of_children", "No of Children"], ["ageBelow", "Age below"], ["min_nights", "Min nights"], ["accommodation_inventory_type_id", "Room Type"], ["room_view_id", "Room view"], ["is_active", "Pulish"], ["is_special", "Special"], ["max_hold_hours", "Max. hold Hours"], ["max_hold_minutes", "Max. hold minutes"], ["default_cutoff_time_days", "Cut-off time days"], ["price_is_nett", "Price nett or gross"], ["price_sell", "Price"], ["price_commission", "Price commission"], ["restrictions", "Restrictions"], ["", "NONE"]]
	});
TDS.data.componentsTransferDataLoadFor = new Ext.data.SimpleStore({
		storeId : "componentsTransferDataLoadFor",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["transfer_offering", "Transfer offering details"], ["transfer_rate", "Transfer rates"], ["transfer_extra", "Transfer rate extras"]]
	});
TDS.data.transferOfferingTableMaping = new Ext.data.SimpleStore({
		storeId : "transferOfferingTableMaping",
		fields : ["dataURI", "name"],
		data : [[" ", " "], ["name", "Name"], ["code_supplier", "Supplier code"], ["rack_rate_price_sell", "Adv. Rate"], ["to_country", "Country To"], ["to_location_uni", "location To"], ["transfer_mode_type_id", "Mode Type"], ["transfer_place_type_from_id", "From"], ["transfer_place_type_to_id", "To"], ["description", "Description"], ["notes", "Notes"], ["name_locale", "Name locale"], ["description_locale", "Description locale"], ["", "NONE"]]
	});
TDS.data.transferRateTableMaping = new Ext.data.SimpleStore({
		storeId : "transferRateTableMaping",
		fields : ["dataURI", "name"],
		data : [["rate_belongs_to_offering", "Rate belongs to offering"], ["name", "Rate name"], ["name_locale", "Rate name (Alt Language)"], ["rate_class_id", "Pax Type"], ["rate_per_id", "Per"], ["is_active", "Pulish"], ["is_special", "Special"], ["max_hold_hours", "Max. hold Hours"], ["max_hold_minutes", "Max. hold minutes"], ["default_cutoff_time_days", "Cut-off time days"], ["price_is_nett", "Price nett or gross"], ["price_sell", "Price"], ["price_commission", "Price commission"], ["restrictions", "Restrictions"], ["", "NONE"]]
	});
TDS.data.documentLocation = new Ext.data.SimpleStore({
		storeId : "documentLocation",
		fields : ["text", "description"],
		data : [[" ", " "], ["Office", "Office"], ["Client", "Client"], ["Consulate", "Consulate"]]
	});
TDS.data.depositDescriptions = new Ext.data.SimpleStore({
		storeId : "depositDescriptions",
		fields : ["description", "dataURI"],
		data : [[" ", " "], ["Deposit", "Deposit"], ["Full Payment", "Full Payment"], ["Balance of Payment", "Balance of Payment"], ["Further Payment", "Further Payment"]]
	});
TDS.data.cardType = new Ext.data.SimpleStore({
		storeId : "cardType",
		fields : ["text", "description"],
		data : [[" ", " "], ["Visa", "Visa"], ["Mastercard", "Mastercard"], ["Amex", "Amex"], ["Diners", "Diners"], ["JCB", "JCB"], ["Barclays", "Barclays"], ["UATP", "UATP"], ["Maestro", "Maestro"], ["Carte Bleue", "Carte Bleue"]]
	});
TDS.data.months = new Ext.data.SimpleStore({
		storeId : "months",
		fields : ["text", "description"],
		data : [[" ", " "], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]]
	});
TDS.data.years = new Ext.data.SimpleStore({
		storeId : "years",
		fields : ["text", "description"],
		data : [[" ", " "], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"]]
	});
TDS.data.creditCardType = new Ext.data.SimpleStore({
		storeId : "creditCardType",
		fields : ["text", "description"],
		data : [[" ", " "], ["Visa", "Visa"], ["Mastercard", "Mastercard"], ["Amex", "Amex"], ["Diners", "Diners"]]
	});
TDS.data.railPassClass = new Ext.data.SimpleStore({
		storeId : "railPassClass",
		fields : ["value", "text"],
		data : [[" ", " "], ["First Class", "First Class"], ["Second Class", "Second Class"]]
	});
TDS.data.passType = new Ext.data.SimpleStore({
		storeId : "passType",
		fields : ["value", "text"],
		data : [[" ", " "], ["Adult", "Adult"], ["Child", "Child"], ["Family", "Family"], ["Party", "Party"], ["Twin", "Twin"], ["Youth", "Youth"], ["Saver", "Saver"], ["Senior", "Senior"], ["Child Saver", "Child Saver"], ["Family Child", "Family Child"], ["Family SeniorChild", "Family SeniorChild"], ["Family Senior", "Family Senior"], ["Youth Promo", "Youth Promo"], ["Adult One Way", "Adult One Way"], ["Adult Return", "Adult Return"], ["Discounted", "Discounted"], ["Supersaver", "Supersaver"]]
	});
TDS.data.cruiseCategory = new Ext.data.SimpleStore({
		storeId : "cruiseCategory",
		fields : ["name", "value"],
		data : [[" ", " "], ["Suite", "Suite"], ["Veranda", "Veranda"], ["Balcony", "Balcony"], ["Ocean View", "Ocean View"], ["Inside", "Inside"]]
	});
TDS.data.cruiseDuration = new Ext.data.SimpleStore({
		storeId : "cruiseDuration",
		fields : ["name", "value"],
		data : [[" ", " "], ["7 Days", "7 Days"], ["10 Days", "10 Days"], ["14 Days", "14 Days"], ["21 Days", "21 Days"], ["1 Month", "1 Month"], ["1 Month+", "1 Month+"]]
	});
TDS.data.cruiseLocation = new Ext.data.SimpleStore({
		storeId : "cruiseLocation",
		fields : ["name", "value"],
		data : [[" ", " "], ["Forward", "Forward"], ["Aft", "Aft"], ["Mid Ship", "Mid Ship"]]
	});
TDS.data.cruiseDeck = new Ext.data.SimpleStore({
		storeId : "cruiseDeck",
		fields : ["name"],
		data : [[" ", " "], ["Lobby"], ["Lounge"], ["Main"], ["Panorama"], ["Promenade"], ["Upper"], ["Veranda"], ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"], ["10"], ["11"], ["12"], ["13"], ["14"], ["15"], ["A"], ["B"], ["C"], ["D"], ["E"], ["F"], ["G"], ["H"], ["I"], ["J"], ["K"], ["L"], ["M"], ["N"], ["O"], ["P"], ["Q"], ["R"], ["S"], ["T"]]
	});
TDS.data.carRentalVehicleType = new Ext.data.SimpleStore({
		storeId : "carRentalVehicleType",
		fields : ["text", "value"],
		data : [[" ", " "], ["Car Rental", "Car Rental"], ["Motor-home", "Motor-home"], ["Car Leasing", "Car Leasing"]]
	});
TDS.data.carRentalTransmission = new Ext.data.SimpleStore({
		storeId : "carRentalTransmission",
		fields : ["text", "value"],
		data : [[" ", " "], ["Auto", "Auto"], ["Manual", "Manual"]]
	});
TDS.data.carRentalOptionsTest = new Ext.data.SimpleStore({
		storeId : "carRentalOptionsTest",
		fields : ["name", "value"],
		data : [[" ", " "], ["NAV/GPS", "NAV/GPS"], ["Infant Seat", "Infant Seat"], ["Toddler Seat", "Toddler Seat"], ["Child Seat", "Child Seat"], ["Collision Damage Waiver", "Collision Damage Waiver"], ["One Way Rental", "One Way Rental"], ["Additional Driver", "Additional Driver"], ["Under Age Driver", "Under Age Driver"]]
	});
TDS.data.railClass = new Ext.data.SimpleStore({
		storeId : "railClass",
		fields : ["text", "value"],
		data : [[" ", " "], ["First", "First"], ["Second", "Second"]]
	});
TDS.data.airClassMQ = new Ext.data.SimpleStore({
		storeId : "airClassMQ",
		fields : ["text", "value"],
		data : [[" ", " "], ["First", "First"], ["Business", "Business"], ["Premium Economy", "Premium Economy"], ["Economy", "Economy"]]
	});
TDS.data.accommodationRoomTypeMQ = new Ext.data.SimpleStore({
		storeId : "accommodationRoomTypeMQ",
		fields : ["name", "value"],
		data : [[" "], ["Single", "Single"], ["Double", "Double"], ["Twin", "Twin"], ["Triple", "Triple"], ["Quad", "Quad"], ["Apartment", "Apartment"], ["B/B", "B/B"], ["Hotel", "Hotel"], ["Villa", "Villa"], ["Cabin", "Cabin"], ["SelfContained", "SelfContained"], ["Others", "Others"]]
	});
TDS.data.tourRoomTypeMQ = new Ext.data.SimpleStore({
		storeId : "tourRoomTypeMQ",
		fields : ["name", "value"],
		data : [["Single", "Single"], ["Double", "Double"], ["Twin", "Twin"], ["Triple", "Triple"], ["Quad", "Quad"], ["Others", "Others"]]
	});
TDS.data.railCabinType = new Ext.data.SimpleStore({
		storeId : "railCabinType",
		fields : ["name", "value"],
		data : [[" ", " "], ["Single Berth", "Single Berth"], ["Twin Berth", "Twin Berth"], ["Others", "Others"]]
	});
TDS.data.airClass = new Ext.data.SimpleStore({
		storeId : "airClass",
		fields : ["text", "value"],
		data : [[" ", " "], ["Economy", "Economy"], ["Business", "Business"], ["Business Economy", "Business Economy"], ["First", "First"], ["Coach", "Coach"], ["Standard", "Standard"]]
	});
TDS.data.messageQueueTypes = new Ext.data.SimpleStore({
		storeId : "messageQueueTypes",
		fields : ["value", "text"],
		data : [["all", "All"], ["receivedQueues", "Received"], ["sentQueues", "Sent"], ["reminders", "Reminders"], ["read", "Read"]]
	});
TDS.data.accommodationCategory = new Ext.data.SimpleStore({
		storeId : "accommodationCategory",
		fields : ["name", "value"],
		data : [[" ", " "], ["Run of House ", "Run of House"], ["Standard", "Standard"], ["Superior", "Superior"], ["Deluxe ", "Deluxe"], ["Club ", "Club"], ["Executive", "Executive"], ["Suite", "Suite"], ["B&B", "B&B"], ["Apartment 1 Bedroom", "Apartment 1 Bedroom"], ["Apartment 2 Bedrooms", "Apartment 2 Bedrooms"], ["Apartment 3 Bedrooms", "Apartment 3 Bedrooms"], ["Studio 1 Bedroom", "Studio 1 Bedroom"], ["Studio 2 Bedrooms", "Studio 2 Bedrooms"], ["Studio 3 Bedrooms", "Studio 3 Bedrooms"], ["Villa", "Villa"], ["Self Contained", "Self Contained"], ["Cabin", "Cabin"], ["Other", "Other"]]
	});
TDS.data.accommodationPropertyType = new Ext.data.SimpleStore({
		storeId : "accommodationPropertyType",
		fields : ["name", "value"],
		data : [[" ", " "], ["Hotel", "Hotel"], ["Motel", "Motel"], ["Apartment", "Apartment"], ["Resort", "Resort"], ["Boatel", "Boatel"], ["Cabin", "Cabin"], ["Castle", "Castle"], ["Chalet", "Chalet"], ["Condominium", "Condominium"], ["Guest Farm", "Guest Farm"], ["Guest House", "Guest House"], ["Lodge", "Lodge"], ["Manor", "Manor"], ["Monastery", "Monastery"], ["Ranch", "Ranch"], ["Ski Lodge", "Ski Lodge"], ["Villa", "Villa"]]
	});
TDS.data.accommodationPreference = new Ext.data.SimpleStore({
		storeId : "accommodationPreference",
		fields : ["name", "value"],
		data : [[" ", " "], ["Compartment (single)", "Compartment (single)"], ["Compartment (twin)", "Compartment (twin)"], ["Compartment (double)", "Compartment (double)"], ["Compartment (Triple)", "Compartment (Triple)"], ["Compartment (Quad)", "Compartment (Quad)"], ["Night Train & Couchette", "Night Train & Couchette"], ["Sleeping Berth", "Sleeping Berth"], ["Sleeperette", "Sleeperette"]]
	});
TDS.data.accommodationOptionalServices = new Ext.data.SimpleStore({
		storeId : "accommodationOptionalServices",
		fields : ["name", "value"],
		data : [[" ", " "], ["High Speed Train", "High Speed Train"], ["Hotel Train", "Hotel Train"], ["Luxury Train", "Luxury Train"], ["Overnight Express", "Overnight Express"], ["Scenic Train", "Scenic Train"]]
	});
TDS.data.accommodationExtras = new Ext.data.SimpleStore({
		storeId : "accommodationExtras",
		fields : ["name", "value"],
		data : [[" ", " "], ["Carry on Baggage", "Carry on Baggage"], ["Checked Baggage", "Checked Baggage"], ["Dinning Car", "Dinning Car"], ["Disabled", "Disabled"], ["Lounge Car", "Lounge Car"], ["Non Smoking", "Non Smoking"], ["Pets", "Pets"], ["Smoking", "Smoking"]]
	});
TDS.data.railClasses = new Ext.data.SimpleStore({
		storeId : "railClasses",
		fields : ["name", "value"],
		data : [[" ", " "], ["First", "First"], ["Business", "Business"], ["Second", "Second"], ["Economy", "Economy"], ["Premium", "Premium"], ["Special", "Special"], ["Regional", "Regional"]]
	});
TDS.data.accommodationRating = new Ext.data.SimpleStore({
		storeId : "accommodationRating",
		fields : ["name", "value"],
		data : [[" ", " "], ["No Rating", "No Rating"], ["1+", "1+"], ["2+", "2+"], ["3+", "3+"], ["4+", "4+"], ["5+", "5+"]]
	});
TDS.data.cruiseDuration = new Ext.data.SimpleStore({
		storeId : "cruiseDuration",
		fields : ["name", "value"],
		data : [[" ", " "], ["7+ Days", "7+ Days"], ["10+ Days", "10+ Days"], ["14+ Days", "14+ Days"], ["21+ Days", "21+ Days"], ["1 Month +", "1 Month +"]]
	});
TDS.data.cruiseLocation = new Ext.data.SimpleStore({
		storeId : "cruiseLocation",
		fields : ["name", "value"],
		data : [[" ", " "], ["Forward", "Forward"], ["Aft", "Aft"], ["Mid Ship", "Mid Ship"]]
	});
TDS.data.cruiseDeck = new Ext.data.SimpleStore({
		storeId : "cruiseDeck",
		fields : ["name", "value"],
		data : [[" ", " "], ["Lobby", "Lobby"], ["Lounge", "Lounge"], ["Main", "Main"], ["Panorama", "Panorama"], ["Promenade", "Promenade"], ["Upper", "Upper"], ["Veranda", "Veranda"]]
	});
TDS.data.airFareType = new Ext.data.SimpleStore({
		storeId : "airFareType",
		fields : ["name", "value"],
		data : [[" ", " "], ["First Class Suites", "First Class Suites"], ["First Full", "First Full"], ["First Discounted", "First Discounted"], ["First Advance Purchase", "First Advance Purchase"], ["Business  Full", "Business  Full"], ["Business Discounted", "Business Discounted"], ["Business Advance Purchase", "Business Advance Purchase"], ["Premium Economy Full", "Premium Economy Full"], ["Premium Economy Discounted", "Premium Economy Discounted"], ["Premium Economy Advance Purchase", "Premium Economy Advance Purchase"], ["Economy/Coach Full", "Economy/Coach Full"], ["Discounted Economy/Coach Unrestricted", "Discounted Economy/Coach Unrestricted"], ["Discounted Economy/Coach Restricted", "Discounted Economy/Coach Restricted"], ["Standard Class ", "Standard Class "], ["Mixed Class First/Business", "Mixed Class First/Business"], ["Mixed Class Business/Premium Economy", "Mixed Class Business/Premium Economy"], ["Mixed Class Business/Economy (Coach)", "Mixed Class Business/Economy (Coach)"], ["Mixed Class Premium Economy/Economy (Coach)", "Mixed Class Premium Economy/Economy (Coach)"], ["Group", "Group"], ["IT", "IT"], ["Gross", "Gross"], ["Net", "Net"], ["Advance Purchase", "Advance Purchase"], ["Weekend", "Weekend"], ["Mid-Week", "Mid-Week"], ["Wholesale", "Wholesale"], ["Excursion", "Excursion"], ["One Way", "One Way"], ["Return", "Return"], ["Open Jaw", "Open Jaw"], ["Round Trip", "Round Trip"], ["Round World", "Round World"], ["Circle Pacific", "Circle Pacific"], ["Special Fare Gross", "Special Fare Gross"], ["Special Fare Economy/Coach", "Special Fare Economy/Coach"], ["Student", "Student"], ["Youth", "Youth"], ["Child Infant No Seat", "Child Infant No Seat"], ["Infant Seat", "Infant Seat"], ["Government", "Government"], ["Military", "Military"], ["Senior First", "Senior First"], ["Senior Business", "Senior Business"], ["Senior Premium Economy", "Senior Premium Economy"], ["Senior Economy/Coach", "Senior Economy/Coach"], ["Unaccompanied Minor", "Unaccompanied Minor"], ["Blind Companion", "Blind Companion"]]
	});
TDS.data.carRentalOptions = new Ext.data.SimpleStore({
		storeId : "carRentalOptions",
		fields : ["name", "value"],
		data : [[" ", " "], ["NAV/GPS", "NAV/GPS"], ["Infant Seat", "Infant Seat"], ["Toddler Seat", "Toddler Seat"], ["Child Seat", "Child Seat"], ["Collision Damage Waiver", "Collision Damage Waiver"], ["One Way Rental", "One Way Rental"], ["Additional Driver", "Additional Driver"], ["Under Age Driver", "Under Age Driver"], ["Aircon", "Aircon"], ["Excess Removed", "Excess Removed"]]
	});
TDS.data.carRentalCategoryMQ = new Ext.data.SimpleStore({
		storeId : "carRentalCategoryMQ",
		fields : ["name", "value"],
		data : [["Mini/Economy", "Mini/Economy"], ["Full Size", "Full Size"], ["Van", "Van"], ["Compact", "Compact"], ["Wagon", "Wagon"], ["Convertible", "Convertible"], ["Intermediate", "Intermediate"], ["Premium", "Premium"], ["Luxury", "Luxury"], ["Standard", "Standard"], ["Special", "Special"], ["4WD/SUV", "4WD/SUV"]]
	});
TDS.data.pickUpDropOffLocation = new Ext.data.SimpleStore({
		storeId : "pickUpDropOffLocation",
		fields : ["name", "dataURI"],
		data : [[" ", " "], ["International Airport", "International Airport"], ["Domestic Airport", "Domestic Airport"], ["City Depot", "City Depot"], ["Railway Station", "Railway Station"], ["Port", "Port"], ["Bus Station", "Bus Station"], ["Hotel", "Hotel"], ["Other", "Other"]]
	});
TDS.data.pickUpDropOffLocationTransfer = new Ext.data.SimpleStore({
		storeId : "pickUpDropOffLocationTransfer",
		fields : ["name", "dataURI"],
		data : [[" ", " "], ["Airport", "Airport"], ["Bus Station", "Bus Station"], ["Hotel", "Hotel"], ["Port", "Port"], ["Rail Station", "Rail Station"]]
	});
TDS.data.attractionServices = new Ext.data.SimpleStore({
		storeId : "attractionServices",
		fields : ["name"],
		data : [[" "], ["Attractions"], ["Activities"], ["Entertainment"], ["Gastronomy"], ["Sightseeing"], ["Shore Excursions"], ["Transport Tickets"], ["Transport Passes"], ["Wedding Services"]]
	});
TDS.data.attractionTime = new Ext.data.SimpleStore({
		storeId : "attractionTime",
		fields : ["name"],
		data : [[" "], ["Morning"], ["Afternoon"], ["Evening"]]
	});
TDS.data.dayToursDuration = new Ext.data.SimpleStore({
		storeId : "dayToursDuration",
		fields : ["name"],
		data : [[" "], ["Half Day"], ["Full Day"], ["Overnight"], ["Extended"]]
	});
TDS.data.dayToursType = new Ext.data.SimpleStore({
		storeId : "dayToursType",
		fields : ["name"],
		data : [[" "], ["Scheduled"], ["Private"], ["Walking"], ["Hop On/Off"], ["Skip the Line"], ["Segway"], ["Combination"], ["Cruise"], ["Bike"], ["Horse Carriage"], ["Cyclo"], ["VIP"], ["Motor Bike"], ["Flight"], ["Helicopter"], ["Custom"]]
	});
TDS.data.accommodationExtraMQ = new Ext.data.SimpleStore({
		storeId : "accommodationExtraMQ",
		fields : ["name"],
		data : [[" "], ["Inter Connect"], ["Cot"], ["Basinette"], ["Rollaway"], ["King Bed"], ["Early Check-in before 3 pm"], ["Late Check-Out After 10 am"], ["Late Arrival After 7 pm"], ["Smoking"], ["Non Smoking"], ["Adjoining"], ["Pool View"], ["Queen Bed"], ["Sea View"], ["Disabled"], ["Lifts"], ["Honeymooners"], ["Sofa Bed"]]
	});
TDS.data.carPlace = new Ext.data.SimpleStore({
		storeId : "carPlace",
		fields : ["name", "value"],
		data : [[" ", " "], ["Airport", "Airport"], ["Rail Station", "Rail Station"], ["Hotel", "Hotel"], ["City Depot", "City Depot"], ["Port", "Port"], ["Bus Station", "Bus Station"]]
	});
TDS.data.pickUpDropOffLocationCarRental = new Ext.data.SimpleStore({
		storeId : "pickUpDropOffLocationCarRental",
		fields : ["name", "value"],
		data : [[" ", " "], ["Airport", "Airport"], ["City Depot", "City Depot"], ["Hotel", "Hotel"], ["Port", "Port"], ["Rail Station", "Rail Station"], ["Bus Station", "Bus Station"], ["Other", "Other"]]
	});
TDS.data.transmissionCarRental = new Ext.data.SimpleStore({
		storeId : "transmissionCarRental",
		fields : ["name", "value"],
		data : [[" ", " "], ["Either", "Either"], ["Auto", "Auto"], ["Manual", "Manual"]]
	});
TDS.data.fuelCarRental = new Ext.data.SimpleStore({
		storeId : "fuelCarRental",
		fields : ["name", "value"],
		data : [[" ", " "], ["Either", "Either"], ["Petrol", "Petrol"], ["Deisel", "Deisel"]]
	});
TDS.data.vehicleSizeCarRental = new Ext.data.SimpleStore({
		storeId : "vehicleSizeCarRental",
		fields : ["name", "value"],
		data : [[" ", " "], ["Econome Sedan", "Econome Sedan"], ["Economy Hatch", "Economy Hatch"], ["Compact Sedan", "Compact Sedan"], ["Compact Hatch", "Compact Hatch"], ["Intermediate Sedan", "Intermediate Sedan"], ["Intermediate Hatch", "Intermediate Hatch"], ["Full Size Sedan", "Full Size Sedan"], ["Full Size Station Wagon", "Full Size Station Wagon"], ["Luxury Sedan", "Luxury Sedan"], ["Convertible", "Convertible"], ["Sports Car", "Sports Car"]]
	});
TDS.data.dayTimeStore = new Ext.data.SimpleStore({
		storeId : "dayTimeStore",
		fields : ["name", "value"],
		data : [["Morning", "Morning"], ["Afternoon", "Afternoon"], ["Evening", "Evening"], ["Full Day", "Full Day"]]
	});
TDS.data.cruiseMonth = new Ext.data.SimpleStore({
		storeId : "cruiseMonth",
		fields : ["name", "value"],
		data : [[" ", " "], ["January", "1"], ["Feburary", "2"], ["March", "3"], ["April", "4"], ["May", "5"], ["June", "6"], ["July", "7"], ["August", "8"], ["September", "9"], ["October", "10"], ["November", "11"], ["December", "12"]]
	});
TDS.data.deals = new Ext.data.SimpleStore({
		storeId : "deals",
		fields : ["text"],
		data : [[" "], ["Standard"], ["Hot Deals"], ["Specials Deals"], ["Advertised Deals"]]
	});
TDS.data.dealss = new Ext.data.SimpleStore({
		storeId : "dealss",
		fields : ["name", "value"],
		data : [["Hot Deals", "HD"], ["Specials Deals", "SD"], ["Advertised Deals", "AD"], ["Wholsale Rate", "WR"], ["CUG", "CG"], ["Cruise Only ", "CO"], ["Month's Offer ", "MO"]]
	});
TDS.data.deals1 = new Ext.data.SimpleStore({
		storeId : "deals",
		fields : ["text"],
		data : [[" "], ["CUG"], ["CO"], ["AD"], ["AD#"], ["DD"], ["DD#"], ["AD"], ["HD"], ["HD#"], ["SD"], ["SD#"], ["PRO"]]
	});
TDS.data.deals2 = new Ext.data.SimpleStore({
		storeId : "deals2",
		fields : ["value", "name"],
		data : [[" "], ["CUG", "Closed User Group"], ["CO", "Cruise Only"], ["AD", "Advertised Deals"], ["AD#", "Advertised Deals#"], ["DD", "Discount Deals"], ["DD#", "Discount Deals#"], ["HD", "Hot Deals"], ["HD#", "Hot Deals#"], ["SD", "Specials Deals"], ["SD#", "Specials Deals#"], ["PRO", "Promo"]]
	});
TDS.data.choice = new Ext.data.SimpleStore({
		storeId : "choice",
		fields : ["name", "value"],
		data : [["Choice 1", "Choice 1"], ["Choice 2", "Choice 2"], ["Choice 3", "Choice 3"], ["Choice 4", "Choice 4"]]
	});

		TDS.data.category = new Ext.data.SimpleStore({
		storeId : "category",
		fields : ["text"],
		data : [[" "], ["Interior"], ["Ocean View"], ["Balcony"], ["Special"],["Suite"]]
	});

		TDS.data.cabinPosition = new Ext.data.SimpleStore({
		storeId : "cabinPosition",
		fields : ["value", "text"],
		data : [["Aft", "Aft"], ["Mid Ship", "Mid Ship"], ["Forward", "Forward"], ["Mid Ship/ Forward", "Mid Ship/ Forward"],["Mid Ship/ Aft", "Mid Ship/ Aft"]]
	});