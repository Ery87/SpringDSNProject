'use strict';

App.controller('SearchController',['$scope','$window','SearchService',function($scope,$window,SearchService){
	var self=this;
	var id;
	var url="http://localhost:8080/OSN";
	//	var url="http://193.206.170.142/OSN";

	//CHECK SESSION
	$window.onload=function(){
		self.id=self.readID();
		SearchService.checkSession(self.id)
		.then(
				function(data){
					console.log(data);
					if(data.session==0){
						$window.location.href=url;
					}
				},function(errResponse){
					console.error('Error while check session...');
				});
	},
	self.readID=function(){
		var url = window.location.pathname;
		var id_utente = url.substring(url.lastIndexOf('/') + 1);
		return id_utente;
	}

	//SEARCH USER
	self.searchFriend=function(){ 
		self.title='';
		self.users='';
		self.message='';
		var search=self.friend;
		var id=self.readID();
		SearchService.searchFriend(id,search)
		.then(
				function(response){

					self.title="List of users:"
						self.users=response.data;
					self.id=id;

				},
				function(errResponse){
					self.message='Not found user';

				});
	}



	self.submit=function(){
		self.searchFriend();
	},

	// BACK TO PAGE PROFILE
	self.back=function(){
		var id=self.readID();
		SearchService.getUser(id)
		.then(
				function(data){

					$window.location.href=url+'/profile/'+id+'?'+data.lastname+data.firstname;

				},function(errResponse){
					console.error('Error while getUser...');

				});
	}

	self.reset=function(){

		self.friend='';
		self.title='';
		self.users='';
		self.message='';

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