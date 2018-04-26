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
Route::get('/appliedScholar', 'notesController@getAppliedScholar');
Route::post('/addGrades', 'notesController@addGrades');
Route::get('/getPendingScholar', 'notesController@pendingScholar');
Route::get('/getActiveScholar', 'notesController@activeScholar');
Route::get('/editScholarData/{id}', 'notesController@editScholar');
Route::get('/getAllTowns', 'notesController@getTowns');
Route::get('/getMunicipalScholars/{id}', 'notesController@getMunicipalScholars');
Route::post('/addSubject', 'notesController@storeNewSubject');
Route::get('/getSubjectData', 'notesController@getSubject');
Route::get('/getSchoolData', 'notesController@getSchool');
Route::post('/addSchool', 'notesController@storeNewSchool');
Route::post('/updateAppliedScholars', 'notesController@updateAppliedData');
Route::post('/updatePendingScholars', 'notesController@updatePendingData');
Route::get('/scholarCount/{max}', 'notesController@scholarCount');
Route::get('/getAllExtactedTowns', 'notesController@getExtactedTowns');
