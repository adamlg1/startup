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

    //create elements
    const messageObj = 
    {
        user: user,
        text: text,
        time: retrieveTheTime()
    };

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

function makeFakeMessage() 
{
    //Fake Responses lol
    setTimeout(function() {
        greenChatBubbleGenerator("Jim-E", "I like to party");
    }, 7000);
}

//Makes Button work
const sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", function ()
{
    return purpleChatBubbleGenerator(localStorage.getItem("userName"), retrieveTheStupidText()), makeFakeMessage();
});


//Makes Green Chat Bubbles
function greenChatBubbleGenerator(user, text)
{
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

    //create elements
    const messageObj = 
    {
        user: user,
        text: text,
        time: retrieveTheTime()
    };
    
    //push them onto the object
    storeMessages.push(messageObj);

    //save them in local storage
    localStorage.setItem("messages", JSON.stringify(storeMessages));

}


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

//Generates an active user every 10 seconds. Go Joe Ingles
setInterval(() => {
    const chatText = document.querySelector('#active-status');
    chatText.innerHTML =
      `<div class="event"><span class="user-name">Joe</span> is active</div>` + chatText.innerHTML;
  }, 10000);


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

