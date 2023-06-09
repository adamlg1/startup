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

//CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email))  {
    res.status(409).send({msg: 'Existing user'});
  }  else {
    const user = await DB.createUser(req.body.email, req.body.password);

    //set cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
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

// Login Placeholder. Interacts with frontend, displays error if left blank
apiRouter.post('/login', (req, res) => {
  const { username } = req.body;

  // Check if they typed a username
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }

  const user = {
    id: 1,
    username: 'placeholder',
  };

  res.json({ user });
});


// Return application's default page if path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});