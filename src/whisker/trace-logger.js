import Util from "./util";
import {cloneDeep} from "lodash";



let threadPreparedForCoverage = false;

/**
 * Keeps a reference to all "main" blocks (i.e. blocks that don't represent a parameter), and checks which of these
 * blocks are executed by any prepared Thread. This means that the coverage can only be measured on one vm at a time.
 */
class TraceLogger {

    constructor() {
        this.clearTrace();
        this.ignoreOpcodes = new Set([
            "control_if", // "if" BoolExpr "then" StmtList
            "control_if_else", // "if" BoolExpr "then" StmtList "else" StmtList
            "control_repeat", // "repeat"  NumExpr "times" StmtList
            "control_repeat_until", // "until" BoolExpr "repeat" StmtList
            "control_forever", //"repeat" "forever" StmtList
        ]);
    }

    // static attributeLst = ["posx", "posy", "skinId",
    //     "brightness", "color", "direction", "fisheye",
    //     "ghost", "mosaic", "pixelate",
    //     "scalex", "scaley", "skinSizeX", "skinSizeY", "visible", "whirl"
    // ]
    static attributeLst = ["posx", "posy", "skinId","skinSizeX", "skinSizeY",
        "visible","direction",
    ]

    fillAttribute(attribute, d, obj) {
        if (attribute.startsWith("skin")) return;
        if (attribute === "posx") obj[attribute] = d._position[0];
        else if (attribute === "posy") obj[attribute] = d._position[1];
        else if (attribute === "direction") obj[attribute] = d._direction;
        else if (attribute === "visible") obj[attribute] = d._visible;
        else if (attribute === "scalex") obj[attribute] = d._scale[0];
        else if (attribute === "scaley") obj[attribute] = d._scale[1];
        else if (attribute === "color") obj[attribute] = d._uniforms.u_color;
        else if (attribute === "whirl") obj[attribute] = d._uniforms.u_whirl;
        else if (attribute === "fisheye") obj[attribute] = d._uniforms.u_fisheye;
        else if (attribute === "pixelate") obj[attribute] = d._uniforms.u_pixelate;
        else if (attribute === "mosaic") obj[attribute] = d._uniforms.u_mosaic;
        else if (attribute === "brightness") obj[attribute] = d._uniforms.u_brightness;
        else if (attribute === "ghost") obj[attribute] = d._uniforms.u_ghost;
    }

    addAttributeToDrawable(attributeName, newVal, drawableId) {
        const data = this.trace.drawables[drawableId][attributeName].data;
        let needsUpdate = false;
        if (newVal !== data[data.length - 1]) {needsUpdate = true}
    // if (attributeName === "posx" || attributeName === "posy") {
    //         if (Math.abs(newVal - data[data.length - 1]) > 50) {
    //             needsUpdate = true;
    //         }
    //     }
    //     else if (attributeName === "direction") {

        if (needsUpdate) {
            data.push(newVal);
            this.trace.drawables[drawableId][attributeName].id.push(this.curId);
        }
    }

    // transform () {
    //     let changeLst = [];
    //     for (const [id, obj] of Object.entries(this.trace.drawables)) {
    //         for (const attribute of TraceLogger.attributeLst) {
    //             if (!obj[attribute]) break;
    //             changeLst.push(...obj[attribute].id);
    //         }
    //     }
    //     for (const [opcode, idList] of Object.entries(this.trace.keyOps)) {
    //         changeLst.push(...idList);
    //     }
    //     changeLst.push(...this.trace.keysDown.id);
    //     changeLst = changeLst.sort((a, b) => a-b);
    //     const changeSet = new Set(changeLst);
    //     this.trace.vals = [...changeSet].sort((a, b) => a - b);
    // }


