// app.jsx
import React from "react";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";

export const ThemeContext = React.createContext(null);

function App() {
  const themeStyle = Light; // Siempre se usa el tema claro

  return (
    <>
      <ThemeContext.Provider value={{ theme: "light" }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container>
              <Sidebar />
              <MyRoutes />
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
`;

export default App;
