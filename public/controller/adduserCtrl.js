'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:adduserCtrl
 * @description
 * # adduserCtrl
 * Controller of the mytodoApp
 */
app = angular.module('mytodoApp')
  .controller('adduserCtrl',['$scope', '$location', '$timeout', 'postNewUser', '$ngConfirm', 
    function ($scope, $location, $timeout, postNewUser, $ngConfirm) {
    
    var au = this;

    au.users = [];
    au.hides = false;
    au.loading = true;

    au.deleteUser = function(id){
        var userId = au.users.indexOf(id);
        au.users.splice(userId, 1);
    }
    au.showInput = function(){
        au.hides === false? au.hides = true : au.hides = false;
    }

    au.addUser = function(){
    var arrOfAddedUser = [
        au.firstname, 
        au.lastname, 
        au.gender, 
        au.username, 
        au.address, 
        au.position,
        au.password,
        au.user_access
      ];
      validateEmpty(arrOfAddedUser);
    }

    au.clear = function(){
      clear();
    }

    function validateEmpty(addUserArr){
      if(addUserArr.indexOf(undefined) > -1){
        alert('bad');
      }else{
        au.users.push({
          id:1, 
          firstname: au.firstname, 
          lastname: au.lastname, 
          gender: au.gender, 
          username: au.username, 
          address: au.address, 
          position: au.position,
          password: au.password,
          user_access: au.user_access, 
          status:'active'
        });
        au.loading = false;
        saveNewUser(au.users);
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
  }]);

  app.directive('colorStatus', function(){
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          var stats = attrs.stat.toLowerCase();
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
      }
    }
});