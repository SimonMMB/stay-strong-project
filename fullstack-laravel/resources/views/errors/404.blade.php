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
            <img 
                src="{{ asset('storage/009.jpg') }}" 
                class="w-full h-full object-cover object-center"
                alt="Fondo de error 404"
            >
        </div>
        
        <div class="relative min-h-screen flex items-center justify-center p-4 z-10">
            <div class="w-full max-w-md bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-xl backdrop-blur-md overflow-hidden">
                <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                    <h2 class="text-2xl font-bold text-white">¡Aquí no hay nada!</h2>
                </div>

                <div class="p-6 text-center">
                    <div class="mb-6">
                        <svg class="h-16 w-16 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p class="mt-4 text-gray-700 dark:text-gray-300">
                            La página que buscas no existe o ha sido movida
                        </p>
                    </div>
                    <a href="{{ route('dashboard') }}" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">Volver</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>