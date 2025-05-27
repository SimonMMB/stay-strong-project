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
                        Crea tu cuenta
                    </h3>
                </div>

                @if ($errors->any())
                    <div class="flex items-center bg-red-50/80 dark:bg-red-900/40 rounded-lg p-3 border-l-4 border-red-500">
                        <svg class="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div>
                            @foreach ($errors->all() as $error)
                                <p class="text-red-700 dark:text-red-300 text-sm">{{ $error }}</p>
                            @endforeach
                        </div>
                    </div>
                @endif

                <form action="{{ route('users.store') }}" method="POST" class="space-y-4">
                    @csrf

                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nombre
                        </label>
                        <input id="name"
                               type="text"
                               name="name"
                               value="{{ old('name') }}"
                               required
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="Tu nombre">
                    </div>

                    <div>
                        <label for="surname" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Apellido
                        </label>
                        <input id="surname"
                               type="text"
                               name="surname"
                               value="{{ old('surname') }}"
                               required
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="Tu apellido">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Correo electrónico
                        </label>
                        <input id="email"
                               type="email"
                               name="email"
                               value="{{ old('email') }}"
                               required
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="tu@email.com">
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
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirmar contraseña
                        </label>
                        <input id="password_confirmation"
                               type="password"
                               name="password_confirmation"
                               required
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                               placeholder="••••••••">
                    </div>

                    <button type="submit"
                            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02]">
                        Completar Registro
                    </button>

                    <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            ¿Ya tienes cuenta?
                            <a href="{{ route('login') }}" class="text-orange-500 hover:underline font-medium">
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>

        <div class="hidden md:block md:w-2/3 h-full">
            <img src="{{ asset('storage/002.jpg') }}" 
                 class="w-full h-full object-cover"
                 alt="Fondo de registro">
        </div>
    </div>
</x-app-layout>