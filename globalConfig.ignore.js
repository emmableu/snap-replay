let simplifiedInterfaceFor110;
const searchString = window.location.search;
simplifiedInterfaceFor110 = searchString.endsWith("csc110");
console.log("simplifiedInterfaceFor110: ", simplifiedInterfaceFor110);
// const globalConfigIgnore = {
//      simplifiedInterfaceFor110: false,
//      axiosExpressBaseURL: "http://localhost:9090/",
//      axiosSpringBaseURL: "http://localhost:8082/",
// }

//below is for the remote server
const globalConfigIgnore = {
     simplifiedInterfaceFor110,
     axiosExpressBaseURL: "https://isnap.csc.ncsu.edu/node/",
     axiosSpringBaseURL: "https://isnap.csc.ncsu.edu/servlet/service/",
}

export default globalConfigIgnore;
