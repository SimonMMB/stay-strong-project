// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../api/authService';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Verificar si hay un token en localStorage
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Obtener datos del usuario actual
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (error) {
        // Si hay un error, eliminar el token (podría estar expirado)
        localStorage.removeItem('auth_token');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Función para actualizar el usuario después de login/register
  const setUser = (user) => {
    setCurrentUser(user);
  };

  // Función para logout
  const logoutUser = () => {
    localStorage.removeItem('auth_token');
    setCurrentUser(null);
  };

  // Valor a compartir en el contexto
  const value = {
    currentUser,
    setUser,
    logoutUser,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};