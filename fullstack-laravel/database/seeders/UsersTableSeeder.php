<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Simone',
                'email' => 'simone@example.com',
                'password' => bcrypt('password123'),
                'surname' => 'Menendez',
                'training_frequency' => 5,
                'training_duration' => 6,
                'start_date' => '2025-03-20',
                'estimated_end_date' => '2025-09-20',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Carlos',
                'email' => 'carlos@example.com',
                'password' => bcrypt('password123'),
                'surname' => 'Gonzalez',
                'training_frequency' => 3,
                'training_duration' => 4,
                'start_date' => '2025-02-01',
                'estimated_end_date' => '2025-06-01',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ana',
                'email' => 'ana@example.com',
                'password' => bcrypt('password123'),
                'surname' => 'Lopez',
                'training_frequency' => 2,
                'training_duration' => 3,
                'start_date' => '2025-01-15',
                'estimated_end_date' => '2025-04-15',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marta',
                'email' => 'marta@example.com',
                'password' => bcrypt('password123'),
                'surname' => 'Perez',
                'training_frequency' => 4,
                'training_duration' => 5,
                'start_date' => '2025-03-01',
                'estimated_end_date' => '2025-08-01',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luis',
                'email' => 'luis@example.com',
                'password' => bcrypt('password123'),
                'surname' => 'Ramirez',
                'training_frequency' => 3,
                'training_duration' => 4,
                'start_date' => '2025-03-05',
                'estimated_end_date' => '2025-07-05',
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
