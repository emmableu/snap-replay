import axios from "./api/axiosSpringConfig.js"
import Bisect from "./util/Bisect";
import TraceLogger from "./whisker/trace-logger";

export class Replayer {
    constructor(renderer, selectedProject, trace) {
        this.renderer = renderer;
        const projectName = selectedProject.replace(" ", "%20");
        this.path = axios.defaults.baseURL + `project/${projectName}/`;
        this.trace = trace;
        this.drawableMap = {};
        this.costumeMap = {};
        this.prevFrameDrawableSet = new Set();
    }


    getCurFrameDrawables (frameId) {
        let drawableLst = []
        for (const [id, obj] of Object.entries(this.trace.drawables)) {
            let drawableObj = {}
            for (const attribute of TraceLogger.attributeLst) {
                console.log(attribute);
                const idx = Bisect.ub(obj[attribute].id, frameId);
                if (idx === -1) break;
                drawableObj[attribute] = obj[attribute].data[idx];
                drawableObj = {...drawableObj,
                ...{
                            brightness: 0,
                            color: 0,
                            direction: 90,
                            fisheye: 1,
                            ghost: 1,
                            mosaic: 1,
                            pixelate: 0,
                            scalex: 100,
                            scaley: 100,
                            whirl: -0,
                }}
            }
            drawableObj.id = id;
            drawableLst.push(drawableObj);


        }
        return drawableLst
    }

    loadFrame(frameId) {
        if (frameId >= this.trace.endIdx) return;
        let drawables = this.getCurFrameDrawables(frameId, this.trace);
        console.log("drawables: ", drawables);
        const curFrameDrawableSet = new Set(drawables.map(d => d.id));
        this.prevFrameDrawableSet.forEach((oldId) => {
            if (!curFrameDrawableSet.has(oldId)) {
                console.log("this.drawableMap[oldId]: ", this.drawableMap[oldId]);
                this.renderer.destroyDrawable(this.drawableMap[oldId], "group1");
                delete this.drawableMap[oldId]
            }
        })
        this.prevFrameDrawableSet = curFrameDrawableSet;
        console.log("-------------------------------- frameId: ", frameId);
        drawables.forEach(d => {
            let drawableId = this.drawableMap[d.id];
            let bitMapSkinId = this.costumeMap[d.skinId];
            if (drawableId === undefined) {
                drawableId = this.renderer.createDrawable("group1");
                this.drawableMap[d.id] = drawableId;
            }
            if (bitMapSkinId === undefined) {
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.src = this.path + d['skinId'];
                image.addEventListener("load", () => {
                    let skinId;
                    skinId = this.renderer.createBitmapSkin(image);
                    this.costumeMap[d.skinId] = skinId;
                })
            }
            let properties = {};
            properties['position'] = [0, 0];
            // properties['scale'] = [100, 100];
            Object.keys(d).forEach(key => {
                let value = d[key];
                switch (key) {
                    case 'scalex':
                    case 'scaley':
                    case 'skinSizeX':
                    case 'skinSizeY':
                    case 'id':
                        break;
                    case 'posx':
                        properties['position'][0] = value;
                        break;
                    case 'posy':
                        properties['position'][1] = value;
                        break;
                    case 'skinId':
                        properties['skinId'] = this.costumeMap[d.skinId];
                        break;
                    default:
                        properties[key] = d[key];
                }
            });
            properties['scale'] = [d.scalex, d.scaley];
            properties['skinSize'] = [d.skinSizeX, d.skinSizeY]

            // this.renderer.updateDrawableProperties(drawableId, properties);
            // this.renderer.updateDrawableSkinId(drawableId, this.costumeMap[d.skinId]);
            this.renderer.updateDrawablePosition(drawableId, [d.posx, d.poxy])
            this.renderer.updateDrawableProperties(drawableId, properties);
            // this.renderer.updateDrawableEffect(drawableId, "color", properties.color)
            this.renderer.updateDrawableDirectionScale(drawableId, d.direction, [d.scalex, d.scaley])
            this.renderer.updateDrawableVisible(drawableId, d.visible);
            // this.renderer.draw();
        });
    }
}
