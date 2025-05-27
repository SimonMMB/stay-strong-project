// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrograms } from '../../api/programService';
import { getCurrentUser } from '../../api/authService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDumbbell, faPlus, faCalendarCheck, 
  faChartLine, faListAlt, faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const Dashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const programsData = await getPrograms();
        setPrograms(programsData);
      } catch (err) {
        console.error('Error al cargar programas:', err);
        setError('No se pudieron cargar los programas');
        toast.error('Error al cargar los programas');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Formato de fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  };

  // Obtener el programa activo (el más reciente)
  const getActiveProgram = () => {
    if (!programs.length) return null;
    
    // Ordenar por fecha de inicio descendente
    return [...programs].sort((a, b) => {
      return new Date(b.start_date) - new Date(a.start_date);
    })[0];
  };

  // Calcular estadísticas generales
  const getStats = () => {
    if (!programs.length) {
      return { 
        totalPrograms: 0, 
        totalSessions: 0, 
        completedSessions: 0, 
        pendingSessions: 0,
        completionRate: 0
      };
    }

    const totalSessions = programs.reduce((sum, program) => sum + program.total_sessions, 0);
    const completedSessions = programs.reduce((sum, program) => sum + program.completed_sessions, 0);
    const pendingSessions = totalSessions - completedSessions;
    const completionRate = totalSessions > 0 
      ? Math.round((completedSessions / totalSessions) * 100) 
      : 0;

    return {
      totalPrograms: programs.length,
      totalSessions,
      completedSessions,
      pendingSessions,
      completionRate
    };
  };

  // Obtener las próximas sesiones
  const getUpcomingSessions = () => {
    if (!programs.length) return [];
    
    // Aquí se implementaría la lógica para obtener las próximas sesiones
    // Por ahora, devolvemos un array vacío como placeholder
    return [];
  };

  const activeProgram = getActiveProgram();
  const stats = getStats();

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
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
        <p className="text-gray-600">
          Aquí encontrarás un resumen de tu actividad física y tus programas de entrenamiento
        </p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <FontAwesomeIcon icon={faDumbbell} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Programas</p>
              <p className="text-xl font-bold">{stats.totalPrograms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sesiones Completadas</p>
              <p className="text-xl font-bold">{stats.completedSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <FontAwesomeIcon icon={faListAlt} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sesiones Pendientes</p>
              <p className="text-xl font-bold">{stats.pendingSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <FontAwesomeIcon icon={faChartLine} className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tasa de Completitud</p>
              <p className="text-xl font-bold">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programa activo */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Programa Activo</h2>
          <Link 
            to="/programs" 
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Ver todos los programas
          </Link>
        </div>

        {activeProgram ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Frecuencia</p>
                <p className="text-lg font-semibold">{activeProgram.training_frequency} días por semana</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Duración</p>
                <p className="text-lg font-semibold">{activeProgram.training_duration} meses</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Fechas</p>
                <p className="text-lg font-semibold">
                  {formatDate(activeProgram.start_date)} - {formatDate(activeProgram.estimated_end_date)}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Progreso</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full" 
                  style={{ width: `${activeProgram.completed_sessions > 0 
                    ? Math.round((activeProgram.completed_sessions / activeProgram.total_sessions) * 100) 
                    : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-600">
                <span>{activeProgram.completed_sessions} de {activeProgram.total_sessions} sesiones completadas</span>
                <span>{activeProgram.completed_sessions > 0 
                  ? Math.round((activeProgram.completed_sessions / activeProgram.total_sessions) * 100) 
                  : 0}%</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link 
                to={`/programs/${activeProgram.id}`} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                Ver sesiones
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faDumbbell} className="text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500 mb-4">No tienes ningún programa de entrenamiento activo</p>
            <Link 
              to="/programs/create" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Crear nuevo programa
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;