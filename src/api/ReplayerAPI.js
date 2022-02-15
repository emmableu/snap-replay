import axiosSpring from "./axiosSpringConfig";
import axiosExpress from "./axiosExpressConfig";
import globalConfig from "../globalConfig";

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

    static async postScript (projectName, isOriginal, start, end) {
        const response = await axiosSpring({
            method: 'post',
            url: `/post-script/wwang33/${projectName}`,
            data: {
                projectName: projectName,
                isOriginal: isOriginal,
                start: Math.floor(start),
                end: Math.floor(end),
            }
        })
        // console.log("post script response: ", response.data);
        const projectJson = response.data;
        if (isOriginal) {
            await this.postSnapXML(projectName, projectJson, "script_no_asset_and_slice");
        }
        else {
            await this.postSnapXML(projectName, projectJson, "script_no_asset_and_slice");
        }
        return response;
    }

    static async postSnapXML (projectName, projectJson, type) {

        const response = await axiosExpress({
            method: 'post',
            url: `/post-snap-xml/${projectName}`,
            data: {
                projectJson: projectJson === null? null: JSON.stringify(projectJson),
                type: type,
            }
        })

        // window.ide.slice = response.data.slice;
        window.ide.code = response.data;



        if (type === "script_and_asset_no_slice") {
            window.ide.interpretReqAnchors(response.data.full, false);
        }
        else {
            window.ide.interpretReqAnchors(response.data.full, true);
            if (window.ide.showSpritesTogether) {
                window.ide.stage.children.forEach(m => {
                    if (m instanceof SpriteMorph) {
                        m.changeMenuItem("full");
                    }
                });
            }
        }
        // else if (type === "sprite")
        return response;
    }
}

export default ReplayerAPI
