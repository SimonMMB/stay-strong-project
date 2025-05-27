// src/pages/ProgramDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProgram } from '../api/programService';
import { getSessions } from '../api/sessionService';

const ProgramDetailPage = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programResponse = await getProgram(id);
        setProgram(programResponse.data);
        
        const sessionsResponse = await getSessions(id);
        setSessions(sessionsResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del programa');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!program) return <div>Programa no encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/programs" className="text-blue-500 hover:text-blue-700">
          &larr; Volver a Programas
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
            <p className="text-gray-600 mb-4">{program.description}</p>
          </div>
          <div>
            <Link 
              to={`/programs/${program.id}/edit`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
            >
              Editar Programa
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">Duración</h3>
            <p>{program.duration_weeks} semanas</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">Tipo</h3>
            <p>{program.type}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">Creado</h3>
            <p>{new Date(program.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sesiones de Entrenamiento</h2>
          <Link 
            to={`/programs/${program.id}/sessions/create`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Añadir Sesión
          </Link>
        </div>

        {sessions.length === 0 ? (
          <p>No hay sesiones disponibles para este programa.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => (
              <div 
                key={session.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{session.name}</h3>
                <p className="text-gray-600 mb-2">{session.description}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Duración: {session.duration_minutes} minutos
                </p>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetailPage;