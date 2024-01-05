let authService;
let postService;
let token;

/* Posts Page JavaScript */
document.addEventListener("DOMContentLoaded", function() {
    // Get the token from local storage
    authService = new AuthService();
    const user = authService.getLoginData();
    const token = user.token;

    // Get all posts
    postService = new PostService(token);
    postService.getAllPost().then((data) =>
    {
        console.log(data);

        // Display all posts
        displayPosts(data);
    })

    document.getElementById("postButton").addEventListener("click", createNewPost);

});


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to toggle the modal
function toggleModal() {
    if (modal.style.display === "block") {
        modal.style.display = "none"; // Close the modal if it's already open
    } else {
        modal.style.display = "block"; // Open the modal if it's closed
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        toggleModal();
    }
};


// Function to create a new post
function createNewPost() {
    var postContent = document.getElementById("postContent");

    // Call to API to create a new post
    fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
            'authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: postContent.value
        })
    })
        .then(function(response) {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(function(jsonResponse) {
            console.log('JSON Response:', jsonResponse);
            toggleModal();
            postContent.value = "";

           
            postService.getAllPost().then((data) => {
                // Display all posts
                displayPosts(data);
            });

            // Display the newly created post
            displayNewPost(jsonResponse);
        })
        .catch(function(error) {
            console.error('Error:', error);
            
        });
}


// Function to display a single post
function displayNewPost(post) {
    var postsContainer = document.getElementById("postsContainer");

    var cardDiv = document.createElement("div");
    cardDiv.className = "card mt-2";

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    var usernameElement = document.createElement("h4");
    usernameElement.className = "card-subtitle mb-2";
    usernameElement.innerText = post.username;

    var textElement = document.createElement("p");
    textElement.className = "card-text text-secondary";
    textElement.innerText = post.text;

    var profileLinkElement = document.createElement("a");
    profileLinkElement.href = "../profile.html";
    profileLinkElement.className = "card-link";
    profileLinkElement.innerText = "User Profile";

    cardBodyDiv.appendChild(usernameElement);
    cardBodyDiv.appendChild(textElement);
    cardBodyDiv.appendChild(profileLinkElement);

    cardDiv.appendChild(cardBodyDiv);
    postsContainer.appendChild(cardDiv);
}


// Function to display all posts

function displayPosts(posts) {
    var postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        var cardDiv = document.createElement("div");
        cardDiv.className = "card mt-2";

        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

        var usernameElement = document.createElement("h4");
        usernameElement.className = "card-subtitle mb-2";
        usernameElement.innerText = post.username;

        var textElement = document.createElement("p");
        textElement.className = "card-text text-secondary";
        textElement.innerText = post.text;

        var profileLinkElement = document.createElement("a");
        profileLinkElement.href = "../profile.html";
        profileLinkElement.className = "card-link";
        profileLinkElement.innerText = "User Profile";

        cardBodyDiv.appendChild(usernameElement);
        cardBodyDiv.appendChild(textElement);
        cardBodyDiv.appendChild(profileLinkElement);

        cardDiv.appendChild(cardBodyDiv);
        postsContainer.appendChild(cardDiv);
    });
}
