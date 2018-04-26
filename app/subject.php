<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        'subject_id', 'subject_name', 'description', 
    ];
}
