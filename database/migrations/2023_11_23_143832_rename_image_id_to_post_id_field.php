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
        Schema::table('posts_likes', function (Blueprint $table) {
            $table->renameColumn('image_id','post_id');
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->renameColumn('image_id','post_id');
        });
        Schema::table('posts_saved', function (Blueprint $table) {
            $table->renameColumn('image_id','post_id');
        });
        Schema::table('posts_tags', function (Blueprint $table) {
            $table->renameColumn('image_id','post_id');
        });
        Schema::table('competitions_posts', function (Blueprint $table) {
            $table->renameColumn('image_id','post_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
