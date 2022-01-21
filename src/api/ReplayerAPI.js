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

    static async postTrace (projectName, trace, stride) {
        const response = await axiosSpring({
            method: 'post',
            url: `/post-trace/${projectName}/${stride}`,
            data: trace
        })
        return response;
    }

    static async getSB3 (projectName) {
        // both below works! but I've removed the sb3 folder from java spring server just to keep repo small, so I'm using the first one.
        // to make second one work, just add the sb3 folder back to the java spring server.
        const blob = await fetch(`http://localhost:8080/project/${projectName}/project.json`).then(r => r.blob());
        // const blob = await fetch('http://localhost:8080/sb3/27-Flappy%20Parrot.sb3').then(r => r.blob());
        const buffer = await blob.arrayBuffer();
        console.log("buffer: ", buffer);
        return buffer
    }

    static async postScript (projectName, start, end, stride) {
        const response = await axiosSpring({
            method: 'post',
            url: `/post-script/${projectName}`,
            data: {
                start: start * stride,
                end: end * stride,
            }
        })
        console.log("post script response: ", response.data);
        const projectJson = response.data;
        await this.postSnapXML(projectName, projectJson, "script");
        // const enc = new TextEncoder();
        // const projectEnc = enc.encode(response.data);
        return response;
    }

    static async postSnapXML (projectName, projectJson, type) {

        const response = await axiosExpress({
            method: 'post',
            url: `/post-snap-xml/${projectName}`,
            data: {
                projectJson: projectJson === null? null: JSON.stringify(projectJson),
                type,
            }
        })
        if (type==="asset" || type === "full") {
            // const xml = encodeURIComponent(response.data);
            // console.log("xml: ", xml);
            window.ide.interpretReqAnchors(response.data, false);
        }
        else if (type==="script") {
            window.ide.interpretReqAnchors(response.data, true);
        }
        return response;
    }
}

export default ReplayerAPI
