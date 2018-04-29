'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:AboutCtrl
 * @description
 * # subjectCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('municipalMaxLimitCtrl',['$rootScope', '$http', '$timeout', '$location', '$window', 'maxLimit', 
  function ($rootScope, $http, $timeout, $location, $window, maxLimit ) {
  var ml = this;

  var log = JSON.parse($window.localStorage.getItem('cookies'));

  if(!log){
    $rootScope.valid = false;
    $rootScope.home = true;
    $location.path('/home');
  }else{
    $rootScope.valid = true;
    $rootScope.home = false;
  }

    maxLimit.getMunicipal().then(function(response){
      displayMaxValue(response.data);
    }, function(err){
      console.log(err);
    });

    function extractData(arrData){
      var newMunicipalArray = [];
      var row ={};
        angular.forEach(arrData, function(val, i){
            row[val.town_name] = val.total_scholar;
        });
      newMunicipalArray.push(row);
      return newMunicipalArray;
    }

    function displayMaxValue(max){
      ml.anniy = max.Aniniy;
      ml.barbaza = max.Barbaza;
      ml.belison = max.Belison;
      ml.bugasong = max.Bugasong;
      ml.caluya = max.Caluya;
      ml.culasi = max.Culasi;
      ml.dao = max.Dao;
      ml.hamtic = max.Hamtic;
      ml.lauan = max.Lauan;
      ml.libertad = max.Libertad;
      ml.pandan = max.Pandan;
      ml.patnongon = max.Patnongon;
      ml.sanjose = max['San Jose'];
      ml.sebaste = max.Sebaste;
      ml.sibalom = max.Sibalom;
      ml.tibiao = max.Tibiao;
    }
  }]);

app.factory('maxLimit', function($http){
    return {
      getMunicipal: function(){
      	return $http.get(baseUrl+'getAllExtactedTowns');
      }
    }
});