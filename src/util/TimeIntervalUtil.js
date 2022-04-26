import Bisect from "./Bisect";
import TraceLogger from "../whisker/trace-logger";
import axios from "../api/axiosSpringConfig";
import * as UUID from "uuid";


class TimeIntervalUtil  {
    static getRealFrameId = (selected, valMap, stride) => {
        // selected is one value from the two values
        const valLst = Object.keys(valMap).map(v => parseInt(v)).sort((a, b) => a - b);
        console.log("valLst: ", valLst, "valMap: ", valMap);
        selected = selected.toString();
        if (selected in valMap) {
            return parseInt(valMap[selected])
        }
        else {
            const closestBigger = valLst[Bisect.lb(valLst, selected)];
            const closestSmaller = closestBigger - stride;
            const realBigger = valMap[closestBigger];
            const realSmaller = valMap[closestSmaller];
            let realSelected = (realBigger - realSmaller) * (selected - closestSmaller)/stride + realSmaller
            realSelected = Math.floor(realSelected);
            console.log(selected, closestBigger, closestSmaller,realBigger,realSmaller,realSelected)
            return realSelected;
        }
    }

    static sampleStoryboard = (trace, timeRange, valMap, projectName) => {
        const valLst = Object.keys(valMap).map(v => parseInt(v)).sort((a, b) => a - b);
        const stride = valLst[1] - valLst[0]
        const startIdx = valLst[Bisect.lb(valLst, timeRange[0])];
        const endIdx = valLst[Bisect.ub(valLst, timeRange[1])];
        console.log("startIdx, endIdx: ", startIdx, endIdx);
        projectName = projectName.replace(" ", "%20");
        const path = axios.defaults.baseURL + `project/${projectName}/`;
        let res = []
        for (let i = startIdx; i <= endIdx; i += stride) {
            const realIdx = valMap[i]
            const frame = TimeIntervalUtil.getCurFrameStars(realIdx, trace, path)
            res.push(frame)
        }

        // let stride = Math.ceil((end - start) /10)
        // if (stride === 1) {stride = Math.ceil((end - start)/3)}
        // let stride = Math.ceil((end - start) /3)
        // const res = []
        // for (let i = start; i < end; i ++) {
        //     res.push(frameList[i])
        //     i += stride
        // }
        // res.push(frameList[end])
        return res;
    }




    static getCurFrameStars (frameId, trace, path) {
        // get data in konva format
        let starLayerObj = {}
        if (trace.stage){
            starLayerObj.backdropStar = {
                "_id": trace.stage.skinId,
                "actorId": "Stage",
                "prototypeId": path + trace.stage.skinId,
                // backdropstar does not read in width, height, x, y data
            }
        }
        let starList = []
        for (const [id, obj] of Object.entries(trace.drawables)) {
            if (frameId > obj.endIdx) continue;
            let rawStarObj = {}
            let isValidStar = true;
            for (const attribute of TraceLogger.attributeLst) {
                if (obj[attribute] === undefined ||
                    obj[attribute] === null ||
                    obj['visible'] === false
                ) {isValidStar = false;break;}
                // console.log("obj['visible']: ", obj.visible)
                // if a drawable entry doesn't even have these attributes,
                // then the drawable doesn't exist.
                const idx = Bisect.ub(obj[attribute].id, frameId);
                if (idx === -1) {isValidStar = false;break;}
                rawStarObj[attribute] = obj[attribute].data[idx];
            }
            if (!isValidStar) continue;
            const starObj = this.getStarObj(rawStarObj, path)
            starList.push(starObj);
        }
        starLayerObj.starList = starList;
        return starLayerObj
    }

    static getStarObj (rawStarObj, path) {
        let starObj = {}
        const {posx, posy, skinId, skinSizeX, skinSizeY, visible, direction} = rawStarObj;
        const res = {
            _id: UUID.v4(),
            actorId: skinId, // not recorded in the trace now
            prototypeId: path + skinId,
            x: posx + 240 - skinSizeX/2,
            y: 180 - posy - skinSizeY/2,
            width: skinSizeX,
            height: skinSizeY,
            rotation: direction - 90,
            transform: null,
            "childStar": {
                "speechStar": null,
                "lineStar": null,
                "motionStarList": []
            }
        }
        console.log("getStarObj res: ", res);
        return res;
    }

    // getKonvaFrameListData () {
    //     // use this.trace, and this.path
    //     let frameList = [];
    //     const keyFrameIdAttrMap = this.getKeyFrameIds()
    //     const keyFrameIds = Object.keys(keyFrameIdAttrMap).map(e => parseInt(e)).sort()
    //     for (const frameId of keyFrameIds) {
    //         frameList.push(this.getCurFrameStars(frameId))
    //     }
    //     return {frameList, keyFrameIdAttrMap,keyFrameIds}
    // }

    // getKeyFrameIds() {
    //     let res = {};
    //     for (const [drawableId, obj] of Object.entries(this.trace.drawables)){
    //         for (const attr of TraceLogger.attributeLst) {
    //             if (obj[attr] && obj[attr].id) {
    //                 for (let i = 0; i < obj[attr].id.length; i ++ ){
    //                     const frameId = obj[attr].id[i]
    //                     if (!res[frameId]) {res[frameId] = []}
    //                     res[frameId].push({drawableId, attr})
    //                 }
    //                 // obj[attr].id.forEach(res.add, res);
    //             }
    //         }
    //     }
    //     // res = [...res].sort()
    //     console.log("keyFrameIds: ", res)
    //     return res;
    // }
}

export default TimeIntervalUtil;
