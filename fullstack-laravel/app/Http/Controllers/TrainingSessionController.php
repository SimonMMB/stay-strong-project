<?php

namespace App\Http\Controllers;

use App\Models\SessionExercise;
use Illuminate\Http\Request;
use App\Models\TrainingSession;
use App\Services\TrainingSessionService;

class TrainingSessionController extends Controller
{
    protected TrainingSessionService $trainingSessionService;

    public function __construct(TrainingSessionService $trainingSessionService)
    {
        $this->trainingSessionService = $trainingSessionService;
    }
    
    public function show(TrainingSession $trainingSession)
    {
        return view('training_sessions.show', compact('trainingSession'));
    }

    public function update(Request $request, TrainingSession $trainingSession, SessionExercise $sessionExercise)
    {
        $this->trainingSessionService->completeExercisesAndSession($request, $trainingSession, $sessionExercise);

        return redirect()->route('training_sessions.show', $trainingSession);
    }  
}

?>