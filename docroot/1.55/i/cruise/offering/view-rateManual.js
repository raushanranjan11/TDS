{
	xtype : "panel",
	layout : Ext.isIE ? "fit" : "",
	autoScroll : true,
	bodyStyle : "padding: 8px;",
	tbar : ["->", {
			xtype : "button",
			text : "Copy",
			handler : function () {
				var b = this.ownerCt.findParentByType("form");
				var d = this.ownerCt.ownerCt.items.itemAt(0);
				var c = d.selModel.getSelected();
				if (!c) {
					return
				}
				var a = c.get("dataURI");
				TDS.window.setWindow({
					title : "Copy cruise rate",
					information : "This interface will create a new rate with the following details, you may edit these details before you submit.",
					interfaceURI : "cruise/offering/rate/create.js",
					sourceDataURI : a,
					postDataURI : b.getDataURI() + "/rates",
					requiredData : [{
							id : "supplier",
							dataURI : b.getSupplierURI()
						}
					],
					buttonOK : "Submit",
					callback : {
						fn : function (f) {
							if (f) {
								var e = Ext.StoreMgr.lookup(b.getDataURI() + "/rates");
								if (e) {
									e.reload()
								}
								this.submitQuery(true)
							}
						},
						scope : d
					}
				})
			}
		}, " ", {
			xtype : "button",
			text : "Archive",
			disabled : true,
			handler : function () { ;
				var b = this.ownerCt.findParentByType("form");
				var e = this.ownerCt.ownerCt.items.itemAt(0);
				var d = e.selModel.getSelected();
				if (!d) {
					return
				}
				var a = d.get("dataURI");
				var f = this.getText();
				var c = !(e.topToolbar.items.itemAt(10).checked);
				TDS.window.setWindow({
					title : f,
					message : "Are you sure you want to " + f + " ?",
					destinationDataURI : a,
					data : {
						archived : c
					},
					callback : {
						fn : function (g) {
							if (g) {
								e.submitQuery(true)
							}
						},
						scope : e
					}
				})
			}
		}
	],
	items : [{
			xtype : "awesomegrid",id:'dd',
			pinnable : true,
			enableRowExpander : false,
			sessionExpandedRows : true,
			tbar : ["Category:", {
					xtype : "combo",
					name : "nameLike",
					enableKeyEvents : true,
					width : 180,
						mode: "local",
				width: 200,
				triggerAction: "all",
						editable: false,
				displayField: "code",
				valueField: "code",
				updateRates: function (b, a, c) {
					this.store.removeAll();
					this.store.add(a);
					if ((this.getValue() == null || this.getValue() == "") && a.length > 0) {
					//	this.setValue(a[1].data.dataURI)
					} else {
						this.setValue(this.getValue())
					}
				}
				}, " ", 
				/*	"Code:", {
					xtype : "textfield",
					name : "grade",
					enableKeyEvents : true,
					width : 120
				},
						*/
						" ", {
					xtype : "checkbox",
					name : "archived",
					boxLabel : "Show only Archived",
					handler : function () { ;
						var b = this.ownerCt.ownerCt.ownerCt.ownerCt;
						var a = b.items.itemAt(0).topToolbar;
						a.items.itemAt(5).disable(true)
					}
				}, "->", {
					xtype : "button",
					text : '<div style="font-weight: 900;color: white">Cabins/Staterooms</div>',
					value : "rate",
					style : "background-color:green;",
					firstClick : true,
					disabled : true,
					handler : function (j, g, d) { ;
						var c = this.ownerCt.findParentByType("ajaxpanel");
						c.ownerCt.showInterface(c.ownerCt.topToolbar.items.itemAt(1), 6);
						var f = this.ownerCt.ownerCt;
						var i = f.getSelections();
						//console.log(i);
						//c.ownerCt.items.itemAt(6).data = i[0].data.name;
						c.ownerCt.items.itemAt(6).data = i[0].data.code;
						if (!this.firstClick) {
							var b = i[0].data.name;
							var h = c.ownerCt.items.itemAt(6).items.itemAt(0).items.itemAt(0);
							h.searchURI = TDS.env.dataPath + i[0].data.dataURI + "/cabin";
							c.ownerCt.items.itemAt(6).searchURI = i[0].data.dataURI;
							h.topToolbar.items.itemAt(0).setText(i[0].data.name);
							h.submit()
						} else {
							this.firstClick = false;
							c.ownerCt.items.itemAt(6).searchURI = i[0].data.dataURI
						}
					}
				}
			],
			store : new Ext.data.JsonStore({
				url : "",
				id : "dataURI",
				fields : ["dataURI", "pinned", "name", "priceCode", "code", "homeCurrency", "rateClassURI", "pricingPriceSell", "pricingPriceIsNett",'packagepricingPriceIsNett',
					"pricingPriceCommission", "cabinTypeURI", "maximumOccupancy", "inside", "groupName", "rateClassURI", "rateOccupancyURI", "ratePerURI",
					"active", "special", "cabinTypeText", "deck", "grade", "category", "categoryStatus", "rateClassURI", "ages", "priceSingle", "priceDouble",
					"priceTriple", "priceQuad", "currency","categoryStatus"]
			}),
			sm : new Ext.grid.RowSelectionModel(),
			cm : new Ext.grid.ColumnModel([{
						header : "Category",
						dataIndex : "code",
						sortable : true
					}, {
						header : "Category Descr.",
						dataIndex : "name",
						sortable : true,
						width : 120
					}, {
						header : "Single Price",
						dataIndex : "priceSingle"
					}, {
						header : "Double Price",
						dataIndex : "priceDouble"
					}, {
						header : "Triple Price",
						dataIndex : "priceTriple"
					}, {
						header : "Quad Price",
						dataIndex : "priceQuad"
					}, {
						header : "Status",
						dataIndex : "categoryStatus",
						//renderer : function (c, b, a) {
							//return "RQ"
						//}
					}, {
						header : "Decks",
						dataIndex : "deck",
						sortable : true
					}, {
						header : "Fare Code",
						dataIndex : "priceCode",
						sortable : true,
						width : 90,
						fixed : true
					}, {
						header : "Pax ",
						dataIndex : "rateClassURI",
						sortable : true,
						width : 90,
						fixed : true,
						renderer : function (c, b, a) {
							return TDS.util.Format.displayResourceName(c)
						}
					}, {
						header : "Active",
						dataIndex : "active",
						sortable : true,
						width : 60,
						renderer : TDS.util.Format.booleanRenderer
					}, {
						header : "Special",
						dataIndex : "special",
						sortable : true,
						width : 64,
						renderer : TDS.util.Format.booleanRenderer
					}, {
							header : "Commission",
						//header : "Pricing",
						dataIndex : "pricingPriceSell",
						sortable : true,
						//renderer : TDS.util.Price.homeCurrencyGrossNettPriceRenderer
						renderer: function(c, b, a) {
							console.log(a.get('packagepricingPriceIsNett'))
							if(a.get('packagepricingPriceIsNett')){

							return "Nett";
							}else{
					return c +" %"; }
					}
						}
				]),
			viewConfig : {
				forceFit : true
			},
			listeners : {
				toolbarinit : function () {
					var a = this.ownerCt.findParentByType("ajaxpanel");
					this.searchURI = TDS.env.dataPath + a.baseDataURI + "/rates";

				var tbar = this.getTopToolbar();
				var b = tbar.items.itemAt(1);
				var c = Ext.StoreMgr.lookup(a.baseDataURI + "/rates");
				console.log('^^^^^^^^^^^^^^^^^^^^');
				console.log(c)
				b.store = c;
				c.on("load", b.updateRates, b)

				},
				render : function () {
					this.getSelectionModel().on("rowselect", function () {
						this.items.itemAt(6).setDisabled(false)
					}, this.getTopToolbar());
					this.getSelectionModel().on("rowdeselect", function () {}, this.getTopToolbar())
				},
				rowdblclick : function (f, i, h) {
					var b = this.ownerCt.findParentByType("form");
					var d = f.getStore().getAt(i);
					var a = d.get("dataURI");
					var c = d.get("deckList");
					console.log(d);
					TDS.window.setWindow({
						title : "Update cruise Category",
						interfaceURI : "cruise/offering/rate/edit.js",
						sourceDataURI : a,
						destinationDataURI : a,
						data : {
							dataURI : a,
							deckList : c,
								selectedRow :d
						},
						buttonOK : "Submit",
						callback : {
							fn : function (g) {
								if (g) {
									var e = Ext.StoreMgr.lookup(b.getDataURI() + "/rates");
									if (e) {
										e.reload()
									}
									this.submitQuery(true)
								}
							},
							scope : f
						}
					})
				}
			}
		}
	]
}


















































