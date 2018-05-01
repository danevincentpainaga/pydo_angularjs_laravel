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

class registerController extends Controller
{
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
}
