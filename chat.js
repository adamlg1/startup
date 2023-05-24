const userNameTitleThingy = document.querySelector(".user-title");
userNameTitleThingy.innerText = localStorage.getItem("userName");

function getUserName() {
    return localStorage.getItem('userName') ?? 'Current User';
}







