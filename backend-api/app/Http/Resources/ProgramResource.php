<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProgramResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'training_frequency' => $this->training_frequency,
            'training_duration' => $this->training_duration,
            'start_date' => $this->start_date,
            'estimated_end_date' => $this->estimated_end_date,
            'total_sessions' => $this->total_sessions,
            'completed_sessions' => $this->completed_sessions,
            'remaining_sessions' => $this->remaining_sessions,
        ];
    }
}