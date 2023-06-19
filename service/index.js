const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. Since in production, front-end is statically hosted on the same port.
const port = 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking auth tokens
app.use(cookieParser());

// Serve up front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  // Rest of the code
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  // Rest of the code
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  // Rest of the code
});

// GetUser returns info about user
apiRouter.get('/user/:email', async (req, res) => {
  // Rest of the code
});

// SecureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  // Rest of the code
});

// GetMessages
apiRouter.get('/messages', async (_req, res) => {
  try {
    const messages = await DB.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get messages from the database' });
  }
});


// SubmitMessage
apiRouter.post('/message', async (req, res) => {
  const { user, text, time } = req.body;

  if (!user || !text || !time) {
    res.status(400).json({ message: 'Not a valid message' });
    return;
  }

  const message = {
    user,
    text,
    time
  };

  try {
    await addMessage(message);
    res.status(200).json({ message: 'Message sent to the database' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message to the database' });
  }
});




app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});


//default error handler (not sure if needed)
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});


// Return application's default page if path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//setAuthCookie in HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

//to see what port it is on
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);