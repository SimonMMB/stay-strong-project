<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\TrainingSession;
use App\Models\SessionExercise;
use App\Models\Exercise;
use App\Models\User;
use DateTime;

class TrainingSessionService
{
    public function createProgram(
        User $user, 
        int $training_frequency, 
        int $training_duration, 
        string $start_date, 
        string $estimated_end_date)
    {
        $totalWeeks = $training_duration * 4;
        $sessionsPerWeek = $training_frequency;
        $totalSessions = $sessionsPerWeek * $totalWeeks;

        $program = Program::create([
            'training_frequency' => $training_frequency,
            'training_duration' => $training_duration,
            'user_id' => $user->id,
            'start_date' => $start_date,
            'estimated_end_date' => $estimated_end_date,
            'total_sessions' => $totalSessions,
            'completed_sessions' => 0,
            'remaining_sessions' => $totalSessions
        ]);
       
        $this->createTrainingSessions($user, $program);
    }

    private function createTrainingSessions(User $user, Program $program)
    {
        $totalWeeks = $program->training_duration * 4;
        $sessionsPerWeek = $program->training_frequency;
        $startDate = new DateTime($program->start_date);
        $sessionCounter = 1;

        for ($week = 0; $week < $totalWeeks; $week++) {

            for ($session = 0; $session < $sessionsPerWeek; $session++) {

                while (in_array($startDate->format('N'), [6, 7])) {
                    $startDate->modify('+1 day');
                }

                $userSession = TrainingSession::create([
                    'number_of_session' => $sessionCounter,
                    'program_id' => $program->id,
                    'user_id' => $user->id,
                    'estimated_date' => $startDate,
                    'status' => 'pending',
                    'comments' => null
                ]);

                $this->assignExercisesToSession($userSession);
                $startDate->modify('+1 day');
                $sessionCounter++;
            }
        }
    }

    private function assignExercisesToSession(TrainingSession $trainingSession)
    {
        $muscleGroups = Exercise::select('muscle_group')->distinct()->pluck('muscle_group'); 
        $exercises = collect();

        foreach ($muscleGroups as $group) {
            $exercise = Exercise::where('muscle_group', $group)->inRandomOrder()->first();
            
            if ($exercise) {
                $exercises->push($exercise);
            }
        }

        foreach ($exercises as $exercise) {
            SessionExercise::create([
                'training_session_id' => $trainingSession->id,
                'exercise_id' => $exercise->id,
                'status' => 'pending'
            ]);
        }
    }

    public function completeExercisesAndSession(Request $request, TrainingSession $trainingSession, SessionExercise $sessionExercise)
    {
        if ($sessionExercise->status != 'completed') {
            $request->validate([
                'lifted_weight' => 'required|integer|min:1'
            ]);
            $sessionExercise->update([
                'lifted_weight' => $request->lifted_weight,
                'status' => 'completed'
            ]);
        }
        
        $allExercisesCompleted = true;

        foreach ($trainingSession->sessionExercises as $sessionExercise) {
            if ($sessionExercise->status === 'pending') {
                $allExercisesCompleted = false;
            }
        }

        if ($allExercisesCompleted) {
            $trainingSession->update(['status' => 'completed']);
        }

        $trainingSession->save();
    }

    public function updateCompletedSessions(Program $program)
    {
        $trainingSessions = TrainingSession::where('program_id', $program->id)->get();
        $completedSessions = $trainingSessions->filter(function($trainingSession) {
            return $trainingSession->status == 'completed';
        })->count();
        $program->completed_sessions = $completedSessions;
        $program->remaining_sessions = $program->total_sessions - $completedSessions;
        $program->save();
    }
}

?>