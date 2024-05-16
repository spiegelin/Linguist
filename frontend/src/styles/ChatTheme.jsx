import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal}; // Ajuste del fondo del contenedor principal del chat 
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; // Ajusta la altura del ChatContainer al 100% del contenedor principal
  width: 100%; // reduce el ancho del chat
  padding: 20px;
  box-sizing: border-box;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1; // Modificación: permite que MessageList ocupe todo el espacio disponible
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
  flex-shrink: 0; // Modificación: evita que MessageForm se contraiga para que no haya espacio en blanco adicional
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
