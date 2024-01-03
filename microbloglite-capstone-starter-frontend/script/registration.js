document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userService = new UserService(); // from user-service.js

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const userData = {
            username: formData.get("username"),
            fullName: formData.get("fullName"),
            password: formData.get("password"),
        };

        userService.createUser(userData) // Use createUser method of UserService
            .then(data => {
                alert(`Registration successful for ${data.username}. Please login.`);
                window.location.href = "index.html"; // after regfiustering redirect user to loginpage/index
            })
            .catch(error => {
                console.error("Registration error:", error);
                alert("Registration failed. Please try again later.");
            });
    });
});
