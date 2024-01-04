

document.addEventListener("DOMContentLoaded", () => {
    // from authService and UserService
    const authService = new AuthService();
    const userService = new UserService();

    // check if the user is logged in
    if (!authService.isLoggedIn()) {
        // if not logged in, redirect to the login page/index
        window.location.href = './index.html';
    } else {
        // if logged in, fetch &display user profile
        fetchUserProfile();
    }

    // event listener for logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        authService.logout();
    });

    // function to fetch and display user profile
    async function fetchUserProfile() {
        try {
            const users = await userService.getAllUsers();
            const loggedInUsername = sessionStorage.username;
            const loggedInUser = users.find(user => user.username === loggedInUsername);
    
            if (loggedInUser) {
                console.log(loggedInUser); 
                displayUserProfile(loggedInUser);
            } else {
                console.error('Logged-in user profile not found.');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
    

    // Ffction to display user profile data
    function displayUserProfile(user) {
        document.getElementById('fullName').textContent = user.fullName;
        //document.getElementById('location').textContent = user.location;
        document.getElementById('username').textContent = user.username;
        document.getElementById('bio').textContent = user.bio ? user.bio : "No bio provided";
      
    }
});

