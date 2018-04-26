<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class school extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        'school_name', 'location', 
    ];
}
