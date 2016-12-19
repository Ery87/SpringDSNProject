'use strict';

var App=angular.module('myApp',['ngRoute']);
App.config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

	$routeProvider

	.when('/',{
		controller:'LoginController',
		templateUrl: 'WEB-INF/views/UserManagement.jsp'
	})

	.when('/registration',{
		controller:'UserController',
		templateUrl: 'WEB-INF/views/registration.jsp'

	})

	.when('/uploadPhoto/{id}',{
		controller:'UploadController',
		templateUrl: 'WEB-INF/views/uploadPhoto.jsp'

	})

	.when('/profile/{id}?{lastname}{firstname}',{
		controller:'ProfileController',
		templateUrl: 'WEB-INF/views/profileUser.jsp'

	})
	.when('/generateKey/{id}',{
		controller:'GenerateController',
		templateUrl: 'WEB-INF/views/generateKey.jsp'

	})
	.when('/userView/{id}/{id}?{fistname}{lastname}',{
		controller:'UserViewsController',
		templateUrl: 'WEB-INF/views/userView.jsp'

	})
	

	.otherwise({redirectTo:'/'});
}]);

