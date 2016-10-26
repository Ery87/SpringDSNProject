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
<script
		src="<c:url value='/static/js/libraries/excluded/jquery-2.1.3.min.js' />"></script>
	
<title>Welcome to DSNProject</title>
<style>
/*   .username.ng-valid {
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
      }"*/
a:focus {
	outline: none;
}

#panel {
	background: rgb(245, 245, 245);
	height: 200px;
	display: none;
	color: #324a94;
	padding-left: 20px;
}

.slide {
	margin: 0;
	padding: 0;
	
	/*
	background-image : url("images/sfondo-social.jpg");
	border-top: solid 20px #365886;
	border-radius: 10px;
	-moz-border-radius: 10px; /* firefox */
	/*-webkit-border-radius: 10px; /* safari, chrome */
}

.btn-slide {
	background: #3d71af;
	text-align: center;
	width: 144px;
	height: 33px;
	padding: 8px 10px 0 0;
	margin: 0 auto;
	display: block;
	font: bold 120%/100% Arial, Helvetica, sans-serif;
	color: #fff;
	text-decoration: none;

	/*  border-radius: 10px; 
  -moz-border-radius: 10px; /* firefox */
	/* -webkit-border-radius: 10px; /* safari, chrome */
}

.active {
	background-position: right 12px;
}
</style>


<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>
<link href="<c:url value='/static/css/style.css' />" rel="stylesheet"></link>

</head>
<body ng-app="myApp" class="ng-cloak">



	<div class="generic-container"
		ng-controller="ProfileController as ctrl">

		<div class="container">
			<div id="header">
				<div id="panel"></div>

				<p class="slide">
					<a href="#" class="btn-slide">Friendship Request</a>
				</p>

				<div id="navcontainer">
					<div class="row floatRight">
						<div class="form-group col-md-12 ">
							<input type="hidden" name="id" value="ctrl.user.id">
							<p>
								<input type="submit" ng-click="ctrl.submit()"
									class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid"
									value="search" /> &nbsp;&nbsp;<input type="button"
									ng-click="ctrl.logout()" class="btn btn-primary btn-sm"
									ng-disabled="myForm.$invalid" value="logout" />
							</p>


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

					</table>


				</div>
			</div>

		</div>


		<div id="gutter"></div>

		<div id="col1">



			<p>
				<label for="filePicker">Upload your photo:</label> <input
					type="file" id="filePicker">
			</p>
			<p>
				<label>MetaTag : </label>
			</p>
			<p>
				<input type="text" ng-model="ctrl.tag" name="tag"
					class="metaTag form-control input-sm"
					placeholder="Write your metaTag require min 3 letters" required ng-minlength="3"
					ng-required="string" />
			</p>
			<p>
				<label>Access's Rule: </label>
			</p>
			<p>
				<input type="number" ng-model="ctrl.rule" name="rule"
					class="rule form-control input-sm"
					placeholder="Write your access rule" min="1" max="7" step="1" />
			</p>

			<p>
				<label>PassPhrase</label>
			</p>
			<p>
				<input type="password" ng-model="ctrl.passPhrase" name="passPhrase"
					class="passPhraseform-control input-sm"
					placeholder="Write your passPhrase" required ng-minlength="3" />
			</p>

			<p>
				<button id="upload" type="submit" ng-click="ctrl.uploadPhotoRule()"
					class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" />
				Upload Photo
				</button>
			</p>



			<div>
				<ul>
					Access's Rules
					<li>1: only friends</li>
					<li>2: friends of friends</li>
					<li>3: friends of friends of friends</li>
					<li>ecc..</li>
					<li>up to the degree of relation 7</li>
				</ul>
			</div>


			<h3>{{ctrl.title}}</h3>
			<h4>{{ctrl.message}}</h4>


			<tr ng-repeat="u in ctrl.users">
				<a
					ng-href="/OSN/userView/{{ctrl.id}}/{{u.id}}?{{u.firstName}}{{u.lastName}}"><span
					ng-bind="u.lastName"></a>
				<span ng-bind="u.firstName"></span>

				<span ng-bind="u.city"></span>
			</tr>
		</div>
		<div id="col2">
			<h3>Photo Gallery</h3>

			<div id="gallery">





				<div class="clear"></div>
			</div>
		</div>
		<div id="footer"></div>

	</div>











	<script
		src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
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
	<script src="<c:url value='/static/js/service/profile_service.js' />"></script>
	<script
		src="<c:url value='/static/js/controller/profile_controller.js' />"></script>

</body>
</html>