{
    height: 525,
    width: 975,
    closable: true,
    resizable: false,
    border: false,
    xtype: "form",
    modal: true,
    config: {},
    id: "form",
    beforeSubmit: function(e) {
        var d = [];
        var c = [];
        var a = [];
        Ext.getCmp("review").getStore().each(function(f) {
            if (!Array.isArray(f.data.paxDetails)) {
                Ext.Msg.alert("Alert", "Please Select a Passenger");
                return false
            }
            a.push(f.data)
        });
        var b = [];
        var g = this.findParentByType("awesomewindow");
        Ext.getCmp("review").getStore().each(function(h) {
            c.push(h.data.dataURI);
            var f = {};
            f.rateURI = h.data.dataURI;
            f.noOfPass = h.data.totalPax;
            f.paxDetails = h.data.paxDetails;
            b.push(f)
        });
        var g = this.findParentByType("awesomewindow");
        var e = {
            submitDataAsParams: true,
            paramData: {
                action: "request",
                currency: "AUD",
                componentFrom: "CRUISE"
            },
            data: {
                rateURI: c[0],
                rateMultipleSelectedRateURI: c,
                offeringURI: g.getData("offeringURI"),
                inventoryAmount: 1,
                dateFrom: g.getData("dateFrom"),
                duration: 1,
                timeheldDate: g.getData("dateFrom"),
                bookedData: a,
                bookedDate: g.getData("dateFrom"),
                cruisePackagePrice: g.getData("cruisePackagePrice"),
                isCruisePackage: g.getData("isCruisePackage"),
                adjustmentMarkup: g.getData("adjustmentMarkup")
            }
        };
        return e
    },
    listeners: {
        render: function() {}
    },
    items: [{
        xtype: "tabpanel",
        activeTab: 0,
        layoutOnTabChange: true,
        height: 520,
        defaults: {},
        items: [{
            title: "Review",
            autoScroll: true,
            width: 950,
            height: 500,
            items: [{
                xtype: "panel",
                height: 490,
                border: true,
                defaults: {
                    border: false
                },
                items: [{
                    xtype: "panel",
                    height: 150,
                    width: 950,
                    frame: true,
                    style: "padding-top:5px;padding-left:10px;",
                    border: true,
                    items: [{
                        xtype: "grid",
                        id: "review",
                        height: 150,
                        enableColumnHide: false,
                        enableColumnMove: false,
                        enableColumnResize: false,
                        enableHdMenu: false,
                        tbar: [{
                            xtype: "textfield",
                            name: "cabinNumber",
                            hidden: true,
                            excludeFromSession: true,
                            enableKeyEvents: true,
                            width: 150
                        }],
                        viewConfig: {
                            forceFit: true
                        },
                        store: new Ext.data.JsonStore({
                            id: "dataURIs",
                            fields: ["pricingPriceSell", "name", "catName", "deck", "position", "capacity", "berths", "rollaway", "cabinStatus", "room", "adult", "access", "child", "infant", "cons", "priceDouble", "priceSingle", "priceTriple", "priceQuad", "dataURI", "price", "totalPax", "deal", "adultAges", "infantAges", "childAges", "accessAges", "consAges", "paxDetails", "packageDetails", "isPackage", "status"]
                        }),
                        sm: new Ext.grid.CheckboxSelectionModel({
                            singleSelect: true
                        }),
                        columns: [new Ext.grid.CheckboxSelectionModel({
                            singleSelect: true
                        }), {
                            header: "Stateroom",
                            dataIndex: "room",
                            sortable: true
                        }, {
                            header: "Category",
                            dataIndex: "name",
                            sortable: true,
                            renderer: function(e, d, a, f, c, b) {
                                return e.substring(e.indexOf("-") + 1, e.length).trim()
                            }
                        }, {
                            header: "Type",
                            dataIndex: "type",
                            sortable: true
                        }, {
                            header: "Pax",
                            dataIndex: "totalPax",
                            sortable: true
                        }, {
                            header: "STR No.",
                            dataIndex: "strNo",
                            sortable: true
                        }, {
                            header: "Decks",
                            dataIndex: "deck",
                            sortable: true
                        }, {
                            header: "Position",
                            dataIndex: "position",
                            sortable: true
                        }, {
                            header: "Deal",
                            dataIndex: "deal",
                            sortable: true
                        }, {
                            header: "Price",
                            dataIndex: "price",
                            sortable: true,
                            renderer: function(e, d, a, f, c, b) {
                                return e
                            }
                        }, {
                            header: "Status",
                            dataIndex: "status",
                            sortable: true
                        }],
                        listeners: {
                            render: function() {
                                var a = this.findParentByType("awesomewindow").getData("stateRoomStore");
                                var d = this.findParentByType("awesomewindow").getData("bookQuote");
                                var c = this.findParentByType("awesomewindow").getData("totalExtra");
                                var totalCruisePrice = this.findParentByType("awesomewindow").getData("totalCruisePrice");
                                console.log(totalCruisePrice);
                                
                                var b = [];
                                a.each(function(e) {
                                    if (d) {} else {
                                        e.data.status = "QT"
                                    }
                                    // e.data.price = (parseFloat(e.data.price) + (c * e.data.totalPax)).toFixed(2);
                                     e.data.price = (totalCruisePrice);
                                    b.push(e.data)
                                });
                                this.getStore().loadData(b)
                            },
                            rowclick: function(n, m, h) {
                                var b = this.getSelectionModel().getSelections()[0];
                                var l = 0;
                                if (typeof(b) == "undefined") {
                                    return false
                                } else {
                                    l = b.data.totalPax
                                }
                                var h = this.findParentByType("tabpanel").findByType("grid")[1];
                                var g = h.getStore();
                                var a = b.data.paxDetails;
                                var k = h.getSelectionModel().getSelections();
                                g.removeAll();
                                if (a == "") {
                                    for (var d = 0; d < l; d++) {
                                        for (var c = 0; c < b.data.adult; c++) {
                                            if (b.data.adult > 0) {
                                                g.add([new g.recordType({
                                                    type: "AD",
                                                    nameFirst: "",
                                                    nameLast: "",
                                                    paxAge: b.data.adultAges[c],
                                                    salutation: ""
                                                })]);
                                                l = l - 1
                                            }
                                        }
                                        for (var c = 0; c < b.data.child; c++) {
                                            if (b.data.child > 0) {
                                                g.add([new g.recordType({
                                                    type: "CH",
                                                    nameFirst: "",
                                                    nameLast: "",
                                                    paxAge: b.data.childAges[c],
                                                    salutation: ""
                                                })]);
                                                l = l - 1
                                            }
                                        }
                                        for (var c = 0; c < b.data.infant; c++) {
                                            if (b.data.infant > 0) {
                                                g.add([new g.recordType({
                                                    type: "IN",
                                                    nameFirst: "",
                                                    nameLast: "",
                                                    paxAge: b.data.infantAges[c],
                                                    salutation: ""
                                                })]);
                                                l = l - 1
                                            }
                                        }
                                        for (var c = 0; c < b.data.cons; c++) {
                                            if (b.data.cons > 0) {
                                                g.add([new g.recordType({
                                                    type: "CN",
                                                    nameFirst: "",
                                                    nameLast: "",
                                                    paxAge: b.data.consAges[c],
                                                    salutation: ""
                                                })]);
                                                l = l - 1
                                            }
                                        }
                                        for (var c = 0; c < b.data.access; c++) {
                                            if (b.data.cons > 0) {
                                                g.add([new g.recordType({
                                                    type: "ACC",
                                                    nameFirst: "",
                                                    nameLast: "",
                                                    paxAge: b.data.accessAges[c],
                                                    salutation: ""
                                                })]);
                                                l = l - 1
                                            }
                                        }
                                    }
                                } else {
                                    for (var d = 0; d < a.length; d++) {
                                        g.add([new g.recordType({
                                            type: a[d].type,
                                            nameFirst: a[d].nameFirst,
                                            nameLast: a[d].nameLast,
                                            paxAge: a[d].paxAge,
                                            salutation: a[d].salutation,
                                            dateOfBirth: a[d].dateOfBirth
                                        })]);
                                        l = l - 1
                                    }
                                }
                                this.findParentByType("tabpanel").findByType("grid")[1].getBottomToolbar().items.itemAt(2).enable()
                            }
                        }
                    }]
                }, {
                    xtype: "panel",
                    height: 170,
                    width: 950,
                    frame: true,
                    style: "padding-top:5px;padding-left:10px;",
                    border: true,
                    items: [{
                        xtype: "panel",
                        border: false,
                        layout: "fit",
                        items: [{
                            xtype: "editorgrid",
                            id: "passengerGrids",
                            height: 150,
                            clicksToEdit: 1,
                            store: new Ext.data.JsonStore({
                                url: "",
                                identifier: "",
                                fields: ["type", "code", "nameFirst", "nameLast", "salutation", "displayName", "dateOfBirth", "paxAge", "dataURI"]
                            }),
                            viewConfig: {
                                forceFit: true
                            },
                            getData: function() {
                                var a = this.selModel.getSelections();
                                var b = [];
                                for (var c = 0; c < a.length; c++) {
                                    b[c] = a[c].get("dataURI")
                                }
                                return b
                            },
                            preselect: function(b, a) {
                                var c = [];
                                this.getStore().each(function(d) {
                                    if (c.length >= a) {
                                        return false
                                    }
                                    if ((!b || d.get("type") == b) && d.get("nameFirst") && d.get("nameLast")) {
                                        c[c.length] = d
                                    }
                                }, this);
                                if (c.length > 0) {
                                    this.getSelectionModel().selectRecords(c)
                                }
                                return c.length
                            },
                            validatePassenger: function(d, a, c, b) {
                                if (!b.get("nameFirst") && !b.get("nameLast")) {
                                    return false
                                }
                            },
                            sm: new Ext.grid.CheckboxSelectionModel(),
                            columns: [new Ext.grid.CheckboxSelectionModel(), {
                                header: "Last name",
                                dataIndex: "nameLast",
                                editor: new Ext.form.TextField({
                                    allowBlank: false
                                }),
                                renderer: function(e, b, a, d, f, c) {
                                    return e.substr(0, 1).toUpperCase() + e.substr(1)
                                }
                            }, {
                                header: "First name",
                                dataIndex: "nameFirst",
                                editor: new Ext.form.TextField({
                                    allowBlank: false,
                                    fieldStyle: "text-transform:uppercase"
                                }),
                                renderer: function(a, c, b) {
                                    return a.substr(0, 1).toUpperCase() + a.substr(1)
                                }
                            }, {
                                header: "Title",
                                dataIndex: "salutation",
                                width: 50,
                                fixed: true,
                                editor: new Ext.form.ComboBox({
                                    store: TDS.data.salutations,
                                    editable: false,
                                    forceSelection: true,
                                    mode: "local",
                                    triggerAction: "all",
                                    displayField: "text",
                                    valueField: "text"
                                })
                            }, {
                                header: "Type",
                                dataIndex: "type",
                                width: 60,
                                fixed: true,
                                editor: new Ext.form.ComboBox({
                                    editable: false,
                                    forceSelection: true,
                                    mode: "local",
                                    displayField: "text",
                                    valueField: "text",
                                    triggerAction: "all",
                                    tpl: '<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',
                                    store: TDS.data.passengerType
                                })
                            }, {
                                header: "DOB",
                                dataIndex: "dateOfBirth",
                                width: 100,
                                fixed: true,
                                editor: new Ext.form.DateField({
                                    allowBlank: false
                                }),
                                renderer: function(a, d, c) {
                                    if (typeof a != "undefined") {
                                        if (typeof a != "string") {
                                            var b = new Date();
                                            b.setTime(Ext.TimerMgr.getServerCalculatedTime());
                                            var e = Math.floor((b.getTime() - a.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                                            c.set("paxAge", ((e && e > 0) ? e : ""));
                                            return Ext.util.Format.date(a, TDS.env.dateBirthdayFormatDisplay)
                                        } else {
                                            if (c.get("paxAge")) {
                                                var e = TDS.util.Format.age(a);
                                                c.set("paxAge", ((e && e > 0) ? e : ""))
                                            }
                                            return TDS.util.Format.dateSpecial(a, TDS.env.dateBirthdayFormatDisplay)
                                        }
                                    }
                                    return TDS.util.Format.dateSpecial(a, TDS.env.dateBirthdayFormatDisplay)
                                }
                            }, {
                                header: "Age",
                                dataIndex: "paxAge",
                                renderer: function(b, a, c) {
                                    if (b) {
                                        return b
                                    } else {
                                        return TDS.util.Format.age(c.get("dateOfBirth"))
                                    }
                                },
                                editor: new Ext.form.TextField({
                                    allowBlank: false
                                })
                            }],
                            bbar: [{
                                xtype: "button",
                                text: "Edit",
                                id: "add",
                                handler: function() {
                                    var b = this.findParentByType("editorgrid");
                                    var a = b.getStore();
                                    a.each(function(d, c) {
                                        if (!d.dirty) {
                                            b.startEditing(c, 1);
                                            b.getSelectionModel().selectRow(c);
                                            return false
                                        }
                                    })
                                }
                            }, {
                                xtype: "button",
                                text: "Additional Info",
                                handler: function(i) {
                                    var c = this.ownerCt.findParentByType("awesomewindow");
                                    var h = this.ownerCt.ownerCt;
                                    var b = h.getStore().getAt(h.newRecordIndex);
                                    var a = "";
                                    var f = this.ownerCt.ownerCt.getSelectionModel().selections;
                                    if (f.length == 1) {
                                        a = f.items[0].get("dataURI")
                                    }
                                    var d = this.ownerCt.findParentByType("form");
                                    TDS.innerWindow.setWindow({
                                        height: 300,
                                        width: 200,
                                        autoDestroy: false,
                                        title: "Passenger Profile",
                                        interfaceURI: "pnr/passenger/passengerDetails.js",
                                        sourceDataURI: a,
                                        destinationDataURI: a,
                                        closeAction: "hide",
                                        buttonOK: "Submit",
                                        callback: {
                                            fn: function(g, j, e) {},
                                            scope: this
                                        }
                                    })
                                }
                            }, {
                                xtype: "button",
                                text: "Linked with Stateroom",
                                disabled: true,
                                id: "linked",
                                handler: function() {
                                    var d = Ext.getCmp("review").getSelectionModel().getSelections()[0];
                                    var l = d.data.totalPax;
                                    var b = Ext.getCmp("review").getSelectionModel().getSelections();
                                    var m = Ext.getCmp("review").getStore().indexOf(b[0]);
                                    var a = this.findParentByType("awesomewindow").getData("accStore");
                                    var q = this.findParentByType("awesomewindow").getData("transferStore");
                                    var h = this.findParentByType("awesomewindow").getData("dayTourstore");
                                    var g = Ext.getCmp("passengerGrids").getSelectionModel().getSelections();
                                    var j = [];
                                    this.ownerCt.ownerCt.getStore().each(function(r) {
                                        j.push(r.data)
                                    });
                                    Ext.getCmp("review").getStore().getAt(m).set("paxDetails", (j));
                                    this.ownerCt.ownerCt.getStore().removeAll();
                                    var f = d.data.deal;
                                    var e = f.substr(f.lastIndexOf("#"), f.lastIndexOf("#") - 1);
                                    if (e == "#") {
                                        if (typeof(a) == "undefined" || typeof(q) == "undefined" || typeof(h) == "undefined") {
                                            var i = {};
                                            Ext.getCmp("review").getStore().getAt(m).set("packageDetails", (i))
                                        } else {
                                            var p = {};
                                            var o = [];
                                            if (typeof(a) != "undefined") {
                                                a.each(function(r) {
                                                    o.push(r.data)
                                                });
                                                p.accomodationJson = o
                                            }
                                            var c = [];
                                            if (typeof(q) != "undefined") {
                                                q.each(function(r) {
                                                    c.push(r.data)
                                                });
                                                p.transferJson = c
                                            }
                                            var k = [];
                                            if (typeof(h) != "undefined") {
                                                h.each(function(r) {
                                                    k.push(r.data)
                                                });
                                                p.dayToursJson = k
                                            }
                                            var n = Ext.getCmp("passengerGrids").getData();
                                            Ext.getCmp("review").getStore().getAt(m).set("packageDetails", (p))
                                        }
                                        Ext.getCmp("review").getStore().getAt(m).set("isPackage", true)
                                    } else {;
                                        var i = {};
                                        Ext.getCmp("review").getStore().getAt(m).set("packageDetails", (i));
                                        Ext.getCmp("review").getStore().getAt(m).set("isPackage", false)
                                    }
                                }
                            }, {
                                xtype: "button",
                                text: "Passengers",
                                handler: function() {
                                    var passengerGrid = this.ownerCt.ownerCt;
                                    var awesomewindow = this.ownerCt.findParentByType("awesomewindow");
                                    var win = new Ext.Window({
                                        height: 270,
                                        width: 970,
                                        closable: true,
                                        resizable: false,
                                        border: false,
                                        layout: "fit",
                                        modal: true,
                                        items: [{
                                            title: "Passengers",
                                            items: [{
                                                xtype: "panel",
                                                border: false,
                                                style: "margin-bottom: 6px;",
                                                html: "<p>Please select the passengers for this booking below.</p>",
                                                listeners: {
                                                    beforerender: function() {}
                                                }
                                            }, {
                                                xtype: "panel",
                                                border: false,
                                                layout: "fit",
                                                items: [{
                                                    xtype: "editorgrid",
                                                    height: 210,
                                                    clicksToEdit: 1,
                                                    store: new Ext.data.CollectionStore({
                                                        url: "",
                                                        identifier: "",
                                                        fields: ["type", "code", "nameFirst", "nameLast", "salutation", "displayName", "dateOfBirth", "paxAge", "dataURI"]
                                                    }),
                                                    viewConfig: {
                                                        forceFit: true
                                                    },
                                                    getData: function() {
                                                        var f = this.selModel.getSelections();
                                                        var e = [];
                                                        for (var d = 0; d < f.length; d++) {
                                                            e[d] = f[d].get("dataURI")
                                                        }
                                                        return e
                                                    },
                                                    preselect: function(e, f) {
                                                        var d = [];
                                                        this.getStore().each(function(a) {
                                                            if (d.length >= f) {
                                                                return false
                                                            }
                                                            if ((!e || a.get("type") == e) && a.get("nameFirst") && a.get("nameLast")) {
                                                                d[d.length] = a
                                                            }
                                                        }, this);
                                                        if (d.length > 0) {
                                                            this.getSelectionModel().selectRecords(d)
                                                        }
                                                        return d.length
                                                    },
                                                    validatePassenger: function(e, h, f, g) {
                                                        if (!g.get("nameFirst") && !g.get("nameLast")) {
                                                            return false
                                                        }
                                                    },
                                                    sm: new Ext.grid.CheckboxSelectionModel(),
                                                    columns: [new Ext.grid.CheckboxSelectionModel(), {
                                                        header: "Last name",
                                                        dataIndex: "nameLast",
                                                        editor: new Ext.form.TextField({
                                                            allowBlank: false
                                                        }),
                                                        renderer: function(j, g, h) {
                                                            return j.substr(0, 1).toUpperCase() + j.substr(1)
                                                        }
                                                    }, {
                                                        header: "First name",
                                                        dataIndex: "nameFirst",
                                                        editor: new Ext.form.TextField({
                                                            allowBlank: false,
                                                            fieldStyle: "text-transform:uppercase"
                                                        }),
                                                        renderer: function(j, g, h) {
                                                            return j.substr(0, 1).toUpperCase() + j.substr(1)
                                                        }
                                                    }, {
                                                        header: "Title",
                                                        dataIndex: "salutation",
                                                        width: 40,
                                                        fixed: true,
                                                        editor: new Ext.form.ComboBox({
                                                            store: TDS.data.salutations,
                                                            editable: false,
                                                            forceSelection: true,
                                                            mode: "local",
                                                            triggerAction: "all",
                                                            displayField: "text",
                                                            valueField: "text"
                                                        })
                                                    }, {
                                                        header: "Type",
                                                        dataIndex: "type",
                                                        width: 60,
                                                        fixed: true,
                                                        editor: new Ext.form.ComboBox({
                                                            editable: false,
                                                            forceSelection: true,
                                                            mode: "local",
                                                            displayField: "text",
                                                            valueField: "text",
                                                            triggerAction: "all",
                                                            tpl: '<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',
                                                            store: TDS.data.passengerType
                                                        })
                                                    }, {
                                                        header: "DOB",
                                                        dataIndex: "dateOfBirth",
                                                        width: 70,
                                                        fixed: true,
                                                        editor: new Ext.form.DateField({
                                                            allowBlank: false
                                                        }),
                                                        renderer: function(j, g, h) {
                                                            if (typeof j != "undefined") {
                                                                if (typeof j != "string") {
                                                                    var i = new Date();
                                                                    i.setTime(Ext.TimerMgr.getServerCalculatedTime());
                                                                    var f = Math.floor((i.getTime() - j.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                                                                    h.set("paxAge", ((f && f > 0) ? f : ""));
                                                                    return Ext.util.Format.date(j, TDS.env.dateBirthdayFormatDisplay)
                                                                } else {
                                                                    if (h.get("paxAge")) {
                                                                        var f = TDS.util.Format.age(j);
                                                                        h.set("paxAge", ((f && f > 0) ? f : ""))
                                                                    }
                                                                    return TDS.util.Format.dateSpecial(j, TDS.env.dateBirthdayFormatDisplay)
                                                                }
                                                            }
                                                            return TDS.util.Format.dateSpecial(j, TDS.env.dateBirthdayFormatDisplay)
                                                        }
                                                    }, {
                                                        header: "Age",
                                                        dataIndex: "paxAge",
                                                        renderer: function(e, f, d) {
                                                            if (e) {
                                                                return e
                                                            } else {
                                                                return TDS.util.Format.age(d.get("dateOfBirth"))
                                                            }
                                                        },
                                                        editor: new Ext.form.TextField({
                                                            allowBlank: false
                                                        })
                                                    }],
                                                    bbar: [{
                                                        xtype: "button",
                                                        text: "Select Passenger",
                                                        handler: function(me) {
                                                            var e = this.ownerCt.ownerCt;
                                                            var selection = this.ownerCt.ownerCt.getSelectionModel().selections;
                                                            var passengerSelection = e.getSelectionModel().getSelections();
                                                            var arrayOfPaxRecords = [];
                                                            var flag = false;
                                                            Ext.getCmp("passengerGrids").getStore().each(function(rec) {
                                                                for (var i = 0; i < passengerSelection.length; i++) {
                                                                    var today = new Date();
                                                                    var j = new Date(passengerSelection[i].data.dateOfBirth);
                                                                    today.setTime(Ext.TimerMgr.getServerCalculatedTime());
                                                                    var f = Math.floor((today.getTime() - j.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                                                                    if (rec.data.paxAge == f) {
                                                                        var rowIndex = Ext.getCmp("passengerGrids").getStore().indexOf(rec);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("type", passengerSelection[i].data.type);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("nameFirst", passengerSelection[i].data.nameFirst);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("nameLast", passengerSelection[i].data.nameLast);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("salutation", passengerSelection[i].data.salutation);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("dateOfBirth", passengerSelection[i].data.dateOfBirth);
                                                                        Ext.getCmp("passengerGrids").getStore().getAt(rowIndex).set("dataURI", passengerSelection[i].data.dataURI);
                                                                        flag = true;
                                                                        passengerSelection.splice(i, 1)
                                                                    }
                                                                    if (!flag) {
                                                                        Ext.Msg.alert("Alert", "There is no matching age Passenger");
                                                                        return false
                                                                    }
                                                                }
                                                            });
                                                            this.findParentByType("window").close()
                                                        }
                                                    }],
                                                    listeners: {
                                                        beforeedit: function(b) {},
                                                        render: function() {
                                                            with(this.store) {
                                                                reader.meta.identifier = awesomewindow.getDataURI("pnr") + "/passengers";
                                                                proxy.conn.url = TDS.env.dataPath + awesomewindow.getDataURI("pnr") + "/passengers/concise";
                                                                load()
                                                            }
                                                        }
                                                    }
                                                }]
                                            }]
                                        }]
                                    }).show()
                                }
                            }],
                            config: {
                                flag: false
                            },
                            listeners: {
                                beforeedit: function(a) {},
                                render: function() {}
                            }
                        }]
                    }]
                }, {
                    xtype: "panel",
                    style: "padding-top:5px;padding-left:10px;",
                    height: 170,
                    border: true,
                    width: 950,
                    items: [{
                        xtype: "panel",
                        height: 40,
                        width: 950,
                        layout: "table",
                        frame: true,
                        layoutConfig: {
                            columns: 4
                        },
                        border: true,
                        defaults: {},
                        items: [{
                            html: "<b>Term & Conditions</b>",
                            style: "padding-left:30px;",
                            border: false
                        }, {
                            xtype: "timerlabel",
                            style: "padding-left:60px;",
                            id: "timer",
                            minWidth: 350,
                            html: "",
                            activate: function(d) {
                                var f = this.ownerCt.ownerCt;
                                var e = Ext.TimerMgr.start(new Ext.Timer({
                                    useServerTime: false,
                                    expireTime: d,
                                    interval: 1000
                                }));
                                this.setTimer(e)
                            },
                            reset: function() {
                                var b = this.ownerCt.ownerCt;
                                this.cancelTimer();
                                this.setText('<b>Availability:  <font color="#cc0000">Checking...</font></b>', true)
                            },
                            listeners: {
                                timerexpire: function(d) {
                                    var c = this.ownerCt.ownerCt;
                                    c.expireInterface()
                                },
                                timerrefresh: function(d, c) {
                                    this.setText("Availability: Valid for " + c + "", true)
                                },
                                render: function() {
                                    var b = new Date().add(Date.SECOND, 240).format(TDS.env.dateFormat);
                                    this.activate(b)
                                }
                            }
                        }, {
                            xtype: "button",
                            text: "Package Details",
                            style: "padding-left:300px;",
                            handler: function(b) {
                                var h = this.findParentByType("awesomewindow").getData("accommodationRecords");
                                var j = this.findParentByType("awesomewindow").getData("transferRecords");
                                var d = this.findParentByType("awesomewindow").getData("daytoursRecords");
                                var c = this.findParentByType("awesomewindow").getData("offeringURI");
                                var b = this.findParentByType("awesomewindow");
                                var f = b.getData("dateFrom");
                                var a = this.findParentByType("awesomewindow").getData("accStore");
                                var k = this.findParentByType("awesomewindow").getData("transferStore");
                                var g = this.findParentByType("awesomewindow").getData("dayTourstore");
                                var i = Ext.getCmp("text");
                                var e = new Ext.Window({
                                    autoHeight: true,
                                    width: 970,
                                    closable: true,
                                    resizable: false,
                                    border: false,
                                    layout: "fit",
                                    modal: true,
                                    items: [{
                                        xtype: "panel",
                                        width: 150,
                                        autoHeight: true,
                                        items: [{
                                            xtype: "panel",
                                            width: 150,
                                            layout: "auto",
                                            border: false,
                                            items: [{
                                                html: "<b>Accommodation:</b>",
                                                border: false
                                            }]
                                        }, {
                                            xtype: "grid",
                                            id: "acc",
                                            hideHeaders: true,
                                            autoHeight: true,
                                            border: true,
                                            store: new Ext.data.JsonStore({
                                                url: "",
                                                identifier: "",
                                                fields: ["locationToString", "name", "inDate", "outDate", "roomType", "dataURI", "accommodationRatingURI", "basis", "rateUri", "status", "inventoryTypeURI", "maximumOccupancy", "packagePrice", "isPreHotel", "accommodationRate"]
                                            }),
                                            viewConfig: {
                                                forceFit: true
                                            },
                                            id: "hotelGrid",
                                            sm: new Ext.grid.CheckboxSelectionModel({
                                                singleSelect: true
                                            }),
                                            clicksToEdit: 1,
                                            cm: new Ext.grid.ColumnModel([{
                                                header: "Destination",
                                                width: 250,
                                                fixed: true,
                                                dataIndex: "locationToString",
                                                renderer: function(p, o, l, q, n, m) {
                                                    return p + " -- " + l.get("name")
                                                }
                                            }, {
                                                header: "In Date",
                                                width: 90,
                                                fixed: true,
                                                dataIndex: "inDate",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("inDate") != "") {
                                                        return "In : " + new Date(l.get("inDate")).format(TDS.env.dateFormatDisplay)
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Out Date",
                                                width: 90,
                                                fixed: true,
                                                dataIndex: "outDate",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("outDate") != "") {
                                                        return "Out : " + new Date(l.get("outDate")).format(TDS.env.dateFormatDisplay)
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Nights",
                                                width: 50,
                                                fixed: true,
                                                dataIndex: "night",
                                                renderer: function(q, p, m, r, o, n) {
                                                    if (m.get("outDate") != "" && m.get("inDate") != "") {
                                                        var l = ((new Date(m.get("outDate")) - new Date(m.get("inDate"))) / 86400000);
                                                        return "Nts : " + l
                                                    } else {
                                                        return "Nts: 0"
                                                    }
                                                }
                                            }, {
                                                header: "Room Type",
                                                width: 100,
                                                fixed: true,
                                                dataIndex: "roomType"
                                            }, {
                                                header: "Room Type",
                                                dataIndex: "basis",
                                                width: 120,
                                                fixed: true
                                            }, {
                                                header: "Pax",
                                                dataIndex: "pax",
                                                width: 150,
                                                renderer: function(r, q, m, s, p, o) {
                                                    var l = Ext.getCmp("review").findParentByType("awesomewindow").getData("stateRoomStore");
                                                    var n = 0;
                                                    l.each(function(t) {
                                                        n += t.data.totalPax
                                                    });
                                                    return "Pax :" + n
                                                }
                                            }, {
                                                header: "Pre",
                                                dataIndex: "isPreHotel",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("isPreHotel") == true) {
                                                        return "(Pre)"
                                                    } else {
                                                        return "(Post)"
                                                    }
                                                }
                                            }]),
                                            listeners: {
                                                render: function() {
                                                    var l = this;
                                                    Ext.Ajax.request({
                                                        url: TDS.env.dataPath + c + "/accommodations",
                                                        method: "GET",
                                                        params: {
                                                            Ispost: "true",
                                                            dateFrom: f,
                                                            dateDays: 6,
                                                            numberToReserve: 1
                                                        },
                                                        success: function(m, p) {
                                                            var o = Ext.decode(m.responseText);
                                                            var r = o.preHotels;
                                                            if (typeof r == "undefined") {
                                                                return
                                                            }
                                                            var q = [];
                                                            for (var n = 0; n < r.length; n++) {
                                                                o[r[n]].dataURI = r[n];
                                                                q.push(o[r[n]])
                                                            }
                                                            l.getStore().loadData(q)
                                                        }
                                                    })
                                                }
                                            }
                                        }, {
                                            xtype: "panel",
                                            width: 150,
                                            layout: "auto",
                                            border: false,
                                            items: [{
                                                html: "<b>Transfer:</b>",
                                                border: false
                                            }]
                                        }, {
                                            xtype: "grid",
                                            hideHeaders: true,
                                            autoHeight: true,
                                            border: true,
                                            height: 25,
                                            store: new Ext.data.JsonStore({
                                                url: "",
                                                identifier: "",
                                                fields: ["locationToString", "name", "inDate", "departureDate", "modeType", "dataURI", "rateClassUri", "rateUri", "status", "packagePrice", "transferModeTypeURI", "accommodationRatingURI", "toMode", "fromMode", "transferPlaceTypeFromURI", "transferPlaceTypeToURI", "isPre", "accommodationRate"]
                                            }),
                                            viewConfig: {
                                                forceFit: true
                                            },
                                            id: "tranfergrid",
                                            sm: new Ext.grid.CheckboxSelectionModel({
                                                singleSelect: true
                                            }),
                                            clicksToEdit: 1,
                                            cm: new Ext.grid.ColumnModel([{
                                                header: "Destination",
                                                width: 150,
                                                fixed: true,
                                                dataIndex: "locationToString"
                                            }, {
                                                header: "modeype",
                                                fixed: true,
                                                width: 100,
                                                dataIndex: "modeType"
                                            }, {
                                                header: "Out Date",
                                                width: 90,
                                                fixed: true,
                                                dataIndex: "departureDate",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("departureDate") != "") {
                                                        return new Date(l.get("departureDate")).format(TDS.env.dateFormatDisplay)
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Room Type",
                                                width: 140,
                                                fixed: true,
                                                dataIndex: "fromMode",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("departureDate") != "") {
                                                        return "From : " + p
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Room Type",
                                                width: 220,
                                                fixed: true,
                                                dataIndex: "toMode",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("departureDate") != "") {
                                                        return "To : " + p
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Pax",
                                                dataIndex: "pax",
                                                width: 150,
                                                renderer: function(r, q, m, s, p, o) {
                                                    var l = Ext.getCmp("review").findParentByType("awesomewindow").getData("stateRoomStore");
                                                    var n = 0;
                                                    l.each(function(t) {
                                                        n += t.data.totalPax
                                                    });
                                                    return "Pax :" + n
                                                }
                                            }, {
                                                header: "Pre",
                                                dataIndex: "isPre",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("isPre") == true) {
                                                        return "(Pre)"
                                                    } else {
                                                        return "(Post)"
                                                    }
                                                }
                                            }]),
                                            listeners: {
                                                render: function() {
                                                    var l = this;
                                                    Ext.Ajax.request({
                                                        url: TDS.env.dataPath + c + "/transfer",
                                                        method: "GET",
                                                        params: {
                                                            dateFrom: f,
                                                            dateDays: 6,
                                                            numberToReserve: 1
                                                        },
                                                        success: function(m, p) {
                                                            var o = Ext.decode(m.responseText);
                                                            var r = o.transfer;
                                                            if (typeof r == "undefined") {
                                                                return
                                                            }
                                                            var q = [];
                                                            for (var n = 0; n < r.length; n++) {
                                                                o[r[n]].dataURI = r[n];
                                                                q.push(o[r[n]])
                                                            }
                                                            l.getStore().loadData(q)
                                                        }
                                                    })
                                                }
                                            }
                                        }, {
                                            xtype: "panel",
                                            width: 150,
                                            layout: "auto",
                                            border: false,
                                            items: [{
                                                html: "<b>Day Tours:</b>",
                                                border: false
                                            }]
                                        }, {
                                            xtype: "grid",
                                            autoHeight: true,
                                            hideHeaders: true,
                                            border: true,
                                            height: 25,
                                            store: new Ext.data.JsonStore({
                                                url: "",
                                                identifier: "",
                                                fields: ["locationToString", "name", "inDate", "departureDate", "sightseeingTypeURI", "dayTourType", "dataURI", "time", "status", "rateUri", "rateClassUri", "packagePrice", "duration", "departureTime", "sightseeingTypeURI", "isPre"]
                                            }),
                                            viewConfig: {
                                                forceFit: true
                                            },
                                            id: "SIGHTGrid",
                                            sm: new Ext.grid.CheckboxSelectionModel({
                                                singleSelect: true
                                            }),
                                            clicksToEdit: 1,
                                            cm: new Ext.grid.ColumnModel([{
                                                header: "Destination",
                                                dataIndex: "locationToString",
                                                width: 250,
                                                fixed: true,
                                                renderer: function(p, o, l, q, n, m) {
                                                    return p + " -- " + l.get("name")
                                                }
                                            }, {
                                                header: "Depart Date",
                                                width: 90,
                                                fixed: true,
                                                dataIndex: "departureDate",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("departureDate") != "") {
                                                        return new Date(l.get("departureDate")).format(TDS.env.dateFormatDisplay)
                                                    } else {
                                                        return ""
                                                    }
                                                }
                                            }, {
                                                header: "Out Date",
                                                width: 140,
                                                fixed: true,
                                                dataIndex: "departureTime",
                                                renderer: function(p, o, l, q, n, m) {
                                                    return "Departs  " + l.get("departureTime")
                                                }
                                            }, {
                                                header: "Duration",
                                                dataIndex: "duration",
                                                fixed: true,
                                                width: 220,
                                                renderer: function(p, o, l, q, n, m) {
                                                    return "Duration  " + l.get("duration") + "  Hours"
                                                }
                                            }, {
                                                header: "Pax",
                                                dataIndex: "pax",
                                                width: 150,
                                                renderer: function(r, q, m, s, p, o) {
                                                    var l = Ext.getCmp("review").findParentByType("awesomewindow").getData("stateRoomStore");
                                                    var n = 0;
                                                    l.each(function(t) {
                                                        n += t.data.totalPax
                                                    });
                                                    return "Pax :" + n
                                                }
                                            }, {
                                                header: "Pre",
                                                dataIndex: "isPre",
                                                renderer: function(p, o, l, q, n, m) {
                                                    if (l.get("isPre") == true) {
                                                        return "(Pre)"
                                                    } else {
                                                        return "(Post)"
                                                    }
                                                }
                                            }]),
                                            listeners: {
                                                render: function() {
                                                    var l = this;
                                                    Ext.Ajax.request({
                                                        url: TDS.env.dataPath + c + "/dayTours",
                                                        method: "GET",
                                                        params: {
                                                            dateFrom: f,
                                                            dateDays: 6,
                                                            numberToReserve: 1
                                                        },
                                                        success: function(m, p) {
                                                            var o = Ext.decode(m.responseText);
                                                            var r = o.sight;
                                                            if (typeof r == "undefined") {
                                                                return
                                                            }
                                                            var q = [];
                                                            for (var n = 0; n < r.length; n++) {
                                                                o[r[n]].dataURI = r[n];
                                                                q.push(o[r[n]])
                                                            }
                                                            l.getStore().loadData(q)
                                                        }
                                                    })
                                                }
                                            }
                                        }]
                                    }],
                                    listeners: {
                                        show: function(l) {
                                            l.setPosition(200, 450)
                                        }
                                    }
                                }).show()
                            }
                        }, {
                            xtype: "button",
                            text: "Price Details",
                            style: "padding-left:100px;",
                            listeners: {
                                click: function() {
                                    var a = this.findParentByType("awesomewindow").getData("stateRoom");
                                    var f = this.findParentByType("awesomewindow").getDataURI("pnr");
                                    var d = this.findParentByType("awesomewindow").getDataURI("cruiseSelectedRecord");
                                    var a = this.findParentByType("awesomewindow").getData("stateRoomStore");
                                    var c = this.findParentByType("awesomewindow");
                                    var b = c.getData("offeringURI");
                                    var e = c.getData("dateFrom");
                                    var g = this.findParentByType("awesomewindow").initialConfig.config.rategrid;
                                    this.findParentByType("awesomewindow").hide();
                                    TDS.window.setWindow({
                                        title: "Cabin Pricing",
                                        interfaceURI: "pnr/offerings/cruise/cruisepricing.js",
                                        buttonOK: false,
                                        buttonCancel: "Close",
                                        config: {
                                            rategrid: g
                                        },
                                        data: {
                                            stateRoomStore: a,
                                            cruiseSelectedRecord: d,
                                            stateroomData: a,
                                            offeringURI: b,
                                            dateFrom: e
                                        },
                                        dataURI: {
                                            pnr: f,
                                            offeringURI: b,
                                            cruiseSelectedRecord: d
                                        },
                                        callback: {
                                            fn: function(i, j, h) {
                                                if (i) {}
                                            }
                                        }
                                    })
                                }
                            }
                        }]
                    }, {
                        xtype: "textarea",
                        id: "text",
                        width: 935,
                        height: 100
                    }, {
                        xtype: "panel",
                        height: 80,
                        width: 900,
                        layout: "table",
                        style: "padding-left:50px;",
                        layoutConfig: {
                            columns: 3
                        },
                        border: false,
                        defaults: {},
                        items: [{
                            xtype: "checkbox"
                        }, {
                            html: "<b>Accept Term  & Conditions</b>",
                            border: false,
                            width: 200,
                            style: "padding-left:20px;"
                        }]
                    }]
                }],
                validateBooking: function(a) {;
                    var c = this.getPassengerGrid();
                    var d = this.getDetail("numberOfPaxRequired");
                    var b = c.getSelectionModel().getCount();
                    if (b < d) {
                        throw "You must select " + (d - b) + " passengers to complete this booking."
                    }
                    if (!a.action) {
                        throw "You must select an available booking option to proceed."
                    }
                },
                shared: {
                    details: {}
                },
                getDetail: function(a) {
                    return this.shared.details[a]
                },
                initBooking: function() {},
                getPassengerTab: function() {
                    return this.ownerCt.ownerCt.items.itemAt(1)
                },
                getDataURI: function() {
                    return this.findParentByType("awesomewindow").baseDataURI
                },
                getPassengerGrid: function() {},
                initRadioButtons: function(a) {},
                listeners: {
                    click: function() {},
                    render: function() {}
                }
            }]
        }]
    }]
}


































