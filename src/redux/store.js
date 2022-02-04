import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";
import traceSlice from "./features/traceSlice.js";
import selectedProjectSlice from "./features/selectedProjectSlice";
import exampleCollectionSlice from "./features/exampleCollectionSlice";

const store = configureStore({
   reducer: {
       rect: rectSlice,
       selectedProject: selectedProjectSlice,
       trace: traceSlice,
       exampleCollection: exampleCollectionSlice
   }
});

export default store;
