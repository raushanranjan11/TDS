{
	xtype: 'form',
	border: false,
	termsAndConditions:'',
	markDataDirtyOnLoad: true,
	items: [{
			xtype: 'tabpanel',
			activeTab: 0,
			layoutOnTabChange: true,
			height: 500,
			width: 600, 
			defaults: {
				bodyStyle: 'padding: 6px 4px 6px 4px;'
			},
			items: [
				{
					title: 'Cancellation Terms',
					items: [
							{
								xtype: 'textarea',
								name: 'rules',
								height: 490,
								width: 550
							},{
								xtype: 'textfield',
								name: 'status',
									value:12
								//value:TDS.data.componentStatus.STATUS_CANCELLED,
							//	hidden:true 
							}
					]
				} 
			]
	} 
	],
	listeners: {
		render: function () {
			 
	 
		}
	}
} 






























 