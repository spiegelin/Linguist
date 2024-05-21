//ChatAppScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { MainContainer, ChatContainer } from '../styles/ChatTheme'; // Ajustar importaciones
import Messages from "./Chat/Messages"; // Ajustar importación
import MainLayout from '../components/MainLayout';

const socket = io("http://localhost:3002");

export function ChatAppScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message desde front: ", message);
    socket.emit("message", message);
    setMessage("");
  };

  const receiveMessage = useCallback((message) => {
    setMessages((state) => [...state, message]);
  }, []);

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, [receiveMessage]);

  return (
    <MainLayout>
      <MainContainer>
        <ChatContainer>
          <h1>Linguist</h1>
          <Messages 
            messages={messages} 
            message={message} 
            setMessage={setMessage} 
            handleSubmit={handleSubmit} 
          />
        </ChatContainer>
      </MainContainer>
    </MainLayout>
  );
}
