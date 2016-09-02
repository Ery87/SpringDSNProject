'use strict';
	


App.service('UserService', ['$http','$q',function ($http,$q) {
	var path='http://193.206.170.142/OSN';
//	 	var path='http://localhost:8080/OSN';

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
		
	    return $http.post('http://193.206.170.143/RMS/createSocialUser/',id).then(
	    		//return $http.get('http://localhost:8080/OSN/download/').then(

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
	    
	    getPKRMS:function(){
	    	return $http.get(path+'/getPKRMS').then(
	    			function(response){
	    				return response.data;
	    			},function(errResponse){
	    				console.error('Error while request keyRMS on Server');
	    				return $q.reject(errResponse);
	    			});
	    },
	    
	    sendPKClient:function(message){
	    	return $http({
	    		url:'http://193.206.170.143/RMS/getPKClient/',
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
	    
	    savePK_KMS_RMS:function(message){
	    	return $http({
	    		url:path+"/savePK",
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
