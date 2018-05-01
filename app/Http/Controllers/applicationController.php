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

class applicationController extends Controller
{
    public function postAppliedScholar(Request $request){
        $appliedDatas = $request->all();
        foreach ($appliedDatas as $appliedData) {
            list_applied_scholar::create($appliedData);
        }
        return $appliedDatas;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
    }

    public function getByUserTown($id){
        $town = towns::find($id);
        return $town;
    }

    public function getSchool(){
        $school = school::all();
        return $school;
    }

    public function CollegeYearData(){
        $college_year = college_year::all();
        return $college_year;
    }

    public function semestersData(){
        $semester = semester::all();
        return $semester;
    }
}
