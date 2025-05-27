import React, { useState, useEffect } from 'react';
import { getCurrentUser, hasRole } from '../../api/authService';
import { getUserProfile, updateUser } from '../../api/userService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faEnvelope, faLock, 
  faSave, faUserShield, faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});

  // Obtener los datos iniciales del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Primero intentamos obtener el perfil desde la API
        const userData = await getUserProfile();
        setProfile(userData.data);
        
        // Inicializar el formulario con los datos del usuario
        setFormData({
          name: userData.data.name || '',
          email: userData.data.email || '',
          password: '',
          password_confirmation: ''
        });
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        
        // Si falla, usamos los datos almacenados localmente
        const localUser = getCurrentUser();
        if (localUser) {
          setProfile(localUser);
          setFormData({
            name: localUser.name || '',
            email: localUser.email || '',
            password: '',
            password_confirmation: ''
          });
        } else {
          toast.error('No se pudo cargar el perfil de usuario');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar errores al cambiar el valor
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    // Validar contraseña solo si se está intentando cambiar
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
      
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Las contraseñas no coinciden';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate() || !profile) {
      return;
    }
    
    setSaving(true);
    
    try {
      // Solo enviar los campos que han cambiado
      const dataToUpdate = {
        name: formData.name !== profile.name ? formData.name : undefined,
        email: formData.email !== profile.email ? formData.email : undefined
      };
      
      // Añadir contraseña solo si se ha proporcionado
      if (formData.password) {
        dataToUpdate.password = formData.password;
      }
      
      // Filtrar campos undefined
      const filteredData = Object.fromEntries(
        Object.entries(dataToUpdate).filter(([_, v]) => v !== undefined)
      );
      
      // Solo hacer la petición si hay cambios
      if (Object.keys(filteredData).length > 0) {
        const result = await updateUser(profile.id, filteredData);
        
        // Actualizar el perfil con los nuevos datos
        setProfile(result.data);
        
        // Reiniciar campos de contraseña
        setFormData({
          ...formData,
          password: '',
          password_confirmation: ''
        });
        
        toast.success('Perfil actualizado con éxito');
      } else {
        toast.info('No se detectaron cambios en el perfil');
      }
      
      // Desactivar modo edición
      setEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      const errorMessage = error.response?.data?.message || 'Error al actualizar perfil';
      toast.error(errorMessage);
      
      // Si hay errores de validación del servidor
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleEditing = () => {
    // Si estamos cancelando la edición, restaurar los valores originales
    if (editing && profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        password: '',
        password_confirmation: ''
      });
      setErrors({});
    }
    
    setEditing(!editing);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
          
          <button
            onClick={toggleEditing}
            className={`${
              editing
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center`}
          >
            <FontAwesomeIcon
              icon={editing ? faTimes : faEdit}
              className="mr-2"
            />
            {editing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>

        {!editing ? (
          // Vista de perfil
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="text-lg font-semibold">{profile?.name}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <p className="text-lg font-semibold">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <FontAwesomeIcon icon={faUserShield} className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p className="text-lg font-semibold capitalize">
                  {profile?.role === 'trainee'
                    ? 'Usuario (Entrenando)'
                    : profile?.role === 'trainer'
                    ? 'Entrenador'
                    : profile?.role === 'admin'
                    ? 'Administrador'
                    : profile?.role}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Formulario de edición
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none rounded-md block w-full pl-10 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-md block w-full pl-10 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña (dejar en blanco para mantener la actual)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-md block w-full pl-10 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar nueva contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className={`appearance-none rounded-md block w-full pl-10 py-2 border ${
                    errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
              )}
            </div>
            
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;