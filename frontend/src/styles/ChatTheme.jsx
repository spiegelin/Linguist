// ChatTheme.jsx
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal}; // Ajuste del fondo del contenedor principal del chat
`;


export const ContactDetails = styled.div`
  flex: 0.3; // reduce el tamaño de la barra lateral
  background-color: #ddd; // color de fondo para visualizar el componente
  padding: 20px; // algo de padding para el contenido
`;

export const TopBar = styled.div`
  height: 50px;
  background-color: #ccc; // color de fondo para visualizar el componente
  padding: 10px;
  position: fixed; // fija la barra en la parte superior
  width: 100%; // hace que la barra ocupe toda la pantalla de ancho
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 70%; // reduce el ancho del chat
  padding: 20px;
  box-sizing: border-box;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  height: 80%;
`;

export const MessageItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  width: fit-content;
  max-width: 80%;
`;

export const MessageForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;