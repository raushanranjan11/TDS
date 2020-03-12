{
	xtype: "awesomepanel",
	groupURI: "group/SUPPLIER",
	title: "Supplier tasks",
	cls: "x-tds-homebox",
	frame: true,
	autoHeight: true,
	itemConfigs: [{
			xtype: "panel",
			groupPermission: "INVENTORY",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Inventory', 'inventory.js', '', '" + TDS.env.sessionPath + "inventory', 'group/INVENTORY_MANAGEMENT');\">Inventory management</a>", '<p class="x-tds-hint-text">Please select this link to add and maintain the content of travel components you are distributing.</p>']
		}, {
			xtype: "panel",
			groupPermission: "FULFILLMENT",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Fulfillment', 'fulfillment.js', '', '" + TDS.env.sessionPath + "fulfillment');\">Fulfillment</a>", '<p class="x-tds-hint-text">Please select this link to process requests and bookings.</p>']
		}, {
			xtype: "panel",
			groupPermission: "SUPPLIER_MANAGEMENT",
			html: ['<a href="" onclick="return TDS.app.homeTab.supplierDetails();">Supplier details</a>', '<p class="x-tds-hint-text">Please select this link to manage your supplier details, fees and users.</p>']
		}, {
			xtype: "panel",
			hidden: TDS.env.isApp,
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('TDSMedia', 'communication.js', '', '');\">TDSMedia</a>", '<p class="x-tds-hint-text">Please select this link to manage your TDSMedia account.</p>']
		}, {
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('International Payments', 'internationalpayments.js', '', '');\">International Payments</a>", '<p class="x-tds-hint-text">Please select this link to make an international currency payment.</p>']
		}, {
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Payment Gateway', 'payment-gateways.js', '', '');\">Payment Gateway</a>", '<p class="x-tds-hint-text">Please select this link to view Payment Gateways.</p>']
		}, {
			xtype: "panel",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('Invitation', 'invitation.js', '', '');\">Invitation</a>", '<p class="x-tds-hint-text">Please select this link for invitation.</p>']
		}, {
			panelKey: "ARENA_ONE_ExternalAgents",
			html: ["<a href=\"\" onclick=\"return TDS.workArea.openTab('External Agents', 'agency/externalAgents/list.js', '', '" + TDS.env.sessionPath + "externalAgents');\">Manage External Agents</a>", '<p class="x-tds-hint-text">Please select this link to manage your External agents.</p>']
		}, ],
	items: [{
			hidden: true
		}
	]
}