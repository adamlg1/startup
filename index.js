const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');


const authCookieName = 'token';


// The service port. Since in production, front-end is statically hosted on the same port.
const port = 4000;

//JSON body parsing using built-in middleware
app.use(express.json());

//Use the cookie parser middleware for tracking auth tokens
app.use(cookieParser());

// Serve up front-end static content hosting
app.use(express.static('public'));

//trust headers that are forwarded from the proxy
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//GetUser returns info about user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

//secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetMessages
apiRouter.get('/messages', async (_req, res) =>  {
  const messages = await DB.getMessages();
  res.json(messages);
});

// SubmitMessage
apiRouter.post('/message',async (req, res) => {
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
    await DB.addMessage(message);
    res.status(200).json({ message: 'Message sent to db' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send to db' });
  }
});

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

// Tips
apiRouter.get('/tips', async (_req, res) => {
  const tips = await DB.getTips();
  res.json(tips);
});

// Submit Tip
apiRouter.post('/tips', async (req, res) => {
  const { userName, content, timestamp } = req.body;
  if (!userName || !content || !timestamp) {
    return res.status(400).json({ message: 'Not a valid tip' });
  }

  const newTip = {
    userName,
    content,
    timestamp,
  };
  
  try {
    await DB.addTip(newTip);
    res.status(200).json({ message: 'Tip added' });
  } catch (error) {
    res.status(500).json({ message: 'Failed, pain' });
  }

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
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});