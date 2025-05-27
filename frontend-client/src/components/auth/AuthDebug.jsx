import React, { useState } from 'react';
import apiClient from '../../api/config';
import { toast } from 'react-toastify';

const AuthDebug = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Hacer una petición directa sin procesar la respuesta
      const result = await apiClient.post('/auth/login', loginFormData);
      
      // Mostrar la respuesta completa para depuración
      setResponse({
        status: result.status,
        statusText: result.statusText,
        headers: result.headers,
        data: result.data
      });
      
      toast.success('Petición exitosa');
    } catch (err) {
      console.error('Error en la petición:', err);
      
      setError({
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        } : null
      });
      
      toast.error('Error en la petición');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Depuración de Autenticación</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Login Test</h2>
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginFormData.email}
              onChange={handleLoginChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginFormData.password}
              onChange={handleLoginChange}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="********"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Enviando...' : 'Probar Login'}
            </button>
          </div>
        </form>
      </div>
      
      {response && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Respuesta Exitosa</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <div className="mb-2">
              <span className="font-semibold">Status:</span> {response.status} {response.statusText}
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Headers:</h3>
              <pre className="text-xs">{JSON.stringify(response.headers, null, 2)}</pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Data:</h3>
              <pre className="text-xs">{JSON.stringify(response.data, null, 2)}</pre>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Análisis de la respuesta:</h3>
            
            <div className="space-y-2">
              <p>
                <span className="font-medium">Token presente:</span>{' '}
                {response.data.token ? (
                  <span className="text-green-600">Sí</span>
                ) : response.data.access_token ? (
                  <span className="text-green-600">Sí (como access_token)</span>
                ) : response.data.data?.token ? (
                  <span className="text-green-600">Sí (dentro de data.token)</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </p>
              
              <p>
                <span className="font-medium">Usuario presente:</span>{' '}
                {response.data.user ? (
                  <span className="text-green-600">Sí</span>
                ) : response.data.data?.user ? (
                  <span className="text-green-600">Sí (dentro de data.user)</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
          
          <div className="bg-red-50 p-4 rounded-lg overflow-auto max-h-96">
            <div className="mb-2">
              <span className="font-semibold">Mensaje:</span> {error.message}
            </div>
            
            {error.response && (
              <>
                <div className="mb-2">
                  <span className="font-semibold">Status:</span> {error.response.status} {error.response.statusText}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Data:</h3>
                  <pre className="text-xs">{JSON.stringify(error.response.data, null, 2)}</pre>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDebug;