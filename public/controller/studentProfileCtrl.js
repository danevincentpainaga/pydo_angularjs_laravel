'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('studentProfileCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', 
  '$ngConfirm','$filter', '$timeout', '$window','getStudentInfoService', 
  function ($scope, $rootScope, $location, $http, $routeParams, 
  $ngConfirm, $filter, $timeout, $window, getStudentInfoService) {


var sp = this;

getStudentInfo($rootScope.register_id);
console.log($rootScope.register_id);

sp.printForm = function(){
  $timeout(function(){
    var printDiv = document.getElementById('Form');
    window.print(printDiv);
  },500);
}

function getStudentInfo(sid){
  getStudentInfoService.getStudentInfoId(sid).then(function(response){
  displayInfo(response.data);
  console.log(response);
  }, function(err){
    console.log(err);
  });
}

function displayInfo(info){
  sp.firstname = info[0].firstname;
  sp.lastname = info[0].lastname;
  sp.middle_name = info[0].username;
  sp.applied_name = info[0].applied_name;
  sp.age = info[0].age;
  sp.contact_no = info[0].contact_no;
  sp.gender = info[0].gender;
  sp.barangay = info[0].barangay;
  sp.town_name = info[0].town_name;
  sp.religion = info[0].religion;
  sp.contact_no = info[0].contact_no;
  sp.date_of_birth   = info[0].date_of_birth;
  sp.civil_status = info[0].civil_status;
  sp.academic_year = info[0].academic_year;
  sp.school_name = info[0].school_name;
  sp.student_id_number = info[0].student_id_number;
  sp.course = info[0].course;
  sp.college_year_name = info[0].college_year_name;
  sp.semesters_name = info[0].semesters_name;

  // info[0].statusId === 1? sp.download = true : sp.download = false; 
  if(info[0].statusId === 1){
    sp.download = true
  }
  else{
    successNotification();
    sp.download = false;
  }
}

function successNotification(){
  $ngConfirm({
      icon:'fa fa-check-circle',
      backgroundDismiss: false,
      backgroundDismissAnimation: 'shake',
      title: 'Congratulations!',
      content:'Your application has been approved',
      theme:'supervan',
      type:'blue',
      buttons: {
        OK: {
            text: 'OK',
            btnClass: 'btn-green'
          }
        }
  });
}

}]);


//Services
app.factory('getStudentInfoService', function($http){
  return{
    getStudentInfoId: function(sid){
      return $http.get(baseUrl+'getStudentInformation/'+sid);
    },
  }
});
