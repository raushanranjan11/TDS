{
	xtype: 'panel',
	header: true,
	autoHeight:true,//: 200,
	border: false,
	bodyStyle: 'padding: 8px;',
	refreshGrid: function () {
		var ag = this.ownerCt.findParentByType('awesomegrid');
		ag.submitQuery(true);
	},
	items: [
		{
			layout: 'column',
			border: false,
			items: [
				// description
				{
					xtype: 'fieldset',
					height: 170,
					columnWidth: 1,
					autoScroll: true,

					style: 'padding: 4px; margin-right: 8px;',
					listeners: {
						render: function () {
							var ap = this.ownerCt.findParentByType('ajaxpanel');

							var createdDate = Date.parseDate(ap.rowRecordData['createdDate'], TDS.env.dateFormat);
							var updatedDate = Date.parseDate(ap.rowRecordData['updatedDate'], TDS.env.dateFormat);

							var html = [
								'<p><b>' + ap.rowRecordData['name'] + '</b></p>',
								ap.rowRecordData['bookingReferenceNumber'] ? '<p><b>Booking reference #:</b> ' + ap.rowRecordData['bookingReferenceNumber'] + '</p>' : '',
								'<p>' + ap.rowRecordData['description'] + '</p>',
								'<p>&nbsp;</p>',
								'<p>Created on ' + createdDate.format(TDS.env.dateTimeFormatDisplay) + ' by ' + ap.rowRecordData['createdByLogin'] + ', modified on ' + updatedDate.format(TDS.env.dateTimeFormatDisplay) + (ap.rowRecordData['createdByLogin'] == ap.rowRecordData['updatedByLogin'] ? '' : ' by ' + ap.rowRecordData['updatedByLogin']) + '.</p>'
							];

							this.items.itemAt(0).html = html;
						}
					},
					items: [
						{
							/* description panel */
							xtype: 'panel',
							border: false,
							autoHeight:true,
							autoScroll: true
						}
					]
				},
				// actions
				{
					xtype: 'panel',
					autoHeight: true,
					border: false,
					bodyStyle: 'padding: 4px;',
					width: 150,
					defaults: {
						minWidth: 100
					},
					items: [
						{
							xtype: 'button',
							text: 'Edit',
							handler: function () {
								var p = this.ownerCt.ownerCt.ownerCt;
								var ap = this.ownerCt.findParentByType('ajaxpanel');
								var dataURI = ap.rowRecordData['dataURI'];
								if (!dataURI) return;
								TDS.window.setWindow({
									title: 'Manual entry details',
									interfaceURI: 'pnr/components/manual/create.js',
									sourceDataURI: dataURI,
									destinationDataURI: dataURI,
									buttonOK: 'Submit',
									callback: {
										fn: function (s) {
											if (s) p.refreshGrid();
										},
										scope: this
									}
								});
							}
						},
						{
							xtype: 'button',
							text: 'Delete',
							handler: function () {
								var p = this.ownerCt.ownerCt.ownerCt;
								var ap = this.ownerCt.findParentByType('ajaxpanel');
								var dataURI = ap.rowRecordData['dataURI'];
								if (!dataURI) return;
								TDS.window.setWindow({
									title: 'Remove manual entry',
									message: 'Are you sure you want to remove this component?',
									destinationDataURI: dataURI,
									data: {
										status: TDS.data.componentStatus.STATUS_DELETE
									},
									callback: {
										fn: function (s) {
											if (s) p.refreshGrid();
										},
										scope: this
									}
								});
							}
						}
					]
				}
			]
		}
	],
	listeners: {
		render: function () {
			var ap = this.ownerCt;

			//this.setTitle(ap.rowRecordData['name'] + ' (' + ap.rowRecordData['supplierName'] + ')');
			this.setTitle( 'Manual (' + ap.rowRecordData['supplierName'] + ')');
		}
	}
}
























