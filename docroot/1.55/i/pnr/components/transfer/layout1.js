{
	xtype : "panel",
	header : true,
	autoHeight : true,
	border : false,
	refreshGrid : function () {
		var a = this.ownerCt.findParentByType("awesomegrid");
		a.submitQuery(true)
	},
	items : {
		xtype : "tabpanel",
		border : false,
		activeTab : 0,
		layoutOnTabChange : true,
		height : 225,
		shared : {
			details : {}

		},
		setDetail : function (b, c) {
			if (typeof b == "object") {
				for (var a in b) {
					this.shared.details[a] = b[a]
				}
			} else {
				this.shared.details[b] = c
			}
		},
		getDetail : function (a) {
			return this.shared.details[a]
		},
		items : [{
				title : "Details",
				items : {
					xtype : "panel",
					border : false,
					layout : "column",
					height : 225,
					bodyStyle : "padding: 4px;",
					items : [{
							columnWidth : 1,
							style : "padding: 0px; margin-right: 8px;",
							xtype : "ajaxpanel",
							height : 320,
							interfaceURI : "pnr/components/transfer/detail.js"
						}, {
							width : 150,
							xtype : "panel",
							autoHeight : true,
							border : false,
							bodyStyle : "padding: 4px;",
							defaults : {
								minWidth : 100
							},
							invokeWindow : function (me,a, b) {
								if (!b) {
									b = {}

								}
								var d = this.ownerCt.findParentByType("tabpanel");console.log(d.getDetail("name"))
								console.log(d.getDetail("name"));
								var c = d.ownerCt;
								Ext.apply(b, {
									title : "Amend",
									interfaceURI : "pnr/components/generic/editTransfer.js",
									destinationDataURI : d.getDetail("dataURI"),
									sourceDataURI : d.getDetail("dataURI"),
									scope:me,
									dataURI : {
										pnr : d.getDetail("pnrDataURI"),
										offering : d.getDetail("offeringURI"),
										component : d.getDetail("dataURI"),
										componentName: d.getDetail("name")
									},
									params : {
										status : a,
										rateList : d.getDetail("rateList"),
										priceCurrency : d.getDetail("pricingPriceCurrency"),
										displayStatus : d.getDetail("status")
									},
									callback : {
										fn : function (e) {
											if (e) {
												c.refreshGrid()
											}
										},
										scope : this
									}
								});
								TDS.window.setWindow(b)
							},
							listeners : {
								render : function () {
									 var buttonConfirm = this.items.itemAt(0);
                            var buttonOffer = this.items.itemAt(1);
                            var buttonCancel = this.items.itemAt(2);
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var status = tp.getDetail('status');
                            // console.log(status);
                            // console.log(status.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase())
                            // console.log(buttonConfirm);
                            /*if (status.toLowerCase() != TDS.data.componentStatus.STATUS_HELD.toLowerCase()) {
                                console.log(1)
                                buttonOffer.enable(true);
                            } */
                            if (tp.getDetail('offerMade')) {
                                console.log(1)
                                buttonOffer.enable(true);
                            } 
                             if (status.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase()) {
                                console.log(2)
                                // buttonConfirm.enable(true)
                                buttonConfirm.disable(true)
                            }
								/*	var d = this.items.itemAt(0);
									var h = this.items.itemAt(1);
									var e = this.items.itemAt(2);
									var b = this.items.itemAt(3);
									var f = this.items.itemAt(4);
									var g = this.ownerCt.findParentByType("tabpanel");
									var a = g.getDetail("status");
									if (a.toLowerCase() == TDS.data.componentStatus.STATUS_CANCELLED.toLowerCase()) {
										d.disable()
									}
									if (a.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase()) {
										h.show();
										e.show()
									}
									var c = g.getDetail("supplierURI");
									if (c == TDS.env.user.getAgencySupplierURI() && TDS.env.user.isArenaOne() && a.toLowerCase() == TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()) {
										h.show();
										h.setText("Confrim RQ")
									} else {
										if (a.toLowerCase() == TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()) {
											e.show()
											// h.show();
										} else {
											if (a.toLowerCase() == TDS.data.componentStatus.STATUS_CANCEL_REQUESTED.toLowerCase()) {
												b.show()
											} else {
												if (a.toLowerCase() == TDS.data.componentStatus.STATUS_REQUESTED.toLowerCase()) {
													f.show()
												} else {
													if (a.toLowerCase() == TDS.data.componentStatus.STATUS_RELEASED.toLowerCase()) {
														d.disable()
													}
												}
											}
										}
									}
									*/
								}
							},
							items : [
							{
                        xtype: 'button',
                        text: 'Confirm',
                          config: {
                                modetypes:''
            },
                        // disabled: true,
                        handler: function() {
                            // var p = this.ownerCt;
                            var me = this;
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var p = tp.ownerCt;
                             var status = tp.getDetail('status');
                            // p.invokeWindow(me,TDS.data.componentStatus.STATUS_HELD);
                            if (!status) return;
                            if (status.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase()) {
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
                            }
                        },
                        listeners: {
                            render: function() {
													var aa = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
													if(aa != 0){
														this.disable();
													}
                            }
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
                          config: {
                                modetypes:''
            },
                        handler: function(me) {
                            var tp = this.ownerCt.findParentByType('tabpanel');
                            var p = tp.ownerCt;
                            var dataURI = tp.getDetail('dataURI');
                            var me = this;
                            // console.log(p);
                            debugger;
                            TDS.window.setWindow({
                                title: 'Description',
                                // interfaceURI: 'pnr/components/cruise/edit.js',
                                interfaceURI : "pnr/components/generic/editTransfer.js",
                                destinationDataURI: dataURI,
                                sourceDataURI: dataURI,
                                buttonOK: "Save",
                                scope: me,
                               // scope:me,
									dataURI : {
										pnr : tp.getDetail("pnrDataURI"),
										offering : tp.getDetail("offeringURI"),
										component : tp.getDetail("dataURI"),
										componentName: tp.getDetail("name")
									},
									params : {
										status : a,
										rateList : tp.getDetail("rateList"),
										priceCurrency : tp.getDetail("pricingPriceCurrency"),
										displayStatus : tp.getDetail("status")
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
                        },
                        listeners: {
                            render: function() {
													var aa = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
													if(aa != 0){
														this.disable();
													}
                            }
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
                                                    p.refreshGrid();
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
                    },{
									xtype : "button",
									text : "Note",
									handler : function () {
										var b = this.ownerCt.findParentByType("tabpanel");
										var a = b.getDetail("dataURI");
										TDS.window.setWindow({
											title : "Send a note",
											information : "Please enter your note below.",
											interfaceURI : "note.js",
											postDataURI : a + "/note",
											callback : {
												fn : function (c) {},
												scope : this
											}
										})
									}
								}, 

							/*{
									xtype : "button",
									text : "Amend",
									handler : function () {
										var a = this.ownerCt;
										a.invokeWindow(me,"doNothing")
									},
									listeners: {
                            render: function() {
													var aa = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
													if(aa != 0){
														this.disable();
													}
                            }
                        }
								}, 
								{
                        xtype: "button",
                        text: "Confirm",
                        hidden: true,
                        handler: function() {
                            var a = this.ownerCt;
                            a.invokeWindow(TDS.data.componentStatus.STATUS_CONFIRMED)
                        }
                    },

                    {
									xtype : "button",
									text : "Offer",
									 config: {
                                modetypes:''
            },
									//hidden : true,
									handler : function () {
										var a = this.ownerCt;var me = this;
										a.invokeWindow(me,TDS.data.componentStatus.STATUS_CONFIRMED)
									},
									listeners: {
                            render: function() {
													var aa = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
													if(aa != 0){
														this.disable();
													}
                            }
                        }
								}, {
									xtype : "button",
									text : "Cancel",
									hidden : true,
									handler : function () {
										var b = this.ownerCt;
										var c = this.ownerCt.findParentByType("tabpanel");
										var a = c.getDetail("status");
										if (!a) {
											return
										}
										if (a.toLowerCase() == TDS.data.componentStatus.STATUS_HELD.toLowerCase()) {
											b.invokeWindow(TDS.data.componentStatus.STATUS_CANCELLED)
										} else {
											if (a.toLowerCase() == TDS.data.componentStatus.STATUS_CONFIRMED.toLowerCase()) {
												b.invokeWindow(TDS.data.componentStatus.STATUS_CANCEL_REQUESTED)
											}
										}
									},
									listeners: {
                            render: function() {
													var aa = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
													if(aa != 0){
														this.disable();
													}
                            }
                        }
								}, {
									xtype : "button",
									text : "Re-secure",
									hidden : true,
									handler : function () {
										var a = this.ownerCt;
										a.invokeWindow(TDS.data.componentStatus.STATUS_CONFIRMED)
									}
								}, {
									xtype : "button",
									text : "Release",
									hidden : true,
									handler : function () {
										var a = this.ownerCt;
										a.invokeWindow(TDS.data.componentStatus.STATUS_RELEASED)
									}
								}, {
									xtype : "button",
									text : "Note",
									handler : function () {
										var b = this.ownerCt.findParentByType("tabpanel");
										var a = b.getDetail("dataURI");
										TDS.window.setWindow({
											title : "Send a note",
											information : "Please enter your note below.",
											interfaceURI : "note.js",
											postDataURI : a + "/note",
											callback : {
												fn : function (c) {},
												scope : this
											}
										})
									}
								},*/



								 {
									xtype : "timerlabel",
									expire : function () {
										var a = this.ownerCt;
										a.items.itemAt(0).disable();
										a.items.itemAt(1).disable();
										this.setText("Expired.")
									},
									listeners : {
										render : function () {
											var d = this.ownerCt.findParentByType("tabpanel");
											var b = d.getDetail("dataURI");
											var a = d.getDetail("timeHeldUntil");
											if (!b || !a) {
												this.hide();
												var c = Ext.TimerMgr.lookup(b);
												if (c) {
													Ext.TimerMgr.stop(c)
												}
												return
											}
											var e = new Ext.Timer({
													id : b,
													expireTime : a
												});
											var c = Ext.TimerMgr.start(e);
											this.setTimer(c)
										},
										timerexpire : function () {
											this.expire()
										}
									}
								}
							]
						}
					]
				}
			}, {
				title : "Extras",
				items : {
					xtype : "ajaxpanel",
					height : 190,
					interfaceURI : "pnr/components/generic/extras.js"
				}
			}, {
				title : "Terms and Conditions",
				items : {
					xtype : "ajaxpanel",
					height : 190,
					interfaceURI : "pnr/components/generic/terms.js"
				}
			}, {
				title : "Links",
				items : {
					xtype : "ajaxpanel",
					height : 190,
					interfaceURI : "pnr/components/generic/links.js"
				}
			}, {
				title : "Queues",
				items : {
					xtype : "ajaxpanel",
					height : 190,
					interfaceURI : "pnr/components/generic/messages.js"
				}
			}, {
				title : "Information",
				items : {
					xtype : "ajaxpanel",
					height : 190,
					interfaceURI : "pnr/components/transfer/information.js"
				}
			}
		],
		listeners: {
		render: function () {

		var cruisePackage = this.findParentByType('ajaxpanel').rowRecordData['cruisePackage']
												/*	if(cruisePackage != 0){
														console.log('*********');
														//this.disable();
														this.items.itemAt(1).disable()
														this.items.itemAt(2).disable()
														this.items.itemAt(3).disable()
														this.items.itemAt(4).disable()
														this.items.itemAt(5).disable()
													}
													*/

}
},
	},
	listeners : {
		render : function () {
			var d = this.ownerCt;
			var b = this.ownerCt.ownerCt;
			var e = this.items.itemAt(0);
			var e = this.items.itemAt(0);
			e.setDetail(d.rowRecordData);
			e.setDetail("pnrDataURI", b.ownerCt.ownerCt.baseDataURI);
			e.setDetail("voucher", d.rowRecordData.voucher);
			var c = d.rowRecordData.supplierURI;
			if (c) {
				var a = TDS.util.Format.displayResourceConciseName(c)
			}
			this.setTitle(d.rowRecordData.name + " (" + a + ")")
		}
	}
}






















