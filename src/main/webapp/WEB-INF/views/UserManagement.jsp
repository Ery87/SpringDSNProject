<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
<script src="<c:url value='/static/js/libraries/rollups/aes.js' />"></script>
<script
	src="<c:url value='/static/js/libraries/components/enc-base64-min.js' />"></script>

<title>Welcome to DSNProject</title>
<style>
.username.ng-valid {
	background-color: lightgreen;
}

.username.ng-dirty.ng-invalid-required {
	background-color: red;
}

.username.ng-dirty.ng-invalid-minlength {
	background-color: yellow;
}

.email.ng-valid {
	background-color: lightgreen;
}

.email.ng-dirty.ng-invalid-required {
	background-color: red;
}

.email.ng-dirty.ng-invalid-email {
	background-color: yellow;
}
</style>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>

</head>
<body ng-app="myApp" class="ng-cloak" style="position:fixed;top:20%;left:17%;width:60%;height:70%;" >

	<div class="generic-container" ng-controller="LoginController as ctrl">
		<h1 style="text-align: center;">Welcome to DSNProject!</h1>
		<div class="panel panel-default">
			
			<div class="formcontainer" >
				<form ng-submit="ctrl.submit()" name="myForm"
					class="form-horizontal">
					<input type="hidden" ng-model="ctrl.user.id" />

					<div class="row">
						<div class="form-group col-md-12" >
							
							<div class="col-md-7"style="position:relative;top:50%; left:25%;" >
								<input type="email" ng-model="ctrl.user.email" id="email"
									class="email form-control input-sm"
									placeholder="Enter your Email" style="width:300px;" required />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.email.$error.required">This is a
										required field</span> <span ng-show="myForm.email.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
						
							<div class="col-md-7" style="position:relative;top:50%; left:25%;" >
								<input type="password" ng-model="ctrl.user.pw" id="pw"
									class="pw form-control input-sm" placeholder="Enter your password"style="width:300px;"
									required ng-minlength="7" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.pw.$error.required">This is a
										required field</span> <span ng-show="myForm.pw.$error.minlength">Minimum
										length required is 7</span> <span ng-show="myForm.pw.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-actions" style="position:relative;top:50%; left:40%;">
						<input type="submit" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="Login" >
							<button type="button" ng-click="ctrl.reset()"
								class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
								Form</button>
								<br><br>
						Not registered? <a ng-href='registration'>Create an account</a> 
								
						</div>
					</div>
				</form>
			</div>
			<h4>{{ctrl.message}}</h4>

		</div>
		<script src="<c:url value='/static/js/libraries/lockr.js'/>"></script>

		<script src="<c:url value='/static/js/libraries/lockr.min.js'/>"></script>
		<script type="text/javascript" src="static/js/libraries/base64.js"></script>
		<script type="text/javascript" src="static/js/libraries/bcrypt.js"></script>
		<script type="text/javascript" src="static/js/libraries/util.js"></script>
		<script type="text/javascript" src="static/js/libraries/impl.js"></script>
		<script type="text/javascript" src="static/js/libraries/utfx.js"></script>
		<script src="<c:url value='/static/js/app.js' />"></script>
		<script src="<c:url value='/static/js/service/login_service.js' />"></script>
		<script src="<c:url value='/static/js/controller/login_controller.js' />"></script>
		
</body>
</html>