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
    
  //  var log = JSON.parse($window.localStorage.getItem('cookies'));

  // if(!log){
  //   $rootScope.valid = false;
  //   $rootScope.home = true;
  //   $location.path('/home');
  // }else{
  //   $rootScope.valid = true;
  //   $rootScope.home = false;
  // }

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
            else if(stats==2){
              elem.addClass('pending');
              elem[0].innerHTML = 'pending';
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