// OpenAIChatModal.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoSend } from 'react-icons/io5';
import { AiOutlineSmallDash } from 'react-icons/ai';

const appPort = import.meta.env.VITE_APP_PORT;
const baseApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = `${baseApiUrl}:${appPort}/api`;

const OpenAIChatModal = ({ isOpen, onClose, conversationContext = [], userId }) => {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([...conversationContext]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const modalRect = modalRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - modalRect.width;
      const maxY = window.innerHeight - modalRect.height;

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      modalRef.current.style.left = `${boundedX}px`;
      modalRef.current.style.top = `${boundedY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResize = (e, direction) => {
    e.preventDefault();

    const rect = modalRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let newWidth = rect.width;
    let newHeight = rect.height;
    let newX = rect.left;
    let newY = rect.top;

    if (direction === 'se') {
      newWidth = mouseX - rect.left;
      newHeight = mouseY - rect.top;
    } else if (direction === 'sw') {
      newWidth = rect.right - mouseX;
      newHeight = mouseY - rect.top;
      newX = mouseX;
    } else if (direction === 'ne') {
      newWidth = mouseX - rect.left;
      newHeight = rect.bottom - mouseY;
      newY = mouseY;
    } else if (direction === 'nw') {
      newWidth = rect.right - mouseX;
      newHeight = rect.bottom - mouseY;
      newX = mouseX;
      newY = mouseY;
    }

    modalRef.current.style.width = `${newWidth}px`;
    modalRef.current.style.height = `${newHeight}px`;
    modalRef.current.style.left = `${newX}px`;
    modalRef.current.style.top = `${newY}px`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, isSent: true };
      setChatMessages([...chatMessages, userMessage]);

      try {
        const response = await axios.post(`${apiUrl}/llm/ask-openai`, {
          message: input,
          conversationContext,
        }, {
          withCredentials: true
        });


        const aiMessage = { text: response.data.response, isSent: false };
        setChatMessages([...chatMessages, userMessage, aiMessage]);
        setInput('');
      } catch (error) {
        console.error('Error communicating with OpenAI:', error);
      }
    }
  };

  return (
    <ModalOverlay style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalContent
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        <DragHandle onMouseDown={handleMouseDown}>
          <AiOutlineSmallDash />
        </DragHandle>
        <ResizeHandleSE onMouseDown={(e) => handleResize(e, 'se')} />
        <ResizeHandleSW onMouseDown={(e) => handleResize(e, 'sw')} />
        <ResizeHandleNE onMouseDown={(e) => handleResize(e, 'ne')} />
        <ResizeHandleNW onMouseDown={(e) => handleResize(e, 'nw')} />
        <ChatContainer>
          {chatMessages.map((msg, index) => (
            <ChatMessage key={index} isSent={msg.isSent}>
              {msg.text}
            </ChatMessage>
          ))}
        </ChatContainer>
        <InputContainer onSubmit={handleSend}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something"
          />
          <SendButton type="submit">
            <IoSend />
          </SendButton>
        </InputContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default OpenAIChatModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.2); /* Cambiar el valor de 0.9 para ajustar la opacidad */
  border-radius: 15px;
  padding: 20px;
  width: 400px;
  height: 400px; /* Altura fija */
  overflow: hidden;
  cursor: pointer;
  user-select: none;
`;


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const DragHandle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
`;

const ResizeHandleSE = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: se-resize;
`;

const ResizeHandleSW = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  cursor: sw-resize;
`;

const ResizeHandleNE = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: ne-resize;
`;


const ResizeHandleNW = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  cursor: nw-resize;
`;

const ChatContainer = styled.div`
  position: relative;
  height: calc(100% - 60px); /* Height excluding input */
  overflow-y: auto;
  margin-bottom: 10px;
`;

const ChatMessage = styled.div`
  background: ${props => (props.isSent ? '#e0e0e0' : '#BA327D')};
  color: ${props => (props.isSent ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 5px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #2F5B20;
  cursor: pointer;
  font-size: 1.5em;
  margin: 5px;
`;

