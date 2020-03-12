Ext.namespace('TDS');



 //isApp=false;
 var loc = location.href;
var local="http://localhost:8080/";
var today = new Date();
var t = new Date();
t.setMonth(t.getMonth()+1)
var disableCaching = true;
var isApp=false;
var isDemo=false
var isTraining=false
var isAppTrain=false;
//var isApp=true;
if(loc.indexOf("app") !== -1){
	today="";
	disableCaching = false;
	isApp= true;
	isAppTrain=true;
	local="http://app.tdsarena.com/";
}else if(loc.indexOf("demo") !== -1){
	local="http://demo.tdsarena.com:9080/";
	isDemo= true;
	isAppTrain=true;
} else if(loc.indexOf("training") !== -1){
	local="http://training.tdsarena.com:7080/";
	isTraining= true;
	isAppTrain=true;
} 

// environment settings

TDS.env = {

	version: 1.4,

	isApp: isApp,
	isDemo: isDemo,
	isTraining: isTraining,
	isAppTrain:isAppTrain,
	disableCaching: disableCaching,


	dataPath: '/tds/resources/',

	interfacePath: 'i/',

	sessionPath: '/tds/resources/session/',

	defaultDateSearchGrid: today,

	defaultDateSearchGridNext: t, 
	dateFormat: 'Y-m-d\\TH:i:s',

	dateFormatDisplay: 'dMy',

	dateTimeFormatDisplay: 'dMy H:i',

	dateDayFormatDisplay: 'dMy D',

	dateDMYHHMMFormatDisplay: 'd/m/y H:i',

	dateBirthdayFormatDisplay: 'd/m/Y',
	currentDomain:local
};

















