//ChatList
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Cookies from "universal-cookie";
import logo from "./logo.png"; // Importación del logo

const cookies = new Cookies();
const token = cookies.get('token');

const ChatList = ({ onSelectChat }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/chats/chatsExceptUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat.id);
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
            isSelected={selectedChat === chat.id}
          >
            <img
              src={chat.image}
              alt="User"
              onError={(e) => e.target.src = logo} // Manejador de error de imagen
            />
            <ChatDetails isSelected={selectedChat === chat.id}>
              <UserInfo>
                <UserName>{chat.first_name + " " + chat.last_name}</UserName>
                <UserStatus active={chat.active} />
              </UserInfo>
              <UserLanguage isSelected={selectedChat === chat.id}>{chat.language}</UserLanguage>
              <p>{chat.message}</p>
            </ChatDetails>
            <ChatTime>{chat.time}</ChatTime>
          </ChatItem>
        ))}
      </Chats>
      <Logo src={logo} alt="Logo" /> {/* Logo en la esquina inferior derecha */}
    </ChatListContainer>
  );
};

export default ChatList;

const ChatListContainer = styled.div`
  width: 320px;
  border-left: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  position: relative; /* Añadido para posicionar el logo */
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

const Logo = styled.img`
  position: absolute;
  bottom: -613px;
  right: -16px;
  width: 120px;
  height: auto;
`;
