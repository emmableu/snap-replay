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
    },
    "space": {
        enemyImg: "enemy.png",
        enemyCrossImg: "enemy-cross.png",
        bulletImg: "space-bullet.png",
        bulletCrossImg: "space-bullet-cross.png",
        createBullet2: "create-bullet2.png",
        deleteBullet2: "delete-bullet2.png",
        stride: 2,
    },
    "boat": {
        stride: 2,
    },
    "catch": {
        stride: 10,
    }
}

export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: {
        data: {
            selected: globalConfig.originalSelectedProject ? globalConfig.originalSelectedProject : "space",
            static: globalConfig.originalSelectedProject ? staticDataObj[globalConfig.originalSelectedProject]:
                staticDataObj["space"]
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
