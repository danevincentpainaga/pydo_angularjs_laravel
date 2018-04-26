'use strict';

/**
 * @ngdoc overview
 * @name mytodoApp
 * @description
 * # mytodoApp
 *
 * Main module of the application.
 */
angular
.module('mytodoApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'cp.ngConfirm',
  'highcharts-ng',
  '720kb.datepicker',
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      controller: 'mainCtrl',
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'mainCtrl',
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'mainCtrl',
    })
    .when('/home/updates', {
      templateUrl: 'views/updates.html',
      controller: 'mainCtrl',
    })
    .when('/home/application', {
      templateUrl: 'views/student_application_form.html',
      controller: 'mainCtrl',
    })
    .when('/home/profile', {
      templateUrl: 'views/student_account.html',
      controller: 'mainCtrl',
    })
    .when('/user/page/:pagenum', {
      templateUrl: 'views/user.html',
      controller: 'userCtrl',
    })
    .when('/scholar', {
      templateUrl: 'views/scholar.html',
      controller: 'scholarCtrl',
      controllerAs: 'scholar'
    })
    .when('/scholar/edit_scholar/:scholarid', {
      templateUrl: 'views/edit_scholar.html',
      controller: 'editScholarCtrl',
    })
    .when('/add_scholar', {
      templateUrl: 'views/add_scholar.html',
      controller: 'scholarCtrl',
      controllerAs: 'scholar'
    })
    .when('/add_user', {
      templateUrl: 'views/add_user.html',
      controller: 'adduserCtrl',
      controllerAs: 'adduser'
    })
    .when('/application', {
      templateUrl: 'views/application.html',
      controller: 'applicationCtrl',
    })
    .when('/application/view_print', {
      templateUrl: 'views/printForm.html',
      controller: 'viewStudentCtrl',
    })
    .when('/application/applied_scholar', {
      templateUrl: 'views/applied_scholar.html',
      controller: 'appliedScholarCtrl',
      controllerAs: 'applied_scholar'
    })
    .when('/notes', {
      templateUrl: 'views/notelist.html',
      controller: 'notesCtrl',
    })
    .when('/edit_notes/:index', {
      templateUrl: 'views/edit_notes.html',
      controller: 'editNoteCtrl',
    })
    .when('/form', {
      templateUrl: 'views/form.html',
      controller: 'dashboardCtrl',
      controllerAs: 'form'
    })
    .when('/view/:userid', {
      templateUrl: 'views/viewUser.html',
      controller: 'dashboardCtrl',
    })
    .when('/municipality_limit', {
      templateUrl: 'views/max_limit_scholar.html',
      controller: 'municipalMaxLimitCtrl',
    })
    .when('/add_school', {
      templateUrl: 'views/add_school.html',
      controller: 'schoolCtrl',
    })
    .when('/reports', {
      templateUrl: 'views/report.html',
      controller: 'userCtrl',
    })
    .when('/adminpydologin', {
      templateUrl: 'views/admin_login.html',
      controller: 'userCtrl',
    })
    .otherwise({
      redirectTo:'/'
    });
})
.run(function($rootScope,$location) {
  $rootScope.$on('$routeChangeStart', function(event, next, prev) {
     $rootScope.pageLoad = false; 
     $rootScope.dashboard = true;
     // $rootScope.valid = true;
     // $rootScope.home = false;
     //1 is student role 2 is admin role
     var cookie = true; 
     var userRole = 2;
     if(!cookie){
      if(next.$$route.originalPath != '/adminpydologin'){
        $rootScope.valid = false;
        $rootScope.home = true;
        $location.path('/home');
      }
     }else{
      if(next.$$route.originalPath == '/'){
        if(userRole === 1){
          $rootScope.valid = false;
          $rootScope.home = true;
          $location.path('/home');
        }
        else{
          $rootScope.home = false;
          $rootScope.valid = true;
        }
      }
      else if(next.$$route.originalPath == '/home/updates' 
        || next.$$route.originalPath == '/home/application'
        || next.$$route.originalPath == '/home/profile'
        || next.$$route.originalPath == '/adminpydologin')
      {

          $rootScope.valid = false;
          $rootScope.home = true;

      }
      else{
          if(userRole === 1){
            if(next.$$route.originalPath != '/home/updates' 
            || next.$$route.originalPath != '/home/application'
            || next.$$route.originalPath != '/home/profile'
            || next.$$route.originalPath != '/adminpydologin')
          {
            $rootScope.valid = false;
            $rootScope.home = true;
            $location.path('/home');
          }
        }
        else if(next.$$route.originalPath == '/home'){
          $rootScope.valid = false;
          $rootScope.home = true;
        }
        else{
          $rootScope.valid = true;
          $rootScope.home = false;
   
        }
      }
    }
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.pageLoad = true;
  });
});

