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
}
