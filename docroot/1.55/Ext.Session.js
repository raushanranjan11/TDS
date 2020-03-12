Ext.namespace("TDS.session");TDS.session=new Ext.data.JsonStore({url:TDS.env.sessionPath,fields:["path","session_key","value"],getByPath:function(b){if(b.path.substring(0,this.url.length)==this.url){b.path=b.path.substring(this.url.length)}if(b.path.substring(0,1)=="/"){b.path=b.path.substring(1)}var e=b.path;var a=this.findByPath(e);if(a!==-1){var f={};for(var c=0;c<a.length;c++){f[a[c].data.session_key]=a[c].data.value}return f}else{this.retrieveSession(b);return -1}},get:function(){return this.getByPath.apply(this,arguments)},setByPath:function(g,f){if(g.substring(0,this.url.length)==this.url){g=g.substring(this.url.length)}if(g.substring(0,1)=="/"){g=g.substring(1)}var c=this.processData(g,f);var b,a,e;for(var d=0;d<c.length;d++){a=c[d]["session_key"];e=c[d]["value"];b=this.findByPathSessionKey(g,a);if(b!==-1){b.set("value",e)}else{b=new this.recordType({newRecord:true});b.data.path=g;b.data.session_key=a;b.data.value=e;this.add(b);this.modified.push(b)}}},set:function(){return this.setByPath.apply(this,arguments)},translatePath:function(a){return a.split("/").join(".")},findByPathSessionKey:function(c,a){var b;this.each(function(d){if(d.data.path===c&&d.data.session_key===a){b=d;return false}},this);return typeof b==="object"?b:-1},findByPath:function(b){var a=[];this.each(function(c){if(c.data.path===b){a.push(c)}},this);return a.length>0?a:-1},removeByPath:function(c){var a=this.findByPath(c);if(a!==null){for(var b=0;b<a.length;b++){this.remove(a[b])}}},processData:function(d,c){var a=[];for(var b in c){a.push({path:d,session_key:b,value:c[b]})}return a},addData:function(b,a){this.removeByPath(b);this.loadData(a,true)},retrieveSession:function(a){var b=a.path;Ext.Ajax.request({url:this.url+b,method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"},scope:this,callback:function(j,f,g){if(f){try{var i=Ext.util.JSON.decode(g.responseText)}catch(h){return}var c=this.processData(b,i);this.addData(b,c);Ext.callback(a.callback,a.scope||this,[i])}}})},saveSession:function(b,a){Ext.Ajax.request({url:this.url+b,method:"PUT",headers:{"Content-Type":"application/json"},jsonData:a,scope:this,callback:function(e,c,d){if(!c){}}})}});