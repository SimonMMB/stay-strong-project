// Vamos a crear services/api.js
import axios from 'axios';

// Crear una instancia de Axios con la URL base de tu API
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajusta esto según la URL de tu API Laravel
});

// Interceptor para añadir el token de autenticación a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta (como token expirado)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('auth_token');
      window.location.href = '/login'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default api;