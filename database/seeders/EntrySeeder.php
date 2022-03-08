<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\{Entry, User};
use Illuminate\Database\Seeder;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(User $user): void
    {
        Entry::factory()
            ->count(10)
            ->for($user)
            ->create();
    }
}
