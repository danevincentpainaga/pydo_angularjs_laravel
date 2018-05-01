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

class scholarController extends Controller
{
    public function pendingScholar($mid){
        $pendingScholar = list_applied_scholar::where(['statusId'=> 2, 'townId'=>$mid])->get();
        return $pendingScholar;
    }

     public function updatePendingData(Request $request){
        $updatedData = $request->all();
        $newUpdate = DB::table('list_applied_scholars')
            ->whereIn('applied_scholar_id', $updatedData)->update(['statusId' => 3]);
        return $newUpdate;
    }

    public function removePendingData(Request $request){
        $appliedData = $request->input('appliedDataId');
        $appliedData = list_applied_scholar::find($appliedData);
        $appliedData->statusId = 1;
        $appliedData->save();
        return $appliedData;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
    }

    public function getMunicipalScholars($id){
        $municipalScholars = list_applied_scholar::where(['statusId'=> 2, 'townId'=>$id])->get();
        return $municipalScholars;
    }
}
