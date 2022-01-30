import axios from "./api/axiosSpringConfig.js"
import Bisect from "./util/Bisect";

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

    // setTrace (trace) {
    //     this.trace = trace;
    // }

    getCurFrameDrawables (frameId) {
        let drawableLst = []
        for (const [id, obj] of Object.entries(this.trace.drawables)) {
            const posx = obj.posx.data[Bisect.ub(obj.posx.id, frameId)];
            const posy = obj.posy.data[Bisect.ub(obj.posy.id, frameId)];
            const skinId = obj.skinId.data[Bisect.ub(obj.skinId.id, frameId)];
            drawableLst.push(
                {id, posx, posy, skinId,
                    brightness: 0,
                    color: 0,
                    direction: 180,
                    fisheye: 1,
                    ghost: 1,
                    mosaic: 1,
                    pixelate: 0,
                    scaleboth: [100, 100],
                    scalex: 100,
                    scaley: 100,
                    skinSize:[100,100],
                    visible: true,
                    whirl: -0,
                }
            )
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
                    case 'id':
                        break;
                    case 'posx':
                        properties['position'][0] = value;
                        break;
                    case 'posy':
                        properties['position'][1] = value;
                        break;
                    case 'scaleboth':
                        properties['scale'] = value;
                        break;
                    case 'skinId':
                        properties['skinId'] = this.costumeMap[d.skinId];
                        break;
                    default:
                        properties[key] = d[key];
                }
            });

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
