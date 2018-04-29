<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class list_applied_scholar extends Model
{
    protected $primaryKey = 'applied_scholar_id';
    protected $fillable = [
        'applied_name', 'firstname', 'lastname', 'middle_name', 'age', 'gender', 
        'barangay', 'religion', 'contact_no', 'date_of_birth', 'civil_status', 'academic_year', 
        'student_id_number', 'schoolId', 'degreeId', 'collegeYearId', 'semesterId', 'statusId', 
        'townId'
    ];
}
