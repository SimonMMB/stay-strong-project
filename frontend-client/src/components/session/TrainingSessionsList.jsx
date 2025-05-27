import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSessionsByProgram } from '../../api/trainingSessionService';
import { getProgram } from '../../api/programService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, faHourglassHalf, faCalendarAlt, 
  faDumbbell, faChevronLeft, faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

const TrainingSessionsList = () => {
  const { programId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      if (!programId) {
        setError('ID de programa no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Primero intentamos obtener la información del programa
        const programData = await getProgram(programId);
        setProgram(programData);
        
        // Luego intentamos obtener las sesiones, manejando el caso donde no hay sesiones
        try {
          const sessionsData = await getSessionsByProgram(programId);
          setSessions(sessionsData || []);
        } catch (sessionError) {
          console.log('Aviso: No se encontraron sesiones para este programa:', sessionError);
          // No establecemos error global, simplemente dejamos el array de sesiones vacío
          setSessions([]);
        }
        
        // Limpiamos cualquier error previo
        setError(null);
      } catch (err) {
        console.error('Error al cargar el programa:', err);
        setError('No se pudo cargar la información del programa');
        toast.error('Error al cargar el programa');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);
  
  // Cálculos para la paginación
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
  const totalPages = Math.ceil(sessions.length / sessionsPerPage);
  
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Formatea la fecha en un formato legible
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };
  
  // Renderiza un indicador de estado con color
  const renderStatus = (status) => {
    if (status === 'completed') {
      return (
        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Completada
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" /> Pendiente
        </span>
      );
    }
  };
  
  // Obtener el progreso del programa
  const getProgress = () => {
    if (!program) return 0;
    const completedSessions = program.completed_sessions || 0;
    const totalSessions = program.total_sessions || 1; // Evitar división por cero
    return completedSessions > 0 
      ? Math.round((completedSessions / totalSessions) * 100) 
      : 0;
  };
  
  // Renderizar controles de paginación
  const renderPagination = () => {
    if (sessions.length <= sessionsPerPage) return null;
    
    return (
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-blue-100 text-blue-800 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-blue-100 text-blue-800 disabled:bg-gray-100 disabled:text-gray-400"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {program && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Programa de Entrenamiento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Frecuencia</p>
              <p className="text-lg font-semibold">{program.training_frequency} días por semana</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Duración</p>
              <p className="text-lg font-semibold">{program.training_duration} meses</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Fechas</p>
              <p className="text-lg font-semibold">
                {formatDate(program.start_date)} - {formatDate(program.estimated_end_date)}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Progreso</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>{program.completed_sessions || 0} de {program.total_sessions || 0} sesiones completadas</span>
              <span>{getProgress()}%</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Link 
              to={`/programs/${programId}/regenerate-sessions`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Regenerar Sesiones
            </Link>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sesiones de Entrenamiento</h2>
          
          <Link
            to={`/programs/${programId}/create-session`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Añadir Sesión
          </Link>
        </div>
        
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faDumbbell} className="text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500 mb-4">No hay sesiones de entrenamiento disponibles para este programa</p>
            <p className="text-gray-600">Este programa necesita tener sesiones de entrenamiento generadas. Utiliza el botón "Regenerar Sesiones" o crea una sesión manualmente.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">#</th>
                    <th className="py-3 px-6 text-left">Fecha Estimada</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-left">Ejercicios</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {currentSessions.map((session) => (
                    <tr key={session.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">{session.number_of_session}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                          {formatDate(session.estimated_date)}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {renderStatus(session.status)}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {session.session_exercises ? session.session_exercises.length : 0} ejercicios
                      </td>
                      <td className="py-3 px-6 text-center">
                        <Link 
                          to={`/training-sessions/${session.id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                        >
                          Ver Detalles
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Renderizar paginación */}
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default TrainingSessionsList;