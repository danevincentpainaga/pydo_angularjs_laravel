'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:registerCtrl
 * @description
 * # registerCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('registerCtrl', ['$scope', '$rootScope', '$location', '$http', 
  '$routeParams', '$ngConfirm','$filter', '$timeout', 'registerService',
  function ($scope, $rootScope, $location, $http, $routeParams, $ngConfirm, $filter, $timeout, registerService) {

  var rs = this;
  rs.failed = true;
  rs.success = true;
  rs.registerStudent = function(){
 	console.log(rs.info);
 	register(rs.info);
  }

  function register(data){
    registerService.registerStudent(data).then(function(response){
      console.log(response);
      if (response.data == '404') {
      	rs.failed = false;
      }else{
      	rs.success = false;
      	rs.failed = true;
      }
    }, function(err){
      console.log(err);

    });
  }


}]);

app.factory('registerService',['$http', function($http){
  return{
    registerStudent: function(studentData){
      return $http({
        method:'POST',
        url: baseUrl+'registerStudent',
        data: studentData,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    },

  }
}]);

