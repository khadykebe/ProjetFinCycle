<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TableCreateMaisons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        Schema::create('maisons', function (Blueprint $table) {
        $table->id();
        $table->string('prix');
        $table->text('description');
        $table->integer('nomchambre');
        $table->string('image');
        $table->string('lieuLogement');

        $table->bigInteger('users_id')->unsigned()->nullable();
        $table->foreign('users_id')->references('id')->on('users');

       
        $table->bigInteger('categories_id')->unsigned()->nullable();
        $table->foreign('categories_id')->references('id')->on('categories');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('maisons');

    }
}
