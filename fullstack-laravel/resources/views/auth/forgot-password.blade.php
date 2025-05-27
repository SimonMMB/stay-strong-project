<x-app-layout>
    <div class="relative min-h-screen w-full overflow-hidden">
        <div class="fixed inset-0">
            <img 
                src="{{ asset('storage/010.jpg') }}" 
                class="w-full h-full object-cover object-center"
                alt="Fondo de recuperación"
            >
        </div>
        
        <div class="relative min-h-screen flex items-center justify-center p-4 z-10">
            <div class="w-full max-w-md bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-xl backdrop-blur-md overflow-hidden">
                <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                    <h2 class="text-2xl font-bold text-white">
                        {{ __('Recuperar Contraseña') }}
                    </h2>
                    <p class="mt-1 text-orange-100 dark:text-orange-200 text-sm">
                        {{ __('Ingresa tu email para recibir el enlace de recuperación') }}
                    </p>
                </div>

                <div class="p-6">

                    @if (session('status'))
                        <div class="mb-4 flex items-center bg-green-50/80 dark:bg-green-900/40 rounded-lg p-3 border-l-4 border-green-500">
                            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-green-700 dark:text-green-300 text-sm">{{ session('status') }}</span>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}" class="space-y-4">
                        @csrf

                        <div>
                            <input id="email" 
                                   type="email" 
                                   name="email" 
                                   value="{{ old('email') }}" 
                                   required 
                                   autofocus
                                   class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                                   placeholder="tu@email.com">
                            @error('email')
                                <div class="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>

                        <button type="submit" 
                                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02]">
                            {{ __('Enviar enlace') }}
                        </button>

                        <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                            <a href="{{ route('login') }}" 
                               class="text-orange-500 hover:underline font-medium text-sm inline-flex items-center">
                                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                                {{ __('Volver al Login') }}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>