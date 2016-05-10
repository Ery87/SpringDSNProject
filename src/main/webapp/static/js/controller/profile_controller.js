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
            		 function(data){
            			 
            			 	self.user=data;
     					self.image=self.user.photo;
     					var prova="data:image/png;base64,";
     					var str=prova+self.image
     					var img = document.createElement("img");
     					  img.src = str;
     					 img.width="50";
     					img.height="50";
     					  document.getElementById("foo").appendChild(img);
     					
            			
            		 },
            		 function(errResponse){
            			 console.error('Error while getUser...');
            			
            		 });
             	
        	
        	
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