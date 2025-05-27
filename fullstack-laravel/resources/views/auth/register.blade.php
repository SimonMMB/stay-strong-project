<div class="max-w-lg mx-auto mt-8">
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>

        <form method="POST" action="{{ route('users.store') }}">
            @csrf

            <!-- Nombre -->
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('name') }}" 
                    required 
                    autofocus 
                >
                @error('name')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Apellido -->
            <div class="mb-4">
                <label for="surname" class="block text-sm font-medium text-gray-700">Apellido</label>
                <input 
                    id="surname" 
                    name="surname" 
                    type="text" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('surname') }}" 
                    required 
                >
                @error('surname')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Correo electrónico -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('email') }}" 
                    required 
                >
                @error('email')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Contraseña -->
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    required 
                >
                @error('password')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Confirmación de contraseña -->
            <div class="mb-4">
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <input 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    type="password" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    required 
                >
            </div>

            <!-- Frecuencia de entrenamiento -->
            <div class="mb-4">
                <label for="training_frequency" class="block text-sm font-medium text-gray-700">Frecuencia de entrenamiento</label>
                <input 
                    id="training_frequency" 
                    name="training_frequency" 
                    type="number" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('training_frequency') }}" 
                    min="2" max="5" 
                    required 
                >
                @error('training_frequency')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Duración del ciclo de entrenamiento -->
            <div class="mb-4">
                <label for="training_duration" class="block text-sm font-medium text-gray-700">Duración del ciclo de entrenamiento (meses)</label>
                <input 
                    id="training_duration" 
                    name="training_duration" 
                    type="number" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('training_duration') }}" 
                    min="2" max="6" 
                    required 
                >
                @error('training_duration')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Fecha de inicio -->
            <div class="mb-4">
                <label for="start_date" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input 
                    id="start_date" 
                    name="start_date" 
                    type="date" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('start_date') }}" 
                    required 
                >
                @error('start_date')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Fecha estimada de fin -->
            <div class="mb-4">
                <label for="estimated_end_date" class="block text-sm font-medium text-gray-700">Fecha estimada de fin</label>
                <input 
                    id="estimated_end_date" 
                    name="estimated_end_date" 
                    type="date" 
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    value="{{ old('estimated_end_date') }}" 
                    required 
                >
                @error('estimated_end_date')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6 text-center">
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Crear cuenta
                </button>
            </div>
        </form>
    </div>
</div>
