/*

    Snapinator
    Copyright (C) 2020  Deborah Servilla

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

import {
    OBJECT_NAMES,
    SB3_ARG_MAPS,
    SB3_CONSTANTS,
    SB3_TO_SNAP_OP_MAP,
    SB3_VAR_TYPES,
} from './SB3Data';
import Primitive from './SnapPrimitive';

const SPECIAL_CASE_ARGS = {
    'motion_pointtowards': {},
    'motion_goto': {},
    'motion_glideto': {},
    'looks_changeeffectby': {},
    'looks_seteffectto': {},
    'pen_changePenColorParamBy': {},
    'pen_setPenColorParamTo': {},
    'event_whenkeypressed': {},
    'control_stop': {},
    'control_create_clone_of': {},
    'sensing_touchingobject': {},
    'sensing_distanceto': {},
    'sensing_keypressed': {},
    'videoSensing_videoOn': {},
    'sensing_of': {},
    'sensing_current': {},
    'operator_mathop': {},
    'data_insertatlist': {},
    'data_replaceitemoflist': {},
    'data_itemoflist': {},
};

function handleObjArg(arg, choices) {
    if (choices.includes(arg.value)) {
        return new Primitive(OBJECT_NAMES[arg.value], true);
    }
    return arg;
}

SPECIAL_CASE_ARGS['motion_pointtowards'][0] =
    SPECIAL_CASE_ARGS['sensing_distanceto'][0] = (arg) => {
        return handleObjArg(arg, ['_mouse_']);
    };
SPECIAL_CASE_ARGS['motion_goto'][0] =
    SPECIAL_CASE_ARGS['motion_glideto'][0] = (arg) => {
        return handleObjArg(arg, ['_mouse_', '_random_']);
    };
SPECIAL_CASE_ARGS['control_create_clone_of'][0] = (arg) => {
    return handleObjArg(arg, ['_myself_']);
};
SPECIAL_CASE_ARGS['sensing_touchingobject'][0] = (arg) => {
    return handleObjArg(arg, ['_mouse_', '_edge_']);
};
SPECIAL_CASE_ARGS['videoSensing_videoOn'][0] = (arg) => {
    return handleObjArg(arg, ['this sprite']);
};

SPECIAL_CASE_ARGS['looks_changeeffectby'][0] =
    SPECIAL_CASE_ARGS['looks_seteffectto'][0] = (arg) => {
        return new Primitive(arg.value.toLowerCase(), true);
    };

SPECIAL_CASE_ARGS['pen_changePenColorParamBy'][0] =
    SPECIAL_CASE_ARGS['pen_setPenColorParamTo'][0] = (arg) => {
        if (arg.value === 'color') {
            return new Primitive('hue', true);
        }
        return arg;
    };

SPECIAL_CASE_ARGS['event_whenkeypressed'][0] =
    SPECIAL_CASE_ARGS['sensing_keypressed'][0] = (arg) => {
        if (arg.value === 'any') {
            return new Primitive('any key', true);
        }
        return arg;
    };

SPECIAL_CASE_ARGS['control_stop'][0] = (arg) => {
    if (arg.value === 'other scripts in stage') {
        return new Primitive('other scripts in sprite', true);
    }
    if (arg.value === 'this script') {
        return new Primitive('this block', true);
    }
    return arg;
};

SPECIAL_CASE_ARGS['sensing_of'][0] = (arg) => {
    const OPTIONS = [
        'costume #', 'costume name', 'volume',
        'x position', 'y position', 'direction', 'size',
    ];

    if (arg.value === 'backdrop #' || arg.value === 'background #') {
        return new Primitive('costume #', true);
    } else if (arg.value === 'backdrop name') {
        return new Primitive('costume name', true);
    }
    if (OPTIONS.includes(arg.value)) {
        return new Primitive(arg.value, true);
    }
    return arg;
};
SPECIAL_CASE_ARGS['sensing_of'][1] = (arg) => {
    if (arg.value === '_stage_') {
        return new Primitive('Stage');
    }
    return arg;
};

SPECIAL_CASE_ARGS['sensing_current'][0] = (arg) => {
    if (arg.value === 'DAYOFWEEK') {
        return new Primitive('day of week', true);
    }
    return new Primitive(arg.value.toLowerCase(), true);
};

SPECIAL_CASE_ARGS['operator_mathop'][0] = (arg) => {
    if (arg.value === 'e ^') {
        return new Primitive('e^', true);
    }
    if (arg.value === '10 ^') {
        return new Primitive('10^', true);
    }
    return arg;
};

SPECIAL_CASE_ARGS['data_insertatlist'][1] =
    SPECIAL_CASE_ARGS['data_replaceitemoflist'][0] =
        SPECIAL_CASE_ARGS['data_itemoflist'][0] = (arg) => {
            if (arg.value === 'random' || arg.value === 'any') {
                return new Primitive('any', true);
            }
            return arg;
        };

export default class Block {
    static forVar(varName) {
        return new Block().initForVar(varName);
    }

    static forList(varName) {
        return new Block().initForList(varName);
    }

    initForVar(varName) {
        this.op = 'data_variable';
        this.args = [new Primitive(varName)];
        return this;
    }

    initForList(listName) {
        this.op = 'data_listcontents';
        this.args = [Block.forVar(listName)];
        return this;
    }

    readSB3(
        blockID,
        blockMap,
        blockComments,
        variables,
    ) {
        const jsonObj = blockMap[blockID];

        // if (Array.isArray(jsonObj)) { // primitive array
        //     return this.readPrimitiveSB3(jsonObj, variables);
        // }

        this.op = jsonObj.opcode;

        const argMap = SB3_ARG_MAPS[this.op];
        if (argMap) {
            this.args = argMap.map((argSpec, argIndex) => {
                return this.readArgSB3(jsonObj, argIndex, argSpec, blockMap, blockComments, variables);
            });
        } else {
            this.args = [];
        }
        // if (blockComments[blockID]) {
        //     this.comment = blockComments[blockID];
        // }

        return this;
    }

    // readPrimitiveSB3(jsonArr: any[], variables: VariableFrame): any {
    //     const type = jsonArr[0];
    //     const id = jsonArr[2];
    //     if (type === SB3_CONSTANTS.VAR_PRIMITIVE) {
    //         return this.initForVar(variables.getVarName(id));
    //     }
    //     if (type === SB3_CONSTANTS.LIST_PRIMITIVE) {
    //         return this.initForList(variables.getListName(id));
    //     }
    //     return this;
    // }

    readArgSB3(
        jsonObj,
        argIndex,
        argSpec,
        blockMap,
        blockComments,
        variables,
    ) {
        let value;
        if (argSpec.type === 'input') { // input (blocks can be dropped here)
            const argArr = jsonObj.inputs[argSpec.inputName];
            if (argArr) {
                const inputType = argArr[0];
                const inputValue = argArr[1];
                if (inputType === SB3_CONSTANTS.INPUT_SAME_BLOCK_SHADOW) {
                    // value is a primitive other than variable/list
                    if (typeof inputValue === 'string') { // dropdown menu id
                        const inputObj = blockMap[inputValue];
                        const fieldName = Object.keys(inputObj.fields)[0];
                        value = inputObj.fields[fieldName][0];
                    } else if (Array.isArray(inputValue)) { // primitive array
                            value = inputValue[1];
                    }
                } else if (
                    inputType === SB3_CONSTANTS.INPUT_BLOCK_NO_SHADOW
                    || inputType === SB3_CONSTANTS.INPUT_DIFF_BLOCK_SHADOW
                ) {
                    return new Block().readSB3(inputValue, blockMap, blockComments, variables);
                }
            }
        }
        let prim;
        if (typeof value === 'string' && argSpec.snapOptionInput) {
            prim = new Primitive(value, true);
        } else {
            prim = new Primitive(value);
        }
        if (SPECIAL_CASE_ARGS[this.op] && SPECIAL_CASE_ARGS[this.op][argIndex]) {
            prim = SPECIAL_CASE_ARGS[this.op][argIndex](prim);
        }
        return prim;
    }

}
