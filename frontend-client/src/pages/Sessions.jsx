// src/pages/Sessions.jsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSessions, deleteSession } from '../api/sessionService';
import { getProgram } from '../api/programService';

const SessionsPage = () => {
  const { programId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si tenemos un programId, cargamos el programa específico
        if (programId) {
          const programResponse = await getProgram(programId);
          setProgram(programResponse.data);
        }
        
        // Cargamos las sesiones (filtradas por programa si hay programId)
        const sessionsResponse = await getSessions(programId);
        setSessions(sessionsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las sesiones');
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta sesión?')) {
      try {
        await deleteSession(id);
        // Actualizar la lista de sesiones
        setSessions(sessions.filter(session => session.id !== id));
      } catch (err) {
        setError('Error al eliminar la sesión');
      }
    }
  };

  if (loading) return <div>Cargando sesiones...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        {programId ? (
          <Link to={`/programs/${programId}`} className="text-blue-500 hover:text-blue-700">
            &larr; Volver al Programa
          </Link>
        ) : (
          <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
            &larr; Volver al Dashboard
          </Link>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {program 
            ? `Sesiones de Entrenamiento: ${program.name}` 
            : 'Todas las Sesiones de Entrenamiento'}
        </h1>
        <Link 
          to={programId ? `/programs/${programId}/sessions/create` : '/sessions/create'} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Sesión de Entrenamiento
        </Link>
      </div>

      {sessions.length === 0 ? (
        <p>No hay sesiones disponibles. ¡Crea una nueva!</p>
      ) : (
        <div className="space-y-4">
          {sessions.map(session => (
            <div 
              key={session.id} 
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{session.name}</h2>
              <p className="text-gray-600 mb-2">{session.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Duración: {session.duration_minutes} minutos</p>
                <p>Ejercicios: {session.exercises?.length || 0}</p>
              </div>
              <div className="flex justify-between">
                <Link 
                  to={`/sessions/${session.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Ver detalles
                </Link>
                <div className="space-x-2">
                  <Link 
                    to={`/sessions/${session.id}/edit`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(session.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionsPage;