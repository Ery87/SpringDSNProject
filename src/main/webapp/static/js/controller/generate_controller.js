'use strict';

App.controller('GenerateController',['$scope','$window','UserService',function($scope,$window,UserService){
	var self=this;
     var id;
     var url='http://193.206.170.142/OSN';
     //var url='http://localhost:8080/OSN';
   
   function readID(){
       var url = window.location.pathname;
       var id_u = url.substring(url.lastIndexOf('/') + 1);
       return id_u;
       }
    
   
   $window.onload=function(){
	   id=readID();
	   
   }
   
   self.reset=function(){
       $scope.myForm.$setPristine(); //reset Form

   }

	self.generateKey=function(){
		var Passphrase=$scope.ctrl.Passphrase;
		var bits=1024;
		var clientRSAKey=cryptico.generateRSAKey(Passphrase,bits);
		var clientPublicKey=cryptico.publicKeyString(clientRSAKey);
		
		var keyPublic={"id":id,"key":clientPublicKey};
			
		UserService.savePKClient(keyPublic) //salvo la PKClient nel db
			.then(
					function(data){
						UserService.getPKRMS()
						.then(
								function(data){
									
									var modulo=data.modulo;
									var esponente=data.esponente;
									
									var message={"id":id,"key":clientPublicKey};
									var jsontoStringMessaggio=JSON.stringify(message);
									var rsa=new RSAKey();
									rsa.setPublic(modulo,esponente);
									var messaggioCifrato=rsa.encrypt(jsontoStringMessaggio);
								UserService.sendPKClient(messaggioCifrato)
							.then(
									function(data){
										console.log("ok");//key inviata correttamente
									},function (errResponse){
										console.error('Error while inviate pkIRMS');
									});
							},function(errResponse){
							console.error('Error while search PKIRMS ');
						});
					},
					function(errResponse){
						console.error('Error while search PKIRMS on Server ');
					});
						
					};
		
	



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
