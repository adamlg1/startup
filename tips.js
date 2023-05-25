//DOMContentLoaded waits for the HTML file to load
document.addEventListener('DOMContentLoaded', function() 
{

    //OP  tips array for fake database
    tipsArray = [];

    // Get user name
    const userName = localStorage.getItem('userName');
  
    // makes btn work on click, tried different format than chat.js
    document.getElementById('submit').addEventListener('click', function(prevent) 
    {
      prevent.preventDefault();
  
      // get user input
      const userInput = document.getElementById('tipText').value;
  
      //new tip objects
      const newTip =
      {
        userName,
        content: userInput,
        timestamp: new Date().toLocaleTimeString()
      }

      //need to add the tips to the array
      tipsArray.push(newTip);

      /** console.log(tipsArray); 
       * checked to see if tips were added to the array
       */

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
    });
  });
  