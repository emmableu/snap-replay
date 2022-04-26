import { createSlice} from '@reduxjs/toolkit'
import TimeIntervalUtil from "../../util/TimeIntervalUtil";


export const traceSlice = createSlice({
    name: 'traceSlice',
    initialState: {
        data: [],
        stride: 1,
        frameList:[],
        valMap: {},
    },
    reducers: {
        setTrace: (state, action) => {
            state.data = action.payload;
            console.log("setTrace: ", state.data)
            Trace.note("setTrace", action.payload);
        },
        // setFrameListData: (state, action) => {
        //     state.frameListData = action.payload;
        //     // console.log("setFrameListData: ", state.frameListData)
        //     Trace.note("setFrameListData", action.payload);
        // },
        setStride: (state, action) => {
            state.stride = action.payload;
            console.log("setStride: ", state.stride);
            Trace.note("setStride", action.payload);
        },
        // setValMap: (state, action) => {
        //     state.valMap = action.payload;
        //     console.log("setValMap: ", state.valMap);
        //     Trace.note("setStride", action.payload);
        // },
        setStoryboardFrameList: (state, action) => {
            const {timeRange, projectName, valMap} = action.payload;
            state.frameList =  TimeIntervalUtil.sampleStoryboard(
                state.data, timeRange, valMap, projectName
            )
            console.log("setStoryboardFrameList: ", state.frameList);
            Trace.note("setStoryboardFrameList", action.payload);
        }
    }
}
)

export const {setTrace, setStride, setStoryboardFrameList} = traceSlice.actions;
export default traceSlice.reducer;
