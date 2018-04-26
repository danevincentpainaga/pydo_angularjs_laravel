'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:scholarCtrl
 * @description
 * # scholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  app.controller('scholarCtrl',['$scope', '$routeParams','$location', 'appliedData',
   function ($scope, $routeParams, $location, appliedData) {
    
    var sc = this;
    sc.scholars = [];
    sc.scholarTbl = true;

    sc.editScholar = function(id){
      $location.path('/scholar/edit_scholar/'+id);
    }

    sc.goToAddScholar = function(){
      $location.path('/add_scholar');
    }

    appliedData.getActiveScholar().then(function(response){
      sc.loading = true;
      sc.scholarTbl = false;
      sc.scholars = response.data;
      console.log(sc.scholars);
    }, function(err){
      console.log(err);
    })
    

    appliedData.scholarTotal(3).then(function(response){
      console.log(response);
    }, function(err){
      console.log(err);
    })
  }]);

  app.directive('scholarStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.status.toLowerCase();
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

app.factory('appliedData',['$http', function($http){
  return{
    getActiveScholar: function(){
      return $http.get(baseUrl+'getActiveScholar');
    },
    scholarTotal: function(max){
      return $http.get(baseUrl+'scholarCount/'+max);
    },
  }
}]);