import apiClient from './config';

/**
 * Obtiene todos los ejercicios disponibles.
 * @returns {Promise} Promesa con la respuesta
 */
export const getAllExercises = async () => {
  try {
    const response = await apiClient.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los ejercicios:', error);
    throw error;
  }
};

/**
 * Obtiene un ejercicio específico por su ID.
 * @param {number} id - ID del ejercicio
 * @returns {Promise} Promesa con la respuesta
 */
export const getExercise = async (id) => {
  try {
    const response = await apiClient.get(`/exercises/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el ejercicio ${id}:`, error);
    throw error;
  }
};

/**
 * Busca ejercicios por grupo muscular.
 * @param {string} muscleGroup - Grupo muscular a buscar
 * @returns {Promise} Promesa con la respuesta
 */
export const getExercisesByMuscleGroup = async (muscleGroup) => {
  try {
    const response = await apiClient.get(`/exercises/muscle-group/${muscleGroup}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener ejercicios del grupo muscular ${muscleGroup}:`, error);
    throw error;
  }
};

/**
 * Obtiene todos los grupos musculares disponibles.
 * @returns {Promise} Promesa con la respuesta
 */
export const getMuscleGroups = async () => {
  try {
    const response = await apiClient.get('/exercises/muscle-groups');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los grupos musculares:', error);
    throw error;
  }
};

export default {
  getAllExercises,
  getExercise,
  getExercisesByMuscleGroup,
  getMuscleGroups
};