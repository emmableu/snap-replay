import { createSlice} from '@reduxjs/toolkit'
import globalConfig from "../../globalConfig";


export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: {
        data: {
            selected: globalConfig.originalSelectedProject ? globalConfig.originalSelectedProject : "panda",
        }
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.data.selected = action.payload;
            Trace.note("setSelectedProject", action.payload);
        }
    }
})

export const {setSelectedProject} = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;
