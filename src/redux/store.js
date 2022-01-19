import { configureStore } from '@reduxjs/toolkit';
import rectSlice from "./features/rectSlice.js";
import selectedProjectSlice from "./features/selectedProjectSlice";

const store = configureStore({
   reducer: {
       rect: rectSlice,
       selectedProject: selectedProjectSlice,
   }
});

export default store;
