{
	xtype: "form",
	border: false,
	items: [{
			xtype: "tabpanel",
			activeTab: 0,
			layoutOnTabChange: true,
			height: 330,
			defaults: {
				bodyStyle: "padding: 6px 4px 6px 4px;"
			},
			items: [{
					title: "Contact",
					layout: "form",
					items: [{
							xtype: "textfield",
							name: "addressLine1",
							fieldLabel: "Address",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 185
						}, {
							xtype: "textfield",
							name: "addressLine2",
							fieldLabel: "",
							labelSeparator: "",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 185
						}, {
							xtype: "textfield",
							name: "locality",
							fieldLabel: "Locality",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 120
						}, {
							xtype: "textfield",
							name: "state",
							fieldLabel: "State",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 120
						}, {
							xtype: "textfield",
							name: "postcode",
							fieldLabel: "Postcode",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 60
						}, {
							xtype: "combo",
							name: "countryURI",
							fieldLabel: "Country",
							emptyText: "Type a country...",
							minChars: 1,
							enableKeyEvents: true,
							hideTrigger: true,
							mode: "local",
							width: 160,
							typeAhead: true,
							triggerAction: "all",
							forceSelection: true,
							selectOnFocus: true,
							displayField: "name",
							valueField: "dataURI",
							store: TDS.data.getStore({
								dataURI: TDS.env.dataPath + "countries/collection",
								identifier: "countries",
								fields: ["name", "dataURI"]
							})
						}, {
							xtype: "textfield",
							name: "email",
							fieldLabel: "Email",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 185
						}, {
							xtype: "textfield",
							name: "phoneNumber",
							fieldLabel: "Phone number",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 120
						}, {
							xtype: "textfield",
							name: "fax",
							fieldLabel: "Fax",
							bodyStyle: "padding: 2px 4px 2px 4px;",
							width: 120
						}
					]
				}
			],
			listeners: {
				beforerender: function () {}
			}
		}
	]
}