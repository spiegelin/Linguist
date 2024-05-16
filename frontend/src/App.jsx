//App.jsx
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { Light } from "./styles/Themes";
import styled from "styled-components";
import { LoginPage } from './pages/LoginPage';
import MainApp from './components/MainApp';
import { Sidebar } from "./components/Sidebar";

export const ThemeContext = React.createContext(null);

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const themeStyle = Light;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeContext.Provider value={{ theme: "light" }}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container>
            {isLoggedIn ? (
              <>
                <Sidebar />
                <MainApp />
              </>
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
