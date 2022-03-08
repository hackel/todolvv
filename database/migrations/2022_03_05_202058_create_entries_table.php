<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('entries', static function (Blueprint $table): void {
            $table->id();
            $table
                ->char('uuid', 16)
                ->charset('binary')
                ->unique();
            $table
                ->foreignIdFor(User::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->text('text')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table
                ->dateTime('expires_at')
                ->nullable()
                ->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entries');
    }
};
