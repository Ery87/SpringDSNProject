'use strict';
	


App.service('UserService', ['$http','$q',function ($http,$q) {
var path='http://193.206.170.142/OSN';
//	var path='http://localhost:8080/OSN';
				var urlRMS='http://193.206.170.143/RMS';
	return{
		
	
		
		 saveUser:function(utente){
		     
		       return  $http.post(path+'/user/',utente).then(
						function(response){
							return response.data
						},
					    			
						function(errResponse){
							console.error('Error while creating user');
							return $q.reject(errResponse);
						}
				);
		        
		        
		    },
		   
		    saveRMS:function(id){
		
		    	return $http.post(urlRMS+'/createSocialUser/',id).then(
		    			   //	return $http.post(path+'/createSocialUser/',id).then(

	    			function(response){
	    				return response.data;
	    			},
	    			function(errResponse){
						console.error('Error while creating user');
						return $q.reject(errResponse);
					}
			);
	        
	        
	    },
	    
	    savePKClient:function(message){
	    	return $http({
	    		url:path+'/insertPKClient',
	    		method:"POST",
	    		data:message,
	    		headers:{
	    			'Content-Type':'application/json'
	    		}}).success(function(response){
	    			return response;
	    		})
	    		.error(function(){
	    			
	    		});
	    		
	    	
	    },
	    
	 
	    
	  
		getPK:function(name){
			
			return $http.post(path+'/getPK',name).then(

		    			function(response){
		    				return response.data;
		    			},
		    			function(errResponse){
							console.error('Error while receive pk kms');
							return $q.reject(errResponse);
						});
		},
		
		createSocialUser2:function(encrypted_clientPubKeyToRMS){
			
			return $http.post(urlRMS+'/createSocialUser2/',encrypted_clientPubKeyToRMS).then(
				//		return $http.post(path+'/clientKeys/',messageCripted).then(
		
				function(response){
							return response.data;
							
						},
						function(errResponse){
							console.error('Error while inviate message to RMS');
							return $q.reject(errResponse);
						});
			},
			
			
		clientKeys:function(messageCripted){
		
		return $http.post(urlRMS+'/createSocialUser1/',messageCripted).then(
			//		return $http.post(path+'/clientKeys/',messageCripted).then(
	
			function(response){
						return response.data;
						
					},
					function(errResponse){
						console.error('Error while inviate message to RMS');
						return $q.reject(errResponse);
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
		    			 
		    			  return response;
		        })
		        .error(function(){
		        });
		    }
		
	};
}
   
]);









