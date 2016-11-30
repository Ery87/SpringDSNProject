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
<link href="<c:url value='/static/css/style.css' />" rel="stylesheet"></link>

</head>
<body ng-app="myApp" class="ng-cloak">
	<div class="generic-container"
		ng-controller="UserViewsController as ctrl">
		<div class="container">
			<div id="header">
				<div id="navcontainer">
					<div class="row floatRight">
						<div class="form-group col-md-12 ">
							<!--       <form name="form"  class="form-horizontal" >-->
							<input type="hidden" name="id" value="ctrl.user.id">
							<p>
								<input type="button" ng-click="ctrl.back()"
									class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid"
									value="back" />&nbsp;<input type="button" id="requestfriend"
									ng-click="ctrl.friendshipCreation()"
									class="btn btn-primary btn-sm" disabled="true"
									value="add to friends" />
							</p>

							<!--</form>  -->
						</div>

					</div>
				</div>



				<div class="photoFoo">
					<table>
						<tr>
							<td align="center"><div id="foo"></div></td>
						</tr>
						<tr>
							<td><p>
								<h2>
									<span ng-bind="ctrl.user.firstname"></span>&nbsp;&nbsp;<span
										ng-bind="ctrl.user.lastname"></span>
								</h2>
								</p></td>
						</tr>
						<tr>
							<td><p>
								<h4>
									<span ng-bind="ctrl.user.birth_day"></span>
								</h4></td>
							<td><span ng-bind="ctrl.user.city"></span></td>
						</tr>
					</table>


				</div>
			</div>

		</div>



		<div id="col1">



			<h3>Photo Gallery</h3>

			<div id="gallery">






				<div class="clear"></div>
			</div>
		</div>
		
		<div id="col2">
		</div>


		<div id="footer"></div>

	</div>











	<script
		src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
	<script
		src="<c:url value='/static/js/libraries/excluded/jquery-2.1.3.min.js' />"></script>
	<script src="<c:url value='/static/js/libraries/rollups/aes.js' />"></script>
	<script src="<c:url value='/static/js/libraries/rollups/pbkdf2.js' />"></script>

	<script src="<c:url value='/static/js/libraries/AesUtil.js'/>"></script>

	<script src="<c:url value='/static/js/libraries/lockr.js'/>"></script>

	<script src="<c:url value='/static/js/libraries/lockr.min.js'/>"></script>

  <script src="<c:url value='/static/js/libraries/encoding-indexes.js'/>"></script>
  <script src="<c:url value='/static/js/libraries/encoding.js'/>"></script>

	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/prng4.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rng.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rsa.js"></script>
	<script src="http://www-cs-students.stanford.edu/~tjw/jsbn/rsa2.js"></script>

	<script src="<c:url value='/static/js/app.js' />"></script>
	<script src="<c:url value='/static/js/service/userViews_service.js' />"></script>
	<script
		src="<c:url value='/static/js/controller/userViews_Controller.js' />"></script>

</body>
</html>