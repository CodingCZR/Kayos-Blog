document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userService = new UserService(); // from user-service.js

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById("registrationForm"));

        const userData = {
            username: formData.get("username"),
            fullName: formData.get("fullName"),
            bio: formData.get("bio"),
            password: formData.get("password"),
            
        };

        userService.createUser(userData) 
            .then(data => {
                alert(`Registration successful for ${data.username}. Please login.`);
                window.location.href = "index.html"; // after registering, redirect user to login page/index
            })
            .catch(error => {
                console.error("Registration error:", error);
                alert("Registration failed. Please try again later.");
            });
    });
});
