//MessageInput.jsx
import React from 'react';
import styled from 'styled-components';

const MessageInput = ({ message, setMessage, handleSubmit }) => {
  return (
    <InputContainer onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something"
      />
      <button type="submit">Send</button>
    </InputContainer>
  );
};

export default MessageInput;

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;

  input {
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #0056b3;
    }
  }
`;
