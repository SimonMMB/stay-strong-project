import apiClient from './config';

/**
 * Obtiene todas las sesiones de entrenamiento de un programa.
 * @param {number} programId - ID del programa
 * @returns {Promise} Promesa con la respuesta
 */
export const getSessionsByProgram = async (programId) => {
  try {
    const response = await apiClient.get(`/programs/${programId}/training-sessions`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener sesiones del programa ${programId}:`, error);
    throw error;
  }
};

/**
 * Obtiene una sesión de entrenamiento específica.
 * @param {number} id - ID de la sesión
 * @returns {Promise} Promesa con la respuesta
 */
export const getTrainingSession = async (id) => {
  try {
    const response = await apiClient.get(`/training-sessions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la sesión ${id}:`, error);
    throw error;
  }
};

/**
 * Actualiza una sesión de entrenamiento.
 * @param {number} id - ID de la sesión
 * @param {Object} sessionData - Datos a actualizar
 * @param {string} [sessionData.status] - Estado (pending, completed)
 * @param {string} [sessionData.comments] - Comentarios
 * @param {string} [sessionData.estimated_date] - Fecha estimada (YYYY-MM-DD)
 * @returns {Promise} Promesa con la respuesta
 */
export const updateTrainingSession = async (id, sessionData) => {
  try {
    const response = await apiClient.patch(`/training-sessions/${id}`, sessionData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la sesión ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene los ejercicios de una sesión de entrenamiento.
 * @param {number} sessionId - ID de la sesión
 * @returns {Promise} Promesa con la respuesta
 */
export const getSessionExercises = async (sessionId) => {
  try {
    const response = await apiClient.get(`/training-sessions/${sessionId}/exercises`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener ejercicios de la sesión ${sessionId}:`, error);
    throw error;
  }
};

/**
 * Actualiza un ejercicio de una sesión.
 * @param {number} sessionId - ID de la sesión
 * @param {number} exerciseId - ID del ejercicio
 * @param {Object} exerciseData - Datos del ejercicio
 * @param {number} [exerciseData.lifted_weight] - Peso levantado
 * @param {boolean} [exerciseData.completed] - Si el ejercicio está completado
 * @returns {Promise} Promesa con la respuesta
 */
export const updateSessionExercise = async (sessionId, exerciseId, exerciseData) => {
  try {
    // Convertir el formato utilizado en el frontend al formato esperado por la API
    const apiData = {
      lifted_weight: exerciseData.lifted_weight,
      status: exerciseData.completed ? 'completed' : 'pending'
    };
    
    const response = await apiClient.patch(
      `/training-sessions/${sessionId}/exercises/${exerciseId}`, 
      apiData
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el ejercicio ${exerciseId} de la sesión ${sessionId}:`, error);
    throw error;
  }
};

/**
 * Completa todos los ejercicios de una sesión y marca la sesión como completada.
 * @param {number} sessionId - ID de la sesión
 * @returns {Promise} Promesa con la respuesta
 */
export const completeTrainingSession = async (sessionId) => {
  try {
    const response = await apiClient.patch(
      `/training-sessions/${sessionId}`, 
      { status: 'completed' }
    );
    return response.data;
  } catch (error) {
    console.error(`Error al completar la sesión ${sessionId}:`, error);
    throw error;
  }
};

export default {
  getSessionsByProgram,
  getTrainingSession,
  updateTrainingSession,
  getSessionExercises,
  updateSessionExercise,
  completeTrainingSession
};