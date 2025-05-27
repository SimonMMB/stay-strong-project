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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->integer('training_frequency');
            $table->integer('training_duration');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('start_date')->nullable();
            $table->date('estimated_end_date')->nullable();
            $table->integer('total_sessions')->nullable();
            $table->integer('completed_sessions')->default(0);
            $table->integer('remaining_sessions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
