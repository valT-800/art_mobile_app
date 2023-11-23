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
        Schema::create('exhibitions_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exhibition_id');
            $table->foreignId('post_id');

            $table->foreign('exhibition_id')->references('id')->on('exhibitions');
            $table->foreign('post_id')->references('id')->on('posts');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exhibitions_posts');
    }
};
