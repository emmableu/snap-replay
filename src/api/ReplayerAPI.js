import axios from "../axiosConfig";

class ReplayerAPI {
    static async getTrace (projectName) {
        const response = await axios({
            method: 'get',
            url: `/trace/${projectName}`,
        })
        return response;
    }

    static async editTrace (start, end) {
        const response = await axios({
            method: 'post',
            url: `/edit`,
            data: {
                start: start,
                end: end,
            }
        })
        return response;
    }
}

export default ReplayerAPI
