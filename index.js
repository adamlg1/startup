
const express = require('express');
const app = express();

// The service port. Since in production, front-end is statically hosted on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//JSON body parsing using built-in middleware
app.use(express.json());

// Serve up front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetMessages
apiRouter.get('/messages', (_req, res) =>  {
    res.send(messages);
});

// SubmitMessage
apiRouter.post('/message', (_req, res) =>  {
    messages = updateMessages(req.body, messages);
    res.send(messages);
});

// Tips
apiRouter.get('/tips', (_req, res) => {
    const tips = [];
    res.send(tips);
});


// Return application's default page if path is unknown
app.use((_req, res) => 
{
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

