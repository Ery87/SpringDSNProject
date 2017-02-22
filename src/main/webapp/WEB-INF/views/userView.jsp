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
<script
	src="<c:url value='/static/js/libraries/bootstrap.min.js' />"></script>

<title>Welcome to DSNProject</title>
<style>
html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif}

#showPhoto{
position:relative;

bottom:100px;
        left:300px; 
        width:400px; 
        height:300px;
}

#foo img{
-moz-border-radius: 280px;
    -webkit-border-radius: 280px;
    border-radius: 280px;
}

#gallery {
float:left;
margin-left:46px;
}		
#img:hover {
	transform:scale(2,2);
	transform-origin:top center;
}
</style>


<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body class="w3-light-grey" ng-app="myApp" >



	<div class="w3-content w3-margin-top" style="max-width:1400px;" ng-controller="UserViewsController as ctrl">
		<div class="w3-row-padding">
		
			<div id="header">
				
			

		<!-- Left Column -->
   			 <div class="w3-third">
    		 <div class="w3-white w3-text-grey w3-card-4">
        			<div class="w3-display-container">
     				<div id="foo" align="center"></div>
				

				
						<div class="w3-display-bottomleft w3-container w3-text-black">
           				
        				  </div>
       						 </div>
		<br>	
		  <br>
          
		<br>
		<br>			
		 <div class="w3-container">
		 <p> <h2><span ng-bind="ctrl.user.firstname"></span>&nbsp;&nbsp;<span ng-bind="ctrl.user.lastname"></span></h2></p>
          <p><i class="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.birth_day"></span></p>
          <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.city"></span></p>
          <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i><span ng-bind="ctrl.user.email"></span></p>
          <hr>

      
          
        
       
          <br>
          
		<br>
		<br>
		     <br>
          
		<br>
		<br>
		  
          <br>
          
		<br>
		<br>
		     <br>
          
		<br>
		<br>
          </div> 
          <br>
        </div>
      </div><br>
       <!-- End Left Column -->
    </div>

    <!-- Right Column -->
    <div class="w3-twothird">
     <div class="w3-container w3-card-2 w3-white w3-margin-bottom">
    
      
        <div class="w3-container">
        <br>
        <br>
          				<input type="hidden" name="id" value="ctrl.user.id">
							<p align="right">
								<input type="button" ng-click="ctrl.back()"
									ng-disabled="myForm.$invalid"
									value="back" />&nbsp;<input type="button" id="requestfriend"
									ng-click="ctrl.friendshipCreation()"
									 disabled="true"
									value="add to friends" />
							</p>


					
          <hr>
        </div>
      
      
		
      </div>

		
 
			



      <div class="w3-container w3-card-2 w3-white">
        <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>Photo Gallery</h2>
        <div class="w3-container">
         
          <hr>
        </div>
        <div class="w3-container">
        <div id="menu_gallery" style="overflow-y: scroll;float:left; display:block; width:300px; height:490px; background-color:#009688;">
        	<h3 style="color: white; text-align: center; font-style: oblique;">List of Meta tag</h3>
						<br><br>
	
					<br>
			<div id="gallery">	
			
				
			</div>
        
        </div>
        <div id="container_photo" style="float:left; display:block; width:500px; height:490px; background-color:#FFFFFF;">
      
        <div id="showPhoto" style="position:relative;top:50px;left:50px;">
			<img id="img" src=""></img>
			</div>
        </div>
        
      
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
	<script src="<c:url value='/static/js/libraries/bootbox.min.js'/>"></script>

 
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