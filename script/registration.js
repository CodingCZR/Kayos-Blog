document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(registrationForm);
        const userData = {
            username: formData.get("username"),
            fullName: formData.get("fullName"),
            password: formData.get("password"),
        };

        fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns a user object with an ID.
            alert(`Registration successful for ${data.username}. Please login.`);
            window.location.href = "login.html"; // Redirect to the login page.
        })
        .catch(error => {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again later.");
        });
    });
});
