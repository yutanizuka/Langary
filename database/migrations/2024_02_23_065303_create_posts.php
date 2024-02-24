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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->text('native_diary');
            $table->text('learning_diary');
            $table->text('check_diary');
            $table->unsignedInteger('local_language_id');
            $table->unsignedInteger('learning_language_id');
            $table->now('last_sign_in_at');
            $table->boolean('private_flag');
            $table->timestamps();

             // 外部キー制約の追加
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('local_language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->foreign('learning_language_id')->references('id')->on('languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
