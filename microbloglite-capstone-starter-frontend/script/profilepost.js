// thgis is logic for the post form on the profile.html page, I seperated it from the main logic(profile.html) to not confuse me. 
//but its not wokring, getting a bas request. this logic is already linked to both hytml pages. 
//it works now!!!



document.addEventListener('DOMContentLoaded', function() {

    const authService = new AuthService();
    const postService = new PostService(authService.getLoginData().token);

    // Check if user is logged in
    if (!authService.isLoggedIn()) {
        alert("You must be logged in to post.");
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    // Event listener for post submission
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');

    postForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission action

     
  // Create a new post object
  const newPost = {
    text: postContent.value
};

// Call the createprofilePost method with the newPost object
postService.createprofilePost(newPost)
    .then(data => {
        // Success handling
        alert('Post created successfully');
        postContent.value = ''; // Clear the textarea
    })
    .catch(error => {
        // Error handling
        console.error('Error creating post:', error);
    });
});
});
    
    const feedBtn = document.getElementById('feedBtn');
    feedBtn.addEventListener('click', function() {
    window.location.href = 'post.html';
    });

