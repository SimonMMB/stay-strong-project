import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/authService';

// Componentes públicos
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthDebug from '../components/auth/AuthDebug';

// Componentes privados
import Dashboard from '../components/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ProgramsList from '../components/program/ProgramsList';
import CreateProgramForm from '../components/program/CreateProgramForm';
import ProgramDetail from '../components/program/ProgramDetail';
import TrainingSessionsList from '../components/session/TrainingSessionsList';
import TrainingSessionDetail from '../components/session/TrainingSessionDetail';
import UserProfile from '../components/user/UserProfile';
import UsersList from '../components/user/UsersList';
import NotFound from '../components/common/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={
        !isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />
      } />
      <Route path="/register" element={
        !isAuthenticated() ? <Register /> : <Navigate to="/dashboard" />
      } />
      
      {/* Ruta de depuración - solo en desarrollo */}
      <Route path="/auth-debug" element={<AuthDebug />} />
      
      {/* Ruta por defecto - redirige a dashboard si está autenticado, a login si no */}
      <Route path="/" element={
        isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
      } />
      
      {/* Rutas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Rutas de programas */}
      <Route path="/programs" element={
        <ProtectedRoute>
          <ProgramsList />
        </ProtectedRoute>
      } />
      <Route path="/programs/create" element={
        <ProtectedRoute>
          <CreateProgramForm />
        </ProtectedRoute>
      } />
      <Route path="/programs/:programId" element={
        <ProtectedRoute>
          <TrainingSessionsList />
        </ProtectedRoute>
      } />
      
      {/* Rutas de sesiones de entrenamiento */}
      <Route path="/training-sessions/:sessionId" element={
        <ProtectedRoute>
          <TrainingSessionDetail />
        </ProtectedRoute>
      } />
      
      {/* Rutas de usuarios */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      } />
      
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;