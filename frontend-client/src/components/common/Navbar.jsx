import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../../api/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faDumbbell, faUser, faUsers, 
  faSignOutAlt, faBars, faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    try {
      // Primero eliminar tokens de autenticación
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
      // Mostrar mensaje de éxito
      toast.success('Sesión cerrada correctamente');
      
      // Redirigir al login (usando replace para evitar volver atrás)
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="flex items-center">
              <FontAwesomeIcon icon={faDumbbell} className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">STAY STRONG</span>
            </Link>
          </div>

          {/* Navegación para pantallas medianas y grandes */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faHome} className="mr-1" /> Dashboard
              </Link>
              <Link 
                to="/programs" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faDumbbell} className="mr-1" /> Programas
              </Link>
              <Link 
                to="/profile" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faUser} className="mr-1" /> Perfil
              </Link>
              
              {/* Mostrar enlace a usuarios solo para administradores y entrenadores */}
              {hasRole(['admin', 'trainer']) && (
                <Link 
                  to="/users" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-1" /> Usuarios
                </Link>
              )}
            </div>
          </div>

          {/* Usuario y cierre de sesión */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="mr-3 text-sm">
                    Hola, {user?.name || 'Usuario'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> Salir
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de menú para móviles */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" /> Dashboard
            </Link>
            <Link
              to="/programs"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" /> Programas
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Perfil
            </Link>
            
            {/* Mostrar enlace a usuarios solo para administradores y entrenadores */}
            {hasRole(['admin', 'trainer']) && (
              <Link
                to="/users"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Usuarios
              </Link>
            )}
            
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;