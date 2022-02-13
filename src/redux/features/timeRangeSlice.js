import { createSlice} from '@reduxjs/toolkit'
import globalConfig from "../../globalConfig";



export const timeRangeSlice = createSlice({
    name: 'timeRangeSlice',
    initialState: {data: [0, 10]},
    reducers: {
        setTimeRange: (state, action) => {
            state.data = action.payload;
        },
    },
})

export const { setTimeRange, setStride } = timeRangeSlice.actions
export default timeRangeSlice.reducer
