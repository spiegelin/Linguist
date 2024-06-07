// MessageInput.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IoSend } from 'react-icons/io5';
import { AiOutlineAudio } from 'react-icons/ai';
import { SiOpenai } from "react-icons/si";
import { FaRegImages } from "react-icons/fa";
import OpenAIChatModal from '../../components/OpenAIChatModal';

const MessageInput = ({ message, setMessage, handleSubmit, handleImageSubmit, conversationContext, userId }) => {
  const [image, setImage] = useState(null);
  const [isOpenAIChatOpen, setIsOpenAIChatOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        handleImageSubmit(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageIconClick = () => {
    imageInputRef.current.click();
  };

  const handleOpenAIChatClick = () => {
    setIsOpenAIChatOpen(true);
  };

  const handleCloseAIChat = () => {
    setIsOpenAIChatOpen(false);
  };

  return (
    <>
      <InputContainer onSubmit={handleSubmit}>
        <MicrophoneIcon />
        <ImageIconContainer onClick={handleImageIconClick}>
          <ImageInput ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} />
          <ImageIcon />
        </ImageIconContainer>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something"
        />
        <OpenAIButton onClick={handleOpenAIChatClick}>
          <SiOpenai />
        </OpenAIButton>
        <SendButton type="submit">
          <IoSend />
        </SendButton>
      </InputContainer>
      <OpenAIChatModal 
        isOpen={isOpenAIChatOpen} 
        onClose={handleCloseAIChat} 
        conversationContext={conversationContext} 
        userId={userId} 
      />
    </>
  );
};

export default MessageInput;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 5px;
`;

const MicrophoneIcon = styled(AiOutlineAudio)`
  font-size: 1.5em;
  color: #2F5B20;
  margin: 5px;
`;

const ImageIconContainer = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ImageIcon = styled(FaRegImages)`
  font-size: 1.5em;
  color: #2F5B20;
`;

const ImageInput = styled.input`
  display: none;
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

const OpenAIButton = styled.button`
  background: none;
  border: none;
  color: #2F5B20;
  cursor: pointer;
  font-size: 1.5em;
  margin: 5px;
`;
