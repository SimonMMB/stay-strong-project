import axios from 'axios';

// Configuración base para axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token de autenticación a todas las peticiones
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores de autenticación
    if (error.response && error.response.status === 401) {
      // Limpiamos los datos de autenticación
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Solo redirigimos al login si no estamos ya en la página de login o registro
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        console.log('Sesión expirada, redirigiendo a login...');
        
        // Usamos history.pushState en lugar de window.location para evitar recargas completas
        // que podrían interrumpir el flujo de React Router
        window.history.pushState({}, '', '/login');
        // Disparamos un evento para que React Router detecte el cambio
        window.dispatchEvent(new Event('popstate'));
      }
    }
    
    // Aseguramos que el error se propague para que los componentes puedan manejarlo
    return Promise.reject(error);
  }
);

export default apiClient;