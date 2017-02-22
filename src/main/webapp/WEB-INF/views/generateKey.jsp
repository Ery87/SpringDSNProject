<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>

<title>Generate a PassPhrase</title>
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
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>


</head>
<body ng-app="myApp" class="ng-cloak"  style="position:fixed;top:20%;left:17%;width:60%;height:70%;" >

	<div class="generic-container" ng-controller="GenerateController as ctrl">
		<h1 style="text-align: center;">Users key generation</h1>
		
		<div class="panel panel-default">
			<div class="formcontainer" >
				<form ng-submit="ctrl.submit()" name="myForm"
					class="form-horizontal">
	
		
		
				<div class="row">
						<div class="form-group col-md-12" >
					<div class="col-md-7"style="position:relative;top:50%; left:25%;" >
								
						<label class="col-md-2 control-lable" for="Passphrase" style="width:300px;"><h4>Passphrase*</h4></label>
								<br>
			
						
								<input data-ng-model='user.password' type="password" style="width:200px;"
									name='password' placeholder='insert your passPhrase' required>
				
							<div ng-show="form.password.$error.required">Field required</div>
						</div>
					</div>
					</div>
					<div class="row">
							<div class="form-group col-md-12" >
					<div class="col-md-7"style="position:relative;top:50%; left:25%;" >
								
						<label class="col-md-2 control-lable" for="Passphrase" style="width:300px;"><h4> Confirm Passphrase</h4></label>
								<br>
			
				
									<input ng-model='user.password_verify' type="password" style="width:200px;"
										name='confirm_password' placeholder='confirm passPhrase'
										required data-password-verify="user.password">
								</p>
								<div ng-show="form.confirm_password.$error.required">
									Field required!</div>
								<div ng-show="form.confirm_password.$error.passwordVerify">
									Fields are not equal!</div>
							</div>
						</div>
						<div class="row">
							<div style="padding-right: 70px;" class="form-actions floatRight">
								<input id="generateKey" type="submit" ng-click="ctrl.generateKey()" value="generate"
									class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
								<button type="button" ng-click="ctrl.reset()"
									class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
									Form</button>
							</div>


						</div>
			</form>
		</div>

 <p><h5>* insert a Passphrase (it must be an alphanumeric string). The Passphrase will be use by the system to retrieve user's private key.</h5></div>
	</div>
	<script
		src="<c:url value='/static/js/libraries/excluded/jquery-2.1.3.min.js' />"></script>
	<script src="<c:url value='/static/js/libraries/rollups/aes.js' />"></script>
	<script src="<c:url value='/static/js/libraries/rollups/pbkdf2.js' />"></script>

	<script src="<c:url value='/static/js/libraries/AesUtil.js'/>"></script>


	<script src="<c:url value='/static/js/libraries/lockr.js'/>"></script>

	<script src="<c:url value='/static/js/libraries/lockr.min.js'/>"></script>

	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/prng4.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rng.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rsa.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rsa2.js"></script>

	<script src="<c:url value='/static/js/app.js' />"></script>
	<script src="<c:url value='/static/js/service/user_service.js' />"></script>
	<script
		src="<c:url value='/static/js/controller/generate_controller.js' />"></script>
</body>
</html>