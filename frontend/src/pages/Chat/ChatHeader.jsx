//ChatHeader.jsx
import React from 'react';
import styled from 'styled-components';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

const ChatHeader = () => {
  return (
    <HeaderContainer>
      <UserProfile>
        <img src="https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/321236782_1336144920477645_1360752776053520884_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pslfT2deIN4Q7kNvgFxANPC&_nc_ht=scontent-qro1-1.xx&oh=00_AYBtVzrdfA-4YtuTq_KTC6S4NAw3pxA6ddLRJav4lBkB9A&oe=66532B5E" alt="User" />
        <div>
          <h2>Santos Arellano</h2>
          <p>United States</p>
        </div>
      </UserProfile>
      
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
  background: #fff;
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

  h2 {
    margin: 0;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    color: #777;
  }
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

