{
    xtype: 'panel',
    header: true,
    autoHeight: true,
    border: false,
    refreshGrid: function() {
        var ag = this.ownerCt.findParentByType('awesomegrid');
        ag.submitQuery(true);
    },
    items: {
        xtype: 'tabpanel',
        border: false,
        activeTab: 0,
        layoutOnTabChange: true,
        height: 260,
        shared: {
            details: {}
        },
        config: {
            cruiseName: ''
        },
        setDetail: function(key, value) {
            if (typeof key == 'object') {
                for (var i in key) {
                    this.shared.details[i] = key[i];
                }
            } else this.shared.details[key] = value;
        },
        getDetail: function(key) {
            return this.shared.details[key];
        },
        items: [{
            title: 'Details',
            items: {
                xtype: 'panel',
                border: false,
                layout: 'column',
                height: 260,
                bodyStyle: 'padding: 4px;',
                items: [{
                    columnWidth: 1,
                    hideBorders: true,
                    style: 'padding: 0px; margin-right: 8px;',
                    xtype: 'ajaxpanel',
                    height: 220,
                    interfaceURI: 'pnr/components/cruise/detail.js'
                }, {
                    width: 150,
                    xtype: 'panel',
                    autoHeight: true,
                    border: false,
                    bodyStyle: 'padding: 4px;',
                    defaults: {
                        minWidth: 100
                    },
                    invokeWindow: function(status, config) {
                        if (!config) config = {};
                        var tp = this.ownerCt.findParentByType('tabpanel');
                        var p = tp.ownerCt;
                        Ext.apply(config, {
                            title: 'Amend',
                            interfaceURI: 'pnr/components/generic/editCruise.js',
                            destinationDataURI: tp.getDetail('dataURI'),
                            sourceDataURI: tp.getDetail('dataURI'),
                            dataURI: {
                                pnr: tp.getDetail('pnrDataURI'),
                                offering: tp.getDetail('offeringURI'),
                                component: tp.getDetail('dataURI')
                            },
                            params: {
                                status: status,
                                priceCurrency: tp.getDetail('pricingPriceCurrency')
                            },
                            callback: {
                                fn: function(s) {
                                    if (s) p.refreshGrid();
                                },
                                scope: this
                            }
                        });
                        TDS.window.setWindow(config);
                    },
                    listeners: {
                        render: function() {
                            var buttonConfirm = this.items.itemAt(0);
                            var buttonOffer = this.items.itemAt(1);
                            var buttonCancel = this.items.itemAt(2);
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var status = tp.getDetail('status');
                             console.log(tp.getDetail('offerMade'))
                            // console.log(status)
                            //  console.log(buttonConfirm)
                            /*if (status.toLowerCase() != TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()) {
                                console.log(1)
                                buttonOffer.enable(true);
                            } */
							console.log(1)<!--  -->
                            if (tp.getDetail('offerMade')) {
                                // console.log(1)
                                 buttonOffer.enable(true);
                            } 
                             if (status.toLowerCase() == TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()) {
                                // console.log(2)
                                buttonConfirm.disable(true)
                            }
                            /*else if(status.toLowerCase()==TDS.data.componentStatus.STATUS_RELEASED.toLowerCase()){buttonEdit.disable();}*/
                        }
                    },
                    items: [{
                        xtype: 'button',
                        text: 'Confirm',//id:'confirm',
                         // disabled: true,
                        handler: function(me) {
                              var tp = this.ownerCt.findParentByType('tabpanel');
                              
                            var p = tp.ownerCt;
                             var status = tp.getDetail('status');
                           // p.invokeWindow(TDS.data.componentStatus.STATUS_HELD);
                           console.log(status);
                            if (!status) return;
                            // if (status.toLowerCase() == TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()) {
                                Ext.Msg.show({
                                    title: 'Confirm Booking?',
                                    msg: 'Are you sure?',
                                    buttons: Ext.Msg.YESNO,
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION,
                                    fn: function(buttonId) {
                                        console.log(buttonId);
                                        if (buttonId === "yes") {
                                            Ext.Ajax.request({
                                                url: TDS.env.dataPath + tp.getDetail('dataURI'),
                                                jsonData: {
                                                    status: TDS.data.componentStatus.STATUS_CONFIRMED
                                                },
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                method: 'PUT',
                                                scope: this,
                                                callback: function(o, s, r) {
                                                    p.refreshGrid();
                                                }
                                            });

                                            //p.invokeWindow(TDS.data.componentStatus.STATUS_CANCEL_REQUESTED);
                                        }
                                    }
                                });
                            // }
                        }
                    }, {
                        xtype: 'button',
                        config: {
                            rateList: '',
                            statusOffer: '',
                            cPNRdataURI: ''
                        },
                        text: 'Offer',
                         disabled: true,
                        handler: function(me) {
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var p = tp.ownerCt;
                            var dataURI = tp.getDetail('dataURI');
                            // console.log(p);
                            debugger;
                            TDS.window.setWindow({
                                title: 'Description',
                                interfaceURI: 'pnr/components/cruise/edit.js',
                                destinationDataURI: dataURI,
                                sourceDataURI: dataURI,
                                buttonOK: "Save",
                                scope: me,
                                dataURI: {
                                    component: dataURI,
                                },
                                data: {
                                    rateRecords: this.config.rateList
                                },
                                callback: {
                                    fn: function(s) {
                                        debugger;
                                        if (s) p.refreshGrid();
                                    },
                                    scope: this
                                }
                            });
                        }
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        handler: function(me) {
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var p = tp.ownerCt;
                            var status = tp.getDetail('status');
                            tp.getDetail('dataURI');
                            if (!status) return;
                            if (status.toLowerCase() == TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()) {
                                Ext.Msg.show({
                                    title: 'Cancel Booking?',
                                    msg: 'Are you sure?',
                                    buttons: Ext.Msg.YESNO,
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION,
                                    fn: function(buttonId) {
                                        console.log(buttonId);
                                        if (buttonId === "yes") {
                                            Ext.Ajax.request({
                                                url: TDS.env.dataPath + tp.getDetail('dataURI'),
                                                jsonData: {
                                                    status: TDS.data.componentStatus.STATUS_CANCELLED
                                                },
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                method: 'PUT',
                                                scope: this,
                                                callback: function(o, s, r) {
                                                    // p.refreshGrid();
                                                     p.submitQuery(true);
                                                }
                                            });

                                            //p.invokeWindow(TDS.data.componentStatus.STATUS_CANCEL_REQUESTED);
                                        }
                                    }
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Cancel Booking?',
                                    msg: 'Cancelling this booking may apply a cancellation fee,Are you sure?',
                                    buttons: Ext.Msg.YESNO,
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION,
                                    fn: function(button) {
                                        if (button === "yes") {
                                            Ext.Ajax.request({
                                                url: TDS.env.dataPath + tp.getDetail('dataURI'),
                                                jsonData: {
                                                    status: TDS.data.componentStatus.STATUS_CANCELLED
                                                },
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                method: 'PUT',
                                                scope: this,
                                                callback: function(o, s, r) {
                                                    p.refreshGrid();
                                                }
                                            });
                                            // p.invokeWindow(TDS.data.componentStatus.STATUS_CANCEL_REQUESTED);
                                        }
                                    }
                                });
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Note',
                        handler: function() {
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            console.log(tp);
                            var dataURI = tp.getDetail('dataURI');
                            TDS.window.setWindow({
                                title: 'Send a note',
                                information: 'Please enter your note below.',
                                interfaceURI: 'note.js',
                                postDataURI: dataURI + '/note',
                                callback: {
                                    fn: function(s) {},
                                    scope: this
                                }
                            });
                        }
                    }, {
                        xtype: 'timerlabel',
                        expire: function() {
                            var tb = this.ownerCt;
                            tb.items.itemAt(0).disable();
                            tb.items.itemAt(1).disable();
                            this.setText('Expired.');
                        },
                        listeners: {
                            render: function() {
                                var tp = this.ownerCt.findParentByType('tabpanel');
                                var dataURI = tp.getDetail('dataURI');
                                var timeHeldUntil = tp.getDetail('timeHeldUntil');
                                if (!dataURI || !timeHeldUntil) {
                                    this.hide();
                                    var t = Ext.TimerMgr.lookup(dataURI);
                                    if (t) Ext.TimerMgr.stop(t);
                                    return;
                                }
                                var timer = new Ext.Timer({
                                    id: dataURI,
                                    expireTime: timeHeldUntil
                                });
                                var t = Ext.TimerMgr.start(timer);
                                this.setTimer(t);
                            },
                            timerexpire: function() {
                                this.expire();
                            }
                        }
                    }]
                }]
            }
        }, {
            title: 'Extras',
            items: {
                xtype: 'ajaxpanel',
                height: 190,
                interfaceURI: 'pnr/components/generic/extras.js'
            }
        }, {
            title: 'Terms and Conditions',
            items: {
                xtype: 'ajaxpanel',
                height: 190,
                interfaceURI: 'pnr/components/generic/terms.js'
            }
        }, {
            title: 'Links',
            items: {
                xtype: 'ajaxpanel',
                height: 190,
                interfaceURI: 'pnr/components/generic/links.js'
            }
        }, {
            title: 'Queues',
            items: {
                xtype: 'ajaxpanel',
                height: 190,
                interfaceURI: 'pnr/components/generic/messages.js'
            }
        }, {
            title: 'Information',
            items: {
                xtype: 'ajaxpanel',
                height: 190,
                interfaceURI: 'pnr/components/cruise/information.js'
            }
        }],
    },
    listeners: {
        render: function() {
            var ap = this.ownerCt;
            var ag = this.ownerCt.ownerCt;
            var tp = this.items.itemAt(0);
            var tp = this.items.itemAt(0);
            tp.setDetail(ap.rowRecordData);
            tp.setDetail('pnrDataURI', ag.ownerCt.ownerCt.baseDataURI);
            var supplierURI = ap.rowRecordData['supplierURI'];
            if (supplierURI) var supplierName = TDS.util.Format.displayResourceConciseName(supplierURI);
            this.setTitle(ap.rowRecordData['name'] + ' (' + supplierName + ')');
        }
    }
}
































