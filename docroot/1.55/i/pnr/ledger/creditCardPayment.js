{xtype:"form",border:false,trackResetOnLoad:true,beforeSubmit:function(e){if(e.ccType==""||typeof e.ccType=="undefined"){var c=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3);c.focus(true);c.markInvalid("Select Credit Card Type.");return}var b=this.findParentByType("awesomewindow");var f=b.aw.data;e.description="CC and Gate";e.componentArray=f.componentArray;return e},beforeDataLoad:function(c){var b=this.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3);b.store=TDS.data.getStore({reload:true,dataURI:TDS.env.dataPath+c.supplierURI+"/creditCards/collection",identifier:c.supplierURI+"/creditCards",fields:["name","displayName","dataURI","creditCardCharges"]});return c},items:{xtype:"tabpanel",border:false,defaults:{border:false},activeTab:0,layoutOnTabChange:true,height:370,items:[{title:"Credit Card Details",items:[{xtype:"panel",layout:"form",border:false,labelWidth:90,style:"margin-left: 5px;margin-top: 5px;",items:[{xtype:"label",style:"margin-left:135px;padding-bottom:150px;",height:30,listeners:{render:function(){;var a=this.ownerCt.ownerCt.findParentByType("awesomewindow");var b=a.aw.data;this.setText('<b><font size="2px">Paying: '+b.supplierName+"</font>",false)}}},{html:"<td height=200px>&nbsp;</td>",border:false},{xtype:"label",style:"margin-left:120px;",html:'<td height=200px><b><font color="#cc0000">Payment Gateway Provided</font></td><br><br>',border:false},{xtype:"combo",name:"ccType",mode:"local",fieldLabel:"Credit Card type",width:160,triggerAction:"all",editable:false,displayField:"displayName",valueField:"dataURI",listeners:{select:function(h,e,b){;var a=this.ownerCt.ownerCt.findParentByType("awesomewindow");var g=a.aw.data;var f=(g.payAmount*e.get("creditCardCharges"))/100;this.ownerCt.items.itemAt(9).items.itemAt(1).setValue(f.toFixed(2));this.ownerCt.items.itemAt(9).items.itemAt(2).setText("<b>"+e.get("creditCardCharges").toFixed(2)+"%",false);this.ownerCt.items.itemAt(10).items.itemAt(1).setValue((f+g.payAmount).toFixed(2))}}},{xtype:"textfield",name:"ccNo",fieldLabel:"Credit Card No",width:300},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:"Expiry Date:",width:Ext.isIE?96:96},{xtype:"combo",name:"ccExpiryMonth",emptyText:"Month",editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text",store:TDS.data.months,width:60},{html:"",width:10},{xtype:"combo",name:"ccExpiryYear",emptyText:"Year",editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"text",valueField:"text",store:TDS.data.years,width:60}]},{xtype:"textfield",name:"ccCcv",fieldLabel:"CCV",width:40},{xtype:"textfield",name:"nameOnCardCard",fieldLabel:"Name on Card",width:300},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:"Amount:",width:Ext.isIE?96:96},{xtype:"textfield",name:"currency",readOnly:true,style:"padding: 0; margin-right: 8px;",width:40},{xtype:"textfield",readOnly:true,forceSubmit:true,name:"payAmountTemp",width:120},{html:"<b>&nbsp;Nett",width:Ext.isIE?88:85}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:"Credit Card Fee:",width:Ext.isIE?145:145},{xtype:"textfield",readOnly:true,forceSubmit:true,name:"ccChargesAamount",width:120},{xtype:"label",html:" ",width:Ext.isIE?88:85}]},{xtype:"panel",layout:"table",style:"padding: 0; margin-bottom: 4px;",border:false,hideBorders:true,layoutConfig:{columns:4},items:[{html:'<b><font color="#cc0000">Grand Total:</font>',width:Ext.isIE?145:145},{xtype:"textfield",readOnly:true,forceSubmit:true,name:"amount",width:120}]},{xtype:"combo",name:"type",width:140,hidden:true,labelSeparator:"",editable:false,forceSelection:true,mode:"local",triggerAction:"all",displayField:"name",valueField:"dataURI",tpl:'<tpl for="."><div class="x-combo-list-item">{name} <span style="font-style: italic; font-size: 10px; color: #999;">{code}</span></div></tpl>',listeners:{beforerender:function(){var a=this.ownerCt.findParentByType("awesomewindow");this.store=new Ext.data.CollectionStore({autoLoad:true,identifier:a.getDataURI("agency")+"/transactionTypes",url:TDS.env.dataPath+a.getDataURI("agency")+"/transactionTypes/collection",fields:["dataURI","code","type","name","description","amount","credit"]})},render:function(){var b=this;this.getStore().on("load",function(c,a){for(var d=0;d<a.length;d++){if(a[d].data.code=="02"){b.setValue(a[d].data.dataURI);break}}})}}},{xtype:"textfield",hidden:true,forceSubmit:true,name:"passengerNameRecordTransactionMethodURI",value:"pnr/transactionMethod/3",width:120},{xtype:"textfield",hidden:true,forceSubmit:true,name:"description",value:"CC and Gate",width:120},{xtype:"label",hidden:true,html:'<font color="#cc0000"><br>International funds can be transfered via OzForex with no fees.<br> Select International Payment from the Home Page Menu.<br><br></font>'}]}]}]}}