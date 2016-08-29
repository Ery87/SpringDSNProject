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
              <div class="panel-heading"><span class="lead">Registration form </span></div>
              <div class="formcontainer">
                  <form name="myForm"  class="form-horizontal" enctype="multipart/form-data">
              
                   <input type="hidden" ng-model="id" />
                   
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="firstName">First Name</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.user.firstName" name="firstName" class="firstName form-control input-sm" placeholder="Enter your firstName" required ng-minlength="3"/>
                                  <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.firstName.$error.required">This is a required field</span>
                                      <span ng-show="myForm.firstName.$error.minlength">Minimum length required is 3</span>
                                      <span ng-show="myForm.firstName.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="lastName">Last Name</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.user.lastName" name="lastName" class="lastName form-control input-sm" placeholder="Enter your lastName" required ng-minlength="3"/>
                                  <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.lastName.$error.required">This is a required field</span>
                                      <span ng-show="myForm.lastName.$error.minlength">Minimum length required is 3</span>
                                      <span ng-show="myForm.lastName.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="email">Email</label>
                              <div class="col-md-7">
                                  <input type="email" ng-model="ctrl.user.email" id="email" class="email form-control input-sm" placeholder="Enter your Email" required/>
                                  <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.email.$error.required">This is a required field</span>
                                      <span ng-show="myForm.email.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                        <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="birth_day">Birth day</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.user.birth_day" class="form-control input-sm" placeholder="yyyy-MM-dd"  required/>
                             <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.birth_day.$error.required">This is a required field</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                        <div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="city">City</label>
                              <div class="col-md-7">
                                  <input type="text" ng-model="ctrl.user.city" class="form-control input-sm" placeholder="Enter your city. [This field is validation free]"/>
                              </div>
                          </div>
                      </div>
                      
						<div class="row">
                          <div class="form-group col-md-12">
                              <label class="col-md-2 control-lable" for="pw">Password</label>
                              <div class="col-md-7">
                                  <input type="password" ng-model="ctrl.user.pw" id="pw" class="pw form-control input-sm" placeholder="Enter your pw"  required ng-minlength="7"/>
                                  <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.pw.$error.required">This is a required field</span>
                                   <span ng-show="myForm.pw.$error.minlength">Minimum length required is 7</span>
                                   
                                      <span ng-show="myForm.pw.$invalid">This field is invalid </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                     
                      <div class="row">
                          <div class="form-actions floatRight">
                              <input type="submit" ng-click="ctrl.createUser()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
                             
                              <button type="button" ng-click="ctrl.reset()" class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset Form</button>
                          </div>
                   
                   
                      </div>
                 <br/><br/>     
                 
                  
                   
                  </form>
               
                   
              </div>
          </div>
      </div>
      <script src="<c:url value='/static/js/libraries/aes.js' />"></script>
             <script src="<c:url value='/static/js/libraries/enc-base64-min.js' />"></script>
       
       <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
      <script src="<c:url value='/static/js/app.js' />"></script>
      <script src="<c:url value='/static/js/service/login_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/login_controller.js' />"></script>
  	   <script src="<c:url value='/static/js/service/user_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/user_controller.js' />"></script>
  	
  </body>
</html>