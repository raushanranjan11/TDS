Ext.util.TimerRunner=function(f){f=f||10;var h=[],a=[];var c=0;var i=false;var k=0;var g=0;var d=function(){i=false;clearInterval(c);c=0};var j=function(){if(!i){i=true;c=setInterval(l,f)}};var b=function(m){a.push(m);if(m.onStop){m.onStop.apply(m.scope||m)}};var l=function(){if(a.length>0){for(var r=0,n=a.length;r<n;r++){h.remove(a[r])}a=[];if(h.length<1){d();return}}var p=new Date().getTime();for(var r=0,n=h.length;r<n;++r){var q=h[r];var m=p-q.taskRunTime;if(q.interval<=m){var o=q.run.apply(q.scope||q,q.args||[++q.taskRunCount]);q.taskRunTime=p;if(o===false||q.taskRunCount===q.repeat){b(q);return}}if(q.duration&&q.duration<=(p-q.taskStartTime)){b(q)}}};var e=function(q){for(var p=0,m=h.length;p<m;++p){var o=h[p];if(o.id==q){var n=o;break}}return n||false};this.getTimeRemaining=function(o){var r=Math.floor(o/86400000);if(r){o-=(r*86400000)}var n=Math.floor(o/3600000);if(n){o-=(n*3600000)}var q=Math.floor(o/60000);if(q){o-=(q*60000)}var p=Math.floor(o/1000);if(p){o-=(p*1000)}var m="";if(r){m+=r+"d "}if(n){m+=n+"h "}if(q){m+=q+"m "}if(p){m+=p+"s"}return{days:r,hours:n,mins:q,secs:p,getInterval:function(){if(this.days){return 3600000}else{if(this.hours){return 60000}else{return 1000}}},display:function(){var s="";if(this.days){s=this.days+"d";if(this.hours){s+=" "+this.hours+"h"}}else{if(this.hours){s=this.hours+"h";if(this.mins){s+=" "+this.mins+"m"}}else{if(this.mins){s=this.mins+"m";if(this.secs){s+=" "+this.secs+"s"}}else{if(this.secs){s=this.secs+"s"}}}}return s}}};this.start=function(m){var n=e(m.id);if(n){if(m.expireTime!==n.expireTime){n.expireTime=m.expireTime;n.init();n.interval=10}return n}h.push(m);m.taskStartTime=new Date().getTime();m.taskRunTime=0;m.taskRunCount=0;m.init();j();return m};this.stop=function(m){b(m);return m};this.stopAll=function(){d();for(var n=0,m=h.length;n<m;n++){if(h[n].onStop){h[n].onStop()}}h=[];a=[]};this.lookup=function(m){var n=e(m);if(n){return n}return false};this.setServerTime=function(m){g=m;var n=new Date().getTime();k=n-m};this.getServerTime=function(){return g};this.getServerCalculatedTime=function(){var m=new Date().getTime();if(k){m=m-k}return m};this.getServerCalculatedDate=function(){var m=new Date();var n=m.getTime();if(k){n=n-k}m.setTime(n);return m};this.getTimeOffset=function(){return k};this.getActiveTimers=function(){return h}};Ext.TimerMgr=new Ext.util.TimerRunner();