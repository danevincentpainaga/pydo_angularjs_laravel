<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class grade extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public $timestamps = false;
    
    protected $fillable = [
        'scholarId', 'subjectId', 'grades', 
    ];
}
