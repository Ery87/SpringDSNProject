'use strict';
	


App.service('UserService', ['$http','$q',function ($http,$q) {
	var path='http://193.206.170.142/OSN';

	return{
		
		
		 saveUser:function(utente){
		     
		       return  $http.post(path+'/user/',utente).then(
						function(response){
							return response.data;
						}, 
						function(errResponse){
							console.error('Error while creating user');
							return $q.reject(errResponse);
						}
				);
		        
		        
		    },
		   
		    
		    createRMS:function(email){
		    	return $http.post('http://193.206.170.143/RuleManagerService/createSocialUser',email).then(
		    			function(response){
		    				return response.data;
		    			},
		    			function(errResponse){
		    				console.error('Error while inviate email RMS');
		    				return $q.reject(errReponse);
		    			});
		    },
		    
		    uploadPhoto:function(id,file){
		    	
		    	var utente={id:id,photo:file};
		    	
		    	console.log(utente);
		    	return $http({
		    		  url: path+'/upload/',
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
