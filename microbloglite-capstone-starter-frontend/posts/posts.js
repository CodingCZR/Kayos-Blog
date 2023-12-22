/* Posts Page JavaScript */

//"use strict";

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
