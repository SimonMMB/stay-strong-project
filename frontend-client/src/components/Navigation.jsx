// src/components/Navigation.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/authService';

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold">
              Fitness Tracker
            </Link>
          </div>
          
          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link to="/programs" className="hover:text-blue-200">
              Programas
            </Link>
            <Link to="/sessions" className="hover:text-blue-200">
              Sesiones
            </Link>
            <button 
              onClick={handleLogout}
              className="hover:text-blue-200"
            >
              Cerrar Sesión
            </button>
          </div>
          
          {/* Menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link 
              to="/dashboard" 
              className="block hover:text-blue-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/programs" 
              className="block hover:text-blue-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Programas
            </Link>
            <Link 
              to="/sessions" 
              className="block hover:text-blue-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Sesiones
            </Link>
            <button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block hover:text-blue-200 w-full text-left"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;