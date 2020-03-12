Ext.override(Ext.Toolbar, {
	addButton : function (d) {
		if (Ext.isArray(d)) {
			var f = [];
			for (var e = 0, c = d.length; e < c; e++) {
				f.push(this.addButton(d[e]))
			}
			return f
		}
		var a = d;
		a.buttonContainer = this;
		if (!(d instanceof Ext.Toolbar.Button)) {
			a = d.split ? new Ext.Toolbar.SplitButton(d) : new Ext.Toolbar.Button(d)
		}
		var g = this.nextBlock();
		this.initMenuTracking(a);
		a.render(g);
		this.items.add(a);
		return a
	},
	addField : function (b) {
		var c = this.nextBlock();
		b.render(c);
		var a = new Ext.Toolbar.Item(c.firstChild);
		a.render(c);
		this.items.add(b);
		b.ownerCt = this;
		return a
	}
});
Ext.override(Ext.form.BasicForm, {
	findFieldAggressive : function (b) {
		var a = this.items.get(b);
		if (!a) {
			this.items.each(function (c) {
				if (c.isFormField && (c.dataIndex == b || c.id == b || c.getName() == b || c.name == b)) {
					a = c;
					return false
				}
			})
		}
		return a || null
	}
});
Ext.override(Ext.form.Field, {
	listeners : {
		beforeHide : {
			fn : function () {
				if (!this.getEl() || !this.getEl().up(".x-form-item")) {
					return
				}
				this.getEl().up(".x-form-item").setDisplayed(false)
			}
		},
		beforeShow : {
			fn : function () {
				if (!this.getEl() || !this.getEl().up(".x-form-item")) {
					return
				}
				this.getEl().up(".x-form-item").setDisplayed(true)
			}
		}
	}
});
Ext.override(Ext.Button, {
	onFocus : function (a) {
		this.blur()
	}
});
Ext.override(Ext.DataView, {
	getStore : function () {
		return this.store
	}
});
Date.getShortMonthName = function (a) {
	return Date.monthNames[a].substring(0, 3).toUpperCase()
};
Date.getDays = function (a, c) {
	if (typeof a !== "object" || typeof c !== "object") {
		return false
	}
	a.clearTime();
	c.clearTime();
	var d = [];
	d.push(a);
	var b = a;
	while (b < c) {
		b = b.add(Date.DAY, 1);
		d.push(b)
	}
	return d
};
Ext.override(Ext.data.Store, {
	clone : function (a) {
		a = Ext.apply({
				reader : this.reader,
				proxy : this.proxy,
				recordType : this.recordType,
				url : this.url,
				baseParams : this.baseParams,
				lastOptions : this.lastOptions,
				remoteSort : this.remoteSort
			}, a || {});
		var b = new Ext.data.Store(a);
		b.data = this.data.clone();
		b.modified = [].concat(this.modified);
		return b
	}
});
Ext.override(Ext.form.ComboBox, {
	bindStore : function (c, d) {
		if (this.store && !d) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("load", this.onLoad, this);
			this.store.un("loadexception", this.collapse, this);
			if (!c) {
				this.store = null;
				if (this.view) {
					this.view.setStore(null)
				}
			}
		}
		if (c) {
			if (Ext.isArray(this.appendData)) {
				this.store = Ext.StoreMgr.lookup(c).clone();
				var b = [];
				for (var e = 0; e < this.appendData.length; e++) {
					var a = new this.store.recordType(this.appendData[e]);
					b[e] = a
				}
				this.store.add(b);
				this.store.sort(this.displayField)
			} else {
				this.store = Ext.StoreMgr.lookup(c)
			}
			this.store.on("beforeload", this.onBeforeLoad, this);
			this.store.on("load", this.onLoad, this);
			this.store.on("loadexception", this.collapse, this);
			if (this.view) {
				this.view.setStore(this.store)
			}
		}
	}
});
Ext.apply(Ext.form.VTypes, {
	numeric : function () {
		var a = /(^-?dd*.d*$)|(^-?dd*$)|(^-?.dd*$)/;
		return function (b) {
			return a.test(b)
		}
	},
	numericText : "Not a valid numeric number. Must be numbers",
	numericMask : /[.0-9]/
});
Ext.override(Ext.data.HttpProxy, {
	load : function (e, b, f, c, a) {
		if (this.fireEvent("beforeload", this, e) !== false) {
			var d = {
				params : e || {},
				disableCaching : false,
				request : {
					callback : f,
					scope : c,
					arg : a
				},
				reader : b,
				callback : this.loadResponse,
				scope : this
			};
			if (this.useAjax) {
				Ext.applyIf(d, this.conn);
				if (this.activeRequest) {
					Ext.Ajax.abort(this.activeRequest)
				}
				this.activeRequest = Ext.Ajax.request(d)
			} else {
				this.conn.request(d)
			}
		} else {
			f.call(c || this, null, a, false)
		}
	}
});
Ext.override(Ext.grid.GridPanel, {
	getSelectedData : function () {
		if (!this.destinationDataURI) {
			return
		}
		Ext.Ajax.request({
			url : this.destinationDataURI,
			method : "GET",
			headers : {
				"Content-Type" : "application/json"
			},
			scope : this,
			callback : function (h, e, f) {
				if (e) {
					var g = Ext.decode(f.responseText);
					if (Ext.isArray(g)) {
						var c = [];
						for (var d = 0; d < g.length; d++) {
							var b = this.getStore().findBy(function (i, j) {
									if ((i.data.dataURI) == g[d]) {
										return true
									}
								}, this, 0);
							if (b != -1) {
								var a = this.getStore().getAt(b);
								c.push(a)
							}
						}
						if (c.length > 0) {
							this.selModel.selectRecords(c, true)
						}
					}
				}
			}
		})
	}
});
Ext.override(Ext.layout.BorderLayout.Region, {
	getCollapsedEl : function () {
		if (!this.collapsedEl) {
			if (!this.toolTemplate) {
				var b = new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
				b.disableFormats = true;
				b.compile();
				Ext.layout.BorderLayout.Region.prototype.toolTemplate = b
			}
			this.collapsedEl = this.targetEl.createChild({
					cls : "x-layout-collapsed x-layout-collapsed-" + this.position,
					id : this.panel.id + "-xcollapsed"
				});
			if (this.enableCollapsedTitle) {
				var c = this.collapsedTitle ? this.collapsedTitle : "";
				this.collapsedTitleWrapEl = this.collapsedEl.createChild({
						tag : "div",
						cls : "x-layout-collapsed-twrap",
						id : this.panel.id + "-xcollapsed-twrap",
						html : '<p class="x-layout-xcollapsed-title">' + c + "</p>"
					});
				if (this.collapsedTitleCls) {
					this.collapsedTitleWrapEl.addClass(this.collapsedTitleCls)
				}
			}
			this.collapsedEl.enableDisplayMode("block");
			if (this.collapseMode == "mini") {
				this.collapsedEl.addClass("x-layout-cmini-" + this.position);
				this.miniCollapsedEl = this.collapsedEl.createChild({
						cls : "x-layout-mini x-layout-mini-" + this.position,
						html : "&#160;"
					});
				this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
				this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
				this.collapsedEl.on("click", this.onExpandClick, this, {
					stopEvent : true
				})
			} else {
				var a = this.toolTemplate.append(this.collapsedEl.dom, {
						id : "expand-" + this.position
					}, true);
				a.addClassOnOver("x-tool-expand-" + this.position + "-over");
				a.on("click", this.onExpandClick, this, {
					stopEvent : true
				});
				if (this.floatable !== false) {
					this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
					this.collapsedEl.on("click", this.collapseClick, this)
				}
			}
		}
		return this.collapsedEl
	}
});
Ext.override(Ext.form.Field, {
	setFieldLabel : function (a) {
		if (this.rendered) {
			this.el.up(".x-form-item", 10, true).child(".x-form-item-label").update(a)
		}
		this.fieldLabel = a
	}
});
Ext.override(Ext.form.HtmlEditor, {
	onDisable : function () {
		if (this.rendered) {
			var a = this.wrap.mask();
			a.dom.style.filter = "alpha(opacity=05);";
			a.dom.style.opacity = "0";
			a.dom.style.background = "white"
		}
		Ext.form.HtmlEditor.superclass.onDisable.call(this)
	},
	onEnable : function () {
		if (this.rendered) {
			this.wrap.unmask()
		}
		Ext.form.HtmlEditor.superclass.onEnable.call(this)
	}
});


