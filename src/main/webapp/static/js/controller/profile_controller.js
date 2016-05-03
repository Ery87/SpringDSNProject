'use strict';

App.controller('ProfileController',['$scope','$window','ProfileService',function($scope,$window,ProfileService){
	var self=this;
        self.user={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:new FormData(),pw:''};
        var image;
        var users;
        var title;
        var message;
        var tagImage;
        
        $window.onload=function (){
        	
        	 var url = window.location.pathname;
             var id_utente = url.substring(url.lastIndexOf('/') + 1);
             ProfileService.getUser(id_utente)
             .then(
            		 function(d){
            			 
            			 self.user=d;
            			 self.image=self.arrayBufferToBase64(self.user.photo);
            			
            		 },
            		 function(errResponse){
            			 console.error('Error while getUser...');
            			
            		 });
             	
        	
        	
        }
       
        self.arrayBufferToBase64=function(photo) {
			  var binary = '';
			  var bytes = new Uint8Array(photo);
			  var len = bytes.byteLength;
			  for (var i = 0; i < len; i++) {
			    binary += String.fromCharCode( bytes[ i ] );
			  }
			  return window.btoa( binary );
			},
			
		self.searchFriend=function(){
			var id=self.user.id;
			var search=self.friend;
			var st=search.charAt(0);
			if(st=='#'){
				ProfileService.searchImage(id,search)
				.then(
						function(response){
							console.log(response.data);
							self.title="List of albums:"
							self.tagImage=response.data;
							
							
						},
						function(errResponse){
							self.message='Not found album';
	           			 
	           		 });
					
			}else{
				ProfileService.searchFriend(id,search)
			.then(
					function(response){
						console.log(response);
						self.title="List of users:"
						self.users=response.data;
						
						
					},
					function(errResponse){
						self.message='Not found user';
           			 
           		 });
			}
			}
			
		
			
		

			
	

        
}]);