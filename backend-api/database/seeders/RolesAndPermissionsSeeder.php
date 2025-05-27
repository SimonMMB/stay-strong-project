<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        //Reset roles & permissions in cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        //Users permissions
        Permission::create(['name' => 'users.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.show', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'api']);

        //Programs permissions
        Permission::create(['name' => 'programs.view', 'guard_name' => 'api']);
        Permission::create(['name' => 'programs.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'programs.show', 'guard_name' => 'api']);
        Permission::create(['name' => 'programs.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'programs.delete', 'guard_name' => 'api']);

        //Training sessions permissions
        Permission::create(['name' => 'training_sessions.show', 'guard_name' => 'api']);
        Permission::create(['name' => 'training_sessions.update', 'guard_name' => 'api']);

        //Session exercises permissions
        Permission::create(['name' => 'session_exercises.show', 'guard_name' => 'api']);
        Permission::create(['name' => 'session_exercises.update', 'guard_name' => 'api']);

        //Create 'admin' role
        $role = Role::create(['name' => 'admin', 'guard_name' => 'api']);
        $role->givePermissionTo(Permission::all());

        //Create 'trainer' role
        $role = Role::create(['name' => 'trainer', 'guard_name' => 'api']);
        $role->givePermissionTo([
            'users.view', 'users.show',
            'programs.view', 'programs.show',
            'training_sessions.show',
            'session_exercises.show'
        ]);

        //Create 'trainee' role
        $role = Role::create(['name' => 'trainee', 'guard_name' => 'api']);
        $role->givePermissionTo([
            'users.show', 'users.update', 'users.delete',
            'programs.view', 'programs.create', 'programs.show', 'programs.update', 'programs.delete',
            'training_sessions.show', 'training_sessions.update',
            'session_exercises.show', 'session_exercises.update'
        ]);
    }
}