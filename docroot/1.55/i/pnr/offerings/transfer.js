{
	xtype: 'panel',
	layout: Ext.isIE ? 'fit' : '',
	autoScroll: true,
	bodyStyle: 'padding: 8px;',
	// pre-fetch stores
	requireStores: [
		{
			dataURI: TDS.env.dataPath + 'transfer/modetypes/collection',
			identifier: 'transfer/modetypes',
			fields: ['name', 'dataURI']
		},
		{
			dataURI: TDS.env.dataPath + 'transfer/placetypes/collection',
			identifier: 'transfer/placetypes',
			fields: ['name', 'dataURI']
		}
	],
	items: {
		xtype: 'awesomegrid',
		searchURI: TDS.env.dataPath + 'search/transfers',
		enableRowExpander: true,
		pinnable: true,
		tbar: [
			'Available',
			' ',
			{
				xtype: 'datefield',
				name: 'datePointer',
				excludeFromSession: true,
				value:new Date(),
				enableKeyEvents: true,
				showToday: false,
				width: 80,
				format: 'dMy',
				minValue: Ext.TimerMgr.getServerCalculatedDate().clearTime()
			},
			'&plusmn;',
			{
				xtype: 'omnicrementer',
				name: 'dateDays',
				width: 60,
				editable: false
			},
			' ',
			'days',
			' ',
			'-',
			' ',
//			'Number of PAX:',
//			{
//				xtype: 'omnicrementer',
//				name: 'maximumOccupancy',
//				width: 60
//			},

'Adults:',
			{
				xtype: 'omnicrementer',
 				name: 'noOfAdult',
					 enableKeyEvents:true,
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(14).getValue()+e.ownerCt.items.itemAt(17).getValue()+e.getValue();
				e.ownerCt.items.itemAt(20).setValue(a);
				}
				}
			},
			' ',
			'Child:',
			{
				xtype: 'omnicrementer',
				name: 'noOfChild',
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(11).getValue()+e.ownerCt.items.itemAt(17).getValue()+e.getValue();
				e.ownerCt.items.itemAt(20).setValue(a);
				}
				}
			},
			' ',
			'Infants:',
			{
				xtype: 'omnicrementer',
				name: 'noOfInfant',
				width: 60,
					listeners:{
				trigger:function(e, eOpts ){
					var a = e.ownerCt.items.itemAt(11).getValue()+e.ownerCt.items.itemAt(14).getValue()+e.getValue();

				e.ownerCt.items.itemAt(20).setValue(a);
				}
				}
			},' ',
					'Total PAX:',
			{
				xtype: 'textfield', 
				name: 'totalPax',
				id:'maximumOccupancyId', 
				value: 0,
				 width: 60,
					readOnly:true
			},
					
			' ',
			' ',
			'-',
			' ',
			//'Content Type:',
			{
				xtype: 'combo',
				name: 'ownContent',
				mode: 'local',
				width: 110,
				triggerAction: 'all',
				editable: false,
				excludeFromSession: true,
				hidden: true,
				displayField: 'description',
				valueField: 'value',
				emptyText: 'content type',
				value: false,
				//tpl: TDS.util.Templates.ComboNoLabel,
				store: TDS.data.countentType,
 				listeners: {
						render:function(){
							 if (TDS.env.user.isArenaOne())	this.show();
						}
					}
			},'->' 
			,
			{
				text: 'Help',
				xtype: 'redbutton', 
				cls:'x-button-blue',
				overCls:'x-button-blue-over',
				opened: false,
				toggle: false,
				handler: function(){ TDS.needHelp('Search View Help','23');if(!this.opened){this.opened=true;TDS.needHelp('Search View Help','23');}else{this.opened=false;TDS.helpwindow.hide();}}
			}  
		],
		tbar2: [
			'Location:',
			{
				xtype: 'combo',
				name: 'countryURI',
				emptyText: 'Type a country...',
				excludeFromSession: true,
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
				valueField: 'dataURI',
				store: TDS.data.getStore({
					dataURI: TDS.env.dataPath + 'countries/collection',
					identifier: 'countries',
					fields: ['dataURI', 'name', 'isoCode']
				}),
											appendData: [{name: '', dataURI: ''}]
			},
			' ',
			{
				xtype: 'locationcombo',
				name: 'locationURI',
				excludeFromSession: true,
				hideTrigger: false,
				listeners: {
					beforesearch: function (sc) {
						var p = this.ownerCt;
						var countryField = p.items.itemAt(1);
						var countryCode = countryField.getValue().substring(countryField.getValue().lastIndexOf('/') + 1);
						// check if the country has been selected
						if (countryCode == '') {
							countryField.markInvalid('Please select a country.');
							return false;
						}
						// set the search configuration object
						sc.searchURI = TDS.env.dataPath + 'country/' + countryCode + '/locations/collection';
						sc.searchIdentifier = 'country/' + countryCode + '/locations';
					}
				}
			}/*,
			' ',
			{
				xtype: 'checkbox',
				name: 'includeAllLocations'
			},
			' ',
			'Include surrounding locations'*/
		],
		tbar3: [
			'Mode:',
			{
				xtype: 'combo',
				name: 'transferModeTypeURI',
				mode: 'local',
				tpl: TDS.util.Templates.ComboNoLabel,
				width: 120,
				triggerAction: 'all',
				editable: false,
				displayField: 'name',
				valueField: 'dataURI',
				store: TDS.data.getStore({
					dataURI: TDS.env.dataPath + 'transfer/modetypes/collection',
					identifier: 'transfer/modetypes',
					fields: ['name', 'dataURI']
				}),
				appendData: [{name: '', dataURI: ''}]
			},
			' ',
			'From:',
			{
				xtype: 'combo',
				name: 'transferPlaceTypeFromURI',
				mode: 'local',
				tpl: TDS.util.Templates.ComboNoLabel,
				width: 120,
				triggerAction: 'all',
				editable: false,
				displayField: 'name',
				valueField: 'dataURI',
				store: TDS.data.getStore({
					dataURI: TDS.env.dataPath + 'transfer/placetypes/collection',
					identifier: 'transfer/placetypes',
					fields: ['name', 'dataURI']
				}),
				appendData: [{name: '', dataURI: ''}]
			},
			' ',
			'To:',
			{
				xtype: 'combo',
				name: 'transferPlaceTypeToURI',
				mode: 'local',
				tpl: TDS.util.Templates.ComboNoLabel,
				width: 120,
				triggerAction: 'all',
				editable: false,
				displayField: 'name',
				valueField: 'dataURI',
				store: TDS.data.getStore({
					dataURI: TDS.env.dataPath + 'transfer/placetypes/collection',
					identifier: 'transfer/placetypes',
					fields: ['name', 'dataURI']
				}),
				appendData: [{name: '', dataURI: ''}]
			}
		],
		store: new Ext.data.JsonStore({
			url: '',
			id: 'dataURI',
			fields: ['dataURI', 'pinned', 'nameString', 'supplierURI', 'locationToString', 'conversionCurrency', 'convertedPricingPriceSell', 'descriptionString', 'primaryHref', 'addressString', 'transferModeTypeURI', 'transferPlaceTypeFromURI', 'transferPlaceTypeToURI','termsAndConditions', 'noPrePaymentRequired',	 'pytInFull','fullPytPriorDays', 'depositWithin', 'balancePriorToDeparture', 'depositWithinDays', 'depositPerOption', 'balancePriorToDepartureDay','graphicImgPath','supplierDetails','pricingPriceIsNett']
		}),
		sm: new Ext.grid.RowSelectionModel(),													  
		cm: new Ext.grid.ColumnModel([
			{header: 'Supplier', dataIndex: 'supplierURI', sortable: true, renderer:function (value, metadata, record, rowIndex, colIndex, store){
 					  metadata.attr = 'ext:qtip="'+record.get('supplierDetails').replace(/\"/g,'\'')+'"';
 					return TDS.util.Format.displayResourceConciseName(value);
				}},
			{header: 'Location', dataIndex: 'locationToString', sortable: true},
			{header: 'Mode', dataIndex: 'transferModeTypeURI', sortable: true, renderer: TDS.util.Format.displayResourceNameRenderer()},
			{header: 'From', dataIndex: 'transferPlaceTypeFromURI', sortable: true, renderer: TDS.util.Format.displayResourceNameRenderer()},
			{header: 'To', dataIndex: 'transferPlaceTypeToURI', sortable: true, renderer: TDS.util.Format.displayResourceNameRenderer()},
			{header: 'Advertised rate', dataIndex: 'convertedPricingPriceSell', width: 120, fixed: true, sortable: true, renderer:function (v, metaData, record) {
					return TDS.util.Price.formatPrice(v, record.data['conversionCurrency'])+' ('+(record.data['pricingPriceIsNett']?'Nett':'Gross')+')';
 			}} 
		]),
		viewConfig: {
			forceFit: true
		},
		getRowInterface: function (record, rowIndex, store) {
			return 'pnr/offerings/transfer/layout.js';
		},
		listeners: {
			sessioninit: function () {
				// set the currency to request for using the PNR currency
				var pp = this.ownerCt.findParentByType('pnrpanel');
				var maximumOccupancyField = this.getTopToolbar().items.itemAt(11);
				maximumOccupancyField.setValue(pp.getPassengerCount());
				this.appendQueryParams['currency'] = pp.getPNRCurrency();
			}
		}
	}
}











