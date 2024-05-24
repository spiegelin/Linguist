//Messages.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';


const Messages = ({ messages, isTyping }) => {
  return (
    <MessagesContainer>
      {messages.map((msg, index) => (
        <MessageContainer key={index} isSent={msg.isSent}>
          {!msg.isSent && msg.user && <ProfileImage src={msg.user.profileImage} alt="Profile" />}
          <Message isSent={msg.isSent}>
            <MessageContent isSent={msg.isSent}>
              {msg.text}
            </MessageContent>
            <Timestamp isSent={msg.isSent}>{msg.time}</Timestamp>
          </Message>
          {msg.isSent && msg.user && <ProfileImage src={msg.user.profileImage} alt="Profile" />}
        </MessageContainer>
      ))}
      {isTyping && (
        <TypingBubble>
          <ProfileImage src="URL_DE_LA_IMAGEN_DEL_OTRO_USUARIO" alt="Profile" />
          <TypingIndicator>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingIndicator>
        </TypingBubble>
      )}
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto; /* Aplicar desplazamiento vertical */
  display: flex;
  flex-direction: column;
`;


const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
`;

const MessageContent = styled.div`
  background: ${props => (props.isSent ? '#e0e0e0' : '#BA327D')};
  color: ${props => (props.isSent ? '#000' : '#fff')};
  padding: 10px;
  border-radius: ${props => (props.isSent ? '15px 15px 0 15px' : '15px 15px 15px 0')}; /* Ajustar pico */
  max-width: 80%; /* Ancho máximo del mensaje */
  word-wrap: break-word; /* Ajuste automático del texto */
  max-height: 200px; /* Altura máxima */
  overflow-y: auto; /* Habilitar el desplazamiento vertical si es necesario */
  position: relative; /* Añadir posición relativa */
  margin-right: 10px; /* Margen derecho para separar del avatar */
`;


const Timestamp = styled.span`
  font-size: 0.8em;
  color: #777;
  margin-top: 5px;
`;

const TypingBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const TypingIndicator = styled.div`
  background: #BA327D;
  color: #fff;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 60%;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  margin: 0 3px;
  animation: ${bounce} 1.4s infinite both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;
