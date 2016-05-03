'use strict';

App.factory('ProfileService',['$http','$q',function($http,$q){
		
	
	return{
		getUser:function(id){
			return $http.post('http://localhost:8080/Spring4MVCAngularJSExample/profile/',id)
			.then(
					function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while search user');
				return $q.reject(errResponse);
			});
		},
	
		searchFriend:function(id,friend){
			
			
			return $http({
	    		  url: 'http://localhost:8080/Spring4MVCAngularJSExample/searchFriend/',
	    		  method: "POST",
	    		  data: friend,
	    		  headers: {
	    		    'Content-Type': 'application/json'
	    		  }}).success(function(response){
	    			 
	    			  return response.data;
	    		  })
			        .error(function(){
			        });
		},
	
		searchImage:function(id,image){
			
			
			return $http({
	    		  url: 'http://localhost:8080/Spring4MVCAngularJSExample/searchImage/',
	    		  method: "POST",
	    		  data: image,
	    		  headers: {
	    		    'Content-Type': 'application/json'
	    		  }}).success(function(response){
	    			
	    			  return response.data;
	    		  })
			        .error(function(){
			        });
		}
	
		};
	}
	   
	]);
