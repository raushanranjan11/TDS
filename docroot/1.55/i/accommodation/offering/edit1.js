{

	xtype : 'form',
id:'dd',
	border : false,
	width : 540,
	layout : 'fit',
	beforeSubmit : function (jd) {
		// changes after putting the Links and Location tabs..
		/*var locations = [];
		var locationStore = this.items.itemAt(0).items.itemAt(5).items.itemAt(0).store.data.items;

		for(var i=0;i<locationStore.length;i++)
	{
		locations[i] = locationStore[i].data.dataURI;
		}
		jd.locationsJSON = locations;*/

		var hrefs = [];
		//var hrefsStore = this.items.itemAt(0).items.itemAt(6).items.itemAt(0).store.data.items;
		var hrefsStore = this.items.itemAt(0).items.itemAt(4).items.itemAt(0).store.data.items;//5

		for (var i = 0; i < hrefsStore.length; i++) {
			hrefs[i] = hrefsStore[i].data;
		}
		jd.hrefs = hrefs;
		// end of links and location changes..

		return jd;
	},
	items : [{

			xtype : 'tabpanel',

			activeTab : 0,

			layoutOnTabChange : true, // important

			height : 375, //300
			width : 650,

			defaults : {

				bodyStyle : 'padding: 6px 4px 6px 4px;'

			},

			items : [

				// details tab

				{

					title : 'Details',

					items : [
						{

							xtype : 'panel',

							layout : 'form',

							border : false,

							//labelWidth: 80,
							labelWidth : 140,

							defaults : {

								//style: 'padding: 2px 4px 2px 4px;'

							},

							items : [
								{

									xtype : 'textfield',

									name : 'name',

									fieldLabel : 'Name',

									bodyStyle : 'padding: 2px 4px 2px 4px;',

									width : 185

								},
								{

									xtype : 'textfield',

									name : 'codeSupplier',

									fieldLabel : 'Supplier code',

									bodyStyle : 'padding: 2px 4px 2px 4px;',

									width : 120

								},

								/*{
								xtype: 'panel',
								layout: 'table',
								style: 'padding: 0; margin-bottom: 4px;',
								border: false,
								hideBorders: true,
								layoutConfig: {
								columns: 4
								},
								items: [{
								html: 'Advertised rate:',
								width: Ext.isIE ? 88 : 85
								},{
								xtype: 'textfield',
								allowBlank: false,
								name: 'rackRatePriceSell',
								fieldLabel: 'Advertised rate',
								name: 'rackRatePriceSell',
								width: 60,
								},{
								html: ' ',
								width: Ext.isIE ? 12 : 12
								},{
								xtype: 'combo',
								forceSubmit: true,
								name: 'pricingPriceIsNett',
								mode: 'local',
								width: 60,
								triggerAction: 'all',
								editable: false,
								value: 'false',
								store: [['false', 'Gross'], ['true', 'Nett']],

								}]
								},*/

								{

									xtype : 'panel',

									layout : 'table',

									style : 'padding: 0; margin-bottom: 4px;',

									border : false,

									hideBorders : true,

									layoutConfig : {

										columns : 3

									},

									items : [
										{

											html : 'Location:',

											//width: Ext.isIE ? 88 : 85
											width : Ext.isIE ? 148 : 145

										},
										{

											xtype : 'combo',

											name : 'countryTo',

											emptyText : 'Type a country...',
											tpl : TDS.util.Templates.ComboNoLabel,
											excludeSubmit : true,

											minChars : 1,

											enableKeyEvents : true,

											mode : 'local',

											width : 120,

											typeAhead : true,

											triggerAction : 'all',

											forceSelection : true,

											selectOnFocus : true,

											displayField : 'name',

											valueField : 'isoCode',

											store : TDS.data.getStore({

												dataURI : TDS.env.dataPath + 'countries/collection',

												identifier : 'countries',

												fields : ['name', 'isoCode']

											}),
											appendData : [{
													name : '',
													dataURI : ''
												}
											]

										},
										{

											xtype : 'locationcombo',

											name : 'locationToURI',

											style : 'margin-left: 2px;',

											listeners : {

												beforesearch : function (sc) {

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

									xtype : 'combo',

									name : 'accommodationRatingURI',

									mode : 'local',

									fieldLabel : 'Rating',

									width : 140,

									triggerAction : 'all',

									editable : false,

									displayField : 'name',

									valueField : 'dataURI',

									store : TDS.data.getStore({

										dataURI : TDS.env.dataPath + 'accommodation/ratings/collection',

										identifier : 'accommodation/ratings',

										fields : ['name', 'dataURI']

									})

								},
								{

									xtype : 'combo',

									name : 'accommodationPropertyClassTypeURI',

									mode : 'local',

									fieldLabel : 'Property type',

									width : 180,

									triggerAction : 'all',

									editable : false,

									displayField : 'displayName',

									valueField : 'dataURI',

									store : TDS.data.getStore({

										dataURI : TDS.env.dataPath + 'accommodation/propertyclasstypes/collection',

										identifier : 'accommodation/propertyclasstypes',

										fields : ['name', 'displayName', 'dataURI']

									})

								},
								{

									xtype : 'combo',

									name : 'accommodationGroupURI',

									mode : 'local',

									fieldLabel : 'Group',

									width : 180,

									triggerAction : 'all',

									editable : false,

									displayField : 'name',

									valueField : 'dataURI',

									store : TDS.data.getStore({

										dataURI : TDS.env.dataPath + 'accommodation/groups/collection',

										identifier : 'accommodation/groups',

										fields : ['name', 'dataURI']

									})

								}, {
									xtype : 'checkbox',
									name : 'calcRatePerPerson',
									fieldLabel : 'Rate calculated per person'
								},
								//
								//								{
								//								xtype: 'panel',
								//								layout: 'table',
								//								//style: 'padding: 0; margin-bottom: 4px;',
								//								style: ' padding-left: 34px; ',
								//								border: false,
								//								hideBorders: true,
								//								layoutConfig: {
								//									columns: 6
								//								},
								//								items: [{
								//											style: ' padding-right: 25px; padding-left: 25px; ',
								//											xtype:'checkbox',
								//											//id:'che',
								//											name:'componentlink',
								//											checked:false,
								//											 listeners:{
								//												check:function( th, checked ){  //newValue, oldValue
								//													console.log(checked);
								//													if(checked){
								//													th.ownerCt.items.items[2].enable();
								//													th.ownerCt.items.items[4].enable();
								//													//e.ownerCt.ownerCt.items.items[8].enable();
								//													}else{
								//													th.ownerCt.items.items[2].disable();
								//													th.ownerCt.items.items[4].disable();
								//													//e.ownerCt.ownerCt.items.items[8].disable();
								//													}
								//												},
								//												 render:function( e ){
								//													//console.log(e.checked);
								//												if(!e.checked){
								//													e.ownerCt.items.items[2].disable();
								//													e.ownerCt.items.items[4].disable();
								//												//e.ownerCt.ownerCt.items.items[8].disable();
								//												}
								//												}
								//											}
								//										 },{
								//											 html:'Link',
								//											 style: ' padding-right: 10px; padding-left: 10px; ',
								//											},
								//										{
								//											xtype: 'combo',
								//											allowBlank: false,
								//											name: 'componentLinked',
								//											mode: 'local',
								//											displayField: 'displayData',
								//											valueField: 'valueData',
								//											width:120,
								//											store:new Ext.data.JsonStore({
								//												fields: ['valueData', 'displayData'],
								//												data:[ {"valueData" : 'Cruise', "displayData" : "Cruise"}, ]
								//											})
								//										},
								//										{
								//											html:'Departure Id',
								//											style: ' padding-right: 10px; padding-left: 10px; ',
								//										},
								//										{
								//											xtype: 'textfield',
								//											allowBlank: false,
								//											name: 'departureLinked',
								//											//mode: 'local',
								//											//fieldLabel: 'Departure Id',
								//											width:100
								//										}
								//									]
								//								},
								//								{
								//								xtype: 'panel',
								//								layout: 'table',
								// 							style: ' padding-left: 35px;padding-top:5px; ',
								//								border: false,
								//								hideBorders: true,
								//								layoutConfig: {
								//									columns: 3
								//								},
								//								items: [
								//
								//									{
								//									xtype: 'radio',
								//									name: 'flexi',
								//
								//									boxLabel: 'Set',
								//									inputValue: false,
								//									//checked: true,
								//								//	listeners: {
								//								listeners: {
								//										render: function(){
								//											var w = this. ownerCt.findParentByType('awesomewindow');
								//											var a =  w.aw.data;
								//
								//											 this.setValue(!a.flexi);
								//
								//										}
								//									}
								//										},
								//									{width:220},
								//											{
								//									xtype: 'radio',
								//									name: 'flexi',
								//
								//									boxLabel: 'Flexi',
								//									inputValue: true,
								//									//checked: true,
								//								listeners: {
								//										render: function(){
								//											console.log(this. ownerCt.findParentByType('awesomewindow').aw);
								//											var w = this. ownerCt.findParentByType('awesomewindow');
								//											var a =  w.aw.data;
								//
								//											this.setValue(a.flexi);
								//
								//										}
								//									}
								//										},
								//
								//
								//
								////									{
								////									xtype: 'radiogroup',
								////									columns: 2,
								////									padding: 50,
								////									//width:50,
								////									 items: [ {
								////											boxLabel: 'Set',
								////											name: 'rb',
								////											inputValue: '1',
								////											columnWidth: '500px',
								////											},
								////											{
								////												boxLabel: 'Flexi',
								////												name: 'rb',
								////												inputValue: '1' ,
								////											},
								////											]
								////									}
								//
								//												]
								//								}


								{
									html : "<hr>",
									border : false
								}, {
									xtype : 'panel',
									layout : 'table',
									//style: 'padding: 0; margin-bottom: 4px;',
									style : ' padding-left: 34px; padding-top:20px; ',
									border : false,
									hideBorders : true,
									layoutConfig : {
										columns : 8 //6
									},
									items : [{
											style : ' padding-right: 25px; padding-left: 25px; ',
											xtype : 'checkbox',
											id:'che',
											name : 'componentlink',
											checked : false,
											listeners : {
												check : function (th, checked) { //newValue, oldValue
												//	console.log(checked);
													if (checked) {
														th.ownerCt.items.items[2].enable();
														th.ownerCt.items.items[4].enable();
														th.ownerCt.items.items[6].enable();
														//e.ownerCt.ownerCt.items.items[8].enable();
													} else {
														th.ownerCt.items.items[2].readOnly=true;
														th.ownerCt.items.items[4].readOnly=true;
														th.ownerCt.items.items[6].readOnly=true;
														//e.ownerCt.ownerCt.items.items[8].disable();
														//th.ownerCt.items.items[4].originalValue=''
													//	th.ownerCt.items.items[4].setValue(' ');
													//	th.ownerCt.items.items[2].setValue('');
													}
												},
												render : function (e) {
												//	console.log(e.checked);
													if (!e.checked) {
														e.ownerCt.items.items[2].disable();
														e.ownerCt.items.items[4].disable();
														e.ownerCt.items.items[6].disable();
														
														//e.ownerCt.ownerCt.items.items[8].disable();
													}
												}
											}
										}, {
											html : 'Link',
											style : ' padding-right: 10px; padding-left: 10px; ',
										}, {
											xtype : 'combo',id:'fd',
											//allowBlank : false,
											name : 'componentLinked',
											mode : 'local',
											//displayField : 'name',
											//valueField : 'value',
											//width : 100,
												triggerAction: 'all',
										//	store : TDS.data.linkStore,
											mode : 'local',
											displayField : 'displayData',
											valueField : 'valueData',
											width : 100,
											store : new Ext.data.JsonStore({
												fields : ['valueData', 'displayData'],
												data : [{
														"valueData" : 'CRUISE',
														"displayData" : "CRUISE"
													},
														{
														"valueData" : 'Virgin',
														"displayData" : "Virgin"
													},]
											}),
														listeners : {
														select:function(){
															if(this.getValue() == "Virgin" ){
																 
															/*	*/this.findParentByType('form').getForm().findField('departureDate').disable()
																this.findParentByType('form').getForm().findField('cruiseCode').disable()
																this.findParentByType('form').getForm().findField('isLinkActive').disable()
																this.findParentByType('form').getForm().findField('inDate').disable()
																this.findParentByType('form').getForm().findField('outDate').disable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[0].disable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[1].disable()

																this.findParentByType('form').getForm().findField('departureDate').setValue("")
																this.findParentByType('form').getForm().findField('cruiseCode').setValue('')
																this.findParentByType('form').getForm().findField('isLinkActive').setValue(false)
																this.findParentByType('form').getForm().findField('inDate').setValue("")
																this.findParentByType('form').getForm().findField('outDate').setValue("")
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[0].setValue(false)
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[1].setValue(false)

																//this.findParentByType('form').getForm().findField('isPreHotel').disable()
															/*		this.getForm().findField('departureDate')
																this.getForm().findField('departureDate')

																*/
															}else{
																this.findParentByType('form').getForm().findField('departureDate').enable()
																this.findParentByType('form').getForm().findField('cruiseCode').enable()
																this.findParentByType('form').getForm().findField('isLinkActive').enable()
																this.findParentByType('form').getForm().findField('inDate').enable()
																this.findParentByType('form').getForm().findField('outDate').enable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[0].enable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[1].enable()
															
															}
														
														
														},
														focus:function(){
															console.log('@@@@@@@@@@');
															console.log(this.getRawValue());
															if(this.getValue() == "Virgin" ){
																 
															/*	*/this.findParentByType('form').getForm().findField('departureDate').disable()
																this.findParentByType('form').getForm().findField('cruiseCode').disable()
																this.findParentByType('form').getForm().findField('isLinkActive').disable()
																this.findParentByType('form').getForm().findField('inDate').disable()
																this.findParentByType('form').getForm().findField('outDate').disable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[0].disable()
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[1].disable()

																this.findParentByType('form').getForm().findField('departureDate').setValue("")
																this.findParentByType('form').getForm().findField('cruiseCode').setValue('')
																this.findParentByType('form').getForm().findField('isLinkActive').setValue(false)
																this.findParentByType('form').getForm().findField('inDate').setValue("")
																this.findParentByType('form').getForm().findField('outDate').setValue("")
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[0].setValue(false)
																this.findParentByType('tabpanel').items.itemAt(0).findByType('radio')[1].setValue(false)

															}
														
														
														}



													}
 
										},
											{
											html : 'Departure Date',
											style : ' padding-right: 10px; padding-left: 10px; ',
										},
										{
											xtype : 'datefield',
										//	allowBlank : false,
											name : 'departureDate',
											 format : 'dMy',
											width : 80,
 										}, 
											{
											html : 'Cruise No',
											style : ' padding-right: 5px; padding-left: 10px; ',
										}, {
											xtype : 'textfield',
										//	allowBlank : false,
											name : 'cruiseCode',
											 
											width : 100,
											}
									]
								},
										{
									xtype : 'panel',
									layout : 'table',
									style : ' padding-left: 34px;padding-top:5px; ',
									border : false,
									hideBorders : true,
									layoutConfig : {
										columns : 2
									},
									items : [
											{
											style : ' padding-right: 20px; padding-left: 30px; ',
											xtype : 'checkbox',
											//id:'che',
											//labelfield:'Link Publish Only',
											name : 'isLinkActive',
											checked : false,
											listeners : {
												check : function (th, checked) {}
											}
										},
											{
											
											html : 'Link Publish Only',
											style : ' padding-right: 10px;padding-left: 10px; ',// padding-left: 10px;
										},
											
									 
									]
								},
										{
									xtype : 'panel',
									layout : 'table',
									style : ' padding-left: 34px;padding-top:5px; ',
									border : false,itemId:'cd',
									hideBorders : true,
									layoutConfig : {
										columns : 6
									},
									items : [
											/*{
										//	style : ' padding-right: 20px; padding-left: 30px; ',
											xtype : 'checkbox',
											//id:'che',
											//labelfield:'Link Publish Only',
											name : 'isLinkActive',
											checked : false,
											listeners : {
												check : function (th, checked) {}
											}
										},
											{
											
											html : 'Link Publish Only',
											style : ' padding-right: 10px; ',// padding-left: 10px;
										},
											*/
											
										{
											//rowspan:5,
											xtype : 'radio',
												name : 'isPreHotel',

											boxLabel : 'Pre Hotel',
											inputValue : false,
											//checked: true
											listeners:{
											render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

															this.setValue(!a.isPreHotel);

														}
											}
										}, {
											width : 50
										}, {
											xtype : 'radio',
												name : 'isPreHotel',

											boxLabel : 'Post Hotel',
											inputValue : true,
											//checked: true
											listeners:{
											render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

															this.setValue(a.isPreHotel);

														}
											}
										}
										 
									]
								},
										
									{
									xtype : 'panel',
									layout : 'table',
									layoutConfig : {
										columns : 2
									},
									border : false,
									items : [
										/*	{
											xtype : 'panel',
											layout : 'table',
											style : ' padding-left: 35px;padding-top:5px; ',
											border : false,
											hideBorders : true,
											layoutConfig : {
												columns : 5
											},
											items : [{
													xtype : 'radio',
													name : 'flexi',

													boxLabel : 'Set',
													inputValue : false,
													listeners : {
														check : function (th, checked) {
															if (checked) {
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).enable();
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(3).enable();
															}
														}

													}
												}, {
													width : 50
												}, {
													xtype : 'radio',
													name : 'flexi',

													boxLabel : 'Flexi',
													inputValue : true,
													listeners : {
														check : function (th, checked) {
															if (checked) {
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).disable();
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(3).disable();
															}
														}
													}
												},

											]
										}, 
												*/
												{
											xtype : 'panel',
											layout : 'table',
											style : ' padding-left: 25px; padding-top: 5px;',
											border : false,
											hideBorders : true,
											layoutConfig : {
												columns : 4
											},
											items : [{
													html : "In Date ",
													style : " padding-left: 10px; padding-right: 10px;",
												}, {
													xtype : 'datefield',
													name:'inDate',
													width : 80,
													format : 'dMy',
												}, {
													html : "Out Date ",
													style : " padding-left: 10px; padding-right: 10px;",
												}, {
													xtype : 'datefield',
													//	fieldLabel:'In Date',
													width : 80,
													format : 'dMy',
															name:'outDate'
												}

											]
										}

									]
								},
								//								{
								//									html:"<hr>",
								//									border:false
								//								},

						/*		{
									xtype : 'panel',
									layout : 'table',
									layoutConfig : {
										columns : 2
									},
									border : false,
									items : [{
											xtype : 'panel',
											layout : 'table',
											style : ' padding-left: 35px;padding-top:5px; ',
											border : false,
											hideBorders : true,
											layoutConfig : {
												columns : 5
											},
											items : [{
													xtype : 'radio',
													name : 'flexi',

													boxLabel : 'Set',
													inputValue : false,
													listeners : {
														check : function (th, checked) {
															if (checked) {
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).enable();
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(3).enable();
															}
														},
														render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

															this.setValue(!a.flexi);

														}

													}
												}, {
													width : 50
												}, {
													xtype : 'radio',
													name : 'flexi',
													inputValue : true,
														id:'flexi',

													boxLabel : 'Flexi',
													listeners : {
														check : function (th, checked) {
															if (checked) {
																
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(3).setValue("  ");
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).setValue("  ");
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(1).disable();
																this.ownerCt.ownerCt.items.itemAt(1).items.itemAt(3).disable();
															}
														},
														render : function () {
															var w = this.ownerCt.findParentByType('awesomewindow');
															var a = w.aw.data;

															this.setValue(a.flexi);

														}
													}
												},

											]
										}, {
											xtype : 'panel',
											layout : 'table',
											style : ' padding-left: 50px; padding-top: 5px;',
											border : false,
											hideBorders : true,
											layoutConfig : {
												columns : 4
											},
											items : [{
													html : "In Date ",
													style : " padding-left: 10px; padding-right: 10px;",
												}, {
													xtype : 'datefield',
													//	fieldLabel:'In Date',
													name:'inDate',
													width : 80,
													format : 'dMy',
												}, {
													html : "Out Date ",
													style : " padding-left: 10px; padding-right: 10px;",
												}, {
													xtype : 'datefield',
													//	fieldLabel:'In Date',
													width : 80,
													format : 'dMy',
														name:'outDate'
												}

											]
										}

									]
								},
										*/

							]

						}

					]

				},

				// description tab

				{

					title : 'Description',

					layout : 'form',

					items : {

						xtype : 'htmleditor',

						name : 'description',

						height : 200,

						hideLabel : true,

						labelSeparator : '',

						anchor : '100%',

						enableLinks : false,

						enableLists : false,

						enableSourceEdit : false,

						enableFontSize : false,

						enableFont : false,

						enableColors : false,

						enableAlignments : false

					}

				},

				// facilities tab

				{

					title : 'Facilities',

					items : {

						xtype : 'grid',

						hideHeaders : true,

						height : 240,

						store : TDS.data.getStore({

							dataURI : TDS.env.dataPath + 'accommodation/amenities/collection',

							identifier : 'accommodation/amenities',

							fields : ['name', 'displayName', 'dataURI']

						}),

						viewConfig : {

							forceFit : true

						},

						getData : function () {

							var s = this.selModel.getSelections();

							var d = [];

							for (var i = 0; i < s.length; i++) {

								d[i] = s[i].get('dataURI');

							}

							return {
								destinationDataURI : this.destinationDataURI,
								data : d
							};

						},

						sm : new Ext.grid.CheckboxSelectionModel(),

						columns : [new Ext.grid.CheckboxSelectionModel(), {
								dataIndex : 'displayName',
								width : 200
							}
						],

						listeners : {

							render : function () {

								var w = this.ownerCt.findParentByType('awesomewindow');

								w.registerItem(this.id);

								this.destinationDataURI = TDS.env.dataPath + w.aw.sourceDataURI + '/amenities';

								this.getSelectedData();

							}

						}

					}

				},

				// notes tab

				{

					title : 'Notes',

					layout : 'form',

					items : {

						xtype : 'htmleditor',

						name : 'notes',

						height : 200,

						hideLabel : true,

						labelSeparator : '',

						anchor : '100%',

						enableLinks : false,

						enableLists : false,

						enableSourceEdit : false,

						enableFontSize : false,

						enableFont : false,

						enableColors : false,

						enableAlignments : false

					}

				},

				/*/
				 / terms and conditions tab
				{

					title : 'T & C',

					layout : 'form',

					items : {

						xtype : 'htmleditor',

						name : 'termsAndConditions',

						height : 200,

						hideLabel : true,

						labelSeparator : '',

						anchor : '100%',

						enableLinks : false,

						enableLists : true,

						enableSourceEdit : false,

						enableFontSize : false,

						enableFont : false,

						enableColors : false,

						enableAlignments : false

					}

				},  *  /

				// localisation tab

				{

					title : 'Localisation',

					layout : 'form',

					items : [
						{

							html : '<p>Name:</p>',

							style : 'margin-bottom: 2px;',

							border : false

						},
						{

							xtype : 'textfield',

							name : 'nameLocale',

							hideLabel : true,

							labelSeparator : '',

							anchor : '100%',

						},
						{

							html : '<p>Description:</p>',

							style : 'margin-bottom: 2px;',

							border : false

						},
						{

							xtype : 'htmleditor',

							name : 'descriptionLocale',

							height : 'auto',

							hideLabel : true,

							labelSeparator : '',

							anchor : '100%',

							enableLinks : false,

							enableLists : false,

							enableSourceEdit : false,

							enableFontSize : false,

							enableFont : false,

							enableColors : false,

							enableAlignments : false

						}

					]

				},
				/*{
				title: 'Locations---',
				hidden:true,
				layout: 'fit',
				getButtonAdd: function () {
				return this.getBottomToolbar().items.itemAt(4);
				},
				getButtonRemove: function () {
				return this.getBottomToolbar().items.itemAt(6);
				},
				getFieldCountry: function () {
				return this.getBottomToolbar().items.itemAt(0);
				},
				getFieldLocation: function () {
				return this.getBottomToolbar().items.itemAt(2);
				},
				getGrid: function () {
				return this.items.itemAt(0);
				},
				beforeSubmit: function (jd) {
				return this.getGrid().getData();
				},
				items: [{
				xtype: 'grid',
				//store: new Ext.data.CollectionStore({
				store: new Ext.data.JsonStore({
				url: '',
				id: 'dataURI',
				fields: ['dataURI', 'name', 'provinceName']
				}),
				sm: new Ext.grid.RowSelectionModel({
				singleSelect: true
				}),
				cm: new Ext.grid.ColumnModel([{dataIndex: 'name', renderer: function (v, metaData, record) {
				return record.get('name') + ', ' + record.get('provinceName');
				}}
				]),
				hideHeaders: true,
				viewConfig: {
				forceFit: true
				},
				toggleButtonRemove: function (enable) {
				var p = this.ownerCt;
				if (enable) p.getButtonRemove().enable();
				else p.getButtonRemove().disable();
				},
				enableButtonRemove: function () {
				this.toggleButtonRemove(true);
				},
				disableButtonRemove: function () {
				this.toggleButtonRemove(false);
				},
				getData: function () {
				var d = [];
				this.getStore().each(function (record) {
				d.push(record.get('dataURI'));
				}, this);
				return d;
				},
				listeners: {
				//beforerender: function () {
				render: function () {
				var w = this.ownerCt.findParentByType('awesomewindow');
				if (w) {
				var tp = this.ownerCt.ownerCt.ownerCt.ownerCt.initialConfig.sourceDataURI;
				tp+= "/locations";
				var querURL	= TDS.env.dataPath +tp +"/collection";

				Ext.Ajax.request({
				url: querURL,
				method: 'GET',
				callback: function returnAgents(o, s, r){
				// debugger;
				var ro = Ext.util.JSON.decode(r.responseText);
				var collection = ro[tp];

				if (typeof collection == 'undefined') return;

				var sd = [];

				for (var i = 0; i < collection.length; i++) {

				// munge the dataURI for this record into the record

				ro[collection[i]].dataURI = collection[i];

				sd.push(ro[collection[i]]);

				}
				// load the results into the store
				//var grid = this;
				var storeData = this .store;
				storeData.loadData(sd);
				},
				scope: this
				});
				// set the listeners on row select and deselect
				this.getSelectionModel().on('rowselect', this.enableButtonRemove, this);
				this.getSelectionModel().on('rowdeselect', this.disableButtonRemove, this);
				}
				}
				}
				}
				],
				bbar: [{
				xtype: 'combo',
				name: 'countryCode',
				emptyText: 'Type a country...',
				minChars: 1,
				tpl: TDS.util.Templates.ComboNoLabel,
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
				appendData: [{name: '', dataURI: ''}],
				listeners: {
				invalid: function (t, message) {
				var w = this.ownerCt.findParentByType('awesomewindow');
				w.showValidation(message);
				},
				valid: function (t) {
				var w = this.ownerCt.findParentByType('awesomewindow');
				w.clearValidation();
				}
				}
				},
				' ',{
				xtype: 'combo',
				name: 'nameLike',
				minChars: 3,
				forceSelection: true,
				store: new Ext.data.CollectionStore({
				url: '',
				fields: ['dataURI', 'name', 'provinceName']
				}),
				tpl: '<tpl for="."><div class="x-combo-list-item">{name}, <span style="font-style: italic; font-size: 10px; color: #999;">{provinceName}</span></div></tpl>',
				displayField: 'name',
				valueField: 'dataURI',
				queryParam: 'nameLike',
				queryDelay: 500,
				emptyText: 'Type a city name...',
				enableKeyEvents: true,
				width: 160,
				hideTrigger: true,
				getSelectedRecord: function () {
				return this.selectedRecord || -1;
				},
				listeners: {
				beforequery: function (qe) {
				var p = this.ownerCt.ownerCt;
				var w = this.ownerCt.findParentByType('awesomewindow');
				var countryCode = p.getFieldCountry().getValue();
				// check if the country has been selected
				if (countryCode == '') {
				p.getFieldCountry().markInvalid('Please select a country.');
				return false;
				}
				// override the store proxy URL and method
				var store = this.getStore();
				with (store) {
				proxy.conn.url = TDS.env.dataPath + 'country/' + countryCode + '/locations/collection';
				reader.meta.identifier = 'country/' + countryCode + '/locations?' + this.queryParam + '=' + qe.query;
				proxy.conn.method = 'GET';
				}
				},
				select: function (t, record, idx) {
				this.selectedRecord = record;
				var p = this.ownerCt.ownerCt;
				p.getButtonAdd().enable();
				}
				}
				},
				' ',{
				xtype: 'button',
				text: 'Add',
				disabled: true,
				handler: function () {
				var p = this.ownerCt.ownerCt;
				var record = p.getFieldLocation().getSelectedRecord();

				var existingRecord = p.getGrid().getStore().find('dataURI', record.get('dataURI'));
				// check the location doesnt already exist in the list, add it
				if (existingRecord == -1 && record != -1) p.getGrid().getStore().add(record);

				this.disable();
				}
				},
				' ',{
				xtype: 'button',
				text: 'Remove',
				disabled: true,
				handler: function () {
				var g = this.ownerCt.ownerCt.getGrid();
				var record = g.getSelectionModel().getSelected();
				if (record != -1) g.getStore().remove(record);
				this.disable();
				}
				}
				]

				},*/
				{

					title : 'Links',
					//layout: 'fit',
					layout : 'fit',
					items : {
						xtype : 'editorgrid',
						loadMask : {
							msg : ''
						},
						//height: 290,
						viewConfig : {
							forceFit : true
						},
						store : new Ext.data.JsonStore({
							url : '',
							pruneModifiedRecords : true,
							fields : ['dataURI', 'href', 'description']
						}),
						getData : function () {
							var s = this.getStore().getModifiedRecords();
							for (var i = 0, d = []; i < s.length; i++) {
								var rdu = s[i].get('dataURI');
								d.push({
									method : rdu ? 'PUT' : 'POST',
									destinationDataURI : rdu ? TDS.env.dataPath + rdu : this.baseDataURI,
									data : {
										href : s[i].get('href'),
										description : s[i].get('description')
									}
								});
							}
							return {
								data : d
							};
						},
						sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						}),
						cm : new Ext.grid.ColumnModel([{
									header : 'URL',
									dataIndex : 'href',
									editor : new Ext.form.TextField({
										allowBlank : false
									})
								}, {
									header : 'Description',
									dataIndex : 'description',
									editor : new Ext.form.TextField({
										allowBlank : false
									})
								}
							]),
						bbar : [{
								xtype : 'button',
								text : 'Add',
								tooltip : 'Click here to add a new link',
								handler : function () {
									var g = this.ownerCt.ownerCt;
									var s = g.getStore();
									s.add([new s.recordType({
												href : '',
												description : ''
											})]);
									g.startEditing(s.getCount() - 1, 0);
								}
							}, {
								xtype : 'button',
								text : 'Remove',
								tooltip : 'Select a link and click here to remove',
								handler : function () {
									var g = this.ownerCt.ownerCt;
									// display load mask
									g.loadMask.show();
									var record = g.selModel.getSelected();
									// check if this href has a dataURI set (already exists)
									if (record.get('dataURI')) {
										Ext.Ajax.request({
											method : 'DELETE',
											url : TDS.env.dataPath + record.get('dataURI'),
											callback : function (o, s, r) {
												// hide load mask
												g.loadMask.hide();
												if (s) {
													g.store.remove(record);
													return;
												}
												// TODO: handle errors?
											}
										});
									} else {
										g.loadMask.hide();
										g.store.remove(record);
									}
								}
							}
						],
						removeLink : function () {
							// request to remove
						},
						listeners : {
							beforerender : function () {
								var w = this.ownerCt.findParentByType('awesomewindow');
								if (w) {
									var tp = this.ownerCt.ownerCt.ownerCt.ownerCt.initialConfig.sourceDataURI;
									tp += "/hrefs";
									var querURL = TDS.env.dataPath + tp + "/collection";

								/*	Ext.Ajax.request({
										url : querURL,
										method : 'GET',
										callback : function returnAgents(o, s, r) {
											// debugger;
											var ro = Ext.util.JSON.decode(r.responseText);
											var collection = ro[tp];

											if (typeof collection == 'undefined')
												return;

											var sd = [];

											for (var i = 0; i < collection.length; i++) {

												// munge the dataURI for this record into the record

												ro[collection[i]].dataURI = collection[i];

												sd.push(ro[collection[i]]);

											}
											// load the results into the store
											//var grid = this;
											var storeData = this.store;
											storeData.loadData(sd);
										},
										scope : this
									});
										*/

								}
							}
						}
					}

				}

			],
		/**/		listeners:{
				afterlayout: function( me, layout ){
				//console.log(this.findParentByType('form')[0].getForm().findField('componentLinked').getValue());
				},
	render:function(){
		console.log(this.items.itemAt(0).title);
		if(this.items.itemAt(0).title  == "Details"){
		//console.log(this.findParentByType('form')[0].getForm().findField('componentLinked').getValue());
		}
	
	
	},
	tabchange : function (e, tab) {
							var me = this;
							var a = e.getActiveTab();
							console.log(a);
							if (e.items.indexOf(a) == 0) {
console.log(Ext.getCmp('fd').getRawValue());
							}

	},

		}
	}
	],
		listeners:{
	render:function(){
	console.log('&&&&&&&');
	
	}
	
	}/**/

}










 




 







































































