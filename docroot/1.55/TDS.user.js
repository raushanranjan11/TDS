TDS.user = Ext.extend(Ext.util.Observable, {
		title: undefined,
		firstName: undefined,
		lastName: undefined,
		userURI: undefined,
		supplierURI: undefined,
		agencyURI: undefined,
		agencyOnMobile: undefined,
		agencyGroupAdmin: undefined,
		arenaOne: undefined,
		userNoAccessToLedger: undefined,
		agencySupplierURI: undefined,
		agencyUsers: new Ext.data.SimpleStore({
			fields: ["name", "dataURI"],
			data: []
		}),
		hotusaActive: false,
		messageCount: 0,
		messageLastDate: undefined,
		agencyOnMobileNew1: undefined,
		agencyDefaultCommissionPercent: 0,
		groupsLookup: new Ext.util.MixedCollection(),
		groupPermissions: new Ext.data.JsonStore({
			url: "",
			fields: ["groupKey", "allowed"]
		}),
		constructor: function () {
			this.addEvents("refresh")
		},
		agencyOnMobileNew: function () {
			if (this.agencyURI != null && this.agencyURI != "" && typeof this.agencyURI != "undefined") {
				Ext.Ajax.request({
					url: TDS.env.dataPath + this.agencyURI + "/MobileLink",
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					scope: this,
					callback: function (g, a, b) {
						if (a) {
							try {
								var f = Ext.decode(b.responseText)
							} catch (c) {}
							if (f) {
								if (f.availablemobile) {
									this.agencyOnMobileNew1 = true
								} else {
									this.agencyOnMobileNew1 = false
								}
								this.agencyDefaultCommissionPercent = f.defaultCommissionPercent
							}
						}
					}
				})
			}
		},
		agencyUserNames: function () {
			if (this.agencyURI != null && this.agencyURI != "" && typeof this.agencyURI != "undefined") {
				var a = this;
				this.agencyUsers = TDS.data.getStore({
						dataURI: TDS.env.dataPath + this.agencyURI + "/users/collection",
						identifier: this.agencyURI + "/users",
						fields: ["fullNameString", "dataURI"]
					});
				setTimeout(function () {
					Ext.getCmp("consultant_agency_user").bindStore(a.agencyUsers);
					Ext.getCmp("consultant_agency_user").setValue("ALL")
				}, 500)
			} else {
				Ext.getCmp("consultant_agency_user").hide();
				Ext.getCmp("consultant_agency_user_text").hide(true)
			}
		},
		requestGroup: function (c, a) {
			var d = c.groupURI;
			var b = TDS.env.dataPath + "myuser/" + d;
			if (!a) {
				b += "/children"
			}
			Ext.Ajax.request({
				url: b,
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				scope: this,
				callback: function (k, g, h) {
					if (g) {
						try {
							var j = Ext.decode(h.responseText)
						} catch (i) {}
						if (j) {
							var f = this.processResponse(d, j);
							if (c.callback) {
								Ext.callback(c.callback, c.scope || this, [j])
							}
						}
					}
				}
			})
		},
		processResponse: function (c, d) {
			this.groupsLookup.add(c, d);
			for (var e in d) {
				var b = e.substring(6);
				var a = new this.groupPermissions.recordType({
						groupKey: b,
						allowed: d[e]
					}, b);
				this.groupPermissions.add(a)
			}
		},
		requestMyUser: function () {
			Ext.Ajax.request({
				url: TDS.env.dataPath + "myuser",
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				scope: this,
				callback: function (g, a, b) {
					if (a) {
						try {
							var f = Ext.decode(b.responseText)
						} catch (c) {}
						if (f) {
							this.setMyUser(f)
						}
					}
				}
			})
		},
		setMyUser: function (a) {
			this.firstName = a.nameFirst;
			this.lastName = a.nameLast;
			this.userURI = a.userURI;
			this.supplierURI = a.supplierURI;
			this.agencyURI = a.agencyURI;
			this.agencyOnMobile = a.agencyOnMobile;
			this.agencyGroupAdmin = a.agencyGroupAdmin;
			this.arenaOne = a.arenaOne;
			this.agencySupplierURI = a.agencySupplierURI;
			this.userNoAccessToLedger = a.userNoAccessToLedger;
			this.hotusaActive = a.hotusaActive;
			TDS.data.userNoAccessToLedger = a.userNoAccessToLedger;
			this.agencyUserNames();
			this.agencyOnMobileNew();
			this.fireEvent("refresh", this, a)
		},
		getParentGroups: function (b) {
			if (!b) {
				b = {}
			}
			b.groupURI = "parentGroups";
			var a = this.groupsLookup.item(b.groupURI);
			if (typeof a !== "undefined") {
				return a
			}
			this.requestGroup(b, true);
			return -1
		},
		getChildGroups: function (b) {
			if (!b) {
				b = {}
			}
			var a = this.groupsLookup.item(b.groupURI);
			if (typeof a !== "undefined") {
				return a
			}
			this.requestGroup(b);
			return -1
		},
		hasGroupPermission: function (b) {
			var a = this.groupPermissions.getById(b);
			if (typeof a != "undefined") {
				return a.get("allowed")
			}
			return false
		},
		flushPrivileges: function () {
			this.groupsLookup.clear();
			this.groupPermissions.removeAll()
		},
		init: function () {
			this.requestMyUser()
		},
		getLastName: function () {
			return this.lastName
		},
		getFirstName: function () {
			return this.firstName
		},
		getFullName: function () {
			return this.firstName + " " + this.lastName
		},
		getUserURI: function (a) {
			return this.userURI
		},
		getSupplierURI: function (a) {
			return this.supplierURI
		},
		getAgencyURI: function (a) {
			return this.agencyURI
		},
		isSupplier: function () {
			return this.supplierURI ? true : false
		},
		isAgencyUser: function () {
			return this.agencyURI ? true : false
		},
		isAgencyOnMobile: function () {
			return this.agencyOnMobile || false
		},
		isAgencyGroupAdmin: function () {
			return this.agencyGroupAdmin || false
		},
		isArenaOne: function () {
			return this.arenaOne || false
		},
		isNoAccessToLedger: function () {
			return this.userNoAccessToLedger || false
		},
		isHotusaActive: function () {
			return this.hotusaActive || false
		},
		getAgencySupplierURI: function () {
			return this.agencySupplierURI || false
		},
		isAgencyOnMobileNew: function () {
			return this.agencyOnMobileNew1 ? true : false
		},
		agencyDefaultComm: function () {
			return this.agencyDefaultCommissionPercent
		},
		addNewMessageCount: function (a) {
			if (!this.messageLastDate) {
				this.messageLastDate = TDS.env.heartbeat.getLastHeartbeatDate()
			}
			this.messageCount += a;
			return this.messageCount
		},
		resetNewMessageCount: function () {
			this.messageCount = 0;
			this.messageLastDate = 0
		},
		getMessageLastDate: function () {
			return this.messageLastDate
		}
	});
TDS.env.user = new TDS.user();