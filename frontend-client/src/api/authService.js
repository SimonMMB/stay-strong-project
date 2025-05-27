// authService.js - SOLUCIÓN DEFINITIVA

// Registrar un nuevo usuario
export const register = async (userData) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Guardar el token - CLAVE: usar access_token en lugar de token
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return { success: true, token: data.access_token, user: data.user };
    } else {
      // Redireccionar a login si no hay token
      return { success: true, redirect: true };
    }
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};

// Iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // CLAVE: Usar access_token en lugar de token
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      return { success: true };
    } else {
      throw new Error('No se recibió token del servidor');
    }
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Obtener el usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    return null;
  }
};

// Verificar si el usuario tiene cierto rol
export const hasRole = (allowedRoles) => {
  const user = getCurrentUser();
  if (!user || !user.role) {
    return false;
  }
  return Array.isArray(allowedRoles)
    ? allowedRoles.includes(user.role)
    : user.role === allowedRoles;
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  hasRole
};