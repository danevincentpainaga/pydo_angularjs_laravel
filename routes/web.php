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

Route::get('/notes', 'notesController@getNotes'); 
Route::get('/edit_notes/{id}', 'notesController@findId'); 
Route::get('/notes/{id}', 'notesController@getNotesById'); 
Route::get('/getUsers', 'notesController@retrieveUsers');
Route::get('/pageCount', 'notesController@pageCount');
Route::get('/user/page/{id}', 'notesController@getUserIds');
Route::post('/addUser', 'notesController@storeNewUser'); 
Route::delete('/deleteUser/{id}', 'notesController@deleteUser');
Route::get('/appliedScholar/{municipalId}', 'notesController@getAppliedScholar');
Route::post('/addGrades', 'notesController@addGrades');
Route::get('/getPendingScholar/{municipalId}', 'notesController@pendingScholar');
Route::get('/getActiveScholar/{municipalId}', 'notesController@activeScholar');
Route::get('/editScholarData/{id}', 'notesController@editScholar');
Route::get('/getAllTowns', 'notesController@getTowns');
Route::get('/getMunicipalById/{municipalId}', 'notesController@getMunicipalById');
Route::get('/getMunicipalScholars/{id}', 'notesController@getMunicipalScholars');
Route::get('/appliedMunicipalScholars/{id}', 'notesController@appliedMunicipalScholars');
Route::post('/addSubject', 'notesController@storeNewSubject');
Route::get('/getSubjectData', 'notesController@getSubject');
Route::get('/getSchoolData', 'notesController@getSchool');
Route::get('/getDegrees', 'notesController@getDegrees');
Route::get('/CollegeYearData', 'notesController@CollegeYearData');
Route::get('/semestersData', 'notesController@semestersData');
Route::post('/addSchool', 'notesController@storeNewSchool');
Route::post('/updateAppliedScholars', 'notesController@updateAppliedData');
Route::post('/updatePendingScholars', 'notesController@updatePendingData');
Route::get('/getAllExtactedTowns', 'notesController@getExtactedTowns');
Route::get('/approveAll', 'notesController@approveAll');
Route::post('/removePendingScholars', 'notesController@removePendingData');
Route::post('/loginValidations', 'notesController@loginValidations');
Route::get('/getPositions', 'notesController@getPositions');
Route::get('/getAccessType', 'notesController@getAccessType');
Route::post('/postAppliedScholar', 'notesController@postAppliedScholar');
