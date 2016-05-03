'use strict';
	


App.service('UserService', ['$http','$q',function ($http,$q) {
	return{
		
		
		 saveUser:function(utente){
		     
		       return  $http.post('http://localhost:8080/Spring4MVCAngularJSExample/user/',utente).then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while creating user');
							return $q.reject(errResponse);
						}
				);
		        
		        
		    },
		   
		    uploadPhoto:function(id,file){
		    	
		    	
		    	var utente={id:id,photo:file};
		    	
		    	console.log(utente);
		    	return $http({
		    		  url: 'http://localhost:8080/Spring4MVCAngularJSExample/upload/',
		    		  method: "POST",
		    		  data: utente,
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
