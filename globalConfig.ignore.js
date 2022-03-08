let simplifiedInterfaceFor110;
const params = new URLSearchParams(window.location.search);
simplifiedInterfaceFor110 = params.get("type") === "csc110";
const playerOnly = params.get("type") === "player";
const controlCond = params.get("cond") === "0";
console.log("simplifiedInterfaceFor110: ", simplifiedInterfaceFor110);
// const globalConfigIgnore = {
//      simplifiedInterfaceFor110: false,
//      axiosExpressBaseURL: "http://localhost:9090/",
//      axiosSpringBaseURL: "http://localhost:8082/",
// }

//below is for the remote server
const globalConfigIgnore = {
     simplifiedInterfaceFor110,
     playerOnly,
     controlCond,
     axiosExpressBaseURL: "https://isnap.csc.ncsu.edu/node/",
     // axiosExpressBaseURL: "http://localhost:9090/",
     axiosSpringBaseURL: "https://isnap.csc.ncsu.edu/servlet/service/",
     // axiosSpringBaseURL: "http://localhost:8082/",
}

export default globalConfigIgnore;
