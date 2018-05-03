'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('viewAppliedCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', 
  '$ngConfirm','$filter', '$timeout', '$window','getAppliedInfoService', 
  function ($scope, $rootScope, $location, $http, $routeParams, 
  $ngConfirm, $filter, $timeout, $window, getAppliedInfoService) {


var av = this;

getAppliedInfo($routeParams.applied_id);
console.log($routeParams.applied_id);

av.uploadFile = function(event){
    var files = event.target.files;
    console.log(files[0]);
    var reader = new FileReader();
    reader.onload = av.imageUpload;
    reader.readAsDataURL(files[0]);
};

av.imageUpload =function(e){
  $scope.$apply(function(){
    av.image = e.target.result;
  });
}

function getAppliedInfo(aid){
  getAppliedInfoService.getAppliedInfoId(aid).then(function(response){
  displayInfo(response.data);
  console.log(response);
  }, function(err){
    console.log(err);
  });
}


function displayInfo(info){
  av.firstname = info[0].firstname;
  av.lastname = info[0].lastname;
  av.middle_name = info[0].username;
  av.applied_name = info[0].applied_name;
  av.age = info[0].age;
  av.contact_no = info[0].contact_no;
  av.gender = info[0].gender;
  av.barangay = info[0].barangay;
  av.town_name = info[0].town_name;
  av.religion = info[0].religion;
  av.contact_no = info[0].contact_no;
  av.date_of_birth   = info[0].date_of_birth;
  av.civil_status = info[0].civil_status;
  av.academic_year = info[0].academic_year;
  av.school_name = info[0].school_name;
  av.student_id_number = info[0].student_id_number;
  av.course = info[0].course;
  av.college_year_name = info[0].college_year_name;
  av.semesters_name = info[0].semesters_name;
  av.statusId = info[0].statusId;
}

}]);

//Directives
app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
});

//Services
app.factory('getAppliedInfoService', function($http){
  return{
    getAppliedInfoId: function(aid){
      return $http.get(baseUrl+'getAppliedInformation/'+aid);
    },
  }
});
