{
	xtype: 'form',
	border: false,
	fileUpload : true,
	markDataDirtyOnLoad: true,
	items: [{
		xtype: 'tabpanel',
		activeTab: 0,
		layoutOnTabChange: true,
		//height: 380,
		//width: 460,
		items: [
			// details tab
			{
				title: 'Description',
				layout: 'anchor',//form
				//layoutConfig:{columns:1},
				items: [
					{
							xtype: 'panel',
								layout:'fit',
								height: 350,
							width: 250,
								 frame: true,autoScroll:false,
								items:[

					
				{
							xtype: 'htmleditor',
							name: 'description',
							hideLabel: true,
							labelSeparator: '',
							anchor: '90%',
							enableLinks: true,
							enableLists: true,
							enableSourceEdit: false,
							enableFontSize: true,
							enableFont: false,
							enableColors: true,
							enableAlignments: true,
							//height: 350,
							//width: 160,
								region:'center',
								 margin:'0 0 0 0',
							autoScroll:false,
							listeners:{
							render:function(){
							
							}
							}
						}]
					}]
			},
				// Graphics Tab
			{
				title: 'Graphics',
				xtype: 'panel',
				//id:'vinay',
				layout: 'form',
				alias : 'widget.fileuploadform',
				//style: '  margin-left: 10px;',
				autoScroll:true,
				width: 300, 
				border: false,
				hideBorders: true,
				items: [        
						{
							xtype: 'textfield',
							id:'graphicImgPath',
							hidden: true,
							name:'graphicImgPath',
								//width: 300
							
						},
						{
							html: 'Image size maximum of 220 x 140 pixels.',
							style: 'padding: 5px 0px 5px 0px;'
						},
						{
							html: '',
							style: 'margin-left: 10px; '
						},
						{
							html:'<form action="fileUpload" enctype="multipart/form-data" method="post"><td width= "300"><input width= "300" name="fileUpLoad" id="fileUpLoad"type="file"  /></td></form>',
							width: 300
						},
						{
							html: '',
							style: 'margin-left: 10px; '
						},
						{
							xtype: 'button',
							text: 'Delete',
							style: 'padding: 6px 0px 0px 245px;',
							handler: function(btn){
								document.images['image1'].src = "";
								Ext.getCmp('imagePanel').html = '<img border="0" id="imageId" name="image1" src="" ><input type="hidden" id ="imgName"  name="imgName" value="">';
								var w = this.ownerCt.findParentByType('awesomewindow');
								var sourceDataURI = w.aw.sourceDataURI;
								var imName = document.getElementById('imgName').value;
								if(imName)
								{
									var params = {};	   
									if (imName) params['removefile'] = imName;
									if (imName) params['imageStorePath'] = sourceDataURI;   
									params['imageName'] = Ext.getCmp('graphicImgPath').getValue();
									Ext.Ajax.request({
												url:TDS.env.dataPath+'fileUpload',
												method: 'POST',
												params: params,
												callback: function (o, s, r) {
															if (s) 
															{
																Ext.Msg.alert("","Deleted succussefully.");
																document.images['image1'].src = '';
																document.getElementById('imgName').value = '';
																document.getElementById('fileUpLoad').value = '';
																var jd = {
																			deletePath:true,
																			imagePath:document.getElementById('imgName').value
																		 };
																	Ext.Ajax.request({
																	url: TDS.env.dataPath+sourceDataURI+"/graphicImage",
																	method: 'POST',
																	jsonData: jd,
																	//callback: this.submitFlightResponse,
																	scope: this
																	});

															}
															else
															{
																Ext.Msg.alert("","Error coocured..");
															}
												}

										});
								}
							}
						},
						{
							xtype: 'button',
							text: 'Upload',
							style: 'padding: 6px 0px 0px 245px;',
							handler: function(btn)
								{
								document.images['image1'].src = "";
								Ext.getCmp('imagePanel').html = '<img border="0" id="imageId" name="image1" src="" ><input type="hidden" id ="imgName"  name="imgName" value="">';
									 var w = this.ownerCt.findParentByType('awesomewindow');
									 var sourceDataURI = w.aw.sourceDataURI;
									 var im = document.getElementById('fileUpLoad').value
									 var file = document.getElementById('fileUpLoad').files[0];
									 if (file)
									 {
										var fileSize = 0;
										if (file.size > (220 * 140))
											Ext.Msg.alert("","Image too large. Maximum size 220 x 140 pixels.");
										else
											uploadFile();
									 }
		
									function uploadFile() 
									{
										var fd = new FormData();
										fd.append("image", file);
										var xhr = new XMLHttpRequest();
										xhr.upload.addEventListener("progress", uploadProgress, false);
										xhr.addEventListener("load", uploadComplete, false);
										xhr.addEventListener("error", uploadFailed, false);
										xhr.addEventListener("abort", uploadCanceled, false);
										xhr.open("POST",TDS.env.dataPath+"fileUpload?&imageName="+Ext.getCmp('graphicImgPath').getValue()+"&imageStorePath="+sourceDataURI);
										xhr.send(fd);
										
										xhr.onreadystatechange = function() {
											if (xhr.readyState == 4) 
												{		 // debugger;
													var hdrs = xhr.getAllResponseHeaders();
													var resp = xhr.responseText;
													var dataURI = sourceDataURI;

													var imageNameNew = "GraphicsImg/"+resp;
													document.getElementById('imgName').value = imageNameNew;

														var jd = {
																	deletePath:false,
																	imagePath:document.getElementById('imgName').value
																 };
															Ext.Ajax.request({
															url: TDS.env.dataPath+sourceDataURI+"/graphicImage",
															method: 'POST',
															jsonData: jd,
															callback: function(o,s,r){
															if (s) 
															{
																Ext.Msg.alert("","Graphics Uploaded successfully..");
																//debugger;
																var ro = Ext.util.JSON.decode(r.responseText);
																
																Ext.getCmp('graphicImgPath').setValue(ro.graphicImgPath);
																document.images['image1'].src = "../"+ro.graphicImgPath;
																document.getElementById('imgName').value = ro.graphicImgPath;
															}
															else
															{
																Ext.Msg.alert("","Error coocured..");
															}
														},
														scope: this
													});
													
												}       
											}	

									}

									function uploadProgress(evt) {}

									function uploadComplete(evt) 
									{
										
									}

									function uploadFailed(evt) 
									{
									   Ext.Msg.alert("","There was an error attempting to upload the file.");
									}

									function uploadCanceled(evt) 
									{
										Ext.Msg.alert("","The upload has been canceled by the user or the browser dropped the connection.");
									}
		
							}
						},
						{
							//html: 'vinay'  ,//width="370" height="220"
							id: 'imagePanel',
							border:false,
							height: 'auto',
							width: 'auto',
							listeners: {
							beforerender: function () {
									
									 var grap_image_path = "";
									 var graphicImagePath =  Ext.getCmp('graphicImgPath').getValue();
									 
									 
									var imageHotusa=graphicImagePath.substring(0,4); 
										
									if(imageHotusa=='http'){
										this.html = '<img border="0" height ="300px" width="300px" id="imageId" name="image1" src='+graphicImagePath+' ><input type="hidden" id ="imgName"  name="imgName" value='+graphicImagePath+'>';
									}
									else {//if(graphicImagePath != '' && graphicImagePath != null){
										grap_image_path =  "../"+graphicImagePath;
										this.html = '<img border="0" height ="300px" width="300px" id="imageId" name="image1" src='+grap_image_path+' ><input type="hidden" id ="imgName"  name="imgName" value='+grap_image_path+'>';
									}
									//this.html = '<img border="0" id="imageId" name="image1" src='+grap_image_path+' ><input type="hidden" id ="imgName"  name="imgName" value='+grap_image_path+'>';
								}
								
							}
						}
					]
		}]
	}]
}






