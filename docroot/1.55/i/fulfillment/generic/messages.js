{xtype:"panel",border:false,bodyStyle:"padding: 8px;",items:{xtype:"dataview",tpl:new Ext.XTemplate('<div style="height: 140px; overflow: auto;">','<table class="tds-availability-rates" style="table-layout: fixed;" cellspacing="0" cellpadding="0" border="0">','<tpl for=".">','<tr class="tds-availability-rates-row">','<td style="width: 16px;"><div class="x-grid3-cell-inner{typeCls}" style="height: 10px;"></div></td>','<td style="width: 100px;"><div class="x-grid3-cell-inner">{activityTime}</div></td>','<td style="width: 140px;"><div class="x-grid3-cell-inner">{userFullNameString}</div></td>','<td style="width: 100%;"><div class="x-grid3-cell-inner">{changeDescription}</div></td>',"</tr>","</tpl>","</table>","</div>"),autoHeight:true,singleSelect:true,itemSelector:"tr.tds-availability-rates-row",emptyText:'<p style="padding: 10px;">No messages to display.</p>',prepareData:function(a){if(a.type==TDS.data.componentActivityLogType.REQUEST_NOTE_TO_AGENT||a.type==TDS.data.componentActivityLogType.BOOKING_NOTE_TO_AGENT||a.type==TDS.data.componentActivityLogType.CANCELLATION_NOTE_TO_AGENT){if(TDS.env.user.isAgencyUser()){a.typeCls=" x-tds-cell-note-recv"}else{if(TDS.env.user.isSupplier()){a.typeCls=" x-tds-cell-note-sent"}}}else{if(a.type==TDS.data.componentActivityLogType.REQUEST_NOTE_TO_SUPPLIER||a.type==TDS.data.componentActivityLogType.BOOKING_NOTE_TO_SUPPLIER||a.type==TDS.data.componentActivityLogType.CANCELLATION_NOTE_TO_SUPPLIER){if(TDS.env.user.isAgencyUser()){a.typeCls=" x-tds-cell-note-sent"}else{if(TDS.env.user.isSupplier()){a.typeCls=" x-tds-cell-note-recv"}}}else{if(a.type==TDS.data.componentActivityLogType.REQUEST_NOTE||a.type==TDS.data.componentActivityLogType.BOOKING_NOTE||a.type==TDS.data.componentActivityLogType.CANCELLATION_NOTE){a.typeCls=" x-tds-cell-note"}else{a.typeCls=" x-tds-cell-info"}}}a.activityTime=TDS.util.Format.dateSpecial(a.activityTime,TDS.env.dateTimeFormatDisplay);a.changeDescription=Ext.util.Format.stripTags(a.changeDescription);return a},listeners:{beforerender:function(){var b=this.ownerCt.findParentByType("tabpanel");var a=b.getComponentDetail("dataURI");this.store=new Ext.data.CollectionStore({autoLoad:true,url:TDS.env.dataPath+a+"/messages/collection",identifier:a+"/messages",fields:["dataURI","activityTime","type","changeDescription","offeringNameString","passengerNameRecordComponentURI","passengerNameRecordURI","statusBefore","statusAfter"]})}}}}