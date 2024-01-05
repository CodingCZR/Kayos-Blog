document.addEventListener('DOMContentLoaded', function() {
    const authService = new AuthService();
    const userService = new UserService();
    let currentUserData = {}; // To store the current user data

    // Check if user is logged in
    if (!authService.isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Fetch and display user data
    const loginData = authService.getLoginData();
    userService.getUser(loginData.username)
        .then(userData => {
            currentUserData = userData; // Store user data 
            document.getElementById('fullName').textContent = userData.fullName;
            document.getElementById('username').textContent = userData.username;
            document.getElementById('bio').textContent = userData.bio;
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Edit username 
    document.getElementById('editUsername').addEventListener('click', function() {
        document.getElementById('editUsernameInput').value = currentUserData.username;
        document.getElementById('editUsernameInput').style.display = 'block';
        document.getElementById('saveChanges').style.display = 'block';
    });

    // Edit bio 
    document.getElementById('editBio').addEventListener('click', function() {
        document.getElementById('editBioInput').value = currentUserData.bio;
        document.getElementById('editBioInput').style.display = 'block';
        document.getElementById('saveChanges').style.display = 'block';
    });

    // Save changes 
    document.getElementById('saveChanges').addEventListener('click', function() {
        const updatedUsername = document.getElementById('editUsernameInput').value || currentUserData.username;
        const updatedBio = document.getElementById('editBioInput').value || currentUserData.bio;

        const updatedUserData = {
            id: currentUserData.id, 
            username: updatedUsername,
            bio: updatedBio,
            
        };

        userService.updateUser(updatedUserData)
            .then(response => {
                
                document.getElementById('username').textContent = updatedUsername;
                document.getElementById('bio').textContent = updatedBio;

                
                document.getElementById('editUsernameInput').style.display = 'none';
                document.getElementById('editBioInput').style.display = 'none';
                document.getElementById('saveChanges').style.display = 'none';

                // update currentUserData with new values
                currentUserData.username = updatedUsername;
                currentUserData.bio = updatedBio;
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                
            });
    });

    
});
