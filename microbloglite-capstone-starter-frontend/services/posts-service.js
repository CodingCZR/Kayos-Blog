
class PostService extends ServicesBase
{

    apiBaseUrl = "http://localhost:5000"

    constructor(token)
    {
        super()
        this.apiBaseUrl = this.baseUrl + "/api/posts"
        this.token = token;
    }

    getAllPost(){
        const options = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
        }

        return fetch(this.apiBaseUrl,options)
            .then(response => response.json())
            .then(post => post)
            .catch((error) =>
            {
                console.log(error);
            })
    }

    createPost(post) {
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        };


        return fetch(this.apiBaseUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Post created successfully:", data);
            })
            .catch(error => {
                console.error("Error creating post:", error);
            });
        }
    }