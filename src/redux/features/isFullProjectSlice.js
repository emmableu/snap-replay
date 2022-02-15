import { createSlice} from '@reduxjs/toolkit'
import globalConfig from "../../globalConfig";



export const isFullProjectSlice = createSlice({
    name: 'isFullProjectSlice',
    initialState: {data: globalConfig.simplifiedInterfaceFor110 || globalConfig.controlCond},
    reducers: {
        setIsFullProject: (state, action) => {
            state.data = action.payload;
            Trace.note("setIsFullProject", action.payload);
        },
    },
})

export const { setIsFullProject } = isFullProjectSlice.actions
export default isFullProjectSlice.reducer
