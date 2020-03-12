{
	xtype : 'form',
 	border : false,
	width : 750,
	markDataDirtyOnLoad : true,
	beforeSubmit : function (jd) {
		//debugger;
		var cruise  = this.getForm().findField('cruiseCompany').getValue();
		var destination  = this.getForm().findField('destination').getValue();
		if(Ext.isEmpty(cruise)){
		this.items.itemAt(0).setActiveTab(0);
		}else if(Ext.isEmpty(destination)){
		this.items.itemAt(0).setActiveTab(0);
		}
		var g = this.items.itemAt(0).items.itemAt(5).items.itemAt(0).items.itemAt(0).items.itemAt(0);
		var data = g.getStore().data.items;

		var storeLength = g.getStore().data.length;
		var portsArray = [];
		for (var i = 0; i < storeLength; i++) {
			portsArray[i] = data[i].data;
		}
		jd.ports = portsArray;

		return jd;
	},
	beforeDataLoad : function (d, aw) {
		var supplierData = aw.getRequiredData('supplier');
		d['termsAndConditions'] = supplierData.data['defaultOfferingTermsAndConditions'];
		return d;
	},
	items : [{
			xtype : 'tabpanel',
			activeTab : 0,
 			layoutOnTabChange : true,
			height : 500,
			defaults : {
				bodyStyle : 'padding: 6px 4px 6px 4px;'
			},
			items : [
				{
					title : 'General Info', //'Description',
					layout : 'fit',
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
				// activity tab
				{
					title : 'Included', //'Activity',
					layout : 'fit',
					items : {
						xtype : 'htmleditor',
						name : 'descIncluded',
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
				// details tab
				{
					title : 'Details',
					items : [{
							xtype : 'panel',
							layout : 'form',
							border : false,
							labelWidth : 90,
							defaults : {
								style : 'padding: 2px 4px 2px 4px;'
							},
							items : [{
									xtype : 'textfield',
									allowBlank : false,
									name : 'cruiseCompany',
									//fieldLabel: 'Name',
									fieldLabel : 'Cruise Company ',
									bodyStyle : 'padding: 2px 4px 2px 4px;',
									width : 185
								}, {
									xtype : 'textfield',
									allowBlank : false,
									name : 'shipName',
									//fieldLabel: 'Name',
									fieldLabel : 'Ship',
									bodyStyle : 'padding: 2px 4px 2px 4px;',
									width : 185
								}, {
									xtype : 'textfield',
									allowBlank : false,
									name : 'name',
									//fieldLabel: 'Name',
									fieldLabel : 'Cruise Name',
									bodyStyle : 'padding: 2px 4px 2px 4px;',
									width : 185
								}, {
									xtype : 'textfield',
									name : 'codeSupplier',
									allowBlank : false,
									fieldLabel : 'Voyage No',
									//fieldLabel: 'Cruise Code',
									bodyStyle : 'padding: 2px 4px 2px 4px;',
									width : 120
								}, {
									xtype : 'panel',
									layout : 'table',
									style : 'padding: 0; margin-bottom: 4px; ',
									border : false,
									hideBorders : true,
									layoutConfig : {
										columns : 6
									},
									items : [{
											html : 'Interior:',
											width : Ext.isIE ? 98 : 95
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'rackRatePriceSell',
											fieldLabel : 'Advertised rate',
											name : 'rackRatePriceSell',
											width : 60,
										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										}, {
											xtype : 'combo',
											forceSubmit : true,
											name : 'pricingPriceIsNett',
											mode : 'local',
											width : 60,
											triggerAction : 'all',
											editable : false,
											value : 'false',
											store : [['false', 'Gross'], ['true', 'Nett']],

										},{
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										},{
											xtype : 'textfield',
											name : 'interior',
										}, {
											html : 'Ocean View:',
											width : Ext.isIE ? 98 : 95
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'rackRatePriceSell2',
											fieldLabel : 'Advertised rate',
											name : 'rackRatePriceSell',
											width : 60,
										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										}, {
											xtype : 'combo',
											forceSubmit : true,
											name : 'pricingPriceIsNett2',
											mode : 'local',
											width : 60,
											triggerAction : 'all',
											editable : false,
											value : 'false',
											store : [['false', 'Gross'], ['true', 'Nett']],

										},{
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										},{
											xtype : 'textfield',
											name : 'ocean',
										}, {
											html : 'Balcony:',
											width : Ext.isIE ? 98 : 95
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'rackRatePriceSell3',
											fieldLabel : 'Advertised rate',
											name : 'rackRatePriceSell',
											width : 60,
										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										}, {
											xtype : 'combo',
											forceSubmit : true,
											name : 'pricingPriceIsNett3',
											mode : 'local',
											width : 60,
											triggerAction : 'all',
											editable : false,
											value : 'false',
											store : [['false', 'Gross'], ['true', 'Nett']],

										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										},{
											xtype : 'textfield',
											name : 'balcony',
										},{
											html : 'Special:',
											width : Ext.isIE ? 98 : 95
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'rackRatePriceSell4',
											fieldLabel : 'Advertised rate',
											name : 'rackRatePriceSell',
											width : 60,
										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										}, {
											xtype : 'combo',
											forceSubmit : true,
											name : 'pricingPriceIsNett4',
											mode : 'local',
											width : 60,
											triggerAction : 'all',
											editable : false,
											value : 'false',
											store : [['false', 'Gross'], ['true', 'Nett']],

										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										},{
											xtype : 'textfield',
											name : 'special',
										},{
											html : 'Suite:',
											width : Ext.isIE ? 98 : 95
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'rackRatePriceSell5',
											fieldLabel : 'Advertised rate',
											name : 'rackRatePriceSell',
											width : 60,
										}, {
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										}, {
											xtype : 'combo',
											forceSubmit : true,
											name : 'pricingPriceIsNett5',
											mode : 'local',
											width : 60,
											triggerAction : 'all',
											editable : false,
											value : 'false',
											store : [['false', 'Gross'], ['true', 'Nett']],

										},{
											html : ' ',
											height : 30,
											width : Ext.isIE ? 12 : 12
										},{
											xtype : 'textfield',
											name : 'suite',
										}
									]
								},
								//							{
								//								xtype: 'textfield',
								//								name: 'shipName',
								//								allowBlank: false,
								//								fieldLabel: 'Ship',
								//								bodyStyle: 'padding: 2px 4px 2px 4px;',
								//								width: 120
								//							},
								{
									xtype : 'combo',
									store : TDS.data.destination,
									name : 'destination',
									fieldLabel : 'Destination',
									width : 150,
									editable : false,
									forceSelection : true,
									mode : 'local',
									triggerAction : 'all',
									displayField : 'text',
									valueField : 'text',
									value : '',
									tpl:'<tpl for="."><div class="x-combo-list-item"> {text}&nbsp;</div></tpl>',
								}, {
									xtype : 'panel',
									layout : 'table',
									style : 'padding: 0; margin-bottom: 4px;',
									border : false,
									hideBorders : true,
									layoutConfig : {
										columns : 6
									},
									items : [{
											html : 'Departure city:',
											width : Ext.isIE ? 90 : 95
										}, {
											xtype : 'combo',
											allowBlank : false,
											name : 'fromCountryURI',
											emptyText : 'Type a country...',
											excludeSubmit : true,
											tpl : TDS.util.Templates.ComboNoLabel,
											minChars : 1,
											enableKeyEvents : true,
											mode : 'local',
											width : 110,
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
										}, {
											xtype : 'locationcombo',
											allowBlank : false,
											name : 'locationFromURI',
											width : 100,
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
										}, {
											html : '',
											width : Ext.isIE ? 10 : 5
										}, {
											html : 'Day/Date:',
											width : Ext.isIE ? 60 : 55
										}, {
											xtype : 'datefield',
											allowBlank : false,
											name : 'departureDate',
											fieldLabel : 'Day/Date',
											bodyStyle : 'padding: 2px 4px 2px 4px;',
											enableKeyEvents : true,
											showToday : false,
											width : 100,
											format : 'dMy D',
											minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}
										//									{
										//										xtype: 'textfield',
										//										allowBlank: false,
										//										name: 'departureTime',
										//										fieldLabel: 'Departure time',
										//										emptyText: 'e.g. 1845',
										//										bodyStyle: 'padding: 2px 4px 2px 4px;',
										//										width: 60
										//									}

									]
								}, {
									xtype : 'panel',
									layout : 'table',
									style : 'padding: 0; margin-bottom: 4px;',
									border : false,
									hideBorders : true,
									layoutConfig : {
										columns : 6
									},
									items : [{
											html : 'Return City:',
											width : Ext.isIE ? 90 : 95
										}, {
											xtype : 'combo',
											allowBlank : false,
											name : 'toCountryURI',
											emptyText : 'Type a country...',
											excludeSubmit : true,
											tpl : TDS.util.Templates.ComboNoLabel,
											minChars : 1,
											enableKeyEvents : true,
											mode : 'local',
											width : 110,
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
										}, {
											xtype : 'locationcombo',
											allowBlank : false,
											name : 'locationToURI',
											width : 100,
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
										}, {
											html : '',
											width : Ext.isIE ? 10 : 5
										}, {
											html : 'Day/Date:',
											width : Ext.isIE ? 60 : 55
										}, {
											xtype : 'datefield',
											allowBlank : false,
											name : 'arrivalDate',
											fieldLabel : 'Day/Date',
											bodyStyle : 'padding: 2px 4px 2px 4px;',
											enableKeyEvents : true,
											showToday : false,
											width : 100,
											format : 'dMy D',
											minValue : Ext.TimerMgr.getServerCalculatedDate().clearTime()
										}
										//									{
										//										xtype: 'textfield',
										//										allowBlank: false,
										//										name: 'arrivalTime',
										//										fieldLabel: 'arrival time',
										//										emptyText: 'e.g. 1845',
										//										bodyStyle: 'padding: 2px 4px 2px 4px;',
										//										width: 60
										//									}
									]
								}, {
									xtype : 'textfield',
									name : 'duration',
									allowBlank : false,
									fieldLabel : 'Duration',
									bodyStyle : 'padding: 2px 4px 2px 4px;',
									width : 110
								}
								/*,{
								xtype: 'combo',
								name: 'cruiseClassURI',
								mode: 'local',
								fieldLabel: 'Class',
								width: 80,
								triggerAction: 'all',
								editable: false,
								displayField: 'name',
								valueField: 'dataURI',
								tpl: TDS.util.Templates.ComboNoLabel,
								store: TDS.data.getStore({
								dataURI: TDS.env.dataPath + 'cruise/classes/collection',
								identifier: 'cruise/classes',
								fields: ['name', 'dataURI']
								})
								}*/
							]
						}
					]
				},
				// description tab
				
				// notes tab
				{
					title : 'Ship Info', //'Notes',
					layout : 'table',
					layoutConfig : {
						columns : 2 // columnWidth: .6
					},
					defaults : {
						// applied to each contained panel
						bodyStyle : 'padding:10px'
					},
					autoScroll : true,

					items : [{

							xtype : 'panel',
							border : false,
							items : [{

									width : 350,
									height : 150,
									border : true,
									autoScroll : true,
									id : 'shipInfo',
									html : 'shipInfoImage',
									listeners : {
										render : function () {
											debugger;
											var grap_image_path = "";
											var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var graphicImagePath = aw.aw.data.shipInfoGraphicImgPath;

											if (typeof graphicImagePath == 'undefined') {
												graphicImagePath = '';
											}

											var imageHotusa = graphicImagePath.substring(0, 4);

											//if(imageHotusa=='http'){
											if (Ext.isEmpty(imageHotusa)) {

												this.html = '<center><img border="0"   id="shipInfoImageId" name="shipInfoImage"   alt="shipInfoImage"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
											} else {

												grap_image_path = "../" + graphicImagePath;
												this.html = '<center><img border="0"   id="shipInfoImageId" name="shipInfoImage" src=' + grap_image_path + ' alt="shipInfoImage"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
											}
										}

									}

								},
								{
									xtype : 'panel',
									border : false,
									layout : 'table',
									style : 'padding: 20px 00px 0px 0px; ',
									column : 3,
									items : [{
											xtype : 'textfield',
											id : 'shipInfoImageValue',
											hidden : true,
											name : 'shipInfoGraphicImgPath',
										},
										{
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="shipInfofileUpLoads"type="file"  /></td></form>',
											width : 165,
											style : 'padding: 0px 10px 0px 0px; ',
										},
										{
											xtype : 'button',
											text : 'Upload',
											style : 'padding: 0px 50px 0px 15px;',
											handler : function (btn) {
												debugger;
												Ext.getCmp('shipInfo').html = '<img border="0" id="shipInfoImageId" name="shipInfoImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var im = document.getElementById('shipInfofileUpLoads').value
													var file = document.getElementById('shipInfofileUpLoads').files[0];
												if (file) {
													var fileSize = 0;

													uploadFile();
												}

												function uploadFile() {
													var fd = new FormData();
													fd.append("image", file);
													var xhr = new XMLHttpRequest();
													xhr.upload.addEventListener("progress", uploadProgress, false);
													xhr.addEventListener("load", uploadComplete, false);
													xhr.addEventListener("error", uploadFailed, false);
													xhr.addEventListener("abort", uploadCanceled, false);
													xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp('shipInfoImageValue').getValue() + "&imageStorePath=" + sourceDataURI);
													xhr.send(fd);

													xhr.onreadystatechange = function () {
														if (xhr.readyState == 4) { // debugger;
															var hdrs = xhr.getAllResponseHeaders();
															var resp = xhr.responseText;
															var dataURI = sourceDataURI;

															var imageNameNew = "GraphicsImg/" + resp;

															//Ext.getCmp('cabinPanel').show();
															document.getElementById('imageName').value = imageNameNew;
															Ext.getCmp('shipInfoImageValue').setValue(imageNameNew);
															document.images['shipInfoImage'].src = "../" + imageNameNew;
															document.getElementById('imageName').value = imageNameNew;

														}
													}

												}

												function uploadProgress(evt) {}

												function uploadComplete(evt) {}

												function uploadFailed(evt) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.");
												}

												function uploadCanceled(evt) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
												}

											}
										}, {
											xtype : 'button',
											text : 'Delete',
											style : 'border="0";',
											handler : function (btn) {
												document.images['shipInfoImage'].src = "";
												document.getElementById('shipInfoImageValue').value = '';
												Ext.getCmp('gip').setValue('');

											}
										},
									]
								}
							]
						}, {
							xtype : 'htmleditor',
							name : 'notes',
							height : 400,
							width : 350,
							hideLabel : true,
							labelSeparator : '',
							anchor : '100%',
							enableLinks : false,
							enableLists : false,
							enableSourceEdit : false,
							enableFontSize : false,
							enableFont : false,
							enableColors : false,
							enableAlignments : false,
							style : 'padding: 20px 00px 0px 0px; ',
						}
					]
				},
				{
					title : 'Deck Plan', //'Localisation',
					layout : 'table',
					layoutConfig : {
						columns : 2
					},

					items : [{
							width : 350,
							height : 150,
							border : true,
							autoScroll : true,
							id : 'ship',
							html : 'cabinImage',
							listeners : {
								render : function () {
									debugger;
									var grap_image_path = "";
									var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
									var graphicImagePath = aw.aw.data.shipGraphicImgPath;

									if (typeof graphicImagePath == 'undefined') {
										graphicImagePath = '';
									}

									var imageHotusa = graphicImagePath.substring(0, 4);

									//if(imageHotusa=='http'){
									if (Ext.isEmpty(imageHotusa)) {

										this.html = '<center><img border="0" max-width="100%" max-height = "100%" id="shipImageId" name="shipImage"   alt="shipImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
									} else {

										grap_image_path = "../" + graphicImagePath;
										this.html = '<center><img border="0"  max-width="100%" max-height = "100%" id="shipImageId" name="shipImage" src=' + grap_image_path + '  alt="shipImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
									}
								}

							}

						}, {
							autoScroll : true,
							id : 'deck',
							html : 'deckImage',
							style : '  padding-left:10px; ',
							border : true,
							width : 350,
							height : 425,
							rowspan : 5,
							listeners : {
								render : function () {
									debugger;
									var grap_image_path = "";
									var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
									var graphicImagePath = aw.aw.data.deckGraphicImgPath;

									if (typeof graphicImagePath == 'undefined') {
										graphicImagePath = '';
									}

									var imageHotusa = graphicImagePath.substring(0, 4);

									//if(imageHotusa=='http'){
									if (Ext.isEmpty(imageHotusa)) {

										this.html = '<center><img border="0" id="deckImageId" name="deckImage"   alt="deckImage" ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
									} else {

										grap_image_path = "../" + graphicImagePath;
										this.html = '<center><img border="0"  id="deckImageId" name="deckImage" src=' + grap_image_path + '  alt="deckImage"></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
									}
								}

							}

						}, {
							xtype : 'label',
							html : '<b><u>Ship Decks</u></b>'
						},
						{
							xtype : 'panel',
							//title:'panel',
							border : false,
							layout : 'table',
							column : 4,
							items : [{
									html : 'Browse',
									border : false,
								},
								{
									html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border=false;"><td width= "75"><input width= "75" name="fileUpLoad" id="shipUpLoads"type="file"  /></td></form>',
									width : 185,
									style : 'padding: 0px 15px 0px 10px; ',
								}, {
									xtype : 'textfield',
									id : 'shipImageValue',
									hidden : true,
									name : 'shipGraphicImgPath',
								},
								{
									xtype : 'button',
									text : 'Upload',
									style : 'padding: 0px 00px 0px 10px; ',
									handler : function (btn) {
										debugger;
										//document.images['image1'].src = "";
										Ext.getCmp('ship').html = '<img border="0" id="shipImageId" name="shipImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
										var w = this.ownerCt.findParentByType('awesomewindow');
										var sourceDataURI = w.aw.postDataURI;
										//var sourceDataURI = w.aw.data.supplierURI;
										var im = document.getElementById('shipUpLoads').value
											var file = document.getElementById('shipUpLoads').files[0]; //fileUpLoads
										if (file) {
											var fileSize = 0;

											uploadFile();
										}
										// console.log(w.aw);
										function uploadFile() {
											var fd = new FormData();
											fd.append("image", file);
											var xhr = new XMLHttpRequest();
											xhr.upload.addEventListener("progress", uploadProgress, false);
											xhr.addEventListener("load", uploadComplete, false);
											xhr.addEventListener("error", uploadFailed, false);
											xhr.addEventListener("abort", uploadCanceled, false);
											xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''" + "&imageStorePath=" + sourceDataURI);
											xhr.send(fd);

											xhr.onreadystatechange = function () {
												if (xhr.readyState == 4) { // debugger;
													var hdrs = xhr.getAllResponseHeaders();
													var resp = xhr.responseText;
													var dataURI = sourceDataURI;

													var imageNameNew = "GraphicsImg/" + resp;

													document.getElementById('imageName').value = imageNameNew;
													Ext.getCmp('shipImageValue').setValue(imageNameNew);
													document.images['shipImage'].src = "../" + imageNameNew;
													document.getElementById('imageName').value = imageNameNew;

													//

												}
											}

										}

										function uploadProgress(evt) {}

										function uploadComplete(evt) {}

										function uploadFailed(evt) {
											Ext.Msg.alert("", "There was an error attempting to upload the file.");
										}

										function uploadCanceled(evt) {
											Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
										}

									}
								},
							]
						}, {
							xtype : 'label',
							html : '<b><u>Decks Plan</u></b>'
						},
						{
							xtype : 'panel',
							//title:'panel',
							border : false,
							layout : 'table',
							column : 5,
							items : [{
									html : 'Browse',
									border : false,
								},
								{
									html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "100"><input width= "100" name="fileUpLoad" id="deckUpLoads"type="file"  /></td></form>',
									width : 185,
									style : 'padding: 0px 15px 0px 10px; ',
								}, {
									xtype : 'textfield',
									id : 'deckImageValue',
									hidden : true,
									name : 'deckGraphicImgPath',
								},
								{
									xtype : 'button',
									text : 'Upload',
									style : 'padding: 0px 00px 0px 10px; ',
									handler : function (btn) {
										debugger;
										//document.images['image1'].src = "";
										Ext.getCmp('deck').html = '<img border="0" id="deckImageId" name="deckImage" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
										var w = this.ownerCt.findParentByType('awesomewindow');
										var sourceDataURI = w.aw.postDataURI;
										//var sourceDataURI = w.aw.sourceDataURI;
										var im = document.getElementById('deckUpLoads').value
											var file = document.getElementById('deckUpLoads').files[0]; //fileUpLoads
										if (file) {
											var fileSize = 0;

											uploadFile();
										}

										function uploadFile() {
											var fd = new FormData();
											fd.append("image", file);
											var xhr = new XMLHttpRequest();
											xhr.upload.addEventListener("progress", uploadProgress, false);
											xhr.addEventListener("load", uploadComplete, false);
											xhr.addEventListener("error", uploadFailed, false);
											xhr.addEventListener("abort", uploadCanceled, false);
											xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=''" + "&imageStorePath=" + sourceDataURI);
											xhr.send(fd);

											xhr.onreadystatechange = function () {
												if (xhr.readyState == 4) { // debugger;
													var hdrs = xhr.getAllResponseHeaders();
													var resp = xhr.responseText;
													var dataURI = sourceDataURI;
													var imageNameNew = "GraphicsImg/" + resp;
													document.getElementById('imageName').value = imageNameNew;
													Ext.getCmp('deckImageValue').setValue(imageNameNew);
													document.images['deckImage'].src = "../" + imageNameNew;
													document.getElementById('imageName').value = imageNameNew;

												}
											}

										}

										function uploadProgress(evt) {}

										function uploadComplete(evt) {}

										function uploadFailed(evt) {
											Ext.Msg.alert("", "There was an error attempting to upload the file.");
										}

										function uploadCanceled(evt) {
											Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
										}

									}
								},
								{
									xtype : 'button',
									text : 'Clear',
									id : 'clear',
									style : 'padding: 0px 00px 0px 10px; ',
									handler : function (btn) {
										document.images['shipImage'].src = "";
										document.getElementById('shipUpLoads').value = '';
										document.getElementById('deckUpLoads').value = '';
										document.images['deckImage'].src = "";
										this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(3).reset();
										this.ownerCt.ownerCt.items.itemAt(6).items.itemAt(1).reset();
										Ext.getCmp('deckImageValue').reset();
										Ext.getCmp('shipImageValue').reset();

									}
								}
							]
						}, {
							xtype : 'panel',
							style : 'padding: 0px 0px 0px 50px; ',
							border : false,
							layout : 'column',
							items : [{
									html : 'Date: ',
									border : false,
									style : 'padding: 0px 15px 0px 20px; ',
								}, {

									xtype : 'datefield',
									width : 80,
									name : 'deckPlanDate'

								}, {
									html : 'Deck:',
									border : false,
									style : 'padding: 0px 15px 0px 20px; ',
								}, {
									//fieldLabel:'Deck',
									xtype : 'textfield',
									width : 80,
									name : 'deck'
								}
							]
						}

					]
				}, {
					title : 'Ports',
					bodyStyle : 'padding: 0px 0px 0px 0px;',
					items : [{
							xtype : 'panel',
							//layout: 'form',
							layout : 'table',

							layoutConfig : {
								columns : 1
							},
							labelWidth : 110,
							border : false,
							style : 'padding: 2px;',
							defaultType : 'textfield',
							items : [{
									xtype : 'panel',
									width : 775,
									height : 150,
									border : true,
									style : 'padding: 2px;',
									defaultType : 'textfield',
									items : [{
											xtype : 'grid',
											//searchURI: TDS.env.dataPath + '/PassengerMemberships',
											alwaysUseCollection : true,
											name : 'ggg',
											width : 775,
											height : 150,
											border : false,
											store : new Ext.data.JsonStore({
												url : '',
												id : 'dataURI',
												fields : ['travelDate', 'portName', 'travelDateDisp', 'arrival', 'departure', 'cruiseOfferingURI', 'expiryDate', 'dataURI']
											}),
											sm : new Ext.grid.RowSelectionModel(),

											columns : [
												{
													header : 'Day/Date',
													dataIndex : 'travelDateDisp',
													width : 100
												}, {
													header : 'Ports',
													dataIndex : 'portName',
													width : 100
												}, {
													header : 'Arr',
													dataIndex : 'arrival',
													width : 100
												}, {
													header : 'Dep',
													dataIndex : 'departure',
													width : 100
												}
											],
											viewConfig : {
												forceFit : true
											},
											listeners : {
												beforerender : function () {
													//this.store = this.ownerCt.store;
												},
												sessioninit : function () {
													//debugger;
													//								var a = this.findParentByType('awesomewindow');
													//								var pnrDataURI = a.initialConfig.destinationDataURI;
													//								//alert(TDS.env.dataPath +pnrDataURI+ '/PassengerMemberships');
													// 								this.searchURI = TDS.env.dataPath +pnrDataURI+ '/cruisePorts';

												},
												render : function () {}
											}
										}
									]
								}, {
									xtype : 'panel',
									layout : 'table',
									border : false,
									//width : 625,
									//height : 60,
									style : 'padding: 3px;',

									layoutConfig : {
										columns : 7
									},
									defaults : {
										border : false
									},
									items : [
										{
											//html : 'Day/Date:',

											width : 100
										}, {
											xtype : 'textfield',
											name : 'travelDate',
											fieldLabel : 'Travel Date',
											format : 'dMy',
											width : 150
										}, {
											html : '',
											height : 30,
											width : 20
										}, {
											//html : 'Departure Time:',
											width : 80
										}, {
											xtype : 'textfield',
											name : 'departure',
											fieldLabel : 'Departure',
											width : 150
										}, 
										{
											//html : 'Ports:',
											width : 100
										},
												{
											xtype : 'button',
											align : 'right',
											minWidth : 80,
											text : 'Add',
												},
												{
											//html : 'Ports:',
											width : 100
										}, {
											xtype : 'textfield',
											name : 'portName',
											fieldLabel : 'Ports',
											width : 150
										}, {
											html : '',
											width : 20
										}, {
										//	html : 'Arrival Time:',
											width : 80
											
										}, {
											xtype : 'textfield',
											name : 'arrival Time',
											fieldLabel : 'Arrival',
											width : 150
										},
										{
											//html : 'Ports:',
											width : 100
										},
										{
											xtype : 'button',
											align : 'right',
											minWidth : 80,
											text : 'Remove',
											}

									]
								}, 
										{
									
									

							xtype : 'panel',
							border : false,
								layout:'table',
								column : 2,

							items : [{

									width : 400,
									height : 225,
									border : true,
									autoScroll : true,
										//itemId : 'portId',
									id : 'portId',
									html : 'portImages',
									listeners : {
										render : function () {
											debugger;
											var grap_image_path = "";
											var aw = this.ownerCt.ownerCt.findParentByType('awesomewindow');
											var graphicImagePath = aw.aw.data.portGraphicImgPath;

											if (typeof graphicImagePath == 'undefined') {
												graphicImagePath = '';
											}

											var imageHotusa = graphicImagePath.substring(0, 4);

											//if(imageHotusa=='http'){
											if (Ext.isEmpty(imageHotusa)) {

												this.html = '<center><img border="0"   id="portImageId" name="portImages"   alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + graphicImagePath + '>';
											} else {

												grap_image_path = "../" + graphicImagePath;
												this.html = '<center><img border="0"   id="portImageId" name="portImages" src=' + grap_image_path + ' alt="portImages"  ></center><input type="hidden" id ="imageName"  name="imageName" value=' + grap_image_path + '>';
											}
										}

									},
										colspan:1,

								},
								{
									xtype : 'panel',
									border : false,
									layout : 'table',
									style : 'padding: 20px 0px 0px 25px; ',
									column : 3,
									items : [{
											xtype : 'textfield',
											id : 'portImageValue',
											hidden : true,
											name : 'portGraphicImgPath',
										},
										{
											html : '<form action="fileUpload" enctype="multipart/form-data" method="post" style="border="0""><td width= "70"><input width= "75" name="fileUpLoad" id="portfileUpLoads"type="file"  /></td></form>',
											width : 165,
											style : 'padding: 0px 10px 0px 0px; ',
										},
										{
											xtype : 'button',
											text : 'Upload',
											style : 'padding: 0px 10px 0px 15px;',
											handler : function (btn) {
												debugger;
												Ext.getCmp('portId').html = '<img border="0" id="portImageId" name="portImages" src="" ><input type="hidden" id ="imageName"  name="imageName" value="">';
												var w = this.ownerCt.findParentByType('awesomewindow');
												var sourceDataURI = w.aw.sourceDataURI;
												var im = document.getElementById('portfileUpLoads').value
													var file = document.getElementById('portfileUpLoads').files[0];
												if (file) {
													var fileSize = 0;

													uploadFile();
												}

												function uploadFile() {
													var fd = new FormData();
													fd.append("image", file);
													var xhr = new XMLHttpRequest();
													xhr.upload.addEventListener("progress", uploadProgress, false);
													xhr.addEventListener("load", uploadComplete, false);
													xhr.addEventListener("error", uploadFailed, false);
													xhr.addEventListener("abort", uploadCanceled, false);
													xhr.open("POST", TDS.env.dataPath + "fileUpload?&imageName=" + Ext.getCmp('portImageValue').getValue() + "&imageStorePath=" + sourceDataURI);
													xhr.send(fd);

													xhr.onreadystatechange = function () {
														if (xhr.readyState == 4) { // debugger;
															var hdrs = xhr.getAllResponseHeaders();
															var resp = xhr.responseText;
															var dataURI = sourceDataURI;

															var imageNameNew = "GraphicsImg/" + resp;

															//Ext.getCmp('cabinPanel').show();
															document.getElementById('imageName').value = imageNameNew;
															Ext.getCmp('portImageValue').setValue(imageNameNew);
															document.images['portImages'].src = "../" + imageNameNew;
															document.getElementById('imageName').value = imageNameNew;

														}
													}

												}

												function uploadProgress(evt) {}

												function uploadComplete(evt) {}

												function uploadFailed(evt) {
													Ext.Msg.alert("", "There was an error attempting to upload the file.");
												}

												function uploadCanceled(evt) {
													Ext.Msg.alert("", "The upload has been canceled by the user or the browser dropped the connection.");
												}

											}
										}, {
											xtype : 'button',
											text : 'Delete',
											style : 'border="0";',
											handler : function (btn) {
												document.images['portImages'].src = "";
												document.getElementById('portfileUpLoads').value = '';
												Ext.getCmp('portImageValue').setValue('');

											}
										},
									]
								}
							]


									
									}
							]
						}
					]

				}, {
					title : 'Dinning Times',
					items : [{
							xtype : 'panel',
							layout : 'form',
							border : false,
							labelWidth : 90,
							defaults : {
								style : 'padding: 2px 4px 2px 4px;'
							},
							items : [{
									xtype : 'label',
									hidden : true,
									name : 'label1'
								}, {
									xtype : 'panel',
									//width:300,
									layout : 'column',
									border : false,
									style : 'padding: 10px 20px 10px 20px;',
									items : [{
											xtype : 'checkbox',
											boxLabel : 'First Sitting',
											width : 100,
											name : 'firstSitting',
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'firstSittingTime',

 										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 0px 20px 0px 20px;',
											items : [
 											{
											xtype : 'combo',
											width : 50,
											listWidth:50,
											name : 'timePeriod1',
											mode : 'local',
											triggerAction : 'all',
											editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:0,value:' '}, {id:1,value:'AM'},{id:2,value:'PM'} ]
											}),
													}

												//
											]
										}, {
											xtype : 'textfield',
											name : ' ',
											width : 50,
											emptyText : 'No'
										}, {
											html : 'Status:',
											border : false,
											style : 'padding: 5px 10px 0px 10px;',
										},
										{
											xtype : 'combo',
											width : 100,
											name : 'status1',
											mode : 'local',
											triggerAction : 'all',
											 editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:' ',value:' '},{id:'OK',value:'OK'},{id:'FULL',value:'FULL'},{id:'RQ',value:'RQ'}]
											}),

										}
									]

								}, {

									xtype : 'panel',
									layout : 'column',
									border : false,
									style : 'padding: 10px 20px 10px 20px;',
									items : [{
											xtype : 'checkbox',
											boxLabel : 'Second Sitting',
											name : 'secondSitting',
											width : 100,
											id : 'check',
											listeners : {
												check : function (e, checked) {
													//var status = this.ownerCt.items.itemAt(4).getValue();

												}

											}
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'secondSittingTime',

										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 0px 20px 0px 20px;',
											items : [
 											{
											xtype : 'combo',
											width : 50,
 											name : 'timePeriod2',
											mode : 'local',
											listWidth:50,
											triggerAction : 'all',
											editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:0,value:' '}, {id:1,value:'AM'},{id:2,value:'PM'} ]
											}),
													}

											]
										}, {
											xtype : 'textfield',
											name : ' ',
											width : 50,
											emptyText : 'No'
										}, {
											html : 'Status:',
											border : false,
											style : 'padding: 5px 10px 0px 10px;',
										},
										{
											xtype : 'combo',
											width : 100,
											fieldLabel : 'dd',
											name : 'status2',
											mode : 'local',
											triggerAction : 'all',
											editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:' ',value:' '},{id:'OK',value:'OK'},{id:'FULL',value:'FULL'},{id:'RQ',value:'RQ'}]
											}),

										}

									]

								}, {
									xtype : 'panel',
									layout : 'column',
									border : false,
									style : 'padding: 10px 20px 10px 20px;',
									items : [{
											xtype : 'checkbox',
											boxLabel : 'Third Sitting',
											width : 100,
											name : 'thirdSitting',
										}, {
											xtype : 'textfield',
											allowBlank : false,
											name : 'thirdSittingTime',

										}, {
											xtype : 'panel',
											layout : 'column',
											border : false,
											style : 'padding: 0px 20px 0px 20px;',
											items : [
												 

												{
											xtype : 'combo',
											width : 50,
											listWidth:50,
											name : 'timePeriod3',
											mode : 'local',
											triggerAction : 'all',
											editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:0,value:' '}, {id:1,value:'AM'},{id:2,value:'PM'} ]
											}),
													}

											]
										}, {
											xtype : 'textfield',
											name : ' ',
											width : 50,
											emptyText : 'No'
										}, {
											html : 'Status:',
											border : false,
											style : 'padding: 5px 10px 0px 10px;',
										},
										{
											xtype : 'combo',
											width : 100,
											name : 'status3',
											mode : 'local',
											triggerAction : 'all',
										    editable : false,
											allowBlank:true,
											valueField : 'id',
											displayField : 'value',
 											tpl:'<tpl for="."><div class="x-combo-list-item"> {value}&nbsp;</div></tpl>',
 											store:new Ext.data.JsonStore({
											 fields : ['id', 'value'],
												 data:[{id:' ',value:' '},{id:'OK',value:'OK'},{id:'FULL',value:'FULL'},{id:'RQ',value:'RQ'}]
											}),
										}
									],

								}, {
									html : '<hr>',
									border : false
								}, {
									xtype : 'label',
									html : '<b><u>Table Sizes</u></b>'
								}, {
									xtype : 'panel',
									layout : 'column',
									border : false,
									style : 'padding: 10px 20px 20px 20px;',
									items : [{
											xtype : 'checkbox',
											boxLabel : 'Seats 2',
											width : 100,
											name : 'seat2',
											value : 2,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 4',
											width : 100,
											name : 'seat4',
											value : 4,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 6',
											width : 100,
											name : 'seat6',
											value : 6,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 8',
											width : 100,
											name : 'seat8',
											value : 8,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 10',
											width : 100,
											name : 'seat10',
											value : 10,
											excludeSubmit : true
										},
									]
								}, {
									xtype : 'panel',
									layout : 'column',
									border : false,
									style : 'padding: 10px 20px 20px 20px;',
									items : [{
											xtype : 'checkbox',
											boxLabel : 'Seats 12',
											width : 100,
											name : 'seat12',
											value : 12,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 14',
											width : 100,
											name : 'seat14',
											value : 14,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 16',
											width : 100,
											name : 'seat16',
											value : 16,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 18',
											width : 100,
											name : 'seat18',
											value : 18,
											excludeSubmit : true
										}, {
											xtype : 'checkbox',
											boxLabel : 'Seats 20',
											width : 100,
											name : 'seat20',
											value : 20,
											excludeSubmit : true
										},
									]
								}

							]
						}
					]
				}
			]
		}
	]
}		
	
	
	
	
	
	 
	
	
	
	
	
	
	 