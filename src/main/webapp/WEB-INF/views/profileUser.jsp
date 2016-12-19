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
html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif}

a:focus {
	outline: none;
	
}
a{
color:#009688;
}
#panel {
	background: rgb(245, 245, 245);
	height: 200px;
	display: none;
	color: #009688;
	padding-left: 20px;
	font-size: 40px;
}

.slide {
	margin: 0;
	padding: 0;


	
}
button {
background: #009688;
}
.btn-slide {

	/*background:  #009688;*/
	text-align: center;
	width: 400px;
	height: 40px;
	padding: 8px 10px 0 0;
	margin: 0 auto;
	display: block;
	font: bold 200%/100% Arial, Helvetica, sans-serif;
	color: #009688;
	text-decoration: none;

	/*  border-radius: 10px; 
  -moz-border-radius: 10px; /* firefox */
	/* -webkit-border-radius: 10px; /* safari, chrome */
}

 td{
 padding:"10";
 }
.active {
	background-position: right 12px;
}

#showPhoto{
position:relative;

bottom:100px;
left:300px; 
width:400px; 
height:300px;
}
</style>

<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>

<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<body class="w3-light-grey" ng-app="myApp" >



	<div class="w3-content w3-margin-top" style="max-width:1400px;" ng-controller="ProfileController as ctrl">

		<div class="w3-row-padding">
		
			<div id="header">
				
			

		<!-- Left Column -->
   			 <div class="w3-third">
    		 <div class="w3-white w3-text-grey w3-card-4">
        			<div class="w3-display-container">
     				<div id="foo"></div>
				

				
						<div class="w3-display-bottomleft w3-container w3-text-black">
           			<!--  <h2><span ng-bind="ctrl.user.firstname"></span>&nbsp;&nbsp;<span
										ng-bind="ctrl.user.lastname"></span></h2>-->
        				  </div>
       						 </div>
		<br>				
		 <div class="w3-container">
		  <p><h2><span ng-bind="ctrl.user.firstname"></span>&nbsp;&nbsp;<span ng-bind="ctrl.user.lastname"></span></h2></p>
          <p><i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.birth_day"></span></p>
          <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.city"></span></p>
          <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.email"></span></p>
          <hr>

          <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Upload your photo</b></p>
          	<form  name="myForm"class="form-horizontal">
          	<table id="photoGallery" >
          	<tr>
          <td><label type="text">Photo </label></td>
				</tr>	
				<tr>
					<td><input type="file" id="filePicker"></td>
				</tr>
				<tr>
					<td><label>MetaTag  </label></td>
				</tr>
				<tr>	
					<td><input type="text" ng-model="ctrl.tag" name="tag"
						class="metaTag form-control input-sm"
						placeholder="Write your metaTag require min 3 letters" required
						ng-minlength="3" ng-required="string" /></td>
				</tr>
				<tr>
					<td><label><nobr>Access's Rule </nobr></label></td>
				</tr>
				<tr>	
					<td><input type="number" ng-model="ctrl.rule" name="rule"
						class="rule form-control input-sm"
						placeholder="Write rule" min="1" max="7" step="1" style="width: 150px;"/>
					</td>
					</tr>
					<tr>
					<td><label>PassPhrase </label></td>
					</tr>
					<tr>
					<td><input type="password" ng-model="ctrl.passPhrase"
						name="passPhrase" class="passPhraseform-control input-sm"
						placeholder="Write your passPhrase" required ng-minlength="3" />
					</td>
				</tr>
				<tr>
					<td colspan="4">
						<input type="button" id="upload"  ng-click="ctrl.uploadPhotoRule()"  value="Upload Photo" /> 
				
				

					</td>

				</tr>
			</table>
          </form>
        
       
          <br>
          
         <p class="w3-large w3-text-theme"><b><i class="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>Access's Rules</b></p>
          <p><ul>
					
					<li >1: only friends</li>
					<li>2: friends of friends</li>
					<li>3: friends of friends of friends</li>
					<li>ecc..</li>
					<li>up to the degree of relation 7</li>
				</ul></p>
          </div> 
          <br>
        </div>
      </div><br>
       <!-- End Left Column -->
    </div>

    <!-- Right Column -->
    <div class="w3-twothird">
     <div class="w3-container w3-card-2 w3-white w3-margin-bottom">
      <div id="panel"></div>

				<p class="slide">
					<a href="#" class="btn-slide">Friendship Request</a>
				</p>
      
      
      
        <div class="w3-container">
        	<form  name="myForm"class="form-horizontal">
          				<input type="hidden" name="id" value="ctrl.user.id">
							<p align="right">
								<!--  <input type="submit" ng-click="ctrl.submit()"
									 ng-disabled="myForm.$invalid"
									value="search" /> &nbsp;&nbsp;-->
									<input type="button" ng-click="ctrl.logout()"  value="logout" />
							</p>

	</form>

					
          <hr>
        </div>
      
      	<span class="lead">Search user: </span>
      	<form  name="myForm"class="form-horizontal">
      	<input type="text" ng-model="ctrl.friend" id="friend" class="friend form-control input-sm"	placeholder="Search your friend" required />
		<div class="has-error" ng-show="myForm.$dirty">
				<span ng-show="myForm.email.$error.required">This is a
					required field</span> <span ng-show="myForm.email.$invalid">This
					field is invalid </span>
				</div>		
				<br> <br>		
			<input type="button" ng-click="ctrl.searchFriend()" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="search"/>
			<input type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine" value="reset"/>
								
								
								
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
						<td><button><a ng-href="/OSN/userView/{{ctrl.user.id}}/{{u.id}}?{{u.firstName}}{{u.lastName}}">Profile</a></button>
					</tr>
				</tbody>
			</table>							
	
      </div>

		
 
			


      <div class="w3-container w3-card-2 w3-white">
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Gallery Photo</h2>
        <div class="w3-container">
         
          <hr>
        </div>
        <div class="w3-container">
          <h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>2013 - 2015</h6>
          <div id="gallery">
		
				
					<br><br>
					<h2>List of metatag:</h2>
					<br>
				<div class="clear"></div>
			</div>
			<div id="showPhoto"></div>
          <hr>
        </div>
        <div class="w3-container">
         
        </div>
      </div>

    <!-- End Right Column -->
    </div>
    
  <!-- End Grid -->
  </div>
  
  <!-- End Page Container -->
</div>

<footer >
  
</footer>





		
		
		 	
	
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