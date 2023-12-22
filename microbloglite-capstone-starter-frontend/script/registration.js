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
            // 
            alert(`Registration successful for ${data.username}. Please login.`);
            window.location.href = "login.html"; //after registration is succesful redirect to login page
        })
        .catch(error => {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again later.");
        });
    });
});
