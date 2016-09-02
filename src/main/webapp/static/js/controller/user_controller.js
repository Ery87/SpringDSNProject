'user strict';
App.controller('UserController',['UserService','$window','$scope',function (UserService,$window,$scope){
		var self=this;
         self.user={id:null,birth_day:'',city:'',email:'',firstName:'',lastName:'',photo:null,pw:''};
         var message='';    
            var url='http://193.206.170.142/OSN';
            //   var url='http://localhost:8080/OSN';
         
         
         
        
         
         
       self.createUser=function(){
    	   	var utente=$scope.ctrl.user;
    	    var key = CryptoJS.enc.Base64.parse("MTIzNDU2NzgxMjM0NTY3OA==");
    	    var iv  = CryptoJS.enc.Base64.parse("EBESExQVFhcYGRobHB0eHw==");
    	    var encrypted = CryptoJS.AES.encrypt(utente.pw, key, {iv: iv});
    	    utente.pw=encrypted.toString();
            UserService.saveUser(utente)
		              .then(
		            		  function(d){
		            			  self.id=d.id;
		       
		            			 
		      		            			$window.location.href=url+'/uploadPhoto/'+self.id;
 
		            					 },

				              function(errResponse){
					               console.error('Error while creating User.');

				              }	
                 );
         };

        
         self.reset=function(){
             self.user={id:null,birth_day:'',city:'',email:'',firstName:'',lastName:'',photo:null,pw:''};

             $scope.myForm.$setPristine(); //reset Form
         };

         self.submit=function(){
			$scope.createUser();
			$scope.reset();
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
