<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('master_awb')->nullable();
            $table->string('flight_number');
            $table->dateTime('departure')->default('2022-01-08 06:56:33');
            $table->string('destination')->nullable();
            $table->integer('jumlah_koli')->default(0);
            $table->string('kemasan')->nullable();
            $table->integer('booked')->default(0);
            $table->integer('used')->default(0);
            $table->smallInteger('is_available')->nullable()->default(0);
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
        Schema::dropIfExists('bookings');
    }
};
