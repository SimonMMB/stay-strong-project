<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\PermissionRegistrar;

class DatabaseSeeder extends Seeder
{   
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $this->call([
            RolesAndPermissionsSeeder::class,
            ExercisesTableSeeder::class
        ]);

        $adminEmail = 'arizona@alabama.com';
        
        if (!User::where('email', $adminEmail)->exists()) {
            $admin = User::create([
                'name' => 'ARIZONA ALABAMA',
                'email' => $adminEmail,
                'password' => Hash::make('qwerty123'),
            ]);

            $admin->assignRole('admin');

            $this->command->info('Usuario admin creado:');
            $this->command->info('Email: ' . $adminEmail);
            $this->command->warn('Password: qwerty123 (Cambiar en producción!)');
        } else {
            $this->command->info('El usuario admin ya existe.');
        }
    }
}