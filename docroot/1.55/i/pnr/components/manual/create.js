{
	xtype: 'form',
	border: false,
	items: [
		{
			xtype: 'tabpanel',
			activeTab: 0,
			layoutOnTabChange: true, // important
			height: 480,
			defaults: {
				bodyStyle: 'padding: 6px 4px 6px 4px;'
			},
			items: [
				// details tab
				{
					title: 'Details',
					items: [
						{
							xtype: 'panel',
							layout: 'form',
							border: false,
							labelWidth: 110,
							calculateCommission: function () {
 								var a = this.items;
								var result = (a.itemAt(15).getValue() / 100) * a.itemAt(12).getValue();
								if (!isNaN(result)) a.itemAt(16).setValue(result.toFixed(2));
 							},
 							items: [
								{
									xtype: 'textfield',
									name: 'name',
									fieldLabel: 'Service Name',
									bodyStyle: 'padding: 2px 4px 2px 4px;',
									width: 263
								},
								{
									xtype: 'textfield',
									name: 'bookingReferenceNumber',
									fieldLabel: 'Booking reference #',
									bodyStyle: 'padding: 2px 4px 2px 4px;',
									width: 185
								},
								{
									xtype: 'textfield',
									name: 'supplierName',
									fieldLabel: 'Purchased from',
									bodyStyle: 'padding: 2px 4px 2px 4px;',
									width: 263
								},
								{
									xtype: 'combo',
									fieldLabel: 'Component',
									name: 'type',
									mode: 'local',
									width: 185,
									triggerAction: 'all',
									editable: false,
									excludeFromSession: true,
									displayField: 'name',
									valueField: 'dataURI',
									emptyText: 'Component type',
									store: TDS.data.componentsList,
									listeners: {
											select: function () {
 												if(this.getValue() == 'ACCOMMODATION'){
													this.ownerCt.items.itemAt(4).enable(true);
													this.ownerCt.items.itemAt(4).items.itemAt(1).enable(true);
													this.ownerCt.items.itemAt(4).items.itemAt(2).enable(true);
												}
												else{
													this.ownerCt.items.itemAt(4).disable(true);
													this.ownerCt.items.itemAt(4).items.itemAt(1).disable(true);
													this.ownerCt.items.itemAt(4).items.itemAt(2).disable(true);
												}
											},
											render: function(){
											var w = this. ownerCt.findParentByType('awesomewindow');
											var a =  w.aw.data;
											var t =  a.type;
 											if(typeof t!= 'undefined' && t == "ACCOMMODATION"){
 												this.ownerCt.items.itemAt(4).enable(true);
												this.ownerCt.items.itemAt(4).items.itemAt(1).enable(true);
												this.ownerCt.items.itemAt(4).items.itemAt(2).enable(true);
												var p =  a.parameters;
												if(typeof p!= 'undefined' && p != ""){
													var ro = Ext.util.JSON.decode(p);
													this.ownerCt.items.itemAt(4).items.itemAt(1).setValue(ro.accommodationType);
													this.ownerCt.items.itemAt(4).items.itemAt(2).setValue(ro.accommodationRating);
												}
 											}
										}
									}
								},
								{
									xtype: 'panel',
									layout: 'table',
									style: 'padding: 0; margin-bottom: 4px;',
									border: false,
									disabled:true,
									hideBorders: true,
									layoutConfig: {
										columns: 5
									},
									items: [
										{
											html: 'Type:',
											width: Ext.isIE ? 110 : 115
										},
										{
											xtype: 'combo',
											fieldLabel: 'Type',
											name: 'accommodationType',
											mode: 'local',
											width: 185,
											triggerAction: 'all',
											editable: false,
											excludeFromSession: true,
											displayField: 'name',
											valueField: 'dataURI',
											emptyText: 'Type',
											store: TDS.data.getStore({
 												dataURI: TDS.env.dataPath + 'accommodation/propertyclasstypes/collection',
 												identifier: 'accommodation/propertyclasstypes',
 												fields: ['name', 'displayName', 'dataURI']
 											}) 
 										}, 
										{
											xtype: 'combo',
											fieldLabel: 'Rating',
											name: 'accommodationRating',	
											style: 'margin-left: 5px;',
 											mode: 'local',
											width: 70,
											triggerAction: 'all',
											editable: false,
											excludeFromSession: true,
											displayField: 'name',
											valueField: 'dataURI',
											emptyText: 'Rating',
											store: TDS.data.getStore({
 												dataURI: TDS.env.dataPath + 'accommodation/ratings/collection',
 												identifier: 'accommodation/ratings',
 												fields: ['name', 'dataURI']
 											})
										} 
									]
								},
								{
									xtype: 'textarea',
									name: 'details',
										height:50,
									fieldLabel: 'Details',
									bodyStyle: 'padding: 2px 4px 2px 4px;',
									width: 263,
									listeners: {
										render: function(){
											var w = this. ownerCt.findParentByType('awesomewindow');

											var a =  w.aw.data.parameters;
											if(typeof a!= 'undefined' && a != ""){
												var ro = Ext.util.JSON.decode(a);
												this.setValue(ro.details);
											}
										}
									}
								},
//								 {
//									xtype: 'panel',
//									layout: 'table',
//									style: 'padding: 0; margin-bottom: 4px;',
//									border: false,
//									hideBorders: true,
//									layoutConfig: {
//										columns: 3
//									},
//									items: [
//										{
//											html: 'Service Type:',
//											width: Ext.isIE ? 110 : 115
//										},
//										{
//											xtype: 'combo',
//											fieldLabel: 'Service Type',
//											name: 'serviceType',
//											mode: 'local',
//											width: 120,
//											triggerAction: 'all',
//											editable: false,
//											excludeFromSession: true,
//											displayField: 'name',
//											valueField: 'dataURI',
//											emptyText: 'Service Type',
//											store: TDS.data.getStore({
//												dataURI: TDS.env.dataPath + 'rate/occupancies/collection',
//												identifier: 'rate/occupancies',
//												fields: ['name', 'dataURI']
//											})
// 										}, 
//										{
//											xtype: 'combo',
// 											name: 'serviceType1',
//											style: 'margin-left: 2px;',
//											mode: 'local',
//											width: 140,
//											triggerAction: 'all',
//											editable: false,
//											excludeFromSession: true,
//											displayField: 'name',
//											valueField: 'dataURI',
//											emptyText: 'Type',
//											store: TDS.data.empty 
// 										} 
//									]
//								},
								{
									xtype: 'panel',
									layout: 'table',
									style: 'padding: 0; margin-bottom: 4px;',
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 3
									},
									items: [
										{
											html: 'From:',
											width: Ext.isIE ? 110 : 115
										},
										{
											xtype: 'combo',
											name: 'countryFromCode',
											emptyText: 'Type a country...',
											excludeSubmit: true,
											tpl: TDS.util.Templates.ComboNoLabel,
											minChars: 1,
											enableKeyEvents: true,
											mode: 'local',
											width: 120,
											typeAhead: true,
											triggerAction: 'all',
											forceSelection: true,
											selectOnFocus: true,
											displayField: 'name',
											valueField: 'isoCode',
											store: TDS.data.getStore({
												dataURI: TDS.env.dataPath + 'countries/collection',
												identifier: 'countries',
												fields: ['name', 'isoCode']
											}),
											appendData: [{name: '', dataURI: ''}]
										},
										{
											xtype: 'locationcombo',
											name: 'locationFromURI',
											style: 'margin-left: 2px;',
											listeners: {
												beforesearch: function (sc) {
													var p = this.ownerCt;
													var countryField = p.items.itemAt(1);
													// check if the country has been selected
													if (countryField.getValue() == '') {
														countryField.markInvalid('Please select a country.');
														return false;
													}
													// set the search configuration object
													sc.searchURI = TDS.env.dataPath + 'country/' + countryField.getValue() + '/locations/collection';
													sc.searchIdentifier = 'country/' + countryField.getValue() + '/locations';
												}
											}
										}
									]
								},
								{
									xtype: 'datefield',
									name: 'dateFrom',
									fieldLabel: 'From/In Date',
									enableKeyEvents: true,
									width: 100,
									format: 'dMy',
									minValue: '01/01/06'
								},
								{
									xtype: 'panel',
									layout: 'table',
									style: 'padding: 0; margin-bottom: 4px;',
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 3
									},
									items: [
										{
											html: 'To:',
											width: Ext.isIE ? 110 : 115
										},
										{
											xtype: 'combo',
											name: 'countryToCode',
											emptyText: 'Type a country...',
											excludeSubmit: true,
											tpl: TDS.util.Templates.ComboNoLabel,
											minChars: 1,
											enableKeyEvents: true,
											mode: 'local',
											width: 120,
											typeAhead: true,
											triggerAction: 'all',
											forceSelection: true,
											selectOnFocus: true,
											displayField: 'name',
											valueField: 'isoCode',
											store: TDS.data.getStore({
												dataURI: TDS.env.dataPath + 'countries/collection',
												identifier: 'countries',
												fields: ['name', 'isoCode']
											}),
											appendData: [{name: '', dataURI: ''}]
										},
										{
											xtype: 'locationcombo',
											name: 'locationToURI',
											style: 'margin-left: 2px;',
											listeners: {
												beforesearch: function (sc) {
													var p = this.ownerCt;
													var countryField = p.items.itemAt(1);
													// check if the country has been selected
													if (countryField.getValue() == '') {
														countryField.markInvalid('Please select a country.');
														return false;
													}
													// set the search configuration object
													sc.searchURI = TDS.env.dataPath + 'country/' + countryField.getValue() + '/locations/collection';
													sc.searchIdentifier = 'country/' + countryField.getValue() + '/locations';
												}
											}
										}
									]
								},
								{
									xtype: 'panel',
									layout: 'table',
									style: 'padding: 0; margin-bottom: 4px;',
									border: false,
									hideBorders: true,
									layoutConfig: {
										columns: 5
									},
									items: [
									{
										html: 'To/Out Date:',
										width: Ext.isIE ? 110 : 115
									},{
										xtype: 'datefield',
										name: 'dateTo',
										fieldLabel: 'To/Out Date',
										enableKeyEvents: true,
										width: 100,
										format: 'dMy',
										minValue: '01/01/06'
									},{
										html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nights:',
										width: Ext.isIE ? 70 : 65
									},{
										xtype: 'numberfield',
										name: 'nights',
										enableKeyEvents: true,
										width: 50,
										listeners: {
											render: function(){
												var w = this. ownerCt.findParentByType('awesomewindow');

												var a =  w.aw.data.parameters;
												if(typeof a != 'undefined' && a != ""){
													var ro = Ext.util.JSON.decode(a);
													this.setValue(ro.nights);
												}
											}
										} 
									}  ]
								},
								{
									xtype: 'combo',
									fieldLabel: 'Status',
									name: 'status',
									mode: 'local',
									width: 100,
									triggerAction: 'all',
									editable: false,
									excludeFromSession: true,
									displayField: 'name',
									valueField: 'dataURI',
									emptyText: 'Status',
									store: TDS.data.componentStatusStore
								},
								{
									xtype: 'combo',
									forceSubmit: true,
									name: 'pricingPriceIsNett',
									mode: 'local',
									fieldLabel: 'Gross Or Nett',
									width: 60,
									triggerAction: 'all',
									editable: false,
									 value: 'false',
									store: [['false', 'Gross'], ['true', 'Nett']],
									updateInterface: function (isNett) {
										//debugger;
  										if (isNett == true || isNett == 'true') {
											this.ownerCt.items.itemAt(15).disable(true);
											this.ownerCt.items.itemAt(15).setValue(0);
											this.ownerCt.items.itemAt(16).disable(true);
											this.ownerCt.items.itemAt(16).setValue(0);
 										}
										else {
											this.ownerCt.items.itemAt(15).enable(true);
											this.ownerCt.items.itemAt(16).enable(true);
 										}
									},
									listeners: {
										select: function (c, r, i) {
											this.updateInterface(r.get('value'));
										},
										render: function () {
 											var w = this. ownerCt.findParentByType('awesomewindow');
											var a =  w.aw.data;
											this.setValue(a.pricingPriceIsNett);
											if(a.pricingPriceIsNett){
												this.updateInterface(true);
											}else{
												this.updateInterface(false);
											}
										}
									}
								}
								,{
									xtype: 'numberfield',
									fieldLabel: 'Price',
									name: 'pricingPriceBaseSell',
									enableKeyEvents: true,
									width: 70,
									listeners: {
										keyup: function () {
											var p = this.ownerCt;
											p.calculateCommission();
										}
									} 
								},
								{
									xtype: 'numberfield',
									fieldLabel: 'Tax',
									name: 'tax',
									enableKeyEvents: true,
									width: 70,
										listeners: {
											render: function(){
												var w = this. ownerCt.findParentByType('awesomewindow');

												var a =  w.aw.data.parameters;
												if(typeof a != 'undefined' && a != ""){
													var ro = Ext.util.JSON.decode(a);
													this.setValue(ro.baseTax);
												}
											}
										} 
								},
								{
									xtype: 'numberfield',
									fieldLabel: 'Optional',
									name: 'optional',
									enableKeyEvents: true,
									width: 70,
										listeners: {
											render: function(){
												var w = this. ownerCt.findParentByType('awesomewindow');

												var a =  w.aw.data.parameters;
												if(typeof a != 'undefined' && a != ""){
													var ro = Ext.util.JSON.decode(a);
													this.setValue(ro.baseOptional);
												}
											}
										} 
								},
								{
									xtype: 'numberfield',
									fieldLabel: 'Commission %',
									name: 'pricingPriceCommissionPercentage',
									enableKeyEvents: true,
									width: 70,
									listeners: {
										keyup: function () {
											var p = this.ownerCt;
											p.calculateCommission();
										},
										render: function () {
 											var w = this. ownerCt.findParentByType('awesomewindow');
											var a =  w.aw.data;
									 
											if(!a.pricingPriceIsNett){
												var result = (a.pricingPriceCommission * 100) /a.pricingPriceSell;
												if (!isNaN(result)) this.setValue(result.toFixed(2));

											}
										}
									}
								},
								{
									xtype: 'textfield',
									forceSubmit: true,
									name: 'pricingPriceCommission',
 									width: 40,
									hidden: true 
								}
							]
						}
					]
				},
				// notes tab
				{
					title: 'Notes',
					layout: 'fit',
					items: {
						xtype: 'htmleditor',
						name: 'description',
						height: 200,
						hideLabel: true,
						labelSeparator: '',
						anchor: '100%',
						enableLinks: false,
						enableLists: true,
						enableSourceEdit: false,
						enableFontSize: false,
						enableFont: false,
						enableColors: false,
						enableAlignments: false
					}
				}
			]
		}
	]
}




































































































































































































