// src/pages/EditProgram.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgram, updateProgram } from '../api/programService';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAlert } from '../context/AlertContext';

const EditProgramPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_weeks: 8,
    type: 'strength'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await getProgram(id);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el programa');
        showError('No se pudo cargar la información del programa');
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration_weeks' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateProgram(id, formData);
      showSuccess('Programa actualizado con éxito');
      navigate(`/programs/${id}`);
    } catch (err) {
      setError('Error al actualizar el programa. Por favor, inténtalo de nuevo.');
      showError('No se pudo actualizar el programa');
      setSaving(false);
    }
  };

  if (loading) return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <LoadingSpinner size="large" />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate(`/programs/${id}`)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver al Programa
          </button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Editar Programa</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nombre del Programa
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration_weeks">
              Duración (semanas)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration_weeks"
              type="number"
              name="duration_weeks"
              min="1"
              max="52"
              value={formData.duration_weeks}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Tipo de Programa
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="strength">Fuerza</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibilidad</option>
              <option value="weight-loss">Pérdida de peso</option>
              <option value="muscle-gain">Ganancia muscular</option>
              <option value="endurance">Resistencia</option>
              <option value="general">General</option>
            </select>
          </div>

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
              onClick={() => navigate(`/programs/${id}`)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProgramPage;