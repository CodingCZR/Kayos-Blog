
class PostService extends ServicesBase
{

    apiBaseUrl = ""

    constructor()
    {
        super()
        this.apiBaseUrl = this.baseUrl + "/api/posts"
    }

    getAllPost(){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.token,
            },
        }

        return fetch(this.apiBaseUrl, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) =>
            {
                console.log(error);
            })
    }

    createPost(post){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.token,
            },
            body: JSON.stringify(post),
        }

        return fetch(this.apiBaseUrl, options)
            .then(response => response.json())
            .then(data => data)
            .catch((error) =>
            {
                console.log(error);
            })
    }

}