<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'username', 'password', 
        'gender', 'contact_no', 'positionId', 'townId', 'userAccessId', 
        'statusId' 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token', 'user_id', 'lastname', 'username', 'password', 
        'gender', 'contact_no', 'created_at', 'updated_at'
    ];
}
