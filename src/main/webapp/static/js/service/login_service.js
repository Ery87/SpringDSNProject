'use strict';

App.factory('LoginService',['$http','$q',function($http,$q){
 var path='http://193.206.170.142/OSN';
	//	  var path='http://localhost:8080/OSN';

	return{
		
	
			
		    login:function(user){
				return $http.post(path+'/login/',user)
				
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
				return $http.put(path+'/user/'+id, user)
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
				return $http.del(path+'/user/'+id)
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


