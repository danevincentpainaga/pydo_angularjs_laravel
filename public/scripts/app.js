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
      controller: 'loginCtrl',
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
      controller: 'loginCtrl',
    })
    .when('/application/view/:applied_id', {
      templateUrl:'views/edit_scholar.html',
      controller: 'appliedScholarCtrl',
    })
    .when('/home/register', {
      templateUrl:'views/registerForm.html',
      controller: 'registerCtrl',
    })
    .otherwise({
      redirectTo:'/'
    });
})
.run(function($rootScope,$location, $cookies, $window) {
//  $rootScope.municipal_id = 1; //this is the sample access each municipality scholars

  $rootScope.$on('$routeChangeStart', function(event, next, prev) {
     $rootScope.pageLoad = false;
     $rootScope.loginForm = true;
     //role 1 is superadmin role 2 is admin role 3 is user role 4 is student
     var cookie = $window.localStorage.getItem('cookies');
     if(!cookie){
      if(
        next.$$route.originalPath == '/home' ||
        next.$$route.originalPath == '/adminpydologin' || 
        next.$$route.originalPath == '/home/updates' ||
        next.$$route.originalPath == '/home/register' ){
        $rootScope.valid = false;
        $rootScope.home = true;
      }
      else{
        $rootScope.valid = false;
        $rootScope.home = true;
        $rootScope.dashboard = false;
        $rootScope.profile = false;
        $location.path('/home');
      }
     }
    // else{
    //   if(userRole === 4){
    //     if(next.$$route.originalPath == '/home' ||
    //       next.$$route.originalPath == '/home/profile' ||
    //       next.$$route.originalPath == '/home/application' || 
    //       next.$$route.originalPath == '/home/updates'){
    //       $rootScope.valid = false;
    //       $rootScope.home = true;
    //       $rootScope.loginForm = false;
    //       $rootScope.dashboard = false;
    //       $rootScope.profile = true;
    //     }
    //     else{
    //       $rootScope.valid = false;
    //       $rootScope.home = true;
    //       $rootScope.loginForm = false;
    //       $rootScope.dashboard = false;
    //       $rootScope.profile = true;
    //       $location.path('/home');
    //     }
    //   }
    //   else if(userRole === 1){
    //     if(next.$$route.originalPath == '/home' ||
    //       next.$$route.originalPath == '/home/updates'){
    //       $rootScope.home = true;
    //       $rootScope.valid = false;
    //       $rootScope.dashboard = true;
    //     }
    //     else if(
    //       next.$$route.originalPath == '/home/profile' ||
    //       next.$$route.originalPath == '/home/application'){
    //       $rootScope.home = true;
    //       $rootScope.valid = false;
    //       $rootScope.dashboard = true;
    //       $location.path('/home');
    //     }
    //     else if(next.$$route.originalPath == '/adminpydologin'){
    //       $rootScope.home = false;
    //       $rootScope.valid = true;
    //       $location.path('/');
    //     }
    //     else{
    //       $rootScope.admin = true;
    //       $rootScope.superAdmin = true;
    //       $rootScope.home = false;
    //       $rootScope.valid = true;          
    //     }
    //   }
    //   else if(userRole === 2){
    //     if(next.$$route.originalPath == '/home' ||
    //       next.$$route.originalPath == '/home/profile' ||
    //       next.$$route.originalPath == '/home/application' || 
    //       next.$$route.originalPath == '/home/updates'){
    //       $rootScope.home = true;
    //       $rootScope.valid = false;
    //       $rootScope.dashboard = true;
    //       $rootScope.admin = false;
    //     }
    //     else if(next.$$route.originalPath == '/adminpydologin'){
    //       $rootScope.home = false;
    //       $rootScope.valid = true;
    //       $location.path('/');
    //     }
    //     else{
    //       $rootScope.admin = false;
    //       $rootScope.superAdmin =false;
    //       $rootScope.home = false;
    //       $rootScope.valid = true;          
    //     }
    //   }
    // }

  });

  $rootScope.$on('$routeChangeSuccess', function(event, next, prev) {
    $rootScope.pageLoad = true;
    var cookie = JSON.parse($window.localStorage.getItem('cookies') )
    if(!cookie){
      if(
        next.$$route.originalPath == '/home' ||
        next.$$route.originalPath == '/adminpydologin' || 
        next.$$route.originalPath == '/home/updates' ||
        next.$$route.originalPath == '/home/register'){
        $rootScope.valid = false;
        $rootScope.home = true;
      }
      else{
        $rootScope.valid = false;
        $rootScope.home = true;
        $rootScope.dashboard = false;
        $rootScope.profile = false;
        $location.path('/home');
      }
     }
    else{
      if(cookie[0].userAccessId === 4){
        if(next.$$route.originalPath == '/home' ||
          next.$$route.originalPath == '/home/profile' ||
          next.$$route.originalPath == '/home/application' || 
          next.$$route.originalPath == '/home/updates'){
          $rootScope.valid = false;
          $rootScope.home = true;
          $rootScope.loginForm = false;
          $rootScope.dashboard = false;
          $rootScope.profile = true;
        }
        else{
          $rootScope.valid = false;
          $rootScope.home = true;
          $rootScope.loginForm = false;
          $rootScope.dashboard = false;
          $rootScope.profile = true;
          $location.path('/home');
        }
      }
      else if(cookie[0].userAccessId === 1){
        if(next.$$route.originalPath == '/home' ||
          next.$$route.originalPath == '/home/updates'){
          $rootScope.home = true;
          $rootScope.valid = false;
          $rootScope.dashboard = true;
          $rootScope.municipal_id = 1; 
        }
        else if(
          next.$$route.originalPath == '/home/profile' ||
          next.$$route.originalPath == '/home/application'){
          $rootScope.home = true;
          $rootScope.valid = false;
          $rootScope.dashboard = true;
          $location.path('/home');
        }
        else if(next.$$route.originalPath == '/adminpydologin'){
          $rootScope.home = false;
          $rootScope.valid = true;
          $location.path('/');
        }
        else{
          $rootScope.admin = true;
          $rootScope.superAdmin = true;
          $rootScope.notSuperadmin = false;
          $rootScope.home = false;
          $rootScope.valid = true;
          $rootScope.municipal_id = 1; 
          $rootScope.userAccess = 1;        
        }
      }
      else if(cookie[0].userAccessId === 2){
        if(next.$$route.originalPath == '/home' ||
          next.$$route.originalPath == '/home/profile' ||
          next.$$route.originalPath == '/home/application' || 
          next.$$route.originalPath == '/home/updates'){
          $rootScope.home = true;
          $rootScope.valid = false;
          $rootScope.dashboard = true;
          $rootScope.admin = false;
          $rootScope.municipal_id = cookie[0].townId;
        }
        else if(next.$$route.originalPath == '/adminpydologin'){
          $rootScope.home = false;
          $rootScope.valid = true;
          $location.path('/');
        }
        else{
          $rootScope.admin = false;
          $rootScope.superAdmin =false;
          $rootScope.notSuperadmin = true;
          $rootScope.home = false;
          $rootScope.valid = true;  
          $rootScope.municipal_id = cookie[0].townId;      
        }
      }
    }
  });
});

