//MessageInput.jsx
import React from 'react';
import styled from 'styled-components';
import { IoSend } from 'react-icons/io5';
import { AiOutlineAudio } from 'react-icons/ai';
import { SiOpenai } from "react-icons/si";

const MessageInput = ({ message, setMessage, handleSubmit }) => {
  return (
    <InputContainer onSubmit={handleSubmit}>
      <MicrophoneIcon />
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something"
      />
      <OpenAIButton>
        <SiOpenai />
      </OpenAIButton>
      <SendButton type="submit">
        <IoSend />
      </SendButton>
    </InputContainer>
  );
};

export default MessageInput;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 5px; /* Reducir el espacio entre el borde y los elementos internos */
`;

const MicrophoneIcon = styled(AiOutlineAudio)`
  font-size: 1.5em;
  color: #2F5B20; /* Verde */
  margin: 5px; /* Añadir un pequeño margen entre el icono y el borde */
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: none;
  border-radius: 4px;
  margin: 0 5px; /* Espacio entre el micrófono y el campo de entrada */
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #2F5B20; /* Verde */
  cursor: pointer;
  font-size: 1.5em;
  margin: 5px; /* Añadir un pequeño margen entre el campo de entrada y el botón */
`;

const OpenAIButton = styled.button`
  background: none;
  border: none;
  color: #2F5B20; /* Verde */
  cursor: pointer;
  font-size: 1.5em;
  margin: 5px; /* Añadir un pequeño margen entre el campo de entrada y el botón */
`;
