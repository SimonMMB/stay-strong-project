<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrainingSessionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'number' => $this->number_of_session,
            'estimated_date' => $this->estimated_date->format('Y-m-d'),
            'status' => $this->status,
            'exercises' => SessionExerciseResource::collection($this->whenLoaded('sessionExercises'))
        ];
    }
}