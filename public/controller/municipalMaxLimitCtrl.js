'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:AboutCtrl
 * @description
 * # subjectCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('municipalMaxLimitCtrl',['$rootScope', '$http', '$timeout', '$location', 
  '$window', '$ngConfirm', 'maxLimitService', 
  function ($rootScope, $http, $timeout, $location, $window,$ngConfirm, maxLimitService ) {

  var ml = this;

  ml.updateMaxValue = function(){
    var newMaxLimit = [
    {townName: ml.anniy },
    {townName: ml.dao },
    {townName: ml.hamtic},
    {townName: ml.sanjose},
    {townName: ml.sibalom},
    {townName: ml.belison},
    {townName: ml.patnongon},
    {townName: ml.bugasong},
    {townName: ml.lauan},
    {townName: ml.barbaza},
    {townName: ml.tibiao},
    {townName: ml.culasi},
    {townName: ml.sebaste},
    {townName: ml.pandan},
    {townName: ml.libertad},
    {townName: ml.caluya} 
    ];

    // var newMaxLimit = {
    // Aniniy: ml.anniy,
    // Dao: ml.dao,
    // Hamtic: ml.hamtic,
    // ['San Jose']: ml.sanjose,
    // Sibalom: ml.sibalom,
    // Belison: ml.belison,
    // Patnongon: ml.patnongon,
    // Bugasong: ml.bugasong,
    // Lauan: ml. lauan,
    // Barbaza: ml.barbaza,
    // Tibiao: ml.tibiao,
    // Culasi: ml.culasi,
    // Sebaste: ml.sebaste,
    // Pandan: ml.pandan,
    // Libertad:ml.libertad,
    // Caluya: ml.caluya 
    // };
    updateMaxValues(newMaxLimit);
  }

  maxLimitService.getMunicipal().then(function(response){
    displayMaxValue(response.data);
  }, function(err){
    console.log(err);
  });

  function updateMaxValues(maxVal){
    maxLimitService.updateMax(maxVal).then(function(response){
      successNotification();
      console.log(response);
    }, function(err){
      console.log(err);
    });
  }

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

  function successNotification(){
    $ngConfirm({
        icon:'fa fa-check-circle',
        backgroundDismiss: false,
        backgroundDismissAnimation: 'shake',
        title: 'Values updated',
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

app.factory('maxLimitService', function($http){
    return {
      getMunicipal: function(){
      	return $http.get(baseUrl+'getAllExtactedTowns');
      },
      updateMax: function(newMaxValue){
        return $http({
          method:'POST',
          url: baseUrl+'updateMaxLimit',
          data: newMaxValue,
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
      },
    }
});