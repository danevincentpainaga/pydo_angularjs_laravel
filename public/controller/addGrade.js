'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('userCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', '$ngConfirm','$filter', '$timeout',  function ($scope, $rootScope, $location, 
  $http, $routeParams, $ngConfirm, $filter, $timeout) {

  var sg = this;

  sg.addGrades = function(){
    console.log(selectedSubject);
  }
}]);

