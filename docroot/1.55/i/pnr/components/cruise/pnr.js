{
    xtype: "panel",
    layout: Ext.isIE ? "fit" : "",
    autoScroll: true,
    bodyStyle: "padding: 8px;",
    requireStores: [{
        dataURI: TDS.env.dataPath + "transfer/modetypes/collection",
        identifier: "transfer/modetypes",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "accommodation/ratings/collection",
        identifier: "accommodation/ratings",
        fields: ["name", "dataURI"]
    }, {
        dataURI: TDS.env.dataPath + "accommodation/propertyclasstypes/collection",
        identifier: "accommodation/propertyclasstypes",
        fields: ["name", "displayName", "dataURI"]
    }],
    items: {
        xtype: "awesomegrid",
        enableRowExpander: true,
        pinnable: true,
        tbar: ["Supplier Name: ", {
            xtype: "textfield",
            name: "supplierNameLike",
            enableKeyEvents: true,
            width: 120
        }, " ", "Departure Date: ", {
            xtype: "datefield",
            name: "departuresDate",
            fieldLabel: "Date",
            showToday: false,
            width: 80,
            enableKeyEvents: true,
            excludeFromSession: true,
            format: "dMy",
            minValue: "01/01/06",
            listeners: {
                extraselect: function() {
                    var a = this;
                    setTimeout(function() {
                        var c = a.ownerCt.findParentByType("ajaxpanel");
                        if (!c) {
                            return
                        }
                        var b = {};
                        b.departuresDate = a.getValue();
                        Ext.Ajax.request({
                            url: TDS.env.dataPath + c.baseDataURI + "/updatedepDate",
                            method: "POST",
                            jsonData: b,
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            scope: a,
                            callback: function(j, f, g) {;
                                if (f) {
                                    try {
                                        var i = Ext.decode(g.responseText)
                                    } catch (h) {}
                                    if (i) {}
                                }
                            }
                        })
                    }, 50)
                },
                render: function() {
                    var a = this;
                    setTimeout(function() {
                        var b = a.ownerCt.findParentByType("ajaxpanel");
                        if (!b) {
                            return
                        }
                        Ext.Ajax.request({
                            url: TDS.env.dataPath + b.baseDataURI,
                            method: "GET",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            scope: a,
                            callback: function(i, c, f) {;
                                if (c) {
                                    try {
                                        var h = Ext.decode(f.responseText)
                                    } catch (g) {}
                                    if (h) {
                                        a.setRawValue(TDS.util.Format.dateSpecial(h.departuresDate, TDS.env.dateFormatDisplay))
                                    }
                                }
                            }
                        })
                    }, 50)
                }
            }
        }, " ", " ", " ", "-", {
            xtype: "button",
            disabled: true,
            hidden: true,
            text: "Agent Info",
            handler: function() {
                var a = this.ownerCt.findParentByType("pnrpanel");
                if (!a) {
                    return
                }
                TDS.window.setWindow({
                    title: "Agent Details",
                    sourceDataURI: a.getAgencyExternalURI(),
                    interfaceURI: "agency/externalAgents/displayInfo.js",
                    data: {
                        consultant: a.getConsultantName()
                    },
                    buttonOK: false
                })
            },
            listeners: {
                render: function() {
                    if (TDS.env.user.isArenaOne()) {
                        this.show()
                    }
                }
            }
        }, {
            xtype: "button",
            text: "Assign External Agency",
            disabled: true,
            hidden: true,
            handler: function() {
                var b = this.ownerCt.findParentByType("pnrpanel");
                if (!b) {
                    return
                }
                var a = this.ownerCt.findParentByType("ajaxpanel");
                if (!a) {
                    return
                }
                TDS.window.setWindow({
                    title: "Select Agency",
                    information: "Search and select the agency against this PNR",
                    interfaceURI: "home/externalAgency/selectExternalAgency.js",
                    destinationDataURI: a.baseDataURI,
                    buttonOK: "Submit",
                    callback: {
                        fn: function(c) {
                            if (c) {
                                b.ownerCt.refreshPnr()
                            }
                        },
                        scope: b
                    }
                })
            },
            listeners: {
                render: function() {
                    if (TDS.env.user.isArenaOne()) {
                        this.show()
                    }
                }
            }
        }, "->", {
            xtype: "redbutton",
            text: "Add Component",
            cls: "x-button-orange",
            overCls: "x-button-orange-over",
            handler: function() {
                var a = this.ownerCt.ownerCt.ownerCt.findParentByType("pnrpanel");
                a.focusView("searchView", "tours")
            }
        }, {
            xtype: "hidden",
            id: "has_quotes_id",
            value: false
        }, " ", {
            xtype: "redbutton",
            cls: "x-button-brown",
            overCls: "x-button-brown-over",
            text: "Manual Quote and Entry",
            handler: function() {;
                var d = this.ownerCt.findParentByType("ajaxpanel");
                var g = d.ownerCt.ownerCt.ownerCt.ownerCt.title;
                var c = d.ownerCt.ownerCt.ownerCt.dataObj.fixedCurrency;
                var b = this.ownerCt.ownerCt;
                if (!d) {
                    return
                }
                var a = "";
                var e = true;

                function f(i, h) {
                    TDS.window.setWindow({
                        title: '<table border=0 width=100%> <tr> <td width=120px>Manual Quote & Entry</td> <td align=right><b><font size="2">' + g + "</font></b></td> </tr> </table>",
                        information: "Please enter your required details.",
                        interfaceURI: "pnr/components/manualQuote/createMQInfo.js",
                        postDataURI: d.baseDataURI + "/manualQuoteComponents/setWindowParam",
                        buttonOK: "Submit",
                        data: {
                            type: i,
                            MQSelected: h,
                            pnrDataURI: d.baseDataURI,
                            fixedCurrency: c
                        },
                        callback: {
                            fn: function(k, j, l, m) {
                                if (k) {
                                    setTimeout(function() {
                                        e = l.MQ;
                                        a = l.type;
                                        var n = TDS.util.firstWordCapital(a + " Manual Quote & Entry");
                                        if (a == TDS.data.componentType.TYPE_TOUR) {
                                            n = TDS.util.firstWordCapital("PACKAGE TOUR Manual Quote & Entry")
                                        } else {
                                            if (a == TDS.data.componentType.TYPE_CAR) {
                                                n = TDS.util.firstWordCapital("CAR RENTAL Manual Quote & Entry")
                                            } else {
                                                if (a == TDS.data.componentType.TYPE_CRUISE) {
                                                    n = TDS.util.firstWordCapital("CRUISES Manual Quote & Entry")
                                                } else {
                                                    if (a == TDS.data.componentType.TYPE_ATTRACTION) {
                                                        n = TDS.util.firstWordCapital("SERVICES Manual Quote & Entry")
                                                    }
                                                }
                                            }
                                        }
                                        if (!e) {
                                            if (a == TDS.data.componentType.TYPE_ACCOMMODATION || a == TDS.data.componentType.TYPE_TOUR || a == TDS.data.componentType.TYPE_SIGHTSEEING || a == TDS.data.componentType.TYPE_TRANSFER || a == TDS.data.componentType.TYPE_ATTRACTION || a == TDS.data.componentType.TYPE_CRUISE || a == TDS.data.componentType.TYPE_CAR || a == TDS.data.componentType.TYPE_RAIL || a == TDS.data.componentType.TYPE_AIR) {
                                                TDS.window.setWindow({
                                                    title: "<table width=100% border=0> <tr> <td width=240px>" + n + '</td> <td align=right><font size="2"  ><b>' + g + "</b></font></td> </tr> </table>",
                                                    information: "Please enter your required details.",
                                                    interfaceURI: "pnr/components/manual/" + a.toLowerCase() + ".js",
                                                    postDataURI: d.baseDataURI + "/manualComponents/entry",
                                                    buttonOK: "Save",
                                                    disableSubmit: true,
                                                    disableClose: true,
                                                    data: {
                                                        type: a,
                                                        pnrDataURI: d.baseDataURI,
                                                        MQ: true,
                                                        fixedCurrency: c
                                                    },
                                                    callback: {
                                                        fn: function(o) {
                                                            setTimeout(function() {
                                                                f(a, false)
                                                            }, 100);
                                                            if (o) {
                                                                b.submitQuery(true)
                                                            }
                                                        },
                                                        scope: b.ownerCt.ownerCt
                                                    }
                                                });
                                                Ext.getCmp("applicationHeaderRightColumn").items.items[0].hide()
                                            }
                                        } else {
                                            if (a == TDS.data.componentType.TYPE_ACCOMMODATION || a == TDS.data.componentType.TYPE_TOUR || a == TDS.data.componentType.TYPE_SIGHTSEEING || a == TDS.data.componentType.TYPE_TRANSFER || a == TDS.data.componentType.TYPE_ATTRACTION || a == TDS.data.componentType.TYPE_CRUISE || a == TDS.data.componentType.TYPE_CAR || a == TDS.data.componentType.TYPE_RAIL || a == TDS.data.componentType.TYPE_AIR) {
                                                TDS.window.setWindow({
                                                    title: "<table width=100% border=0> <tr> <td width=240px>" + n + '</td> <td align=right><font size="2"  ><b>' + g + "</b></font></td> </tr> </table>",
                                                    information: "Please enter your required details.",
                                                    interfaceURI: "pnr/components/manualQuote/" + a.toLowerCase() + ".js",
                                                    postDataURI: d.baseDataURI + "/manualQuoteComponents",
                                                    buttonOK: "Save",
                                                    disableSubmit: true,
                                                    disableClose: false,
                                                    mQ: true,
                                                    data: {
                                                        type: a,
                                                        pnrDataURI: d.baseDataURI,
                                                        MQ: true
                                                    },
                                                    callback: {
                                                        fn: function(o) {
                                                            setTimeout(function() {
                                                                f(a, true)
                                                            }, 100);
                                                            if (o) {
                                                                b.submitQuery(true)
                                                            }
                                                        },
                                                        scope: b.ownerCt.ownerCt
                                                    }
                                                })
                                            } else {
                                                setTimeout(function() {
                                                    f(a, e);
                                                    setTimeout(function() {
                                                        Ext.Msg.alert("Please make a selection first")
                                                    }, 100)
                                                }, 100)
                                            }
                                        }
                                    }, 100)
                                }
                            },
                            scope: b.ownerCt.ownerCt
                        }
                    })
                }
                f(a, e)
            }
        }, " ", {
            xtype: "redbutton",
            text: "Own Arrangement",
            cls: "x-button-green",
            overCls: "x-button-green-over",
            handler: function() {
                var a = this.ownerCt.findParentByType("ajaxpanel");
                if (!a) {
                    return
                }
                TDS.window.setWindow({
                    title: "Own arrangment",
                    information: "Please enter details of the own arrangment.",
                    interfaceURI: "pnr/components/own/create.js",
                    postDataURI: a.baseDataURI + "/ownComponents",
                    buttonOK: "Submit",
                    callback: {
                        fn: function(b) {
                            if (b) {
                                this.submitQuery(true)
                            }
                        },
                        scope: this.ownerCt.ownerCt
                    }
                })
            }
        }, " ", {
            xtype: "redbutton",
            text: "Summary Prices",
            cls: "x-button-dodgerblue",
            overCls: "x-button-dodgerblue-over",
            handler: function() {
                var b = this.ownerCt.findParentByType("ajaxpanel");
                var c = this.ownerCt.findParentByType("pnrpanel");
                var a = this;
                if (!b) {
                    return
                }
                TDS.window.setWindow({
                    title: "Summary Price Menu",
                    interfaceURI: "pnr/components/generic/summarymenu.js",
                    postDataURI: b.baseDataURI + "/manualQuoteComponents/setWindowParam",
                    callback: {
                        fn: function(e, d, g, h) {
                            var f = b.baseDataURI;
                            f = f.substring(f.lastIndexOf("/") + 1);
                            if (e) {
                                setTimeout(function() {
                                    var i = "QUOTES";
                                    if (g.type == "All Components") {
                                        i = "ALL"
                                    } else {
                                        if (g.type == "Confirmed Components") {
                                            i = "CONFIRMED"
                                        }
                                    }
                                    TDS.window.setWindow({
                                        title: "Price for " + g.type + ".",
                                        data: {
                                            summaryFor: i,
                                            dataURI: b.baseDataURI,
                                            pnrNo: f
                                        },
                                        interfaceURI: "pnr/components/generic/summaryDisplay.js",
                                        buttonOK: "Hold Rates",
                                        callback: {
                                            fn: function(j) {},
                                            scope: a.ownerCt.ownerCt
                                        }
                                    })
                                }, 100)
                            }
                        },
                        scope: a.ownerCt.ownerCt
                    }
                })
            }
        }, " ", {
            xtype: "redbutton",
            disabled: true,
            text: "Send Quote/Booking",
            cls: "x-button-purple",
            overCls: "x-button-purple-over",
            handler: function() {
                var e = this.ownerCt.findParentByType("ajaxpanel");
                if (!e) {
                    return
                }
                var f = "";
                var g = "";
                var j = "";
                var d = "";
                var h = "";
                var a = "";
                var i = "";
                var b = "";
                var c = "";
                Ext.Ajax.request({
                    url: TDS.env.dataPath + e.baseDataURI + "/countQuotes",
                    method: "GET",
                    scope: this,
                    disableCaching: false,
                    callback: function(q, k, m) {;
                        var l = Ext.decode(m.responseText);
                        var p = l[e.baseDataURI + "/countQuotes/count"];
                        if (typeof p.accommodation != "undefined" && p.accommodation > 0) {
                            f = p.accommodation;
                            f = " <tr><td><b>Accommodation</b></td><td><b>" + f + "</b></td></tr>"
                        }
                        if (typeof p.air != "undefined" && p.air > 0) {
                            g = p.air;
                            g = "<tr><td><b>Air</b></td><td><b>" + g + "</b></td></tr>"
                        }
                        if (typeof p.car != "undefined" && p.car > 0) {
                            j = p.car;
                            j = "<tr><td><b>Car</b></td><td><b>" + j + "</b></td></tr>"
                        }
                        if (typeof p.cruise != "undefined" && p.cruise > 0) {
                            d = p.cruise;
                            d = "<tr><td><b>Cruise</b></td><td><b>" + d + "</b></td></tr>"
                        }
                        if (typeof p.daytour != "undefined" && p.daytour > 0) {
                            h = p.daytour;
                            h = "<tr><td><b>Daytour</b></td><td><b>" + h + "</b></td></tr>"
                        }
                        if (typeof p.rail != "undefined" && p.rail > 0) {
                            a = p.rail;
                            a = "<tr><td><b>Rail</b></td><td><b>" + a + "</b></td></tr>"
                        }
                        if (typeof p.services != "undefined" && p.services > 0) {
                            i = p.services;
                            i = "<tr><td><b>Services</b></td><td><b>" + i + "</b></td></tr>"
                        }
                        if (typeof p.tour != "undefined" && p.tour > 0) {
                            b = p.tour;
                            b = "<tr><td><b>Package Tour</b></td><td><b>" + b + "</b></td></tr>"
                        }
                        if (typeof p.transfer != "undefined" && p.transfer > 0) {
                            c = p.transfer;
                            c = "<tr><td><b>Transfer</b></td><td>" + c + "</td></tr>"
                        }
                        var n = ' <table style="width:120px"><b>' + f + g + j + d + h + a + i + b + c + "</b></table>";
                        TDS.window.setWindow({
                            title: "",
                            message: '<font size="2" ><b><u> Send Components via the Queues to Suppliers.</u><br><br> ' + n + '<br><center><font size="4" >Are you sure?</font></center> </b></font>',
                            destinationDataURI: e.baseDataURI + "/sendMQMsgTosupplier",
                            buttonOK: "Send",
                            callback: {
                                fn: function(o) {
                                    if (o) {
                                        this.submitQuery(true)
                                    }
                                },
                                scope: this.ownerCt.ownerCt
                            }
                        })
                    }
                })
            }
        }, " ", {
            xtype: "redbutton",
            disabled: true,
            text: "Book All Quotes",
            cls: "x-button-olive",
            overCls: "x-button-olive-over",
            handler: function() {
                var a = this.ownerCt.findParentByType("ajaxpanel");
                if (!a) {
                    return
                }
                TDS.window.setWindow({
                    title: "Book All Quotes",
                    message: "Are you sure you want to Book all Quotes ?",
                    destinationDataURI: a.baseDataURI + "/bookAllQuotes",
                    buttonOK: "Submit",
                    callback: {
                        fn: function(b) {
                            if (b) {
                                this.submitQuery(true)
                            }
                        },
                        scope: this.ownerCt.ownerCt
                    }
                })
            }
        }, " ", {
            xtype: "redbutton",
            text: "Flight Details",
            cls: "x-button-teal",
            overCls: "x-button-teal-over",
            handler: function() {
                var a = this.ownerCt.findParentByType("ajaxpanel");
                if (!a) {
                    return
                }
                TDS.window.setWindow({
                    title: "Flight Details",
                    interfaceURI: "pnr/components/air/flightDetail.js",
                    postDataURI: a.baseDataURI + "/ownComponents",
                    dataURI: a.baseDataURI,
                    buttonOK: "Submit",
                    callback: {
                        fn: function(b) {
                            if (b) {
                                this.submitQuery(true)
                            }
                        },
                        scope: this
                    }
                })
            }
        }, " ", {
            xtype: "redbutton",
            text: "Help",
            cls: "x-button-blue",
            overCls: "x-button-blue-over",
            opened: false,
            toggle: false,
            handler: function() {
                TDS.needHelp("Search View Help", "24");
                if (!this.opened) {
                    this.opened = true;
                    TDS.needHelp("Search View Help", "24")
                } else {
                    this.opened = false;
                    TDS.helpwindow.hide()
                }
            }
        }],
        store: new Ext.data.JsonStore({
            id: "dataURI",
            fields: ["dataURI", "voucher", "displayMarkup", "displayTotalPrice", "paybyDate", "offeringURI", "ownArrangementPending", "passengersTotal", "timeHeldUntil", "description", "type", "supplierURI", "name", "dateFrom", "depositDescription", "dateTo", "pax", "status", "createdDate", "createdByLogin", "createdByUserFullNameString", "updatedDate", "updatedByLogin", "updatedByUserFullNameString", "supplierName", "locationToString", "locationFromString", "airportToString", "airportFromString", "bookingReferenceNumber", "pricingPriceCurrency", "pricingPriceSell", "pricingPriceIsNett", "pricingPriceCommission", "duration", "airSupplierName", "tempBookedDate", "entryType", "parameters", "supplierParameters", "pricingPriceBaseSell", "pricingPriceBaseCurrency", "manualQuoteCanBeConfirmed", "durationNights", "locationToURI", "durationDays", "extraNotes", "startTime", "finishTime", "noOfAdults", "noOfChildren", "noOfInfants", "extrasAmount", "priceCommission$", "taxIncluded", "readyToSendMsg", "quoteReferenceNumber", "externalPNRCode", "pnrMobile", "cruisePackage", "packagePrice"],
            sortInfo: {
                field: "dateFrom",
                direction: "ASC"
            }
        }),
        sm: new Ext.grid.RowSelectionModel(),
        cm: new Ext.grid.ColumnModel([{
            header: "Type",
            dataIndex: "type",
            width: 100,
            fixed: true,
            renderer: function(c, b, a) {
                if (c === TDS.data.componentType.TYPE_OWN) {
                    return "OA"
                } else {
                    if (c === TDS.data.componentType.TYPE_MANUAL) {
                        return "Manual entry"
                    } else {
                        if (c === TDS.data.componentType.TYPE_SIGHTSEEING) {
                            return "Day Tours"
                        } else {
                            if (c === TDS.data.componentType.TYPE_ATTRACTION && a.get("status")) {
                                return "Services"
                            }
                        }
                    }
                }
                return c.substring(0, 1).toUpperCase() + c.substring(1).toLowerCase()
            }
        }, {
            header: "Supplier",
            dataIndex: "supplierName"
        }, {
            header: "Airline",
            width: 150,
            dataIndex: "airSupplierName",
            sortable: true
        }, {
            header: "Component/Flt No",
            width: 150,
            dataIndex: "name"
        }, {
            header: "Package Component",
            dataIndex: "cruisePackage",
            renderer: function(c, b, a) {
                if (a.get("cruisePackage")) {
                    return '<p  style="font-weight:bold;"> CC </p>'
                }
            }
        }, {
            header: "From/In",
            dataIndex: "locationFromString",
            renderer: function(c, b, a) {
                if (a.get("type") === TDS.data.componentType.TYPE_AIR) {
                    return "<b>" + a.json.airportFromIataString + "</b> (" + a.get("airportFromString") + ")"
                }
                return c
            }
        }, {
            header: "Date",
            dataIndex: "dateFrom",
            sortable: true,
            width: 60,
            fixed: true,
            renderer: function(c, b, a) {
                var d = TDS.util.Format.dateSpecial(a.get("dateFrom"), TDS.env.dateFormatDisplay);
                return d
            }
        }, {
            header: "To/Out",
            dataIndex: "locationToString",
            renderer: function(c, b, a) {
                if (a.get("type") === TDS.data.componentType.TYPE_AIR) {
                    return "<b>" + a.json.airportToIataString + "</b> (" + a.get("airportToString") + ")"
                }
                return c
            }
        }, {
            header: "Date",
            dataIndex: "dateTo",
            sortable: true,
            width: 60,
            fixed: true,
            renderer: function(c, b, a) {
                var d = TDS.util.Format.dateSpecial(a.get("dateTo"), TDS.env.dateFormatDisplay);
                return d
            }
        }, {
            header: "Duration",
            dataIndex: "duration"
        }, {
            header: "Pax",
            dataIndex: "passengersTotal",
            width: 40
        }, {
            header: "Status",
            dataIndex: "status",
            width: 100,
            renderer: function(c, b, a) {
                var d = a.get("entryType");
                if (c == "Quote" && d != "Manual Quote") {
                    Ext.getCmp("has_quotes_id").setValue(true)
                }
                if (d == "Manual Quote" && c == "Quote") {
                    c += " (M)"
                } else {
                    if (d == "OA") {
                        c = "OA"
                    }
                }
                return c
            }
        }, {
            header: "Total",
            dataIndex: "displayTotalPrice",
            width: 100,
            fixed: true,
            renderer: function(d, c, b) {
                var a = b.get("status");
                if (a == "Confirmed") {
                    return "<b>" + TDS.util.Price.formatPrice(d, b.get("pricingPriceCurrency")) + "</b>"
                } else {
                    if (a == "Cancelled") {
                        return ""
                    } else {
                        return '<b><font color="#cc0000">' + TDS.util.Price.formatPrice(d, b.get("pricingPriceCurrency")) + "</font></b>"
                    }
                }
            }
        }]),
        viewConfig: {
            forceFit: true
        },
        listeners: {
            sessioninit: function() {
                var a = this.ownerCt.findParentByType("ajaxpanel");
                if (!a) {
                    return
                }
                this.searchURI = TDS.env.dataPath + a.baseDataURI + "/components";
                this.overrideCollectionIdentifier = a.baseDataURI + "/components"
            },
            render: function() {;
                var e = this.ownerCt.findParentByType("pnrpanel");
                var f = e.getView();
                if (f.name == "bookingSummary") {
                    this.topToolbar.items.itemAt(11).hide(true)
                }
                var b = e.getAgencyExternalNameString();
                if (b != "" && b != null) {
                    this.topToolbar.items.itemAt(9).enable(true)
                } else {
                    this.topToolbar.items.itemAt(10).enable(true)
                }
                var d = e.getSession("focusRecord");
                if (typeof d != "undefined") {
                    this.focusResult(d, false, true);
                    TDS.session.setByPath(e.getDataURI(), {
                        focusRecord: ""
                    })
                }
                this.getStore().on("load", this.onStoreLoad, this)
            },
            cellclick: function(b, f, c, d) {
                var a = b.getStore().getAt(f);
                manual = a.get("entryType")
            }
        },
        onStoreLoad: function() {;
            var e = this.topToolbar.items.itemAt(13).getValue();
            if (e == "true") {
                this.topToolbar.items.itemAt(14).enable(true)
            } else {
                this.topToolbar.items.itemAt(14).disable(true)
            }
            this.topToolbar.items.itemAt(13).setValue(false);
            var h = this.ownerCt.findParentByType("pnrpanel");
            var a = h.getViewByName("financial");
            if (a) {
                var c = a.findByType("awesomegrid")[0];
                c.submitQuery(true)
            }
            var d = this.getStore().data.items.length;
            this.topToolbar.items.itemAt(21).disable(true);
            var j = this.getStore().data.items;
            for (var b = 0; b < d; b++) {
                var f = j[b].data.readyToSendMsg;
                if (f) {
                    this.topToolbar.items.itemAt(21).enable(true);
                    break
                }
            }
        },
        getRowInterface: function(a) {
            var b = a.get("type");
            var d = a.get("status");
            var c = a.get("entryType");
            if (b === TDS.data.componentType.TYPE_OWN) {
                return "pnr/components/own/layout.js"
            } else {
                if (c == "Manual") {
                    return "pnr/components/manual/layout.js"
                } else {
                    if (c == "Manual Quote") {
                        TDS.data.currentPNRComponentType = b;
                        return "pnr/components/manualQuote/layout.js"
                    } else {
                        if (d === TDS.data.componentStatus.STATUS_QUOTE) {
                            return "pnr/components/quote/layout.js"
                        } else {
                            if (b === TDS.data.componentType.TYPE_ACCOMMODATION) {
                                return "pnr/components/accommodation/layout.js"
                            } else {
                                if (b === TDS.data.componentType.TYPE_TOUR) {
                                    return "pnr/components/tour/layout.js"
                                } else {
                                    if (b === TDS.data.componentType.TYPE_CRUISE) {
                                        return "pnr/components/cruise/layout.js"
                                    } else {
                                        if (b === TDS.data.componentType.TYPE_HOSTEL) {
                                            return "pnr/components/hostel/layout.js"
                                        } else {
                                            if (b === TDS.data.componentType.TYPE_CAR) {
                                                return "pnr/components/car/layout.js"
                                            } else {
                                                if (b === TDS.data.componentType.TYPE_TRANSFER) {
                                                    return "pnr/components/transfer/layout.js"
                                                } else {
                                                    if (b === TDS.data.componentType.TYPE_AIR) {
                                                        return "pnr/components/air/layout.js"
                                                    } else {
                                                        if (b === TDS.data.componentType.TYPE_RAIL) {
                                                            return "pnr/components/rail/layout.js"
                                                        } else {
                                                            if (b === TDS.data.componentType.TYPE_RAIL_PASS) {
                                                                return "pnr/components/railPass/layout.js"
                                                            } else {
                                                                if (b === TDS.data.componentType.TYPE_ATTRACTION) {
                                                                    return "pnr/components/attraction/layout.js"
                                                                } else {
                                                                    if (b === TDS.data.componentType.TYPE_SIGHTSEEING) {
                                                                        return "pnr/components/sightseeing/layout.js"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "pnr/components/generic/placeholder.js"
        }
    }
}















