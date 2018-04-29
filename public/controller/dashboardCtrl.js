'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the mytodoApp
 */
// angular.module('mytodoApp')
//   .controller('formCtrl', function ($scope) {

    // $scope.firstname = "Dane Vincent Painaga";
// $(function () {
  var myapp = angular.module('mytodoApp');

  myapp.controller('dashboardCtrl',['$scope', '$rootScope', '$http', '$window', '$location', 'getTowns',
   function ($scope, $rootScope, $http, $window, $location, getTowns) {

    $scope.townArray = [];
    $scope.townTotalArray = [];

    // $scope.printForm = function(){
    //   var printDiv = document.getElementById('Form');
    //   window.print(printDiv);
    // }
  // console.log(JSON.parse($window.localStorage.getItem('cookies')));
  // var log = JSON.parse($window.localStorage.getItem('cookies'));

  // if(!log){
  //   $rootScope.valid = false;
  //   $rootScope.home = true;
  //   $location.path('/home');
  // }else{
  //   if(log[0].userAccessId === 1){
  //       $rootScope.home = false;
  //       $rootScope.valid = true;
  //       $rootScope.admin = true;
  //       $rootScope.superAdmin =true;
  //       $rootScope.dashboard = true;
  //       $rootScope.municipal_id = log[0].townId;
  //   }
  //   else if(log[0].userAccessId === 2){
  //       $rootScope.admin = false;
  //       $rootScope.superAdmin =false;
  //       $rootScope.home = false;
  //       $rootScope.valid = true;  
  //       $rootScope.municipal_id = log[0].townId;
  //   }
  // }

  $scope.$on('user', function(event, obj){
    var data = angular.forEach(obj.userData, function(val, i){
      if(i === obj.id){
        $scope.name = val.Firstname;
      }
    });
  });
    
  getTowns.fetchTowns().then(function(response){
    extractTowns(response.data);
    $scope.townNames = response.data;
  }, function(err){
    console.log(err);
  });

  $scope.chartConfig2 = {
    chart: {
      type: 'areaspline',
      width:'750',
    },
        title: {
      text: 'Scholar Graph'
    },
    xAxis: {
      categories: ['Aniniy', 'Dao', 'Hamtic', 'San Jose', 
      'Sibalom', 'Belison', 'Patnongon', 'Bugasong', 'Lauan',
      'Barbaza', 'Tibiao', 'Culasi', 'Sebaste', 'Pandan', 'Libertad', 'Caluya']
    // },
    // categories: $scope.townArray
    },
    yAxis: {
      title: {
          text: 'total'
      }
    },
    plotOptions: {
      series: {
        animation: {
            duration: 2400
        }
      }
    },
    series: [{
      name: 'Total scholar',
      data: [100, 200, 200, 300, 100, 300, 70, 120, 150, 230, 103, 120, 110, 142, 50, 20 ],
      fillColor: {
          linearGradient: {x1: 0,y1: 0,x2: 0,y2: 1},
          stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
      }
    }],

    
  }

    $scope.chartConfig = {
      chart: {
        type: 'bar',
        width:'400'
      },
      series: [{
        data: [25, 3000, 3200, 520],
        id: 'series1'
      }],
      title: {
        text: 'PYDO GRAPH'
      },
      xAxis: {
        categories: ['user', 'scholar', 'applied', 'notes']
      },
      
    }

  $scope.chartConfig3 = {
    chart: {
      type: 'column',
      width:'600',
    },

    series: [{
      name: 'Total',
      data: [1000, 200, 200, 3000, 100, 300, 70, 120, 150, 230, 103, 120, 110 ],
      fillColor: {
          linearGradient: {x1: 0,y1: 0,x2: 0,y2: 1},
          stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
      }
    }],
    title: {
      text: 'Total per School'
    },
    xAxis: {
      categories: ['UA', 'SAC', 'San Ag', 'ACC', 
      'CPU', 'UP', 'ISAT', 'STI', 'WIT',
      'WVSU', 'AMA', 'ST. THERESE', 'ASU']
    },
    yAxis: {
      title: {
          text: 'total'
      }
    },
    plotOptions: {
      series: {
        animation: {
            duration: 2400
        }
      }
    },
    
  }

  function extractTowns(townArr){
    angular.forEach(townArr, function(val, i){
        
        $scope.townTotalArray.push(val.total_scholar);
        $scope.townArray.push(val.town_name);
    });
  }

  }]);

  myapp.factory('getTowns', function($http){
    return {
      fetchTowns: function(){
        return $http.get(baseUrl+'getAllTowns');
      }
    }
  });