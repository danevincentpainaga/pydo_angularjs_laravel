'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$http', '$ngConfirm','$filter', '$timeout', function ($scope, $rootScope, $location, 
 $http, $ngConfirm, $filter, $timeout) {

  $scope.loading = true;
  $scope.navHide = false;
  $scope.smallNav = true;
  var collapse = true;
  
  var styles = {
    initStyles: function(){
      if (collapse === true) {
        $scope.navHide = true;
        $scope.smallNav = false;
        $scope.hideLogo = {
          "display": "none",
        }
        $scope.expand = {
          "max-width": "100%",
          "min-width": "100%"
        }
        $scope.nav = {
          "max-width": "4%",
          "min-width": "4%"
        }
        $scope.content = {
          "max-width": "96%",
          "min-width": "96%"
        }

        $scope.collapseHide = {
          "display": "none",
        }
        collapse = false;
      }
      else
      {
        $scope.navHide = false;
        $scope.smallNav = true;
        $scope.hideLogo = {
          "display": "inline",
        }
        $scope.expand = {
          "max-width": "83.333333%",
          "min-width": "83.333333%"
        }
        $scope.collapseHide = {
          "display": "inline",
        }
        $scope.nav = {
          "max-width": "16.666667%",
          "min-width": "16.666667%"
        }
        $scope.content = {
          "max-width": "83.333333%",
          "min-width": "83.333333%"
        }
        collapse = true;

      }
    }
  }

  $scope.collapseNav = function(){
    styles.initStyles();
  }


  $scope.isActivated = function(destination){
    return destination == $location.path();    
  }

  $scope.goToHome = function(){
    $location.path('/home');
  }
  //recieve emit and BroadCast to editNoteCtrl
  $scope.$on('noteID', function(event, obj){
    $timeout(function(){
      $scope.$broadcast('passID', {'id': obj.id});
    }, 500);
  });

  $scope.$on('userid', function(event, obj){
    $timeout(function(){
      $scope.$broadcast('user', {'id': obj.id, "userData": obj.userdata});
    }, 500);
  });

  $scope.$on('applied_id', function(event, obj){
    $timeout(function(){
      $scope.$broadcast('appliedStudentId', {'id': obj.id});
    }, 500);
  });

  $scope.$on('appliedIndex', function(event, obj){
    $timeout(function(){
      $scope.$broadcast('appliedIdx', obj);
    }, 500);
  });


  $scope.printForm = function(){
    var printDiv = document.getElementById('Form');
    window.print(printDiv);
  }


}]);


// app.directive('navHeight',['$window', function($window){
//     return {
//       restrict: 'A',
//       scope: true,
//       link: function(scope, elem, attrs) {
//         var wh = angular.element($window);
//         var h = wh.height();

//         // elem.css({'min-height': h+'px', 'max-height': h+'px'});
//         wh.bind('resize', function(){
//           elem.css({'min-height': h+'px', 'max-height': h+'px'});
//           console.log(" Window resized! " + h);
//         });
//       }
//     };
//  }]);

app.directive('autoresize', function ($window) {
  return function ($scope) {
    $scope.initializeWindowSize = function () {
          $scope.maxHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight,
          window.innerHeight
        );
        $scope.windowHeight = $window.innerHeight;
        return $scope.windowWidth = $window.innerWidth;
    };
    $scope.initializeWindowSize();

    $scope.$watch('__height', function(newHeight, oldHeight) {
        $scope.initializeWindowSize();
    }); 

    return angular.element($window).bind('resize', function () {
     
        $scope.initializeWindowSize();
        return $scope.$apply();
     
    });
  };
});

