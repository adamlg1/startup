//Gets Username
const userNameTitleThingy = document.querySelector(".user-title");
userNameTitleThingy.innerText = localStorage.getItem("userName");


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

    //Fake Responses lol
    setTimeout(
    greenChatBubbleGenerator("Jim-E", "I like to party"),
    5000);

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
    console.log(retrievedText);
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

//Makes Button work
const sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", function ()
{
    return purpleChatBubbleGenerator(localStorage.getItem("userName"), retrieveTheStupidText());
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

}

//fake database
const storeMessages = [];


