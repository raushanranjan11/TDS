{
    xtype: "form",
    layout: "fit",
    border: false,
    getDataURI: function() {
        return this.ownerCt.dataURI
    },
    getSupplierURI: function() {
        return this.getData("supplierURI")
    },
    getSessionURI: function() {
        return this.ownerCt.sessionURI
    },
    getSessionValue: function(a) {
        return this.ownerCt.sessionObj[a]
    },
    getData: function(a) {
        return this.ownerCt.dataObj[a]
    },
    sessionDefaults: {
        option: "detail",
        cardIndex: 1
    },
    requireStores: [{
        dataURI: TDS.env.dataPath + "cruise/classes/collection",
        identifier: "cruise/classes",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "cruise/cabintypes/collection",
        identifier: "cruise/cabintypes",
        fields: ["name", "dataURI", "displayName"]
    }, {
        dataURI: TDS.env.dataPath + "rate/classes/collection",
        identifier: "rate/classes",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "rate/occupancies/collection",
        identifier: "rate/occupancies",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "rate/pers/collection",
        identifier: "rate/pers",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "cruise/extracategories/collection",
        identifier: "cruise/extracategories",
        fields: ["name", "dataURI"]
    }],
    listeners: {
        render: function() {
            new Ext.data.CollectionStore({
                storeId: this.getDataURI() + "/rates",
                url: TDS.env.dataPath + this.getDataURI() + "/rates/collection",
                autoLoad: true,
                identifier: this.getDataURI() + "/rates",
                appendData: [{
                    dataURI: "all",
                    name: "All"
                }],
                fields: ["dataURI", "name", "amount", "active", "rateClassURI", "rateOccupancyURI", "ratePerURI", "maximumOccupancy"]
            })
        }
    },
    items: [{
        xtype: "panel",
        region: "center",
        border: false,
        layout: "card",
        activeItem: 0,
        getDataURI: function() {
            return this.ownerCt.getDataURI()
        },
        getSessionURI: function() {
            return this.ownerCt.getSessionURI()
        },
        getSessionValue: function(a) {
            return this.ownerCt.getSessionValue(a)
        },
        defaults: {
            layout: "fit",
            border: false,
            autoLoadPanel: false,
            height: 425
        },
        showInterface: function(a, b) {
            if (!a.pressed) {
                a.toggle(true);
                return
            }
            this.getTopToolbar().items.each(function(e) {
                if (e.pressed && (e.id != a.id)) {
                    e.toggle(false)
                }
            }, this);
            if (b == 6) {
                var d = this.items.itemAt(2);
                d.sessionURI = this.ownerCt.getSessionURI() + "/" + a.value
            } else {
                var d = this.items.itemAt(b);
                d.sessionURI = this.ownerCt.getSessionURI() + "/" + a.value
            }
            this.displayCardByIndex(b);
            var c = this.ownerCt.getSessionURI();
            TDS.session.setByPath(c, {
                option: a.value,
                cardIndex: b
            })
        },
        displayCardByIndex: function(b) {
            this.getLayout().setActiveItem(b);
            var a = this.getLayout().activeItem;
            if (a.xtype == "ajaxpanel") {
                a.baseDataURI = this.ownerCt.getDataURI();
                if (!a.isReady()) {
                    a.initLoad()
                }
                return a
            }
        },
        listeners: {
            render: function() {
                var a = this.ownerCt.sessionDefaults;
                var e = {};
                e.option = this.ownerCt.getSessionValue("option");
                e.cardIndex = this.ownerCt.getSessionValue("cardIndex");
                var b = e.option ? e.option : a.option;
                var c = e.cardIndex ? e.cardIndex : a.cardIndex;
                if (c == 6) {
                    c = 2
                }
                this.getTopToolbar().items.each(function(f) {
                    if (f.value == b) {
                        f.toggle(true)
                    } else {
                        f.toggle(false)
                    }
                }, this);
                this.activeItem = c;
                var d = this.items.itemAt(this.activeItem);
                d.baseDataURI = this.ownerCt.getDataURI();
                d.sessionURI = this.ownerCt.getSessionURI() + "/" + b;
                d.autoLoadPanel = true
            }
        },
        tbar: [{
            xtype: "button",
            text: "Details",
            value: "detail",
            enableToggle: true,
            handler: function() {
                this.ownerCt.ownerCt.showInterface(this, 1)
            }
        }, {
            xtype: "button",
            text: "Category",
            value: "rate",
            enableToggle: true,
            handler: function() {
                this.ownerCt.ownerCt.showInterface(this, 2)
            }
        }, {
            xtype: "button",
            text: "Extras",
            value: "extra",
            enableToggle: true,
            handler: function() {
                this.ownerCt.ownerCt.showInterface(this, 3)
            }
        }, {
            xtype: "button",
            text: "Availability",
            value: "availability",
            enableToggle: true,
            handler: function() {
                this.ownerCt.ownerCt.showInterface(this, 4)
            }
        }, {
            xtype: "button",
            text: "History",
            value: "history",
            enableToggle: true,
            handler: function() {
                this.ownerCt.ownerCt.showInterface(this, 5)
            }
        }],
        items: [{}, {
            xtype: "panel",
            bodyStyle: "padding: 8px; padding-right: 20px;",
            autoScroll: true,
            items: [{
                xtype: "panel",
                border: false,
                hideBorders: true,
                autoHeight: true,
                layout: "column",
                items: [{
                    columnWidth: 1,
                    bodyStyle: "padding-right: 8px;",
                    items: {
                        xtype: "fieldset",
                        title: "Details",
                        cls: "x-tds-offering",
                        autoHeight: true,
                        labelWidth: 120,
                        defaults: {
                            autoWidth: true,
                            isFormField: true,
                            getName: function() {
                                return this.name
                            },
                            setValue: function(c) {
                                if (this.renderer && typeof this.renderer == "function") {
                                    c = this.renderer(c)
                                } else {
                                    if (this.name.substring(this.name.length - 3) == "URI") {
                                        var d = TDS.data.getStoreNameByResourceDataURI(c);
                                        var a = TDS.data.findRecordBy(d, "dataURI", c);
                                        if (a != -1) {
                                            c = a.get("name")
                                        }
                                    }
                                }
                                var b = this.allowHTML ? false : true;
                                this.setText(c, b)
                            },
                            getValue: Ext.emptyFn
                        },
                        bbar: [{
                            xtype: "redbutton",
                            text: "Edit",id:'edit',
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
								//console.log(b.ownerCt.getData().source);
								//console.log(a);
                                if (!a) {
                                    return
                                }
									if (b.ownerCt.getData().source == "CF") {
									//	console.log("*************************");
                                TDS.window.setWindow({
                                    title: "Edit cruise details",
                                    interfaceURI: "cruise/offering/edit.js",
                                    sourceDataURI: a,
                                    destinationDataURI: a,
                                    buttonOK: "Submit",
                                    callback: {
                                        fn: function() {
                                            var d = this.ownerCt.findParentByType("ajaxpanel");
                                            var c = this.ownerCt.findParentByType("fieldset");
                                            d.reloadData();
                                            c.getActivities()
                                        },
                                        scope: this
                                    }
                                })
									}else{
									//console.log("***********                      **************");
								  TDS.window.setWindow({
                                    title: "Edit cruise details",
                                    interfaceURI: "cruise/offering/edit-4.js",
                                    sourceDataURI: a,
                                    destinationDataURI: a,
                                    buttonOK: "Submit",
                                    callback: {
                                        fn: function() {
                                            var d = this.ownerCt.findParentByType("ajaxpanel");
                                            var c = this.ownerCt.findParentByType("fieldset");
                                            d.reloadData();
                                            c.getActivities()
                                        },
                                        scope: this
                                    }
                                })
								}
                            }
                        }, {
                            xtype: "button",
                            text: "Links",
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
                                if (!a) {
                                    return
                                }
                                TDS.window.setWindow({
                                    title: "Links",
                                    interfaceURI: "widgets/links.js",
                                    sourceDataURI: a + "/hrefs/collection",
                                    baseDataURI: a + "/hrefs",
                                    buttonOK: "Submit"
                                })
                            }
                        }, {
                            xtype: "button",
                            text: "Alerts",
                            disabled: true,
                            hidden: true,
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
                                if (!a) {
                                    return
                                }
                                TDS.window.setWindow({
                                    title: "Alerts",
                                    interfaceURI: "widgets/alert.js",
                                    sourceDataURI: a + "/alert",
                                    destinationDataURI: a + "/alert",
                                    buttonOK: "Submit"
                                })
                            }
                        }, {
                            xtype: "button",
                            text: "Itinerary",
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
                                if (!a) {
                                    return
                                }
                                TDS.window.setWindow({
                                    title: "Itinerary",
                                    interfaceURI: "widgets/information.js",
                                    sourceDataURI: a,
                                    destinationDataURI: a,
                                    buttonOK: "Submit"
                                })
                            }
                        }, {
                            xtype: "button",
                            text: "Terms and Conditions",
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
                                if (!a) {
                                    return
                                }
                                TDS.window.setWindow({
                                    title: "Terms and Conditions",
                                    interfaceURI: "widgets/terms-conditions.js",
                                    sourceDataURI: a + "/termsAndCondition",
                                    destinationDataURI: a + "/termsAndCondition",
                                    buttonOK: "Submit"
                                })
                            }
                        }],
                        getActivities: function() {
                            var c = this.ownerCt.findParentByType("form");
                            var a = c.getDataURI();
                            if (!a) {
                                return
                            }
                            var b = this.items.itemAt(10);
                            Ext.Ajax.request({
                                url: TDS.env.dataPath + a + "/activity/collection",
                                method: "GET",
                                callback: function(k, g, h) {
                                    if (g) {
                                        var e = a + "/activity";
                                        var j = Ext.decode(h.responseText);
                                        var i = j[e];
                                        if (!i) {
                                            return
                                        }
                                        var f = TDS.util.collectionToEnglishSentenceList({
                                            collection: i,
                                            data: j,
                                            fieldName: "displayName"
                                        });
                                        if (f) {
                                            this.setText(f)
                                        }
                                    }
                                },
                                scope: b
                            })
                        },
                        items: [{
                            xtype: "label",
                            name: "cruiseShips",
                            fieldLabel: " Ship Name"
                        }, {
                            xtype: "label",
                            name: "cruiseline",
                            fieldLabel: "Cruise Company"
                        }, {
                            xtype: "label",
                            name: "cruiseName",
                            fieldLabel: "Cruise Name"
                        }, {
                            xtype: "label",
                            name: "cruiseNumber",
                            fieldLabel: "ARENA code"
                        }, {
                            xtype: "label",
                            name: "code",
                            fieldLabel: "CF code"
                        }, {
                            xtype: "label",
                            name: "codeSupplier",
                            fieldLabel: "Supplier code"
                        }, {
                            xtype: "label",
                            name: "deptCity",
                            fieldLabel: "Departure city",
                            width: 200
                        }, {
                            xtype: "label",
                            name: "locationToString",
                            fieldLabel: "Arrival city",
                            width: 200
                        }, {
                            xtype: "label",
                            name: "duration",
                            fieldLabel: "Duration",
                            width: 200
                        }, {
                            xtype: "label",
                            name: "sailingdate",
                            fieldLabel: "Departure Date"
                        }, {
                            xtype: "label",
                            name: "arrivalDateText",
                            fieldLabel: "Terminates Date",
                            allowHTML: true,
                            width: 400
                        }, {
                            xtype: "label",
                            name: "cruisePortsDisplayDetailsScreen",
                            fieldLabel: "Ports",
                            allowHTML: true,
                            width: 400
                        }, {
                            xtype: "label",
                            name: "activities",
                            fieldLabel: "Activities",
                            width: 400,
                            listeners: {
                                render: function() {
                                    this.ownerCt.getActivities()
                                }
                            }
                        }]
                    }
                }]
            }, {
                xtype: "panel",
                border: false,
                hideBorders: true,
                autoHeight: true,
                layout: "column",
                items: [{
                    columnWidth: 0.5,
                    bodyStyle: "padding-right: 8px;",
                    items: {
                        xtype: "fieldset",
                        title: "Operator",
                        cls: "x-tds-offering",
                        autoHeight: true,
                        width: 800,
                        defaults: {
                            isFormField: true,
                            getName: function() {
                                return this.name
                            },
                            setValue: function(c) {
                                if (this.name.substring(this.name.length - 3) == "URI") {
                                    var d = TDS.data.getStoreNameByResourceDataURI(c);
                                    var a = TDS.data.findRecordBy(d, "dataURI", c);
                                    if (a != -1) {
                                        c = a.get("name")
                                    }
                                }
                                var b = this.allowHTML ? false : true;
                                this.setText(c, b)
                            },
                            getValue: Ext.emptyFn
                        },
                        bbar: [{
                            xtype: "redbutton",
                            text: "Edit",
                            handler: function() {
                                var b = this.ownerCt.findParentByType("form");
                                var a = b.getDataURI();
                                if (!a) {
                                    return
                                }
                                TDS.window.setWindow({
                                    title: "Edit operator details",
                                    interfaceURI: "cruise/offering/operator.js",
                                    sourceDataURI: a,
                                    destinationDataURI: a,
                                    buttonOK: "Submit",
                                    callback: {
                                        fn: function() {
                                            var c = this.ownerCt.findParentByType("ajaxpanel");
                                            c.reloadData()
                                        },
                                        scope: this
                                    }
                                })
                            }
                        }],
                        items: [{
                            xtype: "label",
                            name: "contactName",
                            fieldLabel: "Name"
                        }, {
                            xtype: "label",
                            name: "addressString",
                            fieldLabel: "Address",
                            autoWidth: true
                        }, {
                            xtype: "label",
                            name: "primaryHref",
                            fieldLabel: "Website"
                        }, {
                            xtype: "label",
                            name: "phoneNumber",
                            fieldLabel: "Telephone"
                        }, {
                            xtype: "label",
                            name: "email",
                            fieldLabel: "Email"
                        }]
                    }
                }, {
                    columnWidth: 0.5
                }]
            }]
        }, {
            xtype: "ajaxpanel",
            interfaceURI: "cruise/offering/view-rate.js"
        }, {
            xtype: "ajaxpanel",
            interfaceURI: "cruise/offering/view-extra.js"
        }, {
            xtype: "ajaxpanel",
            interfaceURI: "cruise/offering/view-availability.js"
        }, {
            xtype: "ajaxpanel",
            interfaceURI: "widgets/view-history.js"
        }, {
            xtype: "ajaxpanel",
            excludeFromSession: true,
            searchURI: "",
            interfaceURI: "cruise/offering/view-cabins.js"
        }]
    }]
}























































