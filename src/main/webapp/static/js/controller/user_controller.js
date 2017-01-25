'user strict';
App.controller('UserController',['UserService','$window','$scope',function (UserService,$window,$scope){
	var self=this;
	self.user={id:null,birth_day:'',city:'',email:'',firstName:'',lastName:'',photo:null,pw:''};
	var url='http://193.206.170.142/OSN';
	    var message='';    
	    //      	  var url='http://localhost:8080/OSN';




	//CREATE NEW USER
	self.createUser=function(){
		var date=$scope.ctrl.year+"/"+$scope.ctrl.months+"/"+$scope.ctrl.day;
		self.user.birth_day=date;
		self.user.photo=Lockr.get("photo");
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

								$window.location.href=url+'/generateKey/'+self.user.id;
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
