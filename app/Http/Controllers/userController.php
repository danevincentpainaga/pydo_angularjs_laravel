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

class userController extends Controller
{
    public function retrieveUsers(){
        $users= User::all();
        return $users;
    }

    public function getUserIds($id, $mid){
        $scholarData = DB::table('users')->where('townId', $mid)
        ->join('towns', 'users.townId', '=', 'towns.town_id')
        ->join('positions', 'users.positionId', '=', 'positions.position_id')
        ->join('user_accesses', 'users.userAccessId', '=', 'user_accesses.user_accesses_id')
        ->select('users.*', 'towns.town_name', 'positions.position_level', 'user_accesses.*')->orderBy('users.user_id')
        ->offset($id)->limit(20)->get();
        return $scholarData;
    }

    public function pageCount($mid){
        $count = DB::table('users')->where('townId', $mid)->count();
        return $count;
    }

    public function getTowns(){
        $towns = towns::all();
        return $towns;
    }
}
