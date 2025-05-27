<?php

namespace App\Policies;

use App\Models\Program;
use App\Models\User;

class ProgramPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole(['admin', 'trainer', 'trainee']);
    }

    public function view(User $user, Program $program): bool
    {
        if ($user->hasRole('admin') || $user->hasRole('trainer')) {
            return true;
        }

        if ($user->hasRole('trainee')) {
            return $program->user_id === $user->id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasRole('trainee');
    }

    public function update(User $user, Program $program): bool
    {  
        return true;
    }

    public function delete(User $user, Program $program): bool
    {
        return $user->id === $program->user_id;
    }

}