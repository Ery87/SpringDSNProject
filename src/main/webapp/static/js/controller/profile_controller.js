'use strict';

App.controller('ProfileController',['$scope','$window','ProfileService',function($scope,$window,ProfileService){
	var self=this;
        self.user={id:null,birth_day:'',city:'',email:'',firstname:'',lastname:'',photo:new FormData(),pw:''};
        var image;
        var users;
        var title;
        var message;
        var tagImage;
        var metaTag;
        var id_utente;
       var url='http://193.206.170.142/OSN';
       //  var url='http://localhost:8080/OSN';

        self.generateKeys = function () {
            var sKeySize =1024;
            var keySize = parseInt(sKeySize);
            var crypt = new JSEncrypt({ default_key_size: keySize });
            var async = null;
            var keyprivate;
            var keypublic;
            var dt = new Date();
            var time = -(dt.getTime());
            if (async) {
                $('#time-report').text('.');
                var load = setInterval(function () {
                    var text = $('#time-report').text();
                    $('#time-report').text(text + '.');
                }, 500);
                crypt.getKey(function () {
                    clearInterval(load);
                   
                    keyprivate=crypt.getPrivateKey();
                    keypublic=crypt.getPublicKey();
                });
                return;
            }
            crypt.getKey();
            
            keyprivate=crypt.getPrivateKey();
            keypublic=crypt.getPublicKey();
           return(keypublic)
        };

        
        
        
        $window.onload=function (){
        	
        	 var url = window.location.pathname;
             id_utente = url.substring(url.lastIndexOf('/') + 1);
           
             ProfileService.getUser(id_utente)
             .then(
            		 function(data){
            			 
            			self.user=data;
            			var email=self.user.email;
            			var N = Math.floor((Math.random() * 10) + 1);
            			var messageProtocol="Login request";
            			var protocol= new Object();
            			protocol.email=email;
            			protocol.N=N;
            			protocol.messageProtocol=messageProtocol;
            		 
            			ProfileService.getLoginMessage(protocol)
            			.then(
            					function(data){
            						
            						return data;
            					}, function(errResponse){
                       			 console.error('Error while inviate protocol RMS...');
                     			
                       	 });
            				
            			
     					self.image=self.user.photo;
     					var prova="data:image/png;base64,";
     					var str=prova+self.image
     					var img = document.createElement("img");
     					img.src = str;
     					 img.width="50";
     					img.height="50";
     					  document.getElementById("foo").appendChild(img);
     					self.getAlbum();  
     					
            			
            		 },
            		 function(errResponse){
            			 console.error('Error while getUser...');
            			
            		 });
             	
        	
        	
        },
  
        
        self.getAlbum=function(){
          	
        	ProfileService.getAlbum(id_utente)
             .then(
            		 function(response){
            			
            			self.metaTag=response.data;
            			
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
						
						self.title="List of users:"
						self.users=response.data;
						
						
					},
					function(errResponse){
						self.message='Not found user';
           			 
           		 });
			}
			},
			
		
			self.logout=function(){
				$window.location.href=url;
			},
			
			self.submit=function(){
				self.reset();
				self.searchFriend();
				
			},
			
			self.uploadPhoto=function(){
				var rule=$scope.ctrl.rule;
				var files=$scope.ctrl.evt.target.files;
				var file=files[0];
				if(files && file){
					var reader=new FileReader();
				
					reader.onload=function(readerEvt){
						var binaryString=readerEvt.target.result;
						var b=btoa(binaryString);
						var id=self.user.id;
						ProfileService.upload(id,b)
						.then(
								function(){
									ProfileService.sendRule(id,rule);
								},
								function(errResponse){
									console.error('Error while creating User.');
								});
					};
					reader.readAsBinaryString(file);
				}

			};
			
			self.reset=function(){
		        self.users='';

		        self.tagImage='';
			};
		

			
	

        
}]);

App.directive('fileModel',['$parse',function($parse){
	
	return{
		restrict:'A',
		link: function(scope,element,attrs){
			var model=$parse(attrs.fileModel);
			var modelSetter=model.assign;
			
			element.bind('change',function(){
				scope.$apply(function(){
					modelSetter(scope,element[0].files[0]);
				});
			});
		}
	};
}]);