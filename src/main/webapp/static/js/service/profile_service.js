'use strict';

App.factory('ProfileService',['$http','$q',function($http,$q){
	var path='http://193.206.170.142/OSN';
//	var path='http://localhost:8080/OSN';
var urlRMS='http://193.206.170.143/RMS';
	
	return{
		getPKClient:function(id){
			   return $http.post(path+'/getPKClient',id).then(

		    			function(response){
		    				return response.data;
		    			},
		    			function(errResponse){
							console.error('Error while receive pk client');
							return $q.reject(errResponse);
						});
		   },
		
	
		getUser:function(id){
			
			return $http.post(path+'/profile/',id)
			.then(
					function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while search user');
				return $q.reject(errResponse);
			}
			);
	        
	        
	    },
	    
	    saveAlbum:function(album){
	    	return $http.post(path+'/saveAlbum',album)
			.then(
					function(response){
				return response.data;
			},
			function(errResponse){
				console.error(errResponse);
				return $q.reject(errResponse);
			}
			);
	    },
	    
	    
	    uploadReq1:function(msg){
					
					return $http.post(urlRMS+'/uploadReq1/',msg)
					.then(
							function(response){
						return response.data;
					},
					function(errResponse){
						console.error(errResponse);
						return $q.reject(errResponse);
					}
					);
			        
			        
			    },
			    uploadReq2:function(msg){
					
					return $http.post(urlRMS+'/uploadReq2/',msg)
					.then(
							function(response){
						return response.data;
					},
					function(errResponse){
						console.error(errResponse);
						return $q.reject(errResponse);
					}
					);
			        
			        
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
		
		logOut:function(){
			return $http.get(path+'/logout').then(
					
	    			function(response){
	    				
	    				return response.data;
	    			},
	    			function(errResponse){
						console.error('Error while logout');
						return $q.reject(errResponse);
					});
		},
		
		getLoginMessage:function(protocol){
			return $http({
				url:'http://193.206.170.143/RMS/loginRequest',
				method:"POST",
				data:protocol,
				headers:{
					'Content-Type':'application/json'
				}
			}).success(function(response){
				return response.data;
			})
			.error(function(){
				
			});
		},
		searchFriend:function(id,friend){
			
			
			return $http({
	    		  url: path+'/searchFriend/',
	    		  method: "POST",
	    		  data: friend,
	    		  headers: {
	    		    'Content-Type': 'application/json'
	    		  }}).success(function(response){
	    			 
	    			  return response.data;
	    		  })
			        .error(function(){
			        	console.error('Error while inviate protocol');
			        });
		},
	
		getAlbum:function(id){
		 	
			return $http({
			 url: path+'/album/',
   		  method: "POST",
   		  data: id,
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
	    		  url: path+'/searchImage/',
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
