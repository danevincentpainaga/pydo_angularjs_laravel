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

class adduserController extends Controller
{
    public function storeNewUser(Request $request){
        $users = $request->json()->all();
        foreach ($users as $user) {
            User::create($users);
        }
        return $users;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
    }

    public function getPositions(){
        $position = position::all();
        return $position;
    }

    public function getAccessType(){
        $userAccess = user_access::all();
        return $userAccess;
    }
}
