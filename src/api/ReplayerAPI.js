import axiosSpring from "./axiosSpringConfig";
import axiosExpress from "./axiosExpressConfig";

class ReplayerAPI {

    static async getTrace (projectName) {
        const response = await axiosSpring({
            method: 'get',
            url: `/get-trace/${projectName}`,
        })
        return response;
    }


    static async postScript (projectName, start, end) {
        const response = await axiosSpring({
            method: 'post',
            url: `/post-script/${projectName}`,
            data: {
                start: start,
                end: end,
            }
        })
        console.log("post script response: ", response.data);
        const enc = new TextEncoder();
        const projectEnc = enc.encode(response.data);
        return response;
    }

    static async postSnapXML (projectName, projectJson, hasNonScripts, hasScripts) {
        const response = await axiosExpress({
            method: 'post',
            url: `/post-snap-xml/${projectName}`,
            data: {
                projectJson,
                hasNonScripts,
                hasScripts
            }
        })
        if (hasNonScripts) {
            // const xml = encodeURIComponent(response.data);
            // console.log("xml: ", xml);
            window.ide.interpretReqAnchors(response.data);
        }
        return response;
    }

    // static async editTrace (projectName, start, end) {
    //     console.log("start, end: ", start, end);
    //     const response = await axios({
    //         method: 'post',
    //         url: `/edit`,
    //         data: {
    //             start: start,
    //             end: end,
    //         }
    //     })
    //     console.log("edit trace response: ", response.data);
    //     const enc = new TextEncoder();
    //     const projectEnc = enc.encode(response.data);
    //     return response;
    // }
}

export default ReplayerAPI
