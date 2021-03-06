Ext.AwesomeGrid = Ext.extend(Ext.grid.GridPanel, {
		emptyText: "No results returned.",
		disableAutoHeight: false,
		autoHeight: true,
		enableRowExpander: false,
		enableSession: true,
		sendMinData: false,
		searchURI: "",
		delay: 200,
		dt: new Ext.util.DelayedTask(),
		collectionIdentifier: "",
		isCollectionValid: false,
		alwaysUseCollection: false,
		toolbarFields: [],
		pinnable: false,
		pinnedList: [],
		sessionURI: "",
		sessionExpandedRows: false,
		expandList: [],
		autoSubmit: true,
		appendQueryParams: {},
		refreshAgain: false,
		isSearching: false,
		isSearchingByName: true,
		islocationURI: false,
		callBeforeSearch: false,
		startLimit: 0,
		allowPagination: false,
		progressshow: undefined,
		progressbar: false,
		lastExpandedRowIdx: null,
		initComponent: function () {
			Ext.AwesomeGrid.superclass.initComponent.apply(this, arguments);
			this.appendQueryParams = {};
			Ext.apply(this, {
				toolTemplate: new Ext.Template('<div class="x-tool-custom ">&#160;</div>'),
				toolTarget: "tbar",
				tools: [{
						id: "refresh",
						qtip: "Refresh",
						handler: function (d, c, b) {
							b.refreshResults()
						}
					}
				]
			});
			this.addEvents("toolbarinit", "sessioninit", "queryresponse", "beforequery", "loadcollection");
			if (this.sessionExpandedRows) {
				this.expandList = [];
				this.enableSession = true
			}
			if (this.disableAutoHeight) {
				this.autoHeight = false
			}
			if (this.initialConfig.viewConfig === undefined) {
				this.initialConfig.viewConfig = {}
			}
			if (!this.initialConfig.viewConfig.scrollOffset) {
				this.initialConfig.viewConfig.scrollOffset = 0
			}
			this.initialConfig.viewConfig.emptyText = this.emptyText;
			if (this.enableRowExpander) {
				this.trackMouseOver = false;
				this.initialConfig.viewConfig.enableRowBody = true;
				this.initialConfig.viewConfig.getRowClass = function (b, e, d, c) {
					lastExpandedRowIdx = e;
					if (this.grid.sessionExpandedRows && this.grid.isExpanded(b.get("dataURI"))) {
						this.grid.addExpandRowIndex(e);
						return "x-grid3-row-expanded"
					} else {
						return "x-grid3-row-collapsed"
					}
				};
				this.on("rowdblclick", this.onExpandRow, this);
				this.getView().on("refresh", function (b) {
					if (this.grid.sessionExpandedRows) {
						this.grid.doExpandRow()
					}
				})
			}
			if (this.pinnable) {
				this.pinnedList = [];
				var a = this.getColumnModel();
				a.config.push({
					header: "&#160;",
					id: "pin",
					dataIndex: "pinned",
					width: 16,
					sortable: true,
					fixed: true,
					menuDisabled: true,
					resizable: false,
					hideable: false,
					renderer: this.rendererPin
				});
				a.setConfig(a.config, true)
			}
		},
		createRowBody: function (d, a, g, f, c) {
			if (typeof f === "undefined") {
				f = d.getView().getRow(g)
			}
			var e = Ext.DomQuery.selectNode("tr", f);
			Ext.fly(e).addClass("x-grid3-row-main");
			var b = Ext.DomQuery.selectNode("div[class=x-grid3-row-body]", f);
			f.panel = new Ext.AjaxPanel({
					renderTo: b,
					border: true,
					layout: "fit",
					interfaceURI: c || a.data.interfaceURI,
					rowRecordData: a.data,
					ownerCt: this,
					listeners: {
						afterlayout: function (h, i) {
							if (!this.isReady()) {
								return
							}
							if (d.rowHeight) {
								return
							}
							d.rowHeight = this.el.dom.scrollHeight;
							d.setHeightForRow(true)
						}
					}
				})
		},
		doExpandRow: function () {
			if (this.expandRowIndexes == undefined) {
				return
			}
			var b = this.getStore();
			for (var d = 0; d < this.expandRowIndexes.length; d++) {
				var f = this.expandRowIndexes[d];
				var e = this.getView().getRow(f);
				var a = b.getAt(f);
				if (this.getRowInterface) {
					var c = this.getRowInterface(a, f, b)
				}
				this.createRowBody(this, a, f, e, c)
			}
			delete this.expandRowIndexes
		},
		addExpandRowIndex: function (a) {
			if (typeof this.expandRowIndexes === "undefined") {
				this.expandRowIndexes = []
			}
			this.expandRowIndexes.push(a)
		},
		onExpandRow: function (b, d, c) {
			console.log("Expanding----------------------");
			console.log(d);
			lastExpandedRowIdx = d;
			if (this.pinnable) {
				var a = c.getTarget(".x-tds-cell-pin");
				if (a) {
					return
				}
			}
			this.expandRowToggle(d)
		},
		expandRowToggle: function (b) {
			if (!this.enableRowExpander) {
				return
			}
			var c = this.getStore();
			var f = this.getView().getRow(b);
			var a = c.getAt(b);
			if (Ext.fly(f).hasClass("x-grid3-row-collapsed")) {
				if (this.sessionExpandedRows) {
					this.expandList.push(a.get("dataURI"))
				}
				this.setHeightForRow(true);
				Ext.fly(f).replaceClass("x-grid3-row-collapsed", "x-grid3-row-expanded");
				if (typeof f.panel == "undefined") {
					if (this.getRowInterface) {
						var d = this.getRowInterface(a, b, c);
						this.lastExpandedRowIdx = b
					}
					this.createRowBody(this, a, b, f, d)
				}
			} else {
				if (this.sessionExpandedRows) {
					this.expandList.remove(a.get("dataURI"))
				}
				this.setHeightForRow();
				Ext.fly(f).replaceClass("x-grid3-row-expanded", "x-grid3-row-collapsed")
			}
			if (this.sessionExpandedRows) {
				var e = this.expandList.join(",");
				TDS.session.set(this.getSessionURI(), {
					expandList: e
				})
			}
		},
		isRowExpanded: function (a) {
			var b = this.getView().getRow(a);
			if (Ext.fly(b).hasClass("x-grid3-row-expanded")) {
				return true
			}
			return false
		},
		getSession: function (a) {
			if (this.sessionURI) {
				return this.sessionObj[a]
			}
			if (this.getAjaxPanel() != null) {
				return this.getAjaxPanel().sessionObj[a]
			} else {
				return null
			}
		},
		getSessionURI: function () {
			if (this.sessionURI) {
				return this.sessionURI
			}
			if (this.getAjaxPanel() != null) {
				return this.getAjaxPanel().sessionURI
			} else {
				return ""
			}
		},
		fetchSessionURI: function () {
			if (!this.sessionURI) {
				return
			}
			var a = TDS.session.get({
					path: this.sessionURI,
					scope: this,
					callback: this.fetchSessionResponse
				});
			if (a !== -1) {
				this.fetchSessionResponse(a)
			}
		},
		fetchSessionResponse: function (a) {
			if (a) {
				this.sessionObj = a
			}
			this.initToolbar()
		},
		getAjaxPanel: function () {
			if (!this.ajaxpanel) {
				this.ajaxpanel = this.ownerCt.findParentByType("ajaxpanel")
			}
			return this.ajaxpanel
		},
		setHeightInit: function () {
			if (this.el.dom.scrollHeight <= this.getView().scroller.dom.scrollHeight) {
				this.setHeight(this.getView().scroller.dom.scrollHeight + 58)
			}
		},
		setHeightForRow: function (b) {
			var a = this.rowHeight;
			if (!a) {
				return
			}
			if (!b) {
				a = -a
			}
			this.setHeight(this.el.dom.scrollHeight + a)
		},
		next25: function () {
			this.startLimit = this.startLimit + 25;
			this.refreshResults()
		},
		previous25: function () {
			if (this.startLimit > 24) {
				this.startLimit = this.startLimit - 25;
				this.refreshResults()
			}
		},
		onRender: function () {
			Ext.AwesomeGrid.superclass.onRender.apply(this, arguments);
			if (this.tbar2) {
				this.topToolBar2 = new Ext.Toolbar({
						renderTo: this.tbar,
						items: this.tbar2
					});
				this.topToolBar2.ownerCt = this
			}
			if (this.tbar3) {
				this.topToolBar3 = new Ext.Toolbar({
						renderTo: this.tbar,
						items: this.tbar3
					});
				this.topToolBar3.ownerCt = this
			}
			if (this.tbar4) {
				this.topToolBar4 = new Ext.Toolbar({
						renderTo: this.tbar,
						items: this.tbar4
					});
				this.topToolBar4.ownerCt = this
			}
			if (this.bbar2) {
				this.bottomToolBar2 = new Ext.Toolbar({
						renderTo: this.bbar,
						items: this.bbar2
					});
				this.bottomToolBar2.ownerCt = this
			}
			this.initSession()
		},
		initSession: function () {
			this.fireEvent("sessioninit", this);
			if (this.enableSession && this.sessionURI) {
				this.fetchSessionURI()
			} else {
				this.initToolbar()
			}
		},
		getTopToolbar2: function () {
			return this.topToolBar2
		},
		getTopToolbar3: function () {
			return this.topToolBar3
		},
		getTopToolbar4: function () {
			return this.topToolBar4
		},
		getBottomToolBar2: function () {
			return this.bottomToolBar2
		},
		initToolbar: function () {
			this.fireEvent("toolbarinit", this);
			this.toolbarFields = [];
			var g = this.getTopToolbar();
			var f = this.getTopToolbar2();
			var e = this.getTopToolbar3();
			var d = this.getTopToolbar4();
			var b = this.getBottomToolBar2();
			if (typeof g == "object") {
				this.setToolbarItems(g)
			}
			if (typeof f == "object") {
				this.setToolbarItems(f)
			}
			if (typeof e == "object") {
				this.setToolbarItems(e)
			}
			if (typeof d == "object") {
				this.setToolbarItems(d)
			}
			if (this.pinnable) {
				var a = this.getSession("pinnedList");
				if (a) {
					this.pinnedList = a.split(",")
				}
			}
			if (this.sessionExpandedRows) {
				var c = this.getSession("expandList");
				if (c) {
					this.expandList = c.split(",");
					this.doExpandRow()
				}
			}
			if (this.autoSubmit) {
				this.submitQuery(true)
			}
		},
		setToolbarItems: function (a) {
			a.items.each(function (d) {
				if (!d.xtype) {
					return true
				}
				var c = d;
				if (c.xtype == "textfield" || c.xtype == "datefield") {
					c.on("keyup", this.submit, this)
				} else {
					if (c.xtype == "monthYear") {
						c.on("keyup", this.submit, this)
					} else {
						if (c.xtype == "combo" || c.xtype == "clearablecombo" || c.xtype == "awesomecombo" || c.xtype == "locationcombo" || c.xtype == "airportcombo") {
							c.on("select", this.submit, this);
							if (c.xtype == "clearablecombo" || c.xtype == "awesomecombo" || c.xtype == "locationcombo" || c.xtype == "airportcombo") {
								c.on("clear", this.submit, this)
							}
						} else {
							if (c.xtype == "checkbox") {
								c.on("check", this.submit, this)
							} else {
								if (c.xtype == "radio") {
									c.on("check", this.submit, this)
								} else {
									if (c.xtype == "awesomesplitbutton") {
										c.on("click", this.submit, this)
									} else {
										if (c.xtype == "omnicrementer") {
											c.on("trigger", this.submit, this)
										} else {
											if (c.xtype == "hidden") {}
											else {
												return true
											}
										}
									}
								}
							}
						}
					}
				}
				if (c.xtype == "datefield") {
					c.addEvents("extraselect");
					Ext.apply(c, {
						grid: this,
						menuListeners: {
							select: function (e, f) {
								this.setValue(f);
								this.fireEvent("extraselect", this, f);
								this.grid.submit()
							}
						}
					})
				}
				this.toolbarFields.push(c);
				if (this.enableSession) {
					if (c.excludeFromSession) {
						return true
					}
					var b = this.getSession(c.name);
					if (b) {
						if (c.xtype == "datefield") {
							b = Date.parseDate(b, TDS.env.dateFormat)
						}
						c.setValue(b)
					}
				}
			}, this)
		},
		findField: function (c) {
			for (var a = 0; a < this.toolbarFields.length; a++) {
				var b = this.toolbarFields[a];
				if (typeof b.name !== undefined && b.name == c) {
					return b
				}
			}
			return false
		},
		refreshResults: function () {
			this.submitQuery(true)
		},
		submit: function () {
			this.dt.cancel();
			this.dt.delay(this.delay, this.submitQuery, this)
		},
		progresshow: function () {
			if (this.progressbar && this.isSearchingByName && this.islocationURI) {
				TDS.window.setWindow({
					title: '<font size="4">Searching Available Hotels</font>',
					message: '<pre><p><input type="image" src="progress-loading.gif">     <font size="5"><b>Loading Hotels.......<b></font></p></pre>',
					buttonOK: false,
					buttonCancel: false,
					maxWidth: 20
				})
			}
		},
		progreshide: function () {
			if (this.progressbar) {
				TDS.window.hide()
			}
		},
		submitQuery: function (d) {
			if (this.callBeforeSearch) {
				this.beforeSearch()
			}
			if (this.fireEvent("beforequery", this) === false) {
				return
			}
			if (this.searchURI == "") {
				return
			}
			if (this.alwaysUseCollection) {
				d = true
			}
			var h,
			g;
			this.queryParams = {};
			var f = {};
			this.isSearchingByName = true;
			this.islocationURI = false;
			for (var c = 0; c < this.toolbarFields.length; c++) {
				h = this.toolbarFields[c];
				if (h.excludeSubmit) {
					continue
				}
				if (h.xtype == "datefield") {
					g = h.getValue();
					if (typeof g == "object") {
						g = g.format(TDS.env.dateFormat)
					}
				} else {
					if (h.xtype == "monthYear") {
						g = h.getValue();
						if (typeof g == "object") {
							g = g.format(TDS.env.dateFormat)
						}
					} else {
						g = h.getValue()
					}
				}
				if (h.name == "nameLike" && (g.length > 0 && g.length < 4)) {
					this.isSearchingByName = false
				}
				if (h.name == "locationURI" && g != null && g != "") {
					this.islocationURI = true
				}
				this.queryParams[h.name] = g;
				if (!h.excludeFromSession) {
					f[h.name] = g
				}
				if (h.originalValue == g) {
					continue
				}
				if (h.originalValue.length == 0) {
					this.isCollectionValid = false
				} else {
					if (g.length > h.originalValue.length && g.substring(0, h.originalValue.length) == h.originalValue) {}
					else {
						this.isCollectionValid = false
					}
				}
				h.originalValue = g
			}
			Ext.apply(this.queryParams, this.appendQueryParams);
			if (this.enableSession) {
				TDS.session.set(this.getSessionURI(), f)
			}
			if (this.pinnable) {
				var e = this.pinnedList.join(",");
				if (e) {
					this.queryParams.pinned = e
				}
			}
			if (this.allowPagination) {
				this.queryParams.startLimit = this.startLimit
			}
			if (this.searchURI.indexOf(TDS.env.dataPath) != -1) {
				this.collectionIdentifier = this.searchURI.substring(TDS.env.dataPath.length)
			} else {
				this.collectionIdentifier = this.searchURI
			}
			if (this.sendMinData) {
				this.collectionIdentifier += "?sendMinData=" + this.sendMinData + "&";
				var a = Ext.urlEncode(this.queryParams);
				if (a) {
					this.collectionIdentifier += a
				}
			} else {
				var a = Ext.urlEncode(this.queryParams);
				if (a) {
					this.collectionIdentifier += "?" + a
				}
			}
			if (d && this.isCollectionValid) {
				this.isCollectionValid = false
			}
			this.isCollectionValid = false;
			var b = "";
			if (this.sendMinData) {
				b = this.isCollectionValid ? this.searchURI : this.searchURI + "/collection?sendMinData=" + this.sendMinData
			} else {
				b = this.isCollectionValid ? this.searchURI : this.searchURI + "/collection"
			}
			if (!this.isSearching) {
				this.refreshAgain = false;
				this.isSearching = true;
				if (this.islocationURI) {
					this.progresshow()
				}
				this.getStore().loadData([]);
				Ext.Ajax.request({
					url: b,
					method: "GET",
					disableCaching: false,
					params: this.queryParams,
					callback: this.submitQueryResponse,
					scope: this
				})
			} else {
				this.refreshAgain = true
			}
		},
		getQueryParams: function (a) {
			if (a) {
				return Ext.urlEncode(this.queryParams)
			}
			return this.queryParams
		},
		clearQueryParams: function () {
			for (var a = 0; a < this.toolbarFields.length; a++) {
				var b = this.toolbarFields[a];
				b.setValue("")
			}
		},
		setSearchURI: function (a) {
			this.searchURI = a
		},
		setQueryParams: function (c) {
			for (var a = 0; a < this.toolbarFields.length; a++) {
				var b = this.toolbarFields[a];
				if (typeof c[b.name] != "undefined") {
					b.setValue(c[b.name])
				}
			}
		},
		applyCustomValidationText: function (b) {
			var a = this.getView();
			if (!a.hasRows()) {
				if (b.substring(b.length - 1) != ".") {
					b += "."
				}
				a.mainBody.update('<div class="x-grid-empty">' + b + '<input type="image" src="images/grid/loading.gif"></div>')
			}
		},
		applyValidationText: function (b) {
			var a = this.getView();
			if (!a.hasRows()) {
				if (b.substring(b.length - 1) != ".") {
					b += "."
				}
				a.mainBody.update('<div class="x-grid-empty">' + b + "</div>")
			}
		},
		submitQueryResponse: function (f, a, c) {
			this.isSearching = false;
			this.progreshide();
			this.fireEvent("queryresponse", this, a);
			if (a) {
				try {
					var b = Ext.util.JSON.decode(c.responseText)
				} catch (d) {
					return
				}
				if (this.isCollectionValid) {
					this.loadFinerData(b)
				} else {
					this.loadCollectionData(b)
				}
				if (this.refreshAgain) {
					this.refreshResults()
				}
				return
			} else {
				if (c.status == 409) {
					this.applyValidationText(c.responseText)
				}
			}
		},
		loadFinerData: function (d) { ;
			d = this.processFinerData(d);
			var b = this.getStore();
			var g = [];
			for (var c = 0; c < d.length; c++) {
				var a = b.indexOfId(d[c]);
				if (a > -1) {
					var f = b.getAt(a);
					g.push(b.getAt(a))
				} else {
					if (a == -1) {
						if (b.reader.jsonData[c].dataURI == d[c]) {
							var e = b.reader.jsonData[c];
							g.push(b.reader.jsonData[c])
						}
					}
				}
			}
			b.removeAll();
			b.add(g)
		},
		loadCollectionData: function (b) {
			b = this.processCollectionData(b);
			var d = b[this.overrideCollectionIdentifier || this.collectionIdentifier];
			if (typeof d == "undefined") {
				return
			}
			var c = [];
			for (var a = 0; a < d.length; a++) {
				b[d[a]].dataURI = d[a];
				if (this.pinnable) {
					if (this.isPinned(d[a])) {
						b[d[a]].pinned = "1"
					} else {
						b[d[a]].pinned = "0"
					}
				}
				c.push(b[d[a]])
			}
			this.isCollectionValid = true;
			if (this.fireEvent("loadcollection", this, c) === false) {
				return
			}
			this.getStore().loadData(c)
		},
		processCollectionData: function (a) {
			return a
		},
		processFinerData: function (a) {
			return a
		},
		getCollectionIdentifier: function () {
			return this.overrideCollectionIdentifier || this.collectionIdentifier
		},
		onClick: function (f, g) {
			Ext.AwesomeGrid.superclass.onClick.apply(this, arguments);
			if (this.pinnable) {
				var i = f.getTarget(".x-tds-cell-pin");
				var j = f.getTarget(".x-grid3-row");
				if (i) {
					var h = Ext.get(i);
					var c = this.store.getAt(j.rowIndex);
					var a = c.get("dataURI");
					var d = this.isPinned(a);
					if (d) {
						h.removeClass("x-tds-cell-pinned");
						this.pinnedList.remove(a);
						c.set("pinned", "0")
					} else {
						h.addClass("x-tds-cell-pinned");
						this.pinnedList.push(a);
						c.set("pinned", "1")
					}
					var b = this.pinnedList.join(",");
					if (this.enableSession) {
						TDS.session.set(this.getSessionURI(), {
							pinnedList: b
						})
					}
				}
			}
		},
		isPinned: function (a) {
			for (var b = 0; b < this.pinnedList.length; b++) {
				if (a === this.pinnedList[b]) {
					return true
				}
			}
			return false
		},
		rendererPin: function (e, a, b, f, d, c) {
			if (b.get("pinned") == "1") {
				a.css = "x-tds-cell-pin x-tds-cell-pinned"
			} else {
				a.css = "x-tds-cell-pin"
			}
		},
		isExpanded: function (a) {
			for (var b = 0; b < this.expandList.length; b++) {
				if (a === this.expandList[b]) {
					return true
				}
			}
			return false
		},
		focusResult: function (d, e, c) {
			var a = this.ownerCt;
			var i = this.getStore();
			this.getSelectionModel().clearSelections();
			var h = i.findBy(function (j, k) {
					if (j.get("dataURI") == d) {
						return true
					}
				}, this, 0);
			if (h != -1) {
				var b = this.getView().getRow(h);
				if (b) {
					var g = (Ext.fly(b).getOffsetsTo(a.body)[1]) + a.body.dom.scrollTop;
					a.body.scrollTo("top", g - 25, {
						duration: 0.4,
						callback: function () {
							Ext.fly(b).pause(0.1).highlight("#8db2e3", {
								attr: "background-color",
								duration: 0.5,
								callback: function () {
									if (c && !this.isRowExpanded(h)) {
										this.expandRowToggle(h)
									}
								},
								scope: this
							})
						},
						scope: this
					})
				}
				return true
			} else {
				if (!e) {
					var f = function () {
						this.focusResult(d, true, c);
						i.un("load", f, this)
					};
					i.on("load", f, this)
				}
			}
			return false
		}
	});
Ext.reg("awesomegrid", Ext.AwesomeGrid);
