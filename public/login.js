function login() {
    const nameEl = document.querySelector("#name");
    const username = nameEl.value; // Get the username value
  
    if (!username) {
        const errorMessage = document.querySelector("#error-message");
        errorMessage.style.display = "block"; // Show the error message
        return;
    }
  
    localStorage.setItem("userName", username);
  
    // Post to backend
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }), // Pass the username in the request body
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "chat.html";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  