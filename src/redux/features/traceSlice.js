import { createSlice} from '@reduxjs/toolkit'


export const traceSlice = createSlice({
    name: 'traceSlice',
    initialState: {
        data: [],
        stride: 1,
    },
    reducers: {
        setTrace: (state, action) => {
            state.data = action.payload;
            Trace.note("setTrace", action.payload);
        },
        setStride: (state, action) => {
            state.stride = action.payload;
            Trace.note("setStride", action.payload);

        }
    }
})

export const {setTrace, setStride} = traceSlice.actions;
export default traceSlice.reducer;
