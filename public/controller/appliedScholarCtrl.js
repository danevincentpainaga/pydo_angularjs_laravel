'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:scholarCtrl
 * @description
 * # scholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('appliedScholarCtrl',['$scope', '$http', '$ngConfirm', 'appliedScholarData',
   function ($scope, $http, $ngConfirm, appliedScholarData) {

    var sg = this;
    var subjectHolder = [];
    sg.idx ;
    sg.subjects = [];
    sg.saveStudentGrades = [];
    sg.added_grade = [];
    sg.newSubjectAdded = [];

    getAllSubject();
    
    appliedScholarData.getAppliedAScholar().then(function(response){
        sg.scholars = response.data;
    }, function(err){
        console.log(err);
    });

    sg.addaGrade = function(scholar){
      $scope.$emit('applied_id', {"id":scholar.student_id});
      $scope.$emit('appliedIndex', {"idx": scholar});
    }

    $scope.$on('appliedStudentId', function(event, obj){
      sg.stud_id = obj.id
    });

    $scope.$on('appliedIdx', function(event, obj) {
      sg.idx = obj.idx
    })
    sg.remove = function(removeData){
      // sg.added_grade.splice(sg.added_grade.indexOf(removeData), 1);
      // sg.saveStudentGrades.splice(sg.saveStudentGrades.indexOf(removeData), 1);
    }
    
    sg.addGrades = function(id, sub, grd, hg){
      var ans;
      var highestGrade = parseFloat(hg);
      if(highestGrade === 4.0){ 
        var perGrade = parseFloat(grd)+ 1;
        ans = perGrade * 20 - 1;
        sg.saveStudentGrades.push({scholarId: id, subjectId: sub.subject_id, grades: ans});
        sg.added_grade.push({subject: sub.subject_name, grade: ans});
      }else if(highestGrade === 1.0){
        alert('to be fix');
      }
    }

    sg.saveGrades = function(){
      var dataId = { userid: sg.idx.student_id };
        appliedScholarData.addGrade(sg.saveStudentGrades).then(function(response){
          console.log(response);
        }, function(err){
          console.log(err);
        });

        appliedScholarData.updateAppliedScholars(dataId).then(function(response){
          console.log(response);
        }, function(err){
          console.log(err);
        });
    }

    sg.addSubject = function(){
      sg.newSubjectAdded.push({
        subject_name: sg.subject, 
        description: sg.description, 
      });
      appliedScholarData.saveSubject(sg.newSubjectAdded).then(function(response){
        console.log(response);
        getAllSubject();
        sg.newSubjectAdded = [];
      }, function(err){
        console.log(err);
      });
    }

    sg.subjectData = function(){
      console.log(sg.selectedSubject);
    }

    sg.addToPending = function(applied){
      var dataId = { appliedId: applied.student_id, townId: applied.townId };
      appliedScholarData.updateAppliedScholars(dataId).then(function(response){
        console.log(response);
        if(response.data == 'false'){
          alert('Scholar is Full');
        }
        else
        {
          sg.scholars.splice(sg.scholars.indexOf(applied), 1);
          alert('Success');
        }
      }, function(err){
        console.log(err);
      });
    }

    function getAllSubject(){
      appliedScholarData.getSubjects().then(function(response){
        sg.subjects = [];
        sg.subjects = response.data;
      }, function(err){
        console.log(err);
      });
    }

  }]);


  
  app.directive('scholarStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.status.toLowerCase();
            if(stats==='active'){
              elem.addClass('active');
            }
            else if(stats==='disabled'){
              elem.addClass('disabled');
            }
            else if(stats==='pending'){
              elem.addClass('pending');
            }
            else if(stats==='inactive'){
              elem.addClass('inactive');
            }
        }
      };
   });



//Services
app.factory('appliedScholarData',['$http', function($http){
  return{
    getAppliedAScholar: function(){
      return $http.get(baseUrl+'appliedScholar');
    },
    addGrade: function(grades){
      return $http({
        method:'POST',
        url: baseUrl+'addGrades',
        data: grades,
          headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    },
    saveSubject: function(newSubject){
      return $http({
        method:'POST',
        url: baseUrl+'addSubject',
        data: newSubject,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    },
    getSubjects: function(){
      return $http.get(baseUrl+'getSubjectData');
    },
    //to be fix
    updateAppliedScholars: function(dataToUpdate){
      return $http({
        method:'POST',
        url: baseUrl+'updateAppliedScholars',
        data: dataToUpdate,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    }
  }
}]);