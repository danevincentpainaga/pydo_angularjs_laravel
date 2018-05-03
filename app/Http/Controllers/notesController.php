<?php

namespace App\Http\Controllers;
use App\notes;
use App\User;
use App\list_applied_scholar;
use App\grade;
use App\towns;
use App\subject;
use App\school;
use App\position;
use App\user_access;
use App\degree;
use App\college_year;
use App\semester;
use App\register_student;
use Illuminate\Http\Request;
use DB;

class notesController extends Controller
{
    public function getNotes(){
        $notes = notes::all();
        return $notes;
    }

    public function getNotesById($id){
        $note = notes::take($id)->skip($id)->get();
        return $note;
    }
    public function pageCount(){
        $count = User::count();
        return $count;
    }
    public function getUserIds($id){
        // $user = DB::table('users')->offset($id)->limit(10)->get();
        // return $user;
        $scholarData = DB::table('users')
        ->join('towns', 'users.townId', '=', 'towns.town_id')
        ->join('positions', 'users.positionId', '=', 'positions.position_id')
        ->join('user_accesses', 'users.userAccessId', '=', 'user_accesses.user_accesses_id')
        ->select('users.*', 'towns.town_name', 'positions.position_level', 'user_accesses.*')->orderBy('users.user_id')
        ->offset($id)->limit(20)->get();
        return $scholarData;
    }

    // public function getUserIds($id){
    //     // $user = DB::table('users')->offset($id)->limit(10)->get();
    //     // return $user;
    //     $scholarData = DB::table('users')
    //     ->join('towns', 'users.townId', '=', 'towns.town_id')
    //     ->join('positions', 'users.positionId', '=', 'positions.position_id')
    //     ->join('user_accesses', 'users.userAccessId', '=', 'user_accesses.user_accesses_id')
    //     ->select('users.*', 'towns.town_name', 'positions.position_level', 'user_accesses.*')
    //     ->offset($id)->limit(10)->get();
    //     return $scholarData;
    // }
    
    public function findId($id){
        $note = notes::find($id);
        return $note;
    }

    public function retrieveUsers(){
        $users= User::all();
        return $users;
    }
    // need to be fixed
    public function storeNewUser(Request $request){
        $tracks = $request->json()->all();
        
        foreach ($tracks as $track) {
            User::create($track);
        }
 
        return $tracks;
    }

    public function deleteUser($uid){
        User::find($uid)->delete();
        return 'deleted';
    }

    public function getAppliedScholar($mid){
        $applied_scholar = list_applied_scholar::where(['statusId'=> 1, 'townId'=> $mid])->get();
        return $applied_scholar;
    }

    public function addGrades(Request $request){
        $grades = $request->json()->all();           
        foreach ($grades as $grade) {
            grade::create($grade);
        }
        return $grades;
    }

    public function updateAppliedData(Request $request){
        $applied = $request->input('appliedId');
        $townId = $request->input('townId');
        $maxValue = towns::find($townId);
        $scholarTotal = list_applied_scholar::where(['statusId'=> 2, 'townId'=>$townId ])->count();
        if($scholarTotal >= $maxValue->total_scholar){
            return 'false';
        }
        else
        {
            $applied_scholar = list_applied_scholar::find($applied);
            $applied_scholar->statusId = 2;
            $applied_scholar->save();
            return $applied_scholar;
        }

    }

    public function approveAll(){
       $newUpdate =  DB::table('list_applied_scholars')
        ->where(['statusId'=> 1, 'townId'=>1])
        ->limit(2)
        ->update(['statusId'=> 2]);
        return $newUpdate;
    }

    public function updatePendingData(Request $request){
        $updatedData = $request->all();
        $newUpdate = DB::table('list_applied_scholars')
            ->whereIn('applied_scholar_id', $updatedData)->update(['statusId' => 3]);
        return $newUpdate;
    }

    public function pendingScholar($mid){
        $pendingScholar = list_applied_scholar::where(['statusId'=> 2, 'townId'=>$mid])->get();
        return $pendingScholar;
    }
    public function getMunicipalScholars($id){
        $municipalScholars = list_applied_scholar::where(['statusId'=> 2, 'townId'=>$id])->get();
        return $municipalScholars;
    }

    public function appliedMunicipalScholars($id){
        $municipalScholars = DB::table('list_applied_scholars')
        ->where(['statusId'=> 1, 'townId'=> $id])->get();
        return $municipalScholars;
    }


    public function activeScholar($mid){
        $activeScholar = list_applied_scholar::where(['statusId'=> 3, 'townId'=>$mid])->get();
        return $activeScholar;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
    }

    public function getByUserTown($id){
        $town = towns::find($id);
        return $town;
    }

    public function getMunicipalById($mid){
        $municipal = towns::find($mid);
        return $municipal;
    }
    
    public function storeNewSubject(Request $request){
        $subjects = $request->json()->all();
        
        foreach ($subjects as $subject) {
            subject::create($subject);
        }
 
        return $subjects;
    }
    
    public function getSubject(){
        $subject = subject::all();
        return $subject;
    }

    public function getSchool(){
        $school = school::all();
        return $school;
    }

    public function getDegrees(){
        $degree = degree::all();
        return $degree;
    }

    public function CollegeYearData(){
        $college_year = college_year::all();
        return $college_year;
    }

