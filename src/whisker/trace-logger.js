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
        ])
    }

    addAttributeToDrawable(attributeName, newVal, drawableId) {
        const data = this.trace.drawables[drawableId][attributeName].data;
        if (newVal !== data[data.length - 1]) {
            data.push(newVal);
            this.trace.drawables[drawableId][attributeName].id.push(this.curId);
        }
    }

    logExecutionTrace (blockId, vm, target) {
        const block = target.blocks.getBlock(blockId);
        if (!block || block.opcode in this.ignoreOpcodes) return;
        this.curId += 1;
        this.trace.endIdx = this.curId;
        if (blockId in this.trace.blocks) {
            this.trace.blocks[blockId].push(this.curId);
        }
        else {
            this.trace.blocks[blockId] = [this.curId];
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
        console.log("trace", this.trace);
        for (const d of target.renderer._allDrawables) {
            if (!d) continue;
            const drawableId = d._id.toString();
            if (drawableId in this.trace.drawables && ! (cloneSet.has(drawableId))) continue;
            const [posx, posy] = d._position;
            if (!(drawableId in this.trace.drawables)) {
                // if it's not in the trace yet, add it in;
                this.trace.drawables[drawableId] = {
                    posx: {data: [posx], id: [this.curId]},
                    posy: {data: [posy], id: [this.curId]},
                    skinId: {data: [skinId], id: [this.curId]},
                };
            }
            // if it's already in trace, only do something if it's part of current
            // target's clone.
            else if (cloneSet.has(drawableId)) {
                this.addAttributeToDrawable("posx", posx, drawableId);
                this.addAttributeToDrawable("posy", posy, drawableId);
                this.addAttributeToDrawable("skinId", skinId, drawableId);
            }
        }

        for (const drawable of target.renderer._allDrawables) {
            if (!drawable) {
                continue;
            }
            let skinSize = [-1, -1];
            if (drawable.skin) {
                skinSize = target.renderer.getCurrentSkinSize(drawable._id);
            }
            const propertiesToLog = {};
            propertiesToLog.id = drawable._id;
            propertiesToLog.posx = drawable._position[0];
            propertiesToLog.posy = drawable._position[1];
            propertiesToLog.direction = drawable._direction;
            propertiesToLog.visible = drawable._visible;
            propertiesToLog.skinSize = skinSize;
            propertiesToLog.scalex = drawable._scale[0];
            propertiesToLog.scaley = drawable._scale[1];
            propertiesToLog.scaleboth = drawable._scale.slice(0, 2);
            propertiesToLog.color = drawable._uniforms.u_color;
            propertiesToLog.whirl = drawable._uniforms.u_whirl;
            propertiesToLog.fisheye = drawable._uniforms.u_fisheye;
            propertiesToLog.pixelate = drawable._uniforms.u_pixelate;
            propertiesToLog.mosaic = drawable._uniforms.u_mosaic;
            propertiesToLog.brightness = drawable._uniforms.u_brightness;
            propertiesToLog.ghost = drawable._uniforms.u_ghost;
            console.log("properties: ", propertiesToLog);
        //     allDrawableCopy.push(propertiesToLog);
        }
        // // const allTargets = [];
        // // for (const target of vm.runtime.targets) {
        // //     allTargets.push(
        // //         {
        // //             "id": target.id,
        // //             "drawableID": target.drawableID,
        // //             "currentCostume": target.currentCostume,
        // //             "sprite": {
        // //                 "clones": target.sprite.clones.map(t => t.drawableID),
        // //                 "name": target.sprite.name,
        // //                 "costumes": target.sprite.costumes.map(c => c.md5),
        // //             }
        // //         }
        // //     )
        // // }
        //
        // this.trace.push(
        //     {
        //         clockTime: clockTime,
        //         blockId: blockId,
        //         allTargets: allTargets,
        //         target: {
        //             isStage: target.isStage,
        //             name: target.getName(),
        //             visible: target.visible,
        //             drawableID: target.drawableID,
        //             currentCostume: target.currentCostume,
        //             layerOrder: target.hasOwnProperty('layerOrder') ? target.layerOrder : 'undefined',
        //             variables: variables
        //         },
        //         allDrawables: allDrawableCopy,
        //         stageVariables: stageVariables,
        //         keysDown: keysDown
        //     });
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
            blocks: {},
            keysDown: {data: [], id: []},
            endIdx: -1
        };
        this.curId = -1;
    }

}

export default TraceLogger;
