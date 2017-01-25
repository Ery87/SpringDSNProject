'use strict';

App.controller('ProfileController',['$scope','$window','ProfileService',function($scope,$window,ProfileService){
	var self=this;
	self.user={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:new FormData(),pw:''};
	var id=null;
	var image;
	var users;
	var title;
	var message;
	var tagImage;
	var metaTag;
	 var url='http://193.206.170.142/OSN';
	 //	var url='http://localhost:8080/OSN';


	angular.element(document).ready(function () {
		$(".btn-slide").click(function(){
			$("#panel").slideToggle("slow");
			$(this).toggleClass("active"); return false;
		});


	});    


	//UPLOAD PHOTO
	self.uploadPhotoRule=function(){
		console.log("entro");
		ProfileService.checkSession(Lockr.get("id")) 
		.then(
				function(data){
					if(data.session=0){
						$window.location.href=url;
					}else{
				
		
		document.getElementById('upload').disabled =true;
		var tag=$scope.ctrl.tag;
		var passPhrase=$scope.ctrl.passPhrase;
		Lockr.set('passPhrase',passPhrase);
		var rule=$scope.ctrl.rule;
		Lockr.set("rule",rule);
		var album={"tag":tag,"id":Lockr.get("id"),"fileName":Lockr.get("fileName")};

		ProfileService.saveAlbum(album)
		.then(
				function(data){
					//1:CS->RMS	
					
					Lockr.set("idResource",data.idAlbum);
					var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
					var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
					Lockr.set("iv1",iv);
					Lockr.set('salt1',salt);

					var n2=Math.floor(Math.random()*100+1);
					
					var msgKms={"idu":Lockr.get("id"),"idR":Lockr.get("idResource"),"n2":n2,'session_token':self.user.session};
					

					ProfileService.getPK('KMS')
					.then(	
							function(data){
								Lockr.set('modulus_KMS',data.modulus);
								Lockr.set('exponent_KMS',data.exponent);

								msgKms=JSON.stringify(msgKms);

								var rsa=new RSAKey();
								var mKMS=Lockr.get('modulus_KMS');
								var eKMS=Lockr.get('exponent_KMS')

								rsa.setPublic(mKMS,eKMS);

								var msgKMSEncrypted=rsa.encrypt(msgKms);
								ProfileService.getPK('RMS')
								.then(
										function(data){

											Lockr.set('modulus_RMS',data.modulus);
											Lockr.set('exponent_RMS',data.exponent);

											var n1=Math.floor(Math.random()*100+1);
											var msgRMS={"idu":Lockr.get("id"),"n1":n1,"idR":Lockr.get("idResource"),"msgKMS":msgKMSEncrypted,'session_token':self.user.session};
											msgRMS=JSON.stringify(msgRMS);
											var aes=new AesUtil(128,1000);
											var encryptmsgRMS=aes.encrypt(salt,iv,passPhrase,msgRMS);
											
											var paramRMS={"salt":salt,"iv":iv,"passPhrase":passPhrase};
											paramRMS=JSON.stringify(paramRMS);
											rsa.setPublic(Lockr.get('modulus_RMS'),Lockr.get('exponent_RMS'));
											paramRMS=rsa.encrypt(paramRMS);
											
											
											var message={'paramRMS':paramRMS,'encryptmsgRMS':encryptmsgRMS};
											message=JSON.stringify(message);


											ProfileService.uploadReq1(message)
											.then(
													function(data){

														var key=data.AESParams;
														var encrypted_msg_client=data.encrypted_msg_client;

														ProfileService.getPKClient(Lockr.get("id"))
														.then(
																function(data){
																	
																	var rsa=new RSAKey();

																	var keySize = 128;
																	var iterationCount = 1000;
																	var aesUtil=new AesUtil(keySize,iterationCount);

																	var keyPrivate=aesUtil.decrypt(data.salt,data.iv,Lockr.get('passPhrase'),data.private_key);
																	keyPrivate=keyPrivate.toString(CryptoJS.enc.utf8);
																	rsa.setPrivate(data.modulus_public,data.exponent_public, keyPrivate); //recupera parametri della chiave del client
																	
																	key=rsa.decrypt(key);
																	key=JSON.parse(key);

																	var iv=key.iv;
																	var salt=key.salt;
																	var passphrase=key.passphrase;

																	var aesUtil = new AesUtil(128, 1000);

																	var decrypted_msg=aesUtil.decrypt(salt, iv, passphrase, encrypted_msg_client);
																	decrypted_msg=JSON.parse(decrypted_msg);
																	
																	var secret_user=decrypted_msg.secretUser;
																	var nonce_plus_one=decrypted_msg.nonce_one_plus_one;
																	var kms_msg=decrypted_msg.KMSmsg;

																	
																	var rsa=new RSAKey();
																	rsa.setPrivate(data.modulus_public,data.exponent_public, keyPrivate);
																	kms_msg=rsa.decrypt(decrypted_msg.KMSmsg);
																	kms_msg=JSON.parse(kms_msg);
																	var passSecret=secret_user+kms_msg.secretRsc;

																	//Encryption photo
																	var aesUtil = new AesUtil(128, 1000);
																	var photoEnc=Lockr.get("photo");

																	var encryptedPhoto=aesUtil.encrypt(secret_user,kms_msg.secretRsc,passSecret,  photoEnc);


																	//Msg to KMS

																	var msgKMS={"id":Lockr.get("id"),"idResource":Lockr.get("idResource"),"n2_2":(kms_msg.nonce_two_plus_one+1),"encryptedPhoto":encryptedPhoto};
																
																	var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var aesUtil = new AesUtil(128, 1000);

																	var msgKMSEncrypt=aesUtil.encrypt(salt,iv,Lockr.get("passPhrase"),JSON.stringify(msgKMS));

																	var keyKMS={"iv":iv,"salt":salt,"passPhrase":Lockr.get("passPhrase")};
																	var rsa=new RSAKey();
																	rsa.setPublic(Lockr.get('modulus_KMS'),Lockr.get('exponent_KMS'));
																	var keyKMSencrypt=rsa.encrypt(JSON.stringify(keyKMS));
																	
																	var messageToKMS={"keyKMSencrypt":keyKMSencrypt,"msgKMSEncrypt":msgKMSEncrypt};

																	var msgRMS={"id":Lockr.get("id"),"N1_2":(nonce_plus_one+1),"idResource":Lockr.get("idResource"),"rule":Lockr.get("rule"),"messageToKMS":JSON.stringify(messageToKMS)};
																
																	var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var aesUtil = new AesUtil(128, 1000);
																	msgRMS=aesUtil.encrypt(salt,iv,Lockr.get("passPhrase"),JSON.stringify(msgRMS));
																	var keyRMS={"iv":iv,"salt":salt,"passPhrase":Lockr.get("passPhrase")};

																	var rsa=new RSAKey();
																	rsa.setPublic(Lockr.get('modulus_RMS'),Lockr.get('exponent_RMS'));
																	var keyRMSencrypt=rsa.encrypt(JSON.stringify(keyRMS));
																	
																	var messageToRMS={"keyRMSencrypt":keyRMSencrypt,"msgRMS":msgRMS};
																	messageToRMS=JSON.stringify(messageToRMS);
																	ProfileService.uploadReq2(messageToRMS)
																	.then(
																			function(data){
																				$window.alert("Upload successfully executed!");
																				$window.location.reload(false); 
																			},function(errResponse){
																				console.error('Error while upload request two.');
																			});


																},
																function(errResponse){
																	console.error('Error while creating User.');
																});
													},
													function(errResponse){
														window.alert("File already exists!");
														document.getElementById('upload').disabled =false;

													});
										},
										function(errResponse){
											console.error('Error while creating User.');
										});
							},
							function(errResponse){
								console.error('Error while creating User.');
							});
				},
				function(errResponse){
					console.error('Error while creating User.');
				});
					}},function(errResponse){
						console.error('Error while check Session...');
					});	
	},	


	//SEARCH USER
	self.searchFriend=function(){ 
		self.title='';
		self.users='';
		self.message='';
		var search=self.friend;
		var id=self.readID();
		ProfileService.searchFriend(id,search)
		.then(
				function(response){

					self.title="List of users:"
						self.users=response.data;
					self.id=id;

				},
				function(errResponse){
					self.message='Not found user';

				});
	},



	
	self.reset=function(){
		self.friend='';
		self.title='';
		self.users='';
		self.message='';

	};

	self.generateKeys = function () {
		var sKeySize =1024;
		var keySize = parseInt(sKeySize);
		var crypt = new JSEncrypt({ default_key_size: keySize });
		var async = null;
		var keyprivate;
		var keypublic;
		var dt = new Date();
		var time = -(dt.getTime());
		if (async) {
			$('#time-report').text('.');
			var load = setInterval(function () {
				var text = $('#time-report').text();
				$('#time-report').text(text + '.');
			}, 500);
			crypt.getKey(function () {
				clearInterval(load);

				keyprivate=crypt.getPrivateKey();
				keypublic=crypt.getPublicKey();
			});
			return;
		}
		crypt.getKey();

		keyprivate=crypt.getPrivateKey();
		keypublic=crypt.getPublicKey();
		return(keypublic)
	};


	self.readID=function(){
		var url = window.location.pathname;
		var id_utente = url.substring(url.lastIndexOf('/') + 1);
		return id_utente;
	}

	
	$window.onload=function (){

		var id_utente=self.readID();	
		Lockr.set("id",id_utente);

		ProfileService.getUser(Lockr.get("id"))
		.then(
				function(data){

					if(data.session==0){

						$window.location.href=url;
					}else{

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
					}	

				},
				
				function(errResponse){

					console.error('Error while getUser...');

				});



	},


	self.getAlbum=function(){

		ProfileService.getAlbum(Lockr.get("id"))
		.then(
				function(response){

					self.metaTag=response.data;
					var ul=document.createElement("ul");
					for(var j=0;j<Object.keys(self.metaTag).length;j++){
						var li=document.createElement("li");
						var a=document.createElement("a");
						var h=document.createElement("h4");
						a.href="";
						var fileName=self.metaTag[j].fileName;
						a.setAttribute("ng-click","ctrl.download('"+fileName+"')");
						var text = document.createTextNode(self.metaTag[j].metaTag);
						h.appendChild(text);
						a.appendChild(h);
						li.appendChild(a);
						ul.appendChild(li);
					}
					document.getElementById("gallery").appendChild(ul);
					
					/*
					var myTable=document.createElement("table");
					var tblBody = document.createElement("tbody");
					var i=0;
					var row = document.createElement("tr");
					for(var j=0;j<Object.keys(self.metaTag).length;j++){
						if(i>=7){
							i=0;
							row=document.createElement("tr");
						}
						var cell = document.createElement("td");
						var pImage=document.createElement("p");
						var pMeta=document.createElement("p");
						pMeta.setAttribute("align","center");
						cell.setAttribute("class","cambioimmagine");
						var a=document.createElement("a");
						a.href="";

						var fileName=self.metaTag[j].fileName;

						a.setAttribute("ng-click","ctrl.download('"+fileName+"')");

						var img=document.createElement("img");
						img.setAttribute("id",fileName);
						img.src="/OSN/static/css/images/img3.jpg";
						img.width="120";
						img.height="120";
						pImage.appendChild(img)
						cell.appendChild(pImage);

						var text = document.createTextNode(self.metaTag[j].metaTag);
						a.appendChild(text);

						i++;
						pMeta.appendChild(a);
						cell.appendChild(pMeta);
						tblBody.appendChild(cell);
						tblBody.appendChild(row);


					}
					myTable.appendChild(tblBody);
				
					document.getElementById("gallery").appendChild(myTable);
						*/
					self.compile(document.getElementById("gallery"));
					self.addFriendRequest();
				},
				function(errResponse){
					console.error('Error while getUser...');

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

	//SHOW FRIENDSHIP REQUEST
	self.addFriendRequest=function(){
		ProfileService.getFriendRequest(Lockr.get("id"))
		.then(
				function(data){
					console.log(data);
					if(data.length!=0){
						var myTable=document.createElement("TABLE");
						myTable.setAttribute("class","table table-hover");
						var tblBody = document.createElement("tbody");
						for(var i=0;i<data.length;i++){

							var tr=document.createElement("tr");

							var td_FirstName=document.createElement("td");
							var firstName_text = document.createTextNode(data[i].firstName);
							td_FirstName.appendChild(firstName_text);
							tr.appendChild(td_FirstName);

							var td_lastName=document.createElement("td");
							var lastName_text=document.createTextNode(data[i].lastName);
							td_lastName.appendChild(lastName_text);
							tr.appendChild(td_lastName);

							var td_butt=document.createElement("td");
							var a=document.createElement("a");
							a.href="";	
							a.setAttribute("ng-click","ctrl.addUser('"+data[i].id+"')");
							var button=document.createElement("button");
							var text_button=document.createTextNode("accept the request");
							button.appendChild(text_button);
							a.appendChild(button);
							td_butt.appendChild(a);
							tr.appendChild(td_butt);

							var td_refuse=document.createElement("td");
							var a_refuse=document.createElement("a");
							a_refuse.href="";
							a_refuse.setAttribute("ng-click","ctrl.refuseFriend('"+data[i].id+"')");
							var button_refuse=document.createElement("button");
							var text_refuse=document.createTextNode("refuse");
							button_refuse.appendChild(text_refuse);
							a_refuse.appendChild(button_refuse);
							td_refuse.appendChild(a_refuse);
							tr.appendChild(td_refuse);

							td_butt.appendChild(a);
							tr.appendChild(td_butt);
							tblBody.appendChild(tr);

						}
						myTable.appendChild(tblBody);
						document.getElementById("panel").appendChild(myTable);
						self.compile(document.getElementById("panel"));

					}else{
						var h2=document.createElement("h2");
						var text=document.createTextNode("There are not friendship request....");
						h2.appendChild(text);
						document.getElementById("panel").appendChild(h2);

					}

				},function(errResponse){
					console.error('error while notification...');
				});
	},
	
	//REQUEST REFUSAL OF FRIENDSHIP
	self.refuseFriend=function(id){
		ProfileService.checkSession(Lockr.get("id")) 
		.then(
				function(data){
					if(data.session=0){
						$window.location.href=url;
					}else{
	
		var id_acceptor=Lockr.get("id");

		ProfileService.deletePending(id_acceptor,id)
		.then(
				function(data){
					$window.location.reload(false); 
				},function(errResponse){
					console.error('error while delete pending...');
				});
					}},function(errResponse){
						console.error('Error while check Session...');
					});	

	},

	//ACCEPT FRIENDSHIP REQUEST
	self.addUser=function(id){
		ProfileService.checkSession(Lockr.get("id")) 
		.then(
				function(data){
					if(data.session=0){
						$window.location.href=url;
					}else{
	
		var id_acceptor=Lockr.get("id");

		ProfileService.deletePending(id_acceptor,id)
		.then(
				function(data){

					ProfileService.getFriendshipRequestor(id)
					.then(
							function(data){

								var nameRequestor=data.firstname;
								var surnameRequestor=data.lastname;
								var emailRequestor=data.email;

								var messagetoPFS={"idRequestor":id,"idOwner":id_acceptor,"emailRequestor":emailRequestor,"nameRequestor":nameRequestor,"surnameRequestor":surnameRequestor,"nameSearched":self.user.firstname,"surnameSearched":self.user.lastname};
								console.log(messagetoPFS);
								messagetoPFS=JSON.stringify(messagetoPFS);

								ProfileService.getPK('PFS') 
								.then(
										function (data){
											var PFS_modulus=data.modulus;
											var PFS_exponent=data.exponent;
											var rsa=new RSAKey();

											rsa.setPublic(PFS_modulus,PFS_exponent);
											var messageEncrypttoPFS=rsa.encrypt(messagetoPFS);
											ProfileService.friendshipCreation(messageEncrypttoPFS)
											.then(
													function(data){
													
														$window.location.reload(false); 


													},function(errResponse){
														console.error('error while inviate request to PFS...');
													});



										},function(errResponse){
											console.error('error while get PK...');
										});

							},function(errResponse){
								console.error('error while get user...');
							});
				},function(errResponse){
					console.error('error while delete pending...');
				});
					}},function(errResponse){
						console.error('Error while check Session...');
					});
	},

	// SHOW YOUR ALBUM
	self.download=function(filename){
	var image= document.getElementById('img');
		image.parentNode.removeChild(image);
		ProfileService.checkSession(Lockr.get("id")) 
		.then(
				function(data){
					if(data.session=0){
						$window.location.href=url;
					}else{
		
		ProfileService.getUserViewPhoto(Lockr.get("id"),filename)
		.then(
				function(data){

					var idPhoto=data.data.idPhoto;

					ProfileService.getPK('RMS')
					.then(
							function(data){
								Lockr.set('modulus_RMS',data.modulus);
								Lockr.set('exponent_RMS',data.exponent);
								var n1=Math.floor(Math.random()*100+1);
								var msgRMS={"idRequestor":Lockr.get('id'),'idResource':idPhoto,'N1':n1};

								msgRMS=JSON.stringify(msgRMS);
								var rsa=new RSAKey();
								rsa.setPublic(Lockr.get('modulus_RMS'),Lockr.get('exponent_RMS'));
								msgRMS=rsa.encrypt(msgRMS);

								ProfileService.getDownload(msgRMS)
								.then(
										function(data){


											var AESParams=data.data.AESParams;
											var encrypted_msg_client=data.data.encrypted_msg_client;

											ProfileService.getPKClient(Lockr.get("id"))
											.then(
													function(data){


														var salt=data.salt;
														var iv=data.iv;
														var passPhrase="";
														bootbox.prompt({
														    title: "Enter your Passphrase (needed to decrypt resources)!",
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
																	img.id="img";
																	img.src = imageDecoded;
																	img.width="300";
																	img.height="200";
																	document.getElementById("showPhoto").appendChild(img);
																	return;
									
																
																}catch(e){
																	$window.alert("You don't have permission to access the requested object!");
																	$window.location.reload(false); 
																}
															
															
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
	
	
	
	
	
	//CLICK TO SEARCH USER AND REDIRECT TO NEW PAGE
	self.redirectSearch=function(){
		console.log(Lockr.get("id"))
		$window.location.href=url+'/searchFriend/'+Lockr.get("id");
	},



	//LOGOUT DELETE SESSION
	self.logout=function(){

		Lockr.flush();
		var id=self.readID();

		ProfileService.logout(id)
		.then(
				function(data){						
					$window.location.href=url;

				},function(errResponse){
					console.error('Error while logout...');

				});
	},

	self.submit=function(){
		self.reset();
		self.redirectSearch();

	},


	self.reset=function(){
		self.users='';

		self.tagImage='';
	};



	var handleFileSelect = function(evt) {

		var files = evt.target.files;
		var file = files[0];
		var str=file.name;
		str = str.replace(/\s+/g, '');
		Lockr.set("fileName",str);

		if (files && file) {
			var reader = new FileReader();

			reader.onload = function(readerEvt) {
				var binaryString = readerEvt.target.result;
				var b=btoa(binaryString);
				
				Lockr.set("photo",b);

			};

			reader.readAsBinaryString(file);
		}
	};





	if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
		document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);

	} else {

		alert('The File APIs are not fully supported in this browser.');

	}







}]);

App.directive('fileModel',['$parse',function($parse){

	return{
		restrict:'A',
		link: function(scope,element,attrs){
			var model=$parse(attrs.fileModel);
			var modelSetter=model.assign;

			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				});
			});
		}
	};
}]);