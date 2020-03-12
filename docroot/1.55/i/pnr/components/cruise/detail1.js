{
    requireStores: [{
        dataURI: TDS.env.dataPath + 'cruise/classes/collection',
        identifier: 'cruise/classes',
        fields: ['name', 'dataURI']
    }, {
        dataURI: TDS.env.dataPath + 'cruise/cabintypes/collection',
        identifier: 'cruise/cabintypes',
        fields: ['name', 'dataURI', 'displayName']
    }, {
        dataURI: TDS.env.dataPath + 'cruise/extracategories/collection',
        identifier: 'cruise/extracategories',
        fields: ['name', 'dataURI']
    }, {
        dataURI: TDS.env.dataPath + 'rate/classes/collection',
        identifier: 'rate/classes',
        fields: ['name', 'dataURI']
    }, {
        dataURI: TDS.env.dataPath + 'rate/pers/collection',
        identifier: 'rate/pers',
        fields: ['name', 'dataURI']
    }, {
        dataURI: TDS.env.dataPath + 'rate/occupancies/collection',
        identifier: 'rate/occupancies',
        fields: ['name', 'dataURI']
    }],
    xtype: 'panel',
    height: 300,
    border: false,
    layout: 'column',
    getDataURI: function() {
        return this.ownerCt.getDataURI();
    },
    getDetailsPanel: function() {
        return this.items.itemAt(0);
    },
    getPassengersPanel: function() {
        return this.items.itemAt(1);
    },
    hasDetailsInventory: false,
    hasDetailsOffering: false,
    isDetailsReady: function() {
        if (this.hasDetailsInventory && this.hasDetailsOffering)
            return true;
        return false;
    },
    items: [{
        tbar: [{
            xtype: 'button',
            text: 'Edit Pay By',
            handler: function() {
                var tp = this.ownerCt.findParentByType('tabpanel');
                var p = tp.ownerCt;
                var dataURI = tp.getDetail('dataURI');
                var paybyDate = tp.getDetail('paybyDate');
                var depositDescription = tp.getDetail('depositDescription');;
                TDS.window.setWindow({
                    title: 'Description',
                    information: 'Please enter description.',
                    interfaceURI: 'pnr/components/accommodation/editPayby.js',
                    destinationDataURI: dataURI + '/updatePayBYDates',
                    data: {
                        paybyDate: paybyDate,
                        depositDescription: depositDescription
                    },
                    callback: {
                        fn: function(s) {
                            p.refreshGrid();
                        },
                    }
                });
            }
        }, {
            xtype: 'datefield',
            hidden: true
        }, {
            xtype: 'button',
            text: 'Save',
            disabled: true,
            hidden: true
        }, '->', {
            xtype: 'button',
            text: 'Additinonal Info',
            handler: function() {
                var fp = this.ownerCt.findParentByType('form');
                var dataURI = fp.getDataURI();
                if (!dataURI)
                    return;
                TDS.window.setWindow({
                    title: 'Attraction PNR',
                    interfaceURI: 'pnr/components/generic/additionalInfo.js',
                    sourceDataURI: dataURI + '/additionalInfo',
                    destinationDataURI: dataURI + '/additionalInfo'
                });
            }
        }, {
            xtype: 'button',
            buttonAlign: 'left',
            disabled: true,
            text: 'Download Voucher',
            handler: function() {
                var tp = this.ownerCt.findParentByType('tabpanel');
                var p = tp.ownerCt;
                var filepath = '/voucher/';
                var dataURI = tp.getDetail('dataURI');
                if (!dataURI)
                    return;
                var currentDomain = TDS.env.currentDomain;
                Ext.Ajax.request({
                    url: TDS.env.dataPath + dataURI + '/voucher',
                    jsonData: {
                        currentDomain: currentDomain
                    },
                    method: 'PUT',
                    scope: this,
                    callback: function(o, s, r) {
                        filepath = filepath + r.responseText + '.rtf';
                        var a = window.open(filepath, 'Information Priview', 'height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
                        a.focus();
                    }
                });
            }
        }],
        columnWidth: .60,
        xtype: 'panel',
        height: 235,
        border: true,/*id:'temp',
        getCruisePackage:function(){
            alert('hh')


        },*/

        tpl: new Ext.XTemplate('<div style="height:175px; overflow-y: scroll;">', '<table border="0" width="100%">',
         '<tr><td width="14%"><span style="font-size:12px"><b>RLOC:</b></span></td><td width="20%"><font color="red"><span style="font-size:12px"> <b>{pnrCode}</b><span style="font-size:12px"></font></td>', '<td  width="8%"><span style="font-size:12px"><b>Pay By:</b></span></td><td  width="20%"><div id="ttlDate#{divDataUri}"><span style="font-size:12px">{paybyDate}&nbsp;{depositDescription}</span></div></td>',
          '<td></td>', '</tr>', '</table>', '<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >' +
           '<tr style="background-color: #d0def0;">' + 
           '<th style="padding: 2px; width: 14%;">Cruise Lines </th>' + 
           '<th style="padding: 2px; width: 14%;">Ship </th>' + '<th style="padding: 2px; width: 14%;">Cruise Name </th>' 
           + '<th style="padding: 2px; width: 14%;">Embark </th>' + '<th style="padding: 2px; width: 14%;">Date </th>' + 
           '</tr>' + '<tr>' + '<td style="padding: 2px; width: 14%;">{cruiseline}</td>' + 
           '<td style="padding: 2px; width: 14%;">{cruiseShips}</td>' + 
           '<td style="padding: 2px; width: 14%;">{cruiseName}</td>' + 
           '<td style="padding: 2px; width: 14%;">{embarkation}</td>' + 
           '<td style="padding: 2px; width: 14%;">{dates}</td>' + '</tr>' + '</table>' + 
           '<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >' + 
           '<tr style="background-color: #d0def0;">' + '<th style="padding: 2px; width: 12%;">Category </th>' +
            '<th style="padding: 2px; width: 14%;">Stateroom Type </th>' + '<th style="padding: 2px; width: 14%;">Stateroom Number </th>' + 
            '<th style="padding: 2px; width: 8%;">Pax </th>' + '<th style="padding: 2px; width: 8%;">Deck </th>' + '<th style="padding: 2px; width: 8%;">Position </th>' + '<th style="padding: 2px; width: 10%;">Obstruct </th>' +
            '<th style="padding: 2px; width: 10%;">Status </th>' + '</tr>', '{rateBody}', '</table>' + 
            ' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >' + 
            '<tr style="background-color: #d0def0;">' + 
            '<th style="padding: 2px; width: 14%;">Cruise Only</th>' +
             '<th style="padding: 2px; width: 14%;"> Extras</th>' +
            '<th style="padding: 2px; width: 14%;"> Package Price</th>' +
             '<th style="padding: 2px; width: 24%;">Total Price </th>' + 
             '<th style="padding: 2px; width: 14%;">Markup </th>' + 
             '<th style="padding: 2px; width: 14%;">Commission</th>' +
              '</tr>' + '<tr>' + 


              // '<td style="padding: 2px; width: 14%;">{pricingPriceCurrency}&nbsp;{pricingPriceSell}</td>' + 
              // '<td style="padding: 2px; width: 14%;">{pricingPriceCurrency}&nbsp; {extrsGrossFlag}</td>' + 
              // '<td style="padding: 2px; width: 14%;"> {extraTotal} </td>' +
              '<td style="padding: 2px; width: 14%;"><a href="#" class="another" onClick= ""> {pricingPriceCurrency}&nbsp;{cruisePackage} </a></td>' + 
                '<td style="padding: 2px; width: 14%;"></td>' +//{pricingPriceCurrency}&nbsp;{extraTotal} {extrsGrossFlag}
                 '<td style="padding: 2px; width: 14%;"> <a href="#" class="another" onClick= ""> {pricingPriceCurrency}&nbsp;{pricingPriceSell} </a></td>' + 


              '<td style="padding: 2px; width: 24%;">{total}</td>' + 
              '<td style="padding: 2px; width: 14%;">{markup}</td>' + 
              '<td style="padding: 2px; width: 14%;">10 %</td>' + '</tr>' + '</table>' +//{price_commission}
               '<table border="0" width="100%">', '</table>', '</div>', '<div> <table style="width: 100%;"><tr><td>{createdString}</td></tr></table></div>'),
        listeners: {
            render: function() {
                  var me = this;

                var tp = this.ownerCt.findParentByType('tabpanel');
                var p = tp.ownerCt;
                var offeringURI = tp.getDetail('offeringURI');
                 var dateFrom = tp.getDetail('dateFrom');
                  var dateTo = tp.getDetail('dateTo');
                  console.log(tp)

                    var priceCommission = tp.getDetail('priceCommission$');
                    var adjustmentMarkup = tp.getDetail('adjustmentMarkup');
                    var discount = tp.getDetail('adjustmentDiscount');
                    
                    // var price_commission =  ap.rowRecordData['priceCommission$'];//setAdjustmentMarkup
                                    // var adjustmentMarkup =  ap.rowRecordData['adjustmentMarkup'];

                console.log(discount);
                //  console.log(me.getEl());
                // console.log(Ext.get('temp'));

              

    me.getEl().on('click', function(event, target) {
    // console.log(target);
  

                                        TDS.window.setWindow({
                                        title: 'Cabin Pricing',
                                        interfaceURI: 'pnr/offerings/cruise/cruisepricingPNR.js',
                                        buttonOK: false,
                                        buttonCancel: 'Close',
                                        scope:me,
                                        //config:{rategrid:rateGrid},
                                        data: {
                                            // stateRoomStore: stateroomData,
                                            // cruiseSelectedRecord: cruiseSelectedRecord,
                                            // stateroomData: stateroomData,
                                            // offeringURI: offeringURI,
                                            dateFrom: dateFrom,
                                            dateTo:dateTo,
                                            priceCommission:priceCommission,
                                            adjustmentMarkup:adjustmentMarkup,
                                            discount:discount
                                        },
                                        dataURI: {
                                            // pnr: pnr,
                                            offeringURI: offeringURI,
                                            // cruiseSelectedRecord: cruiseSelectedRecord
                                        },
                                        callback: {
                                            fn: function(s, data, responseData) {
                                                if (s) {

                                                    console.log(s);
                                                }
                                            }
                                        }
                                    });








}, null, {delegate: 'a'});



            },

        }
    }, {
        columnWidth: .40,
        xtype: 'grid',
        enableRowExpander: false,
        sessionExpandedRows: false,
        height: 160,
        autoScroll: true,
        border: false,
        enableColumnHide: false,
        enableColumnMove: false,
        enableColumnResize: false,
        enableHdMenu: false,
        tbar: ['->', {
            xtype: 'button',
            disabled: true,
            text: 'Cancel passenger',
            handler: function() {
                pGridPass = this.ownerCt.ownerCt;
                var tp = this.ownerCt.ownerCt.findParentByType('tabpanel');
                dataURIPass = tp.getDetail('dataURI')
                Ext.Msg.show({
                    title: 'Confirmation',
                    msg: 'Are you sure, want to cancel passenger?',
                    buttons: Ext.Msg.YESNO,
                    fn: processResult,
                    animEl: 'elId',
                    icon: Ext.MessageBox.QUESTION
                });

                function processResult(btn) {
                    if (btn == 'yes') {
                        var pGrid1 = pGridPass;
                        var pGrid = pGrid1.getSelections();
                        var dataURI = dataURIPass;
                        var jd = {};
                        var ar = new Array();
                        for (var i = 0; i < pGrid.length; i++) {
                            ar[i] = pGrid[i].data.dataURI;
                        }
                        jd['passengerURIs'] = ar;
                        Ext.Ajax.request({
                            url: TDS.env.dataPath + dataURI + '/cancel',
                            method: 'PUT',
                            jsonData: jd,
                            callback: function(o, s, r) {
                                if (s) {
                                    try {
                                        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^Passenger^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                                        var g = pGrid1.ownerCt.findParentByType('awesomegrid');
                                        g.submitQuery(true);
                                    } catch (e) {}
                                }
                            }
                        });
                    }
                }
            }
        }],
        store: new Ext.data.JsonStore({
            url: '',
            id: 'dataURI',
            fields: ['dataURI', 'displayName', 'code', 'dateOfBirth', 'addressString', 'phoneNumber1', 'emailAddress', 'gender', 'status',
             'type','priceSell','isCruisePackage']
        }),
        sm: new Ext.grid.CheckboxSelectionModel(),
        columns: [new Ext.grid.CheckboxSelectionModel(), {
            header: 'Pax',
            dataIndex: 'displayName',
            width: 200,
            sortable: true,
            renderer: function(value, metadata, record, rowIndex, colIndex, store) {
                metadata.attr = 'ext:qtip= "Click to view details"';
                return value;
            }
        }, {
            header: 'Type',
            dataIndex: 'code',
            width: 80
        }, {
            header: 'Gender',
            dataIndex: 'gender',
            renderer: TDS.util.Format.gender,
            width: 100
        }, {
            header: 'DOB',
            dataIndex: 'dateOfBirth',
            width: 100,
            renderer: TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay)
        }, {
            header: 'Age',
            dataIndex: 'dateOfBirth',
            renderer: TDS.util.Format.age,
            width: 80
        }, {
            header: "CR/PK",
            dataIndex: "isCruisePackage",
            width: 70,
            fixed: true,
            renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                        // value ? return "PK"  : return "CR";
                        if(value){return "PK";}else{return "CR";}

                    }
        }, {
            header: "Price",
            dataIndex: "priceSell",
            width: 40,
            fixed: true,
            renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                // console.log(value);
                return value != ""?value.toFixed(2) :'';

            }
        }, {
            header: 'Status',
            dataIndex: 'status',
            width: 100,
            renderer: function(value, metadata, record, rowIndex, colIndex, store, view) {
                 // console.log(Ext.getCmp('passengerGrid'));
                  // console.log(view);
                  //  console.log(store); console.log(metadata); console.log(record); 
                  //  console.log(this);
                var ap = Ext.getCmp('passengerGrid').ownerCt.ownerCt.findParentByType('ajaxpanel');
                // var ap = view.ownerCt.ownerCt.findParentByType('ajaxpanel');
                var status = ap.rowRecordData['status'];
                // console.log(status);
                if (status == 'Requested') {
                    return 'RQ';
                } else if (status == 'Cancelled'){
                    return 'XXX';

                }else {
                    return status;
                }
            }
        }],
        viewConfig: {
            forceFit: true
        },
        id: 'passengerGrid',
        listeners: {
            rowdblclick: function(grid, rowIndex, e) {
                var record = grid.getStore().getAt(rowIndex);
                var dataURI = record.get('dataURI');
                TDS.window.setWindow({
                    buttonOK: false,
                    title: 'Passenger details',
                    destinationDataURI: dataURI,
                    interfaceURI: 'pnr/passenger/viewDetails.js',
                    sourceDataURI: dataURI
                });
            },
            render: function() {
                var ap = this.ownerCt.ownerCt.findParentByType('ajaxpanel');
                var status = ap.rowRecordData['status'];
                // console.log(status);
                var bbar = this.bottomToolbar;
                this.getSelectionModel().on('rowselect', function() {
                    if (this.ownerCt.getSelections().length > 0) {
                        bbar.items.itemAt(1).setDisabled(false);
                    }
                }, bbar);
                this.getSelectionModel().on('rowdeselect', function() {
                    if (this.ownerCt.getSelections().length == 0) {
                        bbar.items.itemAt(1).setDisabled(true);
                    }
                }, bbar);
                this.getEl().swallowEvent(['columnmove', 'columnresize', 'headerclick', 'click', 'mouseout', 'rowclick', 'rowmousedown', 'rowblclick', 'cellblclick', 'sortchange', 'mouseup', 'mousedown']);
                var tp = this.ownerCt.findParentByType('tabpanel');
                var dataURI = tp.getDetail('dataURI');
                Ext.Ajax.request({
                    url: TDS.env.dataPath + dataURI + '/passengers/collection/concise',
                    method: 'GET',
                    callback: function(o, s, r) {
                        if (s) {
                            var ro = Ext.util.JSON.decode(r.responseText);
                            var collection = ro[dataURI + '/passengers'];
                            if (typeof collection == 'undefined')
                                return;
                            var sd = [];
                            for (var i = 0; i < collection.length; i++) {
                                ro[collection[i]].dataURI = collection[i];
                                sd.push(ro[collection[i]]);
                            }
                            var grid = this;
                            var storeData = grid.store;
                            storeData.loadData(sd);
                            grid.getView().refresh();
                        }
                    },
                    scope: this
                });
            }
        }
    }],
    listeners: {
        render: function() {
            this.initInventory();
            this.initOffering();
             // this.initInventory();
        }
    },
    initInventory: function() {
        var tp = this.ownerCt.findParentByType('tabpanel');
        var component = tp.getDetail('dataURI');
        // console.log(tp);
        var sd1
        Ext.Ajax.request({
            url: TDS.env.dataPath + component + '/offerList',
            method: 'GET',
            callback: function returnAgents(o, s, r) {
                debugger;
                var ro = Ext.util.JSON.decode(r.responseText);
                var collection = ro['offerList'];
                if (typeof collection == 'undefined')
                    return;
                var sd = [];
                for (var i = 0; i < collection.length; i++) {
                    ro[collection[i]].dataURI = collection[i];
                    sd.push(ro[collection[i]]);
                }
                // console.log(collection);
                sd1 = sd
                var tp = this.ownerCt.findParentByType('tabpanel');
                var dataURI = tp.getDetail('dataURI');
                 console.log(tp.getDetail('priceCommission'));
                var depositDescription = tp.getDetail('depositDescription');
                var paysbyDate = tp.getDetail('paybyDate');
                var paybyDate = TDS.util.Format.dateSpecial(paysbyDate, TDS.env.dateFormatDisplay);
                var divDataUri = dataURI;
                var pnrCode = new Array();
                pnrCode = dataURI.split("/");
                Ext.Ajax.request({
                    url: TDS.env.dataPath + dataURI + '/inventories/collection',
                    method: 'GET',
                    callback: function(o, s, r) {
                        if (s) {
                            try {
                                var ro = Ext.decode(r.responseText);
                            } catch (e) {}
                            if (ro) {
                                var quantity = 0,
                                    rateURI, dates = [];
                                var markuptot = 0;
                                var inventoriesRo = ro['component/inventory/collection'];
                                var inventories = inventoriesRo[dataURI + '/inventories'];
                                var ratesRo = ro['component/rate/collection/'];
                                var rates = ratesRo['component/rate/collection/list'];
                                var cruiseRatesCabins = ro['component/selectedCruiseRateCabins'];
                                var cabinsBody = "";
                                var paxTotal = this.findByType('grid')[0].getStore().getTotalCount();
                                var paxType = [];
                                this.findByType('grid')[0].getStore().each(function(record) {
                                    paxType.push(record.get('type'));
                                })
                                if (typeof cruiseRatesCabins != 'undefined' && cruiseRatesCabins != '' && cruiseRatesCabins.length > 0) {
                                    for (var i = 0; i < cruiseRatesCabins.length; i++) {
                                        var cruiseRatesCabin = cruiseRatesCabins[i];
                                        var cruiseCabin = ro[cruiseRatesCabin];
                                    }
                                }
                                tp.setDetail('rateList', rates);
                                tp.setDetail('rateList', rates);
                                // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                                var rateRecords = [];
                                for (var i = 0; i < rates.length; i++) {
                                    rateRecords.push(ratesRo[rates[i]])
                                }
                                var ap = this.ownerCt.ownerCt.findParentByType('ajaxpanel');
                                var mainGridData = this.findParentByType('ajaxpanel').ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.rowRecordData
                                var ap = this.ownerCt.ownerCt.findParentByType('ajaxpanel');
                                var status = ap.rowRecordData['status'];
                                console.log(ap.rowRecordData['priceCommission$']);
                                var buttons = this.findParentByType('tabpanel').items.items[0].findByType('button')[1];
                                var rawData = [{
                                    'nameString': '',
                                    'maximumOccupancy': '',
                                    'status': '',
                                    'obstruct': '',
                                    'dataURI': '',
                                    'expireDate': '',
                                    'position': '',
                                    'totalPax': '',
                                    'deckNo': '',
                                    'price': ''
                                }];
                                // console.log(ap.rowRecordData['cruisePackagePrice']);
                                // console.log(buttons.config.rateList[0].status);
                                if (sd.length != 0) {//accept
                                    // if (sd[0].accept) {//accept
                                    // console.log(collection); console.log("^^^^^^^^^^^^");
                                    buttons.config.rateList = sd;
                                    buttons.config.cPNRdataURI = collection[0];
                                    if (typeof(buttons.config.rateList[0].status) !== 'undefined') {

                                        // console.log(buttons.config.rateList[0].status);


                                        // status = buttons.config.rateList[0].status;
                                        // buttons.config.status = status;
                                        buttons.config.statusOffer = sd[0].status;
                                        // console.log(buttons.config.statusOffer);
                                        // console.log(status);
                                    }
                                    if (typeof(buttons.config.rateList[0].offeringURI) === 'undefined') {
                                        buttons.config.offeringURI = divDataUri;
                                        buttons.config.rateList[0].offeringURI = divDataUri;
                                        buttons.config.rateList[0].maximumOccupancy = ap.rowRecordData['passengersTotal']
                                    }
                                    // console.log(buttons.config.rateList[0]);
                                    // console.log(typeof(buttons.config.rateList[0].nameString) != 'undefined')
                                    if (typeof(buttons.config.rateList[0].nameString) === 'undefined') {
                                        buttons.config.rateList[0].nameString = rateRecords[0].nameString;
                                    }
                                // }
                                } else {
                                    // console.log("********************");
                                    buttons.config.rateList = rawData;
                                    buttons.config.rateList[0].nameString = rateRecords[0].nameString;

                                    // status = buttons.config.rateList[0].status;
                                    // buttons.config.status = buttons.config.rateList[0].status;
                                    buttons.config.status = status;

                                    // console.log(buttons.config.status);

                                    buttons.config.rateList[0].offeringURI = divDataUri;
                                    buttons.config.offeringURI = divDataUri;
                                    buttons.config.rateList[0].maximumOccupancy = ap.rowRecordData['passengersTotal']
                                }
                                var pnrCode = new Array();
                                pnrCode = dataURI.split("/");
                                var tempBookedDate = "";
                                this.rateData = [];
                                var noOfDates = inventories.length / rates.length;
                                var pricing = [];
                                var prcCurr = "";
                                var rateIdList = [];
                                var cnt = 0;
                                if (inventories.length > 0) {
                                    for (var i = 0; i < inventories.length; i++) {
                                        var inventory = inventoriesRo[inventories[i]];
                                        dates[dates.length] = TDS.util.Format.dateSpecial(inventory.componentPaybyDate, TDS.env.dateFormatDisplay);
                                        prcCurr = inventory.pricingPriceCurrency;
                                        if (rateIdList.indexOf(inventory.rateId) == -1) {
                                            rateIdList[i] = inventory.rateId;
                                            pricing[cnt] = TDS.util.Price.calculateFixedGrossNettPrice({
                                                'pricingPriceCurrency': inventory.pricingPriceCurrency,
                                                'pricingPriceSell': inventory.pricingPriceSell,
                                                'pricingPriceCommission': inventory.pricingPriceCommission,
                                                'pricingPriceIsNett': inventory.pricingPriceIsNett,
                                            });
                                            pricing[cnt].rateId = inventory.rateId;
                                            pricing[cnt].quantity = inventory.quantity;
                                            cnt++;
                                        }
                                    }
                                    var rateBody = "";
                                    var total = 0;
                                    var category = '';
                                    var extraTotal = 0;
                                    if (rates.length > 0) {
                                        for (var i = 0; i < rates.length; i++) {
                                            var newLineRate = ratesRo[rates[i]];
                                            extraTotal = newLineRate.extraTotal;
                                            tempBookedDate = ratesRo[rates[i]].tempBookedDate;
                                            var roomTypePer = [];
                                            var groupName = newLineRate.groupName;
                                            var priceCommission = "";
                                            var markupCol = "";
                                            var pricingPriceSell = 0;
                                            var grossNett = '';
                                            ratesRo[rates[i]].pricingPriceIsNett;
                                            if (ratesRo[rates[i]].pricingPriceIsNett) {
                                                grossNett = 'Net';
                                            } else {
                                                grossNett = 'Gross';
                                            }
                                            category = ratesRo[rates[i]].category
                                            var pricingValues = null;
                                            for (var j = 0; j < pricing.length; j++) {
                                                if (pricing[j].rateId == rates[i].substring(rates[i].lastIndexOf('/') + 1, rates[i].length)) {
                                                    pricingValues = pricing[j];
                                                }
                                            }
                                            if (!pricingValues.priceIsNett) {
                                                priceCommission = pricingValues.priceCommissionPercentage;
                                            } else {
                                                markupCol = pricingValues.priceCommission;
                                                markuptot += (pricingValues.quantity * pricingValues.priceCommission);
                                            }
                                            total += (pricingValues.quantity * pricingValues.priceSell);
                                            var ap = this.ownerCt.ownerCt.findParentByType('ajaxpanel');
                                            // var status = ap.rowRecordData['status'];
                                            var rowIndex = this.findParentByType('ajaxpanel').ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.lastExpandedRowIdx;
                                            var mainGridData = this.findParentByType('ajaxpanel').ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.rowRecordData
                                            // console.log(mainGridData);
                                            // console.log(sd);
                                            rateBody += "<tr>";
                                            rateBody += '<td>' + newLineRate.nameString + '</td>';
                                            if (sd.length == 0) {
                                                rateBody += '<td></td>', rateBody += '<td></td>'
                                            } else {
                                                // if (status == 'Requested') {
                                                    // console.log(sd[0].accept)
                                                    if (!sd[0].accept) {
                                                    // console.log('ifffffffffffff')
                                                    rateBody += '<td></td>', rateBody += '<td></td>'
                                                } else {
                                                    if (typeof(sd[0].stateRoomType) != 'undefined')
                                                        rateBody += '<td>' + sd[0].stateRoomType + '</td>'
                                                    if (typeof(sd[0].stateRoomNumber) != 'undefined')
                                                        rateBody += '<td>' + sd[0].stateRoomNumber + '</td>'
                                                }
                                            }
                                            rateBody += '<td>' + newLineRate.maximumOccupancy + '</td>';
                                            if (sd.length == 0) {
                                                rateBody += '<td></td>', rateBody += '<td></td>', rateBody += '<td></td>'
                                            } else {
                                                // if (status == 'Requested') {
                                                    if (!sd[0].accept) {
                                                    rateBody += '<td></td>', rateBody += '<td></td>', rateBody += '<td></td>'
                                                } else {
                                                    // console.log(sd);
                                                    if (typeof(sd[0].deckNo) != 'undefined')
                                                        rateBody += '<td>' + sd[0].deckNo + '</td>'
                                                    if (typeof(sd[0].position) != 'undefined')
                                                        rateBody += '<td>' + sd[0].position + '</td>'
                                                    if (typeof(sd[0].obstruct) != 'undefined'){
                                                        // rateBody += '<td>' + sd[0].obstruct + '</td>'
                                                         if(sd[0].obstruct == true){
                                                    rateBody += '<td>YES</td>'
                                                 }else{
                                                     rateBody += '<td>NO</td>'
                                                 }
                                                    }
                                                }
                                            }
                                            rateBody += '<td>' + status + '</td>', rateBody += "</tr>";
                                        }
                                        total += markuptot;
                                        total += extraTotal;
                                        total += pricingPriceSell
                                    }
                                    if (dates.length > 0)
                                        var finalDate = dates[0];
                                    else
                                        var finalDate = dates;
                                    // tp.setDetail('pricingPriceCurrency', prcCurr);
                                    tp.setDetail('pricingPriceCurrency', prcCurr);

                                    // console.log(ap.rowRecordData['cruisePackage']);
                                    // console.log(i(ap.rowRecordData['cruisePackagePrice']));
                                    var packagePrice = 0;
                                    if(ap.rowRecordData['cruisePackagePrice'] == ""){
                                        // packagePrice

                                    }else{
                                        packagePrice = ap.rowRecordData['cruisePackagePrice'] 

                                    }
                                    // console.log(total)

                                    var price_commission =  ap.rowRecordData['priceCommission$'];//setAdjustmentMarkup
                                    var adjustmentMarkup =  ap.rowRecordData['adjustmentMarkup'];
                                    console.log(price_commission);
                                     console.log(adjustmentMarkup)
                                    var markupAmount = 0;
                                    if(typeof (price_commission) != 'undefined' ){
                                       markupAmount = (parseFloat(ap.rowRecordData['cruisePackagePrice']) * price_commission)/100;


                                    }
                                    if(typeof (adjustmentMarkup) != 'undefined' ){
                                         markupAmount = adjustmentMarkup
                                    }
                                    console.log(markupAmount)




                                    this.inventoryData = {
                                        'rateBody': rateBody,
                                        'cabinsBody': cabinsBody,
                                        'dataURI': dataURI,
                                        'divDataUri': divDataUri,
                                        'numberOfNights': noOfDates,
                                        'dates': finalDate,
                                        'depositDescription': depositDescription,
                                        'paybyDate': paybyDate,
                                        'markup': TDS.util.Price.formatPrice(markupAmount, prcCurr),
                                        'pnrCode': pnrCode[1],
                                        'bookeddateDis': tempBookedDate,//ap.rowRecordData['cruisePackagePrice']
                                        // 'total': TDS.util.Price.formatPrice(total, prcCurr),
                                        'total': TDS.util.Price.formatPrice(parseInt(ap.rowRecordData['cruisePackagePrice']), prcCurr),
                                        // 'extraTotal': TDS.util.Price.formatPrice(extraTotal, prcCurr),
                                        // 'extraTotal': ap.rowRecordData['cruisePackagePrice'] != '' ? TDS.util.Price.formatPrice(parseInt(ap.rowRecordData['cruisePackagePrice']), prcCurr):'',
                                        'priceCommission': priceCommission,
                                        // pricingPriceCurrency
                                        // 'pricingPriceSell': TDS.util.Price.formatPrice(pricingPriceSell, prcCurr),
                                        'cruisePackage' :ap.rowRecordData['cruisePackage'] == 0 ? TDS.util.Price.formatPrice(parseInt(packagePrice), prcCurr) :"",
                                        'pricingPriceSell': ap.rowRecordData['cruisePackage']  > 0 ? TDS.util.Price.formatPrice(parseInt(packagePrice)/newLineRate.maximumOccupancy, prcCurr):'',

                                         // 'pricingPriceSell': ap.rowRecordData['cruisePackagePrice'] != '' ?TDS.util.Price.formatPrice(parseInt(ap.rowRecordData['cruisePackagePrice'])/newLineRate.maximumOccupancy, prcCurr):'',
                                        'grossNett': grossNett,
                                        'category': category,
                                        'price_commission':price_commission + " %"
                                    };
                                    this.hasDetailsInventory = true;
                                    if (this.isDetailsReady())
                                        this.displayDetails();
                                }
                            }
                        }
                    },
                    scope: this
                })
            },
            scope: this
        });
    },
    initOffering: function() {
        var tp = this.ownerCt.findParentByType('tabpanel');
        var dataURI = tp.getDetail('offeringURI');
        Ext.Ajax.request({
            url: TDS.env.dataPath + dataURI,
            method: 'GET',
            callback: function(o, s, r) {
                if (s) {
                    try {
                        var ro = Ext.decode(r.responseText);
                        console.log(ro);
                    } catch (e) {}
                    if (ro) {
                        tp.initialConfig.config.cruiseName = ro['cruiseName'];
                        this.offeringData = {
                            'website': ro['primaryHref'],
                            'addressString': ro['addressString'],
                            'cruiseShips': ro['cruiseShips'],
                            'cruiseline': ro['cruiseline'],
                            'cruiseName': ro['cruiseName'],
                            'embarkation': ro['embarkation'],
                            'locationFromString': ro['locationFromString'],
                            'locationToString': ro['locationToString'],
                            'duration': ro['duration'],
                            'departureDate': TDS.util.Format.dateSpecial(ro['departureDate'], TDS.env.dateFormatDisplay),
                            'arrivalDate': TDS.util.Format.dateSpecial(ro['arrivalDate'], TDS.env.dateFormatDisplay)
                        };
                        this.hasDetailsOffering = true;
                        if (this.isDetailsReady())
                            this.displayDetails();
                    }
                }
            },
            scope: this
        });
    },
    displayDetails: function() {
        var tp = this.ownerCt.findParentByType('tabpanel');
        var createdDate = Date.parseDate(tp.getDetail('createdDate'), TDS.env.dateFormat);
        var updatedDate = Date.parseDate(tp.getDetail('updatedDate'), TDS.env.dateFormat);
        var mobile = this.findParentByType('awesomegrid').findParentByType('pnrpanel').ownerCt.ownerCt.dataObj.pnrFrom;
        var message = !Ext.isEmpty(mobile) ? 'Created by ' + 'Mobile on ' : 'Created on ';
        var createdString = message + createdDate.format(TDS.env.dateTimeFormatDisplay) + ' by ' + tp.getDetail('createdByUserFullNameString') + ', modified on ' + updatedDate.format(TDS.env.dateTimeFormatDisplay) + (tp.getDetail('createdByUserFullNameString') == tp.getDetail('updatedByUserFullNameString') ? '' : ' by ' + tp.getDetail('updatedByUserFullNameString')) + '.';
        var pricing = TDS.util.Price.calculateFixedGrossNettPrice({
            'pricingPriceCurrency': tp.getDetail('pricingPriceCurrency'),
            'pricingPriceSell': tp.getDetail('pricingPriceSell'),
            'pricingPriceCommission': tp.getDetail('pricingPriceCommission'),
            'pricingPriceIsNett': tp.getDetail('pricingPriceIsNett'),
            'dates': tp.getDetail('dates')
        });
        var data = '';
        this.getDetailsPanel().tpl.overwrite(this.getDetailsPanel().body, Ext.apply({
            'createdString': createdString
        }, this.inventoryData, this.offeringData));
    }
}










































