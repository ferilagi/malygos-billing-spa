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
        Schema::create('service_statics', function (Blueprint $table) {
            $table->id();
            $table->string('name_prof')->unique();
            $table->ipAddress('ip_range');
            $table->integer('netmask');
            $table->string('limitAt')->nullable();
            $table->string('rateLimit');
            $table->string('burstLimit')->nullable();
            $table->string('burstThres')->nullable();
            $table->string('burstTime')->nullable();
            $table->integer('priority')->nullable();
            $table->string('parentQueue')->nullable();
            $table->string('prefixQueue')->nullable();
            $table->string('sufixQueue')->nullable();
            $table->string('comment')->nullable();
            $table->integer('price')->default(0);
            $table->integer('commission')->default(0);
            $table->string('spelled')->nullable();
            $table->string('alias')->nullable();
            $table->string('variant')->default('firewall');
            $table->string('routers');
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
        Schema::dropIfExists('service_statics');
    }
};
