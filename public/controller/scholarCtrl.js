'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:scholarCtrl
 * @description
 * # scholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  app.controller('scholarCtrl',['$scope', '$rootScope', '$routeParams','$location', '$window', 'appliedData',
   function ($scope, $rootScope, $routeParams, $location, $window, appliedData) {

    var sc = this;
    sc.scholars = [];
    sc.scholarTbl = true;

    validScholars($rootScope.municipal_id);

    sc.editScholar = function(id){
      $location.path('/scholar/edit_scholar/'+id);
    }

    sc.goToAddScholar = function(){
      $location.path('/add_scholar');
    }

    function validScholars(municipalId){
      appliedData.getActiveScholar(municipalId).then(function(response){
        sc.loading = true;
        sc.scholarTbl = false;
        sc.scholars = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      })
    }
    

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
            else if(stats==4){
              elem.addClass('inactive');
              elem[0].innerHTML = 'Not Renewed';
            }
        }
      };
   });

app.factory('appliedData',['$http', function($http){
  return{
    getActiveScholar: function(mid){
      return $http.get(baseUrl+'getActiveScholar/'+mid);
    }
  }
}]);