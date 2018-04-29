'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('viewStudentCtrl', ['$scope', '$rootScope', '$location', '$window',
   function ($scope, $rootScope, $location, $window) {
 
  var log = JSON.parse($window.localStorage.getItem('cookies'));

  if(!log){
    $rootScope.valid = false;
    $rootScope.home = true;
    $location.path('/home');
  }else{
    $rootScope.valid = true;
    $rootScope.home = false;
  }

  var view = this;
  view.viewData = JSON.parse($window.localStorage.getItem('studentData'));
    angular.forEach(view.viewData, function(val, i){
      view.firstname = val.firstname;
      view.lastname = val.lastname;
    });

  console.log(view.viewData);
  view.BackToApplication = function(){
    $location.path('/application');
  }
  // $scope.$on('applicationData', function(event, obj){
  // 	console.log(obj);
  //   view.viewData = obj;
  // 	angular.forEach(obj, function(val, i){
	 //  	view.firstname = val.firstname;
	 //    view.lastname = val.lastname;
	 //    console.log(val.firstname;);
  // 	});
  // });

    window.onafterprint = function(e){
        // $(window).off('mousemove', window.onafterprint);
        // console.log('Print Dialog Closed..');
        alert();
    };
}]);
