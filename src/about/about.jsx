import React from 'react';
import { NavLink } from 'react-router-dom';
import './about.css';


export function About() {
  function displayRandomUser() {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        const user = data.results[0];
        const containerEl = document.getElementById('user');
  
        const nameEl = document.createElement('h2');
        nameEl.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
  
        const pictureEl = document.createElement('img');
        pictureEl.src = user.picture.large;
  
        containerEl.appendChild(nameEl);
        containerEl.appendChild(pictureEl);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
  displayRandomUser();
  return (
    <main className="bg-light">
      <div id="picture" className="picture-box">
        <img src="glutenfree.jpg" alt="gluten-free logo" />
      </div>
      <h3>What is Gluten-Free Chat?</h3>
      <p>
        Gluten-Free Chat is a place for family to chat and share tips about gluten-free food. As those with Celiac know, there is no worse feeling than finding out you have just eaten something with gluten. Family is generally unsure, and using Google to try and answer their question usually just confuses them. This application is a simple solution, where everyone can feel better about what is being eaten.
      </p>
      <h3>Site Navigation:</h3>
      <p>
        Go to the home screen to <NavLink to="/">login</NavLink> and you will be able to access the chat section.
      </p>
      <p>(Note: the chat section may only be accessed from the home screen)</p>
      <p>
        You can also click the logo in the top left corner to return to the login page at any time.
      </p>
      <h2>Featured User:</h2>
      <div id="user" className="fakeid"></div>
      <div id="picture2" className="picture-box">
        <img alt="more gluten-free logos" src="https://as2.ftcdn.net/v2/jpg/05/89/24/89/1000_F_589248990_RpBZX2C8j5bOHR5y1WCsYl9sZzyAxNc7.jpg" />
      </div>
    </main>
  );
}