/*Ext.override(Ext.form.NumberField, {
    setValue : function(v){
            v = typeof v == 'number' ? v : String(v).replace(this.decimalSeparator, ".");
        v = isNaN(v) ? '' : String(v).replace(".", this.decimalSeparator);
        return Ext.form.NumberField.superclass.setValue.call(this, v);
    },
    fixPrecision : function(value){
        var nan = isNaN(value);
        if(!this.allowDecimals || this.decimalPrecision == -1 || nan || !value){
           return nan ? '' : value;
        }
        return parseFloat(value).toFixed(this.decimalPrecision);
    }
})*/



/*
Ext.override(
 Ext.DatePicker, {
                pickerField: me,
                ownerCt: me.ownerCt,
               // renderTo: document.body,
                floating: true,
                hidden: true,
                focusOnShow: true,
                minDate: me.minValue,
                maxDate: me.maxValue,
                disabledDatesRE: me.disabledDatesRE,
                disabledDatesText: me.disabledDatesText,
                disabledDays: me.disabledDays,
                disabledDaysText: me.disabledDaysText,
                format: me.format,
                showToday: me.showToday,
                startDay: me.startDay,
                minText: format(me.minText, me.formatDate(me.minValue)),
                maxText: format(me.maxText, me.formatDate(me.maxValue)),
                listeners: {
                    select: { scope: me, fn: me.onSelect },
                    monthdblclick: { scope: me, fn: me.onOKClick },
                    yeardblclick: { scope: me, fn: me.onOKClick },
                    OkClick: { scope: me, fn: me.onOKClick },
                    CancelClick: { scope: me, fn: me.onCancelClick }
                },
                keyNavConfig: {
                    esc: function () {
                        me.collapse();
                    }
                }
            //});
}


);
*/

/*
Ext.override(Ext.form.NumberField, {
    forcePrecision : false,

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        if (isNaN(value))
        {
          value = '';
        } else {
          value = me.forcePrecision ? value.toFixed(me.decimalPrecision) : parseFloat(value);
          value = String(value).replace(".", decimalSeparator);
        }
        return value;
    }
});

Ext.override(Ext.form.NumberField, {
    forcePrecision : false,

    valueToRaw: function(value) {
        var me = this,
            decimalSeparator = me.decimalSeparator;
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        if (isNaN(value))
        {
          value = '';
        } else {
          value = me.forcePrecision ? value.toFixed(me.decimalPrecision) : parseFloat(value);
          value = String(value).replace(".", decimalSeparator);
        }
        return value;
    }
});

*/














































