'use strict';

App.controller('GenerateController',['$scope','$window','UserService',function($scope,$window,UserService){
	var self=this;
	var id;
	 	var url='http://193.206.170.142/OSN';
	 	//	var url='http://localhost:8080/OSN';




	//READ USER ID FROM URL
	self.readID=function(){
		var url = window.location.pathname;
		var id_u = url.substring(url.lastIndexOf('/') + 1);

		return id_u;
	}

	// CHECK THAT YOU ARE LOGGED
	$window.onload=function(){
		self.id=self.readID();
		UserService.checkSession(self.id)
		.then(
				function(data){
					if(data.session==0){
						$window.location.href=url
					}

				},function(errResponse){
					console.error('Error while check session....');
				});

	},

	//RESET FORM
	self.reset=function(){
		$scope.myForm.$setPristine(); 

	}

	//GENERATE PRIVATE KEY USER
	self.generateKey=function(){
		document.getElementById('generateKey').disabled =true;

		var passphrase=$scope.user.password;
		var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		var keySize = 128;
		var iterationCount = 1000;
		var aesUtil=new AesUtil(keySize,iterationCount);
		var idUser=self.readID();
		var message={"iduser":idUser,"iv":iv,"salt":salt,"keySize":keySize,"iterationCount":iterationCount,"passPhrase":passphrase};
		var jsontoStringMessaggio=JSON.stringify(message);


		UserService.getPK('KMS') 
		.then(
				function(data){

					Lockr.set('KMS.service',data.service);   
					Lockr.set('KMS.modulus',data.modulus);   
					Lockr.set('KMS.exponent',data.exponent);      

					UserService.getPK('RMS')

					.then(
							function(data){
								Lockr.set('RMS.service',data.service);   
								Lockr.set('RMS.modulus',data.modulus);   
								Lockr.set('RMS.exponent',data.exponent);      

								var PK_kms=new RSAKey(); 
								PK_kms.setPublic(Lockr.get('KMS.modulus'),Lockr.get('KMS.exponent'));
								var messageCripted=PK_kms.encrypt(jsontoStringMessaggio);

								var msgtoRMS={"idu": idUser, "encryptedmsgtoKMS": messageCripted};			
								var msgtoRMS=JSON.stringify(msgtoRMS); 


								UserService.clientKeys(msgtoRMS)
								.then(
										function(data){

											var decrypt=aesUtil.decrypt(salt,iv,passphrase,data);
											var jsondecrypt=JSON.parse(decrypt);

											var client_exponent=jsondecrypt.client_public_exponent;
											var client_modulus=jsondecrypt.client_modulus;
											var client_private=jsondecrypt.client_private_exponent;
											var client_privateCrypted=aesUtil.encrypt(salt,iv,passphrase,client_private);

											var keys={"id":self.id,"exponent":client_exponent,"modulus":client_modulus,"private":client_privateCrypted,"salt":salt,"iv":iv};

											UserService.savePKClient(keys)
											.then(
													function(data){
														var clientPubKeyToRMS={"client_pub_exp": client_exponent, "client_mod": client_modulus, "idu": idUser};
														clientPubKeyToRMS=JSON.stringify(clientPubKeyToRMS);
														var iv2=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
														var salt2=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
														var x=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);;
														clientPubKeyToRMS=aesUtil.encrypt(salt2, iv2, x, clientPubKeyToRMS);
														var rsa=new RSAKey();
														rsa.setPublic(Lockr.get('RMS.modulus'),Lockr.get('RMS.exponent'));
														var symmKey={
																"iv": iv2,
																"salt": salt2,
																"keySize": keySize,
																"iterationCount": iterationCount,
																"passPhrase": x,							
														}
														symmKey=JSON.stringify(symmKey);
														var encrypted_symmKey=rsa.encrypt(symmKey);
														var encrypted_clientPubKeyToRMS={"clientPubKeyToRMS": clientPubKeyToRMS, "encrypted_symmKey": encrypted_symmKey };
														encrypted_clientPubKeyToRMS=JSON.stringify(encrypted_clientPubKeyToRMS); 

														UserService.createSocialUser2(encrypted_clientPubKeyToRMS)
														.then(
																function(data){

																	UserService.PFSInsertionUser(self.id)
																	.then(
																			function(data){

																				$window.location.href=url;
																			},function(errResponse){
																				console.error('Error while inviate key client to OSN');
																			});
																},function(errResponse){
																	console.error('Error while inviate key client to OSN');
																});


													},function(errResponse){
														console.error('Error while inviate key client to OSN');
													});

										},function (errResponse){
											console.error('Error while inviate pkIRMS');
										});

							},function (errResponse){
								console.error('Error while inviate pkIRMS');
							});


				},function (errResponse){
					console.error('Error while inviate pkIRMS');
				});


	}






}]);

App.directive("passwordVerify", function() {
	return {
		require: "ngModel",
		scope: {
			passwordVerify: '='
		},
		link: function(scope, element, attrs, ctrl) {
			scope.$watch(function() {
				var combined;

				if (scope.passwordVerify || ctrl.$viewValue) {
					combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
				}                    
				return combined;
			}, function(value) {
				if (value) {
					ctrl.$parsers.unshift(function(viewValue) {
						var origin = scope.passwordVerify;
						if (origin !== viewValue) {
							ctrl.$setValidity("passwordVerify", false);
							return undefined;
						} else {
							ctrl.$setValidity("passwordVerify", true);
							return viewValue;
						}
					});
				}
			});
		}
	};
});


