'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:notesCtrl
 * @description
 * # notesCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('notesCtrl',['$scope', '$location', '$http',  function ($scope, $location, $http) {
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
