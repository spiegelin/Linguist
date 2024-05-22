//ChatList.jsx
import React from 'react';
import styled from 'styled-components';

const ChatList = () => {
  return (
    <ChatListContainer>
      <SearchContainer>
        <input type="text" placeholder="Search messages" />
      </SearchContainer>
      <Chats>
        {/* Aquí puedes mapear la lista de chats */}
        <ChatItem>
          <img src="https://www.codigonuevo.com/binrepository/775x500/138c0/500d500/none/2283274/WRIS/stromae-music-codigo--930x600_CN137263_MG11268424.jpg" alt="User" />
          <ChatDetails>
            <UserInfo>
              <UserName> Paul Van Lopez</UserName>
              <UserStatus active={true} />
            </UserInfo>
            <UserLanguage>French</UserLanguage>
            <p>Frère, viendra le jour où tu ne danseras plus seul</p>
          </ChatDetails>
          <ChatTime>11:23 am</ChatTime>
        </ChatItem>
        {/* Más ChatItems aquí */}
        <ChatItem>
          <img src="https://hips.hearstapps.com/hmg-prod/images/mitski-byebruyildiz-heat-lightning-index-1643991665.jpg?crop=0.502xw:1.00xh;0.348xw,0&resize=1200:*" alt="User" />
          <ChatDetails>
            <UserInfo>
              <UserName>Mitski</UserName>
              <UserStatus active={false} />
            </UserInfo>
            <UserLanguage>Japanese</UserLanguage>
            <p>「心からやれば、できるよ」</p>
          </ChatDetails>
          <ChatTime>11:23 am</ChatTime>
        </ChatItem>
      </Chats>
    </ChatListContainer>
  );
};

export default ChatList;

const ChatListContainer = styled.div`
  width: 320px;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  padding: 10px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;

  input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 4px;
  }
`;

const Chats = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 1em;
`;

const UserStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#ccc')};
  margin-left: 5px;
`;

const UserLanguage = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.8em;
`;

const ChatTime = styled.div`
  color: #777;
  font-size: 0.8em;
  margin-left: auto;
`;

const ChatDetails = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;
