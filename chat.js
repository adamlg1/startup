const userNameTitleThingy = document.querySelector(".user-title");
userNameTitleThingy.innerText = localStorage.getItem("userName");

function getUserName() {
    return localStorage.getItem('userName') ?? 'Current User';
}









setInterval(() => {
    const score = Math.floor(Math.random() * 7000);
    const chatText = document.querySelector('#active-status');
    chatText.innerHTML =
      `<div class="event"><span class="user-name">Joe</span> is active</div>` + chatText.innerHTML;
  }, 10000);



