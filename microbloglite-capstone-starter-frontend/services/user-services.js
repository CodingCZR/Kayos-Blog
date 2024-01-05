class UserService extends ServicesBase {
    apiBaseUrl = "";

    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/users";
    }

    getAllUsers() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.token,
            },
        };

        return fetch(this.apiBaseUrl, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.error(error);
            });
    }

    createUser(user) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.token,
            },
            body: JSON.stringify(user),
        };

        return fetch(this.apiBaseUrl, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.error(error);
            });
    }

    // Corrected updateUser method declaration
    updateUser(user) {
        console.log(user);
        const token = user.token;
        const options = {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(user),
        };

        return fetch(`${this.apiBaseUrl}/${user.id}`, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.error(error);
            });
    }

    getUser(loginUsername) {

        let username = loginUsername.username;
        const token = loginUsername.token;

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        };

        return fetch(`${this.apiBaseUrl}/${username}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })

            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }
}
