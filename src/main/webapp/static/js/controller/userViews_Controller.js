'use strict';

App.controller('UserViewsController',['$scope','$window','UserViewsService',function($scope,$window,UserViewsService){
	var self=this;
	self.user={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:new FormData(),pw:''};

	//	var url='http://localhost:8080/OSN';
	var url='http://193.206.170.142/OSN';

	//CHECK SESSION AND SHOW USER ALBUM(ENCRYPTED) AND CHECK IF YOU SEARCHED HAS FRIEND
	$window.onload=function(){
		Lockr.flush();
		var sessionUser=self.readIDSessionUser();
		Lockr.set("sessionUser",sessionUser);
		var searchedUser=self.readIDSearchedUser();
		Lockr.set("searchedUser",searchedUser);
		UserViewsService.checkSession(Lockr.get("sessionUser")) 
		.then(
				function(data){

					if(data.session==0){
						$window.location.href=url;
					}else{


						UserViewsService.getFriendshipRequestor(Lockr.get("searchedUser"))
						.then(
								function(data){
									
									self.user=data;
									self.image=self.user.photo;

									var binary = '';
									var bytes = new Uint8Array( self.image);
									var len = bytes.byteLength;
									for (var i = 0; i < len; i++) {
										binary += String.fromCharCode( bytes[ i ] );
									}
									var base64Image=window.btoa( binary );

									var tag="data:image/JPEG;base64,";
									var imageDecoded=tag+base64Image;


									var img = document.createElement("img");
									img.src = imageDecoded;
									img.width="280";
									img.height="280";
									img.alt="Avatar";
									document.getElementById("foo").appendChild(img);
									self.getAlbum(); 
									UserViewsService.isPending(Lockr.get("sessionUser"),Lockr.get("searchedUser"))
									.then(
											function(data){
											
												var isPending=data.data;
												if(isPending == 0){
													UserViewsService.getPK('PFS')
													.then(
															function(data){
																
																var modulus_PFS=data.modulus;
																var exponent_PFS=data.exponent;
													var messageToPFS={"sessionUser":Lockr.get("sessionUser"),"searchedUser":Lockr.get("searchedUser")}
													 messageToPFS=JSON.stringify(messageToPFS);
													var rsa=new RSAKey();
													rsa.setPublic(modulus_PFS,exponent_PFS);
													var messageEncryptedToPFS=rsa.encrypt(messageToPFS);
													
													UserViewsService.isFriend(messageEncryptedToPFS)
													.then(
															function(data){	

																var isFriend=data.data;
																if(isFriend==0){
																	document.getElementById('requestfriend').disabled =false;
																}
															},function(errResponse){
																console.error("Error while is friend");
															});
												},function(errResponse){
													console.error("Error while get PK");
												});
												}
											},function(errResponse){
												console.error("Error while is pending");
											});

								},function(errResponse){
									console.error('Error while getUser...');
								});	
					}},function(errResponse){
						console.error('Error while check Session...');
					});	
	},

	//SEND FRIENDSHIP REQUEST
	self.friendshipCreation=function(){
		document.getElementById('requestfriend').disabled =true;
		UserViewsService.friendshipCreation(Lockr.get("sessionUser"),Lockr.get("searchedUser"))
		.then(
				function(data){
					return data;
				},function(errResponse){
					console.error('Error while send friendship request...');
				});	
	},

	self.compile=function(element){
		var el = angular.element(element);    
		$scope = el.scope();

		var $injector = angular.injector();
		$injector = el.injector();


		$injector.invoke(function($compile){
			$compile(el)($scope)
		})     
	},

	//SHOW ALBUM
	self.getAlbum=function(){
		UserViewsService.getAlbum(Lockr.get("searchedUser"))
		.then(
				function(response){
					self.metaTag=response.data;
					var ul=document.createElement("ul");
					for(var j=0;j<Object.keys(self.metaTag).length;j++){
						var li=document.createElement("li");
						var a=document.createElement("a");
						a.href="";
						var fileName=self.metaTag[j].fileName;
						a.setAttribute("ng-click","ctrl.download('"+fileName+"')");
						var text = document.createTextNode(self.metaTag[j].metaTag);
						a.appendChild(text);
						li.appendChild(a);
						ul.appendChild(li);
					}
					document.getElementById("gallery").appendChild(ul);
					
		
					self.compile(document.getElementById("gallery"));
				},
				function(errResponse){
					console.error('Error while getUser...');

				});



	},



	self.back=function(){

		UserViewsService.getUser(Lockr.get('sessionUser'))
		.then(
				function(data){

					$window.location.href=url+'/profile/'+Lockr.get('sessionUser')+'?'+data.lastname+data.firstname;

				},function(errResponse){
					console.error('Error while getUser...');

				});
	},


	//DOWNLOAD PHOTO
	self.download=function(filename){
		var image= document.getElementById('img');
		image.parentNode.removeChild(image);
	
		UserViewsService.checkSession(Lockr.get("sessionUser")) 
		.then(
				function(data){

					if(data.session==0){
						$window.location.href=url;
					}else{

		UserViewsService.getUserViewPhoto(Lockr.get("searchedUser"),filename)
		.then(
				function(data){
					
					var idPhoto=data.data.idPhoto;

					UserViewsService.getPK('RMS')
					.then(
							function(data){
								Lockr.set('modulus_RMS',data.modulus);
								Lockr.set('exponent_RMS',data.exponent);
								var n1=Math.floor(Math.random()*100+1);
								var msgRMS={"idRequestor":Lockr.get('sessionUser'),'idResource':idPhoto,'N1':n1};

								msgRMS=JSON.stringify(msgRMS);
								var rsa=new RSAKey();
								rsa.setPublic(Lockr.get('modulus_RMS'),Lockr.get('exponent_RMS'));
								msgRMS=rsa.encrypt(msgRMS);

								UserViewsService.getDownload(msgRMS)
								.then(
										function(data){


											var AESParams=data.data.AESParams;
											var encrypted_msg_client=data.data.encrypted_msg_client;
											
											UserViewsService.getPKClient(Lockr.get("sessionUser"))
											.then(
													function(data){


														var salt=data.salt;
														var iv=data.iv;
														
														bootbox.prompt({
														    title: "Enter your Passphrase..",
														    inputType: 'password',
														    callback:function (result) {
														      
														       Lockr.set("passPhrase",result);
														   	var keySize = 128;
															var iterationCount = 1000;
															var aesUtil=new AesUtil(keySize,iterationCount);
															
															var priv_key=aesUtil.decrypt(salt,iv,Lockr.get('passPhrase'),data.private_key);

															var rsa=new RSAKey();
															priv_key=priv_key.toString(CryptoJS.enc.utf8);
															rsa.setPrivate(data.modulus_public,data.exponent_public, priv_key); 

															var decryptAes=rsa.decrypt(AESParams);
															decryptAes=JSON.parse(decryptAes);

															var decryptedMessageFromRMS=aesUtil.decrypt(decryptAes.salt,decryptAes.iv,decryptAes.passphrase,encrypted_msg_client);
															decryptedMessageFromRMS=JSON.parse(decryptedMessageFromRMS);

															var secretOwner=decryptedMessageFromRMS.secret_owner;
															var msgFromKMS=decryptedMessageFromRMS.msgFromKMS;
															msgFromKMS=rsa.decrypt(msgFromKMS);

															msgFromKMS=JSON.parse(msgFromKMS);

															var token=msgFromKMS.token;

															var url=msgFromKMS.url_encryptedrsc;

															var secret=secretOwner+token;


															var req = new XMLHttpRequest();

															req.open('GET',url, false);
															req.send(null);

															if(req.status == 200) {
																var photo=req.responseText;
															}
															try{
																photo=aesUtil.decrypt(secretOwner,token,secret,photo);
															}catch(e){
															
																$window.alert("You don't have permission to access the requested object!");
																$window.location.reload(false);
															}

															var binary = '';
															var buf = new ArrayBuffer(photo.length); // 2 bytes for each char

															var bytes = new Uint8Array(buf);
															var len = bytes.byteLength;
															for (var i = 0; i < len; i++) {
																binary += String.fromCharCode( bytes[ i ] );
															}
															var base64Image=window.btoa( binary );

															var tag="data:image/JPEG;base64,";
															var imageDecoded=tag+photo;//base64Image;

														
															
															
															var img = document.createElement("img");
															var a=document.createElement("a");
															a.href="#";
															img.id="img";
															img.src = imageDecoded;
															img.width="300";
															img.height="200";
															a.appendChild(img);
															
															document.getElementById("showPhoto").appendChild(a);
														
							
																return;
														    }
														});
														
													
													
													
													},function(errResponse){
														console.error('Error while get pk client...');

													});
										},
										function(errResponse){
											console.error('Error while get download...');

										});	  
							},
							function(errResponse){
								console.error('Error while get pkRMS...');

							});	  					
				},
				function(errResponse){
					console.error('Error while search photo...');

				});
					}},function(errResponse){
						console.error('Error while check Session...');
					});	

	},


	self.readIDSessionUser=function(){
		var url = window.location.pathname.split('/');

		return url[3];
	},

	self.readIDSearchedUser=function(){
		var url = window.location.pathname.split('/');

		return url[4];

	}



}]);

App.directive('fileModel', ['$parse', function ($parse) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};

}]);
