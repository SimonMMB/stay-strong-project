<x-app-layout>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

    <a href="{{ route('dashboard') }}" class="absolute top-4 left-4 z-50">
        <div class="bg-orange-500/90 dark:bg-orange-600/90 rounded-lg p-3 shadow-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300">
            <h2 class="text-xl text-white text-center" style="font-family: 'Roboto', sans-serif; font-style: italic; font-weight: 900; font-stretch: 100%; letter-spacing: -0.05em; line-height: 0.9; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                STAY<br>STRONG
            </h2>
        </div>
    </a>

    <div class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center p-4" style="background-image: url('{{ asset('storage/007.jpg') }}')">
        <div class="w-full max-w-4xl bg-white/70 dark:bg-gray-800/80 rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl backdrop-blur-md overflow-y-auto max-h-[90vh]">
            <div class="bg-orange-500 dark:bg-orange-600 p-4 text-center sticky top-0 z-10">
                <h1 class="text-2xl font-bold text-white">Detalles de la sesión</h1>
            </div>

            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-white/80 dark:bg-gray-700/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Sesión</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ $trainingSession->number_of_session }}</p>
                    </div>
                    <div class="bg-white/80 dark:bg-gray-700/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha Estimada</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ $trainingSession->estimated_date }}</p>
                    </div>
                    <div class="bg-white/80 dark:bg-gray-700/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</p>
                        <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ $trainingSession->status === 'completed' ? __('Completado') : __('Pendiente') }}</p>
                    </div>
                    <div class="bg-white/80 dark:bg-gray-700/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Programa</p>
                        <a href="{{ route('programs.show', ['program' => $trainingSession->program_id]) }}" class="text-lg font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400">Ver Programa</a>
                    </div>
                </div>

                <div class="bg-white/80 dark:bg-gray-700/80 shadow-lg rounded-xl backdrop-blur-sm">
                    <div class="px-6 py-4 border-b border-gray-200/30">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Ejercicios</h3>
                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Registra el peso levantado en cada ejercicio y luego márcalo como completado para ver tu progreso</p>
                    </div>
                    
                    <div class="overflow-y-auto">
                        <table class="w-full table-auto">
                            <thead class="bg-orange-500/20 dark:bg-orange-600/20">
                                <tr>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Estado</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Ejercicio</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Grupo</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Series</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Repeticiones</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Peso</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/20">
                                @foreach ($trainingSession->sessionExercises as $sessionExercise)
                                <tr class="hover:bg-orange-50/30 dark:hover:bg-orange-900/20 transition-colors duration-200">
                                    <td class="px-4 py-3 text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $sessionExercise->status === 'completed' ? __('Completado') : __('Pendiente') }}
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {{ $sessionExercise->exercise->name }}
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                        @php
                                            $groups = [
                                                'shoulders' => ['name' => 'Hombros'],
                                                'chest' => ['name' => 'Pecho'],
                                                'biceps' => ['name' => 'Bíceps'],
                                                'back' => ['name' => 'Espalda'],
                                                'legs' => ['name' => 'Piernas'],
                                                'triceps' => ['name' => 'Tríceps']             
                                            ];
                                            $group = $sessionExercise->exercise->muscle_group;
                                        @endphp                                  
                                        {{ $groups[$group]['name'] ?? $group }}
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $sessionExercise->exercise->series }}
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $sessionExercise->exercise->repetitions }}
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm text-gray-900 dark:text-gray-100">
                                        @if($sessionExercise->status == 'completed')
                                            {{ $sessionExercise->lifted_weight }} kg
                                        @else
                                            <form action="{{ route('training_sessions.exercises.complete', [$trainingSession->id, $sessionExercise->id]) }}" method="POST" class="flex items-center space-x-2">
                                                @csrf
                                                @method('PATCH')
                                                <input type="number" 
                                                       name="lifted_weight" 
                                                       min="1" 
                                                       required 
                                                       class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500">
                                                <button type="submit" 
                                                        class="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg shadow-md transition duration-150">
                                                    Completado
                                                </button>
                                            </form>
                                        @endif
                                    </td>
                                    <td class="px-4 py-3 text-center text-sm font-medium">
                                        @if($sessionExercise->lifted_weight)
                                            <a href="{{ route('exercises.progress', $sessionExercise->exercise_id) }}" 
                                               class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg shadow-md transition duration-150 text-xs">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                                </svg>
                                                Progreso
                                            </a>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="flex">
                    
                    <div class="flex-1">
                        <a href="{{ route('programs.show', ['program' => $trainingSession->program_id]) }}" 
                        class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            ← Volver al Programa
                        </a>
                    </div>

                    <div class="flex-1 flex justify-center">
                        <a href="{{ route('programs.index') }}" 
                        class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Mis programas
                        </a>
                    </div>

                    <div class="flex-1 flex justify-end">
                        <a href="{{ route('dashboard') }}" 
                        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Inicio
                        </a>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</x-app-layout>