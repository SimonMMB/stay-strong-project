<x-app-layout>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap" rel="stylesheet">

    <div class="flex h-screen w-full">
        <a href="{{ route('dashboard') }}" class="absolute top-4 left-4 z-50">
            <div class="bg-orange-500/90 dark:bg-orange-600/90 rounded-lg p-3 shadow-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300">
                <h2 class="text-xl text-white text-center" style="font-family: 'Roboto', sans-serif; font-style: italic; font-weight: 900; font-stretch: 100%; letter-spacing: -0.05em; line-height: 0.9; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                    STAY<br>STRONG
                </h2>
            </div>
        </a>
        
        <div class="hidden md:block md:w-3/5 h-full">
            <img src="{{ asset('storage/004.jpg') }}" 
                 class="w-full h-full object-cover object-center"
                 alt="Fondo de entrenamiento">
        </div>

        <div class="w-full md:w-2/5 bg-white/70 dark:bg-gray-800/80 shadow-xl backdrop-blur-md overflow-y-auto">
            <div class="bg-orange-500/80 dark:bg-orange-600/80 p-4 text-center">
                <h2 class="text-2xl font-bold text-white">¡Completa con tus preferencias!</h2>
            </div>

            <div class="p-6 space-y-4">
                <form action="{{ route('programs.store') }}" method="POST">
                    @csrf

                    <div class="mb-4">
                        <label for="training_frequency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ¿Cuántos días por semana quieres entrenar?
                        </label>
                        <select name="training_frequency" id="training_frequency" class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white rounded-lg" required>
                            <option value="" disabled selected class="text-gray-500">Seleccionar frecuencia</option>
                            <option value="2">2 días por semana</option>
                            <option value="3">3 días por semana</option>
                            <option value="4">4 días por semana</option>
                            <option value="5">5 días por semana</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="training_duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ¿Durante cuántos meses?
                        </label>
                        <select name="training_duration" id="training_duration" class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white rounded-lg" required>
                            <option value="" disabled selected class="text-gray-500">Seleccionar duración</option>
                            <option value="2">2 meses</option>
                            <option value="3">3 meses</option>
                            <option value="4">4 meses</option>
                            <option value="5">5 meses</option>
                            <option value="6">6 meses</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="start_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ¿Cuándo quieres comenzar?
                        </label>
                        <input type="date" 
                               name="start_date" 
                               id="start_date" 
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 dark:text-white rounded-lg" 
                               value="{{ old('start_date') }}" 
                               required>
                    </div>

                    <div class="mb-6">
                        <label for="estimated_end_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Fecha estimada de finalización
                        </label>
                        <input type="date" 
                               name="estimated_end_date" 
                               id="estimated_end_date" 
                               class="w-full p-3 border border-gray-300 dark:border-gray-600 bg-gray-100/80 dark:bg-gray-700/80 focus:ring-2 focus:ring-orange-500 cursor-not-allowed text-gray-900 dark:text-white rounded-lg" 
                               value="{{ old('estimated_end_date') }}" 
                               readonly>
                    </div>

                    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 shadow-md transition duration-300 ease-in-out transform hover:scale-105 mb-4 rounded-lg">
                        Crear programa
                    </button>

                    <div class="flex justify-between mt-4"> <!-- Contenedor flex para alinear los enlaces -->
                        <a href="{{ route('programs.index') }}" 
                        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out rounded-lg">
                            Mis programas
                        </a>

                        <a href="{{ route('dashboard') }}" 
                        class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 shadow-md transition duration-300 ease-in-out rounded-lg">
                            Inicio
                        </a>
                    </div>

                </form>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener("DOMContentLoaded", function () {
        const startDateInput = document.getElementById("start_date");
        const trainingDurationInput = document.getElementById("training_duration");
        const estimatedEndDateInput = document.getElementById("estimated_end_date");

        function calculateEndDate() {
            const startDateValue = startDateInput.value;
            const trainingDurationValue = trainingDurationInput.value;

            if (startDateValue && trainingDurationValue) {
                let startDate = new Date(startDateValue);
                startDate.setMonth(startDate.getMonth() + parseInt(trainingDurationValue));

                let year = startDate.getFullYear();
                let month = String(startDate.getMonth() + 1).padStart(2, "0");
                let day = String(startDate.getDate()).padStart(2, "0");

                estimatedEndDateInput.value = `${year}-${month}-${day}`;
            }
        }

        startDateInput.addEventListener("change", calculateEndDate);
        trainingDurationInput.addEventListener("change", calculateEndDate);
    });
    </script>
</x-app-layout>