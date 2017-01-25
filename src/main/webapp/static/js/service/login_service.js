'use strict';
//SERVICE WEB PAGE LOGIN

App.factory('LoginService',['$http','$q',function($http,$q){
		  var path='http://193.206.170.142/OSN';
		  //   var path='http://localhost:8080/OSN';

	return{

		loginGet:function(email){
			return $http.post(path+'/loginGet/',email)
			.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error while login');
						return $q.reject(errResponse);
					});
		},

		login:function(user){
			return $http.post(path+'/login/',user)

			.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error while login');
						return $q.reject(errResponse);
					});
		},

	};
}



]);


