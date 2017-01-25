<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
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
<body ng-app="myApp" class="ng-cloak">
	<div class="generic-container" ng-controller="UploadController as ctrl">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead">Upload your profile's photo </span>
			</div>
			<div class="formcontainer">
				<form name="myForm" class="form-horizontal"
					enctype="multipart/form-data">



					<div class="row">
					<div class="col-md-7">
						<div class="form-group col-md-12"><h4>Select a file to upload:</h4></label><br>
							
								
								<input type="file" id="filePicker" value="choose file">
							</div>
							<br>
							<!-- <div class="row">
                       <div class="form-actions floatRight">
                              <button type="submit" ng-click="ctrl.uploadPhoto()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">Send photo</button>
                             
                              <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
                          </div>
                           -->
						</div>
				</form>

				<br>
				<br>
				<br>
				<div class="row">
					<div id="dataFormContainer" style="font-size: 50px">
						&nbsp;

						<div id="dataFormContainerButton" class="form-actions floatRight">
						</div>

					</div>
				</div>
			</div>

			<script src="<c:url value='/static/js/libraries/lockr.js'/>"></script>

			<script src="<c:url value='/static/js/libraries/lockr.min.js'/>"></script>


			<script
				src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
			<script
				src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
			<script src="<c:url value='/static/js/app.js' />"></script>
			<script src="<c:url value='/static/js/service/login_service.js' />"></script>
			<script
				src="<c:url value='/static/js/controller/login_controller.js' />"></script>
			<script src="<c:url value='/static/js/service/user_service.js' />"></script>
			<script
				src="<c:url value='/static/js/controller/user_controller.js' />"></script>
			<script
				src="<c:url value='/static/js/controller/uploadController.js' />"></script>
</body>
</html>