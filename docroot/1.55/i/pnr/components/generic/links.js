{xtype:"panel",border:false,layout:"fit",bodyStyle:"padding: 8px;",items:{xtype:"dataview",style:"overflow: auto;",store:new Ext.data.CollectionStore({url:"",fields:["description","href"]}),tpl:new Ext.XTemplate('<tpl for=".">','<div class="link-item" style="padding-bottom: 6px;">',"<p><a href=\"#\" onclick=\"return externalLink('{href}', 'arenaExternalLink');\">{description}</a></p>","<p>{href}</p>","</div>","</tpl>"),itemSelector:"div.link-item",emptyText:"No links to display."},listeners:{render:function(){var tp=this.ownerCt.findParentByType("tabpanel");var dataURI=tp.getDetail("offeringURI");var store=this.items.itemAt(0).store;with(store){proxy.conn.url=TDS.env.dataPath+dataURI+"/hrefs/collection";reader.meta.identifier=dataURI+"/hrefs";load()}}}}