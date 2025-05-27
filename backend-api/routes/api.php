<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\TrainingSessionController;

//AUTHENTICATION ROUTES
Route::prefix('auth')->group(function () {

    //Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    //Protected routes
    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });
});

//PROTECTED ROUTES
Route::middleware('auth:api')->group(function () {
    
    //USERS
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store'])
        ->middleware('can:create,App\Models\User');
    
    Route::prefix('/users/{user}')->group(function () {
        Route::get('/', [UserController::class, 'show']);
        Route::match(['put', 'patch'], '/', [UserController::class, 'update'])
            ->middleware('can:update,user');
        Route::delete('/', [UserController::class, 'destroy'])
            ->middleware('can:delete,user');
    });
    
    //PROGRAMS
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::post('/programs', [ProgramController::class, 'store'])
        ->middleware('can:create,App\Models\Program'); 
    Route::prefix('/programs/{program}')->group(function () {
        Route::get('/', [ProgramController::class, 'show'])
            ->middleware('can:view,program');
        Route::patch('/', [ProgramController::class, 'update'])
            ->middleware('can:update,program');
        Route::get('/training-sessions', [ProgramController::class, 'getSessions']);
        Route::delete('/', [ProgramController::class, 'destroy'])
            ->middleware('can:delete,program');
    });
    
    //TRAINING SESSIONS
    Route::prefix('/training-sessions/{training_session}')->group(function () {
        Route::get('/', [TrainingSessionController::class, 'show'])
            ->middleware('permission:training_sessions.show');
        Route::patch('/', [TrainingSessionController::class, 'update'])
            ->middleware('permission:training_sessions.update');
        
        //Exercises
        Route::prefix('/exercises')->group(function () {
            Route::get('/', [TrainingSessionController::class, 'index'])
                ->middleware('permission:session_exercises.show');
            Route::patch('/{exercise}', [TrainingSessionController::class, 'updateExercise'])
                ->middleware('permission:session_exercises.update');
        });
    });
    
});