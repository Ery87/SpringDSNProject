'use strict';

//SERVICE PAGE YOU SEARCHED
App.factory('UserViewsService',['$http','$q',function($http,$q){
	//var path='http://localhost:8080/OSN';
	var path='http://193.206.170.142/OSN';

	var urlRMS='http://193.206.170.143/RMS';
	var pathPFS='http://193.206.170.147/PathFinder';	

	return{

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
			return $http.post(path+'/checkSession',id)
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


		getFriendshipRequestor:function(id){
			return $http.post(path+'/getFriendshipRequestor/',id)
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


		getUserViewPhoto:function(id,filename){
			var message={"id":id,"filename":filename};
			return $http({
				url: path+'/getPhoto/',
				method: "POST",
				data: message,
				headers: {
					'Content-Type': 'application/json'
				}}).success(function(response){

					return response.data;
				})
				.error(function(){
				});
		},

		isFriend:function(messagePFS){


			return $http({
				url: pathPFS+'/evaluationFriendship/',
				method: "POST",
				data: messagePFS,
				headers: {
					'Content-Type': 'application/json'
				}}).success(function(response){

					return response.data;
				})
				.error(function(){
				});
		},
		isPending:function(sessionUser,searchedUser){
			var messagePFS={"idSessionUser":sessionUser,"idSearchedUser":searchedUser};

			return  $http({
				url: path+'/pending/',
				method: "POST",
				data: messagePFS,
				headers: {
					'Content-Type': 'application/json'
				}}).success(function(response){

					return response.data;
				})
				.error(function(){
				});
		},
		getDownload:function(msgRMS){

			return $http({
				url: urlRMS+'/downloadReq/',
				method: "POST",
				data:msgRMS ,
				headers: {
					'Content-Type': 'application/json'
				}}).success(function(response){

					return response.data;
				})
				.error(function(){
				});
		},
		
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

		friendshipCreation:function(id_session,id_searched){
			var message={"id_requestor":id_session,"id_acceptor":id_searched};

			return $http({
				url: path+'/requestFriendship/',
				method: "POST",
				data:message ,
				headers: {
					'Content-Type': 'application/json'
				}}).success(function(response){

					return response.data;
				})
				.error(function(){
				});
		}

	}



}

]);
