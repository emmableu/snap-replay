import axios from "../axiosConfig";
import SnapinatorApp from "../snapinator/src/SnapinatorApp";

class ReplayerAPI {

    static async getTrace (projectName) {
        const response = await axios({
            method: 'get',
            url: `/trace/${projectName}`,
        })
        return response;
    }

    static async editTrace (projectName, start, end) {
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
        await snapinator.getScriptsOnly(projectName, projectEnc)
        return response;
    }
}

export default ReplayerAPI
