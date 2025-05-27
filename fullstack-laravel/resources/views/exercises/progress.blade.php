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

    <div class="relative min-h-screen w-full">
        <div class="fixed inset-0">
            <img src="{{ asset('storage/008.jpg') }}" 
                 class="w-full h-full object-cover object-center"
                 alt="Fondo de progreso">
        </div>
        
        <div class="relative min-h-screen flex items-center justify-center p-4 z-10">
            <div class="w-full max-w-md bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg overflow-hidden">
                <div class="bg-orange-500/90 dark:bg-orange-600/90 px-4 py-3 text-center">
                    <h2 class="text-xl font-bold text-white">Progreso: {{ $exercise->name }}</h2>
                </div>

                <div class="p-4 space-y-4">
                    <div class="h-64 flex items-center justify-center">
                        @livewire('exercise-progress-chart', [
                            'exercise' => $exercise,
                            'showTimeRangeFilter' => false
                        ])
                    </div>
                    
                    <div class="pt-2">
                        <a href="{{ url()->previous() }}" class="text-sm text-orange-600 dark:text-orange-400 hover:underline flex items-center justify-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                            </svg>
                            Volver
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>