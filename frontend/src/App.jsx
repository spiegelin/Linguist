import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { Light } from "./styles/Themes";
import styled from "styled-components";
import { LoginPage } from './pages/LoginPage';
import MainApp from './components/MainApp';
import { Sidebar } from "./components/Sidebar";
import GlobalStyles from './styles/GlobalStyles'; // Importa los estilos globales

export const ThemeContext = React.createContext(null);

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

function App() {
  const themeStyle = Light;

  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <MainApp/>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
