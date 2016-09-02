'user strict';
App.controller('UploadController',['UserService','$window','$scope',function (UserService,$window,$scope){
		var self=this;
         self.user={id:null,birth_day:'',city:'',email:'',firstName:'',lastName:'',photo:null,pw:''};
       var url='http://193.206.170.142/OSN';
       // var url='http://localhost:8080/OSN';
       	
       	
       
         function readID(){
             var url = window.location.pathname;
             var id_utente = url.substring(url.lastIndexOf('/') + 1);
             return id_utente;
             }
             
        
         	
        
         var handleFileSelect = function(evt) {
        	
        	    var files = evt.target.files;
        	    var file = files[0];

        	    if (files && file) {
        	        var reader = new FileReader();

        	        reader.onload = function(readerEvt) {
        	            var binaryString = readerEvt.target.result;
        	            var b=btoa(binaryString);
        	            var id=readID();
        	        	UserService.uploadPhoto(id,b)
        	        	.then(
        				function(data){
        					
        					var id=data.data.id;
        				
        					UserService.saveRMS(id)
        					.then(
        							function(data){
	            					//Inviate PKRMS and PKKMS on server
        								var rms=data.rms;
        								var kms=data.kms;
        								var message={"kms": kms,"rms":rms};
        		
        								UserService.savePK_KMS_RMS(message)
        								.then(
        										function(data){
        											
        		      		            			$window.location.href=url+'/generateKey/'+id;

        										},function(errResponse){
     	      						               console.error('Error while send PK rms and kms.');
     	      						               	
        										});
        							
        								

        							},
	            							 function(errResponse){
	      						               console.error('Error while creating User.');

	      					              }	
        						);
        						
            			
	            			
        				},
        				 function(errResponse){
				               console.error('Error while upload photo User.');

			              }	);
        	        };

        	        reader.readAsBinaryString(file);
        	    }
        	};

        	
         
        	
       
        	
        	 if (window.File && window.FileReader && window.FileList && window.Blob) {
         	    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
         	    
         	} else {
         		 
               	    alert('The File APIs are not fully supported in this browser.');

            	  }

         	
        
         
}]);

App.directive('fileModel', ['$parse', function ($parse) {
	
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };

}]);
