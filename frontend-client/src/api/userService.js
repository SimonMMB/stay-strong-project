import apiClient from './config';

/**
 * Obtiene todos los usuarios (solo para administradores).
 * @returns {Promise} Promesa con la respuesta
 */
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

/**
 * Obtiene un usuario específico por su ID.
 * @param {number} id - ID del usuario
 * @returns {Promise} Promesa con la respuesta
 */
export const getUser = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Crea un nuevo usuario (solo para administradores).
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.password - Contraseña
 * @param {string} userData.password_confirmation - Confirmación de contraseña
 * @param {string} userData.role - Rol (admin, trainer, trainee)
 * @returns {Promise} Promesa con la respuesta
 */
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

/**
 * Actualiza un usuario existente.
 * @param {number} id - ID del usuario
 * @param {Object} userData - Datos a actualizar
 * @returns {Promise} Promesa con la respuesta
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina un usuario (solo para administradores).
 * @param {number} id - ID del usuario
 * @returns {Promise} Promesa con la respuesta
 */
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el usuario ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene el perfil del usuario actual.
 * @returns {Promise} Promesa con la respuesta
 */
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil de usuario:', error);
    throw error;
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile
};