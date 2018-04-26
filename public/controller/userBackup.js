'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('userCtrl',['$scope', '$rootScope', '$location', '$http', '$ngConfirm','$filter', '$timeout', function ($scope, $rootScope, $location, 
 $http, $ngConfirm, $filter, $timeout) {

  $scope.hides = false;
  $scope.currentPage = 0;
  $scope.pageSize =3;

  $http.get('styles/user.json').then(function(response){
          $scope.users = response.data.users;
  });

  $scope.getData = function () {
    return $filter('filter')($scope.users)
  }
  
  $scope.numberOfPages=function(){   
   return Math.ceil($scope.getData().length/$scope.pageSize);
  }

  $scope.deleteAll = function(){
    // need to fix checkbox delete all
    var id = null;
    var title = 'Delete users?';
    confirmDialog(title, id, 'All users will be deleted');
  }

  $scope.deleteUser = function(id){
    var title = 'User will permanently deleted';
    confirmDialog(title, id, 'Are you sure you want to continue?');
  }


  function confirmDialog(message, id, content){
    $ngConfirm({
      theme:'modern',
      title: message,
      content: content,
      type: 'blue',
      typeAnimated: true,
      animation: 'scaleX',
      buttons: {
        Yes: {
          text: 'Yes',
          btnClass: 'btn-blue',
          action: function(){
            deleteUserData(id);
            $ngConfirm('User deleted');
          }
        },
        Cancel: {
          text: 'Cancel',
          btnClass: 'btn-red',
        }
      }
    });
  }

  function deleteUserData(id){
    var userId = $scope.users.indexOf(id);
    $scope.users.splice(userId, 1);
  }

}]);

app.directive('colorStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.stat.toLowerCase();
        if(stats==='active'){
          elem.addClass('active');
        }
        else if(stats==='disabled'){
          elem.addClass('disabled');
        }
        else if(stats==='pending'){
          elem.addClass('pending');
        }
        else if(stats==='inactive'){
          elem.addClass('inactive');
        }
      }
    };
 });


app.filter('startFrom', function() {
  return function(data, start) {
    return data.slice(start);
  };
});
app.filter('filt', function() {
  return function(data, search) {
    var arr = [];
    angular.forEach(data, function(val, i){
      if (val.Firstname == 'Dane') {
       arr.push(val);
      }
    });
    // return arr;
    console.log(arr);
  };
});