// src/pages/Programs.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrograms, deleteProgram } from '../api/programService';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los programas');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este programa?')) {
      try {
        await deleteProgram(id);
        // Actualizar la lista de programas
        setPrograms(programs.filter(program => program.id !== id));
      } catch (err) {
        setError('Error al eliminar el programa');
      }
    }
  };

  if (loading) return <div>Cargando programas...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programas de Entrenamiento</h1>
        <Link 
          to="/programs/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Programa
        </Link>
      </div>

      {programs.length === 0 ? (
        <p>No hay programas disponibles. ¡Crea uno nuevo!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map(program => (
            <div 
              key={program.id} 
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{program.name}</h2>
              <p className="text-gray-600 mb-2">{program.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Duración: {program.duration_weeks} semanas</p>
                <p>Tipo: {program.type}</p>
              </div>
              <div className="flex justify-between">
                <Link 
                  to={`/programs/${program.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Ver detalles
                </Link>
                <div className="space-x-2">
                  <Link 
                    to={`/programs/${program.id}/edit`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(program.id)}
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

export default ProgramsPage;