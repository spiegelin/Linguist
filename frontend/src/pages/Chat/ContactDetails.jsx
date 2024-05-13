import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  background-color: #ccc; // Color de fondo para visualizar el componente
  padding: 10px;
  position: fixed; // Fija la barra en la parte superior
  width: 100%; // Hace que la barra ocupe toda la pantalla de ancho
`;

function ContactDetails() {
  return (
    <Container>
      Datos del contacto
    </Container>
  );
}

export default ContactDetails;
