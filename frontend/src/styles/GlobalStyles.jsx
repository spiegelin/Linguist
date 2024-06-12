import { createGlobalStyle } from 'styled-components';
import { useLocation } from 'react-router-dom';
import React from 'react';

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const ConditionalGlobalStyles = () => {
  const location = useLocation();

  // Si la ruta es /Landing, no se aplican los estilos globales
  if (location.pathname === '/Landing') {
    return null;
  }

  return <GlobalStyles />;
};
