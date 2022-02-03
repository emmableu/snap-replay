import axiosSpring from "./axiosSpringConfig";
import axiosExpress from "./axiosExpressConfig";

class ReplayerAPI {

    // static async getTrace (projectName) {
    //     const response = await axiosSpring({
    //         method: 'get',
    //         url: `/get-trace/${projectName}`,
    //     })
    //     return response;
    // }

    static async postTrace (projectName, trace) {
        const userId = "wwang33";
        const response = await axiosSpring({
            method: 'post',
            url: `/post-trace/${userId}/${projectName}`,
            data: trace
        })
        return response;
    }

    static async getSB3 (projectName) {
        // both below works! but I've removed the sb3 folder from java spring server just to keep repo small, so I'm using the first one.
        // to make second one work, just add the sb3 folder back to the java spring server.
        const blob = await fetch(`${axiosSpring.defaults.baseURL}/project/${projectName}/project.json`).then(r => r.blob());
        // const blob = await fetch('http://localhost:8080/sb3/27-Flappy%20Parrot.sb3').then(r => r.blob());
        const buffer = await blob.arrayBuffer();
        console.log("buffer: ", buffer);
        return buffer
    }

    static async postScript (projectName, isOriginal, start, end, stride) {
        const response = await axiosSpring({
            method: 'post',
            url: `/post-script/wwang33/${projectName}`,
            data: {
                projectName: projectName,
                isOriginal: isOriginal,
                start: Math.floor(start * stride),
                end: Math.floor(end * stride),
            }
        })
        // console.log("post script response: ", response.data);
        const projectJson = response.data;
        if (isOriginal) {
            await this.postSnapXML(projectName, projectJson, "original");
        }
        else {
            await this.postSnapXML(projectName, projectJson, "script");
        }
        return response;
    }

    static async postSnapXML (projectName, projectJson, type) {
        console.log("postSnapXML");
        const response = await axiosExpress({
            method: 'post',
            url: `/post-snap-xml/${projectName}`,
            data: {
                projectJson: projectJson === null? null: JSON.stringify(projectJson),
                type,
            }
        })

        // window.ide.slice = response.data.slice;
        window.ide.code = response.data;

        if (type==="asset") {
            window.ide.interpretReqAnchors(response.data.full, false);
        }
        else if (type==="script" || type === "original") {
            window.ide.interpretReqAnchors(response.data.full, true);
        }
        // else if (type === "sprite")
        return response;
    }
}

export default ReplayerAPI
