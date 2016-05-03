<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
     <link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>
      
  </head>
  <body ng-app="myApp" class="ng-cloak">
   <div class="generic-container" ng-controller="UserController as ctrl">
          <div class="panel panel-default">
              <div class="panel-heading"><span class="lead">Upload Photo </span></div>
              <div class="formcontainer">
                  <form name="myForm"  class="form-horizontal" enctype="multipart/form-data">
              
                           <script type="text/javascript">
         
        </script>
                 
                     <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="photo">Photo</label>
                              <div class="col-md-7">  
                                               
                                 <input type="file" file-model="myFile"  class="photo form-control input-sm" placeholder="Enter your photo" />
 							 <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.myFile.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
						
                      <div class="row">
                          <div class="form-actions floatRight">
                              <input type="submit" ng-click="ctrl.uploadPhoto()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
                             
                              <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
                          </div>
                   
                   
                      </div>
                  
                  
            
                  </form>
           
          </div>
      </div>
      

    
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
      <script src="<c:url value='/static/js/app.js' />"></script>
      <script src="<c:url value='/static/js/service/login_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/login_controller.js' />"></script>
  	   <script src="<c:url value='/static/js/service/user_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/user_controller.js' />"></script>
  	
  </body>
</html>