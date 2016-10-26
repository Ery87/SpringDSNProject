'user strict';
App.controller('UserController',['UserService','$window','$scope',function (UserService,$window,$scope){
	var self=this;
	self.user={id:null,birth_day:'',city:'',email:'',firstName:'',lastName:'',photo:null,pw:''};
   	  var url='http://193.206.170.142/OSN';
	    var message='';    
	    //  var url='http://localhost:8080/OSN';




	//CREATE NEW USER
	self.createUser=function(){
		var utente=$scope.ctrl.user;
		var salt=bcrypt.genSaltSync(10);
		var hash=bcrypt.hashSync(utente.pw,salt)
		utente.pw=hash;
		UserService.saveUser(utente)
		.then(
				function(d){
					self.user=d;

					UserService.loginGet(self.user.email)
					.then(
							function(data){

								$window.location.href=url+'/uploadPhoto/'+self.user.id;
							},

							function(errResponse){
								console.error('Error while login get.');

							});
				},
				function(errResponse){
					alert("user already exists")
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
