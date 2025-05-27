// src/pages/Dashboard.jsx (versión final completa)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Empty from '../components/Empty';
import { useAlert } from '../context/AlertContext';
import { getPrograms } from '../api/programService';
import { getSessions } from '../api/sessionService';
import { getCurrentUser } from '../api/authService';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del usuario actual
        const userData = await getCurrentUser();
        setUser(userData);
        
        // Obtener programas
        const programsResponse = await getPrograms();
        setPrograms(programsResponse.data);
        
        // Obtener todas las sesiones (en una implementación real, podrías filtrar por las más recientes)
        const sessionsResponse = await getSessions();
        // Ordenar por fecha (simulado) y tomar las 3 más recientes
        const sortedSessions = sessionsResponse.data
          .sort((a, b) => new Date(b.created_at || '2025-01-01') - new Date(a.created_at || '2025-01-01'))
          .slice(0, 3);
        setRecentSessions(sortedSessions);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        setError('Error al cargar los datos del dashboard');
        showError('No se pudieron cargar los datos. Por favor, inténtalo de nuevo.');
        setLoading(false);
      }
    };

    fetchData();
  }, [showError]);

  if (loading) return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <LoadingSpinner size="large" />
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* Saludo al usuario */}
        {user && (
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-2">¡Bienvenido, {user.name}!</h2>
            <p className="text-gray-600">Este es tu centro de control para gestionar tus entrenamientos.</p>
          </div>
        )}
        
        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Programas</h3>
            <p className="text-3xl font-bold mb-2">{programs.length}</p>
            <Link to="/programs" className="text-blue-500 hover:text-blue-700">
              Ver todos los programas →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Próxima Sesión</h3>
            {recentSessions.length > 0 ? (
              <>
                <p className="text-lg font-semibold mb-1">{recentSessions[0].name}</p>
                <p className="text-gray-600 mb-2">
                  {recentSessions[0].description.substring(0, 80)}
                  {recentSessions[0].description.length > 80 ? '...' : ''}
                </p>
                <Link to={`/sessions/${recentSessions[0].id}`} className="text-blue-500 hover:text-blue-700">
                  Ver detalles →
                </Link>
              </>
            ) : (
              <p>No hay sesiones programadas</p>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Link 
                to="/programs/create" 
                className="block bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-600"
              >
                Nuevo Programa
              </Link>
              <Link 
                to="/sessions/create" 
                className="block bg-purple-500 text-white py-2 px-4 rounded text-center hover:bg-purple-600"
              >
                Nueva Sesión
              </Link>
            </div>
          </div>
        </div>
        
        {/* Programas recientes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Programas Recientes</h2>
            <Link to="/programs" className="text-blue-500 hover:text-blue-700">
              Ver todos →
            </Link>
          </div>
          
          {programs.length === 0 ? (
            <Empty 
              message="No tienes programas de entrenamiento" 
              action={
                <Link 
                  to="/programs/create" 
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Crear tu primer programa
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.slice(0, 3).map(program => (
                <div key={program.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {program.description.substring(0, 80)}
                    {program.description.length > 80 ? '...' : ''}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Duración: {program.duration_weeks} semanas | Tipo: {program.type}
                  </p>
                  <Link 
                    to={`/programs/${program.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Ver detalles →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Sesiones recientes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Sesiones Recientes</h2>
            <Link to="/sessions" className="text-blue-500 hover:text-blue-700">
              Ver todas →
            </Link>
          </div>
          
          {recentSessions.length === 0 ? (
            <Empty 
              message="No tienes sesiones de entrenamiento" 
              action={
                <Link 
                  to="/sessions/create" 
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Crear tu primera sesión
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {recentSessions.map(session => (
                <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <h3 className="text-lg font-semibold mb-2">{session.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {session.description.substring(0, 120)}
                    {session.description.length > 120 ? '...' : ''}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Duración: {session.duration_minutes} minutos | 
                      Ejercicios: {session.exercises?.length || 0}
                    </div>
                    <Link 
                      to={`/sessions/${session.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;