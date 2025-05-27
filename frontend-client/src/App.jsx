import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from './api/authService';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  // Añadir estado para rastrear la autenticación
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  
  // Comprobar autenticación cuando cambie el localStorage
  useEffect(() => {
    // Función para verificar la autenticación
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
    
    // Verificar al inicio
    checkAuth();
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    
    // Crear un observador para verificar periódicamente
    const authCheckInterval = setInterval(checkAuth, 1000);
    
    // Limpiar listeners y interval
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(authCheckInterval);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Usar el estado local en lugar de llamar a la función directamente */}
      {authenticated && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;