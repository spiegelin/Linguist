//ChatList
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Cookies from "universal-cookie";
import logo from "./logo.ico"; // Importación del logo
import { IoFilter } from "react-icons/io5";


const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

const cookies = new Cookies();
const token = cookies.get('token');

const ChatList = ({ onSelectChat, onSelectFilter}) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversationLanguage, setConversationLanguage] = useState(null)
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [showOptions, setShowOptions] = useState(false); // Estado para mostrar u ocultar las opciones de filtro

  // Estados para los lenguajes del usuario (para el filtro)
  const [firstLanguage, setFirstLanguage] = useState("");
  const [secondLanguage, setSecondLanguage] = useState("");
  const [thirdLanguage, setThirdLanguage] = useState("");

  // Estados para los usuarios con el mismo lenguaje
  const [firstLanguageUserId, setFirstLanguageUserId] = useState("");
  const [secondLanguageUserId, setSecondLanguageUserId] = useState("");
  const [thirdLanguageUserId, setThirdLanguageUserId] = useState("");

  // Obtener usuarios con mismo lenguaje
  useEffect(() => {
    axios.get(`${apiUrl}/chats/chats-with-same-language`, {
      withCredentials: true,
    })
      .then((response) => {
        // Mapeamos los datos para obtener solo los IDs de usuarios según el idioma que comparten
        const userIds1 = response.data[1] ? response.data[1].map(user => user.id) : [];
        const userIds2 = response.data[2] ? response.data[2].map(user => user.id) : [];
        const userIds3 = response.data[3] ? response.data[3].map(user => user.id) : [];
        setFirstLanguageUserId(userIds1);
        setSecondLanguageUserId(userIds2);
        setThirdLanguageUserId(userIds3);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [apiUrl]);

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chats/chatsExceptUser`,
          {
            withCredentials:true
          });
        
        setChats(response.data);
        setFilteredChats(response.data); // Inicialmente, establece los chats filtrados como todos los chats
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  // Obtener lenguajes del usuario
  useEffect(() => {
    axios.get(`${apiUrl}/users/profile-info`, {
      withCredentials: true,
    })
      .then((response) => {
        setFirstLanguage(response.data.language1);
        setSecondLanguage(response.data.language2);
        setThirdLanguage(response.data.language3);
      })
      .catch((error) => {
        console.log(error);
      });
    }, [apiUrl]);


  // Función para filtrar los chats por lenguaje
  const handleFilterByLanguage = (language, userIds) => {
    if (language === "all") {
      setFilteredChats(chats); // Si se selecciona "todos", muestra todos los chats
      setConversationLanguage("All")
      onSelectFilter("All")
    } else {
      const filtered = chats.filter(chat => userIds.includes(chat.id));
      setFilteredChats(filtered);
    }
    setShowOptions(false); // Oculta las opciones de filtro después de seleccionar una opción
  };

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
      <FilterContainer>
        <IoFilter onClick={() => setShowOptions(!showOptions)} /> {/* Agrega el icono de filtro y toggle las opciones de filtro */}
        {showOptions && ( // Muestra las opciones de filtro si showOptions es true
          <FilterOptions>
            <p onClick={() => handleFilterByLanguage("all")}>All</p>
            <p onClick={() => {handleFilterByLanguage(firstLanguage, firstLanguageUserId)
            setConversationLanguage(firstLanguage)
            onSelectFilter(firstLanguage)}}>{firstLanguage}</p>
            <p onClick={() => {handleFilterByLanguage(secondLanguage, secondLanguageUserId)
            setConversationLanguage(secondLanguage)
            onSelectFilter(secondLanguage)}}>{secondLanguage}</p>
            <p onClick={() => {handleFilterByLanguage(thirdLanguage, thirdLanguageUserId)
            setConversationLanguage(thirdLanguage)
            onSelectFilter(thirdLanguage)}}>{thirdLanguage}</p>
            {/* Agrega más opciones de filtro según sea necesario */}
          </FilterOptions>
        )}
      </FilterContainer>
      <Chats>
        {Array.isArray(filteredChats) && filteredChats.map((chat, index) => (
          <ChatItem
            key={index}
            onClick={() => handleChatItemClick(chat)}
            isSelected={selectedChat === chat.id}
          >
            <img
              src={chat.profile_image ? chat.profile_image : chat.img}
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
  height: 100vh;
  overflow: hidden;
  position: relative;
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
  margin-right: 5px;
  color: #777;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  margin-left: auto;
  padding: 10px;
  cursor: pointer;
  position: relative; // Necesario para posicionar el menú desplegable
`;

const FilterOptions = styled.div`
  position: absolute;
  top: 30px; // Ajusta según sea necesario
  right: 0;
  background-color: rgba(255, 255, 255, 0.9); // Cambiado a un fondo blanco con opacidad
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 5px 0;
  min-width: 120px; // Ajusta según sea necesario
  backdrop-filter: blur(0.5px); // Agrega un efecto de desenfoque al fondo para una apariencia más estética
  p {
    padding: 5px 15px;
    margin: 0;
    cursor: pointer;
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')}; // Cambia el color del texto según la selección
    transition: background-color 0.3s, color 0.3s; // Agrega una transición suave para el cambio de color
    &:hover {
      background-color: ${({ isSelected }) => (isSelected ? '#970E59' : '#e0e0e0')}; // Cambia el color de fondo al pasar el cursor sobre la opción
      color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')}; // Cambia el color del texto al pasar el cursor sobre la opción
    }
  }
`;


const Chats = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
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

const UserInfo =  styled.div`
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
bottom: -10px;
right: -10px;
width: 120px;
height: auto;
`;

