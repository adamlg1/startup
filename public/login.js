(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelector('#userName').textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('chatControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('chatControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'chat.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function chat() {
  window.location.href = 'chat.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  let scores = [];
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}


/** 
const nameEl = document.querySelector("#userName");
nameEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    login();
  }
});

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
  

*/