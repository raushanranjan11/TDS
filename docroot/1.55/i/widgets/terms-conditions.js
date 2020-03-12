{
    xtype: "form",
    border: false,
    width: 470,
    markDataDirtyOnLoad: true,
    items: [{
        xtype: "tabpanel",
        activeTab: 0,
        layoutOnTabChange: true,
        height: 525,
        width: 470,
        defaults: {},
        items: [{
            title: "Details",
            layout: "form",
            border: true,
            labelWidth: 120,
            height: 525,
            autoScroll: true,
            defaults: {
                style: "padding: 2px 4px 2px 4px;"
            },
            items: [{
                html: "<center><b><u>Payment Conditions</u></b></center>",
                border: false,
                hideBorders: false,
                width: 440,
                height: 20
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 5
                },
                defaults: {
                    border: false
                },
                items: [{
                    html: "&nbsp;",
                    width: 20
                }, {
                    html: "Full Payment with in",
                    width: 100
                }, {
                    xtype: "numberfield",
                    name: "fullPytPriorDays",
                    bodyStyle: "padding: 0 4px;",
                    width: 40,
                    mode: "local",
                    displayField: "numeric",
                    triggerAction: "all",
                    store: TDS.data.salutationsoh
                }, {
                    html: "days",
                    bodyStyle: "padding: 0 4px;"
                }]
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 12
                },
                defaults: {
                    border: false
                },
                items: [{
                    html: "&nbsp;",
                    width: 20
                }, {
                    html: "Deposit within",
                    width: 100
                }, {
                    xtype: "textfield",
                    name: "depositWithinDays",
                    bodyStyle: "padding: 0 4px;",
                    width: 40
                }, {
                    html: "days",
                    bodyStyle: "padding: 0 0 0 4px;",
                    width: 30
                }, {
                    xtype: "textfield",
                    name: "depositPerOption",
                    bodyStyle: "padding: 0 4px;",
                    width: 30,//115
                },
                {
                    html: "Per person",
                    bodyStyle: "padding: 0 0 0 4px;",
                    width: 60
                },
                {
                    xtype: "checkbox",
                    name: "perPerson",
                    bodyStyle: "padding-left: 10px;",
                    width: 30,//115
                },
                {
                    html: "Cruise",
                    bodyStyle: "padding: 0 0 0 4px;",
                    width: 40
                },
                {
                    xtype: "checkbox",
                    name: "cruisePerPerson",
                    bodyStyle: "padding-left: 10px;",
                    width: 30,//115
                },]
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 1
                },
                defaults: {
                    border: false
                },
                items: [{
                    xtype: "textarea",
                    height: 50,
                    name: "depositWithInDiscription",
                    bodyStyle: "padding: 0 0 0 4px;",
                    border: false,
                    readOnly: true,//---
                    width: 420
                }]
            }, {
                html: '<hr align="left" />',
                border: false,
                width: 420
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 5
                },
                defaults: {
                    border: false
                },
                items: [{
                    html: "&nbsp;",
                    width: 20
                }, {
                    html: "Balance Due",
                    width: 100
                }, {
                    xtype: "textfield",
                    name: "balancePriorToDepartureDay",
                    width: 40
                }, {
                    html: "days prior to departure from destination",
                    bodyStyle: "padding: 0 4px;"
                }]
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 1
                },
                defaults: {
                    border: false
                },
                items: [{
                    xtype: "textarea",
                    height: 50,
                    name: "balanceDueDiscription",
                    bodyStyle: "padding: 0 0 0 4px;",
                    border: false,
                   readOnly: true,//---
                    width: 420
                }]
            }, {
                html: '<hr align="left" />',
                border: false,
                width: 420
            }, {
                xtype: "panel",
                border: false,
                layout: "table",
                layoutConfig: {
                    columns: 5
                },
                defaults: {
                    border: false
                },
                items: [{
                    html: "&nbsp;",
                    width: 20
                }, {
                    xtype: "checkbox",
                    name: "autoCancel",
                    boxLabel: "Auto Cancel",
                    forceSubmit: true,
                    width: 100
                }, {
                    xtype: "numberfield",
                    name: "bufferCancelDays",
                    boxLabel: "Buffer Days",
                    width: 40
                }, {
                    html: "&nbsp;&nbsp;Buffer Days"
                }]
            }, {
                xtype: "panel",
                border: false,
                layout: "fit",
                width: 465,
                height: 215,
                style: "padding: 0px 0px 0px 2px;",
                defaults: {
                    border: false,
                    style: "padding: 0px 0px 0px 0px;"
                },
                items: [{
                    xtype: "htmleditor",
                    name: "termsAndConditions",
                    height: "auto",
                    width: "auto",
                    hideLabel: true,
                    labelSeparator: "",
                    anchor: "100%",
                    enableLinks: true,
                    enableLists: true,
                    enableSourceEdit: true,
                    enableFontSize: true,
                    enableFont: false,
                    enableColors: true,
                    enableAlignments: true
                }]
            }]
        }]
    }]
}