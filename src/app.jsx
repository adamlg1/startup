import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Navbar, Nav } from 'react-bootstrap'; // Import Navbar and Nav from react-bootstrap
import { Login } from './login/login';
import { About } from './about/about';
import Chat from './chat/chat'; 
import { AuthState } from './login/authState';


function NotFound() {
    return <main className='bg-light text-info text-center'>404: Return to sender. Address unknown.</main>;
  }


export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  return (
    <BrowserRouter>
    <div className="app">
      <header>
      <Navbar style={{ backgroundColor: '#e3f2fd' }} expand="lg">
  <Navbar.Brand>
    <NavLink to="/" className="navbar-brand">
    <img
      src="websiteLogo2.jpg"
      alt="Logo"
      width="75"
      height="70"
      className="d-inline-block align-text-top"
    />
    </NavLink>
    <span className="title">
    Gluten-Free Chat
    </span>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarText" />

  <Navbar.Collapse id="navbarText">
    <Nav className="me-auto">
      <Nav.Link as={NavLink} exact to="/" activeClassName="active">Home</Nav.Link>
      <Nav.Link as={NavLink} to="/about" activeClassName="active">About</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

      </header>
  


<Routes>
<Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
        <Route path='/chat' element={<Chat />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
     </Routes>
      <footer
        className="text-white text-muted"
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className="container-fluid">
          <span className="text-reset">Adam Griffin</span>
          <a href="https://github.com/adamlg1/startup.git">GitHub</a>
        </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}
