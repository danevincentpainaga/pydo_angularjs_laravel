<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRelationshipProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relationship_profiles', function (Blueprint $table) {
            $table->increments('relationship_profile_id');
            $table->string('relationship_info');
            $table->string('rel_name');
            $table->string('occupation');
            $table->unsignedInteger('appliedScholarId')->nullable();
            $table->foreign('appliedScholarId')->references('applied_scholar_id')->on('list_applied_scholars');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('relationship_profiles');
    }
}
