<x-app-layout>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

    <a href="{{ route('dashboard') }}" class="absolute top-4 right-4 z-50">
        <div class="bg-orange-500/90 dark:bg-orange-600/90 rounded-lg p-3 shadow-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300">
            <h2 class="text-xl text-white text-center" style="font-family: 'Roboto', sans-serif; font-style: italic; font-weight: 900; font-stretch: 100%; letter-spacing: -0.05em; line-height: 0.9; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                STAY<br>STRONG
            </h2>
        </div>
    </a>

    <div class="flex h-screen w-full">
        <div class="w-full md:w-3/5 bg-white/70 dark:bg-gray-800/80 shadow-xl backdrop-blur-md overflow-y-auto">
            <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                <h1 class="text-2xl font-bold text-white">Sesiones de entrenamiento</h1>
            </div>

            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-md p-6 border-l-4 border-blue-500 backdrop-blur-sm">
                        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">Total</h3>
                        <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ $program->total_sessions }}</p>
                    </div>

                    <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-md p-6 border-l-4 border-green-500 backdrop-blur-sm">
                        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">Completadas</h3>
                        <p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{{ $program->completed_sessions }}</p>
                    </div>

                    <div class="bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-md p-6 border-l-4 border-orange-500 backdrop-blur-sm">
                        <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">Restantes</h3>
                        <p class="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">{{ $program->remaining_sessions }}</p>
                    </div>
                </div>

                <div class="bg-white/80 dark:bg-gray-700/80 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200/30">
                            <thead class="bg-orange-500/20 dark:bg-orange-600/20">
                                <tr>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"># Sesión</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/20">
                                @foreach($trainingSessions as $trainingSession)
                                <tr class="hover:bg-orange-50/30 dark:hover:bg-orange-900/20 transition-colors duration-200 @if($trainingSession->status == 'completed') bg-green-200/30 dark:bg-green-800/30 @endif">
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {{ $trainingSession->number_of_session }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        @if($trainingSession->status == 'completed')
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100/80 dark:bg-green-800/80 text-green-800 dark:text-green-200">
                                                {{'Completada'}}
                                            </span>
                                        @else
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100/80 dark:bg-orange-800/80 text-orange-800 dark:text-orange-200">
                                                {{ 'Pendiente' }}
                                            </span>
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $trainingSession->estimated_date }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <a href="{{ route('training_sessions.show', $trainingSession->id) }}" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Ver</a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <div class="space-x-4">
                        <a href="{{ route('programs.index') }}" 
                           class="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Mis programas
                        </a>
                    </div>
                    <div class="space-x-4">
                        <a href="{{ route('dashboard') }}" 
                           class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Inicio
                        </a>
                    </div>
                </div>

                @if($trainingSessions->hasPages())
                <div class="mt-6 bg-white/80 dark:bg-gray-700/80 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
                    <div class="px-6 py-4 bg-orange-50/30 dark:bg-orange-900/20">
                        {{ $trainingSessions->links() }}
                    </div>
                </div>
                @endif
            </div>
        </div>
        
        <div class="hidden md:block md:w-2/5 h-full">
            <img src="{{ asset('storage/006.jpg') }}" 
                 class="w-full h-full object-cover object-center"
                 alt="Fondo de entrenamiento">
        </div>
    </div>
</x-app-layout>