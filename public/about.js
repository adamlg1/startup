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