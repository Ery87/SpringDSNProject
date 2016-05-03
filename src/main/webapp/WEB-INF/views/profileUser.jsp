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
   <div class="generic-container" ng-controller="ProfileController as ctrl">
          <div class="panel panel-default">
              <div class="panel-heading"><span class="lead">DSNProject Welcome! </span>
              
              	<div class="row floatRight" >
                <div class="form-group col-md-12 ">
                <form name="form"  class="form-horizontal" >
 					 <input type="hidden" name="id" value="ctrl.user.id">
 					 <table>
 					 <tr>
 					 <td> <input type="text" ng-model="ctrl.friend" name="friend" class="friend form-control input-sm" placeholder="friend or image (#)"/></td>
 					 <td><input type="submit" ng-click="ctrl.searchFriend()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="search"/>
</td>
 					 </tr>
 					 
 					 </table>
 					 
					</form>	
					</div>
					</div>
             
                <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading"><span class="lead"> </span></div>
              <div class="tablecontainer">
                  <table class="table table-hover">
                      <thead>
                          <tr>
                          	<th></th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Birth day</th>
                              <th>City</th>
                              <th width="20%"></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                          		<td><img ng-src="ctrl.image"></td>
                              <td><span ng-bind="ctrl.user.firstName"></span></td>
                              <td><span ng-bind="ctrl.user.lastName"></span></td>
                              <td><span ng-bind="ctrl.user.birth_day"></span></td>
                              <td><span ng-bind="ctrl.user.city"></span></td>
                              <td>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
            
             <h3>{{ctrl.title}}</h3>
             <h4>{{ctrl.message}}</h4>
                  <table class="table table-hover">
                     
                      <tbody>
						  
                          <tr ng-repeat="u in ctrl.users">
                              <td></td>
                              <td><span ng-bind="u.firstName"></span></td>
                              <td><span ng-bind="u.lastName"></span></td>
                              <td><span ng-bind="u.city"></span></td>
                             
                          </tr>
                      </tbody>
                  </table>
                  
                   <table class="table table-hover">
                     
                      <tbody>
						  
                          <tr ng-repeat="u in ctrl.tagImage">
                              <td></td>
                              <td><span ng-bind="u.metaTag"></span></td>
     
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
                
      
          </div>
      </div>
      

    
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
      <script src="<c:url value='/static/js/app.js' />"></script>
      <script src="<c:url value='/static/js/service/login_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/login_controller.js' />"></script>
  	   <script src="<c:url value='/static/js/service/profile_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/profile_controller.js' />"></script>
  	
  </body>
</html>