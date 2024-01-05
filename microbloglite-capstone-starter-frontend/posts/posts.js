let authService;
let postService;
let token;

/* Posts Page JavaScript */
document.addEventListener("DOMContentLoaded", function () {
  // Get the token from local storage
  authService = new AuthService();
  const user = authService.getLoginData();
  const token = user.token;

  // Get all posts
  postService = new PostService(token);
  postService.getAllPost().then((data) => {
    console.log(data);

    // Display all posts
    displayPosts(data);
  });

  // Get the logout button
  const logoutButton = document.getElementById("logoutBtn");
  logoutButton.addEventListener("click", () => {
    authService.logout();
  });

});
 // Get postForm and postButton
 var postForm = document.getElementById("postForm");
 var submitButton = document.getElementById("postButton");

 submitButton.addEventListener("click", function (event) {
 event.preventDefault();

 var inputValue = postForm.querySelector("textarea").value;
 console.log("this is the input value" + inputValue);

        // Call the createNewPost function with the input value
    postNewPost();
 });
 

// Function to create a new post
function postNewPost(postContent) {
    // Call to API to create a new post
    var post = ({ text: postForm.querySelector("textarea").value })
    postService.createPost(post).then((data) => {
        console.log(data);
    });
}

// Function to display all posts
function displayPosts(posts) {
  var postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
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
