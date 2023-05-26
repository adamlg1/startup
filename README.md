# Gluten-Free Chat

## Description deliverable - Startup Specification

### Elevator pitch

Have you ever been frustrated by your family’s inability to figure out what is and is not gluten-free, or had well-intentioned relatives feed you food that doesn’t agree with your diet, or arrived at a dinner only to find out you cannot eat anything? The Gluten-Free Chat application helps to solve many of these problems. Family can message to ask questions in a chat setting, add tips of what they have learned cooking, and not have to feel so unsure when cooking for someone on a gluten-free diet. Questions in the chat can be answered in realtime, and all members can benefit from each other’s knowledge by adding tips. In a family with gluten-free members, the Gluten-Free Chat app is a must to eliminate the confusion caused by ineffective google searches, and lack of knowledge surrounding what constitutes as gluten-free.

### Design

![startupSketch](startupSketch.JPG)

### Key features

- Secure login over HTTPS
- Messages from all users displayed in realtime
- Ability for a user to submit a tip
- Messages are persistently stored
- Ability for admin to delete bad tips

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Four HTML pages. One for login, tips, chat, and an informational about page. Hyperlinks through a consistent header.
- ***Javascript*** - Uses Javascript for buttons and navigation to work.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **DB** - Store users, messages, and tips in database.
- **Login** - Register and login users. Credentials securely stored in database. Can't chat or add tips without authentication.
- **WebSocket** - Peer to peer communication through chatting with friends through the browser, and the ability to submit a tip that is broadcasted for others to see.


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

