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

        // hide input fields and show the og content
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
});
