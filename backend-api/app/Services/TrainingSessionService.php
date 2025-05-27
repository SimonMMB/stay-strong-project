<?php

namespace App\Services;

use App\Models\{Program, TrainingSession, SessionExercise, Exercise, User};
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class TrainingSessionService
{
    public function __construct(
        private Program $program,
        private TrainingSession $trainingSession,
        private Exercise $exercise
    ) {}

    public function createProgram(
        User $user,
        int $trainingFrequency,
        int $trainingDuration,
        string $startDate,
        string $estimatedEndDate
    ): Program 
    {
        if ($user->hasRole('trainer')) {
            abort(403, 'Trainers cannot create programs');
        }

        $totalSessions = $trainingFrequency * ($trainingDuration * 4);

        $program = Program::create([
            'user_id' => $user->id,
            'training_frequency' => $trainingFrequency,
            'training_duration' => $trainingDuration,
            'start_date' => $startDate,
            'estimated_end_date' => $estimatedEndDate,
            'total_sessions' => $totalSessions,
            'completed_sessions' => 0,
            'remaining_sessions' => $totalSessions
        ]);

        $this->createTrainingSessions($user, $program);

        $program->refresh();
    
        return $program;
    }

    private function createTrainingSessions(User $user, Program $program): void
    {
        $startDate = Carbon::parse($program->start_date);
        $sessionCounter = 1;

        for ($week = 0; $week < $program->training_duration * 4; $week++) {
            for ($session = 0; $session < $program->training_frequency; $session++) {
                // Saltar fines de semana
                while ($startDate->isWeekend()) {
                    $startDate->addDay();
                }

                $trainingSession = TrainingSession::create([
                    'number_of_session' => $sessionCounter++,
                    'program_id' => $program->id,
                    'user_id' => $user->id,
                    'estimated_date' => $startDate->format('Y-m-d'),
                    'status' => 'pending'
                ]);

                $this->assignExercisesToSession($trainingSession);
                $startDate->addDay();
            }
        }
    }

    private function assignExercisesToSession(TrainingSession $session): void
    {
        Exercise::select('muscle_group')
            ->distinct()
            ->pluck('muscle_group')
            ->each(function ($group) use ($session) {
                if ($exercise = Exercise::where('muscle_group', $group)->inRandomOrder()->first()) {
                    SessionExercise::create([
                        'training_session_id' => $session->id,
                        'exercise_id' => $exercise->id,
                        'status' => 'pending'
                    ]);
                }
            });
    }
    
    public function completeExercisesAndSession(array $data, TrainingSession $trainingSession, SessionExercise $sessionExercise): SessionExercise
    {
        $sessionExercise->update([
            'lifted_weight' => $data['weight_used'] ?? $sessionExercise->lifted_weight,
            'status' => $data['completed'] ? 'completed' : $sessionExercise->status
        ]);

        $allExercisesCompleted = !$trainingSession->sessionExercises()
            ->where('status', 'pending')
            ->exists();

        if ($allExercisesCompleted && $trainingSession->status !== 'completed') {
            $trainingSession->update(['status' => 'completed']);
            $this->updateCompletedSessions($trainingSession->program);
        }

        return $sessionExercise;
    }

    public function updateCompletedSessions(Program $program): void
    {
        $completedSessions = $program->trainingSessions()
            ->where('status', 'completed')
            ->count();
        
        $program->update([
            'completed_sessions' => $completedSessions,
            'remaining_sessions' => $program->total_sessions - $completedSessions
        ]);
    }
}

?>