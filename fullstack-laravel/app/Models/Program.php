<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_frequency',
        'training_duration',
        'user_id',
        'start_date',
        'estimated_end_date',
        'total_sessions',
        'completed_sessions',
        'remaining_sessions',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trainingSessions()
    {
        return $this->hasMany(TrainingSession::class);
    }

}

?>