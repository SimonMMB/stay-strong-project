// components/RegisterForm.jsx (actualizado y mejorado)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authService';
import { useAuth } from '../context/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error específico cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await register(formData);
      // Guardar token
      localStorage.setItem('auth_token', response.token);
      // Actualiza el estado global de autenticación
      setUser(response.user);
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Manejar errores de validación del servidor
        setErrors(error.response.data.errors);
      } else {
        // Error general
        setErrors({
          general: error.response?.data?.message || 'Error al registrarse. Inténtalo de nuevo.'
        });
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.general}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Nombre completo"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Contraseña (mínimo 8 caracteres)"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2">
          Confirmar Contraseña
        </label>
        <input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          placeholder="Repite tu contraseña"
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-xs italic mt-1">{errors.password_confirmation}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;