//ChatList
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const ChatList = ({ onSelectChat }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      name: 'Paul Van Lopez',
      active: true,
      language: 'French',
      message: 'Frère, viendra le jour où tu ne danseras plus',
      time: '11:23 pm',
      image: 'https://www.codigonuevo.com/binrepository/775x500/138c0/500d500/none/2283274/WRIS/stromae-music-codigo--930x600_CN137263_MG11268424.jpg',
      country: 'Belgica',
    },
    {
      name: 'Mitski',
      active: false,
      language: 'Japanese',
      message: '「心からやれば、できるよ」',
      time: '03:23 pm',
      image: 'https://hips.hearstapps.com/hmg-prod/images/mitski-byebruyildiz-heat-lightning-index-1643991665.jpg?crop=0.502xw:1.00xh;0.348xw,0&resize=1200:*',
      country: 'Japan',
    },
    {
      name: 'Prince Rogers chantilly',
      active: true,
      language: 'English',
      message: 'Man, live boldly and let your spirit guide you. The world is yours to shape.',
      time: '11:23 am',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Prince.jpg/220px-Prince.jpg',
      country: 'United States',
    },
  ];

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat.name);
    onSelectChat(chat);
  };

  return (
    <ChatListContainer>
      <SearchContainer>
        <input type="text" placeholder="Search messages" />
        <SearchIcon />
      </SearchContainer>
      <Chats>
        {chats.map((chat, index) => (
          <ChatItem
            key={index}
            onClick={() => handleChatItemClick(chat)}
            isSelected={selectedChat === chat.name}
          >
            <img src={chat.image} alt="User" />
            <ChatDetails isSelected={selectedChat === chat.name}>
              <UserInfo>
                <UserName>{chat.name}</UserName>
                <UserStatus active={chat.active} />
              </UserInfo>
              <UserLanguage isSelected={selectedChat === chat.name}>{chat.language}</UserLanguage>
              <p>{chat.message}</p>
            </ChatDetails>
            <ChatTime>{chat.time}</ChatTime>
          </ChatItem>
        ))}
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
  display: flex;
  align-items: center;

  input {
    flex-grow: 1;
    padding: 8px;
    border: none;
    border-radius: 4px;
  }
`;

const SearchIcon = styled(FaSearch)`
  margin-left: 10px;
  color: #777;
  cursor: pointer;
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
  background: ${({ isSelected }) => (isSelected ? '#970E59' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  border-bottom: 1px solid #ddd;
  ${({ isSelected }) => (isSelected ? 'border-radius: 15px;' : '')}

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#970E59' : '#e0e0e0')};
  }

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const ChatDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#666')};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const UserStatus = styled.span`
  width: 8px;
  height: 8px;
  background: ${({ active }) => (active ? '#46dc6b' : '#ccc')};
  border-radius: 50%;
  margin-left: 8px;
`;

const UserLanguage = styled.span`
  font-size: 0.9em;
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#666')};
`;

const ChatTime = styled.div`
  font-size: 0.8em;
  color: #777;
`;
