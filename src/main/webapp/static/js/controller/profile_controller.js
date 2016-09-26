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
     
        //    var url='http://193.206.170.142/OSN';
         var url='http://localhost:8080/OSN';
      
        
        self.getPKClient=function(id){
        	ProfileService.getPKClient(id)
        	.then(
        			function(data){
        				
        				Lockr.set("modulus_Client",data.modulus_public);
        				Lockr.set("private_Client",data.private_key)	;
        				Lockr.set("exponent_Client",data.exponent_public);
        				Lockr.set("salt",data.salt);
        				Lockr.set("iv",data.iv);
						

        			
        			},function(errResponse){
							console.error('Error while receive key client to OSN');
	  					 	  
        			}
        			);
        },
        
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
		Lockr.set("rule",rule);
		var album={"tag":tag,"id":Lockr.get("id"),"fileName":Lockr.get("fileName")};
		
		ProfileService.saveAlbum(album)
		.then(
				function(data){
				//1:CS->RMS	

				Lockr.set("idResource",data.idAlbum);
				var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		   	 	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
		   	 	Lockr.set("iv1",iv);
		   	 	Lockr.set('salt1',salt);
				
				var n2=Math.floor(Math.random()*100+1);
				var msgKms={"idu":Lockr.get("id"),"idR":Lockr.get("idResource"),"n2":n2,'session_token':Lockr.get('sessionId')};
			
				
				
					
				
				
				
				self.getKMS('KMS');
				msgKms=JSON.stringify(msgKms);
				
				var rsa=new RSAKey();
				var mKMS=Lockr.get('modulus_KMS');
				var eKMS=Lockr.get('exponent_KMS')
				
				rsa.setPublic(mKMS,eKMS);
				
				var msgKMSEncrypted=rsa.encrypt(msgKms);
				self.getRMS('RMS');
				var mRMS=Lockr.get('modulus_RMS');
				var eRMS=Lockr.get('exponent_RMS');
				var n1=Math.floor(Math.random()*100+1);
				
				var msgRMS={"idu":Lockr.get("id"),"n1":n1,"idR":Lockr.get("idResource"),"msgKMS":msgKMSEncrypted,'session_token':Lockr.get('sessionId')};
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
							var keySize = 128;
					   	 	var iterationCount = 1000;
					   		var aesUtil=new AesUtil(keySize,iterationCount);
							var key=data.AESParams;
							self.getPKClient(Lockr.get("id"));
							var rsa=new RSAKey();
							var keyPrivate=aesUtil.decrypt(Lockr.get('salt'),Lockr.get('iv'),Lockr.get('passPhrase'),Lockr.get("private_Client"));
						 	rsa.setPrivate(Lockr.get('modulus_Client'),Lockr.get('exponent_Client'), keyPrivate); //recupera parametri della chiave del client
				 	 	
						 	key=rsa.decrypt(key);
				 	 	
						 	key=JSON.parse(key);
				 	
						 	var iv=key.iv;
						 	var salt=key.salt;
						 	var passphrase=key.passphrase;
				 	 

						 	var aesUtil = new AesUtil(128, 1000);
					
						 	var decrypted_msg=aesUtil.decrypt(salt, iv, passphrase, data.encrypted_msg_client);
						 	
						 	decrypted_msg=JSON.parse(decrypted_msg);
						 	
						 	var secret_user=decrypted_msg.secretUser;
						 	var nonce_plus_one=decrypted_msg.nonce_one_plus_one;
						 	var kms_msg=decrypted_msg.KMSmsg;
						 	
							var rsa=new RSAKey();
							rsa.setPrivate(Lockr.get('modulus_Client'),Lockr.get('exponent_Client'), keyPrivate);
							kms_msg=rsa.decrypt(decrypted_msg.KMSmsg);
							kms_msg=JSON.parse(kms_msg);
							var passSecret=secret_user+kms_msg.secretRsc;
							
							//Encryption photo
						 	var aesUtil = new AesUtil(128, 1000);
						 	var encryptedPhoto=aesUtil.encrypt(secret_user,kms_msg.secretRsc,passSecret, Lockr.get("photo"));
						 	
						 	//Msg to KMS
						 	
						 	var msgKMS={"id":Lockr.get("id"),"idResource":Lockr.get("idResource"),"n2_2":(kms_msg.nonce_two_plus_one+1),"encryptedPhoto":encryptedPhoto};
							var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
					   	 	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
						 	var aesUtil = new AesUtil(128, 1000);

						 	var msgKMSEncrypt=aesUtil.encrypt(iv,salt,Lockr.get("passPhrase"),JSON.stringify(msgKMS));
						 	
						 	var keyKMS={"iv":iv,"salt":salt,"passPhrase":Lockr.get("passPhrase")};
						 	var rsa=new RSAKey();
						 	rsa.setPublic(mKMS,eKMS);
						 	var keyKMSencrypt=rsa.encrypt(JSON.stringify(keyKMS));
					   	 	var messageToKMS={"keyKMSencrypt":keyKMSencrypt,"msgKMSEncrypt":msgKMSEncrypt};
						 	
					   	 	var msgRMS={"id":Lockr.get("id"),"N1_2":(nonce_plus_one+1),"idResource":Lockr.get("idResource"),"rule":Lockr.get("rule"),"messageToKMS":messageToKMS};
						 	
						 	var iv=CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
					   	 	var salt= CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
						 	var aesUtil = new AesUtil(128, 1000);
						 	msgRMS=aesUtil.encrypt(iv,salt,Lockr.get("passPhrase"),JSON.stringify(msgRMS));
						 	
						 	var keyRMS={"iv":iv,"salt":salt,"passPhrase":Lockr.get("passPhrase")};
						 	var rsa=new RSAKey();
							rsa.setPublic(mRMS,eRMS);
							var keyRMSencrypt=rsa.encrypt(JSON.stringify(keyRMS));
							
							var messageToRMS={"keyRMSencrypt":keyRMSencrypt,"msgRMS":msgRMS};
							
							console.log(messageToRMS);
						 	
						 	
						 						
						 	
						 	
						},
						function(errResponse){
							console.error('Error while creating User.');
						});
				},
				function(errResponse){
					window.alert("File already exists!");
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

       
        self.readID=function(){
            var url = window.location.pathname;
            var id_utente = url.substring(url.lastIndexOf('/') + 1);
            return id_utente;
            }
        
        
        $window.onload=function (){
			
        	var id_utente=self.readID();	
        	Lockr.set("id",id_utente);
        	
		     ProfileService.getUser(Lockr.get("id"))
             .then(
            		 function(data){
            			 
            			self.user=data;
     					self.image=self.user.photo;
     				
     						  var binary = '';
     						  var bytes = new Uint8Array( self.image);
     						  var len = bytes.byteLength;
     						  for (var i = 0; i < len; i++) {
     						    binary += String.fromCharCode( bytes[ i ] );
     						  }
     						  var base64Image=window.btoa( binary );
     					
     							var tag="data:image/JPEG;base64,";
     	     					var imageDecoded=tag+base64Image;
			
     			
     					var img = document.createElement("img");
     					img.src = imageDecoded;
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
          	
        	ProfileService.getAlbum(Lockr.get("id"))
             .then(
            		 function(response){
            			
            			self.metaTag=response.data;
            			
            		 },
            		 function(errResponse){
            			 console.error('Error while getUser...');
            			
            		 });
             	
        	
        	
        },
  
        
		self.searchFriend=function(){

			var search=self.friend;
			var st=search.charAt(0);
			if(st=='#'){
				ProfileService.searchImage(Lockr.get("id"),search)
				.then(
						function(response){
							
							self.title="List of albums:"
							self.tagImage=response.data;
							
						},
						function(errResponse){
							self.message='Not found album';
	           			 
	           		 });
					
			}else{
				ProfileService.searchFriend(Lockr.get("id"),search)
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
	        	    Lockr.set("fileName",str);
	        	    
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