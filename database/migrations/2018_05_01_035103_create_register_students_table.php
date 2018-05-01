<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegisterStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_students', function (Blueprint $table) {
            $table->increments('register_id');
            $table->string('username');
            $table->string('password');
            $table->unsignedInteger('userAccessId')->nullable();
            $table->foreign('userAccessId')->references('user_accesses_id')->on('user_accesses');
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
        Schema::dropIfExists('register_students');
    }
}
