'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:appliedScholarCtrl
 * @description
 * # appliedScholarCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('appliedScholarCtrl',['$scope', '$rootScope', '$http', '$timeout', '$location', 
  '$ngConfirm', '$window', 'appliedScholarData',
   function ($scope, $rootScope, $http, $timeout, $location, $ngConfirm, $window, appliedScholarData) {

  console.log($rootScope.municipal_id);

    var sg = this;
    var subjectHolder = [];
    sg.selected = $rootScope.municipal_id;
    sg.idx ;
    sg.subjects = [];
    sg.saveStudentGrades = [];
    sg.added_grade = [];
    sg.newSubjectAdded = [];
    sg.scholarsTbl = true;

    sg.minutesData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    appliedScholar($rootScope.municipal_id);
    getMunicipalities();
    
    sg.view = function(appliedData){
      console.log(appliedData);
      $location.path('/application/view/'+appliedData.applied_scholar_id);
    }
    
    sg.selectedTown = function(id){
      sg.selected = id;
      sg.loading = false;
      sg.scholarsTbl = true;
      appliedScholarData.appliedMunicipalScholars(id).then(function(response){
        sg.loading = true;
        sg.scholarsTbl = false;
        sg.scholars = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
        sg.loading = true;
        sg.scholars = [];
      });
      console.log(id);
    }

    sg.isSelected = function(selectedId){
      return sg.selected === selectedId;
    }

    sg.tabSelected = function(tabSelected){
      if($rootScope.userAccess === 1){
        return true;
      }else{
        return showTab(tabSelected);
      }
    }

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
    
    sg.addAllToPending =function(){
      appliedScholarData.approveAll().then(function(response){
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    sg.addToPending = function(applied){
      var dataId = { appliedId: applied.applied_scholar_id, townId: applied.townId };
      appliedScholarData.updateAppliedScholars(dataId).then(function(response){
        if(response.data == 'false'){
          failedNotification();
        }
        else
        {
          sg.scholars.splice(sg.scholars.indexOf(applied), 1);
          // alert('Success');
        }
      }, function(err){
        console.log(err);
      });
    }

    // sg.filterMunicipality = function(data){
    //   sg.loading = false;
    //   sg.scholarsTbl = true;
    //   appliedScholarData.appliedMunicipalScholars(data.town_id).then(function(response){
    //     sg.loading = true;
    //     sg.scholarsTbl = false;
    //     sg.scholars = response.data;
    //   }, function(err){
    //     console.log(err);
    //     sg.loading = true;
    //     sg.scholars = [];
    //   });
    //   console.log(data.town_id);
    // }
    
    sg.getTime = function(municipal_id, selectedDate, h, m, t){
     var newDate = selectedDate+' '+convertTime12to24(h+':'+m+':'+'00'+' '+t);
      var filterDate = { filteredDate: newDate, municipalId: municipal_id.town_id };
      filterByDate(filterDate);
    }
    // sg.getTime = function(startDate){
    //   var date = new Date(startDate).toISOString().slice(0,10);
    //   var newDate = date+' '+convertTime12to24('11:13:00 PM');
    //   console.log(newDate);
    // }
    
    sg.filterAppliedData = function(){
      var newDate = sg.enddate+' '+convertTime12to24(sg.hour+':'+sg.minutes+':'+'00'+sg.timezone);
      console.log(newDate);
    }

    function appliedScholar(municipalId){
      console.log(municipalId);
      appliedScholarData.getAppliedScholar(municipalId).then(function(response){
        sg.loading = false;
        console.log(response);
        $timeout(function(){
          sg.loading = true;
          sg.scholarsTbl = false;
          sg.scholars = response.data;
        },100);
      }, function(err){
          console.log(err);
      });
    }

    
    function getMunicipalities(){
      appliedScholarData.fetchTowns().then(function(response){
        sg.towns = response.data;
        console.log(response);
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

    function filterByDate(endDate){
      appliedScholarData.filterDate(endDate).then(function(response){
        console.log(response);
        sg.scholars = response.data;
      }, function(err){
        console.log(err);
        sg.scholars = [];
      });
    }

    function showTab(tab){
      if($rootScope.municipal_id === tab){
        return true;
      }else{
        return false;
      }
    }
    function failedNotification(){
      $ngConfirm({
          icon: 'fa fa-warning',
          backgroundDismiss: false,
          backgroundDismissAnimation: 'shake',
          title: 'failed! Check scholar max limit',
          theme:'modern',
          content:'',
          type: 'red',
          buttons: {
            OK: {
                text: 'OK',
                btnClass: 'btn-red'
              }
            }
      });
    }

    function convertTime12to24(time12h) {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      return hours + ':' + minutes+':'+'00';
    }
    
  }]);


  
  app.directive('scholarStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.status;
            if(stats==3){
              elem.addClass('actives');
              elem[0].innerHTML = 'active';
            }
            else if(stats==2){
              elem.addClass('pending');
              elem[0].innerHTML = 'pending';
            }
        }
      }
   });



//Services
app.factory('appliedScholarData',['$http', function($http){
  return{
    getAppliedScholar: function(mid){
      return $http.get(baseUrl+'appliedScholar/'+mid);
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
    },
    approveAll: function(){
      return $http.get(baseUrl+'approveAll');
    },
    appliedMunicipalScholars: function(id){
      return $http.get(baseUrl+'appliedMunicipalScholars/'+id);
    },
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
    filterDate: function(date){
      return $http({
        method:'POST',
        url: baseUrl+'getDateRange',
        data: date,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    },
  }
}]);