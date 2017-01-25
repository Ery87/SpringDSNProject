'use strict';

App.controller('LoginController',['$scope','$window','LoginService',function($scope,$window,LoginService){
	var self=this;
	self.user={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:'',pw:''};
	var message;

	   var url='http://193.206.170.142/OSN';
	   //   var url='http://localhost:8080/OSN';



	//LOGIN USER 
	self.login=function(user){
		var u={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:'',pw:''};
		u.email=self.user.email;
		u.pw=self.user.pw;

		LoginService.login(u)
		.then(
				function(d){
					var id=d.id;

					if(bcrypt.compareSync(u.pw,d.pw)){
						LoginService.loginGet(u.email)
						.then(
								function(data){
									$window.location.href=url+'/profile/'+d.id+'?'+d.lastname+d.firstname;

								},

								function(errResponse){
									console.error("error while login get");
								});


					}else {
						self.message='Error username or password, please repeat';
					}
				},
				function(errResponse){
					self.message='Error username or password, please repeat';

				});
	};




	self.reset=function(){
		self.user.email='';
		self.user.pw='';
		$scope.myForm.$setPristine(); //reset Form
	};


	self.submit=function(){
		self.login(self.user);
		self.reset();
	};



}]);