<!DOCTYPE html>
<html ng-app="mytodoApp">
<head>
  <title>PYDO Project</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="{{ asset('node_modules/bootstrap/dist/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('node_modules/angular-confirm/css/angular-confirm.css') }}">
  <link rel="stylesheet" href="{{ asset('node_modules/components-font-awesome/css/font-awesome.min.css') }}"> 
  <link rel="stylesheet" href="{{ asset('node_modules/angularjs-datepicker/src/css/angular-datepicker.css') }}">         
  <link rel="stylesheet" href="{{ asset('node_modules/highcharts-ng/dist/highcharts-ng.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/pydo.css') }}">
     
</head>

<body ng-cloak ng-controller="mainCtrl" ng-init="load()" >
  <!-- website -->
  <div class="container" ng-if="home" style="background-color: whitesmoke;">
    <div class="col-md-10 col-sm-12 container-resize" ng-if="home" style=" position: relative; z-index: 0; top: 0px; max-width: 100%;" ng-view>
    </div>
  </div>
  <!-- dashboard -->
  <div class="container-fluid" ng-if="valid">
    <ng-include src="'views/header.html'"></ng-include>
    <span class="loading" ng-hide="pageLoad">Loading...</span>
    <ng-include src="'views/nav.html'"></ng-include>
  </div>

    <script src="{{ asset('node_modules/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ asset('node_modules/bootstrap/dist/js/bootstrap.js') }}"></script>
    <script src="{{ asset('node_modules/angular/angular.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-route/angular-route.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-confirm/js/angular-confirm.js') }}"></script>
    <script src="{{ asset('node_modules/angular-animate/angular-animate.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-cookies/angular-cookies.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-resource/angular-resource.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-sanitize/angular-sanitize.min.js') }}"></script>
    <script src="{{ asset('node_modules/angular-touch/angular-touch.min.js') }}"></script>
    <script src="{{ asset('node_modules/highcharts-ng/stock/highstock.src.js') }}"></script>
    <script src="{{ asset('node_modules/highcharts-ng/dist/highcharts-ng.js') }}"></script>
    <script src="{{ asset('node_modules/angularjs-datepicker/src/js/angular-datepicker.js') }}"></script>



    <script src="{{ asset('scripts/app.js') }}"></script>
    <script src="{{ asset('controller/mainCtrl.js') }}"></script>
    <script src="{{ asset('controller/homeCtrl.js') }}"></script>
    <script src="{{ asset('controller/registerCtrl.js') }}"></script>
    <script src="{{ asset('controller/loginCtrl.js') }}"></script>
    <script src="{{ asset('controller/notesCtrl.js') }}"></script>
    <script src="{{ asset('controller/userCtrl.js') }}"></script>
    <script src="{{ asset('controller/scholarCtrl.js') }}"></script>
    <script src="{{ asset('controller/addscholarCtrl.js') }}"></script>
    <script src="{{ asset('controller/appliedScholarCtrl.js') }}"></script>
    <script src="{{ asset('controller/adduserCtrl.js') }}"></script>
    <script src="{{ asset('controller/dashboardCtrl.js') }}"></script>
    <script src="{{ asset('controller/notesCtrl.js') }}"></script>
    <script src="{{ asset('controller/municipalMaxLimitCtrl.js') }}"></script>
    <script src="{{ asset('controller/schoolCtrl.js') }}"></script>
    <script src="{{ asset('controller/applicationCtrl.js') }}"></script>
    <script src="{{ asset('controller/viewStudentCtrl.js') }}"></script>
    <script src="{{ asset('controller/editScholarCtrl.js') }}"></script>
    <script src="{{ asset('controller/viewUserCtrl.js') }}"></script>
    <script src="{{ asset('controller/studentProfileCtrl.js') }}"></script>
    <script src="{{ asset('controller/viewAppliedCtrl.js') }}"></script>
    <script src="{{ asset('controller/reportCtrl.js') }}"></script>
    <script src="{{ asset('controller/studentApplicationCtrl.js') }}"></script>

    <script src="{{ asset('services/mainService.js') }}"></script>

    <script src="{{ asset('controller/subjectCtrl.js') }}"></script>
    <script>var baseUrl = "{{url('/')}}/";</script>
    
            <!-- endbuild -->
         <!-- The Modal -->
