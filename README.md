# Gluten-Free Chat

## Description deliverable - Startup Specification

### Elevator pitch

Have you ever been frustrated by your family’s inability to figure out what is and is not gluten-free, or had well-intentioned relatives feed you food that doesn’t agree with your diet, or arrived at a dinner only to find out you cannot eat anything? The Gluten-Free Chat application helps to solve many of these problems. Family can message to ask questions in a chat setting, add tips of what they have learned cooking, and not have to feel so unsure when cooking for someone on a gluten-free diet. Questions in the chat can be answered in realtime, and all members can benefit from each other’s knowledge by adding tips. In a family with gluten-free members, the Gluten-Free Chat app is a must to eliminate the confusion caused by ineffective google searches, and lack of knowledge surrounding what constitutes as gluten-free.

### Design

![startupSketch](startupSketch.JPG)

### Key features

- Secure login over HTTPS
- Messages from all users displayed in realtime
- Messages are persistently stored in the database
- There is a featured user through a third party fetch.
- When a user joins the chat, it is broadcasted in real time(not featured in react version).

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages. One for login, chat, and an informational about page. Hyperlinks through a consistent header.
- ***Javascript*** - Uses Javascript for buttons and navigation to work.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **DB** - Store users and messages in database.
- **Login** - Register and login users. Credentials securely stored in database. Can't chat without authentication.
- **WebSocket** - Peer to peer communication through chatting with friends through the browser.
- **Service** - Backend service with endpoints for:
- login
- retrieving messages
- submitting messages
- **Websocket** - As messages are sent, they show up in real time. When another user joins the chat, other users are able to see.
- **React** - Implemented app in react.

## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Four HTML pages that represent logging in, a chat page, a tip page, and a page with information about the website.
- **Links** - The login page automatically links to the chat page. Each page has links to the other ones with a consistent header.
- **Text** - Each of the messages and tips is represented by a textual description. There is also a text description of the application on the about page.
- **Images** - There are some images on the about page with gluten-free logos.
- **Login** - Input box and submit button for login.
- **Database** - The old chat messages and old tips represent data pulled from the database.
- **WebSocket** - The chat box and tip box represent the ability to send/submit realtime messages/tips.

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - There is a consistent header and footer throughout each page of the application. The main content body adjusts to fit many  different devices.
- **Navigation elements** - I used a drop-down menu that is accessible from each page. The logo in the top left can also be clicked to navigate back to the home page, with an additional link in the description on the about page.
- **Responsive to window resizing** - My app looks great on all window sizes and devices
- **Application elements** - Used good contrast and whitespace
- **Application text content** - Consistent fonts.
- **Application images** - There is a logo in the header, and two pictures on the about page.

### Javascript Deliverable

For this deliverable I added the javascript functionality.

- Takes username as a place for future login. Displays username on chat screen.
- Has two array/object acting as the database. Stores messages and tips typed. Injects the data into the DOM.
- On the chat page, the websocket is mocked by displaying a user every 10 seconds, and a mock response is made to each message.
- Javascript supports applications interaction logic.

### Service Deliverable

For this deliverable I created a HTTP service to host my frontend and provide backend endpoints.

- Node.js/Express HTTP service - done!
- Static middleware for frontend - done!
- Calls to third party endpoints - Generates a random featured user on the about page using fetch.
- Backend service endpoints - Placeholder for login, endpoints for chat messages and tips.
- Frontend calls service endpoints - Frontend interacts with messages, tips and message endpoints. Used fetch.

## DB deliverable

For this deliverable I stored and retrieved data from MongoDB.

- **MongoDB Atlas database created** - done!
- **Endpoints for data** - My stubbed out endpoints now process the data and send it to Mongo.
- **Stores data in MongoDB** - done!


## Login deliverable

For this deliverable I added user registration and authentication.

- **User registration** - Creates a new account in the database.
- **existing user** - Verifies the user's name and password from data stored in the database
- **Use MongoDB to store credentials** - done!
- **Restricts functionality** - You cannot access the chat page without logging in.

## WebSocket deliverable

For this deliverable I enabled realtime messaging of users. Users are also notified when another user joins the chat. I ended up removing the tips section due to a lack of time to complete it, with the message tab fulfilling all the requirements.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - All user messages display in realtime


## React deliverable

For this deliverable I converted the application over to use react.

- **Bundled and transpiled** - done!
- **Components** - Login, chat page, about are all components.
- **Router** - Routing between login, chat, and about components.
- **Hooks** - useState and useEffect hooks are used in chat.jsx.

