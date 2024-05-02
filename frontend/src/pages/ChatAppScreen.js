import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message desde front: ", message);
    setMessages([...messages, message]);
    socket.emit("message", message);

  }

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () =>{
      socket.off("message", receiveMessage);
    }
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div>
      <h1>Socket.io Chat App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Write your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}


export default App;