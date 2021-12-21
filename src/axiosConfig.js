// First we need to import axios.js
import axios from 'axios';
const instance = axios.create({
// .. where we make our configurations
    baseURL: "http://localhost:8080/"
});

const handleRequest = async (request) => {
    // // Edit request config
    if (request.method === "post") {
        // const state = store.getState();
        // const projectId = state.project.value._id;
        // const lastLoaded = state.author.value.lastLoaded;
        // const authorRes = await AuthorAPI.loadAuthorData(projectId);
        // const {lastModified, lastModifiedBy} = AuthorDataHandler.parse(authorRes.data)
        // console.log("authordata", lastModified, lastModifiedBy, lastLoaded)
        // if (lastModifiedBy !== Cookies.get("userId")
        //     && lastModified > lastLoaded
        // ) {
        //     console.log("ILLEGAL UPDATE: ", lastModified, lastModifiedBy, lastLoaded)
        //     return Promise.reject();
        // }
    }
    return request;
}

instance.interceptors.request.use(
        handleRequest,
        error => {
            console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});




export default instance;
