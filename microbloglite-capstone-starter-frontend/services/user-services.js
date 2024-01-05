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
        const options = {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.token,
            },
            body: JSON.stringify(user),
        };

        const updateUserUrl = `${this.apiBaseUrl}/${user.id}`; 

        return fetch(updateUserUrl, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) => {
                console.error(error);
            });
    }

    getUser(userName) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.token,
            },
        };

        return fetch(`${this.apiBaseUrl}/${username}`, options)
            .then(response => response.json())
            .then(data => {
                return data;
            })

            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }
}
