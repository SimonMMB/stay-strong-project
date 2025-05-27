<?php

namespace App\Http\Controllers;

use App\Models\SessionExercise;
use Illuminate\Http\Request;
use App\Models\TrainingSession;
use App\Services\TrainingSessionService;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="TrainingSessions",
 *     description="Operaciones relacionadas con sesiones de entrenamiento"
 * )
 * 
 * @OA\Schema(
 *     schema="TrainingSession",
 *     title="Training Session",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="program_id", type="integer", example=1),
 *     @OA\Property(property="status", type="string", enum={"pending", "completed"}, example="pending"),
 *     @OA\Property(property="comments", type="string", nullable=true, example="Buena sesión"),
 *     @OA\Property(property="estimated_date", type="string", format="date", example="2023-01-01"),
 *     @OA\Property(
 *         property="program",
 *         type="object",
 *         @OA\Property(property="user", type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="name", type="string", example="John Doe")
 *         )
 *     ),
 *     @OA\Property(
 *         property="session_exercises",
 *         type="array",
 *         @OA\Items(ref="#/components/schemas/SessionExercise")
 *     )
 * )
 * 
 * @OA\Schema(
 *     schema="SessionExercise",
 *     title="Session Exercise",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="training_session_id", type="integer", example=1),
 *     @OA\Property(property="exercise_id", type="integer", example=1),
 *     @OA\Property(property="lifted_weight", type="integer", example=50),
 *     @OA\Property(property="status", type="string", enum={"pending", "completed"}, example="completed"),
 *     @OA\Property(
 *         property="exercise",
 *         type="object",
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="Press de banca"),
 *         @OA\Property(property="muscle_group", type="string", example="Pecho"),
 *         @OA\Property(property="series", type="integer", example=4),
 *         @OA\Property(property="repetitions", type="integer", example=12)
 *     )
 * )
 * 
 * @OA\Schema(
 *     schema="TrainingSessionUpdate",
 *     title="Training Session Update",
 *     @OA\Property(property="status", type="string", enum={"pending", "completed"}, example="completed"),
 *     @OA\Property(property="comments", type="string", nullable=true, example="Buena sesión"),
 *     @OA\Property(property="estimated_date", type="string", format="date", example="2023-01-01")
 * )
 * 
 * @OA\Schema(
 *     schema="SessionExerciseUpdate",
 *     title="Session Exercise Update",
 *     @OA\Property(property="lifted_weight", type="integer", example=55),
 *     @OA\Property(property="status", type="string", enum={"pending", "completed"}, example="completed")
 * )
 */
class TrainingSessionController extends Controller
{
    protected TrainingSessionService $trainingSessionService;

    public function __construct(TrainingSessionService $trainingSessionService)
    {
        $this->trainingSessionService = $trainingSessionService;
    }

    /**
     * @OA\Get(
     *     path="/training-sessions/{id}",
     *     summary="Obtener una sesión de entrenamiento específica",
     *     tags={"TrainingSessions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la sesión de entrenamiento",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Sesión encontrada",
     *         @OA\JsonContent(ref="#/components/schemas/TrainingSession")
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Sesión no encontrada"
     *     )
     * )
     */
    public function show(Request $request, TrainingSession $trainingSession): JsonResponse
    {
        if (!$this->checkSessionAccess($request->user(), $trainingSession)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // Cargar ejercicios manualmente para asegurar que se incluyen
        $sessionExercises = SessionExercise::where('training_session_id', $trainingSession->id)
            ->with('exercise:id,name,muscle_group,series,repetitions')
            ->get();

        // Cargar relaciones normalmente
        $trainingSession->load([
            'program.user:id,name',
        ]);

        // Crear una respuesta personalizada para depurar
        $response = $trainingSession->toArray();
        $response['sessionExercises'] = $sessionExercises;
        $response['debug'] = [
            'exercise_count' => $sessionExercises->count(),
            'exercise_ids' => $sessionExercises->pluck('id'),
            'raw_exercises_from_db' => SessionExercise::where('training_session_id', $trainingSession->id)->get(['id', 'exercise_id', 'training_session_id'])
        ];

        return response()->json($response);
    }

    /**
     * @OA\Patch(
     *     path="/training-sessions/{id}",
     *     summary="Actualizar una sesión de entrenamiento",
     *     tags={"TrainingSessions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la sesión de entrenamiento",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/TrainingSessionUpdate")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Sesión actualizada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Sesión actualizada correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/TrainingSession")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Datos inválidos"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Sesión no encontrada"
     *     )
     * )
     */
    public function update(Request $request, TrainingSession $trainingSession): JsonResponse
    {
        if (!$this->checkSessionAccess($request->user(), $trainingSession)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,completed',
            'comments' => 'sometimes|string|max:500',
            'estimated_date' => 'sometimes|date'
        ]);

        $trainingSession->update($validated);

        if ($trainingSession->status === 'completed') {
            $this->trainingSessionService->updateCompletedSessions($trainingSession->program);
        }

        return response()->json([
            'message' => 'Sesión actualizada correctamente',
            'data' => $trainingSession
        ]);
    }

