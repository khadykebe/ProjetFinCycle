<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TableCreateRendervous extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rendervous', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('heure');
            $table->string('adresse');
            $table->bigInteger('users_id')->unsigned()->nullable();
            $table->foreign('users_id')->references('id')->on('users');
            

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
        Schema::dropIfExists('rendervous');
    }
}
