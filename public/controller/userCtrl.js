'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:myCtrl
 * @description
 * # myCtrl
 * Controller of the mytodoApp
 */

var app = angular.module('mytodoApp')
app.controller('userCtrl',
  ['$scope', '$rootScope', '$location', '$http', '$routeParams', '$ngConfirm','$filter', '$timeout', '$window','getUsers', 
  function ($scope, $rootScope, $location, $http, $routeParams, $ngConfirm, $filter, $timeout, $window, getUsers) {

var hid = {
  pageSize:20,
  next:2,
  pageLength:null
} 

var usr = this;
var toBeDeletedUsers = [];
usr.userTable = true;

var page = parseInt(($routeParams.pagenum * hid.pageSize) - hid.pageSize);

getUserPerPage(page, $rootScope.municipal_id);
getMunicipalities();

usr.location = function(idx, user){
  $location.path('/view/'+user.user_id);
  $scope.$emit('userid', {"id":idx, "userdata": usr.users});
}

usr.exist = function(user){
  return toBeDeletedUsers.indexOf(user) > -1;
}

usr.toggle = function(user){
  toBeDeletedUsers.indexOf(user) > -1? 
  toBeDeletedUsers.splice(i, 1) : toBeDeletedUsers.push(user);
}

usr.statusChange = function(queriedStatus){
  console.log(getUsers.filterStatus(queriedStatus));
}

usr.checkAll = function(){
  if(usr.selectAll){
    angular.forEach(usr.users, function(userval){
      var index = toBeDeletedUsers.indexOf(userval);
      if(index >= 0){
        return true;
      }else{
        toBeDeletedUsers.push(userval); 
      } 
    });
  }
  else{
    toBeDeletedUsers = [];
  }
}

usr.deleteAll = function(){
  if(usr.selectAll){
    var title = 'Delete User?';
    confirmDialog(title, toBeDeletedUsers, '');
    // delete all check
    console.log(toBeDeletedUsers);
  }
  else{
    //delete individually
    console.log(toBeDeletedUsers);
  }
}

usr.deleteUser = function(user){
  console.log(user.id);
  var title = 'Delete This User?';
  confirmDialog(title, user, '');
}

usr.getDataId = function(id, useraccess){
  console.log('this is id'+''+id);
  console.log('this is access'+''+useraccess);
}

usr.numberOfPage = function(){
  var numOfpage = [];
  var numOfpagesLength = Math.ceil(hid.pageLength / hid.pageSize);
  showPagination(numOfpagesLength);
  for(var i = 1; i <= numOfpagesLength; i++){
    numOfpage.push(i);
  }
  return numOfpage;
}

usr.nextPage = function(){
  console.log($routeParams.pagenum);
}

// TO DO
usr.filterMunicipality = function(municipalData){
  getUserPerPage(page, municipalData.town_id);
}

function confirmDialog(message, user, content){
  $ngConfirm({
    theme:'modern',
    title: message,
    content: content,
    type: 'blue',
    typeAnimated: true,
    animation: 'scaleX',
    buttons: {
      Yes: {
        text: 'Yes',
        btnClass: 'btn-blue',
        action: function(){
          deleteUserData(user);
          $ngConfirm('User deleted');
        }
      },
      Cancel: {
        text: 'Cancel',
        btnClass: 'btn-red',
      }
    }
  });
}

function showPagination(pageNum){
  pageNum <= 1? usr.paginationNum = true : usr.paginationNum = false;
}

function deleteUserData(ids){
  if(Array.isArray(ids)){
    deleteSelectedUsers(ids);
  }else{
    usr.users.splice(usr.users.indexOf(ids), 1);
  }
}

function deleteSelectedUsers(userids){
  angular.forEach(userids, function(userVal, i){
    console.log(userVal.user_id);
  });
  sliceCheckedUser();
}

function sliceCheckedUser(){
  // usr.users = usr.users.filter(function(i){
  //   return !i.selected;
  // });
  getUserData();
}


function deleteUserByIds(){

}

function getUserData(){
  getUsers.fetcUsers().then(function(response){
    usr.loading = false;
    $timeout(function(){
      usr.users = response.data;
      console.log(response.data);
      usr.loading = true;
      usr.userTable = false;
      usr.selectAll = false;
    },500);
  });
}

function getUserPerPage(id, mid){
  getUsers.usersPerpage(id, mid).then(function(response){
    count($rootScope.municipal_id);
    usr.loading = false;
    $timeout(function(){
      usr.users = response.data;
      usr.loading = true;
      usr.userTable = false;
      usr.selectAll = false;
    },100);
    console.log(response);
  }, function(err){
    console.log(err);
  });
}

function count(mid){
  getUsers.pageCount(mid).then(function(response){
    hid.pageLength = response.data;
    }, function(err){
      console.log(err);
  });
}

//to do
function getMunicipalities(){
  getUsers.fetchTowns().then(function(response){
    usr.municipalities = response.data;
  }, function(err){
    console.log(err);
  });
}


}]);

//directives
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

//Services
app.factory('getUsers', function($http){
  return{
    fetcUsers: function(){
      return $http.get(baseUrl+'getUsers');
    },
    usersPerpage: function(id, mid){
      return $http.get(baseUrl+'user/page/'+id+'/'+mid);
    },
    pageCount: function(mid){
      return $http.get(baseUrl+'pageCount/'+mid);
    },
    filterStatus: function(selectedStatus){
      return selectedStatus;
    },
    fetchTowns: function(){
      return $http.get(baseUrl+'getAllTowns');
    },
    // TO DO
    // appliedScholars: function(id){
    //   return $http.get(baseUrl+'getUserMunicipality/'+id);
    // }
  }
});


app.filter('startFrom', function() {
  return function(data, start) {
    return data.slice(start);
  };
});