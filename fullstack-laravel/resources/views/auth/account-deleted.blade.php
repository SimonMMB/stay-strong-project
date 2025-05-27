<x-app-layout>    
    <div class="relative min-h-screen w-full overflow-hidden">
        <div class="fixed inset-0">
            <img 
                src="{{ asset('storage/009.jpg') }}" 
                class="w-full h-full object-cover object-center"
                alt="Fondo de cuenta eliminada"
            >
        </div>
        
        <div class="relative min-h-screen flex items-center justify-center p-4 z-10">
            <div class="w-full max-w-md bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-xl backdrop-blur-md overflow-hidden">
                <div class="bg-red-500/80 p-4 text-center">
                    <h2 class="text-2xl font-bold text-white">Cuenta eliminada</h2>
                </div>

                <div class="p-6 text-center">
                    <div class="mb-6">
                        <p class="mt-4 text-gray-700 dark:text-gray-300">
                            Todos tus datos han sido eliminados...
                        </p>
                        <p class="mt-6 text-gray-700 dark:text-gray-300 text-lg">
                            ¿Ya te has arrepentido?
                        </p>
                    </div>

                    <a href="{{ route('users.create') }}" class="inline-block bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
                        ¡Vuelve a registrarte!
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>