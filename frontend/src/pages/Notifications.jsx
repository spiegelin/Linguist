//Notifications.jsx
import React from "react";
import styled from "styled-components";
import MainLayout from '../components/MainLayout';

export function Notifications() {
  return (
    <MainLayout>
      <Container>
        <h1>Notifications</h1>
      </Container>
    </MainLayout>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px; // Añadir algo de padding para la separación del contenido
`;
