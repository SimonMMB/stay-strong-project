// src/pages/EditSession.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSession, updateSession } from '../api/sessionService';
import { getPrograms } from '../api/programService';

const EditSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_minutes: 60,
    program_id: ''
  });
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos de la sesión y los programas
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar programas
        const programsResponse = await getPrograms();
        setPrograms(programsResponse.data);
        
        // Cargar datos de la sesión
        const sessionResponse = await getSession(id);
        const sessionData = sessionResponse.data;
        
        setFormData({
          name: sessionData.name,
          description: sessionData.description,
          duration_minutes: sessionData.duration_minutes,
          program_id: sessionData.program_id
        });
        
        // Si hay ejercicios, los guardamos en el estado
        if (sessionData.exercises) {
          setExercises(sessionData.exercises);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    setSaving(true);
    setError(null);

    try {
      // Aquí solo actualizamos los datos básicos de la sesión
      await updateSession(id, formData);
      // Redirigir a la página de detalle de la sesión
      navigate(`/sessions/${id}`);
    } catch (err) {
      setError('Error al actualizar la sesión. Por favor, inténtalo de nuevo.');
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Sesión de Entrenamiento</h1>

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

        {/* Lista de ejercicios (solo lectura en este formulario) */}
        {exercises.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Ejercicios incluidos</h3>
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
                  {exercises.map(exercise => (
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
            <p className="text-sm text-gray-500 mt-2">
              Nota: Para modificar ejercicios, vuelve a la página de detalle después de guardar.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate(`/sessions/${id}`)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSessionPage;