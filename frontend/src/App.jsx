import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { Light } from "./styles/Themes";
import styled from "styled-components";
import MainApp from './components/MainApp';
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
    <>
    <GlobalStyles />
    <ThemeContext.Provider value={{ theme: "light" }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container>
            <Content>
              <MainApp />
            </Content>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  );
}

export default App;
