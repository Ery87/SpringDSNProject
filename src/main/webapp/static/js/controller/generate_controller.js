'use strict';

App.controller('GenerateController',['$scope','$window','UserService',function($scope,$window,UserService){
	var self=this;
     var id;
     var KMS={service:'',modulus:'',exponent:''};
     var RMS={service:'',modulus:'',exponent:''};
  // var url='http://193.206.170.142/OSN';
     var url='http://localhost:8080/OSN';
  
     
   

   
   self.readID=function(){
       var url = window.location.pathname;
       var id_u = url.substring(url.lastIndexOf('/') + 1);
       
       return id_u;
       }
    
   
   $window.onload=function(){
	   $scope.id=self.readID();
	   
   }
   
   self.reset=function(){
       $scope.myForm.$setPristine(); //reset Form

   }

	self.generateKey=function(){
		var passphrase=$scope.ctrl.Passphrase;
		var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
   	 	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
   	 	var keySize = 128;
   	 	var iterationCount = 1000;
   		var aesUtil=new AesUtil(keySize,iterationCount);
   		var idUser=self.readID();
				var message={"iduser":idUser,"iv":iv,"salt":salt,"keySize":keySize,"iterationCount":iterationCount,"passPhrase":passphrase};
				var jsontoStringMessaggio=JSON.stringify(message);
				
				 var KMS={service:'',modulus:'',exponent:''};
				  UserService.getPK('KMS') //MODIFICARE
				   .then(
						   function(data){
							
								   KMS.service=data.service;
								   
								   KMS.modulus=data.modulus;
								   KMS.exponent=data.exponent;
								   UserService.getPK('RMS')
									   
								   .then(
										   function(data){
											   RMS.service=data.service;
											   RMS.exponent=data.exponent;
											   RMS.modulus=data.modulus;
								
							
							  
				
				
				var PK_kms=new RSAKey(); //public key kms
				
				PK_kms.setPublic(KMS.modulus,KMS.exponent);
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
														var keys={"id":$scope.id,"exponent":client_exponent,"modulus":client_modulus,"private":client_privateCrypted};
														
														UserService.savePKClient(keys)
														.then(
																function(data){
																	var clientPubKeyToRMS={"client_pub_exp": client_exponent, "client_mod": client_modulus, "idu": idUser};
																	clientPubKeyToRMS=JSON.stringify(clientPubKeyToRMS);
																	
																	var iv2=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var salt2=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	var x=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
																	
																	clientPubKeyToRMS=aesUtil.encrypt(salt2, iv2, x, clientPubKeyToRMS);
																	var rsa=new RSAKey();
																	rsa.setPublic(RMS.modulus,RMS.exponent);
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
																	console.log(encrypted_clientPubKeyToRMS);
																	var exp="194b5271a5c9759d021ad7bde31d44716ebb66f25284125660878c839c332faec7de20742399d99a5cbd4f7b581f16f68222159f78ceda1af4b94062cc2f001fbc605209960a56dc575bc8f28ad2c5d07d5fa59348233e4e5b93d1929c055a84915e6a4599ca96600759baf14d9e45059d6abf2aa0d2fb73c6dd9c71e4aa1dce6391835b15359c438426b9e14d8aa49426ab1be8597dd057dbd56f75c04f46f46e74af0e49993ca00c1a6c510a53bfa177a5d438fb46ce00031c2f503e3f3d6e3aedf2ab6a7a45996a4b5a4f8f40b6832f1033628f87d388463fb4cf351519c664bcfa3d55f0ebf7e831ee3b21e4feaf5a0eeb5e54faf7d81ddb130f885a4cbd";
																	
																	rsa.setPrivate(RMS.modulus,RMS.exponent,exp);
																	
																	var prova=rsa.decrypt(encrypted_symmKey);
																	prova=JSON.parse(prova);
																	console.log(prova)
																	
																	UserService.createSocialUser2(encrypted_clientPubKeyToRMS)
																	.then(
																			function(data){
																				console.log("ok");
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
