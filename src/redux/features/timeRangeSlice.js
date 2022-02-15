import { createSlice} from '@reduxjs/toolkit'
import globalConfig from "../../globalConfig";



export const timeRangeSlice = createSlice({
    name: 'timeRangeSlice',
    initialState: {data: [0, 0], real: [0, 0]},
    reducers: {
        setTimeRange: (state, action) => {
            const {data, real} = action.payload;
            // console.log("data: ", data, "valMap:", valMap);
            state.data = data;
            state.real = real;
            Trace.note("setTimeRange", action.payload);
        },
    },
})

export const { setTimeRange, setStride } = timeRangeSlice.actions
export default timeRangeSlice.reducer
