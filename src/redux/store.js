import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";
import traceSlice from "./features/traceSlice.js";
import selectedProjectSlice from "./features/selectedProjectSlice";
import exampleCollectionSlice from "./features/exampleCollectionSlice";
import userIdSlice from "./features/userIdSlice";

const store = configureStore({
   reducer: {
       rect: rectSlice,
       selectedProject: selectedProjectSlice,
       trace: traceSlice,
       exampleCollection: exampleCollectionSlice,
       userId: userIdSlice,
   }
});

export default store;
