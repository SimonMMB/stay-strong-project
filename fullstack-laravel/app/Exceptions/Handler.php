<?php

namespace App\Exceptions;
use Illuminate\Support\Facades\View; 
use Throwable;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException) {
            return $request->expectsJson()
                ? response()->json(['message' => 'Not found'], 404)
                : response(View::make('errors.404'), 404);
        }

        return parent::render($request, $exception);
    }
}