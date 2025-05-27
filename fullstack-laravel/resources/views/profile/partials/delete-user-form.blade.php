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

    <div class="relative min-h-screen w-full overflow-hidden">
        <div class="fixed inset-0">
            <img src="{{ asset('storage/009.jpg') }}" 
                 class="w-full h-full object-cover object-center"
                 alt="Fondo de confirmación de eliminación de cuenta">
        </div>
        
        <div class="relative min-h-screen flex items-center justify-center p-4 z-10">
            <div class="w-full max-w-md bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-xl backdrop-blur-md overflow-hidden">
                <div class="bg-red-500/80 dark:bg-red-600/80 p-4 text-center">
                    <h2 class="text-2xl font-bold text-white">{{ __('¿Seguro que quieres hacer esto?') }}</h2>
                </div>

                <div class="p-6">
                    <form method="POST" action="{{ route('profile.destroy') }}">
                        @csrf
                        @method('DELETE')

                        <h3 class="text-lg text-center font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {{ __('Borrarás los registros de todos tus entrenamientos de manera permanente') }}
                        </h3>

                        <div class="mt-4">
                            <x-input-label for="password" value="{{ __('Ingresa tu contraseña para eliminar tu cuenta') }}" />

                            <x-text-input id="password"
                                         name="password"
                                         type="password"
                                         class="mt-1 block w-full"
                                         required>
                            </x-text-input>

                            @error('password')
                                <x-input-error :messages="$errors->get('password')" class="mt-2" />
                            @enderror
                        </div>

                        <div class="mt-6 flex justify-end">
                            <a href="{{ url()->previous() }}" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg">
                                {{ __('Cancelar') }}
                            </a>

                            <x-danger-button class="ml-3">
                                {{ __('Eliminar cuenta') }}
                            </x-danger-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>