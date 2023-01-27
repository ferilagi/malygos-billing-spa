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
        Schema::create('customers', function (Blueprint $table) {
            $table->id()->startingValue(1001);
            $table->foreignId('user_id')
                    ->constrained('users')
                    ->onDelete('cascade');
            $table->string('name');
            $table->string('phone')->unique()->nullable();
            $table->string('email')->unique();
            $table->mediumText('address')->nullable();
            $table->timestamp('joined_at')->nullable();
            $table->string('lat')->nullable();
            $table->string('lon')->nullable();
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
        Schema::dropIfExists('customers');
    }
};