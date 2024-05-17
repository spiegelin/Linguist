import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* Esto evita que el cuerpo y el HTML se desplacen lateralmente */
  }

  #root {
    width: 100%;
    height: 100%;
    overflow: hidden; /* Esto evita que el contenido se desplace lateralmente */
  }
`;

export default GlobalStyles;
