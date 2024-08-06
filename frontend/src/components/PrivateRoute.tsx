import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated && !userType) {
    // Si el usuario está autenticado pero no tiene un tipo de usuario asignado, redirigir al inicio de sesión
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;