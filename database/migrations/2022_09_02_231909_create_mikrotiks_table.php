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
        Schema::create('mikrotiks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('ip_addr')->unique();
            $table->string('user');
            $table->string('pass');
            $table->integer('port')->default('8728');
            $table->string('description')->nullable();
            $table->boolean('is_active')->default(1);
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
        Schema::dropIfExists('mikrotiks');
    }
};
