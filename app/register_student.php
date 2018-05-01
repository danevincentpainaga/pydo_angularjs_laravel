<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class register_student extends Model
{
	protected $primaryKey = 'register_id';
    protected $hidden = ['created_at', 'updated_at' ];
}
