{
	xtype: "panel",
	layout: "form",
	border: false,
	width: 750,
	height: 330,
	bodyStyle: "padding: 1px;",
	beforeSubmit: function (d) {
		var e = this.items.itemAt(0).items.itemAt(0);
		var c = e.getSelections();
		var b = this.items.itemAt(1).getValue();
		if (b != "" && b != null) {
			d.consultanName = b
		}
		d.externalAgencyId = c[0].data.dataURI;
		return d
	},
	requireStores: [{
			dataURI: TDS.env.dataPath + "countries/collection",
			identifier: "countries",
			fields: ["name", "dataURI"]
		}
	],
	items: [{
			xtype: "panel",
			autoScroll: true,
			layout: "form",
			height: 300,
			items: {
				xtype: "awesomegrid",
				searchURI: TDS.env.dataPath + "agencies/external",
				pinnable: true,
				enableRowExpander: false,
				iconCls: "icon-grid",
				tbar: ["Name: ", {
						xtype: "textfield",
						name: "nameLike",
						enableKeyEvents: true,
						width: 120
					}, " ", "Email: ", {
						xtype: "textfield",
						name: "emailLike",
						enableKeyEvents: true,
						width: 120
					}, " ", "Country: ", {
						xtype: "clearablecombo",
						name: "countryURI",
						fieldLabel: "Country",
						emptyText: "Type a country...",
						minChars: 1,
						enableKeyEvents: true,
						mode: "local",
						width: 160,
						typeAhead: true,
						triggerAction: "all",
						forceSelection: true,
						selectOnFocus: true,
						displayField: "name",
						valueField: "dataURI",
						store: TDS.data.getStore({
							dataURI: TDS.env.dataPath + "countries/collection/custom",
							identifier: "countries",
							fields: ["name", "dataURI"]
						})
					}
				],
				store: new Ext.data.JsonStore({
					url: "",
					id: "dataURI",
					fields: ["dataURI", "pinned", "code", "name", "group", "licenceNumber", "postcode", "countryURI", "locationURI", "locationString", "phoneNumber", "email", "createdDate", "updatedDate"]
				}),
				sm: new Ext.grid.RowSelectionModel(),
				cm: new Ext.grid.ColumnModel([{
							header: "Name",
							dataIndex: "name"
						}, {
							header: "Code",
							dataIndex: "code",
							width: 60,
							fixed: true
						}, {
							header: "Email",
							dataIndex: "email"
						}, {
							header: "Group",
							dataIndex: "group"
						}, {
							header: "Licence No",
							dataIndex: "licenceNumber"
						}, {
							header: "Country",
							dataIndex: "countryURI",
							sortable: true,
							renderer: TDS.util.Format.displayResourceNameRenderer()
						}, {
							header: "City",
							dataIndex: "locationString",
							sortable: true
						}, {
							header: "Phone number",
							dataIndex: "phoneNumber"
						}
					]),
				viewConfig: {
					forceFit: true
				}
			}
		}, {
			xtype: "textfield",
			name: "consultantName",
			fieldLabel: "Consultant",
			width: 150
		}
	]
}