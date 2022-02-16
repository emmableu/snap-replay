import { createSlice} from '@reduxjs/toolkit'
import globalConfig from "../../globalConfig";
const staticDataObj = {
    "panda": {
        cloneImg: "bamboo.png",
        cloneCrossImg: "bamboo-cross.png",
        stride: 2,
    },
    "shoot": {
        cloneImg: "bullet.png",
        cloneCrossImg: "bullet-cross.png",
        stride: 6,
    },
    "skiing": {
        cloneImg: "tree.png",
        cloneCrossImg: "tree-cross.png",
        stride: 6,
    }
}

export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: {
        data: {
            selected: globalConfig.originalSelectedProject ? globalConfig.originalSelectedProject : "panda",
            static: globalConfig.originalSelectedProject ? staticDataObj[globalConfig.originalSelectedProject]:
                staticDataObj["panda"]
        }
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.data.selected = action.payload;
            state.data.static = staticDataObj[action.payload];
            Trace.note("setSelectedProject", action.payload);
        }
    }
})

export const {setSelectedProject} = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
