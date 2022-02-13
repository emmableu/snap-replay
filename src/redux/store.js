import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";
import traceSlice from "./features/traceSlice.js";
import selectedProjectSlice from "./features/selectedProjectSlice";
import exampleCollectionSlice from "./features/exampleCollectionSlice";
import userIdSlice from "./features/userIdSlice";
import isFullProjectSlice from "./features/isFullProjectSlice";
import timeRangeSlice from "./features/timeRangeSlice";

const store = configureStore({
   reducer: {
       rect: rectSlice,
       selectedProject: selectedProjectSlice,
       trace: traceSlice,
       exampleCollection: exampleCollectionSlice,
       userId: userIdSlice,
       isFullProject: isFullProjectSlice,
       timeRange: timeRangeSlice,
   }
});

export default store;
