// ChatHeader.jsx
import React from 'react';
import styled from 'styled-components';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

const ChatHeader = ({ selectedChat }) => {
  return (
    <HeaderContainer>
      {selectedChat && (
        <UserProfile>
          <img src={selectedChat.image} alt="User" />
          <UserInfo>
            <UserName>{selectedChat.name}</UserName>
            <UserDetails>
              <DetailLabel>Country:</DetailLabel>
              <DetailValue>{selectedChat.country}</DetailValue>
            </UserDetails>
            <UserDetails>
              <DetailLabel>Language:</DetailLabel>
              <DetailValue>{selectedChat.language}</DetailValue>
            </UserDetails>
          </UserInfo>
        </UserProfile>
      )}
      <ChatActions>
        <button><AiOutlinePhone /></button>
        <button><AiOutlineMail /></button>
      </ChatActions>
    </HeaderContainer>
  );
};

export default ChatHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(186, 50, 125, 0.05);  // Color de fondo con 5% de opacidad
  border-bottom: 1px solid #ddd;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 1.2em;
  margin-right: 20px;  // Espacio entre el nombre y los detalles
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;  // Espacio entre los detalles
`;

const DetailLabel = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.9em;
`;

const DetailValue = styled.p`
  margin: 0;
  color: #333; // Color más oscuro para los valores
  font-size: 0.9em;
`;

const ChatActions = styled.div`
  button {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    font-size: 1.2em;
  }
`;
