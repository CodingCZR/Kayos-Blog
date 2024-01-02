// instance of the AuthService class
const authService = new AuthService();

// function to check if the user is authenticated
function isAuthenticated() {
    const accessToken = window.localStorage.getItem("access-token");
    return accessToken !== null;
}

// function to fetch user information and populate the profile
async function fetchAndPopulateProfile() {
    // check if the user is authenticated
    if (isAuthenticated()) {
        const loginData = authService.getLoginData();
        const username = loginData.username;

        try {
            // fetch user information from the API
            const response = await fetch(`http://localhost:5000/api/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${loginData.token}` // include the token 
                }
            });
            const userData = await response.json();

            if (response.status === 200) {
                // pop the profile w/ user data
                document.getElementById("fullName").textContent = userData.user.fullName;
                document.getElementById("location").textContent = userData.user.location || "Location Not Provided";
                document.getElementById("username").textContent = userData.user.username;
                document.getElementById("aboutMe").textContent = userData.user.about || "About Me Not Provided";
            } else {
                //case where user data cannot be fetched
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // if the user is not authenticated, redirect to the login page/index
        window.location.href = "index.html";
    }
}

// Add an event listener to call the fetchAndPopulateProfile function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchAndPopulateProfile);

// aadd an event listener for the logout button
document.getElementById("logoutButton").addEventListener("click", function () {
    // log out the user
    authService.logout();
});

