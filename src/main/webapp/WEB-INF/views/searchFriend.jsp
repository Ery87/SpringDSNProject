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
<body ng-app="myApp" class="ng-cloak">

	<div class="generic-container" ng-controller="SearchController as ctrl">
		<h1 style="text-align: center;">Welcome to DSNProject!</h1>
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead">Search user: </span>
				<div class="form-actions floatRight">
					<button type="button" ng-click="ctrl.back()"
						class="btn btn-warning btn-sm">back</button>
				</div>
			</div>
			<div class="formcontainer">
				<form ng-submit="ctrl.submit()" name="myForm"
					class="form-horizontal">


					<div class="row">
						<div class="form-group col-md-12">
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.friend" id="friend"
									class="friend form-control input-sm"
									placeholder="Search your friend" required />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.email.$error.required">This is a
										required field</span> <span ng-show="myForm.email.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-actions floatRight">
							<input type="submit" class="btn btn-primary btn-sm"
								ng-disabled="myForm.$invalid">
							<button type="button" ng-click="ctrl.reset()"
								class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
								Form</button>
						</div>
					</div>
				</form>
			</div>
			<h3>{{ctrl.title}}</h3>
			<h4>{{ctrl.message}}</h4>
			<table class="table table-hover">

				<tbody>

					<tr ng-repeat="u in ctrl.users">
						<td><span ng-bind="u.lastName"></span></td>
						<td><span ng-bind="u.firstName"></span></td>

						<td><span ng-bind="u.city"></span></td>
						<td></td>
						<td></td>
						<td><a
							ng-href="/OSN/userView/{{ctrl.id}}/{{u.id}}?{{u.firstName}}{{u.lastName}}"><button>Profile</button></a>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<script src="<c:url value='/static/js/libraries/lockr.js'/>"></script>

	<script src="<c:url value='/static/js/libraries/lockr.min.js'/>"></script>

	<script src="<c:url value='/static/js/app.js' />"></script>
	<script src="<c:url value='/static/js/service/search_service.js' />"></script>
	<script src="<c:url value='/static/js/controller/search_controller.js' />"></script>
</body>
</html>