<?php

namespace Database\Factories;

use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProgramFactory extends Factory
{
    protected $model = Program::class;

    public function definition()
    {
        $startDate = $this->faker->dateTimeBetween('now', '+1 month');

        return [
            'training_frequency' => $this->faker->numberBetween(1, 7),
            'training_duration' => $this->faker->numberBetween(1, 12),
            'start_date' => $startDate->format('Y-m-d'),
            'estimated_end_date' => $this->faker->dateTimeBetween($startDate, '+6 months')->format('Y-m-d'),
            'user_id' => \App\Models\User::factory(),
            'total_sessions' => $this->faker->numberBetween(10, 100),
            'completed_sessions' => 0,
            'remaining_sessions' => function (array $attributes) {
                return $attributes['total_sessions'];
            }
        ];
    }

}