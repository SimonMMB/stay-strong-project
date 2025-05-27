import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { getProgram, deleteProgram } from '../../api/programService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faChartLine, faDumbbell, 
  faTrash, faArrowLeft, faSpinner, 
  faExclamationTriangle, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirectToList, setRedirectToList] = useState(false);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        const data = await getProgram(programId);
        setProgram(data);
      } catch (err) {
        console.error('Error al cargar el programa:', err);
        setError('No se pudo cargar el programa de entrenamiento');
        toast.error('Error al cargar el programa');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, [programId]);

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };

  // Calcular el progreso del programa
  const getProgress = () => {
    if (!program) return 0;
    return program.completed_sessions > 0 
      ? Math.round((program.completed_sessions / program.total_sessions) * 100) 
      : 0;
  };

  // Manejar la eliminación del programa
  const handleDeleteProgram = () => {
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este programa? Esta acción no se puede deshacer.',
      buttons: [
        {
          label: 'Sí, eliminar',
          onClick: async () => {
            try {
              await deleteProgram(programId);
              toast.success('Programa eliminado con éxito');
              setRedirectToList(true);
            } catch (error) {
              console.error('Error al eliminar programa:', error);
              toast.error('Error al eliminar el programa');
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

  // Redirigir a la lista de programas si se eliminó
  if (redirectToList) {
    return <Navigate to="/programs" />;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-4xl mb-4" />
        <p className="text-gray-600">Cargando programa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl mr-2" />
            <strong className="font-bold mr-2">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/programs')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver a la lista de programas
        </button>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl mr-2" />
            <strong className="font-bold mr-2">¡Atención!</strong>
            <span className="block sm:inline">El programa solicitado no existe.</span>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/programs')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver a la lista de programas
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <button
          onClick={() => navigate('/programs')}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver a la lista de programas
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Programa de Entrenamiento</h1>
          
          <button
            onClick={handleDeleteProgram}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Eliminar Programa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faDumbbell} className="text-gray-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Frecuencia de entrenamiento</p>
                <p className="text-lg font-semibold">{program.training_frequency} días por semana</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Duración del programa</p>
                <p className="text-lg font-semibold">{program.training_duration} meses</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-gray-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Progreso total</p>
                <p className="text-lg font-semibold">{getProgress()}% completado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Detalles del programa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha de inicio</p>
              <p className="text-base">{formatDate(program.start_date)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Fecha estimada de finalización</p>
              <p className="text-base">{formatDate(program.estimated_end_date)}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Progreso</h2>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{program.completed_sessions} de {program.total_sessions} sesiones completadas</span>
            <span>{getProgress()}% completado</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/programs/${programId}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Ver sesiones y progreso detallado
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;