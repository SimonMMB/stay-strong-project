<x-app-layout>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

    <div class="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center" style="background-image: url('{{ asset('storage/003.jpg') }}')">
        <a href="{{ route('dashboard') }}" class="absolute top-4 left-4 z-50">
            <div class="bg-orange-500/90 dark:bg-orange-600/90 rounded-lg p-3 shadow-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300">
                <h2 class="text-xl text-white text-center" style="font-family: 'Roboto', sans-serif; font-style: italic; font-weight: 900; font-stretch: 100%; letter-spacing: -0.05em; line-height: 0.9; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                    STAY<br>STRONG
                </h2>
            </div>
        </a>

        <div class="w-full max-w-md bg-white/70 dark:bg-gray-800/80 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl backdrop-blur-md mx-4">
            <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                <h2 class="text-2xl font-bold text-white">
                    ¡Hola {{ $name }}!
                </h2>
                <p class="mt-1 text-orange-100 dark:text-orange-200">
                    {{ __("Tu portal de entrenamiento") }}
                </p>
            </div>

            <div class="p-6 space-y-4">
                <div class="flex items-center bg-green-50/80 dark:bg-green-900/40 rounded-lg p-3 border-l-4 border-green-500">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <p class="text-green-700 dark:text-green-300 text-sm font-medium">
                        {{ __("¡Sesión iniciada!") }}
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <a href="{{ route('programs.create') }}" 
                       class="group flex items-center justify-start p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 dark:border-gray-600 hover:border-blue-300">
                        <div class="bg-blue-100/80 dark:bg-blue-900/30 p-3 rounded-full mr-3 group-hover:rotate-6 transition-transform">
                            <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white">Crear programa</h3>
                            <p class="text-gray-500 dark:text-gray-400 text-xs">Diseña tu plan de entrenamiento</p>
                        </div>
                    </a>

                    <a href="{{ route('programs.index') }}" 
                       class="group flex items-center justify-start p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 dark:border-gray-600 hover:border-green-300">
                        <div class="bg-green-100/80 dark:bg-green-900/30 p-3 rounded-full mr-3 group-hover:-rotate-6 transition-transform">
                            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white">Mis programas</h3>
                            <p class="text-gray-500 dark:text-gray-400 text-xs">Gestiona tus rutinas</p>
                        </div>
                    </a>
                </div>

                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" 
                                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-700 rounded-lg transition-all duration-300 border border-red-200 dark:border-red-800 hover:border-red-600">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            Cerrar sesión
                        </button>
                    </form>
                </div>

                <div class="mt-4 text-center">
                    <a href="{{ route('delete.account.form') }}" 
                       class="text-xs text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline">
                        Eliminar cuenta
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>