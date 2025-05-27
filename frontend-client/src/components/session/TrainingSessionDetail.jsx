import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainingSession, updateSessionExercise, completeTrainingSession } from '../../api/trainingSessionService';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, faHourglassHalf, faCalendarAlt, 
  faDumbbell, faArrowLeft, faWeight, faListOl 
} from '@fortawesome/free-solid-svg-icons';

const TrainingSessionDetail = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseWeights, setExerciseWeights] = useState({});
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);
        const sessionData = await getTrainingSession(sessionId);
        console.log('Respuesta completa de la API:', sessionData);
        console.log('¿Tiene sessionExercises?', !!sessionData.sessionExercises);
        if (sessionData.sessionExercises) {
          console.log('Cantidad de ejercicios:', sessionData.sessionExercises.length);
        }
        
        setSession(sessionData);
        
        // Extraer ejercicios y configurar pesos iniciales
        if (sessionData.sessionExercises) {
          setExercises(sessionData.sessionExercises);
          
          // Inicializar los pesos de cada ejercicio
          const weights = {};
          sessionData.sessionExercises.forEach(exercise => {
            weights[exercise.id] = exercise.lifted_weight || 0;
          });
          setExerciseWeights(weights);
        }
      } catch (err) {
        console.error('Error al cargar la sesión:', err);
        setError('No se pudo cargar la sesión de entrenamiento');
        toast.error('Error al cargar la sesión');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSessionData();
  }, [sessionId]);
  
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

  // Cambiar el peso de un ejercicio
  const handleWeightChange = (exerciseId, weight) => {
    setExerciseWeights({
      ...exerciseWeights,
      [exerciseId]: weight
    });
  };

  // Marcar un ejercicio como completado
  const handleCompleteExercise = async (exerciseId) => {
    try {
      const exercise = exercises.find(ex => ex.id === exerciseId);
      if (!exercise) return;

      // Si ya está completado, no hacer nada
      if (exercise.status === 'completed') return;

      const weight = exerciseWeights[exerciseId] || 0;
      const response = await updateSessionExercise(sessionId, exerciseId, {
        lifted_weight: weight,
        completed: true
      });

      // Actualizar el estado local
      setExercises(exercises.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, status: 'completed', lifted_weight: weight }
          : ex
      ));

      toast.success('Ejercicio completado');

      // Si la sesión se ha completado automáticamente, actualizar el estado
      if (response.session_status === 'completed') {
        setSession({ ...session, status: 'completed' });
        toast.success('¡Todos los ejercicios completados! Sesión finalizada.');
      }
    } catch (err) {
      console.error('Error al completar el ejercicio:', err);
      toast.error('Error al completar el ejercicio');
    }
  };

  // Completar toda la sesión manualmente
  const handleCompleteSession = async () => {
    try {
      setCompleting(true);
      const response = await completeTrainingSession(sessionId);
      setSession({ ...session, status: 'completed' });
      
      // Marcar todos los ejercicios como completados
      setExercises(exercises.map(ex => ({ ...ex, status: 'completed' })));
      
      toast.success('Sesión completada con éxito');
    } catch (err) {
      console.error('Error al completar la sesión:', err);
      toast.error('Error al completar la sesión');
    } finally {
      setCompleting(false);
    }
  };

  // Renderizar el estado de la sesión
  const renderSessionStatus = (status) => {
    if (status === 'completed') {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Completada
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
          <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" /> Pendiente
        </span>
      );
    }
  };

  // Volver a la lista de sesiones
  const handleGoBack = () => {
    if (session && session.program_id) {
      navigate(`/programs/${session.program_id}`);
    } else {
      navigate('/programs');
    }
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
      <div className="mb-4">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Volver a la lista de sesiones
        </button>
      </div>

      {session && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Sesión #{session.number_of_session}</h2>
            {renderSessionStatus(session.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Fecha Programada</p>
                  <p className="text-lg font-semibold">{formatDate(session.estimated_date)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faDumbbell} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Ejercicios</p>
                  <p className="text-lg font-semibold">
                    {exercises.length} ejercicios en total
                  </p>
                </div>
              </div>
            </div>
          </div>

          {session.status !== 'completed' && (
            <div className="mb-6">
              <button
                onClick={handleCompleteSession}
                disabled={completing}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                {completing ? 'Completando...' : 'Marcar sesión como completada'}
              </button>
              <p className="text-xs text-gray-500 mt-1">
                *Esto marcará todos los ejercicios como completados automáticamente
              </p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faListOl} className="mr-2" />
              Lista de Ejercicios
            </h3>

            {exercises.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faDumbbell} className="text-gray-300 text-5xl mb-4" />
                <p className="text-gray-500">No hay ejercicios asignados a esta sesión</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`border rounded-lg p-4 ${
                      exercise.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{exercise.exercise.name}</h4>
                        <p className="text-gray-600">Grupo muscular: {exercise.exercise.muscle_group}</p>
                        <p className="text-gray-600">
                          {exercise.exercise.series} series x {exercise.exercise.repetitions} repeticiones
                        </p>
                      </div>
                      
                      {exercise.status === 'completed' ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Completado
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
                          <FontAwesomeIcon icon={faHourglassHalf} className="mr-1" /> Pendiente
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faWeight} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">Peso utilizado:</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          min="0"
                          value={exerciseWeights[exercise.id] || 0}
                          onChange={(e) => handleWeightChange(exercise.id, parseInt(e.target.value) || 0)}
                          disabled={exercise.status === 'completed' || session.status === 'completed'}
                          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-24"
                        />
                        <span className="text-gray-600">kg</span>
                        
                        {exercise.status !== 'completed' && session.status !== 'completed' && (
                          <button
                            onClick={() => handleCompleteExercise(exercise.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
                          >
                            Completar ejercicio
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSessionDetail;