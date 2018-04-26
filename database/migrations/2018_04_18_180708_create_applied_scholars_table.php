<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppliedScholarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applied_scholars', function (Blueprint $table) {
            $table->increments('student_id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('middle_name');
            $table->string('address');
            $table->integer('contact_no');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('fathers_name');
            $table->string('mothers_maiden_name');
            $table->unsignedInteger('schoolId')->nullable();
            $table->unsignedInteger('statusId')->nullable();
            $table->unsignedInteger('townId')->nullable();
            $table->foreign('schoolId')->references('school_id')->on('schools');
            $table->foreign('statusId')->references('status_id')->on('statuses');
            $table->foreign('townId')->references('town_id')->on('towns');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applied_scholars');
    }
}
