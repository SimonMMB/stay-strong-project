<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Program;

class StoreProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Program::class);
    }

    public function rules(): array
    {
        return [
            'training_frequency' => 'required|integer|between:2,5',
            'training_duration' => 'required|integer|between:2,6',
            'start_date' => 'required|date|after_or_equal:today',
            'estimated_end_date' => 'required|date|after:start_date',
        ];
    }
}