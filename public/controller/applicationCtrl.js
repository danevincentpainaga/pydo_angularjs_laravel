'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('applicationCtrl', ['$scope', '$rootScope', '$location', '$window', '$ngConfirm', 'applicationData',
   function ($scope, $rootScope, $location, $window, $ngConfirm, applicationData) {

  // var log = JSON.parse($window.localStorage.getItem('cookies'));

  // if(!log){
  //   $rootScope.valid = false;
  //   $rootScope.home = true;
  //   $location.path('/home');
  // }else{
  //   $rootScope.valid = true;
  //   $rootScope.home = false;
  // }
    
  var apps = this;
  apps.municipality = [];
  apps.schools = [];
  apps.degrees = [];
  apps.collegeYear = [];
  apps.semesters = [];
  apps.appliedStudent = [];

    // getMunicipalities($rootScope.municipal_id);
  getMunicipalities();
  getByTownAccess($rootScope.municipal_id);
  getSchools();
  getAllDegrees();
  CollegeYears();
  semesters();

  apps.viewPrint = function(){
    console.log(apps.appdata);
    var applied = apps.appdata.firstname+' '+apps.appdata.lastname;
    // var academic = apps.appdata.academic_year_from+' '+apps.appdata.academic_year_to;
    apps.appliedStudent.push({
     applied_name: applied,
     firstname: apps.appdata.firstname,
     lastname: apps.appdata.lastname,
     middle_name: apps.appdata.middlename,
     gender: apps.appdata.gender,
     age: apps.appdata.age,
     barangay: apps.appdata.barangay,
     townId: apps.selectedMunicipality.town_id,
     religion: apps.appdata.religion,
     date_of_birth: apps.appdata.dateofbirth,
     civil_status: apps.appdata.civilStatus,
     contact_no: apps.appdata.contact_no,
     schoolId: apps.school.school_id,
     degreeId: apps.degree.degree_id,
     course: apps.appdata.course,
     statusId: 1,
     collegeYearId: apps.college_year.college_year_id,
     semesterId: apps.semester.semester_id,
     academic_year: apps.appdata.academic_year_from,
     student_id_number: apps.appdata.student_id_number,
     // year: apps.appdata.spouse,
     // year: apps.appdata.father,
     // year: apps.appdata.mother,
     // year: apps.appdata.spouse_occupation,
     // year: apps.appdata.father_occupation,
     // year: apps.appdata.mother_occupation,
    });
    console.log(apps.appliedStudent);
    appliedScholarInfo(apps.appliedStudent);
    // view();
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
  
  function getMunicipalities(){
    applicationData.fetchTowns().then(function(response){
      apps.municipality = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function getByTownAccess(id){
    applicationData.getByUserTown(id).then(function(response){
      apps.municipalities = [response.data];
      console.log(apps.municipalities);
    }, function(err){
      console.log(err);
    });
  }

  function appliedScholarInfo(scholarData){
    applicationData.saveAppliedScholar(scholarData).then(function(response){
      console.log(response);
      successDialog();
    }, function(err){
        console.log(err);
        apps.appliedStudent = [];
    });
  }

  function successDialog(){
    $ngConfirm({
      title: '',
      content: 'Successfully added',
      animation: 'right',
      closeAnimation: 'left',
      columnClass: 'col-md-4',
      containerFluid: true
    });
  }

  function getSchools(){
    applicationData.fetchSchools().then(function(response){
      apps.schools = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function getAllDegrees(){
    applicationData.fetchDegree().then(function(response){
      apps.degrees = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function CollegeYears(){
    applicationData.fetchCollegeYear().then(function(response){
      apps.collegeYear = response.data;
    }, function(err){
      console.log(err);
    });
  }

  function semesters(){
    applicationData.fetchSemesters().then(function(response){
      apps.semesters = response.data;
    }, function(err){
      console.log(err);
    });
  }
  // function getMunicipalities(municipalId){
  //   applicationData.fetchTowns(municipalId).then(function(response){
  //     apps.municipality = [response.data];
  //     console.log(response);
  //   }, function(err){
  //     console.log(err);
  //   });
  // }

}]);

app.factory('applicationData',['$http', function($http){
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
