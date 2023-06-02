function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    //post to backend
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
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

