/* Posts Page JavaScript */

//"use strict";

<<<<<<< HEAD
// Function to post a tweet
function makePost() {
    // Retrieve the tweet content from the modal input field
    const postContent = document.getElementById('postContent').value;

    // Check if the content is not empty
    if (postContent.trim() !== '') {
        // Logic to post the tweet
        // You can send the postContent to your server using an AJAX request
        // Example using fetch API:
        fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0 ',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: postContent }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response, update the tweet container, etc.
            console.log('Post successful:', data);
            // Close the modal after posting
            $('#postModal').modal('hide');
        })
        .catch(error => {
            console.error('Error posting:', error);
            // Handle the error
        });
    }
}
=======
// script.js


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to handle modal submission
function submitModal() {
    var modalTextBoxValue = document.getElementById("modalTextBox").value;
    alert("You entered: " + modalTextBoxValue);
    closeModal(); // Close the modal after submission (you can modify this behavior)
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

>>>>>>> 66b038fba1923bc2da0515200bf4f30a432aa92c
