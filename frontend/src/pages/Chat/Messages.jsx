import React from "react";
import { MessageList, MessageItem, MessageForm, MessageInput, SendButton } from "../../styles/ChatTheme";

function Messages({ messages, message, setMessage, handleSubmit }) {
  return (
    <>
      <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index}>{message}</MessageItem>
        ))}
      </MessageList>
      <MessageForm onSubmit={handleSubmit}>
        <MessageInput 
          type="text" 
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton>Send</SendButton>
      </MessageForm>
    </>
  );
}

export default Messages;
