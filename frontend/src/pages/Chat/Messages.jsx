import React, { useContext, useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ProfileContext } from '../ProfileContext';
import { LuInfo } from "react-icons/lu";
import axios from 'axios';

const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

const Messages = React.memo(({ messages, isTyping }) => {
  const { profileImage } = useContext(ProfileContext);
  const [image, setImage] = useState("");
  const [imageOther, setImageOther] = useState("");
  const [popup, setPopup] = useState({ visible: false, text: '', position: { top: 0, left: 0 }, messageId: null });
  const infoButtonRef = useRef(null);

  useEffect(() => {
    axios.get(`${apiUrl}/users/profile-image`, {
      withCredentials: true
    })
      .then(response => {
        const imageBase64 = response.data.imageBase64;
        const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        setImage(imageUrl);
      })
      .catch(error => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

  const handleInfoClick = async (messageId) => {
    try {
      if (messageId === popup.messageId) {
        setPopup({ visible: false, text: '', position: { top: 0, left: 0 }, messageId: null });
        return;
      }

      const response = await axios.post(`${apiUrl}/llm/messageTraduction`, { 
        messageId: messageId
      }, {
        withCredentials: true
      });

      const rect = infoButtonRef.current.getBoundingClientRect();

      setPopup({ 
        visible: true, 
        text: response.data.response, 
        position: { 
          top: rect.top + window.scrollY + rect.height, 
          left: rect.left + window.scrollX
        },
        messageId: messageId
      });
    } catch (error) {
      console.error('Error fetching message translation:', error);
    }
  };

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
              <ProfileImage src={image} alt="Profile" />
            </>
          ) : (
            <>
              <ProfileImage src={`data:image/jpeg;base64,${msg.user.profileImage}`} alt="Profile" />
              <MessageContentContainer isSent={msg.isSent}>
                <MessageContent isSent={msg.isSent}>
                  {msg.text}
                  <InfoIconContainer ref={infoButtonRef} onClick={() => handleInfoClick(msg.message_id)}>
                    <LuInfo />
                  </InfoIconContainer>
                </MessageContent>
              </MessageContentContainer>
            </>
          )}
          <Timestamp isSent={msg.isSent}>{msg.time}</Timestamp>
        </MessageContainer>
      ))}
      {isTyping && (
        <TypingBubble>
          <ProfileImage src={`data:image/jpeg;base64,${msg.user.profileImage}`} alt="Profile" />
          <TypingIndicator>
            <TypingDot />
            <TypingDot />
            <TypingDot />
          </TypingIndicator>
        </TypingBubble>
      )}
      {popup.visible && (
        <Popup style={{ top: popup.position.top, left: popup.position.left }}>
          {popup.text.translatedText}
          <Arrow />
        </Popup>
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

const InfoIconContainer = styled.div`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
  color: #777777;
  cursor: pointer;
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1);
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const Popup = styled.div`
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  max-width: 200px;
  animation: ${fadeIn} 0.2s ease-in-out;
  transform-origin: bottom left;
  &.fade-out {
    animation: ${fadeOut} 0.2s ease-in-out;
  }
`;

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #fff;
  bottom: -10px;
  left: 10px;
`;

export default Messages;

