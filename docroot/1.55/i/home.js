{xtype:"panel",border:false,layout:"border",style:"padding: 8px;",items:[{xtype:"awesomepanel",groupURI:["parent","group/AGENCY"],region:"center",border:false,bodyStyle:"padding-right: 2px;",itemConfigs:[{xtype:"ajaxpanel",groupPermission:"RESERVATION",height:document.body.clientHeight-(113+100),interfaceURI:"home/reservation-pnr.js"},{xtype:"panel",groupPermission:"SUPPLIER",tbar:["->",{xtype:"redbutton",text:"Help",cls:"x-button-blue",overCls:"x-button-blue-over",opened:false,handler:function(){TDS.needHelp("Supplier's Home Page Help","26");if(!this.opened){this.opened=true;TDS.needHelp("Supplier's Home Page Help","26")}else{this.opened=false;TDS.helpwindow.hide()}}}],bodyStyle:"padding: 40px;",border:false,items:{html:'<iframe id="myFrame" frameBorder="0"   style="width: 79%; height: 79%;border:2px solid black;"></iframe>',height:document.body.clientHeight-(113+140),width:document.body.clientWidth-(40),border:false},listeners:{render:function(){setTimeout(function(){var a=TDS.env.currentDomain;document.getElementById("myFrame").src=a+"html/supplierHints.html"},800)}}}],items:[{hidden:true}]},{xtype:"panel",border:false,region:"east",width:200,autoScroll:true,bodyStyle:"padding-left: 4px;",items:{xtype:"awesomepanel",groupURI:["parent","group/AGENCY"],bodyStyle:"padding-right: 4px;",border:false,itemConfigs:[{xtype:"ajaxpanel",groupPermission:"ADMINISTRATION",interfaceURI:"home-administration.js"},{xtype:"ajaxpanel",groupPermission:"SUB_ADMINISTRATION",interfaceURI:"home-sub-administration.js"},{xtype:"ajaxpanel",groupPermission:"BPAY_ADMINISTRATION",interfaceURI:"home-bpay.js"},{xtype:"ajaxpanel",groupPermission:"UPLOAD_ADMINISTRATION",interfaceURI:"home-upload-administration.js"},{xtype:"ajaxpanel",groupPermission:"LOCATION_ADMINISTRATION",interfaceURI:"home-lacation-administration.js"},{xtype:"ajaxpanel",groupPermission:"SUPPLIER",interfaceURI:"home-inventory.js"},{xtype:"ajaxpanel",groupPermission:"AGENCY",interfaceURI:"home-agency.js"},{xtype:"panel",title:"Services",cls:"x-tds-homebox",frame:true,height:120,items:[{html:"<a href=\"#\" onclick=\"return externalLink('http://www.worldweather.org/', 'arenaWorldWeather');\">World weather</a>"},{html:"<a href=\"#\" onclick=\"return externalLink('http://www.timeanddate.com/worldclock', 'arenaWorldTimes');\">World times</a>"},{html:"<a href=\"#\" onclick=\"return externalLink('http://www.worldairportguide.com/', 'arenaInternationalAirports');\">International Airports</a>"},{html:"<a href=\"#\" onclick=\"return externalLink('http://www.xe.com/ucc', 'arenaCurrencyConversion');\">Currency conversion</a>"},{html:"<a href=\"#\" onclick=\"return externalLink('http://www.oagtravel.com/Flight-Bytes', 'arenaFlightBytes');\">OAG Flight Bytes</a>"}]},{xtype:"panel",title:"Support",cls:"x-tds-homebox",frame:true,height:80,items:[{html:'<a href="mailto:support@tdsarena.com?subject=Support Request">On-line support</a>'},{html:"<a href=\"#\" onclick=\"return externalLink('http://www.tdsworld.com/', 'arenaTDS');\">Access the TDS website</a>"}]}],items:[{hidden:true}]}}]}