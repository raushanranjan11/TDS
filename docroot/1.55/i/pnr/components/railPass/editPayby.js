{
	xtype: 'form',
	border: false,
	layout: 'fit',
	//width:300,
	height:80,
	markDataDirtyOnLoad: true, 
	beforeSubmit: function (jd) {
	//jd.dateFrom = dateFrom;
	//jd.depositDescription=depositDescription; 
	return jd;
	}, 
	items: [ {
			 
				
		//title: 'Details',
		xtype: 'panel',
		layout: 'form',
		style: 'padding: 1; margin-bottom: 20px;margin-top: 2px;',
		border: false,
		//labelWidth: 105,
		items: [ 
		  {
			xtype: 'datefield',
			name: 'paybyDate',
			fieldLabel: 'Date',
			showToday: false,
			width: 80,
			format: 'dMy',
			minValue: '01/01/06'
		},{
			xtype: 'combo',
			fieldLabel: 'Description',
			name: 'depositDescription',
			mode: 'local',
			width: 130,
			triggerAction: 'all',
			editable: true,
			displayField: 'description',
			valueField: 'dataURI',
			store:TDS.data.depositDescriptions 
		} ]
	}	]
			
		 
}
 
 






















































































































































































