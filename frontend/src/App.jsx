import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { Light } from "./styles/Themes";
import styled from "styled-components";
import MainApp from './components/MainApp';
import { ConditionalGlobalStyles } from './styles/GlobalStyles'; // Importa los estilos globales condicionales
import { ProfileProvider } from './pages/ProfileContext'; // Asegúrate de que la ruta sea correcta

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
    <ProfileProvider> {/* Envuelve todo en ProfileProvider */}
      <ThemeContext.Provider value={{ theme: "light" }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <ConditionalGlobalStyles />
            <Container>
              <Content>
                <MainApp />
              </Content>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ProfileProvider>
  );
}

export default App;
