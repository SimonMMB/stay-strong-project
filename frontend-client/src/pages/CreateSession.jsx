// src/pages/CreateSession.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSession } from '../api/sessionService';
import { getPrograms } from '../api/programService';

const CreateSessionPage = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_minutes: 60,
    program_id: programId || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar programas para el selector
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        setPrograms(response.data);
        // Si no hay programId en la ruta pero hay programas disponibles, seleccionar el primero
        if (!programId && response.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            program_id: response.data[0].id.toString()
          }));
        }
      } catch (err) {
        console.error('Error al cargar programas:', err);
      }
    };

    fetchPrograms();
  }, [programId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration_minutes' || name === 'program_id' 
        ? parseInt(value) 
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createSession(formData);
      // Redirigir a la página de detalle de la sesión
      navigate(`/sessions/${response.data.id}`);
    } catch (err) {
      setError('Error al crear la sesión. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Sesión de Entrenamiento</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre de la Sesión
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Entrenamiento de piernas"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe el propósito y objetivos de esta sesión"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration_minutes">
            Duración (minutos)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration_minutes"
            type="number"
            name="duration_minutes"
            min="5"
            max="300"
            value={formData.duration_minutes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="program_id">
            Programa
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="program_id"
            name="program_id"
            value={formData.program_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un programa</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Sesión'}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionPage;