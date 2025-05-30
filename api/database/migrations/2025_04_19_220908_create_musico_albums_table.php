<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('musico_albums', function (Blueprint $table) {
            $table->id();

            $table->foreignId('musicoId')
                  ->constrained('musicos')
                  ->onDelete('cascade');

            $table->foreignId('albumId')
                  ->constrained('albums')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('musico_albums');
    }
};
