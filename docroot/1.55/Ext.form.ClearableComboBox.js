Ext.form.ClearableComboBox=Ext.extend(Ext.form.ComboBox,{hideTrigger:false,triggerClass:"x-form-clear-trigger",initComponent:function(){this.addEvents("clear");Ext.form.ClearableComboBox.superclass.initComponent.call(this)},onTriggerClick:function(){this.clearValue();this.fireEvent("clear",this)}});Ext.reg("clearablecombo",Ext.form.ClearableComboBox);