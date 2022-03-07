<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entry>
 */
class EntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'text' => $this->faker->sentence(),
            'completed_at' => $this->faker->optional(.1)->dateTimeBetween('-1 year'),
            'expires_at' => $this->faker->optional(.1)->dateTimeBetween('now', '1 year'),
        ];
    }
}
