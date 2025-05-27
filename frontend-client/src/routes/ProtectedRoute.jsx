import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/authService';

/**
 * Componente para proteger rutas que requieren autenticación.
 * Si el usuario no está autenticado, redirige al login.
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" />;
  }

  // Si está autenticado, mostrar el componente hijo
  return children;
};

export default ProtectedRoute;