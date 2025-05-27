<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProgramRequest;
use App\Models\Program;
use App\Services\TrainingSessionService;
use App\Http\Resources\ProgramResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Carbon\Carbon;

/**
 * @OA\Info(
 *     title="STAY STRONG API",
 *     version="1.0.0",
 *     description="API para gestión de programas de entrenamiento"
 * )
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Servidor Local"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     in="header",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 * 
 * @OA\Schema(
 *     schema="Program",
 *     title="Program",
 *     required={"training_frequency", "training_duration", "start_date"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="training_frequency", type="integer", example=3),
 *     @OA\Property(property="training_duration", type="integer", example=60),
 *     @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
 *     @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01"),
 *     @OA\Property(property="completed_sessions", type="integer", example=5),
 *     @OA\Property(property="total_sessions", type="integer", example=36)
 * )
 */
class ProgramController extends Controller
{
    use HasRoles, AuthorizesRequests;

    public function __construct(
        protected TrainingSessionService $service
    ) {}
    
    /**
     * @OA\Get(
     *     path="/programs",
     *     summary="Listar todos los programas",
     *     description="Obtiene la lista de programas. Los trainees solo ven sus propios programas.",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de programas",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="user_id", type="integer", example=1),
     *                     @OA\Property(property="training_frequency", type="integer", example=3),
     *                     @OA\Property(property="training_duration", type="integer", example=60),
     *                     @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *                     @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01"),
     *                     @OA\Property(property="completed_sessions", type="integer", example=5),
     *                     @OA\Property(property="total_sessions", type="integer", example=36)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permisos"
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $query = Program::query();

        if (Auth::user()->hasRole('trainee')) {
            $query->where('user_id', Auth::id());
        }

        $programs = $query->get();

        return response()->json([
            'data' => $programs
        ]);
    }

    /**
     * @OA\Post(
     *     path="/programs",
     *     summary="Crear un nuevo programa",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             required={"training_frequency", "training_duration", "start_date"},
     *             @OA\Property(property="training_frequency", type="integer", example=3),
     *             @OA\Property(property="training_duration", type="integer", example=60),
     *             @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *             @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Programa creado exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="training_frequency", type="integer", example=3),
     *                 @OA\Property(property="training_duration", type="integer", example=60),
     *                 @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *                 @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01"),
     *                 @OA\Property(property="completed_sessions", type="integer", example=0),
     *                 @OA\Property(property="total_sessions", type="integer", example=36)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validación fallida"
     *     )
     * )
     */
    public function store(StoreProgramRequest $request): JsonResponse
    {
        $program = $this->service->createProgram(
            $request->user(),
            $request->validated('training_frequency'),
            $request->validated('training_duration'),
            $request->validated('start_date'),
            $request->validated('estimated_end_date')
        );

        return response()->json([
            'data' => new ProgramResource($program)
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/programs/{id}",
     *     summary="Obtener un programa específico",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del programa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Programa encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="training_frequency", type="integer", example=3),
     *                 @OA\Property(property="training_duration", type="integer", example=60),
     *                 @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *                 @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permisos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Programa no encontrado"
     *     )
     * )
     */
    public function show(Program $program)
    {
        $this->authorize('view', $program);
        
        // Usar ProgramResource para incluir todos los campos necesarios
        return response()->json([
            'data' => new ProgramResource($program)
        ]);
    }

    /**
     * @OA\Get(
     *     path="/programs/{program}/training-sessions",
     *     summary="Obtener las sesiones de un programa",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="program",
     *         in="path",
     *         required=true,
     *         description="ID del programa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de sesiones"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Programa no encontrado"
     *     )
     * )
     */
    public function getSessions(Program $program)
    {
        $this->authorize('view', $program);
        
        $sessions = $program->trainingSessions()
            ->with(['sessionExercises.exercise']) // Cargar los ejercicios y sus detalles
            ->orderBy('number_of_session')
            ->get();
        
        return response()->json($sessions);
    }
    /**
     * @OA\Patch(
     *     path="/programs/{id}",
     *     summary="Actualizar un programa",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del programa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *             @OA\Property(property="completed_sessions", type="integer", example=5),
     *             @OA\Property(property="training_duration", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Programa actualizado",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="training_frequency", type="integer", example=3),
     *                 @OA\Property(property="training_duration", type="integer", example=60),
     *                 @OA\Property(property="start_date", type="string", format="date", example="2023-01-01"),
     *                 @OA\Property(property="estimated_end_date", type="string", format="date", example="2023-04-01"),
     *                 @OA\Property(property="completed_sessions", type="integer", example=5),
     *                 @OA\Property(property="total_sessions", type="integer", example=36)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Datos inválidos"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permisos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Programa no encontrado"
     *     )
     * )
     */
    public function update(Request $request, Program $program)
    {
        if (!$program) {
            return response()->json(['message' => 'Programa no encontrado'], 404);
        }

        $validated = $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'completed_sessions' => 'sometimes|integer|min:0',
            'training_duration' => 'required|integer|min:1'
        ]);

        if ($request->user()->cannot('update', $program)) {
            abort(403, 'No autorizado para actualizar este programa');
        }

        $validated['start_date'] = Carbon::parse($validated['start_date']);
        $validated['estimated_end_date'] = $validated['start_date']->copy()
            ->addMonths($validated['training_duration']);

        $program->update($validated);
        $program->refresh();

        return response()->json([
            'data' => [
                'id' => $program->id,
                'user_id' => $program->user_id,
                'start_date' => $program->start_date->format('Y-m-d'),
                'estimated_end_date' => $program->estimated_end_date->format('Y-m-d'),
                'training_duration' => $program->training_duration,
                'completed_sessions' => $program->completed_sessions,
                'total_sessions' => $program->total_sessions,
                'training_frequency' => $program->training_frequency
            ]
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/programs/{id}",
     *     summary="Eliminar un programa",
     *     tags={"Programs"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del programa",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Programa eliminado"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="No tiene permisos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Programa no encontrado"
     *     )
     * )
     */
    public function destroy(Program $program)
    {
        $this->authorize('delete', $program);

        $program->delete();

        return response()->noContent();
    }
}