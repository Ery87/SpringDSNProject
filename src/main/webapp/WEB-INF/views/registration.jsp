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

<title>Registration form for DSNProject</title>
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
	<div class="generic-container" ng-controller="UserController as ctrl">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><h2 align="center">User Registration Form</h2> </span>
			</div>
			<div class="formcontainer" >
				<form name="myForm" class="form-horizontal"
					enctype="multipart/form-data">

					<input type="hidden" ng-model="id" />

					<div class="row">
						<div class="form-group col-md-12">
							<div class="col-md-7" style="position:relative;left:35%;">
							<label class="col-md-2 control-lable" for="firstName" style="width:300px;" ><h5>Firstname</h5></label>
								<br>
						
								<input type="text" ng-model="ctrl.user.firstName"
									name="firstName" class="firstName form-control input-sm" style="width:300px;"
									placeholder="Enter your First Name" required ng-minlength="3" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.firstName.$error.required">This is
										a required field</span> <span
										ng-show="myForm.firstName.$error.minlength">Minimum
										length required is 3</span> <span ng-show="myForm.firstName.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
						<div class="col-md-7" style="position:relative;left:35%;">
							<label class="col-md-2 control-lable" for="lastName" style="width:300px;"><h5>Surname</h5></label>
							<br>
								<input type="text" ng-model="ctrl.user.lastName" name="lastName" style="width:300px;"
									class="lastName form-control input-sm"
									placeholder="Enter your Last Name" required ng-minlength="3" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.lastName.$error.required">This is
										a required field</span> <span
										ng-show="myForm.lastName.$error.minlength">Minimum
										length required is 3</span> <span ng-show="myForm.lastName.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<div class="col-md-7" style="position:relative;left:35%;">
							<label class="col-md-2 control-lable" for="email" style="width:300px;"><h5>Email</h5></label>
						<br>
								<input type="email" ng-model="ctrl.user.email" id="email" style="width:300px;"
									class="email form-control input-sm"
									placeholder="Enter your Email" required />
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
						<div class="col-md-7" style="position:relative;left:35%;">
							
			<label class="col-md-2 control-lable" for="birth_day"  style="width:300px;"><h5>Birth
								day</h5></label><br>
  <table style="position:absolute;left:15px;top:30px;">
  <tr>
  <td><input type="text" ng-model="ctrl.day" style="width:60px;height:25px;"class="form-control input-sm" placeholder="GG" required /> </td>
	<td width="15%"></td>								
  <td><fieldset ng-model="ctrl.months" >
  
  <select name="months" ng-model="ctrl.months">
   <option value="01" selected="selected">JAN</option>
   <option value="02">FEB</option>
   <option value="03">MAR </option>
      <option value="04">APR</option>
   
      <option value="05">MAY</option>
      <option value="06">JUN</option>
      <option value="07">JUL </option>
      <option value="08">AUG</option>
      <option value="09">SEP</option>
      <option value="10">OCT</option>
      <option value="11">NOV</option>
      <option value="12">DEC</option>
  
  </select>
 </fieldset></td>
 	<td width="15%"></td>								
 
  <td>		<input type="text" ng-model="ctrl.year" style="width:60px;height:25px;"
									class="form-control input-sm" placeholder="AA" required />
			</td></tr></table>
							<!--  	<input type="text" ng-model="ctrl.user.birth_day" style="width:300px;"
									class="form-control input-sm" placeholder="yyyy-MM-dd" required />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.birth_day.$error.required">This is
										a required field</span>
								</div>-->
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
						<div class="col-md-7" style="position:relative;left:35%;">
							<label class="col-md-2 control-lable" for="city" style="width:300px;"><h5>City</h5></label>
							<br>
								<input type="text" ng-model="ctrl.user.city"
									class="form-control input-sm" style="width:300px;"
									placeholder="Enter your city. [This field is validation free]" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
						<div class="col-md-7" style="position:relative;left:35%;">
							<label class="col-md-2 control-lable" for="pw" style="width:300px;"><h5>Password</h5></label>
							<br>
								<input type="password" ng-model="ctrl.user.pw" id="pw" style="width:300px;"
									class="pw form-control input-sm" placeholder="Enter your password"
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
						<div class="form-group col-md-12">
				<label class="col-md-2 control-lable"  style="width:300px;left:390px;"><h5>Select a file to upload:</h5></label>
						
						<div class="col-md-7" style="position:relative;right:-90px;top:50px;">
					
							<input type="file" id="filePicker" style="position:relative;top:35%;"/>
								
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-actions floatRight">
							<input type="submit" ng-click="ctrl.createUser()"
								class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="Sign up">

							<button type="button" ng-click="ctrl.reset()"
								class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
								Form</button>
						</div>


					</div>
					<br />
					<br />



				</form>


			</div>
		</div>
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
	<script
		src="<c:url value='/static/js/controller/login_controller.js' />"></script>
	<script src="<c:url value='/static/js/service/user_service.js' />"></script>
	<script
		src="<c:url value='/static/js/controller/user_controller.js' />"></script>

</body>
</html>