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
        //    var url='http://193.206.170.142/OSN';
          var url='http://localhost:8080/OSN';
      
        
        
        
       self.getRMS=function(name){
      	 ProfileService.getPK(name) 
      	 .then(
  			    	 function(data){
  			    		 	
  					  Lockr.set('modulus_RMS',data.modulus);
  					 Lockr.set('exponent_RMS',data.exponent);
  					
      			 },function(errResponse){
  							console.error('Error while inviate key client to OSN');
  					 	  
  				
      			 });
       },  
       
     self.getKMS=function(name){
    	 ProfileService.getPK(name) 
    	 .then(
			    	 function(data){
					  Lockr.set('modulus_KMS',data.modulus);
					  Lockr.set('exponent_KMS',data.exponent);
					 
					
    			 },function(errResponse){
							console.error('Error while inviate key client to OSN');
					 	  
				
    			 });
     }
     
     
 	//UPLOAD PHOTO
		
     
     
		self.uploadPhotoRule=function(){
		var tag=$scope.ctrl.tag;
		var passPhrase=$scope.ctrl.passPhrase;
		Lockr.set('passPhrase',passPhrase);
		var rule=$scope.ctrl.rule;
	
		var nameResource=Lockr.get('name_photo');
				var id=self.user.id;
				var idResource=Lockr.get('name_photo')+id;
	
				//1:CS->RMS	
				var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		   	 	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		   	 	Lockr.set("iv",iv);
		   	 	Lockr.set('salt',salt);
				
				var n2=Math.floor(Math.random()*100+1);
				var msgKms={"idu":id,"idR":idResource,"nameR":nameResource,"n2":n2,'session_token':Lockr.get('sessionId')};
				self.getKMS('KMS');
				var rsa=new RSAKey();
				var mKMS=Lockr.get('modulus_KMS');
				var eKMS=Lockr.get('exponent_KMS')
				
				rsa.setPublic(mKMS,eKMS);
				

				var msgKMSEncrypted=rsa.encrypt(msgKms);
				console.log(msgKms);
				console.log(msgKMSEncrypted);
				self.getRMS('RMS');
				var mRMS=Lockr.get('modulus_RMS');
				var eRMS=Lockr.get('exponent_RMS');
				var n1=Math.floor(Math.random()*100+1);
				
				var msgRMS={"idu":id,"n1":n1,"idR":idResource,"nameR":nameResource,"msgKMS":msgKMSEncrypted,'session_token':Lockr.get('sessionId')};
				msgRMS=JSON.stringify(msgRMS);
				var aes=new AesUtil(128,1000);
				var encryptmsgRMS=aes.encrypt(salt,iv,passPhrase,msgRMS);
				
				var paramRMS={"salt":salt,"iv":iv,"passPhrase":passPhrase};
				paramRMS=JSON.stringify(paramRMS);
				rsa.setPublic(mRMS,eRMS);
				paramRMS=rsa.encrypt(paramRMS);
				
				var message={'paramRMS':paramRMS,'encryptmsgRMS':encryptmsgRMS};
				message=JSON.stringify(message);
		
				
				ProfileService.uploadReq1(message)
				.then(
						function(data){
							console.log(data);
						},
						function(errResponse){
							console.error('Error while creating User.');
						});
			},	
		
   
		
   
     	
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
         
        	ProfileService.getSession(id_utente)
        	.then(	
        		function(data){
        	Lockr.set('session',data.sessionId);
        	
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
     					self.getAlbum();  
     					
            			
            		 },
            		 function(errResponse){
            			 console.error('Error while getUser...');
            			
            		 });
        		}, function(errResponse){
       			
        			$window.location.href=url;
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
			
			
		
			
			self.reset=function(){
		        self.users='';

		        self.tagImage='';
			};
		

     
			 var handleFileSelect = function(evt) {
		        	
	        	    var files = evt.target.files;
	        	    var file = files[0];
	        	    var str=file.name;
	        	    str = str.replace(/\s+/g, '');
	        	    Lockr.set('name_photo',str);
	        	    
	        	    if (files && file) {
	        	        var reader = new FileReader();

	        	        reader.onload = function(readerEvt) {
	        	            var binaryString = readerEvt.target.result;
	        	            var b=btoa(binaryString);
	        	           
	        	           Lockr.set("photo",b);
	        	        	
	        	        };

	        	        reader.readAsBinaryString(file);
	        	    }
	        	};
	         
	        	
	         
	        	
	       
	        	 if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
	          	    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
	          	    
	          	} else {
	          		 
	                	    alert('The File APIs are not fully supported in this browser.');

	             	  }

	          	
	        	
	        	
	        

        
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