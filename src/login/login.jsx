import React from 'react';

export function Login() {
  return (
<main className="bg-light text-info text-center">
      <div>
        <h1>Welcome</h1>
        <p id="intro">Let's talk about gluten</p>
          <form id = "loginControls" style={{ display: 'none'}}>
              <div className="form-group">
                <label for="userName">Email address</label>
                <input className = "form-control" type="text" id="userName" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label for="userPassword">Password</label>
                <input type="password" className="form-control" id="userPassword" placeholder="Password" />
              </div>
                <p></p>
              <button type="button" className="btn btn-primary" onclick="loginUser()">Login</button>
              <button type="button" className="btn btn-primary" onclick="createUser()">Create</button>
          </form>
              <div id="chatControls" style={{ display: 'none' }}>
                <div id="userName"></div>
                <button type="button" className="btn btn-primary" onclick="chat()">Chat</button>
                <button type="button" className="btn btn-secondary" onclick="logout()">Logout</button>
              </div>
      </div>
        <div className="modal fade" id="msgModal" tabindex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-dark">
              <div className="modal-body">error message here</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}