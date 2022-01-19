import Util from "./util";
import {cloneDeep} from "lodash";



let threadPreparedForCoverage = false;

/* Only works with Scratch 3.0 (.sb3) projects. sb2 projects can be easily converted by saving them with Scratch 3.0. */
// class TraceLogger {
//     constructor (coveredBlockIdsPerSprite, blockIdsPerSprite, blockDescriptions) {
//
//         /**
//          * @type {Map<string, Set<string>>}
//          */
//         this.coveredBlockIdsPerSprite = coveredBlockIdsPerSprite;
//
//         /**
//          * @type {Map<string, Set<string>>}
//          */
//         this.blockIdsPerSprite = blockIdsPerSprite;
//
//
//         /**
//          * @type {Map<string, {sprite: string, opcode: string: id: string}}
//          */
//         this.blockDescriptions = blockDescriptions;
//     }
//
//     /**
//      * @return {Map<string,Set<string>>} .
//      */
//     getCoveredBlockIdsPerSprite () {
//         return new Map(this.coveredBlockIdsPerSprite);
//     }
//
//     /**
//      * @return {Map<string,Set<string>>} .
//      */
//     getBlockIdsPerSprite () {
//         return new Map(this.blockIdsPerSprite);
//     }
//
//     /**
//      * @return {Map<string, {sprite: string, opcode: string: id: string}}
//      */
//     getBlockDescriptions () {
//         return new Map(this.blockDescriptions);
//     }
//
//     /**
//      * @return {Map<string, {covered: number, total: number}>} .
//      */
//     getCoveragePerSprite () {
//         const coverage = {};
//
//         for (const [spriteName, coveredBlockIds] of this.coveredBlockIdsPerSprite) {
//             const numCovered = coveredBlockIds.size;
//             const numTotal = this.blockIdsPerSprite.get(spriteName).size;
//             coverage[spriteName] = {covered: numCovered, total: numTotal};
//         }
//
//         return coverage;
//     }
//
//     /**
//      * @return {{covered: number, total: number}} .
//      */
//     getCoverageTotal () {
//         let numCovered = 0;
//         let numTotal = 0;
//
//         for (const coveredBlockIds of this.coveredBlockIdsPerSprite.values()) {
//             numCovered += coveredBlockIds.size;
//         }
//         for (const blockIds of this.blockIdsPerSprite.values()) {
//             numTotal += blockIds.size;
//         }
//
//         return {covered: numCovered, total: numTotal};
//     }
// }

/**
 * Keeps a reference to all "main" blocks (i.e. blocks that don't represent a parameter), and checks which of these
 * blocks are executed by any prepared Thread. This means that the coverage can only be measured on one vm at a time.
 */
class TraceLogger {

    constructor() {
        this.trace = [];
    }


    logExecutionTrace (blockId, vm, target) {
        const allTargets = [];
        for (const target of vm.runtime.targets) {
            allTargets.push(
                {
                    "id": target.id,
                    "drawableID": target.drawableID,
                    "currentCostume": target.currentCostume,
                    "sprite": {
                        "clones": target.sprite.clones.map(t => t.drawableID),
                        "name": target.sprite.name,
                        "costumes": target.sprite.costumes.map(c => c.md5),
                    }
                }
            )
        }

        let keysDown = target.runtime.ioDevices.keyboard._keysPressed;
        keysDown = keysDown.map(x => Util.scratchKeyToKeyString(x));
        // console.log("keysDown: ", keysDown);
        const clockTime = target.runtime.ioDevices.clock.projectTimer();
        const stage = target.runtime.getTargetForStage();
        const stageVariables = cloneDeep(stage.variables);
        const variables = cloneDeep(target.variables);
        const renderer = target.renderer;
        const allDrawableCopy = [];
        // console.log("blockId: ", blockId);
        for (const drawable of renderer._allDrawables) {
            if (!drawable) {
                continue;
            }
            let skinSize = [-1, -1];
            if (drawable.skin) {
                skinSize = renderer.getCurrentSkinSize(drawable._id);
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
            allDrawableCopy.push(propertiesToLog);
        }

        this.trace.push(
            {
                clockTime: clockTime,
                blockId: blockId,
                allTargets: allTargets,
                target: {
                    isStage: target.isStage,
                    name: target.getName(),
                    visible: target.visible,
                    drawableID: target.drawableID,
                    currentCostume: target.currentCostume,
                    layerOrder: target.hasOwnProperty('layerOrder') ? target.layerOrder : 'undefined',
                    variables: variables
                },
                allDrawables: allDrawableCopy,
                stageVariables: stageVariables,
                keysDown: keysDown
            });
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
        this.trace = []
    }

}

export default TraceLogger;
