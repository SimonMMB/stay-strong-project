<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        {{ $slot }} <!-- Aquí se inyecta el contenido -->
    </div>

    {{-- Pilas de scripts --}}
    @stack('scripts') <!-- 👈 Chart.js se carga aquí -->
</body>
</html>