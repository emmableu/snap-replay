import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";
import traceSlice from "./features/traceSlice.js";
import selectedProjectSlice from "./features/selectedProjectSlice";

const store = configureStore({
   reducer: {
       rect: rectSlice,
       selectedProject: selectedProjectSlice,
       trace: traceSlice,
   }
});

export default store;
