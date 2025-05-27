<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExercisesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            // Pecho
            ['name' => 'Press de Banca', 'muscle_group' => 'chest', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Press de Banca Inclinado', 'muscle_group' => 'chest', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Aperturas con Mancuernas', 'muscle_group' => 'chest', 'series' => 3, 'repetitions' => 10],
            ['name' => 'Fondos', 'muscle_group' => 'chest', 'series' => 3, 'repetitions' => 8],

            // Espalda
            ['name' => 'Remo con Barra', 'muscle_group' => 'back', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Remos con Mancuernas', 'muscle_group' => 'back', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Dominadas', 'muscle_group' => 'back', 'series' => 4, 'repetitions' => 6],

            // Hombros
            ['name' => 'Press Militar', 'muscle_group' => 'shoulders', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Elevaciones Laterales', 'muscle_group' => 'shoulders', 'series' => 3, 'repetitions' => 12],
            ['name' => 'Elevaciones Frontales', 'muscle_group' => 'shoulders', 'series' => 3, 'repetitions' => 12],

            // Bíceps
            ['name' => 'Curl de Bíceps con Barra', 'muscle_group' => 'biceps', 'series' => 3, 'repetitions' => 10],
            ['name' => 'Curl de Bíceps en Banco Predicador', 'muscle_group' => 'biceps', 'series' => 3, 'repetitions' => 10],

            // Tríceps
            ['name' => 'Extensión de Tríceps en Polea', 'muscle_group' => 'triceps', 'series' => 3, 'repetitions' => 10],
            ['name' => 'Fondos', 'muscle_group' => 'triceps', 'series' => 3, 'repetitions' => 8],

            // Piernas
            ['name' => 'Sentadillas', 'muscle_group' => 'legs', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Prensa de Piernas', 'muscle_group' => 'legs', 'series' => 4, 'repetitions' => 8],
            ['name' => 'Peso Muerto', 'muscle_group' => 'legs', 'series' => 4, 'repetitions' => 6],
            ['name' => 'Extensiones de Pierna', 'muscle_group' => 'legs', 'series' => 3, 'repetitions' => 10],
            ['name' => 'Curl de Pierna', 'muscle_group' => 'legs', 'series' => 4, 'repetitions' => 10],
            ['name' => 'Elevaciones de Talones', 'muscle_group' => 'legs', 'series' => 4, 'repetitions' => 12],
        ];

        DB::table('exercises')->insert($exercises);
    }
}
