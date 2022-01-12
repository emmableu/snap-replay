import axios from "./api/axiosSpringConfig.js"

export class Replayer {
    constructor(renderer, selectedProject, trace) {
        this.renderer = renderer;
        const projectName = selectedProject.replace(" ", "%20");
        this.path = axios.defaults.baseURL + `project/${projectName}/`;
        this.trace = trace;
        console.log(this.trace);
        this.drawableMap = {};
        this.costumeMap = {};
        this.prevFrameDrawableSet = new Set();
    }

    loadFrame(frameId) {
        if (frameId >= this.trace.length) return;
        let drawables = this.trace[frameId];
        const curFrameDrawableSet = new Set(drawables.map(d => d.id));
        // this.prevFrameDrawableSet.forEach((oldId) => {
        //     if (this.drawableMap[oldId]) {
        //         this.renderer.destroyDrawable(this.drawableMap[oldId], "group1");
        //     }
        // })
        this.prevFrameDrawableSet = curFrameDrawableSet;
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
            // this.renderer.updateDrawablePosition(drawableId, [d.posx, d.poxy])
            this.renderer.updateDrawableProperties(drawableId, properties);
            this.renderer.updateDrawableDirectionScale(drawableId, d.direction, [d.scalex, d.scaley])
            this.renderer.updateDrawableVisible(drawableId, d.visible);
        });
    }
}
