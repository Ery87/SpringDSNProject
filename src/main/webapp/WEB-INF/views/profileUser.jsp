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
              <div class="panel-heading"><span class="lead">Welcome <span ng-bind="ctrl.user.firstName"></span>&nbsp<span ng-bind="ctrl.user.lastName"> </span>
              
              	<div class="row floatRight" >
                <div class="form-group col-md-12 ">
                <form name="form"  class="form-horizontal" >
 					 <input type="hidden" name="id" value="ctrl.user.id">
 					 <table>
 					 <tr>
 					 <td> <input type="text" ng-model="ctrl.friend" name="friend" class="friend form-control input-sm" placeholder="friend or image (#)"/></td>
 					 <td>&nbsp&nbsp&nbsp<input type="submit" ng-click="ctrl.submit()"  class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="search"/></td>
 				
 					 <td>&nbsp&nbsp&nbsp<input type="button" ng-click="ctrl.logout()" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="logout"/></td>
 					 </tr>
 					 
 					 </table>
 					 
					</form>	
					</div>
					
					</div>
             	
           
                <div class="panel panel-default">
                <!-- Default panel contents -->
              <div class="panel-heading"><span class="lead"> </span></div>
               <div class="row floatRight">
              
             </div>   
              <div class="tablecontainer">
              
                  <table class="table table-hover">
                      <thead>
                          <tr>
                          	<th></th>
				               <th>Birth day</th>
                              <th>City</th>
                              <th></th>
                              <th></th>
                              <th></th>
                             
                             <th>MetaTag</th>
                          </tr>
                      </thead>
                      <tbody>
                         <tr>
                        
                      
                       
                <td><div id="foo"></div></td>         
				 <td><span ng-bind="ctrl.user.birth_day"></span></td>
                 <td><span ng-bind="ctrl.user.city"></span></td>	
                 <td></td>
                 <td></td>
                 <td></td>
                 
                 <td>
                 <ul ng-repeat="m in ctrl.metaTag">
              <li><span ng-bind="m.metaTag"></span></li></ul></td>
              		
				     </tr>
				     
                      </tbody>
                      
                      
                      
              
                  </table>
                  
             
              </div>
              

               
            
            
              </div>
              <div class="row">
      <div class="form-group col-md-12">
             <table>
              <form name="form"  class="form-horizontal" >
          <tr>    
         <td> <label for="filePicker">Choose or drag a photo:</label></td>
         </tr>
         <tr>
                  <td><input type="file" id="filePicker"> </td>
    <td><input type="text" ng-model="ctrl.rule" name="rule" class="rule form-control input-sm" placeholder="Write your access rule" required ng-minlength="3"/></td>   
        <td>&nbsp&nbsp&nbsp<input type="submit" ng-click="ctrl.uploadPhoto()" class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid" value="Upload Photo"/></td>
    </tr>
    
         
               </form>
               </table>
               </div>
             <h3>{{ctrl.title}}</h3>
             <h4>{{ctrl.message}}</h4>
                  <table class="table table-hover">
                     
                      <tbody>
						  
                          <tr ng-repeat="u in ctrl.users">
                              <td><a ng-href="/Spring4MVCAngularJSExample/user/{{u.id}}"><span ng-bind="u.lastName"></a></td>
                             <td> <span ng-bind="u.firstName"></span></td>
                              
                              <td><span ng-bind="u.city"></span></td>
                             
                          </tr>
                      </tbody>
                  </table>
                  
                   <table class="table table-hover">
                     
                      <tbody>
						  
                          <tr ng-repeat="u in ctrl.tagImage">
                              <td><span ng-bind="u.metaTag"></span></td>
     
                          </tr>
                      </tbody>
                  </table>
              </div>
              </div>
                
      
          </div>
      </div>
      
 <script src="<c:url value='/static/js/libraries/aes.js' />"></script>
             <script src="<c:url value='/static/js/libraries/enc-base64-min.js' />"></script>
                   <script src="<c:url value='/static/js/libraries/keypair.js' />"></script>
      
    
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.js"></script>
      <script src="<c:url value='/static/js/app.js' />"></script>
      <script src="<c:url value='/static/js/service/login_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/login_controller.js' />"></script>
  	   <script src="<c:url value='/static/js/service/profile_service.js' />"></script>
      <script src="<c:url value='/static/js/controller/profile_controller.js' />"></script>
  	
  </body>
</html>