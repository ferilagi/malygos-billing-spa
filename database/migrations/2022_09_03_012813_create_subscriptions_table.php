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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id()->startingValue(1001);
            $table->boolean('integration')->default(1);
            $table->foreignId('customer_id')
                    ->constrained('customers')
                    ->onDelete('cascade');
            $table->string('type');
            $table->ipAddress('ip_addr')->unique()->nullable();
            $table->string('queuename')->unique()->nullable();
            $table->string('username')->unique()->nullable();
            $table->string('password')->nullable();
            $table->boolean('is_taxed');
            $table->enum('status', ['active','isolated','nonactive'])->default('active');
            $table->boolean('auto_disable')->default(0);
            $table->boolean('first_transaction')->default(1);
            $table->tinyInteger('custom_duedate')->default(0);
            $table->foreignId('area_id')
                    ->unsigned()
                    ->nullable()
                    ->constrained('areas')
                    ->nullOnDelete();
            $table->integer('planable_id');
            $table->string('planable_type');
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
        Schema::dropIfExists('subscriptions');
    }
};
