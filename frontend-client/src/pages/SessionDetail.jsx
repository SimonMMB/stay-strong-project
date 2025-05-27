// src/pages/SessionDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSession } from '../api/sessionService';

const SessionDetailPage = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSession(id);
        setSession(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos de la sesión');
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!session) return <div>Sesión no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to={session.program_id ? `/programs/${session.program_id}` : '/sessions'} 
          className="text-blue-500 hover:text-blue-700"
        >
          &larr; Volver
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{session.name}</h1>
            <p className="text-gray-600 mb-4">{session.description}</p>
          </div>
          <div>
            <Link 
              to={`/sessions/${session.id}/edit`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Editar Sesión
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">Duración</h3>
            <p>{session.duration_minutes} minutos</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">Programa</h3>
            <p>
              {session.program_id ? (
                <Link 
                  to={`/programs/${session.program_id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Ver programa
                </Link>
              ) : (
                'Sin programa asignado'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ejercicios</h2>
        </div>

        {!session.exercises || session.exercises.length === 0 ? (
          <p>No hay ejercicios para esta sesión.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Series</th>
                  <th className="py-2 px-4 border-b">Repeticiones</th>
                  <th className="py-2 px-4 border-b">Peso (kg)</th>
                </tr>
              </thead>
              <tbody>
                {session.exercises.map(exercise => (
                  <tr key={exercise.id}>
                    <td className="py-2 px-4 border-b">{exercise.name}</td>
                    <td className="py-2 px-4 border-b text-center">{exercise.sets}</td>
                    <td className="py-2 px-4 border-b text-center">{exercise.reps}</td>
                    <td className="py-2 px-4 border-b text-center">{exercise.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionDetailPage;