<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('username');
            $table->string('password');
            $table->string('gender');
            $table->integer('contact_no');
            $table->unsignedInteger('positionId')->nullable();
            $table->unsignedInteger('townId')->nullable();
            $table->unsignedInteger('userAccessId')->nullable();
            $table->unsignedInteger('statusId')->nullable();
            $table->foreign('positionId')->references('position_id')->on('positions');
            $table->foreign('townId')->references('town_id')->on('towns');
            $table->foreign('userAccessId')->references('user_accesses_id')->on('user_accesses');
            $table->foreign('statusId')->references('status_id')->on('statuses');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
