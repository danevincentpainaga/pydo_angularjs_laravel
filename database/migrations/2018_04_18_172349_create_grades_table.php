<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGradesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->increments('grades_id');
            $table->unsignedInteger('subjectId')->nullable();
            $table->unsignedInteger('userId')->nullable();
            $table->foreign('subjectId')->references('subject_id')->on('subjects');
            $table->foreign('scholarId')->references('student_id')->on('applied_scholars');
            $table->integer('grades');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('grades');
    }
}
