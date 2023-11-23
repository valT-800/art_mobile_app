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
        Schema::create('winnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('competition_id');
            $table->foreignId('post_id');

            $table->foreign('competition_id')->references('id')->on('competitions');
            $table->foreign('post_id')->references('id')->on('posts');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('winnings');
    }
};