    /**
     * @OA\Patch(
     *     path="/training-sessions/{session_id}/exercises/{exercise_id}",
     *     summary="Actualizar un ejercicio de sesión",
     *     tags={"TrainingSessions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="session_id",
     *         in="path",
     *         required=true,
     *         description="ID de la sesión de entrenamiento",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="exercise_id",
     *         in="path",
     *         required=true,
     *         description="ID del ejercicio de la sesión",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/SessionExerciseUpdate")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ejercicio actualizado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ejercicio actualizado correctamente"),
     *             @OA\Property(property="data", ref="#/components/schemas/SessionExercise"),
     *             @OA\Property(property="session_status", type="string", example="completed")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="El ejercicio no pertenece a esta sesión"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Sesión o ejercicio no encontrado"
     *     )
     * )
     */
    public function updateExercise(Request $request, TrainingSession $trainingSession, SessionExercise $exercise): JsonResponse
    {
        if (!$this->checkSessionAccess($request->user(), $trainingSession)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if ($exercise->training_session_id !== $trainingSession->id) {
            return response()->json(['message' => 'El ejercicio no pertenece a esta sesión'], 400);
        }

        $validated = $request->validate([
            'lifted_weight' => 'sometimes|integer|min:0',
            'status' => 'sometimes|in:pending,completed'
        ]);

        $exercise->update($validated);
        $this->checkAndUpdateSessionStatus($trainingSession);

        return response()->json([
            'message' => 'Ejercicio actualizado correctamente',
            'data' => $exercise->fresh(),
            'session_status' => $trainingSession->fresh()->status
        ]);
    }

    /**
     * @OA\Get(
     *     path="/training-sessions/{id}/exercises",
     *     summary="Listar ejercicios de una sesión",
     *     tags={"TrainingSessions"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la sesión de entrenamiento",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de ejercicios",
     *         @OA\JsonContent(
     *             @OA\Property(property="session_id", type="integer", example=1),
     *             @OA\Property(property="session_status", type="string", example="pending"),
     *             @OA\Property(
     *                 property="exercises",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/SessionExercise")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Sesión no encontrada"
     *     )
     * )
     */
    public function index(Request $request, TrainingSession $trainingSession): JsonResponse
    {
        if (!$this->checkSessionAccess($request->user(), $trainingSession)) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $exercises = $trainingSession->sessionExercises()
            ->with('exercise:id,name,muscle_group,series,repetitions')
            ->get();

        return response()->json([
            'session_id' => $trainingSession->id,
            'session_status' => $trainingSession->status,
            'exercises' => $exercises
        ]);
    }

    private function checkAndUpdateSessionStatus(TrainingSession $trainingSession): void
    {
        $allExercisesCompleted = !$trainingSession->sessionExercises()
            ->where('status', 'pending')
            ->exists();

        if ($allExercisesCompleted && $trainingSession->status !== 'completed') {
            $trainingSession->update(['status' => 'completed']);
            $this->trainingSessionService->updateCompletedSessions($trainingSession->program);
        }
    }

    private function checkSessionAccess($user, TrainingSession $session): bool
    {
        return $user->hasAnyRole(['admin', 'trainer']) || 
               $session->program->user_id === $user->id;
    }
}