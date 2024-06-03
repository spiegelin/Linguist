// ChatAppScreen.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { Sidebar } from "../components/Sidebar";
import Messages from "../pages/Chat/Messages";
import ChatHeader from "../pages/Chat/ChatHeader";
import MessageInput from "../components/MessageInput";
import ChatList from "../pages/Chat/ChatList";
import Cookies from "universal-cookie";
const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}`;

const cookies = new Cookies();
const token = cookies.get('token');

const socket = io(`${apiUrl}`, {
  auth: {
    token: token
  }
});

export function ChatAppScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const userProfileImage = "https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/321236782_1336144920477645_1360752776053520884_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pslfT2deIN4Q7kNvgFxANPC&_nc_ht=scontent-qro1-1.xx&oh=00_AYBtVzrdfA-4YtuTq_KTC6S4NAw3pxA6ddLRJav4lBkB9A&oe=66532B5E";
  const [room, setRoom] = useState("");
  const [partnerId, setPartnerId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedChat) {
      alert("Por favor selecciona una conversación antes de enviar un mensaje.");
      return;
    }
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        isSent: true,
        time: new Date().toLocaleTimeString(),
        user: {
          profileImage: userProfileImage
        }
      };
      console.log("Mensaje enviado: ", newMessage);
      socket.emit("message", { room, message: newMessage, partnerId });
      setMessages((prevMessages) => ({
        ...prevMessages,
        [room]: [...(prevMessages[room] || []), newMessage]
      }));
      setMessage("");
    }
  };

  const receiveMessage = (message) => {
    console.log("Mensaje recibido en room", room + ":", message);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [room]: [...(prevMessages[room] || []), { ...message, isSent: false }]
    }));
  };

  useEffect(() => {
    console.log("Messages updated: ", messages);
  }, [messages]);

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  //El primer useEffect se encarga de actualizar el partnerId cuando se selecciona un chat
  useEffect(() => {
    if (selectedChat) {
      setPartnerId(selectedChat.id);
    }
  }, [selectedChat]);

  //El segundo useEffect se encarga de conectarse a la sala de chat cuando se selecciona un chat
  useEffect(() => {
    if (partnerId) {
      console.log("Useffect de conexion a room");
      if (socket) {
        socket.emit("joinConversation", { partnerId: partnerId }, (response) => {
          if (response.room) {
            console.log("Room: ", response.room);
            setRoom(response.room);
            
            socket.emit("getHistory", { room_name: response.room }, (messages) => {
              setMessages((prevMessages) => ({
                ...prevMessages,
                [response.room]: messages
              }));
            });
            
          }
        });
      }
    }
  }, [partnerId]);

  //El tercer useEffect se encarga de escuchar los mensajes y el typing en la sala de chat
  useEffect(() => {
    if (selectedChat) {
      console.log("Useffect");
      if (socket) {
        socket.on("message", receiveMessage);
        socket.on("typing", handleTyping);
      }

      return () => {
        if (socket) {
          socket.off("message", receiveMessage);
          socket.off("typing", handleTyping);
        }
      };
    }
  }, [room]); //Solo se ejecuta cuando el 2ndo useEffect se ejecuta y se selecciona un room, para que la funcion de receiveMessage tenga el contexto del cuarto

  return (
    <PageContainer>
      <Sidebar />
      <MainContainer>
        {selectedChat ? (
          <>
            <ChatHeader selectedChat={selectedChat} />
            <ChatContainer>
              <Messages messages={messages[room] || []} isTyping={isTyping} />
            </ChatContainer>
            <MessageInputContainer>
              <MessageInput
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
              />
            </MessageInputContainer>
          </>
        ) : (
          <EmptyStateContainer>
            <EmptyStateMessage>Por favor selecciona una conversación.</EmptyStateMessage>
          </EmptyStateContainer>
        )}
      </MainContainer>
      <ChatListContainer>
        <ChatList onSelectChat={setSelectedChat} />
      </ChatListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #f9f9f9;
  position: relative;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const ChatListContainer = styled.div`
  width: 320px;
  border-left: 1px solid #ddd;
  background: #f0f0f0;
  overflow-y: auto;
`;

const MessageInputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const EmptyStateContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 20px;
`;

const EmptyStateMessage = styled.div`
  font-size: 1.5em;
  color: #777;
`;
