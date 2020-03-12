{
	xtype: 'form',
	border: false,
	fileUpload : true,
	markDataDirtyOnLoad: true,
	items: [{
		xtype: 'tabpanel',
		activeTab: 0,
		layoutOnTabChange: true,
		height: 320,
		width: 400,
		items: [
			// details tab
			{
				title: 'Note',
				layout: 'form',
				items: [{
							xtype: 'htmleditor',
							name: 'description',
							hideLabel: true,
							labelSeparator: '',
							anchor: '100%',
							enableLinks: true,
							enableLists: true,
							enableSourceEdit: false,
							enableFontSize: true,
							enableFont: false,
							enableColors: true,
							enableAlignments: true,
							height: 290,
							width: 400
						}]
			} 
			]
	}]
}