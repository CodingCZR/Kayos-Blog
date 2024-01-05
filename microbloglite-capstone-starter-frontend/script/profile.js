document.addEventListener("DOMContentLoaded", () => {
    // from authService and UserService
    const authService = new AuthService();
    const userService = new UserService();

    // check if the user is logged in
    if (!authService.isLoggedIn()) {
        // if not logged in, redirect to the login page/index
        window.location.href = './index.html';
    } else {
        // if logged in, fetch & display user profile
        fetchUserProfile();
        fetchUserPosts();
    }

    // event listener for Edit buttons
    document.getElementById('editUsername').addEventListener('click', () => {
        document.getElementById('username').style.display = 'none';
        document.getElementById('editUsernameInput').style.display = 'block';
        document.getElementById('editUsernameInput').value = document.getElementById('username').textContent;
    });

    document.getElementById('editBio').addEventListener('click', () => {
        document.getElementById('bio').style.display = 'none';
        document.getElementById('editBioInput').style.display = 'block';
        document.getElementById('editBioInput').value = document.getElementById('bio').textContent;
    });

    // event listener for Save Changes button
    document.getElementById('saveChanges').addEventListener('click', async () => {
        const editedUsername = document.getElementById('editUsernameInput').value;
        const editedBio = document.getElementById('editBioInput').value;

        // update the displayed values
        document.getElementById('username').textContent = editedUsername;
        document.getElementById('bio').textContent = editedBio;

        // hide input fields and show the original content
        document.getElementById('username').style.display = 'block';
        document.getElementById('editUsernameInput').style.display = 'none';
        document.getElementById('bio').style.display = 'block';
        document.getElementById('editBioInput').style.display = 'none';

        // save changes to the server 
        try {
            const loggedInUser = {
                username: editedUsername,
                bio: editedBio,
            };
            await userService.updateUser(loggedInUser);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    });

    // Event listener for the Post button
    document.getElementById('postForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const postContent = document.getElementById('postContent').value;

        // Create a new post
        try {
            const postsService = new PostService(sessionStorage.token);
            const newPost = {
                content: postContent,
            };
            await postsService.createPost(newPost);

            // Display a notification
            showNotification('Post Submitted');

            // Clear and reload user posts after creating a new post
            fetchUserPosts();
            document.getElementById('postContent').value = ''; // Clear the post input field
        } catch (error) {
            console.error('Error creating a new post:', error);
        }
    });

    // function to fetch and display user profile
    async function fetchUserProfile() {
        try {
            const users = await userService.getAllUsers();
            const loggedInUsername = sessionStorage.username;
            const loggedInUser = users.find(user => user.username === loggedInUsername);

            if (loggedInUser) {
                displayUserProfile(loggedInUser);
            } else {
                console.error('Logged-in user profile not found.');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }

    // function to display profile data
    function displayUserProfile(user) {
        document.getElementById('fullName').textContent = user.fullName;
        document.getElementById('username').textContent = user.username;
        document.getElementById('bio').textContent = user.bio ? user.bio : "No bio provided";
    }

    // function to fetch and display user posts
    async function fetchUserPosts() {
        try {
            const postsService = new PostService(sessionStorage.token);
            const userPosts = await postsService.getAllPost();
            const loggedInUsername = sessionStorage.username;

            // Filter user's posts based on their username and sort by date (most recent first)
            const userPostsFiltered = userPosts
                .filter(post => post.username === loggedInUsername)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Display user's posts
            const postsContainer = document.getElementById('userPosts');
            postsContainer.innerHTML = ''; // Clear the existing posts

            userPostsFiltered.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post';
                postItem.textContent = post.content;
                postsContainer.appendChild(postItem);
            });
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    }

    // Function to display a notification
    function showNotification(message) {
        const notificationArea = document.querySelector('.alert-area');

        const notification = document.createElement('div');
        notification.className = 'alert alert-success mt-3';
        notification.textContent = message;

        // Prepend the notification to the top of the page
        notificationArea.insertBefore(notification, notificationArea.firstChild);

        // Automatically remove the notification after a few seconds
        setTimeout(() => {
            notification.remove();
        }, 3000); // Adjust the duration as needed (3 seconds in this example)
    }
});
