'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
app = angular.module('mytodoApp')
  .controller('adduserCtrl',['$scope', '$rootScope', '$location', '$timeout', 'postNewUser', '$ngConfirm', '$window',
    function ($scope, $rootScope ,$location, $timeout, postNewUser, $ngConfirm, $window) {

  // var log = JSON.parse($window.localStorage.getItem('cookies'));

  // if(!log){
  //   $rootScope.valid = false;
  //   $rootScope.home = true;
  //   $location.path('/home');
  // }else{
  //   $rootScope.valid = true;
  //   $rootScope.home = false;
  // }

    var au = this;

    au.users = [];
    au.hides = false;
    au.loading = true;

    getMunicipalities();
    positionData();
    accessType();

    au.deleteUser = function(id){
        var userId = au.users.indexOf(id);
        au.users.splice(userId, 1);
    }
    au.showInput = function(){
        au.hides === false? au.hides = true : au.hides = false;
    }

    au.addUser = function(){
      console.log(au.selectedPosition);
    var arrOfAddedUser = [
        au.firstname, 
        au.lastname, 
        au.gender, 
        au.contact_no, 
        au.username, 
        au.password,
        au.selectedMunicipality.town_id,
        au.selectedPosition.position_id,
        au.selectedAccessType.user_accesses_id
      ];
      validateEmpty(arrOfAddedUser);
    }

    au.saveUsers = function(){
      au.loading = false;
      saveNewUser(au.users);
      console.log(au.users);
    }

    au.clear = function(){
      clear();
    }

    au.cancel = function(){
      au.users = [];
    }

    function validateEmpty(addUserArr){
      if(addUserArr.indexOf(undefined) > -1){
        alert('fill up all data in the form');
      }else{
        au.users.push({ 
          firstname: au.firstname, 
          lastname: au.lastname,
          username: au.username, 
          password: au.password,
          gender: au.gender, 
          contact_no: au.contact_no, 
          positionId: au.selectedPosition.position_id,
          townId: au.selectedMunicipality.town_id,
          userAccessId: au.selectedAccessType.user_accesses_id,
          statusId: 3
        });
        clear();
      }
    }

    function saveNewUser(user){
      postNewUser.saveUser(user).then(function(response){
        successDialog();
        au.loading = true;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function clear(){
      au.firstname="";
      au.lastname=""; 
      au.gender=""; 
      au.username="";
      au.email=""; 
      au.address=""; 
      au.position="";
      au.user_access=""; 
      au.password=""; 
      au.rePassword=""; 
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

    function getMunicipalities(){
      postNewUser.fetchTowns().then(function(response){
        au.municipalities = response.data;
      }, function(err){
        console.log(err);
      });
    }

    function positionData(){
      postNewUser.getAllPositions().then(function(response){
        au.positions = response.data;
      }, function(err){
        console.log(err);
      });
    }

    function accessType(){
      postNewUser.getAccessTypes().then(function(response){
        au.access_types = response.data;
      }, function(err){
        console.log(err);
      });
    }
  }]);

  app.directive('colorStatus', function(){
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

app.factory('postNewUser', function($http){
    return {
      saveUser: function(newUser){
        return $http({
          method:'POST',
          url: baseUrl+'addUser',
          data: newUser,
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
      },
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
    getAllPositions: function(){
      return $http.get(baseUrl+'getPositions');
    },
    getAccessTypes: function(){
      return $http.get(baseUrl+'getAccessType');
    },
  }
});