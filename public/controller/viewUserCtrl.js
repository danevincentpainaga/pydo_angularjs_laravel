'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('viewUserCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', 
  '$ngConfirm','$filter', '$timeout', '$window','getUsersInfoService', 
  function ($scope, $rootScope, $location, $http, $routeParams, 
  $ngConfirm, $filter, $timeout, $window, getUsersInfoService) {


var view = this;

getUserInfo($routeParams.userid);
console.log($routeParams.userid);

function getUserInfo(uid){
  getUsersInfoService.getUserInfoId(uid).then(function(response){
  displayInfo(response.data);
  console.log(response);
  }, function(err){
    console.log(err);
  });
}

function displayInfo(info){
  view.firstname = info[0].firstname;
  view.lastname = info[0].lastname;
  view.username = info[0].username;
  view.position = info[0].position_level;
  view.contact_no = info[0].contact_no;
  view.gender = info[0].gender;
  view.municipality = info[0].town_name;
  view.accessType = info[0].access_type;
  view.status = info[0].status;
}

}]);


//Services
app.factory('getUsersInfoService', function($http){
  return{
    getUserInfoId: function(uid){
      return $http.get(baseUrl+'getUserInformation/'+uid);
    },
  }
});
