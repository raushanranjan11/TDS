{xtype:"form",border:false,markDataDirtyOnLoad:true,items:[{xtype:"panel",layout:"fit",labelWidth:100,height:280,width:400,border:false,items:[{hrml:""}],listeners:{beforerender:function(){var c=this.ownerCt.findParentByType("awesomewindow");var b=c.getData("dateOfBook");var a=c.getData("noOfDays");var h=c.getData("hoursOfDay");var f=c.getData("nightsCharged");var d=c.getData("percentageDeduct");var e=c.getData("description");var g=c.getData("termsApply");if(g=="1"){g="applies";this.items.itemAt(0).html="<div style='height:200px;  width:370px; margin-top:5px; margin-right:5px; margin-bottom:5px; margin-right:5px; margin-left:5px;  border:1px solid #ccc; overflow-x:auto ; overflow-y: auto; padding-left:15px;'> <br/><center><u><p><center><b><font size=4>Cancellation Terms</font></b></center></p></u></center><br/><b><p><font size=2>Cancellation fee "+g+" to this booking</font></p><br/><p><font size=2>A cancellation fee will apply to cancellations made <br>within<b> "+a+" days </b>of check in.</font></p><br/><p><font size=2>The hour of check-in is deemed to be "+h+"00 hours.</font></p><br/><p><font size=2>Cancellation Fee  -  "+f+" nights accommodation /"+d+"% of total stay </p></font><br/>"}if(g=="0"){g="not applies";this.items.itemAt(0).html="<div style='height:200px;  width:370px; margin-top:5px; margin-right:5px; margin-bottom:5px; margin-right:5px; margin-left:5px;  border:1px solid #ccc; overflow-x:auto ; overflow-y: auto; padding-left:15px;'> <br/><center><u><p><center><b><font size=4>Cancellation Terms</font></b></center></p></u></center><br/><b><p><font size=2>Cancellation fee "+g+" to this booking</font></p></div>"}}}}]}