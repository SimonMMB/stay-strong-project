<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SessionExerciseResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->exercise->name,
            'muscle_group' => $this->exercise->muscle_group,
            'series' => $this->exercise->series,
            'repetitions' => $this->exercise->repetitions,
            'status' => $this->status,
            'lifted_weight' => $this->lifted_weight
        ];
    }
}