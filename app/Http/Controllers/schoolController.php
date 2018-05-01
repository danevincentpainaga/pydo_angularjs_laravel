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

class schoolController extends Controller
{
    public function storeNewSchool(Request $request){
        $schools = $request->json()->all();
        foreach ($schools as $school) {
            school::create($school);
        }
        return $schools;
    }

    public function getSchool(){
        $school = school::all();
        return $school;
    }
}
