//ChatAppScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { Sidebar } from "../components/Sidebar";
import Messages from "../pages/Chat/Messages";
import ChatHeader from "../pages/Chat/ChatHeader"; // Cambiado para usar la exportación por defecto
import MessageInput from "../components/MessageInput";
import ChatList from "../pages/Chat/ChatList";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get('token');

//const encodedToken = encodeURIComponent(token);
// Ver si la logica de encodearlo es desde el servidor o desde el cliente

const socket = io("http://localhost:3002", {
  auth: {
    token: token
  }
});

export function ChatAppScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      console.log("Message desde front: ", message);
      socket.emit("message", { text: message, isSent: true, time: new Date().toLocaleTimeString() });
      setMessages((state) => [...state, { text: message, isSent: true, time: new Date().toLocaleTimeString() }]);
      setMessage("");
    }
  };

  const receiveMessage = useCallback((message) => {
    setMessages((state) => [...state, { ...message, isSent: false }]);
  }, []);

  useEffect(() => {
    console.log(socket)
    if (socket) {
      socket.on("message", receiveMessage);
    }

    return () => {
      if (socket) {
        socket.off("message", receiveMessage);
      }
    };
  }, [receiveMessage]);

  return (
    <PageContainer>
      <Sidebar />
      <MainContainer>
        <ChatHeader />
        <ChatContainer>
          <Messages messages={messages} />
          <MessageInput message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
        </ChatContainer>
      </MainContainer>
      <ChatListContainer>
        <ChatList />
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
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ChatListContainer = styled.div`
  width: 320px; /* Ancho de la barra lateral */
  border-left: 1px solid #ddd;
  background: #f0f0f0; /* Color de fondo de la barra lateral */
  overflow-y: auto;
`;
