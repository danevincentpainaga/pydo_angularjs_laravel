'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('notesCtrl',['$scope', '$rootScope', '$location', '$http', '$window',
	function ($scope, $rootScope, $location, $http, $window) {

  var log = JSON.parse($window.localStorage.getItem('cookies'));

  if(!log){
    $rootScope.valid = false;
    $rootScope.home = true;
    $location.path('/home');
  }else{
    $rootScope.valid = true;
    $rootScope.home = false;
  }

	$scope.editNote = function(id){
		$scope.$emit('noteID', {"id":id});
		$location.path('/edit_notes');
	}

	$scope.edit = function(index){
		$location.path('/edit_notes/'+index)
	}

	$http.get(baseUrl+'notes').then(function(response){
	    $scope.notes = response.data;
	});
	$scope.newDate = function(startDate){
		var	date = new Date(startDate).toISOString().slice(0,10);
		var newDate = date+' '+convertTime12to24('11:13:00 AM');
		console.log(newDate);
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

var backtoNotesList = angular.module('mytodoApp')
backtoNotesList.controller('backtoNotesListCtrl', ['$scope', '$location', function($scope, $location){
	$scope.goTo = function(url){
		$location.path(url);
	}


}]);

var apps = angular.module('mytodoApp')
apps.controller('editNoteCtrl', ['$scope', '$rootScope', '$location', '$http', 'edit', '$routeParams', function ($scope, $rootScope,
 $location, $http, edit, $routeParams) {

	// $scope.$on('passID', function(event, obj){
	// 	console.log(obj.id);
	// 	$scope.messages = obj.id;
	// });

	$scope.goTo = function(url){
		$location.path(url);
	}
	edit.getMessages($routeParams.noteID).then(function(response){
		$scope.title = response.data.title;
		$scope.created_at = response.data.created_at;
		$scope.updated_at = response.data.updated_at;
	});
}]);

apps.factory('edit', function($http, $q){
return{
	getMessages:function(id) {
		return $http.get(baseUrl+'edit_notes/'+id);
	},
}
});
