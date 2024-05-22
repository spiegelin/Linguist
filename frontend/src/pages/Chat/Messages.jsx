//Messages.jsx
import React from 'react';
import styled from 'styled-components';

const Messages = ({ messages }) => {
  return (
    <MessagesContainer>
      {messages.map((msg, index) => (
        <Message key={index} isSent={msg.isSent}>
          <MessageContent isSent={msg.isSent}>
            {msg.text}
          </MessageContent>
          <Timestamp>{msg.time}</Timestamp>
        </Message>
      ))}
    </MessagesContainer>
  );
};

export default Messages;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  background: ${props => (props.isSent ? '#007bff' : '#e0e0e0')};
  color: ${props => (props.isSent ? '#fff' : '#000')};
  padding: 10px;
  border-radius: 15px;
  max-width: 60%;
`;

const Timestamp = styled.span`
  font-size: 0.8em;
  color: #777;
  margin-top: 5px;
`;
