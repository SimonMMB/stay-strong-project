<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $currentUser)
    {
        return $currentUser->hasRole(['admin', 'trainer']);
    }

    public function view(User $currentUser, User $targetUser)
    {
        if ($currentUser->hasRole('admin')) {
            return true;
        }
        
        if ($currentUser->hasRole('trainer')) {
            return true;
        }
        
        return $currentUser->id === $targetUser->id;
    }

    public function create(User $currentUser)
    {
        return $currentUser->hasRole('admin');
    }

    public function update(User $currentUser, User $targetUser)
    {
        if ($currentUser->hasRole('admin')) {
            return true;
        }
        
        return $currentUser->id === $targetUser->id;
    }

    public function delete(User $currentUser, User $targetUser)
    {
        if ($currentUser->hasRole('admin')) {
            return true;
        }
       
        return $currentUser->id === $targetUser->id;
    }
    
}