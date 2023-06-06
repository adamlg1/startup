const express = require('express');
const app = express();
const DB = require('./database.js');


// The service port. Since in production, front-end is statically hosted on the same port.
const port = 4000;

//JSON body parsing using built-in middleware
app.use(express.json());

// Serve up front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// In-memory storage for tips
let tips = [];

// Tips
apiRouter.get('/tips', (_req, res) => {
  res.json(tips);
});

// Submit Tip
apiRouter.post('/tips', (req, res) => {
  const { userName, content, timestamp } = req.body;
  if (!userName || !content || !timestamp) {
    return res.status(400).json({ message: 'Not a valid tip' });
  }

  const newTip = {
    userName,
    content,
    timestamp,
  };
  tips.push(newTip);

  res.status(200).json({ message: 'Tip added successfully' });
});

// only pushing them to memory
let messages = [];
// GetMessages
apiRouter.get('/messages', (_req, res) =>  {
  res.send(messages);
});

// SubmitMessage
apiRouter.post('/message', (req, res) => {
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

  messages.push(message);

  res.status(200).json({ message: 'Message sent successfully' });
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