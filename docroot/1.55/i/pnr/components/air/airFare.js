{xtype:"panel",border:false,height:240,width:1200,onLoadAirFare:function(){var b=this.ownerCt.ownerCt.airFareData;this.items.itemAt(0).tpl.overwrite(this.items.itemAt(0).body,Ext.apply({value:b}))},items:[{xtype:"panel",border:false,height:240,width:1200,tpl:new Ext.XTemplate(["<html>","<body>","<form>",'<div  style="padding-left:10px;padding-top:5px; height:200px;  overflow-y:auto;" >',"{value}","</div>","</form>","</body>","</html>"])}]}