let authService;
let postService;

/* Posts Page JavaScript */
document.addEventListener("DOMContentLoaded", function() {
    btn.addEventListener("click", toggleModal);
    span.addEventListener("click", toggleModal);

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

    const postButton = document.getElementById("postButton");

    // Get the logout button
    const logoutButton = document.getElementById("logoutBtn");
    logoutButton.addEventListener("click", () => {
        authService.logout();
    });
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

function submitModal(){
    createNewPost();
}
// Function to create a new post
function createNewPost() {
    var postContent = document.getElementById("postContent");

    // Call to API to create a new post
    fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
            'authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            content: postContent.value
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            console.log(jsonResponse);
            toggleModal();
            postContent.value = "";
            getPosts();
        });
}

// Function to display all posts
function displayPosts(posts) {
    var postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        var postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerText = post.text;

        postsContainer.appendChild(postDiv);
    });
}
