/* Posts Page JavaScript */

//"use strict";

// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var openModalButton = document.getElementById("openModalButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get the form and input for posting
    var postForm = document.getElementById("postForm");
    var postContentInput = document.getElementById("postContent");

    // Get the posts container
    var postsContainer = document.getElementById("postsContainer");

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

    // Function to fetch posts from the API and update the UI
    function fetchPosts() {
        fetch('http://localhost:5000/docs/#/Posts/getPosts') // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                // Update the UI with the fetched posts
                updateUI(posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    // Function to update the UI with the fetched posts
    function updateUI(posts) {
        // Clear existing content in the container
        postsContainer.innerHTML = '';

        // Iterate through the fetched posts and update the UI
        posts.forEach(post => {
        
            var postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }

    // Example function to create a post element
    function createPostElement(post) {
        var postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `

            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <span>${post.date}</span>
        `;
        return postElement;
    }

    // Event listener for the "Open Modal" button
    openModalButton.addEventListener('click', openModal);

    // Event listener for the post form submission
    postForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the content of the post from the input field
        var postContent = postContentInput.value;

        // Validate if the post content is not empty
        if (postContent.trim() === '') {
            alert('Please enter a post before submitting.');
            return;
        }

        // Perform the logic to post the tweet (You need to implement this part)
        // For example, you might make an AJAX request to the server to save the post

        // After successfully posting the tweet, you can optionally fetch and update the posts
        fetchPosts();

        // Clear the input field and close the modal
        postContentInput.value = '';
        closeModal();
    });

    // Call the fetchPosts function when the page loads
    fetchPosts();
});
