// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  const token = cookies.get('token');

  if (!token) {
    // Si el token no existe, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si el token existe, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