<div class="modal fade" id="myModal" style="margin-left: 20px;" ng-controller="dashboardCtrl">
<div class="modal-dialog">
  <div class="modal-content" style="min-width: 200px; max-width: 1000px; margin-left: 87px; ">
  
    <!-- Modal Header -->
    <div class="modal-header" style="background-image: linear-gradient(200deg, #155799, #37b4d0); height: 35px;" ></div>
    
    <!-- Modal body -->
    <div class="modal-body"  >
      <ng-include src="'views/add_grade.html'"></ng-include>
    </div>
  </div>
</div>
</div>
<!-- modal -->
<div class="modal fade" id="update-status" style="margin-left: 20px;" >
  <div class="modal-dialog application-modal" id="application-modal">
    <div class="modal-content" style="min-width: 200px; max-width: 350px; margin-left: 410px; margin-top: 250px;">
      <!-- Modal Header -->
      <div class="modal-header" style="background-image: linear-gradient(200deg, #155799, #37b4d0); height: 35px;" >
        <button type="button" class="close" data-dismiss="modal" style="padding: 0px; position: relative; top: 2px; right: 12px;">&times;</button>
      </div>
      <div class="modal-body"  >
          <div class="container">
            <div class="row">
              <div class="col-lg-12" >
                <h5 style="color: #2aabc7; padding-bottom: 9px; margin: 10px 0 20px; border-bottom: 1px solid #d6d6d6;">
                  Update Status
                </h5>
              </div>
            </div>
            <div class="btn-group">
              <label class="btn btn-default" style="width: 6rem;">
                <input type="radio" name="optradio" style="transform: scale(1.2);" checked>
                Active
              </label>
              <label class="btn btn-default" style="width: 6rem;">
                <input type="radio" name="optradio" style="transform: scale(1.2);">
                Pending
              </label>
              <label class="btn btn-default" style="width: 6rem;">
                <input type="radio" name="optradio" style="transform: scale(1.2);">
                Renewed
              </label>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" style="background-image: linear-gradient(200deg, #155799, #37b4d0); height: 35px;" ng-click="printForm()">Save</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" style="height: 35px;">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" ng-controller="addscholarCtrl as addscholar" id="save-addedScholar" style="margin-left: 20px;" >
<div class="modal-dialog application-modal">
  <div class="modal-content" style="min-width: 200px; max-width: 350px; margin-left: 410px; margin-top: 210px;
   border: 1px solid rgba(0, 0, 0, 0.65);">
  
    <!-- Modal Header -->
    <div class="modal-header" style="background-image: linear-gradient(200deg, #155799, #37b4d0); height: 35px;" >
      <button type="button" class="close" data-dismiss="modal" style="padding: 0px; position: relative; top: 2px; right: 12px;">&times;</button>
    </div>
    
    <!-- Modal body -->
    <div class="modal-body"  >
        <div class="container">
          <div class="row">
            <div class="col-lg-12" >
              <h5 style="color: #2aabc7; padding-bottom: 9px; margin: 10px 0 20px; border-bottom: 1px solid #d6d6d6;">
                Confirm Account
              </h5>
            </div>
          </div>
            <input type="text" class="form-control dark-border" placeholder="subject" ng-model="addscholar.username">
            <input type="text" class="form-control dark-border" placeholder="description" ng-model="addscholar.password" style="margin-top: 3px;" >
        </div>
    </div>
    
    <!-- Modal footer -->
    <div class="modal-footer">
      <button type="button" class="btn btn-success" data-dismiss="modal" style="background-image: linear-gradient(200deg, #155799, #37b4d0); height: 35px;" ng-click="addscholar.saveToScholars(addscholar.username, addscholar.password)">Save</button>
      <button type="button" class="btn btn-danger" data-dismiss="modal" style="height: 35px;">Close</button>
    </div>
    
  </div>
  </div>
</div>

</body>
</html>