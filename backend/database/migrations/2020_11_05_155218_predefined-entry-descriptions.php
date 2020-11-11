<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PredefinedEntryDescriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('predefined_entry_descriptions',function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('cash_box_id');
            $table->string('value');
            $table->foreign('cash_box_id')->references('id')->on('cash_boxes')->onDelete('cascade');
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
        Schema::dropIfExists('predefined_entry_descriptions');
    }
}
