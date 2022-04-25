import { createSlice} from '@reduxjs/toolkit'


export const traceSlice = createSlice({
    name: 'traceSlice',
    initialState: {
        data: [],
        stride: 1,
        frameList:[]
    },
    reducers: {
        setTrace: (state, action) => {
            state.data = action.payload;
            console.log("setTrace: ", state.data)
            Trace.note("setTrace", action.payload);
        },
        setStride: (state, action) => {
            state.stride = action.payload;
            console.log("setStride: ", state.stride);
            Trace.note("setStride", action.payload);

        }
    }
})

export const {setTrace, setStride} = traceSlice.actions;
export default traceSlice.reducer;
