<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListAppliedScholarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_applied_scholars', function (Blueprint $table) {
            $table->increments('applied_scholar_id');
            $table->string('applied_name');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('middle_name');
            $table->string('address');
            $table->integer('age');
            $table->string('gender');
            $table->string('barangay');
            $table->string('religion');
            $table->integer('contact_no');
            $table->date('date_of_birth');
            $table->string('civil_status');
            $table->date('academic_year');
            $table->integer('student_id_number');
            $table->unsignedInteger('schoolId')->nullable();
            $table->unsignedInteger('degreeId')->nullable();
            $table->unsignedInteger('collegeYearId')->nullable();
            $table->unsignedInteger('semesterId')->nullable();
            $table->unsignedInteger('statusId')->nullable();
            $table->unsignedInteger('townId')->nullable();
            $table->unsignedInteger('rel_profile_id')->nullable();
            $table->foreign('schoolId')->references('school_id')->on('schools');
            $table->foreign('degreeId')->references('degree_id')->on('degrees');
            $table->foreign('collegeYearId')->references('college_year_id')->on('college_years');
            $table->foreign('semesterId')->references('semester_id')->on('semesters');
            $table->foreign('statusId')->references('status_id')->on('statuses');
            $table->foreign('townId')->references('town_id')->on('towns');
            $table->foreign('rel_profile_id')->references('relationship_profile_id')->on('relationship_profiles');
            $table->timestamps();
        });

        Schema::table('list_applied_scholars', function (Blueprint $table) {
            $table->string('course');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('list_applied_scholars');
    }
}
