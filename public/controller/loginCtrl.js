'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:scholarCtrl
 * @description
 * # scholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  app.controller('loginCtrl',['$scope', '$routeParams','$cookies','$window', '$location', 'validateUserLogin',
  function ($scope, $routeParams, $cookies, $window, $location, validateUserLogin) {
    
  var lg = this;

  lg.loginBtn = function(){
  	var credentials = { username: lg.username, password: lg.password };
  	validate(credentials);
    // var cookieData = {username: lg.username, password: lg.password, userRole: 2 };
    // $window.localStorage.setItem('cookies', JSON.stringify(cookieData));
    // $location.path('/');
  }

  function validate(credentialsData){
  validateUserLogin.validateLogin(credentialsData).then(function(response){
  	if(response.data.length > 0){
	    console.log(response.data);
	    $window.localStorage.setItem('cookies', JSON.stringify(response.data));
	    $location.path('/');
	}else{
		alert('username/password incorrect');
	}
    }, function(err){
      console.log(err);
  });
}
}]);

//Services
app.factory('validateUserLogin', ['$http', function($http){
  return{
    validateLogin: function(credData){
      return $http({
        method:'POST',
        url: baseUrl+'loginValidations',
        data: credData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    }
  }
}]);


