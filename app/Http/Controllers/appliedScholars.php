<?php


namespace App\Http\Controllers;
use App\notes;
use App\User;
use App\applied_scholar;
use App\grade;
use App\towns;
use App\subject;
use App\school;
use Illuminate\Http\Request;
use DB;

class appliedScholars extends Controller
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
        $user = DB::table('users')->offset($id)->limit(10)->get();
        return $user;
    }
    
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

    public function getAppliedScholar(){
        $applied_scholar = applied_scholar::where('statusId', 1)->get();
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
        $scholarTotal = applied_scholar::where(['statusId'=> 2, 'townId'=>$townId ])->count();
        if($scholarTotal >= $maxValue->total_scholar){
            return 'false';
        }
        else
        {
            $applied_scholar = applied_scholar::find($applied);
            $applied_scholar->statusId = 2;
            $applied_scholar->save();
            return $applied_scholar;
        }

    }

    public function approveAll(){
       $newUpdate =  DB::table('applied_scholars')
        ->where(['statusId'=> 1, 'townId'=>1])
        ->limit(2)
        ->update(['statusId'=> 2]);
        return $newUpdate;
    }

    public function updatePendingData(Request $request){
        $updatedData = $request->all();
        $newUpdate = DB::table('applied_scholars')
            ->whereIn('student_id', $updatedData)->update(['statusId' => 3]);
        return $newUpdate;
    }

    public function pendingScholar(){
        $pendingScholar = applied_scholar::where('statusId', 2)->get();
        return $pendingScholar;
    }
    public function getMunicipalScholars($id){
        $municipalScholars = DB::table('applied_scholars')
        ->where(['statusId'=> 2, 'townId'=> $id])->get();
        return $municipalScholars;
    }

    public function appliedMunicipalScholars($id){
        $municipalScholars = DB::table('applied_scholars')
        ->where(['statusId'=> 1, 'townId'=> $id])->get();
        return $municipalScholars;
    }


    public function activeScholar(){
        $activeScholar = applied_scholar::where('statusId', 3)->get();
        return $activeScholar;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
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

    public function storeNewSchool(Request $request){
        $schools = $request->json()->all();
        
        foreach ($schools as $school) {
            school::create($school);
        }
 
        return $schools;
    }

    public function editScholar($id){
        $scholarData = applied_scholar::find($id);
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
        $appliedData = applied_scholar::find($appliedData);
        $appliedData->statusId = 1;
        $appliedData->save();
        return $appliedData;
    }
}
