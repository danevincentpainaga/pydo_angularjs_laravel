'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('addscholarCtrl', ['$scope', 'pendingScholar', '$http', '$timeout',
   function ($scope, pendingScholar, $http, $timeout) {
    var as = this;

    as.scholar = false;
    as.addedScholarTbl = true;
    as.addedScholar = [];

    getScholar();
    getMunicipalities();

    as.deleteUser = function(id){
        var userId = $scope.scholars.indexOf(id);
        $scope.scholars.splice(userId, 1);
    }

    as.showInput = function(){
        $scope.hides === false? $scope.hides = true : $scope.hides = false;
    }

    as.addToScholar = function(scholarData){
      as.appliedScholars.splice(as.appliedScholars.indexOf(scholarData), 1)
      as.addedScholar.push(scholarData);
      console.log(as.addedScholar);
    }

    as.deletePending = function(pendingData){
      as.appliedScholars.push(pendingData);
      as.addedScholar.splice(as.addedScholar.indexOf(pendingData), 1)
      console.log(pendingData);
    }

    as.saveScholar = function(){
      var idsToUpdate = getId(as.addedScholar)
      console.log(idsToUpdate);
      pendingScholar.updatePendingScholars(idsToUpdate).then(function(response){
        console.log(response);
        as.addedScholar = [];
      }, function(err){
        console.log(err);
      });
    }

    as.cancel = function(){
      as.addedScholarTbl = true;
      as.addedScholar = [];
      getScholar()

    }

    as.townData = function(data){
      as.loading = false;
      as.addedScholarTbl = true;
      pendingScholar.getMunicipalScholars(data.town_id).then(function(response){
        as.loading = true;
        as.addedScholarTbl = false;
        as.appliedScholars = response.data;
      }, function(err){
        console.log(err);
        as.loading = true;
        as.appliedScholars = [];
      });
      console.log(data.town_id);
    }

    function getScholar(){
      pendingScholar.getPendingScholar().then(function(response){
        console.log(response);
        as.loading = false;
        $timeout(function(){
          as.appliedScholars = response.data;
          as.loading = true;
          as.addedScholarTbl = false;
        },500);
      });
    }
    
    function getId(data){
      var pendingScholarId = [];
      angular.forEach(data, function(val, i){
        pendingScholarId.push(val.student_id)
      });
      return pendingScholarId;
    }

    function getMunicipalities(){
      pendingScholar.fetchTowns().then(function(response){
        as.towns = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

  }]);

  app.directive('colorStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.stat.toLowerCase();
            if(stats===1){
              elem.addClass('active');
            }
            else if(stats==='inactive'){
              elem.addClass('inactive');
            }
        }
      };
   });

  app.factory('pendingScholar',function($http){
    return{
      getPendingScholar: function(){
        return $http.get(baseUrl+'getPendingScholar');
      },
      updatePendingScholars: function(newStatus){
          return $http({
            method:'POST',
            url: baseUrl+'updatePendingScholars',
            data: newStatus,
              headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
          });
      },
      fetchTowns: function(){
        return $http.get(baseUrl+'getAllTowns');
      },
      getMunicipalScholars: function(id){
        return $http.get(baseUrl+'getMunicipalScholars/'+id);
      },
    }
  });
