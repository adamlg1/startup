// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  //appendMsg('system', 'websocket', 'connected');
  //sends active users to socket
socket.send(JSON.stringify({"userName": userName, 'type': 'person'}));
};






//fake database
let storeMessages;
if (JSON.parse(localStorage.getItem("messages")) === null) {
    storeMessages  = [];
}
else {
    storeMessages = JSON.parse(localStorage.getItem("messages"));
    console.log(storeMessages);
}
//Gets Username
const userNameTitleThingy = document.querySelector(".user-title");
userNameTitleThingy.innerText = localStorage.getItem("userName");
const userName = localStorage.getItem("userName");


//Makes the purple chat bubbles :)
function purpleChatBubbleGenerator(user, text) 
{

    //create elements
    const messageObj = 
    {
        user: user,
        text: text,
        time: retrieveTheTime()
    };
    console.log("attempting to send websocket");
    sendMessage(messageObj);
  // Send the message to the backend
  fetch("/api/message", {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // show response from backend
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    const message2 = document.createElement("div");
    message2.className = "message2";
    const paragraph = document.createElement("p");
    paragraph.innerText = user + ": " + text;
    const timeVar = document.createElement('span');
    timeVar.innerText = "Sent at " + retrieveTheTime();

    //adds into the DOM lets gooooo
    const messageHolder = document.getElementById("messages");

    //puts them into elements in the DOM so they show up thanks Jim-E
    message2.appendChild(paragraph);
    message2.appendChild(timeVar);
    messageHolder.appendChild(message2);

    //push them onto the object
    storeMessages.push(messageObj);

    //save them in local storage
    localStorage.setItem("messages", JSON.stringify(storeMessages));
}

//Makes Green Chat Bubbles
function greenChatBubbleGenerator(user, text)
{
  
    //create elements
    const messageObj = 
    {
        user: user,
        text: text,
        time: retrieveTheTime()
    };
    
    // Send the message to the backend
    fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the backend
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const message1 = document.createElement("div");
    message1.className = "message1";
    const paragraph = document.createElement("p");
    paragraph.innerText = user + ": " + text;
    const timeVar = document.createElement('span');
    timeVar.innerText = "Sent at " + retrieveTheTime();
    const division = document.createElement('div');
    division.className = "anotherSpacerWooo";

    //adds into the DOM lets gooooo
    const messageHolder = document.getElementById("messages");

    //puts them into elements in the DOM so they show up thanks Jim-E
    message1.appendChild(paragraph);
    message1.appendChild(timeVar);
    messageHolder.appendChild(message1);
    messageHolder.appendChild(division);

    //push them onto the object
    storeMessages.push(messageObj);

    //save them in local storage
    localStorage.setItem("messages", JSON.stringify(storeMessages));

  
}

//Gets the text
function retrieveTheStupidText() 
{
    const inputText = document.getElementById("typed-message");
    const retrievedText = inputText.value;
    inputText.value = '';
    return retrievedText;
}

//Gets Time
function retrieveTheTime()
{
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// function makeFakeMessage() 
// {
//     //Fake Responses lol
//     setTimeout(function() {
//         greenChatBubbleGenerator("Jim-E", "I like to party");
//     }, 7000);
// }

//Makes Button work
const sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", function ()
{
    return purpleChatBubbleGenerator(localStorage.getItem("userName"), retrieveTheStupidText());
});


//retrieve messages
fetch('/api/messages')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((message) => {
      if (message.user === userName) {
        purpleOld(message.user, message.text, message.time);
      } else {
        greenOld(message.user, message.text, message.time);
      }
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });


function purpleOld(user, text, time) 
{
    const message2 = document.createElement("div");
    message2.className = "message2";
    const paragraph = document.createElement("p");
    paragraph.innerText = user + ": " + text;
    const timeVar = document.createElement('span');
    timeVar.innerText = "Sent at " + time;

    //adds into the DOM lets gooooo
    const messageHolder = document.getElementById("messages");

    //puts them into elements in the DOM so they show up thanks Jim-E
    message2.appendChild(paragraph);
    message2.appendChild(timeVar);
    messageHolder.appendChild(message2);
}

function greenOld(user, text, time)
{
    const message1 = document.createElement("div");
    message1.className = "message1";
    const paragraph = document.createElement("p");
    paragraph.innerText = user + ": " + text;
    const timeVar = document.createElement('span');
    timeVar.innerText = "Sent at " + time;
    const division = document.createElement('div');
    division.className = "anotherSpacerWooo";

    //adds into the DOM lets gooooo
    const messageHolder = document.getElementById("messages");

    //puts them into elements in the DOM so they show up thanks Jim-E
    message1.appendChild(paragraph);
    message1.appendChild(timeVar);
    messageHolder.appendChild(message1);
    messageHolder.appendChild(division);
}

//receives websocket message
socket.onmessage = async (event) => {

  const text = await event.data.text();

  const chat = JSON.parse(text);

  if (chat.type === "person") {
    generatePerson(chat.userName);
  } else {
  greenChatBubbleGenerator(chat.user, chat.text);
  }

};

//generate live person
function generatePerson(userName) {
  const chatText = document.querySelector('#active-status');
    chatText.innerHTML =
      `<div class="event"><span class="user-name">${userName}</span> has joined the chat</div>` + chatText.innerHTML;
}

//send websocket message
function sendMessage(msgObject) {
  const msgEl = document.querySelector('#typed-message');
  const msg = msgEl.value;
  socket.send(JSON.stringify(msgObject));
}

/** 
  //generates the previous messages
  function generatePreviousMessages() 
  {
    let messages = JSON.parse(localStorage.getItem("messages"));
    for (i of messages)
    {
     if (i.user === userName)
     {
        purpleOld(i.user, i.text, i.time);
     } 
     
     else 
     {
        greenOld(i.user, i.text, i.time);
     }
    }

}

generatePreviousMessages();
*/
