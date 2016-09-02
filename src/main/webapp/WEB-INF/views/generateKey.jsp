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
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
      
     <script src="<c:url value='/static/js/libraries/jsbn.js'/>"></script>
     <script  src="<c:url value='/static/js/libraries/random.js'/>"></script>
     <script src="<c:url value='/static/js/libraries/hash.js'/>"></script> 
   	 <script src="<c:url value='/static/js/libraries/rsa.js'/>"></script>
   	 <script src="<c:url value='/static/js/libraries/aes.js' />"></script>
   	<script src="<c:url value='/static/js/libraries/api.js'/>"></script>
  
  </head>
  <body ng-app="myApp" class="ng-cloak">
 
      <div class="generic-container" ng-controller="GenerateController as ctrl">
        <h1 style="text-align:center;">Welcome to DSNProject!</h1>
          <div class="panel panel-default">
              <div class="panel-heading"><span class="lead">To generate the key pairs to enter your Passphrase </span></div>
                <form  name="myForm" class="form-horizontal">
                      
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="Passphrase">Passphrase</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.Passphrase" id="Passphrase" class="Passphrase form-control input-sm" placeholder="Write your Passphrase" required/>
                                  
                              </div>
                          </div>
                      </div>
                      
                      <div class="row">
                          <div class="form-actions floatRight">
                              <input type="submit" ng-click="ctrl.generateKey()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
                        <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
                          </div>
                   
                   
                      </div>
                      </form>
              </div>
            
              
          </div>
        
      <script src="<c:url value='/static/js/app.js' />"></script>
      <script src="<c:url value='/static/js/service/user_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/generate_controller.js' />"></script>
  </body>
</html>