// import {AssetServer, ZipArchive} from "snapinator/src/Archive";
// import Project from "snapinator/src/Project";
//
//
// const readProject = async (projectName, file) => {
//     let zip;
//     let jsonObj;
//     console.log(`Reading project "${projectName}"`);
//     jsonObj = JSON.parse(
//         new TextDecoder().decode(
//             new Uint8Array(file)
//         )
//     );
//     zip = new AssetServer();
//     const project = new Project();
//     await project.readProject(projectName, jsonObj, zip, this.log.bind(this));
//     return project;
// }
//
// const snapify = async () => {
//     const project = await readProject(projectID, file);
//     if (project) {
//         this.writeProject(projectID, project);
//     }
// }
//
// export default snapify;
