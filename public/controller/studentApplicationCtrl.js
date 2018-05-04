'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('studentApplicationCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', 
  '$ngConfirm','$filter', '$timeout', '$window','studentApplicationService', 
  function ($scope, $rootScope, $location, $http, $routeParams, 
  $ngConfirm, $filter, $timeout, $window, studentApplicationService) {


var sa = this;

  sa.municipality = [];
  sa.schools = [];
  sa.degrees = [];
  sa.collegeYear = [];
  sa.semesters = [];

    // getMunicipalities($rootScope.municipal_id);
  getMunicipalities();
  // getByTownAccess($rootScope.municipal_id);
  getSchools();
  getAllDegrees();
  CollegeYears();
  semesters();

  sa.viewPrint = function(){
    var applied = sa.appdata.firstname+' '+sa.appdata.lastname;
    // // var academic = apps.appdata.academic_year_from+' '+apps.appdata.academic_year_to;
    sa.appliedStudent = [{
     applied_name: applied,
     firstname: sa.appdata.firstname,
     lastname: sa.appdata.lastname,
     middle_name: sa.appdata.middlename,
     gender: sa.appdata.gender,
     age: sa.appdata.age,
     barangay: sa.appdata.barangay,
     townId: sa.selectedMunicipality.town_id,
     registerId: $rootScope.register_id,
     religion: sa.appdata.religion,
     date_of_birth: sa.appdata.dateofbirth,
     civil_status: sa.appdata.civilStatus,
     contact_no: sa.appdata.contact_no,
     schoolId: sa.school.school_id,
     degreeId: sa.degree.degree_id,
     course: sa.appdata.course,
     statusId: 1,
     collegeYearId: sa.college_year.college_year_id,
     semesterId: sa.semester.semester_id,
     academic_year: sa.appdata.academic_year_from,
     student_id_number: sa.appdata.student_id_number,
    //  // year: apps.appdata.spouse,
    //  // year: apps.appdata.father,
    //  // year: apps.appdata.mother,
    //  // year: apps.appdata.spouse_occupation,
    //  // year: apps.appdata.father_occupation,
    //  // year: apps.appdata.mother_occupation,
    }];
    console.log(sa.appliedStudent);
    appliedScholarInfo(sa.appliedStudent);
  }

  function getMunicipalities(){
    studentApplicationService.fetchTowns().then(function(response){
      sa.municipality = response.data;
    }, function(err){
      console.log(err);
    });
  }


  function appliedScholarInfo(scholarData){
    studentApplicationService.saveAppliedScholar(scholarData).then(function(response){
      console.log(response);
      successDialog();
    }, function(err){
        console.log(err);
        sa.appliedStudent = [];
    });
  }

  function successDialog(){
    $ngConfirm({
      icon: 'fa fa-check-circle',
      theme:'modern',
      title: 'Application has been sent!',
      content: `<strong>Notice:</strong> Your application will be evaluated. 
      Application Form can be downloaded only if Approved by PYDO head.`,
      animation: 'right',
      type: 'green',
      typeAnimated: true,
      columnClass: 'col-md-4',
      containerFluid: true,
      buttons: {
        Yes: {
          text: 'OK',
          btnClass: 'btn-green',
          action: function(){
           redirectToProfile();
           $ngConfirm('Thank you.');

          }
        }
      }
    });
  }

  function getSchools(){
    studentApplicationService.fetchSchools().then(function(response){
      sa.schools = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function getAllDegrees(){
    studentApplicationService.fetchDegree().then(function(response){
      sa.degrees = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function CollegeYears(){
    studentApplicationService.fetchCollegeYear().then(function(response){
      sa.collegeYear = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function semesters(){
    studentApplicationService.fetchSemesters().then(function(response){
      sa.semesters = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function redirectToProfile(){
     $location.path('home/profile');
  }

}]);

app.factory('studentApplicationService',['$http', function($http){
  return{
    // fetchTowns: function(mid){
    //   return $http.get(baseUrl+'getMunicipalById/'+mid);
    // }
    saveAppliedScholar: function(scholars){
      return $http({
        method:'POST',
        url: baseUrl+'postAppliedScholar',
        data: scholars,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    },
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
    getByUserTown: function(mid){
      return $http.get(baseUrl+'getByUserTown/'+mid);
    },
    fetchSchools: function(){
      return $http.get(baseUrl+'getSchoolData');
    },
    fetchDegree: function(){
      return $http.get(baseUrl+'getDegrees');
    },
    fetchCollegeYear: function(){
      return $http.get(baseUrl+'CollegeYearData');
    },
    fetchSemesters: function(){
      return $http.get(baseUrl+'semestersData');
    }
  }
}]);
