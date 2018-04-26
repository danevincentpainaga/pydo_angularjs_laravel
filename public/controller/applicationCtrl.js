'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('applicationCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
  
  var apps = this;
  
  var appliedStudent = [];

  apps.viewPrint = function(){
    console.log(apps.appdata);
     appliedStudent.push({
     firstname: apps.appdata.firstname,
     lastname: apps.appdata.lastname,
     middle_name: apps.appdata.middlename,
     date_of_birth: apps.appdata.birthdate,
     course: apps.appdata.course,
     year: apps.appdata.year,
     gender: apps.appdata.gender,
     fathers_name: apps.appdata.father,
     mothers_maiden_name: apps.appdata.mother,
     // school: apps.appdata.school,
     year: apps.appdata.applicableYear,
     // applicableSemester: apps.appdata.applicableSemester,
     // barangay: apps.appdata.barangay,
     // municipality: apps.appdata.municipality,
     // civilStatus: apps.appdata.civilStatus,
    });
    console.log(appliedStudent);
    view();
  }

  displayStorageData();

  function displayStorageData(){
    var stud_data = JSON.parse($window.localStorage.getItem('studentData'))
    angular.forEach(stud_data, function(val, i){
      apps.firstname = val.firstname;
      apps.lastname = val.lastname;
    });
  }

  function view(){
    $window.localStorage.setItem('studentData', JSON.stringify(appliedStudent) );
    $location.path('/application/view_print');
  }

}]);
