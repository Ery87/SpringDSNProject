'use strict';

App.factory('LoginService',['$http','$q',function($http,$q){
		
	
	return{
		getUser:function(email){
			return $http.post('http://localhost:8080/Spring4MVCAngularJSExample/profile/',email)
			.then(
					function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while search user');
				return $q.reject(errResponse);
			});
		},
			
		    login:function(user){
				return $http.post('http://localhost:8080/Spring4MVCAngularJSExample/login/',user)
				
				.then(
						function(response){
							return response.data;
						},
						function(errResponse){
							console.error('Error while creating user');
							return $q.reject(errResponse);
						});
		    },
		    updateUser: function(user, id){
				return $http.put('http://localhost:8080/Spring4MVCAngularJSExample/user/'+id, user)
						.then(
								function(response){
									return response.data;
								}, 
								function(errResponse){
									console.error('Error while updating user');
									return $q.reject(errResponse);
								}
						);
		},
	    
		deleteUser: function(id){
				return $http.del('http://localhost:8080/Spring4MVCAngularJSExample/user/'+id)
						.then(
								function(response){
									return response.data;
								}, 
								function(errResponse){
									console.error('Error while deleting user');
									return $q.reject(errResponse);
								}
						);
		}
	
};
	}



]);


