// src/components/layout/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada correctamente');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={goToDashboard}
          className="flex items-center space-x-2 text-white hover:text-blue-200 transition duration-200"
        >
          <FontAwesomeIcon icon={faDumbbell} className="text-2xl" />
          <span className="text-xl font-bold">STAY STRONG</span>
        </button>

        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition duration-200"
          >
            <span>Cerrar sesión</span>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;