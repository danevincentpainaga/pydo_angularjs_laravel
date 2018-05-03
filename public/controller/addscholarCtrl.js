'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('addscholarCtrl', ['$scope', '$rootScope', 'pendingScholar', '$http', '$location', 
  '$timeout', '$ngConfirm', '$window',
   function ($scope, $rootScope, pendingScholar, $http, $location, $timeout, $ngConfirm, $window) {

    var as = this;

    as.scholar = false;
    as.addedScholarTbl = true;
    as.addedScholar = [];

    getScholar($rootScope.municipal_id);
    getMunicipalities();
    console.log($rootScope.municipal_id);


    as.printForm = function(){
      $timeout(function(){
        var printDiv = document.getElementById('Form');
        window.print(printDiv);
      },500);
    }

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
      if(idsToUpdate.length > 0 ){
      pendingScholar.updatePendingScholars(idsToUpdate).then(function(response){
        successNotification();
        as.addedScholar = [];
      }, function(err){
        console.log(err);
      });
      }
      else{
        failedNotification();
      }
    }

    as.cancel = function(){
      as.addedScholarTbl = true;
      as.addedScholar = [];
      console.log($rootScope.municipal_id);
      getScholar($rootScope.municipal_id);

    }

    as.deleteScholar =function(appliedData){
      var appData = { appliedDataId: appliedData.applied_scholar_id };
      pendingScholar.removePendingScholars(appData).then(function(response){
        as.appliedScholars.splice(as.appliedScholars.indexOf(appliedData), 1);
        as.municipalTotal = as.municipalTotal -1;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    as.townData = function(data){
      as.loading = false;
      as.addedScholarTbl = true;
      pendingScholar.getMunicipalScholars(data.town_id).then(function(response){
        as.loading = true;
        as.addedScholarTbl = false;
        as.appliedScholars = response.data;
        as.municipalTotal = response.data.length;
      }, function(err){
        console.log(err);
        as.loading = true;
        as.appliedScholars = [];
      });
    }

    as.saveToScholars = function(uname, pword){
      console.log(uname+''+pword);
    }

    function getScholar(municipalId){
      pendingScholar.getPendingScholar(municipalId).then(function(response){
        as.loading = false;
        as.municipalTotal = response.data.length;
        console.log(response);
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
        pendingScholarId.push(val.applied_scholar_id)
      });
      return pendingScholarId;
    }

    function getMunicipalities(){
      pendingScholar.fetchTowns().then(function(response){
        as.towns = response.data;
      }, function(err){
        console.log(err);
      });
    }

  function failedNotification(){
    $ngConfirm({
        icon: 'fa fa-warning',
        backgroundDismiss: false,
        backgroundDismissAnimation: 'shake',
        title: 'failed! No added data',
        theme:'modern',
        content:'',
        type: 'red',
        buttons: {
          OK: {
              text: 'OK',
              btnClass: 'btn-red'
            }
          }
    });
  }

  function successNotification(){
    $ngConfirm({
        icon:'fa fa-check-circle',
        backgroundDismiss: false,
        backgroundDismissAnimation: 'shake',
        title: 'Successfully Added',
        theme:'modern',
        content:'',
        type: 'green',
        buttons: {
          OK: {
              text: 'OK',
              btnClass: 'btn-green'
            }
          }
    });
  }
  }]);

  app.directive('colorStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.status;
          if(stats==3){
            elem.addClass('actives');
            elem[0].innerHTML = 'active';
          }
          else if(stats==2){
            elem.addClass('pending');
            elem[0].innerHTML = 'pending';
          }
      }
    }
   });


  app.factory('pendingScholar',function($http){
    return{
      getPendingScholar: function(mid){
        return $http.get(baseUrl+'getPendingScholar/'+mid);
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
      removePendingScholars: function(removeData){
          return $http({
            method:'POST',
            url: baseUrl+'removePendingScholars',
            data: removeData,
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
