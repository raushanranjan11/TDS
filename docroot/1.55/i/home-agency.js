{
	xtype: "awesomepanel",
	groupURI: "group/AGENCY",
	title: "Agency tasks",
	cls: "x-tds-homebox",
	frame: true,
	autoHeight: true,
	itemConfigs: [{
			xtype: "panel",
			groupPermission: "AGENCY_MANAGEMENT",
			html: ['<a href="" onclick="return TDS.app.homeTab.agencyDetails();">Agency details</a>', '<p class="x-tds-hint-text">Please select this link to manage your agency details and users.</p>']
		}, {
			hidden: true,
			panelKey: "mobileRegistration"
		}, {
			disabled: TDS.env.isApp,
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Mobile registration', 'agency/customer/list.js', '', '" + TDS.env.sessionPath + "agencyCustomer');\">Mobile registration</a>", '<p class="x-tds-hint-text">Please select this link to manage your mobile registrations.</p>']
		}, {
			xtype: "panel",
			hidden: TDS.env.isAppTrain,
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('TDSMedia', 'communication.js', '', '');\">TDSMedia</a>", '<p class="x-tds-hint-text">Please select this link to manage your TDSMedia account.</p>']
		}, {
			xtype: "panel",
			hidden: TDS.env.isAppTrain,
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('International Payments', 'internationalpayments.js', '', '');\">International Payments</a>", '<p class="x-tds-hint-text">Please select this link to make an international currency payment.</p>']
		}, {
			xtype: "panel",
			hidden: TDS.env.isAppTrain,
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Payment Gateway', 'payment-gateways.js', '', '');\">Payment Gateway</a>", '<p class="x-tds-hint-text">Please select this link to view Payment Gateways.</p>']
		}, {
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Invite', 'invitation.js', '', '');\">Invitation</a>", '<p class="x-tds-hint-text">Please select this link for invitation.</p>']
		}, {
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('NAVGU', 'countryGuides.js', '', '');\">NAVGU</a>", '<p class="x-tds-hint-text">Please select this link to view Country Information.</p>']
		}, {
			hidden: true,
			panelKey: "group_announcements0",
			html: ['<div id="group_announcements0"><div>']
		}, {
			hidden: true,
			panelKey: "group_announcements1",
			html: ['<div id="group_announcements1"><div>']
		}, {
			hidden: true,
			panelKey: "group_announcements2",
			html: ['<div id="group_announcements2"><div>']
		}, {
			hidden: true,
			panelKey: "group_announcements3",
			html: ['<div id="group_announcements3"><div>']
		}, {
			hidden: true,
			panelKey: "group_announcements4",
			html: ['<div id="group_announcements4"><div>']
		}
	],
	items: [{
			hidden: true
		}
	],
	listeners: {
		render: function () {
			if (TDS.env.user.isAgencyOnMobile()) {
				this.getItemByPanelKey("mobileRegistration").show()
			}
			TDS.env.user.on("refresh", function (c, d) {
				if (d.agencyOnMobile) {
					this.getItemByPanelKey("mobileRegistration").show()
				}
			}, this);
			if (TDS.env.user.isAgencyOnMobileNew()) {
				this.getItemByPanelKey("mobileRegistration").show()
			} else {
				this.getItemByPanelKey("mobileRegistration").hide()
			}
			if (TDS.env.user.isArenaOne()) {
				this.getItemByPanelKey("ARENA_ONE_ExternalAgents").show()
			}
			if (TDS.env.isApp) {
				this.getItemByPanelKey("ARENA_ONE_ExternalAgents").show()
			}
			var a = TDS.env.user.agencyGroup;
			var b = this;
			if (typeof a != "undefined" && a != "") {
				setTimeout(function () {
					var e = c.group;
					for (var d = 0; d < e.length; d++) {
						var c = TDS.env.user.agencyGroup;
						var f = c.groupid[d];
						var g = c.groupid[d + "name"];
						b.getItemByPanelKey("group_announcements" + d).show();
						document.getElementById("group_announcements" + d).innerHTML = "<a href=\"\" onclick=\"return TDS.workArea.openAnnounementTab('Announcements', 'announcements.js', '', '',''," + f + ",'" + g + "');\">" + g + ' Announcements</a><p class="x-tds-hint-text">Please select this link to view Announcement Information.</p>'
					}
				}, 800)
			}
		}
	}
}