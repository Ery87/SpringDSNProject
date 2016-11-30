'use strict';


//SERVICE PAGE SEARCH
App.factory('SearchService',['$http','$q',function($http,$q){
	//var path='http://193.206.170.142/OSN';
	var path='http://localhost:8080/OSN';
	var urlRMS='http://193.206.170.143/RMS';

	return{
		searchFriend:function(id,friend){
			return $http({
				url: path+'/search',
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
		checkSession:function(id){
			return $http.post(path+'/checkSession',id).then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error while check session');
						return $q.reject(errResponse);
					});

		},
	};
}


]);