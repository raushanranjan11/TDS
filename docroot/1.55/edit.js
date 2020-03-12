{
	xtype: 'form',
	height:400,
	border: false,
	// map validation fields to field names
	fieldMap: {
		rateClass: 'rateClassURI',
		ratePer: 'ratePerURI',
		rateOccupancy: 'rateOccupancyURI',
		defaultMaxHoldTimeSeconds: ['defaultMaxHoldTimeHours', 'defaultMaxHoldTimeMinutes']
	},
	beforeSubmit: function (jd) {
//			if(Ext.getCmp('inside').getValue())
//			{
//			    jd.inside = true;
//			}
//			else
//			{
//			    jd.inside = false;
//			}
					var arrayPosition = [],arrayLocation = [],deckArray = [];

									Ext.getCmp('pan1').items.items.forEach(function(rec){

									if(rec.getValue()){

									arrayPosition.push(rec.boxLabel);

									}
									});
									jd.position = arrayPosition.toString();
									/*Ext.getCmp('pan2').items.items.forEach(function(rec){

									if(rec.getValue()){

									arrayLocation.push(rec.boxLabel);

									}
									});*/
									jd.locations = arrayLocation.toString();

									Ext.getCmp('pan3').items.items.forEach(function(rec){

									if(rec.getValue()){

									deckArray.push(rec.boxLabel);

									}
									});
									jd.deck = deckArray.toString();





		// construct the maximum hold time in seconds
		jd.defaultMaxHoldTimeSeconds = 0;
		if (typeof jd.defaultMaxHoldTimeHours === 'number') jd.defaultMaxHoldTimeSeconds += parseInt(jd.defaultMaxHoldTimeHours) * 60 * 60;
		if (typeof jd.defaultMaxHoldTimeMinutes === 'number') jd.defaultMaxHoldTimeSeconds += parseInt(jd.defaultMaxHoldTimeMinutes) * 60;
		if (isNaN(jd.defaultMaxHoldTimeSeconds) || jd.defaultMaxHoldTimeSeconds == 0) delete jd.defaultMaxHoldTimeSeconds;
		return jd;
	},
	beforeDataLoad: function (jd) {
		// calculate the maximum hold time
		var t = jd.defaultMaxHoldTimeSeconds;
		jd.defaultMaxHoldTimeHours = Math.floor(parseInt(jd.defaultMaxHoldTimeSeconds) / 60 / 60);
		if (jd.defaultMaxHoldTimeHours > 0) t -= jd.defaultMaxHoldTimeHours * 60 * 60;
		jd.defaultMaxHoldTimeMinutes = t / 60;
		// set the "rate available for agency" checkbox
		if (jd.agencyURI) jd.rateAvailableForAgencyOnly = true;
	/*	console.log('dddddddddd');
		console.log(jd);
		console.log(jd.deckList);
		*/
		return jd;
	},
	items: [{
		xtype: 'tabpanel',
		activeTab: 0,
		layoutOnTabChange: true, // important
		height:400,
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
							frame:true,
						border: false,
						labelWidth: 95,
						defaults: {
							//style: 'padding: 2px 4px 2px 4px;'
						},
						items: [
						{
							xtype: 'panel',
							style: 'padding-bottom: 4px;',
							border: false,
								//frame:true,
							layout: 'table',
							layoutConfig: { columns: 6 },
							defaults: { border: false },
							items: [
							{
								html: 'Category:',
								width: 80
							},
							{
								xtype: 'textfield',
								name: 'name',
								emptyText:'E!',
								width: 120 
 							},{width:20,
									border:false},
							{
								width:70,
								html:' Code :'
							},
							{
								xtype: 'textfield',
								name: 'code',
								width: 75
							} 
						  ]
						
						},
//						{
//							xtype: 'textfield',
//							fieldLabel: 'Category',
// 							emptyText:'E!',
//							name: 'name',//'category',
//							width: 210
//						}, 
//						{
//							xtype: 'textfield',
//							fieldLabel: 'Discription',
//							hidden:true,
// 							name: 'category',
//							width: 210
//						}, 
//						{
//							xtype: 'textfield',
//							fieldLabel: 'Code',
//							//name: 'discriptionType',
//							name: 'code',
//							width: 210
//						}, 
						/*{
							xtype: 'textfield',
							fieldLabel: 'Cabin type',
							//name: 'discriptionType',
							name: 'cabinTypeText',
							width: 210
						}, */
//						{
//								xtype: 'panel',
//								style: 'padding-bottom: 4px;',
//								border: false,
//								layout: 'table',
//								layoutConfig: { columns: 6 },
//								defaults: { border: false },
//								items: [
//									{
//									html: 'Deck:',
//									width: 100
//									},
//							{
//										xtype:'hidden',
//										//	id:'f',
//											name:'deckList'
//									
//									},
//										{
//									xtype: 'button',
//									text: 'Deck', //id:'decksss',
//										//name
//										handler: function () {
//											var decks = this.findParentByType('awesomewindow').getData('deckList');//this.ownerCt.items.itemAt(1).getValue();
//									/*	TDS.innerWindow.setWindow({
//														title: 'Decks',
//													height : 300,
//													width : 200,
//														interfaceURI: 'cruise/offering/rate/deckCategory.js',
//													//	sourceDataURI: 'hhhhhhh',
//														//destinationDataURI: dataURI,
//														data:{decks:decks},
//														buttonOK: 'Submit',
//														callback: {
//															fn: function () {
//																var ap = this.ownerCt.findParentByType('ajaxpanel');
//																var fs = this.ownerCt.findParentByType('fieldset');
//															//	ap.reloadData();
//															//	fs.getActivities();
//															},
//															scope: this
//														}
//													});
//													*/
//													new Ext.Window({
//																		height : 350,
//																		width : 550,
//																		closable : true,
//																		border : false,
//																		layout : 'fit',
//																			modal :true,
//																		/*	 loadMask: {
//																		msg: ''
//																		},
//																		 */
//																		items : [ 
//																			
//																		
//																		
//																		
//																		
//																		{
//	xtype : 'form',
//	height : 350,
//	border : false,
//	items : [{
//			xtype : 'panel',
//			height : 350,
//			layout : 'form',
//			//style : 'padding-left:20px;padding-top:10px;',
//			frame : true,
//			border : false,
//			items : [{
//					html : '<center><b><font size="3">Categeory :</font></b></center>',
//					border : false,
//
//				}, {
//					xtype : 'panel',
//					layout : 'table',
//					border : false,
//					height : 310,
//					width : 390,
//					frame : false,
//					layoutConfig : {
//						columns : 1
//					},
//					style : 'padding-left:20px;padding-top:5px;',
//					items : [{
//							html : '<b>Deck :</b></center>',
//							style : 'padding-left:80px;padding-top:25px;',
//							border : false,
//						}, {
//							xtype : 'panel',
//							style : 'padding-left:20px;padding-top:25px;padding-right:20px;',
//							height : 250,
//							witdh : 375,
//							autoScroll : true,
//							layout : 'auto',
//							border : false,
//							items : [{
//									width : 315,
//									border : false,
//										//id:'s'
//								}
//							],
//							listeners : {
//								render : function (me) {
//									//var decks = this.findParentByType('awesomewindow');//.getData('deckList');
//								/*	console.log(decks);
//									var json = [{
//											'check' : true,
//											'checkName' : '1',
//											'labelText' : 'Promenade'
//										}, {
//											'check' : true,
//											'checkName' : '2',
//											'labelText' : 'Upper'
//										}, {
//											'check' : true,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : true,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}, {
//											'check' : false,
//											'checkName' : 'CheckBox'
//										}
//									];
//									*/
//									Ext.each(decks, function (value) {
//										me.add({
//											xtype : 'panel',
//											border : false,
//											layout : 'table',
//											layoutConfig : {
//												columns : 3
//											},
//											items : [{
//													xtype : 'checkbox',
//													checked : value.check,
//													boxLabel : value.deck,
//												}, {
//													width : 50,
//													border : false
//												}, {
//													xtype : 'label',
//													text : value.labelText
//
//												}
//
//											]
//
//										});
//										//me.doLayout();
//
//									});
//
//								}
//
//							}
//						}
//
//					]
//
//				}
//
//			]
//
//		}
//
//	]
//
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		
//																		],
//																			buttons : [{
//																				text : 'Submit',
//																				//disabled : true,
//																				id:'but',
//																					handler:function(){
//																				var form = this.ownerCt.items.itemAt(0).getForm();
//																				if(form.isValid()){
//																					var formData = form.getValues();
//																					console.log(formData);
//																					this.ownerCt.hide();
//																				
//																				}
//																				
//																				}
//
//																			}, {
//																				text : 'Close',
//																				handler : function () {
//																					this.ownerCt.hide();
//																					//Mask.hide();
//																				}
//																			}
//																		]
//																	}).show();
//
//									}
//									},
//								/*	{
//										xtype: 'combo',
//										name: 'deck',
// 										excludeSubmit: true,
// 										minChars: 1,
//										enableKeyEvents: true,
//										mode: 'local',
//										width: 70,
//										typeAhead: true,
// 										excludeFromSession: true,
//										triggerAction: 'all',
//										forceSelection: true,
//										selectOnFocus: true,
//										displayField: 'text',
//										valueField: 'text',
//										store: TDS.data.cruiseDeckNew
//									},
//									{
//											width:7,
//											html:''
//									},
//									{
//										xtype: 'textfield',
//										name: 'deckDescription',
//										emptyText: 'Deck Description',
//										fieldLabel: 'Deck ',
//										width: 150
//									}
//										*/
//										]
//							},
//{
//							xtype: 'panel',
//							style: 'padding-bottom: 4px;',
//							border: true,
//							layout: 'table',
//								height:150,
//								//width:
//							layoutConfig: { columns: 3 },
//
//},



											{
							xtype: 'panel',
							style: 'padding-bottom: 4px;padding-top:10px;',
							border: false,
							layout: 'table',
								height:165,
								//width:
							layoutConfig: { columns: 3 },
							defaults: { border: true,
								//style:'padding:10px;'
							//	bodyStyle : 'padding-left:15px;',
								},
								items:[
												{
									xtype : 'label',
									text : 'Decks :',
										style : 'padding-left:25px;padding-top:20px;',
							},
										{
									xtype : 'label',
									text : 'Position :',
										style : 'padding-left:45px;padding-top:20px;',
							},
										{
										border:false
									//xtype : 'label',
									//text : 'Location :',
									//	style : 'padding-left:45px;padding-top:20px;',
							},
										{
									xtype : 'panel',id:'pan3',
									bodyStyle : 'padding-left:15px;',
									autoScroll : true,
									width : 105,
									height : 110,
									style : '    position: relative; bottom:0px;margin-left:10px; ',
									//	items : [],
									listeners : {
										/*render : function () {
											var data = ['Aft', 'Mid Ship', 'Forward'];
										},*/
											render:function(me){
												
												this.body.setStyle('background','white');
											//	===========================================================
											//console.log('@@@@@@@@@@@@@@@@@@@@');


											Ext.Ajax.request({
																url : TDS.env.dataPath + this.findParentByType('awesomewindow').getData('dataURI')+'/allDeck',
																method : 'GET',
																success : function (response, request) {
																	var ro = Ext.decode(response.responseText);
																	var collection = ro['allDeck'];
																	if (typeof collection == 'undefined')
																		return;
																	var sd = [];
																	for (var i = 0; i < collection.length; i++) {
																		ro[collection[i]].dataURI = collection[i];
																		sd.push(ro[collection[i]]);
																	}
																	//console.log('####################');
																	//console.log(sd);


																	sd.forEach(function (record) {
							//console.log(record.get('deck'));
																var checkbox = new Ext.form.Checkbox({
																		name : record.dataURI,
																		boxLabel : record.deck,
																		inputValue:record.deck
																	});
																me.add(checkbox);
																me.doLayout();
															});
																	//catGrid[0].getStore().loadData(sd);
																}
															});

															///------------------------------------------
											/*	var deckArray =  this.findParentByType('awesomewindow').getData('deck').split(',');

												 this.items.items.forEach(function(rec){
													 deckArray.forEach(function(locations){

														 if(rec.boxLabel == locations){
															 rec.setValue(true);

														 }

													 });
													 });
													 */
















											//	====================================================
												},
													afterlayout:function( me, layout ){
											//	console.log('%%%%%%%%%%%%%%%');
											//	console.log(me);
											//	console.log(layout);
												var deckArray =  this.findParentByType('awesomewindow').getData('deck').split(',');

												 this.items.items.forEach(function(rec){
													 deckArray.forEach(function(locations){

														 if(rec.boxLabel == locations){
															 rec.setValue(true);

														 }

													 });
													 });
												
												}
									}
								},


								{
									xtype : 'panel',id:'pan1',
									width : 135,
									bodyStyle : 'padding-left:10px;',
									height : 110,autoScroll:true,
									style : '    position: relative;  margin-left:20px; ',
									items : [{
											boxLabel : 'Aft',
											xtype : 'checkbox',
											//name:'position1',
												inputValue :'Aft',
										}, {
											boxLabel : 'Mid Ship',
											xtype : 'checkbox',
											//	name:'position2',
												inputValue :'Mid Ship',
										}, {
											boxLabel : 'Forward',
											xtype : 'checkbox',
											//	name:'position3',
												inputValue :'Forward',
										},
											{
											boxLabel : 'Mid Ship / Forward',
											xtype : 'checkbox',
											//	name:'position4',
												inputValue :'Mid Ship / Forward',
										},
											{
											boxLabel : 'Mid Ship / Aft',
											xtype : 'checkbox', 
											//	name:'position5',
												inputValue : 'Mid Ship / Aft',
										},
													{
											boxLabel : 'Mid Ship/ Forward',
											xtype : 'checkbox', 
											//	name:'position6',
												inputValue : 'Mid Ship/ Forward',
										},
												{
											boxLabel : 'Mid Ship/ Aft',
											xtype : 'checkbox', 
												//name:'position7',
												inputValue : 'Mid Ship/ Aft',
										}
									],
									listeners : {
									render:function(){
												 this.body.setStyle('background','white');

												var positionArray =  this.findParentByType('awesomewindow').getData('position').split(',');

												 this.items.items.forEach(function(rec){
													 positionArray.forEach(function(position){

														 if(rec.boxLabel == position){
															 rec.setValue(true);

														 }

													 });
												//if(rec.boxLabel){

												//locations.push(rec.getRawValue());

											//	}



											});




												}
									}

								},
								
								/*
								{
									xtype : 'panel',id:'pan2',
									bodyStyle : 'padding-left:25px;',
									width : 105,
									height : 110,
									style : '    position: relative; bottom:0px;margin-left:20px; ',
									items : [{
											boxLabel : 'Inside',
											xtype : 'checkbox',
											inputValue :'Inside',
										}, {
											boxLabel : 'Outside',
											xtype : 'checkbox',
												inputValue :'Outside',
										}, {
											boxLabel : 'Balcony',
											xtype : 'checkbox',
												inputValue :'Balcony',
										}, 
										/*	{
											boxLabel : 'Suite',
											xtype : 'checkbox'
										}, {
											boxLabel : 'Outside with Ocean View',
											xtype : 'checkbox'
										},
											////////////
											],
											listeners : {
												render:function(){
												this.body.setStyle('background','white');//locations
												var locationArray =  this.findParentByType('awesomewindow').getData('locations').split(',');

												 this.items.items.forEach(function(rec){
													 locationArray.forEach(function(locations){

														 if(rec.boxLabel == locations){
															 rec.setValue(true);

														 }

													 });
													 });



												}}
								},
									*/
									
							
							
							]



											},








						/*{
							xtype: 'textfield',
							fieldLabel: 'Position',
							//name: 'discriptionType',
							name: 'position',
							width: 210
						},
						{
							xtype: 'combo',
							name: 'position',
							excludeSubmit: true,
							minChars: 1,
							fieldLabel: 'Position',
							enableKeyEvents: true,
							mode: 'local',
							width: 70,
							typeAhead: true,
							excludeFromSession: true,
							triggerAction: 'all',
							forceSelection: true,
							selectOnFocus: true,
							displayField: 'text',
							valueField: 'text',
							store: TDS.data.cruisePositions
						},*/
						{
							/*xtype: 'combo',
							forceSubmit: true,
							fieldLabel: 'Pax Type',
							name: 'paxType',
							mode: 'local',
							width: 60,
							triggerAction: 'all',
							editable: false,
							//value: 'false',
							store: [] */

							xtype: 'combo',
								name: 'pax',
								fieldLabel: 'Pax ',
								mode: 'local',
								width: 70,
								triggerAction: 'all',
								editable: false,
								displayField: 'name',
								valueField: 'dataURI',
								tpl: TDS.util.Templates.ComboNoLabel,
								store : new Ext.data.SimpleStore({
														fields : [ 'name','dataURI'],
														data : [['1st Pax', '1'], ['2nd Pax', '2'], ['3rd Pax', '3'], ['4th Pax', '4'], ['5th Pax', '5'], ['6th Pax', '6']],//, ['Sold', 'Sold']]
													}),
						},
							/*	store: TDS.data.getStore({
									dataURI: TDS.env.dataPath + 'rate/classes/collection',
									identifier: 'rate/classes',
									fields: ['name', 'dataURI']
								})*.
 						},
								/*		{
										xtype: 'combo',
										name: 'ages',
											fieldLabel: 'Age',
 										excludeSubmit: true,
 										minChars: 1,
										enableKeyEvents: true,
										mode: 'local',
										width: 70,
										typeAhead: true,
 										excludeFromSession: true,
										triggerAction: 'all',
										forceSelection: true,
										selectOnFocus: true,
										displayField: 'text',
										valueField: 'text',
										store: TDS.data.ages
									},
						*/
					/*	{
								xtype: 'combo',
								name: 'rateClassURI',
								fieldLabel: 'Pax Type',
								mode: 'local',
								width: 110,
								triggerAction: 'all',
								editable: false,
								displayField: 'name',
								valueField: 'dataURI',
								tpl: TDS.util.Templates.ComboNoLabel,
								store: TDS.data.getStore({
									dataURI: TDS.env.dataPath + 'rate/classes/collection',
									identifier: 'rate/classes',
									fields: ['name', 'dataURI']
								}),
								listeners:{
										    select: function(combo, newValue, oldValue)
											{
												if(oldValue==2)
												{
													Ext.getCmp('ageBelowId').enable();
												}
												else
												{
													Ext.getCmp('ageBelowId').disable();
												}
												
											}
								  }
							},*/

				/*			{
								xtype: 'panel',
								style: 'padding-bottom: 4px;',
								border: false,
								layout: 'table',
								layoutConfig: { columns: 12 },
								defaults: { border: false },
								items: [
									{
									html: 'Pax Type:',
									width: 100
									},
									{
										xtype: 'combo',
										name: 'rateClassURI',
										fieldLabel: 'Pax Type',
										mode: 'local',
										width: 60,
										triggerAction: 'all',
										editable: false,
										displayField: 'name',
										valueField: 'dataURI',
										tpl: TDS.util.Templates.ComboNoLabel,
										store: TDS.data.getStore({
											dataURI: TDS.env.dataPath + 'rate/classes/collection',
											identifier: 'rate/classes',
											fields: ['name', 'dataURI']
										}),
										listeners:{
													select: function(combo, newValue, oldValue)
													{
														if(oldValue==2)
														{
															Ext.getCmp('ageBelowId').enable();
														}
														else
														{
															Ext.getCmp('ageBelowId').disable();
														}
														
													}
										  }
									},
									{
											width:5
											//html:'Age'
									},
									{
											width:27,
											html:' Min:'
									},
//									{
//										xtype: 'textfield',
//										name: 'age',
//										emptyText: 'age',
//										fieldLabel: 'Deck ',
//										width: 150
//									}
									{
										xtype: 'combo',
										name: 'ageBelow',
 										excludeSubmit: true,
 										minChars: 1,
										enableKeyEvents: true,
										mode: 'local',
										width: 70,
										typeAhead: true,
 										excludeFromSession: true,
										triggerAction: 'all',
										forceSelection: true,
										selectOnFocus: true,
										displayField: 'text',
										valueField: 'text',
										store: TDS.data.ages
									},{
											width:27,
											html:' Max:'
									},{
										xtype: 'combo',
										name: 'ages',
 										excludeSubmit: true,
 										minChars: 1,
										enableKeyEvents: true,
										mode: 'local',
										width: 70,
										typeAhead: true,
 										excludeFromSession: true,
										triggerAction: 'all',
										forceSelection: true,
										selectOnFocus: true,
										displayField: 'text',
										valueField: 'text',
										store: TDS.data.ages
									}]
							},
											*/
						/*{
							style: 'padding: 0px 3px 2px 0px;',
							xtype: 'omnicrementer',
							name: 'maximumOccupancy',
							fieldLabel: 'Max. in cabin',
							width: 60
						},*/
						{
							xtype: 'textfield',
							fieldLabel: 'Fare Code',
							name: 'priceCode',
							width: 60
						},
						{
							xtype: 'panel',
							style: 'padding: 0px 0px 4px 0px;',
							//hidden:true,
							border: false,
							layout: 'table',
							layoutConfig: { columns: 3 },
							defaults: { border: false },
							items: [
								 
								{
									xtype: 'checkbox',
									name: 'active',
									fieldLabel: 'Active',
									boxLabel: 'Active',
									inputValue: true,
									width:100
							},
 							{
									xtype: 'checkbox',
									name: 'special',
									fieldLabel: 'Special',
									boxLabel: 'Special',
									inputValue: 'true'
								}]
							},
							{
								xtype: 'panel',
								style: 'padding: 0;',
								border: false,
								style: 'padding: 0; margin-top: 4px;',
								layout: 'table',
								layoutConfig: { columns: 5 },
								defaults: { border: false },
								items: [
									{
										html: 'Inventory Max. hold time:',
										width: Ext.isIE ? 100 : 100
									},
									{
										xtype: 'omnicrementer',
										name: 'defaultMaxHoldTimeHours',
										maxValue: 23
									},
									{
										html: 'hours',
										bodyStyle: 'padding: 0 4px;'
									},
									{
										xtype: 'omnicrementer',
										name: 'defaultMaxHoldTimeMinutes',
										maxValue: 59
									},
									{
										html: 'minutes',
										bodyStyle: 'padding: 0 4px;'
									}
								]
							},
							{
								xtype: 'panel',
								style: 'padding: 0; margin-top: 4px;',
								border: false,
								//hidden:true,
								layout: 'table',
								layoutConfig: {
									columns: 3
								},
								defaults: {
									border: false
								},
								items: [
									{
										html: 'Cut-off time:',
										width: Ext.isIE ? 100 : 100 
									},
									{
										xtype: 'omnicrementer',
										name: 'defaultCutoffTimeDays',
										value: 0,
										forceSubmit: true,
										maxValue: 30
									},
									{
										html: 'days',
										bodyStyle: 'padding: 0 4px;'
									}
								]
							}
						]
					}
				]
			},
			// pricing tab
			{
				title: 'Pricing',
					//frame:true,
					items: [
					{
				xtype:'panel',
					layout:'auto',
					height:310,
					frame:true,
					//style:'padding:2px;',
					
					items:[
				//{
				//title: 'Pricing',
					//frame:true,
			//	items: {
						{
					xtype: 'pricepanel'
						}
				//}
			//},
				]
					}
				]
			},
			// closed user group tab
			{
				title: 'CUG',
					items: [
					{
				xtype:'panel',
					layout:'auto',
					height:310,
					frame:true,

				items:[ {
					xtype: 'panel',
						//frame:true,
					layout: 'table',
					border: false,
					hideBorders: true,
					showLoadMask: false,
					layoutConfig: {
						columns: 5
					},
					initAgency: function () {
						var agencyURI = this.getAgencyURIField().getValue();
						if (agencyURI) {
							this.showLoadMask = true;
							this.lookupAgencyByURI(agencyURI);
						}
					},
					lookupAgencyByURI: function (agencyURI) {
						this.lookupAgency(false, agencyURI);
					},
					lookupAgencyByAgencyArenaCode: function (agencyArenaCode) {
						this.lookupAgency(agencyArenaCode, false);
					},
					lookupAgency: function (agencyArenaCode, agencyURI) {
						// display loading mask
						if (this.showLoadMask) this.el.mask('', 'x-mask-loading');
						// query parameters
						var params = {};
						if (agencyArenaCode) params['agencyArenaCode'] = agencyArenaCode;
						if (agencyURI) params['agencyURI'] = agencyURI;
						// request agency lookup
						Ext.Ajax.request({
							url: TDS.env.dataPath + 'search/agencies/collection',
							disableCaching: false,
							method: 'GET',
							params: params,
							callback: function (o, s, r) {
								// hide loading mask
								if (this.showLoadMask) {
									this.showLoadMask = false;
									this.el.unmask();
								}
								this.getLookupButton().enable();
								if (s) {
									try {
										var ro = Ext.decode(r.responseText);
										var agencyURI = ro['search/agencies?' + Ext.urlEncode(params)][0];
										// check if an agencyURI exists, else display error
										if (!agencyURI) {
											this.setAgencyLabel('No agent found.');
											return;
										}
										this.setAgencyLabel(ro[agencyURI]['name']);
										this.setAgencyArenaCodeField(ro[agencyURI]['agencyArenaCode']);
										this.setAgencyAddressLabel(ro[agencyURI]['addressString']);
										this.setAgencyURIField(agencyURI);
									} catch (e) {}
								}
								else this.setAgencyLabel('<span style="color: red;">Unknown error occured.</span>');
							},
							scope: this
						});
					},
					getLookupButton: function () {
						return this.items.itemAt(5);
					},
					getRateAvailableForAgencyField: function () {
						return this.items.itemAt(0);
					},
					getAgencyURIField: function () {
						return this.items.itemAt(7);
					},
					getAgencyArenaCodeField: function () {
						return this.items.itemAt(4);
					},
					setAgencyArenaCodeField: function (agencyArenaCode) {
						this.getAgencyArenaCodeField().setValue(agencyArenaCode);
					},
					setAgencyURIField: function (agencyURI) {
						this.getAgencyURIField().setValue(agencyURI);
					},
					setAgencyLabel: function (agency) {
						this.items.itemAt(9).setText(agency);
					},
					setAgencyAddressLabel: function (address) {
						this.items.itemAt(11).setText('<span style="font-size: 9px; color: #999;">' + address + '</span>');
					},
					clearAllFields: function () {
						this.setAgencyLabel('');
						this.setAgencyAddressLabel('');
						this.setAgencyURIField('');
					},
					items: [
						{
							xtype: 'checkbox',
							name: 'rateAvailableForAgencyOnly',
							forceSubmit: true,
							width: 20
						},
						{
							colspan: 4,
							html: 'Rate is only available to specific agent only.',
							width: 320
						},

						{
							/* spacer */
							width: 20
						},
						{
							html: 'Agent code:',
							width: 80
						},
						{
							xtype: 'textfield',
							name: 'agencyArenaCode',
							width: 60
						},
						{
							xtype: 'button',
							text: 'Lookup',
							width: 60,
							handler: function () {
								var p = this.ownerCt;
								this.disable();
								p.clearAllFields();
								p.setAgencyLabel('Lookup in progress...');
								p.lookupAgencyByAgencyArenaCode(p.getAgencyArenaCodeField().getValue());
							}
						},
						{
							/* spacer */
							width: 120
						},
						{
							xtype: 'hidden',
							name: 'agencyURI',
							forceSubmit: true,
							width: 20
						},
						{
							html: 'Agent:',
							width: 80,
						},
						{
							colspan: 3,
							xtype: 'labelpanel',
							html: 'Not set',
							width: 240
						},

						{
							/* spacer */
							colspan: 2,
							width: 100
						},
						{
							colspan: 3,
							xtype: 'labelpanel',
							width: 240
						}
					],
					listeners: {
						render: function () {
							this.initAgency();
						}
					}
				},{ 
					html: '<div><center></br></br><b><u>Closed User Groups</u></center></b></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This function is only used when you are offering<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;special rates to a selected travel agent or agency <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;group</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A separate has to be established for this purpose.</div>',
					width: 320,
					border:false
				}]
					}]
			},
			// terms and conditions tab
			{
				//title: 'Notes',
				title: 'Category',
					items: [
					{
				xtype:'panel',
					layout:'auto',
					height:310,
					frame:true,
				
				//layout: 'fit',
				//bodyStyle: 'padding: 0px 0px 0px 0px;',
				items: {
					xtype: 'htmleditor',
					name: 'restrictions',
					height: 250,
					hideLabel: true,
					labelSeparator: '',
					anchor: '100%',
					enableLinks: false,
					enableLists: false,
					enableSourceEdit: false,
					enableFontSize: false,
					enableFont: false,
					enableColors: false,
					enableAlignments: false
				}
					}]
			}
		]
	}]
}  




























































































































































































