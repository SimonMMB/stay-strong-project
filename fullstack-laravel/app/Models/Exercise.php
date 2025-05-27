<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'muscle_group',
        'series',
        'repetitions',
    ];

    public function sessionExercises(): HasMany
    {
        return $this->hasMany(SessionExercise::class);
    }
}

?>