
const authService = new AuthService();

// => to fetch user information and populate the profile
async function fetchAndPopulateProfile() {
    // ccheck if the user is logged in
    if (authService.isLoggedIn()) {
        const loginData = authService.getLoginData();
        const username = loginData.username;

        try {
            // fetch user information from the API
            const response = await fetch(`http://localhost:5000/api/users/${username}`);
            const userData = await response.json();

            if (response.status === 200) {
                // pop the profile with user data
                document.getElementById("fullName").textContent = userData.user.fullName;
                document.getElementById("location").textContent = userData.user.location || "Location Not Provided";
                document.getElementById("username").textContent = userData.user.username;
                document.getElementById("aboutMe").textContent = userData.user.about || "About Me Not Provided";
            } else {
                // when user data cannot be fetched
                console.error("Error fetching user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // If the user is not logged in, redirect to the login page
        window.location.href = "index.html";
    }
}


document.addEventListener("DOMContentLoaded", fetchAndPopulateProfile);
