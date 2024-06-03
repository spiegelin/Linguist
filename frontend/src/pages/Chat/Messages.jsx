//Messages
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProfileContext } from '../ProfileContext'; // Importa el contexto correcto

const Messages = React.memo(({ messages, isTyping }) => {
  const { profileImage } = useContext(ProfileContext); // Obtener la foto de perfil del contexto

  return (
    <MessagesContainer>
      {messages.map((msg, index) => (
        <MessageContainer key={index} isSent={msg.isSent}>
          {msg.isSent ? (
            <>
              <MessageContentContainer isSent={msg.isSent}>
                <MessageContent isSent={msg.isSent}>
                  {msg.text}
                </MessageContent>
              </MessageContentContainer>
              <ProfileImage src={profileImage} alt="Profile" /> {/* Agrega la imagen de perfil a la derecha para mensajes enviados */}
            </>
          ) : (
            <>
              <ProfileImage src={msg.user.profileImage || profileImage} alt="Profile" /> {/* Agrega la imagen de perfil a la izquierda para mensajes recibidos */}
              <MessageContentContainer isSent={msg.isSent}>
                <MessageContent isSent={msg.isSent}>
                  {msg.text}
                </MessageContent>
              </MessageContentContainer>
            </>
          )}
          <Timestamp isSent={msg.isSent}>{msg.time}</Timestamp>
        </MessageContainer>
      ))}
      {isTyping && (
        <TypingBubble>
          <ProfileImage src={profileImage} alt="Profile" />
          <TypingIndicator>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingIndicator>
        </TypingBubble>
      )}
    </MessagesContainer>
  );
});

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessageContent = styled.div`
  background: ${props => (props.isSent ? '#e0e0e0' : '#BA327D')};
  color: ${props => (props.isSent ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 15px;
  max-width: 70vw; /* Ajuste al ancho máximo de la ventana */
  word-wrap: break-word;
  max-height: 200px; /* Altura máxima */
  overflow-y: auto;
  position: relative;
  margin-right: 10px;
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

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  margin: 0 3px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

export default Messages;