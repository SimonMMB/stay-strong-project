<x-app-layout>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

    <div class="flex h-screen w-full">
        <div class="w-full md:w-1/3 bg-white/70 dark:bg-gray-800/80 shadow-xl backdrop-blur-md flex flex-col">
            <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                <h2 class="text-5xl text-white" style="font-family: 'Roboto', sans-serif; font-style: italic; font-weight: 900; font-stretch: 100%; letter-spacing: -0.05em; line-height: 0.8; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 165, 0, 0.5);">
                    STAY<br>STRONG
                </h2>
            </div>

            <div class="p-6 space-y-6 overflow-y-auto flex-1">
                <div class="text-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Inicia sesión
                    </h3>
                </div>

                <form method="POST" action="{{ route('login') }}" class="space-y-4">
                    @csrf
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Correo electrónico
                        </label>
                        <input id="email" 
                               type="email" 
                               name="email" 
                               value="{{ old('email') }}" 
                               required 
                               autofocus 
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="tu@email.com">
                        @error('email')
                            <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input id="password" 
                               type="password" 
                               name="password" 
                               required 
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="••••••••">
                        @error('password')
                            <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="flex items-center">
                        <input id="remember_me" 
                               type="checkbox" 
                               name="remember" 
                               class="rounded border-gray-300 dark:border-gray-700 text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600">
                        <label for="remember_me" class="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Recordar sesión
                        </label>
                    </div>

                    <button type="submit" 
                            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02]">
                        Iniciar sesión
                    </button>

                    <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            ¿No tienes cuenta? 
                            <a href="{{ route('users.create') }}" class="text-orange-500 hover:underline font-medium">
                                Regístrate
                            </a>
                        </p>
                    </div>

                    @if (Route::has('password.request'))
                        <div class="text-center">
                            <a href="{{ route('password.request') }}" class="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    @endif
                </form>
            </div>
        </div>

        <div class="hidden md:block md:w-2/3 h-full">
            <img src="{{ asset('storage/001.jpg') }}" 
                 class="w-full h-full object-cover"
                 alt="Fondo de entrenamiento">
        </div>
    </div>
</x-app-layout>