Ext.Calendar=Ext.extend(Ext.BoxComponent,{itemCls:"x-calendar",ctype:"Ext.Calendar",length:0,date:new Date().clearTime(),value:0,boxValues:[],numberOfBoxes:0,parentWidth:0,dayOne:null,dayTwoLabel:"",minValue:1,maxValue:0,keyIncrement:1,increment:1,clickRange:[0,20],clickToChange:true,animate:true,animationDuration:0.35,thumbDelayTask:new Ext.util.DelayedTask(),months:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],initComponent:function(){Ext.Calendar.superclass.initComponent.call(this);this.addEvents("beforechange","change","dragstart","drag","dragend")},onRender:function(b,a){this.value=9;this.firstDate=this.date;this.numberOfBoxes=30;for(var d=0;d<this.numberOfBoxes;d++){this.boxValues[d]=this.firstDate.add(Date.DAY,d).format("j");if(this.boxValues[d]==1&&this.dayOne==null){this.dayOne=d+1;this.dayTwoLabel=this.months[this.firstDate.add(Date.DAY,d).format("n")-1]+" "+this.firstDate.add(Date.DAY,d).format("Y")}}var c=new Ext.XTemplate('<a href="#" class="left" hidefocus="on"><em><span unselectable="on">&lt;</span></em></a>','<div class="x-calendar-wrap">','<div class="x-calendar-thumb"></div>','<tpl for="."><a href="#" class="index-{[xindex]}{[xindex === 1 ? " first" : ""]}{[xindex === xcount ? " last" : ""]}{[xindex % 7 == 6 || xindex % 7 == 0 ? " weekend" : ""]}" hidefocus="on"><em><span unselectable="on">{.}</span></em></a></tpl>',"</div>",'<a href="#" class="right" hidefocus="on"><em><span unselectable="on">&gt;</span></em></a>','<div class="x-calendar-label"><span style="margin-left:23px;">&#160;</span><span></span></div>');var e=document.createElement("div");e.className=this.itemCls;c.overwrite(e,this.boxValues);b.dom.insertBefore(e,a);this.el=Ext.get(e);this.backButton=this.el.first();this.wrap=this.backButton.next();this.thumb=this.wrap.first();this.labelWrap=Ext.Element.get(this.el.last());this.labelOne=Ext.Element.get(this.labelWrap.first());this.labelTwo=Ext.Element.get(this.labelWrap.last());this.forwardButton=this.labelWrap.prev();this.thumb.setStyle("width",this.length*20);this.maxValue=this.boxValues.length-this.length+1;this.setValue(this.value-1,this.animate);this.initLabel();this.initEvents()},initLabel:function(){if(this.dayOne>=7||this.dayOne==null){this.labelOne.update(this.months[this.firstDate.format("n")-1]+" "+this.firstDate.format("Y"))}else{this.labelOne.update("&#160;")}if(this.dayOne!=null){this.labelOne.setStyle("margin-right",this.labelWrap.translatePoints(this.el.child("a.index-"+this.dayOne).getLeft()).left-this.labelOne.getWidth()-this.getRatio())}this.labelTwo.update(this.dayTwoLabel)},initEvents:function(){this.thumb.addClassOnOver("x-calendar-thumb-over");this.mon(this.wrap,"mousedown",this.onMouseDown,this);this.mon(this.wrap,"keydown",this.onKeyDown,this);this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeDragStart.createDelegate(this),onStart:this.onDragStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onDragEnd.createDelegate(this),tolerance:3,autoStart:300});this.tracker.initEl(this.thumb);this.on("beforedestroy",this.tracker.destroy,this.tracker);this.backButton.on("click",function(){this.moveInTime(true)},this);this.forwardButton.on("click",function(){this.moveInTime()},this)},handleClick:function(b,a){b.preventDefault();this.select(a.className.substr(6))},select:function(a){if(a!=this.endSelection){if(this.endSelection){this.el.child("a.index-"+this.endSelection).removeClass("x-calendar-sel")}this.el.child("a.index-"+a).addClass("x-calendar-sel");this.endSelection=a;this.fireEvent("select",this,a)}},onMouseDown:function(c){if(this.disabled){return}if(this.clickToChange&&c.target!=this.thumb.dom){this.cancelDelayThumbSetVisible();var b=this.wrap.translatePoints(c.getXY());var a=this.wrap.translatePoints(this.wrap.getXY());if(b.top>a.top+this.clickRange[0]&&b.top<a.top+this.clickRange[1]){this.setValue(Math.floor((b.left-3)/this.getRatio()))}}this.focus()},onKeyDown:function(b){if(this.disabled){b.preventDefault();return}var a=b.getKey();switch(a){case b.UP:case b.RIGHT:b.stopEvent();if(b.ctrlKey){this.setValue(this.maxValue)}else{this.setValue(this.value+this.keyIncrement)}break;case b.DOWN:case b.LEFT:b.stopEvent();if(b.ctrlKey){this.setValue(this.minValue)}else{this.setValue(this.value-this.keyIncrement)}break;default:b.preventDefault()}},doSnap:function(b){if(!this.increment||this.increment==1||!b){return b}var d=b,c=this.increment;var a=b%c;if(a>0){if(a>(c/2)){d=b+(c-a)}else{d=b-a}}return d.constrain(this.minValue,this.maxValue)},getRatio:function(){return 20},normalizeValue:function(a){if(typeof a!="number"){a=parseInt(a)}a=Math.round(a);a=this.doSnap(a);a=a.constrain(this.minValue,this.maxValue);return a},setValue:function(b,a,c){b=this.normalizeValue(b);if(b!==this.value&&this.fireEvent("beforechange",this,b,this.value)!==false){this.value=b;this.moveThumb(this.translateValue(b)+3,a!==false);if(!c){this.fireEvent("change",this,b)}}},translateValue:function(a){return(a*this.getRatio())},moveThumb:function(b,a){if(!a||this.animate===false){this.thumb.setLeft(b)}else{this.thumb.shift({left:b,stopFx:true,duration:this.animationDuration})}},focus:function(){},onBeforeDragStart:function(a){return !this.disabled},onDragStart:function(a){this.cancelDelayThumbSetVisible();this.thumb.addClass("x-calendar-thumb-drag");this.fireEvent("dragstart",this,a)},onDrag:function(a){var b=this.el.translatePoints(this.tracker.getXY());this.setValue(Math.floor(b.left/this.getRatio()-0.16),false,true);this.fireEvent("drag",this,a)},onDragEnd:function(a){this.thumb.removeClass("x-calendar-thumb-drag");this.fireEvent("dragend",this,a)},onResize:function(a,b){this.innerEl.setWidth(a-(this.el.getPadding("l")+this.endEl.getPadding("r")))},getValue:function(){return this.value},getDate:function(b){var a;if(this.value){a=this.firstDate.add(Date.DAY,this.value)}else{a=this.date}if(b){a=a.format(b)}return a},updateStatus:function(){var a=0;var b;this.removeBoxClasses();this.databox.store.each(function(d,e,g){var h=Date.parseDate(d.get("date"),TDS.env.dateFormat);h.clearTime();while(this.firstDate.add(Date.DAY,a).getTime()<h.getTime()&&!b){if(this.firstDate.add(Date.DAY,this.numberOfBoxes).getTime()<h.getTime()){var c=true;break}else{if(this.firstDate.add(Date.DAY,a).getTime()==h.getTime()){b=true;break}}a++;if(a>100){break}}if(this.firstDate.add(Date.DAY,a).clearTime().getTime()==h.getTime()){var f=Ext.get(this.wrap.dom.childNodes[a+1]);if(f){f.addClass("status-"+d.get("prominentStatus"))}}if(c){return false}},this)},removeBoxClasses:function(){for(var a=0;a<this.boxValues.length;a++){this.el.child("a.index-"+(a+1)).removeClass(["status-OK","status-RQ","status-NA"])}},moveInTime:function(b,e){if(!this.thumb.hasActiveFx()){this.date=this.getDate()}this.dayOne=null;this.dayTwoLabel="";localAnimation=0.4;this.removeBoxClasses();for(var c=0;c<this.boxValues.length;c++){if(c==0&&e){var a=e;this.date=a.add(Date.DAY,8)}else{if(c==0){if(b){var a=this.firstDate.add(Date.DAY,-this.boxValues.length-c);if(this.thumb.isVisible()){this.setValue(this.maxValue,false,true);if(this.animate){var d=this.wrap.getLeft()+this.wrap.getWidth();this.thumb.shift({width:0,height:20,x:d,easing:"easeIn",duration:localAnimation});this.thumbDelayTask.delay((localAnimation+this.animationDuration)*1000,this.delayThumbSetVisible,this,false)}else{this.thumb.hide()}}}else{var a=this.firstDate.add(Date.DAY,this.boxValues.length-c);if(this.thumb.isVisible()){this.setValue(this.minValue,false,true);if(this.animate){this.thumb.shift({width:0,height:20,easing:"easeIn",duration:localAnimation});this.thumbDelayTask.delay((localAnimation+this.animationDuration)*1000,this.delayThumbSetVisible,this,false)}else{this.thumb.hide()}}}}}this.boxValues[c]=a.add(Date.DAY,c).format("j");if(this.date.format("U")==a.add(Date.DAY,c).format("U")){this.cancelDelayThumbSetVisible();this.setValue(c,false,true)}this.el.child("a.index-"+(c+1)).first().first().update(this.boxValues[c]);if(this.boxValues[c]==1&&this.dayOne==null){this.dayOne=c+1;this.dayTwoLabel=this.months[a.add(Date.DAY,c).format("n")-1]+" "+a.add(Date.DAY,c).format("Y")}}this.firstDate=a;this.initLabel();if(this.databox){this.updateStatus()}},resetScale:function(){this.thumb.stopFx();this.thumb.setWidth(this.length*20);if(this.thumb.getLeft()==this.wrap.getLeft()+this.wrap.getWidth()){this.thumb.setStyle("left",this.thumb.getLeft()-this.thumb.getWidth())}},cancelDelayThumbSetVisible:function(){this.thumbDelayTask.cancel();this.resetScale();if(!this.thumb.isVisible()){this.thumb.setVisible(true)}},delayThumbSetVisible:function(a){this.thumb.setVisible(a);if(!a){this.value=null}this.resetScale()}});Ext.reg("calendar",Ext.Calendar);