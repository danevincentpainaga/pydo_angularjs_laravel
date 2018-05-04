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

class appliedScholarController extends Controller
{
    public function getAppliedScholar($mid){
        // $applied_scholar = list_applied_scholar::where(['statusId'=> 1, 'townId'=> $mid])->get();
        // return $applied_scholar;
         $applied_scholar = DB::table('list_applied_scholars')->where(['statusId'=> 1, 'townId'=> $mid])
        ->join('towns', 'list_applied_scholars.townId', '=', 'towns.town_id')
        ->join('schools', 'list_applied_scholars.schoolId', '=', 'schools.school_id')
        ->join('degrees', 'list_applied_scholars.degreeId', '=', 'degrees.degree_id')
        ->join('college_years', 'list_applied_scholars.collegeYearId', '=', 'college_years.college_year_id')
        ->join('semesters', 'list_applied_scholars.semesterId', '=', 'semesters.semester_id')
        // ->join('relationship_profiles', 'list_applied_scholar.rel_profile_id', '=', 'relationship_profiles.relationship_profile_id')
        ->select('list_applied_scholars.*', 'towns.town_name', 'schools.school_name', 'degrees.degree_name', 'college_years.college_year_name', 'semesters.semesters_name')->orderBy('applied_scholar_id')->get();
        return $applied_scholar;   
    }

    public function addGrades(Request $request){
        $grades = $request->json()->all();           
        foreach ($grades as $grade) {
            grade::create($grade);
        }
        return $grades;
    }

    public function getSubject(){
        $subject = subject::all();
        return $subject;
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

    public function appliedMunicipalScholars($id){
        $municipalScholars = DB::table('list_applied_scholars')
        ->where(['statusId'=> 1, 'townId'=> $id])->get();
        return $municipalScholars;
    }

    public function getByUserTown($id){
        $town = towns::find($id);
        return $town;
    }

    public function getDateRange(Request $request){
        $date = $request->input('filteredDate');
        // $municipal_id = $request->input('municipalId');
        $newDates = list_applied_scholar::where('created_at','<=', $date )->get();
        // $newDates = list_applied_scholar::where(['created_at','<=', $date, 'townId','=', $municipal_id])->get();
        return $newDates;
    }

    public function updateNotRenewed(Request $request){
        $scholarcount = list_applied_scholar::where('statusId','=', 3)->count();
        if($scholarcount > 0){
            $newStatus = $request->input('newStatus');
            $newUpdate =  DB::table('list_applied_scholars')
            ->where('statusId','=', 3)
            ->update(['statusId'=> $newStatus]);
        }
    }
}

    // public function getUserIds($id, $mid){
    //     $scholarData = DB::table('users')->where('townId', $mid)
    //     ->join('towns', 'users.townId', '=', 'towns.town_id')
    //     ->join('positions', 'users.positionId', '=', 'positions.position_id')
    //     ->join('user_accesses', 'users.userAccessId', '=', 'user_accesses.user_accesses_id')
    //     ->select('users.*', 'towns.town_name', 'positions.position_level', 'user_accesses.*')->orderBy('users.user_id')
    //     ->offset($id)->limit(20)->get();
    //     return $scholarData;
    // }