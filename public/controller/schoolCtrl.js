'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:AboutCtrl
 * @description
 * # schoolCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('schoolCtrl',['$rootScope', '$http', '$timeout', 'postNewSchool', 
   function ($rootScope, $http, $timeout, postNewSchool ) {
 
  //  var log = JSON.parse($window.localStorage.getItem('cookies'));

  // if(!log){
  //   $rootScope.valid = false;
  //   $rootScope.home = true;
  //   $location.path('/home');
  // }else{
  //   $rootScope.valid = true;
  //   $rootScope.home = false;
  // }

  	var s = this;
  	
  	s.loading = true;
  	s.subTblLoading = true;
    s.newSchoolAdded = [];
  	
  	postNewSchool.getSchool().then(function(response){
  		s.loading = false;
	  	$timeout(function(){
	  		s.schoolAdded = response.data;
	  		s.loading = true;
	  		s.subTblLoading = false;
  		}, 500)
  	}, function(err){
      console.log(err);
    });

    s.addSchool = function(){
     var arrOfAddedSchool = [s.schoolName, s.location];
     validateEmpty(arrOfAddedSchool);
    }

    function validateEmpty(addUSchoolArr){
      if(addUSchoolArr.indexOf(undefined) > -1){
        alert('bad');
      }else{
        s.newSchoolAdded.push({
          school_name: s.schoolName, 
          location: s.location, 
        });
        s.schoolAdded.push({
          school_name: s.schoolName, 
          location: s.location, 
        });
        postNewSchool.saveSchool(s.newSchoolAdded).then(function(response){
          console.log(response);
          s.newSchoolAdded = [];
        }, function(err){
          console.log(err);
        });
      }
    }
  }]);

app.factory('postNewSchool', function($http){
    return {
      saveSchool: function(newSchool){
        return $http({
          method:'POST',
          url: baseUrl+'addSchool',
          data: newSchool,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
      },
      getSchool: function(){
      	return $http.get(baseUrl+'getSchoolData');
      }
    }
});