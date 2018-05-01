<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

//userController
Route::get('/getUsers', 'userController@retrieveUsers');
Route::get('/pageCount/{municipalId}', 'userController@pageCount');
// Route::get('/user/page/{id}', 'userController@getUserIds');
Route::get('/getAllTowns', 'userController@getTowns');
Route::get('/user/page/{id}/{mid}', 'userController@getUserIds');


//addscholarController
Route::get('/getPendingScholar/{municipalId}', 'addscholarController@pendingScholar');
Route::post('/updatePendingScholars', 'addscholarController@updatePendingData');
Route::post('/removePendingScholars', 'addscholarController@removePendingData');
// Route::get('/getAllTowns', 'scholarController@getTowns');
Route::get('/getMunicipalScholars/{id}', 'addscholarController@getMunicipalScholars');

// adduserController
Route::post('/addUser', 'adduserController@storeNewUser');
// Route::get('/getAllTowns', 'adduserController@getTowns');
Route::get('/getPositions', 'adduserController@getPositions');
Route::get('/getAccessType', 'adduserController@getAccessType'); 

// applicationController
Route::post('/postAppliedScholar', 'applicationController@postAppliedScholar');
// Route::get('/getAllTowns', 'applicationController@getTowns');
Route::get('/getByUserTown/{id}', 'applicationController@getByUserTown');
Route::get('/getSchoolData', 'applicationController@getSchool');
Route::get('/CollegeYearData', 'applicationController@CollegeYearData');
Route::get('/semestersData', 'applicationController@semestersData');

// appliedScholarController
Route::get('/appliedScholar/{municipalId}', 'appliedScholarController@getAppliedScholar');
Route::post('/addGrades', 'appliedScholarController@addGrades');
Route::get('/getSubjectData', 'appliedScholarController@getSubject');
Route::post('/updateAppliedScholars', 'appliedScholarController@updateAppliedData');
Route::get('/approveAll', 'appliedScholarController@approveAll');
Route::get('/appliedMunicipalScholars/{id}', 'appliedScholarController@appliedMunicipalScholars');
// Route::get('/getAllTowns', 'appliedScholarController@getTowns');
Route::post('/getDateRange', 'appliedScholarController@getDateRange');


// editScholarController
Route::get('/editScholarData/{id}', 'editScholarController@editScholar');

// schoolController
Route::post('/addSchool', 'schoolController@storeNewSchool');
// Route::get('/getSchoolData', 'schoolController@getSchool');

// registerController
Route::post('/registerStudent', 'registerController@registerStudent');



Route::get('/notes', 'notesController@getNotes'); 
Route::get('/edit_notes/{id}', 'notesController@findId'); 
Route::get('/notes/{id}', 'notesController@getNotesById'); 

Route::delete('/deleteUser/{id}', 'notesController@deleteUser');
// Route::get('/getPendingScholar/{municipalId}', 'notesController@pendingScholar');
Route::get('/getActiveScholar/{municipalId}', 'notesController@activeScholar');
Route::get('/getMunicipalById/{municipalId}', 'notesController@getMunicipalById');
// Route::get('/getMunicipalScholars/{id}', 'notesController@getMunicipalScholars');
Route::post('/addSubject', 'notesController@storeNewSubject');
Route::get('/getDegrees', 'notesController@getDegrees');
// Route::post('/updatePendingScholars', 'notesController@updatePendingData');
Route::get('/getAllExtactedTowns', 'notesController@getExtactedTowns');
// Route::post('/removePendingScholars', 'notesController@removePendingData');
Route::post('/loginValidations', 'notesController@loginValidations');
Route::post('/validateStudentLogin', 'notesController@validateStudentLogin');


