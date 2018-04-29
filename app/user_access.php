<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_access extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'user_accesses_id';
}
