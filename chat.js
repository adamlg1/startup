const userNameTitleThingy = document.querySelector(".user-title");
userNameTitleThingy.innerText = localStorage.getItem("userName");
/** 
function getUserName() {
    return localStorage.getItem('userName') ?? 'Current User';
}
*/



 
/** 
setInterval(() => {
    const chatText = document.querySelector('#active-status');
    chatText.innerHTML =
      `<div class="event"><span class="user-name">Joe</span> is active</div>` + chatText.innerHTML;
  }, 10000);


  let chat = 'Tim:';
setInterval(() => {
  chat = `${chat} Response lol sent at 11:55`;
  document.querySelector('#messages').textContent = chat;
}, 5000);
*/


