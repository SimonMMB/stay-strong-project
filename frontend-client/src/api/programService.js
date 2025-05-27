import apiClient from './config';

/**
 * Obtiene todos los programas del usuario actual.
 * @returns {Promise} Promesa con la respuesta
 */
export const getPrograms = async () => {
  try {
    const response = await apiClient.get('/programs');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los programas:', error);
    throw error;
  }
};

/**
 * Obtiene un programa específico por su ID.
 * @param {number} id - ID del programa
 * @returns {Promise} Promesa con la respuesta
 */
export const getProgram = async (id) => {
  try {
    const response = await apiClient.get(`/programs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el programa ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo programa de entrenamiento.
 * @param {Object} programData - Datos del programa
 * @param {number} programData.training_frequency - Frecuencia de entrenamiento (días por semana)
 * @param {number} programData.training_duration - Duración del programa (en meses)
 * @param {string} programData.start_date - Fecha de inicio (YYYY-MM-DD)
 * @param {string} programData.estimated_end_date - Fecha estimada de finalización (YYYY-MM-DD)
 * @returns {Promise} Promesa con la respuesta
 */
export const createProgram = async (programData) => {
  try {
    const response = await apiClient.post('/programs', programData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el programa:', error);
    throw error;
  }
};

/**
 * Actualiza un programa existente.
 * @param {number} id - ID del programa
 * @param {Object} programData - Datos a actualizar
 * @returns {Promise} Promesa con la respuesta
 */
export const updateProgram = async (id, programData) => {
  try {
    const response = await apiClient.patch(`/programs/${id}`, programData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el programa ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un programa.
 * @param {number} id - ID del programa
 * @returns {Promise} Promesa con la respuesta
 */
export const deleteProgram = async (id) => {
  try {
    const response = await apiClient.delete(`/programs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el programa ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene las estadísticas del programa.
 * @param {number} id - ID del programa
 * @returns {Promise} Promesa con la respuesta
 */
export const getProgramStats = async (id) => {
  try {
    const response = await apiClient.get(`/programs/${id}/stats`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener estadísticas del programa ${id}:`, error);
    throw error;
  }
};

export default {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramStats
};