    public function semestersData(){
        $semester = semester::all();
        return $semester;
    }

    public function storeNewSchool(Request $request){
        $schools = $request->json()->all();
        foreach ($schools as $school) {
            school::create($school);
        }
        return $schools;
    }

    public function editScholar($id){
        $scholarData = list_applied_scholar::find($id);
        return $scholarData;
    }
    
    public function getExtactedTowns(){
        $array = [];
        $towns = towns::all();
        foreach ($towns as $val) {
            $array[$val->town_name] = $val->total_scholar;
        }
        return $array;
    }

    public function removePendingData(Request $request){
        $appliedData = $request->input('appliedDataId');
        $appliedData = list_applied_scholar::find($appliedData);
        $appliedData->statusId = 1;
        $appliedData->save();
        return $appliedData;
    }

    public function loginValidations(Request $request){
        $username = $request->input('username');
        $password = $request->input('password');
        $loginResult = User::where(['username'=> $username, 'password'=> $password])->get();
        return $loginResult;
    }

    public function validateStudentLogin(Request $request){
        $username = $request->input('username');
        $password = $request->input('password');
        $loginResult = register_student::where(['username'=> $username, 'password'=> $password])->get();
        return $loginResult;
    }

    public function getPositions(){
        $position = position::all();
        return $position;
    }

    public function getAccessType(){
        $userAccess = user_access::all();
        return $userAccess;
    }

    public function postAppliedScholar(Request $request){
        $appliedDatas = $request->all();
        foreach ($appliedDatas as $appliedData) {
            list_applied_scholar::create($appliedData);
        }
        return $appliedDatas;
    }

    public function getDateRange(Request $request){
        $date = $request->input('filteredDate');
        // $municipal_id = $request->input('municipalId');
        $newDates = list_applied_scholar::where('created_at','<=', $date )->get();
        // $newDates = list_applied_scholar::where(['created_at','<=', $date, 'townId','=', $municipal_id])->get();
        return $newDates;
    }

    public function registerStudent(Request $request){
        $username = $request->input('username');
        $password = $request->input('password');
        $register = register_student::where(['username'=> $username, 'password'=> $password])->count();
        if($register > 0 ){
            return '404';
        }
        else{
            $registerData = new register_student();
            $registerData->username = $username;
            $registerData->password = $password;
            $registerData->userAccessId = 4;
            $registerData->save();
            return $registerData;
        }
    }
    
    public function updateMaxLimit(Request $request){  
        $newMax = $request->all();
        $newMaxValue= [];
        $idx = 0;
        $town = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        for ($i=0; $i <= count($newMax)-1 ; $i++) { 
            $newMaxVal = towns::find($town[$i]);
            $newMaxVal->total_scholar = $newMax[$i]['townName'];
            $newMaxVal->save();
            array_push($newMaxValue, $newMaxVal);
        }
        return $newMaxValue;
    }

    public function getStudentInfo($sid){
        $studentData = DB::table('list_applied_scholars')->where('registerId', $sid)
        ->join('towns', 'list_applied_scholars.townId', '=', 'towns.town_id')
        ->join('schools', 'list_applied_scholars.schoolId', '=', 'schools.school_id')
        ->join('degrees', 'list_applied_scholars.degreeId', '=', 'degrees.degree_id')
        ->join('college_years', 'list_applied_scholars.collegeYearId', '=', 'college_years.college_year_id')
        ->join('semesters', 'list_applied_scholars.semesterId', '=', 'semesters.semester_id')
        // ->join('relationship_profiles', 'list_applied_scholar.rel_profile_id', '=', 'relationship_profiles.relationship_profile_id')
        ->select('list_applied_scholars.*', 'towns.town_name', 'schools.school_name', 'degrees.degree_name', 'college_years.college_year_name', 'semesters.semesters_name')->limit(1)->get();
        return $studentData;
    }


    public function getAppliedInfo($aid){
        $studentData = DB::table('list_applied_scholars')->where('applied_scholar_id', $aid)
        ->join('towns', 'list_applied_scholars.townId', '=', 'towns.town_id')
        ->join('schools', 'list_applied_scholars.schoolId', '=', 'schools.school_id')
        ->join('degrees', 'list_applied_scholars.degreeId', '=', 'degrees.degree_id')
        ->join('college_years', 'list_applied_scholars.collegeYearId', '=', 'college_years.college_year_id')
        ->join('semesters', 'list_applied_scholars.semesterId', '=', 'semesters.semester_id')
        // ->join('relationship_profiles', 'list_applied_scholar.rel_profile_id', '=', 'relationship_profiles.relationship_profile_id')
        ->select('list_applied_scholars.*', 'towns.town_name', 'schools.school_name', 'degrees.degree_name', 'college_years.college_year_name', 'semesters.semesters_name')->limit(1)->get();
        return $studentData;
    }

    // public function editScholar($id){
    //     $scholarData = DB::table('applied_scholars')
    //     ->join('grades', 'applied_scholars.student_id', '=', 'grades.scholarId')
    //     ->select('applied_scholars.*', 'grades.*')->where('applied_scholars.student_id', $id)
    //     ->get();
    //     return $scholarData;
    // }

// DB::table('table')
//     ->where('field', 'value')
//     ->limit(1)
//     ->update(['field', 'new value']);
}