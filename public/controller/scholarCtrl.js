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
    }, function(err){
      console.log(err);
    })
    

  }]);

  app.directive('scholarStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.status;
            if(stats==3){
              elem.addClass('active');
              elem[0].innerHTML = 'active';
            }
            else if(stats==2){
              elem.addClass('pending');
              elem[0].innerHTML = 'pending';
            }
        }
      };
   });

app.factory('appliedData',['$http', function($http){
  return{
    getActiveScholar: function(){
      return $http.get(baseUrl+'getActiveScholar');
    }
  }
}]);