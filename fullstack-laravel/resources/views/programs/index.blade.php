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

    <div class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center p-4" style="background-image: url('{{ asset('storage/005.jpg') }}')">
        <div class="w-full max-w-4xl bg-white/70 dark:bg-gray-800/80 rounded-lg shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl backdrop-blur-md">
            <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                <h2 class="text-2xl font-bold text-white">
                    {{ __('Mis programas de entrenamiento') }}
                </h2>
            </div>

            <div class="p-6">
                @if(session('success'))
                    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                        <p>{{ session('success') }}</p>
                    </div>
                @endif

                @if($programs->isEmpty())
                    <div class="text-center py-12">
                        <p class="text-xl font-bold text-orange-500 dark:text-orange-400 mb-2">¡Aún no tienes ninguno!</p>
                    </div>
                @else 
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200/50">
                            <thead class="bg-orange-500/20 dark:bg-orange-600/20">
                                <tr>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Frecuencia</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Duración</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Sesiones completadas</th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white/50 dark:bg-gray-800/50 divide-y divide-gray-200/30">
                                @foreach ($programs as $program)
                                <tr class="hover:bg-orange-50/30 dark:hover:bg-orange-900/20 transition-colors duration-200">
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {{ $program->training_frequency }} días/semana
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $program->training_duration }} meses
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-gray-100">
                                        {{ $program->completed_sessions }} / {{ $program->total_sessions }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                        <a href="{{ route('programs.show', $program->id) }}" 
                                        class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                            Ver
                                        </a>
                                        <span class="text-gray-400">|</span>
                                        <form action="{{ route('programs.destroy', $program->id) }}" method="POST" class="inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" 
                                                    class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                    onclick="return confirm('¿Eliminar este programa? ¡Esta acción no se puede deshacer!')">
                                                Eliminar
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif

                <div class="mt-6">
                    <a href="{{ route('programs.create') }}" 
                       class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                        + Crear nuevo programa
                    </a>
                    
                    <a href="{{ route('dashboard') }}" 
                       class="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                        Inicio
                    </a>
                </div>

                @if ($programs->hasPages())
                <div class="px-6 py-4 bg-orange-50/30 dark:bg-orange-900/20 mt-6 rounded-b-lg">
                    {{ $programs->links() }}
                </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>