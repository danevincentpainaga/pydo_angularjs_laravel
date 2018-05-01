'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:homeCtrl
 * @description
 * # homeCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('homeCtrl', ['$scope', '$location', '$http', '$timeout', '$window', 'validateStudentLoginService',
  function ($scope, $location, $http, $timeout, $window, validateStudentLoginService) {

  var hc = this;
  hc.failed = true;
  hc.studentLogin = function(){
  	validate(hc.student);
  }

	hc.printForm = function(){
	  $timeout(function(){
	    var printDiv = document.getElementById('Form');
	    window.print(printDiv);
	  },500);
	}


function validate(credentialsData){
	validateStudentLoginService.validateStudentLogin(credentialsData).then(function(response){
	  	if(response.data.length > 0){
		    console.log(response.data);
		    $window.localStorage.setItem('cookies', JSON.stringify(response.data));
		    $location.path('/home/profile');
		}else{
			hc.failed = false;
			$timeout(function(){
				hc.failed = true;
			},2500);
		}
	}, function(err){
	  console.log(err);
	});
}
}]);

//Services
app.factory('validateStudentLoginService', ['$http', function($http){
  return{
    validateStudentLogin: function(credData){
      return $http({
        method:'POST',
        url: baseUrl+'validateStudentLogin',
        data: credData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    }
  }
}]);
