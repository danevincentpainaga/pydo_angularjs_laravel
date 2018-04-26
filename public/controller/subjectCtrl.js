'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:AboutCtrl
 * @description
 * # subjectCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('subjectCtrl',['$http', '$timeout', 'postNewSubject', 
   function ($http, $timeout, postNewSubject ) {
  	var sub = this;
  	
  	sub.loading = true;
  	sub.subTblLoading = true;
  	sub.subjectAdded = [];
    sub.newSubjectAdded = [];
  	
  	postNewSubject.getSubjects().then(function(response){
  		sub.loading = false;
	  	$timeout(function(){
	  		sub.subjectAdded = response.data;
	  		sub.loading = true;
	  		sub.subTblLoading = false;
  		}, 2000);
  	});

  	sub.addSubject = function(){
  		var arrOfAddedSubject = [sub.subject, sub.description];
  		validateEmpty(arrOfAddedSubject);
  	}

  	function validateEmpty(addUSubjectArr){
      if(addUSubjectArr.indexOf(undefined) > -1){
        alert('bad');
      }else{
        sub.subjectAdded.push({
          subject_name: sub.subject, 
          description: sub.description, 
        });
        sub.newSubjectAdded.push({
          subject_name: sub.subject, 
          description: sub.description, 
        });
        postNewSubject.saveSubject(sub.newSubjectAdded).then(function(response){
          console.log(response);
          sub.newSubjectAdded = [];
        }, function(err){
          console.log(err);
        });
      }
    }
  }]);

app.factory('postNewSubject', function($http){
    return {
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
      }
    }
});