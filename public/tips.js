//OP  tips array for fake database
let tipsArray;
if (localStorage.getItem("tipsArray") === null) {
    tipsArray = [];
}
else {
    tipsArray = JSON.parse(localStorage.getItem("tipsArray"));
    generatePreviousTips();
}
    // makes btn work on click, tried different format than chat.js
    document.getElementById('submit').addEventListener('click', function(prevent) 
    {
      generateTips();
    });
  //Makes the tips
  function generateTips()
  {

    // get user input
    const userInput = document.getElementById('tipText').value;

    // Get user name
    const userName = localStorage.getItem('userName');

      if (userInput != '')
      {
        //new tip objects
        const newTip =
        {
            userName,
            content: userInput,
            timestamp: new Date().toLocaleTimeString()
        }

        //need to add the tips to the array
        tipsArray.push(newTip);


        //save the tips to local storage
        localStorage.setItem('tipsArray', JSON.stringify(tipsArray));


        /** console.log(tipsArray); 
         * checked to see if tips were added to the array
         */
        // Make an HTTP POST request to submit the tip
    fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTip),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data
          console.log(data);
          // Process the response if needed
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });

        // Makes new list item
        const newItem = document.createElement('a');
        newItem.href = '#';
        newItem.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
    
        // Get the current time
        const currentTime = new Date().toLocaleTimeString();
    
        // Make stuff for the list item
        const tipStuff = `
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${userName}</h5>
            <small>Posted at ${currentTime}</small>
            </div>
            <p class="mb-1">${userInput}</p>
        `;
    
        // Set the content of the list item
        newItem.innerHTML = tipStuff;
    
        // Appends the list item to the parent container
        document.getElementById('tips').appendChild(newItem);
    
        // Reset the text box
        document.getElementById('tipText').value = '';
    }
    
}

//generates the previous tips
function generatePreviousTips() 
{
    // Get user name
     const userName = localStorage.getItem('userName');

     
    let tipsArray = JSON.parse(localStorage.getItem("tipsArray"));
    for (i of tipsArray)
    {
        const userName = i.userName;
        const currentTime = i.timestamp;
        const userInput = i.content;

        // Makes new list item
        const newItem = document.createElement('a');
        newItem.href = '#';
        newItem.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
        
        // Make stuff for the list item
        const tipStuff = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${userName}</h5>
        <small>Posted at ${currentTime}</small>
        </div>
        <p class="mb-1">${userInput}</p>
        `;

        // Set the content of the list item
        newItem.innerHTML = tipStuff;
    
        // Appends the list item to the parent container
        document.getElementById('tips').appendChild(newItem);

    }
}
