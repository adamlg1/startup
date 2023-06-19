import React, { useState, useEffect } from 'react';
import './chat.css';

const Chat = () => {
  const [storeMessages, setStoreMessages] = useState(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    return storedMessages === null ? [] : storedMessages;
  });
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [typedMessage, setTypedMessage] = useState('');

  const retrieveTheTime = () => {
    const date = new Date();
  
    const day = String(date.getDate());
    const month = String(date.toLocaleString('default', { month: 'long' }));
    const year = String(date.getFullYear());
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  
    return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${amPm}`;
  };
  

  async function fetchChatMessages() {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const messages = await response.json();
        setStoreMessages(messages);
        localStorage.setItem('messages', JSON.stringify(messages));
      } else {
        console.error('Error fetching chat messages:', response.status);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  }

  async function sendChatMessage(user, message) {
    const requestBody = {
      user: user,
      text: message,
      time: new Date().toLocaleString(),
    };

    try {
      await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Refresh the chat messages after sending the new message
      fetchChatMessages();
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  }

  const handleSendChatMessage = () => {
    sendChatMessage(userName, typedMessage);

    const messageObj = {
      user: userName,
      text: typedMessage,
      time: retrieveTheTime(),
    };

    setStoreMessages((prevMessages) => [...prevMessages, messageObj]);
    localStorage.setItem('messages', JSON.stringify(storeMessages.concat(messageObj)));

    setTypedMessage('');
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  return (
    <main className="bg-light">
      <span className="chat-title">
        <h1>Live Chat</h1>
      </span>

      <div id="messages" className="message-container">
        <span className="message-title">
          <h1>Messages:</h1>
        </span>
        <div className="anotherSpacerWooo" />
        {storeMessages.map((message, index) =>
          message.user === userName ? (
            // purple
            <div className="message2" key={`${message.time}-${index}`}>
              <p>
                {message.user}: {message.text}
              </p>
              <span>Sent at {message.time}</span>
            </div>
          ) : (
            // green
            <div className="message1" key={`${message.time}-${index}`}>
              <p>
                {message.user}: {message.text}
              </p>
              <span>Sent at {message.time}</span>
            </div>
          )
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          id="typed-message"
          name="varText"
          placeholder="type message here"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
        />
        <button id="send" onClick={handleSendChatMessage}>
          send
        </button>
      </div>
    </main>
  );
};

export default Chat;
