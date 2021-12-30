import axios from "../axiosConfig";
import SnapinatorApp from "../snapinator/src/SnapinatorApp";

class ReplayerAPI {

    static async getTrace (projectName) {
        const response = await axios({
            method: 'get',
            url: `/trace/${projectName}`,
        })
        const snapinator = new SnapinatorApp();
        await snapinator.getNonScripts(projectName);
        return response;
    }

    static async editTrace (projectName, start, end) {
        console.log("start, end: ", start, end);
        const response = await axios({
            method: 'post',
            url: `/edit`,
            data: {
                start: start,
                end: end,
            }
        })
        console.log("edit trace response: ", response.data);
        const enc = new TextEncoder();
        const projectEnc = enc.encode(response.data);
        const snapinator = new SnapinatorApp();
        await snapinator.getNonScripts(projectName);
        // await snapinator.getScriptsOnly(projectName, projectEnc)
        return response;
    }
}

export default ReplayerAPI
