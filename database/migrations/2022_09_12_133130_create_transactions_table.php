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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('invoice')->unique();
            $table->foreignId('sub_id')
                    ->constrained('subscriptions')
                    ->onDelete('cascade');
            $table->integer('subtotal');
            $table->integer('taxtotal');
            $table->integer('total');
            $table->dateTime('date');
            $table->dateTime('dueDate');
            $table->string('status');
            $table->string('method')->default('cash');
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
        Schema::dropIfExists('transactions');
    }
};
