import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPrograms, deleteProgram } from '../../api/programService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDumbbell, faPlus, faCalendarAlt, 
  faTrash, faEye, faEdit 
} from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProgramsList = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Crear una función que podamos llamar para recargar los programas
  const loadPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar si el usuario está autenticado
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Sesión no válida. Inicia sesión nuevamente.');
        navigate('/login');
        return;
      }
      
      const data = await getPrograms();
      
      // Asegurarse de que data es un array
      if (Array.isArray(data)) {
        setPrograms(data);
      } else if (data && typeof data === 'object') {
        // Si es un objeto que contiene un array, intenta encontrarlo
        const possibleArrays = Object.values(data).filter(Array.isArray);
        if (possibleArrays.length > 0) {
          setPrograms(possibleArrays[0]);
        } else {
          console.warn('La respuesta no contiene un array:', data);
          setPrograms([]);
        }
      } else {
        console.warn('La respuesta no es un array:', data);
        setPrograms([]);
      }
    } catch (err) {
      console.error('Error al cargar programas:', err);
      setError('No se pudieron cargar los programas. Por favor, intenta más tarde.');
      toast.error('Error al cargar los programas');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Usar el callback en el efecto
  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  // Formatear fecha con manejo de errores
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    try {
      return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha no válida';
    }
  };

  // Calcular porcentaje de progreso con validación
  const getProgress = (program) => {
    if (!program) return 0;
    if (!program.total_sessions || program.total_sessions === 0) return 0;
    
    const completed = program.completed_sessions || 0;
    return Math.round((completed / program.total_sessions) * 100);
  };

  // Confirmar y eliminar un programa
  const handleDeleteProgram = (programId) => {
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este programa? Esta acción no se puede deshacer.',
      buttons: [
        {
          label: 'Sí, eliminar',
          onClick: async () => {
            try {
              setDeleting(true);
              await deleteProgram(programId);
              // Actualizar la lista de programas
              setPrograms(prevPrograms => prevPrograms.filter(p => p.id !== programId));
              toast.success('Programa eliminado con éxito');
            } catch (error) {
              console.error('Error al eliminar programa:', error);
              toast.error('Error al eliminar el programa');
            } finally {
              setDeleting(false);
            }
          }
        },
        {
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    });
  };

  // Renderizado condicional para estado de carga
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Renderizado condicional para estado de error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <div className="mt-3">
            <button 
              onClick={loadPrograms}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Reintentar
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Volver al dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Programas de Entrenamiento</h1>
        <Link
          to="/programs/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Nuevo Programa
        </Link>
      </div>

      {(!programs || programs.length === 0) ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <FontAwesomeIcon icon={faDumbbell} className="text-gray-300 text-5xl mb-4" />
          <p className="text-gray-500 mb-4">No tienes programas de entrenamiento creados</p>
          <Link
            to="/programs/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Crear nuevo programa
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.id || `program-${Math.random()}`}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    Programa #{program.id || 'Nuevo'}
                  </h2>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/programs/${program.id}`}
                      className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200"
                      title="Ver sesiones"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <button
                      onClick={() => handleDeleteProgram(program.id)}
                      disabled={deleting}
                      className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
                      title="Eliminar programa"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                  <span className="text-sm">
                    {formatDate(program.start_date)} - {formatDate(program.estimated_end_date)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Frecuencia</p>
                    <p className="text-sm font-semibold">{program.training_frequency || 0} días/semana</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Duración</p>
                    <p className="text-sm font-semibold">{program.training_duration || 0} meses</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span>{getProgress(program)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${getProgress(program)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Sesiones:</span>
                    <span className="ml-1 font-semibold">
                      {program.completed_sessions || 0}/{program.total_sessions || 0}
                    </span>
                  </div>
                  
                  <Link
                    to={`/programs/${program.id}`}
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramsList;