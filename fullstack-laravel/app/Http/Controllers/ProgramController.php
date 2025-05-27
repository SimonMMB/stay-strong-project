<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\TrainingSession;
use App\Services\TrainingSessionService;

class ProgramController extends Controller
{
    protected TrainingSessionService $trainingSessionService;

    public function __construct(TrainingSessionService $trainingSessionService)
    {
        $this->trainingSessionService = $trainingSessionService;
    }
    
    public function create()
    {
        return view('programs.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_frequency' => 'required|integer|between:2,5',
            'training_duration' => 'required|integer|between:2,6',
            'start_date' => 'required|date',
            'estimated_end_date' => 'required|date|after:start_date',
        ]);

        $user = auth()->user();

        $this->trainingSessionService->createProgram(
            $user, 
            $validated['training_frequency'], 
            $validated['training_duration'], 
            $validated['start_date'], 
            $validated['estimated_end_date'
        ]);

        return redirect()->route('programs.index');
    }

    public function index()
    {
        $user = auth()->user();
        $programs = Program::where('user_id', $user->id)->paginate(10);

        return view('programs.index', compact('programs'));
    }


    public function show(Program $program)
    {
        $this->trainingSessionService->updateCompletedSessions($program);
        $trainingSessions = TrainingSession::where('program_id', $program->id)->paginate(10);

        return view('programs.show', compact('program', 'trainingSessions'));
    }

    public function destroy(string $id)
    {
        $user = auth()->user();
        $program = Program::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $program->delete();
        $user->update(['training_frequency' => null, 'training_duration' => null]);

        return redirect()->route('programs.index');
    }

}

?>