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
            currentUserData = userData; // Store user data for later use
            document.getElementById('fullName').textContent = userData.fullName;
            document.getElementById('username').textContent = userData.username;
            document.getElementById('bio').textContent = userData.bio;
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Edit username logic
    document.getElementById('editUsername').addEventListener('click', function() {
        document.getElementById('editUsernameInput').value = currentUserData.username;
        document.getElementById('editUsernameInput').style.display = 'block';
        document.getElementById('saveChanges').style.display = 'block';
    });

    // Edit bio logic
    document.getElementById('editBio').addEventListener('click', function() {
        document.getElementById('editBioInput').value = currentUserData.bio;
        document.getElementById('editBioInput').style.display = 'block';
        document.getElementById('saveChanges').style.display = 'block';
    });

    // Save changes logic
    document.getElementById('saveChanges').addEventListener('click', function() {
        const updatedUsername = document.getElementById('editUsernameInput').value || currentUserData.username;
        const updatedBio = document.getElementById('editBioInput').value || currentUserData.bio;

        const updatedUserData = {
            id: currentUserData.id, // assuming the ID is part of the fetched user data
            username: updatedUsername,
            bio: updatedBio,
            // include other fields as needed
        };

        userService.updateUser(updatedUserData)
            .then(response => {
                // Update the UI with new data or show a success message
                document.getElementById('username').textContent = updatedUsername;
                document.getElementById('bio').textContent = updatedBio;

                // Hide the input fields and save button
                document.getElementById('editUsernameInput').style.display = 'none';
                document.getElementById('editBioInput').style.display = 'none';
                document.getElementById('saveChanges').style.display = 'none';

                // Update currentUserData with new values
                currentUserData.username = updatedUsername;
                currentUserData.bio = updatedBio;
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                // Handle error, show message to user
            });
    });

    // Additional logic for other functionalities
});
