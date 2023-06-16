import React from 'react';
import './chat.css';


export function Chat() {
  
  return (
<main className="bg-light">
    <span className="chat-title"><h1>Live Chat</h1></span>

    
    <div className="users">
      User:
      <span className="user-title"></span>
      <div></div>
      <span className="active-title"> Others Active:</span>
      <div className="active-status" id="active-status">
      </div>
    </div>

    
    <div id="messages" className="message-container">
      <span className="message-title"><h1>Messages:</h1></span>
      <div className="anotherSpacerWooo">
      </div>
    </div>

  
    <div className="chat-input">
      <input type="text" id="typed-message" name="varText" placeholder="type message here" />
      <button id="send">send</button>
    </div>
  </main>
  );
}