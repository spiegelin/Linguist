import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

// Lo que hace este componente es verificar si el usuario está autenticado, y si lo está redirige a la página de inicio
// Este es para el manejar el Login
const PublicRoute = ({ element }) => {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/add`, {
      withCredentials: true,
    })
    .then((response) => {
      setIsLogged(response.data.isLogged);
    })
    .catch(error => {
      console.error('Error al verificar la sesión:', error);
      setIsLogged(false);
    });
  }, []);

  if (isLogged === null) {
    return <div>Cargando...</div>; // Muestra un cargando mientras se verifica la autenticación
  }

  if (isLogged) {
    return <Navigate to="/Home" />;
  }

  return element;
};

export default PublicRoute;
