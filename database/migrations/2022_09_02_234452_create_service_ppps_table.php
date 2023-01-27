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
        Schema::create('service_ppps', function (Blueprint $table) {
            $table->id();
            $table->string('name_prof')->unique();
            $table->string('localAddress')->nullable();
            $table->string('remoteAddress');
            $table->string('rateLimit');
            $table->string('parentQueue')->nullable();
            $table->string('addressList')->nullable();
            $table->string('interfaceList')->nullable();
            $table->string('dnsServer')->nullable();
            $table->string('onlyOne')->nullable();
            $table->string('onUp')->nullable();
            $table->string('onDown')->nullable();
            $table->string('prefixQueue')->nullable();
            $table->string('sufixQueue')->nullable();
            $table->string('comment')->nullable();
            $table->integer('price')->default(0);
            $table->integer('commission')->default(0);
            $table->string('spelled')->nullable();
            $table->string('alias')->nullable();
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
        Schema::dropIfExists('service_ppps');
    }
};
