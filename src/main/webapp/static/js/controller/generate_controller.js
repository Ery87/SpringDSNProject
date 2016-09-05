'use strict';

App.controller('GenerateController',['$scope','$window','UserService',function($scope,$window,UserService){
	var self=this;
     var id;
     var KMS={service:'',modulus:'',exponent:''};
     var RMS={service:'',modulus:'',exponent:''};
    var url='http://193.206.170.142/OSN';
    //    var url='http://localhost:8080/OSN';
  
     
   

   
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
   								
				var message={"iv":iv,"salt":salt,"keySize":keySize,"iterationCount":iterationCount,"passPhrase":passphrase};
				var jsontoStringMessaggio=JSON.stringify(message);
				 var KMS={service:'',modulus:'',exponent:''};
				  UserService.getPK_KMS("KMS")
				   .then(
						   function(data){
							
								   KMS.service=data.service;
								   
								   KMS.modulus=data.modulus;
								   KMS.exponent=data.exponent;
								   
							
							  
				
				
				var PK_kms=new RSAKey(); //public key kms
				console.log(KMS.modulus);
				PK_kms.setPublic(KMS.modulus,KMS.exponent);
				var messageCripted=PK_kms.encrypt(jsontoStringMessaggio);
				UserService.clientKeys(messageCripted)
										.then(
												function(data){
															
														var decrypt=aesUtil.decrypt(salt,iv,passphrase,data);
														var jsondecrypt=JSON.parse(decrypt);
														console.log(jsondecrypt);
														},function (errResponse){
															console.error('Error while inviate pkIRMS');
														});
									   	 	
				   	 	
				   	 	
						   },function (errResponse){
								console.error('Error while inviate pkIRMS');
							});
					 	
								
					}
					
   	 	
   	 	
   	 	
   	 	
	/*	UserService.savePKClient(keyPublic) //salvo la PKClient nel db
			.then(
					function(data){
					
							},function(errResponse){
							console.error('Error while search PKIRMS ');
						});
					},
					function(errResponse){
						console.error('Error while search PKIRMS on Server ');
					});
						
					};*/
		
	



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