    logExecutionTrace (blockId, vm, target) {
        const block = target.blocks.getBlock(blockId);
        if (!block || this.ignoreOpcodes.has(block.opcode)) return;

        this.curId += 1;
        this.trace.endIdx = this.curId;
        this.trace.blocks.push(blockId);

        if (block.opcode in this.trace.keyOps) {
            this.trace.keyOps[block.opcode].push(this.curId);
        }

        let keysDown;
        let keysDownList = target.runtime.ioDevices.keyboard._keysPressed;
        keysDownList = keysDownList.map(x => Util.scratchKeyToKeyString(x));
        if (keysDownList.length === 0) {
            keysDown = "EMPTY";
        }
        else {
            keysDown = keysDownList[0];
        }
        const keysDownData = this.trace.keysDown.data;
        if (
            keysDownData.length === 0 ||
            keysDown !== keysDownData[keysDownData.length - 1]) {
            keysDownData.push(keysDown);
            this.trace.keysDown.id.push(this.curId);
        }
        const clones = target.sprite.clones.map(t => t.drawableID.toString());
        const cloneSet = new Set(clones);
        const skinId = target.sprite.costumes.map(c => c.md5)[target.currentCostume];
        // console.log("trace", this.trace);
        if (!this.trace.stage) {
            const stage = vm.runtime.getTargetForStage();
            if (stage) {
                const stageSkinId = stage.sprite.costumes.map(c => c.md5)[stage.currentCostume];
                this.trace.stage = {drawableId: stage.sprite.clones[0].toString(), skinId: stageSkinId}
            }
        }

        for (const d of target.renderer._allDrawables) {
            if (!d) continue;
            const drawableId = d._id.toString();
            if (!this.trace.drawables[drawableId]) {this.trace.drawables[drawableId] = {}}
            this.trace.drawables[drawableId].endIdx = this.curId;
            if (! (cloneSet.has(drawableId))) continue;
            // it is incomplete to only check the current target's clones. But this is the
            // most time-efficient way.
            let [skinSizeX, skinSizeY] = [-1, -1];
            if (d.skin) {[skinSizeX, skinSizeY] = target.renderer.getCurrentSkinSize(d._id);}
            const obj = {skinId, skinSizeX, skinSizeY};
            for (const attribute of TraceLogger.attributeLst) {
                this.fillAttribute(attribute, d, obj);
            }

            if (!this.trace.drawables[drawableId][TraceLogger.attributeLst[0]]) {
                // if it's not in the trace yet, add it in;
                for (const attribute of TraceLogger.attributeLst) {
                    this.trace.drawables[drawableId][attribute] = {
                        data: [obj[attribute]], id: [this.curId]
                    }
                }

            }
            // if it's already in trace, only do something if it's part of current
            // target's clone.
            else if (cloneSet.has(drawableId)) {
                for (const attribute of TraceLogger.attributeLst) {
                    this.addAttributeToDrawable(attribute, obj[attribute], drawableId)
                }
            }
        }
    }

    /**
     * @param {Thread: class} classes .
     */
    prepareClasses (classes, vm) {
        const Thread = classes.Thread;
        const myself = this;

        if (!Thread.hasOwnProperty('real_pushStack')) {
            Thread.real_pushStack = Thread.prototype.pushStack;
            Thread.prototype.pushStack = function (blockId) {
                Thread.real_pushStack.call(this, blockId);
                myself.logExecutionTrace(blockId, vm, this.target)
            };
        }
        if (!Thread.hasOwnProperty('real_reuseStackForNextBlock')) {
            Thread.real_reuseStackForNextBlock = Thread.prototype.reuseStackForNextBlock;
            Thread.prototype.reuseStackForNextBlock = function (blockId) {
                Thread.real_reuseStackForNextBlock.call(this, blockId);
                myself.logExecutionTrace(blockId, vm, this.target)
            };
        }

        threadPreparedForCoverage = true;
    }

    /**
     * @param {Thread: class} classes .
     */
    restoreClasses (classes) {
        const Thread = classes.Thread;

        if (Thread.hasOwnProperty('real_pushStack')) {
            Thread.prototype.pushStack = Thread.real_pushStack;
            delete Thread.real_pushStack;
        }
        if (Thread.hasOwnProperty('real_reuseStackForNextBlock')) {
            Thread.prototype.reuseStackForNextBlock = Thread.real_reuseStackForNextBlock;
            delete Thread.real_reuseStackForNextBlock;
        }

        threadPreparedForCoverage = false;
    }

    /**
     * @param {VirtualMachine} vm .
     */
    clearTrace () {
        this.trace =  {
            drawables: {},
            blocks: [],
            keysDown: {data: [], id: []},
            keyOps: {"control_create_clone_of":[], "control_delete_this_clone": []},
            endIdx: -1,
            vals: [],
        };
        this.curId = -1;
    }

}

export default TraceLogger;
