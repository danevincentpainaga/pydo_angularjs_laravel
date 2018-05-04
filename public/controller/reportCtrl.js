'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:scholarCtrl
 * @description
 * # scholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  app.controller('reportCtrl',['$scope', '$rootScope', '$routeParams','$location', '$timeout', '$window', 'reportService',
  function ($scope, $rootScope, $routeParams, $location, $interval, $window, reportService) {

  var vr = this;
  vr.reportData;

  getMunicipalities();

  vr.filterMunicipality = function(municipalData){
    scholarReport(municipalData.town_id);
  }

  function scholarReport(municipalId){
    reportService.getScholarReport(municipalId).then(function(response){
      vr.reportData = response.data;
      console.log(response);
    }, function(err){
      console.log(err);
    })
  }

  function getMunicipalities(){
    reportService.fetchTowns().then(function(response){
      vr.municipalities = response.data;
    }, function(err){
      console.log(err);
    });
  }


  }]);

app.factory('reportService',['$http', function($http){
  return{
    getScholarReport: function(mid){
      return $http.get(baseUrl+'getScholarReports/'+mid);
    },
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
  }
}]);