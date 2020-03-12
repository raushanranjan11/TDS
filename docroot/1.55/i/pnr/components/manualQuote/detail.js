{
	xtype: 'panel',
	height: 320,
	border:false,
	frame:false,
	layout: 'column',
	columnWidth: 1,
	items: [// component and agency details
	{
		/* details panel */
		columnWidth: .50,
		xtype: 'panel',
		height:320,
		//autoHeight: true,
		border: false,
		items: [{
			//html:'<div id="'+TDS.data.currentPNRComponentType+'"></div>',
			tbar: [{
					xtype: 'button',
					//hidden: true,
					text: 'Edit Pay By',
					handler: function () {
				 	var tp = this.ownerCt.findParentByType('ajaxpanel');
					var p = tp.ownerCt.ownerCt;
					var rowRecordData = tp.getDetail('rowRecordData');
					var dataURI = rowRecordData['dataURI'];
					var paybyDate = rowRecordData['paybyDate'];
					var depositDescription = rowRecordData['depositDescription'];
				 	TDS.window.setWindow({
							title: 'Description',
							information: 'Please enter description.',
							interfaceURI: '/pnr/components/manualQuote/editPayby.js',
							destinationDataURI: dataURI+'/updatePayBYDates',
							data:{paybyDate:paybyDate,
							depositDescription:depositDescription},
						 	callback: {
								fn: function (s) {
								  p.refreshGrid();
									//if (s) g.submitQuery(true);
								},
								//scope: g
							}
						});
					}
				},{
					xtype:'datefield',
					hidden:true
				},
				{
					xtype:'button',
					text:'Save',
					hidden: true,
					disabled: true 
				}, 
						 '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
 				{
					xtype: 'checkbox',
					boxLabel: '<font color="#cc0000"><b>Ready To Send Quotes/Booking</b></font>',
					loaded:false,
					listeners: {
 						render: function () {
							var t = this;
							setTimeout(function(){ 
 								var ap = t.ownerCt.findParentByType('ajaxpanel');
								var rowRecordData = ap.getDetail('rowRecordData');
								t.setValue(rowRecordData['readyToSendMsg']);
								t.loaded = true;
							},100);
						},
 						check: function (t, checked) {
							if(this.loaded){
					 			 
								var g = this.ownerCt.findParentByType('awesomegrid');
								if(checked){
									g.topToolbar.items.itemAt(21).enable(true);
								} 

														
								var tp = this.ownerCt.findParentByType('ajaxpanel');
								var rowRecordData = tp.getDetail('rowRecordData');
								var dataURI = rowRecordData['dataURI'];
							 
								if (!dataURI) return;
								Ext.Ajax.request({
									 url:TDS.env.dataPath + dataURI,
									 method: 'PUT',
									 headers: { 'Content-Type': 'application/json' },
									 data: { readyToSendMsg: checked },
									 disableCaching: false,
									 callback: function (o, s, r) {
										 debugger;
										var rsMessage = Ext.util.JSON.decode(r.responseText);
										var readyToSendMessage=rsMessage.readyToSendMessage;
										if(readyToSendMessage){
											g.topToolbar.items.itemAt(21).enable(true);
										}else{
											g.topToolbar.items.itemAt(21).disable(true);
										 }
									  
											//if (s) g.submitQuery(true);
											/*if(!checked){
												g.topToolbar.items.itemAt(21).disable(true);
												var componentsLength=g.getStore().data.items.length;
												var pnrItems=g.getStore().data.items;
												for(var i=0;i<componentsLength;i++){
													var pnrItemMsg=pnrItems[i].data.readyToSendMsg;
													if(pnrItemMsg){
													g.topToolbar.items.itemAt(21).enable(true);
													break;
													}
												 } 
							 				}*/
									 },
									 jsonData:{readyToSendMsg:checked},
									 scope: this
								});
							}
						}
 					}

				},
				'->',
				{
					xtype: 'button',
					buttonAlign: 'right',
					text: 'Additional Info',
					handler: function () {
							var tp = this.ownerCt.findParentByType('ajaxpanel');
							var rowRecordData = tp.getDetail('rowRecordData');
							var dataURI = rowRecordData['dataURI'];
							if (!dataURI) return;
							TDS.window.setWindow({
								title: 'Accommodation PNR',
								interfaceURI: 'pnr/components/generic/additionalInfo.js',
								 sourceDataURI: dataURI + '/additionalInfo',
								 destinationDataURI: dataURI + '/additionalInfo'
							});
					}
				},{
					xtype: 'button',
					buttonAlign: 'left',
					//	hidden:true,
					text: 'Download Voucher',
					handler: function () {
					 	var tp = this.ownerCt.findParentByType('ajaxpanel');
						var rowRecordData = tp.getDetail('rowRecordData');
						var basedataURI = rowRecordData['dataURI'];
						var dataURI = basedataURI.replace("manualQuoteComponent","component"); 
						if (!dataURI) return;	 
						var currentDomain=TDS.env.currentDomain;
						var filepath='/voucher/';
						Ext.Ajax.request({
							url: TDS.env.dataPath + dataURI +'/voucher',
							jsonData:{currentDomain:currentDomain},
							method: 'PUT',
							scope: this,
							callback: function (o, s, r) {
								filepath= filepath + r.responseText+'.rtf';
								var a = window.open(
								filepath,'Information Priview','height=500,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
								a.focus();
							}
						});
					}
					}],
			/* description panel */
			xtype: 'panel',
			border: false,
			autoHeight:true,
			minHeight:140,
			autoScroll: true
		}],
		listeners:{
			render:function(){
					 debugger;
						//var ap = this.ownerCt.findParentByType('tabpanel');
						var ap = this.ownerCt.findParentByType('tabpanel');
						var tp = this.ownerCt.findParentByType('ajaxpanel');
						var p = tp.ownerCt.ownerCt;
						var rowRecordData = tp.getDetail('rowRecordData');
						var dataURI = rowRecordData['dataURI'];
						var paybyDate = rowRecordData['paybyDate'];
						var depositDescription = rowRecordData['depositDescription'];

						var paxCollection;
						var paxRo;
						var thiss = this;
						 
					  	var rowRecordData = ap.getDetail('rowRecordData');
						this.items.itemAt(0).html = '<div id="'+rowRecordData['dataURI']+'">'+rowRecordData['dataURI']+'</div>';
						var divId = rowRecordData['dataURI'];
						var markupTt=rowRecordData['displayMarkup'];
						//if(rowRecordData['pricingPriceIsNett'] && rowRecordData['pricingPriceCommission']){
						//	markupTt = rowRecordData['pricingPriceCommission'];
						//}
							var voucher=rowRecordData['voucher'];
							if(voucher){
									this.items.itemAt(0).topToolbar[6].enaabled=true;
							}else{
									this.items.itemAt(0).topToolbar[6].disabled=true;
							}
						
 						var dataURI = rowRecordData['dataURI'];
						var sp = rowRecordData['supplierParameters'];
							Ext.Ajax.request({
								url: TDS.env.dataPath + dataURI + '/passengers/collection/concise',
								method: 'GET',
								callback: function (o, s, r) {
								  debugger;
									if (s) {  paxRo = Ext.util.JSON.decode(r.responseText);
									//var ap = this.items.itemAt(0);
										  paxCollection = paxRo[dataURI + '/passengers'];
										
										if (typeof paxCollection == 'undefined') return;


										MQdetails();
									}
								},
								scope: this
							});
				 var t=this;
				function MQdetails(){ 
					var ro = Ext.util.JSON.decode(rowRecordData['parameters']);
					var status=	rowRecordData['status'];
					var componentType = rowRecordData['type'];			
					var roomType = "";
					if(ro['accommodationType']){
						roomType = TDS.util.Format.displayResourceName(ro['accommodationType']);
					}
					var extraNotes = rowRecordData['extraNotes'];
					extraNotes = extraNotes.replace(/\n/g,'<br>');
					extraNotes = extraNotes.replace(/ /g,'&nbsp;');
 
 					var mainBody = "";
 					var destCruise='';
					var preferredCompanyCar="";
					var details = '';
 					var supplierData = 'undefined';
					if(rowRecordData['supplierParameters']!=''){ supplierData = Ext.util.JSON.decode(rowRecordData['supplierParameters']); }
					var currency = rowRecordData["pricingPriceCurrency"];


					
					if(typeof paxCollection!='undefined' && paxCollection!='' && paxCollection!=null){
					for (var i = 0; i < paxCollection.length; i++) {
						debugger;
						var current=t;
						var ap = current.ownerCt.findParentByType('ajaxpanel');
						var confirmButton=ap.items.itemAt(0).items.itemAt(2).items.itemAt(0);
					 	var paxes = paxRo[paxCollection[i]];
						var status = paxes.status;
						if(status=="HELD"){ 
						confirmButton.setDisabled(false);
						 }
				 	}
					}

					if(componentType == TDS.data.componentType.TYPE_TOUR){
						debugger;
  						var data = Ext.util.JSON.decode(rowRecordData['parameters']);
 						var rightBox="";
 						var tourType=TDS.util.Format.displayResourceName(data.tourTypeURI);   
 						//var gridData =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
						var gridData =  Ext.util.JSON.decode(data.gridData);
						var roomTypes='';
						if(typeof gridData!='undefined'){ roomTypes=gridData.data; }
  						var durationNights= rowRecordData['durationNights'];  //S
						var durationDays =  rowRecordData['durationDays'];  //S
						var name = rowRecordData['name'];  //S
 						if(typeof supplierData != 'undefined' && typeof supplierData.durationNights!= 'undefined' ){
							durationNights = supplierData.durationNights;
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.durationDays!= 'undefined'){
							durationDays = supplierData.durationDays;
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.name!= 'undefined'){
							name = supplierData.name;
						}

						var dateFrom=	TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay);
						var dateTo=TDS.util.Format.dateSpecial(rowRecordData['dateTo'],TDS.env.dateFormatDisplay);

						if(typeof supplierData != 'undefined' && typeof supplierData.dateFrom!= 'undefined'){
							dateFrom = TDS.util.Format.dateSpecial(supplierData.dateFrom,TDS.env.dateFormatDisplay);
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.dateTo!= 'undefined'){
							dateTo = TDS.util.Format.dateSpecial(supplierData.dateTo,TDS.env.dateFormatDisplay);
						}

						var dateRange='';
						if(dateFrom && dateTo)	
							dateRange= 	dateFrom + ' - '+dateTo;
						else if(dateTo) 
							dateRange=dateTo;
						else if(dateFrom)
							dateRange=dateFrom;

						var rateBody1 ="<tr>";
						rateBody1+='<td height="20" align=center><b>'+name+'</b></td>';
						rateBody1+='<td align=center> <b>'+tourType+'</b></td>';
						rateBody1+='<td align=center><b>'+  rowRecordData['locationFromString'] +'</b></td>';
						rateBody1+='<td align=center><b>'+ dateRange+'</b></td>';
						rateBody1+='<td align=center > <b> '+  rowRecordData['locationToString']+'</b></td>';
						rateBody1+='<td align=center><b>'+ durationNights+' Nights '+durationDays+' Days</b></td>';
						rateBody1+="</tr>";
							
						var totalExtras=0,totalMarkUp=0,totalStayPrice = 0, currency = rowRecordData['pricingPriceCurrency'];
						var rateBody2 ="";
						var totalPrice =0;
						var roomsTypeList =  Ext.util.JSON.decode(data.gridData).data;

						
							var roomTypes =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
						 
						//else{
							var roomTypesTemp = [];
							var roomTypesTemps = [];
							debugger;
						 	var totalStayPerRoom = 0;
							if(typeof roomTypes != 'undefined' && roomTypes != ""){
							for(var i = 0; i<roomTypes.data.length; i++){
								var roomType =  roomTypes.data[i].roomType;
								var code =  roomTypes.data[i].code;
								var status=roomTypes.data[i].status;
 								roomTypesTemp.push(roomType);
								roomTypesTemps.push(roomType);
								var noOfAdults = 0;
								var noOfChild = 0;
								var noOfInfants = 0;
								for(var j = 0; j<roomsTypeList.length; j++){
									if(roomsTypeList[j].roomType==roomType ){
										noOfAdults = roomsTypeList[j].a;
										noOfChild = roomsTypeList[j].c;
										noOfInfants = roomsTypeList[j].i;
									}
								}
 								var paxType =  roomTypes.data[i].paxType;
							//	var extras =  gridData.data[i].extras;
 								var totalPaxPerType=0; 
								if(paxType=='AD')totalPaxPerType = noOfAdults;
								if(paxType=='CH')totalPaxPerType = noOfChild;
								if(paxType=='IN')totalPaxPerType = noOfInfants;
								var priceperPax =  roomTypes.data[i].priceSell;
 								totalPrice += priceperPax;//*totalPaxPerType;
 								rateBody2+="<tr>";
								rateBody2+='<td height="1" align="center"><b>'+roomType+'</b></td>';
								rateBody2+='<td height="1" align="center"> <b>'+paxType+'</b></td>';
								rateBody2+='<td height="1" align="center"><b>'+code+' </b></td>';
								rateBody2+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice(priceperPax,currency)+'</b></td>';
								rateBody2+='<td height="1" align="center"><b>'+status+' </b></td>';
								rateBody2+="</tr>";	 
							}
						}else{
						for (var i = 0; i < paxCollection.length; i++) {
					 	var paxes = paxRo[paxCollection[i]];
										var code = paxes.code;
										var roomType=paxes.roomType;

										if(typeof code == 'undefined')code='';
										if(typeof roomType == 'undefined')roomType='';

										
								rateBody2+="<tr>";
								rateBody2+='<td height="1" align="center"><b>'+roomType+'</b></td>';

 
										if(paxes.type == 'AD') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="1" align="center"><b>Adult</b> </td>';
										}else if(paxes.type == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="1" align="center"><b>Child</b> </td>';
										}else if(paxes.type == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="1" align="center"><b>Infant</b> </td>';
										}
										else if(paxes.type == 'SR') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="1" align="center"><b>Senior</b> </td>';
										}else if(paxes.type == 'YT'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="1" align="center"><b>Youth</b> </td>';
										}else if(paxes.type == 'CN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="1" align="center"><b>Consession</b> </td>';
										}
								 
								//rateBody2+='<td height="1" align="center"> <b>'+paxType+'</b></td>';
								rateBody2+='<td height="1" align="center"><b>'+code+' </b></td>';
								rateBody2+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
								rateBody2+='<td height="1" align="center"><b>'+status+' </b></td>';
								rateBody2+="</tr>";	 
									}
						
						} 
						//}
						/*	for (var i = 0; i < paxCollection.length; i++) {
										var paxes = paxRo[paxCollection[i]];
										var code = paxes.code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(paxes.type == 'AD') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(paxes.type == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(paxes.type == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										else if(paxes.type == 'SR') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
										}else if(paxes.type == 'YT'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
										}else if(paxes.type == 'CN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status+'</td>';
										rateBody2+="</tr>";	
									}*/
						//}
						var finalExtrasTotalWithTax =0;
						var finalExtrasTotalWithOutTax =0;
						// extras bottom right box creation..
						var createdRoomTypeExtras = [];
						for(var i = 0; i<roomsTypeList.length; i++){
							
							var roomType =  roomsTypeList[i].roomType;
							if(createdRoomTypeExtras.indexOf(roomType)!= -1) continue;
							createdRoomTypeExtras.push(roomType);
							var extras =  roomsTypeList[i].extras;
							rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
							rightBox+="<tr>";
							rightBox+='<th>Room Type:&nbsp;&nbsp;&nbsp;'+roomType+'</th>';
							rightBox+="</tr>";
							if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
								if(extras!=' '){
									extras=extras.split(",");
									for(var j = 0; j<extras.length; j++){
										var extra=extras[j];
										if(extra!=' '){
											rightBox+="<tr >";
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
												'</table>'+
											'</td>';
											rightBox+='<td height="12" align="right">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=150 height="12"  align="right"><b>AUD 0.00</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>QT</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+="</tr>";	
										}
									}
								}
							}else{
								 //debugger;
								var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
								for(var u=0;u<extrasData.length;u++){
									var rt = extrasData[u].roomType;
									if(roomTypesTemps.indexOf(rt) != -1){
										var extra = extrasData[u].extras;
										var status = extrasData[u].status;
										var extrasAmt = extrasData[u].priceSell;
										if(!extrasAmt || extrasAmt == '') extrasAmt=0;
										var taxSell = extrasData[u].taxSell;
										if(!taxSell || taxSell == '') taxSell=0;
										finalExtrasTotalWithOutTax +=extrasAmt;
										finalExtrasTotalWithTax +=(extrasAmt+taxSell);
										rightBox+="<tr >";
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid;">'+
												'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
											'</table>'+
										'</td>';
										rightBox+='<td height="12" align="right">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=150 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=40 height="12"><b>'+status+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+="</tr>";
									}
									 
								}
							}
							rightBox+="</table>";
						}

						var rateBody3 = "";

						var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
						if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
						var pricingPriceCommission$ = rowRecordData["priceCommission$"];
						if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;
						var rateBody3 = "";
						
						if(rowRecordData["pricingPriceSell"]|| rowRecordData["pricingPriceSell"]==0) {
							rateBody3+="<tr>";
							rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalPrice,currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
 							rateBody3+='<td height="1" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
							//rateBody3+='<td height="1">'+(rowRecordData['pricingPriceIsNett']?(if(rowRecordData['displayMarkup'])TDS.util.Price.formatPrice(rowRecordData['displayMarkup'],currency):"")+'</td>';
							rateBody3+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
							rateBody3+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice((totalPrice+finalExtrasTotalWithTax+markupTt),currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
							rateBody3+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
							rateBody3+="</tr>";	
						}else{
							rateBody3+="<tr>";
							rateBody3+='<td height="20"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>'; 
							rateBody3+='<td height="1"> </td>'; 
							rateBody3+='<td height="1"> </td>'; 
							rateBody3+="</tr>";	
						} 

						
						details =  
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 25%;">Tour Name</th>'+
									'<th style="padding: 2px; width: 22%;">Type</th>'+
									//'<th style="padding: 2px; width: 20%;">Dep City</th>'+
									'<th style="padding: 2px; width: 20%;">Arrive</th>'+
									'<th style="padding: 2px; width: 33%;">Arr Date/Range</th>'+
									//'<th style="padding: 2px; width: 18%;">Arr City</th>'+
									'<th style="padding: 2px; width: 18%;">Depart</th>'+
									'<th style="padding: 2px; width: 20%;">Duration</th>'+
								'</tr>'+
								rateBody1+
							'</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;">Room Type</th>'+
									'<th style="padding: 2px; width: 20%;">Passenger Type</th>'+
									'<th style="padding: 2px; width: 10%;">Code</th>'+
									'<th style="padding: 2px; width: 20%;">Price Per Person</th>'+
									'<th style="padding: 2px; width: 10%;">Status</th>'+
								'</tr>'+
								rateBody2+
							 '</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #C0D9D9;">'+
									'<th style="padding: 2px; width: 14%;">Tour Price</th>'+
									'<th style="padding: 2px; width: 13%;">Gross/Net</th>'+
									'<th style="padding: 2px; width: 14%;">Extras(Nett)</th>'+
									'<th style="padding: 2px; width: 14%;">Markup</th>'+
									'<th style="padding: 2px; width: 20%;">Total Price (Gross)</th>'+
									'<th style="padding: 2px; width: 10%;">Tax</th>'+
									'<th style="padding: 2px; width: 7%;">Comm</th>'+
								'</tr>'+
								rateBody3+
							'</table>'+
							'<br>'+
							 '<div style="height:90px;"><div  style="height:100px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>Address: </b></div><div  style="height:100px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Facilities:'+rightBox+'</b></div></div>' ;
					}else if(componentType == TDS.data.componentType.TYPE_SIGHTSEEING){
 
 
							var data = Ext.util.JSON.decode(rowRecordData['parameters']);
							var tourName=data.tourName;
							var mainRooms=TDS.util.Format.displayResourceName(data.mainRooms);

							var gridData =  Ext.util.JSON.decode(data.gridData);

							var roomTypes ='';
							if(typeof gridData!='undefined'){
								roomTypes=gridData.data;
							}
							var status=	rowRecordData['status'];

							var nights = rowRecordData['durationNights'];
							if(typeof nights == 'undefined')nights = "";
							else nights = nights + " Nights ";
							var days = rowRecordData['durationDays'];
							if(typeof days == 'undefined')days = "";
							else days = days + " Days";

							var rateBody1="";
							var rateBody2="";

							var totalTourPrice = 0;

							if(typeof roomTypes !='undefined'){

								if(roomTypes.length=='0' && roomTypes.length<1){
									rateBody2+="<tr>";
									rateBody2+='<td height="20" >&nbsp;</td>';
									rateBody2+='<td > </td>';
									rateBody2+='<td > </td>';
									rateBody2+='<td >  </td>';
									rateBody2+='<td > </td>';
									rateBody2+="</tr>";	 
								 }
								var adult=0;
								var child=0;
								var infant=0;

								for(var i = 0; i<roomTypes.length; i++){
									
									var tourName =  gridData.data[i].tourName;
									var no =  gridData.data[i].no;
									if(gridData.data[i].a!="") adult+= parseInt(gridData.data[i].a);
									if(gridData.data[i].c!="") child+= parseInt(gridData.data[i].c);
									if(gridData.data[i].i!="") infant+= parseInt(gridData.data[i].i);

									rateBody1 +="<tr>";
									rateBody1+='<td height="20" align="center">&nbsp;<b>'+tourName+'</b></td>';
									rateBody1+='<td align="center"><b>'+ gridData.data[i].departs+'</b></td>';
									rateBody1+='<td align="center"><b>'+ gridData.data[i].dateFrom +'</b></td>';
									rateBody1+='<td align="center"><b>'+ gridData.data[i].duration+'</b></td>';
									rateBody1+="</tr>";
								}
								var adultPrice = 0;
								var childPrice = 0;
								var infantPrice = 0;
								debugger;
								var gridData =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
								var pricePerPaxType='';
								if(typeof gridData!='undefined'){ 
									pricePerPaxType=gridData.data; 
									for(var i = 0; i<pricePerPaxType.length; i++){
										var status1 = pricePerPaxType[i].status;
										var code = pricePerPaxType[i].code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(pricePerPaxType[i].paxType == 'AD') {
											adultPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'CH'){
											childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'IN'){
											infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(pricePerPaxType[i].priceSell,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status1+'</td>';
										rateBody2+="</tr>";	
										if(status1!="XX"){
											totalTourPrice += pricePerPaxType[i].priceSell;
										}
									}
								}else{
									for (var i = 0; i < paxCollection.length; i++) {
										var paxes = paxRo[paxCollection[i]];
										var code = paxes.code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(paxes.type == 'AD') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(paxes.type == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(paxes.type == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										else if(paxes.type == 'SR') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
										}else if(paxes.type == 'YT'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
										}else if(paxes.type == 'CN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status+'</td>';
										rateBody2+="</tr>";	
									}
								}
								
 							}else{
								rateBody1 ="<tr>";
								rateBody1+='<td height="20" align="center"> </b></td>';
								rateBody1+='<td align="center"><b>'+ rowRecordData['locationFromString']+'</b></td>';
								rateBody1+='<td align="center"><b>'+ TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay)+'</b></td>';
								rateBody1+='<td align="center"><b>'+ nights+days+'</b></td>';
								rateBody1+="</tr>";

								rateBody2+="<tr>";
								rateBody2+='<td height="20" align="center"> </td>';
								rateBody2+='<td align="center"></td>';
								rateBody2+='<td align="center"></td>';
								rateBody2+='<td align="center"></td>';
								rateBody2+="</tr>";	
							 }
 							var tt = 0;
 							var rateBody3 ="<tr>";
							var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
							if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
							var pricingPriceCommission$ = rowRecordData["priceCommission$"];
							if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;
							if(rowRecordData["pricingPriceSell"]|| rowRecordData["pricingPriceSell"]==0) {
								rateBody3+="<tr>";
								rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalTourPrice,currency)+'</b></td>';
								rateBody3+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
								//rateBody3+='<td height="1" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
								rateBody3+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
								rateBody3+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice((totalTourPrice+markupTt),currency)+'</b></td>';
								rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
								rateBody3+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
								rateBody3+="</tr>";	
							}else{
								rateBody3+="<tr>";
								rateBody3+='<td height="20"> </td>';
								rateBody3+='<td height="1"> </td>';
								rateBody3+='<td height="1"> </td>';
								rateBody3+='<td height="1"> </td>';
								rateBody3+='<td height="1"> </td>'; 
								rateBody3+='<td height="1"> </td>'; 
								rateBody3+="</tr>";	
							}
  
							details = 
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 25%;">Tour Name</th>'+
										'<th style="padding: 2px; width: 18%;">City</th>'+
										'<th style="padding: 2px; width: 15%;">Dep Date</th>'+
										'<th style="padding: 2px; width: 15%;">Duration</th>'+
									'</tr>'+
									rateBody1+
								'</table>'+
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 20%;">Passenger Type</th>'+
										'<th style="padding: 2px; width: 14%;">Code</th>'+
										'<th style="padding: 2px; width: 14%;">Price Per Person</th>'+ 
										'<th style="padding: 2px; width: 10%;">Status</th>'+
									'</tr>'+
									rateBody2+
								'</table>'+
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Tour Price</th>'+
										'<th style="padding: 2px; width: 14%;">Gross/Net</th>'+
										//'<th style="padding: 2px; width: 14%;"> Extras</th>'+
										 '<th style="padding: 2px; width: 14%;">Markup</th>'+
										'<th style="padding: 2px; width: 24%;">Total Price (Gross)</th>'+
										'<th style="padding: 2px; width: 10%;">Tax</th>'+
										'<th style="padding: 2px; width: 14%;">Comm</th>'+
									'</tr>'+
								rateBody3+
								'</table>' 
								 
							 ;
					}else if(componentType == TDS.data.componentType.TYPE_TRANSFER){ 
							
							var data = Ext.util.JSON.decode(rowRecordData['parameters']);
							var dropOffLocation=data.dropOffLocation;
							var dropOffLocationDetails=data.dropOffLocationDetails;
							var pickUpLocation=data.pickUpLocation;
							var pickUpLocationDetails=data.pickUpLocationDetails;
							var dateFrom = TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay);
							var startTimeHrs=data.startTimeHrs;
							var startTimeMin=data.startTimeMin;
							var totalPax=data.totalPax;
 							var mode=TDS.util.Format.displayResourceName(data.typeClassCategory);
 							var status=	rowRecordData['status'];
							var mainRooms=TDS.util.Format.displayResourceName(data.mainRooms);
							
							var gridData =  Ext.util.JSON.decode(mainRooms);
							var roomTypes='';
							var rateBody3="";
							
							if(typeof mainRooms!='undefined'){
								roomTypes=gridData.data;
							}
							
							if(roomTypes.length=='0' && roomTypes.length<1){
								rateBody3+="<tr>";
								rateBody3+='<td height="20" align="center"><b></b></td>';
								rateBody3+='<td height="20" align="center"><b></b></td>';
								rateBody3+='<td height="20" align="center"><b></b></td>';
								rateBody3+='<td height="20" align="center"><b></b> </td>' 
								rateBody3+="</tr>";
							 }

							var adultPrice = 0;
							var childPrice = 0;
							var infantPrice = 0;
							var totalTourPrice = 0;
							 
							debugger;
							var gridData =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
							var pricePerPaxType='';
							if(typeof gridData!='undefined'){ 
								pricePerPaxType=gridData.data; 
								for(var i = 0; i<pricePerPaxType.length; i++){
									var status1 = pricePerPaxType[i].status;
									var code = pricePerPaxType[i].code;
									if(typeof code == 'undefined')code='';
									rateBody3+="<tr>";
									if(pricePerPaxType[i].paxType == 'AD') {
										adultPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Adult</b> </td>';
									}else if(pricePerPaxType[i].paxType == 'CH'){
										childPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Child</b> </td>';
									}else if(pricePerPaxType[i].paxType == 'IN'){
										infantPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Infant</b> </td>';
									}
									rateBody3+='<td align="center"><b>'+code+'</b></td>';
									rateBody3+='<td align="center"><b>'+TDS.util.Price.formatPrice(pricePerPaxType[i].priceSell,currency)+'</b></td>';
									rateBody3+='<td align="center"><b> '+status1+'</td>';
									rateBody3+="</tr>";	
									if(status1!="XX"){
										totalTourPrice += pricePerPaxType[i].priceSell;
									}
								}
							}else{
								for (var i = 0; i < paxCollection.length; i++) {
									var paxes = paxRo[paxCollection[i]];
									var code = paxes.code;
									if(typeof code == 'undefined')code='';
									rateBody3+="<tr>";
									if(paxes.type == 'AD') {
										//adultPrice =paxes.priceSell;
										rateBody3+='<td height="20" align="center"><b>Adult</b> </td>';
									}else if(paxes.type == 'CH'){
										//childPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Child</b> </td>';
									}else if(paxes.type == 'IN'){
										//infantPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Infant</b> </td>';
									}
									else if(paxes.type == 'SR') {
										//adultPrice =paxes.priceSell;
										rateBody3+='<td height="20" align="center"><b>Senior</b> </td>';
									}else if(paxes.type == 'YT'){
										//childPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Youth</b> </td>';
									}else if(paxes.type == 'CN'){
										//infantPrice = pricePerPaxType[i].priceSell;
										rateBody3+='<td height="20" align="center"><b>Consession</b> </td>';
									}
									rateBody3+='<td align="center"><b>'+code+'</b></td>';
									rateBody3+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
									rateBody3+='<td align="center"><b> '+status+'</td>';
									rateBody3+="</tr>";	
								}
							}
							
							 	
							var rateBody1 ="<tr>";
							rateBody1+='<td  height="20" align="center"><b> '+ rowRecordData['locationFromString']+'</b></td>';
							rateBody1+='<td align="center"> <b>'+pickUpLocation +'</b></td>';
							rateBody1+='<td align="center"> <b> '+dropOffLocation +'</b></td>';
							rateBody1+='<td align="center"> <b> '+dateFrom +'</b></td>';
							rateBody1+='<td align="center"> <b> '+startTimeHrs+startTimeMin+'</b></td>';
							rateBody1+='<td align="center"> <b> '+mode+'</b></td>';
							rateBody1+="</tr>";
						
							var rateBody2 ="<tr>";
							rateBody2+='<td style="padding: 2px; width: 14%; height:30px; align="center"><b>'+pickUpLocationDetails+' </b></td>';
							rateBody2+='<td style="padding: 2px; width: 14%; height:30px; align="center"><b>'+dropOffLocationDetails+'</b></td>';
							rateBody2+="</tr>";
							 
							var currency = rowRecordData['pricingPriceCurrency'];
							var tt = 0;
							var rateBody4 ="<tr>";
							var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
							if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
							var pricingPriceCommission$ = rowRecordData["priceCommission$"];
							if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;
							if(rowRecordData["pricingPriceSell"]|| rowRecordData["pricingPriceSell"]==0) {
								rateBody4+="<tr>";
								rateBody4+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalTourPrice,currency)+'</b></td>';
								rateBody4+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
								//rateBody4+='<td height="1" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
								
								rateBody4+='<td height="1">'+ TDS.util.Price.formatPrice(markupTt,currency) +'</td>';
								rateBody4+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice((totalTourPrice+markupTt),currency)+'</b></td>';
								rateBody4+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
								rateBody4+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
								rateBody4+="</tr>";	
							}else{
								rateBody4+="<tr>";
								rateBody4+='<td height="20"> </td>';
								rateBody4+='<td height="1"> </td>';
								rateBody4+='<td height="1"> </td>';
								rateBody4+='<td height="1"> </td>';
								 rateBody4+='<td height="1"> </td>'; 
								rateBody4+='<td height="1"> </td>'; 
								rateBody4+="</tr>";	
							}

							
							details = 
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 20%;">City </th>'+
										'<th style="padding: 2px; width: 20%;">Pick Up</th>'+ 
										'<th style="padding: 2px; width: 20%;">Drop off </th>'+ 
										'<th style="padding: 2px; width: 14%;">Date </th>'+
										'<th style="padding: 2px; width: 14%;">Time </th>'+
										'<th style="padding: 2px; width: 14%;">Mode </th>'+
									'</tr>'+
									rateBody1+
								'</table>'+
								' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">P/U Details</th>'+
										'<th style="padding: 2px; width: 14%;">D/O Details</th>'+ 
										
									'</tr>'+
									rateBody2+
								'</table>'+
										
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Passenger Type</th>'+
										'<th style="padding: 2px; width: 14%;">Code</th>'+
										'<th style="padding: 2px; width: 14%;">Price Per Person</th>'+ 
										'<th style="padding: 2px; width: 14%;">Status</th>'+
									'</tr>'+
									rateBody3+
								'</table>'+

								' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Price</th>'+
										'<th style="padding: 2px; width: 10%;">Gross/Net</th>'+
										//'<th style="padding: 2px; width: 14%;">Total Extras</th>'+
										 '<th style="padding: 2px; width: 10%;">Total Markup</th>'+
										'<th style="padding: 2px; width: 24%;">Total Price (Gross)</th>'+
										'<th style="padding: 2px; width: 14%;">Tax</th>'+
										'<th style="padding: 2px; width: 14%;">Comm</th>'+
									'</tr>'+
								rateBody4+
								'</table>' ;
					}else if (componentType == TDS.data.componentType.TYPE_ACCOMMODATION) {
						 debugger;
						var finalExtrasTotalWithTax =0;
						var finalExtrasTotalWithOutTax =0;
						var accomodationBox="";
						var rightBox="";
						var rateBody1="";
						var rateBody2="";
						var rateBody3="";
						var data = Ext.util.JSON.decode(rowRecordData['parameters']);
						
						var noOfNights =  Ext.util.JSON.decode(data.noOfNights);
						var totalPax =  Ext.util.JSON.decode(data.totalPax);
						var typeClassCategory=TDS.util.Format.displayResourceName(data.typeClassCategory)
						var rating=TDS.util.Format.displayResourceName(data.rating);
						
						
						var address= data.address ;  //S
						var city =  data.city;  //S
						var country =  data.country;  //S
						var telephone =  data.telephone;  //S
						var email =  data.email;  //S
						var name = rowRecordData['name'];  //S

						if(typeof supplierData != 'undefined' && typeof supplierData.address!= 'undefined' ){
							if(supplierData.address != address){
								address = '<font color="red">'+supplierData.address+'</font>';
							} 
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.city!= 'undefined'){
							if(supplierData.city != city){
								city = '<font color="red">'+supplierData.city+'</font>';
							}
						}

						if(typeof supplierData != 'undefined' && typeof supplierData.country!= 'undefined'){
							if(supplierData.country != name){
								country = '<font color="red">'+supplierData.country+'</font>';
							}
						}
						if(typeof country == 'undefined' ){
							country = "";
						}
						if(country!=""){
							country = TDS.util.Format.displayResourceName('country/'+country);
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.telephone!= 'undefined' ){
							if(supplierData.telephone != telephone){
								telephone = '<font color="red">'+supplierData.telephone+'</font>';
							} 
						}
						if(typeof telephone == 'undefined' ){
							telephone = "";
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.email!= 'undefined'){
							if(supplierData.email != email){
								email = '<font color="red">'+supplierData.email+'</font>';
							}
						}
						if(typeof email == 'undefined' ){
							email = "";
						}
						if(typeof supplierData != 'undefined' && typeof supplierData.name!= 'undefined'){
							if(supplierData.name != name){
								name = '<font color="red">'+supplierData.name+'</font>';
							}
						}
 						
						var hotelPU =  data.hotelPU;
						var mainRooms=TDS.util.Format.displayResourceName(data.mainRooms);
						var gridData =  Ext.util.JSON.decode(data.gridData);
						var status=	rowRecordData['status'];
						if(typeof mainRooms!='undefined'){
							var mainRooms =  Ext.util.JSON.decode(data.mainRooms);
							var adult= mainRooms.data[0].adult;
							var child= mainRooms.data[0].child;
							var childAge= mainRooms.data[0].childAge;
							var infant= mainRooms.data[0].infant;
							var infantAge= mainRooms.data[0].infantAge;
						}
 						rateBody1 ="<tr>";
						rateBody1+='<td  height="20" align="center"> <b> '+rowRecordData['locationFromString']+'</b></td>';
						rateBody1+='<td height="2" align="center"> <b>'+name+'</b></td>';
						rateBody1+='<td height="2" align=center>&nbsp;<b>'+ rating+'</b></td>';
						rateBody1+='<td height="2" align=center><b>'+ TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay)+'</td>';
						rateBody1+='<td height="2" align=center><b>'+  TDS.util.Format.dateSpecial(rowRecordData['dateTo'],TDS.env.dateFormatDisplay)+'</b> </td>';
						rateBody1+='<td height="2" align=center><b>'+ noOfNights+'</b></td>';
						rateBody1+="</tr>";

						 var totalExtras=0,totalMarkUp=0,totalStayPrice = 0, currency = rowRecordData['pricingPriceCurrency'];
						 var roomTypes =  ""; 
						 if(typeof gridData!='undefined'){
						 roomTypes=gridData.data;
						 }else{
							rateBody2+="<tr>";
							rateBody2+='<td height="20" > </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1" >  </td>';
							rateBody2+='<td height="1">   </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1"> </td>';
							rateBody2+="</tr>";	 
						 }
						 var roomType="";
						 if(typeof roomTypes != 'undefined' || roomTypes == ""){
							if(roomTypes.length<0){

								rateBody2+="<tr>";
								rateBody2+='<td height="20"> </td>';
								rateBody2+='<td height="20"> </td>';
								rateBody2+='<td height="1"> </td>';
								rateBody2+='<td height="1"> </td>';
								rateBody2+='<td height="1"> </td>';
								rateBody2+='<td height="1"> </td>';
								rateBody2+="</tr>";	
							}
							else{
							var roomTypesTemp = [];
							debugger;
							var totalStayPerRoom = 0;
								for(var i = 0; i<roomTypes.length; i++){
									var roomType =  gridData.data[i].roomType;
									if(roomTypesTemp.indexOf(roomType)!=-1)continue;
									roomTypesTemp.push(roomType);
									var noOfRooms = 0;
									for(var j = 0; j<roomTypes.length; j++){
										if(roomTypes[j].roomType==roomType)noOfRooms++;
									}
									var status1="";
									var stayPerRoom = 0;
									var stayPerRoomPerNight = 0;
									if(typeof supplierData != 'undefined' && typeof supplierData.roomTypesWithPrice != 'undefined' ){
										var roomTypesWithPrice =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice).data;
										for(var q = 0; q<roomTypesWithPrice.length; q++){
											if(roomType==roomTypesWithPrice[q].roomType){
												stayPerRoom = roomTypesWithPrice[q].priceSell * noOfRooms * noOfNights;
												stayPerRoomPerNight = roomTypesWithPrice[q].priceSell;
												totalStayPerRoom+=stayPerRoom;
												status1 = roomTypesWithPrice[q].status;
											}
										}
									}
									
									var a =  gridData.data[i].a;
									var c =  gridData.data[i].c;
									var category =  gridData.data[i].category;
									var extras =  gridData.data[i].extras;
							 
									var plan =  gridData.data[i].plan;
									var roomNo =  gridData.data[i].roomNo;
									var rooms =  gridData.data[i].rooms;

									rateBody2+="<tr>";
									rateBody2+='<td height="20" align="center"><b>'+roomType+'</b></td>';
									rateBody2+='<td height="1" align="center"> <b>'+category+'</b></td>';
									rateBody2+='<td height="1" align="center"><b>'+plan+' </b></td>';
									rateBody2+='<td height="1" align="center"><b>'+noOfRooms+'</b> </td>';
									rateBody2+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice(stayPerRoomPerNight,currency)+'</b></td>';
									rateBody2+='<td height="1" align="center"><b>'+status1+' </b></td>';
									rateBody2+="</tr>";	 

											rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
											rightBox+="<tr>";
											rightBox+='<th>Room Type:&nbsp;&nbsp;&nbsp;'+roomType+'</th>';
											rightBox+="</tr>";
									if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
										if(extras!=' '){
											extras=extras.split(",");
											for(var j = 0; j<extras.length; j++){
												var extra=extras[j];
												if(extra!=' '){
													rightBox+="<tr >";
													rightBox+='<td height="12" align="left">'+
														'<table style="border-width:1px; border-style:solid;">'+
														'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
														'</table>'+
														'</td>';
													rightBox+='<td height="12" align="left">'+
														'<table style="border-width:1px; border-style:solid">'+
														'<td width=140 height="12"><b>AUD 0.00</b> </td>'+
														'</table>'+
														'</td>'; 
													rightBox+='<td height="12" align="left">'+
														'<table style="border-width:1px; border-style:solid">'+
														'<td width=40 height="12"><b>QT</b> </td>'+
														'</table>'+
														'</td>'; 
													rightBox+="</tr>";	
												}
											}
										}
									}else{
										debugger;
										var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
										for(var u=0;u<extrasData.length;u++){
											var rt = extrasData[u].roomType;
											if(roomType == rt){
												var extra = extrasData[u].extras;
												var status = extrasData[u].status;
												var extrasAmt = extrasData[u].priceSell;
												if(!extrasAmt) extrasAmt=0;
												var taxSell = extrasData[u].taxSell;
												if(!taxSell) taxSell=0;
												finalExtrasTotalWithOutTax +=extrasAmt;
												finalExtrasTotalWithTax +=(extrasAmt+taxSell);
												rightBox+="<tr >";
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
													'</table>'+
													'</td>';
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
													'<td width=140 height="12"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
													'</table>'+
													'</td>'; 
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>'+status+'</b> </td>'+
													'</table>'+
													'</td>'; 
												rightBox+="</tr>";
											}
											 
										}
									}
									rightBox+="</table>";
								}
							}
						}else{
							rateBody2+="<tr>";
							rateBody2+='<td height="20" > </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1" >  </td>';
							rateBody2+='<td height="1">   </td>';
							rateBody2+='<td height="1">  </td>';
							rateBody2+='<td height="1"> </td>';
							rateBody2+="</tr>"; 
						} 
						debugger;
						var rateBody3 = "";

						var extrasAmmount = rowRecordData["extrasAmount"];
						if(typeof extrasAmmount=='undefined' || extrasAmmount == null || extrasAmmount =="") extrasAmmount =0;

						var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
						if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;

						var pricingPriceCommission$ = rowRecordData["priceCommission$"];
						if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;

						var rateBody3 = "";
						var currency = rowRecordData["pricingPriceCurrency"];
						if(rowRecordData["pricingPriceSell"] || rowRecordData["pricingPriceSell"] == 0) {
							rateBody3+="<tr>";
							rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalStayPerRoom,currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
							rateBody3+='<td height="1">'+ TDS.util.Price.formatPrice(markupTt,currency) +'</td>';
							rateBody3+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice((totalStayPerRoom+finalExtrasTotalWithTax+markupTt),currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
							rateBody3+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
							rateBody3+="</tr>";	
						}else{
							rateBody3+="<tr>";
							rateBody3+='<td height="20"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>';
							rateBody3+='<td height="1"> </td>'; 
							rateBody3+="</tr>";	
						}
 						
						details = 
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #B2DFEE;">'+
							'<th style="padding: 2px; width: 44%;">City</th>'+
									'<th style="padding: 2px; width: 33%;">Property Name</th>'+
									'<th style="padding: 2px; width: 10%;">Rating</th>'+
									'<th style="padding: 2px; width: 16%;">In</th>'+
									'<th style="padding: 2px; width: 16%;">Out</th>'+
									'<th style="padding: 2px; width: 8%;">Nights</th>'+
								'</tr>'+
								rateBody1+
							'</table>'+
						'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #70DBDB;">'+
									'<th style="padding: 2px; width: 20%;">Room Type</th>'+
									'<th style="padding: 2px; width: 17%;">Category</th>'+
									'<th style="padding: 2px; width: 28%;"> Plan</th>'+
									'<th style="padding: 2px; width: 9%;">Rooms</th>'+
									'<th style="padding: 2px; width: 16%;">Price Per Night</th>'+
									//'<th style="padding: 2px; width: 10%;">Extras</th>'+
									'<th style="padding: 2px; width: 8%;">Status</th>'+
								'</tr>'+
								rateBody2+
							 '</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #C0D9D9;">'+
									'<th style="padding: 2px; width: 14%;">Stay Price</th>'+
									'<th style="padding: 2px; width: 13%;">Gross/Net</th>'+
									'<th style="padding: 2px; width: 14%;">Extras</th>'+
									'<th style="padding: 2px; width: 5%;">Markup</th>'+
									'<th style="padding: 2px; width: 14%;">Total Price (Gross)</th>'+
									'<th style="padding: 2px; width: 10%;">Tax</th>'+
									'<th style="padding: 2px; width: 10%;">Comm</th>'+
								'</tr>'+
							rateBody3+
							'</table>'+
							'<br>'+
							//extraSummary,
							//accomodationBox,
							  '<div style="height:90px; width:100%;"><div  style="height:100px; width:49.5%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>Address: <br>'+address+'<br>'+city+'<br>'+country+'<br>'+telephone+'<br>'+email+'</b></div><div  style="height:100px; width:49.5%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Extras:'+rightBox+'</b></div></div>'
						 ;
					}else if (componentType == TDS.data.componentType.TYPE_CAR) {

						 
						var data = Ext.util.JSON.decode(rowRecordData['parameters']);
						var rightBox="";
  						var rateBody1 ='';
						var rateBody2 ='';
						var rateBody3='';
						var rateBody4="";
						var subTotal=0;
						var mainTotal=0;

						var dropOffLocation=data.dropOffLocation; 
						var pickUpLocation=data.pickUpLocation; 
						var startTimeHrs=data.startTimeHrs;
						var endTimeHrs=data.endTimeHrs;
						var startTimeMin=data.startTimeMin;
						var endTimeMin=data.endTimeMin;
						var totalPax=data.totalPax;
						endTimeHrs+=':'+endTimeMin;
						startTimeHrs+=':'+startTimeMin;

						var noOfDays=data.noOfDays;
						var prefferedCompany =data.prefferedCompany;
						var autoClubMember=data.autoClubMember;
						var autoClubMemberCount=data.autoClubMemberCount;
						var airlineMember =data.airlineMember;
						var airlineMemberCount=data.airlineMemberCount;
						var isCroprateNo=data.isCroprateNo;
						var  croprateNo=data.croprateNo;

						var gridData =  Ext.util.JSON.decode(data.gridData);

						var roomTypes=[];
						if(typeof gridData!='undefined'){
							roomTypes=gridData.data;
							gridData=gridData.data;
						}

						var roomTypesWithPrice =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
						var carSizeCatPricing=[];
						var ee={};
						if(typeof roomTypesWithPrice!='undefined'){ carSizeCatPricing=roomTypesWithPrice.data; }
						for(var j=0; j<carSizeCatPricing.length;j++){
							var rt = carSizeCatPricing[j].carsize+carSizeCatPricing[j].category;
							if(typeof ee[rt] == 'undefined') ee[rt] = {};
							var wer = ee[rt];
							wer['priceSell'] =carSizeCatPricing[j].priceSell;
						}
								debugger;
						var finalExtrasTotalWithTax =0;
						var finalExtrasTotalWithOutTax =0;
						var createdCarSixeCategotyExtras = [];
						for(var i = 0; i<roomTypes.length; i++){ 
				
							var category=roomTypes[i].category;
							var carsize=roomTypes[i].carsize;
							var extras=roomTypes[i].extras;
							var fuel=roomTypes[i].fuel;
							var plan=roomTypes[i].plan;
							var roomNo=roomTypes[i].roomNo;
							var roomType=roomTypes[i].roomType;
							var rooms=roomTypes[i].rooms;
							var transmission=roomTypes[i].transmission;
							var age=roomTypes[i].age;
							var carSixeCategoty = carsize+category;
							var perPerDay =0;
							if(typeof ee[carSixeCategoty]!= 'undefined')
							  perPerDay = ee[carSixeCategoty].priceSell;
							if(perPerDay != '') subTotal += parseFloat((perPerDay * parseInt(noOfDays)));
									
							rateBody1+="<tr>";
							rateBody1+='<td height="20" align="center"><b>'+carsize+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+category+'</b></td>';
							rateBody1+='<td height="20" align="center"><b></b></td>';
							rateBody1+='<td height="20" align="center"><b>'+age+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+transmission+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+fuel+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+noOfDays+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(perPerDay,currency)+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+status+'</b></td>';
							rateBody1+="</tr>"; 
							
							//var roomType =  roomTypes[i].roomType;
							if(createdCarSixeCategotyExtras.indexOf(carSixeCategoty)!= -1){
							}else{
								createdCarSixeCategotyExtras.push(carSixeCategoty);
								var extras =  roomTypes[i].extras;
								rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
								rightBox+="<tr>";
								rightBox+='<th>Car size:&nbsp;&nbsp;&nbsp;'+carsize+'<br>Category:&nbsp;&nbsp;&nbsp;'+category+'</th>';
								rightBox+="</tr>";
								if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
									if(typeof extras != 'undefined' && extras!=' '){
										extras=extras.split(",");
										for(var j = 0; j<extras.length; j++){
											var extra=extras[j];
											if(extra!=' '){
												rightBox+="<tr >";
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid;">'+
														'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
													'</table>'+
												'</td>';
												rightBox+='<td height="12" align="right">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=170 height="12"  align="right"><b>AUD 0.00</b> </td>'+
													'</table>'+
												'</td>'; 
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=40 height="12"><b>QT</b> </td>'+
													'</table>'+
												'</td>'; 
												rightBox+="</tr>";	
											}
										}
									}
								}else{
									 //debugger;
									var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
									for(var u=0;u<extrasData.length;u++){
										var rt = extrasData[u].carsize+extrasData[u].category;
										if(carSixeCategoty == rt){
											var extra = extrasData[u].extras;
											var status = extrasData[u].status;
											var extrasAmt = extrasData[u].priceSell;
											if(!extrasAmt || extrasAmt == '') extrasAmt=0;
											var taxSell = extrasData[u].taxSell;
											if(!taxSell || taxSell == '') taxSell=0;
											finalExtrasTotalWithOutTax +=extrasAmt;
											finalExtrasTotalWithTax +=(extrasAmt+taxSell);
											rightBox+="<tr >";
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
												'</table>'+
											'</td>';
											rightBox+='<td height="12" align="right">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=170 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>'+status+'</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+="</tr>";
										}
										 
									}
								}
							}
							rightBox+="</table>";
						}  
						preferredCompanyCar='<td height="0" align=center width="22%"><b>Preferred Company: '+prefferedCompany+'</b> </td>'; 

						var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
						if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="")			pricingPriceCommission =0;
						var pricingPriceCommission$ = rowRecordData["priceCommission$"];
						if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="")		pricingPriceCommission$ =0;
						  
						rateBody2+="<tr>";
						rateBody2+='<td height="20" align="center">&nbsp;<b>'+TDS.util.Price.formatPrice(subTotal,currency)+'</b></td>';
						rateBody2+='<td align="center">&nbsp;<b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
						rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice( finalExtrasTotalWithTax ,currency)+'</b> </td>';
						rateBody2+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
						rateBody2+='<td align="center"><b> '+TDS.util.Price.formatPrice((subTotal+finalExtrasTotalWithTax),currency)+'</b></td>';
						rateBody2+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
						rateBody2+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
						rateBody2+="</tr>";
					

						rateBody3+="<tr>";
						rateBody3+='<td height="20" align="center"><b>'+rowRecordData['locationFromString']+'</b></td>';
						rateBody3+='<td height="20" align="center"><b>'+pickUpLocation+'</b></td>';
						rateBody3+='<td height="20" align="center"><b>'+  TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay)+'</b></td>';
						rateBody3+='<td height="20" align="center"><b>'+startTimeHrs+'</b></td>';
						rateBody3+="</tr>";

						rateBody4+="<tr>";
						rateBody4+='<td height="20" align="center"><b>'+rowRecordData['locationToString']+'</b></td>';
						rateBody4+='<td height="20" align="center"><b>'+dropOffLocation+'</b></td>';
						rateBody4+='<td height="20" align="center"><b>'+  TDS.util.Format.dateSpecial(rowRecordData['dateTo'],TDS.env.dateFormatDisplay)+'</b></td>';
						rateBody4+='<td height="20" align="center"><b>'+endTimeHrs+'</b></td>'
						rateBody4+="</tr>";
 
						details = 
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 22%;"> Car Size</th>'+
									'<th style="padding: 2px; width: 22%;"align=center>Category</th>'+
									'<th style="padding: 2px; width: 20%;">Made/Model</th>'+
									'<th style="padding: 2px; width: 16%;"> Driver Age</th>'+
									'<th style="padding: 2px; width: 18%;"align=center>Transmission</th>'+
									'<th style="padding: 2px; width: 10%;">Fuel</th>'+
									'<th style="padding: 2px; width: 8%;"align=center>Days</th>'+
									'<th style="padding: 2px; width: 14%;"align=center>Price P/D</th>'+
									'<th style="padding: 2px; width: 14%;"align=center>Status</th>'+
								'</tr>'+
								rateBody1+
							'</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;"align=right>Total</th>'+
									'<th style="padding: 2px; width: 10%;"align=center>Gross/Net</th>'+
									'<th style="padding: 2px; width: 14%;"align=center>Options</th>'+
									 '<th style="padding: 2px; width: 14%;"align=right>Markup</th>'+ 
									'<th style="padding: 2px; width: 24%;"align=right>Total Price (Gross)</th>'+
									'<th style="padding: 2px; width: 14%;"align=right>Tax</th>'+
									'<th style="padding: 2px; width: 14%;"align=right>Comm</th>'+
								'</tr>'+
								rateBody2+
							'</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;">From</th>'+
									'<th style="padding: 2px; width: 14%;">Pick-Up</th>'+
									'<th style="padding: 2px; width: 14%;" align=center>Date</th>'+
									'<th style="padding: 2px; width: 14%;" align=center>Time</th>'+ 
								'</tr>'+
								rateBody3+
							 '</table>'+
							' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;">Return</th>'+
									'<th style="padding: 2px; width: 14%;">Drop-Off</th>'+
									 '<th style="padding: 2px; width: 14%;">Date</th>'+
									'<th style="padding: 2px; width: 14%;">Time</th>'+
								'</tr>'+
								rateBody4+
							'</table>'+
							'<br>'+
							'<div style="height:90px;"><div  style="height:100px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b> </b></div><div  style="height:100px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Options:'+rightBox+'</b></div></div>'
						;
					}else if (componentType == TDS.data.componentType.TYPE_RAIL) {
							debugger;
						var rateBody2 ="";
						var rightBox="";
						var leftBox="";

						var data = Ext.util.JSON.decode(rowRecordData['parameters']);
						var totalFinal=0;
						 
						var gridData1 =  Ext.util.JSON.decode(data.gridData1);

						var roomTypes1=[];
						if(typeof gridData1!='undefined'){
							roomTypes1=gridData1.data;
							gridData1=gridData1.data;
						}


						var departs="";
						var arrives="";
						var date="";
						var trainNo="";
						var no="";
						var deptimeHr="";
						var deptimeMin= "";
						var noOfPax="";
						var cls="";
							
						for(var i = 0; i<roomTypes1.length; i++){ 

							departs=roomTypes1[i].departs;
							arrives=roomTypes1[i].arrives;
							date=roomTypes1[i].date;
							trainNo=roomTypes1[i].trainNo;
							no=roomTypes1[i].no;
							deptimeHr=roomTypes1[i].deptimeHr;
							deptimeMin=roomTypes1[i].deptimeMin;
							noOfPax=roomTypes1[i].noOfPax;
							cls=roomTypes1[i].cls;

						}
						var time=deptimeHr+':'+deptimeMin;
						var gridData =  Ext.util.JSON.decode(data.gridData);

						var roomTypes=[];
						if(typeof gridData!='undefined'){
							roomTypes=gridData.data;
							gridData=gridData.data;
						} 
						var serciceName="";
						var totalTourPrice=0;
						var adult=0;
						var child=0;
						var infant=0;
						var cn=0;
						var youth=0;
						var senior=0;
						for(var i = 0; i<roomTypes.length; i++){
							var tourName =  roomTypes[i].tourName;
							if(typeof roomTypes[i].a != 'undefined' && roomTypes[i].a!="")  adult+= parseInt(roomTypes[i].a);
							if(typeof roomTypes[i].c != 'undefined' && roomTypes[i].c!="")  child+= parseInt(roomTypes[i].c);
							if(typeof roomTypes[i].i != 'undefined' && roomTypes[i].i!="")  infant+= parseInt(roomTypes[i].i);
							if(typeof roomTypes[i].s != 'undefined' && roomTypes[i].s!="")  senior+= parseInt(roomTypes[i].s);
							if(typeof roomTypes[i].s != 'undefined' && roomTypes[i].s!="")  cn+= parseInt(roomTypes[i].co);
							if(typeof roomTypes[i].s != 'undefined' && roomTypes[i].s!="")  youth+= parseInt(roomTypes[i].y);
						}
						var adultPrice = 0;
						var childPrice = 0;
						var infantPrice = 0;
						var cnPrice = 0;
						var youthPrice = 0;
						var seniorPrice = 0;
						 
						var gridData1 =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
								var pricePerPaxType='';
								if(typeof gridData1!='undefined'  ){ 
									pricePerPaxType=gridData1.data; 
									for(var i = 0; i<pricePerPaxType.length; i++){
										var status1 = pricePerPaxType[i].status;
										var code = pricePerPaxType[i].code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(pricePerPaxType[i].paxType == 'AD') {
											//adultPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'SR' || pricePerPaxType[i].paxType == 'Senior') {
											adultPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'YT'  || pricePerPaxType[i].paxType == 'Youth'){
											childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'CN'){
											infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(pricePerPaxType[i].priceSell,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status1+'</td>';
										rateBody2+="</tr>";	
										if(status1!="XX"){
											totalTourPrice += pricePerPaxType[i].priceSell;
										}
									}
								}else{
 
									for (var i = 0; i < paxCollection.length; i++) {
										var paxes = paxRo[paxCollection[i]];
										var code = paxes.code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(paxes.type == 'AD') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(paxes.type == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(paxes.type == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										else if(paxes.type == 'SR') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
										}else if(paxes.type == 'YT'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
										}else if(paxes.type == 'CN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status+'</td>';
										rateBody2+="</tr>";	
									}
								}
								
						 
							if(adult == 0 && child == 0 && infant == 0 && cn==0 && youth==0 && senior==0){
								rateBody2+="<tr>";
								rateBody2+='<td align="center"><b> </b></td>';
								rateBody2+='<td align="center"><b> </b></td>';
								rateBody2+='<td align="center"><b> </b></td>';
								rateBody2+='<td align="center"><b> </b></td>'; 
								rateBody2+="</tr>";	 
							}
							var finalExtrasTotalWithTax =0;
							var finalExtrasTotalWithOutTax =0;
							// extras bottom right box creation..
							var createdRoomTypeExtras = [];
							for(var i = 0; i<roomTypes.length; i++){
							 
								var extras =  roomTypes[i].extras;
								var optionService =  roomTypes[i].optionService;
								rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
								rightBox+="<tr>";
								//rightBox+='<th>Room Type:&nbsp;&nbsp;&nbsp;'+roomType+'</th>';
								rightBox+="</tr>";

								leftBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
								if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
									if(extras!=' '){
										extras=extras.split(",");
										for(var j = 0; j<extras.length; j++){
											var extra=extras[j];
											if(extra!=' '){
												rightBox+="<tr>";
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid;">'+
														'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
													'</table>'+
												'</td>';
												rightBox+='<td height="12" align="right">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=150 height="12"  align="right"><b>AUD 0.00</b> </td>'+
													'</table>'+
												'</td>'; 
												rightBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=40 height="12"><b>QT</b> </td>'+
													'</table>'+
												'</td>'; 
												rightBox+="</tr>";	
											}
										}
									}
									if(optionService!=' '){
										optionService=optionService.split(",");
										for(var j = 0; j<optionService.length; j++){
											var option=optionService[j];
											if(optionService!=' '){
												leftBox+="<tr>";
												leftBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid;">'+
														'<td height="12" width=500 > <b><b>'+option+'</b></b></td>'+
													'</table>'+
												'</td>';
												leftBox+='<td height="12" align="right">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=150 height="12"  align="right"><b>AUD 0.00</b> </td>'+
													'</table>'+
												'</td>'; 
												leftBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=40 height="12"><b>QT</b> </td>'+
													'</table>'+
												'</td>'; 
												leftBox+="</tr>";	
											}
										}
									}
								}else{
									 debugger;
									var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
									for(var u=0;u<extrasData.length;u++){
										var rt = extrasData[u].roomType;
										var extra = extrasData[u].extras;
										var option = extrasData[u].option;
										var status = extrasData[u].status;
										var extrasAmt = extrasData[u].priceSell;
										if(!extrasAmt || extrasAmt == '') extrasAmt=0;
										var taxSell = extrasData[u].taxSell;
										if(!taxSell || taxSell == '') taxBSell=0;
										finalExtrasTotalWithOutTax +=extrasAmt;
										finalExtrasTotalWithTax +=(extrasAmt+taxSell);
										if(extra!=''){
											rightBox+="<tr>";
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
												'</table>'+
											'</td>';
											rightBox+='<td height="12" align="right">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=150 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>'+status+'</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+="</tr>";
										}else{
											if(option!=' '){
												leftBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid;">'+
														'<td height="12" width=500 > <b><b>'+option+'</b></b></td>'+
													'</table>'+
												'</td>';
												leftBox+='<td height="12" align="right">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=150 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
													'</table>'+
												'</td>'; 
												leftBox+='<td height="12" align="left">'+
													'<table style="border-width:1px; border-style:solid">'+
														'<td width=40 height="12"><b>'+status+'</b> </td>'+
													'</table>'+
												'</td>'; 
												leftBox+="</tr>";
											}
										}
									}
								}
								rightBox+="</table>";
								leftBox+="</table>";
							}
							var rateBody1 ="<tr>";
							rateBody1+='<td align="center"><b> '+trainNo+'</b> </td>';
							rateBody1+='<td height="20" >&nbsp; <b>'+departs+'</b></td>';
							rateBody1+='<td align="center" ><b>'+TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay)+'</b> </td>';
							rateBody1+='<td align="center"> <b>'+time+'</b> </td>';
							rateBody1+='<td align="center"> <b>'+cls+'</b></td>';
							rateBody1+='<td align="center"><b>'+arrives+' </b> </td>';
							rateBody1+="</tr>";
						 
					  
							var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
							if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
							var pricingPriceCommission$ = rowRecordData["priceCommission$"];
							if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;

							var rateBody3="";
							rateBody3+="<tr>";
							rateBody3+='<td height="20" >&nbsp;<b>'+TDS.util.Price.formatPrice(totalTourPrice,currency)+'</b></td>';
							rateBody3+='<td >&nbsp;<b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
							rateBody3+='<td height="20" >&nbsp;<b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
							rateBody2+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
							rateBody3+='<td ><b> '+TDS.util.Price.formatPrice((totalTourPrice+finalExtrasTotalWithTax+markupTt),currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
							rateBody3+='<td  align="center"><b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>';
							rateBody3+="</tr>";

							
							details = 
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 16%;">Train No</th>'+
										'<th style="padding: 2px; width: 24%;">Depart</th>'+
										'<th style="padding: 2px; width: 10%;">Date</th>'+
										'<th style="padding: 2px; width: 8%;">Time</th>'+
										'<th style="padding: 2px; width: 14%;">Class</th>'+
										'<th style="padding: 2px; width: 24%;">Arrives</th>'+
									'</tr>'+
									rateBody1+
								'</table>'+
								 '<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
									 
										'<th style="padding: 2px; width: 16%;">Passenger Type</th>'+
										'<th style="padding: 2px; width: 5%;">Code</th>'+
										'<th style="padding: 2px; width: 16%;">Price Per Person</th>'+ 
										'<th style="padding: 2px; width: 14%;">Status</th>'+
									'</tr>'+
									rateBody2+
								'</table>'+

								' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
//											'<th style="padding: 2px; width: 14%;">Seat/Cabin</th>'+
										'<th style="padding: 2px; width: 14%;">Trip Price</th>'+
										 '<th style="padding: 2px; width: 14%;">Gross/Net</th>'+
										'<th style="padding: 2px; width: 14%;">Extras</th>'+
										 '<th style="padding: 2px; width: 14%;">Markup</th>'+
										'<th style="padding: 2px; width: 14%;">Total (Gross)</th>'+
										'<th style="padding: 2px; width: 14%;">Tax</th>'+
										'<th style="padding: 2px; width: 14%;">Comm</th>'+
									'</tr>'+
									rateBody3+
								'</table>'+
								'<br>'+
								'<div style="height:90px;"><div  style="height:100px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>Options:'+leftBox+' </b></div><div  style="height:100px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Extras:'+rightBox+'</b></div></div>'
							;
					}
					else if (componentType == TDS.data.componentType.TYPE_AIR) {
						var airBox='<div style="height:90px;"><div  style="height:100px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>'+extraNotes+'</b></div><div  style="height:100px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Special Services:'+extraNotes+'</b></div></div>';

						var rateBody1="";
						var rateBody2="";
						var rateBody3="";
						var leftBox='';
						var rightBox='';
						var data = Ext.util.JSON.decode(rowRecordData['parameters']);

						var flightNo=data.flightNo;
						var specialservice="";

						var totalPax=data.totalPax;
						var startTimeHrs=data.startTimeHrs;
						var startTimeMin=data.startTimeMin;
						var classs=data.class;
						var hasPreferedAirline=data.hasPreferedAirline;
						var preferedAirline=data.preferedAirline;
						var airlineMembership=data.airlineMembership;
						var airlineMembershipCount=data.airlineMembershipCount;

						 

						var gridData =  Ext.util.JSON.decode(data.gridData);

						var roomTypes='';
						if(typeof gridData!='undefined'){
							roomTypes=gridData.data;
							gridData=gridData.data;
						}

						var gridData1 =  Ext.util.JSON.decode(data.gridData1);
						var roomTypes1='';
						if(typeof gridData1!='undefined'){
							roomTypes1=gridData1.data;
							gridData1=gridData1.data;
						}
						var roomTypesWithPrice =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
						var roomTypesWithPriceList='';
						if(typeof roomTypesWithPrice!='undefined'){
							roomTypesWithPriceList=roomTypesWithPrice.data;
						}
								
						for(var i = 0; i<roomTypes1.length; i++){ 
							rateBody1 ="<tr>";
							rateBody1+='<td height="20" align="center"><b>'+roomTypes1[i].flightNo+'</b></td>';
							rateBody1+='<td  align="center"><b>'+roomTypes1[i].departs+'</b></td>';
							rateBody1+='<td  align="center"><b>'+roomTypes1[i].arrives+'</b></td>';
							rateBody1+='<td  align="center"><b>'+roomTypes1[i].date+'</b></td>';
							rateBody1+='<td  align="center"><b> '+roomTypes1[i].deptimeHr+roomTypes1[i].deptimeMin+'</b></td>';
							rateBody1+='<td  align="center"><b>'+classs+' </b></td>';
							rateBody1+='<td  align="center"><b>'+roomTypes1[i].noOfPax+'</b></td>';
							rateBody1+="</tr>";
						}
//debugger;
						var fairType="";
						var adult=0;
						var child=0;
						var infant=0;
						var totalTourPrice=0;
						 for(var j = 0; j<gridData.length; j++){ 
							if(fairType!='')fairType+=', ';
							fairType+=gridData[j].fairType;
							if(typeof gridData[j].a!= 'undefined' && gridData[j].a!='')adult+=gridData[j].a;
							if(typeof gridData[j].c!= 'undefined' && gridData[j].c!='')child+= gridData[j].c;
							if(typeof gridData[j].i!= 'undefined' && gridData[j].i!='')infant+= gridData[j].i;
						}
						var gridData1 =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
								var pricePerPaxType='';
								if(typeof gridData1!='undefined'  ){ 
									pricePerPaxType=gridData1.data; 
									for(var i = 0; i<pricePerPaxType.length; i++){
										var status1 = pricePerPaxType[i].status;
										var code = pricePerPaxType[i].code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(pricePerPaxType[i].paxType == 'AD') {
											adultPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'CH'){
											childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(pricePerPaxType[i].paxType == 'IN'){
											infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(pricePerPaxType[i].priceSell,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status1+'</td>';
										rateBody2+="</tr>";	
										if(status1!="XX"){
											totalTourPrice += pricePerPaxType[i].priceSell;
										}
									}
								}else{
 
									for (var i = 0; i < paxCollection.length; i++) {
										var paxes = paxRo[paxCollection[i]];
										var code = paxes.code;
										if(typeof code == 'undefined')code='';
										rateBody2+="<tr>";
										if(paxes.type == 'AD') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
										}else if(paxes.type == 'CH'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
										}else if(paxes.type == 'IN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
										}
										else if(paxes.type == 'SR') {
											//adultPrice =paxes.priceSell;
											rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
										}else if(paxes.type == 'YT'){
											//childPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
										}else if(paxes.type == 'CN'){
											//infantPrice = pricePerPaxType[i].priceSell;
											rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
										}
										rateBody2+='<td align="center"><b>'+code+'</b></td>';
										rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
										rateBody2+='<td align="center"><b> '+status+'</td>';
										rateBody2+="</tr>";	
									}
								}
								
						 	 
						var finalExtrasTotalWithTax =0;
						var finalExtrasTotalWithOutTax =0;
						// extras bottom right box creation..
						var createdRoomTypeExtras = [];
						for(var i = 0; i<gridData.length; i++){
							
							var roomType =  gridData[i].fairType;
							if(createdRoomTypeExtras.indexOf(roomType)!= -1) continue;
							createdRoomTypeExtras.push(roomType);
							var extras =  gridData[i].extras;
							rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
							rightBox+="<tr>";
							rightBox+='<th>Fair Type:&nbsp;&nbsp;&nbsp;'+roomType+'</th>';
							rightBox+="</tr>";
							if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
								if(typeof extra != 'undefined' && extras!=' '){
									extras=extras.split(",");
									for(var j = 0; j<extras.length; j++){
										var extra=extras[j];
										if(extra!=' '){
											rightBox+="<tr >";
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
												'</table>'+
											'</td>';
											rightBox+='<td height="12" align="right">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=150 height="12"  align="right"><b>AUD 0.00</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>QT</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+="</tr>";	
										}
									}
								}
							}else{
								 //debugger;
								var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
								for(var u=0;u<extrasData.length;u++){
									var rt = extrasData[u].roomType;
									if(roomType == rt){
										var extra = extrasData[u].extras;
										var status = extrasData[u].status;
										var extrasAmt = extrasData[u].priceSell;
										if(!extrasAmt || extrasAmt == '') extrasAmt=0;
										var taxSell = extrasData[u].taxSell;
										if(!taxSell || taxSell == '') taxSell=0;
										finalExtrasTotalWithOutTax +=extrasAmt;
										finalExtrasTotalWithTax +=(extrasAmt+taxSell);
										rightBox+="<tr >";
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid;">'+
												'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
											'</table>'+
										'</td>';
										rightBox+='<td height="12" align="right">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=150 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=40 height="12"><b>'+status+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+="</tr>";
									}
									 
								}
							}
							rightBox+="</table>";
						}
							
						if(specialservice != ''){
							rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 width=390>";
							rightBox+="<tr>";
							rightBox+='<td height="20" align="left"><table style="border-width:1px; border-style:solid;"> <td width=400> <b><b>'+specialservice+'</b></b></td> </table></td>';
							rightBox+='<td height="20" align="left"><table style="border-width:1px; border-style:solid">   <td width=100><b>AUD 0.00</b> </td> </table></td>'; 
							rightBox+="</tr>";	 
							rightBox+="</table>";
						}
						
						var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
						if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
						var pricingPriceCommission$ = rowRecordData["priceCommission$"];
						if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;

						rateBody3+="<tr>";
						rateBody3+='<td height="20" align="center"><b>'+fairType+'</b></td>';
						rateBody3+='<td  align="center"><b>'+TDS.util.Price.formatPrice( totalTourPrice ,currency)+'</b></td>';
						rateBody3+='<td  align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
						rateBody3+='<td  align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax, currency)+'</b></td>';
						rateBody3+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
						rateBody3+='<td  align="center"><b>'+TDS.util.Price.formatPrice((totalTourPrice+finalExtrasTotalWithTax+markupTt) ,currency)+'</b></td>';
						rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
						rateBody3+='<td  align="center"><b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>';
						rateBody3+="</tr>";	 
						
						details = 
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 10%;">Flt No</th>'+
									'<th style="padding: 2px; width: 14%;">Departs</th>'+ 
									'<th style="padding: 2px; width: 14%;">Arrives</th>'+
									'<th style="padding: 2px; width: 10%;">Date</th>'+
									'<th style="padding: 2px; width: 10%;">Time</th>'+
									'<th style="padding: 2px; width: 24%;">Class</th>'+
									'<th style="padding: 2px; width: 8%;">Seats</th>'+
								'</tr>'+
								rateBody1+
							'</table>'+
							'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;">Passenger Type</th>'+
									'<th style="padding: 2px; width: 14%;">Code</th>'+
									'<th style="padding: 2px; width: 14%;">Price Per Person</th>'+ 
									'<th style="padding: 2px; width: 14%;">Status</th>'+
								'</tr>'+
								rateBody2+
							'</table>'+
							' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
								'<tr style="background-color: #d0def0;">'+
									'<th style="padding: 2px; width: 14%;">Fare Type</th>'+
									'<th style="padding: 2px; width: 14%;">Price</th>'+
									 '<th style="padding: 2px; width: 12%;">Gross/Net</th>'+
									'<th style="padding: 2px; width: 14%;">Extras</th>'+
									'<th style="padding: 2px; width: 14%;">Markup</th>'+
									'<th style="padding: 2px; width: 20%;">Total Price (Gross)</th>'+
									'<th style="padding: 2px; width: 14%;">Tax</th>'+
									'<th style="padding: 2px; width: 14%;">Comm</th>'+
								'</tr>'+
								rateBody3+
							'</table>'+
							'<br>'+
							'<div style="height:90px;"><div  style="height:100px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>Notes:'+leftBox+' </b></div><div  style="height:100px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Special Services:'+rightBox+'</b></div></div>' ;
					}else if (componentType == TDS.data.componentType.TYPE_ATTRACTION) {

							var rateBody1="";
							var rateBody2="";
							var rateBody3="";

							var data = Ext.util.JSON.decode(rowRecordData['parameters']);
							var status=	rowRecordData['status']; 
							var gridData =  Ext.util.JSON.decode(data.gridData);

							var roomTypes=[];
							if(typeof gridData!='undefined'){ roomTypes=gridData.data; } 
							var serciceName="";
							var adultPrice = 0;
							var childPrice = 0;
							var infantPrice = 0;
							var totalTourPrice = 0;
							var roomTypesWithPrice =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
							var pricePerPaxType=[];
							if(typeof roomTypesWithPrice!='undefined'){ 
								pricePerPaxType=roomTypesWithPrice.data; 
							}

							

							if(roomTypes.length=='0' && roomTypes.length<1){
								rateBody2+="<tr>";
								rateBody2+='<td height="20" >&nbsp;</td>';
								rateBody2+='<td > </td>';
								rateBody2+='<td > </td>';
								rateBody2+='<td >  </td>';
								rateBody2+='<td > </td>';
								rateBody2+="</tr>";	 
							 }
							/*var adult=0;
							var child=0;
							var infant=0;

							 for(var i = 0; i<roomTypes.length; i++){
								
								var tourName =  gridData.data[i].tourName;
								var no =  gridData.data[i].no;
								if(gridData.data[i].a!="") adult+= parseInt(gridData.data[i].a);
								if(gridData.data[i].c!="") child+= parseInt(gridData.data[i].c);
								if(gridData.data[i].i!="") infant+= parseInt(gridData.data[i].i);
							} */
							var adultPrice = 0;
							var childPrice = 0;
							var infantPrice = 0;
							debugger;
							var gridData =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
							var pricePerPaxType='';
							if(typeof gridData!='undefined'){ 
								pricePerPaxType=gridData.data; 
								for(var i = 0; i<pricePerPaxType.length; i++){
									var status1 = pricePerPaxType[i].status;
									var code = pricePerPaxType[i].code;
									if(typeof code == 'undefined')code='';
									rateBody2+="<tr>";
									rateBody2+='<td align="center"><b>'+rowRecordData['name']+'</b></td>';
									rateBody2+='<td >'+ rowRecordData['name']+'</td>';
									if(pricePerPaxType[i].paxType == 'AD') {
										adultPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
									}else if(pricePerPaxType[i].paxType == 'CH'){
										childPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
									}else if(pricePerPaxType[i].paxType == 'IN'){
										infantPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
									}
									rateBody2+='<td align="center"><b>'+code+'</b></td>';
									rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(pricePerPaxType[i].priceSell,currency)+'</b></td>';
									rateBody2+='<td align="center"><b> '+status1+'</td>';
									rateBody2+="</tr>";	
									if(status1!="XX"){
										totalTourPrice += pricePerPaxType[i].priceSell;
									}
								}
							}else{
								for (var i = 0; i < paxCollection.length; i++) {
									var paxes = paxRo[paxCollection[i]];
									var code = paxes.code;
									if(typeof code == 'undefined')code='';
									rateBody2+="<tr>";
									rateBody2+='<td align="center"><b>'+rowRecordData['name']+'</b></td>';
									if(paxes.type == 'AD') {
										//adultPrice =paxes.priceSell;
										rateBody2+='<td height="20" align="center"><b>Adult</b> </td>';
									}else if(paxes.type == 'CH'){
										//childPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Child</b> </td>';
									}else if(paxes.type == 'IN'){
										//infantPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Infant</b> </td>';
									}
									else if(paxes.type == 'SR') {
										//adultPrice =paxes.priceSell;
										rateBody2+='<td height="20" align="center"><b>Senior</b> </td>';
									}else if(paxes.type == 'YT'){
										//childPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Youth</b> </td>';
									}else if(paxes.type == 'CN'){
										//infantPrice = pricePerPaxType[i].priceSell;
										rateBody2+='<td height="20" align="center"><b>Consession</b> </td>';
									}
									rateBody2+='<td align="center"><b>'+code+'</b></td>';
									rateBody2+='<td align="center"><b>'+TDS.util.Price.formatPrice(0,currency)+'</b></td>';
									rateBody2+='<td align="center"><b> '+status+'</td>';
									rateBody2+="</tr>";	
								}
							}
 						 
							for(var i = 0; i<roomTypes.length; i++){ 

								var departs=roomTypes[i].departs;
								var dateFrom=roomTypes[i].dateFrom;
								var dateTo=roomTypes[i].dateTo;
								var duration=roomTypes[i].duration;
								var serviceType=roomTypes[i].serviceType;
								serciceName=roomTypes[i].serciceName;

								var dateRange='';
								if(dateFrom && dateTo) dateRange= 	dateFrom + ' - '+dateTo;
								else if(dateTo) dateRange=dateTo;
								else if(dateFrom) dateRange=dateFrom;

								 
 
								rateBody1 ="<tr>";
								rateBody1+='<td height="20" align="center"><b>'+rowRecordData['locationFromString']+'</b></td>';
								rateBody1+='<td align="center"><b>'+dateRange+'</b></td>';
								rateBody1+='<td align="center"><b>'+serviceType+'</b></td>';
								rateBody1+='<td align="center"><b>'+rowRecordData['duration']+'</b></td>'; 
								rateBody1+="</tr>";
 
							} 

							var pricingPriceCommission = rowRecordData["pricingPriceCommission"];
							if(typeof pricingPriceCommission=='undefined' || pricingPriceCommission == null || pricingPriceCommission =="") pricingPriceCommission =0;
							var pricingPriceCommission$ = rowRecordData["priceCommission$"];
							if(typeof pricingPriceCommission$=='undefined' || pricingPriceCommission$ == null || pricingPriceCommission$ =="") pricingPriceCommission$ =0;

							if(rowRecordData["pricingPriceSell"]|| rowRecordData["pricingPriceSell"]==0) {
								rateBody3+="<tr>";
								rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalTourPrice,currency)+'</b></td>';
								rateBody3+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
								//rateBody3+='<td height="1" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax,currency)+'</b></td>';
								rateBody3+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
								rateBody3+='<td height="1" align="center"> <b>'+TDS.util.Price.formatPrice((totalTourPrice+markupTt),currency)+'</b></td>';
								rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
								rateBody3+='<td height="1" align="center"> <b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>'; 
								rateBody3+="</tr>";	
							}else{
								rateBody3+="<tr>";
								rateBody3+='<td height="20"> </td>';
								 rateBody3+='<td height="1"> </td>';
								rateBody3+='<td height="1"> </td>';
								rateBody3+='<td height="1"> </td>';
								//rateBody3+='<td height="1"> </td>'; 
								rateBody3+='<td height="1"> </td>'; 
								rateBody3+="</tr>";	
							}

							details = 
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 24%;">City</th>'+ 
										'<th style="padding: 2px; width: 24%;">Date/Range</th>'+
										'<th style="padding: 2px; width: 24%;">Service Type</th>'+
										'<th style="padding: 2px; width: 24%;">Duration</th>'+ 
									'</tr>'+
									rateBody1+
								'</table>'+
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 24%;">Service Name</th>'+
										'<th style="padding: 2px; width: 24%;">Passenger Type</th>'+
										'<th style="padding: 2px; width: 10%;">Code</th>'+
										'<th style="padding: 2px; width: 24%;">Price Per Person</th>'+ 
										'<th style="padding: 2px; width: 14%;">Status</th>'+
									'</tr>'+
									rateBody2+
								'</table>'+
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Price</th>'+
										'<th style="padding: 2px; width: 12%;">Gross/Net</th>'+
										//'<th style="padding: 2px; width: 14%;">Extras</th>'+
										 '<th style="padding: 2px; width: 14%;">Markup</th>'+
										'<th style="padding: 2px; width: 20%;">Total Price(Gross)</th>'+
										'<th style="padding: 2px; width: 14%;">Tax</th>'+
										'<th style="padding: 2px; width: 14%;">Comm</th>'+
									'</tr>'+
									rateBody3+
								'</table>'+
								'<br>' ;
					}
					else if (componentType == TDS.data.componentType.TYPE_CRUISE) {

						var rateBody1="";
						var rateBody2="";
						var rateBody3="";
						var leftBox='';
						var rightBox='';
						var data = Ext.util.JSON.decode(rowRecordData['parameters']);
						var destination=data.destination;
						var totalPax=data.totalPax;
						var cruiseLines=data.cruiseLines;
						var deckName=data.deckName;
						var deckNameString=data.deckNameString;
						var protStarboard=data.protStarboard;
						var obstruction=data.obstruction;
						var acceptUpgrade=data.acceptUpgrade;
						var stateroomGuarantee=data.stateroomGuarantee;
						var dinningPreference=data.dinningPreference;
						var tableSize=data.tableSize;
						//tableSize='4 to 6';
						console.log(tableSize);
						if(tableSize=='4to6'){
							tableSize='4 to 6';
						}else if(tableSize=='6to8'){
							tableSize='6 to 8';
						}else if(tableSize=='8ormore'){
							tableSize='8 or More';
						} 
					 
						var cruiseMemberNo=data.cruiseMemberNo;
						var cruiseMemberAdultNo=data.cruiseMemberAdultNo;
						var deckCount=data.deckCount;
						var cruiseMemberCount=data.cruiseMemberCount;
						 

						var gridData =  Ext.util.JSON.decode(data.gridData);

						var roomTypes=[];
						if(typeof gridData!='undefined'){
							roomTypes=gridData.data;
							gridData=gridData.data;
						}
						if(obstruction=='yesObstruction'){
							obstruction='Yes';
						}else{
							obstruction='no';
						}

						if(acceptUpgrade=='yesAcceptUpgrade'){
							acceptUpgrade='Yes';
						}else{
							acceptUpgrade='No';
						}

						if(stateroomGuarantee=='yesStateroomGuarantee'){
							stateroomGuarantee='Yes';
						}else{
							stateroomGuarantee='No';
						}

						var totalTourPrice=0;
						var adult=0;
						var child=0;
						var infant=0;
						var senior=0;
						for(var i = 0; i<roomTypes.length; i++){
							var tourName =  roomTypes[i].tourName;
							if(typeof roomTypes[i].a != 'undefined' && roomTypes[i].a!="")  adult+= parseInt(roomTypes[i].a);
							if(typeof roomTypes[i].c != 'undefined' && roomTypes[i].c!="")  child+= parseInt(roomTypes[i].c);
							if(typeof roomTypes[i].i != 'undefined' && roomTypes[i].i!="")  infant+= parseInt(roomTypes[i].i);
							if(typeof roomTypes[i].s != 'undefined' && roomTypes[i].s!="")  senior+= parseInt(roomTypes[i].s);
						}
						var adultPrice = 0;
						var childPrice = 0;
						var infantPrice = 0;
						var seniorPrice = 0;
						var roomTypesWithPrice =  Ext.util.JSON.decode(supplierData.roomTypesWithPrice);
						var pricePerPaxType=[];
						if(typeof roomTypesWithPrice!='undefined'){ pricePerPaxType=roomTypesWithPrice.data; }
						for(var i = 0; i<pricePerPaxType.length; i++){
							if(pricePerPaxType[i].paxType == 'AD') adultPrice = pricePerPaxType[i].priceSell;
							if(pricePerPaxType[i].paxType == 'CH') childPrice = pricePerPaxType[i].priceSell;
							if(pricePerPaxType[i].paxType == 'IN') infantPrice = pricePerPaxType[i].priceSell;
							if(pricePerPaxType[i].paxType == 'Senior') seniorPrice = pricePerPaxType[i].priceSell;
							var status1 = pricePerPaxType[i].status;
							if(status1!="XX"){
								totalTourPrice += pricePerPaxType[i].priceSell;
							}
						}
						//totalTourPrice = (adult*adultPrice) + (child*childPrice) + (infant*infantPrice) + (infant*seniorPrice);

						var extras='';
						for(var i = 0; i<roomTypes.length; i++){ 
						
							var cabin=roomTypes[i].cabin;
							var cabinNo=roomTypes[i].cabinNo;
							var category=roomTypes[i].category;
							var loc=roomTypes[i].location;
							var roomType=roomTypes[i].roomType;
							var stateRoomType=roomTypes[i].stateRoomType;
							var roomType=roomTypes[i].roomType;
							extras=roomTypes[i].extras;

							rateBody2 +="<tr>";
							rateBody2+='<td height="20" align="center"><b>'+stateRoomType+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+category+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+loc+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+deckNameString+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+protStarboard+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+obstruction+'</b></td>';
							rateBody2+='<td height="20" align="center"><b>'+status+'</b></td>';
							rateBody2+="</tr>";
						}
						var finalExtrasTotalWithTax =0;
						var finalExtrasTotalWithOutTax =0;
						// extras bottom right box creation..
						var createdRoomTypeExtras = [];
						for(var i = 0; i<roomTypes.length; i++){
							
							var roomType =  roomTypes[i].stateRoomType;
							if(createdRoomTypeExtras.indexOf(roomType)!= -1) continue;
							createdRoomTypeExtras.push(roomType);
							var extras =  roomTypes[i].extras;
							rightBox+=" <table border=0 cellpadding = 1 cellspacing=1 >";
							rightBox+="<tr>";
							rightBox+='<th>Room Type:&nbsp;&nbsp;&nbsp;'+roomType+'</th>';
							rightBox+="</tr>";
							if(typeof supplierData == 'undefined' || typeof supplierData.extrasWithPricing == 'undefined' || supplierData.extrasWithPricing == "" ){
								if(extras!=' '){
									extras=extras.split(",");
									for(var j = 0; j<extras.length; j++){
										var extra=extras[j];
										if(extra!=' '){
											rightBox+="<tr >";
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid;">'+
													'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
												'</table>'+
											'</td>';
											rightBox+='<td height="12" align="right">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=150 height="12"  align="right"><b>AUD 0.00</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+='<td height="12" align="left">'+
												'<table style="border-width:1px; border-style:solid">'+
													'<td width=40 height="12"><b>QT</b> </td>'+
												'</table>'+
											'</td>'; 
											rightBox+="</tr>";	
										}
									}
								}
							}else{
								 //debugger;
								var extrasData = Ext.util.JSON.decode(supplierData.extrasWithPricing).data;
								for(var u=0;u<extrasData.length;u++){
									var rt = extrasData[u].roomType;
									if(roomType == rt){
										var extra = extrasData[u].extras;
										var status = extrasData[u].status;
										var extrasAmt = extrasData[u].priceSell;
										if(!extrasAmt || extrasAmt == '') extrasAmt=0;
										var taxSell = extrasData[u].taxSell;
										if(!taxSell || taxSell == '') taxSell=0;
										finalExtrasTotalWithOutTax +=extrasAmt;
										finalExtrasTotalWithTax +=(extrasAmt+taxSell);
										rightBox+="<tr >";
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid;">'+
												'<td height="12" width=500 > <b><b>'+extra+'</b></b></td>'+
											'</table>'+
										'</td>';
										rightBox+='<td height="12" align="right">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=150 height="12"  align="right"><b>'+TDS.util.Price.formatPrice((extrasAmt+taxSell),currency)+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+='<td height="12" align="left">'+
											'<table style="border-width:1px; border-style:solid">'+
												'<td width=40 height="12"><b>'+status+'</b> </td>'+
											'</table>'+
										'</td>'; 
										rightBox+="</tr>";
									}
									 
								}
							}
							rightBox+="</table>";
						}

							var dateFrom=	TDS.util.Format.dateSpecial(rowRecordData['dateFrom'],TDS.env.dateFormatDisplay);
							var dateTo=TDS.util.Format.dateSpecial(rowRecordData['dateTo'],TDS.env.dateFormatDisplay);

							var dateRange='';
							if(dateFrom && dateTo)	
								dateRange= 	dateFrom + ' - '+dateTo;
							else if(dateTo) 
								dateRange=dateTo;
							else if(dateFrom)
								dateRange=dateFrom;

							var destCruise='<td height="0" align=center width="22%"><b>Destination: '+destination+'</b> </td>'; 


							rateBody1 ="<tr>";
							rateBody1+='<td height="20" align="center"><b>'+cruiseLines+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+rowRecordData['locationFromString']+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+dateRange+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+rowRecordData['locationToString']+'</b></td>';
							rateBody1+='<td height="20" align="center"><b>'+rowRecordData['duration']+'</b></td>';
							rateBody1+="</tr>";

							rateBody3="";
							rateBody3+="<tr>";
							rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(totalTourPrice, currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+(rowRecordData['pricingPriceIsNett']?"Nett":"Gross")+'</b></td>';
							rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice(finalExtrasTotalWithTax, currency)+'</b></td>';
							rateBody3+='<td height="1"><b>'+ TDS.util.Price.formatPrice(markupTt,currency) +'</b></td>';
							rateBody3+='<td height="20" align="center"><b>'+TDS.util.Price.formatPrice((totalTourPrice+finalExtrasTotalWithTax+markupTt), currency)+'</b></td>';
							rateBody3+='<td height="1" align="center"><b>'+ (rowRecordData["taxIncluded"]? "Included":"Excluded")+'</b></td>'; 
							rateBody3+='<td height="20" align="center"><b>'+(!rowRecordData['pricingPriceIsNett']?((pricingPriceCommission$==0)?(pricingPriceCommission.toFixed(2)+"%"):TDS.util.Price.formatPrice(pricingPriceCommission$,"")):"")+'</b></td>';
							rateBody3+="</tr>";	 
								  
							leftBox+="<br><br><table border=1 cellpadding = 1 cellspacing=0 width=100%>";
							leftBox+="<tr>"; 
							leftBox+='<td height="20" align="left"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+dinningPreference+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'; 
							leftBox+='<td height="20" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>'+tableSize+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'; 
							leftBox+="</tr>";
							leftBox+="</table>";
							
							leftBox+="<br> <table border=0 cellpadding = 1 cellspacing=0 width=100%>";
							leftBox+="<tr>"; 
							leftBox+='<td height="20" align="left">  <b>Accept Upgrade&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;'+acceptUpgrade+'</b></td>'; 
							leftBox+='<td height="20" align="left">   <b>Cabin Guarantee&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;'+stateroomGuarantee+'</b> </td>'; 
							leftBox+="</tr>";
							leftBox+="</table>";

							
							details = 
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Ship</th>'+
										'<th style="padding: 2px; width: 14%;">Departs</th>'+
										'<th style="padding: 2px; width: 14%;">Date/Range</th>'+
										'<th style="padding: 2px; width: 14%;">Arrives</th>'+
										'<th style="padding: 2px; width: 14%;">Duration</th>'+
									'</tr>'+
									rateBody1+
								'</table>'+
								'<table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 20%;">Stateroom Type</th>'+
										'<th style="padding: 2px; width: 14%;">Category</th>'+
										'<th style="padding: 2px; width: 14%;">Location</th>'+
										'<th style="padding: 2px; width: 14%;">Deck</th>'+
										'<th style="padding: 2px; width: 18%;">Port/Starboard</th>'+
										'<th style="padding: 2px; width: 14%;">Obstruct</th>'+
										'<th style="padding: 2px; width: 10%;">Status</th>'+
									'</tr>'+
									rateBody2+
								'</table>'+
								' <table class="x-tds-dataview" style="width: 100%;" border=1 cellpadding = 1 cellspacing=0  >'+
									'<tr style="background-color: #d0def0;">'+
										'<th style="padding: 2px; width: 14%;">Price</th>'+
										 '<th style="padding: 2px; width: 14%;">Gross/Net</th>'+
										'<th style="padding: 2px; width: 14%;"> Extras</th>'+
										 '<th style="padding: 2px; width: 14%;">Markup</th>'+
										'<th style="padding: 2px; width: 24%;">Total Price(Gross)</th>'+
										'<th style="padding: 2px; width: 14%;">Tax</th>'+
										'<th style="padding: 2px; width: 14%;">Comm</th>'+
									'</tr>'+
									rateBody3+
								'</table>'+
								'<br>'+
								 '<div style="height:90px;"><div  style="height:94px; width:50%; border: solid 1px;  float:left; overflow-y: scroll; overflow-x: hidden;"><b>Dinning Preference & Table Size:'+leftBox+'</b></div><div  style="height:94px; width:50%; border: solid 1px;  float:center; overflow-y: scroll; overflow-x: hidden;"><b>Extras:'+rightBox+'</b></div></div>'
								 
							;
					}

 					var html =  
						'<div style="height:250px; overflow-y: scroll; overflow-x: hidden;">'+
							'<table  width="100%">'+
								'<tr>'+
									'<td><span style="font-size:12px"><b>Pay By :</b></span></td><td><font color="red"><span style="font-size:12px"> <b>'+TDS.util.Format.dateSpecial(paybyDate, TDS.env.dateFormatDisplay) +' '+depositDescription+'</b><span style="font-size:12px"></font></td>'+
									'<td><span style="font-size:12px"><b>Quote Ref :</b></span></td><td><font color="red"><span style="font-size:12px"> <b>'+rowRecordData["quoteReferenceNumber"]+'</b><span style="font-size:12px"></font></td>'+
								  	destCruise+
									preferredCompanyCar+
							 		'<td><span style="font-size:12px"><b>Booking Ref :</b></span></td><td><font color="red"><span style="font-size:12px"> <b>'+rowRecordData["bookingReferenceNumber"]+'</b><span style="font-size:12px"></font></td>'+
								'</tr>'+
							'</table>'+
							mainBody+
							'<br/>'+
							details+
						'</div>'
					 ; 
					//this.items.itemAt(0).html = html;
					document.getElementById(divId).innerHTML = html;
					
				}
			}
		}  
	},
	{
		 
		xtype:'panel',
		height: 297,
		columnWidth: .44,
		layout: 'fit',
		
		items:[{
				/* passenger panel */
				columnWidth: 1,
				xtype: 'grid',
				enableRowExpander: false,
				sessionExpandedRows: false,
				height:140,
				autoScroll:true,
				border:false,
				enableColumnHide: false,
				enableColumnMove: false,
				enableColumnResize: false,
				enableHdMenu: false,
				 tbar:['->',
					{
						xtype:'button',
						disabled:true,
						text:'Cancel passenger',
						handler:function(){
							//debugger;
							pGridPass = this.ownerCt.ownerCt;//.length
							var tp = this.ownerCt.findParentByType('ajaxpanel');
							var rowRecordData = tp.getDetail('rowRecordData');
									var dataURIPass = rowRecordData['dataURI'];
									//dataURIPass = dataURIPass.replace("manualQuoteComponent","component"); 
							Ext.Msg.show({
							   title:'Confirmation',
							   msg: 'Are you sure, want to cancel passenger?',
							   buttons: Ext.Msg.YESNO,
							   fn: processResult,
							   animEl: 'elId',
							   icon: Ext.MessageBox.QUESTION
							}); 
							function processResult(btn)	{
								if(btn == 'yes'){		
									var pGrid1  = pGridPass;
									var  pGrid  = pGrid1.getSelections();
									var dataURI =  dataURIPass;
									var jd={};
									var ar = new Array();
									for(var i = 0; i < pGrid.length; i++){
										 ar[i] = pGrid[i].data.dataURI; 
									}
									jd['passengerURIs']= ar;
									Ext.Ajax.request({
										url: TDS.env.dataPath+dataURI+'/cancel',
										jsonData: jd,
										callback: function(o, s, r){
											if(s){
												try{
													Ext.Msg.alert('Status', 'Changes saved successfully.');
													var g = pGrid1.ownerCt.findParentByType('awesomegrid');
													g.submitQuery(true);
												} 
												catch (e){
												}
											}
										}
									});
								}
							}
						}
					}
				],
				store: new Ext.data.JsonStore({
					url: '',
					id: 'dataURI',
					fields: ['dataURI', 'displayName', 'code', 'priceSell', 'priceCurrency','dateOfBirth', 'addressString', 'phoneNumber1', 'emailAddress','gender','status','paxAge','roomType']
				}),
				sm: new Ext.grid.CheckboxSelectionModel(),
				columns: [
						new Ext.grid.CheckboxSelectionModel(),
					{header: 'Passenger', dataIndex: 'displayName',width:200,sortable: true,renderer:function (value, metadata, record, rowIndex, colIndex, store){
									   
						metadata.attr = 'ext:qtip= "Click to view details"';
						return value;
					}},
					{header: 'Type', dataIndex: 'code',width:80},
					{header: 'Gender',dataIndex: 'gender',renderer : TDS.util.Format.gender,width:100},
						
					{header: 'DOB', dataIndex: 'dateOfBirth',width:60,fixed:true, renderer: TDS.util.Format.dateSpecialRenderer(TDS.env.dateBirthdayFormatDisplay)},
					{header: 'Age', dataIndex: 'paxAge',width:40,fixed:true,renderer: function (v, metaData, record) {
						if(v)return v;
						else{
							return TDS.util.Format.age(record.get('dateOfBirth'));
						}
					}}, 
					//{header: 'Age', dataIndex: 'dateOfBirth', renderer: TDS.util.Format.age,width:80},
					{header: 'Room Type', dataIndex: 'roomType',width:150,
						editor: new Ext.form.ComboBox({
							editable: false,
							forceSelection: true,
							mode: 'local',
							triggerAction: 'all',
							displayField: 'name',
							valueField: 'dataURI',
							emptyText: 'Type',
							store: TDS.data.getStore({
								dataURI: TDS.env.dataPath + 'accommodation/propertyclasstypes/collection',
								identifier: 'accommodation/propertyclasstypes',
								fields: ['name', 'displayName', 'dataURI']
							}) 
						})
					},
					{header: 'Seat/Cabin', hidden: true, dataIndex: 'roomType',width:150,
						editor: new Ext.form.ComboBox({
							editable: false,
							forceSelection: true,
							mode: 'local',
							triggerAction: 'all',
							displayField: 'name',
							valueField: 'dataURI',
							emptyText: 'Type',
							store: []
						})
					},
					{header: 'Price', dataIndex: 'priceSell',width:120,
							editor: new Ext.form.NumberField({
								 
							}), //renderer: TDS.util.Price.conversionPriceRenderer
							renderer: function (v, metaData, record) {
										 return  TDS.util.Price.formatPrice(v,record.get('priceCurrency'));
									 }
					},
					{header: 'Status', dataIndex: 'status',width:50,fixed: true,
						editor: new Ext.form.ComboBox({
							editable: false,
							forceSelection: true,
							mode: 'local',
							triggerAction: 'all',
							displayField: 'text',
							valueField: 'text',
							//tpl: '<tpl for="."><div class="x-combo-list-item">{text}, <span style="font-style: italic; font-size: 10px; color: #999;">{description}</span></div></tpl>',
							store: [
								['OK', 'OK'],
								['WL', 'Waitlist'],
								['FS', 'Freesale'],
								['RQ', 'Requested'],
								['XX', 'Cancelled'] 
							]
						})
					}  
					 
				]
					//)
					,
				viewConfig: {
					forceFit: true
				},
			 
				listeners: {
					beforerender : function(grid) {
						var ap = this.ownerCt.findParentByType('ajaxpanel');
						var rowRecordData = ap.getDetail('rowRecordData');
						var t = rowRecordData['type'];			
						cm = grid.getColumnModel();
						if(typeof t!= 'undefined' && t != TDS.data.componentType.TYPE_ACCOMMODATION  && t != TDS.data.componentType.TYPE_TOUR){  
							 cm.setHidden(6,true);
						}
						if(typeof t!= 'undefined' && (t == TDS.data.componentType.TYPE_CRUISE || t == TDS.data.componentType.TYPE_RAIL || t == TDS.data.componentType.TYPE_AIR)){
							 cm.setHidden(7,false);
						}

					},
					//cellclick: function(grid, rowIndex, columnIndex, e) {
						rowdblclick:function( grid, rowIndex, e ){
						 //debugger;
						//  if(columnIndex==1) {
							var record = grid.getStore().getAt(rowIndex);
							var dataURI =  record.get('dataURI');
							console.log('&&&&&&&&&&&&&');
							console.log(dataURI);
							TDS.window.setWindow({
								buttonOK : false,
								title: 'Passenger details',
								destinationDataURI: dataURI ,
								interfaceURI: 'pnr/passenger/viewDetails.js',
								sourceDataURI: dataURI  
							});
						//  }
					},
//						rowdblclick:function( grid, rowIndex, e ){
//						var record = grid.getStore().getAt(rowIndex);
//							var dataURI =  record.get('dataURI');
//							console.log('@@@@@@@@@@@@');
//							console.log(dataURI);
//					
//					
//					},
					render: function () {
						var bbar = this.topToolbar;
						this.getSelectionModel().on('rowselect', function () {
							if(this.ownerCt.getSelections().length>0){
							  bbar.items.itemAt(1).setDisabled(false);
							}
						}, bbar);

						// disable "Edit" buttons on row deselection
						this.getSelectionModel().on('rowdeselect', function () {
							if(this.ownerCt.getSelections().length==0){
							  bbar.items.itemAt(1).setDisabled(true);
							  }
						}, bbar);
						this.getEl().swallowEvent(['columnmove', 'columnresize', 'headerclick', 'click', 'mouseout',  'rowclick', 'rowmousedown','rowblclick','cellblclick', 'sortchange', 'mouseup', 'mousedown']);
						//var tp = this.ownerCt.findParentByType('tabpanel');
						var tp = this.ownerCt.findParentByType('ajaxpanel');
						
						var rowRecordData = tp.getDetail('rowRecordData');
						var dataURI = rowRecordData['dataURI'];
						Ext.Ajax.request({
							url: TDS.env.dataPath + dataURI + '/passengers/collection/concise',
							method: 'GET',
							callback: function (o, s, r) {
								//debugger;
								if (s) {var ro = Ext.util.JSON.decode(r.responseText);
								//var ap = this.items.itemAt(0);
								var collection = ro[dataURI + '/passengers'];
								
								if (typeof collection == 'undefined') return;

								var sd = [];

								for (var i = 0; i < collection.length; i++) {

								// munge the dataURI for this record into the record

								ro[collection[i]].dataURI = collection[i];

								//ro[collection[i]].status = status;

								sd.push(ro[collection[i]]);

								}

								// load the results into the store
								var grid = this;
								var storeData = grid.store;
								storeData.loadData(sd);
								grid.getView().refresh();						
							 }
						},
						scope: this
					});
				}
			}
		}/*,
		{
			 
			xtype: 'tabpanel',
			activeTab: 0,
			columnWidth: 1,
			border: false,
			//deferredRender: false, // important
			layoutOnTabChange: true, // and... important
			height: 152,
			//width:665,
			defaults: {
				bodyStyle: 'padding: 6px 4px 6px 4px;'
			},
			items: [
			{
				title: 'Info Recived'
			},
			{
				title: 'Info Sent'
			}]
		}*/] 
	},
	{
		xtype: 'panel',
		autoHeight: true,
		border: false,
		bodyStyle: 'padding: 2px;',
		columnWidth: .06,
		defaults: {
			minWidth: 67
		},
		 
		items: [{
			xtype: 'button',
			text: 'Confirm',
			//disabled: true,
			handler: function () {
				var p = this.ownerCt.ownerCt.ownerCt;
				var ap = this.ownerCt.findParentByType('ajaxpanel');
				var rowRecordData = ap.getDetail('rowRecordData');
				var dataURI = rowRecordData['dataURI'];
				if (!dataURI) return;

				var tp = this.ownerCt.findParentByType('tabpanel');
					var g = tp.ownerCt;
				// return;
				TDS.window.setWindow({
					title: 'Confirm manual Quote',
					message: 'Are you sure you want to Confirm this component?',
					destinationDataURI: dataURI+"?confirm=true",
					buttonOK: 'Submit',
					callback: {
						fn: function (s) {
							//if (s) p.refreshGrid();
							if (s) t.submitQuery(true);
						},
						scope: this
					}
				});
			},
			listeners: {
				render: function () {
						var ap = this.ownerCt.findParentByType('ajaxpanel');
						var rowRecordData = ap.getDetail('rowRecordData');
						var status = rowRecordData['status']
						if(status == "Confirmed"){
							this.hide();
						}
				}
			}
		},
		{
			xtype: 'button',
			text: 'Edit',
			  handler: function () {
				 debugger;
				var p = this.ownerCt.ownerCt.ownerCt;
				var ap = this.ownerCt.findParentByType('ajaxpanel');
				var tp = this.ownerCt.ownerCt.findParentByType('tabpanel');
				tp.getDetail('pnrDataURI');
				var rowRecordData = ap.getDetail('rowRecordData');
				var dataURI = rowRecordData['dataURI'];
				if (!dataURI) return;
				var pnrAp = ap.ownerCt.ownerCt.ownerCt.ownerCt.findParentByType('ajaxpanel');
				var pnr = pnrAp.ownerCt.ownerCt.ownerCt.ownerCt.title; 
				//var t = this.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
				var t = this.ownerCt.ownerCt.findParentByType('awesomegrid');
				//var t = this.ownerCt.ownerCt;
				var component = rowRecordData['type'];
				 
				var header = TDS.util.firstWordCapital(component+" Manual Quote & Entry");
				if(component == TDS.data.componentType.TYPE_TOUR) header = TDS.util.firstWordCapital("PACKAGE TOUR Manual Quote & Entry");
				else if(component == TDS.data.componentType.TYPE_CAR) header = TDS.util.firstWordCapital("CAR RENTAL Manual Quote & Entry");
				else if(component == TDS.data.componentType.TYPE_CRUISE) header = TDS.util.firstWordCapital("CRUISES Manual Quote & Entry");
				else if(component == TDS.data.componentType.TYPE_ATTRACTION) header = TDS.util.firstWordCapital("SERVICES Manual Quote & Entry");
				
				TDS.window.setWindow({
					title:  '<table width=100% border=0> <tr> <td width=240px>'+header+'</td> <td align=right><font size="2"  ><b>'+pnr+'</b></font></td> </tr> </table>' ,//'Manual Quote & Entry',
					information: 'Please enter your required details.',
					interfaceURI: 'pnr/components/manualQuote/'+component.toLowerCase()+'Edit.js',
					sourceDataURI: dataURI,
					destinationDataURI: dataURI ,
					buttonOK :'Save',
					//disableSubmit: true,
					//disableClose: true,
					data:{type: component , pnrDataURI:  pnrAp.ownerCt.ownerCt.ownerCt.dataURI,MQ:true},
					callback: {
						fn: function (s) {
							debugger;
							 
							if (s) t.submitQuery(true);
						},
						scope: t
					}
				});
			}
		},
		{
			xtype: 'button',
			text: 'Delete',
			handler: function () {
				var p = this.ownerCt.ownerCt.ownerCt;
				var tp = this.ownerCt.findParentByType('tabpanel');
					var g = tp.ownerCt;
				var ap = this.ownerCt.findParentByType('ajaxpanel');
				var rowRecordData = ap.getDetail('rowRecordData');
				var dataURI = rowRecordData['dataURI'];
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
							if (s) g.refreshGrid();
						},
						scope: this
					}
				});
			}
		},
		{
			xtype: 'button',
			text: 'Notes',
			handler: function () {
				var p = this.ownerCt.ownerCt.ownerCt;
				var ap = this.ownerCt.findParentByType('ajaxpanel');
				var rowRecordData = ap.getDetail('rowRecordData');
				var dataURI = rowRecordData['dataURI'];
				if (!dataURI) return;
				// return;
				TDS.window.setWindow({
					title: 'Send a notes',
					information: 'Please enter your notes below.',
					interfaceURI: 'note.js',
					postDataURI: dataURI + '/note',
					callback: {
						fn: function (s) {
							// do something...
						},
						scope: this
					}
				});
			}
		},
		{
			xtype: 'button',
			text: 'Quotes',
			handler: function () {
				var p = this.ownerCt.ownerCt.ownerCt;
				var ap = this.ownerCt.findParentByType('ajaxpanel');
				var rowRecordData = ap.getDetail('rowRecordData');
				var dataURI = rowRecordData['dataURI'];
				if (!dataURI) return;
				// return;
				var tp = this.ownerCt.findParentByType('tabpanel');
				var g = tp.ownerCt;

 				var component = rowRecordData['type'];

				TDS.window.setWindow({
					title: 'Accept And Reject',
					//information: 'Please enter your notes below.',
					interfaceURI: 'acceptreject.js',
					interfaceURI: 'pnr/components/manualQuote/acceptreject'+component.toLowerCase()+'.js',//+component.toLowerCase()+'Edit.js',
					sourceDataURI: dataURI,
					destinationDataURI: dataURI+'/acceptreject' ,
					callback: {
						fn: function (s) {
							if (s) g.refreshGrid();
						},
						scope: this
					}
				});
			},
			listeners: {
				render: function () {
						var ap = this.ownerCt.findParentByType('ajaxpanel');
						var rowRecordData = ap.getDetail('rowRecordData');
						var status = rowRecordData['status'];
						var component = rowRecordData['type'];
						if(component.toLowerCase()!='sightseeing')
						 this.disable(true);
				}
			}
		}]
	}]
}  




















































































































































































































































































































































































































































































































































































































































































































































































































































































