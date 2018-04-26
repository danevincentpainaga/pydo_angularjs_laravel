'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
var app = angular.module('mytodoApp')
  .controller('editScholarCtrl', ['$scope','$routeParams', '$location', '$window', 'scholarData',
   function ($scope, $routeParams, $location, $window, scholarData) {
  
  var sc = this;
  sc.scholar_data;

  sc.uploadFile = function(event){
      var files = event.target.files;
      console.log(files[0]);
      var reader = new FileReader();
      reader.onload = sc.imageUpload;
      reader.readAsDataURL(files[0]);
  };

  sc.imageUpload =function(e){
    $scope.$apply(function(){
      sc.image = e.target.result;
    });
  }

  scholarData.editScholarData($routeParams.scholarid).then(function(response){
      getScholarResult(response.data);
      console.log(response.data);
  }, function(err){
    console.log(err);
  });

  function getScholarResult(result) {    
      sc.firstname = result.firstname;
      sc.lastname = result.lastname;
      sc.middlename = result.middle_name;
      sc.address = result.address;
      sc.contact_number = result.contact_no;
      sc.dateofbirth = result.date_of_birth;
      sc.father = result.fathers_name;
      sc.mother = result.mothers_maiden_name;
      sc.school = result.schoolId;
      sc.gender = result.gender;
  }

}]);

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
});

app.factory('scholarData',['$http', function($http){
  return{
    editScholarData: function(id){
      return $http.get(baseUrl+'editScholarData/'+id);
    },
  }
}]);