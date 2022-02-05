// First we need to import axios.js
import axios from "axios";
import 'regenerator-runtime/runtime';
import globalConfigIgnore from "../../globalConfig.ignore";

const instance = axios.create({
// .. where we make our configurations
    baseURL: globalConfigIgnore.axiosSpringBaseURL
//     baseURL: "http://isnap.csc.ncsu.edu:8080/service/"
    // baseURL: "http://localhost:8080/service/"
});

const handleRequest = async (request) => {
    // // Edit request config
    if (request.method === "post") {
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
